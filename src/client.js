/* ======================================================================
 * BEMAP HTTP CLIENT
 *
 * Authenticated access to the BeMap backend. The documentation site and the
 * REST services both sit behind a form login at `POST {base}/bgis/login`
 * which returns a session cookie — there is no bearer token here.
 *
 * Credentials come from the environment only (BEMAP_USER / BEMAP_KEY); they
 * are never read from, or written to, any file in this repository.
 *
 * Besides BeNomad's published environments there is `own`: a BeMap
 * installation of the customer's own, for the customers BeNomad sells the
 * whole platform to. Its host comes from BEMAP_BASE_URL, set by whoever
 * configures this server — never from a conversation, because the configured
 * account is sent to whatever host `own` names. BeNomad delivers BeMap to
 * these customers, never BeNomad Tiles, so `own` has no tiles host and its map
 * is BeMap's own WMS.
 *
 * Node's fetch has no cookie jar, so this module keeps one in memory and
 * replays it on every request. The session is established lazily on first
 * use and re-established automatically when the server bounces us back to
 * the login page (the backend expires sessions server-side).
 * ====================================================================== */

const ENVIRONMENTS = {
  beta: 'https://bemap-beta.benomad.com',
  preprod: 'https://bemap-preprod.benomad.com',
  prod: 'https://bemap.benomad.com',
};

/** The environment a call targets when none is named and $BEMAP_ENV is unset. */
const DEFAULT_ENV = 'prod';

/*
 * The BeNomad Tiles Worker paired with each published BeMap environment — the
 * maps an application shows come from here, on `.benomad.net`, and the same
 * BeMap account logs in to both. The pairing is not optional: a tiles host
 * authenticates against its own environment's BeMap, and crossing them answers
 * `403` on the tiles login, which reads as bad credentials and is not.
 */
const TILES = {
  beta: 'https://mptiles-api-beta.benomad.net',
  preprod: 'https://mptiles-api-preprod.benomad.net',
  prod: 'https://mptiles-api.benomad.net',
};

/** The environment name of a BeMap installation of the customer's own. */
export const OWN = 'own';

/**
 * A setting from this server's environment, or `''` when it is unset.
 *
 * A Claude Desktop extension hands an optional setting the user left empty to
 * the server as the literal text `${user_config.bemap_user}`, not as nothing:
 * `@anthropic-ai/mcpb` substitutes only the values it holds and leaves the
 * others in place. Read as a value, that placeholder is an account name and a
 * key, and every live call answers `401` for credentials nobody typed. So a
 * placeholder is unset, like an empty string.
 *
 * @param {string} name - Variable name, e.g. `BEMAP_USER`.
 * @returns {string} The value, trimmed, or `''`.
 */
export function setting(name) {
  const value = String(process.env[name] ?? '').trim();
  return /^\$\{[^}]*\}$/.test(value) ? '' : value;
}

/** An origin as written by a person: no trailing slash. */
const origin = (url) => url.replace(/\/+$/, '');

/**
 * Whether an origin is this machine.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isLoopback(url) {
  try {
    return ['127.0.0.1', 'localhost', '[::1]'].includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

/**
 * Whether an account sent to an origin would travel unencrypted: plain HTTP
 * to another machine than this one.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function unencrypted(url) {
  return /^http:\/\//i.test(String(url)) && !isLoopback(url);
}

/** The most of a response body read into memory, in bytes: past it the body is cut and says so. */
export const MAX_BODY_BYTES = 8 * 1024 * 1024;

/**
 * Whether a response is text a model can read, by its content type. An
 * absent type is taken for text, which is what BeMap's JSON answers mostly
 * carry; images, archives, vector tiles and octet streams are not.
 *
 * @param {string} contentType
 * @returns {boolean}
 */
export function isTextual(contentType) {
  const type = String(contentType ?? '').split(';')[0].trim().toLowerCase();
  return !type || /^text\/|json|xml|javascript|csv|kml|x-www-form-urlencoded/.test(type);
}

/**
 * Resolve the BeMap host for an environment name.
 *
 * @param {string} [env] - `beta`, `preprod`, `prod` or `own`, or an origin.
 *   Defaults to `$BEMAP_ENV`, then `own` when `$BEMAP_BASE_URL` is set, then
 *   `prod`.
 * @returns {string} Origin without a trailing slash.
 */
export function resolveBaseUrl(env) {
  if (env && /^https?:\/\//.test(env)) return origin(env);

  const name = environmentName(env);
  /* An installation of the customer's own — or one developer's local
     backend — is deliberately not an entry in ENVIRONMENTS: that table lists
     BeNomad's published environments. It is named `own` and read from the
     configuration. A set BEMAP_BASE_URL used to override silently even an
     explicit `env: "prod"`; now it is the default, and a name still wins. */
  if (name === OWN) {
    const own = setting('BEMAP_BASE_URL');
    if (!own) {
      throw new Error(
        '"own" is a BeMap installation of your own, and none is configured: set BEMAP_BASE_URL ' +
          "in this MCP server's configuration."
      );
    }
    return origin(own);
  }
  const base = Object.hasOwn(ENVIRONMENTS, name) ? ENVIRONMENTS[name] : null;
  if (!base) {
    /* Say where the name came from: a Desktop user types it into a free-text
       settings field, and "Unknown environment" alone does not say which. */
    const fromSettings = !env && setting('BEMAP_ENV');
    throw new Error(
      `${fromSettings ? `BEMAP_ENV, in this server's settings, is "${name}"` : `Unknown BeMap environment "${name}"`}. ` +
        `Expected one of: ${environmentNames().join(', ')}.`
    );
  }
  return base;
}

/**
 * What is wrong with the BeMap named in this server's settings, if anything:
 * an unknown BEMAP_ENV, or `own` with no BEMAP_BASE_URL. Tools report it
 * instead of failing on it, so a typo in a settings field is explained.
 *
 * @returns {string|null}
 */
export function settingsProblem() {
  try {
    resolveBaseUrl();
    return null;
  } catch (error) {
    return error.message;
  }
}

/** @returns {string} The environment a call targets when nothing names one. */
export function defaultEnvironment() {
  return DEFAULT_ENV;
}

/** @returns {string[]} The list of valid environment names, `own` last. */
export function environmentNames() {
  return [...Object.keys(ENVIRONMENTS), OWN];
}

/**
 * The environment a call targets: the name given, then `$BEMAP_ENV`, then
 * `own` when an installation of the customer's own is configured, then the
 * default.
 *
 * @param {string} [env] - Environment name.
 * @returns {string} Lower-cased name.
 */
export function environmentName(env) {
  return (env || setting('BEMAP_ENV') || (setting('BEMAP_BASE_URL') ? OWN : DEFAULT_ENV)).toLowerCase();
}

/**
 * Every environment with its BeMap host and, where one is paired, its BeNomad
 * Tiles host — so that a tool can state the hosts rather than leave a model to
 * guess them. A model left to guess wrote `bemap-prod.benomad.com` for prod,
 * which happens to resolve. An installation of the customer's own is listed
 * last, when one is configured.
 *
 * @returns {Array<{env: string, bemap: string, tiles: string|null}>}
 */
export function environmentHosts() {
  const hosts = Object.entries(ENVIRONMENTS).map(([env, bemap]) => ({ env, bemap, tiles: TILES[env] ?? null }));
  const own = setting('BEMAP_BASE_URL');
  if (own) hosts.push({ env: OWN, bemap: origin(own), tiles: null });
  return hosts;
}

/**
 * The BeNomad Tiles host paired with an environment.
 *
 * @param {string} [env] - Environment name; see {@link environmentName}.
 * @returns {string|null} Origin, or `null` when the environment has no pairing.
 */
export function resolveTilesUrl(env) {
  /* `own` has none: BeNomad Tiles is not delivered with an installation of
     the customer's own. */
  return TILES[environmentName(env)] ?? null;
}

/**
 * Log in to an environment's BeNomad Tiles Worker with a BeMap account and
 * read what it serves: its default map and style, the aliases, every style.
 *
 * The defaults differ between environments — measured on 24 September 2026,
 * beta's default style is `charte_2026_1`, prod's `charte_2026` — which is
 * why they are read, never written down. The session token is used here and
 * discarded: an application logs in for itself.
 *
 * The account is sent to the host, so a caller passes an origin only when it
 * is one this server knows — a BeNomad environment's or the configured `own`.
 *
 * @param {string} [target] - Environment name, or a BeNomad Tiles origin.
 * @param {{user?: string, key?: string, timeoutMs?: number}} [options]
 * @returns {Promise<{host: string, username: string|null, defaultMap: string|null,
 *   defaultStyle: string|null, aliases: Record<string, string>, styles: string[]}>}
 * @throws {Error} naming the status and the Worker's own message.
 */
export async function discoverTiles(target, options = {}) {
  const host = /^https?:\/\//.test(target ?? '') ? origin(target) : resolveTilesUrl(target);
  if (!host) throw new Error(`No BeNomad Tiles host is paired with the environment "${environmentName(target)}".`);
  /* The account goes to BeNomad's Tiles hosts, and to a stand-in on this machine, and nowhere else — whoever calls this. */
  if (!Object.values(TILES).includes(host) && !isLoopback(host)) throw new Error(`${host} is not a BeNomad Tiles host: the account is not sent there.`);
  const { user = setting('BEMAP_USER'), key = setting('BEMAP_KEY'), timeoutMs = 30000 } = options;
  const login = await fetch(`${host}/api/login`, {
    method: 'POST',
    redirect: 'manual',
    headers: { authorization: `Basic ${Buffer.from(`${user}:${key}`).toString('base64')}` },
    signal: AbortSignal.timeout(timeoutMs),
  });
  const session = await login.json().catch(() => ({}));
  if (!login.ok || !session.token) {
    throw new Error(`${host}/api/login answered ${login.status}${session.error ? ` — ${session.error}` : ''}`);
  }
  const read = async (path) => {
    const response = await fetch(`${host}${path}`, {
      headers: { 'x-session-token': session.token },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) throw new Error(`${host}${path} answered ${response.status}`);
    return response.json();
  };
  const [maps, styles] = await Promise.all([read('/api/maps'), read('/api/styles')]);
  return {
    host,
    username: session.username ?? null,
    defaultMap: maps.default ?? null,
    defaultStyle: maps.defaultStyle ?? styles.defaultStyle ?? null,
    aliases: maps.aliases ?? {},
    styles: styles.styles ?? [],
  };
}

/**
 * Compare two bgis version strings on their numeric parts.
 *
 * Release builds report `4.0.3`; a pre-release build reports `4.1.0-SNAPSHOT`.
 * Only the numbers are ordered — the suffix is reported separately, because
 * "the snapshot is ahead of this environment" and "same release, one is a
 * pre-release build" call for different advice.
 *
 * @param {string|null} a
 * @param {string|null} b
 * @returns {{order:number, comparable:boolean}} `order` is -1 / 0 / 1 for a
 *   before / equal to / after b; `comparable` is false when either side could
 *   not be parsed.
 */
export function compareBgisVersions(a, b) {
  const parse = (value) =>
    typeof value === 'string' ? value.match(/^(\d+)\.(\d+)\.(\d+)/)?.slice(1, 4).map(Number) : null;
  const left = parse(a);
  const right = parse(b);
  if (!left || !right) return { order: 0, comparable: false };
  for (let i = 0; i < 3; i += 1) {
    if (left[i] !== right[i]) return { order: left[i] > right[i] ? 1 : -1, comparable: true };
  }
  return { order: 0, comparable: true };
}

/**
 * Thrown when credentials are missing or rejected. Carries a `kind` so callers
 * can tell "you never provided credentials" from "the server said no".
 */
export class BemapAuthError extends Error {
  /**
   * @param {string} message - Human-readable explanation.
   * @param {'missing'|'rejected'} kind - Why authentication failed.
   */
  constructor(message, kind) {
    super(message);
    this.name = 'BemapAuthError';
    this.kind = kind;
  }
}

export class BemapClient {
  /**
   * @param {object} [options]
   * @param {string} [options.env] - Environment name; see {@link resolveBaseUrl}.
   * @param {string} [options.baseUrl] - Explicit origin, overriding `env`. Passing
   *   one used to be silently ignored, which sent a caller's requests to
   *   `$BEMAP_ENV` instead of the host it named.
   * @param {string} [options.user] - Account. Defaults to `$BEMAP_USER`.
   * @param {string} [options.key] - API key. Defaults to `$BEMAP_KEY`.
   * @param {number} [options.timeoutMs] - Per-request timeout. Default 60000.
   */
  constructor(options = {}) {
    this.baseUrl = options.baseUrl ?? resolveBaseUrl(options.env);
    this.user = options.user ?? setting('BEMAP_USER');
    this.key = options.key ?? setting('BEMAP_KEY');
    this.timeoutMs = options.timeoutMs ?? 60000;
    /** @type {Map<string,string>} cookie name → value */
    this._cookies = new Map();
    /** @type {Promise<void>|null} in-flight login, so concurrent calls share one */
    this._loginPromise = null;
  }

  /** @returns {boolean} Whether credentials are present (not whether they are valid). */
  hasCredentials() {
    return Boolean(this.user && this.key);
  }

  /**
   * Absolute URL for a path relative to the BeMap root.
   *
   * @param {string} path - e.g. `/bgis/documentation/index.html`.
   * @returns {string}
   */
  url(path) {
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /** Serialize the cookie jar into a `Cookie` header value. */
  _cookieHeader() {
    return [...this._cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
  }

  /**
   * Merge `Set-Cookie` response headers into the jar.
   *
   * @param {Response} response
   */
  _storeCookies(response) {
    const raw = typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : [response.headers.get('set-cookie')].filter(Boolean);

    for (const line of raw) {
      const [pair] = line.split(';');
      const idx = pair.indexOf('=');
      if (idx > 0) {
        this._cookies.set(pair.slice(0, idx).trim(), pair.slice(idx + 1).trim());
      }
    }
  }

  /**
   * Low-level fetch with cookie replay, timeout and manual redirects.
   *
   * The body is read here, under the same timer and within a byte budget.
   * The timer used to stop once the headers arrived, so a slow body ran past
   * the timeout — six seconds against a two-second one — and a large file was
   * read whole into memory to show a few thousand characters of it.
   *
   * @returns {Promise<{status: number, headers: Headers, bytes: Buffer, truncated: boolean}>}
   */
  async _raw(url, { method = 'GET', body, headers = {} } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const cookie = this._cookieHeader();
      const response = await fetch(url, {
        method,
        body,
        redirect: 'manual',
        signal: controller.signal,
        headers: { ...(cookie ? { cookie } : {}), ...headers },
      });
      this._storeCookies(response);
      const chunks = [];
      let size = 0;
      let truncated = false;
      if (response.body) {
        const reader = response.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_BODY_BYTES) {
            chunks.push(value.subarray(0, value.byteLength - (size - MAX_BODY_BYTES)));
            truncated = true;
            await reader.cancel().catch(() => {});
            break;
          }
          chunks.push(value);
        }
      }
      return { status: response.status, headers: response.headers, bytes: Buffer.concat(chunks), truncated };
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw new Error(`Request to ${url} timed out after ${this.timeoutMs} ms.`);
      }
      throw new Error(`Request to ${url} failed: ${error.message}`);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Establish a session. Concurrent callers share a single login round-trip.
   *
   * @returns {Promise<void>}
   * @throws {BemapAuthError} When credentials are absent or rejected.
   */
  async login() {
    if (!this.hasCredentials()) {
      throw new BemapAuthError(
        "No BeMap credentials configured. Set BEMAP_USER and BEMAP_KEY in this server's environment. " +
          'Reading the documentation snapshot does not require them; ' +
          'executing live requests does.',
        'missing'
      );
    }
    if (this._loginPromise) return this._loginPromise;

    this._loginPromise = (async () => {
      const body = new URLSearchParams({
        username: this.user,
        password: this.key,
        submit: 'Connection',
      });
      const response = await this._raw(this.url('/bgis/login'), {
        method: 'POST',
        body,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });

      // Success is a 302 towards the app; failure bounces back to login.html.
      const location = response.headers.get('location') ?? '';
      const ok = response.status === 302 && !location.includes('login.html');
      if (!ok) {
        this._cookies.clear();
        throw new BemapAuthError(
          `BeMap rejected the credentials for account "${this.user}" on ${this.baseUrl} ` +
            `(HTTP ${response.status}). Check BEMAP_USER / BEMAP_KEY and that the account ` +
            `is enabled on this environment.`,
          'rejected'
        );
      }
    })();

    try {
      await this._loginPromise;
    } finally {
      this._loginPromise = null;
    }
  }

  /**
   * Authenticated request that transparently (re-)logs in as needed.
   *
   * @param {string} path - Path relative to the BeMap root.
   * @param {object} [options]
   * @param {string} [options.method] - HTTP method. Default `GET`.
   * @param {string} [options.body] - Request body.
   * @param {Record<string,string>} [options.headers] - Extra headers.
   * @returns {Promise<{status:number, text:string, bytes:Buffer, contentType:string, binary:boolean, truncated:boolean}>}
   *   `binary` when the content type is not text: `text` is then no use, and
   *   `bytes` holds the body.
   * @throws {Error} for an absolute URL on another origin: the account is sent
   *   to this client's host and to no other.
   */
  async request(path, options = {}) {
    const absolute = /^https?:\/\//i.test(path);
    if (absolute && new URL(path).origin !== new URL(this.baseUrl).origin) {
      throw new Error(`Refusing to send the account to ${new URL(path).origin}: this client talks to ${this.baseUrl} only.`);
    }
    const url = absolute ? path : this.url(path);

    if (this._cookies.size === 0) await this.login();

    let response = await this._raw(url, options);

    // A redirect to the login page means the session lapsed — retry once.
    const location = response.headers.get('location') ?? '';
    if (response.status === 302 && location.includes('login')) {
      this._cookies.clear();
      await this.login();
      response = await this._raw(url, options);
    }

    const contentType = response.headers.get('content-type') ?? '';
    return {
      status: response.status,
      text: response.bytes.toString('utf8'),
      bytes: response.bytes,
      contentType,
      binary: !isTextual(contentType),
      truncated: response.truncated,
    };
  }

  /**
   * Read the backend's software version.
   *
   * Used to detect when the committed snapshot describes a different bgis
   * release than the environment being called — a real risk around upgrades,
   * where documentation lands on beta weeks before prod.
   *
   * @returns {Promise<{version:string|null, builtAt:string|null, status:string|null, jsApiVersion:string|null, geoSdkVersion:string|null, raw:string}>}
   */
  async serverVersion() {
    /* Through fetchText, so a refusal is an error that names its status —
       an "Access Denied" used to be reported as the release "unknown". */
    const auth = Buffer.from(`${this.user}:${this.key}`).toString('base64');
    const text = await this.fetchText('/bgis/service/version/server/1.0', {
      headers: { authorization: `Basic ${auth}` },
    });
    let parsed = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // Non-JSON means an error page; fall through to nulls with the raw body.
    }
    // `bgisVersion` is the reliable field. `packagePrefix` only spells the
    // version out on release builds ("bgis-4.0.3_60074b9bb…"); on a snapshot
    // build it is just a branch name, so parsing it there yields null.
    return {
      version:
        parsed.bgisVersion ?? parsed.packagePrefix?.match(/bgis-([\d.]+)/)?.[1] ?? null,
      builtAt: parsed.packageIsodatetime ?? null,
      // Empty on releases, "SNAPSHOT" on a pre-release build.
      status: parsed.bgisVersionStatus || null,
      jsApiVersion: parsed.jsivVersion ?? null,
      geoSdkVersion: parsed.geosdkVersion ?? null,
      raw: text.slice(0, 300),
    };
  }

  /**
   * Read the geo-server profile: map data release, available geocoding
   * back-ends, and the per-service request limits.
   *
   * These are only knowable at runtime — the static documentation states none
   * of them — and they genuinely differ per environment, so a payload sized
   * against one environment can be rejected by another.
   *
   * @returns {Promise<{cartoRelease:string|null, geoservers:string[], transportTypes:string[], truckAttributes:boolean|null, limits:Array<{service:string, key:string, value:string, unit:string|null, bound:string|null}>}>}
   */
  async geoServerInfo() {
    const auth = Buffer.from(`${this.user}:${this.key}`).toString('base64');
    const body = await this.fetchText('/bgis/service/geoServerInfo/1.0', {
      method: 'POST',
      body: JSON.stringify({ geoserver: 'default' }),
      headers: { authorization: `Basic ${auth}`, 'content-type': 'application/json' },
    });
    const parsed = JSON.parse(body);
    return {
      cartoRelease: parsed.globalCopyright ?? null,
      geoservers: (parsed.availableGeoServerNames ?? []).slice().sort(),
      transportTypes: parsed.transportTypes ?? [],
      truckAttributes: parsed.truckAttributes ?? null,
      limits: (parsed.serviceLimits ?? []).map((limit) => ({
        // Strip the "Benomad"/"Service" decoration: BenomadRoutingService → Routing.
        service: (limit.serviceName ?? '').replace(/^Benomad/, '').replace(/Service$/, ''),
        key: limit.key ?? '',
        value: String(limit.value ?? ''),
        unit: limit.unit && limit.unit !== 'NA' ? limit.unit : null,
        bound: limit.argument ?? null,
      })),
    };
  }

  /**
   * Fetch a resource expected to succeed, returning its body.
   *
   * @param {string} path
   * @param {object} [options] - Same shape as {@link BemapClient#request}.
   * @returns {Promise<string>}
   * @throws {Error} On any non-2xx status.
   */
  async fetchText(path, options = {}) {
    const { status, text } = await this.request(path, options);
    if (status < 200 || status >= 300) {
      const detail = text.slice(0, 300).replace(/\s+/g, ' ').trim();
      throw new Error(`${options.method ?? 'GET'} ${path} → HTTP ${status}${detail ? `: ${detail}` : ''}`);
    }
    return text;
  }
}

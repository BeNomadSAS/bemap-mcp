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

/**
 * Resolve the BeMap host for an environment name.
 *
 * @param {string} [env] - `beta`, `preprod` or `prod`. Defaults to `$BEMAP_ENV`, then `prod`.
 * @returns {string} Origin without a trailing slash.
 */
export function resolveBaseUrl(env) {
  const name = (env || process.env.BEMAP_ENV || 'prod').toLowerCase();
  const base = ENVIRONMENTS[name];
  if (!base) {
    throw new Error(
      `Unknown BeMap environment "${name}". Expected one of: ${Object.keys(ENVIRONMENTS).join(', ')}.`
    );
  }
  return base;
}

/** @returns {string[]} The list of valid environment names. */
export function environmentNames() {
  return Object.keys(ENVIRONMENTS);
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
    this.user = options.user ?? process.env.BEMAP_USER ?? '';
    this.key = options.key ?? process.env.BEMAP_KEY ?? '';
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

  /** Low-level fetch with cookie replay, timeout and manual redirects. */
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
      return response;
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
        'No BeMap credentials configured. Set BEMAP_USER and BEMAP_KEY in the environment ' +
          '(see .env.example). Reading the documentation snapshot does not require them; ' +
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
   * @returns {Promise<{status:number, text:string, contentType:string}>}
   */
  async request(path, options = {}) {
    const url = path.startsWith('http') ? path : this.url(path);

    if (this._cookies.size === 0) await this.login();

    let response = await this._raw(url, options);

    // A redirect to the login page means the session lapsed — retry once.
    const location = response.headers.get('location') ?? '';
    if (response.status === 302 && location.includes('login')) {
      this._cookies.clear();
      await this.login();
      response = await this._raw(url, options);
    }

    return {
      status: response.status,
      text: await response.text(),
      contentType: response.headers.get('content-type') ?? '',
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
    const auth = Buffer.from(`${this.user}:${this.key}`).toString('base64');
    const { text } = await this.request('/bgis/service/version/server/1.0', {
      headers: { authorization: `Basic ${auth}` },
    });
    let parsed = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // Non-JSON means an error page; fall through to nulls with the raw body.
    }
    // `bgisVersion` is the reliable field. `packagePrefix` only spells the
    // version out on release builds ("bgis-4.0.3_60074b9bb…"); on the dev
    // environment it is just "dev", so parsing it there yields null.
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
      throw new Error(`GET ${path} → HTTP ${status}${detail ? `: ${detail}` : ''}`);
    }
    return text;
  }
}

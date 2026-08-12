'use strict';

/**
 * Agent-runtime proxy bootstrap (loaded via NODE_OPTIONS --require).
 *
 * Node.js and the Claude Agent SDK CLI do not reliably honor NO_PROXY when
 * HTTP_PROXY is set on Windows. Cherry Studio's centralized bypass rules use
 * `*.ccc.net` / `192.168.*.*` syntax — mirror Python `network._should_bypass_proxy`.
 */

(function () {
  const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || '';
  if (!proxyUrl) return;

  const bypassSource = process.env.CHERRY_PROXY_BYPASS_RULES || process.env.NO_PROXY || '';
  const rules = bypassSource
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const log = (msg) => {
    try {
      process.stderr.write(`[agent-proxy-bootstrap] ${msg}\n`);
    } catch {
      // ignore
    }
  };

  function shouldBypass(hostname) {
    if (!hostname) return false;
    const host = String(hostname).toLowerCase();
    for (const raw of rules) {
      const rule = raw.toLowerCase();
      if (!rule) continue;
      if (rule === '<local>') {
        if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.startsWith('127.')) {
          return true;
        }
        continue;
      }
      if (rule === '*') return true;
      if (rule.includes('*')) {
        if (rule.startsWith('*.')) {
          const domain = rule.slice(2);
          if (host === domain || host.endsWith(`.${domain}`)) return true;
        } else {
          const re = new RegExp(`^${rule.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
          if (re.test(host)) return true;
        }
        continue;
      }
      if (rule.charAt(0) === '.') {
        if (host.endsWith(rule) || host === rule.slice(1)) return true;
        continue;
      }
      if (host === rule || host.endsWith(`.${rule}`)) return true;
    }
    return false;
  }

  const urlMod = require('url');
  const parsed = new (urlMod.URL || URL)(proxyUrl);
  const pHost = parsed.hostname;
  const pPort = parseInt(parsed.port, 10) || 80;
  const patched = [];

  try {
    let undici;
    try {
      undici = require('undici');
    } catch {
      undici = require('node:undici');
    }
    if (undici.EnvHttpProxyAgent && undici.setGlobalDispatcher) {
      undici.setGlobalDispatcher(new undici.EnvHttpProxyAgent());
      patched.push('fetch(EnvHttpProxyAgent)');
    }
  } catch (e) {
    log(`undici patch skipped: ${e.message}`);
  }

  try {
    const http = require('http');
    const https = require('https');
    const tls = require('tls');

    const origHttpRequest = http.request;
    http.request = function proxyAwareHttpRequest(urlOrOpts, optionsOrCb, cb) {
      let options = typeof urlOrOpts === 'string' ? Object.assign(new URL(urlOrOpts)) : urlOrOpts;
      if (urlOrOpts && typeof urlOrOpts === 'object' && urlOrOpts.href) {
        options = Object.assign({}, urlOrOpts);
      }
      const targetHost = options.hostname || options.host || 'localhost';
      if (options.method === 'CONNECT' || shouldBypass(String(targetHost).split(':')[0])) {
        return origHttpRequest.apply(http, arguments);
      }
      const port = options.port || 80;
      const fullPath = `http://${targetHost}:${port}${options.path || '/'}`;
      const proxyOpts = Object.assign({}, options, {
        hostname: pHost,
        host: pHost,
        port: pPort,
        path: fullPath
      });
      delete proxyOpts.agent;
      if (typeof optionsOrCb === 'function') {
        return origHttpRequest.call(http, proxyOpts, optionsOrCb);
      }
      return origHttpRequest.call(http, proxyOpts, optionsOrCb, cb);
    };
    patched.push('http.request');

    const OrigHttpsAgent = https.Agent;
    function TunnelAgent(opts) {
      OrigHttpsAgent.call(this, opts);
    }
    TunnelAgent.prototype = Object.create(OrigHttpsAgent.prototype);
    TunnelAgent.prototype.constructor = TunnelAgent;
    TunnelAgent.prototype.createConnection = function createConnection(options, cb) {
      const targetHost = options.host || options.hostname || 'localhost';
      const targetPort = options.port || 443;
      if (shouldBypass(String(targetHost).split(':')[0])) {
        return tls.connect({ host: targetHost, port: targetPort, servername: targetHost }, function onSecure() {
          cb(null, this);
        });
      }
      const connectReq = origHttpRequest({
        host: pHost,
        port: pPort,
        method: 'CONNECT',
        path: `${targetHost}:${targetPort}`
      });
      connectReq.on('connect', (res, socket) => {
        if (res.statusCode !== 200) {
          cb(new Error(`CONNECT ${res.statusCode}`));
          socket.destroy();
          return;
        }
        const tlsSocket = tls.connect({ socket, servername: targetHost });
        cb(null, tlsSocket);
      });
      connectReq.on('error', cb);
      connectReq.end();
    };
    https.globalAgent = new TunnelAgent({ keepAlive: true });
    patched.push('https.globalAgent');

    if (typeof globalThis.fetch === 'function') {
      const origFetch = globalThis.fetch;
      globalThis.fetch = function patchedFetch(input, init) {
        let urlStr;
        if (typeof input === 'string') urlStr = input;
        else if (input && typeof input === 'object' && input.url) urlStr = input.url;
        else return origFetch.call(globalThis, input, init);

        let purl;
        try {
          purl = new URL(urlStr);
        } catch {
          return origFetch.call(globalThis, input, init);
        }

        if (shouldBypass(purl.hostname)) {
          return origFetch.call(globalThis, input, init);
        }

        const isHttps = purl.protocol === 'https:';
        const mod = isHttps ? https : http;
        const method = (init && init.method) || 'GET';
        const reqHeaders = {};
        if (init && init.headers) {
          if (typeof init.headers.forEach === 'function') {
            init.headers.forEach((v, k) => {
              reqHeaders[k] = v;
            });
          } else if (typeof init.headers === 'object') {
            for (const [k, v] of Object.entries(init.headers)) reqHeaders[k] = v;
          }
        }

        return new Promise((resolve, reject) => {
          const reqOpts = {
            hostname: purl.hostname,
            port: purl.port || (isHttps ? 443 : 80),
            path: purl.pathname + purl.search,
            method,
            headers: reqHeaders
          };

          const req = mod.request(reqOpts, (res) => {
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
              const body = Buffer.concat(chunks);
              const respHeaders = {};
              const rawH = res.rawHeaders || [];
              for (let ri = 0; ri < rawH.length; ri += 2) respHeaders[rawH[ri]] = rawH[ri + 1];
              resolve(
                new Response(body, {
                  status: res.statusCode,
                  statusText: res.statusMessage,
                  headers: respHeaders
                })
              );
            });
            res.on('error', reject);
          });

          req.on('error', reject);
          req.setTimeout(30000, () => req.destroy(new Error('proxy fetch timeout')));

          if (init && init.body) {
            if (typeof init.body === 'string' || Buffer.isBuffer(init.body)) {
              req.write(init.body);
            }
          }
          req.end();
        });
      };
      patched.push('globalThis.fetch');
    }
  } catch (e) {
    log(`http/https patch error: ${e.message}`);
  }

  log(`OK patched=[${patched.join(', ')}] bypassRules=${rules.length}`);
})();

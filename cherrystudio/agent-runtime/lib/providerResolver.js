'use strict';

/**
 * Resolves an Agent's `model` string (format: `${providerId}:${modelId}`) into
 * the Anthropic-compatible endpoint the real Claude Agent SDK needs
 * (ANTHROPIC_BASE_URL / ANTHROPIC_API_KEY / ANTHROPIC_MODEL).
 *
 * The Claude Agent SDK CLI only ever speaks the Anthropic Messages API, so
 * (like the official Electron implementation) only providers that are
 * Anthropic-compatible (type === 'anthropic', an explicit anthropicApiHost,
 * or Azure OpenAI's /anthropic passthrough) can back an Agent session.
 *
 * Lookup order (first match wins):
 *   1. User-configured providers in `<app-data>/localStorage.json`
 *      (`state.llm.providers`, redux-persist nested format — the primary,
 *      common path for self-added providers with their own API key).
 *   2. OpenClaw config `~/.openclaw/openclaw.cherry.json` -> `models.providers[...]`.
 *   3. Local backend's `GET /api/v1/config/merged` -> `centralizedProviders[...]`
 *      (needed for `apiKeyMode: "per-user-provisioned"` gateways like
 *      `coco-vapi`, whose real API key only lives in the OS keyring that
 *      only Python can read — see `resolveFromBackend`).
 *   4. Raw `resources/centralized-config.json` -> `providers[...]` (last
 *      resort if the backend isn't reachable yet).
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function stripTrailingApiVersion(url) {
  return (url || '').replace(/\/v\d+\/?$/, '');
}

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function parseIfString(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Reads `state.llm.providers` out of the on-disk `localStorage.json`.
 *
 * The real on-disk shape is redux-persist's nested/double-stringified
 * format, NOT a flat `{ providers: [...] }` object:
 *
 *   { "persist:cherry-studio": "{\"llm\":\"{\\\"providers\\\":[...]}\",...}" }
 *
 * i.e. `localStorage.json` -> `persist:cherry-studio` (JSON string) ->
 * `.llm` (itself a JSON string) -> `.providers` (array). An earlier version
 * of this resolver read `storage.providers` directly at the top level,
 * which never exists, so it silently always fell through to the OpenClaw/
 * centralized-config fallbacks — any user-configured provider with its own
 * API key (e.g. a self-added Anthropic/zhipu/deepseek provider) was
 * invisible to the Agent SDK. Also tolerates a hypothetical flatter shape
 * for forwards/backwards compatibility.
 */
function readProvidersFromLocalStorage(storage) {
  if (!storage || typeof storage !== 'object') return [];

  if (Array.isArray(storage.providers)) return storage.providers;
  const flatProviders = parseIfString(storage.providers);
  if (Array.isArray(flatProviders)) return flatProviders;

  const root = parseIfString(storage['persist:cherry-studio']);
  if (root && typeof root === 'object') {
    const llm = parseIfString(root.llm);
    if (llm && Array.isArray(llm.providers)) return llm.providers;
  }
  return [];
}

/**
 * Shared Anthropic-compatibility check + baseUrl/apiKey extraction for a
 * resolved `provider` object, used by both `resolveFromLocalStorage` (user's
 * own providers) and `resolveFromBackend` (centralized/provisioned
 * providers) — the two sources return the exact same provider shape.
 *
 * @param {boolean} placeholderKeyFallback - when true, an empty `apiKey`
 *   falls back to `provider.id` as a non-empty placeholder (needed for
 *   providers like Ollama/LM Studio that don't require a real key). When
 *   false (used for centralized/provisioned providers), an empty key means
 *   "not provisioned yet" and the caller should treat this as a miss so it
 *   can fall through to another resolution attempt / surface a clear error,
 *   instead of silently sending an empty/placeholder key to a real gateway.
 */
function buildProviderResult(provider, providerId, modelId, { placeholderKeyFallback = false } = {}) {
  // Centralized/newapi-style gateways (e.g. `coco-vapi`) sit behind a single
  // generically-typed provider (`type: "openai"`) but multiplex several
  // *native* wire protocols under the same host — the official app
  // distinguishes them per-model via `model.endpoint_type`
  // ('openai' | 'openai-response' | 'anthropic' | 'gemini' | ...), see
  // `buildNewApiConfig()` in `providerConfig.ts`. A model with
  // `endpoint_type: 'anthropic'` is just as Agent-usable as a genuine
  // `type: 'anthropic'` provider, even though sibling models on the same
  // provider (e.g. an `openai-response` model) are not.
  const model = Array.isArray(provider.models) ? provider.models.find((m) => m && m.id === modelId) : undefined;
  const modelIsAnthropicNative = model && model.endpoint_type === 'anthropic';

  const isAnthropic = provider.type === 'anthropic';
  const isAzureOpenAI = provider.type === 'azure-openai';
  const hasAnthropicHost = typeof provider.anthropicApiHost === 'string' && provider.anthropicApiHost.trim();

  if (!isAnthropic && !isAzureOpenAI && !hasAnthropicHost && !modelIsAnthropicNative) {
    return { error: `Provider '${providerId}' (type=${provider.type}) is not Anthropic-compatible. The Claude Agent SDK requires an Anthropic Messages API endpoint (set "Anthropic API Host" on the provider, mark the model's "endpoint_type" as "anthropic", or use an Anthropic/Claude provider).` };
  }

  let baseUrl;
  if (isAzureOpenAI) {
    const host = stripTrailingApiVersion(provider.apiHost || '').replace(/\/openai$/, '');
    baseUrl = `${host}/anthropic`;
  } else {
    // Same fallback order as `buildNewApiConfig()`: prefer an explicit
    // `anthropicApiHost` override, otherwise reuse the provider's normal
    // `apiHost` — new-api/one-api gateways serve `/v1/messages` off the same
    // base host as `/v1/chat/completions`, just gated by path, not host.
    baseUrl = stripTrailingApiVersion((provider.anthropicApiHost || provider.apiHost || '').trim());
  }

  const rawKey = (provider.apiKey || '').split(',')[0].trim();
  const apiKey = rawKey || (placeholderKeyFallback ? provider.id : '');
  if (!apiKey) return null;

  return { baseUrl, apiKey, modelId, providerId, headers: provider.extra_headers || {} };
}

function resolveFromLocalStorage(appDataDir, providerId, modelId) {
  const storagePath = path.join(appDataDir, 'localStorage.json');
  const storage = readJsonSafe(storagePath);
  if (!storage) return null;

  const providers = readProvidersFromLocalStorage(storage);
  if (!Array.isArray(providers) || providers.length === 0) return null;

  const provider = providers.find((p) => p && p.id === providerId);
  if (!provider) return null;

  return buildProviderResult(provider, providerId, modelId, { placeholderKeyFallback: true });
}

/**
 * Resolves centralized/gateway providers (`coco-vapi` and friends,
 * `apiKeyMode: "per-user-provisioned"`) via the already-running,
 * same-machine backend HTTP service (`GET /api/v1/config/merged`).
 *
 * These providers never carry a real, usable API key in
 * `centralized-config.json` on disk or in `localStorage.json` — the actual
 * per-user token only lives in the OS keyring (see
 * `core/newapi_provisioning.py`'s `NewApiProvisioningService`, which
 * provisions/caches it via Windows Credential Manager / macOS Keychain).
 * Only Python can read that; the sidecar asks the backend for it instead of
 * reimplementing OS keyring access in Node. `CHERRY_STUDIO_BACKEND_URL` is
 * populated by `agent_runtime_manager.py` at spawn time via
 * `service_runner.read_backend_url()`.
 */
async function resolveFromBackend(providerId, modelId) {
  const backendUrl = process.env.CHERRY_STUDIO_BACKEND_URL;
  if (!backendUrl) return null;

  let cfg;
  try {
    const res = await fetch(`${backendUrl}/api/v1/config/merged`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    cfg = await res.json();
  } catch {
    return null;
  }

  const providers = Array.isArray(cfg && cfg.centralizedProviders) ? cfg.centralizedProviders : [];
  const provider = providers.find((p) => p && p.id === providerId);
  if (!provider) return null;

  const result = buildProviderResult(provider, providerId, modelId, { placeholderKeyFallback: false });
  if (result === null) {
    return {
      error: `Provider '${providerId}' has not finished NewAPI key provisioning yet (no API key available). Try again in a moment, or reopen the provider in Cherry Studio settings once to trigger provisioning.`
    };
  }
  return result;
}

function resolveFromOpenClaw(providerId, modelId) {
  const cfgPath = path.join(os.homedir(), '.openclaw', 'openclaw.cherry.json');
  const cfg = readJsonSafe(cfgPath);
  if (!cfg) return null;
  const providers = (cfg.models && cfg.models.providers) || {};
  for (const key of Object.keys(providers)) {
    if (key === providerId || key === `cherry-${providerId}` || key === `central-${providerId}`) {
      const prov = providers[key];
      if (prov && prov.baseUrl) {
        return { baseUrl: stripTrailingApiVersion(prov.baseUrl), apiKey: prov.apiKey || '', modelId, providerId };
      }
    }
  }
  return null;
}

/**
 * Last-resort fallback: reads the raw `centralized-config.json` straight off
 * disk when the backend HTTP service (`resolveFromBackend`) isn't reachable
 * yet. `apiKeyMode: "per-user-provisioned"` providers (e.g. `coco-vapi`)
 * never carry a real key in this file (see `resolveFromBackend`'s docstring),
 * so this only actually succeeds for centralized providers that ship a
 * literal `apiKey` in the config (e.g. shared/team keys, not per-user ones).
 */
function resolveFromCentralized(providerId, modelId) {
  let cfgPath = process.env.CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH;
  if (!cfgPath) {
    // cherrystudio/agent-runtime/lib -> cherrystudio/resources/centralized-config.json
    cfgPath = path.join(__dirname, '..', '..', 'resources', 'centralized-config.json');
  }
  const cfg = readJsonSafe(cfgPath);
  if (!cfg) return null;
  const providers = cfg.centralizedProviders || cfg.providers || [];
  const provider = providers.find((cp) => cp && (cp.id === providerId || `centralized-${cp.id}` === providerId));
  if (!provider) return null;

  const result = buildProviderResult(provider, providerId, modelId, { placeholderKeyFallback: false });
  if (result === null) {
    return {
      error: `Provider '${providerId}' requires per-user NewAPI provisioning and the local backend service isn't reachable right now, so no API key could be resolved. Make sure Cherry Studio's local API/backend service is running, then retry.`
    };
  }
  return result;
}

/**
 * @param {string} modelString e.g. "anthropic:claude-sonnet-4-5"
 * @param {string} appDataDir  Houdini per-DCC app data dir (contains localStorage.json)
 * @returns {Promise<{ baseUrl: string, apiKey: string, modelId: string, providerId: string, headers?: object }>}
 */
async function resolveProvider(modelString, appDataDir) {
  if (!modelString || !modelString.includes(':')) {
    throw new Error(`Invalid model id '${modelString}', expected format 'providerId:modelId'`);
  }
  const idx = modelString.indexOf(':');
  const providerId = modelString.slice(0, idx);
  const modelId = modelString.slice(idx + 1);

  const attempts = [
    () => resolveFromLocalStorage(appDataDir, providerId, modelId),
    () => resolveFromOpenClaw(providerId, modelId),
    // Async: hits the local backend's /api/v1/config/merged for providers
    // that need real, per-user-provisioned keys resolved via OS keyring
    // (e.g. `coco-vapi`) — see `resolveFromBackend`'s docstring.
    () => resolveFromBackend(providerId, modelId),
    () => resolveFromCentralized(providerId, modelId)
  ];

  let firstError = null;
  for (const attempt of attempts) {
    const result = await attempt();
    if (result && result.error) {
      firstError = result.error;
      continue;
    }
    if (result && result.baseUrl) {
      return result;
    }
  }

  throw new Error(firstError || `Cannot resolve provider for model '${modelString}'. Configure the provider in Cherry Studio settings first.`);
}

/**
 * Centralized providers (`coco-vapi` and friends) never live in
 * `state.llm.providers` on disk — the frontend merges them in at runtime
 * from the backend's `/api/v1/config/merged` (`centralizedProviders`), so
 * they're invisible to a plain `localStorage.json` read. Prefer asking the
 * live backend (matches what the frontend actually shows, including
 * per-user-provisioned key availability); fall back to the raw
 * `centralized-config.json` off disk if the backend isn't reachable yet.
 */
async function getCentralizedProviders() {
  const backendUrl = process.env.CHERRY_STUDIO_BACKEND_URL;
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/v1/config/merged`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const cfg = await res.json();
        if (Array.isArray(cfg && cfg.centralizedProviders)) return cfg.centralizedProviders;
      }
    } catch {
      // fall through to the raw file below
    }
  }

  let cfgPath = process.env.CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH;
  if (!cfgPath) {
    cfgPath = path.join(__dirname, '..', '..', 'resources', 'centralized-config.json');
  }
  const cfg = readJsonSafe(cfgPath);
  const providers = (cfg && (cfg.centralizedProviders || cfg.providers)) || [];
  return Array.isArray(providers) ? providers : [];
}

function pushProviderModels(results, provider, providerType) {
  if (!provider || provider.enabled === false) return;
  if (providerType && providerType !== 'anthropic' && provider.type !== providerType) return;

  // Provider-level compatibility (genuine `anthropic`/`azure-openai` type,
  // or an explicit `anthropicApiHost` override) covers the common case.
  // Centralized/newapi-style gateways additionally mark *individual*
  // models as `endpoint_type: 'anthropic'` (see `buildProviderResult`
  // above for why this has to be per-model, not just per-provider).
  const providerIsAnthropicCompatible =
    provider.type === 'anthropic' ||
    provider.type === 'azure-openai' ||
    !!(typeof provider.anthropicApiHost === 'string' && provider.anthropicApiHost.trim());

  for (const model of provider.models || []) {
    if (providerType === 'anthropic' && !providerIsAnthropicCompatible && model.endpoint_type !== 'anthropic') {
      continue;
    }
    results.push({
      id: `${provider.id}:${model.id}`,
      object: 'model',
      created: Math.floor(Date.now() / 1000),
      name: model.name || model.id,
      owned_by: model.owned_by || provider.name || provider.id,
      provider: provider.id,
      provider_name: provider.name,
      provider_type: provider.type,
      provider_model_id: model.id
    });
  }
}

/**
 * Lists provider/model combos for the `/v1/models` endpoint, merging the
 * user's own configured providers (`localStorage.json`) with centralized
 * gateway providers (`coco-vapi` and friends), mirroring what the frontend
 * model picker actually shows.
 *
 * IMPORTANT: unlike `resolveProvider` (used right before actually spawning
 * the Claude Agent SDK, which *does* hard-require Anthropic compatibility),
 * this listing endpoint must NOT filter down to Anthropic-only providers
 * unconditionally. The official Electron app's Agent model picker
 * (`getModelFilterByAgentType('claude-code')` returns `{}` — no
 * `providerType` filter) intentionally shows models from ALL enabled
 * providers, and only surfaces the "not Anthropic-compatible" error lazily
 * when the user actually starts a session with an incompatible model
 * (see `ClaudeCodeService.invoke()` / our `resolveProvider` above). Filtering
 * here unconditionally would make every non-Anthropic-format model
 * (OpenAI-compatible, Gemini, etc. — the common case for most users) silently
 * disappear from the picker instead of just erroring at session-start time,
 * which is the exact regression this mirrors the frontend's local-provider
 * fallback (`AgentApiClient.getModels()`'s Redux-based fallback in
 * `agent.ts`) in only applying the Anthropic-compat filter when the caller
 * explicitly asks for `providerType: 'anthropic'`.
 */
async function listModels(appDataDir, { providerType } = {}) {
  const storagePath = path.join(appDataDir, 'localStorage.json');
  const storage = readJsonSafe(storagePath);
  const userProviders = readProvidersFromLocalStorage(storage);
  const centralizedProviders = await getCentralizedProviders();

  const results = [];
  for (const provider of userProviders) pushProviderModels(results, provider, providerType);
  for (const provider of centralizedProviders) pushProviderModels(results, provider, providerType);
  return results;
}

module.exports = { resolveProvider, listModels };

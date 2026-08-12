'use strict';

const path = require('node:path');
const fs = require('node:fs');

const { query } = require('@anthropic-ai/claude-agent-sdk');

const { resolveProvider } = require('./providerResolver');
const { StreamState, transformSDKMessage, buildNamespacedToolCallId } = require('./transform');
const { broker } = require('./permissions');
const { reconcileAgentSkills } = require('./skills');
const { buildSoulSystemPrompt, buildToolGuidance, buildFactsSection } = require('./cherryclaw');

/** Tools disabled for ALL agents (mirrors web/packages/shared/agents/claudecode/constants.ts) */
const GLOBALLY_DISALLOWED_TOOLS = ['WebSearch', 'WebFetch'];

/** Tools disabled when Soul Mode is active (not suited for autonomous operation). */
const SOUL_MODE_DISALLOWED_TOOLS = [
  'CronCreate',
  'CronDelete',
  'CronList',
  'TodoWrite',
  'AskUserQuestion',
  'EnterPlanMode',
  'ExitPlanMode',
  'EnterWorktree',
  'NotebookEdit'
];

/** Tools that never need an interactive permission prompt even in 'default' mode. */
const DEFAULT_AUTO_ALLOW_TOOLS = ['Read', 'Glob', 'Grep', 'TodoWrite', 'NotebookRead', 'BashOutput'];

function normalizeToolName(name) {
  return name.startsWith('builtin_') ? name.slice('builtin_'.length) : name;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Resolves (and creates if necessary) the on-disk workspace for an agent
 * session, mirroring the official app's per-session `cwd`.
 */
function resolveWorkspace(agentRuntimeHome, agent, session) {
  const explicit = session.accessible_paths && session.accessible_paths[0];
  if (explicit) {
    ensureDir(explicit);
    return explicit;
  }
  const dir = path.join(agentRuntimeHome, 'workspaces', agent.id, session.id);
  ensureDir(dir);
  return dir;
}

function appendHostToNoProxy(env, baseUrl) {
  try {
    const normalized = baseUrl && baseUrl.includes('://') ? baseUrl : `https://${baseUrl || ''}`;
    const host = new URL(normalized).hostname;
    if (!host) return;
    const cur = env.NO_PROXY || env.no_proxy || '';
    const parts = cur
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.includes(host)) parts.push(host);
    const merged = parts.join(',');
    env.NO_PROXY = merged;
    env.no_proxy = merged;
  } catch {
    // ignore malformed base URL
  }
}

function buildEnv(providerInfo, agentRuntimeHome) {
  const env = {
    ...process.env,
    CLAUDE_CODE_USE_BEDROCK: '0',
    ANTHROPIC_API_KEY: providerInfo.apiKey,
    ANTHROPIC_AUTH_TOKEN: providerInfo.apiKey,
    ANTHROPIC_BASE_URL: providerInfo.baseUrl,
    ANTHROPIC_MODEL: providerInfo.modelId,
    ANTHROPIC_DEFAULT_OPUS_MODEL: providerInfo.modelId,
    ANTHROPIC_DEFAULT_SONNET_MODEL: providerInfo.modelId,
    ANTHROPIC_DEFAULT_HAIKU_MODEL: providerInfo.modelId,
    CLAUDE_CONFIG_DIR: ensureDir(path.join(agentRuntimeHome, '.claude-config')),
    ENABLE_TOOL_SEARCH: 'auto'
  };
  if (providerInfo.headers && Object.keys(providerInfo.headers).length > 0) {
    env.ANTHROPIC_CUSTOM_HEADERS = Object.entries(providerInfo.headers)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n');
  }
  if (env.HTTP_PROXY || env.HTTPS_PROXY) {
    appendHostToNoProxy(env, providerInfo.baseUrl);
  }
  return env;
}

/**
 * Runs one turn of the Claude Agent SDK for a session and streams
 * AgentStreamPart-shaped chunks to `onChunk`. Resolves when the turn
 * (and any tool loop within it) completes.
 *
 * @param {object} params
 * @param {object} params.agent - agent entity (row)
 * @param {object} params.session - session entity (row); mutated in place with sdk_session_id
 * @param {string} params.content - the user's message text for this turn
 * @param {object} params.db - AgentDb instance (used to persist sdk_session_id updates)
 * @param {string} params.appDataDir - Houdini per-DCC app data dir (for provider resolution)
 * @param {string} params.agentRuntimeHome - sidecar's own data dir (workspaces, config)
 * @param {(chunk: object) => void} params.onChunk
 * @param {AbortController} params.abortController
 */
async function runTurn({ agent, session, content, db, appDataDir, agentRuntimeHome, onChunk, abortController }) {
  const providerInfo = await resolveProvider(session.model || agent.model, appDataDir);
  const cwd = resolveWorkspace(agentRuntimeHome, agent, session);

  try {
    await reconcileAgentSkills(cwd, agent, appDataDir);
  } catch (err) {
    // Skills are a nice-to-have; never fail the turn because of them.
    console.warn('[claudeRunner] reconcileAgentSkills failed:', err && err.message);
  }

  const config = agent.configuration || {};
  const sessionAllowedTools = new Set(session.allowed_tools || agent.allowed_tools || []);
  const autoAllowTools = new Set([...DEFAULT_AUTO_ALLOW_TOOLS, ...sessionAllowedTools]);
  const permissionMode = config.permission_mode || 'default';

  const canUseTool = async (toolName, input, sdkOptions) => {
    if (permissionMode === 'bypassPermissions') {
      return { behavior: 'allow', updatedInput: input };
    }
    if (sdkOptions.signal && sdkOptions.signal.aborted) {
      return { behavior: 'deny', message: 'Tool request was cancelled' };
    }

    const normalized = normalizeToolName(toolName);
    const autoApprove = autoAllowTools.has(toolName) || autoAllowTools.has(normalized);
    const toolCallId = buildNamespacedToolCallId(session.id, sdkOptions.toolUseID);

    return broker.requestPermission(toolName, input, {
      sessionId: session.id,
      toolCallId,
      autoApprove,
      title: sdkOptions.title,
      description: sdkOptions.description,
      onAlwaysAllow: (approvedToolName) => {
        // Remaining tool calls within this turn auto-approve immediately...
        autoAllowTools.add(approvedToolName);
        // ...and future turns/sessions read it back from `allowed_tools`.
        try {
          db.addSessionAllowedTool(session.id, approvedToolName);
        } catch (err) {
          console.warn('[claudeRunner] Failed to persist always-allow tool:', err && err.message);
        }
      }
    });
  };

  const instructions = session.instructions || agent.instructions || '';
  const soulEnabled = config.soul_enabled === true;

  let systemPrompt;
  if (soulEnabled) {
    const soulPrompt = await buildSoulSystemPrompt(cwd, config);
    systemPrompt = `${soulPrompt}${instructions ? `\n\n${instructions}` : ''}`;
  } else {
    const toolGuidance = buildToolGuidance();
    const facts = await buildFactsSection(cwd);
    systemPrompt = {
      type: 'preset',
      preset: 'claude_code',
      append: [toolGuidance, facts, instructions].filter(Boolean).join('\n\n')
    };
  }

  const sdkOptions = {
    cwd,
    env: buildEnv(providerInfo, agentRuntimeHome),
    abortController,
    systemPrompt,
    settingSources: ['project', 'local'],
    includePartialMessages: true,
    permissionMode,
    maxTurns: config.max_turns || 100,
    allowedTools: session.allowed_tools || agent.allowed_tools,
    disallowedTools: [...GLOBALLY_DISALLOWED_TOOLS, ...(soulEnabled ? SOUL_MODE_DISALLOWED_TOOLS : [])],
    canUseTool,
    // Exa MCP (free tier, no API key) — replaces the SDK built-in
    // WebSearch/WebFetch disabled above (mirrors the official Electron
    // implementation in web/src/main/services/agents/services/claudecode/index.ts).
    // Without this the model has literally no way to browse the internet,
    // which is what made the Houdini agent feel "completely different" from
    // the official one. Goes through the same HTTP(S)_PROXY the Claude CLI
    // itself already respects (see buildEnv() -> ...process.env), so it also
    // works on machines that only have internet via a configured proxy.
    mcpServers: {
      exa: { type: 'http', url: 'https://mcp.exa.ai/mcp' }
    }
  };

  if (session.sdk_session_id) {
    sdkOptions.resume = session.sdk_session_id;
  }

  const state = new StreamState(session.id);
  let capturedSdkSessionId = session.sdk_session_id;

  for await (const message of query({ prompt: content, options: sdkOptions })) {
    if (message.session_id && message.session_id !== capturedSdkSessionId) {
      capturedSdkSessionId = message.session_id;
      try {
        db.setSdkSessionId(session.id, capturedSdkSessionId);
      } catch {
        // best-effort; not fatal if the column update races
      }
    }

    const chunks = transformSDKMessage(message, state);
    for (const chunk of chunks) {
      onChunk(chunk);
    }
  }

  return { sdkSessionId: capturedSdkSessionId };
}

module.exports = { runTurn, GLOBALLY_DISALLOWED_TOOLS, resolveWorkspace };

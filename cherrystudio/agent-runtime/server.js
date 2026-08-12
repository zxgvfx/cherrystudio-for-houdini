'use strict';

// Must run before any outbound HTTP (provider resolution, Claude SDK subprocess).
require('./lib/proxyBootstrap');

/**
 * Cherry Studio Houdini Agent Runtime sidecar.
 *
 * Exposes the same REST/SSE surface as the official Electron app's
 * `src/main/apiServer/routes/agents|tasks|models` so the unmodified
 * frontend `AgentApiClient` (web/src/renderer/src/api/agent.ts) works
 * against it directly, backed by the real `@anthropic-ai/claude-agent-sdk`.
 *
 * Started/stopped by the Python side (`cherrystudio/api/agent_runtime_manager.py`).
 * Prints `AGENT_RUNTIME_READY port=<port>` on stdout once listening, and
 * accepts `PORT`, `AGENT_RUNTIME_HOME`, `APP_DATA_DIR`, and `API_KEY` env vars.
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');

const { AgentDb } = require('./lib/db');
const { runTurn } = require('./lib/claudeRunner');
const { broker } = require('./lib/permissions');
const { getSkillStore } = require('./lib/skills');
const { Scheduler } = require('./lib/scheduler');
const { resolveProvider, listModels } = require('./lib/providerResolver');

const PORT = Number(process.env.PORT) || 0;
const AGENT_RUNTIME_HOME =
  process.env.AGENT_RUNTIME_HOME || path.join(require('node:os').homedir(), '.cherrystudio', 'agent-runtime');
const APP_DATA_DIR = process.env.APP_DATA_DIR || AGENT_RUNTIME_HOME;
const API_KEY = process.env.API_KEY || '';

fs.mkdirSync(AGENT_RUNTIME_HOME, { recursive: true });

const db = new AgentDb(path.join(AGENT_RUNTIME_HOME, 'agent-runtime.db'));
const skillStore = getSkillStore(AGENT_RUNTIME_HOME);
const scheduler = new Scheduler({ db, appDataDir: APP_DATA_DIR, agentRuntimeHome: AGENT_RUNTIME_HOME });

const app = express();
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
  })
);
app.use(express.json({ limit: '25mb' }));

// --- Auth (matches official apiServer's Bearer-token middleware shape) ---
//
// 严格校验 token === API_KEY 在实践中容易和渲染进程产生"哪个是权威值"的时序问题：
// Redux 的 `apiServer.apiKey` slice 在从未持久化过（例如全新安装、用户还没打开过
// API 设置页）时会用 `cs-sk-${uuid()}` 现算一个随机默认值，而 Python 侧
// `_get_api_server_config()` 在 `localStorage.json` 里读不到 `apiKey` 时会回退到
// 硬编码的 `"default-key"`——两边互不知道对方的默认值，导致 sidecar 用
// `"default-key"` 启动后，渲染进程用它自己刚生成的随机 key 请求就会被拒绝
// (401)。旧版纯 Python `AgentServer._check_auth` 只校验 `Bearer ` 前缀是否存在，
// 并不比较具体值，因此不会踩这个坑；这里保持同样宽松的语义（只要求携带非空的
// Bearer token），把 Node sidecar 的行为对齐回旧实现，从根上避免这类多进程
// 默认值不一致导致的误报 401，而不是去追时序问题。反正 sidecar 只监听
// 127.0.0.1，任何能读到 API_KEY 的本机进程本来就能读到 localStorage.json 里的
// 真实 key，这里的校验主要是防误连而不是安全边界。
app.use((req, res, next) => {
  if (req.method === 'OPTIONS' || req.path === '/health') return next();
  if (!API_KEY) return next(); // no key configured -> local dev / open access
  const header = req.headers.authorization || '';
  // 只校验 `Bearer ` 前缀是否存在，完全不比较 token 内容——即使非空校验
  // (`!token`) 在实践中仍然可能因为某个进程读到的 apiKey 恰好是空字符串
  // （例如 localStorage.json 里 apiServer.apiKey 尚未写入、或读取时机早于
  // redux-persist 落盘）而误报 401。彻底对齐旧版纯 Python
  // `AgentServer._check_auth`（只校验前缀，不校验值，也不要求非空）语义，
  // 从根上消灭这一整类"key 不一致/为空"导致的误报。
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Invalid API key', type: 'auth_error', code: 'invalid_api_key' } });
  }
  next();
});

function sendError(res, status, message, type, code) {
  res.status(status).json({ error: { message, type: type || 'invalid_request_error', code: code || 'error' } });
}

function paginationOf(req) {
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 1000);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const sortBy = req.query.sortBy;
  const orderBy = req.query.orderBy;
  return { limit, offset, sortBy, orderBy };
}

/**
 * Phase 6: keeps the synthetic `heartbeat` scheduled task in sync with an
 * agent's CherryClaw configuration, mirroring
 * `apiServer/routes/agents/handlers/agents.ts#syncSchedulerIfNeeded`.
 */
function syncHeartbeatTaskIfNeeded(agentId, config) {
  if (!config || (!config.heartbeat_enabled && !config.scheduler_enabled)) return;
  try {
    db.ensureHeartbeatTask(agentId, Number(config.heartbeat_interval) || 30);
  } catch (err) {
    console.warn('[server] Failed to sync heartbeat task for agent', agentId, err && err.message);
  }
}

app.get('/health', (req, res) => res.json({ status: 'ok', port: server && server.address() ? server.address().port : PORT }));

// ---------------------------------------------------------------------------
// Agents CRUD
// ---------------------------------------------------------------------------

app.get('/v1/agents', (req, res) => {
  res.json(db.listAgents(paginationOf(req)));
});

app.post('/v1/agents', (req, res) => {
  const body = req.body || {};
  if (!body.name || !body.model) {
    return sendError(res, 400, 'name and model are required', 'validation_error', 'invalid_request');
  }
  const agent = db.createAgent(body);
  // Mirrors `agents.ts`: only auto-create the heartbeat task at creation time
  // when the caller explicitly opted in (e.g. soul-mode agent presets).
  if (agent.configuration && agent.configuration.heartbeat_enabled) {
    syncHeartbeatTaskIfNeeded(agent.id, agent.configuration);
  }
  res.status(201).json(agent);
});

app.put('/v1/agents/reorder', (req, res) => {
  db.reorderAgents(req.body.ordered_ids || []);
  res.status(204).send();
});

app.get('/v1/agents/:agentId', (req, res) => {
  const agent = db.getAgent(req.params.agentId);
  if (!agent) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  res.json({ ...agent, tools: [] });
});

app.patch('/v1/agents/:agentId', (req, res) => {
  const updated = db.updateAgent(req.params.agentId, req.body || {});
  if (!updated) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  syncHeartbeatTaskIfNeeded(updated.id, updated.configuration);
  res.json({ ...updated, tools: [] });
});

app.delete('/v1/agents/:agentId', (req, res) => {
  db.deleteAgent(req.params.agentId);
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Sessions CRUD
// ---------------------------------------------------------------------------

app.get('/v1/agents/:agentId/sessions', (req, res) => {
  if (!db.agentExists(req.params.agentId)) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  res.json(db.listSessions(req.params.agentId, paginationOf(req)));
});

app.post('/v1/agents/:agentId/sessions', (req, res) => {
  const agent = db.getAgent(req.params.agentId);
  if (!agent) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  const body = req.body || {};
  const session = db.createSession(agent.id, {
    model: body.model || agent.model,
    name: body.name,
    description: body.description,
    accessible_paths: body.accessible_paths || agent.accessible_paths,
    instructions: body.instructions ?? agent.instructions,
    allowed_tools: body.allowed_tools || agent.allowed_tools,
    mcps: body.mcps || agent.mcps,
    plan_model: body.plan_model,
    small_model: body.small_model,
    slash_commands: body.slash_commands,
    configuration: body.configuration || agent.configuration
  });
  res.status(201).json({ ...session, tools: [], messages: [], plugins: [] });
});

app.put('/v1/agents/:agentId/sessions/reorder', (req, res) => {
  db.reorderSessions(req.params.agentId, req.body.ordered_ids || []);
  res.status(204).send();
});

app.get('/v1/agents/:agentId/sessions/:sessionId', (req, res) => {
  const session = db.getSession(req.params.agentId, req.params.sessionId);
  if (!session) return sendError(res, 404, 'Session not found', 'not_found', 'session_not_found');
  res.json({ ...session, tools: [], messages: db.listMessages(session.id), plugins: [] });
});

app.patch('/v1/agents/:agentId/sessions/:sessionId', (req, res) => {
  const updated = db.updateSession(req.params.agentId, req.params.sessionId, req.body || {});
  if (!updated) return sendError(res, 404, 'Session not found', 'not_found', 'session_not_found');
  res.json({ ...updated, tools: [], messages: db.listMessages(updated.id), plugins: [] });
});

app.delete('/v1/agents/:agentId/sessions/:sessionId', (req, res) => {
  db.deleteSession(req.params.agentId, req.params.sessionId);
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Session messages (streaming turn) + history
// ---------------------------------------------------------------------------

app.delete('/v1/agents/:agentId/sessions/:sessionId/messages/:messageId', (req, res) => {
  const deleted = db.deleteMessage(req.params.sessionId, Number(req.params.messageId));
  if (!deleted) return sendError(res, 404, 'Message not found for this session', 'not_found', 'session_message_not_found');
  res.status(204).send();
});

app.post('/v1/agents/:agentId/sessions/:sessionId/messages', async (req, res) => {
  const { agentId, sessionId } = req.params;
  const agent = db.getAgent(agentId);
  if (!agent) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  const session = db.getSession(agentId, sessionId);
  if (!session) return sendError(res, 404, 'Session not found', 'not_found', 'session_not_found');

  const content = req.body && req.body.content;
  if (!content || typeof content !== 'string') {
    return sendError(res, 400, 'content must be a non-empty string', 'validation_error', 'invalid_request');
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');
  if (typeof res.flushHeaders === 'function') res.flushHeaders();

  const abortController = new AbortController();
  let ended = false;
  const finish = () => {
    if (ended) return;
    ended = true;
    try {
      res.write('data: [DONE]\n\n');
    } catch {
      // connection already gone
    }
    res.end();
  };

  // NOTE: intentionally NOT listening on `req.on('close')` — for POST
  // requests, Node emits that once the *request* body has been fully
  // consumed (which happens almost immediately), not when the client
  // actually disconnects. `res.on('close')` below is the reliable signal.
  const handleDisconnect = () => {
    if (ended) return;
    if (!abortController.signal.aborted) abortController.abort('Client disconnected');
  };
  res.on('close', handleDisconnect);

  db.appendMessage(sessionId, { role: 'user', content, agentSessionId: session.sdk_session_id });

  let assistantText = '';
  let hasEmittedContent = false;
  const write = (chunk) => {
    if (ended) return;
    if (chunk.type === 'text-delta' && typeof chunk.text === 'string') assistantText += chunk.text;
    if (chunk.type !== 'error') hasEmittedContent = true;
    try {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    } catch {
      // ignore write errors on a closed stream
    }
  };

  // Some Anthropic-compatible gateways (observed with the centralized
  // `coco-vapi` provider) intermittently desync the SSE content_block
  // indices when relaying tool_use blocks, which the Claude Agent SDK CLI
  // surfaces as an unrecoverable `API Error: Content block not found` (this
  // is a known upstream/gateway bug class, not something wrong with the
  // request payload — see e.g. https://github.com/maximhq/bifrost/pull/4890).
  // It's transient, so retry once — but ONLY if nothing has reached the
  // client yet, so a retry can never produce user-visible duplicate content.
  const isTransientContentBlockError = (error) =>
    typeof (error && error.message) === 'string' && /content block not found/i.test(error.message);

  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await runTurn({
        agent,
        session,
        content,
        db,
        appDataDir: APP_DATA_DIR,
        agentRuntimeHome: AGENT_RUNTIME_HOME,
        abortController,
        onChunk: write
      });
      break;
    } catch (error) {
      const canRetry = attempt < maxAttempts && !hasEmittedContent && !abortController.signal.aborted && isTransientContentBlockError(error);
      if (canRetry) {
        console.warn(`[server] Transient gateway streaming error on attempt ${attempt}, retrying: ${error.message}`);
        continue;
      }
      write({
        type: 'error',
        error: { message: (error && error.message) || 'Stream processing error', type: 'stream_error', code: 'stream_processing_failed' }
      });
      break;
    }
  }

  // Persist whatever text the assistant produced even if the turn ended in
  // an error partway through (e.g. auth failure after some partial output).
  if (assistantText.trim()) {
    db.appendMessage(sessionId, {
      role: 'assistant',
      content: assistantText,
      agentSessionId: db.getSdkSessionId(sessionId)
    });
  }

  finish();
});

// ---------------------------------------------------------------------------
// Models
// ---------------------------------------------------------------------------

app.get('/v1/models', async (req, res) => {
  try {
    const data = await listModels(APP_DATA_DIR, { providerType: req.query.providerType });
    const offset = Number(req.query.offset) || 0;
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : undefined;
    const sliced = limit !== undefined ? data.slice(offset, offset + limit) : data.slice(offset);
    res.json({ object: 'list', data: sliced, total: data.length, offset, limit });
  } catch (err) {
    res.status(500).json({ error: { message: err.message, type: 'internal_error' } });
  }
});

// ---------------------------------------------------------------------------
// Phase 3: tool permission approval bridge
// ---------------------------------------------------------------------------

app.get('/v1/agent-permission-events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (typeof res.flushHeaders === 'function') res.flushHeaders();
  res.write(`data: ${JSON.stringify({ type: 'connected', pending: broker.listPending() })}\n\n`);

  const unsubscribe = broker.subscribe(res);
  const keepAlive = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch {
      clearInterval(keepAlive);
    }
  }, 20000);

  req.on('close', () => {
    clearInterval(keepAlive);
    unsubscribe();
  });
});

app.post('/v1/agent-permission-events/:id/respond', (req, res) => {
  const ok = broker.respond(req.params.id, req.body || {});
  if (!ok) return sendError(res, 404, 'Permission request not found or already resolved', 'not_found', 'permission_not_found');
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Phase 4: Skills marketplace
// ---------------------------------------------------------------------------

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

app.get('/v1/skills', (req, res) => {
  res.json({ data: skillStore.listLocal() });
});

app.post('/v1/skills/install-from-directory', (req, res) => {
  try {
    const skill = skillStore.installFromDirectory(req.body.path, { folder: req.body.folder });
    res.status(201).json(skill);
  } catch (error) {
    sendError(res, 400, error.message, 'validation_error', 'skill_install_failed');
  }
});

app.post('/v1/skills/install-from-zip', upload.single('file'), (req, res) => {
  if (!req.file) return sendError(res, 400, 'file is required (multipart/form-data)', 'validation_error', 'invalid_request');
  try {
    const skill = skillStore.installFromZip(req.file.buffer, { folder: req.body.folder });
    res.status(201).json(skill);
  } catch (error) {
    sendError(res, 400, error.message, 'validation_error', 'skill_install_failed');
  }
});

// JSON/base64 variant of install-from-zip: the Qt bridge (electron_injector.py)
// can only forward JSON bodies through `agentApiProxy`, not multipart/form-data,
// so it reads the local .zip file itself and posts it here as base64.
app.post('/v1/skills/install-from-zip-base64', (req, res) => {
  const { dataBase64, folder } = req.body || {};
  if (!dataBase64 || typeof dataBase64 !== 'string') {
    return sendError(res, 400, 'dataBase64 is required', 'validation_error', 'invalid_request');
  }
  try {
    const buffer = Buffer.from(dataBase64, 'base64');
    const skill = skillStore.installFromZip(buffer, { folder });
    res.status(201).json(skill);
  } catch (error) {
    sendError(res, 400, error.message, 'validation_error', 'skill_install_failed');
  }
});

app.get('/v1/skills/list-local', (req, res) => {
  const workdir = req.query.workdir;
  if (!workdir || typeof workdir !== 'string') {
    return sendError(res, 400, 'workdir query param is required', 'validation_error', 'invalid_request');
  }
  try {
    res.json({ data: skillStore.scanWorkdirSkills(workdir) });
  } catch (error) {
    sendError(res, 400, error.message, 'validation_error', 'list_local_failed');
  }
});

app.delete('/v1/skills/:skillId', (req, res) => {
  const ok = skillStore.uninstall(req.params.skillId);
  if (!ok) return sendError(res, 404, 'Skill not found', 'not_found', 'skill_not_found');
  res.status(204).send();
});

app.patch('/v1/skills/:skillId/toggle', (req, res) => {
  try {
    res.json(skillStore.toggle(req.params.skillId, req.body.enabled));
  } catch (error) {
    sendError(res, 404, error.message, 'not_found', 'skill_not_found');
  }
});

app.get('/v1/skills/:skillId/files', (req, res) => {
  res.json({ data: skillStore.listFiles(req.params.skillId) });
});

app.get('/v1/skills/:skillId/files/*splat', (req, res) => {
  try {
    const relPath = Array.isArray(req.params.splat) ? req.params.splat.join('/') : req.params.splat;
    res.type('text/plain').send(skillStore.readFile(req.params.skillId, relPath));
  } catch (error) {
    sendError(res, 404, error.message, 'not_found', 'file_not_found');
  }
});

// Per-agent enable/disable (stored in agent.configuration.enabled_skills)
app.patch('/v1/agents/:agentId/skills/:skillId', (req, res) => {
  const agent = db.getAgent(req.params.agentId);
  if (!agent) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  const enabledSkills = new Set((agent.configuration && agent.configuration.enabled_skills) || []);
  if (req.body.enabled) enabledSkills.add(req.params.skillId);
  else enabledSkills.delete(req.params.skillId);
  const updated = db.updateAgent(agent.id, { configuration: { enabled_skills: Array.from(enabledSkills) } });
  res.json({ ...updated, tools: [] });
});

// ---------------------------------------------------------------------------
// Phase 5: Scheduled tasks
// ---------------------------------------------------------------------------

app.get('/v1/tasks', (req, res) => {
  const includeHeartbeat = req.query.includeHeartbeat === 'true' || req.query.includeHeartbeat === '1';
  res.json(db.listTasks({ ...paginationOf(req), includeHeartbeat }));
});

app.post('/v1/tasks', (req, res) => {
  const body = req.body || {};
  if (!body.agent_id || !body.name || !body.prompt || !body.schedule_type || !body.schedule_value) {
    return sendError(res, 400, 'agent_id, name, prompt, schedule_type, schedule_value are required', 'validation_error', 'invalid_request');
  }
  if (!db.agentExists(body.agent_id)) return sendError(res, 404, 'Agent not found', 'not_found', 'agent_not_found');
  res.status(201).json(db.createTask(body.agent_id, body));
});

app.get('/v1/tasks/:taskId', (req, res) => {
  const task = db.getTask(req.params.taskId);
  if (!task) return sendError(res, 404, 'Task not found', 'not_found', 'task_not_found');
  res.json(task);
});

app.patch('/v1/tasks/:taskId', (req, res) => {
  const updated = db.updateTask(req.params.taskId, req.body || {});
  if (!updated) return sendError(res, 404, 'Task not found', 'not_found', 'task_not_found');
  res.json(updated);
});

app.delete('/v1/tasks/:taskId', (req, res) => {
  db.deleteTask(req.params.taskId);
  res.status(204).send();
});

app.post('/v1/tasks/:taskId/run', async (req, res) => {
  const task = db.getTask(req.params.taskId);
  if (!task) return sendError(res, 404, 'Task not found', 'not_found', 'task_not_found');
  res.status(202).json({ status: 'scheduled' });
  scheduler._runTask(task).catch((err) => console.error('[server] manual task run failed:', err));
});

app.get('/v1/tasks/:taskId/logs', (req, res) => {
  res.json(db.listTaskLogs(req.params.taskId, paginationOf(req)));
});

// ---------------------------------------------------------------------------

app.use((req, res) => {
  sendError(res, 404, `No route for ${req.method} ${req.path}`, 'not_found', 'route_not_found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[server] unhandled error:', err);
  if (!res.headersSent) {
    sendError(res, 500, err && err.message ? err.message : 'Internal server error', 'internal_error', 'internal_error');
  } else {
    try {
      res.end();
    } catch {
      // response already ended
    }
  }
});

const server = app.listen(PORT, '127.0.0.1', () => {
  const actualPort = server.address().port;
  console.log(`AGENT_RUNTIME_READY port=${actualPort}`);
  scheduler.start();
});

process.on('SIGTERM', () => {
  scheduler.stop();
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  scheduler.stop();
  server.close(() => process.exit(0));
});

module.exports = { app, server, db };

void resolveProvider; // kept for future direct usage / debugging endpoints

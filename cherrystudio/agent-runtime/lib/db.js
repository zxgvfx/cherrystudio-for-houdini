'use strict';

/**
 * SQLite persistence for the Houdini agent-runtime sidecar.
 *
 * This is a purpose-built, simplified schema (not the full official Drizzle
 * migration chain) that covers what the Houdini frontend actually needs:
 * agents, sessions, session messages, scheduled tasks + run logs.
 * REST/SSE contract shape matches the official `src/main/apiServer/routes/agents/*`
 * so `AgentApiClient` on the frontend works unmodified.
 */

const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Database = require('better-sqlite3');

function nowIso() {
  return new Date().toISOString();
}

function newId(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString('hex')}`;
}

class AgentDb {
  constructor(dbPath) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    this._migrate();
  }

  _migrate() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL DEFAULT 'claude-code',
        name TEXT,
        description TEXT,
        accessible_paths TEXT NOT NULL DEFAULT '[]',
        instructions TEXT,
        model TEXT NOT NULL,
        plan_model TEXT,
        small_model TEXT,
        mcps TEXT DEFAULT '[]',
        allowed_tools TEXT DEFAULT '[]',
        slash_commands TEXT DEFAULT '[]',
        configuration TEXT DEFAULT '{}',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        agent_type TEXT NOT NULL DEFAULT 'claude-code',
        name TEXT,
        description TEXT,
        accessible_paths TEXT NOT NULL DEFAULT '[]',
        instructions TEXT,
        model TEXT NOT NULL,
        plan_model TEXT,
        small_model TEXT,
        mcps TEXT DEFAULT '[]',
        allowed_tools TEXT DEFAULT '[]',
        slash_commands TEXT DEFAULT '[]',
        configuration TEXT DEFAULT '{}',
        sdk_session_id TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS session_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT,
        agent_session_id TEXT,
        metadata TEXT DEFAULT '{}',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS scheduled_tasks (
        id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        name TEXT NOT NULL,
        prompt TEXT NOT NULL,
        schedule_type TEXT NOT NULL,
        schedule_value TEXT NOT NULL,
        timeout_minutes INTEGER NOT NULL DEFAULT 2,
        channel_ids TEXT DEFAULT '[]',
        next_run TEXT,
        last_run TEXT,
        last_result TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS task_run_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT NOT NULL,
        session_id TEXT,
        run_at TEXT NOT NULL,
        duration_ms INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL,
        result TEXT,
        error TEXT,
        FOREIGN KEY (task_id) REFERENCES scheduled_tasks(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_sessions_agent_id ON sessions(agent_id);
      CREATE INDEX IF NOT EXISTS idx_messages_session_id ON session_messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_task_logs_task_id ON task_run_logs(task_id);
    `);

    // Best-effort additive migrations for columns introduced after the initial
    // release of this simplified schema (better-sqlite3 has no ADD COLUMN IF
    // NOT EXISTS, so we probe and ignore "duplicate column" errors).
    for (const stmt of [
      "ALTER TABLE scheduled_tasks ADD COLUMN session_id TEXT",
      "ALTER TABLE agents ADD COLUMN soul_workspace TEXT"
    ]) {
      try {
        this.db.exec(stmt);
      } catch {
        // column already exists
      }
    }

    // Backfill rows created before `timeout_minutes` had a NOT NULL DEFAULT so
    // they still satisfy the frontend's `z.number()` (non-nullable) schema.
    this.db.exec("UPDATE scheduled_tasks SET timeout_minutes = 2 WHERE timeout_minutes IS NULL");
  }

  // ---------------- Agents ----------------

  listAgents({ limit = 20, offset = 0, sortBy = 'sort_order', orderBy = 'asc' } = {}) {
    const sortCol = ['created_at', 'updated_at', 'name', 'sort_order'].includes(sortBy) ? sortBy : 'sort_order';
    const dir = orderBy === 'desc' ? 'DESC' : 'ASC';
    const total = this.db.prepare('SELECT COUNT(*) as c FROM agents').get().c;
    const rows = this.db
      .prepare(`SELECT * FROM agents ORDER BY ${sortCol} ${dir} LIMIT ? OFFSET ?`)
      .all(limit, offset);
    return { data: rows.map(rowToAgent), total, limit, offset };
  }

  getAgent(id) {
    const row = this.db.prepare('SELECT * FROM agents WHERE id = ?').get(id);
    return row ? rowToAgent(row) : null;
  }

  agentExists(id) {
    return !!this.db.prepare('SELECT 1 FROM agents WHERE id = ?').get(id);
  }

  createAgent(form) {
    const id = newId('agent');
    const ts = nowIso();
    const maxOrder = this.db.prepare('SELECT MAX(sort_order) as m FROM agents').get().m || 0;
    this.db
      .prepare(
        `INSERT INTO agents
        (id, type, name, description, accessible_paths, instructions, model, plan_model, small_model, mcps, allowed_tools, slash_commands, configuration, sort_order, created_at, updated_at)
        VALUES (@id, @type, @name, @description, @accessible_paths, @instructions, @model, @plan_model, @small_model, @mcps, @allowed_tools, @slash_commands, @configuration, @sort_order, @created_at, @updated_at)`
      )
      .run({
        id,
        type: form.type || 'claude-code',
        name: form.name ?? null,
        description: form.description ?? null,
        accessible_paths: JSON.stringify(form.accessible_paths || []),
        instructions: form.instructions ?? null,
        model: form.model,
        plan_model: form.plan_model ?? null,
        small_model: form.small_model ?? null,
        mcps: JSON.stringify(form.mcps || []),
        allowed_tools: JSON.stringify(form.allowed_tools || []),
        slash_commands: JSON.stringify(form.slash_commands || []),
        configuration: JSON.stringify(form.configuration || {}),
        sort_order: maxOrder + 1,
        created_at: ts,
        updated_at: ts
      });
    return this.getAgent(id);
  }

  updateAgent(id, patch) {
    const existing = this.db.prepare('SELECT * FROM agents WHERE id = ?').get(id);
    if (!existing) return null;
    const merged = mergeEntityRow(existing, patch);
    merged.updated_at = nowIso();
    this.db
      .prepare(
        `UPDATE agents SET name=@name, description=@description, accessible_paths=@accessible_paths,
         instructions=@instructions, model=@model, plan_model=@plan_model, small_model=@small_model,
         mcps=@mcps, allowed_tools=@allowed_tools, slash_commands=@slash_commands, configuration=@configuration,
         updated_at=@updated_at WHERE id=@id`
      )
      .run(merged);
    return this.getAgent(id);
  }

  deleteAgent(id) {
    this.db.prepare('DELETE FROM sessions WHERE agent_id = ?').run(id);
    this.db.prepare('DELETE FROM agents WHERE id = ?').run(id);
  }

  reorderAgents(orderedIds) {
    const stmt = this.db.prepare('UPDATE agents SET sort_order = ? WHERE id = ?');
    const tx = this.db.transaction((ids) => {
      ids.forEach((id, idx) => stmt.run(idx, id));
    });
    tx(orderedIds);
  }

  // ---------------- Sessions ----------------

  listSessions(agentId, { limit = 20, offset = 0, sortBy = 'sort_order', orderBy = 'asc' } = {}) {
    const sortCol = ['created_at', 'updated_at', 'name', 'sort_order'].includes(sortBy) ? sortBy : 'sort_order';
    const dir = orderBy === 'desc' ? 'DESC' : 'ASC';
    const total = this.db.prepare('SELECT COUNT(*) as c FROM sessions WHERE agent_id = ?').get(agentId).c;
    const rows = this.db
      .prepare(`SELECT * FROM sessions WHERE agent_id = ? ORDER BY ${sortCol} ${dir} LIMIT ? OFFSET ?`)
      .all(agentId, limit, offset);
    return { data: rows.map(rowToSession), total, limit, offset };
  }

  getSession(agentId, sessionId) {
    const row = this.db.prepare('SELECT * FROM sessions WHERE id = ? AND agent_id = ?').get(sessionId, agentId);
    return row ? rowToSession(row) : null;
  }

  getSessionById(sessionId) {
    const row = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    return row ? rowToSession(row) : null;
  }

  createSession(agentId, form) {
    const id = newId('sess');
    const ts = nowIso();
    const maxOrder = this.db.prepare('SELECT MAX(sort_order) as m FROM sessions WHERE agent_id = ?').get(agentId).m || 0;
    this.db
      .prepare(
        `INSERT INTO sessions
        (id, agent_id, agent_type, name, description, accessible_paths, instructions, model, plan_model, small_model, mcps, allowed_tools, slash_commands, configuration, sort_order, created_at, updated_at)
        VALUES (@id, @agent_id, @agent_type, @name, @description, @accessible_paths, @instructions, @model, @plan_model, @small_model, @mcps, @allowed_tools, @slash_commands, @configuration, @sort_order, @created_at, @updated_at)`
      )
      .run({
        id,
        agent_id: agentId,
        agent_type: 'claude-code',
        name: form.name ?? null,
        description: form.description ?? null,
        accessible_paths: JSON.stringify(form.accessible_paths || []),
        instructions: form.instructions ?? null,
        model: form.model,
        plan_model: form.plan_model ?? null,
        small_model: form.small_model ?? null,
        mcps: JSON.stringify(form.mcps || []),
        allowed_tools: JSON.stringify(form.allowed_tools || []),
        slash_commands: JSON.stringify(form.slash_commands || []),
        configuration: JSON.stringify(form.configuration || {}),
        sort_order: maxOrder + 1,
        created_at: ts,
        updated_at: ts
      });
    return this.getSession(agentId, id);
  }

  updateSession(agentId, sessionId, patch) {
    const existing = this.db.prepare('SELECT * FROM sessions WHERE id = ? AND agent_id = ?').get(sessionId, agentId);
    if (!existing) return null;
    const merged = mergeEntityRow(existing, patch);
    merged.updated_at = nowIso();
    this.db
      .prepare(
        `UPDATE sessions SET name=@name, description=@description, accessible_paths=@accessible_paths,
         instructions=@instructions, model=@model, plan_model=@plan_model, small_model=@small_model,
         mcps=@mcps, allowed_tools=@allowed_tools, slash_commands=@slash_commands, configuration=@configuration,
         updated_at=@updated_at WHERE id=@id`
      )
      .run(merged);
    return this.getSession(agentId, sessionId);
  }

  setSdkSessionId(sessionId, sdkSessionId) {
    this.db.prepare('UPDATE sessions SET sdk_session_id = ? WHERE id = ?').run(sdkSessionId, sessionId);
  }

  /**
   * Persists a "always allow this tool" decision (Phase 3 permission bridge)
   * by appending `toolName` to the session's `allowed_tools` column, so
   * future turns auto-approve it without prompting again.
   */
  addSessionAllowedTool(sessionId, toolName) {
    const row = this.db.prepare('SELECT allowed_tools FROM sessions WHERE id = ?').get(sessionId);
    if (!row) return;
    const tools = safeJson(row.allowed_tools, []);
    if (!tools.includes(toolName)) {
      tools.push(toolName);
      this.db.prepare('UPDATE sessions SET allowed_tools = ?, updated_at = ? WHERE id = ?')
        .run(JSON.stringify(tools), nowIso(), sessionId);
    }
  }

  getSdkSessionId(sessionId) {
    const row = this.db.prepare('SELECT sdk_session_id FROM sessions WHERE id = ?').get(sessionId);
    return row ? row.sdk_session_id : null;
  }

  deleteSession(agentId, sessionId) {
    this.db.prepare('DELETE FROM session_messages WHERE session_id = ?').run(sessionId);
    this.db.prepare('DELETE FROM sessions WHERE id = ? AND agent_id = ?').run(sessionId, agentId);
  }

  reorderSessions(agentId, orderedIds) {
    const stmt = this.db.prepare('UPDATE sessions SET sort_order = ? WHERE id = ? AND agent_id = ?');
    const tx = this.db.transaction((ids) => {
      ids.forEach((id, idx) => stmt.run(idx, id, agentId));
    });
    tx(orderedIds);
  }

  // ---------------- Session Messages ----------------

  listMessages(sessionId) {
    const rows = this.db
      .prepare('SELECT * FROM session_messages WHERE session_id = ? ORDER BY id ASC')
      .all(sessionId);
    return rows.map(rowToMessage);
  }

  appendMessage(sessionId, { role, content, agentSessionId, metadata }) {
    const ts = nowIso();
    const info = this.db
      .prepare(
        `INSERT INTO session_messages (session_id, role, content, agent_session_id, metadata, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(sessionId, role, JSON.stringify(content ?? null), agentSessionId || null, JSON.stringify(metadata || {}), ts, ts);
    return this.getMessage(info.lastInsertRowid);
  }

  getMessage(id) {
    const row = this.db.prepare('SELECT * FROM session_messages WHERE id = ?').get(id);
    return row ? rowToMessage(row) : null;
  }

  deleteMessage(sessionId, messageId) {
    const info = this.db
      .prepare('DELETE FROM session_messages WHERE id = ? AND session_id = ?')
      .run(messageId, sessionId);
    return info.changes > 0;
  }

  // ---------------- Tasks ----------------

  /**
   * @param {object} opts
   * @param {boolean} [opts.includeHeartbeat] - By default the synthetic
   *   `heartbeat` task (see `ensureHeartbeatTask`) is hidden from listings so
   *   it doesn't clutter the user-facing Tasks tab, mirroring the official
   *   `TaskService.listTasks(..., { includeHeartbeat: false })` default.
   */
  listTasks({ limit = 20, offset = 0, includeHeartbeat = false } = {}) {
    const where = includeHeartbeat ? '' : "WHERE name != 'heartbeat'";
    const total = this.db.prepare(`SELECT COUNT(*) as c FROM scheduled_tasks ${where}`).get().c;
    const rows = this.db
      .prepare(`SELECT * FROM scheduled_tasks ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
      .all(limit, offset);
    return { data: rows.map(rowToTask), total, limit, offset };
  }

  listActiveTasks() {
    return this.db.prepare("SELECT * FROM scheduled_tasks WHERE status = 'active'").all().map(rowToTask);
  }

  findHeartbeatTask(agentId) {
    const row = this.db
      .prepare("SELECT * FROM scheduled_tasks WHERE agent_id = ? AND name = 'heartbeat'")
      .get(agentId);
    return row ? rowToTask(row) : null;
  }

  /**
   * Creates (or updates the interval of) the per-agent synthetic `heartbeat`
   * task, mirroring `SchedulerService.ensureHeartbeatTask`. The task's prompt
   * is a sentinel (`__heartbeat__`) — the actual prompt text is assembled at
   * run time from `{workspace}/heartbeat.md` (see `scheduler.js`).
   */
  ensureHeartbeatTask(agentId, intervalMinutes = 30) {
    const existing = this.findHeartbeatTask(agentId);
    const value = String(intervalMinutes);
    if (existing) {
      if (existing.schedule_value !== value) {
        return this.updateTask(existing.id, { schedule_value: value });
      }
      return existing;
    }
    return this.createTask(agentId, {
      name: 'heartbeat',
      prompt: '__heartbeat__',
      schedule_type: 'interval',
      schedule_value: value
    });
  }

  getTask(id) {
    const row = this.db.prepare('SELECT * FROM scheduled_tasks WHERE id = ?').get(id);
    return row ? rowToTask(row) : null;
  }

  createTask(agentId, task) {
    const id = newId('task');
    const ts = nowIso();
    this.db
      .prepare(
        `INSERT INTO scheduled_tasks
        (id, agent_id, name, prompt, schedule_type, schedule_value, timeout_minutes, channel_ids, status, created_at, updated_at)
        VALUES (@id, @agent_id, @name, @prompt, @schedule_type, @schedule_value, @timeout_minutes, @channel_ids, 'active', @created_at, @updated_at)`
      )
      .run({
        id,
        agent_id: agentId,
        name: task.name,
        prompt: task.prompt,
        schedule_type: task.schedule_type,
        schedule_value: task.schedule_value,
        timeout_minutes: task.timeout_minutes ?? 2,
        channel_ids: JSON.stringify(task.channel_ids || []),
        created_at: ts,
        updated_at: ts
      });
    return this.getTask(id);
  }

  updateTask(id, patch) {
    const existing = this.db.prepare('SELECT * FROM scheduled_tasks WHERE id = ?').get(id);
    if (!existing) return null;
    const merged = { ...existing, ...patch, updated_at: nowIso() };
    if (patch.channel_ids) merged.channel_ids = JSON.stringify(patch.channel_ids);
    if ('timeout_minutes' in patch) merged.timeout_minutes = patch.timeout_minutes ?? 2;
    this.db
      .prepare(
        `UPDATE scheduled_tasks SET name=@name, prompt=@prompt, agent_id=@agent_id, schedule_type=@schedule_type,
         schedule_value=@schedule_value, timeout_minutes=@timeout_minutes, channel_ids=@channel_ids,
         next_run=@next_run, last_run=@last_run, last_result=@last_result, status=@status, updated_at=@updated_at
         WHERE id=@id`
      )
      .run(merged);
    return this.getTask(id);
  }

  deleteTask(id) {
    this.db.prepare('DELETE FROM task_run_logs WHERE task_id = ?').run(id);
    this.db.prepare('DELETE FROM scheduled_tasks WHERE id = ?').run(id);
  }

  setTaskSessionId(taskId, sessionId) {
    this.db.prepare('UPDATE scheduled_tasks SET session_id = ? WHERE id = ?').run(sessionId, taskId);
  }

  addTaskLog(taskId, { sessionId, durationMs, status, result, error }) {
    this.db
      .prepare(
        `INSERT INTO task_run_logs (task_id, session_id, run_at, duration_ms, status, result, error)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(taskId, sessionId || null, nowIso(), durationMs || 0, status, result || null, error || null);
  }

  listTaskLogs(taskId, { limit = 20, offset = 0 } = {}) {
    const total = this.db.prepare('SELECT COUNT(*) as c FROM task_run_logs WHERE task_id = ?').get(taskId).c;
    const rows = this.db
      .prepare('SELECT * FROM task_run_logs WHERE task_id = ? ORDER BY id DESC LIMIT ? OFFSET ?')
      .all(taskId, limit, offset);
    return {
      data: rows.map((r) => ({
        id: r.id,
        task_id: r.task_id,
        session_id: r.session_id,
        run_at: r.run_at,
        duration_ms: r.duration_ms,
        status: r.status,
        result: r.result,
        error: r.error
      })),
      total,
      limit,
      offset
    };
  }
}

function safeJson(str, fallback) {
  if (str === null || str === undefined) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function rowToAgent(row) {
  return {
    id: row.id,
    type: row.type,
    name: row.name ?? undefined,
    description: row.description ?? undefined,
    accessible_paths: safeJson(row.accessible_paths, []),
    instructions: row.instructions ?? undefined,
    model: row.model,
    plan_model: row.plan_model ?? undefined,
    small_model: row.small_model ?? undefined,
    mcps: safeJson(row.mcps, []),
    allowed_tools: safeJson(row.allowed_tools, []),
    slash_commands: safeJson(row.slash_commands, []),
    configuration: safeJson(row.configuration, {}),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function rowToSession(row) {
  return {
    id: row.id,
    agent_id: row.agent_id,
    agent_type: row.agent_type,
    name: row.name ?? undefined,
    description: row.description ?? undefined,
    accessible_paths: safeJson(row.accessible_paths, []),
    instructions: row.instructions ?? undefined,
    model: row.model,
    plan_model: row.plan_model ?? undefined,
    small_model: row.small_model ?? undefined,
    mcps: safeJson(row.mcps, []),
    allowed_tools: safeJson(row.allowed_tools, []),
    slash_commands: safeJson(row.slash_commands, []),
    configuration: safeJson(row.configuration, {}),
    sdk_session_id: row.sdk_session_id ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function rowToMessage(row) {
  return {
    id: row.id,
    session_id: row.session_id,
    role: row.role,
    content: safeJson(row.content, null),
    agent_session_id: row.agent_session_id ?? undefined,
    metadata: safeJson(row.metadata, {}),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function rowToTask(row) {
  return {
    id: row.id,
    agent_id: row.agent_id,
    name: row.name,
    prompt: row.prompt,
    schedule_type: row.schedule_type,
    schedule_value: row.schedule_value,
    timeout_minutes: row.timeout_minutes ?? 2,
    channel_ids: safeJson(row.channel_ids, []),
    next_run: row.next_run ?? null,
    last_run: row.last_run ?? null,
    last_result: row.last_result ?? null,
    status: row.status,
    session_id: row.session_id ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function mergeEntityRow(existingRow, patch) {
  const merged = { ...existingRow };
  if (patch.name !== undefined) merged.name = patch.name;
  if (patch.description !== undefined) merged.description = patch.description;
  if (patch.accessible_paths !== undefined) merged.accessible_paths = JSON.stringify(patch.accessible_paths);
  if (patch.instructions !== undefined) merged.instructions = patch.instructions;
  if (patch.model !== undefined) merged.model = patch.model;
  if (patch.plan_model !== undefined) merged.plan_model = patch.plan_model;
  if (patch.small_model !== undefined) merged.small_model = patch.small_model;
  if (patch.mcps !== undefined) merged.mcps = JSON.stringify(patch.mcps);
  if (patch.allowed_tools !== undefined) merged.allowed_tools = JSON.stringify(patch.allowed_tools);
  if (patch.slash_commands !== undefined) merged.slash_commands = JSON.stringify(patch.slash_commands);
  if (patch.configuration !== undefined) {
    const prevConfig = safeJson(existingRow.configuration, {});
    merged.configuration = JSON.stringify({ ...prevConfig, ...patch.configuration });
  }
  return merged;
}

module.exports = { AgentDb, newId, nowIso };

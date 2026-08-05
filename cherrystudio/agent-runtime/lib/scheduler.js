'use strict';

/**
 * Minimal port of the official `SchedulerService` (Phase 5).
 *
 * Polls `scheduled_tasks` roughly every minute, works out which tasks are
 * due, and runs their prompt through the same `runTurn()` used for regular
 * chat messages — persisting the exchange into a task-dedicated session so
 * results show up in the session history like desktop Cherry Studio.
 *
 * Cron support is intentionally minimal (5-field `m h dom mon dow`,
 * evaluated once per polling tick) rather than a full parser dependency.
 */

const { runTurn, resolveWorkspace } = require('./claudeRunner');
const { readHeartbeat } = require('./cherryclaw');

const POLL_INTERVAL_MS = 60 * 1000;

function matchesCronField(field, value, min, max) {
  if (field === '*') return true;
  return field.split(',').some((part) => {
    const stepMatch = part.match(/^(\*|\d+(-\d+)?)\/(\d+)$/);
    if (stepMatch) {
      const step = Number(stepMatch[3]);
      const base = stepMatch[1] === '*' ? min : Number(stepMatch[1].split('-')[0]);
      return (value - base) >= 0 && (value - base) % step === 0;
    }
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const lo = Number(rangeMatch[1]);
      const hi = Number(rangeMatch[2]);
      return value >= lo && value <= hi;
    }
    return Number(part) === value;
  });
}

/** Very small 5-field cron matcher: `minute hour day-of-month month day-of-week`. */
function cronMatchesNow(expr, now) {
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return false;
  const [min, hour, dom, mon, dow] = fields;
  return (
    matchesCronField(min, now.getMinutes(), 0, 59) &&
    matchesCronField(hour, now.getHours(), 0, 23) &&
    matchesCronField(dom, now.getDate(), 1, 31) &&
    matchesCronField(mon, now.getMonth() + 1, 1, 12) &&
    matchesCronField(dow, now.getDay(), 0, 6)
  );
}

function isDue(task, now) {
  if (task.status !== 'active') return false;

  if (task.schedule_type === 'once') {
    if (task.last_run) return false;
    const target = new Date(task.schedule_value);
    return !Number.isNaN(target.getTime()) && target.getTime() <= now.getTime();
  }

  if (task.schedule_type === 'interval') {
    const minutes = Number(task.schedule_value);
    if (!Number.isFinite(minutes) || minutes <= 0) return false;
    if (!task.last_run) return true;
    const last = new Date(task.last_run).getTime();
    return now.getTime() - last >= minutes * 60 * 1000;
  }

  if (task.schedule_type === 'cron') {
    // Dedupe within the same minute using last_run.
    if (task.last_run) {
      const last = new Date(task.last_run);
      if (last.getFullYear() === now.getFullYear() &&
          last.getMonth() === now.getMonth() &&
          last.getDate() === now.getDate() &&
          last.getHours() === now.getHours() &&
          last.getMinutes() === now.getMinutes()) {
        return false;
      }
    }
    try {
      return cronMatchesNow(task.schedule_value, now);
    } catch {
      return false;
    }
  }

  return false;
}

class Scheduler {
  constructor({ db, appDataDir, agentRuntimeHome }) {
    this.db = db;
    this.appDataDir = appDataDir;
    this.agentRuntimeHome = agentRuntimeHome;
    this.timer = null;
    this.running = new Set();
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick().catch((err) => console.error('[scheduler] tick failed:', err)), POLL_INTERVAL_MS);
    // Also do an initial tick shortly after boot so `once` tasks in the past run promptly.
    setTimeout(() => this.tick().catch((err) => console.error('[scheduler] initial tick failed:', err)), 5000);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async tick() {
    const now = new Date();
    // Heartbeats are regular `scheduled_tasks` rows (see `ensureHeartbeatTask`
    // in db.js) so they naturally flow through the same due-check/run loop as
    // user-created tasks — no separate polling path needed.
    const tasks = this.db.listActiveTasks();
    for (const task of tasks) {
      if (this.running.has(task.id)) continue;
      if (isDue(task, now)) {
        this.running.add(task.id);
        this._runTask(task).finally(() => this.running.delete(task.id));
      }
    }
  }

  async _runTask(task) {
    const startedAt = Date.now();
    const agent = this.db.getAgent(task.agent_id);
    if (!agent) {
      this.db.addTaskLog(task.id, { status: 'error', error: 'Agent not found', durationMs: 0 });
      return;
    }

    const isHeartbeat = task.name === 'heartbeat';
    const config = agent.configuration || {};
    const workspacePath = agent.accessible_paths && agent.accessible_paths[0];

    // Heartbeat-specific gating, mirrors `SchedulerService.runTask`: skip
    // silently (but still advance `last_run` so it doesn't refire next tick)
    // if disabled or there's nothing to do.
    if (isHeartbeat) {
      if (config.heartbeat_enabled === false || !workspacePath) {
        // Mirrors `SchedulerService.runTask`: no run-log entry for a skipped
        // heartbeat, just advance `last_run` so it doesn't refire immediately.
        this.db.updateTask(task.id, { last_run: new Date().toISOString(), last_result: 'Skipped (disabled)' });
        return;
      }
    }

    let session = task.session_id ? this.db.getSession(agent.id, task.session_id) : null;
    if (!session) {
      session = this.db.createSession(agent.id, {
        name: isHeartbeat ? 'Heartbeat' : `[Task] ${task.name}`,
        model: agent.model,
        accessible_paths: agent.accessible_paths,
        allowed_tools: agent.allowed_tools,
        instructions: agent.instructions,
        configuration: agent.configuration
      });
      this.db.setTaskSessionId(task.id, session.id);
    }

    let prompt = task.prompt;
    if (isHeartbeat) {
      const cwd = resolveWorkspace(this.agentRuntimeHome, agent, session);
      const heartbeatContent = readHeartbeat(cwd);
      if (!heartbeatContent) {
        this.db.updateTask(task.id, { last_run: new Date().toISOString(), last_result: 'Skipped (no file)' });
        return;
      }
      prompt = [
        '[Heartbeat]',
        'This is a periodic heartbeat. The instructions below are from your heartbeat.md file.',
        'Process each item, take action where possible, and use the notify tool to alert the user of important results.',
        '',
        '---',
        heartbeatContent
      ].join('\n');
    }

    let resultText = '';
    let status = 'success';
    let errorMessage;

    try {
      const abortController = new AbortController();
      const timeoutMs = (task.timeout_minutes || 10) * 60 * 1000;
      const timer = setTimeout(() => abortController.abort('Task timed out'), timeoutMs);

      this.db.appendMessage(session.id, {
        role: 'user',
        content: prompt,
        agentSessionId: session.sdk_session_id
      });

      try {
        await runTurn({
          agent,
          session,
          content: prompt,
          db: this.db,
          appDataDir: this.appDataDir,
          agentRuntimeHome: this.agentRuntimeHome,
          abortController,
          onChunk: (chunk) => {
            if (chunk.type === 'text-delta' && typeof chunk.text === 'string') {
              resultText += chunk.text;
            }
            if (chunk.type === 'error') {
              errorMessage = chunk.error && chunk.error.message;
            }
          }
        });
      } finally {
        clearTimeout(timer);
        if (resultText.trim()) {
          this.db.appendMessage(session.id, {
            role: 'assistant',
            content: resultText,
            agentSessionId: this.db.getSdkSessionId(session.id)
          });
        }
      }
    } catch (err) {
      status = 'error';
      errorMessage = err && err.message ? err.message : String(err);
    }

    const durationMs = Date.now() - startedAt;
    this.db.addTaskLog(task.id, {
      sessionId: session.id,
      durationMs,
      status: errorMessage ? 'error' : status,
      result: resultText || undefined,
      error: errorMessage
    });

    const patch = {
      last_run: new Date().toISOString(),
      last_result: errorMessage ? `Error: ${errorMessage}` : resultText.slice(0, 2000)
    };
    if (task.schedule_type === 'once') {
      patch.status = 'completed';
    }
    this.db.updateTask(task.id, patch);
  }
}

module.exports = { Scheduler, isDue, cronMatchesNow };

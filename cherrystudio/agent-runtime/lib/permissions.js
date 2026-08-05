'use strict';

/**
 * Bridges the Claude Agent SDK's `canUseTool` callback to an external
 * approval UI (PySide6 native dialog in the Houdini plugin) via SSE.
 *
 * Flow:
 *  1. sidecar's `canUseTool` calls `requestPermission(...)`, which creates a
 *     pending entry and broadcasts a `permission_request` SSE event to every
 *     subscriber of `GET /v1/agent-permission-events`.
 *  2. Python subscribes to that SSE stream, shows a native dialog, and
 *     `POST /v1/agent-permission-events/:id/respond`s with the user's choice.
 *  3. `respond()` resolves the pending promise, unblocking the SDK's tool call.
 *
 * If nobody is subscribed (Python bridge not running / Phase 3 not wired up
 * yet), requests fall back to `autoApprove` after a short grace period so the
 * sidecar remains usable standalone (Phase 2 behaviour).
 */

const { EventEmitter } = require('node:events');
const crypto = require('node:crypto');

const DEFAULT_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const NO_SUBSCRIBER_FALLBACK_MS = 15 * 1000; // auto-allow if nobody is listening

class PermissionBroker extends EventEmitter {
  constructor() {
    super();
    this.pending = new Map(); // id -> { resolve, timeout, sessionId, toolName, input }
    this.subscribers = new Set(); // Set<express.Response>
  }

  subscribe(res) {
    this.subscribers.add(res);
    return () => this.subscribers.delete(res);
  }

  _broadcast(event) {
    const payload = `data: ${JSON.stringify(event)}\n\n`;
    for (const res of this.subscribers) {
      try {
        res.write(payload);
      } catch {
        // dead connection, will be cleaned up on 'close'
      }
    }
  }

  hasSubscribers() {
    return this.subscribers.size > 0;
  }

  /**
   * @param {string} toolName
   * @param {Record<string, unknown>} input
   * @param {{sessionId: string, toolCallId: string, autoApprove?: boolean, title?: string, description?: string, onAlwaysAllow?: (toolName: string) => void}} ctx
   * @returns {Promise<{behavior: 'allow'|'deny', updatedInput?: any, message?: string}>}
   */
  requestPermission(toolName, input, ctx) {
    if (ctx.autoApprove) {
      return Promise.resolve({ behavior: 'allow', updatedInput: input });
    }

    const id = crypto.randomUUID();
    const hasSubs = this.hasSubscribers();

    return new Promise((resolve) => {
      const timeoutMs = hasSubs ? DEFAULT_TIMEOUT_MS : NO_SUBSCRIBER_FALLBACK_MS;
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        if (hasSubs) {
          resolve({ behavior: 'deny', message: 'Permission request timed out waiting for user response' });
        } else {
          // No approval bridge connected at all (Phase 3 not running) — allow
          // so Phase 1/2 remains usable stand-alone during development.
          resolve({ behavior: 'allow', updatedInput: input });
        }
      }, timeoutMs);

      this.pending.set(id, {
        resolve,
        timeout,
        sessionId: ctx.sessionId,
        toolName,
        input,
        onAlwaysAllow: ctx.onAlwaysAllow
      });

      this._broadcast({
        type: 'permission_request',
        id,
        sessionId: ctx.sessionId,
        toolCallId: ctx.toolCallId,
        toolName,
        input,
        title: ctx.title,
        description: ctx.description
      });
    });
  }

  /**
   * @param {string} id
   * @param {{behavior: 'allow'|'deny', updatedInput?: any, message?: string, alwaysAllow?: boolean}} decision
   */
  respond(id, decision) {
    const entry = this.pending.get(id);
    if (!entry) {
      return false;
    }
    clearTimeout(entry.timeout);
    this.pending.delete(id);

    if (decision.behavior === 'deny') {
      entry.resolve({ behavior: 'deny', message: decision.message || 'Denied by user' });
    } else {
      if (decision.alwaysAllow && typeof entry.onAlwaysAllow === 'function') {
        try {
          entry.onAlwaysAllow(entry.toolName);
        } catch {
          // best-effort; never fail the response because persistence failed
        }
      }
      entry.resolve({ behavior: 'allow', updatedInput: decision.updatedInput || entry.input });
    }

    this._broadcast({ type: 'permission_resolved', id, sessionId: entry.sessionId, decision: decision.behavior });
    return true;
  }

  listPending() {
    return Array.from(this.pending.entries()).map(([id, entry]) => ({
      id,
      sessionId: entry.sessionId,
      toolName: entry.toolName,
      input: entry.input
    }));
  }
}

module.exports = { PermissionBroker, broker: new PermissionBroker() };

'use strict';

/**
 * Phase 6: CherryClaw Soul Mode + heartbeat + persistent memory (no IM
 * channels — explicitly out of scope per the plan).
 *
 * Soul Mode agents get a richer system prompt assembled from three
 * workspace-relative files that the agent itself is expected to maintain
 * across sessions:
 *   - soul.md            long-lived personality / identity description
 *   - user.md            what the agent has learned about its user
 *   - memory/FACT.md      running list of learned facts (also used by
 *                         non-Soul agents for lightweight recall)
 *   - memory/JOURNAL.jsonl  append-only diary entries (read-only here;
 *                         writing is done by the agent itself via file tools)
 */

const fs = require('node:fs');
const path = require('node:path');

/**
 * Resolves a filename within `dir` case-insensitively (mirrors the official
 * `resolveFile()` in `cherryclaw/prompt.ts`), so `SOUL.md`/`soul.md`/`Soul.md`
 * are all treated as the same file regardless of how the agent (or a user
 * migrating from desktop Cherry Studio) happened to create it.
 */
function resolveFile(dir, name) {
  const exact = path.join(dir, name);
  if (fs.existsSync(exact)) return exact;
  try {
    const target = name.toLowerCase();
    const match = fs.readdirSync(dir).find((entry) => entry.toLowerCase() === target);
    return match ? path.join(dir, match) : undefined;
  } catch {
    return undefined;
  }
}

function readIfExists(filePath) {
  if (!filePath) return undefined;
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return undefined;
  }
}

function readResolved(dir, name) {
  return readIfExists(resolveFile(dir, name));
}

function buildToolGuidance() {
  return [
    'You have access to file tools (Read/Write/Edit/Glob/Grep) and Bash in your working directory.',
    'When you learn something durable about the user or task that would help in future sessions, append a short bullet to `memory/FACT.md` in your working directory (create it if missing).'
  ].join('\n');
}

async function buildFactsSection(cwd) {
  const facts = readResolved(path.join(cwd, 'memory'), 'FACT.md');
  if (!facts || !facts.trim()) return undefined;
  return `## Things you previously learned (memory/FACT.md)\n\n${facts.trim()}`;
}

/**
 * Assembles the Soul Mode system prompt from soul.md/user.md/memory/FACT.md.
 * Falls back to a generic bootstrap instruction on the very first run so the
 * agent knows to create these files itself.
 */
async function buildSoulSystemPrompt(cwd, agentConfig) {
  const soul = readResolved(cwd, 'soul.md');
  const user = readResolved(cwd, 'user.md');
  const facts = readResolved(path.join(cwd, 'memory'), 'FACT.md');

  const sections = [
    '# Soul Mode',
    'You are running in Soul Mode: a long-lived, semi-autonomous agent persona that persists across sessions in this workspace. Maintain continuity of identity, memory, and relationship with the user across turns.'
  ];

  if (soul && soul.trim()) {
    sections.push(`## Your identity (soul.md)\n\n${soul.trim()}`);
  } else {
    sections.push(
      '## Your identity (soul.md)\n\nYou have not written a `soul.md` yet. Create one in your working directory describing your personality, values, and how you want to behave over time.'
    );
  }

  if (user && user.trim()) {
    sections.push(`## What you know about your user (user.md)\n\n${user.trim()}`);
  }

  if (facts && facts.trim()) {
    sections.push(`## Learned facts (memory/FACT.md)\n\n${facts.trim()}`);
  }

  if (!agentConfig || !agentConfig.bootstrap_completed) {
    sections.push(
      '## First run\n\nThis looks like your first run. Introduce yourself briefly, then start filling in `soul.md`, `user.md`, and `memory/FACT.md` as you learn more.'
    );
  }

  return sections.join('\n\n');
}

/**
 * Reads `{cwd}/heartbeat.md` — the checklist the agent wrote for its own
 * periodic wake-ups. Returns `undefined` if missing/empty so callers can
 * skip the heartbeat run entirely, mirroring the official `readHeartbeat()`
 * (`services/agents/services/cherryclaw/heartbeat.ts`).
 */
function readHeartbeat(cwd) {
  const content = readResolved(cwd, 'heartbeat.md');
  return content && content.trim() ? content.trim() : undefined;
}

module.exports = { buildSoulSystemPrompt, buildToolGuidance, buildFactsSection, readHeartbeat };

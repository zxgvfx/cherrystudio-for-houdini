'use strict';

const crypto = require('node:crypto');
const { pipelineApiBase, localUsername, splitUniqueModelId } = require('./pipelineConfig');
const { readCocoMode, readCocoPermission } = require('./cocoConfig');

function genId(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
}

function firstInt(...values) {
  for (const value of values) {
    if (value == null || value === '') continue;
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) return Math.trunc(parsed);
  }
  return 0;
}

function convertPipelineUsage(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const nested = raw.usage && typeof raw.usage === 'object' ? raw.usage : raw;
  const inputTokens = firstInt(nested.inputTokens, nested.input_tokens, nested.prompt_tokens, nested.promptTokens);
  const outputTokens = firstInt(
    nested.outputTokens,
    nested.output_tokens,
    nested.completion_tokens,
    nested.completionTokens
  );
  const cacheReadTokens = firstInt(
    nested.cacheReadTokens,
    nested.cache_read_input_tokens,
    nested.cache_read_tokens
  );
  const cacheWriteTokens = firstInt(
    nested.cacheWriteTokens,
    nested.cache_creation_input_tokens,
    nested.cache_write_tokens
  );
  const reasoningTokens = firstInt(nested.reasoningTokens, nested.reasoning_tokens);
  const totalTokens = firstInt(nested.totalTokens, nested.total_tokens, inputTokens + outputTokens);
  if (!inputTokens && !outputTokens && !cacheReadTokens && !cacheWriteTokens) return null;
  return {
    inputTokens,
    outputTokens,
    totalTokens: totalTokens || inputTokens + outputTokens,
    inputTokenDetails: {
      cacheReadTokens,
      cacheWriteTokens,
      noCacheTokens: Math.max(0, inputTokens - cacheReadTokens - cacheWriteTokens)
    },
    outputTokenDetails: { textTokens: outputTokens, reasoningTokens }
  };
}

function sessionConfig(session) {
  return session && session.configuration && typeof session.configuration === 'object' ? session.configuration : {};
}

async function pipelineFetch(pathname, { method = 'GET', body, signal, headers } = {}) {
  const url = `${pipelineApiBase()}${pathname}`;
  const res = await fetch(url, {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Key': localUsername(),
      ...(headers || {})
    },
    body: body == null ? undefined : JSON.stringify(body)
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message =
      (data && data.detail) ||
      (data && data.message) ||
      (typeof data === 'string' && data) ||
      `pipeline ${method} ${pathname} failed: ${res.status}`;
    const error = new Error(typeof message === 'string' ? message : JSON.stringify(message));
    error.status = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

async function ensurePipelineSession(agent, session, db) {
  const cfg = { ...sessionConfig(session) };
  if (cfg.coco_pipeline_session_id) return { pipelineSessionId: cfg.coco_pipeline_session_id, configuration: cfg };

  const { providerId, modelId } = splitUniqueModelId(session.model || agent.model);
  const created = await pipelineFetch('/api/agents/sessions', {
    method: 'POST',
    body: {
      context: {
        actor_id: localUsername(),
        provider_id: providerId,
        model: modelId,
        mode: readCocoMode(cfg),
        permission_mode: readCocoPermission(cfg),
        allow_write: readCocoPermission(cfg) === 'auto',
        metadata: {
          coco_owned_canvas: true,
          cherry_agent_id: agent.id,
          cherry_agent_name: agent.name || '',
          cherry_session_id: session.id,
          title: session.name || '',
          provenance: {
            username: localUsername(),
            agent_name: agent.name || '-',
            agent_id: agent.id,
            title: session.name || '-'
          }
        }
      }
    }
  });
  cfg.coco_pipeline_session_id = created.id;
  cfg.coco_pipeline_revision = created.revision || 0;
  db.updateSession(agent.id, session.id, { configuration: cfg });
  return { pipelineSessionId: created.id, configuration: cfg };
}

function writeSse(onChunk, chunk) {
  onChunk(chunk);
}

function mapPipelineEvent(event, state) {
  const type = event && event.type;
  const data = (event && event.data) || {};
  const chunks = [];
  if (!state.pending) state.pending = new Map();
  if (!state.lastCallByName) state.lastCallByName = new Map();

  if (!state.started) {
    state.started = true;
    chunks.push({ type: 'start', messageId: state.messageId });
    chunks.push({ type: 'start-step' });
  }

  if (type === 'delta') {
    const text = String(data.text || data.delta || data.content || '');
    if (!text) return chunks;
    if (!state.textId) {
      state.textId = genId('txt');
      chunks.push({ type: 'text-start', id: state.textId });
    }
    chunks.push({ type: 'text-delta', id: state.textId, text });
    return chunks;
  }

  if (type === 'message' && data.role === 'assistant') {
    const text = String(data.content || '');
    // Deltas already streamed the body; the final message is a snapshot.
    if (!state.textId) {
      if (!text) return chunks;
      state.textId = genId('txt');
      chunks.push({ type: 'text-start', id: state.textId });
      chunks.push({ type: 'text-delta', id: state.textId, text });
    }
    if (state.textId) {
      chunks.push({ type: 'text-end', id: state.textId });
      state.textId = null;
    }
    return chunks;
  }

  if (type === 'tool_started') {
    if (state.textId) {
      chunks.push({ type: 'text-end', id: state.textId });
      state.textId = null;
    }
    const toolCallId = String(data.tool_call_id || data.id || genId('call'));
    const toolName = String(data.name || data.tool_name || 'tool');
    state.pending.set(toolCallId, toolName);
    state.lastCallByName.set(toolName, toolCallId);
    chunks.push({
      type: 'tool-call',
      toolCallId,
      toolName,
      input: data.arguments || data.args || {}
    });
    return chunks;
  }

  if (type === 'tool_result') {
    const named = String(data.name || data.tool_name || '');
    let toolCallId = String(data.tool_call_id || data.id || '');
    if (!toolCallId || !state.pending.has(toolCallId)) {
      toolCallId = (named && state.lastCallByName.get(named)) || toolCallId || genId('call');
    }
    const toolName = named || state.pending.get(toolCallId) || 'tool';
    state.pending.delete(toolCallId);
    if (state.lastCallByName.get(toolName) === toolCallId) state.lastCallByName.delete(toolName);
    chunks.push({
      type: 'tool-result',
      toolCallId,
      toolName,
      output: data.result != null ? data.result : data
    });
    return chunks;
  }

  if (type === 'graph_proposal') {
    const toolCallId = genId('call');
    chunks.push({
      type: 'tool-call',
      toolCallId,
      toolName: 'script.propose',
      input: { description: data.description || 'pipeline script proposal' }
    });
    chunks.push({
      type: 'tool-result',
      toolCallId,
      toolName: 'script.propose',
      output: data
    });
    return chunks;
  }

  if (type === 'error') {
    chunks.push({
      type: 'error',
      error: {
        message: String(data.message || data.error || 'COCO agent error'),
        type: 'stream_error',
        code: 'coco_pipeline_error'
      }
    });
    return chunks;
  }

  if (type === 'completed' || type === 'cancelled') {
    if (state.textId) {
      chunks.push({ type: 'text-end', id: state.textId });
      state.textId = null;
    }
    chunks.push({ type: 'finish-step' });
    const finish = { type: 'finish', finishReason: type === 'cancelled' ? 'stop' : 'end_turn' };
    const usage = convertPipelineUsage(data);
    if (usage) finish.totalUsage = usage;
    chunks.push(finish);
    state.finished = true;
  }

  return chunks;
}

async function runCocoTurn({ agent, session, content, db, abortController, onChunk }) {
  const { pipelineSessionId, configuration } = await ensurePipelineSession(agent, session, db);
  let pipelineSession = await pipelineFetch(`/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}`);
  const { providerId, modelId } = splitUniqueModelId(session.model || agent.model);
  const cfg = { ...configuration };

  const url = `${pipelineApiBase()}/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}/messages`;
  const res = await fetch(url, {
    method: 'POST',
    signal: abortController.signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/x-ndjson',
      'X-User-Key': localUsername()
    },
    body: JSON.stringify({
      content,
      expected_revision: pipelineSession.revision || 0,
      provider_id: providerId,
      model: modelId,
      mode: readCocoMode(cfg),
      permission_mode: readCocoPermission(cfg)
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `pipeline messages failed: ${res.status}`);
  }

  const state = {
    started: false,
    finished: false,
    messageId: genId('msg'),
    textId: null,
    pending: new Map(),
    lastCallByName: new Map()
  };
  writeSse(onChunk, { type: 'start', messageId: state.messageId });
  writeSse(onChunk, { type: 'start-step' });
  state.started = true;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      let event;
      try {
        event = JSON.parse(trimmed);
      } catch {
        continue;
      }
      for (const chunk of mapPipelineEvent(event, state)) {
        if (chunk.type === 'start' || chunk.type === 'start-step') continue;
        writeSse(onChunk, chunk);
      }
    }
  }

  if (!state.finished) {
    if (state.textId) writeSse(onChunk, { type: 'text-end', id: state.textId });
    writeSse(onChunk, { type: 'finish-step' });
    writeSse(onChunk, { type: 'finish' });
  }

  try {
    pipelineSession = await pipelineFetch(`/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}`);
    cfg.coco_pipeline_revision = pipelineSession.revision || cfg.coco_pipeline_revision;
    db.updateSession(agent.id, session.id, { configuration: cfg });
  } catch {
    // revision cache is best-effort
  }
}

async function applyCocoProposal(agent, session, db, body) {
  const { pipelineSessionId } = await ensurePipelineSession(agent, session, db);
  const pipelineSession = await pipelineFetch(`/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}`);
  const updated = await pipelineFetch(`/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}/canvas`, {
    method: 'PATCH',
    body: {
      graph: body && body.graph,
      after_script: body && body.after_script,
      expected_revision: pipelineSession.revision || 0
    }
  });
  const cfg = { ...sessionConfig(session) };
  cfg.coco_pipeline_revision = updated.revision || cfg.coco_pipeline_revision;
  db.updateSession(agent.id, session.id, { configuration: cfg });
  return updated;
}

async function rejectCocoProposal() {
  return { ok: true };
}

async function refreshCocoTitle(agent, session) {
  const cfg = sessionConfig(session);
  const pipelineSessionId = cfg.coco_pipeline_session_id;
  if (!pipelineSessionId) return;
  const title = session.name || '';
  await pipelineFetch(`/api/agents/sessions/${encodeURIComponent(pipelineSessionId)}/metadata`, {
    method: 'PATCH',
    body: {
      title,
      provenance: {
        username: localUsername(),
        agent_name: agent.name || '-',
        agent_id: agent.id,
        title: title || '-'
      }
    }
  });
}

module.exports = {
  ensurePipelineSession,
  runCocoTurn,
  applyCocoProposal,
  rejectCocoProposal,
  refreshCocoTitle
};

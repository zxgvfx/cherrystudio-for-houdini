'use strict';

/**
 * Simplified port of the official `transformSDKMessageToStreamParts`
 * (web/src/main/services/agents/services/claudecode/transform.ts).
 *
 * Converts raw Claude Agent SDK `SDKMessage` events into the subset of AI SDK
 * `TextStreamPart` shapes that `messageThunk.ts` (renderer) actually consumes:
 * start, start-step, text-start/text-delta/text-end, tool-call, tool-result,
 * tool-error, finish-step, finish, error.
 *
 * This intentionally does not implement reasoning/thinking blocks or the full
 * raw-message passthrough of the official transformer.
 */

const crypto = require('node:crypto');

function stripLocalCommandTags(text) {
  return String(text || '')
    .replace(/<local-command-(stdout|stderr)>([\s\S]*?)<\/local-command-\1>/g, '$2')
    .replace('(no content)', '');
}

function genId() {
  return `msg_${crypto.randomBytes(8).toString('hex')}`;
}

function buildNamespacedToolCallId(sessionId, rawToolCallId) {
  return `${sessionId}:${rawToolCallId}`;
}

function emptyUsage() {
  return {
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    inputTokenDetails: { cacheReadTokens: 0, cacheWriteTokens: 0, noCacheTokens: 0 },
    outputTokenDetails: { textTokens: 0, reasoningTokens: 0 }
  };
}

function convertUsage(usage) {
  if (!usage) return emptyUsage();
  const inputTokens = usage.input_tokens || 0;
  const outputTokens = usage.output_tokens || 0;
  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    inputTokenDetails: {
      cacheReadTokens: usage.cache_read_input_tokens || 0,
      cacheWriteTokens: usage.cache_creation_input_tokens || 0,
      noCacheTokens: inputTokens
    },
    outputTokenDetails: { textTokens: outputTokens, reasoningTokens: 0 }
  };
}

function mapStopReason(reason) {
  switch (reason) {
    case 'end_turn':
    case 'stop_sequence':
      return 'stop';
    case 'max_tokens':
      return 'length';
    case 'tool_use':
      return 'tool-calls';
    default:
      return 'stop';
  }
}

/** Minimal per-turn state tracker (mirrors ClaudeStreamState). */
class StreamState {
  constructor(agentSessionId) {
    this.agentSessionId = agentSessionId;
    this.activeStep = false;
    this.blocksByIndex = new Map();
    this.pendingToolCalls = new Map(); // rawToolCallId -> {toolCallId, toolName, input}
    // Some Anthropic-compatible gateways (e.g. centralized multiplexing
    // gateways like coco-vapi) send the full text both incrementally via
    // `stream_event: content_block_delta` AND again in one shot inside the
    // aggregated `assistant` SDKMessage that follows. Real Anthropic-native
    // streaming is supposed to treat these as mutually exclusive, but not
    // every gateway honors that, so we track whether *this step* already
    // received its text via granular deltas and skip re-emitting the full
    // text again from the aggregated message if so (this is what caused the
    // visible doubled reply text).
    this.textStreamedThisStep = false;
  }

  hasActiveStep() {
    return this.activeStep;
  }

  beginStep() {
    this.activeStep = true;
    this.textStreamedThisStep = false;
  }

  resetStep() {
    // Deliberately NOT clearing textStreamedThisStep here: the aggregated
    // `assistant` SDKMessage for this same step often arrives *after* the
    // `message_stop` stream_event that triggers resetStep(), and we still
    // need to remember "this step's text already streamed" at that point.
    // It's cleared on the next beginStep() instead.
    this.activeStep = false;
    this.blocksByIndex.clear();
  }

  markTextStreamed() {
    this.textStreamedThisStep = true;
  }

  wasTextStreamedThisStep() {
    return this.textStreamedThisStep;
  }

  namespacedId(rawId) {
    return buildNamespacedToolCallId(this.agentSessionId, rawId);
  }

  openTextBlock(index, id) {
    const block = { kind: 'text', id, index, text: '' };
    this.blocksByIndex.set(index, block);
    return block;
  }

  openToolBlock(index, rawToolCallId, toolName) {
    const toolCallId = this.namespacedId(rawToolCallId);
    const block = { kind: 'tool', id: toolCallId, toolCallId, rawToolCallId, toolName, index, inputJson: '' };
    this.blocksByIndex.set(index, block);
    return block;
  }

  getBlock(index) {
    return this.blocksByIndex.get(index);
  }

  closeBlock(index) {
    const block = this.blocksByIndex.get(index);
    this.blocksByIndex.delete(index);
    return block;
  }

  getFirstOpenTextBlock() {
    for (const block of this.blocksByIndex.values()) {
      if (block.kind === 'text') return block;
    }
    return undefined;
  }

  completeToolBlock(rawToolCallId, toolName, input) {
    this.pendingToolCalls.set(rawToolCallId, { toolCallId: this.namespacedId(rawToolCallId), toolName, input });
  }

  consumePendingToolCall(rawToolCallId) {
    const pending = this.pendingToolCalls.get(rawToolCallId);
    this.pendingToolCalls.delete(rawToolCallId);
    return pending;
  }

  setPendingUsage(usage, finishReason) {
    this._pendingUsage = usage;
    this._pendingFinishReason = finishReason;
  }

  getPendingUsage() {
    return { usage: this._pendingUsage, finishReason: this._pendingFinishReason };
  }
}

function toMcpToolResult(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return content;
  const mapped = content.map((item) => {
    if (item.type === 'image' && item.source && item.source.type === 'base64') {
      return { type: 'image', data: item.source.data, mimeType: item.source.media_type };
    }
    return item;
  });
  return { content: mapped };
}

function transformSDKMessage(sdkMessage, state) {
  switch (sdkMessage.type) {
    case 'assistant':
      return handleAssistant(sdkMessage, state);
    case 'user':
      return handleUser(sdkMessage, state);
    case 'stream_event':
      return handleStreamEvent(sdkMessage, state);
    case 'system':
      return handleSystem(sdkMessage);
    case 'result':
      return handleResult(sdkMessage);
    default:
      return [];
  }
}

function handleAssistant(message, state) {
  const chunks = [];
  const content = message.message && message.message.content;
  const isStreamingActive = state.hasActiveStep();

  const textBlocks = [];
  const toolUses = [];

  if (typeof content === 'string') {
    const text = stripLocalCommandTags(content);
    if (text) textBlocks.push(text);
  } else if (Array.isArray(content)) {
    for (const block of content) {
      if (block.type === 'text') {
        const text = stripLocalCommandTags(block.text);
        if (text) textBlocks.push(text);
      } else if (block.type === 'tool_use') {
        toolUses.push(block);
      }
    }
  }

  for (const block of toolUses) {
    const toolCallId = state.namespacedId(block.id);
    chunks.push({ type: 'tool-call', toolCallId, toolName: block.name, input: block.input, providerExecuted: true });
    state.completeToolBlock(block.id, block.name, block.input);
  }

  const combinedText = textBlocks.join('');
  // See StreamState.textStreamedThisStep: some Anthropic-compatible gateways
  // resend the full text in this aggregated message even though it was
  // already delivered incrementally via `stream_event` deltas — skip
  // re-emitting it to avoid rendering the reply twice. Tool calls above are
  // unaffected since gateways don't duplicate those the same way.
  const alreadyStreamed = state.wasTextStreamedThisStep();
  if (combinedText && !alreadyStreamed) {
    if (!isStreamingActive) {
      state.beginStep();
      chunks.push({ type: 'start-step', request: { body: '' }, warnings: [] });
      const id = message.uuid || genId();
      chunks.push({ type: 'text-start', id });
      chunks.push({ type: 'text-delta', id, text: combinedText });
      chunks.push({ type: 'text-end', id });
      chunks.push(finishStepChunk(message));
      state.resetStep();
      return chunks;
    }
    const existing = state.getFirstOpenTextBlock();
    const id = (existing && existing.id) || message.uuid || genId();
    if (!existing) chunks.push({ type: 'text-start', id });
    chunks.push({ type: 'text-delta', id, text: combinedText });
    chunks.push({ type: 'text-end', id });
  }

  if (toolUses.length > 0 && !combinedText && isStreamingActive) {
    // tool-only turn while streaming was active; step will be closed by message_stop
  } else if (toolUses.length > 0 && !combinedText && !isStreamingActive) {
    chunks.push(finishStepChunk(message));
    state.resetStep();
  }

  return chunks;
}

function finishStepChunk(message) {
  return {
    type: 'finish-step',
    response: { id: message.uuid, timestamp: new Date(), modelId: (message.message && message.message.model) || '' },
    usage: convertUsage(message.message && message.message.usage),
    finishReason: mapStopReason(message.message && message.message.stop_reason),
    rawFinishReason: (message.message && message.message.stop_reason) || undefined
  };
}

function handleUser(message, state) {
  const chunks = [];
  const content = message.message && message.message.content;
  const contentArray = Array.isArray(content) ? content : [];
  const hasToolResults = contentArray.some((b) => b.type === 'tool_result');

  if (hasToolResults) {
    for (const block of contentArray) {
      if (block.type !== 'tool_result') continue;
      const pending = state.consumePendingToolCall(block.tool_use_id);
      const toolCallId = (pending && pending.toolCallId) || state.namespacedId(block.tool_use_id);
      if (block.is_error) {
        chunks.push({
          type: 'tool-error',
          toolCallId,
          toolName: (pending && pending.toolName) || 'unknown',
          input: pending && pending.input,
          error: block.content,
          providerExecuted: true
        });
      } else {
        chunks.push({
          type: 'tool-result',
          toolCallId,
          toolName: (pending && pending.toolName) || 'unknown',
          input: pending && pending.input,
          output: toMcpToolResult(block.content),
          providerExecuted: true
        });
      }
    }
    return chunks;
  }

  // User-authored text (rare in this pipeline, but handle for completeness)
  if (typeof content === 'string' && content) {
    const id = message.uuid || genId();
    chunks.push({ type: 'text-start', id });
    chunks.push({ type: 'text-delta', id, text: content });
    chunks.push({ type: 'text-end', id });
  }
  return chunks;
}

function handleStreamEvent(message, state) {
  const chunks = [];
  const event = message.event;
  if (!event) return chunks;

  switch (event.type) {
    case 'message_start':
      state.beginStep();
      chunks.push({ type: 'start-step', request: { body: '' }, warnings: [] });
      break;

    case 'content_block_start': {
      const block = event.content_block;
      if (block.type === 'text') {
        const b = state.openTextBlock(event.index, genId());
        chunks.push({ type: 'text-start', id: b.id });
      } else if (block.type === 'tool_use') {
        const b = state.openToolBlock(event.index, block.id, block.name);
        chunks.push({ type: 'tool-input-start', id: b.toolCallId, toolName: b.toolName });
      }
      break;
    }

    case 'content_block_delta': {
      const delta = event.delta;
      if (delta.type === 'text_delta') {
        const block = state.getBlock(event.index);
        if (block && block.kind === 'text') {
          const text = stripLocalCommandTags(delta.text);
          if (text) {
            chunks.push({ type: 'text-delta', id: block.id, text });
            state.markTextStreamed();
          }
        }
      } else if (delta.type === 'input_json_delta') {
        const block = state.getBlock(event.index);
        if (block && block.kind === 'tool') {
          chunks.push({ type: 'tool-input-delta', id: block.toolCallId, delta: delta.partial_json });
        }
      }
      break;
    }

    case 'content_block_stop': {
      const block = state.closeBlock(event.index);
      if (!block) break;
      if (block.kind === 'text') {
        chunks.push({ type: 'text-end', id: block.id });
      } else if (block.kind === 'tool') {
        chunks.push({ type: 'tool-input-end', id: block.toolCallId });
      }
      break;
    }

    case 'message_delta': {
      const usage = convertUsage(event.usage);
      const finishReason = mapStopReason(event.delta && event.delta.stop_reason);
      state.setPendingUsage(usage, finishReason);
      break;
    }

    case 'message_stop': {
      if (!state.hasActiveStep()) break;
      const pending = state.getPendingUsage();
      chunks.push({
        type: 'finish-step',
        response: { id: message.uuid, timestamp: new Date(), modelId: '' },
        usage: pending.usage || emptyUsage(),
        rawFinishReason: pending.finishReason || 'stop',
        finishReason: pending.finishReason || 'stop'
      });
      state.resetStep();
      break;
    }

    default:
      break;
  }

  return chunks;
}

function handleSystem(message) {
  const chunks = [];
  if (message.subtype === 'init') {
    chunks.push({ type: 'start' });
  }
  return chunks;
}

function handleResult(message) {
  if (message.subtype === 'success') {
    return [
      {
        type: 'finish',
        totalUsage: convertUsage(message.usage),
        finishReason: 'stop',
        rawFinishReason: message.subtype
      }
    ];
  }
  return [
    {
      type: 'error',
      error: { message: `${message.subtype}: Process failed after ${message.num_turns} turns` }
    }
  ];
}

module.exports = { StreamState, transformSDKMessage, buildNamespacedToolCallId };

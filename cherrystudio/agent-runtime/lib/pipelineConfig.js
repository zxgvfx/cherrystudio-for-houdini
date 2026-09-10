'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const DEFAULT_API_BASE = 'http://192.168.21.225:9331';

function loadBridgeConfig() {
  const configPath = path.join(os.homedir(), '.cherrystudio', 'ai-pipeline-bridge.json');
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8')) || {};
    }
  } catch {
    // ignore malformed config
  }
  return {};
}

function pipelineApiBase() {
  const env = process.env.PIPELINE_API_BASE;
  if (env && env.trim()) return env.trim().replace(/\/+$/, '');
  const cfg = loadBridgeConfig().api_base;
  if (cfg) return String(cfg).replace(/\/+$/, '');
  return DEFAULT_API_BASE;
}

function localUsername() {
  return process.env.USERNAME || process.env.USER || process.env.LOGNAME || 'unknown';
}

function splitUniqueModelId(model) {
  const raw = String(model || '').trim();
  if (!raw) return { providerId: null, modelId: null };
  if (raw.includes('::')) {
    const [providerId, ...rest] = raw.split('::');
    return { providerId: providerId || null, modelId: rest.join('::') || null };
  }
  if (raw.includes(':')) {
    const idx = raw.indexOf(':');
    return { providerId: raw.slice(0, idx) || null, modelId: raw.slice(idx + 1) || null };
  }
  return { providerId: null, modelId: raw };
}

module.exports = { pipelineApiBase, localUsername, splitUniqueModelId };

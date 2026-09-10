'use strict';

const COCO_MODES = new Set(['agent', 'plan', 'ask', 'debug', 'multitask']);
const COCO_PERMISSIONS = new Set(['ask', 'auto', 'read_only']);

function readCocoMode(configuration) {
  const value = configuration && configuration.coco_mode;
  return COCO_MODES.has(value) ? value : 'agent';
}

function readCocoPermission(configuration) {
  const value = configuration && configuration.coco_permission;
  return COCO_PERMISSIONS.has(value) ? value : 'ask';
}

module.exports = { readCocoMode, readCocoPermission };

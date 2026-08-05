'use strict';

/**
 * Simplified port of the official Skill marketplace (`SkillService` /
 * `SkillRepository` / `SkillInstaller`) for the Node sidecar.
 *
 * Skills are plain directories containing a `SKILL.md` (YAML frontmatter +
 * markdown body) plus any supporting files, stored under
 * `{agentRuntimeHome}/skills/store/{skillId}/`. A JSON registry tracks
 * metadata and which agents have each skill enabled.
 *
 * `reconcileAgentSkills()` mirrors the official app's behaviour of
 * symlinking enabled skills into `{cwd}/.claude/skills/{folder}` right
 * before a turn starts, so the Claude Agent SDK's built-in skill-discovery
 * mechanism picks them up natively — no custom MCP tool required.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function readRegistry(skillsRoot) {
  const registryPath = path.join(skillsRoot, 'registry.json');
  try {
    return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch {
    return {};
  }
}

function writeRegistry(skillsRoot, registry) {
  fs.mkdirSync(skillsRoot, { recursive: true });
  fs.writeFileSync(path.join(skillsRoot, 'registry.json'), JSON.stringify(registry, null, 2), 'utf8');
}

/** Extracts `name`/`description` from a SKILL.md's YAML frontmatter (best-effort, no yaml dep). */
function parseSkillFrontmatter(skillMdPath) {
  try {
    const text = fs.readFileSync(skillMdPath, 'utf8');
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const meta = { name: undefined, description: undefined };
    if (match) {
      for (const line of match[1].split(/\r?\n/)) {
        const nameMatch = line.match(/^name:\s*(.+)$/);
        const descMatch = line.match(/^description:\s*(.+)$/);
        if (nameMatch) meta.name = nameMatch[1].trim().replace(/^["']|["']$/g, '');
        if (descMatch) meta.description = descMatch[1].trim().replace(/^["']|["']$/g, '');
      }
    }
    return meta;
  } catch {
    return {};
  }
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

class SkillStore {
  constructor(agentRuntimeHome) {
    this.root = path.join(agentRuntimeHome, 'skills');
    this.storeDir = path.join(this.root, 'store');
    fs.mkdirSync(this.storeDir, { recursive: true });
  }

  listLocal() {
    const registry = readRegistry(this.root);
    return Object.values(registry);
  }

  get(skillId) {
    const registry = readRegistry(this.root);
    return registry[skillId];
  }

  installFromDirectory(sourceDir, { folder } = {}) {
    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
      throw new Error(`Source directory not found: ${sourceDir}`);
    }
    const skillMdPath = path.join(sourceDir, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) {
      throw new Error('Directory does not contain a SKILL.md file');
    }
    const id = crypto.randomUUID();
    const folderName = folder || path.basename(sourceDir);
    const destDir = path.join(this.storeDir, id);
    copyDirSync(sourceDir, destDir);

    const meta = parseSkillFrontmatter(path.join(destDir, 'SKILL.md'));
    const registry = readRegistry(this.root);
    registry[id] = {
      id,
      folder: folderName,
      name: meta.name || folderName,
      description: meta.description || '',
      installedAt: new Date().toISOString(),
      enabled: true
    };
    writeRegistry(this.root, registry);
    return registry[id];
  }

  installFromZip(zipBuffer, opts) {
    let AdmZip;
    try {
      AdmZip = require('adm-zip');
    } catch {
      throw new Error('adm-zip is not installed; cannot install skills from a .zip archive');
    }
    const zip = new AdmZip(zipBuffer);
    const tmpDir = path.join(this.root, `.tmp-${crypto.randomUUID()}`);
    zip.extractAllTo(tmpDir, true);

    // A zip may contain the skill directly at the root, or nested one level deep.
    let sourceDir = tmpDir;
    let nestedFolderName;
    if (!fs.existsSync(path.join(tmpDir, 'SKILL.md'))) {
      const entries = fs.readdirSync(tmpDir, { withFileTypes: true }).filter((e) => e.isDirectory());
      if (entries.length === 1 && fs.existsSync(path.join(tmpDir, entries[0].name, 'SKILL.md'))) {
        sourceDir = path.join(tmpDir, entries[0].name);
        nestedFolderName = entries[0].name;
      }
    }

    try {
      // Prefer the zip's own nested folder name (or an explicit override) over
      // the random `.tmp-<uuid>` extraction dir name, which would otherwise
      // leak into the installed skill's `folder` (used for the
      // `.claude/skills/{folder}` symlink) when the zip has SKILL.md at its root.
      const folderOpts = { ...opts, folder: (opts && opts.folder) || nestedFolderName };
      return this.installFromDirectory(sourceDir, folderOpts);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  uninstall(skillId) {
    const registry = readRegistry(this.root);
    if (!registry[skillId]) return false;
    delete registry[skillId];
    writeRegistry(this.root, registry);
    fs.rmSync(path.join(this.storeDir, skillId), { recursive: true, force: true });
    return true;
  }

  toggle(skillId, enabled) {
    const registry = readRegistry(this.root);
    if (!registry[skillId]) throw new Error('Skill not found');
    registry[skillId].enabled = !!enabled;
    writeRegistry(this.root, registry);
    return registry[skillId];
  }

  listFiles(skillId) {
    const dir = path.join(this.storeDir, skillId);
    const results = [];
    const walk = (base, rel) => {
      for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
        const relPath = path.join(rel, entry.name);
        if (entry.isDirectory()) {
          walk(path.join(base, entry.name), relPath);
        } else {
          results.push(relPath.replace(/\\/g, '/'));
        }
      }
    };
    if (fs.existsSync(dir)) walk(dir, '');
    return results;
  }

  readFile(skillId, relPath) {
    const dir = path.join(this.storeDir, skillId);
    const target = path.resolve(dir, relPath);
    if (!target.startsWith(path.resolve(dir))) {
      throw new Error('Invalid path');
    }
    return fs.readFileSync(target, 'utf8');
  }

  /**
   * Scans `{workdir}/.claude/skills/` for skill directories that were placed
   * there manually (or via `reconcileAgentSkills`'s symlinks) rather than
   * through this store's own registry. Mirrors the official
   * `SkillService.listLocal()` used by the "legacy plugins" fallback UI.
   *
   * NB: intentionally NOT named `listLocal` — that name is already taken by
   * this class's "list installed skills from the registry" method (used by
   * `GET /v1/skills`), which has different semantics.
   */
  scanWorkdirSkills(workdir) {
    const results = [];
    const skillsDir = path.join(workdir, '.claude', 'skills');
    if (!fs.existsSync(skillsDir)) return results;
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
      const skillMdPath = path.join(skillsDir, entry.name, 'SKILL.md');
      if (!fs.existsSync(skillMdPath)) continue;
      const meta = parseSkillFrontmatter(skillMdPath);
      results.push({ name: meta.name || entry.name, description: meta.description, filename: entry.name });
    }
    return results;
  }
}

let singleton = null;
function getSkillStore(agentRuntimeHome) {
  if (!singleton) singleton = new SkillStore(agentRuntimeHome);
  return singleton;
}

/**
 * Symlinks the skills enabled for `agent` into `{cwd}/.claude/skills/{folder}`
 * so the SDK's native skill-discovery layer finds them, and removes any
 * stale links left over from a previous configuration.
 */
async function reconcileAgentSkills(cwd, agent, _appDataDir) {
  const enabledIds = (agent.configuration && agent.configuration.enabled_skills) || [];
  if (!Array.isArray(enabledIds)) return;

  // We don't have direct access to agentRuntimeHome here; caller sets it as
  // a global via configureSkillsHome() during server bootstrap.
  if (!singleton) return;

  const targetDir = path.join(cwd, '.claude', 'skills');
  fs.mkdirSync(targetDir, { recursive: true });

  const wanted = new Map();
  for (const id of enabledIds) {
    const skill = singleton.get(id);
    if (skill && skill.enabled !== false) {
      wanted.set(skill.folder, id);
    }
  }

  const existing = fs.existsSync(targetDir) ? fs.readdirSync(targetDir) : [];
  for (const name of existing) {
    const linkPath = path.join(targetDir, name);
    let isManagedLink = false;
    try {
      isManagedLink = fs.lstatSync(linkPath).isSymbolicLink();
    } catch {
      isManagedLink = false;
    }
    if (isManagedLink && !wanted.has(name)) {
      fs.rmSync(linkPath, { force: true });
    }
  }

  for (const [folder, id] of wanted) {
    const linkPath = path.join(targetDir, folder);
    const sourcePath = path.join(singleton.storeDir, id);
    if (fs.existsSync(linkPath)) continue;
    try {
      fs.symlinkSync(sourcePath, linkPath, 'junction');
    } catch {
      // Symlinks can fail without privilege on Windows; fall back to a copy.
      copyDirSync(sourcePath, linkPath);
    }
  }
}

module.exports = { SkillStore, getSkillStore, reconcileAgentSkills };

import { C as string, S as strictObject, a as array, o as boolean, u as int } from "./schemas-CV_EtlSZ.js";
import { i as SafeExtSchema, n as FILE_TYPE, t as AbsoluteFilePathSchema } from "./file-KsLXrn8b.js";
import { t as codeLanguages } from "./codeLanguages-BfQ-PZy3.js";
function canonicalizeAbsolutePath(raw) {
	if (raw.includes("\0")) throw new Error("canonicalizeAbsolutePath: input contains null byte");
	if (raw.startsWith("\\\\")) throw new Error("canonicalizeAbsolutePath: UNC paths are not supported as canonical keys");
	return /^[A-Za-z]:[/\\]/.test(raw) ? canonicalizeWindows(raw) : canonicalizePosix(raw);
}
function isCanonicalFilePath(p) {
	try {
		return p === canonicalizeAbsolutePath(p);
	} catch {
		return false;
	}
}
const CanonicalFilePathSchema = AbsoluteFilePathSchema.refine(isCanonicalFilePath, "must be in byte-faithful canonical form (produce it via canonicalizeFilePath)").brand();
function canonicalizeFilePath(input) {
	return CanonicalFilePathSchema.parse(canonicalizeAbsolutePath(input));
}
function canonicalizePosix(raw) {
	if (!raw.startsWith("/")) throw new Error("canonicalizeAbsolutePath: path must be absolute");
	const segments = raw.slice(1).split("/");
	const stack = [];
	for (const seg of segments) {
		if (seg === "" || seg === ".") continue;
		if (seg === "..") {
			stack.pop();
			continue;
		}
		stack.push(seg);
	}
	return stack.length === 0 ? "/" : "/" + stack.join("/");
}
function canonicalizeWindows(raw) {
	const drive = raw.slice(0, 2).toUpperCase();
	const segments = raw.slice(3).split(/[/\\]/);
	const stack = [];
	for (const seg of segments) {
		if (seg === "" || seg === ".") continue;
		if (seg === "..") {
			stack.pop();
			continue;
		}
		stack.push(seg);
	}
	return stack.length === 0 ? `${drive}\\` : `${drive}\\${stack.join("\\")}`;
}
const imageExts = [
	".jpg",
	".jpeg",
	".png",
	".gif",
	".bmp",
	".webp"
];
const videoExts = [
	".mp4",
	".avi",
	".mov",
	".wmv",
	".flv",
	".mkv"
];
const audioExts = [
	".mp3",
	".wav",
	".ogg",
	".flac",
	".aac"
];
const documentExts = [
	".pdf",
	".doc",
	".docx",
	".pptx",
	".xlsx",
	".xls",
	".odt",
	".odp",
	".ods"
];
const archiveExts = [
	".zip",
	".rar",
	".7z",
	".tar",
	".gz",
	".tgz",
	".bz2",
	".xz"
];
const knowledgeSupportedFileExts = [
	".txt",
	".markdown",
	".md",
	".mdx",
	".pdf",
	".html",
	".htm",
	".xlsx",
	".xls",
	".docx",
	".csv",
	".doc",
	".pptx",
	".epub",
	".draftsexport"
];
var linguistExtSet = /* @__PURE__ */ new Set();
for (const lang of Object.values(codeLanguages)) if (lang.extensions) for (const ext of lang.extensions) linguistExtSet.add(ext);
const codeLangExts = Array.from(linguistExtSet);
const customTextExts = new Map([
	["language", [
		".R",
		".ets",
		".uniswap",
		".usf",
		".ush"
	]],
	["template", [".vm"]],
	["config", [
		".babelrc",
		".bashrc",
		".browserslistrc",
		".conf",
		".config",
		".dockerignore",
		".eslintignore",
		".eslintrc",
		".fishrc",
		".htaccess",
		".npmignore",
		".npmrc",
		".prettierignore",
		".prettierrc",
		".rc",
		".robots",
		".yarnrc",
		".zshrc"
	]],
	["document", [
		".authors",
		".changelog",
		".license",
		".nfo",
		".readme",
		".text"
	]],
	["data", [
		".atom",
		".ldif",
		".map",
		".ndjson"
	]],
	["build", [
		".bazel",
		".build",
		".pom"
	]],
	["database", [".dml", ".psql"]],
	["web", [".openapi", ".swagger"]],
	["version", [
		".bzrignore",
		".gitattributes",
		".githistory",
		".hgignore",
		".svnignore"
	]],
	["subtitle", [".ass", ".sub"]],
	["log", [".log", ".rpt"]],
	["eda", [
		".cir",
		".def",
		".edif",
		".il",
		".ils",
		".lef",
		".net",
		".scs",
		".sdf",
		".spi"
	]]
]);
const textExts = [...new Set([...Array.from(customTextExts.values()).flat(), ...codeLangExts])];
var buildFileTypeMap = () => {
	const entries = [];
	const add = (exts, type) => {
		for (const ext of exts) entries.push([ext.replace(/^\./, "").toLowerCase(), type]);
	};
	add(imageExts, FILE_TYPE.IMAGE);
	add(videoExts, FILE_TYPE.VIDEO);
	add(audioExts, FILE_TYPE.AUDIO);
	add(textExts, FILE_TYPE.TEXT);
	add(documentExts, FILE_TYPE.DOCUMENT);
	return Object.freeze(Object.fromEntries(entries));
};
const fileTypeMap = buildFileTypeMap();
function getFileTypeByExt(ext) {
	const normalized = ext.replace(/^\./, "").toLowerCase();
	if (!normalized) return FILE_TYPE.OTHER;
	return fileTypeMap[normalized] ?? FILE_TYPE.OTHER;
}
function createFileEntryHandle(entryId) {
	return {
		kind: "entry",
		entryId
	};
}
function createFilePathHandle(path) {
	return {
		kind: "path",
		path
	};
}
strictObject({
	extensions: array(string()).optional(),
	respectGitignore: boolean().optional(),
	includeHidden: boolean().optional(),
	withStats: boolean().optional(),
	maxDepth: int().nonnegative().optional(),
	watchMissingRoot: boolean().optional()
});
function joinTreePath(parent, basename) {
	if (!parent) return basename;
	if (parent === "/") return `/${basename}`;
	return `${parent}/${basename}`;
}
function basenameOf(p) {
	const i = p.lastIndexOf("/");
	return i < 0 ? p : p.slice(i + 1);
}
function dirnameOf(p) {
	const i = p.lastIndexOf("/");
	if (i < 0) return "";
	if (i === 0) return "/";
	return p.slice(0, i);
}
var TreeNode = class TreeNode {
	_path;
	_basename;
	_dirname;
	_stats;
	static parentMap = /* @__PURE__ */ new WeakMap();
	constructor(init) {
		const normalized = init.path.replace(/\\/g, "/");
		this._path = normalized;
		this._basename = basenameOf(normalized);
		this._dirname = dirnameOf(normalized);
		this._stats = init.stats;
	}
	get path() {
		return this._path;
	}
	set path(value) {
		const normalized = value.replace(/\\/g, "/");
		if (normalized === this._path) return;
		const newBasename = basenameOf(normalized);
		const oldBasename = this._basename;
		this._path = normalized;
		this._basename = newBasename;
		this._dirname = dirnameOf(normalized);
		if (newBasename !== oldBasename) TreeNode.parentMap.get(this)?.repointChild(oldBasename, this);
		this.adjustChildrenPaths();
	}
	get basename() {
		return this._basename;
	}
	set basename(value) {
		if (value === this._basename) return;
		const oldBasename = this._basename;
		this._basename = value;
		this._path = joinTreePath(this._dirname, value);
		TreeNode.parentMap.get(this)?.repointChild(oldBasename, this);
		this.adjustChildrenPaths();
	}
	get dirname() {
		return this._dirname;
	}
	get parent() {
		return TreeNode.parentMap.get(this) ?? null;
	}
	get stats() {
		return this._stats;
	}
	set stats(value) {
		this._stats = value;
	}
	isTreeFile() {
		return this.kind === "file";
	}
	isTreeDir() {
		return this.kind === "directory";
	}
	remove() {
		const parent = this.parent;
		if (!parent) return false;
		if (parent.detach(this._basename) !== this) return false;
		TreeNode.parentMap.delete(this);
		return true;
	}
	toJSON() {
		return this.serialize();
	}
	adjustChildrenPaths() {}
	static setParent(child, parent) {
		if (parent) TreeNode.parentMap.set(child, parent);
		else TreeNode.parentMap.delete(child);
	}
};
var TreeFile = class extends TreeNode {
	kind = "file";
	constructor(init) {
		super(init);
	}
	serialize() {
		const out = {
			kind: "file",
			path: this._path,
			basename: this._basename
		};
		if (this._stats) out.stats = this._stats;
		return out;
	}
};
var TreeDir = class extends TreeNode {
	kind = "directory";
	_children = Object.create(null);
	constructor(init) {
		super(init);
	}
	get children() {
		return this._children;
	}
	get childCount() {
		return Object.keys(this._children).length;
	}
	hasChild(basename) {
		return basename in this._children;
	}
	attachChild(child) {
		const existing = this._children[child.basename];
		if (existing && existing !== child) TreeNode.setParent(existing, null);
		this._children[child.basename] = child;
		TreeNode.setParent(child, this);
		return child;
	}
	repointChild(oldBasename, child) {
		if (this._children[oldBasename] !== child) return;
		delete this._children[oldBasename];
		this._children[child.basename] = child;
	}
	detach(basename) {
		const child = this._children[basename];
		if (!child) return null;
		delete this._children[basename];
		TreeNode.setParent(child, null);
		return child;
	}
	nodeFromPath(target) {
		const normalized = target.replace(/\\/g, "/");
		if (normalized === this._path) return this;
		let rel;
		if (normalized.startsWith(`${this._path}/`)) rel = normalized.slice(this._path.length + 1);
		else if (normalized.startsWith("/")) return null;
		else rel = normalized;
		const segments = rel.split("/").filter(Boolean);
		if (segments.length === 0) return this;
		let current = this._children[segments[0]];
		for (let i = 1; i < segments.length && current; i++) {
			if (!current.isTreeDir()) return null;
			current = current._children[segments[i]];
		}
		return current ?? null;
	}
	walk(cb) {
		const visit = (node, depth) => {
			if (cb(node, depth) === false) return false;
			if (node.isTreeDir()) {
				for (const child of Object.values(node._children)) if (!visit(child, depth + 1)) return false;
			}
			return true;
		};
		visit(this, 0);
	}
	sortChildren() {
		const entries = Object.entries(this._children);
		entries.sort(([, a], [, b]) => {
			if (a.kind !== b.kind) return a.kind === "directory" ? -1 : 1;
			return a.basename.localeCompare(b.basename, void 0, {
				numeric: true,
				sensitivity: "accent"
			});
		});
		for (const key of Object.keys(this._children)) delete this._children[key];
		for (const [key, node] of entries) this._children[key] = node;
	}
	adjustChildrenPaths() {
		for (const child of Object.values(this._children)) child.path = joinTreePath(this._path, child.basename);
	}
	serialize() {
		const children = {};
		for (const [name, child] of Object.entries(this._children)) children[name] = child.toJSON();
		const out = {
			kind: "directory",
			path: this._path,
			basename: this._basename,
			children
		};
		if (this._stats) out.stats = this._stats;
		return out;
	}
};
var TreeDirRoot = class extends TreeDir {
	constructor(rootPath) {
		super({ path: rootPath });
	}
};
function fromSerialized(json) {
	if (json.kind === "file") return new TreeFile({
		path: json.path,
		stats: json.stats
	});
	const dir = new TreeDir({
		path: json.path,
		stats: json.stats
	});
	if (json.children) for (const child of Object.values(json.children)) dir.attachChild(fromSerialized(child));
	return dir;
}
function rootFromSerialized(json) {
	if (json.kind !== "directory") throw new Error("rootFromSerialized: expected directory at the top level");
	const root = new TreeDirRoot(json.path);
	if (json.stats) root.stats = json.stats;
	if (json.children) for (const child of Object.values(json.children)) root.attachChild(fromSerialized(child));
	return root;
}
var DANGEROUS_EXTS = new Set([
	"sh",
	"bash",
	"zsh",
	"fish",
	"csh",
	"ksh",
	"exe",
	"com",
	"bat",
	"cmd",
	"msi",
	"scr",
	"pif",
	"cpl",
	"ps1",
	"psm1",
	"psd1",
	"vbs",
	"vbe",
	"js",
	"jse",
	"wsf",
	"wsh",
	"hta",
	"reg",
	"msc",
	"inf",
	"application",
	"appref-ms",
	"lnk",
	"url",
	"iso",
	"img",
	"vhd",
	"vhdx",
	"app",
	"command",
	"terminal",
	"workflow",
	"scpt",
	"desktop",
	"appimage",
	"run",
	"jar",
	"jnlp",
	"py",
	"pyw",
	"svg",
	"dmg",
	"pkg"
]);
function normalizeExt(ext) {
	if (!ext) return null;
	const normalized = ext.replace(/^[\s.]+/, "").replace(/[\s.]+$/, "").toLowerCase();
	return SafeExtSchema.safeParse(normalized).success ? normalized : null;
}
function isDangerExt(ext) {
	const normalized = normalizeExt(ext);
	if (!normalized) return false;
	return DANGEROUS_EXTS.has(normalized);
}
function dirnameSimple(absolutePath) {
	const sepIdx = Math.max(absolutePath.lastIndexOf("/"), absolutePath.lastIndexOf("\\"));
	if (sepIdx > 0) {
		const dir = absolutePath.slice(0, sepIdx);
		if (/^\\\\[^\\]+$/.test(dir)) return absolutePath;
		return AbsoluteFilePathSchema.parse(/^[A-Za-z]:$/.test(dir) ? absolutePath.slice(0, sepIdx + 1) : dir);
	}
	if (sepIdx === 0) return AbsoluteFilePathSchema.parse("/");
	return absolutePath;
}
function toFileUrl(absolutePath) {
	let normalized = absolutePath.replace(/\\/g, "/");
	if (/^[A-Za-z]:/.test(normalized)) normalized = "/" + normalized;
	const encoded = normalized.split("/").map((segment) => /^[A-Za-z]:$/.test(segment) ? segment : encodeURIComponent(segment)).join("/");
	return encoded.startsWith("//") ? `file://${encoded.slice(2)}` : `file://${encoded}`;
}
function fileUrlToPath(fileUrl) {
	const url = typeof fileUrl === "string" ? new URL(fileUrl) : fileUrl;
	if (url.protocol !== "file:") throw new TypeError("Expected a file:// URL");
	const pathname = decodeURIComponent(url.pathname);
	if (url.hostname) return `//${url.hostname}${pathname}`;
	if (/^\/[A-Za-z]:\//.test(pathname)) return pathname.slice(1);
	return pathname;
}
function toSafeFileUrl(absolutePath, ext) {
	return toFileUrl(isDangerExt(ext) ? dirnameSimple(absolutePath) : absolutePath);
}
export { videoExts as _, TreeDir as a, createFileEntryHandle as c, archiveExts as d, audioExts as f, textExts as g, knowledgeSupportedFileExts as h, toSafeFileUrl as i, createFilePathHandle as l, imageExts as m, normalizeExt as n, TreeFile as o, documentExts as p, toFileUrl as r, rootFromSerialized as s, fileUrlToPath as t, getFileTypeByExt as u, CanonicalFilePathSchema as v, canonicalizeFilePath as y };

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./esm-DNV6TL8n.js","./extends-CWTzyNP3.js","./dist-DAWIImZF.js","./w3c-keyname-DKIRohbk.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as require_diff } from "./diff-KPuWBc9d.js";
var import_diff = /* @__PURE__ */ __toESM(require_diff());
var cmThemesPromise;
function loadCmThemes() {
	cmThemesPromise ??= __vitePreload(() => import("./esm-DNV6TL8n.js"), __vite__mapDeps([0,1,2,3]), import.meta.url);
	return cmThemesPromise;
}
function prepareCodeChanges(oldCode, newCode) {
	const diffResult = (0, import_diff.default)(oldCode, newCode);
	const changes = [];
	let offset = 0;
	for (const [operation, text] of diffResult) if (operation === 1) changes.push({
		from: offset,
		to: offset,
		insert: text
	});
	else if (operation === -1) {
		changes.push({
			from: offset,
			to: offset + text.length,
			insert: ""
		});
		offset += text.length;
	} else offset += text.length;
	return changes;
}
var _customLanguageExtensions = {
	svg: "xml",
	vab: "vb",
	graphviz: "dot"
};
var _defaultLanguageConfig = {
	JavaScript: {
		type: "programming",
		extensions: [
			".js",
			".mjs",
			".cjs"
		],
		aliases: ["js", "node"]
	},
	TypeScript: {
		type: "programming",
		extensions: [".ts"],
		aliases: ["ts"]
	},
	Python: {
		type: "programming",
		extensions: [".py"],
		aliases: ["python3", "py"]
	},
	Java: {
		type: "programming",
		extensions: [".java"]
	},
	"C++": {
		type: "programming",
		extensions: [
			".cpp",
			".cc",
			".cxx"
		],
		aliases: ["cpp"]
	},
	C: {
		type: "programming",
		extensions: [".c"]
	},
	"C#": {
		type: "programming",
		extensions: [".cs"],
		aliases: ["csharp"]
	},
	HTML: {
		type: "markup",
		extensions: [".html", ".htm"]
	},
	CSS: {
		type: "markup",
		extensions: [".css"]
	},
	JSON: {
		type: "data",
		extensions: [".json"]
	},
	XML: {
		type: "data",
		extensions: [".xml"]
	},
	YAML: {
		type: "data",
		extensions: [".yml", ".yaml"]
	},
	SQL: {
		type: "data",
		extensions: [".sql"]
	},
	Shell: {
		type: "programming",
		extensions: [".sh", ".bash"],
		aliases: ["bash", "sh"]
	},
	Go: {
		type: "programming",
		extensions: [".go"],
		aliases: ["golang"]
	},
	Rust: {
		type: "programming",
		extensions: [".rs"]
	},
	PHP: {
		type: "programming",
		extensions: [".php"]
	},
	Ruby: {
		type: "programming",
		extensions: [".rb"],
		aliases: ["rb"]
	},
	Swift: {
		type: "programming",
		extensions: [".swift"]
	},
	Kotlin: {
		type: "programming",
		extensions: [".kt"]
	},
	Dart: {
		type: "programming",
		extensions: [".dart"]
	},
	R: {
		type: "programming",
		extensions: [".r"]
	},
	MATLAB: {
		type: "programming",
		extensions: [".m"]
	}
};
function getExtensionByLanguage(language, languageConfig) {
	const languages = languageConfig || _defaultLanguageConfig;
	const lowerLanguage = language.toLowerCase();
	const directMatch = languages[language];
	if (directMatch?.extensions?.[0]) return directMatch.extensions[0];
	for (const [langName, data] of Object.entries(languages)) if (langName.toLowerCase() === lowerLanguage && data.extensions?.[0]) return data.extensions[0];
	for (const [, data] of Object.entries(languages)) if (data.aliases?.some((alias) => alias.toLowerCase() === lowerLanguage)) return data.extensions?.[0] || `.${language}`;
	return `.${language}`;
}
async function getNormalizedExtension(language, languageConfig) {
	let lang = language;
	if (language.startsWith(".") && language.length > 1) lang = language.slice(1);
	const customExt = _customLanguageExtensions[lang.toLowerCase()];
	if (customExt) return customExt;
	const linguistExt = getExtensionByLanguage(lang, languageConfig);
	if (linguistExt) return linguistExt.slice(1);
	return lang;
}
async function getCmThemeNames() {
	const cmThemes = await loadCmThemes();
	return [
		"auto",
		"light",
		"dark"
	].concat(Object.keys(cmThemes)).filter((item) => typeof cmThemes[item] !== "function").filter((item) => !/^(defaultSettings)/.test(item) && !/(Style)$/.test(item));
}
async function getCmThemeByName(name) {
	if (name === "light" || name === "dark" || name === "none") return name;
	const cmThemes = await loadCmThemes();
	const candidate = cmThemes[name];
	if (Object.prototype.hasOwnProperty.call(cmThemes, name) && typeof candidate !== "function" && !/^defaultSettings/i.test(name) && !/(Style)$/.test(name)) return candidate;
	return "light";
}
export { prepareCodeChanges as i, getCmThemeNames as n, getNormalizedExtension as r, getCmThemeByName as t };

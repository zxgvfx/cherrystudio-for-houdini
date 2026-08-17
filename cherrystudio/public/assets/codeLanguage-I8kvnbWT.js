import { t as codeLanguages } from "./codeLanguages-YsZif4Se.js";
var extensionToLanguageCache = null;
var PRIMARY_EXTENSION_OVERRIDES = {
	md: "Markdown",
	yml: "YAML",
	yaml: "YAML",
	html: "HTML",
	sql: "SQL",
	rs: "Rust",
	txt: "Text"
};
function buildExtensionCache() {
	if (extensionToLanguageCache) return extensionToLanguageCache;
	extensionToLanguageCache = /* @__PURE__ */ new Map();
	for (const [langName, data] of Object.entries(codeLanguages)) if (data.extensions) for (const ext of data.extensions) {
		const normalizedExt = ext.startsWith(".") ? ext.slice(1).toLowerCase() : ext.toLowerCase();
		if (!extensionToLanguageCache.has(normalizedExt)) extensionToLanguageCache.set(normalizedExt, langName);
	}
	return extensionToLanguageCache;
}
function getLanguageByExtension(extension) {
	if (!extension) return "text";
	const normalizedExt = extension.startsWith(".") ? extension.slice(1).toLowerCase() : extension.toLowerCase();
	const override = PRIMARY_EXTENSION_OVERRIDES[normalizedExt];
	if (override) return override;
	return buildExtensionCache().get(normalizedExt) || normalizedExt;
}
function getLanguageByFilePath(filePath) {
	if (!filePath) return "text";
	const ext = filePath.split(".").pop();
	if (!ext) return "text";
	return getLanguageByExtension(ext);
}
function getExtensionByLanguage(language) {
	const lowerLanguage = language.toLowerCase();
	const directMatch = codeLanguages[language];
	if (directMatch?.extensions?.[0]) return directMatch.extensions[0];
	for (const [langName, data] of Object.entries(codeLanguages)) if (langName.toLowerCase() === lowerLanguage && data.extensions?.[0]) return data.extensions[0];
	for (const [, data] of Object.entries(codeLanguages)) if (data.aliases?.some((alias) => alias.toLowerCase() === lowerLanguage)) return data.extensions?.[0] || `.${language}`;
	return `.${language}`;
}
export { getLanguageByFilePath as n, getExtensionByLanguage as t };

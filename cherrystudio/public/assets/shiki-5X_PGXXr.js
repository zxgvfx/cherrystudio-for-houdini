const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dist-CP35AqCn.js","./dist-CbafgI8N.js","./lib-AqQ05U-c.js","./rolldown-runtime-BeJLVFtF.js","./zwitch-CMg-OEjI.js","./dist-DIxdlCXd.js","./preload-helper-DXC6tWlX.js","./markdown-it-BIxGmnvr.js","./markdown-it-xCYjzGom.js"])))=>i.map(i=>d[i]);
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { h as getTokenStyleObject } from "./dist-CbafgI8N.js";
import { t as AsyncInitializer } from "./asyncInitializer-DlV1NBgp.js";
const DEFAULT_LANGUAGES = [
	"text",
	"javascript",
	"typescript",
	"python",
	"java",
	"markdown",
	"json"
];
const DEFAULT_THEMES = ["one-light", "material-theme-darker"];
var logger = loggerService.withContext("Shiki");
var WHITE_TOKEN_COLOR_PATTERN = /^(?:white|#fff(?:fff)?)$/i;
var READABLE_TEXT_COLOR = "var(--foreground)";
var LITERAL_WHITE_COLOR_REPLACEMENTS = {
	white: READABLE_TEXT_COLOR,
	"#fff": READABLE_TEXT_COLOR,
	"#ffffff": READABLE_TEXT_COLOR,
	"#ffffffff": READABLE_TEXT_COLOR
};
function isWhiteTokenColor(color) {
	return WHITE_TOKEN_COLOR_PATTERN.test(color);
}
function getLightThemeWhiteColorReplacements(theme) {
	const replacements = { ...LITERAL_WHITE_COLOR_REPLACEMENTS };
	for (const [sentinel, value] of Object.entries(theme.colorReplacements ?? {})) if (isWhiteTokenColor(value)) replacements[sentinel] = READABLE_TEXT_COLOR;
	return replacements;
}
var shikiInitializer = new AsyncInitializer(async () => {
	return await __vitePreload(() => import("./dist-CP35AqCn.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url);
});
async function getShiki() {
	return shikiInitializer.get();
}
var highlighterInitializer = new AsyncInitializer(async (langs, themes) => {
	return (await getShiki()).createHighlighter({
		langs: langs || DEFAULT_LANGUAGES,
		themes: themes || DEFAULT_THEMES
	});
});
async function getHighlighter(langs, themes) {
	return highlighterInitializer.get(langs, themes);
}
async function loadLanguageIfNeeded(highlighter, language) {
	const shiki = await getShiki();
	let loadedLanguage = language;
	if (!highlighter.getLoadedLanguages().includes(language)) try {
		if (["text", "ansi"].includes(language)) await highlighter.loadLanguage(language);
		else {
			const languageImportFn = shiki.bundledLanguages[language];
			const langData = await languageImportFn();
			await highlighter.loadLanguage(langData);
		}
	} catch (error) {
		await highlighter.loadLanguage("text");
		loadedLanguage = "text";
	}
	return loadedLanguage;
}
async function loadThemeIfNeeded(highlighter, theme) {
	const shiki = await getShiki();
	let loadedTheme = theme;
	if (!highlighter.getLoadedThemes().includes(theme)) try {
		const themeImportFn = shiki.bundledThemes[theme];
		const themeData = await themeImportFn();
		await highlighter.loadTheme(themeData);
	} catch (error) {
		logger.debug(`Failed to load theme '${theme}', falling back to 'one-light':`, error);
		const oneLightTheme = await shiki.bundledThemes["one-light"]();
		await highlighter.loadTheme(oneLightTheme);
		loadedTheme = "one-light";
	}
	return loadedTheme;
}
function getReactStyleFromToken(token, options) {
	const style = token.htmlStyle || getTokenStyleObject(token);
	const reactStyle = {};
	for (const [key, value] of Object.entries(style)) {
		if (key === "color" && !options?.isDarkTheme && isWhiteTokenColor(value)) {
			reactStyle.color = READABLE_TEXT_COLOR;
			continue;
		}
		switch (key) {
			case "font-style":
				reactStyle.fontStyle = value;
				break;
			case "font-weight":
				reactStyle.fontWeight = value;
				break;
			case "background-color":
				reactStyle.backgroundColor = value;
				break;
			case "text-decoration":
				reactStyle.textDecoration = value;
				break;
			default: reactStyle[key] = value;
		}
	}
	return reactStyle;
}
var mdInitializer = new AsyncInitializer(async () => {
	return (await __vitePreload(() => import("./markdown-it-BIxGmnvr.js"), __vite__mapDeps([7,8,3]), import.meta.url)).default;
});
async function getMarkdownIt(theme, markdown) {
	const highlighter = await getHighlighter();
	await loadMarkdownLanguage(markdown, highlighter);
	const md = (await mdInitializer.get())({
		linkify: true,
		typographer: true
	});
	const { fromHighlighter } = await __vitePreload(async () => {
		const { fromHighlighter: fromHighlighter$1 } = await import("./core-D7NmFH7D.js");
		return { fromHighlighter: fromHighlighter$1 };
	}, [], import.meta.url);
	let actualTheme = theme;
	try {
		actualTheme = await loadThemeIfNeeded(highlighter, theme);
	} catch (error) {
		logger.debug(`Failed to load theme '${theme}', using 'one-light' as fallback:`, error);
		actualTheme = "one-light";
	}
	const themes = {
		"one-light": "one-light",
		"material-theme-darker": "material-theme-darker"
	};
	if (actualTheme !== "one-light" && actualTheme !== "material-theme-darker") themes[actualTheme] = actualTheme;
	const actualThemeRegistration = highlighter.getTheme(actualTheme);
	const colorReplacementOption = actualThemeRegistration.type === "dark" ? {} : { colorReplacements: { [actualTheme]: getLightThemeWhiteColorReplacements(actualThemeRegistration) } };
	md.use(fromHighlighter(highlighter, {
		themes,
		defaultColor: actualTheme,
		fallbackLanguage: "text",
		...colorReplacementOption
	}));
	return md;
}
async function loadMarkdownLanguage(markdown, highlighter) {
	const codeBlockRegex = /```(\w+)?/g;
	let match;
	while ((match = codeBlockRegex.exec(markdown)) !== null) if (match[1]) await loadLanguageIfNeeded(highlighter, match[1]);
}
export { getReactStyleFromToken as a, loadThemeIfNeeded as c, getMarkdownIt as i, DEFAULT_THEMES as n, getShiki as o, getHighlighter as r, loadLanguageIfNeeded as s, DEFAULT_LANGUAGES as t };

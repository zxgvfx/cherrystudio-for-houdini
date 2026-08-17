const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dist-Ik3LCZ9R.js","./dist-B0msdUwy.js","./dist-DErY0e6o.js","./w3c-keyname-d7Yk5myI.js","./dist-BqXkf6et.js","./dist-BFMo8RSa.js","./dist-BkTd1oSZ.js","./dist-wglkeqmI.js","./esm-Diab_sMe.js","./dist-u28DbjNP.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as linter, t as esm_default } from "./esm-CEkDmnO2.js";
import { K as EditorView, it as keymap, pt as Annotation } from "./dist-DErY0e6o.js";
import "./w3c-keyname-d7Yk5myI.js";
import { t as require_diff } from "./diff-BkIMdlj4.js";
import { t as codeLanguages } from "./codeLanguages-YsZif4Se.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_diff = /* @__PURE__ */ __toESM(require_diff());
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
async function getNormalizedExtension(language) {
	let lang = language;
	if (language.startsWith(".") && language.length > 1) lang = language.slice(1);
	const customExt = _customLanguageExtensions[lang.toLowerCase()];
	if (customExt) return customExt;
	const linguistExt = getExtensionByLanguage(lang);
	if (linguistExt) return linguistExt.slice(1);
	return lang;
}
function getExtensionByLanguage(language) {
	const lowerLanguage = language.toLowerCase();
	const directMatch = codeLanguages[language];
	if (directMatch?.extensions?.[0]) return directMatch.extensions[0];
	for (const [langName, data] of Object.entries(codeLanguages)) if (langName.toLowerCase() === lowerLanguage && data.extensions?.[0]) return data.extensions[0];
	for (const [, data] of Object.entries(codeLanguages)) if (data.aliases?.some((alias) => alias.toLowerCase() === lowerLanguage)) return data.extensions?.[0] || `.${language}`;
	return `.${language}`;
}
var logger = loggerService.withContext("CodeEditorHooks");
var linterLoaders = { json: async () => {
	return linter((await __vitePreload(() => import("./dist-Ik3LCZ9R.js"), __vite__mapDeps([0,1,2,3]), import.meta.url).then((mod) => mod.jsonParseLinter))());
} };
var specialLanguageLoaders = {
	dot: async () => {
		return (await __vitePreload(() => import("./dist-BqXkf6et.js"), __vite__mapDeps([4,2,3,5,6]), import.meta.url)).dot();
	},
	mmd: async () => {
		return (await __vitePreload(() => import("./dist-wglkeqmI.js"), __vite__mapDeps([7,2,3,5]), import.meta.url)).mermaid();
	}
};
async function loadLanguageExtension(language) {
	const fileExt = await getNormalizedExtension(language);
	const specialLoader = specialLanguageLoaders[fileExt];
	if (specialLoader) try {
		return await specialLoader();
	} catch (error) {
		logger.debug(`Failed to load language ${language} (${fileExt})`, error);
		return null;
	}
	try {
		const { loadLanguage } = await __vitePreload(async () => {
			const { loadLanguage: loadLanguage$1 } = await import("./esm-Diab_sMe.js");
			return { loadLanguage: loadLanguage$1 };
		}, __vite__mapDeps([8,9,2,3,1,5,6]), import.meta.url);
		return loadLanguage(fileExt) || null;
	} catch (error) {
		logger.debug(`Failed to load language ${language} (${fileExt})`, error);
		return null;
	}
}
async function loadLinterExtension(language) {
	const fileExt = await getNormalizedExtension(language);
	const loader = linterLoaders[fileExt];
	if (!loader) return null;
	try {
		return await loader();
	} catch (error) {
		logger.debug(`Failed to load linter for ${language} (${fileExt})`, error);
		return null;
	}
}
const useLanguageExtensions = (language, lint) => {
	const [extensions, setExtensions] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const loadAllExtensions = async () => {
			try {
				const [languageResult, linterResult] = await Promise.allSettled([loadLanguageExtension(language), lint ? loadLinterExtension(language) : Promise.resolve(null)]);
				if (cancelled) return;
				const results = [];
				if (languageResult.status === "fulfilled" && languageResult.value) results.push(languageResult.value);
				if (linterResult.status === "fulfilled" && linterResult.value) results.push(linterResult.value);
				setExtensions(results);
			} catch (error) {
				if (!cancelled) {
					logger.debug("Failed to load language extensions:", error);
					setExtensions([]);
				}
			}
		};
		loadAllExtensions();
		return () => {
			cancelled = true;
		};
	}, [language, lint]);
	return extensions;
};
function useSaveKeymap({ onSave, enabled = true }) {
	return (0, import_react.useMemo)(() => {
		if (!enabled || !onSave) return [];
		return keymap.of([{
			key: "Mod-s",
			run: (view) => {
				onSave(view.state.doc.toString());
				return true;
			},
			preventDefault: true
		}]);
	}, [onSave, enabled]);
}
function useBlurHandler({ onBlur }) {
	return (0, import_react.useMemo)(() => {
		if (!onBlur) return [];
		return EditorView.domEventHandlers({ blur: (_event, view) => {
			onBlur(view.state.doc.toString());
		} });
	}, [onBlur]);
}
function useHeightListener({ onHeightChange }) {
	return (0, import_react.useMemo)(() => {
		if (!onHeightChange) return [];
		return EditorView.updateListener.of((update) => {
			if (update.docChanged || update.heightChanged) onHeightChange(update.view.scrollDOM?.scrollHeight ?? 0);
		});
	}, [onHeightChange]);
}
function useScrollToLine(editorViewRef) {
	const findLineElement = (0, import_react.useCallback)((view, position) => {
		let node = view.domAtPos(position).node;
		if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
		while (node) {
			if (node instanceof HTMLElement && node.classList.contains("cm-line")) return node;
			node = node.parentElement;
		}
		return null;
	}, []);
	const highlightLine = (0, import_react.useCallback)((view, element) => {
		const previousHighlight = view.dom.querySelector(".animation-locate-highlight");
		if (previousHighlight) previousHighlight.classList.remove("animation-locate-highlight");
		element.classList.add("animation-locate-highlight");
		const handleAnimationEnd = () => {
			element.classList.remove("animation-locate-highlight");
			element.removeEventListener("animationend", handleAnimationEnd);
		};
		element.addEventListener("animationend", handleAnimationEnd);
	}, []);
	return (0, import_react.useCallback)((lineNumber, options) => {
		const view = editorViewRef.current;
		if (!view) return;
		const targetLine = view.state.doc.line(Math.min(lineNumber, view.state.doc.lines));
		const lineElement = findLineElement(view, targetLine.from);
		if (lineElement) {
			lineElement.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest"
			});
			if (options?.highlight) requestAnimationFrame(() => highlightLine(view, lineElement));
			return;
		}
		view.dispatch({ effects: EditorView.scrollIntoView(targetLine.from, { y: "start" }) });
		if (!options?.highlight) return;
		setTimeout(() => {
			const fallbackElement = findLineElement(view, targetLine.from);
			if (fallbackElement) highlightLine(view, fallbackElement);
		}, 200);
	}, [
		editorViewRef,
		findLineElement,
		highlightLine
	]);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CodeEditor = ({ ref, value, placeholder, language, onSave, onChange, onBlur, onHeightChange, height, maxHeight, minHeight, options, extensions, theme = "light", fontSize = 16, style, className, editable = true, expanded = true, wrapped = true }) => {
	const basicSetup = (0, import_react.useMemo)(() => {
		return {
			dropCursor: true,
			allowMultipleSelections: true,
			indentOnInput: true,
			bracketMatching: true,
			closeBrackets: true,
			rectangularSelection: true,
			crosshairCursor: true,
			highlightActiveLineGutter: false,
			highlightSelectionMatches: true,
			closeBracketsKeymap: options?.keymap,
			searchKeymap: options?.keymap,
			foldKeymap: options?.keymap,
			completionKeymap: options?.keymap,
			lintKeymap: options?.keymap,
			...options
		};
	}, [options]);
	const initialContent = (0, import_react.useRef)(options?.stream ? (value ?? "").trimEnd() : value ?? "");
	const editorViewRef = (0, import_react.useRef)(null);
	const langExtensions = useLanguageExtensions(language, options?.lint);
	const handleSave = (0, import_react.useCallback)(() => {
		const currentDoc = editorViewRef.current?.state.doc.toString() ?? "";
		onSave?.(currentDoc);
	}, [onSave]);
	const getContent = (0, import_react.useCallback)(() => {
		return editorViewRef.current?.state.doc.toString() ?? "";
	}, []);
	(0, import_react.useEffect)(() => {
		if (!editorViewRef.current) return;
		const newContent = options?.stream ? (value ?? "").trimEnd() : value ?? "";
		const changes = prepareCodeChanges(editorViewRef.current.state.doc.toString(), newContent);
		if (changes && changes.length > 0) editorViewRef.current.dispatch({
			changes,
			annotations: [Annotation.define().of(true)]
		});
	}, [options?.stream, value]);
	const saveKeymapExtension = useSaveKeymap({
		onSave,
		enabled: options?.keymap
	});
	const blurExtension = useBlurHandler({ onBlur });
	const heightListenerExtension = useHeightListener({ onHeightChange });
	const customExtensions = (0, import_react.useMemo)(() => {
		return [
			...extensions ?? [],
			...langExtensions,
			...wrapped ? [EditorView.lineWrapping] : [],
			saveKeymapExtension,
			blurExtension,
			heightListenerExtension
		].flat();
	}, [
		extensions,
		langExtensions,
		wrapped,
		saveKeymapExtension,
		blurExtension,
		heightListenerExtension
	]);
	const scrollToLine = useScrollToLine(editorViewRef);
	(0, import_react.useImperativeHandle)(ref, () => ({
		save: handleSave,
		scrollToLine,
		getContent
	}), [
		handleSave,
		scrollToLine,
		getContent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(esm_default, {
		value: initialContent.current,
		placeholder,
		width: "100%",
		height: expanded ? void 0 : height,
		maxHeight: expanded ? void 0 : maxHeight,
		minHeight,
		editable,
		theme,
		extensions: customExtensions,
		onCreateEditor: (view) => {
			editorViewRef.current = view;
			onHeightChange?.(view.scrollDOM?.scrollHeight ?? 0);
		},
		onChange: (value$1, viewUpdate) => {
			if (onChange && viewUpdate.docChanged) onChange(value$1);
		},
		basicSetup,
		style: {
			fontSize,
			marginTop: 0,
			borderRadius: "inherit",
			...style
		},
		className: `code-editor ${className ?? ""}`
	});
};
CodeEditor.displayName = "CodeEditor";
var CodeEditor_default = (0, import_react.memo)(CodeEditor);
export { CodeEditor_default as CodeEditor };

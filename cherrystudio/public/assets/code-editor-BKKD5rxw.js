const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dist-CJI6iDIK.js","./dist-CQs6i879.js","./dist-DAWIImZF.js","./w3c-keyname-DKIRohbk.js","./dist-DhWYlioQ.js","./dist-BpjkQu7h.js","./dist-CD1a-iPc.js","./dist-T3hjJLNJ.js","./esm-BUUpsnFr.js","./dist-DXOhS80f.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as linter, t as esm_default } from "./esm-BG45amY4.js";
import { K as EditorView, it as keymap, pt as Annotation } from "./dist-DAWIImZF.js";
import { i as prepareCodeChanges, r as getNormalizedExtension } from "./utils-D1QIKxFT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var linterLoaders = { json: async () => {
	return linter((await __vitePreload(() => import("./dist-CJI6iDIK.js"), __vite__mapDeps([0,1,2,3]), import.meta.url).then((mod) => mod.jsonParseLinter))());
} };
var specialLanguageLoaders = {
	dot: async () => {
		return (await __vitePreload(() => import("./dist-DhWYlioQ.js"), __vite__mapDeps([4,2,3,5,6]), import.meta.url)).dot();
	},
	mmd: async () => {
		return (await __vitePreload(() => import("./dist-T3hjJLNJ.js"), __vite__mapDeps([7,2,3,5]), import.meta.url)).mermaid();
	}
};
async function loadLanguageExtension(language, languageConfig) {
	const fileExt = await getNormalizedExtension(language, languageConfig);
	const specialLoader = specialLanguageLoaders[fileExt];
	if (specialLoader) try {
		return await specialLoader();
	} catch (error) {
		console.debug(`Failed to load language ${language} (${fileExt})`, error);
		return null;
	}
	try {
		const { loadLanguage } = await __vitePreload(async () => {
			const { loadLanguage: loadLanguage$1 } = await import("./esm-BUUpsnFr.js");
			return { loadLanguage: loadLanguage$1 };
		}, __vite__mapDeps([8,9,2,3,1,5,6]), import.meta.url);
		return loadLanguage(fileExt) || null;
	} catch (error) {
		console.debug(`Failed to load language ${language} (${fileExt})`, error);
		return null;
	}
}
async function loadLinterExtension(language, languageConfig) {
	const fileExt = await getNormalizedExtension(language, languageConfig);
	const loader = linterLoaders[fileExt];
	if (!loader) return null;
	try {
		return await loader();
	} catch (error) {
		console.debug(`Failed to load linter for ${language} (${fileExt})`, error);
		return null;
	}
}
const useLanguageExtensions = (language, lint, languageConfig) => {
	const [extensions, setExtensions] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const loadAllExtensions = async () => {
			try {
				const [languageResult, linterResult] = await Promise.allSettled([loadLanguageExtension(language, languageConfig), lint ? loadLinterExtension(language, languageConfig) : Promise.resolve(null)]);
				if (cancelled) return;
				const results = [];
				if (languageResult.status === "fulfilled" && languageResult.value) results.push(languageResult.value);
				if (linterResult.status === "fulfilled" && linterResult.value) results.push(linterResult.value);
				setExtensions(results);
			} catch (error) {
				if (!cancelled) {
					console.debug("Failed to load language extensions:", error);
					setExtensions([]);
				}
			}
		};
		loadAllExtensions();
		return () => {
			cancelled = true;
		};
	}, [
		language,
		lint,
		languageConfig
	]);
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
var codeEditorGutterTheme = EditorView.theme({
	".cm-gutters": {
		backgroundColor: "transparent",
		borderRight: "none",
		color: "var(--muted-foreground)"
	},
	".cm-activeLineGutter": { backgroundColor: "transparent" }
});
var CodeEditor = ({ ref, value, placeholder, autoFocus, language, languageConfig, onSave, onChange, onBlur, onHeightChange, height, maxHeight, minHeight, options, extensions, theme = "light", fontSize = 16, style, className, editable = true, readOnly = false, expanded = true, wrapped = true, autoScrollToBottom = false }) => {
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
	const shouldStickToBottomRef = (0, import_react.useRef)(true);
	const autoScrollToBottomRef = (0, import_react.useRef)(autoScrollToBottom);
	const expandedRef = (0, import_react.useRef)(expanded);
	const scrollCleanupRef = (0, import_react.useRef)(null);
	const langExtensions = useLanguageExtensions(language, options?.lint, languageConfig);
	const handleSave = (0, import_react.useCallback)(() => {
		const currentDoc = editorViewRef.current?.state.doc.toString() ?? "";
		onSave?.(currentDoc);
	}, [onSave]);
	const insertText = (0, import_react.useCallback)((text) => {
		const editorView = editorViewRef.current;
		if (!editorView) return false;
		editorView.dispatch(editorView.state.replaceSelection(text));
		editorView.focus();
		return true;
	}, []);
	const focus = (0, import_react.useCallback)(() => {
		editorViewRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		autoScrollToBottomRef.current = autoScrollToBottom;
		expandedRef.current = expanded;
		if (!autoScrollToBottom || expanded) shouldStickToBottomRef.current = true;
	}, [autoScrollToBottom, expanded]);
	const updateShouldStickToBottom = (0, import_react.useCallback)((scrollElement) => {
		shouldStickToBottomRef.current = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <= 8;
	}, []);
	const scrollToDocumentBottom = (0, import_react.useCallback)((view) => {
		view.dispatch({ effects: EditorView.scrollIntoView(view.state.doc.length, {
			y: "end",
			x: "nearest"
		}) });
	}, []);
	(0, import_react.useEffect)(() => {
		if (!editorViewRef.current) return;
		const newContent = options?.stream ? (value ?? "").trimEnd() : value ?? "";
		const changes = prepareCodeChanges(editorViewRef.current.state.doc.toString(), newContent);
		if (changes && changes.length > 0) {
			const shouldScrollToBottom = autoScrollToBottom && !expanded && shouldStickToBottomRef.current;
			editorViewRef.current.dispatch({
				changes,
				annotations: [Annotation.define().of(true)],
				...shouldScrollToBottom ? { effects: EditorView.scrollIntoView(newContent.length, {
					y: "end",
					x: "nearest"
				}) } : {}
			});
		}
	}, [
		autoScrollToBottom,
		expanded,
		options?.stream,
		value
	]);
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
			codeEditorGutterTheme,
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
	(0, import_react.useEffect)(() => {
		if (!autoScrollToBottom || expanded || !shouldStickToBottomRef.current || !editorViewRef.current) return;
		scrollToDocumentBottom(editorViewRef.current);
	}, [
		autoScrollToBottom,
		expanded,
		scrollToDocumentBottom
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			scrollCleanupRef.current?.();
			scrollCleanupRef.current = null;
		};
	}, []);
	(0, import_react.useImperativeHandle)(ref, () => ({
		save: handleSave,
		getContent: () => editorViewRef.current?.state.doc.toString() ?? "",
		scrollToLine,
		insertText,
		focus
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(esm_default, {
		value: initialContent.current,
		placeholder,
		autoFocus,
		width: "100%",
		height: expanded ? void 0 : height,
		maxHeight: expanded ? void 0 : maxHeight,
		minHeight,
		editable,
		readOnly,
		theme,
		extensions: customExtensions,
		onCreateEditor: (view) => {
			scrollCleanupRef.current?.();
			editorViewRef.current = view;
			onHeightChange?.(view.scrollDOM?.scrollHeight ?? 0);
			const scrollElement = view.scrollDOM;
			const handleScroll = () => {
				if (autoScrollToBottomRef.current && !expandedRef.current) updateShouldStickToBottom(scrollElement);
			};
			scrollElement.addEventListener("scroll", handleScroll, { passive: true });
			scrollCleanupRef.current = () => scrollElement.removeEventListener("scroll", handleScroll);
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
var code_editor_default = (0, import_react.memo)(CodeEditor);
export { code_editor_default as t };

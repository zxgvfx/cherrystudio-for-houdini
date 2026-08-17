import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as debounce } from "./debounce-RtBWGQ3U.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as useVirtualizer } from "./esm-CA5JRyYP.js";
import { n as useCodeStyle } from "./useCodeStyle-zD0Sb1Ey.js";
import { a as getReactStyleFromToken } from "./shiki-5X_PGXXr.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as uuid } from "./uuid-85lqhJWx.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useCodeHighlight = ({ rawLines, language, callerId }) => {
	const { activeShikiTheme, highlightStreamingCode, cleanupTokenizers } = useCodeStyle();
	const [tokenLines, setTokenLines] = (0, import_react.useState)([]);
	const processingRef = (0, import_react.useRef)(false);
	const latestRequestedContentRef = (0, import_react.useRef)(null);
	const tokenLinesCountRef = (0, import_react.useRef)(0);
	const generationRef = (0, import_react.useRef)(0);
	const shikiThemeRef = (0, import_react.useRef)(activeShikiTheme);
	(0, import_react.useEffect)(() => {
		tokenLinesCountRef.current = tokenLines.length;
	}, [tokenLines]);
	const highlightLines = (0, import_react.useCallback)(async (count) => {
		const targetCount = count === void 0 ? rawLines.length : Math.min(count, rawLines.length);
		if (targetCount < tokenLinesCountRef.current) return;
		latestRequestedContentRef.current = rawLines.slice(0, targetCount).join("\n").trimEnd();
		if (processingRef.current) return;
		processingRef.current = true;
		const generation = generationRef.current;
		try {
			while (latestRequestedContentRef.current !== null) {
				const contentToProcess = latestRequestedContentRef.current;
				latestRequestedContentRef.current = null;
				const result = await highlightStreamingCode(contentToProcess, language, callerId);
				if (generationRef.current !== generation) break;
				if (result.lines.length > 0 || result.recall !== 0) setTokenLines((prev) => {
					return result.recall === -1 ? result.lines : [...prev.slice(0, Math.max(0, prev.length - result.recall)), ...result.lines];
				});
			}
		} finally {
			processingRef.current = false;
		}
	}, [
		rawLines,
		highlightStreamingCode,
		language,
		callerId
	]);
	const resetHighlight = (0, import_react.useCallback)(() => {
		generationRef.current += 1;
		cleanupTokenizers(callerId);
		setTokenLines([]);
	}, [callerId, cleanupTokenizers]);
	(0, import_react.useEffect)(() => {
		if (shikiThemeRef.current !== activeShikiTheme) {
			shikiThemeRef.current = activeShikiTheme;
			resetHighlight();
		}
	}, [activeShikiTheme, resetHighlight]);
	(0, import_react.useEffect)(() => {
		return () => {
			cleanupTokenizers(callerId);
		};
	}, [callerId, cleanupTokenizers]);
	return {
		tokenLines,
		highlightLines,
		resetHighlight
	};
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("CodeViewer");
var CodeViewer = ({ value, language, height, maxHeight, onHeightChange, options, fontSize: customFontSize, className, expanded = true, wrapped = true, onRequestExpand, autoScrollToBottom = false }) => {
	const [_lineNumbers] = usePreference("chat.code.show_line_numbers");
	const [_fontSize] = usePreference("chat.message.font_size");
	const { getShikiPreProperties, isShikiThemeDark } = useCodeStyle();
	const shikiThemeRef = (0, import_react.useRef)(null);
	const scrollerRef = (0, import_react.useRef)(null);
	const callerId = (0, import_react.useRef)(`${Date.now()}-${uuid()}`).current;
	const savedSelectionRef = (0, import_react.useRef)(null);
	const shouldStickToBottomRef = (0, import_react.useRef)(true);
	const wasHighlightEnabledRef = (0, import_react.useRef)(options?.highlight ?? true);
	const selectionBelongsToViewer = (0, import_react.useCallback)((sel) => {
		const scroller = scrollerRef.current;
		if (!scroller || !sel || sel.rangeCount === 0) return false;
		const range = sel.getRangeAt(0);
		return scroller.contains(range.commonAncestorContainer);
	}, []);
	const fontSize = (0, import_react.useMemo)(() => customFontSize ?? _fontSize - 1, [customFontSize, _fontSize]);
	const lineNumbers = (0, import_react.useMemo)(() => options?.lineNumbers ?? _lineNumbers, [options?.lineNumbers, _lineNumbers]);
	const highlight = options?.highlight ?? true;
	const rawLines = (0, import_react.useMemo)(() => typeof value === "string" ? value.trimEnd().split("\n") : [], [value]);
	(0, import_react.useEffect)(() => {
		if (!autoScrollToBottom || expanded) shouldStickToBottomRef.current = true;
	}, [autoScrollToBottom, expanded]);
	const gutterDigits = (0, import_react.useMemo)(() => lineNumbers ? Math.max(rawLines.length.toString().length, 1) : 0, [lineNumbers, rawLines.length]);
	(0, import_react.useLayoutEffect)(() => {
		let mounted = true;
		const shikiTheme = shikiThemeRef.current;
		if (shikiTheme) {
			shikiTheme.className = `code-viewer ${className ?? ""}`;
			shikiTheme.classList.add(isShikiThemeDark ? "shiki-dark" : "shiki-light");
		}
		if (!highlight) return;
		getShikiPreProperties(language).then((properties) => {
			if (!mounted) return;
			const shikiTheme$1 = shikiThemeRef.current;
			if (shikiTheme$1) {
				shikiTheme$1.className = `${properties.class || "shiki"} code-viewer ${className ?? ""}`;
				shikiTheme$1.classList.add(isShikiThemeDark ? "shiki-dark" : "shiki-light");
				if (properties.style) shikiTheme$1.style.cssText += `${properties.style}`;
			}
		});
		return () => {
			mounted = false;
		};
	}, [
		language,
		getShikiPreProperties,
		isShikiThemeDark,
		className,
		highlight
	]);
	const saveSelection = (0, import_react.useCallback)(() => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
		if (!selectionBelongsToViewer(selection)) return null;
		const range = selection.getRangeAt(0);
		if (!scrollerRef.current) return null;
		const findLineAndOffset = (node, offset) => {
			let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
			while (element) {
				if (element.classList?.contains("line-number")) {
					const lineContent$1 = element.parentElement?.querySelector(".line-content");
					if (lineContent$1) {
						element = lineContent$1;
						break;
					}
				}
				if (element.hasAttribute("data-index")) break;
				element = element.parentElement;
			}
			if (!element || !element.hasAttribute("data-index")) {
				logger.warn("Could not find data-index element", {
					nodeName: node.nodeName,
					nodeType: node.nodeType
				});
				return null;
			}
			const lineIndex = parseInt(element.getAttribute("data-index") || "0", 10);
			const lineContent = element.querySelector(".line-content") || element;
			let charOffset = 0;
			if (node.nodeType === Node.TEXT_NODE) {
				const walker = document.createTreeWalker(lineContent, NodeFilter.SHOW_TEXT);
				let currentNode;
				while (currentNode = walker.nextNode()) {
					if (currentNode === node) {
						charOffset += offset;
						break;
					}
					charOffset += currentNode.textContent?.length || 0;
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) charOffset = (node.textContent?.slice(0, offset) || "").length;
			logger.debug("findLineAndOffset result", {
				lineIndex,
				charOffset
			});
			return {
				line: lineIndex,
				offset: charOffset
			};
		};
		const start = findLineAndOffset(range.startContainer, range.startOffset);
		const end = findLineAndOffset(range.endContainer, range.endOffset);
		if (!start || !end) {
			logger.warn("saveSelection failed", {
				hasStart: !!start,
				hasEnd: !!end
			});
			return null;
		}
		logger.debug("saveSelection success", {
			startLine: start.line,
			startOffset: start.offset,
			endLine: end.line,
			endOffset: end.offset
		});
		return {
			startLine: start.line,
			startOffset: start.offset,
			endLine: end.line,
			endOffset: end.offset
		};
	}, [selectionBelongsToViewer]);
	const handleScroll = (0, import_react.useCallback)(() => {
		const scroller = scrollerRef.current;
		if (scroller && autoScrollToBottom && !expanded) shouldStickToBottomRef.current = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= 8;
		const saved = saveSelection();
		if (saved) {
			savedSelectionRef.current = saved;
			logger.debug("Selection saved for copy", {
				startLine: saved.startLine,
				endLine: saved.endLine
			});
		}
	}, [
		autoScrollToBottom,
		expanded,
		saveSelection
	]);
	const handleCopy = (0, import_react.useCallback)((event) => {
		const selection = window.getSelection();
		if (!selectionBelongsToViewer(selection)) return;
		if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
		let saved = savedSelectionRef.current;
		if (!saved) saved = saveSelection();
		if (!saved) {
			logger.warn("Cannot get selection, using browser default");
			return;
		}
		const { startLine, startOffset, endLine, endOffset } = saved;
		const needsCustomCopy = !expanded;
		logger.debug("Copy event", {
			startLine,
			endLine,
			startOffset,
			endOffset,
			expanded,
			needsCustomCopy,
			usedSavedSelection: !!savedSelectionRef.current
		});
		if (needsCustomCopy) try {
			const selectedLines = [];
			for (let i = startLine; i <= endLine; i++) {
				const line = rawLines[i] || "";
				if (i === startLine && i === endLine) selectedLines.push(line.slice(startOffset, endOffset));
				else if (i === startLine) selectedLines.push(line.slice(startOffset));
				else if (i === endLine) selectedLines.push(line.slice(0, endOffset));
				else selectedLines.push(line);
			}
			const fullText = selectedLines.join("\n");
			logger.debug("Custom copy success", {
				linesCount: selectedLines.length,
				totalLength: fullText.length,
				firstLine: selectedLines[0]?.slice(0, 30),
				lastLine: selectedLines[selectedLines.length - 1]?.slice(0, 30)
			});
			if (!event.clipboardData) {
				logger.warn("clipboardData unavailable, using browser default copy");
				return;
			}
			event.clipboardData.setData("text/plain", fullText);
			event.preventDefault();
		} catch (error) {
			logger.error("Custom copy failed", { error });
		}
	}, [
		selectionBelongsToViewer,
		expanded,
		saveSelection,
		rawLines
	]);
	const getScrollElement = (0, import_react.useCallback)(() => scrollerRef.current, []);
	const getItemKey = (0, import_react.useCallback)((index) => `${callerId}-${index}`, [callerId]);
	const estimateSize = (0, import_react.useCallback)(() => Math.round(fontSize * 1.6), [fontSize]);
	const virtualizer = useVirtualizer({
		count: rawLines.length,
		getScrollElement,
		getItemKey,
		estimateSize,
		overscan: 20
	});
	const virtualItems = virtualizer.getVirtualItems();
	const totalSize = virtualizer.getTotalSize();
	const { tokenLines, highlightLines, resetHighlight } = useCodeHighlight({
		rawLines,
		language,
		callerId
	});
	const debouncedHighlightLines = (0, import_react.useMemo)(() => debounce(highlightLines, 300), [highlightLines]);
	(0, import_react.useEffect)(() => {
		if (highlight) {
			wasHighlightEnabledRef.current = true;
			return;
		}
		debouncedHighlightLines.cancel();
		if (wasHighlightEnabledRef.current) {
			resetHighlight();
			wasHighlightEnabledRef.current = false;
		}
	}, [
		debouncedHighlightLines,
		highlight,
		resetHighlight
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			debouncedHighlightLines.cancel();
		};
	}, [debouncedHighlightLines]);
	(0, import_react.useEffect)(() => {
		if (!highlight) return;
		if (virtualItems.length > 0 && shikiThemeRef.current) {
			const lastIndex = virtualItems[virtualItems.length - 1].index;
			debouncedHighlightLines(lastIndex + 1);
		}
	}, [
		virtualItems,
		debouncedHighlightLines,
		highlight
	]);
	const handleSelectionChange = (0, import_react.useMemo)(() => debounce(() => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
			savedSelectionRef.current = null;
			return;
		}
		if (!selectionBelongsToViewer(selection)) {
			savedSelectionRef.current = null;
			return;
		}
		if (!expanded && onRequestExpand) {
			const saved = saveSelection();
			if (saved && saved.endLine > saved.startLine) {
				logger.debug("Multi-line selection detected in collapsed state, requesting expand", {
					startLine: saved.startLine,
					endLine: saved.endLine
				});
				onRequestExpand();
			}
		}
	}, 100), [
		expanded,
		onRequestExpand,
		saveSelection,
		selectionBelongsToViewer
	]);
	(0, import_react.useEffect)(() => {
		document.addEventListener("selectionchange", handleSelectionChange);
		return () => {
			document.removeEventListener("selectionchange", handleSelectionChange);
			handleSelectionChange.cancel();
		};
	}, [handleSelectionChange]);
	(0, import_react.useEffect)(() => {
		const scroller = scrollerRef.current;
		if (!scroller) return;
		scroller.addEventListener("copy", handleCopy);
		return () => {
			scroller.removeEventListener("copy", handleCopy);
		};
	}, [handleCopy]);
	(0, import_react.useLayoutEffect)(() => {
		onHeightChange?.(scrollerRef.current?.scrollHeight ?? 0);
	}, [rawLines.length, onHeightChange]);
	(0, import_react.useLayoutEffect)(() => {
		const scroller = scrollerRef.current;
		if (!scroller || !autoScrollToBottom || expanded || !shouldStickToBottomRef.current) return;
		scroller.scrollTop = scroller.scrollHeight;
	}, [
		autoScrollToBottom,
		expanded,
		rawLines.length,
		totalSize
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.code-viewer",
		ref: shikiThemeRef,
		style: expanded ? void 0 : { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scrollerRef,
			className: "shiki-scroller relative block overflow-x-auto rounded-[inherit] py-[0.5em] pr-0 pl-[1em]",
			onScroll: handleScroll,
			style: {
				"--gutter-width": `${gutterDigits}ch`,
				"--line-height": `${estimateSize()}px`,
				fontSize,
				height: expanded ? void 0 : height,
				maxHeight: expanded ? void 0 : maxHeight,
				overflowY: expanded ? "hidden" : "auto"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shiki-list",
				style: {
					height: `${totalSize}px`,
					width: "100%",
					position: "relative"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						transform: `translateY(${virtualItems[0]?.start ?? 0}px)`
					},
					children: virtualItems.map((virtualItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-index": virtualItem.index,
						ref: virtualizer.measureElement,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualizedRow, {
							rawLine: rawLines[virtualItem.index],
							tokenLine: highlight ? tokenLines[virtualItem.index] : void 0,
							highlightEnabled: highlight,
							showLineNumbers: lineNumbers,
							expanded,
							wrapped,
							index: virtualItem.index,
							isDarkTheme: isShikiThemeDark
						})
					}, virtualItem.key))
				})
			})
		})
	});
};
CodeViewer.displayName = "CodeViewer";
var dimmedTokenStyle = {
	color: "inherit",
	bgColor: "inherit",
	htmlStyle: { opacity: "0.35" }
};
var plainTokenStyle = {
	color: "inherit",
	bgColor: "inherit",
	htmlStyle: { opacity: "1" }
};
var VirtualizedRow = (0, import_react.memo)(({ rawLine, tokenLine, highlightEnabled, showLineNumbers, expanded, wrapped, index, isDarkTheme }) => {
	const completeTokenLine = (0, import_react.useMemo)(() => {
		const fallbackTokenStyle = highlightEnabled ? dimmedTokenStyle : plainTokenStyle;
		if (rawLine.length === 0) return [{
			content: "",
			offset: 0,
			...fallbackTokenStyle
		}];
		const currentTokens = tokenLine ?? [];
		const themedContentLength = currentTokens.reduce((acc, token) => acc + token.content.length, 0);
		if (themedContentLength >= rawLine.length) return currentTokens;
		return [...currentTokens, {
			content: rawLine.slice(themedContentLength),
			offset: themedContentLength,
			...fallbackTokenStyle
		}];
	}, [
		rawLine,
		tokenLine,
		highlightEnabled
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.code-viewer",
		className: "line flex w-full items-start leading-[var(--line-height)]",
		style: {
			contain: wrapped ? "content" : "none",
			willChange: !wrapped && !expanded ? "transform" : "auto"
		},
		children: [showLineNumbers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-number mr-4 shrink-0 select-none overflow-hidden text-right font-[inherit] tabular-nums opacity-[0.35]",
			style: { width: "var(--gutter-width, 1.2ch)" },
			children: index + 1
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("line-content min-w-0 flex-1 whitespace-pre pr-[1em]", wrapped ? "[&_*]:whitespace-pre-wrap! [&_*]:break-words!" : "[&_*]:whitespace-pre [&_*]:break-normal"),
			children: completeTokenLine.map((token, tokenIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: getReactStyleFromToken(token, { isDarkTheme }),
				children: token.content
			}, tokenIndex))
		})]
	});
});
VirtualizedRow.displayName = "VirtualizedRow";
var CodeViewer_default = (0, import_react.memo)(CodeViewer);
export { CodeViewer_default as t };

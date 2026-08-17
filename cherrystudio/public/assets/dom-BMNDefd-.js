import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as CaseSensitive } from "./case-sensitive-CNfz_-lt.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as ChevronUp } from "./chevron-up-BpQ6VO2x.js";
import { t as User } from "./user-REiQoKAP.js";
import { t as WholeWord } from "./whole-word-DkilLdgR.js";
import { t as X } from "./x-Bh2_A30k.js";
import { t as ActionIconButton_default } from "./ActionIconButton-U46vSGu9.js";
import { ht as NarrowLayout_default } from "./dist-DRPoOLZR.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const INITIAL_FIND_BAR_STATE = {
	enabled: false,
	query: "",
	caseSensitive: false,
	wholeWord: false,
	includeUser: false
};
function EditorPlacement({ children }) {
	const [narrowMode] = usePreference("chat.narrow_mode");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.editor-placement",
		className: "absolute inset-x-0 top-0 z-[999] flex flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NarrowLayout_default, {
			narrowMode,
			className: "w-full",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[5px]" })]
	});
}
function FindBar({ matchCount, currentIndex, onNavigate, onStateChange, placement = "message-list", showUserToggle = true, ref }) {
	const { t } = useTranslation();
	const inputRef = (0, import_react.useRef)(null);
	const [state, setState] = (0, import_react.useState)(() => ({ ...INITIAL_FIND_BAR_STATE }));
	const [focusSequence, setFocusSequence] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		onStateChange(state);
	}, [onStateChange, state]);
	const focus = (0, import_react.useCallback)(() => {
		setFocusSequence((sequence) => sequence + 1);
	}, []);
	const disable = (0, import_react.useCallback)(() => {
		setState((current) => ({
			...current,
			enabled: false
		}));
	}, []);
	const enable = (0, import_react.useCallback)((initialText) => {
		setState((current) => ({
			...current,
			enabled: true,
			...initialText?.trim() ? { query: initialText } : {}
		}));
		setFocusSequence((sequence) => sequence + 1);
	}, []);
	(0, import_react.useImperativeHandle)(ref, () => ({
		disable,
		enable
	}), [disable, enable]);
	(0, import_react.useEffect)(() => {
		if (!state.enabled || focusSequence === 0) return;
		inputRef.current?.focus();
		inputRef.current?.select();
	}, [focusSequence, state.enabled]);
	const handleInputKeyDown = (0, import_react.useCallback)((event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			onNavigate(event.shiftKey ? -1 : 1);
		} else if (event.key === "Escape") {
			event.stopPropagation();
			disable();
		}
	}, [disable, onNavigate]);
	const updateToggle = (0, import_react.useCallback)((key) => {
		setState((current) => ({
			...current,
			[key]: !current[key]
		}));
		focus();
	}, [focus]);
	if (!state.enabled) return null;
	const searchBar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.find-bar",
		className: cn("z-10 flex items-center justify-center rounded-[10px] border border-primary bg-background px-[15px] py-[5px]", placement === "message-list" ? "absolute top-0 right-5 w-[400px] max-w-[calc(100%-2.5rem)]" : "absolute top-[15px] right-5 left-5 mb-[5px]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-[1_1_auto] items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					"aria-label": t("chat.assistant.search.placeholder"),
					value: state.query,
					onChange: (event) => setState((current) => ({
						...current,
						query: event.target.value
					})),
					onKeyDown: handleInputKeyDown,
					placeholder: t("chat.assistant.search.placeholder"),
					className: "w-full flex-1 border-none bg-transparent px-[5px] py-0 font-[Ubuntu] text-[14px] text-foreground leading-5 outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center",
					children: [
						showUserToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.includes_user_questions"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.includes_user_questions"),
								"aria-pressed": state.includeUser,
								onClick: () => updateToggle("includeUser"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 18,
									style: { color: state.includeUser ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.case_sensitive"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.case_sensitive"),
								"aria-pressed": state.caseSensitive,
								onClick: () => updateToggle("caseSensitive"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseSensitive, {
									size: 18,
									style: { color: state.caseSensitive ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.whole_word"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.whole_word"),
								"aria-pressed": state.wholeWord,
								onClick: () => updateToggle("wholeWord"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WholeWord, {
									size: 18,
									style: { color: state.wholeWord ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-[2px] h-[1.5em] w-px flex-[0_0_auto] bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-[2px] flex w-20 flex-[0_0_auto] justify-center font-[Ubuntu] text-[14px] text-foreground",
				children: matchCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentIndex + 1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: matchCount })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-50",
					children: "0/0"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-row items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.previous"),
						onClick: () => {
							onNavigate(-1);
							focus();
						},
						disabled: matchCount === 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.next"),
						onClick: () => {
							onNavigate(1);
							focus();
						},
						disabled: matchCount === 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.close"),
						onClick: disable,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})
				]
			})
		]
	});
	return placement === "editor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPlacement, { children: searchBar }) : searchBar;
}
var WORD_SEGMENTER = new Intl.Segmenter(["zh-CN", "en-US"], { granularity: "word" });
var escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function findTextMatches(text, searchText, options) {
	if (!searchText) return [];
	const regex = new RegExp(escapeRegExp(searchText), options.caseSensitive ? "gu" : "giu");
	const matches = Array.from(text.matchAll(regex), (match) => ({
		start: match.index,
		end: match.index + match[0].length
	}));
	if (!options.wholeWord || matches.length === 0) return matches;
	const wordStarts = /* @__PURE__ */ new Set();
	const wordEnds = /* @__PURE__ */ new Set();
	for (const segment of WORD_SEGMENTER.segment(text)) {
		if (!segment.isWordLike) continue;
		wordStarts.add(segment.index);
		wordEnds.add(segment.index + segment.segment.length);
	}
	return matches.filter((match) => wordStarts.has(match.start) && wordEnds.has(match.end));
}
function findRangesInScope(root, searchText, options, filter) {
	const ranges = [];
	const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, filter);
	const allTextNodes = [];
	let fullText = "";
	while (treeWalker.nextNode()) {
		allTextNodes.push({
			node: treeWalker.currentNode,
			startOffset: fullText.length
		});
		fullText += treeWalker.currentNode.nodeValue;
	}
	for (const match of findTextMatches(fullText, searchText, options)) {
		let startNode = null;
		let endNode = null;
		let startOffset = 0;
		let endOffset = 0;
		for (const nodeInfo of allTextNodes) {
			const nodeLength = nodeInfo.node.nodeValue?.length ?? 0;
			if (startNode === null && match.start >= nodeInfo.startOffset && match.start < nodeInfo.startOffset + nodeLength) {
				startNode = nodeInfo.node;
				startOffset = match.start - nodeInfo.startOffset;
			}
			if (match.end > nodeInfo.startOffset && match.end <= nodeInfo.startOffset + nodeLength) {
				endNode = nodeInfo.node;
				endOffset = match.end - nodeInfo.startOffset;
				break;
			}
		}
		if (startNode && endNode) {
			const range = new Range();
			range.setStart(startNode, startOffset);
			range.setEnd(endNode, endOffset);
			ranges.push(range);
		}
	}
	return ranges;
}
const supportsCustomHighlights = () => typeof CSS !== "undefined" && CSS.highlights !== void 0 && typeof Highlight !== "undefined";
var logger = loggerService.withContext("utils/dom");
function scrollIntoView(element, options) {
	if (!element) {
		logger.warn("[scrollIntoView] Unexpected falsy element. Do nothing as fallback.");
		return;
	}
	element.scrollIntoView(options ?? {
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	});
}
function scrollElementIntoView(element, scrollContainer, behavior = "smooth") {
	if (!scrollContainer) {
		scrollIntoView(element, {
			behavior,
			block: "center",
			inline: "nearest"
		});
		return;
	}
	if (scrollContainer.scrollHeight > scrollContainer.clientHeight || scrollContainer.scrollWidth > scrollContainer.clientWidth) {
		const containerRect = scrollContainer.getBoundingClientRect();
		const elRect = element.getBoundingClientRect();
		const desiredTop = elRect.top - containerRect.top + scrollContainer.scrollTop - Math.max(0, scrollContainer.clientHeight - elRect.height) / 2;
		scrollContainer.scrollTo({
			top: Math.max(0, desiredTop),
			behavior
		});
	} else scrollIntoView(element, {
		behavior,
		block: "center",
		inline: "nearest"
	});
}
export { supportsCustomHighlights as a, findTextMatches as i, scrollIntoView as n, FindBar as o, findRangesInScope as r, INITIAL_FIND_BAR_STATE as s, scrollElementIntoView as t };

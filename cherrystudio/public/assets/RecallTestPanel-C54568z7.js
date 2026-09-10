import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { i as formatErrorMessageWithPrefix } from "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import "./with-selector-DlsRhNV6.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import "./CacheService-IyXh62g9.js";
import { t as useCache } from "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as ChevronDown } from "./chevron-down-CZ6Nbooa.js";
import { t as ChevronUp } from "./chevron-up-BpEcGzB1.js";
import { t as Clock } from "./clock-DcIjZCu0.js";
import { t as Copy } from "./copy-DHwrRvn7.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as History } from "./history-BeiErk8i.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as Search } from "./search-CafLf998.js";
import { t as Sparkles } from "./sparkles-D4OSBloB.js";
import { t as X } from "./x-CpgfqVTG.js";
import { t as Zap } from "./zap-zNly-w2p.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./group-Cqj37oRb.js";
import "./knowledge-8Me8AnnG.js";
import { t as useTemporaryValue } from "./useTemporaryValue-CJVn11gD.js";
import { r as normalizeKnowledgeError } from "./error-Bm05Af8U.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var MAX_HISTORY_QUERY_COUNT = 5;
const prependHistoryQuery = (queries, query) => {
	return [query, ...queries.filter((item) => item !== query)].slice(0, MAX_HISTORY_QUERY_COUNT);
};
const formatRecallScore = (score) => score.toFixed(2);
const formatRecallPercent = (score) => `${Math.round(Math.max(0, Math.min(score, 1)) * 100)}%`;
const mapRecallResult = (result) => {
	return {
		id: result.chunkId,
		sourceName: result.metadata.source,
		chunkIndex: result.metadata.chunkIndex,
		tokenCount: result.metadata.tokenCount,
		score: result.score,
		scoreKind: result.scoreKind,
		rank: result.rank,
		content: result.pageContent,
		plainText: result.pageContent
	};
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger$1 = loggerService.withContext("KnowledgeV2RecallTest");
var RecallQueryContext = (0, import_react.createContext)(null);
var RecallResultContext = (0, import_react.createContext)(null);
const useRecallQuery = () => {
	const context = (0, import_react.use)(RecallQueryContext);
	if (!context) throw new Error("Recall query components must be used within RecallTestProvider");
	return context;
};
const useRecallResult = () => {
	const context = (0, import_react.use)(RecallResultContext);
	if (!context) throw new Error("Recall result components must be used within RecallTestProvider");
	return context;
};
var RecallTestProvider = ({ baseId, children }) => {
	const { t } = useTranslation();
	const latestSearchIdRef = (0, import_react.useRef)(0);
	const [query, setQuery] = (0, import_react.useState)("");
	const [historyQueriesByBaseId, setHistoryQueriesByBaseId] = useCache("knowledge.recall.search_queries");
	const [isHistoryOpen, setIsHistoryOpen] = (0, import_react.useState)(false);
	const [hasSearched, setHasSearched] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)([]);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [isSearching, setIsSearching] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		latestSearchIdRef.current += 1;
		setQuery("");
		setIsHistoryOpen(false);
		setHasSearched(false);
		setResults([]);
		setDuration(0);
		setIsSearching(false);
		return () => {
			latestSearchIdRef.current += 1;
		};
	}, [baseId]);
	const historyItems = (historyQueriesByBaseId[baseId] ?? []).map((query$1) => ({
		id: query$1,
		query: query$1
	}));
	const scoreKind = results[0]?.scoreKind ?? null;
	const topScore = scoreKind === "relevance" ? results.reduce((score, item) => Math.max(score, item.score), 0) : 0;
	const runSearch = async () => {
		const trimmedQuery = query.trim();
		if (trimmedQuery.length === 0) return;
		setHistoryQueriesByBaseId((prev) => ({
			...prev,
			[baseId]: prependHistoryQuery(prev[baseId] ?? [], trimmedQuery)
		}));
		const searchId = latestSearchIdRef.current + 1;
		latestSearchIdRef.current = searchId;
		const searchBaseId = baseId;
		const isCurrentSearch = () => latestSearchIdRef.current === searchId;
		setIsSearching(true);
		setResults([]);
		const startTime = performance.now();
		try {
			const searchResults = await ipcApi.request("knowledge.search", {
				baseId: searchBaseId,
				query: trimmedQuery
			});
			logger$1.info("Knowledge recall search IPC result", {
				baseId: searchBaseId,
				query: trimmedQuery,
				results: searchResults
			});
			if (!isCurrentSearch()) return;
			setResults(searchResults.map(mapRecallResult));
		} catch (error) {
			const normalizedError = normalizeKnowledgeError(error);
			logger$1.error("Knowledge recall search IPC failed", normalizedError, {
				baseId: searchBaseId,
				query: trimmedQuery
			});
			if (!isCurrentSearch()) return;
			toast.error(formatErrorMessageWithPrefix(normalizedError, t("knowledge.recall.search_failed")));
			setResults([]);
		}
		if (!isCurrentSearch()) return;
		setDuration(Math.round(performance.now() - startTime));
		setIsSearching(false);
		setHasSearched(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallQueryContext, {
		value: {
			state: {
				query,
				historyItems,
				isHistoryOpen
			},
			actions: {
				setQuery,
				setHistoryOpen: setIsHistoryOpen,
				runSearch,
				selectHistory: (item) => {
					setQuery(item.query);
					setIsHistoryOpen(false);
				},
				removeHistory: (historyId) => setHistoryQueriesByBaseId((prev) => ({
					...prev,
					[baseId]: (prev[baseId] ?? []).filter((item) => item !== historyId)
				})),
				clearHistory: () => setHistoryQueriesByBaseId((prev) => ({
					...prev,
					[baseId]: []
				}))
			},
			meta: { baseId }
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallResultContext, {
			value: (0, import_react.useMemo)(() => ({ state: {
				isSearching,
				hasSearched,
				results,
				duration,
				topScore,
				scoreKind
			} }), [
				duration,
				hasSearched,
				isSearching,
				results,
				scoreKind,
				topScore
			]),
			children
		})
	});
};
var RecallTestProvider_default = RecallTestProvider;
var RecallHistoryList = () => {
	const { t } = useTranslation();
	const { state: { historyItems }, actions: { selectHistory, removeHistory, clearHistory } } = useRecallQuery();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.recall-history-list",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-0.5 flex items-center justify-between px-2 py-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground-tertiary text-xs leading-4",
				children: t("knowledge.recall.history_title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				className: "h-auto min-h-0 rounded-none p-0 text-muted-foreground text-xs leading-4 shadow-none transition-colors hover:bg-transparent hover:text-destructive",
				onClick: clearHistory,
				children: t("knowledge.recall.history_clear")
			})]
		}), historyItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group/hist flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-accent",
			onClick: () => selectHistory(item),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex min-w-0 flex-1 items-center gap-2 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5 shrink-0 text-foreground-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate text-foreground text-sm leading-5",
					children: item.query
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": t("knowledge.recall.history_remove"),
				className: "shrink-0 cursor-default text-muted-foreground opacity-0 transition-all hover:text-destructive group-hover/hist:opacity-100",
				onClick: (event) => {
					event.stopPropagation();
					removeHistory(item.id);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
			})]
		}, item.id))]
	});
};
var RecallHistoryList_default = RecallHistoryList;
var RecallSearchBar = () => {
	const { t } = useTranslation();
	const { state: { query, historyItems, isHistoryOpen }, actions: { setQuery, setHistoryOpen, runSearch } } = useRecallQuery();
	const { state: { isSearching } } = useRecallResult();
	const canSearch = query.trim().length > 0 && !isSearching;
	const hasHistory = historyItems.length > 0;
	const closeHistoryOnInputBlur = (event) => {
		const nextFocusedElement = event.relatedTarget;
		if (nextFocusedElement instanceof HTMLElement && nextFocusedElement.closest("[data-recall-history]")) return;
		setHistoryOpen(false);
	};
	const keepInputFocus = (event) => {
		event.preventDefault();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.recall-search-bar",
		className: "mx-auto flex w-full max-w-3xl items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-1 items-center gap-1.5 rounded-lg border border-border-subtle bg-transparent px-2.5 py-1.25 transition-all focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50 focus-within:ring-inset",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 shrink-0 text-foreground-tertiary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					onFocus: () => setHistoryOpen(hasHistory),
					onBlur: closeHistoryOnInputBlur,
					onKeyDown: (event) => {
						if (event.key === "Enter" && canSearch) {
							runSearch();
							setHistoryOpen(false);
						}
					},
					placeholder: t("knowledge.recall.placeholder"),
					className: "h-auto flex-1 border-0 bg-transparent px-0 py-0 text-foreground text-sm leading-5 shadow-none placeholder:text-muted-foreground placeholder:text-sm focus-visible:border-0 focus-visible:ring-0"
				}),
				hasHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					tabIndex: -1,
					className: `min-h-0 shrink-0 rounded-none p-0 shadow-none transition-colors hover:bg-transparent hover:text-foreground ${isHistoryOpen ? "text-primary" : "text-muted-foreground"}`,
					onMouseDown: keepInputFocus,
					onClick: (event) => {
						event.stopPropagation();
						setHistoryOpen(!isHistoryOpen);
					},
					"aria-label": t("knowledge.recall.history_title"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" })
				}) : null,
				hasHistory && isHistoryOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-recall-history": true,
					className: "absolute top-full right-0 left-0 z-300 mt-1 max-h-45 overflow-y-auto rounded-lg border border-border bg-popover p-1 shadow-lg [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-0.75",
					onMouseDown: keepInputFocus,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallHistoryList_default, {})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "default",
			size: "sm",
			disabled: !canSearch,
			onClick: () => {
				runSearch();
				setHistoryOpen(false);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), t("knowledge.recall.submit")]
		})]
	});
};
var RecallSearchBar_default = RecallSearchBar;
var logger = loggerService.withContext("RecallResultCard");
var RecallResultCard = ({ item, index }) => {
	const { t } = useTranslation();
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(false);
	const [copied, setCopiedTemporarily] = useTemporaryValue(false, 2e3);
	const scoreLabel = item.scoreKind === "relevance" ? t("knowledge.recall.result_relevance", { score: formatRecallPercent(item.score) }) : t("knowledge.recall.result_rank", { rank: item.rank });
	const copyContent = async () => {
		try {
			await navigator.clipboard.writeText(item.plainText);
			setCopiedTemporarily(true);
		} catch (error) {
			const normalizedError = normalizeKnowledgeError(error);
			logger.error("Failed to copy recall result content", normalizedError, {
				resultId: item.id,
				sourceName: item.sourceName,
				chunkIndex: item.chunkIndex
			});
			toast.error(t("message.copy.failed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.recall-result-card",
		className: "group/chunk rounded-md border border-border-subtle bg-background transition-all hover:border-border-strong",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-5 shrink-0 items-center justify-center rounded bg-background-subtle text-foreground-tertiary text-xs leading-4",
					children: index + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 shrink-0 text-foreground-tertiary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-foreground-tertiary text-xs leading-4",
							children: item.sourceName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-foreground-tertiary text-xs leading-3",
							children: ["#", item.chunkIndex]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-16 text-right text-foreground-tertiary text-xs tabular-nums leading-4",
						children: scoreLabel
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					"aria-label": t("knowledge.recall.copy"),
					className: `size-5 min-h-5 shrink-0 rounded p-0 shadow-none transition-all hover:bg-accent hover:text-foreground group-hover/chunk:opacity-100 ${copied ? "text-success opacity-100" : "text-muted-foreground opacity-0"}`,
					onClick: () => void copyContent(),
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					"aria-label": t(isExpanded ? "knowledge.recall.collapse" : "knowledge.recall.expand"),
					className: "size-5 min-h-5 shrink-0 rounded p-0 text-muted-foreground shadow-none transition-all hover:bg-accent hover:text-foreground",
					onClick: () => setIsExpanded((current) => !current),
					children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 overflow-hidden px-3 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `wrap-anywhere min-w-0 whitespace-normal text-muted-foreground text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`,
				children: item.content
			})
		})]
	});
};
var RecallResultCard_default = RecallResultCard;
var RecallResultSummary = () => {
	const { t } = useTranslation();
	const { state: { results, duration, topScore, scoreKind } } = useRecallResult();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.recall-result-summary",
		className: "flex items-center justify-between gap-4 border-border-subtle border-b px-4 py-3 text-foreground-tertiary text-xs leading-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), t("knowledge.recall.result_count", { count: results.length })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), t("knowledge.recall.duration", { duration })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scoreKind === "ranking" ? t("knowledge.recall.ranking_only") : t("knowledge.recall.top_score", { score: results.length === 0 ? formatRecallScore(topScore) : formatRecallPercent(topScore) }) })
			]
		})
	});
};
var RecallResults = () => {
	const { state: { results } } = useRecallResult();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.recall-results",
		className: "mx-auto h-full w-full min-w-0 max-w-3xl overflow-y-auto overflow-x-hidden rounded-lg border border-border-subtle bg-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallResultSummary, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 space-y-2 p-3",
			children: results.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallResultCard_default, {
				item,
				index
			}, item.id))
		})]
	});
};
var RecallEmptyState = () => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.recall-empty-state",
		className: "h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			preset: "no-result",
			title: t("knowledge.recall.empty_title"),
			description: t("knowledge.recall.empty_description"),
			className: "h-full"
		})
	});
};
var RecallSearchingState = () => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.recall-searching-state",
		className: "flex h-full min-h-full flex-col items-center justify-center py-12 text-center text-foreground-tertiary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5.5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-5",
			children: t("knowledge.recall.searching")
		})]
	});
};
var RecallTestBody = () => {
	const { state: { isSearching, hasSearched } } = useRecallResult();
	if (isSearching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.recall-test-body",
		className: "h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallSearchingState, {})
	});
	if (hasSearched) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallResults, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallEmptyState, {});
};
var RecallTestBody_default = RecallTestBody;
var RecallTestPanel = ({ baseId }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallTestProvider_default, {
		baseId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-full min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-x-hidden px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallSearchBar_default, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 min-w-0 overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallTestBody_default, {})
			})]
		})
	}, baseId);
};
var RecallTestPanel_default = RecallTestPanel;
export { RecallTestPanel_default as default };

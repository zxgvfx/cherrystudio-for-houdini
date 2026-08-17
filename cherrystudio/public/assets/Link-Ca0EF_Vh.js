import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { p as axios_default } from "./error-B2Op57SY.js";
import { t as omit } from "./omit-zFeZgsBE.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as UiDataSlot } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as NormalTooltip } from "./tooltip-CJBVkA5B.js";
import { n as HoverCardContent, r as HoverCardTrigger, t as HoverCard } from "./hover-card-CdD1RjhB.js";
import { t as Skeleton } from "./skeleton-BZtoNVvM.js";
import { n as CommandContextMenu } from "./command-CtEyUhIg.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { i as useSWRConfig } from "./index-TMMTgJj7.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { t as FileSearch } from "./file-search-G2GGdFuU.js";
import { t as v4_default } from "./v4-B6Ihluzs.js";
import { t as useTemporaryValue } from "./useTemporaryValue-kBhuEh30.js";
import { t as Parser } from "./Parser-DPwNZwi0.js";
import { n as findCitationInChildren } from "./markdownLight-CPb9cwdQ.js";
import { lt as useOptionalMessageListActions, m as isKnownNavigationPath, p as NavigateToolInline } from "./agent-MQkn_hV_.js";
import { t as useSWRImmutable } from "./immutable-BfjW-ZDx.js";
import { t as FallbackFavicon_default } from "./FallbackFavicon-DZTDVx89.js";
import { t as MarqueeText_default } from "./MarqueeText-CbNvtFcP.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger$1 = loggerService.withContext("SelectionContextMenu");
var TEXT_BLOCK_TAGS = new Set([
	"BLOCKQUOTE",
	"DIV",
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"LI",
	"P",
	"PRE",
	"TR"
]);
function extractSelectedText(selection) {
	if (selection.rangeCount === 0 || selection.isCollapsed) return "";
	const range = selection.getRangeAt(0).cloneRange();
	const startElement = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
	const endElement = range.endContainer instanceof Element ? range.endContainer : range.endContainer.parentElement;
	const startKatex = startElement?.closest(".katex");
	const endKatex = endElement?.closest(".katex");
	if (startKatex) range.setStartBefore(startKatex);
	if (endKatex) range.setEndAfter(endKatex);
	const fragment = range.cloneContents();
	const hasLineNumbers = fragment.querySelectorAll(".line-number").length > 0;
	const katexMathMlElements = fragment.querySelectorAll(".katex-mathml");
	const hasKatex = katexMathMlElements.length > 0;
	if (!hasLineNumbers && !hasKatex) return selection.toString();
	fragment.querySelectorAll(".line-number").forEach((el) => el.remove());
	fragment.querySelectorAll(".katex-mathml + .katex-html").forEach((el) => el.remove());
	katexMathMlElements.forEach((element) => {
		const texSource = element.querySelector("annotation")?.textContent;
		if (texSource !== null && texSource !== void 0) element.replaceWith(document.createTextNode(texSource));
	});
	const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
	let result = "";
	let node = walker.nextNode();
	while (node) {
		if (node.nodeType === Node.TEXT_NODE) result += node.textContent;
		else if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node;
			if (element.tagName === "BR") result += "\n";
			else if (result.length > 0 && !result.endsWith("\n") && (TEXT_BLOCK_TAGS.has(element.tagName) || element.classList.contains("line"))) result += "\n";
		}
		node = walker.nextNode();
	}
	return result;
}
var SelectionContextMenu = ({ children }) => {
	const { t } = useTranslation();
	const [selectedText, setSelectedText] = (0, import_react.useState)("");
	const getSelectedText = (0, import_react.useCallback)(() => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return "";
		return extractSelectedText(selection);
	}, []);
	const handleOpenChange = (0, import_react.useCallback)((open) => {
		if (!open) return;
		setSelectedText(getSelectedText());
	}, [getSelectedText]);
	const handleCopy = (0, import_react.useCallback)((text) => {
		navigator.clipboard.writeText(text).then(() => toast.success(t("message.copied"))).catch((error) => {
			logger$1.error("clipboard write failed", error);
			toast.error(t("message.copy.failed"));
		});
	}, [t]);
	const handleQuote = (0, import_react.useCallback)((text) => {
		window.api.quoteToMainWindow(text);
	}, []);
	const getMenuItems = (0, import_react.useCallback)((text) => {
		if (text.length === 0) return [];
		return [{
			type: "item",
			id: "selection.copy",
			label: t("common.copy"),
			onSelect: () => handleCopy(text)
		}, {
			type: "item",
			id: "selection.quote",
			label: t("chat.message.quote"),
			onSelect: () => handleQuote(text)
		}];
	}, [
		handleCopy,
		handleQuote,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "chat.message.context",
		extraItems: (0, import_react.useMemo)(() => getMenuItems(selectedText), [getMenuItems, selectedText]),
		getExtraItems: (0, import_react.useCallback)(() => {
			const text = getSelectedText();
			setSelectedText(text);
			return getMenuItems(text);
		}, [getMenuItems, getSelectedText]),
		onOpenChange: handleOpenChange,
		children
	});
};
var SelectionContextMenu_default = SelectionContextMenu;
const truncateText = (text, maxLength = 100) => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
const getCitationHostname = (citation) => {
	if (!citation.url) return void 0;
	try {
		return new URL(citation.url).hostname;
	} catch {
		return;
	}
};
const handleLinkClick = (url, event, actions) => {
	if (!url) return;
	if (url.startsWith("http")) {
		if (!actions?.openExternalUrl) return;
		event.preventDefault();
		actions.openExternalUrl(url);
		return;
	}
	if (!actions?.openPath) return;
	event.preventDefault();
	actions.openPath(url);
};
const CopyButton = ({ content, actions: injectedActions }) => {
	const [copied, setCopied] = useTemporaryValue(false, 2e3);
	const { t } = useTranslation();
	const actions = useOptionalMessageListActions();
	const copyText = injectedActions?.copyText ?? actions?.copyText;
	const notifyError = injectedActions?.notifyError ?? actions?.notifyError;
	const handleCopy = () => {
		if (!content || !copyText) return;
		Promise.resolve(copyText(content, { successMessage: t("common.copied") })).then(() => setCopied(true)).catch(() => {
			notifyError?.(t("message.copy.failed"));
		});
	};
	if (!copyText) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.copy-button",
		className: "-translate-y-1/2 absolute top-1/2 right-0 flex cursor-pointer items-center justify-center rounded p-1 text-muted-foreground opacity-0 transition-opacity duration-300 hover:bg-muted hover:opacity-100 group-hover:opacity-100",
		onClick: handleCopy,
		children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 })
	});
};
var documentTitle = (title) => title?.split("/").pop();
const KnowledgeCitationCard = ({ citation, actions }) => {
	const providerActions = useOptionalMessageListActions();
	const linkActions = {
		openPath: actions?.openPath ?? providerActions?.openPath,
		openExternalUrl: actions?.openExternalUrl ?? providerActions?.openExternalUrl
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionContextMenu_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex w-full flex-col py-3 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-1.5 flex w-full flex-row items-center gap-2",
			children: [
				citation.showFavicon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { width: 16 }),
				citation.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "flex-1 text-nowrap text-foreground text-sm leading-[1.6] no-underline",
					href: citation.url,
					onClick: (e) => handleLinkClick(citation.url, e, linkActions),
					children: documentTitle(citation.title)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 text-nowrap text-foreground text-sm leading-[1.6]",
					children: documentTitle(citation.title)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] text-primary leading-[1.6] opacity-100 transition-opacity duration-300 group-hover:opacity-0",
					children: citation.number
				}),
				citation.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
					content: citation.content,
					actions
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "selectable-text cursor-text select-text break-all text-[13px] text-muted-foreground leading-[1.6]",
			children: citation.content ?? ""
		})]
	}) });
};
const KnowledgeCitationHoverContent = ({ citation }) => {
	const title = documentTitle(citation.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.knowledge-citation-hover-content",
		style: { userSelect: "text" },
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, {
				size: 16,
				className: "shrink-0 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "chat.knowledge-citation-hover-content.heading",
				className: "overflow-hidden text-ellipsis whitespace-nowrap text-foreground text-sm leading-[1.4]",
				role: "heading",
				"aria-level": 3,
				title,
				children: title
			})]
		}), citation.content?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "chat.knowledge-citation-hover-content.article",
			className: "overflow-hidden text-[13px] text-muted-foreground leading-normal",
			role: "article",
			style: {
				display: "-webkit-box",
				overflow: "hidden",
				WebkitBoxOrient: "vertical",
				WebkitLineClamp: 3
			},
			children: citation.content
		})]
	});
};
var logger = loggerService.withContext("Utils:fetch");
function isXPostUrl(url) {
	try {
		const parsed = new URL(url);
		const host = parsed.hostname.replace(/^www\./, "");
		return (host === "x.com" || host === "twitter.com") && /\/status\/\d+/.test(parsed.pathname);
	} catch {
		return false;
	}
}
async function fetchXOEmbed(url) {
	try {
		const oembedUrl = `https://publish.x.com/oembed?url=${encodeURIComponent(url)}&omit_script=1&dnt=1`;
		const response = await fetch(oembedUrl, { signal: AbortSignal.timeout(1e4) });
		if (!response.ok) return null;
		const data = await response.json();
		const paragraphs = new DOMParser().parseFromString(data.html || "", "text/html").querySelectorAll("blockquote p");
		const text = Array.from(paragraphs).map((p) => p.textContent).join("\n");
		return {
			author: data.author_name || "",
			text: text || ""
		};
	} catch (e) {
		logger.warn("Failed to fetch X oEmbed", e);
		return null;
	}
}
const xOembedKey = (url) => `xOembed/${url}`;
var citationPreviewKey = (url) => ["citationPreview", url];
const useCitationPreviewSession = () => {
	const { mutate } = useSWRConfig();
	const [requestId] = import_react.useState(() => v4_default());
	const requestsRef = import_react.useRef(/* @__PURE__ */ new Map());
	const load = import_react.useCallback((url) => {
		const existing = requestsRef.current.get(url);
		if (existing) return existing;
		const request = ipcApi.request("citation.fetch_preview", {
			url,
			requestId
		}).then(async ({ content }) => {
			if (content) await mutate(citationPreviewKey(url), content, { revalidate: false });
		}).catch(() => void 0);
		requestsRef.current.set(url, request);
		return request;
	}, [mutate, requestId]);
	import_react.useEffect(() => {
		const requests = requestsRef.current;
		return () => {
			const hasRequests = requests.size > 0;
			requests.clear();
			if (hasRequests) ipcApi.request("citation.cancel_previews", { requestId }).catch(() => void 0);
		};
	}, [requestId]);
	return import_react.useMemo(() => ({ load }), [load]);
};
const useCitationPreview = (url, session) => {
	const { data } = useSWRImmutable(url ? citationPreviewKey(url) : null, null);
	const [settledUrl, setSettledUrl] = import_react.useState();
	import_react.useEffect(() => {
		if (!url || data !== void 0) return;
		let active = true;
		session.load(url).finally(() => {
			if (active) setSettledUrl(url);
		});
		return () => {
			active = false;
		};
	}, [
		data,
		session,
		url
	]);
	return {
		content: data,
		isLoading: Boolean(url) && data === void 0 && settledUrl !== url
	};
};
const WebCitationCard = ({ citation, previewSession, actions }) => {
	const isXPost = Boolean(citation.url && isXPostUrl(citation.url));
	const previewUrl = citation.url && !isXPost ? citation.url : void 0;
	const providerActions = useOptionalMessageListActions();
	const linkActions = {
		openPath: actions?.openPath ?? providerActions?.openPath,
		openExternalUrl: actions?.openExternalUrl ?? providerActions?.openExternalUrl
	};
	const { content: previewContent, isLoading: isPreviewLoading } = useCitationPreview(previewUrl, previewSession);
	const { data: oembedData, isLoading: isOembedLoading } = useSWRImmutable(isXPost && citation.url ? xOembedKey(citation.url) : null, () => fetchXOEmbed(citation.url), { shouldRetryOnError: false });
	const fetchedContent = isXPost ? oembedData ? truncateText(`@${oembedData.author}: ${oembedData.text}`) : "" : previewContent;
	const isLoading = isXPost ? isOembedLoading : isPreviewLoading;
	const displayTitle = isXPost && oembedData?.author ? `@${oembedData.author}` : citation.title;
	const titleContent = displayTitle || citation.hostname || citation.content || citation.url;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionContextMenu_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex w-full flex-col py-3 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-1.5 flex w-full flex-row items-center gap-2",
			children: [
				citation.showFavicon && getCitationHostname(citation) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
					hostname: getCitationHostname(citation),
					alt: citation.title || citation.hostname || ""
				}),
				citation.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "flex-1 text-nowrap text-foreground text-sm leading-[1.6] no-underline",
					href: citation.url,
					onClick: (e) => handleLinkClick(citation.url, e, linkActions),
					children: displayTitle || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-link",
						children: citation.hostname
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 text-nowrap text-foreground text-sm leading-[1.6]",
					children: titleContent
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] text-primary leading-[1.6] opacity-100 transition-opacity duration-300 group-hover:opacity-0",
					children: citation.number
				}),
				fetchedContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
					content: fetchedContent,
					actions
				})
			]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-2/3" })]
		}) : fetchedContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "selectable-text cursor-text select-text break-all text-[13px] text-muted-foreground leading-[1.6]",
			children: fetchedContent
		})]
	}) });
};
const WebCitationHoverContent = ({ citation, isOpen }) => {
	const openExternalUrl = useOptionalMessageListActions()?.openExternalUrl;
	const hostname = (0, import_react.useMemo)(() => {
		try {
			return new URL(citation.url).hostname;
		} catch {
			return citation.url;
		}
	}, [citation.url]);
	const isXPost = (0, import_react.useMemo)(() => isXPostUrl(citation.url), [citation.url]);
	const { data: oembedData } = useSWRImmutable(isXPost && !citation.content?.trim() && isOpen ? xOembedKey(citation.url) : null, () => fetchXOEmbed(citation.url), { shouldRetryOnError: false });
	const sourceTitle = (0, import_react.useMemo)(() => {
		if (isXPost && oembedData?.author) return `@${oembedData.author}`;
		return citation.title?.trim() || hostname;
	}, [
		citation.title,
		hostname,
		isXPost,
		oembedData
	]);
	const displayContent = (0, import_react.useMemo)(() => {
		if (citation.content?.trim()) return citation.content;
		if (isXPost && oembedData?.text) return oembedData.text;
	}, [
		citation.content,
		isXPost,
		oembedData
	]);
	const handleClick = (0, import_react.useCallback)((event) => {
		if (!openExternalUrl) return;
		event.preventDefault();
		openExternalUrl(citation.url);
	}, [citation.url, openExternalUrl]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.web-citation-hover-content",
		style: { userSelect: "text" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: citation.url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "mb-2 flex cursor-pointer items-center gap-2 hover:opacity-80",
				"aria-label": `Open ${sourceTitle} in new tab`,
				onClick: handleClick,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
					hostname,
					alt: sourceTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "chat.web-citation-hover-content.heading",
					className: "overflow-hidden text-ellipsis whitespace-nowrap text-foreground text-sm leading-[1.4]",
					role: "heading",
					"aria-level": 3,
					title: sourceTitle,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeText_default, { children: sourceTitle })
				})]
			}),
			displayContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "chat.web-citation-hover-content.article",
				className: "mb-2 overflow-hidden text-[13px] text-muted-foreground leading-normal [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]",
				role: "article",
				"aria-label": "Citation content",
				style: {
					display: "-webkit-box",
					overflow: "hidden",
					WebkitBoxOrient: "vertical",
					WebkitLineClamp: 3
				},
				children: displayContent
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: citation.url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-link text-xs hover:underline",
				"aria-label": `Visit ${hostname}`,
				onClick: handleClick,
				children: hostname
			})
		]
	});
};
var CitationTooltip = ({ children, citation }) => {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const isWeb = Boolean(citation.url) && citation.type !== "knowledge" && citation.type !== "memory";
	if (!(isWeb || Boolean(citation.title?.trim() || citation.content?.trim()))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: isWeb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebCitationHoverContent, {
			citation: {
				url: citation.url,
				title: citation.title,
				content: citation.content
			},
			isOpen
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeCitationHoverContent, { citation: {
			title: citation.title,
			content: citation.content
		} }),
		onOpenChange: setIsOpen,
		showArrow: false,
		contentProps: { className: "rounded-[8px] border border-border bg-card p-3 text-card-foreground dark:bg-card dark:text-card-foreground" },
		children
	});
};
var CitationTooltip_default = (0, import_react.memo)(CitationTooltip);
function useMetaDataParser(link, properties, options) {
	const { timeout = 5e3 } = options || {};
	const [metadata, setMetadata] = (0, import_react.useState)({});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const abortControllerRef = (0, import_react.useRef)(null);
	const parseMetadata = (0, import_react.useCallback)(async () => {
		if (!link || !isLoading) return;
		if (abortControllerRef.current) abortControllerRef.current.abort();
		const controller = new AbortController();
		abortControllerRef.current = controller;
		setIsLoading(true);
		setError(null);
		try {
			const htmlContent = (await axios_default.get(link, {
				timeout,
				signal: controller.signal
			})).data;
			const parsedMetadata = {};
			let isReadingTitle = false;
			let titleText = "";
			const resolveUrl = (value) => {
				try {
					return new URL(value, link).href;
				} catch {
					return value;
				}
			};
			const setMetadataValue = (key, value) => {
				const trimmed = value?.trim();
				if (!trimmed || !properties.includes(key) || parsedMetadata[key]) return;
				parsedMetadata[key] = key === "image" || key === "og:image" ? resolveUrl(trimmed) : trimmed;
			};
			new Parser({
				onopentag(tagName, attributes) {
					if (tagName === "title") {
						isReadingTitle = true;
						titleText = "";
						return;
					}
					if (tagName === "meta") {
						const { name: metaName, property: metaProperty, content } = attributes;
						setMetadataValue(metaName || metaProperty, content);
						return;
					}
					if (tagName === "link") {
						if ((attributes.rel?.toLowerCase().split(/\s+/) ?? []).includes("preload") && attributes.as?.toLowerCase() === "image") setMetadataValue("image", attributes.href);
					}
				},
				ontext(text) {
					if (isReadingTitle) titleText += text;
				},
				onclosetag(tagName) {
					if (tagName === "title") {
						setMetadataValue("title", titleText);
						isReadingTitle = false;
						titleText = "";
					}
				}
			}).parseComplete(htmlContent);
			setMetadata(parsedMetadata);
		} catch (err) {
			if (axios_default.isCancel(err) || err instanceof Error && err.name === "AbortError") return;
			setError(err instanceof Error ? err : /* @__PURE__ */ new Error("Failed to fetch HTML"));
		} finally {
			setIsLoading(false);
		}
	}, [
		isLoading,
		link,
		properties,
		timeout
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (abortControllerRef.current) abortControllerRef.current.abort();
		};
	}, []);
	return {
		metadata,
		isLoading,
		error,
		parseMetadata
	};
}
var O = (r = "both") => r === "none" ? "" : `hover-${r}`, x = ({ thumbnail: r, title: o, description: c, icons: n, href: a, className: t, aspectRatio: d = 1.91, hoverEffect: i = "both" }) => {
	const l = { "--og-card-ar": d }, e = !!r, h = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "og-card-inner",
		children: [e ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "og-card-thumbnail",
			children: typeof r == "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: r,
				alt: o,
				loading: "lazy"
			}) : r
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "og-card-placeholder",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "og-card-placeholder-title",
				children: o
			})
		}), e && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "og-card-overlay",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "og-card-title",
					children: o
				}),
				c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "og-card-description",
					children: c
				}),
				n && n.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "og-card-icons",
					children: n
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: [
			"og-card",
			O(i),
			t
		].filter(Boolean).join(" "),
		children: a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "og-card-link",
			href: a,
			target: "_blank",
			rel: "noopener noreferrer",
			style: l,
			children: h
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "og-card-link",
			style: l,
			children: h
		})
	});
};
var METADATA_FIELDS = [
	"og:title",
	"og:description",
	"og:image",
	"og:imageAlt",
	"title",
	"description",
	"image"
];
const OgCard = ({ link, show }) => {
	const { metadata, isLoading, parseMetadata } = useMetaDataParser(link, METADATA_FIELDS);
	const hostname = (0, import_react.useMemo)(() => {
		try {
			return new URL(link).hostname;
		} catch {
			return null;
		}
	}, [link]);
	(0, import_react.useEffect)(() => {
		if (show && isLoading) parseMetadata();
	}, [
		parseMetadata,
		isLoading,
		show
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeleton, {});
	const title = metadata["og:title"] || metadata.title || hostname || link;
	const description = metadata["og:description"] || metadata.description || link;
	const imageUrl = metadata["og:image"] || metadata.image;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(x, {
		thumbnail: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-ui": "ui.og-card",
			src: imageUrl,
			alt: metadata["og:imageAlt"] || title,
			className: "h-full w-full bg-muted",
			style: { objectFit: "cover" }
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.og-card",
			className: "h-full w-full bg-accent"
		}),
		title,
		description,
		href: link,
		aspectRatio: 760 / 420,
		hoverEffect: "none",
		className: "h-full w-full"
	}) });
};
var Container = ({ children }) => {
	const cardStyle = {
		"--og-card-shadow": "none",
		"--og-card-shadow-hover": "none",
		"--og-card-radius": "8px"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.og-card",
		className: "aspect-760/420 w-100 max-w-[calc(100vw-32px)] overflow-hidden rounded-lg border border-border bg-background",
		style: cardStyle,
		children
	});
};
var CardSkeleton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-none" }) });
};
var HYPERLINK_CARD_OPEN_DELAY = 1500;
var HYPERLINK_CARD_CLOSE_DELAY = 100;
var Hyperlink = ({ children, href }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const link = (0, import_react.useMemo)(() => {
		try {
			return decodeURIComponent(href);
		} catch {
			return href;
		}
	}, [href]);
	if (!href) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, {
		openDelay: HYPERLINK_CARD_OPEN_DELAY,
		closeDelay: HYPERLINK_CARD_CLOSE_DELAY,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline",
				children
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardContent, {
			className: "w-auto max-w-none overflow-hidden rounded-lg p-0",
			sideOffset: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OgCard, {
				link,
				show: open
			})
		})]
	});
};
var Hyperlink_default = (0, import_react.memo)(Hyperlink);
function getWebHostname(href) {
	if (!href) return "";
	try {
		const url = new URL(href);
		return url.protocol === "http:" || url.protocol === "https:" ? url.hostname : "";
	} catch {
		return "";
	}
}
function hasFaviconChild(children) {
	return import_react.Children.toArray(children).some((child) => import_react.isValidElement(child) && child.type === FallbackFavicon_default);
}
function hasSameUrl(href, citationUrl) {
	if (!href) return false;
	try {
		const normalize = (value) => new URL(value).href.replace(/%7C/gi, "|");
		return normalize(href) === normalize(citationUrl);
	} catch {
		return false;
	}
}
var Link = (props) => {
	const citationData = (0, import_react.useMemo)(() => {
		const number = Number(findCitationInChildren(props.children));
		return Number.isSafeInteger(number) && number > 0 ? props.citationRegistry?.get(number) ?? null : null;
	}, [props.children, props.citationRegistry]);
	const hostname = (0, import_react.useMemo)(() => getWebHostname(props.href), [props.href]);
	const containsFaviconChild = (0, import_react.useMemo)(() => hasFaviconChild(props.children), [props.children]);
	if (props.href?.startsWith("#")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.link",
		className: "link",
		children: props.children
	});
	if (props.href && isKnownNavigationPath(props.href)) {
		const [path, search] = props.href.split("?", 2);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigateToolInline, { input: {
			path,
			query: search ? Object.fromEntries(new URLSearchParams(search)) : void 0
		} });
	}
	const isCitation = Boolean(props.node?.children?.some((child) => child.tagName === "sup"));
	const showFavicon = !!hostname && !isCitation && !containsFaviconChild;
	const linkClassName = cn("text-link", !props.className && !isCitation && "hover:underline", props.className);
	const linkContent = showFavicon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.link",
		className: "markdown-link-favicon mr-1 inline-flex size-4 items-center justify-center align-[-0.125em]",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
			hostname,
			alt: ""
		})
	}), props.children] }) : props.children;
	if (isCitation && citationData && hasSameUrl(props.href, citationData.url)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitationTooltip_default, {
		citation: citationData,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			...omit(props, ["node", "citationRegistry"]),
			href: props.href || void 0,
			target: "_blank",
			rel: "noreferrer",
			className: linkClassName,
			onClick: (e) => e.stopPropagation()
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hyperlink_default, {
		href: props.href || "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			...omit(props, ["node", "citationRegistry"]),
			target: "_blank",
			rel: "noreferrer",
			className: linkClassName,
			onClick: (e) => e.stopPropagation(),
			children: linkContent
		})
	});
};
var Link_default = Link;
export { KnowledgeCitationCard as a, useCitationPreviewSession as i, CitationTooltip_default as n, getCitationHostname as o, WebCitationCard as r, SelectionContextMenu_default as s, Link_default as t };

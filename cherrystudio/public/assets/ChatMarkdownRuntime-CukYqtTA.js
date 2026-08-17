import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as omit } from "./omit-zFeZgsBE.js";
import { t as isEmpty } from "./isEmpty-E8ry7LkJ.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as require_react_dom } from "./react-dom-D-tOyCJ4.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { a as useMarkdownBlockContext, n as MarkdownCore, t as Markdown } from "./markdown-Dg3BbXYd.js";
import { l as ue } from "./chunk-BO2N2NFS-CPhdpqIF.js";
import { r as withMath, t as defaultMarkdownPlugins } from "./presets-8R5jEa7y.js";
import { n as CommandContextMenu } from "./command-CtEyUhIg.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as Eye } from "./eye-DgGv-EmO.js";
import { t as FileSpreadsheet } from "./file-spreadsheet-BEf6ujsg.js";
import { f as makeSvgSizeAdaptive } from "./image-BfuhOMOH.js";
import { t as useTemporaryValue } from "./useTemporaryValue-kBhuEh30.js";
import { t as lib_default } from "./markdown-it-xCYjzGom.js";
import { t as CopyIcon_default } from "./CopyIcon-CF5lW_xU.js";
import { a as removeSvgEmptyLines } from "./formats-CgjOOl9i.js";
import { t as ImagePreviewService } from "./ImagePreviewService-ClwFTW1F.js";
import { i as processLatexBrackets } from "./markdownLight-CPb9cwdQ.js";
import { n as isLinkableCitationUrl } from "./citation-Njzn5Mjh.js";
import { ct as useMessageRenderConfig, lt as useOptionalMessageListActions } from "./agent-MQkn_hV_.js";
import { t as ImageViewer_default } from "./ImageViewer-BMsDhPpI.js";
import { n as CitationTooltip_default, t as Link_default } from "./Link-Ca0EF_Vh.js";
import { n as remarkHtmlArtifact, r as transformMarkdownOutsideHtmlArtifacts, t as CodeBlock_default } from "./CodeBlock-B_DcgyDW.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DEFAULT_ANIMATED = {
	animation: "fadeIn",
	duration: 250,
	easing: "ease-out"
};
function StreamingMarkdown({ id, children, components, plugins, rehypePlugins, remarkPlugins, disallowedElements, className, footnoteLabel, animated, parseIncompleteMarkdown = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownCore, {
		id,
		mode: "streaming",
		parseIncompleteMarkdown,
		components,
		plugins,
		extraRehypePlugins: rehypePlugins,
		extraRemarkPlugins: remarkPlugins,
		animated: (0, import_react.useMemo)(() => animated === false ? false : animated ?? DEFAULT_ANIMATED, [animated]),
		disallowedElements,
		className,
		footnoteLabel,
		children
	});
}
var ChatMarkdownRenderContext = (0, import_react.createContext)(null);
function ChatMarkdownRenderProvider({ blockId, children, citationRegistry, inlineHtmlPreviewMode, isStreaming }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdownRenderContext, {
		value: (0, import_react.useMemo)(() => ({
			blockId,
			citationRegistry,
			inlineHtmlPreviewMode,
			isStreaming
		}), [
			blockId,
			citationRegistry,
			inlineHtmlPreviewMode,
			isStreaming
		]),
		children
	});
}
function useChatMarkdownRenderContext() {
	const context = (0, import_react.use)(ChatMarkdownRenderContext);
	if (!context) throw new Error("useChatMarkdownRenderContext must be used within ChatMarkdownRenderProvider");
	return context;
}
var import_react_dom = require_react_dom();
var ShadowDomRenderer = ({ children }) => {
	const hostRef = (0, import_react.useRef)(null);
	const [shadowRoot, setShadowRoot] = import_react.useState(null);
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		const shadow = host.shadowRoot || host.attachShadow({ mode: "open" });
		const markdownStyleSheet = Array.from(document.styleSheets).find((sheet) => {
			try {
				return Array.from(sheet.cssRules).some((rule) => {
					return rule.cssText?.includes(".markdown");
				});
			} catch {
				return false;
			}
		});
		if (markdownStyleSheet) {
			const style = document.createElement("style");
			style.textContent = Array.from(markdownStyleSheet.cssRules).map((rule) => rule.cssText).join("\n");
			shadow.appendChild(style);
		}
		setShadowRoot(shadow);
	}, []);
	if (!shadowRoot) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.shadow-dom",
		ref: hostRef
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.shadow-dom",
		ref: hostRef,
		style: { display: "none" },
		children: (0, import_react_dom.createPortal)(children, shadowRoot)
	});
};
var MarkdownShadowDomRenderer_default = ShadowDomRenderer;
var CitationSup = (props) => {
	const { t } = useTranslation();
	const raw = props["data-citation"];
	const citation = (0, import_react.useMemo)(() => {
		if (!raw) return null;
		const number = Number(raw);
		return Number.isSafeInteger(number) && number > 0 ? props.citationRegistry?.get(number) ?? null : null;
	}, [props.citationRegistry, raw]);
	const supProps = omit(props, ["node", "citationRegistry"]);
	if (!citation || isLinkableCitationUrl(citation.url)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
		"data-ui": "chat.citation-sup",
		...mergeUiProps(supProps, "chat.citation-sup")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitationTooltip_default, {
		citation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
			"data-ui": "chat.citation-sup.button",
			...mergeUiProps(supProps, "chat.citation-sup.button"),
			role: "button",
			tabIndex: 0,
			"aria-label": t("message.citation_source", { number: citation.number }),
			className: cn(supProps.className, "rounded-sm focus-visible:bg-accent focus-visible:outline-none")
		})
	});
};
var CitationSup_default = CitationSup;
var MarkdownSvgRenderer = (props) => {
	const { "data-needs-measurement": needsMeasurement, ...restProps } = props;
	const svgRef = (0, import_react.useRef)(null);
	const isMeasuredRef = (0, import_react.useRef)(false);
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {
		if (needsMeasurement && svgRef.current && !isMeasuredRef.current) {
			makeSvgSizeAdaptive(svgRef.current);
			isMeasuredRef.current = true;
		}
	}, [needsMeasurement]);
	const onPreview = (0, import_react.useCallback)(() => {
		if (!svgRef.current) return;
		ImagePreviewService.show(svgRef.current, { format: "svg" });
	}, []);
	const finalProps = { ...restProps };
	if (isMeasuredRef.current) {
		delete finalProps.width;
		delete finalProps.height;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: (0, import_react.useMemo)(() => [{
			type: "item",
			id: "svg.preview",
			label: t("common.preview"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: "1rem" }),
			onSelect: onPreview
		}], [t, onPreview]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			ref: svgRef,
			...finalProps
		})
	});
};
var MarkdownSvgRenderer_default = MarkdownSvgRenderer;
var logger = loggerService.withContext("Table");
var Table = ({ children, node, blockId }) => {
	const { t } = useTranslation();
	const [copied, setCopied] = useTemporaryValue(false, 2e3);
	const mdCtx = useMarkdownBlockContext();
	const actions = useOptionalMessageListActions();
	const tableRef = (0, import_react.useRef)(null);
	const canCopyTable = !!actions?.copyRichContent;
	const canExportExcel = !!actions?.exportTableAsExcel;
	const handleCopyTable = (0, import_react.useCallback)(async () => {
		const tableMarkdown = extractTableMarkdown(blockId ?? "", node?.position, mdCtx?.content);
		if (!tableMarkdown) {
			actions?.notifyError?.(t("message.error.table.invalid"));
			return;
		}
		try {
			const tableHtml = convertMarkdownTableToHtml(tableMarkdown);
			await actions?.copyRichContent?.({
				plainText: tableMarkdown,
				html: tableHtml
			}, { successMessage: t("message.copied") });
			setCopied(true);
		} catch (error) {
			logger.error("Failed to copy table to clipboard", { error });
			actions?.notifyError?.(t("message.copy.failed"));
		}
	}, [
		actions,
		blockId,
		node?.position,
		setCopied,
		t,
		mdCtx?.content
	]);
	const handleExportExcel = (0, import_react.useCallback)(async () => {
		if (!tableRef.current) {
			actions?.notifyError?.(t("message.error.table.invalid"));
			return;
		}
		const { headers, rows } = ue(tableRef.current);
		const data = headers.length > 0 ? [headers, ...rows] : rows;
		if (data.length === 0) {
			actions?.notifyError?.(t("message.error.table.invalid"));
			return;
		}
		try {
			if (await actions?.exportTableAsExcel?.(data)) actions?.notifySuccess?.(t("message.success.excel.export"));
		} catch (error) {
			logger.error("Failed to export table to Excel", { error });
			actions?.notifyError?.(t("message.error.excel.export"));
		}
	}, [actions, t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.table",
		className: "table-wrapper relative my-2 w-full min-w-0 max-w-full hover:[&_.table-toolbar]:opacity-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-scroll-viewport w-full min-w-0 max-w-full overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				ref: tableRef,
				className: "[&&_td]:wrap-break-word [&&_th]:wrap-break-word [&&]:my-0 [&&]:w-full [&&]:min-w-full [&&]:border-separate [&&]:bg-transparent [&&]:text-[0.9em] [&&]:text-foreground [&&]:leading-(--line-height-body-md) [&&_tbody]:bg-transparent [&&_td:last-child]:border-r-0 [&&_td]:border-border-subtle [&&_td]:border-r-[0.5px] [&&_td]:border-b-[0.5px] [&&_td]:bg-transparent [&&_td]:p-[0.5em] [&&_td]:align-top [&&_td]:font-normal [&&_td]:tracking-normal [&&_th:last-child]:border-r-0 [&&_th]:border-border-subtle [&&_th]:border-r-[0.5px] [&&_th]:border-b-[0.5px] [&&_th]:bg-muted [&&_th]:p-[0.5em] [&&_th]:text-left [&&_th]:align-top [&&_th]:font-semibold [&&_th]:tracking-normal [&&_thead]:bg-transparent [&&_tr:last-child_td]:border-b-0 [&&_tr]:bg-transparent",
				style: {
					border: "0.5px solid var(--border)",
					borderRadius: "var(--radius-md)",
					borderSpacing: 0,
					margin: 0,
					overflow: "hidden"
				},
				children
			})
		}), (canCopyTable || canExportExcel) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "table-toolbar transform-[translateZ(0)] absolute top-2 right-2 z-10 flex gap-1 rounded-lg border border-border-subtle bg-popover p-1 opacity-0 shadow-md transition-opacity duration-200 ease-in-out will-change-[opacity]",
			children: [canCopyTable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("common.copy"),
				delay: 800,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "chat.table.action.copy",
					className: "flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-muted-foreground opacity-100 transition-all duration-200 ease-in-out will-change-[background-color,opacity] hover:bg-accent hover:text-foreground hover:shadow-xs",
					role: "button",
					"aria-label": t("common.copy"),
					onClick: handleCopyTable,
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						size: 14,
						color: "var(--primary)"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, { size: 14 })
				})
			}), canExportExcel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("common.export.excel"),
				delay: 800,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "chat.table.action.export",
					className: "flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-muted-foreground opacity-100 transition-all duration-200 ease-in-out will-change-[background-color,opacity] hover:bg-accent hover:text-foreground hover:shadow-xs",
					role: "button",
					"aria-label": t("common.export.excel"),
					onClick: handleExportExcel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { size: 14 })
				})
			})]
		})]
	});
};
function extractTableMarkdown(_blockId, position, markdownContent) {
	if (!position || !markdownContent) return "";
	const { start, end } = position;
	return markdownContent.split("\n").slice(start.line - 1, end.line).join("\n").trim();
}
function convertMarkdownTableToHtml(markdownTable) {
	return new lib_default({
		html: true,
		breaks: false,
		linkify: false
	}).render(markdownTable);
}
var Table_default = (0, import_react.memo)(Table);
var IMAGE_STYLE = {
	maxWidth: 500,
	maxHeight: 500
};
var PRE_STYLE = { overflow: "visible" };
function ChatLinkRenderer(props) {
	const { citationRegistry } = useChatMarkdownRenderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
		...props,
		citationRegistry
	});
}
function ChatCitationSupRenderer(props) {
	const { citationRegistry } = useChatMarkdownRenderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitationSup_default, {
		...props,
		citationRegistry
	});
}
function ChatCodeRenderer(props) {
	const { blockId, inlineHtmlPreviewMode, isStreaming } = useChatMarkdownRenderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock_default, {
		...props,
		blockId,
		inlineHtmlPreviewMode,
		isStreaming
	});
}
function ChatTableRenderer(props) {
	const { blockId } = useChatMarkdownRenderContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table_default, {
		...props,
		blockId
	});
}
function ChatImageRenderer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer_default, {
		style: IMAGE_STYLE,
		...props
	});
}
function ChatPreRenderer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		"data-ui": "chat.pre",
		style: PRE_STYLE,
		...mergeUiProps(props, "chat.pre")
	});
}
function ChatParagraphRenderer(props) {
	if (props.node?.children.some((child) => child.type === "element" && child.tagName === "img")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.paragraph",
		...mergeUiProps(props, "chat.paragraph")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-ui": "chat.paragraph",
		...mergeUiProps(props, "chat.paragraph")
	});
}
const CHAT_MARKDOWN_COMPONENTS = {
	a: ChatLinkRenderer,
	sup: ChatCitationSupRenderer,
	code: ChatCodeRenderer,
	table: ChatTableRenderer,
	img: ChatImageRenderer,
	pre: ChatPreRenderer,
	p: ChatParagraphRenderer,
	svg: MarkdownSvgRenderer_default
};
const CHAT_MARKDOWN_COMPONENTS_WITH_STYLE = {
	...CHAT_MARKDOWN_COMPONENTS,
	style: MarkdownShadowDomRenderer_default
};
var STYLE_ELEMENT_REGEX = /<style\b[^>]*>/i;
var HTML_ARTIFACT_REMARK_PLUGINS = [remarkHtmlArtifact];
var EMPTY_CITATION_REGISTRY = /* @__PURE__ */ new Map();
var MAX_ANIMATED_CONTENT_LENGTH = 64 * 1024;
var MAX_STREAMING_TRANSFORM_LENGTH = 256 * 1024;
var createDefaultPlugins = (singleDollarMath) => ({
	...defaultMarkdownPlugins,
	math: withMath({ singleDollar: singleDollarMath })
});
var ChatMarkdownRuntime = ({ block, inlineHtmlPreviewMode, postProcess, className, components, trustedCitations, createPlugins = createDefaultPlugins }) => {
	const { t } = useTranslation();
	const { mathEnableSingleDollar } = useMessageRenderConfig();
	const isStreaming = block.status === "streaming";
	const hasStreamedRef = (0, import_react.useRef)(isStreaming);
	if (isStreaming) hasStreamedRef.current = true;
	const plugins = (0, import_react.useMemo)(() => createPlugins(mathEnableSingleDollar), [createPlugins, mathEnableSingleDollar]);
	const content = (0, import_react.useMemo)(() => {
		if (block.status === "paused" && isEmpty(block.content)) return t("message.chat.completion.paused");
		if (block.status === "streaming" && block.content.length > MAX_STREAMING_TRANSFORM_LENGTH) return block.content;
		const transform = (source) => {
			let text = removeSvgEmptyLines(processLatexBrackets(source));
			if (postProcess) text = postProcess(text);
			return text;
		};
		return inlineHtmlPreviewMode ? transformMarkdownOutsideHtmlArtifacts(block.content, transform) : transform(block.content);
	}, [
		block.status,
		block.content,
		inlineHtmlPreviewMode,
		postProcess,
		t
	]);
	const hasStyleElement = STYLE_ELEMENT_REGEX.test(content);
	const citationRegistry = (0, import_react.useMemo)(() => {
		if (!trustedCitations?.length) return EMPTY_CITATION_REGISTRY;
		return new Map(trustedCitations.map((citation) => [citation.number, citation]));
	}, [trustedCitations]);
	const chatComponents = hasStyleElement ? CHAT_MARKDOWN_COMPONENTS_WITH_STYLE : CHAT_MARKDOWN_COMPONENTS;
	const mergedComponents = (0, import_react.useMemo)(() => components ? {
		...chatComponents,
		...components
	} : chatComponents, [chatComponents, components]);
	const footnoteLabel = t("common.footnotes");
	const remarkPlugins = inlineHtmlPreviewMode ? HTML_ARTIFACT_REMARK_PLUGINS : void 0;
	const renderer = hasStreamedRef.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamingMarkdown, {
		id: block.id,
		plugins,
		remarkPlugins,
		components: mergedComponents,
		footnoteLabel,
		animated: isStreaming && content.length <= MAX_ANIMATED_CONTENT_LENGTH ? void 0 : false,
		parseIncompleteMarkdown: isStreaming,
		children: content
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
		id: block.id,
		plugins,
		remarkPlugins,
		components: mergedComponents,
		className,
		footnoteLabel,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdownRenderProvider, {
		blockId: block.id,
		citationRegistry,
		inlineHtmlPreviewMode,
		isStreaming,
		children: renderer
	});
};
var ChatMarkdownRuntime_default = ChatMarkdownRuntime;
export { ChatMarkdownRuntime_default as t };

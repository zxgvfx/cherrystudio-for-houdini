import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { i as isProd } from "./platform-fGkkNTU9.js";
import { r as resolver_default } from "./resolver-Bn-i1elC.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as circular_progress_default } from "./circular-progress-Bp-PagtP.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as motion } from "./react-BxKGY5j2.js";
import { i as Flex } from "./flex-YDL2weOg.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-PDzaS6-f.js";
import { n as useCodeStyle } from "./useCodeStyle-hWHmowmT.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-CrY8yFbh.js";
import { n as cn } from "./style-BQVh98fR.js";
import { i as toSafeFileUrl } from "./file-CkrjUGO_.js";
import { t as Brain } from "./brain-DGuT8jgt.js";
import { t as CalendarDays } from "./calendar-days-DHv8jbtA.js";
import { t as Database } from "./database-DlTq_gsH.js";
import { t as FileSearch } from "./file-search-C7yEl-oU.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as Globe } from "./globe-D0ZAMdcJ.js";
import { t as Image } from "./image-DkAylN0p.js";
import { t as ListChecks } from "./list-checks-BDyU0d7o.js";
import { t as Mail } from "./mail-BvGazMga.js";
import { t as Search } from "./search-CafLf998.js";
import { t as ShieldCheck } from "./shield-check-C8Inn4bH.js";
import { t as Sparkles } from "./sparkles-D4OSBloB.js";
import { t as SquareTerminal } from "./square-terminal-UNKtk8nR.js";
import { t as ToolCase } from "./tool-case-D8bAQ4Jh.js";
import { t as Workflow } from "./workflow-3FyQTBiU.js";
import { t as Wrench } from "./wrench-BqVRRCKS.js";
import { a as CallToolResultSchema } from "./mcp-BGt1L-d_.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-C7UvdsI7.js";
import { C as isDeferredToolOutput, S as generateImageOutputSchema, _ as kbSearchOutputSchema, a as KB_LIST_TOOL_NAME, b as webSearchOutputSchema, c as KB_SEARCH_TOOL_NAME, g as kbSearchInputSchema, l as PROVIDER_WEB_SEARCH_TOOL_NAME, o as KB_MANAGE_TOOL_NAME, p as WEB_SEARCH_TOOL_NAME, r as normalizeToolOutputResponse, s as KB_READ_TOOL_NAME, x as GENERATE_IMAGE_TOOL_NAME, y as webSearchInputSchema } from "./toolOutput-DFxKz6Jf.js";
import { n as isPersistedToolOutput, t as envelopeDisplayExcerpt } from "./persistedToolOutput-BzznN2vb.js";
import { t as useTimer } from "./useTimer-CtD1TRRj.js";
import { t as FallbackFavicon_default } from "./FallbackFavicon-Cm9QCLm8.js";
import { $ as useMessageDisclosureState, C as ArgsTable, D as truncateOutput, E as formatArgValue, F as ToolHeader_default, I as getReadableToolActivity, L as PlaceholderShimmerText, M as ToolStatusIndicator, N as TruncatedIndicator, P as getEffectiveStatus, Q as useOptionalMessageListUi, R as SkeletonSpan, S as ArgsSectionTitle, X as useOptionalMessageListActions, Y as useMessageRenderConfig, Z as useOptionalMessageListTopicId, at as normalizeToolErrorResponse, b as ArgValue, c as MessageChannelConfigTool, d as ImageBlock_default, dt as isAskUserQuestionToolName, et as APPROVAL_REQUESTED, f as AgentExecutionTimeline, it as isToolPartAwaitingApproval, j as useScrollAnchor, ot as isMetaToolName, rt as findToolPartByCallId, s as isReportArtifactsToolResponse, tt as APPROVAL_RESPONDED, u as isChannelAuthQrToolResponse, ut as AgentToolsType, w as ResponseSection, x as ArgsSection, y as ArgKey, z as require_dist } from "./agent-e68nHjCJ.js";
import { l as useMessagePartsScopeId, n as PartsContext, r as PartsProvider, u as usePartsMap } from "./MessagePartsContext-Be-3g0sl.js";
import { t as useSWRImmutable } from "./immutable-CtJYf-60.js";
import { i as useMcpServers, r as useMcpServerMutations } from "./useMcpServer-BA8oDtqe.js";
import { t as Link_default } from "./Link-0PkeiIUY.js";
var cssUnit = {
	cm: true,
	mm: true,
	in: true,
	px: true,
	pt: true,
	pc: true,
	em: true,
	ex: true,
	ch: true,
	rem: true,
	vw: true,
	vh: true,
	vmin: true,
	vmax: true,
	"%": true
};
function parseLengthAndUnit(size) {
	if (typeof size === "number") return {
		value: size,
		unit: "px"
	};
	var value;
	var valueString = (size.match(/^[0-9.]*/) || "").toString();
	if (valueString.includes(".")) value = parseFloat(valueString);
	else value = parseInt(valueString, 10);
	var unit = (size.match(/[^0-9]*$/) || "").toString();
	if (cssUnit[unit]) return {
		value,
		unit
	};
	console.warn("React Spinners: ".concat(size, " is not a valid css value. Defaulting to ").concat(value, "px."));
	return {
		value,
		unit: "px"
	};
}
function cssValue(value) {
	var lengthWithunit = parseLengthAndUnit(value);
	return "".concat(lengthWithunit.value).concat(lengthWithunit.unit);
}
var createAnimation = function(loaderName, frames, suffix) {
	var animationName = "react-spinners-".concat(loaderName, "-").concat(suffix);
	if (typeof window == "undefined" || !window.document) return animationName;
	var styleEl = document.createElement("style");
	document.head.appendChild(styleEl);
	var styleSheet = styleEl.sheet;
	var keyFrames = "\n    @keyframes ".concat(animationName, " {\n      ").concat(frames, "\n    }\n  ");
	if (styleSheet) styleSheet.insertRule(keyFrames, 0);
	return animationName;
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
var beat = createAnimation("BeatLoader", "50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}", "beat");
function BeatLoader(_a) {
	var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 15 : _f, _g = _a.margin, margin = _g === void 0 ? 2 : _g, additionalprops = __rest(_a, [
		"loading",
		"color",
		"speedMultiplier",
		"cssOverride",
		"size",
		"margin"
	]);
	var wrapper = __assign({ display: "inherit" }, cssOverride);
	var style = function(i) {
		return {
			display: "inline-block",
			backgroundColor: color,
			width: cssValue(size),
			height: cssValue(size),
			margin: cssValue(margin),
			borderRadius: "100%",
			animation: "".concat(beat, " ").concat(.7 / speedMultiplier, "s ").concat(i % 2 ? "0s" : "".concat(.35 / speedMultiplier, "s"), " infinite linear"),
			animationFillMode: "both"
		};
	};
	if (!loading) return null;
	return import_react.createElement("span", __assign({ style: wrapper }, additionalprops), import_react.createElement("span", { style: style(1) }), import_react.createElement("span", { style: style(2) }), import_react.createElement("span", { style: style(3) }));
}
var BeatLoader_default = BeatLoader;
function useToolResult(ref) {
	const { data, error, isLoading } = useSWRImmutable(ref ? `tool-result:${ref.topicId}\0${ref.messageId}\0${ref.toolCallId}` : null, async () => {
		const response = await ipcApi.request("ai.tool.get_result", ref);
		if (!response.found) throw new Error(`Tool result is no longer available: ${ref.toolCallId}`);
		return response.output;
	}, { shouldRetryOnError: false });
	return {
		output: data,
		error,
		isLoading
	};
}
var logger$1 = loggerService.withContext("useToolApproval");
var IDLE = {
	isWaiting: false,
	isExecuting: false,
	isSubmitting: false,
	confirm: () => {},
	cancel: () => {}
};
function useToolApproval(target, mcpTool) {
	const { t } = useTranslation();
	const partsMap = usePartsMap();
	const actions = useOptionalMessageListActions();
	const respondToolApproval = actions?.respondToolApproval;
	const notifyError = actions?.notifyError;
	const { mcpServers } = useMcpServers();
	const { updateMcpServer } = useMcpServerMutations(mcpTool?.serverId ?? "");
	const toolCallId = target.toolCallId ?? target.id ?? "";
	const match = (0, import_react.useMemo)(() => findToolPartByCallId(partsMap, toolCallId), [partsMap, toolCallId]);
	const [optimisticSubmitted, setOptimisticSubmitted] = (0, import_react.useState)(false);
	const lastApprovalIdRef = (0, import_react.useRef)(void 0);
	if (lastApprovalIdRef.current !== match?.approvalId) {
		lastApprovalIdRef.current = match?.approvalId;
		if (optimisticSubmitted) setOptimisticSubmitted(false);
	}
	const respond = (0, import_react.useCallback)(async (approved) => {
		if (!match || !respondToolApproval) return;
		setOptimisticSubmitted(true);
		try {
			await respondToolApproval({
				match,
				approved,
				reason: approved ? void 0 : t("message.tools.denied", "User denied tool execution")
			});
		} catch (error) {
			setOptimisticSubmitted(false);
			logger$1.error("Tool approval response failed", error);
			notifyError?.(t("message.tools.approvalError", "Failed to send approval"));
		}
	}, [
		match,
		notifyError,
		respondToolApproval,
		t
	]);
	const persistAutoApprove = (0, import_react.useCallback)(() => {
		if (!mcpTool) return;
		const server = mcpServers.find((s) => s.id === mcpTool.serverId);
		if (!server) return;
		const current = server.disabledAutoApproveTools ?? [];
		if (!current.includes(mcpTool.name)) return;
		updateMcpServer({ body: { disabledAutoApproveTools: current.filter((name) => name !== mcpTool.name) } }).catch((err) => {
			logger$1.warn("Failed to persist auto-approve for MCP tool", {
				serverId: mcpTool.serverId,
				toolName: mcpTool.name,
				err
			});
		});
	}, [
		mcpTool,
		mcpServers,
		updateMcpServer
	]);
	if (!match?.approvalId) return IDLE;
	const remoteExecuting = match.state === "approval-responded" || match.state === "input-available";
	return {
		isWaiting: !optimisticSubmitted && match.state === "approval-requested",
		isExecuting: optimisticSubmitted || remoteExecuting,
		isSubmitting: optimisticSubmitted && !remoteExecuting,
		input: match.input,
		confirm: () => void respond(true),
		cancel: () => void respond(false),
		...mcpTool && { autoApprove: () => {
			respond(true);
			persistAutoApprove();
		} }
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ToolDisclosure({ items, activeKey, defaultActiveKey, onActiveKeyChange, className, itemClassName, triggerClassName, bodyClassName, variant = "default" }) {
	const isLight = variant === "light";
	const [internalActiveKeys, setInternalActiveKeys] = (0, import_react.useState)(defaultActiveKey ?? []);
	const currentActiveKeys = activeKey ?? internalActiveKeys;
	const { anchorRef, withScrollAnchor } = useScrollAnchor();
	const toggleKey = (key) => {
		const isOpening = !currentActiveKeys.includes(key);
		const nextActiveKeys = isOpening ? [...currentActiveKeys, key] : currentActiveKeys.filter((activeKey$1) => activeKey$1 !== key);
		withScrollAnchor(() => {
			if (activeKey === void 0) setInternalActiveKeys(nextActiveKeys);
			onActiveKeyChange?.(nextActiveKeys);
		}, { enterReadingMode: isOpening });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.tool-disclosure",
		ref: anchorRef,
		className: cn(isLight ? "w-full overflow-hidden bg-transparent" : "w-full overflow-hidden rounded-[7px] border border-border bg-background", className),
		children: items.map((item) => {
			const isOpen = currentActiveKeys.includes(item.key);
			const canExpand = item.children !== void 0 && item.children !== null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-none", itemClassName, item.classNames?.item, item.className),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-fit items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-expanded": canExpand ? isOpen : void 0,
						className: cn("flex w-fit items-center justify-between rounded-md border-0 bg-transparent text-left outline-none transition-colors focus-visible:bg-accent/50 disabled:pointer-events-none disabled:opacity-50", isLight ? "min-h-7 justify-start gap-2 py-0.5 font-normal text-[13px] text-muted-foreground leading-5 hover:no-underline" : "items-center gap-4 px-2.5 py-2 font-semibold text-foreground text-sm leading-4 hover:no-underline", triggerClassName, item.classNames?.header),
						onClick: () => canExpand && toggleKey(item.key),
						children: item.label
					}), item.extra]
				}), canExpand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeferredDisclosureContent, {
					isOpen,
					"data-testid": `collapse-content-${item.key}`,
					className: cn(isLight ? "mt-1.5 max-h-96 overflow-auto rounded-xl bg-muted px-4 py-3 text-[13px] text-muted-foreground leading-5" : "p-2.5", bodyClassName, item.classNames?.body),
					children: item.children
				})]
			}, item.key);
		})
	});
}
function DeferredDisclosureContent({ isOpen, children, ...props }) {
	const [shouldRender, setShouldRender] = (0, import_react.useState)(isOpen);
	(0, import_react.useEffect)(() => {
		if (!isOpen) {
			setShouldRender(false);
			return;
		}
		const timer = window.setTimeout(() => setShouldRender(true), 0);
		return () => window.clearTimeout(timer);
	}, [isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.deferred-disclosure-content",
		hidden: !isOpen,
		...mergeUiProps(props, "chat.deferred-disclosure-content"),
		children: shouldRender ? children : null
	});
}
var import_dist = require_dist();
var TOOL_RESPONSE_RENDER_DELAY_MS = 40;
var TOOL_ARGS_RENDER_DELAY_MS = 120;
var TOOL_RESPONSE_HIGHLIGHT_DELAY_MS = 220;
var MAX_ARG_STRING_PARSE_LENGTH = 2e4;
var MAX_ARG_VALUE_LENGTH = 4e3;
var MAX_ARG_OBJECT_KEYS = 24;
var MAX_ARG_ARRAY_ITEMS = 24;
var logger = loggerService.withContext("MessageTools");
var MessageMcpTool = ({ toolResponse }) => {
	const [activeKeys, setActiveKeys] = (0, import_react.useState)([]);
	const [copiedMap, setCopiedMap] = (0, import_react.useState)({});
	const { t } = useTranslation();
	const { messageFont, fontSize } = useMessageRenderConfig();
	const [progress, setProgress] = (0, import_react.useState)(0);
	const { setTimeoutTimer } = useTimer();
	const actions = useOptionalMessageListActions();
	const copyText = actions?.copyText;
	const notifyError = actions?.notifyError;
	const subscribeToolProgress = actions?.subscribeToolProgress;
	const { isToolAutoApproved } = useOptionalMessageListUi() ?? {};
	const { id, tool, status, response, partialArguments } = toolResponse;
	const approval = useToolApproval(toolResponse, tool);
	const autoApproved = isToolAutoApproved?.(tool) ?? false;
	const isDone = status === "done";
	const isError = status === "error";
	const isStreaming = status === "streaming";
	const willAwaitApproval = approval.isWaiting || !autoApproved && status === "invoking";
	(0, import_react.useEffect)(() => {
		const unsubscribe = subscribeToolProgress?.(id, setProgress);
		return () => {
			setProgress(0);
			unsubscribe?.();
		};
	}, [id, subscribeToolProgress]);
	(0, import_react.useEffect)(() => {
		if (isStreaming) setActiveKeys((prev) => prev.includes(id) ? prev : [...prev, id]);
		else if (isDone || isError) setActiveKeys((prev) => prev.filter((key) => key !== id));
	}, [
		isStreaming,
		isDone,
		isError,
		id
	]);
	if (approval.isWaiting) return null;
	const handleCollapseChange = (keys) => {
		setActiveKeys(Array.isArray(keys) ? keys : [keys]);
	};
	const copyContent = (content, toolId) => {
		if (!copyText) return;
		Promise.resolve(copyText(content, { successMessage: t("message.copied") })).then(() => {
			setCopiedMap((prev) => ({
				...prev,
				[toolId]: true
			}));
			setTimeoutTimer("copyContent", () => setCopiedMap((prev) => ({
				...prev,
				[toolId]: false
			})), 2e3);
		}).catch((error) => {
			logger.error("Failed to copy tool response:", error);
			notifyError?.(t("message.copy.failed"));
		});
	};
	const getDisclosureItems = () => {
		const items = [];
		const hasError = response?.isError === true;
		const result = {
			params: toolResponse.arguments,
			response: toolResponse.response
		};
		items.push({
			key: id,
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageTitleLabel$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TitleContent$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolName$1, {
				className: "min-w-0 items-center gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate",
					children: [
						tool.serverName,
						" : ",
						tool.name
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TitleActions$1, { children: [progress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(circular_progress_default, {
				value: Number((progress * 100)?.toFixed(0)),
				size: 13,
				strokeWidth: 2
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolStatusIndicator, {
				status: getEffectiveStatus(status, willAwaitApproval),
				hasError
			}), autoApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("message.tools.autoApproveEnabled"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-label": t("message.tools.autoApproveEnabled"),
					className: "flex h-5 items-center text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						"aria-hidden": "true",
						size: 13,
						strokeWidth: 1.8
					})
				})
			})] })] }) }),
			extra: (isDone || isError) && copyText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("common.copy"),
				delay: 500,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
					className: "message-action-button invisible opacity-0 transition-opacity duration-150 focus-visible:visible focus-visible:opacity-100 group-hover/tool:visible group-hover/tool:opacity-100",
					onClick: () => copyContent(JSON.stringify(result, null, 2), id),
					"aria-label": t("common.copy"),
					children: copiedMap[id] ? t("common.copied") : t("common.copy")
				})
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolResponseContainer, {
				style: {
					fontFamily: messageFont === "serif" ? "var(--font-family-serif)" : "var(--font-family)",
					fontSize
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolResponseContent, {
					isExpanded: activeKeys.includes(id),
					args: isStreaming ? partialArguments : toolResponse.arguments,
					isStreaming: !!isStreaming,
					response: isDone || isError ? toolResponse.response : void 0
				})
			})
		});
		return items;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapseContainer, {
		variant: "light",
		activeKey: activeKeys,
		onActiveKeyChange: handleCollapseChange,
		className: "message-tools-container",
		items: getDisclosureItems()
	}) });
};
var extractPreviewContent = (response) => {
	if (!response) return {
		text: "",
		images: []
	};
	const result = typeof response === "object" && response !== null && Object.prototype.hasOwnProperty.call(response, "content") ? CallToolResultSchema.safeParse(response) : null;
	if (result?.success) {
		const contents = result.data.content;
		if (contents.length === 0) return {
			text: "",
			images: []
		};
		const textParts = [];
		const images = [];
		for (const content of contents) switch (content.type) {
			case "text":
				if (content.text) try {
					const parsed = JSON.parse(content.text);
					textParts.push(JSON.stringify(parsed, null, 2));
				} catch {
					textParts.push(content.text);
				}
				break;
			case "image":
				if (content.data) images.push({
					data: content.data,
					mimeType: content.mimeType ?? "image/png"
				});
				break;
			case "resource":
				textParts.push(`[Resource: ${content.resource?.uri ?? "unknown"}]`);
				break;
		}
		return {
			text: textParts.join("\n\n"),
			images
		};
	}
	return {
		text: JSON.stringify(response, null, 2),
		images: []
	};
};
var truncateArgText = (text) => {
	const result = truncateOutput(text, MAX_ARG_VALUE_LENGTH);
	return result.isTruncated ? `${result.data}\n... truncated (${result.originalLength} chars)` : result.data;
};
var formatArgPreviewValue = (value, depth = 0) => {
	if (value === null) return "null";
	if (value === void 0) return "";
	if (typeof value === "string") return truncateArgText(value);
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	if (typeof value === "bigint") return value.toString();
	if (depth >= 2) {
		if (Array.isArray(value)) return `[${value.length} items]`;
		return "{...}";
	}
	if (Array.isArray(value)) {
		const visibleItems = value.slice(0, MAX_ARG_ARRAY_ITEMS).map((item) => formatArgPreviewValue(item, depth + 1));
		const suffix = value.length > MAX_ARG_ARRAY_ITEMS ? `, ... ${value.length - MAX_ARG_ARRAY_ITEMS} more items` : "";
		return `[${visibleItems.join(", ")}${suffix}]`;
	}
	if (typeof value === "object") {
		const entries = Object.entries(value);
		const visibleEntries = entries.slice(0, MAX_ARG_OBJECT_KEYS).map(([key, item]) => {
			return `${JSON.stringify(key)}: ${formatArgPreviewValue(item, depth + 1)}`;
		});
		const suffix = entries.length > MAX_ARG_OBJECT_KEYS ? `, ... ${entries.length - MAX_ARG_OBJECT_KEYS} more keys` : "";
		return `{${visibleEntries.join(", ")}${suffix}}`;
	}
	return truncateArgText(String(value));
};
var ToolResponseContent = ({ isExpanded, args, isStreaming, response }) => {
	const [shouldRender, setShouldRender] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!isExpanded) {
			setShouldRender(false);
			return;
		}
		const timer = window.setTimeout(() => setShouldRender(true), TOOL_RESPONSE_RENDER_DELAY_MS);
		return () => window.clearTimeout(timer);
	}, [isExpanded]);
	if (!isExpanded || !shouldRender) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandedToolResponseContent, {
		args,
		isStreaming,
		response
	});
};
var ExpandedToolResponseContent = ({ args, isStreaming, response }) => {
	const { highlightCode } = useCodeStyle();
	const [showArgs, setShowArgs] = (0, import_react.useState)(false);
	const [showResponse, setShowResponse] = (0, import_react.useState)(false);
	const [highlightedResponse, setHighlightedResponse] = (0, import_react.useState)("");
	const [responseImages, setResponseImages] = (0, import_react.useState)([]);
	const [isTruncated, setIsTruncated] = (0, import_react.useState)(false);
	const [originalLength, setOriginalLength] = (0, import_react.useState)(0);
	const highlightedForRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const argsTimer = window.setTimeout(() => setShowArgs(true), TOOL_ARGS_RENDER_DELAY_MS);
		const responseTimer = window.setTimeout(() => setShowResponse(true), TOOL_RESPONSE_HIGHLIGHT_DELAY_MS);
		return () => {
			window.clearTimeout(argsTimer);
			window.clearTimeout(responseTimer);
		};
	}, []);
	const parsedArgs = (0, import_react.useMemo)(() => {
		if (!showArgs) return null;
		if (!args) return null;
		if (typeof args === "string") {
			if (args.length > MAX_ARG_STRING_PARSE_LENGTH) return { arguments: truncateArgText(args) };
			try {
				return (0, import_dist.parse)(args);
			} catch {
				return { arguments: truncateArgText(args) };
			}
		}
		return args;
	}, [args, showArgs]);
	(0, import_react.useEffect)(() => {
		if (!showResponse || !response) return;
		const last = highlightedForRef.current;
		if (last && last.response === response && last.highlight === highlightCode) return;
		let cancelled = false;
		const highlight = async () => {
			setHighlightedResponse("");
			setResponseImages([]);
			setIsTruncated(false);
			setOriginalLength(0);
			const { text: previewContent, images } = extractPreviewContent(response);
			if (cancelled) return;
			setResponseImages(images);
			const { data: truncatedContent, isTruncated: wasTruncated, originalLength: origLen } = truncateOutput(previewContent);
			if (cancelled) return;
			setIsTruncated(wasTruncated);
			setOriginalLength(origLen);
			const result = await highlightCode(truncatedContent, "json");
			if (cancelled) return;
			highlightedForRef.current = {
				response,
				highlight: highlightCode
			};
			setHighlightedResponse(result);
		};
		if (window.requestIdleCallback) {
			const idleId = window.requestIdleCallback(() => void highlight(), { timeout: 500 });
			return () => {
				cancelled = true;
				window.cancelIdleCallback(idleId);
			};
		}
		const timer = window.setTimeout(() => void highlight(), 80);
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [
		showResponse,
		response,
		highlightCode
	]);
	const getEntries = () => {
		if (!parsedArgs || typeof parsedArgs !== "object") return [];
		if (Array.isArray(parsedArgs)) return [["arguments", parsedArgs]];
		return Object.entries(parsedArgs);
	};
	const entries = getEntries();
	const renderArgsTable = () => {
		if (entries.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArgsSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSectionTitle, { children: "Arguments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsTable, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [entries.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgKey, { children: key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgValue, { children: formatArgPreviewValue(value) })] }, key)), isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgKey, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonSpan, { width: "60px" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonSpan, { width: "120px" }) })] })] }) })] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.expanded-tool-response-content",
		children: [renderArgsTable(), response !== void 0 && response !== null && (highlightedResponse || responseImages.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResponseSection, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSectionTitle, { children: "Response" }),
			highlightedResponse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownContainer, {
				className: "markdown",
				dangerouslySetInnerHTML: { __html: highlightedResponse }
			}),
			isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength }),
			responseImages.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `data:${img.mimeType};base64,${img.data}`,
				alt: "Tool output",
				style: {
					maxWidth: 300,
					borderRadius: 4,
					marginTop: 8
				}
			}, idx))
		] })]
	});
};
var CollapseContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, {
	className: ["border-none [--status-color-error:var(--muted-foreground)] [--status-color-invoking:var(--primary)] [--status-color-success:var(--primary)] [--status-color-warning:var(--warning)]", className].filter(Boolean).join(" "),
	...props
});
var ToolContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.tool",
	className: ["group/tool my-px first:mt-0 first:pt-0", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.tool")
});
var MarkdownContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.markdown",
	className: ["[&_pre]:bg-transparent! [&_pre_span]:whitespace-pre-wrap", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.markdown")
});
var MessageTitleLabel$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.message-title-label",
	className: ["flex min-w-0 max-w-full flex-row items-center justify-between gap-2 overflow-hidden p-0", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.message-title-label")
});
var TitleContent$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.title-content",
	className: ["flex min-w-0 flex-1 flex-row items-center gap-1.5 overflow-hidden leading-5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.title-content")
});
var ToolName$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
	className: ["min-w-0 max-w-full shrink overflow-hidden font-normal text-[13px] text-muted-foreground transition-colors duration-150 group-hover/tool:text-foreground", className].filter(Boolean).join(" "),
	...props
});
var TitleActions$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.title-actions",
	className: ["flex shrink-0 items-center gap-1.5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.title-actions")
});
var ActionButton = ({ className, type = "button", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	"data-ui": "chat.action-button",
	type,
	className: ["flex h-5 cursor-pointer items-center justify-center rounded border-none bg-transparent px-1 text-[11px] text-muted-foreground opacity-70 transition-all duration-200 hover:bg-accent hover:text-foreground hover:opacity-100 focus-visible:bg-accent focus-visible:text-foreground focus-visible:opacity-100 focus-visible:outline-none", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.action-button")
});
var ToolResponseContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.tool-response",
	className: ["relative max-h-[300px] overflow-auto rounded-none border-t-0", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.tool-response")
});
var MessageMcpTool_default = (0, import_react.memo)(MessageMcpTool);
var spinnerVariants = {
	defaultColor: { color: "#2a2a2a" },
	dimmed: { color: "#8C9296" }
};
var Searching = motion.create("div");
function Spinner({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Searching, {
		className: "flex items-center gap-1 p-0",
		variants: spinnerVariants,
		initial: "defaultColor",
		animate: ["defaultColor", "dimmed"],
		transition: {
			duration: .8,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			size: 16,
			style: { color: "unset" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
function MessageKnowledgeSearchToolLabel({ toolResponse }) {
	const inputParse = kbSearchInputSchema.safeParse(toolResponse.arguments);
	const outputParse = kbSearchOutputSchema.safeParse(toolResponse.response);
	const query = inputParse.success ? inputParse.data.query : "";
	const resultCount = outputParse.success ? outputParse.data.length : 0;
	return toolResponse.status !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 items-center gap-1 py-0.5 text-[13px] leading-5",
		children: [resolver_default.t("message.searching"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: query
		})]
	}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.message-knowledge-search-tool",
		className: "flex items-center gap-1.5 py-0.5 text-[13px] text-muted-foreground leading-5 transition-colors duration-150 group-hover/tool:text-foreground",
		children: resolver_default.t("message.websearch.fetch_complete", { count: resultCount })
	});
}
function MessageKnowledgeSearchToolTitle({ toolResponse }) {
	const outputParse = kbSearchOutputSchema.safeParse(toolResponse.response);
	const hasResults = toolResponse.status === "done" && outputParse.success && outputParse.data.length > 0;
	const label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageKnowledgeSearchToolLabel, { toolResponse });
	if (!hasResults) return label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.message-knowledge-search-tool",
		className: "group/tool my-px first:mt-0 first:pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, {
			variant: "light",
			className: "message-tools-container border-none",
			items: [{
				key: toolResponse.id,
				label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageKnowledgeSearchToolBody, { toolResponse })
			}]
		})
	});
}
function MessageKnowledgeSearchToolBody({ toolResponse }) {
	const outputParse = kbSearchOutputSchema.safeParse(toolResponse.response);
	if (toolResponse.status !== "done" || !outputParse.success) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ui": "chat.message-knowledge-search-tool",
		className: "flex flex-col gap-1 p-0 text-[13px] leading-5 [&>li]:m-0 [&>li]:min-w-0 [&>li]:p-0",
		children: outputParse.data.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex min-w-0 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-foreground-tertiary",
				children: result.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: result.content
			})]
		}, result.id))
	});
}
var MessageMetaTool = ({ toolResponse }) => {
	const { id, tool, status, response } = toolResponse;
	const [activeKeys, setActiveKeys] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const { setTimeoutTimer } = useTimer();
	const { t } = useTranslation();
	const actions = useOptionalMessageListActions();
	const copyText = actions?.copyText;
	const notifyError = actions?.notifyError;
	const isStreaming = status === "streaming";
	const isDone = status === "done";
	const isError = status === "error";
	const hasError = response?.isError === true;
	(0, import_react.useEffect)(() => {
		if (isStreaming || status === "invoking" || status === "pending") setActiveKeys((prev) => prev.includes(id) ? prev : [...prev, id]);
		else if (isDone || isError) setActiveKeys((prev) => prev.filter((k) => k !== id));
	}, [
		isStreaming,
		isDone,
		isError,
		status,
		id
	]);
	const titleLabel = useTitleLabel(toolResponse);
	const handleCopy = (e) => {
		e.stopPropagation();
		const payload = JSON.stringify({
			args: toolResponse.arguments,
			response: toolResponse.response
		}, null, 2);
		if (!copyText) return;
		Promise.resolve(copyText(payload, { successMessage: t("message.copied") })).then(() => {
			setCopied(true);
			setTimeoutTimer("copyMetaTool", () => setCopied(false), 2e3);
		}).catch(() => {
			notifyError?.(t("message.copy.failed"));
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapseShell, {
		activeKey: activeKeys,
		onActiveKeyChange: setActiveKeys,
		className: "message-tools-container",
		items: [{
			key: id,
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MessageTitleLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolName, { children: titleLabel }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolStatusIndicator, {
				status: getEffectiveStatus(status, false),
				hasError
			}) })] }),
			extra: (isDone || isError) && copyText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
				className: "message-action-button invisible opacity-0 transition-opacity duration-150 focus-visible:visible focus-visible:opacity-100 group-hover/tool:visible group-hover/tool:opacity-100",
				onClick: handleCopy,
				"aria-label": t("common.copy"),
				children: copied ? t("common.copied") : t("common.copy")
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {
				toolResponse,
				toolName: tool.name
			})
		}]
	}) });
};
function useTitleLabel(toolResponse) {
	const { tool, arguments: args } = toolResponse;
	const name = tool.name;
	const argRecord = isRecord$1(args) ? args : void 0;
	switch (name) {
		case "tool_search": {
			const q = typeof argRecord?.query === "string" ? argRecord.query : void 0;
			const ns = typeof argRecord?.namespace === "string" ? argRecord.namespace : void 0;
			const parts = [q && `"${q}"`, ns && `ns=${ns}`].filter(Boolean);
			return `tool_search${parts.length > 0 ? ` · ${parts.join(" · ")}` : ""}`;
		}
		case "tool_inspect": return `tool_inspect · ${typeof argRecord?.name === "string" ? argRecord.name : "?"}`;
		case "tool_invoke": return `tool_invoke · ${typeof argRecord?.name === "string" ? argRecord.name : "?"}`;
		case "tool_exec": return "tool_exec";
	}
}
var Body = ({ toolResponse, toolName }) => {
	switch (toolName) {
		case "tool_search": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolSearchBody, { toolResponse });
		case "tool_inspect": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolInspectBody, { toolResponse });
		case "tool_invoke": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolInvokeBody, { toolResponse });
		case "tool_exec": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolExecBody, { toolResponse });
	}
};
var ToolSearchBody = ({ toolResponse }) => {
	const args = isRecord$1(toolResponse.arguments) ? toolResponse.arguments : void 0;
	const matchedNamespaces = (toolResponse.response ?? void 0)?.matchedNamespaces ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BodyContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsBlock, { args }),
		toolResponse.status === "done" && matchedNamespaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { children: "No tools matched." }),
		matchedNamespaces.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NamespaceGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NamespaceTitle, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: group.namespace }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
				"(",
				group.tools.length,
				")"
			] })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolNameList, { children: group.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolNameChip, { children: tool.name }, tool.name)) })] }, group.namespace))
	] });
};
var ToolInspectBody = ({ toolResponse }) => {
	const args = isRecord$1(toolResponse.arguments) ? toolResponse.arguments : void 0;
	const jsDoc = typeof toolResponse.response === "string" ? toolResponse.response : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BodyContainer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsBlock, { args }), jsDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
		title: "JSDoc",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { children: jsDoc })
	})] });
};
var ToolInvokeBody = ({ toolResponse }) => {
	const args = isRecord$1(toolResponse.arguments) ? toolResponse.arguments : void 0;
	const innerName = typeof args?.name === "string" ? args.name : void 0;
	const innerParams = isRecord$1(args?.params) ? args.params : void 0;
	const response = toolResponse.response;
	if (!innerName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { children: "tool_invoke called without a tool name." }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BodyContainer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsBlock, { args: innerParams }), response !== void 0 && response !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
		title: "Response",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { children: stringifyResponse(response) })
	})] });
};
var ToolExecBody = ({ toolResponse }) => {
	const args = isRecord$1(toolResponse.arguments) ? toolResponse.arguments : void 0;
	const code = typeof args?.code === "string" ? args.code : "";
	const out = toolResponse.response ?? void 0;
	const { highlightCode } = useCodeStyle();
	const [highlighted, setHighlighted] = (0, import_react.useState)("");
	const highlightedForRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!code) return;
		const last = highlightedForRef.current;
		if (last && last.code === code && last.highlight === highlightCode) return;
		let cancelled = false;
		highlightCode(code, "javascript").then((html) => {
			if (cancelled) return;
			highlightedForRef.current = {
				code,
				highlight: highlightCode
			};
			setHighlighted(html);
		});
		return () => {
			cancelled = true;
		};
	}, [code, highlightCode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BodyContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
			title: "Code",
			children: highlighted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlighted, {
				className: "markdown",
				dangerouslySetInnerHTML: { __html: highlighted }
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { children: code })
		}),
		out?.logs && out.logs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
			title: `Logs (${out.logs.length})`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { children: out.logs.join("\n") })
		}),
		out?.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
			title: "Error",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				"data-error": true,
				children: out.error
			})
		}),
		!out?.isError && out?.result !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseBlock, {
			title: "Result",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { children: stringifyResponse(out.result) })
		})
	] });
};
var ArgsBlock = ({ args }) => {
	const entries = (0, import_react.useMemo)(() => args ? Object.entries(args) : [], [args]);
	if (entries.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArgsSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSectionTitle, { children: "Arguments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsTable, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: entries.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgKey, { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgValue, { children: formatArgValue(v) })] }, k)) }) })] });
};
var ResponseBlock = ({ title, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResponseSectionStyled, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSectionTitle, { children: title }), children] });
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function stringifyResponse(value) {
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return String(value);
	}
}
var Container = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.message-meta-tool",
	className: ["group/tool my-px first:mt-0 first:pt-0", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.message-meta-tool")
});
var CollapseShell = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, {
	variant: "light",
	className: ["border-none [--status-color-error:var(--muted-foreground)] [--status-color-invoking:var(--primary)] [--status-color-success:var(--primary)] [--status-color-warning:var(--warning)]", className].filter(Boolean).join(" "),
	...props
});
var MessageTitleLabel = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.message-title-label",
	className: ["flex w-full flex-row items-center justify-between gap-2 p-0", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.message-title-label")
});
var TitleContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.title-content",
	className: ["flex min-w-0 flex-1 flex-row items-center gap-1.5 leading-5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.title-content")
});
var ToolName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "chat.tool-name",
	className: ["min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal text-[13px] text-muted-foreground transition-colors duration-150 group-hover/tool:text-foreground", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.tool-name")
});
var TitleActions = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.title-actions",
	className: ["flex shrink-0 items-center gap-1.5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.title-actions")
});
var CopyButton = ({ className, type = "button", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	"data-ui": "chat.copy-button",
	type,
	className: ["flex h-5 cursor-pointer items-center justify-center rounded border-none bg-transparent px-1 text-[11px] text-muted-foreground opacity-70 transition-all duration-200 hover:bg-accent hover:text-foreground hover:opacity-100 focus-visible:bg-accent focus-visible:text-foreground focus-visible:opacity-100 focus-visible:outline-none", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.copy-button")
});
var BodyContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.body",
	className: ["flex flex-col gap-2.5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.body")
});
var NamespaceGroup = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.namespace-group",
	className: ["flex flex-col gap-1.5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.namespace-group")
});
var ToolNameList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.tool-name-list",
	className: ["flex flex-wrap gap-1", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.tool-name-list")
});
var ToolNameChip = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
	"data-ui": "chat.tool-name-chip",
	className: ["font-(family-name:--code-font-family) inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-foreground text-xs", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.tool-name-chip")
});
var NamespaceTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.namespace-title",
	className: ["text-muted-foreground text-xs [&_small]:opacity-70", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.namespace-title")
});
var ResponseSectionStyled = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.response-section-styled",
	className: ["flex flex-col gap-1", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.response-section-styled")
});
var CodeBlock = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
	"data-ui": "chat.code-block",
	className: ["wrap-break-word font-(family-name:--code-font-family) m-0 max-h-[300px] overflow-auto whitespace-pre-wrap rounded bg-muted p-2 text-xs data-[error=true]:text-(--status-color-error)", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.code-block")
});
var Highlighted = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.highlighted",
	className: ["[&_pre]:max-h-[300px] [&_pre]:overflow-auto [&_pre]:rounded [&_pre]:bg-muted! [&_pre]:p-2 [&_pre]:text-xs", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.highlighted")
});
var Empty = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.empty",
	className: ["text-foreground-tertiary text-xs italic", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.empty")
});
var MessageMetaTool_default = (0, import_react.memo)(MessageMetaTool);
function useGeneratedImageUrls(ids) {
	const key = ids.join(",");
	const [state, setState] = (0, import_react.useState)({
		urls: [],
		failed: false
	});
	const resolvedKeyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const list = key ? key.split(",") : [];
		if (list.length === 0) {
			resolvedKeyRef.current = null;
			setState((current) => current.urls.length === 0 && !current.failed ? current : {
				urls: [],
				failed: false
			});
			return;
		}
		if (resolvedKeyRef.current === key) return;
		let cancelled = false;
		setState({
			urls: [],
			failed: false
		});
		Promise.all(list.map(async (id) => {
			try {
				return toSafeFileUrl(await window.api.file.getPhysicalPath({ id }), null);
			} catch {
				return null;
			}
		})).then((resolved) => {
			if (cancelled) return;
			const urls = resolved.filter((url) => url !== null);
			resolvedKeyRef.current = key;
			setState({
				urls,
				failed: urls.length === 0
			});
		});
		return () => {
			cancelled = true;
		};
	}, [key]);
	return state;
}
var NoteText = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "chat.note-text",
	className: "flex min-w-0 items-center py-0.5 text-[13px] text-muted-foreground leading-5",
	children
});
const MessageGenerateImageToolTitle = ({ toolResponse }) => {
	const { t } = useTranslation();
	const { inlineUrls, items } = (0, import_react.useMemo)(() => {
		const outputParse = generateImageOutputSchema.safeParse(toolResponse.response);
		const mcpOutputParse = CallToolResultSchema.safeParse(toolResponse.response);
		return {
			items: outputParse.success ? outputParse.data : [],
			inlineUrls: mcpOutputParse.success ? mcpOutputParse.data.content.flatMap((item) => item.type === "image" && item.data ? [`data:${item.mimeType ?? "image/png"};base64,${item.data}`] : []) : []
		};
	}, [toolResponse.response]);
	const { urls: resolvedUrls, failed: resolveFailed } = useGeneratedImageUrls(items.map((item) => item.id));
	const urls = inlineUrls.length > 0 ? inlineUrls : resolvedUrls;
	if (toolResponse.status !== "done" && toolResponse.status !== "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteText, { children: t("chat.input.tools.generate_image.generating") }) });
	if (urls.length === 0 && (items.length === 0 || resolveFailed)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteText, { children: t("chat.input.tools.generate_image.failed") });
	const isSingle = Math.max(items.length, urls.length) === 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.message-generate-image-tool",
		className: "group/tool my-px flex flex-col gap-1 first:mt-0 first:pt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteText, { children: t("chat.input.tools.generate_image.title") }), isSingle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageBlock_default, {
			images: urls,
			isPending: urls.length === 0,
			isSingle: true
		}) : urls.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageBlock_default, {
			images: urls,
			isSingle: false
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2.5",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageBlock_default, {
				images: [],
				isPending: true,
				isSingle: false
			}, item.id))
		})]
	});
};
function parseResultUrl(url) {
	try {
		const hostname = new URL(url).hostname;
		return {
			hostname,
			domain: hostname.replace(/^www\./, "")
		};
	} catch {
		return {
			hostname: "",
			domain: url
		};
	}
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getProviderWebSearchTarget(response) {
	if (!isRecord(response) || !isRecord(response.action)) return "";
	const action = response.action;
	switch (action.type) {
		case "search": return typeof action.query === "string" ? action.query : "";
		case "openPage": return typeof action.url === "string" ? action.url : "";
		case "findInPage":
			if (typeof action.pattern === "string" && action.pattern) return action.pattern;
			return typeof action.url === "string" ? action.url : "";
		default: return "";
	}
}
var MessageWebSearchToolLabel = ({ toolResponse }) => {
	const { t } = useTranslation();
	const inputParse = webSearchInputSchema.safeParse(toolResponse.arguments);
	const outputParse = webSearchOutputSchema.safeParse(toolResponse.response);
	const query = inputParse.success ? inputParse.data.query : getProviderWebSearchTarget(toolResponse.response);
	const resultText = !outputParse.success ? t("message.websearch.fetch_opaque") : outputParse.data.length === 0 ? t("message.websearch.fetch_empty") : t("message.websearch.fetch_complete", { count: outputParse.data.length });
	if (toolResponse.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.message-web-search-tool",
		className: "flex min-w-0 flex-1 items-center justify-between gap-3 py-0.5 text-[13px] text-muted-foreground leading-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: query
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-danger",
			children: t("message.tools.error")
		})]
	});
	if (toolResponse.status !== "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 items-center gap-1 py-0.5 text-[13px] leading-5",
		children: [t("message.searching"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: query
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.message-web-search-tool",
		className: "flex min-w-0 flex-1 items-center justify-between gap-3 py-0.5 text-[13px] text-muted-foreground leading-5 transition-colors duration-150 group-hover/tool:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: query || resultText
		}), query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-foreground-tertiary",
			children: resultText
		})]
	});
};
const MessageWebSearchToolTitle = ({ toolResponse }) => {
	const outputParse = webSearchOutputSchema.safeParse(toolResponse.response);
	const hasResults = toolResponse.status === "done" && outputParse.success && outputParse.data.length > 0;
	const label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageWebSearchToolLabel, { toolResponse });
	if (!hasResults) return label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.message-web-search-tool",
		className: "group/tool my-px first:mt-0 first:pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, {
			variant: "light",
			className: "message-tools-container border-none",
			items: [{
				key: toolResponse.id,
				label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageWebSearchToolBody, { toolResponse })
			}]
		})
	});
};
const MessageWebSearchToolBody = ({ toolResponse }) => {
	const outputParse = webSearchOutputSchema.safeParse(toolResponse.response);
	if (toolResponse.status !== "done" || !outputParse.success) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ui": "chat.message-web-search-tool",
		className: "flex flex-col gap-0.5 p-0 text-[13px] leading-5 [&>li]:m-0 [&>li]:p-0",
		children: outputParse.data.map((result) => {
			const { hostname, domain } = parseResultUrl(result.url);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
				href: result.url,
				className: "-mx-2 flex min-w-0 items-center gap-2 rounded-md px-2 py-1 no-underline transition-colors hover:bg-accent",
				children: [
					hostname && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
						hostname,
						alt: result.title || domain
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate text-foreground",
						children: result.title || result.url
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-[40%] shrink-0 truncate text-foreground-tertiary",
						children: domain
					})
				]
			}) }, result.id);
		})
	});
};
var builtinToolsPrefix = "builtin_";
var agentMcpToolsPrefix = "mcp__";
var agentGenerateImageToolName = `mcp__cherry-tools__${GENERATE_IMAGE_TOOL_NAME}`;
var agentTools = new Set(Object.values(AgentToolsType));
var CHERRY_AGENT_TOOL_NAMES = new Set([
	"web_fetch",
	KB_SEARCH_TOOL_NAME,
	KB_LIST_TOOL_NAME,
	KB_READ_TOOL_NAME,
	KB_MANAGE_TOOL_NAME,
	"memory"
]);
var CHERRY_RUNTIME_BUILTIN_TOOL_NAMES = new Set(Object.values(AGENT_RUNTIME_CAPABILITIES).flatMap((caps) => caps.builtinTools().map((tool) => tool.id)));
var isAgentTool = (toolName) => {
	if (agentTools.has(toolName) || toolName.startsWith(agentMcpToolsPrefix)) return true;
	return false;
};
function isCocoPipelineToolName(toolName) {
	return toolName.includes(".");
}
function chooseTool(toolResponse) {
	const toolName = toolResponse.tool.name;
	if (isMetaToolName(toolName)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageMetaTool_default, { toolResponse });
	if (toolName === "kb_search") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageKnowledgeSearchToolTitle, { toolResponse });
	if (toolName === "web_search" || toolName === "webSearch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageWebSearchToolTitle, { toolResponse });
	if (toolName === "generate_image" || toolName === agentGenerateImageToolName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageGenerateImageToolTitle, { toolResponse });
	if (CHERRY_AGENT_TOOL_NAMES.has(toolName)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse });
	if (isAskUserQuestionToolName(toolName)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse });
	if (isCocoPipelineToolName(toolName)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse });
	if (toolName.startsWith(builtinToolsPrefix)) switch (toolName.slice(8)) {
		case "web_search":
		case "web_search_preview": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageWebSearchToolTitle, { toolResponse });
		case "knowledge_search": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageKnowledgeSearchToolTitle, { toolResponse });
		default: return null;
	}
	if (isAgentTool(toolName) || toolResponse.tool.type === "provider" && CHERRY_RUNTIME_BUILTIN_TOOL_NAMES.has(toolName)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse });
	return null;
}
function canRenderMessageToolResponse(toolResponse) {
	return chooseTool(toolResponse) !== null;
}
function MessageTool({ toolResponse }) {
	const rendered = chooseTool(toolResponse);
	if (!rendered) return null;
	return rendered;
}
var DEDICATED_AGENT_SERVERS = new Set(["cherry-tools", "agent-memory"]);
function rendersThroughChooseTool(toolResponse) {
	const tool = toolResponse.tool;
	if (tool.type !== "mcp") return true;
	return DEDICATED_AGENT_SERVERS.has(tool.serverId) && canRenderMessageToolResponse(toolResponse);
}
function canRenderMessageTool(toolResponse) {
	if (isReportArtifactsToolResponse(toolResponse)) return false;
	if (isChannelAuthQrToolResponse(toolResponse)) return true;
	if (toolResponse.tool.type === "mcp" && !rendersThroughChooseTool(toolResponse)) return true;
	return canRenderMessageToolResponse(toolResponse);
}
function MessageTools({ toolResponse }) {
	const scopeMessageId = useMessagePartsScopeId();
	const topicId = useOptionalMessageListTopicId();
	const deferredOutput = (0, import_react.useMemo)(() => {
		const response = toolResponse.response;
		if (isDeferredToolOutput(response)) return response;
		if (isPersistedToolOutput(response) && topicId && scopeMessageId && toolResponse.toolCallId) {
			const ref = response.$persistedToolOutput;
			return {
				$deferredToolResult: {
					topicId,
					messageId: scopeMessageId,
					toolCallId: toolResponse.toolCallId
				},
				excerpt: envelopeDisplayExcerpt(ref),
				...ref.shape === "entities" ? { skeleton: ref.skeleton } : {}
			};
		}
	}, [
		scopeMessageId,
		toolResponse,
		topicId
	]);
	const { output, error, isLoading } = useToolResult(deferredOutput?.$deferredToolResult);
	const resolvedToolResponse = (0, import_react.useMemo)(() => {
		if (!deferredOutput) return toolResponse;
		if (isLoading) {
			if (deferredOutput.excerpt) {
				const { head, tail } = deferredOutput.excerpt;
				return {
					...toolResponse,
					response: normalizeToolOutputResponse([
						head,
						"…",
						tail
					].filter(Boolean).join("\n"))
				};
			}
			return {
				...toolResponse,
				status: "invoking",
				response: void 0
			};
		}
		if (error) return {
			...toolResponse,
			status: "error",
			response: normalizeToolErrorResponse(error instanceof Error ? error.message : String(error))
		};
		return {
			...toolResponse,
			response: normalizeToolOutputResponse(output)
		};
	}, [
		deferredOutput,
		error,
		isLoading,
		output,
		toolResponse
	]);
	if (isReportArtifactsToolResponse(resolvedToolResponse)) return null;
	if (isChannelAuthQrToolResponse(resolvedToolResponse)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageChannelConfigTool, { toolResponse: resolvedToolResponse });
	if (rendersThroughChooseTool(resolvedToolResponse)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageTool, { toolResponse: resolvedToolResponse });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageMcpTool_default, { toolResponse: resolvedToolResponse });
}
var BlockErrorFallback = ({ error }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.block-error-fallback",
		className: "rounded-lg border border-error-border border-dashed bg-error-subtle px-3 py-2 text-error-subtle-foreground text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("error.render.block", { defaultValue: "This content block failed to render" }) }), !isProd && error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 break-all font-mono",
			children: error.message
		})]
	});
};
var BlockErrorFallback_default = BlockErrorFallback;
function useMinimumDisplayDuration(nextValue, { enabled, getKey, minimumDurationMs, shouldBypass }) {
	const [, setRenderVersion] = (0, import_react.useState)(0);
	const displayValueRef = (0, import_react.useRef)(nextValue);
	const lastChangeAtRef = (0, import_react.useRef)(Date.now());
	const pendingValueRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const clearPendingTimer = () => {
			if (!timerRef.current) return;
			clearTimeout(timerRef.current);
			timerRef.current = null;
		};
		const syncValue = (value) => {
			displayValueRef.current = value;
			lastChangeAtRef.current = Date.now();
		};
		const currentValue$1 = displayValueRef.current;
		if (getKey(currentValue$1) === getKey(nextValue)) {
			clearPendingTimer();
			pendingValueRef.current = null;
			displayValueRef.current = nextValue;
			return clearPendingTimer;
		}
		if (!enabled || shouldBypass?.(currentValue$1, nextValue)) {
			clearPendingTimer();
			pendingValueRef.current = null;
			syncValue(nextValue);
			return clearPendingTimer;
		}
		pendingValueRef.current = { value: nextValue };
		const elapsedMs = Date.now() - lastChangeAtRef.current;
		const remainingMs = Math.max(0, minimumDurationMs - elapsedMs);
		clearPendingTimer();
		timerRef.current = setTimeout(() => {
			const pendingValue = pendingValueRef.current;
			if (!pendingValue) return;
			pendingValueRef.current = null;
			timerRef.current = null;
			syncValue(pendingValue.value);
			setRenderVersion((version) => version + 1);
		}, remainingMs);
		return clearPendingTimer;
	}, [
		enabled,
		getKey,
		minimumDurationMs,
		nextValue,
		shouldBypass
	]);
	const currentValue = displayValueRef.current;
	if (!enabled || shouldBypass?.(currentValue, nextValue) || getKey(currentValue) === getKey(nextValue)) return nextValue;
	return displayValueRef.current;
}
function isToolGroupItemCompleted(status) {
	return status === "done" || status === "error" || status === "cancelled";
}
function getItemIsWaiting(item, partsMap) {
	if (item.toolResponse.status !== "pending") return false;
	return isToolPartAwaitingApproval(partsMap, item.toolResponse.toolCallId);
}
function getItemEffectiveStatus(item, partsMap) {
	const isWaiting = getItemIsWaiting(item, partsMap);
	return getEffectiveStatus(item.toolResponse?.status, isWaiting);
}
var LIVE_HEADER_MIN_DURATION_MS = 1200;
var TOOL_GROUP_PROGRESS_COLOR = "var(--foreground-tertiary)";
function getToolHeaderCandidateKey(candidate) {
	return candidate.key;
}
var TOOL_GROUP_ICON_BY_NAME = {
	[AgentToolsType.Agent]: Sparkles,
	[AgentToolsType.Bash]: SquareTerminal,
	[AgentToolsType.BashOutput]: SquareTerminal,
	[AgentToolsType.Edit]: FileText,
	[AgentToolsType.Glob]: FileSearch,
	[AgentToolsType.Grep]: FileSearch,
	[AgentToolsType.ListMcpResources]: FileSearch,
	[AgentToolsType.MultiEdit]: FileText,
	[AgentToolsType.NotebookEdit]: FileText,
	[AgentToolsType.Read]: FileText,
	[AgentToolsType.ReadMcpResource]: FileSearch,
	[AgentToolsType.Search]: FileSearch,
	[AgentToolsType.Skill]: ToolCase,
	[AgentToolsType.Task]: ListChecks,
	[AgentToolsType.TaskCreate]: ListChecks,
	[AgentToolsType.TaskGet]: ListChecks,
	[AgentToolsType.TaskList]: ListChecks,
	[AgentToolsType.TaskOutput]: ListChecks,
	[AgentToolsType.TaskStop]: ListChecks,
	[AgentToolsType.TaskUpdate]: ListChecks,
	[AgentToolsType.TodoWrite]: ListChecks,
	[AgentToolsType.ToolSearch]: FileSearch,
	[AgentToolsType.WebFetch]: Globe,
	[AgentToolsType.WebSearch]: Globe,
	[PROVIDER_WEB_SEARCH_TOOL_NAME]: Globe,
	[AgentToolsType.Workflow]: Workflow,
	[AgentToolsType.Write]: FileText
};
var TOOL_GROUP_ICON_CLASS_NAME = "size-3.5 text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground";
var MCP_LABEL_KEYS_BY_ACTION = {
	analyze: ["analyze", "analyzing"],
	create: ["create", "creating"],
	delete: ["delete", "deleting"],
	execute: ["executeCommand", "executingCommand"],
	modify: ["modify", "modifying"],
	search: ["search", "searching"],
	send: ["send", "sending"],
	view: ["view", "viewing"]
};
var MCP_ANALYZE_PATTERN = /_(?:analyze|inspect|summarize)_/;
var MCP_CALENDAR_PATTERN = /_(?:calendar|event|schedule)_/;
var MCP_CREATE_PATTERN = /_(?:create|insert|new)_/;
var MCP_DATA_PATTERN = /_(?:database|dataset|record|sql|table)_/;
var MCP_DELETE_PATTERN = /_(?:delete|remove)_/;
var MCP_DOCUMENT_PATTERN = /_(?:document|file|markdown|pdf)_/;
var MCP_EMAIL_PATTERN = /_(?:mail|email|message)_/;
var MCP_EXECUTE_PATTERN = /_(?:call|execute|invoke|run)_/;
var MCP_IMAGE_PATTERN = /_(?:image|photo|picture)_/;
var MCP_MODIFY_PATTERN = /_(?:edit|patch|update|write)_/;
var MCP_SEARCH_PATTERN = /_(?:find|query|search)_/;
var MCP_SEND_PATTERN = /_(?:publish|send|upload)_/;
var MCP_TASK_PATTERN = /_(?:tasks?|todos?)_/;
var MCP_VIEW_PATTERN = /_(?:fetch|get|list|read|view)_/;
var MCP_WEB_PATTERN = /_(?:browser|fetch_markdown|http|url|web|website)_/;
function normalizeToolSemanticText(value) {
	return `_${value.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase().replace(/[^a-z0-9]+/g, "_")}_`;
}
function getMcpRuntimeAction(args) {
	if (!args || typeof args !== "object" || Array.isArray(args)) return void 0;
	const action = "action" in args && typeof args.action === "string" ? normalizeToolSemanticText(args.action) : "";
	if (MCP_DELETE_PATTERN.test(action)) return "delete";
	if (MCP_CREATE_PATTERN.test(action) || action === "_add_") return "create";
	if (MCP_MODIFY_PATTERN.test(action)) return "modify";
	if (MCP_SEND_PATTERN.test(action)) return "send";
	if (MCP_ANALYZE_PATTERN.test(action)) return "analyze";
	if (MCP_SEARCH_PATTERN.test(action)) return "search";
	if (MCP_VIEW_PATTERN.test(action)) return "view";
	if (MCP_EXECUTE_PATTERN.test(action)) return "execute";
}
function getMcpToolGroupPresentation(tool, args) {
	if (!tool || tool.type !== "mcp" && !tool.id.startsWith("mcp__") && !tool.name.startsWith("mcp__")) return;
	const serverName = "serverName" in tool && typeof tool.serverName === "string" ? tool.serverName : "";
	const identityText = normalizeToolSemanticText(`${serverName} ${tool.id} ${tool.name}`);
	const targetText = normalizeToolSemanticText(`${serverName} ${tool.id} ${tool.name} ${tool.description ?? ""}`);
	let target;
	let icon = Sparkles;
	if (MCP_EMAIL_PATTERN.test(targetText)) {
		target = "email";
		icon = Mail;
	} else if (MCP_CALENDAR_PATTERN.test(targetText)) {
		target = "calendar";
		icon = CalendarDays;
	} else if (MCP_DATA_PATTERN.test(targetText)) {
		target = "data";
		icon = Database;
	} else if (MCP_IMAGE_PATTERN.test(targetText)) {
		target = "imageFiles";
		icon = Image;
	} else if (MCP_TASK_PATTERN.test(targetText)) {
		target = "taskList";
		icon = ListChecks;
	} else if (MCP_WEB_PATTERN.test(targetText)) {
		target = MCP_SEARCH_PATTERN.test(targetText) ? "webSearch" : "webPage";
		icon = Globe;
	} else if (MCP_DOCUMENT_PATTERN.test(targetText)) {
		target = "documentFiles";
		icon = FileText;
	}
	let action = getMcpRuntimeAction(args);
	if (!action) {
		if (MCP_DELETE_PATTERN.test(identityText)) action = "delete";
		else if (MCP_CREATE_PATTERN.test(identityText)) action = "create";
		else if (MCP_MODIFY_PATTERN.test(identityText)) action = "modify";
		else if (MCP_SEND_PATTERN.test(identityText)) action = "send";
		else if (MCP_ANALYZE_PATTERN.test(identityText)) action = "analyze";
		else if (MCP_SEARCH_PATTERN.test(identityText)) action = "search";
		else if (MCP_VIEW_PATTERN.test(identityText)) action = "view";
		else if (MCP_EXECUTE_PATTERN.test(identityText)) action = "execute";
	}
	if (icon === Sparkles) {
		if (action === "search") icon = FileSearch;
		else if (action === "execute") icon = SquareTerminal;
		else if (action === "create" || action === "delete" || action === "modify") icon = FileText;
	}
	return {
		action,
		icon,
		target: target ?? (action ? "relatedContent" : void 0)
	};
}
function getToolGroupIcon(tool, toolArguments) {
	return tool && TOOL_GROUP_ICON_BY_NAME[tool.name] || getMcpToolGroupPresentation(tool, toolArguments)?.icon || Wrench;
}
function ToolGroupContentIcon({ tool, toolArguments }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getToolGroupIcon(tool, toolArguments), {
		"aria-hidden": "true",
		className: TOOL_GROUP_ICON_CLASS_NAME
	});
}
function getActivityCandidateKey(label) {
	return typeof label === "string" || typeof label === "number" ? `activity:${label}` : "activity";
}
function isErrorHeaderCandidate(candidate) {
	return candidate.kind === "tool" && (candidate.status === "error" || candidate.item.toolResponse.response?.isError === true);
}
function shouldBypassHeaderStabilization(currentCandidate, nextCandidate) {
	return nextCandidate.kind === "tool" && nextCandidate.status === "waiting" || isErrorHeaderCandidate(nextCandidate) || isErrorHeaderCandidate(currentCandidate);
}
function getMcpToolGroupActivity(presentation, isActive, t) {
	if (!presentation.action) return { label: t(`message.tools.activity.${isActive ? "usingExtension" : "usedExtension"}`) };
	const [inactiveLabelKey, activeLabelKey] = MCP_LABEL_KEYS_BY_ACTION[presentation.action];
	return {
		label: t(`message.tools.activity.${isActive ? activeLabelKey : inactiveLabelKey}`),
		description: presentation.target ? t(`message.tools.activity.${presentation.target}`) : void 0
	};
}
function getToolGroupSemanticTitle(toolResponse, status, t) {
	const isActive = status === "invoking" || status === "streaming" || status === "waiting";
	const mcpPresentation = getMcpToolGroupPresentation(toolResponse.tool, toolResponse.arguments);
	if (mcpPresentation && status === "error") return t("message.tools.activity.extensionFailed");
	const activity = getReadableToolActivity(toolResponse.tool.name, toolResponse.arguments, isActive, t) ?? (mcpPresentation ? getMcpToolGroupActivity(mcpPresentation, isActive, t) : void 0);
	if (!activity) return t(isActive ? "message.processing" : "message.tools.processed");
	if (!activity.description) return activity.label;
	return activity.description.toLocaleLowerCase().includes(activity.label.toLocaleLowerCase()) ? activity.description : `${activity.label} ${activity.description}`;
}
function getSemanticToolTitle(candidate, t) {
	return getToolGroupSemanticTitle(candidate.item.toolResponse, candidate.status, t);
}
var DynamicToolBlockGroupHeaderContent = import_react.memo(({ items, activityLabel, activityIcon, elapsedText, summary, isLiveProgress, preferSummary, semanticToolTitle, showContentIcon, summaryIcon, showLatestWhenComplete }) => {
	const { t } = useTranslation();
	const partsMap = usePartsMap();
	const allCompleted = items.every((item) => isToolGroupItemCompleted(item.toolResponse.status));
	const fallbackLabel = summary ?? t("message.tools.groupHeader", { count: items.length });
	const displayCandidate = useMinimumDisplayDuration(import_react.useMemo(() => {
		if (preferSummary) return {
			key: `summary:${String(fallbackLabel)}`,
			kind: "summary",
			label: fallbackLabel
		};
		if (activityLabel) return {
			key: getActivityCandidateKey(activityLabel),
			kind: "activity",
			label: activityLabel
		};
		if (allCompleted && !showLatestWhenComplete) return {
			key: `summary:${String(fallbackLabel)}`,
			kind: "summary",
			label: fallbackLabel
		};
		const waitingItems = items.filter((item) => getItemEffectiveStatus(item, partsMap) === "waiting");
		const lastWaitingItem = waitingItems[waitingItems.length - 1];
		if (lastWaitingItem) return {
			key: `${lastWaitingItem.id}:waiting`,
			kind: "tool",
			item: lastWaitingItem,
			status: "waiting"
		};
		const runningItems = items.filter((item) => {
			const status = getItemEffectiveStatus(item, partsMap);
			return status === "invoking" || status === "streaming";
		});
		const lastRunningItem = runningItems[runningItems.length - 1];
		if (lastRunningItem) {
			const lastRunningStatus = getItemEffectiveStatus(lastRunningItem, partsMap);
			return {
				key: `${lastRunningItem.id}:${lastRunningStatus}`,
				kind: "tool",
				item: lastRunningItem,
				status: lastRunningStatus
			};
		}
		const latestItem = showLatestWhenComplete ? items.at(-1) : void 0;
		if (latestItem) {
			const effectiveStatus = getItemEffectiveStatus(latestItem, partsMap);
			const latestStatus = latestItem.toolResponse.response?.isError === true ? "error" : effectiveStatus;
			return {
				key: `${latestItem.id}:${latestStatus}`,
				kind: "tool",
				item: latestItem,
				status: latestStatus
			};
		}
		return {
			key: `summary:${String(fallbackLabel)}`,
			kind: "summary",
			label: fallbackLabel
		};
	}, [
		activityLabel,
		allCompleted,
		fallbackLabel,
		items,
		partsMap,
		preferSummary,
		showLatestWhenComplete
	]), {
		enabled: isLiveProgress,
		getKey: getToolHeaderCandidateKey,
		minimumDurationMs: LIVE_HEADER_MIN_DURATION_MS,
		shouldBypass: shouldBypassHeaderStabilization
	});
	const renderWithElapsed = (content, icon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.render-with-elapsed",
		className: "flex min-w-0 max-w-full items-center gap-1.5 overflow-hidden text-[13px]",
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "chat.render-with-elapsed.tool-group-content-icon",
				"aria-hidden": "true",
				className: "flex size-3.5 shrink-0 items-center justify-center text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
				"data-testid": "tool-group-content-icon",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 overflow-hidden",
				children: content
			}),
			elapsedText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "shrink-0 text-foreground-tertiary",
				children: "·"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 whitespace-nowrap text-muted-foreground transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
				children: elapsedText
			})] })
		]
	});
	const renderSemanticTitle = (title, icon, key) => renderWithElapsed(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.render-semantic-title",
		className: "flex min-w-0 max-w-full items-center gap-1.5 overflow-hidden text-[13px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block truncate font-normal text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
			children: title
		}), isLiveProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "flex shrink-0 items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeatLoader_default, {
				color: TOOL_GROUP_PROGRESS_COLOR,
				size: 4,
				speedMultiplier: .8
			})
		})]
	}, key), icon);
	const latestTool = items.at(-1)?.toolResponse;
	const latestToolIcon = showContentIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolGroupContentIcon, {
		tool: latestTool?.tool,
		toolArguments: latestTool?.arguments
	}) : void 0;
	if (displayCandidate.kind === "summary") return renderWithElapsed(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.tool-block-group",
		className: "flex items-center text-[13px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whitespace-nowrap font-normal text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
			children: displayCandidate.label
		})
	}), summaryIcon ?? latestToolIcon);
	if (displayCandidate.kind === "activity") {
		if (semanticToolTitle) return renderSemanticTitle(displayCandidate.label, activityIcon ?? latestToolIcon);
		return renderWithElapsed(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "chat.tool-block-group",
			className: "flex min-w-0 items-center text-[13px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderShimmerText, {
				className: "truncate font-normal text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
				children: displayCandidate.label
			})
		}));
	}
	if (semanticToolTitle) return renderSemanticTitle(getSemanticToolTitle(displayCandidate, t), showContentIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolGroupContentIcon, {
		tool: displayCandidate.item.toolResponse.tool,
		toolArguments: displayCandidate.item.toolResponse.arguments
	}) : void 0, displayCandidate.item.id);
	return renderWithElapsed(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.tool-block-group",
		className: "min-w-0 max-w-full overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolResponse: displayCandidate.item.toolResponse,
			variant: "collapse-label",
			status: displayCandidate.status,
			shimmer: isLiveProgress
		})
	}, displayCandidate.item.id));
});
DynamicToolBlockGroupHeaderContent.displayName = "DynamicToolBlockGroupHeaderContent";
const ToolBlockGroupHeaderContent = import_react.memo((props) => {
	const { t } = useTranslation();
	const { activityLabel, elapsedText, items, preferSummary, showContentIcon, showLatestWhenComplete, summary, summaryIcon } = props;
	const allCompleted = items.every((item) => isToolGroupItemCompleted(item.toolResponse.status));
	const fallbackLabel = summary ?? t("message.tools.groupHeader", { count: items.length });
	if (preferSummary || allCompleted && !showLatestWhenComplete && !activityLabel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.tool-block-group",
		className: "flex min-w-0 max-w-full items-center gap-1.5 overflow-hidden text-[13px]",
		children: [
			(summaryIcon || showContentIcon) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "chat.tool-block-group.tool-group-content-icon",
				"aria-hidden": "true",
				className: "flex size-3.5 shrink-0 items-center justify-center text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
				"data-testid": "tool-group-content-icon",
				children: summaryIcon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolGroupContentIcon, {
					tool: items.at(-1)?.toolResponse.tool,
					toolArguments: items.at(-1)?.toolResponse.arguments
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center text-[13px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap font-normal text-foreground-tertiary transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
						children: fallbackLabel
					})
				})
			}),
			elapsedText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "shrink-0 text-foreground-tertiary",
				children: "·"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 whitespace-nowrap text-muted-foreground transition-colors duration-150 group-hover/tool-group-trigger:text-foreground",
				children: elapsedText
			})] })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicToolBlockGroupHeaderContent, { ...props });
});
ToolBlockGroupHeaderContent.displayName = "ToolBlockGroupHeaderContent";
const ToolBlockGroupContent = import_react.memo(({ items, scrollRef }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.tool-block-group",
	ref: scrollRef,
	className: "tool-block-group-content flex w-full flex-col gap-2",
	children: items.map((item) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-block-id": item.id,
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, {
				fallbackComponent: BlockErrorFallback_default,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageTools, { toolResponse: item.toolResponse })
			})
		}, item.id);
	})
}));
ToolBlockGroupContent.displayName = "ToolBlockGroupContent";
var ToolGroupPartsBoundary = import_react.memo(({ allItemsCompleted, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartsProvider, {
		value: allItemsCompleted ? null : import_react.use(PartsContext),
		children
	});
});
ToolGroupPartsBoundary.displayName = "ToolGroupPartsBoundary";
const ToolBlockGroup = import_react.memo(({ children, isLiveProgress: isLiveProgressProp, isThinking = false, items }) => {
	const { t } = useTranslation();
	const [isExpanded, setIsExpanded] = useMessageDisclosureState(items[0] ? `tool-group:${items[0].toolResponse.toolCallId ?? items[0].id}` : void 0);
	const { anchorRef, withScrollAnchor } = useScrollAnchor();
	const allItemsCompleted = items.every((item) => isToolGroupItemCompleted(item.toolResponse.status));
	const isLiveProgress = isLiveProgressProp ?? items.some((item) => !isToolGroupItemCompleted(item.toolResponse.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolGroupPartsBoundary, {
		allItemsCompleted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "chat.tool-block-group.child-tool-group",
			ref: anchorRef,
			className: "group/child-tool-group w-full max-w-full",
			"data-testid": "child-tool-group",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				value: isExpanded ? "tools" : "",
				onValueChange: (value) => {
					const nextIsExpanded = value === "tools";
					withScrollAnchor(() => setIsExpanded(nextIsExpanded), {
						enterReadingMode: nextIsExpanded,
						settleAfterMs: 220
					});
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: "tools",
					className: "border-0 first:border-t-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "group/tool-group-trigger [&>svg]:-rotate-90 h-auto min-h-7 w-fit max-w-full flex-none select-none justify-start gap-1.5 rounded bg-transparent px-0 py-0.5 text-left font-normal shadow-none hover:no-underline focus-visible:bg-accent/50 focus-visible:outline-none [&>svg]:size-3.5 [&>svg]:opacity-0 [&>svg]:transition-[transform,opacity] hover:[&>svg]:opacity-60 focus-visible:[&>svg]:opacity-60 [&[data-state=open]>svg]:rotate-0 [&[data-state=open]>svg]:opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBlockGroupHeaderContent, {
								items,
								activityLabel: isThinking ? t("message.tools.thinkingHeader") : void 0,
								activityIcon: isThinking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, {
									"aria-hidden": "true",
									className: TOOL_GROUP_ICON_CLASS_NAME
								}) : void 0,
								isLiveProgress,
								semanticToolTitle: true,
								showContentIcon: true,
								showLatestWhenComplete: true
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						"data-testid": "child-tool-group-content",
						className: "px-0 pt-2 pb-0 text-inherit",
						contentClassName: "text-inherit motion-safe:data-[state=open]:[animation-duration:200ms] motion-safe:data-[state=closed]:[animation-duration:160ms] motion-reduce:animate-none",
						children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBlockGroupContent, { items })
					})]
				})
			})
		})
	});
});
ToolBlockGroup.displayName = "ToolBlockGroup";
export { getToolGroupSemanticTitle as a, MessageTools as c, useToolResult as d, BeatLoader_default as f, getToolGroupIcon as i, canRenderMessageTool as l, ToolBlockGroupContent as n, useMinimumDisplayDuration as o, ToolBlockGroupHeaderContent as r, BlockErrorFallback_default as s, ToolBlockGroup as t, ToolDisclosure as u };

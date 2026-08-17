const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./AgentFileDiffRenderer-r1t8uu2G.js","./preload-helper-DXC6tWlX.js","./dist-CbafgI8N.js","./lib-AqQ05U-c.js","./rolldown-runtime-BeJLVFtF.js","./zwitch-CMg-OEjI.js","./dist-DIxdlCXd.js","./columns-2-BUN_PYwg.js","./createLucideIcon-B9V3xxkc.js","./Icon-C_BHijq2.js","./react-DXAbXv4a.js","./rows-2-BUxz09nG.js","./jsx-runtime-DZOd5Dcc.js","./useCodeStyle-zD0Sb1Ey.js","./CodeViewer-b_Jk2kIF.js","./react-dom-D-tOyCJ4.js","./CodeViewer-DmsmcVO3.js","./esm-CA5JRyYP.js","./debounce-RtBWGQ3U.js","./usePreference-ChTcu0lP.js","./PreferenceService-ay5pWhVK.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-CbighP69.js","./style-C-RkFX_x.js","./clsx-CQMseKZW.js","./bundle-mjs-D5m5eEe0.js","./shiki-5X_PGXXr.js","./asyncInitializer-DlV1NBgp.js","./uuid-85lqhJWx.js","./v4-B6Ihluzs.js"])))=>i.map(i=>d[i]);
import { c as __toESM, t as __commonJSMin } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { C as string, T as unknown, _ as object, a as array, o as boolean, p as literal, w as union, x as record } from "./schemas-CV_EtlSZ.js";
import { c as ThemeMode } from "./PreferenceService-ay5pWhVK.js";
import { a as isWin, r as isMac } from "./platform-CINZzEpE.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { i as Flex } from "./flex-Cbul8ND0.js";
import { i as Qs } from "./chunk-BO2N2NFS-CPhdpqIF.js";
import { n as MenuItem, r as MenuList } from "./menu-item-Dgf4coMT.js";
import { t as Badge } from "./badge-CPxOcbpM.js";
import { t as Skeleton } from "./skeleton-BZtoNVvM.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { n as CommandContextMenu, r as CommandPopupMenu } from "./command-CtEyUhIg.js";
import { n as cn$1 } from "./style-C-RkFX_x.js";
import { t as cacheService } from "./CacheService-BxZWLQeF.js";
import { t as Bot } from "./bot-Dza-NcEv.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as ChevronLeft } from "./chevron-left-BS3NkQIf.js";
import { t as ChevronRight } from "./chevron-right-BPsUQvI4.js";
import { t as CircleCheckBig } from "./circle-check-big-D9CBmYpq.js";
import { t as CircleCheck } from "./circle-check-czafkGL2.js";
import { t as CircleQuestionMark } from "./circle-question-mark-D4QuwlIm.js";
import { t as CircleX } from "./circle-x-BOCKIMYB.js";
import { t as Compass } from "./compass-WNFF2rBX.js";
import { t as DoorOpen } from "./door-open-B2PV_2Z2.js";
import { t as Ellipsis } from "./ellipsis-D_zbxQx4.js";
import { t as FilePen } from "./file-pen-D0F1m3OE.js";
import { t as FileSearch } from "./file-search-G2GGdFuU.js";
import { t as FileText } from "./file-text-CbEF-1I4.js";
import { t as FileType } from "./file-type-CJczkasm.js";
import { t as FolderOpen } from "./folder-open-_dxyNNmN.js";
import { t as FolderSearch } from "./folder-search-u6c778Z4.js";
import { t as Globe } from "./globe-BRWoSABM.js";
import { t as ListTodo } from "./list-todo-B2Qjl1DA.js";
import { t as NotebookPen } from "./notebook-pen-rX2EzeJP.js";
import { t as Search } from "./search-Dz0ktO-n.js";
import { t as Send } from "./send-DoNFkDuu.js";
import { t as ShieldCheck } from "./shield-check-Tn67sW--.js";
import { t as Terminal } from "./terminal-rC57G3-g.js";
import { t as ToolCase } from "./tool-case-BY9yQQBD.js";
import { t as TriangleAlert } from "./triangle-alert-LSsyKFOW.js";
import { t as Workflow } from "./workflow-G6BADW47.js";
import { t as Wrench } from "./wrench-BCCvPw6d.js";
import { a as CallToolResultSchema } from "./mcp-CN-pwFr9.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-Dnr3VRWR.js";
import { o as isToolUIPart, r as getToolName } from "./dist-DmJhY6Jt.js";
import { C as isDeferredToolOutput, d as TO_MARKDOWN_TOOL_NAME, l as PROVIDER_WEB_SEARCH_TOOL_NAME, n as isToolType, t as extractOutputMetadata, u as REPORT_ARTIFACTS_TOOL_NAME, v as reportArtifactsInputSchema, x as GENERATE_IMAGE_TOOL_NAME } from "./toolOutput-CFeNIV-2.js";
import { n as getFilePreviewFileName } from "./filePreview-Bzjo3HcD.js";
import { n as normalizeInlineFilePath, r as resolveInlineFilePath } from "./filePath-CS1ffRfs.js";
import { t as useTemporaryValue } from "./useTemporaryValue-kBhuEh30.js";
import { l as useMessagePartsScopeId, r as PartsProvider, u as usePartsMap } from "./MessagePartsContext-C8SysI78.js";
import { t as CodeViewer_default } from "./CodeViewer-DmsmcVO3.js";
import { t as CopyIcon_default } from "./CopyIcon-CF5lW_xU.js";
import { n as getLanguageByFilePath } from "./codeLanguage-I8kvnbWT.js";
import { n as parseFunctionCallToolName } from "./mcpToolName-DmIzMwU1.js";
import { n as formatFileSize } from "./file-CVv-vzb2.js";
import { c as findScrollParent, d as useRequestScrollReadingControl, u as useIsScrollRuntimeManaged } from "./ScrollOwnershipContext-B284g1nN.js";
import { t as Icon } from "./iconify-CuvVQaA6.js";
import { c as ZedIcon, n as FinderIcon, o as VsCodeIcon, s as WindowsTerminalIcon, t as CursorIcon } from "./SvgIcon-F_UZ4jj_.js";
import { t as getFileIconName } from "./fileIconName-BBrRZj2T.js";
import { t as ImageViewer_default } from "./ImageViewer-BMsDhPpI.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MessageListDataContext = (0, import_react.createContext)(null);
var MessageListMessagesContext = (0, import_react.createContext)(null);
var MessageListActionsContext = (0, import_react.createContext)(null);
var MessageListMetaContext = (0, import_react.createContext)(null);
var MessageListRenderConfigContext = (0, import_react.createContext)(null);
var MessageListSelectionContext = (0, import_react.createContext)(null);
var MessageListUiStaticContext = (0, import_react.createContext)(null);
var MessageListUiSelectorsContext = (0, import_react.createContext)(null);
var MessageListEditingContext = (0, import_react.createContext)(null);
const MessageListProvider = ({ value, children }) => {
	const { state, actions, meta } = value;
	const data = (0, import_react.useMemo)(() => ({
		topic: state.topic,
		beforeList: state.beforeList,
		messageTail: state.messageTail,
		activeTurnStatus: state.activeTurnStatus,
		isInitialLoading: state.isInitialLoading,
		isMessagesStale: state.isMessagesStale,
		hasOlder: state.hasOlder,
		messageNavigation: state.messageNavigation,
		estimateSize: state.estimateSize,
		overscan: state.overscan,
		loadOlderDelayMs: state.loadOlderDelayMs,
		loadingResetDelayMs: state.loadingResetDelayMs,
		listKey: state.listKey,
		streamingLayers: state.streamingLayers
	}), [
		state.topic,
		state.beforeList,
		state.messageTail,
		state.activeTurnStatus,
		state.isInitialLoading,
		state.isMessagesStale,
		state.hasOlder,
		state.messageNavigation,
		state.estimateSize,
		state.overscan,
		state.loadOlderDelayMs,
		state.loadingResetDelayMs,
		state.listKey,
		state.streamingLayers
	]);
	const uiStatic = (0, import_react.useMemo)(() => ({
		menuConfig: state.menuConfig,
		translationLanguages: state.translationLanguages,
		translationLanguagesStatus: state.translationLanguagesStatus,
		externalCodeEditors: state.externalCodeEditors
	}), [
		state.menuConfig,
		state.translationLanguages,
		state.translationLanguagesStatus,
		state.externalCodeEditors
	]);
	const uiSelectors = (0, import_react.useMemo)(() => ({
		getMessageUiState: state.getMessageUiState,
		getMessageSiblings: state.getMessageSiblings,
		getMessageActivityState: state.getMessageActivityState,
		isMessageTranslating: state.isMessageTranslating,
		getFileView: state.getFileView,
		isToolAutoApproved: state.isToolAutoApproved,
		getTranslationLanguageLabel: state.getTranslationLanguageLabel
	}), [
		state.getMessageUiState,
		state.getMessageSiblings,
		state.getMessageActivityState,
		state.isMessageTranslating,
		state.getFileView,
		state.isToolAutoApproved,
		state.getTranslationLanguageLabel
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListDataContext, {
		value: data,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListMessagesContext, {
			value: state.messages,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartsProvider, {
				value: state.partsByMessageId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListActionsContext, {
					value: actions,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListMetaContext, {
						value: meta,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListRenderConfigContext, {
							value: state.renderConfig,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListSelectionContext, {
								value: state.selection,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListUiStaticContext, {
									value: uiStatic,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListUiSelectorsContext, {
										value: uiSelectors,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListEditingContext, {
											value: state.editingMessageId ?? null,
											children
										})
									})
								})
							})
						})
					})
				})
			})
		})
	});
};
var useRequiredContext = (context, name) => {
	const value = (0, import_react.use)(context);
	if (value === null) throw new Error(`${name} must be used within MessageListProvider`);
	return value;
};
const useOptionalMessageListActions = () => {
	return (0, import_react.use)(MessageListActionsContext) ?? void 0;
};
const useOptionalMessageListTopicId = () => {
	return (0, import_react.use)(MessageListDataContext)?.topic.id;
};
const useOptionalMessageListUi = () => {
	const stat = (0, import_react.use)(MessageListUiStaticContext);
	const sel = (0, import_react.use)(MessageListUiSelectorsContext);
	return (0, import_react.useMemo)(() => {
		if (stat === null || sel === null) return void 0;
		return {
			...stat,
			...sel
		};
	}, [stat, sel]);
};
const useMessageListUiSelectors = () => {
	return useRequiredContext(MessageListUiSelectorsContext, "useMessageListUiSelectors");
};
const useMessageListData = () => {
	const data = useRequiredContext(MessageListDataContext, "useMessageListData");
	const messages = useRequiredContext(MessageListMessagesContext, "useMessageListData");
	return (0, import_react.useMemo)(() => ({
		...data,
		messages
	}), [data, messages]);
};
const useMessageListActiveTurnStatus = () => {
	return (0, import_react.use)(MessageListDataContext)?.activeTurnStatus ?? null;
};
const useMessageListActions = () => {
	return useRequiredContext(MessageListActionsContext, "useMessageListActions");
};
const useMessageListMeta = () => {
	return useRequiredContext(MessageListMetaContext, "useMessageListMeta");
};
const useMessageRenderConfig = () => {
	return useRequiredContext(MessageListRenderConfigContext, "useMessageRenderConfig");
};
const useMessageListSelection = () => {
	const value = (0, import_react.use)(MessageListSelectionContext);
	if (value === null) throw new Error("useMessageListSelection must be used within MessageListProvider");
	return value;
};
const useMessageListEditingId = () => (0, import_react.use)(MessageListEditingContext);
const useMessageListUi = () => {
	const stat = useRequiredContext(MessageListUiStaticContext, "useMessageListUi");
	const sel = useRequiredContext(MessageListUiSelectorsContext, "useMessageListUi");
	return (0, import_react.useMemo)(() => ({
		...stat,
		...sel
	}), [stat, sel]);
};
var RST = "\x1B[0m";
const shellColorPalettes = {
	dark: {
		red: "\x1B[31m",
		yellow: "\x1B[33m",
		blue: "\x1B[94m",
		magenta: "\x1B[35m",
		cyan: "\x1B[36m",
		gray: "\x1B[90m",
		command: "\x1B[1;92m",
		string: "\x1B[38;5;208m"
	},
	light: {
		red: "\x1B[38;5;160m",
		yellow: "\x1B[38;5;130m",
		blue: "\x1B[38;5;27m",
		magenta: "\x1B[38;5;127m",
		cyan: "\x1B[38;5;30m",
		gray: "\x1B[38;5;102m",
		command: "\x1B[1;38;5;28m",
		string: "\x1B[38;5;166m"
	}
};
const TERMINAL_SURFACE_CLASS = "bg-[#f5f5f5] text-[#1e1e1e] dark:bg-[#1e1e1e] dark:text-[#d4d4d4]";
const TERMINAL_LINK_CLASS = "[&_a]:text-[#0366d6]! [&_a:hover]:text-[#0550ae]! [&_[role=link]]:text-[#0366d6]! [&_[role=link]:hover]:text-[#0550ae]! dark:[&_a]:text-[#569cd6]! dark:[&_a:hover]:text-[#7cb9e8]! dark:[&_a:hover]:decoration-solid dark:[&_[role=link]]:text-[#569cd6]! dark:[&_[role=link]:hover]:text-[#7cb9e8]! dark:[&_[role=link]:hover]:decoration-solid";
var ERROR_LINE_RE = /^(error|Error|ERROR|FAIL|FAILED|fatal|Fatal|FATAL)\b/;
var WARNING_LINE_RE = /^(warning|Warning|WARNING|WARN)\b/;
var TokenType = /* @__PURE__ */ function(TokenType$1) {
	TokenType$1[TokenType$1["Whitespace"] = 0] = "Whitespace";
	TokenType$1[TokenType$1["String"] = 1] = "String";
	TokenType$1[TokenType$1["EnvVar"] = 2] = "EnvVar";
	TokenType$1[TokenType$1["Comment"] = 3] = "Comment";
	TokenType$1[TokenType$1["LongFlag"] = 4] = "LongFlag";
	TokenType$1[TokenType$1["ShortFlag"] = 5] = "ShortFlag";
	TokenType$1[TokenType$1["Operator"] = 6] = "Operator";
	TokenType$1[TokenType$1["Path"] = 7] = "Path";
	TokenType$1[TokenType$1["Number"] = 8] = "Number";
	TokenType$1[TokenType$1["Word"] = 9] = "Word";
	return TokenType$1;
}(TokenType || {});
function isWhitespace(c) {
	return c === " " || c === "	";
}
function isDigit(c) {
	return c >= "0" && c <= "9";
}
function isWordChar(c) {
	return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "_" || isDigit(c);
}
function isOperator(c) {
	return c === "|" || c === "&" || c === ";" || c === ">" || c === "<";
}
function tokenize(line) {
	const tokens = [];
	let i = 0;
	const len = line.length;
	while (i < len) {
		const c = line[i];
		if (isWhitespace(c)) {
			const start = i;
			while (i < len && isWhitespace(line[i])) i++;
			tokens.push({
				type: TokenType.Whitespace,
				value: line.slice(start, i)
			});
			continue;
		}
		if (c === "'" || c === "\"") {
			const quote = c;
			const start = i;
			i++;
			while (i < len && line[i] !== quote) i++;
			if (i < len) i++;
			tokens.push({
				type: TokenType.String,
				value: line.slice(start, i)
			});
			continue;
		}
		if (c === "$") {
			const start = i;
			i++;
			if (i < len && line[i] === "{") {
				i++;
				while (i < len && line[i] !== "}") i++;
				if (i < len) i++;
			} else while (i < len && isWordChar(line[i])) i++;
			tokens.push({
				type: TokenType.EnvVar,
				value: line.slice(start, i)
			});
			continue;
		}
		if (c === "#") {
			tokens.push({
				type: TokenType.Comment,
				value: line.slice(i)
			});
			break;
		}
		if (c === "-") {
			const start = i;
			if (i + 1 < len && line[i + 1] === "-") {
				i += 2;
				while (i < len && (isWordChar(line[i]) || line[i] === "-")) i++;
				tokens.push({
					type: TokenType.LongFlag,
					value: line.slice(start, i)
				});
				continue;
			}
			const prev = tokens[tokens.length - 1];
			if ((!prev || prev.type === TokenType.Whitespace || prev.type === TokenType.Operator) && i + 1 < len && isWordChar(line[i + 1])) {
				tokens.push({
					type: TokenType.ShortFlag,
					value: line.slice(i, i + 2)
				});
				i += 2;
				continue;
			}
			const wordStart = i;
			i++;
			while (i < len && (isWordChar(line[i]) || line[i] === "-")) i++;
			tokens.push({
				type: TokenType.Word,
				value: line.slice(wordStart, i)
			});
			continue;
		}
		if (isOperator(c)) {
			const start = i;
			i++;
			if (i < len && (line[i] === c || c === ">" && line[i] === ">" || c === "<" && line[i] === "<")) i++;
			tokens.push({
				type: TokenType.Operator,
				value: line.slice(start, i)
			});
			continue;
		}
		if (c === "/" || c === "." && i + 1 < len && line[i + 1] === "/" || c === "~" && i + 1 < len && line[i + 1] === "/") {
			const start = i;
			while (i < len && !isWhitespace(line[i]) && line[i] !== "'" && line[i] !== "\"" && line[i] !== "," && !isOperator(line[i])) i++;
			tokens.push({
				type: TokenType.Path,
				value: line.slice(start, i)
			});
			continue;
		}
		if (isDigit(c)) {
			const start = i;
			while (i < len && isDigit(line[i])) i++;
			if (i < len && line[i] === ".") {
				i++;
				while (i < len && isDigit(line[i])) i++;
			}
			if (i < len && isWordChar(line[i])) {
				while (i < len && (isWordChar(line[i]) || line[i] === "-")) i++;
				tokens.push({
					type: TokenType.Word,
					value: line.slice(start, i)
				});
			} else tokens.push({
				type: TokenType.Number,
				value: line.slice(start, i)
			});
			continue;
		}
		if (isWordChar(c)) {
			const start = i;
			while (i < len && (isWordChar(line[i]) || line[i] === "-")) i++;
			tokens.push({
				type: TokenType.Word,
				value: line.slice(start, i)
			});
			continue;
		}
		tokens.push({
			type: TokenType.Word,
			value: c
		});
		i++;
	}
	return tokens;
}
function colorToken(token, p) {
	switch (token.type) {
		case TokenType.Whitespace: return token.value;
		case TokenType.String: return `${p.string}${token.value}${RST}`;
		case TokenType.EnvVar: return `${p.cyan}${token.value}${RST}`;
		case TokenType.Comment: return `${p.gray}${token.value}${RST}`;
		case TokenType.LongFlag:
		case TokenType.ShortFlag: return `${p.magenta}${token.value}${RST}`;
		case TokenType.Operator: return `${p.gray}${token.value}${RST}`;
		case TokenType.Path: return `${p.yellow}${token.value}${RST}`;
		case TokenType.Number: return `${p.blue}${token.value}${RST}`;
		case TokenType.Word: return token.value;
	}
}
function colorizeLine(line, commandMode, p) {
	if (line.trimStart().startsWith("#")) return `${p.gray}${line}${RST}`;
	const trimmed = line.trimStart();
	if (ERROR_LINE_RE.test(trimmed)) return `${p.red}${line}${RST}`;
	if (WARNING_LINE_RE.test(trimmed)) return `${p.yellow}${line}${RST}`;
	const tokens = tokenize(line);
	let expectCommand = commandMode;
	let result = "";
	for (const token of tokens) if (token.type === TokenType.Whitespace) result += token.value;
	else if (token.type === TokenType.Operator) {
		result += colorToken(token, p);
		expectCommand = commandMode;
	} else if (expectCommand && (token.type === TokenType.Word || token.type === TokenType.Path)) {
		result += `${p.command}${token.value}${RST}`;
		expectCommand = false;
	} else {
		result += colorToken(token, p);
		expectCommand = false;
	}
	return result;
}
function colorizeShellOutput(text, commandMode, palette) {
	if (text.includes("\x1B[")) return text;
	return text.split("\n").map((line) => colorizeLine(line, commandMode, palette)).join("\n");
}
var require_options = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Allow = exports.ALL = exports.COLLECTION = exports.ATOM = exports.SPECIAL = exports.INF = exports._INFINITY = exports.INFINITY = exports.NAN = exports.BOOL = exports.NULL = exports.OBJ = exports.ARR = exports.NUM = exports.STR = void 0;
	exports.STR = 1;
	exports.NUM = 2;
	exports.ARR = 4;
	exports.OBJ = 8;
	exports.NULL = 16;
	exports.BOOL = 32;
	exports.NAN = 64;
	exports.INFINITY = 128;
	exports._INFINITY = 256;
	exports.INF = exports.INFINITY | exports._INFINITY;
	exports.SPECIAL = exports.NULL | exports.BOOL | exports.INF | exports.NAN;
	exports.ATOM = exports.STR | exports.NUM | exports.SPECIAL;
	exports.COLLECTION = exports.ARR | exports.OBJ;
	exports.ALL = exports.ATOM | exports.COLLECTION;
	exports.Allow = {
		STR: exports.STR,
		NUM: exports.NUM,
		ARR: exports.ARR,
		OBJ: exports.OBJ,
		NULL: exports.NULL,
		BOOL: exports.BOOL,
		NAN: exports.NAN,
		INFINITY: exports.INFINITY,
		_INFINITY: exports._INFINITY,
		INF: exports.INF,
		SPECIAL: exports.SPECIAL,
		ATOM: exports.ATOM,
		COLLECTION: exports.COLLECTION,
		ALL: exports.ALL
	};
	exports.default = exports.Allow;
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$1(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Allow = exports.MalformedJSON = exports.PartialJSON = exports.parseJSON = exports.parse = void 0;
	var options_1 = require_options();
	Object.defineProperty(exports, "Allow", {
		enumerable: true,
		get: function() {
			return options_1.Allow;
		}
	});
	__exportStar(require_options(), exports);
	var PartialJSON = class extends Error {};
	exports.PartialJSON = PartialJSON;
	var MalformedJSON = class extends Error {};
	exports.MalformedJSON = MalformedJSON;
	function parseJSON(jsonString, allowPartial = options_1.Allow.ALL) {
		if (typeof jsonString !== "string") throw new TypeError(`expecting str, got ${typeof jsonString}`);
		if (!jsonString.trim()) throw new Error(`${jsonString} is empty`);
		return _parseJSON(jsonString.trim(), allowPartial);
	}
	exports.parseJSON = parseJSON;
	var _parseJSON = (jsonString, allow) => {
		const length = jsonString.length;
		let index = 0;
		const markPartialJSON = (msg) => {
			throw new PartialJSON(`${msg} at position ${index}`);
		};
		const throwMalformedError = (msg) => {
			throw new MalformedJSON(`${msg} at position ${index}`);
		};
		const parseAny = () => {
			skipBlank();
			if (index >= length) markPartialJSON("Unexpected end of input");
			if (jsonString[index] === "\"") return parseStr();
			if (jsonString[index] === "{") return parseObj();
			if (jsonString[index] === "[") return parseArr();
			if (jsonString.substring(index, index + 4) === "null" || options_1.Allow.NULL & allow && length - index < 4 && "null".startsWith(jsonString.substring(index))) {
				index += 4;
				return null;
			}
			if (jsonString.substring(index, index + 4) === "true" || options_1.Allow.BOOL & allow && length - index < 4 && "true".startsWith(jsonString.substring(index))) {
				index += 4;
				return true;
			}
			if (jsonString.substring(index, index + 5) === "false" || options_1.Allow.BOOL & allow && length - index < 5 && "false".startsWith(jsonString.substring(index))) {
				index += 5;
				return false;
			}
			if (jsonString.substring(index, index + 8) === "Infinity" || options_1.Allow.INFINITY & allow && length - index < 8 && "Infinity".startsWith(jsonString.substring(index))) {
				index += 8;
				return Infinity;
			}
			if (jsonString.substring(index, index + 9) === "-Infinity" || options_1.Allow._INFINITY & allow && 1 < length - index && length - index < 9 && "-Infinity".startsWith(jsonString.substring(index))) {
				index += 9;
				return -Infinity;
			}
			if (jsonString.substring(index, index + 3) === "NaN" || options_1.Allow.NAN & allow && length - index < 3 && "NaN".startsWith(jsonString.substring(index))) {
				index += 3;
				return NaN;
			}
			return parseNum();
		};
		const parseStr = () => {
			const start = index;
			let escape = false;
			index++;
			while (index < length && (jsonString[index] !== "\"" || escape && jsonString[index - 1] === "\\")) {
				escape = jsonString[index] === "\\" ? !escape : false;
				index++;
			}
			if (jsonString.charAt(index) == "\"") try {
				return JSON.parse(jsonString.substring(start, ++index - Number(escape)));
			} catch (e) {
				throwMalformedError(String(e));
			}
			else if (options_1.Allow.STR & allow) try {
				return JSON.parse(jsonString.substring(start, index - Number(escape)) + "\"");
			} catch (e) {
				return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("\\")) + "\"");
			}
			markPartialJSON("Unterminated string literal");
		};
		const parseObj = () => {
			index++;
			skipBlank();
			const obj = {};
			try {
				while (jsonString[index] !== "}") {
					skipBlank();
					if (index >= length && options_1.Allow.OBJ & allow) return obj;
					const key = parseStr();
					skipBlank();
					index++;
					try {
						obj[key] = parseAny();
					} catch (e) {
						if (options_1.Allow.OBJ & allow) return obj;
						else throw e;
					}
					skipBlank();
					if (jsonString[index] === ",") index++;
				}
			} catch (e) {
				if (options_1.Allow.OBJ & allow) return obj;
				else markPartialJSON("Expected '}' at end of object");
			}
			index++;
			return obj;
		};
		const parseArr = () => {
			index++;
			const arr = [];
			try {
				while (jsonString[index] !== "]") {
					arr.push(parseAny());
					skipBlank();
					if (jsonString[index] === ",") index++;
				}
			} catch (e) {
				if (options_1.Allow.ARR & allow) return arr;
				markPartialJSON("Expected ']' at end of array");
			}
			index++;
			return arr;
		};
		const parseNum = () => {
			if (index === 0) {
				if (jsonString === "-") throwMalformedError("Not sure what '-' is");
				try {
					return JSON.parse(jsonString);
				} catch (e) {
					if (options_1.Allow.NUM & allow) try {
						return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf("e")));
					} catch (e$1) {}
					throwMalformedError(String(e));
				}
			}
			const start = index;
			if (jsonString[index] === "-") index++;
			while (jsonString[index] && ",]}".indexOf(jsonString[index]) === -1) index++;
			if (index == length && !(options_1.Allow.NUM & allow)) markPartialJSON("Unterminated number literal");
			try {
				return JSON.parse(jsonString.substring(start, index));
			} catch (e) {
				if (jsonString.substring(start, index) === "-") markPartialJSON("Not sure what '-' is");
				try {
					return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("e")));
				} catch (e$1) {
					throwMalformedError(String(e$1));
				}
			}
		};
		const skipBlank = () => {
			while (index < length && " \n\r	".includes(jsonString[index])) index++;
		};
		return parseAny();
	};
	exports.parse = parseJSON;
}));
const AgentToolsType = {
	Skill: "Skill",
	Agent: "Agent",
	Read: "Read",
	Task: "Task",
	TaskOutput: "TaskOutput",
	TaskStop: "TaskStop",
	Bash: "Bash",
	Search: "Search",
	Glob: "Glob",
	TodoWrite: "TodoWrite",
	WebSearch: "WebSearch",
	Grep: "Grep",
	Write: "Write",
	WebFetch: "WebFetch",
	Edit: "Edit",
	MultiEdit: "MultiEdit",
	BashOutput: "BashOutput",
	NotebookEdit: "NotebookEdit",
	ExitPlanMode: "ExitPlanMode",
	AskUserQuestion: "AskUserQuestion",
	ToolSearch: "ToolSearch",
	ListMcpResources: "ListMcpResources",
	ReadMcpResource: "ReadMcpResource",
	TaskCreate: "TaskCreate",
	TaskGet: "TaskGet",
	TaskUpdate: "TaskUpdate",
	TaskList: "TaskList",
	SendMessage: "SendMessage",
	TeamCreate: "TeamCreate",
	TeamDelete: "TeamDelete",
	EnterWorktree: "EnterWorktree",
	ExitWorktree: "ExitWorktree",
	Workflow: "Workflow"
};
const ToolSearchToolOutputSchema = union([array(object({
	type: literal("tool_reference"),
	tool_name: string()
})), string()]);
const AskUserQuestionOptionSchema = object({
	label: string(),
	description: string().optional(),
	preview: string().optional()
});
const AskUserQuestionItemSchema = object({
	question: string(),
	header: string(),
	options: array(AskUserQuestionOptionSchema).min(2).max(4),
	multiSelect: boolean().default(false)
});
const AskUserQuestionAnswerSchema = record(string(), string());
const AskUserQuestionToolInputSchema = object({
	questions: array(AskUserQuestionItemSchema).min(1).max(4),
	answers: AskUserQuestionAnswerSchema.optional(),
	annotations: record(string(), record(string(), unknown())).optional(),
	metadata: record(string(), unknown()).optional()
});
function isAskUserQuestionToolName(toolName) {
	return toolName === AgentToolsType.AskUserQuestion || toolName === "builtin_AskUserQuestion";
}
const TO_MARKDOWN_RUNTIME_TOOL_NAME = `mcp__cherry-tools__${TO_MARKDOWN_TOOL_NAME}`;
function isBackgroundAgentOutput(output) {
	if (!output || Array.isArray(output)) return false;
	return output.status === "async_launched" || output.status === "remote_launched";
}
function parseAskUserQuestionToolInput(value) {
	const result = AskUserQuestionToolInputSchema.safeParse(value);
	return result.success ? result.data : void 0;
}
const SkeletonSpan = ({ width = "60px" }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
		className: "inline-block h-[1em] align-middle",
		style: {
			width,
			minWidth: width
		}
	});
};
SkeletonSpan.displayName = "SkeletonSpan";
function PlaceholderShimmerText({ className, style, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.placeholder-shimmer-text",
		className: ["animation-shimmer motion-reduce:!animate-none", className].filter(Boolean).join(" "),
		style: {
			"--animation-shimmer-mid": "color-mix(in srgb, var(--foreground) 66.6667%, transparent)",
			"--animation-shimmer-end": "color-mix(in srgb, var(--animation-shimmer-mid) 35%, transparent)",
			...style
		},
		...mergeUiProps(props, "chat.placeholder-shimmer-text")
	});
}
const TOOL_HEADER_UI = {
	[AgentToolsType.Agent]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 }) },
	[AgentToolsType.Read]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
		labelKey: "message.tools.labels.readFile"
	},
	[AgentToolsType.Task]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.task"
	},
	[AgentToolsType.TaskCreate]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskCreate"
	},
	[AgentToolsType.TaskGet]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskGet"
	},
	[AgentToolsType.TaskUpdate]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskUpdate"
	},
	[AgentToolsType.TaskList]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskList"
	},
	[AgentToolsType.TaskOutput]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskOutput"
	},
	[AgentToolsType.TaskStop]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.taskStop"
	},
	[AgentToolsType.Bash]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { size: 14 }),
		labelKey: "message.tools.labels.bash"
	},
	[AgentToolsType.BashOutput]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { size: 14 }),
		labelKey: "message.tools.labels.bashOutput"
	},
	[AgentToolsType.Search]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
		labelKey: "message.tools.labels.search"
	},
	[AgentToolsType.Glob]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, { size: 14 }),
		labelKey: "message.tools.labels.glob"
	},
	[AgentToolsType.Grep]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { size: 14 }),
		labelKey: "message.tools.labels.grep"
	},
	[AgentToolsType.Write]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
		labelKey: "message.tools.labels.write"
	},
	[AgentToolsType.Edit]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { size: 14 }),
		labelKey: "message.tools.labels.edit"
	},
	[AgentToolsType.MultiEdit]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }),
		labelKey: "message.tools.labels.multiEdit"
	},
	[AgentToolsType.WebSearch]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 14 }),
		labelKey: "message.tools.labels.webSearch"
	},
	[PROVIDER_WEB_SEARCH_TOOL_NAME]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 14 }),
		labelKey: "message.tools.labels.webSearch"
	},
	[AgentToolsType.WebFetch]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 14 }),
		labelKey: "message.tools.labels.webFetch"
	},
	[AgentToolsType.NotebookEdit]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { size: 14 }),
		labelKey: "message.tools.labels.notebookEdit"
	},
	[AgentToolsType.TodoWrite]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { size: 14 }),
		labelKey: "message.tools.labels.todoWrite"
	},
	[AgentToolsType.ExitPlanMode]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { size: 14 }),
		labelKey: "message.tools.labels.exitPlanMode"
	},
	[AgentToolsType.SendMessage]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 14 }) },
	[AgentToolsType.TeamCreate]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 }) },
	[AgentToolsType.TeamDelete]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 }) },
	[AgentToolsType.EnterWorktree]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { size: 14 }) },
	[AgentToolsType.ExitWorktree]: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { size: 14 }) },
	[AgentToolsType.Workflow]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { size: 14 }),
		labelKey: "message.tools.labels.workflow"
	},
	[AgentToolsType.Skill]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, { size: 14 }),
		labelKey: "message.tools.labels.skill"
	},
	[TO_MARKDOWN_RUNTIME_TOOL_NAME]: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, { size: 14 }),
		labelKey: "message.tools.labels.toMarkdown"
	}
};
var getAgentToolIcon = (toolName) => TOOL_HEADER_UI[toolName]?.icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 14 });
var getAgentToolLabel = (toolName, t) => {
	const labelKey = TOOL_HEADER_UI[toolName]?.labelKey;
	return labelKey ? t(labelKey) : toolName;
};
function getStringArg(args, key) {
	if (!args || typeof args !== "object" || Array.isArray(args)) return void 0;
	const value = args[key];
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function getStringInput(args) {
	return typeof args === "string" && args.trim() ? args.trim() : void 0;
}
function getTaskIdTarget(args, t) {
	const taskId = getStringArg(args, "taskId") ?? getStringArg(args, "task_id") ?? getStringArg(args, "shell_id");
	return taskId ? t("message.tools.activity.taskId", { id: taskId }) : void 0;
}
function getReadableUrlTarget(t) {
	return t("message.tools.activity.webPage");
}
function getReadableFileGroup(text, t) {
	if (!text) return void 0;
	const value = text.toLowerCase();
	if (value.includes("readme") || value.includes("package.json") || value.includes("go.mod") || value.includes("cargo.toml") || value.includes("tsconfig") || value.includes(".config.")) return t("message.tools.activity.configFiles");
	if (value.includes("*.md") || value.includes(".md") || value.includes("markdown") || value.includes("md files")) return t("message.tools.activity.documentFiles");
	if (/\.(png|jpe?g|gif|webp|svg|ico)\b/.test(value)) return t("message.tools.activity.imageFiles");
	if (value.includes("locales") || value.includes("i18n")) return t("message.tools.activity.translationFiles");
	if (/\.(ts|tsx|js|jsx|json|css|go|rs|py|java|kt|swift|cpp|c|h)\b/.test(value)) return t("message.tools.activity.codeFiles");
}
function getReadablePathTarget(filePath, t) {
	return getReadableFileGroup(filePath, t) ?? (filePath ? t("message.tools.activity.file") : void 0);
}
var SEARCH_PATTERN_META_RE = /[\\^$.*+?()[\]{}|]/;
var COMMAND_PREVIEW_MAX_LENGTH = 160;
function normalizeCommandPreview(command) {
	return command.replace(/\s+/g, " ").trim();
}
function truncateCommandPreview(command) {
	const normalized = normalizeCommandPreview(command);
	if (normalized.length <= COMMAND_PREVIEW_MAX_LENGTH) return normalized;
	const maxContentLength = COMMAND_PREVIEW_MAX_LENGTH - 1;
	const prefix = normalized.slice(0, maxContentLength);
	const separatorIndex = Math.max(prefix.lastIndexOf(" && "), prefix.lastIndexOf(" || "), prefix.lastIndexOf(" ; "), prefix.lastIndexOf(" | "));
	if (separatorIndex > 0) return `${prefix.slice(0, separatorIndex).trimEnd()}…`;
	const whitespaceIndex = prefix.lastIndexOf(" ");
	if (whitespaceIndex > 0) return `${prefix.slice(0, whitespaceIndex).trimEnd()}…`;
	return `${prefix}…`;
}
function getCommandPreview(toolName, args) {
	if (toolName !== AgentToolsType.Bash && toolName !== AgentToolsType.BashOutput) return void 0;
	const command = getStringArg(args, "command");
	if (!command) return void 0;
	return {
		text: truncateCommandPreview(command),
		fullText: normalizeCommandPreview(command)
	};
}
function getReadableSearchTarget(value, t) {
	const text = value?.trim();
	if (!text) return t("message.tools.activity.relatedContent");
	const fileGroup = getReadableFileGroup(text, t);
	if (fileGroup) return fileGroup;
	if (SEARCH_PATTERN_META_RE.test(text) || text.length > 48) return t("message.tools.activity.relatedContent");
	return text;
}
function getShellWords(command) {
	return command?.match(/"[^"]+"|'[^']+'|\S+/g)?.map((word) => word.replace(/^['"]|['"]$/g, "")).filter((word) => word && !word.startsWith("-") && word !== "&&" && word !== "||") ?? [];
}
function getCommandPathTarget(command, t) {
	return getReadablePathTarget(getShellWords(command).slice(1).find((word) => /[/.]/.test(word) && !/^https?:\/\//i.test(word)), t) ?? t("message.tools.activity.file");
}
function getDownloadedTarget(command, t) {
	const url = command?.match(/https?:\/\/[^\s'")]+/i)?.[0];
	if (!url) return t("message.tools.activity.file");
	try {
		const fileName = new URL(url).pathname.split("/").filter(Boolean).pop();
		if (/\.(?:zip|tar|tgz|gz|bz2|xz|7z|rar)$/i.test(fileName ?? "")) return t("message.tools.activity.archive");
		return getReadableFileGroup(fileName, t) ?? t("message.tools.activity.file");
	} catch {
		return t("message.tools.activity.file");
	}
}
function getActivityLabels(active, t) {
	return active ? {
		build: t("message.tools.activity.building"),
		check: t("message.tools.activity.checking"),
		copy: t("message.tools.activity.copying"),
		create: t("message.tools.activity.creating"),
		delete: t("message.tools.activity.deleting"),
		download: t("message.tools.activity.downloading"),
		execute: t("message.tools.activity.executingCommand"),
		extract: t("message.tools.activity.extracting"),
		handle: t("message.tools.activity.handling"),
		install: t("message.tools.activity.installing"),
		modify: t("message.tools.activity.modifying"),
		move: t("message.tools.activity.moving"),
		open: t("message.tools.activity.opening"),
		search: t("message.tools.activity.searching"),
		start: t("message.tools.activity.starting"),
		switch: t("message.tools.activity.switching"),
		sync: t("message.tools.activity.syncing"),
		upload: t("message.tools.activity.uploading"),
		view: t("message.tools.activity.viewing"),
		write: t("message.tools.activity.writing")
	} : {
		build: t("message.tools.activity.build"),
		check: t("message.tools.activity.check"),
		copy: t("message.tools.activity.copy"),
		create: t("message.tools.activity.create"),
		delete: t("message.tools.activity.delete"),
		download: t("message.tools.activity.download"),
		execute: t("message.tools.activity.executeCommand"),
		extract: t("message.tools.activity.extract"),
		handle: t("message.tools.activity.handle"),
		install: t("message.tools.activity.install"),
		modify: t("message.tools.activity.modify"),
		move: t("message.tools.activity.move"),
		open: t("message.tools.activity.open"),
		search: t("message.tools.activity.search"),
		start: t("message.tools.activity.start"),
		switch: t("message.tools.activity.switch"),
		sync: t("message.tools.activity.sync"),
		upload: t("message.tools.activity.upload"),
		view: t("message.tools.activity.view"),
		write: t("message.tools.activity.write")
	};
}
function getCommandActivity(args, active, t) {
	const description = getStringArg(args, "description");
	const command = getStringArg(args, "command");
	const text = `${description ?? ""} ${command ?? ""}`.toLowerCase();
	const labels = getActivityLabels(active, t);
	if (/\b(?:npm|pnpm|yarn|bun|pip3?|poetry|uv|cargo|go|brew)\s+(?:install|add|get)\b/.test(text)) return {
		label: labels.install,
		description: t("message.tools.activity.projectDependencies")
	};
	if (/\b(?:npm|pnpm|yarn|bun|pip3?|poetry|uv|cargo|brew)\s+(?:remove|uninstall|rm)\b/.test(text)) return {
		label: labels.delete,
		description: t("message.tools.activity.projectDependencies")
	};
	if (/\b(?:npm|pnpm|yarn|bun|pip3?|poetry|uv|cargo|go|brew)\s+(?:list|ls|outdated|update|upgrade)\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.projectDependencies")
	};
	if (/\b(?:curl|wget)\b/.test(text)) return {
		label: labels.download,
		description: getDownloadedTarget(command, t)
	};
	if (/\bgit\s+clone\b/.test(text)) return {
		label: labels.download,
		description: t("message.tools.activity.repository")
	};
	if (/\bgit\s+(?:pull|fetch|rebase|merge)\b/.test(text)) return {
		label: labels.sync,
		description: t("message.tools.activity.repository")
	};
	if (/\bgit\s+(?:checkout|switch|branch)\b/.test(text)) return {
		label: labels.switch,
		description: t("message.tools.activity.branch")
	};
	if (/\bgit\s+(?:status|diff|log|show|blame)\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.projectChanges")
	};
	if (/\bgit\s+commit\b/.test(text)) return {
		label: labels.write,
		description: t("message.tools.activity.projectChanges")
	};
	if (/\bgit\s+push\b/.test(text)) return {
		label: labels.upload,
		description: t("message.tools.activity.projectChanges")
	};
	if (/\bgh\s+(?:api|auth|pr|issue|run|workflow|repo)\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.codeHostInfo")
	};
	if (/\bgit\s+(?:remote|rev-parse|tag|ls-files|submodule)\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.repository")
	};
	if (/\b(?:cp|rsync)\b/.test(text)) return {
		label: labels.copy,
		description: getCommandPathTarget(command, t)
	};
	if (/\bmv\b/.test(text)) return {
		label: labels.move,
		description: getCommandPathTarget(command, t)
	};
	if (/\b(?:rm|rmdir)\b/.test(text)) return {
		label: labels.delete,
		description: getCommandPathTarget(command, t)
	};
	if (/\bmkdir\b/.test(text)) return {
		label: labels.create,
		description: t("message.tools.activity.folder")
	};
	if (/\btouch\b/.test(text)) return {
		label: labels.create,
		description: getCommandPathTarget(command, t)
	};
	if (/\b(?:unzip|tar)\b/.test(text)) return {
		label: labels.extract,
		description: t("message.tools.activity.archive")
	};
	if (/\b(?:npm|pnpm|yarn|bun)\s+(?:run\s+)?(?:dev|start|serve)\b|\b(?:cargo|go)\s+run\b|\b(?:vite|next|nuxt|electron-vite)\s+(?:dev|serve)\b|\bdocker\s+compose\s+up\b/.test(text)) return {
		label: labels.start,
		description: t("message.tools.activity.projectTask")
	};
	if (/\b(?:open|xdg-open)\b/.test(text) || /^\s*start\b/i.test(command ?? "")) return {
		label: labels.open,
		description: getCommandPathTarget(command, t)
	};
	if (/\b(?:npm|pnpm|yarn|bun)\s+(?:run\s+)?(?:build|compile|package)\b|\b(?:vite|next|nuxt|electron-vite)\s+build\b|\b(?:tsup|rollup|webpack|electron-builder)\b/.test(text)) return {
		label: labels.build,
		description: t("message.tools.activity.projectFiles")
	};
	if (/(\btest\b|\blint\b|\btypecheck\b|\bcheck\b|\bvitest\b|\bjest\b|\bplaywright\b|\btsc\b|\beslint\b|\bbiome\b)/.test(text)) return {
		label: labels.check,
		description: t("message.tools.activity.projectChecks")
	};
	if (/(\brg\b|\bgrep\b|\bag\b|\bfd\b|\bfind\b|\blocate\b)/.test(text)) return {
		label: labels.search,
		description: description ? getReadableSearchTarget(description, t) : t("message.tools.activity.relatedContent")
	};
	if (/\bpwd\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.currentFolder")
	};
	if (/\bcd\b/.test(text)) return {
		label: labels.switch,
		description: t("message.tools.activity.folder")
	};
	if (/\b(?:env|printenv|uname|sw_vers|which|where)\b|\bcommand\s+-v\b|\b[\w.-]+\s+(?:--version|-v)\b/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.environmentInfo")
	};
	if (/(\bcat\b|\bhead\b|\btail\b|\bless\b|\bmore\b|\bsed\s+-n\b|\bawk\b|\bwc\b|\bstat\b|\bdu\b)/.test(text)) return {
		label: labels.view,
		description: getCommandPathTarget(command, t)
	};
	const fileGroup = getReadableFileGroup(text, t);
	if (fileGroup) return {
		label: labels.search,
		description: fileGroup
	};
	if (text.includes("root directory")) return {
		label: labels.view,
		description: t("message.tools.activity.projectRootFiles")
	};
	if (text.includes("project directory")) return {
		label: labels.view,
		description: t("message.tools.activity.projectFiles")
	};
	if (/(\bls\b|\btree\b|\blist\b)/.test(text)) return {
		label: labels.view,
		description: t("message.tools.activity.fileList")
	};
	return {
		label: labels.execute,
		description: t("message.tools.activity.projectTask")
	};
}
function getReadableToolActivity(toolName, args, active, t) {
	const labels = getActivityLabels(active, t);
	const searchText = getStringInput(args) ?? getStringArg(args, "pattern") ?? getStringArg(args, "query");
	switch (toolName) {
		case AgentToolsType.Agent:
		case AgentToolsType.Task: return {
			label: labels.handle,
			description: getStringArg(args, "description") ?? getStringArg(args, "prompt") ?? t("message.tools.activity.assistantTask")
		};
		case AgentToolsType.Workflow: return {
			label: active ? t("message.tools.workflow.orchestrating") : t("message.tools.workflow.started"),
			description: getStringArg(args, "name") ?? t("message.tools.workflow.workflow")
		};
		case AgentToolsType.TaskCreate: return {
			label: t("message.tools.labels.taskCreate"),
			description: getStringArg(args, "subject") ?? getStringArg(args, "description") ?? t("message.tools.activity.taskList")
		};
		case AgentToolsType.TaskGet: return {
			label: t("message.tools.labels.taskGet"),
			description: getTaskIdTarget(args, t) ?? t("message.tools.activity.taskList")
		};
		case AgentToolsType.TaskList: return {
			label: t("message.tools.labels.taskList"),
			description: t("message.tools.activity.taskList")
		};
		case AgentToolsType.TaskOutput: return {
			label: t("message.tools.labels.taskOutput"),
			description: getTaskIdTarget(args, t) ?? t("message.tools.activity.taskList")
		};
		case AgentToolsType.TaskUpdate: return {
			label: t("message.tools.labels.taskUpdate"),
			description: getStringArg(args, "subject") ?? getStringArg(args, "description") ?? getTaskIdTarget(args, t) ?? t("message.tools.activity.taskList")
		};
		case AgentToolsType.TaskStop: return {
			label: t("message.tools.labels.taskStop"),
			description: getTaskIdTarget(args, t) ?? t("message.tools.activity.taskList")
		};
		case AgentToolsType.Bash:
		case AgentToolsType.BashOutput: return getCommandActivity(args, active, t);
		case AgentToolsType.Glob: return {
			label: labels.search,
			description: getReadableFileGroup(getStringArg(args, "pattern"), t) ?? t("message.tools.activity.matchingFiles")
		};
		case AgentToolsType.Grep:
		case AgentToolsType.Search: return {
			label: labels.search,
			description: getReadableSearchTarget(searchText, t)
		};
		case AgentToolsType.Read: return {
			label: labels.view,
			description: getReadablePathTarget(getStringArg(args, "file_path"), t)
		};
		case AgentToolsType.Write: return {
			label: labels.write,
			description: getReadablePathTarget(getStringArg(args, "file_path"), t)
		};
		case AgentToolsType.Edit:
		case AgentToolsType.MultiEdit:
		case AgentToolsType.NotebookEdit: return {
			label: labels.modify,
			description: getReadablePathTarget(getStringArg(args, "file_path") ?? getStringArg(args, "notebook_path"), t)
		};
		case AgentToolsType.WebSearch:
		case PROVIDER_WEB_SEARCH_TOOL_NAME: return {
			label: labels.search,
			description: getReadableSearchTarget(getStringArg(args, "query"), t)
		};
		case AgentToolsType.WebFetch: return {
			label: labels.view,
			description: getReadableUrlTarget(t)
		};
		case AgentToolsType.TodoWrite: return {
			label: labels.modify,
			description: t("message.tools.activity.taskList")
		};
		case AgentToolsType.Skill: return {
			label: labels.handle,
			description: t("message.tools.activity.assistantTask")
		};
		case AgentToolsType.ToolSearch: return {
			label: labels.search,
			description: t("message.tools.activity.availableFeatures")
		};
		case AgentToolsType.ListMcpResources:
		case AgentToolsType.ReadMcpResource: return {
			label: labels.view,
			description: t("message.tools.activity.availableResources")
		};
		case AgentToolsType.EnterWorktree:
		case AgentToolsType.ExitWorktree: return {
			label: labels.switch,
			description: t("message.tools.activity.workspace")
		};
		case AgentToolsType.ExitPlanMode: return {
			label: labels.write,
			description: t("message.tools.activity.plan")
		};
		default: return;
	}
}
function getReadableToolDescription(toolName, args, t) {
	return getReadableToolActivity(toolName, args, false, t)?.description;
}
function isActiveStatus(status) {
	return status === "pending" || status === "invoking" || status === "streaming" || status === "waiting";
}
var getToolDescription = (toolName, args, t) => {
	if (!args || typeof args !== "object" || Array.isArray(args)) return void 0;
	const readableDescription = getReadableToolDescription(toolName, args, t);
	if (readableDescription) return readableDescription;
	const argsRecord = args;
	return (argsRecord.description || argsRecord.file_path || argsRecord.pattern || argsRecord.query || argsRecord.command || argsRecord.url)?.toString();
};
var HeaderContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.header",
	className: ["flex min-w-0 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-[13px]", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.header")
});
var LabelContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.label",
	className: ["flex min-w-0 max-w-full items-center gap-1 overflow-hidden text-[13px] leading-5", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.label")
});
var ToolName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
	className: ["min-w-0 max-w-full shrink items-center overflow-hidden", className].filter(Boolean).join(" "),
	...props
});
var DESCRIPTION_CLASS = "inline-block min-w-0 max-w-full shrink truncate font-normal text-[13px] text-muted-foreground";
var Description = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "chat.description",
	className: [DESCRIPTION_CLASS, className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.description")
});
var STATS_CLASS = "shrink-0 whitespace-nowrap font-normal text-[13px] text-muted-foreground";
var Stats = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "chat.stats",
	className: [STATS_CLASS, className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.stats")
});
var CommandPreview = ({ fullText, text }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		"data-ui": "chat.command-preview.tool-command-preview",
		"data-testid": "tool-command-preview",
		title: fullText,
		className: "hidden min-w-0 max-w-[clamp(6rem,42vw,32rem)] shrink-[2] truncate rounded bg-background-subtle px-1.5 py-0.5 font-['Menlo','Monaco','Courier_New',monospace] text-[12px] text-muted-foreground leading-4 sm:block",
		children: text
	});
};
var StatusWrapper = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.status",
	className: ["ml-auto flex shrink-0 items-center", className].filter(Boolean).join(" "),
	...mergeUiProps(props, "chat.status")
});
function getToolNameClassName(variant) {
	return [
		"items-center gap-1.5",
		variant === "collapse-label" && "font-normal text-muted-foreground group-hover/tool-group-trigger:text-foreground [&_.tool-icon]:text-foreground-tertiary",
		variant === "standalone" && "font-medium text-foreground [&_.tool-icon]:text-primary"
	].filter(Boolean).join(" ");
}
function getToolIconClassName(isIconBreathing) {
	return ["tool-icon inline-flex shrink-0 items-center", isIconBreathing && "animate-pulse"].filter(Boolean).join(" ");
}
var McpToolHeader = ({ tool, description, stats, showStatus, status, hasError, shimmer, Container, variant }) => {
	const { t } = useTranslation();
	const { isToolAutoApproved } = useOptionalMessageListUi() ?? {};
	const autoApproved = isToolAutoApproved?.(tool) ?? false;
	const isIconBreathing = variant === "collapse-label" && isActiveStatus(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolName, {
			className: getToolNameClassName(variant),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: getToolIconClassName(isIconBreathing),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 14 })
				}),
				shimmer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlaceholderShimmerText, {
					className: "name min-w-0 max-w-full truncate",
					children: [
						tool.serverName,
						" : ",
						tool.name
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "name min-w-0 max-w-full truncate",
					children: [
						tool.serverName,
						" : ",
						tool.name
					]
				}),
				autoApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t("message.tools.autoApproveEnabled"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						size: 14,
						color: "var(--primary)"
					})
				})
			]
		}),
		description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: description }),
		stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, { children: stats }),
		showStatus && status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolStatusIndicator, {
			status,
			hasError
		}) })
	] });
};
var ToolHeader = ({ toolResponse, label: propLabel, toolName: propToolName, args: propArgs, icon: propIcon, params, stats, status: propStatus, hasError: propHasError, showStatus = true, shimmer = false, variant = "standalone" }) => {
	const { t } = useTranslation();
	const isStreaming = useIsStreaming();
	const tool = toolResponse?.tool;
	const toolName = propToolName || tool?.name || "Tool";
	const status = propStatus || toolResponse?.status;
	const hasError = propHasError ?? toolResponse?.response?.isError === true;
	const args = toolResponse?.arguments ?? propArgs;
	const activity = getReadableToolActivity(toolName, args, isStreaming || isActiveStatus(status), t);
	const displayLabel = propLabel ?? activity?.label ?? getAgentToolLabel(toolName, t);
	const description = params ?? activity?.description ?? getToolDescription(toolName, args, t);
	const commandPreview = getCommandPreview(toolName, args);
	const isIconBreathing = variant === "collapse-label" && isActiveStatus(status);
	const Container = variant === "standalone" ? HeaderContainer : LabelContainer;
	if (tool?.type === "mcp") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpToolHeader, {
		tool,
		description,
		stats,
		showStatus,
		status,
		hasError,
		shimmer,
		Container,
		variant
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolName, {
			className: getToolNameClassName(variant),
			children: [variant !== "collapse-label" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: getToolIconClassName(isIconBreathing),
				children: propIcon || getAgentToolIcon(toolName)
			}), shimmer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderShimmerText, {
				className: "name min-w-0 max-w-full truncate",
				children: displayLabel
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "name min-w-0 max-w-full truncate",
				children: displayLabel
			})]
		}),
		description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: description }),
		commandPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPreview, {
			text: commandPreview.text,
			fullText: commandPreview.fullText
		}),
		stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, { children: stats }),
		showStatus && status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolStatusIndicator, {
			status,
			hasError
		}) })
	] });
};
var ToolHeader_default = (0, import_react.memo)(ToolHeader);
const StreamingContext = (0, import_react.createContext)(false);
const useIsStreaming = () => (0, import_react.use)(StreamingContext);
function SkeletonValue({ value, width = "60px", fallback }) {
	const isStreaming = useIsStreaming();
	if (value !== void 0 && value !== null && value !== "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value });
	if (isStreaming) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonSpan, { width });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback ?? "" });
}
function StringInputTool({ input, label, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.string-input-tool",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label, ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: input })]
	});
}
function StringOutputTool({ output, label, className = "", textColor = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.string-output-tool",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: textColor,
			children: [label, ":"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: output })]
	});
}
function getEffectiveStatus(status, isWaiting) {
	if (status === "pending") return isWaiting ? "waiting" : "invoking";
	return status ?? "pending";
}
function ToolStatusIndicator({ status, hasError = false, errorText }) {
	const { t } = useTranslation();
	const getStatusInfo = () => {
		switch (status) {
			case "streaming": return {
				label: t("message.tools.streaming", "Streaming"),
				color: "primary"
			};
			case "waiting": return {
				label: t("message.tools.pending", "Awaiting Approval"),
				color: "warning"
			};
			case "pending":
			case "invoking": return {
				label: t("message.tools.invoking"),
				color: "primary"
			};
			case "cancelled": return {
				label: t("message.tools.cancelled"),
				color: "error"
			};
			case "done": return hasError ? {
				label: t("message.tools.error"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					size: 13,
					className: "lucide-custom"
				}),
				color: "error"
			} : {
				label: t("message.tools.completed"),
				color: "success"
			};
			case "error": return {
				label: t("message.tools.error"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					size: 13,
					className: "lucide-custom"
				}),
				color: "error"
			};
			default: return null;
		}
	};
	const info = getStatusInfo();
	if (!info) return null;
	const indicator = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusIndicatorContainer, {
		$color: info.color,
		children: [info.icon, info.label]
	});
	if (!errorText || status !== "error" && !hasError) return indicator;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-96 whitespace-pre-wrap break-words",
			children: errorText
		}),
		delay: 300,
		classNames: { placeholder: "inline-flex" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indicator })
	});
}
var TOOL_STATUS_ERROR_COLOR = "var(--muted-foreground)";
function getStatusColor(color) {
	switch (color) {
		case "primary":
		case "success": return "var(--primary)";
		case "warning": return "var(--warning)";
		case "error": return TOOL_STATUS_ERROR_COLOR;
		default: return "var(--foreground)";
	}
}
function StatusIndicatorContainer({ $color, style, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.status-indicator",
		className: "inline-flex items-center gap-1 text-xs opacity-85",
		style: {
			color: getStatusColor($color),
			...style
		},
		...mergeUiProps(props, "chat.status-indicator")
	});
}
function TruncatedIndicator({ originalLength }) {
	const { t } = useTranslation();
	const sizeStr = formatFileSize(originalLength);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.truncated-indicator",
		className: "mt-2 flex items-center gap-1 text-muted-foreground text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded bg-muted px-1.5 py-0.5 font-mono",
			children: t("message.tools.truncated", {
				defaultValue: sizeStr,
				size: sizeStr
			})
		})]
	});
}
const META_TOOL_NAMES = [
	"tool_search",
	"tool_inspect",
	"tool_invoke",
	"tool_exec"
];
function isMetaToolName(name) {
	return META_TOOL_NAMES.includes(name);
}
const APPROVAL_REQUESTED = "approval-requested";
const APPROVAL_RESPONDED = "approval-responded";
AGENT_RUNTIME_CAPABILITIES["claude-code"].transport;
AGENT_RUNTIME_CAPABILITIES.pi.transport;
var CHERRY_AGENT_TRANSPORTS = new Set(Object.values(AGENT_RUNTIME_CAPABILITIES).map((caps) => caps.transport));
var PI_RUNTIME_BUILTIN_TOOL_NAMES = new Set(AGENT_RUNTIME_CAPABILITIES.pi.builtinTools().map((tool) => tool.id));
var AGENT_MCP_TOOLS_PREFIX = "mcp__";
var AGENT_TOOL_NAMES = new Set(Object.values(AgentToolsType));
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function normalizeToolName(part) {
	return getToolName(part).trim() || "unknown";
}
function mapPartStateToStatus(state) {
	switch (state) {
		case "output-available": return "done";
		case "output-error": return "error";
		case "output-denied":
		case "cancelled": return "cancelled";
		case "input-streaming": return "streaming";
		case "input-available": return "invoking";
		case "approval-requested":
		case "approval-responded": return "pending";
		default: return "pending";
	}
}
function hasProviderMetadata(part, provider) {
	return isRecord$1(part.callProviderMetadata) && provider in part.callProviderMetadata;
}
function isLegacyAgentToolName(toolName) {
	return AGENT_TOOL_NAMES.has(toolName) || toolName.startsWith(AGENT_MCP_TOOLS_PREFIX);
}
function extractCherryToolMetadataFrom(metadata) {
	if (!isRecord$1(metadata)) return void 0;
	const cherry = isRecord$1(metadata.cherry) ? metadata.cherry : void 0;
	const tool = cherry && isRecord$1(cherry.tool) ? cherry.tool : void 0;
	if (!tool) return void 0;
	return {
		description: typeof tool.description === "string" ? tool.description : void 0,
		name: typeof tool.name === "string" ? tool.name : void 0,
		serverId: typeof tool.serverId === "string" ? tool.serverId : void 0,
		serverName: typeof tool.serverName === "string" ? tool.serverName : void 0,
		type: isToolType(tool.type) ? tool.type : void 0
	};
}
function extractCherryToolMetadata(part) {
	const resultProviderMetadata = "resultProviderMetadata" in part ? part.resultProviderMetadata : void 0;
	return extractCherryToolMetadataFrom("toolMetadata" in part ? part.toolMetadata : void 0) ?? extractCherryToolMetadataFrom(part.callProviderMetadata) ?? extractCherryToolMetadataFrom(resultProviderMetadata);
}
function extractClaudeParentToolCallIdFrom(metadata) {
	if (!isRecord$1(metadata)) return void 0;
	const claudeCode = isRecord$1(metadata["claude-code"]) ? metadata["claude-code"] : void 0;
	const parentToolCallId = claudeCode?.parentToolCallId ?? claudeCode?.parentToolUseId;
	return typeof parentToolCallId === "string" && parentToolCallId ? parentToolCallId : void 0;
}
function extractParentToolUseId(part) {
	const resultProviderMetadata = "resultProviderMetadata" in part ? part.resultProviderMetadata : void 0;
	return extractClaudeParentToolCallIdFrom(part.callProviderMetadata) ?? extractClaudeParentToolCallIdFrom(resultProviderMetadata);
}
function hasCherryTransport(metadata) {
	if (!isRecord$1(metadata)) return false;
	const cherry = isRecord$1(metadata.cherry) ? metadata.cherry : void 0;
	return typeof cherry?.transport === "string" && CHERRY_AGENT_TRANSPORTS.has(cherry.transport);
}
function resolveToolType(part, toolName, metadata) {
	if (isMetaToolName(toolName)) return "builtin";
	if (PI_RUNTIME_BUILTIN_TOOL_NAMES.has(toolName) && hasCherryTransport(part.callProviderMetadata)) return "provider";
	if (metadata?.type) return metadata.type;
	if (parseFunctionCallToolName(toolName)) return "mcp";
	if (toolName === "generate_image") return "builtin";
	if (toolPartWasProviderExecuted(part)) return "provider";
	if (hasProviderMetadata(part, "claude-code")) return "provider";
	if (hasCherryTransport(part.callProviderMetadata)) return "provider";
	if (part.type === "dynamic-tool" && isLegacyAgentToolName(toolName)) return "provider";
	if (part.type === "dynamic-tool") return "mcp";
	if (toolName.startsWith("builtin_")) return "builtin";
	return "builtin";
}
function toolPartWasProviderExecuted(part) {
	return "providerExecuted" in part && part.providerExecuted === true;
}
function buildMcpToolDescriptor(toolName, metadata) {
	const parsed = parseFunctionCallToolName(toolName);
	const serverId = metadata?.serverId ?? parsed?.serverPart ?? "unknown";
	const serverName = metadata?.serverName ?? parsed?.serverPart ?? "MCP";
	const displayName = metadata?.name ?? parsed?.toolPart ?? toolName;
	return {
		id: `${serverId}__${toolName}`,
		name: displayName,
		description: metadata?.description,
		type: "mcp",
		serverId,
		serverName,
		inputSchema: {
			type: "object",
			properties: {},
			required: []
		}
	};
}
function buildBaseToolDescriptor(toolType, toolCallId, toolName) {
	return {
		id: toolCallId,
		name: toolName,
		type: toolType
	};
}
function normalizeToolErrorResponse(errorText) {
	return {
		isError: true,
		content: [{
			type: "text",
			text: errorText || "Error"
		}]
	};
}
function normalizeErrorOutput(part) {
	if (part.state !== "output-error") return void 0;
	return normalizeToolErrorResponse(part.errorText);
}
function buildToolResponseFromPart(part, fallbackId) {
	if (!isToolUIPart(part)) return null;
	const toolPart = part;
	const toolCallId = toolPart.toolCallId || fallbackId;
	if (!toolCallId) return null;
	const toolName = normalizeToolName(toolPart);
	const status = mapPartStateToStatus(toolPart.state);
	const { response: rawResponse, metadata: outputMetadata } = extractOutputMetadata(toolPart.output);
	const cherryMetadata = extractCherryToolMetadata(toolPart);
	const metadata = outputMetadata ?? cherryMetadata;
	const toolType = resolveToolType(toolPart, toolName, metadata);
	const response = status === "error" ? normalizeErrorOutput(toolPart) : rawResponse;
	const parentToolUseId = extractParentToolUseId(toolPart);
	const partialArguments = (status === "streaming" || status === "invoking") && typeof toolPart.input === "string" ? toolPart.input : void 0;
	if (toolType === "mcp") return {
		id: toolCallId,
		tool: buildMcpToolDescriptor(toolName, metadata),
		arguments: toolPart.input,
		status,
		response,
		toolCallId,
		...parentToolUseId ? { parentToolUseId } : {},
		...partialArguments ? { partialArguments } : {}
	};
	return {
		id: toolCallId,
		tool: buildBaseToolDescriptor(toolType, toolCallId, toolName),
		arguments: toolPart.input,
		status,
		response,
		toolCallId,
		...parentToolUseId ? { parentToolUseId } : {},
		...partialArguments ? { partialArguments } : {}
	};
}
function findToolPartByCallId(partsMap, toolCallId) {
	if (!partsMap || !toolCallId) return null;
	for (const [messageId, parts] of Object.entries(partsMap)) for (const part of parts) {
		if (!isToolUIPart(part)) continue;
		const p = part;
		if (p.toolCallId !== toolCallId) continue;
		const approvalId = p.approval?.id;
		if (!approvalId) continue;
		return {
			part,
			state: p.state ?? "",
			toolCallId,
			messageId,
			approvalId,
			input: p.input
		};
	}
	return null;
}
function isToolPartAwaitingApproval(partsMap, toolCallId) {
	return findToolPartByCallId(partsMap, toolCallId)?.state === APPROVAL_REQUESTED;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function extractTextContent(content) {
	if (typeof content === "string") return content.trim() || void 0;
	if (!Array.isArray(content)) return void 0;
	return content.map((item) => isRecord(item) && typeof item.text === "string" ? item.text : void 0).filter((item) => Boolean(item?.trim())).join("\n").trim() || void 0;
}
function extractToolErrorText(response) {
	if (typeof response === "string") return response.trim() || void 0;
	if (!isRecord(response) || response.isError !== true) return void 0;
	return extractTextContent(response.content);
}
function useScrollAnchor() {
	const anchorRef = (0, import_react.useRef)(null);
	const settleTimerRef = (0, import_react.useRef)(null);
	const isMountedRef = (0, import_react.useRef)(true);
	const isRuntimeManaged = useIsScrollRuntimeManaged();
	const requestReadingControl = useRequestScrollReadingControl(anchorRef);
	(0, import_react.useEffect)(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
		};
	}, []);
	return {
		anchorRef,
		withScrollAnchor: (0, import_react.useCallback)((update, options) => {
			if (settleTimerRef.current !== null) {
				clearTimeout(settleTimerRef.current);
				settleTimerRef.current = null;
			}
			const anchor = anchorRef.current;
			if (!anchor) {
				update();
				return;
			}
			const scrollContainer = findScrollParent(anchor);
			if (!scrollContainer) {
				if (options?.enterReadingMode) requestReadingControl();
				update();
				return;
			}
			if (isRuntimeManaged(scrollContainer)) {
				if (options?.enterReadingMode) requestReadingControl();
				update();
				return;
			}
			const rectBefore = anchor.getBoundingClientRect();
			const scrollBefore = scrollContainer.scrollTop;
			update();
			requestAnimationFrame(() => {
				if (!isMountedRef.current) return;
				const restoredScrollTop = scrollBefore + (anchor.getBoundingClientRect().top - rectBefore.top);
				scrollContainer.scrollTop = restoredScrollTop;
				if (!options?.settleAfterMs) return;
				settleTimerRef.current = setTimeout(() => {
					settleTimerRef.current = null;
					if (!isMountedRef.current || scrollContainer.scrollTop !== restoredScrollTop) return;
					const finalDrift = anchor.getBoundingClientRect().top - rectBefore.top;
					if (finalDrift !== 0) scrollContainer.scrollTop += finalDrift;
				}, options.settleAfterMs);
			});
		}, [isRuntimeManaged, requestReadingControl])
	};
}
function cacheKey(messageId) {
	return `message.ui.${messageId}`;
}
function getCachedMessageUiState(messageId) {
	return cacheService.get(cacheKey(messageId)) ?? {};
}
function updateCachedMessageUiState(messageId, update) {
	const current = getCachedMessageUiState(messageId);
	const next = typeof update === "function" ? update(current) : {
		...current,
		...update
	};
	cacheService.set(cacheKey(messageId), next);
}
function subscribeCachedMessageUiState(messageId, listener) {
	return cacheService.subscribe(cacheKey(messageId), listener);
}
function invalidateCachedMessageUiStates(messageIds) {
	for (const messageId of messageIds) cacheService.delete(cacheKey(messageId));
}
function readExpanded(messageId, disclosureId, defaultExpanded) {
	if (!messageId || !disclosureId) return defaultExpanded;
	return getCachedMessageUiState(messageId).disclosures?.[disclosureId] ?? defaultExpanded;
}
function useMessageDisclosureState(disclosureId, defaultExpanded = false) {
	const messageId = useMessagePartsScopeId();
	const [unscopedExpanded, setUnscopedExpanded] = (0, import_react.useState)(defaultExpanded);
	const subscribe = (0, import_react.useCallback)((listener) => {
		if (!messageId || !disclosureId) return () => {};
		return subscribeCachedMessageUiState(messageId, listener);
	}, [disclosureId, messageId]);
	const getSnapshot = (0, import_react.useCallback)(() => messageId && disclosureId ? readExpanded(messageId, disclosureId, defaultExpanded) : unscopedExpanded, [
		defaultExpanded,
		disclosureId,
		messageId,
		unscopedExpanded
	]);
	return [(0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot), (0, import_react.useCallback)((update) => {
		if (!messageId || !disclosureId) {
			setUnscopedExpanded(update);
			return;
		}
		updateCachedMessageUiState(messageId, (current) => {
			const previous = current.disclosures?.[disclosureId] ?? defaultExpanded;
			const expanded = typeof update === "function" ? update(previous) : update;
			return {
				...current,
				disclosures: {
					...current.disclosures,
					[disclosureId]: expanded
				}
			};
		});
	}, [
		defaultExpanded,
		disclosureId,
		messageId
	])];
}
function AgentToolDisclosureLabel({ label, trailing, labelClassName, trailingClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.agent-tool-disclosure-label",
		className: "flex min-w-0 flex-1 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: labelClassName ?? "min-w-0 flex-1",
			children: label
		}), trailing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: trailingClassName ?? "shrink-0",
			children: trailing
		})]
	});
}
function AgentToolDisclosure({ className, defaultActiveKey = [], isStreaming = false, item, onOpenDetails, stateId, showInlineDetails = true }) {
	const contentId = (0, import_react.useId)();
	const itemKey = String(item.key);
	const canExpand = showInlineDetails && item.children !== void 0 && item.children !== null;
	const isInteractive = canExpand || !!onOpenDetails;
	const [isExpanded, setIsExpanded] = useMessageDisclosureState(stateId ? `agent-tool:${stateId}` : void 0, defaultActiveKey.includes(itemKey));
	const { anchorRef, withScrollAnchor } = useScrollAnchor();
	const toggleExpanded = () => {
		if (!canExpand) return;
		withScrollAnchor(() => setIsExpanded((current) => !current), { enterReadingMode: !isExpanded });
	};
	const openOrToggle = () => {
		if (onOpenDetails) {
			onOpenDetails();
			return;
		}
		toggleExpanded();
	};
	const handleHeaderKeyDown = (event) => {
		if (!isInteractive) return;
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		openOrToggle();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamingContext, {
		value: isStreaming,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: anchorRef,
			className: cn$1("w-full overflow-hidden rounded-[7px] border border-border bg-background", className, item.classNames?.item, item.className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: isInteractive ? "button" : void 0,
				tabIndex: isInteractive ? 0 : void 0,
				"aria-expanded": canExpand ? isExpanded : void 0,
				"aria-controls": canExpand ? contentId : void 0,
				className: cn$1("flex w-fit items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left font-semibold text-foreground text-sm leading-4 outline-none hover:no-underline focus-visible:bg-accent/50 disabled:pointer-events-none disabled:opacity-50", item.classNames?.header),
				onClick: isInteractive ? openOrToggle : void 0,
				onKeyDown: handleHeaderKeyDown,
				children: item.label
			}), canExpand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: contentId,
				"data-testid": `collapse-content-${item.key}`,
				hidden: !isExpanded,
				className: cn$1("mt-1.5 max-h-96 overflow-auto rounded-xl bg-muted px-4 py-3 text-[13px] text-muted-foreground leading-5", item.classNames?.body),
				children: item.children
			})]
		})
	});
}
const getEditorIcon = (app, className = "size-4") => {
	switch (app.id) {
		case "vscode": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VsCodeIcon, { className });
		case "cursor": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CursorIcon, { className });
		case "zed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZedIcon, { className });
		case "wt": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowsTerminalIcon, { className });
	}
};
const ClickableFilePath = (0, import_react.memo)(function ClickableFilePath$1({ path, displayName, interactive = true }) {
	const { t } = useTranslation();
	const displayPath = (0, import_react.useMemo)(() => normalizeInlineFilePath(path), [path]);
	const targetPath = (0, import_react.useMemo)(() => resolveInlineFilePath(path), [path]);
	const iconName = (0, import_react.useMemo)(() => getFileIconName(displayPath), [displayPath]);
	const ui = useOptionalMessageListUi();
	const actions = useOptionalMessageListActions();
	const openArtifactFile = interactive ? actions?.openArtifactFile : void 0;
	const openPath = interactive ? actions?.openPath : void 0;
	const showInFolder = interactive ? actions?.showInFolder : void 0;
	const openInExternalApp = interactive ? actions?.openInExternalApp : void 0;
	const notifyError = actions?.notifyError;
	const canOpen = Boolean(openArtifactFile || openPath);
	const availableEditors = ui?.externalCodeEditors ?? [];
	const hasEditorActions = Boolean(openInExternalApp && availableEditors.length > 0);
	const hasMoreActions = Boolean(showInFolder) || hasEditorActions;
	const fileManagerName = (0, import_react.useMemo)(() => {
		if (isMac) return t("agent.session.file_manager.finder");
		if (isWin) return t("agent.session.file_manager.file_explorer");
		return t("agent.session.file_manager.files");
	}, [t]);
	const renderFileManagerIcon = () => isMac ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinderIcon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { size: 16 });
	const openInEditor = (0, import_react.useCallback)((app) => {
		Promise.resolve(openInExternalApp?.(app, targetPath)).catch(() => {
			notifyError?.(t("chat.input.tools.open_file_error", { path: targetPath }));
		});
	}, [
		notifyError,
		openInExternalApp,
		t,
		targetPath
	]);
	const handleOpen = (0, import_react.useCallback)(async (e) => {
		if (!canOpen) return;
		e.stopPropagation();
		try {
			if (openArtifactFile) await openArtifactFile(targetPath);
			else await openPath?.(targetPath);
		} catch {
			notifyError?.(t("chat.input.tools.open_file_error", { path: targetPath }));
		}
	}, [
		canOpen,
		notifyError,
		openArtifactFile,
		openPath,
		t,
		targetPath
	]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleOpen(e);
		}
	}, [handleOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.clickable-file-path",
		className: "inline-flex items-center gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: displayPath,
			delay: 500,
			classNames: { placeholder: "flex flex-row items-center" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				role: canOpen ? "link" : void 0,
				tabIndex: canOpen ? 0 : void 0,
				onClick: canOpen ? handleOpen : void 0,
				onKeyDown: canOpen ? handleKeyDown : void 0,
				className: `inline-flex items-center gap-1 break-all ${canOpen ? "cursor-pointer text-link hover:underline" : "cursor-default text-muted-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					icon: `material-icon-theme:${iconName}`,
					className: "shrink-0",
					style: { fontSize: "1.1em" }
				}), displayName ?? displayPath]
			})
		}), hasMoreActions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => e.stopPropagation(),
				className: "inline-flex cursor-pointer items-center rounded px-0.5 text-muted-foreground hover:bg-accent hover:text-foreground",
				"aria-label": t("common.more"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t("common.more"),
					delay: 500,
					classNames: { placeholder: "flex flex-row items-center" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 14 })
				})
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			className: "w-56 p-1",
			align: "start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, { children: [showInFolder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				label: fileManagerName,
				icon: renderFileManagerIcon(),
				onClick: (e) => {
					e.stopPropagation();
					Promise.resolve(showInFolder(targetPath)).catch(() => {
						notifyError?.(t("chat.input.tools.file_not_found", { path: targetPath }));
					});
				}
			}), openInExternalApp && availableEditors.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				label: app.name,
				icon: getEditorIcon(app),
				onClick: (e) => {
					e.stopPropagation();
					openInEditor(app);
				}
			}, app.id))] })
		})] })]
	});
});
function readSourcePath(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) return void 0;
	const value = input.path;
	return typeof value === "string" && value.trim() ? value : void 0;
}
function parseReceipt(output) {
	const result = CallToolResultSchema.safeParse(output);
	if (!result.success || result.data.isError) return null;
	const text = result.data.content.find((item) => item.type === "text")?.text;
	if (typeof text !== "string") return null;
	try {
		const parsed = JSON.parse(text);
		if (typeof parsed.path !== "string" || typeof parsed.chars !== "number") return null;
		return {
			path: parsed.path,
			chars: parsed.chars
		};
	} catch {
		return null;
	}
}
function ToMarkdownTool({ input, output }) {
	const { t } = useTranslation();
	const sourcePath = readSourcePath(input);
	const receipt = parseReceipt(output);
	return {
		key: TO_MARKDOWN_RUNTIME_TOOL_NAME,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: TO_MARKDOWN_RUNTIME_TOOL_NAME,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: sourcePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, {
					path: sourcePath,
					displayName: getFilePreviewFileName(sourcePath)
				}) : void 0,
				width: "120px"
			}),
			stats: receipt ? t("message.tools.units.char", { count: receipt.chars }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.to-markdown-tool",
			className: "flex min-w-0 items-center gap-1.5 py-1 text-[13px] text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0",
				children: t("message.tools.labels.toMarkdownOutput")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, { path: receipt.path })]
		}) : null
	};
}
function formatDuration(ms) {
	const totalSeconds = Math.round(ms / 1e3);
	if (totalSeconds < 60) return `${totalSeconds}s`;
	return `${Math.floor(totalSeconds / 60)}m${totalSeconds % 60}s`;
}
function formatTokens(tokens) {
	return tokens >= 1e3 ? `${(tokens / 1e3).toFixed(1)}k` : String(tokens);
}
function AgentTool({ input, output }) {
	const { t } = useTranslation();
	const isBackground = isBackgroundAgentOutput(output);
	const completed = output && !Array.isArray(output) && output.status === "completed" ? output : void 0;
	const stats = [];
	if (completed) {
		stats.push(formatTokens(completed.totalTokens));
		stats.push(t("message.tools.units.item", { count: completed.totalToolUseCount }));
		stats.push(formatDuration(completed.totalDurationMs));
	}
	return {
		key: AgentToolsType.Agent,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Agent,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.description,
				width: "150px"
			}),
			stats: isBackground ? t("message.tools.agent_background") : stats.length > 0 ? stats.join(" · ") : void 0,
			variant: "collapse-label",
			showStatus: false
		})
	};
}
var MAX_OUTPUT_LENGTH = 5e4;
var isTextOutputItem = (value) => {
	if (!value || typeof value !== "object") return false;
	const item = value;
	return item.type === "text" && typeof item.text === "string";
};
var getTextItems = (value) => {
	if (!Array.isArray(value)) return [];
	return value.filter(isTextOutputItem);
};
var toOutputText = (output) => {
	if (output === void 0 || output === null || output === "") return "";
	if (typeof output === "string") return output;
	const textItems = typeof output === "object" && output !== null && "content" in output ? getTextItems(output.content) : getTextItems(output);
	if (textItems.length > 0) return textItems.map((item) => item.text).join("\n\n");
	try {
		return JSON.stringify(output, null, 2) ?? "";
	} catch {
		return String(output);
	}
};
function countLines(output) {
	const text = toOutputText(output);
	if (!text) return 0;
	return text.split("\n").filter((line) => line.trim()).length;
}
function truncateOutput(output, maxLength = MAX_OUTPUT_LENGTH) {
	const text = toOutputText(output);
	if (!text) return {
		data: "",
		isTruncated: false,
		originalLength: 0
	};
	const originalLength = text.length;
	if (text.length <= maxLength) return {
		data: text,
		isTruncated: false,
		originalLength
	};
	const truncated = text.slice(0, maxLength);
	const lastNewline = truncated.lastIndexOf("\n");
	return {
		data: lastNewline > maxLength * .8 ? truncated.slice(0, lastNewline) : truncated,
		isTruncated: true,
		originalLength
	};
}
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ANSI_COLORS = [[
		{
			color: "0, 0, 0",
			"class": "ansi-black"
		},
		{
			color: "187, 0, 0",
			"class": "ansi-red"
		},
		{
			color: "0, 187, 0",
			"class": "ansi-green"
		},
		{
			color: "187, 187, 0",
			"class": "ansi-yellow"
		},
		{
			color: "0, 0, 187",
			"class": "ansi-blue"
		},
		{
			color: "187, 0, 187",
			"class": "ansi-magenta"
		},
		{
			color: "0, 187, 187",
			"class": "ansi-cyan"
		},
		{
			color: "255,255,255",
			"class": "ansi-white"
		}
	], [
		{
			color: "85, 85, 85",
			"class": "ansi-bright-black"
		},
		{
			color: "255, 85, 85",
			"class": "ansi-bright-red"
		},
		{
			color: "0, 255, 0",
			"class": "ansi-bright-green"
		},
		{
			color: "255, 255, 85",
			"class": "ansi-bright-yellow"
		},
		{
			color: "85, 85, 255",
			"class": "ansi-bright-blue"
		},
		{
			color: "255, 85, 255",
			"class": "ansi-bright-magenta"
		},
		{
			color: "85, 255, 255",
			"class": "ansi-bright-cyan"
		},
		{
			color: "255, 255, 255",
			"class": "ansi-bright-white"
		}
	]];
	var linkRegex = /(https?:\/\/(?:[A-Za-z0-9#;/?:@=+$',_.!~*()[\]-]|&amp;|%[A-Fa-f0-9]{2})+)/gm;
	module.exports = class Anser {
		static escapeForHtml(txt) {
			return new Anser().escapeForHtml(txt);
		}
		static linkify(txt) {
			return new Anser().linkify(txt);
		}
		static ansiToHtml(txt, options) {
			return new Anser().ansiToHtml(txt, options);
		}
		static ansiToJson(txt, options) {
			return new Anser().ansiToJson(txt, options);
		}
		static ansiToText(txt) {
			return new Anser().ansiToText(txt);
		}
		constructor() {
			this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null;
			this.bright = 0;
			this.decorations = [];
		}
		setupPalette() {
			this.PALETTE_COLORS = [];
			for (let i = 0; i < 2; ++i) for (let j = 0; j < 8; ++j) this.PALETTE_COLORS.push(ANSI_COLORS[i][j].color);
			let levels = [
				0,
				95,
				135,
				175,
				215,
				255
			];
			let format = (r, g, b) => levels[r] + ", " + levels[g] + ", " + levels[b];
			for (let r = 0; r < 6; ++r) for (let g = 0; g < 6; ++g) for (let b = 0; b < 6; ++b) this.PALETTE_COLORS.push(format(r, g, b));
			let level = 8;
			for (let i = 0; i < 24; ++i, level += 10) this.PALETTE_COLORS.push(level + ", " + level + ", " + level);
		}
		escapeForHtml(txt) {
			return txt.replace(/[&<>\"]/gm, (str) => str == "&" ? "&amp;" : str == "\"" ? "&quot;" : str == "<" ? "&lt;" : str == ">" ? "&gt;" : "");
		}
		linkify(txt) {
			return txt.replace(linkRegex, (str) => `<a href="${str}">${str}</a>`);
		}
		ansiToHtml(txt, options) {
			return this.process(txt, options, true);
		}
		ansiToJson(txt, options) {
			options = options || {};
			options.json = true;
			options.clearLine = false;
			return this.process(txt, options, true);
		}
		ansiToText(txt) {
			return this.process(txt, {}, false);
		}
		process(txt, options, markup) {
			let self = this;
			let raw_text_chunks = txt.split(/\033\[/);
			let first_chunk = raw_text_chunks.shift();
			if (options === void 0 || options === null) options = {};
			options.clearLine = /\r/.test(txt);
			let color_chunks = raw_text_chunks.map((chunk) => this.processChunk(chunk, options, markup));
			if (options && options.json) {
				let first = self.processChunkJson("");
				first.content = first_chunk;
				first.clearLine = options.clearLine;
				color_chunks.unshift(first);
				if (options.remove_empty) color_chunks = color_chunks.filter((c) => !c.isEmpty());
				return color_chunks;
			} else color_chunks.unshift(first_chunk);
			return color_chunks.join("");
		}
		processChunkJson(text, options, markup) {
			options = typeof options == "undefined" ? {} : options;
			let use_classes = options.use_classes = typeof options.use_classes != "undefined" && options.use_classes;
			let key = options.key = use_classes ? "class" : "color";
			let result = {
				content: text,
				fg: null,
				bg: null,
				fg_truecolor: null,
				bg_truecolor: null,
				isInverted: false,
				clearLine: options.clearLine,
				decoration: null,
				decorations: [],
				was_processed: false,
				isEmpty: () => !result.content
			};
			let matches = text.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);
			if (!matches) return result;
			result.content = matches[4];
			let nums = matches[2].split(";");
			if (matches[1] !== "" || matches[3] !== "m") return result;
			if (!markup) return result;
			let self = this;
			while (nums.length > 0) {
				let num_str = nums.shift();
				let num = parseInt(num_str);
				if (isNaN(num) || num === 0) {
					self.fg = self.bg = null;
					self.decorations = [];
				} else if (num === 1) self.decorations.push("bold");
				else if (num === 2) self.decorations.push("dim");
				else if (num === 3) self.decorations.push("italic");
				else if (num === 4) self.decorations.push("underline");
				else if (num === 5) self.decorations.push("blink");
				else if (num === 7) self.decorations.push("reverse");
				else if (num === 8) self.decorations.push("hidden");
				else if (num === 9) self.decorations.push("strikethrough");
				else if (num === 21) self.removeDecoration("bold");
				else if (num === 22) {
					self.removeDecoration("bold");
					self.removeDecoration("dim");
				} else if (num === 23) self.removeDecoration("italic");
				else if (num === 24) self.removeDecoration("underline");
				else if (num === 25) self.removeDecoration("blink");
				else if (num === 27) self.removeDecoration("reverse");
				else if (num === 28) self.removeDecoration("hidden");
				else if (num === 29) self.removeDecoration("strikethrough");
				else if (num === 39) self.fg = null;
				else if (num === 49) self.bg = null;
				else if (num >= 30 && num < 38) self.fg = ANSI_COLORS[0][num % 10][key];
				else if (num >= 90 && num < 98) self.fg = ANSI_COLORS[1][num % 10][key];
				else if (num >= 40 && num < 48) self.bg = ANSI_COLORS[0][num % 10][key];
				else if (num >= 100 && num < 108) self.bg = ANSI_COLORS[1][num % 10][key];
				else if (num === 38 || num === 48) {
					let is_foreground = num === 38;
					if (nums.length >= 1) {
						let mode = nums.shift();
						if (mode === "5" && nums.length >= 1) {
							let palette_index = parseInt(nums.shift());
							if (palette_index >= 0 && palette_index <= 255) if (!use_classes) {
								if (!this.PALETTE_COLORS) self.setupPalette();
								if (is_foreground) self.fg = this.PALETTE_COLORS[palette_index];
								else self.bg = this.PALETTE_COLORS[palette_index];
							} else {
								let klass = palette_index >= 16 ? "ansi-palette-" + palette_index : ANSI_COLORS[palette_index > 7 ? 1 : 0][palette_index % 8]["class"];
								if (is_foreground) self.fg = klass;
								else self.bg = klass;
							}
						} else if (mode === "2" && nums.length >= 3) {
							let r = parseInt(nums.shift());
							let g = parseInt(nums.shift());
							let b = parseInt(nums.shift());
							if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
								let color = r + ", " + g + ", " + b;
								if (!use_classes) if (is_foreground) self.fg = color;
								else self.bg = color;
								else if (is_foreground) {
									self.fg = "ansi-truecolor";
									self.fg_truecolor = color;
								} else {
									self.bg = "ansi-truecolor";
									self.bg_truecolor = color;
								}
							}
						}
					}
				}
			}
			if (self.fg === null && self.bg === null && self.decorations.length === 0) return result;
			else {
				result.fg = self.fg;
				result.bg = self.bg;
				result.fg_truecolor = self.fg_truecolor;
				result.bg_truecolor = self.bg_truecolor;
				result.decorations = self.decorations;
				result.decoration = self.decorations.slice(-1).pop() || null;
				result.was_processed = true;
				return result;
			}
		}
		processChunk(text, options, markup) {
			options = options || {};
			let jsonChunk = this.processChunkJson(text, options, markup);
			let use_classes = options.use_classes;
			jsonChunk.decorations = jsonChunk.decorations.filter((decoration) => {
				if (decoration === "reverse") {
					if (!jsonChunk.fg) jsonChunk.fg = ANSI_COLORS[0][7][use_classes ? "class" : "color"];
					if (!jsonChunk.bg) jsonChunk.bg = ANSI_COLORS[0][0][use_classes ? "class" : "color"];
					let tmpFg = jsonChunk.fg;
					jsonChunk.fg = jsonChunk.bg;
					jsonChunk.bg = tmpFg;
					let tmpFgTrue = jsonChunk.fg_truecolor;
					jsonChunk.fg_truecolor = jsonChunk.bg_truecolor;
					jsonChunk.bg_truecolor = tmpFgTrue;
					jsonChunk.isInverted = true;
					return false;
				}
				return true;
			});
			if (options.json) return jsonChunk;
			if (jsonChunk.isEmpty()) return "";
			if (!jsonChunk.was_processed) return jsonChunk.content;
			let colors = [];
			let decorations = [];
			let textDecorations = [];
			let data = {};
			let render_data = (data$1) => {
				let fragments = [];
				let key;
				for (key in data$1) if (data$1.hasOwnProperty(key)) fragments.push("data-" + key + "=\"" + this.escapeForHtml(data$1[key]) + "\"");
				return fragments.length > 0 ? " " + fragments.join(" ") : "";
			};
			if (jsonChunk.isInverted) data["ansi-is-inverted"] = "true";
			if (jsonChunk.fg) if (use_classes) {
				colors.push(jsonChunk.fg + "-fg");
				if (jsonChunk.fg_truecolor !== null) {
					data["ansi-truecolor-fg"] = jsonChunk.fg_truecolor;
					jsonChunk.fg_truecolor = null;
				}
			} else colors.push("color:rgb(" + jsonChunk.fg + ")");
			if (jsonChunk.bg) if (use_classes) {
				colors.push(jsonChunk.bg + "-bg");
				if (jsonChunk.bg_truecolor !== null) {
					data["ansi-truecolor-bg"] = jsonChunk.bg_truecolor;
					jsonChunk.bg_truecolor = null;
				}
			} else colors.push("background-color:rgb(" + jsonChunk.bg + ")");
			jsonChunk.decorations.forEach((decoration) => {
				if (use_classes) {
					decorations.push("ansi-" + decoration);
					return;
				}
				if (decoration === "bold") decorations.push("font-weight:bold");
				else if (decoration === "dim") decorations.push("opacity:0.5");
				else if (decoration === "italic") decorations.push("font-style:italic");
				else if (decoration === "hidden") decorations.push("visibility:hidden");
				else if (decoration === "strikethrough") textDecorations.push("line-through");
				else textDecorations.push(decoration);
			});
			if (textDecorations.length) decorations.push("text-decoration:" + textDecorations.join(" "));
			if (use_classes) return "<span class=\"" + colors.concat(decorations).join(" ") + "\"" + render_data(data) + ">" + jsonChunk.content + "</span>";
			else return "<span style=\"" + colors.concat(decorations).join(";") + "\"" + render_data(data) + ">" + jsonChunk.content + "</span>";
		}
		removeDecoration(decoration) {
			const index = this.decorations.indexOf(decoration);
			if (index >= 0) this.decorations.splice(index, 1);
		}
	};
}));
var require_escape_carriage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function escapeCarriageReturn(txt) {
		if (!txt) return "";
		if (!/\r/.test(txt)) return txt;
		txt = txt.replace(/\r+\n/gm, "\n");
		while (/\r./.test(txt)) txt = txt.replace(/^([^\r\n]*)\r+([^\r\n]+)/gm, function(_, base, insert) {
			return insert + base.slice(insert.length);
		});
		return txt;
	}
	function findLongestString(arr) {
		var longest = 0;
		for (var i = 0; i < arr.length; i++) if (arr[longest].length <= arr[i].length) longest = i;
		return longest;
	}
	function escapeSingleLineSafe(txt) {
		if (!/\r/.test(txt)) return txt;
		var arr = txt.split("\r");
		var res = [];
		while (arr.length > 0) {
			var longest = findLongestString(arr);
			res.push(arr[longest]);
			arr = arr.slice(longest + 1);
		}
		return res.join("\r");
	}
	function escapeCarriageReturnSafe(txt) {
		if (!txt) return "";
		if (!/\r/.test(txt)) return txt;
		if (!/\n/.test(txt)) return escapeSingleLineSafe(txt);
		txt = txt.replace(/\r+\n/gm, "\n");
		var idx = txt.lastIndexOf("\n");
		return escapeCarriageReturn(txt.slice(0, idx)) + "\n" + escapeSingleLineSafe(txt.slice(idx + 1));
	}
	module.exports = escapeCarriageReturn;
	module.exports.escapeCarriageReturn = escapeCarriageReturn;
	module.exports.escapeCarriageReturnSafe = escapeCarriageReturnSafe;
}));
var require_regex$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
}));
var require_regex$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[\0-\x1F\x7F-\x9F]/;
}));
var require_regex$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
}));
var require_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
}));
var require_re = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(opts) {
		var re = {};
		re.src_Any = require_regex$3().source;
		re.src_Cc = require_regex$2().source;
		re.src_Z = require_regex$1().source;
		re.src_P = require_regex().source;
		re.src_ZPCc = [
			re.src_Z,
			re.src_P,
			re.src_Cc
		].join("|");
		re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
		var text_separators = "[><｜]";
		re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
		re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
		re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
		re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
		re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
		re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + "|[()[\\]{}.,\"'?!\\-;]).|\\[(?:(?!" + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + "|[}]).)*\\}|\\\"(?:(?!" + re.src_ZCc + "|[\"]).)+\\\"|\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-]).|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]).|" + (opts && opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + re.src_ZCc + ").|;(?!" + re.src_ZCc + ").|\\!+(?!" + re.src_ZCc + "|[!]).|\\?(?!" + re.src_ZCc + "|[?]).)+|\\/)?";
		re.src_email_name = "[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\\"\\.a-zA-Z0-9_]*";
		re.src_xn = "xn--[a-z0-9\\-]{1,59}";
		re.src_domain_root = "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
		re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
		re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
		re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
		re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
		re.src_host_strict = re.src_host + re.src_host_terminator;
		re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
		re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
		re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
		re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
		re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
		re.tpl_email_fuzzy = "(^|" + text_separators + "|\"|\\(|" + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
		re.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
		re.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
		return re;
	};
}));
var require_linkify_it = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function assign(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			if (!source) return;
			Object.keys(source).forEach(function(key) {
				obj[key] = source[key];
			});
		});
		return obj;
	}
	function _class(obj) {
		return Object.prototype.toString.call(obj);
	}
	function isString(obj) {
		return _class(obj) === "[object String]";
	}
	function isObject$1(obj) {
		return _class(obj) === "[object Object]";
	}
	function isRegExp(obj) {
		return _class(obj) === "[object RegExp]";
	}
	function isFunction(obj) {
		return _class(obj) === "[object Function]";
	}
	function escapeRE(str) {
		return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
	}
	var defaultOptions = {
		fuzzyLink: true,
		fuzzyEmail: true,
		fuzzyIP: false
	};
	function isOptionsObj(obj) {
		return Object.keys(obj || {}).reduce(function(acc, k) {
			return acc || defaultOptions.hasOwnProperty(k);
		}, false);
	}
	var defaultSchemas = {
		"http:": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.http) self.re.http = new RegExp("^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, "i");
			if (self.re.http.test(tail)) return tail.match(self.re.http)[0].length;
			return 0;
		} },
		"https:": "http:",
		"ftp:": "http:",
		"//": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.no_http) self.re.no_http = new RegExp("^" + self.re.src_auth + "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path, "i");
			if (self.re.no_http.test(tail)) {
				if (pos >= 3 && text[pos - 3] === ":") return 0;
				if (pos >= 3 && text[pos - 3] === "/") return 0;
				return tail.match(self.re.no_http)[0].length;
			}
			return 0;
		} },
		"mailto:": { validate: function(text, pos, self) {
			var tail = text.slice(pos);
			if (!self.re.mailto) self.re.mailto = new RegExp("^" + self.re.src_email_name + "@" + self.re.src_host_strict, "i");
			if (self.re.mailto.test(tail)) return tail.match(self.re.mailto)[0].length;
			return 0;
		} }
	};
	var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
	var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
	function resetScanCache(self) {
		self.__index__ = -1;
		self.__text_cache__ = "";
	}
	function createValidator(re) {
		return function(text, pos) {
			var tail = text.slice(pos);
			if (re.test(tail)) return tail.match(re)[0].length;
			return 0;
		};
	}
	function createNormalizer() {
		return function(match, self) {
			self.normalize(match);
		};
	}
	function compile(self) {
		var re = self.re = require_re()(self.__opts__);
		var tlds = self.__tlds__.slice();
		self.onCompile();
		if (!self.__tlds_replaced__) tlds.push(tlds_2ch_src_re);
		tlds.push(re.src_xn);
		re.src_tlds = tlds.join("|");
		function untpl(tpl) {
			return tpl.replace("%TLDS%", re.src_tlds);
		}
		re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
		re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
		re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
		re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
		var aliases = [];
		self.__compiled__ = {};
		function schemaError(name, val) {
			throw new Error("(LinkifyIt) Invalid schema \"" + name + "\": " + val);
		}
		Object.keys(self.__schemas__).forEach(function(name) {
			var val = self.__schemas__[name];
			if (val === null) return;
			var compiled = {
				validate: null,
				link: null
			};
			self.__compiled__[name] = compiled;
			if (isObject$1(val)) {
				if (isRegExp(val.validate)) compiled.validate = createValidator(val.validate);
				else if (isFunction(val.validate)) compiled.validate = val.validate;
				else schemaError(name, val);
				if (isFunction(val.normalize)) compiled.normalize = val.normalize;
				else if (!val.normalize) compiled.normalize = createNormalizer();
				else schemaError(name, val);
				return;
			}
			if (isString(val)) {
				aliases.push(name);
				return;
			}
			schemaError(name, val);
		});
		aliases.forEach(function(alias) {
			if (!self.__compiled__[self.__schemas__[alias]]) return;
			self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
			self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
		});
		self.__compiled__[""] = {
			validate: null,
			normalize: createNormalizer()
		};
		var slist = Object.keys(self.__compiled__).filter(function(name) {
			return name.length > 0 && self.__compiled__[name];
		}).map(escapeRE).join("|");
		self.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "i");
		self.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
		self.re.pretest = RegExp("(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@", "i");
		resetScanCache(self);
	}
	function Match(self, shift) {
		var start = self.__index__, end = self.__last_index__, text = self.__text_cache__.slice(start, end);
		this.schema = self.__schema__.toLowerCase();
		this.index = start + shift;
		this.lastIndex = end + shift;
		this.raw = text;
		this.text = text;
		this.url = text;
	}
	function createMatch(self, shift) {
		var match = new Match(self, shift);
		self.__compiled__[match.schema].normalize(match, self);
		return match;
	}
	function LinkifyIt(schemas, options) {
		if (!(this instanceof LinkifyIt)) return new LinkifyIt(schemas, options);
		if (!options) {
			if (isOptionsObj(schemas)) {
				options = schemas;
				schemas = {};
			}
		}
		this.__opts__ = assign({}, defaultOptions, options);
		this.__index__ = -1;
		this.__last_index__ = -1;
		this.__schema__ = "";
		this.__text_cache__ = "";
		this.__schemas__ = assign({}, defaultSchemas, schemas);
		this.__compiled__ = {};
		this.__tlds__ = tlds_default;
		this.__tlds_replaced__ = false;
		this.re = {};
		compile(this);
	}
	LinkifyIt.prototype.add = function add(schema, definition) {
		this.__schemas__[schema] = definition;
		compile(this);
		return this;
	};
	LinkifyIt.prototype.set = function set(options) {
		this.__opts__ = assign(this.__opts__, options);
		return this;
	};
	LinkifyIt.prototype.test = function test(text) {
		this.__text_cache__ = text;
		this.__index__ = -1;
		if (!text.length) return false;
		var m, ml, me, len, shift, next, re, tld_pos, at_pos;
		if (this.re.schema_test.test(text)) {
			re = this.re.schema_search;
			re.lastIndex = 0;
			while ((m = re.exec(text)) !== null) {
				len = this.testSchemaAt(text, m[2], re.lastIndex);
				if (len) {
					this.__schema__ = m[2];
					this.__index__ = m.index + m[1].length;
					this.__last_index__ = m.index + m[0].length + len;
					break;
				}
			}
		}
		if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
			tld_pos = text.search(this.re.host_fuzzy_test);
			if (tld_pos >= 0) {
				if (this.__index__ < 0 || tld_pos < this.__index__) {
					if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
						shift = ml.index + ml[1].length;
						if (this.__index__ < 0 || shift < this.__index__) {
							this.__schema__ = "";
							this.__index__ = shift;
							this.__last_index__ = ml.index + ml[0].length;
						}
					}
				}
			}
		}
		if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
			at_pos = text.indexOf("@");
			if (at_pos >= 0) {
				if ((me = text.match(this.re.email_fuzzy)) !== null) {
					shift = me.index + me[1].length;
					next = me.index + me[0].length;
					if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
						this.__schema__ = "mailto:";
						this.__index__ = shift;
						this.__last_index__ = next;
					}
				}
			}
		}
		return this.__index__ >= 0;
	};
	LinkifyIt.prototype.pretest = function pretest(text) {
		return this.re.pretest.test(text);
	};
	LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
		if (!this.__compiled__[schema.toLowerCase()]) return 0;
		return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};
	LinkifyIt.prototype.match = function match(text) {
		var shift = 0, result = [];
		if (this.__index__ >= 0 && this.__text_cache__ === text) {
			result.push(createMatch(this, shift));
			shift = this.__last_index__;
		}
		var tail = shift ? text.slice(shift) : text;
		while (this.test(tail)) {
			result.push(createMatch(this, shift));
			tail = tail.slice(this.__last_index__);
			shift += this.__last_index__;
		}
		if (result.length) return result;
		return null;
	};
	LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
		list = Array.isArray(list) ? list : [list];
		if (!keepOld) {
			this.__tlds__ = list.slice();
			this.__tlds_replaced__ = true;
			compile(this);
			return this;
		}
		this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
			return el !== arr[idx - 1];
		}).reverse();
		compile(this);
		return this;
	};
	LinkifyIt.prototype.normalize = function normalize(match) {
		if (!match.schema) match.url = "http://" + match.url;
		if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) match.url = "mailto:" + match.url;
	};
	LinkifyIt.prototype.onCompile = function onCompile() {};
	module.exports = LinkifyIt;
}));
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o$1) {
				var ar = [];
				for (var k in o$1) if (Object.prototype.hasOwnProperty.call(o$1, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Ansi$1;
	var anser_1 = __importDefault(require_lib$1());
	var escape_carriage_1 = require_escape_carriage();
	var linkify_it_1 = __importDefault(require_linkify_it());
	var React$1 = __importStar(require_react());
	function ansiToJSON(input, use_classes = false) {
		input = (0, escape_carriage_1.escapeCarriageReturn)(fixBackspace(input));
		return anser_1.default.ansiToJson(input, {
			json: true,
			remove_empty: true,
			use_classes
		});
	}
	function createClass(bundle) {
		let classNames = "";
		if (bundle.bg) classNames += `${bundle.bg}-bg `;
		if (bundle.fg) classNames += `${bundle.fg}-fg `;
		if (bundle.decoration) classNames += `ansi-${bundle.decoration} `;
		if (classNames === "") return null;
		classNames = classNames.substring(0, classNames.length - 1);
		return classNames;
	}
	function createStyle(bundle) {
		const style = {};
		if (bundle.bg) style.backgroundColor = `rgb(${bundle.bg})`;
		if (bundle.fg) style.color = `rgb(${bundle.fg})`;
		switch (bundle.decoration) {
			case "bold":
				style.fontWeight = "bold";
				break;
			case "dim":
				style.opacity = "0.5";
				break;
			case "italic":
				style.fontStyle = "italic";
				break;
			case "hidden":
				style.visibility = "hidden";
				break;
			case "strikethrough":
				style.textDecoration = "line-through";
				break;
			case "underline":
				style.textDecoration = "underline";
				break;
			case "blink":
				style.textDecoration = "blink";
				break;
			default: break;
		}
		return style;
	}
	function convertBundleIntoReact(linkify, useClasses, bundle, key) {
		const style = useClasses ? null : createStyle(bundle);
		const className = useClasses ? createClass(bundle) : null;
		if (!linkify) return React$1.createElement("span", {
			style,
			key,
			className
		}, bundle.content);
		if (linkify === "fuzzy") return linkWithLinkify(bundle, key, style, className);
		return linkWithClassicMode(bundle, key, style, className);
	}
	function linkWithClassicMode(bundle, key, style, className) {
		const content = [];
		const linkRegex$1 = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
		let index = 0;
		let match;
		while ((match = linkRegex$1.exec(bundle.content)) !== null) {
			const [, pre, url] = match;
			const startIndex = match.index + pre.length;
			if (startIndex > index) content.push(bundle.content.substring(index, startIndex));
			const href = url.startsWith("www.") ? `http://${url}` : url;
			content.push(React$1.createElement("a", {
				key: index,
				href,
				target: "_blank"
			}, `${url}`));
			index = linkRegex$1.lastIndex;
		}
		if (index < bundle.content.length) content.push(bundle.content.substring(index));
		return React$1.createElement("span", {
			style,
			key,
			className
		}, content);
	}
	function linkWithLinkify(bundle, key, style, className) {
		var _a;
		const linker = (0, linkify_it_1.default)({ fuzzyEmail: false }).tlds(["io"], true);
		if (!linker.pretest(bundle.content)) return React$1.createElement("span", {
			style,
			key,
			className
		}, bundle.content);
		const matches = linker.match(bundle.content);
		if (!matches) return React$1.createElement("span", {
			style,
			key,
			className
		}, bundle.content);
		const content = [bundle.content.substring(0, (_a = matches[0]) === null || _a === void 0 ? void 0 : _a.index)];
		matches.forEach((match, i) => {
			var _a$1;
			content.push(React$1.createElement("a", {
				href: match.url,
				target: "_blank",
				key: i
			}, bundle.content.substring(match.index, match.lastIndex)));
			if (matches[i + 1]) content.push(bundle.content.substring(matches[i].lastIndex, (_a$1 = matches[i + 1]) === null || _a$1 === void 0 ? void 0 : _a$1.index));
		});
		if (matches[matches.length - 1].lastIndex !== bundle.content.length) content.push(bundle.content.substring(matches[matches.length - 1].lastIndex, bundle.content.length));
		return React$1.createElement("span", {
			style,
			key,
			className
		}, content);
	}
	function Ansi$1(props) {
		const { className, useClasses, children, linkify } = props;
		return React$1.createElement("code", { className }, ansiToJSON(children !== null && children !== void 0 ? children : "", useClasses !== null && useClasses !== void 0 ? useClasses : false).map(convertBundleIntoReact.bind(null, linkify !== null && linkify !== void 0 ? linkify : false, useClasses !== null && useClasses !== void 0 ? useClasses : false)));
	}
	function fixBackspace(txt) {
		let tmp = txt;
		do {
			txt = tmp;
			tmp = txt.replace(/[^\n]\x08/gm, "");
		} while (tmp.length < txt.length);
		return txt;
	}
})))());
const TerminalOutput = (0, import_react.memo)(function TerminalOutput$1({ content, commandMode = false, maxHeight = "15rem" }) {
	const { theme } = useTheme();
	const palette = theme !== ThemeMode.light ? shellColorPalettes.dark : shellColorPalettes.light;
	const colorized = (0, import_react.useMemo)(() => colorizeShellOutput(content, commandMode, palette), [
		content,
		commandMode,
		palette
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalContainer, {
		style: { maxHeight },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lib.default, { children: colorized })
	});
});
const TerminalContainer = ({ className, style, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.terminal",
	className: cn("m-0 overflow-y-auto whitespace-pre-wrap break-all rounded-md px-2.5 py-2 font-['Menlo','Monaco','Courier_New',monospace] text-xs leading-normal [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2 **:[[role=link]]:underline **:[[role=link]]:decoration-dotted **:[[role=link]]:underline-offset-2", TERMINAL_SURFACE_CLASS, TERMINAL_LINK_CLASS, className),
	style: {
		maxHeight: "15rem",
		...style
	},
	...mergeUiProps(props, "chat.terminal")
});
var parseBashOutput = (output) => {
	if (!output) return null;
	try {
		const parser = new DOMParser();
		const hasToolError = output.includes("<tool_use_error>");
		const xmlStr = output.includes("<status>") || hasToolError ? `<root>${output}</root>` : output;
		const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
		if (xmlDoc.querySelector("parsererror")) return null;
		const getElementText = (tagName) => {
			return xmlDoc.getElementsByTagName(tagName)[0]?.textContent?.trim();
		};
		return {
			status: getElementText("status"),
			exit_code: getElementText("exit_code") ? parseInt(getElementText("exit_code")) : void 0,
			stdout: getElementText("stdout"),
			stderr: getElementText("stderr"),
			timestamp: getElementText("timestamp"),
			tool_use_error: getElementText("tool_use_error")
		};
	} catch {
		return null;
	}
};
function BashOutputTool({ input, output }) {
	const { t } = useTranslation();
	const parsedOutput = parseBashOutput(output);
	const getStatusConfig = (parsed) => {
		if (!parsed) return null;
		if (parsed.tool_use_error) return {
			color: "neutral",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }),
			text: t("message.tools.status.error")
		};
		const isCompleted = parsed.status === "completed";
		const isSuccess = parsed.exit_code === 0;
		if (isCompleted && isSuccess) return {
			color: "success",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }),
			text: t("message.tools.status.success")
		};
		if (isCompleted) return {
			color: "neutral",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }),
			text: t("message.tools.status.failed")
		};
		return {
			color: "warning",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5" }),
			text: t("message.tools.status.running")
		};
	};
	const statusConfig = getStatusConfig(parsedOutput);
	const truncatedStdout = truncateOutput(parsedOutput?.stdout);
	const truncatedStderr = truncateOutput(parsedOutput?.stderr);
	const truncatedError = truncateOutput(parsedOutput?.tool_use_error);
	const truncatedRawOutput = truncateOutput(output);
	const children = parsedOutput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.bash-output-tool",
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [parsedOutput.exit_code !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: parsedOutput.exit_code === 0 ? "secondary" : "outline",
					children: [
						t("message.tools.sections.exitCode"),
						": ",
						parsedOutput.exit_code
					]
				}), parsedOutput.timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "py-0 font-mono text-xs",
					children: new Date(parsedOutput.timestamp).toLocaleString()
				})]
			}),
			truncatedStdout.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 font-medium text-default-600 text-xs",
					children: [t("message.tools.sections.stdout"), ":"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, { content: truncatedStdout.data }),
				truncatedStdout.isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength: truncatedStdout.originalLength })
			] }),
			truncatedStderr.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 font-medium text-muted-foreground text-xs",
						children: [t("message.tools.sections.stderr"), ":"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, { content: truncatedStderr.data }),
					truncatedStderr.isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength: truncatedStderr.originalLength })
				]
			}),
			truncatedError.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-muted-foreground text-xs",
							children: [t("message.tools.status.error"), ":"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, { content: truncatedError.data }),
					truncatedError.isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength: truncatedError.originalLength })
				]
			})
		]
	}) : truncatedRawOutput.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.bash-output-tool",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, { content: truncatedRawOutput.data }), truncatedRawOutput.isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength: truncatedRawOutput.originalLength })]
	});
	return {
		key: AgentToolsType.BashOutput,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.BashOutput,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "py-0 font-mono text-xs",
					children: input?.bash_id
				}), statusConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: statusConfig.color === "neutral" ? "outline" : "secondary",
					className: "flex flex-row items-center gap-0.5",
					children: [statusConfig.icon, statusConfig.text]
				})]
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children
	};
}
function BashTool({ input, output }) {
	const { t } = useTranslation();
	const command = input?.command;
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.Bash,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Bash,
			args: input,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.bash-tool",
			className: "flex flex-col gap-3",
			children: [command && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 font-medium text-muted-foreground text-xs",
				children: t("message.tools.sections.command")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, {
				content: command,
				commandMode: true,
				maxHeight: "10rem"
			})] }), truncatedOutput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 font-medium text-muted-foreground text-xs",
					children: t("message.tools.sections.output")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalOutput, {
					content: truncatedOutput,
					maxHeight: "15rem"
				}),
				isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: null,
				width: "100%",
				fallback: null
			})]
		})
	};
}
var AgentFileDiffRenderer = (0, import_react.lazy)(() => __vitePreload(() => import("./AgentFileDiffRenderer-r1t8uu2G.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]), import.meta.url));
function AgentFileDiffView({ children, filePath, hunks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.agent-file-diff-view",
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentFileDiffRenderer, {
				filePath,
				hunks
			})
		}), children]
	});
}
function EditToolChildren({ input, output }) {
	const outputText = typeof output === "string" ? output : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentFileDiffView, {
		filePath: input?.file_path,
		hunks: [{
			oldString: input?.old_string,
			newString: input?.new_string
		}],
		children: outputText
	});
}
function EditTool({ input, output }) {
	const filename = input?.file_path?.split("/").pop();
	return {
		key: AgentToolsType.Edit,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Edit,
			args: input,
			params: input?.file_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, {
				path: input.file_path,
				displayName: filename
			}) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditToolChildren, {
			input,
			output
		})
	};
}
function ExitPlanModeTool({ input, output }) {
	const { t } = useTranslation();
	const plan = input?.plan ?? "";
	const outputContent = typeof output === "string" ? output : output?.plan ?? "";
	const { data: truncatedContent, isTruncated, originalLength } = truncateOutput(plan + "\n\n" + outputContent);
	const planCount = plan.split("\n\n").length;
	return {
		key: AgentToolsType.ExitPlanMode,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.ExitPlanMode,
			args: input,
			stats: t("message.tools.units.plan", { count: planCount }),
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.exit-plan-mode-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
				mode: "static",
				children: truncatedContent
			}), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
function GlobTool({ input, output }) {
	const { t } = useTranslation();
	const lineCount = countLines(output);
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.Glob,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Glob,
			args: input,
			stats: output ? t("message.tools.units.file", { count: lineCount }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.glob-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalContainer, { children: truncatedOutput?.split("\n").map((line, i) => line.startsWith("/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, { path: line }) }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: line }, i)) }), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
var FILE_PATH_RE = /^(\/[\w./@+-][^:]*[^:])(:.*)?$/;
function GrepTool({ input, output }) {
	const { t } = useTranslation();
	const resultLines = countLines(output);
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.Grep,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Grep,
			args: input,
			stats: output ? t("message.tools.units.line", { count: resultLines }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.grep-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalContainer, { children: truncatedOutput?.split("\n").map((line, i) => {
				const match = line.match(FILE_PATH_RE);
				if (match) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, { path: match[1] }), match[2] ?? ""] }, i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: line }, i);
			}) }), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
function MultiEditToolChildren({ input }) {
	const edits = Array.isArray(input?.edits) ? input.edits : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentFileDiffView, {
		filePath: input?.file_path,
		hunks: edits.map((edit) => ({
			oldString: edit.old_string,
			newString: edit.new_string
		}))
	});
}
function MultiEditTool({ input }) {
	const filename = input?.file_path?.split("/").pop();
	return {
		key: AgentToolsType.MultiEdit,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.MultiEdit,
			args: input,
			params: input?.file_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, {
				path: input.file_path,
				displayName: filename
			}) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiEditToolChildren, { input })
	};
}
function NotebookEditTool({ input, output }) {
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.NotebookEdit,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.notebook-edit-tool",
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
				toolName: AgentToolsType.NotebookEdit,
				args: input,
				variant: "collapse-label",
				showStatus: false
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				children: input?.notebook_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, { path: input.notebook_path }) : void 0
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.notebook-edit-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
				mode: "static",
				children: truncatedOutput
			}), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
var removeSystemReminderTags = (text) => {
	return text.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "");
};
var stripLineNumbers = (text) => {
	return text.replace(/^ *\d+→/gm, "");
};
var normalizeOutputString = (output) => {
	if (!output) return null;
	const toText = (item) => removeSystemReminderTags(item.text);
	if (Array.isArray(output)) return output.filter((item) => item.type === "text").map(toText).join("");
	if (typeof output === "object" && "file" in output) {
		const file = output.file;
		if (typeof file === "object" && file !== null && "content" in file && typeof file.content === "string") return removeSystemReminderTags(file.content);
	}
	if (typeof output !== "string") return null;
	return removeSystemReminderTags(output);
};
var getOutputStats = (outputString) => {
	if (!outputString) return null;
	return {
		lineCount: outputString.split("\n").length,
		fileSize: new Blob([outputString]).size
	};
};
function ReadTool({ input, output }) {
	const { t } = useTranslation();
	const outputString = normalizeOutputString(output);
	const stats = getOutputStats(outputString);
	const filename = input?.file_path?.split("/").pop();
	const language = getLanguageByFilePath(input?.file_path ?? "");
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(outputString);
	const strippedOutput = truncatedOutput ? stripLineNumbers(truncatedOutput) : null;
	return {
		key: AgentToolsType.Read,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Read,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.file_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, {
					path: input.file_path,
					displayName: filename
				}) : void 0,
				width: "120px"
			}),
			stats: stats ? `${t("message.tools.units.line", { count: stats.lineCount })}, ${formatFileSize(stats.fileSize)}` : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: strippedOutput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.read-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
				value: strippedOutput,
				language,
				expanded: false,
				wrapped: false,
				maxHeight: 240,
				options: { lineNumbers: true }
			}), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
			value: null,
			width: "100%",
			fallback: null
		})
	};
}
function SearchTool({ input, output }) {
	const { t } = useTranslation();
	const resultCount = countLines(output);
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.Search,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Search,
			args: input,
			stats: output ? t("message.tools.units.result", { count: resultCount }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.search-tool",
			children: [typeof input === "string" && input && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringInputTool, {
				input,
				label: t("message.tools.sections.searchQuery")
			}), truncatedOutput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringOutputTool, {
				output: truncatedOutput,
				label: t("message.tools.sections.searchResults"),
				textColor: "text-yellow-600 dark:text-yellow-400"
			}), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })] })]
		})
	};
}
function SkillTool({ input, output }) {
	const { t } = useTranslation();
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.Skill,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Skill,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.skill,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.skill-tool",
			className: "flex flex-col gap-3",
			children: [input?.args && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 font-medium text-muted-foreground text-xs",
				children: t("message.tools.sections.args")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-40 overflow-y-auto rounded-md bg-muted/50 p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "whitespace-pre-wrap break-all font-mono text-xs",
					children: input.args
				})
			})] }), truncatedOutput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 font-medium text-muted-foreground text-xs",
					children: t("message.tools.sections.output")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-60 overflow-y-auto rounded-md bg-muted/30 p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap font-mono text-xs",
						children: truncatedOutput
					})
				}),
				isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: null,
				width: "100%",
				fallback: null
			})]
		})
	};
}
var PRIMARY_PARAM_KEYS = [
	"description",
	"subject",
	"taskId",
	"task_id",
	"name",
	"path",
	"action",
	"server",
	"uri"
];
function getPrimaryParam(value) {
	if (typeof value === "string") return value;
	if (!value || typeof value !== "object" || Array.isArray(value)) return void 0;
	for (const key of PRIMARY_PARAM_KEYS) {
		const fieldValue = value[key];
		if (typeof fieldValue === "string" && fieldValue.length > 0) return fieldValue;
	}
}
function StructuredAgentTool({ toolName, input }) {
	return {
		key: toolName,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName,
			args: input,
			params: getPrimaryParam(input),
			variant: "collapse-label",
			showStatus: false
		})
	};
}
function createStructuredAgentTool(toolName) {
	return ({ input, output }) => StructuredAgentTool({
		toolName,
		input,
		output
	});
}
function isObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isTaskGetOutputObject(output) {
	return isObject(output) && "task" in output;
}
function isTaskListOutputObject(output) {
	return isObject(output) && "tasks" in output;
}
function isTaskStopOutputObject(output) {
	return isObject(output) && "message" in output;
}
function getStatusLabel(status, t) {
	switch (status) {
		case "completed": return t("message.tools.completed");
		case "in_progress": return t("message.tools.invoking");
		case "pending": return t("message.tools.pending", "Pending");
		default: return "";
	}
}
function getStatusClassName(status) {
	switch (status) {
		case "completed": return "border-success-border bg-success-subtle text-success-subtle-foreground";
		case "in_progress": return "border-info-border bg-info-subtle text-info-subtle-foreground";
		default: return "border-border bg-muted text-muted-foreground";
	}
}
function getTaskTargetLabel(taskId, t) {
	return taskId ? t("message.tools.activity.taskId", { id: taskId }) : void 0;
}
function TaskListView({ tasks, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.task-list-view",
		className: "space-y-1.5",
		children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-start gap-2 rounded-md bg-muted/30 p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-foreground",
					children: task.subject
				}), task.owner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 truncate text-muted-foreground text-xs",
					children: task.owner
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `shrink-0 rounded border px-1.5 py-0.5 text-[11px] ${getStatusClassName(task.status)}`,
				children: getStatusLabel(task.status, t)
			})]
		}, task.id))
	});
}
function TaskTextOutput({ text, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.task-text-output",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 font-medium text-muted-foreground text-xs",
			children: t("message.tools.sections.output")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md bg-muted/30 p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
				mode: "static",
				children: text
			})
		})]
	});
}
function TaskCreateTool({ input }) {
	return {
		key: AgentToolsType.TaskCreate,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskCreate,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.description ?? input?.subject,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		})
	};
}
function TaskGetTool({ input, output }) {
	const { t } = useTranslation();
	const task = isTaskGetOutputObject(output) ? output.task : void 0;
	const taskTarget = getTaskTargetLabel(input?.taskId, t);
	return {
		key: AgentToolsType.TaskGet,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskGet,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: taskTarget,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: task ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskListView, {
			tasks: [{
				id: task.id,
				subject: task.subject,
				status: task.status
			}],
			t
		}) : void 0
	};
}
function TaskUpdateTool({ input }) {
	const { t } = useTranslation();
	const taskTarget = getTaskTargetLabel(input?.taskId, t);
	return {
		key: AgentToolsType.TaskUpdate,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskUpdate,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.description ?? input?.subject ?? taskTarget,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		})
	};
}
function TaskListTool({ output }) {
	const { t } = useTranslation();
	const tasks = isTaskListOutputObject(output) ? output.tasks : [];
	return {
		key: AgentToolsType.TaskList,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskList,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: t("message.tools.activity.taskList"),
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskListView, {
			tasks: tasks.map((task) => ({
				id: task.id,
				subject: task.subject,
				status: task.status,
				owner: task.owner
			})),
			t
		}) : void 0
	};
}
function TaskOutputTool({ input, output }) {
	const { t } = useTranslation();
	const { data: truncatedText, isTruncated, originalLength } = truncateOutput(output);
	const taskTarget = getTaskTargetLabel(input?.task_id, t);
	return {
		key: AgentToolsType.TaskOutput,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskOutput,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: taskTarget,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: truncatedText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.task-output-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTextOutput, {
				text: truncatedText,
				t
			}), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		}) : void 0
	};
}
function TaskStopTool({ input, output }) {
	const { t } = useTranslation();
	const outputData = isTaskStopOutputObject(output) ? output : void 0;
	const taskTarget = getTaskTargetLabel(outputData?.task_id ?? input?.task_id ?? input?.shell_id, t);
	return {
		key: AgentToolsType.TaskStop,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.TaskStop,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: taskTarget,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: outputData?.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTextOutput, {
			text: outputData.message,
			t
		}) : void 0
	};
}
const formatArgValue = (value) => {
	if (value === null) return "null";
	if (value === void 0) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	return JSON.stringify(value);
};
function ToolArgsTable({ args, title, isStreaming = false }) {
	if (!args) return null;
	const entries = Array.isArray(args) ? [["arguments", args]] : Object.entries(args);
	if (entries.length === 0 && !isStreaming) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArgsSection, { children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSectionTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsTable, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [entries.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgKey, { children: key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgValue, { children: formatArgValue(value) })] }, key)), isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgKey, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonSpan, { width: "60px" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonSpan, { width: "120px" }) })] })] }) })] });
}
const ArgsSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.args-section",
	className: cn("font-(family-name:--code-font-family) py-2 text-xs leading-normal", className),
	...mergeUiProps(props, "chat.args-section")
});
const ArgsSectionTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.args-section-title",
	className: cn("mb-2 font-semibold text-[11px] text-foreground-tertiary uppercase", className),
	...mergeUiProps(props, "chat.args-section-title")
});
const ArgsTable = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
	"data-ui": "chat.args-table",
	className: cn("w-full border-collapse", className),
	...mergeUiProps(props, "chat.args-table")
});
const ArgKey = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	"data-ui": "chat.arg-key",
	className: cn("w-[1%] whitespace-nowrap py-1 pr-2 pl-0 align-top font-medium text-primary", className),
	...mergeUiProps(props, "chat.arg-key")
});
const ArgValue = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	"data-ui": "chat.arg-value",
	className: cn("whitespace-pre-wrap break-all py-1 text-foreground", className),
	...mergeUiProps(props, "chat.arg-value")
});
const ResponseSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "chat.response-section",
	className: cn("border-border border-t py-2", className),
	...mergeUiProps(props, "chat.response-section")
});
function parseOutput(output) {
	if (!output) return { matches: [] };
	const result = ToolSearchToolOutputSchema.safeParse(output);
	if (!result.success) return {
		matches: [],
		message: JSON.stringify(output, null, 2)
	};
	if (typeof result.data === "string") return {
		matches: [],
		message: result.data
	};
	return { matches: result.data.map((item) => item.tool_name) };
}
function ToolSearchTool({ input, output }) {
	const { t } = useTranslation();
	const { matches, message } = parseOutput(output);
	const normalizedInput = input ? { ...input } : null;
	const normalizedOutput = matches.length > 0 ? { matches: matches.join(", ") } : message ? { value: message } : null;
	return {
		key: AgentToolsType.ToolSearch,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.ToolSearch,
			args: input,
			stats: matches.length > 0 ? t("message.tools.units.result", { count: matches.length }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.tool-search",
			className: "space-y-1",
			children: [normalizedInput && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolArgsTable, {
				args: normalizedInput,
				title: t("message.tools.sections.input")
			}), normalizedOutput && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolArgsTable, {
				args: normalizedOutput,
				title: t("message.tools.sections.output")
			})]
		})
	};
}
function WebFetchTool({ input, output }) {
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.WebFetch,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.WebFetch,
			args: input,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.web-fetch-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: truncatedOutput }), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
function WebSearchTool({ input, output }) {
	const { t } = useTranslation();
	const resultCount = countLines(output);
	const { data: truncatedOutput, isTruncated, originalLength } = truncateOutput(output);
	return {
		key: AgentToolsType.WebSearch,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.WebSearch,
			args: input,
			stats: output ? t("message.tools.units.result", { count: resultCount }) : void 0,
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.web-search-tool",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: truncatedOutput }), isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedIndicator, { originalLength })]
		})
	};
}
var CodeViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeViewer-b_Jk2kIF.js"), __vite__mapDeps([14,2,3,4,5,15,10,12,16,17,18,19,20,21,22,23,13,24,25,26,27,1,28,29,30]), import.meta.url));
function WorkflowDetail({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.workflow-detail",
		className: "grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] gap-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "selectable truncate font-mono text-foreground",
			title: value,
			children: value
		})]
	});
}
function WorkflowTool({ input, output }) {
	const { t } = useTranslation();
	const actions = useOptionalMessageListActions();
	const [copied, setCopied] = useTemporaryValue(false);
	const isStreaming = useIsStreaming();
	const result = output && typeof output !== "string" ? output : void 0;
	const target = result?.workflowName ?? input?.name ?? (result?.taskId ? t("message.tools.activity.taskId", { id: result.taskId }) : void 0);
	const script = input?.script;
	const hasDetails = Boolean(script || result?.summary || result?.warning || result?.error || result?.runId || result?.scriptPath);
	const copyScript = () => {
		if (!script || !actions?.copyText) return;
		Promise.resolve(actions.copyText(script, { successMessage: t("common.copied") })).then(() => setCopied(true)).catch(() => actions.notifyError?.(t("message.copy.failed")));
	};
	return {
		key: AgentToolsType.Workflow,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Workflow,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: target,
				width: "150px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: hasDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.workflow-tool",
			className: "flex min-w-0 flex-col gap-3",
			children: [
				script ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex min-h-7 items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-muted-foreground text-xs",
							children: t("message.tools.workflow.script")
						}), actions?.copyText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: copied ? t("common.copied") : t("common.copy"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": copied ? t("common.copied") : t("common.copy"),
								onClick: copyScript,
								children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 14,
									className: "text-primary"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, { size: 14 })
							})
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-72 overflow-auto rounded-md bg-background-subtle p-2 font-mono text-foreground text-xs",
							children: script
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer, {
							value: script,
							language: "javascript",
							expanded: false,
							maxHeight: "18rem",
							wrapped: false,
							autoScrollToBottom: isStreaming,
							options: { highlight: !isStreaming }
						})
					})]
				}) : null,
				result?.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 font-medium text-muted-foreground text-xs",
					children: t("message.tools.workflow.summary")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "whitespace-pre-wrap rounded-md bg-background-subtle p-2 text-foreground text-xs",
					children: result.summary
				})] }) : null,
				result?.warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-warning-border bg-warning-subtle p-2 text-warning-subtle-foreground text-xs",
					children: result.warning
				}) : null,
				result?.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-error-border bg-error-subtle p-2 text-error-subtle-foreground text-xs",
					children: result.error
				}) : null,
				result?.runId || result?.scriptPath ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 rounded-md border border-border-subtle bg-background-subtle p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowDetail, {
						label: t("message.tools.workflow.run_id"),
						value: result.runId
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowDetail, {
						label: t("message.tools.workflow.script_path"),
						value: result.scriptPath
					})]
				}) : null
			]
		}) : void 0,
		classNames: { body: "max-h-[32rem] px-3 py-2" }
	};
}
function WriteTool({ input, output, hasError }) {
	const filename = input?.file_path?.split("/").pop();
	const language = getLanguageByFilePath(input?.file_path ?? "");
	const fileWritten = output !== void 0 && !hasError;
	return {
		key: AgentToolsType.Write,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			toolName: AgentToolsType.Write,
			args: input,
			params: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
				value: input?.file_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickableFilePath, {
					path: input.file_path,
					displayName: filename,
					interactive: fileWritten
				}) : void 0,
				width: "200px"
			}),
			variant: "collapse-label",
			showStatus: false
		}),
		children: input ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
			value: input.content ?? "",
			language,
			expanded: false,
			wrapped: false,
			maxHeight: 240,
			options: { lineNumbers: true }
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
			value: null,
			width: "100%",
			fallback: null
		})
	};
}
var AGENT_TOOL_VALUES = new Set(Object.values(AgentToolsType));
const toolRenderers = {
	[AgentToolsType.Agent]: AgentTool,
	[AgentToolsType.Read]: ReadTool,
	[AgentToolsType.Task]: createStructuredAgentTool(AgentToolsType.Task),
	[AgentToolsType.TaskOutput]: TaskOutputTool,
	[AgentToolsType.TaskStop]: TaskStopTool,
	[AgentToolsType.Bash]: BashTool,
	[AgentToolsType.Search]: SearchTool,
	[AgentToolsType.Glob]: GlobTool,
	[AgentToolsType.WebSearch]: WebSearchTool,
	[AgentToolsType.Grep]: GrepTool,
	[AgentToolsType.Write]: WriteTool,
	[AgentToolsType.WebFetch]: WebFetchTool,
	[AgentToolsType.Edit]: EditTool,
	[AgentToolsType.MultiEdit]: MultiEditTool,
	[AgentToolsType.BashOutput]: BashOutputTool,
	[AgentToolsType.NotebookEdit]: NotebookEditTool,
	[AgentToolsType.ExitPlanMode]: ExitPlanModeTool,
	[AgentToolsType.Skill]: SkillTool,
	[AgentToolsType.ToolSearch]: ToolSearchTool,
	[AgentToolsType.ListMcpResources]: createStructuredAgentTool(AgentToolsType.ListMcpResources),
	[AgentToolsType.ReadMcpResource]: createStructuredAgentTool(AgentToolsType.ReadMcpResource),
	[AgentToolsType.TaskCreate]: TaskCreateTool,
	[AgentToolsType.TaskGet]: TaskGetTool,
	[AgentToolsType.TaskUpdate]: TaskUpdateTool,
	[AgentToolsType.TaskList]: TaskListTool,
	[AgentToolsType.SendMessage]: createStructuredAgentTool(AgentToolsType.SendMessage),
	[AgentToolsType.TeamCreate]: createStructuredAgentTool(AgentToolsType.TeamCreate),
	[AgentToolsType.TeamDelete]: createStructuredAgentTool(AgentToolsType.TeamDelete),
	[AgentToolsType.EnterWorktree]: createStructuredAgentTool(AgentToolsType.EnterWorktree),
	[AgentToolsType.ExitWorktree]: createStructuredAgentTool(AgentToolsType.ExitWorktree),
	[AgentToolsType.Workflow]: WorkflowTool
};
function renderTool(toolName, input, output, hasError) {
	const renderer = toolRenderers[toolName];
	if (!renderer) return {
		key: toolName,
		label: null
	};
	return renderer({
		input,
		output,
		hasError
	});
}
function isValidAgentToolsType(toolName) {
	return typeof toolName === "string" && AGENT_TOOL_VALUES.has(toolName);
}
var getToolDisplayName = (name) => {
	if (name.startsWith("mcp__")) {
		const parts = name.substring(5).split("__");
		if (parts.length >= 2) return `${parts[0]}:${parts.slice(1).join(":")}`;
	}
	return name;
};
function extractMcpContent(output) {
	const result = CallToolResultSchema.safeParse(output);
	if (!result.success) return null;
	const textParts = [];
	const images = [];
	for (const item of result.data.content) if (item.type === "text" && item.text) textParts.push(item.text);
	else if (item.type === "image" && item.data) images.push({
		data: item.data,
		mimeType: item.mimeType ?? "image/png"
	});
	return {
		text: textParts.length > 0 ? textParts.join("\n\n") : null,
		images
	};
}
function UnknownToolRenderer({ toolName = "", input, output }) {
	const { t } = useTranslation();
	const isMcpTool = toolName.startsWith("mcp__");
	const displayName = getToolDisplayName(toolName);
	const getToolDescription$1 = (name) => {
		if (name.startsWith("mcp__")) return t("message.tools.labels.mcpServerTool");
		return t("message.tools.labels.tool");
	};
	const normalizeArgs = (value) => {
		if (value === void 0 || value === null) return null;
		if (typeof value === "object") return value;
		return { value };
	};
	const normalizedInput = normalizeArgs(input);
	const mcpContent = extractMcpContent(output);
	const mcpImages = mcpContent?.images ?? [];
	const normalizedOutput = mcpContent ? mcpContent.text !== null ? { value: mcpContent.text } : null : normalizeArgs(output);
	return {
		key: "unknown-tool",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolHeader_default, {
			label: isMcpTool ? `${getToolDescription$1(toolName)} ${displayName}` : void 0,
			toolName: displayName,
			params: isMcpTool ? void 0 : getToolDescription$1(toolName),
			variant: "collapse-label",
			showStatus: false
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.unknown-tool",
			className: "space-y-1",
			children: [
				normalizedInput && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolArgsTable, {
					args: normalizedInput,
					title: t("message.tools.sections.input")
				}),
				normalizedOutput && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolArgsTable, {
					args: normalizedOutput,
					title: t("message.tools.sections.output")
				}),
				mcpImages.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `data:${img.mimeType};base64,${img.data}`,
					alt: t("message.tools.sections.output"),
					className: "mt-2 max-w-[300px] rounded"
				}, idx)),
				!normalizedInput && !normalizedOutput && mcpImages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 text-foreground-500 text-xs",
					children: t("message.tools.noData")
				})
			]
		})
	};
}
function shouldShowHeaderErrorText(toolName, renderedItem) {
	return renderedItem.children === void 0 || renderedItem.children === null || toolName === AgentToolsType.Write;
}
function getAgentToolFlowTitle(toolName, input) {
	if (typeof input === "string") return input.trim() || toolName;
	if (!input || typeof input !== "object" || Array.isArray(input)) return toolName;
	const inputEntries = Object.entries(input);
	for (const key of [
		"description",
		"subject",
		"title",
		"name"
	]) {
		const value = inputEntries.find(([field]) => field === key)?.[1];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
	const prompt = inputEntries.find(([field]) => field === "prompt")?.[1];
	if (typeof prompt === "string") return prompt.split(/\r?\n/).find((line) => line.trim())?.trim() || toolName;
	return toolName;
}
function AgentToolCallCard({ toolCallId, toolName, input, output, isStreaming = false, status, hasError = false, openFlowOnClick = false, showInlineDetails = true }) {
	const actions = useOptionalMessageListActions();
	const renderedItem = isValidAgentToolsType(toolName) ? renderTool(toolName, input ?? {}, output, hasError) : toolName === TO_MARKDOWN_RUNTIME_TOOL_NAME ? ToMarkdownTool({
		input,
		output
	}) : UnknownToolRenderer({
		toolName: toolName ?? "Tool",
		input,
		output
	});
	const openToolFlow = openFlowOnClick && actions?.openAgentToolFlow && toolCallId ? () => actions.openAgentToolFlow?.({
		toolCallId,
		toolName,
		title: getAgentToolFlowTitle(toolName, input)
	}) : void 0;
	const errorText = shouldShowHeaderErrorText(toolName, renderedItem) ? extractToolErrorText(output) : void 0;
	const toolContentItem = {
		...renderedItem,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolDisclosureLabel, { label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: renderedItem.label
			}), status && (status !== "done" || hasError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolStatusIndicator, {
				status,
				hasError,
				errorText
			})]
		}) }),
		classNames: { header: "min-h-7 px-0 py-0.5 font-normal text-[13px] leading-5 text-muted-foreground" }
	};
	const canShowInlineDetails = showInlineDetails && renderedItem.children !== void 0 && renderedItem.children !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolDisclosure, {
		className: "w-full max-w-full rounded-none border-0 bg-transparent",
		defaultActiveKey: isStreaming && toolName === AgentToolsType.Workflow ? [String(renderedItem.key)] : [],
		isStreaming,
		item: toolContentItem,
		onOpenDetails: openToolFlow,
		stateId: toolCallId,
		showInlineDetails: canShowInlineDetails
	});
}
var AskUserQuestionOptimisticInputContext = (0, import_react.createContext)({});
const AskUserQuestionOptimisticInputProvider = AskUserQuestionOptimisticInputContext.Provider;
function useAskUserQuestionOptimisticInput(toolCallId) {
	const inputs = (0, import_react.use)(AskUserQuestionOptimisticInputContext);
	if (!toolCallId) return void 0;
	return inputs[toolCallId];
}
var logger = loggerService.withContext("AskUserQuestionCard");
function Navigation({ isFirst, isLast, onPrevious, onNext }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.navigation",
		className: "flex items-center justify-between border-default-200 border-t pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			disabled: isFirst,
			onClick: onPrevious,
			className: "flex items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }), t("agent.askUserQuestion.previous")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			disabled: isLast,
			onClick: onNext,
			className: "flex items-center",
			children: [t("agent.askUserQuestion.next"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
		})]
	});
}
function CompletedContent({ question, answer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.completed-content",
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: answer ? "secondary" : "outline",
				className: "m-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
					value: question?.header,
					width: "60px"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1 text-default-700 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonValue, {
					value: question?.question,
					width: "100%"
				})
			})]
		}), answer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary text-sm",
				children: answer
			})]
		})]
	});
}
function AskUserQuestionCard({ toolResponse }) {
	const { t } = useTranslation();
	const optimisticInput = useAskUserQuestionOptimisticInput(toolResponse.toolCallId);
	const { questions, answers } = (0, import_react.useMemo)(() => {
		const parsedInput = parseAskUserQuestionToolInput(toolResponse.arguments);
		const parsedOutput = parseAskUserQuestionToolInput(toolResponse.response);
		const parsedOptimisticInput = parseAskUserQuestionToolInput(optimisticInput);
		const questions$1 = parsedInput?.questions ?? parsedOptimisticInput?.questions ?? parsedOutput?.questions ?? [];
		const answers$1 = {
			...parsedOutput?.answers,
			...parsedInput?.answers,
			...parsedOptimisticInput?.answers
		};
		if (!questions$1.length) logger.debug("AskUserQuestion: no questions parsed", {
			status: toolResponse.status,
			hasArguments: !!toolResponse.arguments,
			hasResponse: !!toolResponse.response
		});
		return {
			questions: questions$1,
			answers: answers$1
		};
	}, [
		optimisticInput,
		toolResponse.arguments,
		toolResponse.response,
		toolResponse.status
	]);
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const currentQuestion = questions[currentIndex];
	const totalQuestions = questions.length;
	const isFirstQuestion = currentIndex === 0;
	const isLastQuestion = currentIndex === totalQuestions - 1;
	const answeredCount = Object.keys(answers).length;
	const isTransientWithoutAnswer = answeredCount === 0 && (toolResponse.status === "pending" || toolResponse.status === "invoking" || toolResponse.status === "streaming");
	if (!currentQuestion || isTransientWithoutAnswer) return null;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.ask-user-question-card",
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompletedContent, {
			question: currentQuestion,
			answer: answers[currentQuestion.question]
		}), totalQuestions > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {
			isFirst: isFirstQuestion,
			isLast: isLastQuestion,
			onPrevious: () => setCurrentIndex((prev) => Math.max(0, prev - 1)),
			onNext: () => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolDisclosure, {
		className: "w-full max-w-full rounded-none border-0 bg-transparent",
		item: {
			key: toolResponse.toolCallId || "ask-user-question",
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolDisclosureLabel, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tool-icon flex h-4 w-4 shrink-0 items-center justify-center text-foreground-tertiary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: t("agent.askUserQuestion.title")
					})]
				}),
				trailing: answeredCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-muted px-1.5 py-0.5 text-foreground-tertiary text-xs leading-4",
					children: [
						answeredCount,
						" ",
						t("agent.askUserQuestion.answered")
					]
				}) : void 0
			}),
			children: content,
			classNames: { header: "min-h-7 px-0 py-0.5 font-normal text-[13px] leading-5 text-muted-foreground" }
		},
		stateId: toolResponse.toolCallId
	});
}
function getNavigationPathSegments(value) {
	if (!value.startsWith("/") || value.includes("?") || value.includes("#") || value.includes("\\")) return void 0;
	const segments = value.slice(1).split("/");
	if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) return void 0;
	return segments;
}
function isAllowedNavigationPath(path, allowedRoutes) {
	const pathSegments = getNavigationPathSegments(path);
	if (!pathSegments) return false;
	return allowedRoutes.some((route) => {
		const routeSegments = getNavigationPathSegments(route);
		if (!routeSegments) return false;
		for (let index = 0; index < routeSegments.length; index++) {
			const routeSegment = routeSegments[index];
			if (routeSegment === "$") return index === routeSegments.length - 1 && pathSegments.length > index;
			if (routeSegment.startsWith("$")) {
				if (!pathSegments[index]) return false;
				continue;
			}
			if (pathSegments[index] !== routeSegment) return false;
		}
		return pathSegments.length === routeSegments.length;
	});
}
var ROUTE_LABELS = {
	"/app/chat": {
		icon: "💬",
		labelKey: "agent.session.group.conversation"
	},
	"/app/paintings": {
		icon: "🎨",
		labelKey: "title.paintings"
	},
	"/app/translate": {
		icon: "🌐",
		labelKey: "title.translate"
	},
	"/app/files": {
		icon: "📁",
		labelKey: "title.files"
	},
	"/app/notes": {
		icon: "📝",
		labelKey: "title.notes"
	},
	"/app/knowledge": {
		icon: "📚",
		labelKey: "title.knowledge"
	},
	"/app/mini-app": {
		icon: "📦",
		labelKey: "title.apps"
	},
	"/app/code": {
		icon: "💻",
		labelKey: "title.code"
	},
	"/app/launchpad": {
		icon: "🚀",
		labelKey: "title.launchpad"
	},
	"/app/agents": {
		icon: "🤖",
		labelKey: "agent.sidebar_title"
	},
	"/settings/provider": {
		icon: "🔑",
		labelKey: "settings.provider.title"
	},
	"/settings/model": {
		icon: "🤖",
		labelKey: "settings.model"
	},
	"/settings/local-models": {
		icon: "📦",
		labelKey: "settings.dependencies.localModels.title"
	},
	"/settings/appearance": {
		icon: "🎨",
		labelKey: "settings.appearance.title"
	},
	"/settings/notifications": {
		icon: "🔔",
		labelKey: "settings.notification.title"
	},
	"/settings/system": {
		icon: "⚙️",
		labelKey: "settings.system.title"
	},
	"/settings/data": {
		icon: "💾",
		labelKey: "settings.data.title"
	},
	"/settings/mcp": {
		icon: "🔌",
		labelKey: "agent.settings.toolsMcp.mcp.tab"
	},
	"/settings/websearch": {
		icon: "🔍",
		labelKey: "settings.tool.websearch.title"
	},
	"/settings/api-gateway": {
		icon: "🌐",
		labelKey: "apiGateway.title"
	},
	"/settings/file-processing": {
		icon: "📄",
		labelKey: "settings.tool.file_processing.features.document_to_markdown.title"
	},
	"/settings/ocr": {
		icon: "🔤",
		labelKey: "settings.tool.file_processing.features.image_to_text.title"
	},
	"/settings/shortcut": {
		icon: "⌨️",
		labelKey: "settings.shortcuts.title"
	},
	"/settings/quick-assistant": {
		icon: "🪟",
		labelKey: "settings.quickAssistant.title"
	},
	"/settings/selection-assistant": {
		icon: "✂️",
		labelKey: "selection.name"
	},
	"/settings/about": {
		icon: "ℹ️",
		labelKey: "settings.about.label"
	},
	"/settings/channels": {
		icon: "📡",
		labelKey: "settings.channels.title"
	},
	"/settings/code-execution": {
		icon: "⚙️",
		labelKey: "chat.settings.code_execution.title"
	},
	"/settings/dependencies": {
		icon: "🛠️",
		labelKey: "settings.dependencies.title"
	},
	"/settings/scheduled-tasks": {
		icon: "⏰",
		labelKey: "settings.scheduledTasks.title"
	},
	"/settings/skills": {
		icon: "🧰",
		labelKey: "settings.skills.title"
	},
	"/settings/usage": {
		icon: "📊",
		labelKey: "settings.usage.title"
	},
	"/settings/mcp/servers": {
		icon: "📋",
		labelKey: "settings.mcp.title"
	},
	"/settings/mcp/builtin": {
		icon: "📦",
		labelKey: "settings.mcp.builtinServers"
	},
	"/settings/mcp/marketplaces": {
		icon: "🛒",
		labelKey: "settings.mcp.marketplaces"
	},
	"/settings/mcp/npx-search": {
		icon: "🔍",
		labelKey: "settings.mcp.searchNpx"
	},
	"/settings/mcp/mcp-install": {
		icon: "📥",
		labelKey: "settings.mcp.install"
	},
	"/settings/mcp/settings": {
		icon: "⚙️",
		labelKey: "settings.mcp.system"
	}
};
var SORTED_ROUTES = Object.entries(ROUTE_LABELS).sort((a, b) => b[0].length - a[0].length);
var KNOWN_NAVIGATION_ROUTES = [
	...Object.keys(ROUTE_LABELS),
	"/app/mini-app/$appId",
	"/app/paintings/$",
	"/settings/mcp/$",
	"/settings/mcp/settings/$serverId",
	"/settings/scheduled-tasks/$taskId"
];
function isKnownNavigationPath(path) {
	const cleanPath = path.split("?")[0];
	return isAllowedNavigationPath(cleanPath, KNOWN_NAVIGATION_ROUTES);
}
function getRouteInfo(path) {
	if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
	const cleanPath = path.split("?")[0];
	if (ROUTE_LABELS[cleanPath]) return ROUTE_LABELS[cleanPath];
	for (const [route, info] of SORTED_ROUTES) if (cleanPath.startsWith(route + "/") || cleanPath === route) return info;
	return {
		icon: "📍",
		label: path
	};
}
function NavigateToolInline({ input, output }) {
	const typedInput = input;
	const basePath = typedInput?.path ?? "";
	const queryObj = typedInput?.query;
	let fullPath = basePath;
	if (queryObj && typeof queryObj === "object" && Object.keys(queryObj).length > 0) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(queryObj)) if (typeof value === "string") params.set(key, value);
		const qs = params.toString();
		if (qs) fullPath = `${basePath}?${qs}`;
	}
	const routeInfo = getRouteInfo(fullPath);
	const { t } = useTranslation();
	const isSuccess = (output && typeof output === "string" ? output : Array.isArray(output) ? output.map((o) => o?.text).filter(Boolean).join("") : "").includes("Navigate link created");
	const navigateToRoute = useOptionalMessageListActions()?.navigateToRoute;
	const handleClick = () => {
		if (!basePath || !navigateToRoute) return;
		navigateToRoute({
			path: basePath,
			query: queryObj
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		"data-ui": "chat.navigate-tool-inline",
		onClick: handleClick,
		disabled: !basePath || !navigateToRoute,
		className: "my-1 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border border-solid bg-muted px-3 py-1.5 text-foreground text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-muted",
		type: "button",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-3.5 w-3.5 opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				routeInfo.icon,
				" ",
				routeInfo.labelKey ? t(routeInfo.labelKey) : routeInfo.label
			] }),
			isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-success",
				children: "✓"
			})
		]
	});
}
var import_dist = require_dist();
function AgentExecutionTimeline({ toolResponse }) {
	const { arguments: args, response, tool, status, partialArguments } = toolResponse;
	const awaitingApproval = isToolPartAwaitingApproval(usePartsMap(), toolResponse.toolCallId);
	const deferredPartialArguments = (0, import_react.useDeferredValue)(partialArguments);
	const parsedPartialArgs = (0, import_react.useMemo)(() => {
		if (!deferredPartialArguments) return void 0;
		try {
			return (0, import_dist.parse)(deferredPartialArguments);
		} catch {
			return;
		}
	}, [deferredPartialArguments]);
	if (tool?.name === "mcp__assistant__navigate") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigateToolInline, {
		input: args ?? parsedPartialArgs,
		output: response
	});
	if (isAskUserQuestionToolName(tool?.name)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamingContext, {
		value: status === "streaming" || status === "invoking",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskUserQuestionCard, { toolResponse })
	});
	if (tool?.name === "TodoWrite") return null;
	const effectiveStatus = getEffectiveStatus(status, awaitingApproval);
	if (effectiveStatus === "waiting") return null;
	const isLoading = effectiveStatus === "streaming" || effectiveStatus === "invoking";
	const isSubagentTool = tool?.name === AgentToolsType.Agent || tool?.name === AgentToolsType.Task;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentToolCallCard, {
		toolCallId: toolResponse.toolCallId,
		toolName: tool?.name,
		input: args ?? parsedPartialArgs,
		output: isLoading ? void 0 : response,
		isStreaming: isLoading,
		status: effectiveStatus,
		hasError: status === "error",
		openFlowOnClick: isSubagentTool,
		showInlineDetails: !isSubagentTool
	});
}
var ImageBlock = ({ images, isPending = false, isSingle = false }) => {
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.image-block",
		className: "h-50 w-50 animate-pulse rounded-lg bg-muted"
	});
	if (images.length === 0) return null;
	const previewItems = images.map((src, index) => ({
		id: `${index}:${src}`,
		src
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.image-block",
		className: isSingle ? void 0 : "flex max-w-full flex-wrap gap-2.5",
		children: previewItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer_default, {
			src: item.src,
			preview: { items: previewItems },
			style: isSingle ? {
				maxWidth: 500,
				maxHeight: "min(500px, 50vh)",
				padding: 0,
				borderRadius: 8
			} : {
				width: 280,
				height: 280,
				objectFit: "cover",
				padding: 0,
				borderRadius: 8
			}
		}, item.id))
	});
};
var ImageBlock_default = import_react.memo(ImageBlock);
var CONFIG_TOOL_NAMES = new Set(["config", "mcp__cherry-tools__config"]);
function isChannelConfigTool(toolResponse) {
	const { tool } = toolResponse;
	const isCherryTools = "serverId" in tool && tool.serverId === "cherry-tools" || tool.name === "mcp__cherry-tools__config";
	return tool.type === "mcp" && isCherryTools && CONFIG_TOOL_NAMES.has(tool.name);
}
function isChannelAuthQrRequest(toolResponse) {
	if (!isChannelConfigTool(toolResponse)) return false;
	const args = toolResponse.arguments;
	if (!args || Array.isArray(args) || typeof args !== "object") return false;
	if (args.action === "reconnect_channel") return true;
	return args.action === "add_channel" && args.auth_mode === "qr";
}
function getChannelAuthQrResult(toolResponse) {
	if (!isChannelAuthQrRequest(toolResponse) || typeof toolResponse.toolCallId !== "string") return null;
	const result = CallToolResultSchema.safeParse(toolResponse.response);
	if (!result.success) return null;
	const images = result.data.content.flatMap((item) => item.type === "image" && item.data ? [`data:${item.mimeType ?? "image/png"};base64,${item.data}`] : []);
	if (images.length === 0) return null;
	return {
		images,
		responseWithoutImages: {
			...result.data,
			content: result.data.content.filter((item) => item.type !== "image")
		}
	};
}
function isChannelAuthQrToolResponse(toolResponse) {
	return getChannelAuthQrResult(toolResponse) !== null;
}
function isChannelAuthQrPart(part) {
	const toolResponse = buildToolResponseFromPart(part);
	if (!toolResponse || !isChannelAuthQrRequest(toolResponse)) return false;
	return isDeferredToolOutput(toolResponse.response) || getChannelAuthQrResult(toolResponse) !== null;
}
function MessageChannelConfigTool({ toolResponse }) {
	const qrResult = (0, import_react.useMemo)(() => getChannelAuthQrResult(toolResponse), [toolResponse]);
	if (!qrResult) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.message-channel-config-tool",
		className: "group/tool my-px flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentExecutionTimeline, { toolResponse: {
			...toolResponse,
			response: qrResult.responseWithoutImages
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageBlock_default, {
			images: qrResult.images,
			isSingle: qrResult.images.length === 1
		})]
	});
}
function isReportArtifactsToolResponse(toolResponse) {
	const toolName = toolResponse.tool.name;
	return toolName === "report_artifacts" || toolName.endsWith(`__report_artifacts`);
}
function getReportArtifactsViewModel(toolResponses) {
	const artifactByPath = /* @__PURE__ */ new Map();
	let summary;
	for (const toolResponse of toolResponses) {
		if (!isReportArtifactsToolResponse(toolResponse)) continue;
		const parsed = reportArtifactsInputSchema.safeParse(toolResponse.arguments);
		if (!parsed.success) continue;
		if (parsed.data.summary) summary = parsed.data.summary;
		for (const artifact of parsed.data.artifacts) {
			const path = artifact.path.trim();
			if (!path) continue;
			artifactByPath.set(path, {
				path,
				description: artifact.description
			});
		}
	}
	const artifacts = Array.from(artifactByPath.values());
	return artifacts.length > 0 ? {
		artifacts,
		summary
	} : null;
}
function getArtifactFileName(path) {
	return path.trim().replace(/[\\/]+$/g, "").split(/[\\/]+/).filter(Boolean).at(-1) ?? path;
}
function getFileManagerName(t) {
	if (isMac) return t("agent.session.file_manager.finder");
	if (isWin) return t("agent.session.file_manager.file_explorer");
	return t("agent.session.file_manager.files");
}
function ReportArtifactFileCard({ artifact }) {
	const { t } = useTranslation();
	const ui = useOptionalMessageListUi();
	const actions = useOptionalMessageListActions();
	const openArtifactFile = actions?.openArtifactFile;
	const openPath = actions?.openPath;
	const showInFolder = actions?.showInFolder;
	const openInExternalApp = actions?.openInExternalApp;
	const copyText = actions?.copyText;
	const notifyError = actions?.notifyError;
	const availableEditors = (0, import_react.useMemo)(() => ui?.externalCodeEditors ?? [], [ui?.externalCodeEditors]);
	const hasOpenActions = Boolean(openArtifactFile || openPath || showInFolder || openInExternalApp && availableEditors.length > 0);
	const displayPath = (0, import_react.useMemo)(() => normalizeInlineFilePath(artifact.path), [artifact.path]);
	const targetPath = (0, import_react.useMemo)(() => resolveInlineFilePath(artifact.path), [artifact.path]);
	const fileName = (0, import_react.useMemo)(() => getArtifactFileName(displayPath), [displayPath]);
	const iconName = (0, import_react.useMemo)(() => getFileIconName(displayPath), [displayPath]);
	const fileManagerName = (0, import_react.useMemo)(() => getFileManagerName(t), [t]);
	const handlePreview = (0, import_react.useCallback)(() => {
		if (!openArtifactFile) return;
		Promise.resolve(openArtifactFile(targetPath)).catch(() => {
			notifyError?.(t("chat.input.tools.open_file_error", { path: targetPath }));
		});
	}, [
		notifyError,
		openArtifactFile,
		t,
		targetPath
	]);
	const handleOpenExternal = (0, import_react.useCallback)(() => {
		if (!openPath) return;
		Promise.resolve(openPath(targetPath)).catch(() => {
			notifyError?.(t("chat.input.tools.open_file_error", { path: targetPath }));
		});
	}, [
		notifyError,
		openPath,
		t,
		targetPath
	]);
	const handleReveal = (0, import_react.useCallback)(() => {
		if (!showInFolder) return;
		Promise.resolve(showInFolder(targetPath)).catch(() => {
			notifyError?.(t("chat.input.tools.file_not_found", { path: targetPath }));
		});
	}, [
		notifyError,
		showInFolder,
		t,
		targetPath
	]);
	const handleCopyPath = (0, import_react.useCallback)(() => {
		if (!copyText) return;
		Promise.resolve(copyText(displayPath, { successMessage: t("common.copied") })).catch(() => {
			notifyError?.(t("message.copy.failed"));
		});
	}, [
		copyText,
		displayPath,
		notifyError,
		t
	]);
	const handleOpenInEditor = (0, import_react.useCallback)((app) => {
		if (!openInExternalApp) return;
		Promise.resolve(openInExternalApp(app, targetPath)).catch(() => {
			notifyError?.(t("chat.input.tools.open_file_error", { path: targetPath }));
		});
	}, [
		notifyError,
		openInExternalApp,
		t,
		targetPath
	]);
	const contextMenuItems = (0, import_react.useMemo)(() => {
		const items = [];
		if (openArtifactFile) items.push({
			type: "item",
			id: "artifact.preview",
			label: t("common.preview"),
			onSelect: handlePreview
		});
		if (openPath) items.push({
			type: "item",
			id: "artifact.open",
			label: t("chat.input.tools.open_file"),
			onSelect: handleOpenExternal
		});
		if (showInFolder) items.push({
			type: "item",
			id: "artifact.reveal",
			label: fileManagerName,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "chat.report-artifact-file-card",
				"aria-hidden": "true",
				children: isMac ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinderIcon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { size: 16 })
			}),
			onSelect: handleReveal
		});
		if (openInExternalApp) for (const app of availableEditors) items.push({
			type: "item",
			id: `artifact.open-editor.${app.id}`,
			label: app.name,
			icon: getEditorIcon(app),
			onSelect: () => handleOpenInEditor(app)
		});
		if (copyText) {
			if (items.length > 0) items.push({ type: "separator" });
			items.push({
				type: "item",
				id: "artifact.copy-path",
				label: t("common.copy"),
				onSelect: handleCopyPath
			});
		}
		return items;
	}, [
		availableEditors,
		copyText,
		fileManagerName,
		handleCopyPath,
		handleOpenExternal,
		handleOpenInEditor,
		handlePreview,
		handleReveal,
		openArtifactFile,
		openInExternalApp,
		openPath,
		showInFolder,
		t
	]);
	const card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.report-artifact-file-card",
		className: "group/artifact flex w-full max-w-xl items-center overflow-hidden rounded-lg border-[0.5px] border-border bg-background-subtle transition-colors hover:bg-accent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-disabled": !openArtifactFile,
			onClick: openArtifactFile ? handlePreview : void 0,
			title: displayPath,
			"aria-label": `${t("common.preview")} ${fileName}`,
			className: "flex min-h-12 min-w-0 flex-1 items-center gap-2.5 border-0 bg-transparent px-2.5 py-2 text-left aria-disabled:cursor-default",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					icon: `material-icon-theme:${iconName}`,
					className: "text-[20px]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate font-medium text-[13px] text-foreground leading-5",
				children: fileName
			})]
		}), hasOpenActions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPopupMenu, {
			location: "webcontents.context",
			extraItems: contextMenuItems,
			align: "end",
			side: "bottom",
			sideOffset: 6,
			contentClassName: "min-w-44",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				"aria-label": `${t("chat.input.tools.open_with")} ${fileName}`,
				onClick: (event) => {
					event.stopPropagation();
				},
				className: "mr-2 rounded-lg data-[state=open]:bg-accent",
				children: [t("chat.input.tools.open_with"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: "text-muted-foreground",
					size: 14
				})]
			})
		})]
	});
	if (contextMenuItems.length === 0) return card;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: contextMenuItems,
		children: card
	});
}
const MessageReportArtifacts = ({ toolResponses }) => {
	const viewModel = (0, import_react.useMemo)(() => getReportArtifactsViewModel(toolResponses), [toolResponses]);
	if (!viewModel) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.message-report-artifacts",
		className: "my-1 flex w-full flex-col gap-1.5",
		children: viewModel.artifacts.map((artifact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportArtifactFileCard, { artifact }, artifact.path))
	});
};
var TITLE_KEYS = [
	"subject",
	"task",
	"description",
	"activeForm"
];
var ID_KEYS = [
	"id",
	"taskId",
	"task_id"
];
function getTaskScalar(value) {
	if (typeof value === "string" || typeof value === "number" || value === null || value === void 0) return value;
}
function isTaskRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getTaskString(value) {
	if (typeof value === "string") return value.trim() || void 0;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
}
function getTaskField(record$1, keys) {
	for (const key of keys) {
		const value = getTaskString(getTaskScalar(record$1[key]));
		if (value) return value;
	}
}
function isOrdinalTaskTitle(value) {
	return !!value && /^#?\d+$/.test(value.trim());
}
function getTaskId(record$1) {
	return getTaskField(record$1, ID_KEYS);
}
function getTaskTitle(record$1, fallback) {
	for (const key of TITLE_KEYS) {
		const value = record$1[key];
		if (isTaskRecord(value)) {
			const nested = getTaskTitle(value);
			if (nested && !isOrdinalTaskTitle(nested)) return nested;
		}
		const title = getTaskString(getTaskScalar(value));
		if (title && !isOrdinalTaskTitle(title)) return title;
	}
	return fallback && !isOrdinalTaskTitle(fallback) ? fallback : void 0;
}
function getTaskActiveText(record$1) {
	return getTaskField(record$1, [
		"activeText",
		"activeForm",
		"description"
	]);
}
function normalizeTaskStatus(value) {
	switch (value) {
		case "pending": return "pending";
		case "in_progress":
		case "running":
		case "paused": return "in_progress";
		case "completed":
		case "deleted": return "completed";
		case "error":
		case "failed":
		case "killed":
		case "stopped": return "error";
		default: return;
	}
}
export { MessageListProvider as $, useMessageDisclosureState as A, normalizeToolErrorResponse as B, ArgsTable as C, truncateOutput as D, formatArgValue as E, APPROVAL_REQUESTED as F, ToolHeader_default as G, ToolStatusIndicator as H, APPROVAL_RESPONDED as I, SkeletonSpan as J, getReadableToolActivity as K, buildToolResponseFromPart as L, invalidateCachedMessageUiStates as M, updateCachedMessageUiState as N, ClickableFilePath as O, useScrollAnchor as P, require_dist as Q, findToolPartByCallId as R, ArgsSectionTitle as S, ToolArgsTable as T, TruncatedIndicator as U, isMetaToolName as V, getEffectiveStatus as W, isAskUserQuestionToolName as X, AgentToolsType as Y, parseAskUserQuestionToolInput as Z, isValidAgentToolsType as _, normalizeTaskStatus as a, useMessageListSelection as at, ArgValue as b, MessageChannelConfigTool as c, useMessageRenderConfig as ct, ImageBlock_default as d, useOptionalMessageListUi as dt, useMessageListActions as et, AgentExecutionTimeline as f, UnknownToolRenderer as g, AskUserQuestionOptimisticInputProvider as h, isTaskRecord as i, useMessageListMeta as it, getCachedMessageUiState as j, getEditorIcon as k, isChannelAuthQrPart as l, useOptionalMessageListActions as lt, isKnownNavigationPath as m, getTaskId as n, useMessageListData as nt, MessageReportArtifacts as o, useMessageListUi as ot, NavigateToolInline as p, PlaceholderShimmerText as q, getTaskTitle as r, useMessageListEditingId as rt, isReportArtifactsToolResponse as s, useMessageListUiSelectors as st, getTaskActiveText as t, useMessageListActiveTurnStatus as tt, isChannelAuthQrToolResponse as u, useOptionalMessageListTopicId as ut, renderTool as v, ResponseSection as w, ArgsSection as x, ArgKey as y, isToolPartAwaitingApproval as z };

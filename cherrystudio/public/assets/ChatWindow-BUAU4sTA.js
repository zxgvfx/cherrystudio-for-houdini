import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import "./Trans-2RhWYf-S.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./react-error-boundary-1QFJEaxP.js";
import "./es2015-CF8XujIC.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import "./with-selector-YZwnb76j.js";
import "./chunk-BO2N2NFS-CPhdpqIF.js";
import "./extend-CpT6M6LO.js";
import "./marked.esm-CssjD7C2.js";
import "./dist-CmBt0G-t.js";
import "./dist-CbafgI8N.js";
import "./useCodeStyle-zD0Sb1Ey.js";
import "./useTheme-CkJQYl0u.js";
import "./shiki-5X_PGXXr.js";
import "./command-DJ8bdie_.js";
import "./command-CtEyUhIg.js";
import "./useCloseBeforeAction-COmv5C7_.js";
import "./ipc-BuGMWdaI.js";
import "./ErrorBoundary-Bijb9tIO.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./message-B_yl0O_K.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./toast-C6NqKFoQ.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
import "./popup-BLG-Gue5.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./image-BfuhOMOH.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import "./toolOutput-CFeNIV-2.js";
import "./citations-B3he2I9w.js";
import "./uiParts-D7jaMraw.js";
import "./with-selector-DOSXj2wE.js";
import "./filePreview-Bzjo3HcD.js";
import "./filePath-CS1ffRfs.js";
import "./constants-C9ynPhpc.js";
import "./useTopicStreamStatus-8sPVIB3X.js";
import "./useTimer-BCHMb2QP.js";
import "./useTemporaryValue-kBhuEh30.js";
import "./MessagePartsContext-C8SysI78.js";
import "./__vite-browser-external-B6Ia6fcU.js";
import "./CodeViewer-DmsmcVO3.js";
import "./CopyIcon-CF5lW_xU.js";
import "./ImagePreviewService-ClwFTW1F.js";
import "./BracesVariableIcon-co6jKDxq.js";
import "./citation-Njzn5Mjh.js";
import "./group-BlMwbJVX.js";
import "./knowledge-Cnld5F6B.js";
import "./HtmlArtifactPopupContext-Bj_u6dkM.js";
import { a as MessageContent_default } from "./types-DHZ8BpXR.js";
import "./file-CVv-vzb2.js";
import "./composerTokenPolicy-mNaE2GA1.js";
import "./composerTokens-BZ0N0VX2.js";
import "./agent-MQkn_hV_.js";
import "./ScrollOwnershipContext-B284g1nN.js";
import "./iconify-CuvVQaA6.js";
import "./SvgIcon-F_UZ4jj_.js";
import "./ImageViewer-BMsDhPpI.js";
import "./useMcpServer-BMDAbs2E.js";
import "./FallbackFavicon-DZTDVx89.js";
import "./Link-Ca0EF_Vh.js";
import "./MarqueeText-CbNvtFcP.js";
import "./tokenView-DHPfV7BJ.js";
import "./useSmoothStream-D9ZZsFNK.js";
import { t as MessageContentProvider } from "./MessageContentProvider-DtERP8nF.js";
import "./composerAttachment-D3zIr3Wg.js";
import "./composerClipboard-DpmLsFUs.js";
import { n as useMessagePlatformActions, t as useMessageListRenderConfig } from "./useMessageListRenderConfig-B2iN5jwI.js";
import { t as MessageErrorBoundary_default } from "./MessageErrorBoundary-AzQpub6r.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MessageItem = ({ message, index, total, route }) => {
	const [messageFont] = usePreference("chat.message.font");
	const [fontSize] = usePreference("chat.message.font_size");
	const messageContainerRef = (0, import_react.useRef)(null);
	const isAssistantMessage = message.role === "assistant";
	const maxWidth = "800px";
	if (["summary", "explanation"].includes(route) && index === total - 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "quick-assistant.message-item",
		ref: messageContainerRef,
		className: cn("message flex w-full flex-col transition-colors duration-300 [&.message-highlight]:bg-primary/10 [&_.menubar.show]:opacity-100 [&_.menubar]:opacity-0 [&_.menubar]:transition-opacity hover:[&_.menubar]:opacity-100", isAssistantMessage ? "message-assistant" : "message-user items-end"),
		style: { maxWidth },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("message-content-container mt-5 flex max-w-full flex-col justify-between", isAssistantMessage ? "w-full" : "rounded-[10px] bg-muted px-4 py-2.5"),
			style: {
				fontFamily: messageFont === "serif" ? "var(--font-family-serif)" : "var(--font-family)",
				fontSize
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageErrorBoundary_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent_default, { message }) })
		})
	}, message.id);
};
var Message_default = (0, import_react.memo)(MessageItem);
var Messages = ({ assistant, route, isOutputted, messages, partsByMessageId }) => {
	const { renderConfig } = useMessageListRenderConfig();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContentProvider, {
		messages,
		partsByMessageId,
		renderConfig,
		actions: useMessagePlatformActions(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(scrollbar_default, {
			id: "messages",
			className: "flex min-w-full flex-col-reverse items-center overflow-x-hidden bg-transparent! pb-5",
			children: [!isOutputted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }), [...messages].reverse().map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message_default, {
				message,
				index,
				total: messages.length,
				route
			}, message.id))]
		}, assistant?.id ?? "runtime-default")
	});
};
var Messages_default = Messages;
var ChatWindow = ({ route, assistant, isOutputted, messages, partsByMessageId }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
		className: "bubble mb-auto flex max-h-full w-full flex-row justify-start bg-transparent! [-webkit-app-region:no-drag]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages_default, {
			assistant,
			route,
			isOutputted,
			messages,
			partsByMessageId
		})
	});
};
var ChatWindow_default = ChatWindow;
export { ChatWindow_default as default };

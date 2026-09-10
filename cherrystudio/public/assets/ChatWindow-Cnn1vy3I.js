import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import "./Trans-pez8bY7I.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./react-error-boundary-CnvE_Ln4.js";
import "./es2015-wfS3L7va.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import "./with-selector-DlsRhNV6.js";
import "./chunk-BO2N2NFS-fKJ-DR8B.js";
import "./extend-BDo4rIBl.js";
import "./marked.esm-5kn1DqGn.js";
import "./dist-Bsd0pttl.js";
import "./dist-oTn6Mzbo.js";
import "./useCodeStyle-hWHmowmT.js";
import "./useTheme-mM6gKAcD.js";
import "./shiki-g8Tr0-KC.js";
import "./command-CyHQabGE.js";
import "./command-B9oiyMDG.js";
import "./useCloseBeforeAction-DvYaYpLC.js";
import "./ipc-DpcwPFwy.js";
import "./ErrorBoundary-CrY8yFbh.js";
import "./tab-CVOgL8bf.js";
import "./useWindowInitData-BzKs7Qq9.js";
import "./mainWindowNavigation-Dpzd_Ttr.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./message-CtGMR9KJ.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./useReorder-Cmki1Ln4.js";
import "./toast-D2efAzAF.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import "./popup-fJcKiA2S.js";
import "./mcp-BGt1L-d_.js";
import "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import "./naming-BVJSQooI.js";
import "./image-DyuN5EBc.js";
import "./useSession-CwZkOUrY.js";
import "./conversationEntry-CTSSFR4L.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./toolOutput-DFxKz6Jf.js";
import "./uiParts-ClY38h-2.js";
import "./with-selector-DFVq3c2Y.js";
import "./filePreview-CGUDTTTP.js";
import "./filePath-SVkx1Fle.js";
import "./constants-BF9E3O0o.js";
import "./messageListItem-DqE378fB.js";
import "./useModel-kU1hKaYa.js";
import "./useProvider-DvntuFRN.js";
import "./capabilities-DNV_QUgI.js";
import "./useTopicStreamStatus-Be-jC8fI.js";
import "./useTimer-CtD1TRRj.js";
import "./cocoAgent-Dkf7ljK5.js";
import "./useAgent-9Zqveu03.js";
import "./tokenView-yvehtvx6.js";
import "./file-B-bjOfog.js";
import "./composerTokenPolicy-BR1gNZTA.js";
import "./BracesVariableIcon-zDcWRqre.js";
import "./FallbackFavicon-Cm9QCLm8.js";
import "./ImagePreviewService-B71uVdEp.js";
import "./__vite-browser-external-DlQ9XxoO.js";
import "./group-Cqj37oRb.js";
import "./knowledge-8Me8AnnG.js";
import "./agent-e68nHjCJ.js";
import "./ToolBlockGroup-DmvbWNSS.js";
import "./MessagePartsContext-Be-3g0sl.js";
import "./ScrollOwnershipContext-Cz9Tjpos.js";
import "./iconify-C6gOqm1j.js";
import "./SvgIcon-DI_kUaAV.js";
import "./CodeViewer-DvhZTSjd.js";
import "./CopyIcon-XfJhVEu-.js";
import "./useTemporaryValue-CJVn11gD.js";
import "./ImageViewer-B8XAqqwe.js";
import "./useMcpServer-BA8oDtqe.js";
import "./Link-0PkeiIUY.js";
import "./MarqueeText-DgzQ8dVh.js";
import "./composerAttachment-BB5cm1a7.js";
import "./citations-B4d_KMap.js";
import "./citation-BDKmyu_p.js";
import "./HtmlArtifactPopupContext-DpPKhD97.js";
import { a as MessageContent_default } from "./types-DmDsFD-i.js";
import "./composerTokens-Dtpcx_hI.js";
import "./useSmoothStream-DhnK2rGz.js";
import { t as MessageContentProvider } from "./MessageContentProvider-Dax83t0p.js";
import "./composerClipboard-DBhZr-TC.js";
import { n as useMessagePlatformActions, t as useMessageListRenderConfig } from "./useMessageListRenderConfig-Dkmh2sRx.js";
import { t as MessageErrorBoundary_default } from "./MessageErrorBoundary-t-KoPhx_.js";
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

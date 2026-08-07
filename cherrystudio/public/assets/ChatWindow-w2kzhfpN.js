import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-DgGhUgCT.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import "./Trans-gaWfeLk6.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./react-error-boundary-B3KJNPcX.js";
import "./es2015-DmjbZU9-.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import "./esm-Dju_3aAK.js";
import "./dist-CoUlMpOM.js";
import "./diff-HM2C_nqz.js";
import "./with-selector-BMhODuKS.js";
import "./lib-BGOUa2xQ.js";
import "./chunk-BO2N2NFS-tlJFVTTK.js";
import "./citations-B-nR2KVB.js";
import "./marked.esm-Dt1bmnBy.js";
import "./dist-CAn2sUiv.js";
import "./presets-DvKIcYCC.js";
import "./dist-Cu7DuZHc.js";
import "./dist-J1XnJP4k.js";
import "./katex-CRJeAHCa.js";
import "./src-BNJs7-l-.js";
import "./chunk-7R4GIKGN-CHXwpkSF.js";
import "./purify.es-Cmt93dJl.js";
import "./chunk-GEFDOKGD-B_rlJtFs.js";
import "./chunk-HHEYEP7N-B76yzjbd.js";
import "./chunk-XPW4576I-DHZ4kD6k.js";
import "./chunk-MX3YWQON-DlWEgeua.js";
import "./dist-CxgTYLYB.js";
import "./chunk-YBOYWFTD-D3-zQtJQ.js";
import "./chunk-PQ6SQG4A-BOmZ971H.js";
import "./chunk-PU5JKC2W-Cu-wUjZK.js";
import "./chunk-KYZI473N-Du-OPVjy.js";
import "./chunk-O4XLMI2P-DQGMYyCL.js";
import "./chunk-GLR3WWYH-BZcQpS2m.js";
import "./mermaid.core-BYrqrmUv.js";
import { a as MessageContent_default } from "./types-Dy5m-gs4.js";
import "./useCodeStyle-ZK5esKOR.js";
import "./useTheme-CbMe73se.js";
import "./shiki-pLteNJ2v.js";
import "./command-DJV4tTI9.js";
import "./command-lPk0rc3k.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import "./ErrorBoundary-BQINHMNg.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./model-CfoN7z8F.js";
import "./message-Bm3cYvp1.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DKTI9lZN.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import "./popup-BqV2ZD7D.js";
import "./mcp-BYi31fTn.js";
import "./label-B7fCsuWT.js";
import "./image-C_pRJZT2.js";
import "./uiParts-B-0xzcKJ.js";
import "./with-selector-DxfGCgh1.js";
import "./filePath-sjBm0dTI.js";
import "./MessagePartsContext-DyxIfSwn.js";
import "./useTimer-B4RsTlvl.js";
import "./CodeViewer-DGoFKh5Z.js";
import "./group-BHefE3H8.js";
import "./knowledge-CVZUSImo.js";
import "./transport-0repP7FI.js";
import "./CopyIcon-oeHf1okg.js";
import "./LoadingIcon-CmUpDics.js";
import "./constants-6yGJsnWx.js";
import "./useTopicStreamStatus-C4CQlzhh.js";
import "./useTemporaryValue-BuEAjgKO.js";
import "./markdown-it-CzjPjKWl.js";
import "./FileIcons-CqH_eal4.js";
import "./HtmlPreviewFrame-3dB4slDg.js";
import "./ActionTools-ecx3HpwU.js";
import "./ImagePreviewService-DviiwJKX.js";
import "./BracesVariableIcon-CdHFPcHW.js";
import "./file-DfGDXADI.js";
import "./tokenView-CYgh6TvB.js";
import "./composerTokenPolicy-DjR5UGdr.js";
import "./composerTokens-CbjE6w3w.js";
import "./__vite-browser-external-ppcTMhrd.js";
import "./iconify-B0P7PZ9i.js";
import "./MarqueeText-B_M_7Y8_.js";
import "./SvgIcon-C5HzxKyn.js";
import "./constants-CWj9dCYO.js";
import "./useMcpServer-Dfq1TPZN.js";
import "./useSmoothStream-D0-ar_q9.js";
import { t as MessageContentProvider } from "./MessageContentProvider-DMRrSdek.js";
import { n as useMessagePlatformActions, t as useMessageListRenderConfig } from "./useMessageListRenderConfig-DIvsn7eO.js";
import "./composerClipboard-CLOfQP5i.js";
import { t as MessageErrorBoundary_default } from "./MessageErrorBoundary-BKmkdMtU.js";
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

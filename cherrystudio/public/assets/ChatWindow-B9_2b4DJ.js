import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import "./Trans-gaWfeLk6.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
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
import "./chunk-BO2N2NFS-DyWf1fK6.js";
import "./citations-CtEFOa63.js";
import "./marked.esm-Dt1bmnBy.js";
import "./dist-CAn2sUiv.js";
import "./presets-qnWprlE7.js";
import "./dist-Cu7DuZHc.js";
import "./dist-D8jgvmz-.js";
import "./katex-CRJeAHCa.js";
import "./src-BNJs7-l-.js";
import "./chunk-7R4GIKGN-opF5h3Q7.js";
import "./purify.es-Cmt93dJl.js";
import "./chunk-GEFDOKGD-zw4Vf4TN.js";
import "./chunk-HHEYEP7N-Cb7lTrY6.js";
import "./chunk-XPW4576I-DHZ4kD6k.js";
import "./chunk-MX3YWQON-DlWEgeua.js";
import "./dist-CxgTYLYB.js";
import "./chunk-YBOYWFTD-Kki0wG0o.js";
import "./chunk-PQ6SQG4A-CzNZMsqR.js";
import "./chunk-PU5JKC2W-BGkxwWVA.js";
import "./chunk-KYZI473N-Bewh20wY.js";
import "./chunk-O4XLMI2P-D0X8v0R7.js";
import "./chunk-GLR3WWYH-BebQK3DK.js";
import "./mermaid.core-BQ2i8-2L.js";
import { a as MessageContent_default } from "./types-lkRYQzDt.js";
import "./useCodeStyle-ZK5esKOR.js";
import "./useTheme-C0NcZaKl.js";
import "./shiki-408EkuKH.js";
import "./command-DAltNKKn.js";
import "./command-Dkd9__0y.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import "./ErrorBoundary-BQINHMNg.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./model-CfoN7z8F.js";
import "./message-By01RpZa.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DsSiWKrR.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import "./popup-C0FVl5N5.js";
import "./mcp-UjkdK7II.js";
import "./label-CBJ9J2cR.js";
import "./image-Bb803VSe.js";
import "./uiParts-CtZmiNbl.js";
import "./with-selector-C8NQ8H_Y.js";
import "./filePath-CFBpohO3.js";
import "./MessagePartsContext-vl7JGECh.js";
import "./useTimer-Brbjkb3R.js";
import "./CodeViewer-J2JSI1xF.js";
import "./group-DOJrEsBN.js";
import "./knowledge-DMDRrLza.js";
import "./transport-CTTVYBal.js";
import "./CopyIcon-BUHlT94K.js";
import "./LoadingIcon-BvH4iKvM.js";
import "./constants-Dt2WGXqR.js";
import "./useTopicStreamStatus-C4wq2WGe.js";
import "./useTemporaryValue-B7uYRu1H.js";
import "./markdown-it-zV3ZRsvC.js";
import "./FileIcons-CrSykcp-.js";
import "./HtmlPreviewFrame-C3svF6ON.js";
import "./ActionTools-CMwyIh3s.js";
import "./ImagePreviewService-baJ3FtkL.js";
import "./BracesVariableIcon-YFiUNfgi.js";
import "./file-AcqqP-OX.js";
import "./tokenView-DU2XPw-v.js";
import "./composerTokenPolicy-DQDP2b_I.js";
import "./composerTokens-CFq729cv.js";
import "./__vite-browser-external-BDenMFlt.js";
import "./iconify-o-kjzozp.js";
import "./MarqueeText-DNBggU1n.js";
import "./SvgIcon-B-Xnig2J.js";
import "./constants-C567rLtO.js";
import "./useMcpServer-BD3_YKAo.js";
import "./useSmoothStream-aZ5yONxT.js";
import { t as MessageContentProvider } from "./MessageContentProvider-CbMqkpvy.js";
import { n as useMessagePlatformActions, t as useMessageListRenderConfig } from "./useMessageListRenderConfig-D9h5-y16.js";
import "./composerClipboard-q_YG-zvr.js";
import { t as MessageErrorBoundary_default } from "./MessageErrorBoundary-CL-lw4NO.js";
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

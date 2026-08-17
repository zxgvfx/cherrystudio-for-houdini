import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./es2015-CF8XujIC.js";
import "./esm-CEkDmnO2.js";
import "./dist-DErY0e6o.js";
import "./w3c-keyname-d7Yk5myI.js";
import "./diff-BkIMdlj4.js";
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
import "./CacheService-BxZWLQeF.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./toast-C6NqKFoQ.js";
import "./popup-BLG-Gue5.js";
import "./mcp-CN-pwFr9.js";
import "./systemProviderId-BF_COOhE.js";
import "./image-BfuhOMOH.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import "./toolOutput-CFeNIV-2.js";
import "./filePreview-Bzjo3HcD.js";
import "./filePath-CS1ffRfs.js";
import "./constants-C9ynPhpc.js";
import "./useTemporaryValue-kBhuEh30.js";
import "./MessagePartsContext-C8SysI78.js";
import "./__vite-browser-external-B6Ia6fcU.js";
import "./CodeViewer-DmsmcVO3.js";
import "./CopyIcon-CF5lW_xU.js";
import "./FileIcons-wNZ8T9U4.js";
import "./ActionTools-JAU7yZUH.js";
import "./ImagePreviewService-ClwFTW1F.js";
import "./LoadingIcon-DqeS8Wdh.js";
import "./group-BlMwbJVX.js";
import "./knowledge-Cnld5F6B.js";
import "./file-CVv-vzb2.js";
import "./agent-MQkn_hV_.js";
import "./ScrollOwnershipContext-B284g1nN.js";
import "./iconify-CuvVQaA6.js";
import "./SvgIcon-F_UZ4jj_.js";
import "./ImageViewer-BMsDhPpI.js";
import "./constants-2GuFd-Ua.js";
import { t as CodeBlock_default } from "./CodeBlock-B_DcgyDW.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function StandaloneHtmlArtifactRenderer({ artifact, block, inlineHtmlPreviewMode }) {
	const codeBlockProps = {
		blockId: block.id,
		className: "language-html",
		inlineHtmlPreviewMode,
		isStreaming: block.status === "streaming",
		children: artifact.html
	};
	if (artifact.source === "fence") codeBlockProps.node = { position: {
		start: artifact.start,
		end: artifact.start
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock_default, { ...codeBlockProps });
}
export { StandaloneHtmlArtifactRenderer as default };

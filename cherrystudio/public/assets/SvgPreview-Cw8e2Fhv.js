import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./es2015-CF8XujIC.js";
import "./purify.es-BrXIkv5K.js";
import "./useTheme-CkJQYl0u.js";
import "./ipc-BuGMWdaI.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./toast-C6NqKFoQ.js";
import "./popup-BLG-Gue5.js";
import "./image-BfuhOMOH.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-WIYamDGJ.js";
import "./ActionTools-JAU7yZUH.js";
import "./ImagePreviewService-ClwFTW1F.js";
import "./LoadingIcon-DqeS8Wdh.js";
import "./ResetIcon-B4tdEEWT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SvgPreview = ({ children, enableToolbar = false, className, ref }) => {
	const { containerRef, error, isLoading } = useDebouncedRender(children, (0, import_react.useCallback)(async (content, container) => {
		renderSvgInShadowHost(content, container);
	}, []), { debounceDelay: 300 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewLayout_default, {
		loading: isLoading,
		error,
		enableToolbar,
		ref,
		imageRef: containerRef,
		source: "svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadowTransparentContainer, {
			ref: containerRef,
			className: className ?? "svg-preview special-preview"
		})
	});
};
var SvgPreview_default = (0, import_react.memo)(SvgPreview);
export { SvgPreview_default as default };

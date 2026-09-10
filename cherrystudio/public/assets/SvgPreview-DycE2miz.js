import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./es2015-wfS3L7va.js";
import "./purify.es-RDRNldMc.js";
import "./useTheme-mM6gKAcD.js";
import "./ipc-DpcwPFwy.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./toast-D2efAzAF.js";
import "./popup-fJcKiA2S.js";
import "./image-DyuN5EBc.js";
import "./ImagePreviewService-B71uVdEp.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-Bmb3FmSZ.js";
import "./ActionTools-Buww6P9E.js";
import "./LoadingIcon-CDdNXnOv.js";
import "./ResetIcon-DgMgoLHf.js";
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

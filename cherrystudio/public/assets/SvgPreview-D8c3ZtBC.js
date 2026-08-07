import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./es2015-DmjbZU9-.js";
import "./purify.es-Cmt93dJl.js";
import "./useTheme-CbMe73se.js";
import "./ipc-BDTAufGC.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./toast-DKTI9lZN.js";
import "./popup-BqV2ZD7D.js";
import "./image-C_pRJZT2.js";
import "./ResetIcon-kMtS8h06.js";
import "./LoadingIcon-CmUpDics.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-B0nOeIAi.js";
import "./ActionTools-ecx3HpwU.js";
import "./ImagePreviewService-DviiwJKX.js";
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

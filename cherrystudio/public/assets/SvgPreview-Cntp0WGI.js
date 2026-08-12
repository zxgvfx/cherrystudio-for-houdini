import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./es2015-DmjbZU9-.js";
import "./purify.es-Cmt93dJl.js";
import "./useTheme-C0NcZaKl.js";
import "./ipc-BDTAufGC.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./toast-DsSiWKrR.js";
import "./popup-C0FVl5N5.js";
import "./image-Bb803VSe.js";
import "./ResetIcon-BOagnZ9e.js";
import "./LoadingIcon-BvH4iKvM.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-uuJ37es4.js";
import "./ActionTools-CMwyIh3s.js";
import "./ImagePreviewService-baJ3FtkL.js";
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

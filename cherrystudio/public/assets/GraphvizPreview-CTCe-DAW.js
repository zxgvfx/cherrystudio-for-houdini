import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as AsyncInitializer } from "./asyncInitializer-DlV1NBgp.js";
import { a as useDebouncedRender, i as ShadowWhiteContainer, n as ImagePreviewLayout_default, t as renderSvgInShadowHost } from "./utils-WIYamDGJ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var vizInitializer = new AsyncInitializer(async () => {
	return await (await __vitePreload(() => import("./viz-m6SylQth.js"), [], import.meta.url)).instance();
});
var GraphvizPreview = ({ children, enableToolbar = false, ref }) => {
	const { containerRef, error, isLoading } = useDebouncedRender(children, (0, import_react.useCallback)(async (content, container) => {
		renderSvgInShadowHost((await vizInitializer.get()).renderString(content, { format: "svg" }), container);
	}, []), { debounceDelay: 300 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewLayout_default, {
		loading: isLoading,
		error,
		enableToolbar,
		ref,
		imageRef: containerRef,
		source: "graphviz",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadowWhiteContainer, {
			ref: containerRef,
			className: "graphviz special-preview"
		})
	});
};
var GraphvizPreview_default = (0, import_react.memo)(GraphvizPreview);
export { GraphvizPreview_default as t };

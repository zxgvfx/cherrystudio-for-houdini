import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PIPELINE_UI_PATH = "/plugins-ui/ai-pipeline-bridge/";
function AiPipelinePage() {
	const src = (0, import_react.useMemo)(() => {
		return `${window.__CHERRY_BACKEND_URL?.replace(/\/$/, "") || window.location.origin}${PIPELINE_UI_PATH}`;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ai-pipeline.page",
		className: "flex h-full min-h-0 w-full flex-1 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: "AI Pipeline",
			src,
			className: "h-full min-h-0 w-full flex-1 border-0 bg-background",
			allow: "clipboard-read; clipboard-write; fullscreen"
		})
	});
}
var SplitComponent = AiPipelinePage;
export { SplitComponent as component };

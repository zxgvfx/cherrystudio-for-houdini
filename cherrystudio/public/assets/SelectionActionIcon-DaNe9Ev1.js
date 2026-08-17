const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DynamicSelectionActionIcon-CuUvki9a.js","./DynamicIcon-SiB3_sqE.js","./preload-helper-DXC6tWlX.js","./Icon-C_BHijq2.js","./react-DXAbXv4a.js","./rolldown-runtime-BeJLVFtF.js","./jsx-runtime-DZOd5Dcc.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as ClipboardCopy } from "./clipboard-copy-lv7tQqrz.js";
import { t as FileQuestionMark } from "./file-question-mark-mTPwo8L4.js";
import { t as Languages } from "./languages-DkZL7zij.js";
import { t as Quote } from "./quote-CibDmRbt.js";
import { t as ScanText } from "./scan-text-rxwPxkxP.js";
import { t as Search } from "./search-Dz0ktO-n.js";
import { t as WandSparkles } from "./wand-sparkles-BVz1ge7Z.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DynamicSelectionActionIcon = (0, import_react.lazy)(() => __vitePreload(() => import("./DynamicSelectionActionIcon-CuUvki9a.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url));
var BUILT_IN_SELECTION_ACTION_ICONS = {
	"clipboard-copy": ClipboardCopy,
	"file-question": FileQuestionMark,
	languages: Languages,
	quote: Quote,
	"scan-text": ScanText,
	search: Search,
	"wand-sparkles": WandSparkles
};
var SelectionActionIcon = ({ fallback, name, ...props }) => {
	const BuiltInIcon = name ? BUILT_IN_SELECTION_ACTION_ICONS[name] : void 0;
	if (BuiltInIcon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltInIcon, { ...props });
	if (!name) return fallback?.() ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: fallback?.() ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicSelectionActionIcon, {
			fallback,
			name,
			...props
		})
	});
};
var SelectionActionIcon_default = SelectionActionIcon;
export { SelectionActionIcon_default as t };

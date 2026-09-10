const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DynamicSelectionActionIcon-BQ87jBIb.js","./DynamicIcon-DoKdRweu.js","./preload-helper-Cs2ugBNd.js","./Icon-ChXzzEWu.js","./react-C1DTAr29.js","./rolldown-runtime-D8OvLAZx.js","./jsx-runtime-Cc0-uZGc.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as ClipboardCopy } from "./clipboard-copy-BrT4z4S8.js";
import { t as FileQuestionMark } from "./file-question-mark-C75geVg6.js";
import { t as Languages } from "./languages-87sqoPNM.js";
import { t as Quote } from "./quote-6GdCuaJb.js";
import { t as ScanText } from "./scan-text-Bfo8uCw3.js";
import { t as Search } from "./search-CafLf998.js";
import { t as WandSparkles } from "./wand-sparkles-DCkrkIda.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DynamicSelectionActionIcon = (0, import_react.lazy)(() => __vitePreload(() => import("./DynamicSelectionActionIcon-BQ87jBIb.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url));
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

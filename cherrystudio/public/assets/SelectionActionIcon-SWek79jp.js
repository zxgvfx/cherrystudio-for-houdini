const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DynamicSelectionActionIcon-CalFaZma.js","./DynamicIcon-Bfrkw4A4.js","./preload-helper-BAxOQgJR.js","./Icon-C4T_C224.js","./react-BgPOU4At.js","./chunk-DiqNceaa.js","./jsx-runtime-DCB_IiL2.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as ClipboardCopy } from "./clipboard-copy-D7Zq_FX0.js";
import { t as FileQuestionMark } from "./file-question-mark-CEHETqsE.js";
import { t as Languages } from "./languages-BOYrlzfC.js";
import { t as Quote } from "./quote-xTb_WB7z.js";
import { t as ScanText } from "./scan-text-Bt66H4NG.js";
import { t as Search } from "./search-CQaFGVmj.js";
import { t as WandSparkles } from "./wand-sparkles-C5ZtmWIA.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DynamicSelectionActionIcon = (0, import_react.lazy)(() => __vitePreload(() => import("./DynamicSelectionActionIcon-CalFaZma.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url));
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

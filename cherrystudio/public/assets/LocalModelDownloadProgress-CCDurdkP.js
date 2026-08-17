import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const LocalModelDownloadProgress = ({ percent, className }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.local-model-download-progress",
		className: cn("space-y-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-primary transition-all",
				style: { width: `${percent}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-muted-foreground text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.dependencies.localModels.status.downloading") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [percent, "%"] })]
		})]
	});
};
export { LocalModelDownloadProgress as t };

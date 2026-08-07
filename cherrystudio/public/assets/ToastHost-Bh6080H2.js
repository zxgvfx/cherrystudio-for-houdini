import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as ToastViewport } from "./toast-DfLEw4mF.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ToastHost() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, { labels: (0, import_react.useMemo)(() => ({
		close: t("common.close"),
		error: t("common.error"),
		errorDescription: t("error.unknown"),
		loading: t("common.loading"),
		success: t("common.success")
	}), [t]) });
}
export { ToastHost as t };

import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as m } from "./react-error-boundary-B3KJNPcX.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as formatErrorDetails } from "./errorDetails-CsrPCSVK.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("ErrorBoundary");
var DefaultFallback = (props) => {
	const { t } = useTranslation();
	const { error } = props;
	const debug = async () => {
		await ipcApi.request("system.toggle_dev_tools");
	};
	const reload = async () => {
		await ipcApi.request("window.main.reload");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.default-fallback",
		className: "flex w-full items-center justify-center p-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
			message: t("error.boundary.default.message"),
			showIcon: true,
			description: formatErrorDetails(error),
			type: "error",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: debug,
					children: t("error.boundary.default.devtools")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: reload,
					children: t("error.boundary.default.reload")
				})]
			})
		})
	});
};
var ErrorBoundaryCustomized = ({ children, fallbackComponent, onError }) => {
	const handleError = (error, info) => {
		logger.error("Caught a render error", error);
		onError?.(error, info);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {
		FallbackComponent: fallbackComponent ?? DefaultFallback,
		onError: handleError,
		children
	});
};
export { ErrorBoundaryCustomized as t };

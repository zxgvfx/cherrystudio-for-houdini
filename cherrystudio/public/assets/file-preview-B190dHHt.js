import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./react-error-boundary-1QFJEaxP.js";
import { t as EmptyState } from "./empty-state-C_9tC-cn.js";
import "./ipc-BuGMWdaI.js";
import { o as useCurrentTab } from "./tab-BIOOjV6R.js";
import "./useWindowInitData-nzW1IbOc.js";
import "./mainWindowNavigation-BoKv8CTA.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./toast-C6NqKFoQ.js";
import { t as FileX2 } from "./file-x-2-BeaOQ_Pc.js";
import "./with-selector-DOSXj2wE.js";
import { t as Route } from "./file-preview-ZToTfrn2.js";
import { r as getFilePreviewRefreshKey } from "./filePreview-Bzjo3HcD.js";
import "./FilePreviewLayout-CwTr3bPn.js";
import "./FilePreviewToolbar-B4BS_Cd8.js";
import "./FilePreviewToolbarButton-D2NN1_DC.js";
import "./safeOpen-DGU5v2Xg.js";
import { t as FilePreview } from "./FilePreview-CDXNRwka.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FilePreviewPage({ filePath }) {
	const { t } = useTranslation();
	const refreshKey = getFilePreviewRefreshKey(useCurrentTab()?.metadata);
	if (filePath) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreview, {
		filePath,
		refreshKey
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "file-preview.page",
		className: "flex h-full min-h-0 w-full bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileX2,
			title: t("file_preview.invalid_path.title"),
			description: t("file_preview.invalid_path.description"),
			className: "h-full"
		})
	});
}
function FilePreviewRoute() {
	const { path } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewPage, { filePath: path });
}
export { FilePreviewRoute as component };

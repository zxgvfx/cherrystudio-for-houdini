import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./react-error-boundary-CnvE_Ln4.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import "./ipc-DpcwPFwy.js";
import { o as useCurrentTab } from "./tab-CVOgL8bf.js";
import "./useWindowInitData-BzKs7Qq9.js";
import "./mainWindowNavigation-Dpzd_Ttr.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./toast-D2efAzAF.js";
import { t as FileX2 } from "./file-x-2-Dj-hGZMg.js";
import "./with-selector-DFVq3c2Y.js";
import { t as Route } from "./file-preview-weVlIB04.js";
import { r as getFilePreviewRefreshKey } from "./filePreview-CGUDTTTP.js";
import "./FilePreviewLayout-luXf9AC0.js";
import "./FilePreviewToolbar-DXhEtJV1.js";
import "./FilePreviewToolbarButton-CGx3ExsV.js";
import "./safeOpen-Bi1Ifzr9.js";
import { t as FilePreview } from "./FilePreview-BEX76iC8.js";
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

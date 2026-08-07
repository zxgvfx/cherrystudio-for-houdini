import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./react-error-boundary-B3KJNPcX.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import "./ipc-BDTAufGC.js";
import { o as useCurrentTab } from "./tab-CbOwJVjs.js";
import "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-DwBoGlJ5.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./toast-DKTI9lZN.js";
import { t as FileX2 } from "./file-x-2-w4DLkOkc.js";
import { t as Route } from "./file-preview-CXMxAJvf.js";
import "./with-selector-DxfGCgh1.js";
import { r as getFilePreviewRefreshKey } from "./filePreview-DwIS9Jdg.js";
import "./FilePreviewLayout-B1WTzID2.js";
import "./FilePreviewToolbar-CQBIVGt4.js";
import "./safeOpen-C84okA1J.js";
import { t as FilePreview } from "./FilePreview-D7XQyIiB.js";
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

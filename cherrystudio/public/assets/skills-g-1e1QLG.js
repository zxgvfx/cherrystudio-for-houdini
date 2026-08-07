import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-DgGhUgCT.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import "./with-selector-BMhODuKS.js";
import "./command-DJV4tTI9.js";
import "./command-lPk0rc3k.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DKTI9lZN.js";
import { f as SettingsContentBody } from "./SettingsPrimitives-CkQSNa69.js";
import "./group-BHefE3H8.js";
import "./resourceCatalog-CcJqFkk2.js";
import "./agent-xClAvhQf.js";
import "./CreateGroupDialog-3niOED_u.js";
import "./AssistantLibraryDialog-BvuuDnPh.js";
import "./useBundledCatalog-CcTXvQ32.js";
import { t as ResourceCatalogView } from "./catalog-TLPWXCAN.js";
import "./CollapsibleSearchBar-D2pmgs6x.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function SkillsSettings() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentBody, {
		className: "min-h-0 flex-1 overflow-hidden pt-4",
		innerClassName: "flex min-h-0 flex-1 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceCatalogView, {
			resourceType: "skill",
			variant: "settings",
			title: t("settings.skills.title"),
			className: "min-h-0 flex-1"
		})
	});
}
var SplitComponent = SkillsSettings;
export { SplitComponent as component };

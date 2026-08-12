import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import "./with-selector-BMhODuKS.js";
import "./command-DAltNKKn.js";
import "./command-Dkd9__0y.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import "./ipc-BDTAufGC.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DsSiWKrR.js";
import { f as SettingsContentBody } from "./SettingsPrimitives-aatUlttR.js";
import "./group-DOJrEsBN.js";
import "./resourceCatalog-Bd6dsVEl.js";
import "./agent-BnqSANST.js";
import "./CreateGroupDialog-BBFEzR8V.js";
import "./AssistantLibraryDialog-BD-Qn73T.js";
import "./useBundledCatalog-B1h8EHfw.js";
import { t as ResourceCatalogView } from "./catalog-alO3btDF.js";
import "./CollapsibleSearchBar-DLl-gKIk.js";
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

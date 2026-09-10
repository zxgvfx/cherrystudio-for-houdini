import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./es2015-wfS3L7va.js";
import "./with-selector-DlsRhNV6.js";
import "./command-CyHQabGE.js";
import "./command-B9oiyMDG.js";
import "./useCloseBeforeAction-DvYaYpLC.js";
import "./ipc-DpcwPFwy.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./toast-D2efAzAF.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./cocoAgent-Dkf7ljK5.js";
import "./useSkills-Be92aMP5.js";
import "./group-Cqj37oRb.js";
import "./resourceCatalog-BJgI2SG2.js";
import "./contextSettings-CKgBWQdg.js";
import "./agent-IxO6TDCv.js";
import "./CreateGroupDialog-pRoHlnCL.js";
import "./time-BzKBmfSx.js";
import "./AssistantLibraryDialog-B7L_Hz70.js";
import "./useBundledCatalog-Dq3D47-y.js";
import { t as ResourceCatalogView } from "./catalog-CuXkWE-T.js";
import "./CollapsibleSearchBar-C4HcfF9B.js";
import { f as SettingsContentBody } from "./SettingsPrimitives-DyPgPdGs.js";
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

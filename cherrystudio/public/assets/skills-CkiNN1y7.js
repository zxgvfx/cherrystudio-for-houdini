import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./es2015-CF8XujIC.js";
import "./with-selector-YZwnb76j.js";
import "./command-DJ8bdie_.js";
import "./command-CtEyUhIg.js";
import "./useCloseBeforeAction-COmv5C7_.js";
import "./ipc-BuGMWdaI.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./toast-C6NqKFoQ.js";
import "./systemProviderId-BF_COOhE.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import "./group-BlMwbJVX.js";
import "./resourceCatalog-orFaFf1i.js";
import "./contextSettings-o-HhNfTW.js";
import "./agent-CC-UrJwb.js";
import "./CreateGroupDialog-Duq04zpy.js";
import "./time-olEmBooB.js";
import "./AssistantLibraryDialog-Dw3shhY0.js";
import "./useBundledCatalog-BHgXiRER.js";
import { t as ResourceCatalogView } from "./catalog-D3hopRIj.js";
import "./CollapsibleSearchBar-kRR43YXv.js";
import { f as SettingsContentBody } from "./SettingsPrimitives-ctf-2wxz.js";
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

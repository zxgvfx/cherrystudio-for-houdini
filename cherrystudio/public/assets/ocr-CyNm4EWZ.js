import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./es2015-CF8XujIC.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import "./ipc-BuGMWdaI.js";
import "./file-BaEpIJyZ.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./toast-C6NqKFoQ.js";
import "./popup-BLG-Gue5.js";
import "./systemProviderId-BF_COOhE.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import "./constants-C9ynPhpc.js";
import "./useModel-DWj6Qb5f.js";
import "./translate-BOBQuPLK.js";
import "./MessagePartsContext-C8SysI78.js";
import "./Scrollbar-DJ9MDpuH.js";
import "./api-DfMNwFwi.js";
import "./EditIcon-CarMu02a.js";
import { i as useAvailableFileProcessors } from "./FileProcessorIcon-Dwebge57.js";
import "./LocalModelDownloadProgress-CCDurdkP.js";
import "./useLocalModel-bAMJrtvW.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-ctf-2wxz.js";
import { n as ProcessorPanel, r as getFeatureSections, t as useFileProcessingPreferences } from "./useFileProcessingPreferences-Dy0hH9pe.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_MENU_ENTRIES = [];
var OcrSettings = () => {
	const { t } = useTranslation();
	const { theme: themeMode } = useTheme();
	const { defaultImageProcessor, processors, setApiKeys, setCapabilityField, setDefaultProcessor, setLanguageOptions } = useFileProcessingPreferences();
	const availableProcessors = useAvailableFileProcessors();
	const visibleProcessorIds = (0, import_react.useMemo)(() => availableProcessors.status === "ready" || !defaultImageProcessor ? availableProcessors.processorIds : new Set([defaultImageProcessor]), [
		availableProcessors.processorIds,
		availableProcessors.status,
		defaultImageProcessor
	]);
	const menuEntries = (0, import_react.useMemo)(() => getFeatureSections(processors, visibleProcessorIds).find((section) => section.feature === "image_to_text")?.entries ?? EMPTY_MENU_ENTRIES, [processors, visibleProcessorIds]);
	const [activeKey, setActiveKey] = (0, import_react.useState)(() => menuEntries.find((entry) => entry.processor.id === defaultImageProcessor)?.key ?? menuEntries[0]?.key ?? "");
	(0, import_react.useEffect)(() => {
		setActiveKey(menuEntries.find((entry) => entry.processor.id === defaultImageProcessor)?.key ?? menuEntries[0]?.key ?? "");
	}, [defaultImageProcessor, menuEntries]);
	const activeEntry = menuEntries.find((entry) => entry.key === activeKey) ?? menuEntries[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
		theme: themeMode,
		children: activeEntry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessorPanel, {
			entry: activeEntry,
			entries: menuEntries,
			selectionDisabled: availableProcessors.status !== "ready",
			onSelectEntry: (entry) => setActiveKey(entry.key),
			onSetApiKeys: setApiKeys,
			onSetCapabilityField: setCapabilityField,
			onSetDefaultProcessor: setDefaultProcessor,
			onSetLanguageOptions: setLanguageOptions
		}) : availableProcessors.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full min-h-55 items-center justify-center text-foreground-tertiary text-sm",
			children: t("settings.tool.file_processing.errors.load_processors_failed")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full min-h-55 items-center justify-center text-foreground-tertiary text-sm",
			children: t("common.no_results")
		})
	});
};
var SplitComponent = OcrSettings;
export { SplitComponent as component };

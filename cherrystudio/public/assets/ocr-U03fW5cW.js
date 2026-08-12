import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import "./ipc-BDTAufGC.js";
import "./file-KsLXrn8b.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DsSiWKrR.js";
import "./popup-C0FVl5N5.js";
import "./useModel-wPmUe3o8.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-aatUlttR.js";
import "./translate-piZrmqIV.js";
import "./model-Z1svQByC.js";
import "./MessagePartsContext-vl7JGECh.js";
import "./api-CXvQpDj3.js";
import "./Scrollbar-CJJ8_OkK.js";
import "./EditIcon-DyUHpcDD.js";
import "./fileProcessing-DD904-PM.js";
import { i as getFeatureSections, n as useAvailableFileProcessors, r as ProcessorPanel, t as useFileProcessingPreferences } from "./useFileProcessingPreferences-DknkBkxU.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_MENU_ENTRIES = [];
var OcrSettings = () => {
	const { t } = useTranslation();
	const { theme: themeMode } = useTheme();
	const { defaultImageProcessor, processors, setApiKeys, setCapabilityField, setDefaultProcessor, setLanguageOptions } = useFileProcessingPreferences();
	const availableProcessors = useAvailableFileProcessors();
	const menuEntries = (0, import_react.useMemo)(() => getFeatureSections(processors, availableProcessors.processorIds).find((section) => section.feature === "image_to_text")?.entries ?? EMPTY_MENU_ENTRIES, [availableProcessors.processorIds, processors]);
	const [activeKey, setActiveKey] = (0, import_react.useState)(() => menuEntries.find((entry) => entry.processor.id === defaultImageProcessor)?.key ?? menuEntries[0]?.key ?? "");
	(0, import_react.useEffect)(() => {
		setActiveKey(menuEntries.find((entry) => entry.processor.id === defaultImageProcessor)?.key ?? menuEntries[0]?.key ?? "");
	}, [defaultImageProcessor, menuEntries]);
	const activeEntry = menuEntries.find((entry) => entry.key === activeKey) ?? menuEntries[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
		theme: themeMode,
		children: availableProcessors.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full min-h-55 items-center justify-center text-foreground-tertiary text-sm",
			children: t("settings.tool.file_processing.errors.load_processors_failed")
		}) : activeEntry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessorPanel, {
			entry: activeEntry,
			entries: menuEntries,
			onSelectEntry: (entry) => setActiveKey(entry.key),
			onSetApiKeys: setApiKeys,
			onSetCapabilityField: setCapabilityField,
			onSetDefaultProcessor: setDefaultProcessor,
			onSetLanguageOptions: setLanguageOptions
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full min-h-55 items-center justify-center text-foreground-tertiary text-sm",
			children: t("common.no_results")
		})
	});
};
var SplitComponent = OcrSettings;
export { SplitComponent as component };

import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-DgGhUgCT.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
import "./ipc-BDTAufGC.js";
import "./file-KsLXrn8b.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DKTI9lZN.js";
import "./popup-BqV2ZD7D.js";
import "./useModel-CIp4kGrE.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-CkQSNa69.js";
import "./translate-BT2b0DN0.js";
import "./model-D4kd6G9w.js";
import "./MessagePartsContext-DyxIfSwn.js";
import "./api-BxGlwl7U.js";
import "./Scrollbar-CRo8NoWr.js";
import "./EditIcon-5uYqh3lm.js";
import "./fileProcessing-CxJjkmXE.js";
import { i as getFeatureSections, n as useAvailableFileProcessors, r as ProcessorPanel, t as useFileProcessingPreferences } from "./useFileProcessingPreferences-MiImL28T.js";
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

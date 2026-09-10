import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./es2015-wfS3L7va.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import "./ipc-DpcwPFwy.js";
import "./file-OKCzlHoD.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./toast-D2efAzAF.js";
import "./popup-fJcKiA2S.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./constants-BF9E3O0o.js";
import "./useModel-kU1hKaYa.js";
import "./MessagePartsContext-Be-3g0sl.js";
import "./Scrollbar-CjwT5bYS.js";
import "./translate-Bffouxb4.js";
import "./api-BXzzMAT7.js";
import "./EditIcon-CYKHpxsO.js";
import { i as useAvailableFileProcessors } from "./FileProcessorIcon-4NRHkLyb.js";
import "./LocalModelDownloadProgress-CvZiSVaT.js";
import "./useLocalModel-Bvd9zJkF.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-DyPgPdGs.js";
import { n as ProcessorPanel, r as getFeatureSections, t as useFileProcessingPreferences } from "./useFileProcessingPreferences-DrQq8N_6.js";
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

import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as editable_number_default } from "./editable-number-BW2PhG4b.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import "./mcp-BGt1L-d_.js";
import "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import { n as useProvider } from "./useProvider-DvntuFRN.js";
import "./Scrollbar-CjwT5bYS.js";
import { a as ProviderSettingsSubtitle, n as ProviderHelpText, r as ProviderHelpTextRow } from "./ProviderSettingsPrimitives-C82JUgBE.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("LmStudioSettings");
var LmStudioSettings = ({ providerId }) => {
	const { provider, updateProvider } = useProvider(providerId);
	const { t } = useTranslation();
	const keepAliveTime = provider?.settings?.keepAliveTime ?? 0;
	const [keepAliveMinutes, setKeepAliveMinutes] = (0, import_react.useState)(keepAliveTime);
	(0, import_react.useEffect)(() => {
		setKeepAliveMinutes(provider?.settings?.keepAliveTime ?? 0);
	}, [provider?.settings?.keepAliveTime]);
	const handleBlur = async () => {
		if (keepAliveMinutes === keepAliveTime) return;
		try {
			await updateProvider({ providerSettings: {
				...provider?.settings,
				keepAliveTime: keepAliveMinutes
			} });
		} catch (error) {
			logger.error("Failed to save LM Studio keep alive time", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			setKeepAliveMinutes(keepAliveTime);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.lm-studio-settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mb-1",
				children: t("lmstudio.keep_alive_time.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full [&>div]:block [&>div]:w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
					value: keepAliveMinutes,
					min: 0,
					step: 5,
					suffix: t("lmstudio.keep_alive_time.placeholder"),
					align: "start",
					changeOnBlur: false,
					onChange: (v) => setKeepAliveMinutes(Math.floor(Number(v ?? 0))),
					onBlur: () => {
						handleBlur();
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("lmstudio.keep_alive_time.description") }) })
		]
	});
};
var LmStudioSettings_default = LmStudioSettings;
export { LmStudioSettings_default as default };

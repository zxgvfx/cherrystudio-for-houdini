import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as editable_number_default } from "./editable-number-D7QKYOIb.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { n as useProvider } from "./useProvider-DFQPidMA.js";
import "./Scrollbar-DJ9MDpuH.js";
import { a as ProviderSettingsSubtitle, n as ProviderHelpText, r as ProviderHelpTextRow } from "./ProviderSettingsPrimitives-CY4ckszT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("GpuStackSettings");
var GpuStackSettings = ({ providerId }) => {
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
			logger.error("Failed to save GPUStack keep alive time", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			setKeepAliveMinutes(keepAliveTime);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.gpu-stack-settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mb-1",
				children: t("gpustack.keep_alive_time.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full [&>div]:block [&>div]:w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editable_number_default, {
					value: keepAliveMinutes,
					min: 0,
					step: 5,
					suffix: t("gpustack.keep_alive_time.placeholder"),
					align: "start",
					changeOnBlur: false,
					onChange: (v) => setKeepAliveMinutes(Number(v ?? 0)),
					onBlur: () => {
						handleBlur();
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("gpustack.keep_alive_time.description") }) })
		]
	});
};
var GpuStackSettings_default = GpuStackSettings;
export { GpuStackSettings_default as default };

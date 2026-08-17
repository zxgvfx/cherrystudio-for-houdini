import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-DDbGMM0m.js";
import { t as Label } from "./label-BOwZlTgC.js";
import "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./provider-B43PumwQ.js";
import { n as useProvider } from "./useProvider-DFQPidMA.js";
import { t as DmxapiIcon } from "./dmxapi-BUGTL__9.js";
import "./Scrollbar-DJ9MDpuH.js";
import "./providerSettings-HvlvfaC_.js";
import { a as ProviderSettingsSubtitle } from "./ProviderSettingsPrimitives-CY4ckszT.js";
import { i as replaceEndpointConfigDomain } from "./providerDisplay-JluXrNn1.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PlatformDomain = /* @__PURE__ */ function(PlatformDomain$1) {
	PlatformDomain$1["OFFICIAL"] = "www.DMXAPI.cn";
	PlatformDomain$1["INTERNATIONAL"] = "www.DMXAPI.com";
	PlatformDomain$1["OVERSEA"] = "ssvip.DMXAPI.com";
	return PlatformDomain$1;
}(PlatformDomain || {});
function resolveDmxPlatformFromProvider(provider) {
	if (!provider?.endpointConfigs) return PlatformDomain.OFFICIAL;
	const firstUrl = Object.values(provider.endpointConfigs)[0]?.baseUrl;
	if (!firstUrl) return PlatformDomain.OFFICIAL;
	if (firstUrl.includes("DMXAPI.com") || firstUrl.includes("dmxapi.com")) return firstUrl.includes("ssvip") ? PlatformDomain.OVERSEA : PlatformDomain.INTERNATIONAL;
	return PlatformDomain.OFFICIAL;
}
var DmxapiSettings = ({ providerId }) => {
	const { provider, updateProvider } = useProvider(providerId);
	const { t } = useTranslation();
	const PlatformOptions = [
		{
			label: t("settings.provider.dmxapi.platform_official"),
			value: PlatformDomain.OFFICIAL,
			apiKeyWebsite: "https://www.dmxapi.cn/register?aff=bwwY"
		},
		{
			label: t("settings.provider.dmxapi.platform_international"),
			value: PlatformDomain.INTERNATIONAL,
			apiKeyWebsite: "https://www.dmxapi.com/register"
		},
		{
			label: t("settings.provider.dmxapi.platform_enterprise"),
			value: PlatformDomain.OVERSEA,
			apiKeyWebsite: "https://ssvip.dmxapi.com/register"
		}
	];
	const [selectedPlatform, setSelectedPlatform] = (0, import_react.useState)(() => resolveDmxPlatformFromProvider(provider));
	(0, import_react.useEffect)(() => {
		setSelectedPlatform(resolveDmxPlatformFromProvider(provider));
	}, [provider]);
	const handlePlatformChange = (0, import_react.useCallback)(async (domain) => {
		const next = domain;
		const previous = resolveDmxPlatformFromProvider(provider);
		if (next === previous) return;
		setSelectedPlatform(next);
		const newEndpointConfigs = replaceEndpointConfigDomain(provider?.endpointConfigs, next);
		try {
			await updateProvider({ endpointConfigs: newEndpointConfigs });
		} catch {
			setSelectedPlatform(previous);
			toast.error(t("settings.provider.save_failed"));
		}
	}, [
		provider,
		t,
		updateProvider
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.dmxapi-settings",
		className: "mt-4 mb-7.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-7.5 flex flex-col items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DmxapiIcon, {
				height: 70,
				width: "auto"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-1.5",
				children: t("settings.provider.dmxapi.select_platform")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
				className: "flex w-full flex-col gap-2",
				value: selectedPlatform,
				onValueChange: (v) => {
					handlePlatformChange(v);
				},
				children: PlatformOptions.map((option) => {
					const id = `dmx-platform-${option.value}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: option.value,
							id,
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: id,
							className: "max-w-full cursor-pointer font-normal leading-snug",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								option.label,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: option.apiKeyWebsite,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-link",
									children: [
										"(",
										t("settings.provider.get_api_key"),
										")"
									]
								})
							] })
						})]
					}, option.value);
				})
			})]
		})]
	});
};
var DmxapiSettings_default = DmxapiSettings;
export { DmxapiSettings_default as default };

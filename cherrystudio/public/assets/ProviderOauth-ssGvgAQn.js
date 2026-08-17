import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import { t as Trans } from "./Trans-2RhWYf-S.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { a as RowFlex } from "./flex-Cbul8ND0.js";
import "./ipc-BuGMWdaI.js";
import "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as CircleDollarSign } from "./circle-dollar-sign-D3fusNT1.js";
import { t as ReceiptText } from "./receipt-text-BqPeLdRy.js";
import { t as useIcon } from "./use-icon-u7Wb-l1f.js";
import { a as resolveProviderIconRef } from "./registry-u6zu0ArP.js";
import "./mcp-CN-pwFr9.js";
import { o as getProviderLabelKey } from "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { r as hasApiKeys } from "./provider-B43PumwQ.js";
import { n as useProvider } from "./useProvider-DFQPidMA.js";
import "./Scrollbar-DJ9MDpuH.js";
import { p as oauthCardClasses } from "./ProviderSettingsPrimitives-CY4ckszT.js";
import { a as oauthWithPPIO, c as providerCharge, n as oauthWithAiOnly, o as oauthWithSiliconFlow, r as oauthWithAihubmix, s as providerBills, t as oauthWith302AI } from "./oauth-B5gvYUtp.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var API_KEY_OAUTH_LAUNCHERS = {
	silicon: oauthWithSiliconFlow,
	aihubmix: oauthWithAihubmix,
	ppio: oauthWithPPIO,
	"302ai": oauthWith302AI,
	aionly: oauthWithAiOnly
};
var OauthButton = ({ provider, onSuccess, ...buttonProps }) => {
	const { t } = useTranslation();
	const onAuth = () => {
		const handleSuccess = (key) => {
			if (key.trim()) {
				onSuccess?.(key);
				toast.success(t("auth.get_key_success"));
			}
		};
		API_KEY_OAUTH_LAUNCHERS[provider.id]?.(handleSuccess);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		onClick: onAuth,
		className: "rounded-full",
		...buttonProps,
		children: t("settings.provider.oauth.button", { provider: t(getProviderLabelKey(provider.id)) })
	});
};
var OauthButton_default = OauthButton;
var ProviderOauth = ({ providerId }) => {
	const { t } = useTranslation();
	const { provider, updateProvider, addApiKey } = useProvider(providerId);
	const Icon = useIcon(resolveProviderIconRef(providerId));
	const setApiKey = async (newKey) => {
		await addApiKey(newKey, "OAuth");
		await updateProvider({ isEnabled: true });
	};
	if (!provider) return null;
	const officialWebsite = provider.websites?.official;
	const providerWebsite = officialWebsite?.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || provider.name;
	const serviceDescription = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
		i18nKey: "settings.provider.oauth.description",
		components: { website: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "text-inherit",
			href: officialWebsite ?? "",
			rel: "noreferrer",
			target: "_blank"
		}) },
		values: { provider: providerWebsite }
	});
	if (!hasApiKeys(provider)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.provider-oauth",
		className: oauthCardClasses.container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: oauthCardClasses.shell,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: oauthCardClasses.loggedInRow,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: oauthCardClasses.profileMeta,
					children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, { size: 40 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-[18px]",
						children: provider.name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: oauthCardClasses.nameBlock,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: oauthCardClasses.loggedInName,
							children: t(getProviderLabelKey(provider.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: oauthCardClasses.loggedInEmail,
							children: serviceDescription
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OauthButton_default, {
					provider: { id: provider.id },
					onSuccess: setApiKey,
					variant: "emphasis",
					className: ""
				})]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.provider-oauth",
		className: "flex flex-col items-center justify-center gap-3 py-3 pb-2",
		children: [
			Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, { size: 60 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-15 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-[24px]",
				children: provider.name[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
				className: "gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "rounded-lg px-3 py-1.5 text-[13px] shadow-none",
					onClick: () => providerCharge(provider.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, {
						"aria-hidden": true,
						className: "size-4 shrink-0 text-primary-foreground"
					}), t("settings.provider.charge")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "rounded-lg px-3 py-1.5 text-[13px] shadow-none",
					onClick: () => providerBills(provider.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, {
						"aria-hidden": true,
						className: "size-4 shrink-0 text-primary-foreground"
					}), t("settings.provider.bills")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1.5 text-[13px] text-muted-foreground leading-[1.35]",
				children: serviceDescription
			})
		]
	});
};
var ProviderOauth_default = ProviderOauth;
export { ProviderOauth_default as default };

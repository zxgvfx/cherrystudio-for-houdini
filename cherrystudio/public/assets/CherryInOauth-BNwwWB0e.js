import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as Trans } from "./Trans-2RhWYf-S.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as Skeleton } from "./skeleton-BZtoNVvM.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as popup } from "./popup-BLG-Gue5.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { r as hasApiKeys } from "./provider-B43PumwQ.js";
import { n as useProvider } from "./useProvider-DFQPidMA.js";
import { t as CherryinIcon } from "./cherryin-BR50pvaj.js";
import "./Scrollbar-DJ9MDpuH.js";
import { p as oauthCardClasses } from "./ProviderSettingsPrimitives-CY4ckszT.js";
import { i as oauthWithCherryIn } from "./oauth-B5gvYUtp.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("CherryInOauth");
var CHERRYIN_OAUTH_SERVER = "https://open.cherryin.ai";
var CHERRYIN_TOPUP_URL = "https://open.cherryin.ai/console/topup";
function formatCurrency(value) {
	if (typeof value !== "number" || Number.isNaN(value)) return "-";
	return `$${value.toFixed(2)}`;
}
var CherryInOauth = ({ providerId }) => {
	const { provider, updateProvider, addApiKey, deleteApiKey } = useProvider(providerId);
	const { t } = useTranslation();
	const [isLoggingOut, setIsLoggingOut] = (0, import_react.useState)(false);
	const [isLoadingData, setIsLoadingData] = (0, import_react.useState)(false);
	const [balanceInfo, setBalanceInfo] = (0, import_react.useState)(null);
	const [oauthTokenOverride, setOauthTokenOverride] = (0, import_react.useState)(null);
	const [remoteHasOAuthToken, setRemoteHasOAuthToken] = (0, import_react.useState)(null);
	const refreshHasToken = (0, import_react.useCallback)(async () => {
		try {
			setRemoteHasOAuthToken(await ipcApi.request("oauth.has_token", { providerId }));
		} catch (error) {
			logger.warn("Failed to check CherryIN OAuth token status:", error);
			setRemoteHasOAuthToken(false);
		}
	}, [providerId]);
	(0, import_react.useEffect)(() => {
		refreshHasToken();
	}, [refreshHasToken]);
	const hasKeys = provider ? hasApiKeys(provider) : false;
	const isOAuthLoggedIn = hasKeys && (oauthTokenOverride ?? remoteHasOAuthToken ?? false);
	const fetchData = (0, import_react.useCallback)(async () => {
		setIsLoadingData(true);
		try {
			setBalanceInfo(await ipcApi.request("cherryin.get_balance", { apiHost: CHERRYIN_OAUTH_SERVER }));
		} catch (error) {
			logger.warn("Failed to fetch balance:", error);
			setBalanceInfo(null);
		} finally {
			setIsLoadingData(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (isOAuthLoggedIn) fetchData();
		else setBalanceInfo(null);
	}, [fetchData, isOAuthLoggedIn]);
	(0, import_react.useEffect)(() => {
		if (oauthTokenOverride !== null && remoteHasOAuthToken !== null && remoteHasOAuthToken === oauthTokenOverride) setOauthTokenOverride(null);
	}, [oauthTokenOverride, remoteHasOAuthToken]);
	const handleOAuthLogin = (0, import_react.useCallback)(async () => {
		try {
			await oauthWithCherryIn(async (apiKeys) => {
				const keys = apiKeys.split(",").map((key) => key.trim()).filter(Boolean);
				await Promise.all(keys.map((key) => addApiKey(key, "OAuth")));
				await updateProvider({ isEnabled: true });
				setOauthTokenOverride(true);
				refreshHasToken();
				await fetchData();
				toast.success(t("auth.get_key_success"));
			}, { oauthServer: CHERRYIN_OAUTH_SERVER });
		} catch (error) {
			logger.error("OAuth error:", error);
			toast.error(t("settings.provider.oauth.error"));
		}
	}, [
		addApiKey,
		fetchData,
		refreshHasToken,
		t,
		updateProvider
	]);
	const handleLogout = (0, import_react.useCallback)(async () => {
		if (!await popup.confirm({
			title: t("settings.provider.oauth.logout"),
			content: t("settings.provider.oauth.logout_confirm"),
			centered: true
		})) return;
		setIsLoggingOut(true);
		try {
			await ipcApi.request("cherryin.logout", { apiHost: CHERRYIN_OAUTH_SERVER });
			setOauthTokenOverride(false);
			setBalanceInfo(null);
			refreshHasToken();
			const oauthKeys = provider?.apiKeys.filter((key) => key.label === "OAuth") ?? [];
			const rejectedDeletes = (await Promise.allSettled(oauthKeys.map((key) => deleteApiKey(key.id)))).filter((result) => result.status === "rejected");
			if (rejectedDeletes.length > 0) {
				logger.warn(`Failed to delete ${rejectedDeletes.length} CherryIN OAuth key(s) after logout`);
				toast.warning(t("settings.provider.oauth.logout_warning"));
				return;
			}
			toast.success(t("settings.provider.oauth.logout_success"));
		} catch (error) {
			logger.error("Logout error:", error);
			toast.warning(t("settings.provider.oauth.logout_warning"));
		} finally {
			setIsLoggingOut(false);
		}
	}, [
		deleteApiKey,
		provider?.apiKeys,
		refreshHasToken,
		t
	]);
	const handleTopup = (0, import_react.useCallback)(() => {
		window.open(CHERRYIN_TOPUP_URL, "_blank");
	}, []);
	if (!provider) return null;
	if (remoteHasOAuthToken === null && hasKeys) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.cherry-in-oauth",
		className: oauthCardClasses.container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: oauthCardClasses.shell,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-55" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-4 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-4 w-[82%]" })
			]
		})
	});
	if (!isOAuthLoggedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.cherry-in-oauth",
		className: oauthCardClasses.container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: oauthCardClasses.shell,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: oauthCardClasses.loggedInRow,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: oauthCardClasses.profileMeta,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryinIcon.Avatar, {
						shape: "circle",
						size: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: oauthCardClasses.nameBlock,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: oauthCardClasses.loggedInName,
							children: t("settings.provider.oauth.cherryIn.not_logged_in")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn(oauthCardClasses.loggedInEmail, "text-muted-foreground"),
							children: t("settings.provider.oauth.cherryIn.tagline")
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "emphasis",
					onClick: handleOAuthLogin,
					children: t("settings.provider.oauth.cherryIn.login_button")
				})]
			})
		})
	});
	const profileName = balanceInfo?.profile?.displayName || balanceInfo?.profile?.username || balanceInfo?.profile?.email || provider.name;
	const profileEmail = balanceInfo?.profile?.email || t("settings.provider.oauth.cherryIn.logged_in");
	const profileGroup = balanceInfo?.profile?.group && balanceInfo.profile.group !== "default" ? balanceInfo.profile.group : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.cherry-in-oauth",
		className: oauthCardClasses.container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(oauthCardClasses.shellLoggedIn, "text-muted-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: oauthCardClasses.loggedInRow,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: oauthCardClasses.profileMeta,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryinIcon.Avatar, {
						shape: "circle",
						size: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: oauthCardClasses.nameBlock,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: oauthCardClasses.nameRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn(oauthCardClasses.loggedInName, "text-foreground"),
								children: profileName
							}), profileGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: oauthCardClasses.badge,
								children: profileGroup
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn(oauthCardClasses.loggedInEmail, "text-muted-foreground"),
							children: profileEmail
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn(oauthCardClasses.loggedInActions, "gap-1.5"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn(oauthCardClasses.inlineBalanceBlock, "mr-1 flex items-baseline gap-1.5 text-left"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn(oauthCardClasses.inlineBalanceLabel, "text-muted-foreground"),
								children: t("settings.provider.oauth.balance")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn(oauthCardClasses.inlineBalanceValue, "text-foreground"),
								children: isLoadingData && !balanceInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: `${oauthCardClasses.balanceValueSkeleton} h-5` }) : formatCurrency(balanceInfo?.balance)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: cn(oauthCardClasses.topupPrimaryButton, "h-7 px-2.5 py-0"),
							onClick: handleTopup,
							size: "sm",
							variant: "default",
							children: t("settings.provider.oauth.topup")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: cn(oauthCardClasses.logoutCompact, "h-7 px-2 py-0 text-muted-foreground"),
							disabled: isLoggingOut,
							onClick: handleLogout,
							variant: "ghost",
							children: t("settings.provider.oauth.logout")
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn(oauthCardClasses.serviceAttribution, "text-muted-foreground"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					i18nKey: "settings.provider.oauth.cherryIn.service_attribution",
					components: { link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: cn(oauthCardClasses.serviceLink, "text-muted-foreground"),
						href: CHERRYIN_OAUTH_SERVER,
						rel: "noreferrer",
						target: "_blank"
					}, "cherryin-service-link") }
				})
			})]
		})
	});
};
var CherryInOauth_default = CherryInOauth;
export { CherryInOauth_default as default };

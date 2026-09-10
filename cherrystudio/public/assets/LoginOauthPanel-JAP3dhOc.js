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
import { t as Button } from "./button-BBhIgYp8.js";
import { t as IpcError } from "./IpcError-CvtL-yge.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import "./DataApiService-Csr1w5Kb.js";
import { a as useInvalidateCache } from "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as CircleAlert } from "./circle-alert-CTZPqbzd.js";
import { t as CircleCheck } from "./circle-check-DMd7b_SG.js";
import { t as LogIn } from "./log-in-DNUt5nOa.js";
import { t as RefreshCw } from "./refresh-cw-pKTKelZa.js";
import { t as popup } from "./popup-fJcKiA2S.js";
const oauthErrorCodes = { SIGN_IN_CANCELLED: "OAUTH_SIGN_IN_CANCELLED" };
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("LoginOauthPanel");
var LoginOauthPanel = ({ providerId, i18nNs, showAccountId = false }) => {
	const { t } = useTranslation();
	const invalidateCache = useInvalidateCache();
	const ns = `settings.provider.${i18nNs}`;
	const [loggedIn, setLoggedIn] = (0, import_react.useState)(null);
	const [accountId, setAccountId] = (0, import_react.useState)(null);
	const [signingIn, setSigningIn] = (0, import_react.useState)(false);
	const [cancellingSignIn, setCancellingSignIn] = (0, import_react.useState)(false);
	const [loggingOut, setLoggingOut] = (0, import_react.useState)(false);
	const mountedRef = (0, import_react.useRef)(false);
	const signInRequestRef = (0, import_react.useRef)(null);
	const signInRequestIdRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const refreshProviderData = (0, import_react.useCallback)(() => invalidateCache([
		"/providers",
		`/providers/${providerId}`,
		`/providers/${providerId}/*`
	]), [invalidateCache, providerId]);
	const applySignInSuccess = (0, import_react.useCallback)(async (account) => {
		if (mountedRef.current) {
			setLoggedIn(true);
			setAccountId(account.accountId);
		}
		await refreshProviderData();
		if (mountedRef.current) toast.success(t(`${ns}.sign_in_success`));
	}, [
		ns,
		refreshProviderData,
		t
	]);
	const startSignIn = (0, import_react.useCallback)(() => {
		const existing = signInRequestRef.current;
		if (existing) return existing;
		setSigningIn(true);
		const requestId = crypto.randomUUID();
		signInRequestIdRef.current = requestId;
		const request = Promise.resolve().then(async () => {
			try {
				await applySignInSuccess(await ipcApi.request("oauth.sign_in", {
					providerId,
					requestId
				}));
			} catch (error) {
				if (error instanceof IpcError && error.code === oauthErrorCodes.SIGN_IN_CANCELLED) return;
				if (!mountedRef.current) return;
				logger.error(`${providerId} sign-in failed`, error);
				toast.error(t(`${ns}.sign_in_failed`));
			} finally {
				if (signInRequestRef.current === request) {
					signInRequestRef.current = null;
					if (signInRequestIdRef.current === requestId) signInRequestIdRef.current = null;
					if (mountedRef.current) setSigningIn(false);
				}
			}
		});
		signInRequestRef.current = request;
		return request;
	}, [
		applySignInSuccess,
		providerId,
		ns,
		t
	]);
	const attachActiveSignIn = (0, import_react.useCallback)(async () => {
		const requestId = crypto.randomUUID();
		signInRequestIdRef.current = requestId;
		setSigningIn(true);
		try {
			const result = await ipcApi.request("oauth.sign_in.attach", {
				providerId,
				requestId
			});
			if (result.status === "completed") {
				await applySignInSuccess(result.account);
				return;
			}
			const hasToken = await ipcApi.request("oauth.has_token", { providerId });
			if (!mountedRef.current) return;
			if (hasToken) {
				await applySignInSuccess(showAccountId ? await ipcApi.request("oauth.get_account", { providerId }) : { accountId: null });
				return;
			}
			setLoggedIn(false);
			setAccountId(null);
		} catch (error) {
			if (error instanceof IpcError && error.code === oauthErrorCodes.SIGN_IN_CANCELLED) return;
			if (!mountedRef.current) return;
			logger.error(`${providerId} attached sign-in failed`, error);
			toast.error(t(`${ns}.sign_in_failed`));
		} finally {
			if (signInRequestIdRef.current === requestId) {
				signInRequestIdRef.current = null;
				if (mountedRef.current) setSigningIn(false);
			}
		}
	}, [
		applySignInSuccess,
		ns,
		providerId,
		showAccountId,
		t
	]);
	const refreshStatus = (0, import_react.useCallback)(async () => {
		try {
			const hasToken = await ipcApi.request("oauth.has_token", { providerId });
			setLoggedIn(hasToken);
			if (hasToken) {
				setAccountId(showAccountId ? (await ipcApi.request("oauth.get_account", { providerId })).accountId : null);
				return;
			}
			setLoggedIn(false);
			setAccountId(null);
			await attachActiveSignIn();
		} catch (error) {
			logger.error(`Failed to check ${providerId} login status`, error);
			setLoggedIn(false);
		}
	}, [
		attachActiveSignIn,
		providerId,
		showAccountId
	]);
	(0, import_react.useEffect)(() => {
		refreshStatus();
	}, [refreshStatus]);
	const handleCancelSignIn = (0, import_react.useCallback)(async () => {
		const requestId = signInRequestIdRef.current;
		if (!requestId) return;
		setCancellingSignIn(true);
		try {
			await ipcApi.request("oauth.cancel_sign_in", {
				providerId,
				requestId
			});
		} catch (error) {
			logger.error(`Failed to cancel ${providerId} sign-in`, error);
			toast.error(t(`${ns}.sign_in_failed`));
		} finally {
			if (mountedRef.current) setCancellingSignIn(false);
		}
	}, [
		ns,
		providerId,
		t
	]);
	const handleLogout = (0, import_react.useCallback)(async () => {
		if (!await popup.confirm({
			title: t("settings.provider.oauth.logout"),
			content: t("settings.provider.oauth.logout_confirm"),
			centered: true
		})) return;
		setLoggingOut(true);
		try {
			await ipcApi.request("oauth.logout", { providerId });
			await refreshProviderData();
			setLoggedIn(false);
			setAccountId(null);
			toast.success(t("settings.provider.oauth.logout_success"));
		} catch (error) {
			logger.error(`${providerId} logout failed`, error);
			toast.warning(t("settings.provider.oauth.logout_warning"));
		} finally {
			setLoggingOut(false);
		}
	}, [
		providerId,
		refreshProviderData,
		t
	]);
	if (loggedIn === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.login-oauth-panel",
		className: "flex items-center gap-2 pt-3.75 text-foreground-tertiary text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), t("common.loading")]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.login-oauth-panel",
		className: "flex flex-col gap-3",
		children: loggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-lg border border-success-border bg-success-subtle p-3 text-success-subtle-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "size-5 shrink-0 text-success",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: t(`${ns}.logged_in`)
					}), showAccountId && accountId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 truncate text-xs",
						children: t(`${ns}.account`, { accountId })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					disabled: loggingOut,
					onClick: handleLogout,
					children: t("settings.provider.oauth.logout")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 rounded-lg border border-info-border bg-info-subtle p-3 text-info-subtle-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "mt-0.5 size-5 shrink-0 text-info",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: t(`${ns}.description`)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs",
						children: t(`${ns}.description_detail`)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: signingIn,
					onClick: () => void startSignIn(),
					children: [signingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), signingIn ? t(`${ns}.signing_in`) : t(`${ns}.sign_in_button`)]
				}), signingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: cancellingSignIn,
					onClick: () => void handleCancelSignIn(),
					children: t("common.cancel")
				}) : null]
			})]
		})
	});
};
var LoginOauthPanel_default = LoginOauthPanel;
export { LoginOauthPanel_default as default };

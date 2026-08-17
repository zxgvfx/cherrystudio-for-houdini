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
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { t as Slider } from "./slider-Bbm2Amt8.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as CircleAlert } from "./circle-alert-Czy1VQQo.js";
import { t as CircleCheck } from "./circle-check-czafkGL2.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { n as useProvider } from "./useProvider-DFQPidMA.js";
import "./Scrollbar-DJ9MDpuH.js";
import { a as ProviderSettingsSubtitle } from "./ProviderSettingsPrimitives-CY4ckszT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("GithubCopilotSettings");
var AuthStatus = /* @__PURE__ */ function(AuthStatus$1) {
	AuthStatus$1[AuthStatus$1["NOT_STARTED"] = 0] = "NOT_STARTED";
	AuthStatus$1[AuthStatus$1["CODE_GENERATED"] = 1] = "CODE_GENERATED";
	AuthStatus$1[AuthStatus$1["AUTHENTICATED"] = 2] = "AUTHENTICATED";
	return AuthStatus$1;
}(AuthStatus || {});
var GithubCopilotSettings = ({ providerId }) => {
	const { t } = useTranslation();
	const { provider, updateProvider, addApiKey, deleteApiKey } = useProvider(providerId);
	const username = provider?.settings?.oauthUsername;
	const avatar = provider?.settings?.oauthAvatar;
	const defaultHeaders = provider?.settings?.extraHeaders;
	const [authStatus, setAuthStatus] = (0, import_react.useState)(AuthStatus.NOT_STARTED);
	const [deviceCode, setDeviceCode] = (0, import_react.useState)("");
	const [userCode, setUserCode] = (0, import_react.useState)("");
	const [verificationUri, setVerificationUri] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [verificationPageOpened, setVerificationPageOpened] = (0, import_react.useState)(false);
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const providerRateLimit = provider?.settings?.rateLimit ?? 10;
	const rateLimitRef = (0, import_react.useRef)(providerRateLimit);
	const [rateLimit, setRateLimit] = (0, import_react.useState)(providerRateLimit);
	(0, import_react.useEffect)(() => {
		if (provider?.settings?.isAuthed) {
			setAuthStatus(AuthStatus.AUTHENTICATED);
			setCurrentStep(3);
		} else {
			setAuthStatus(AuthStatus.NOT_STARTED);
			setCurrentStep(0);
			setDeviceCode("");
			setUserCode("");
			setVerificationUri("");
			setVerificationPageOpened(false);
		}
	}, [provider?.settings?.isAuthed]);
	(0, import_react.useEffect)(() => {
		setRateLimit(providerRateLimit);
		rateLimitRef.current = providerRateLimit;
	}, [providerRateLimit]);
	const handleGetDeviceCode = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			setCurrentStep(1);
			const { device_code, user_code, verification_uri } = await window.api.copilot.getAuthMessage(defaultHeaders);
			logger.debug("device_code", device_code);
			logger.debug("user_code", user_code);
			logger.debug("verification_uri", verification_uri);
			setDeviceCode(device_code);
			setUserCode(user_code);
			setVerificationUri(verification_uri);
			setAuthStatus(AuthStatus.CODE_GENERATED);
			try {
				await navigator.clipboard.writeText(user_code);
				toast.success(t("settings.provider.copilot.code_copied"));
			} catch (error) {
				logger.error("Failed to copy to clipboard:", error);
			}
		} catch (error) {
			logger.error("Failed to get device code:", error);
			toast.error(t("settings.provider.copilot.code_failed"));
			setCurrentStep(0);
		} finally {
			setLoading(false);
		}
	}, [t, defaultHeaders]);
	const handleGetToken = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			setCurrentStep(3);
			const { access_token } = await window.api.copilot.getCopilotToken(deviceCode, defaultHeaders);
			await window.api.copilot.saveCopilotToken(access_token);
			const { token } = await window.api.copilot.getToken(defaultHeaders);
			if (token) {
				const { login, avatar: userAvatar } = await window.api.copilot.getUser(access_token);
				setAuthStatus(AuthStatus.AUTHENTICATED);
				await addApiKey(token, "Copilot");
				await updateProvider({
					isEnabled: true,
					providerSettings: {
						...provider?.settings,
						isAuthed: true,
						oauthUsername: login,
						oauthAvatar: userAvatar
					}
				});
				toast.success(t("settings.provider.copilot.auth_success"));
			}
		} catch (error) {
			logger.error("Failed to get token:", error);
			toast.error(t("settings.provider.copilot.auth_failed"));
			setCurrentStep(2);
		} finally {
			setLoading(false);
		}
	}, [
		deviceCode,
		t,
		provider?.settings,
		addApiKey,
		updateProvider,
		defaultHeaders
	]);
	const handleLogout = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			const copilotKey = provider?.apiKeys.find((k) => k.label === "Copilot");
			if (copilotKey) await deleteApiKey(copilotKey.id);
			await updateProvider({ providerSettings: {
				...provider?.settings,
				isAuthed: false,
				oauthUsername: "",
				oauthAvatar: "",
				extraHeaders: {}
			} });
			await window.api.copilot.logout();
			setAuthStatus(AuthStatus.NOT_STARTED);
			setDeviceCode("");
			setUserCode("");
			setVerificationUri("");
			setVerificationPageOpened(false);
			setCurrentStep(0);
			toast.success(t("settings.provider.copilot.logout_success"));
		} catch (error) {
			logger.error("Failed to logout:", error);
			toast.error(t("settings.provider.copilot.logout_failed"));
		} finally {
			setLoading(false);
		}
	}, [
		t,
		provider?.apiKeys,
		provider?.settings,
		deleteApiKey,
		updateProvider
	]);
	const handleCopyUserCode = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(userCode);
			toast.success(t("common.copied"));
		} catch (error) {
			logger.error("Failed to copy to clipboard:", error);
			toast.error(t("common.copy_failed"));
		}
	}, [userCode, t]);
	const handleOpenVerificationPage = (0, import_react.useCallback)(() => {
		if (verificationUri) {
			window.open(verificationUri, "_blank");
			setVerificationPageOpened(true);
			setCurrentStep(2);
		}
	}, [verificationUri]);
	const getSteps = () => [
		{
			title: t("settings.provider.copilot.step_get_code"),
			description: t("settings.provider.copilot.step_get_code_desc"),
			status: currentStep > 0 ? "finish" : currentStep === 0 ? "process" : "wait"
		},
		{
			title: t("settings.provider.copilot.step_copy_code"),
			description: t("settings.provider.copilot.step_copy_code_desc"),
			status: currentStep > 1 ? "finish" : currentStep === 1 ? "process" : "wait"
		},
		{
			title: t("settings.provider.copilot.step_authorize"),
			description: t("settings.provider.copilot.step_authorize_desc"),
			status: currentStep > 2 ? "finish" : currentStep === 2 ? "process" : "wait"
		},
		{
			title: t("settings.provider.copilot.step_connect"),
			description: t("settings.provider.copilot.step_connect_desc"),
			status: currentStep >= 3 ? "finish" : "wait"
		}
	];
	const handleRateLimitChange = async (value) => {
		try {
			await updateProvider({ providerSettings: {
				...provider?.settings,
				rateLimit: value
			} });
		} catch (error) {
			logger.error("Failed to save Copilot rate limit", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			setRateLimit(providerRateLimit);
			rateLimitRef.current = providerRateLimit;
		}
	};
	const stepDotClass = (status) => cn("mt-0.5 mb-0.5 size-2.5 shrink-0 rounded-full border-2 border-background", status === "finish" && "bg-primary", status === "process" && "bg-primary ring-2 ring-primary/30", status === "wait" && "bg-muted", status === "error" && "bg-destructive");
	const renderAuthContent = () => {
		switch (authStatus) {
			case AuthStatus.AUTHENTICATED: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "settings.render-auth-content",
				className: "mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 rounded-lg border border-success-border bg-success-subtle p-3 text-success-subtle-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						className: "mt-0.5 size-5 shrink-0 text-success",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: avatar,
								alt: "",
								className: "size-5 shrink-0 rounded-full",
								loading: "lazy"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								children: username || t("settings.provider.copilot.auth_success_title")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: loading,
							onClick: handleLogout,
							children: t("settings.provider.copilot.logout")
						})]
					})]
				})
			});
			case AuthStatus.CODE_GENERATED: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.render-auth-content",
				className: "mb-5 flex flex-col gap-4 md:flex-row md:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-50 flex-1 flex-col gap-2",
					children: getSteps().map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: stepDotClass(step.status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-foreground text-sm leading-tight",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-muted-foreground text-xs leading-snug",
								children: step.description
							})]
						})]
					}, idx))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-2 flex-col gap-4",
					children: [
						currentStep >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-primary-foreground text-xs", currentStep > 1 ? "bg-primary" : "bg-primary"),
									children: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-foreground text-sm",
									children: t("settings.provider.copilot.step_copy_code")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-foreground-tertiary text-xs",
									children: t("settings.provider.copilot.step_copy_code_detail")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-6 flex-row items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: userCode,
									readOnly: true,
									className: "mr-2 font-mono font-semibold text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									onClick: handleCopyUserCode,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), t("common.copy")]
								})]
							})]
						}),
						currentStep >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-xs",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-foreground text-sm",
										children: t("settings.provider.copilot.step_authorize")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-foreground-tertiary text-xs",
										children: t("settings.provider.copilot.step_authorize_detail")
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									className: "mb-2",
									onClick: handleOpenVerificationPage,
									children: t("settings.provider.copilot.open_verification_page")
								}),
								verificationUri ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "ml-1 break-all text-foreground-tertiary text-xs",
									children: verificationUri
								}) : null
							]
						}),
						currentStep >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-xs",
									children: "4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-foreground text-sm",
									children: t("settings.provider.copilot.step_connect")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-foreground-tertiary text-xs",
									children: t("settings.provider.copilot.step_connect_detail")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: !verificationPageOpened ? t("settings.provider.copilot.open_verification_first") : "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									disabled: !verificationPageOpened || loading,
									onClick: handleGetToken,
									children: t("settings.provider.copilot.connect")
								})
							})]
						})
					]
				})]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "settings.render-auth-content",
				className: "mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 rounded-lg border border-info-border bg-info-subtle p-3 text-info-subtle-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							className: "mt-0.5 size-5 shrink-0 text-info",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: t("settings.provider.copilot.description")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs",
								children: t("settings.provider.copilot.description_detail")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "shrink-0 self-center",
							disabled: loading,
							onClick: handleGetDeviceCode,
							children: t("settings.provider.copilot.start_auth")
						})
					]
				})
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.github-copilot-settings",
		className: "pt-3.75",
		children: [renderAuthContent(), authStatus === AuthStatus.AUTHENTICATED && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex min-h-6 flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-0",
				children: t("settings.provider.copilot.rate_limit")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-50",
				onPointerUp: () => {
					handleRateLimitChange(rateLimitRef.current);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					className: "w-full",
					value: [rateLimit],
					min: 1,
					max: 60,
					step: 1,
					marks: [
						{
							value: 1,
							label: "1"
						},
						{
							value: 10,
							label: t("common.default")
						},
						{
							value: 60,
							label: "60"
						}
					],
					onValueChange: ([v]) => {
						setRateLimit(v);
						rateLimitRef.current = v;
					}
				})
			})]
		})]
	});
};
var GithubCopilotSettings_default = GithubCopilotSettings;
export { GithubCopilotSettings_default as default };

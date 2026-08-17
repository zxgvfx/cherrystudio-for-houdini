import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { y as CodeCli } from "./PreferenceService-ay5pWhVK.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as CircleAlert } from "./circle-alert-Czy1VQQo.js";
import { t as CircleCheck } from "./circle-check-czafkGL2.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { t as RefreshCw } from "./refresh-cw-CaPXD2_E.js";
import { t as SquareTerminal } from "./square-terminal-sOnJYhvs.js";
import "./Scrollbar-DJ9MDpuH.js";
import { t as ProviderHelpLink } from "./ProviderSettingsPrimitives-CY4ckszT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var LEGAL_AND_COMPLIANCE_URL = "https://code.claude.com/docs/en/legal-and-compliance";
var logger = loggerService.withContext("ClaudeCodeSettings");
var LOGIN_COMMAND = "claude /login";
var ClaudeCodeSettings = ({ providerId }) => {
	const { t } = useTranslation();
	const [loggedIn, setLoggedIn] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [launching, setLaunching] = (0, import_react.useState)(false);
	const checkLogin = (0, import_react.useCallback)(async () => {
		setChecking(true);
		try {
			setLoggedIn(await ipcApi.request("oauth.check_external_login", { providerId }));
		} catch (error) {
			logger.error("Failed to check Claude login status", error);
			setLoggedIn(false);
		} finally {
			setChecking(false);
		}
	}, [providerId]);
	(0, import_react.useEffect)(() => {
		checkLogin();
	}, [checkLogin]);
	const handleOpenTerminal = (0, import_react.useCallback)(async () => {
		setLaunching(true);
		try {
			const { homePath } = await ipcApi.request("app.get_info");
			const result = await ipcApi.request("code_cli.run", {
				mode: "login-flow",
				cliTool: CodeCli.CLAUDE_CODE,
				directory: homePath
			});
			if (!result.success) {
				logger.error("Failed to launch Claude login terminal", { message: result.message });
				toast.error(t("settings.provider.claude_code.launch_failed"));
			}
		} catch (error) {
			logger.error("Failed to launch Claude login terminal", error);
			toast.error(t("settings.provider.claude_code.launch_failed"));
		} finally {
			setLaunching(false);
		}
	}, [t]);
	const handleCopyCommand = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(LOGIN_COMMAND);
			toast.success(t("common.copied"));
		} catch (error) {
			logger.error("Failed to copy login command", error);
			toast.error(t("common.copy_failed"));
		}
	}, [t]);
	if (loggedIn === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.claude-code-settings",
		className: "flex items-center gap-2 text-foreground-tertiary text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), t("common.loading")]
	});
	const agentOnlyNote = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.claude-code-settings",
		className: "mt-1 text-xs",
		children: [
			t("settings.provider.claude_code.agent_only_note"),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpLink, {
				className: "mx-0",
				href: LEGAL_AND_COMPLIANCE_URL,
				target: "_blank",
				rel: "noreferrer",
				children: t("settings.provider.claude_code.legal_link")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.claude-code-settings",
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: t("settings.provider.claude_code.logged_in")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs",
							children: t("settings.provider.claude_code.logged_in_detail")
						}),
						agentOnlyNote
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					disabled: checking,
					onClick: () => void checkLogin(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), t("settings.provider.claude_code.recheck")]
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: t("settings.provider.claude_code.description")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs",
							children: t("settings.provider.claude_code.description_detail")
						}),
						agentOnlyNote
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: launching,
						onClick: () => void handleOpenTerminal(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" }), t("settings.provider.claude_code.open_terminal")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => void handleCopyCommand(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: LOGIN_COMMAND
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						disabled: checking,
						onClick: () => void checkLogin(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), t("settings.provider.claude_code.recheck")]
					})
				]
			})]
		})
	});
};
var ClaudeCodeSettings_default = ClaudeCodeSettings;
export { ClaudeCodeSettings_default as default };

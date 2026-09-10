import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as Trans } from "./Trans-pez8bY7I.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { r as ColFlex } from "./flex-YDL2weOg.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as CircleCheck } from "./circle-check-DMd7b_SG.js";
import { t as CircleX } from "./circle-x-WzaIQrTx.js";
import { t as Info } from "./info-DYnh0AU2.js";
import { t as TriangleAlert } from "./triangle-alert-BFkcVc7a.js";
import "./Scrollbar-CjwT5bYS.js";
import { a as ProviderSettingsSubtitle } from "./ProviderSettingsPrimitives-C82JUgBE.js";
import { t as useOvmsSupport } from "./useOvmsSupport-CInjGUSr.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var statusIcon = {
	running: CircleCheck,
	"not-running": TriangleAlert,
	"not-installed": CircleX
};
var OvmsSettings = () => {
	const { t } = useTranslation();
	const { isSupported } = useOvmsSupport();
	const [ovmsStatus, setOvmsStatus] = (0, import_react.useState)("not-running");
	const [isInstallingOvms, setIsInstallingOvms] = (0, import_react.useState)(false);
	const [isRunningOvms, setIsRunningOvms] = (0, import_react.useState)(false);
	const [isStoppingOvms, setIsStoppingOvms] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const checkStatus = async () => {
			if (!isSupported) return;
			setOvmsStatus(await ipcApi.request("ovms.get_status"));
		};
		checkStatus();
	}, [isSupported]);
	const installOvms = async () => {
		try {
			setIsInstallingOvms(true);
			await ipcApi.request("ovms.install_binary");
			setOvmsStatus(await ipcApi.request("ovms.get_status"));
			setIsInstallingOvms(false);
		} catch (error) {
			const errMsg = error instanceof Error ? error.message : String(error);
			const errCodeMsg = {
				"100": t("ovms.failed.install_code_100"),
				"101": t("ovms.failed.install_code_101"),
				"102": t("ovms.failed.install_code_102"),
				"103": t("ovms.failed.install_code_103"),
				"104": t("ovms.failed.install_code_104"),
				"105": t("ovms.failed.install_code_105"),
				"106": t("ovms.failed.install_code_106"),
				"110": t("ovms.failed.install_code_110")
			};
			const match = errMsg.match(/code (\d+)/);
			const code = match ? match[1] : "unknown";
			const errorMsg = code in errCodeMsg ? errCodeMsg[code] ?? errMsg : errMsg;
			toast.error(t("ovms.failed.install") + errorMsg);
			setIsInstallingOvms(false);
		}
	};
	const runOvms = async () => {
		try {
			setIsRunningOvms(true);
			await ipcApi.request("ovms.start");
			setOvmsStatus(await ipcApi.request("ovms.get_status"));
			setIsRunningOvms(false);
		} catch (error) {
			toast.error(t("ovms.failed.run") + (error instanceof Error ? error.message : String(error)));
			setIsRunningOvms(false);
		}
	};
	const stopOvms = async () => {
		try {
			setIsStoppingOvms(true);
			await ipcApi.request("ovms.stop");
			setOvmsStatus(await ipcApi.request("ovms.get_status"));
			setIsStoppingOvms(false);
		} catch (error) {
			toast.error(t("ovms.failed.stop") + (error instanceof Error ? error.message : String(error)));
			setIsStoppingOvms(false);
		}
	};
	const bannerClasses = cn("w-full rounded-lg border px-3 py-3 text-sm", ovmsStatus === "running" && "border-success-border bg-success-subtle text-success-subtle-foreground", ovmsStatus === "not-running" && "border-warning-border bg-warning-subtle text-warning-subtle-foreground", ovmsStatus === "not-installed" && "border-error-border bg-error-subtle text-error-subtle-foreground");
	const getStatusMessage = () => {
		switch (ovmsStatus) {
			case "running": return t("ovms.status.running");
			case "not-running": return t("ovms.status.not_running");
			case "not-installed": return t("ovms.status.not_installed");
			default: return t("ovms.status.unknown");
		}
	};
	const StatusIcon = statusIcon[ovmsStatus];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.ovms-settings.status",
		className: bannerClasses,
		role: "status",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColFlex, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-6 w-full flex-row items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, {
						className: cn("mt-0.5 size-4 shrink-0", ovmsStatus === "running" && "text-success", ovmsStatus === "not-running" && "text-warning", ovmsStatus === "not-installed" && "text-destructive"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
						className: "mt-0 font-normal",
						children: getStatusMessage()
					})]
				}),
				ovmsStatus === "not-installed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: installOvms,
					disabled: isInstallingOvms,
					size: "sm",
					children: isInstallingOvms ? t("ovms.action.installing") : t("ovms.action.install")
				}),
				ovmsStatus === "not-running" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: installOvms,
						disabled: isInstallingOvms || isRunningOvms,
						size: "sm",
						children: isInstallingOvms ? t("ovms.action.installing") : t("ovms.action.reinstall")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: runOvms,
						disabled: isRunningOvms || isInstallingOvms,
						size: "sm",
						children: isRunningOvms ? t("ovms.action.starting") : t("ovms.action.run")
					})]
				}),
				ovmsStatus === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					onClick: stopOvms,
					disabled: isStoppingOvms,
					size: "sm",
					children: isStoppingOvms ? t("ovms.action.stopping") : t("ovms.action.stop")
				})
			]
		}) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.ovms-settings.status",
		className: "mt-1.5 flex gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2.5 text-foreground text-sm",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
			className: "mt-0.5 size-4 shrink-0 text-primary",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: t("ovms.guide")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				i18nKey: "ovms.description",
				components: {
					div: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					dev: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					p: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {}),
					a: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-link",
						href: "https://github.com/openvinotoolkit/model_server/blob/c55551763d02825829337b62c2dcef9339706f79/docs/deploying_server_baremetal.md",
						rel: "noreferrer",
						target: "_blank"
					})
				}
			}) })]
		})]
	})] });
};
var OvmsSettings_default = OvmsSettings;
export { OvmsSettings_default as default };

import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as DescriptionSwitch } from "./switch-C4W4NCwc.js";
import { t as Badge } from "./badge-DTLpmOYc.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import { t as Boxes } from "./boxes-C247Db2w.js";
import { t as Download } from "./download-WNh7i55M.js";
import { t as RefreshCw } from "./refresh-cw-pKTKelZa.js";
import { t as ScanText } from "./scan-text-Bfo8uCw3.js";
import { t as Trash2 } from "./trash-2-COZ-1DEE.js";
import { t as X } from "./x-CpgfqVTG.js";
import { t as useLocalModel } from "./useLocalModel-Bvd9zJkF.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-DyPgPdGs.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("LocalModelsSection");
var CARD_NOTICE_KEYS = {
	downloadFailed: "settings.dependencies.localModels.notice.downloadFailed",
	incompleteCache: "settings.dependencies.localModels.notice.incompleteCache",
	removeFailed: "settings.dependencies.localModels.notice.removeFailed",
	inUse: "settings.dependencies.localModels.notice.inUse"
};
function useLocalModelCard(model) {
	const localModel = useLocalModel(model);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const download = async () => {
		setNotice(null);
		try {
			await localModel.download();
		} catch {
			if (mountedRef.current) setNotice("downloadFailed");
		}
	};
	const remove = async () => {
		setNotice(null);
		try {
			const { removed } = await localModel.remove();
			if (!mountedRef.current) return;
			if (!removed) setNotice("inUse");
		} catch {
			if (mountedRef.current) setNotice("removeFailed");
		}
	};
	return {
		...localModel,
		notice: localModel.status === "error" ? localModel.errorCode === "incomplete_cache" ? "incompleteCache" : "downloadFailed" : notice,
		download,
		remove
	};
}
var ModelCard = ({ icon, name, subtitle, status, percent, notice, onDownload, onCancel, onRemove }) => {
	const { t } = useTranslation();
	const ready = status === "ready";
	const downloading = status === "downloading";
	const retrying = status === "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.model-card.listitem",
		role: "listitem",
		className: "flex flex-col rounded-xl border border-border p-4 transition-colors duration-200 ease-in-out hover:border-border-strong",
		style: { backgroundColor: "var(--settings-group-background, var(--card))" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex size-10 shrink-0 items-center justify-center rounded-xl", ready ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"),
						children: icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								children: name
							}), ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "px-1.5 py-0 text-[11px] leading-4",
								children: t("settings.dependencies.localModels.status.ready")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate text-muted-foreground text-xs",
							children: subtitle
						})]
					}),
					ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onRemove,
						"aria-label": t("settings.dependencies.localModels.remove"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-xs leading-4", notice === "inUse" ? "text-muted-foreground" : "text-destructive"),
				children: t(CARD_NOTICE_KEYS[notice])
			}),
			downloading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary transition-all",
						style: { width: `${percent}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.dependencies.localModels.status.downloading") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [percent, "%"] })]
				})]
			}),
			!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 border-border border-t pt-3",
				children: downloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "h-7 w-full gap-1 text-xs",
					onClick: onCancel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), t("settings.dependencies.localModels.cancel")]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "h-7 w-full gap-1 text-xs",
					onClick: onDownload,
					children: [retrying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), t(retrying ? "common.retry" : "settings.dependencies.localModels.download")]
				})
			})
		]
	});
};
var LocalModelsSection = () => {
	const { t } = useTranslation();
	const [hardwareAccelerationEnabled, setHardwareAccelerationEnabled] = usePreference("feature.local_model.hardware_acceleration.enabled");
	const [accelerationSupported, setAccelerationSupported] = (0, import_react.useState)(false);
	const embedding = useLocalModelCard("embedding");
	const ocr = useLocalModelCard("ocr");
	(0, import_react.useEffect)(() => {
		let mounted = true;
		ipcApi.request("local_model.get_acceleration_capability").then(({ supported }) => {
			if (mounted) setAccelerationSupported(supported);
		}).catch((error) => logger.warn("Failed to detect local inference hardware acceleration", error));
		return () => {
			mounted = false;
		};
	}, []);
	const unsupported = embedding.status === "unsupported" && ocr.status === "unsupported";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.local-models-section",
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-[15px] text-foreground leading-6",
				children: t("settings.dependencies.localModels.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 mb-3 text-muted-foreground text-xs leading-5",
				children: t("settings.dependencies.localModels.description")
			}),
			accelerationSupported && !unsupported ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 border-border border-y py-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionSwitch, {
					size: "sm",
					label: t("settings.dependencies.localModels.acceleration.label"),
					description: t("settings.dependencies.localModels.acceleration.description"),
					checked: hardwareAccelerationEnabled,
					onCheckedChange: (enabled) => void setHardwareAccelerationEnabled(enabled)
				})
			}) : null,
			unsupported ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "settings.local-models-section.status",
				role: "status",
				className: "rounded-xl border border-border border-dashed px-4 py-6 text-center text-muted-foreground text-xs leading-5",
				style: { backgroundColor: "var(--settings-group-background, color-mix(in srgb, var(--card) 50%, transparent))" },
				children: t("settings.dependencies.localModels.unsupported")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.local-models-section.list",
				role: "list",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-5" }),
					name: t("settings.dependencies.localModels.embedding.name"),
					subtitle: t("settings.dependencies.localModels.embedding.subtitle"),
					status: embedding.status,
					percent: embedding.percent,
					notice: embedding.notice,
					onDownload: embedding.download,
					onCancel: embedding.cancel,
					onRemove: embedding.remove
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanText, { className: "size-5" }),
					name: t("settings.dependencies.localModels.ocr.name"),
					subtitle: t("settings.dependencies.localModels.ocr.subtitle"),
					status: ocr.status,
					percent: ocr.percent,
					notice: ocr.notice,
					onDownload: ocr.download,
					onCancel: ocr.cancel,
					onRemove: ocr.remove
				})]
			})
		]
	});
};
var LocalModelsSection_default = LocalModelsSection;
var LocalModelsSettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
	className: "bg-transparent",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModelsSection_default, {})
});
export { LocalModelsSettings as component };

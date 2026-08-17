import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
/* empty css                */
import { t as require_client } from "./client-CL1qLRYW.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as instance } from "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as initReactI18next } from "./initReactI18next-BmJnUitX.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as CircleCheck } from "./circle-check-czafkGL2.js";
import { t as CircleX } from "./circle-x-BOCKIMYB.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
var import_client = require_client();
const relocationLocales = {
	en: { translation: { relocation: {
		title: "Data Directory Migration",
		preparing: "Preparing migration...",
		copying: "Copying data...",
		committing: "Saving new data directory...",
		completed: {
			title: "Migration complete",
			description: "Restart Cherry Studio to use the new data directory."
		},
		failed: {
			title: "Migration failed",
			description: "Cherry Studio will keep using the previous data directory."
		},
		restart_success: "Restart Cherry Studio",
		restart_failure: "Continue with Previous Directory",
		from: "Current directory",
		to: "New directory"
	} } },
	"zh-CN": { translation: { relocation: {
		title: "数据目录迁移",
		preparing: "正在准备迁移...",
		copying: "正在复制数据...",
		committing: "正在保存新的数据目录...",
		completed: {
			title: "迁移完成",
			description: "请重启 Cherry Studio 以使用新的数据目录。"
		},
		failed: {
			title: "迁移失败",
			description: "Cherry Studio 将继续使用原数据目录。"
		},
		restart_success: "重启 Cherry Studio",
		restart_failure: "继续使用原数据目录",
		from: "当前目录",
		to: "新目录"
	} } },
	"zh-TW": { translation: { relocation: {
		title: "資料目錄遷移",
		preparing: "正在準備遷移...",
		copying: "正在複製資料...",
		committing: "正在儲存新的資料目錄...",
		completed: {
			title: "遷移完成",
			description: "請重新啟動 Cherry Studio 以使用新的資料目錄。"
		},
		failed: {
			title: "遷移失敗",
			description: "Cherry Studio 將繼續使用原資料目錄。"
		},
		restart_success: "重新啟動 Cherry Studio",
		restart_failure: "繼續使用原資料目錄",
		from: "目前目錄",
		to: "新目錄"
	} } }
};
function detectLanguage() {
	const language = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
	if (language.includes("zh-tw") || language.includes("zh-hk")) return "zh-TW";
	if (language.includes("zh")) return "zh-CN";
	return "en";
}
async function initI18n() {
	await instance.use(initReactI18next).init({
		resources: relocationLocales,
		lng: detectLanguage(),
		fallbackLng: "en",
		interpolation: { escapeValue: false }
	});
}
const UserDataRelocationIpcChannels = {
	GetProgress: "user-data-relocation:get-progress",
	Restart: "user-data-relocation:restart",
	Progress: "user-data-relocation:progress"
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useRelocationProgress");
function useRelocationProgress() {
	const [progress, setProgress] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let receivedProgressEvent = false;
		const handleProgress = (_event, data) => {
			receivedProgressEvent = true;
			setProgress(data);
		};
		const unsubscribe = window.electron.ipcRenderer.on(UserDataRelocationIpcChannels.Progress, handleProgress);
		window.electron.ipcRenderer.invoke(UserDataRelocationIpcChannels.GetProgress).then((initial) => {
			if (initial && !receivedProgressEvent) setProgress(initial);
		}).catch((error) => {
			logger.error("Failed to read initial userData relocation progress", error);
		});
		return unsubscribe;
	}, []);
	return {
		progress,
		restart: (0, import_react.useCallback)(() => {
			window.electron.ipcRenderer.invoke(UserDataRelocationIpcChannels.Restart).catch((error) => {
				logger.error("Failed to restart after userData relocation", error);
			});
		}, [])
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var RelocationApp = () => {
	const { t } = useTranslation();
	const { progress, restart } = useRelocationProgress();
	const stage = progress?.stage;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "user-data-relocation.relocation-app",
		className: "flex h-screen w-screen flex-col bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "relative flex h-11 shrink-0 items-center justify-center border-border border-b [-webkit-app-region:drag]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-medium text-foreground text-sm",
				children: t("relocation.title")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex min-h-0 flex-1 justify-center px-8 py-6 [-webkit-app-region:no-drag]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full w-full max-w-[420px] flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-4",
					children: [
						!progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: t("relocation.preparing") }),
						stage === "preparing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: t("relocation.preparing") }),
						stage === "copying" && progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copying, {
							label: t("relocation.copying"),
							copied: progress.bytesCopied,
							total: progress.bytesTotal
						}),
						stage === "committing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: t("relocation.committing") }),
						stage === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Completion, {
							title: t("relocation.completed.title"),
							description: t("relocation.completed.description"),
							buttonLabel: t("relocation.restart_success"),
							onRestart: restart
						}),
						stage === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Failure, {
							title: t("relocation.failed.title"),
							description: t("relocation.failed.description"),
							buttonLabel: t("relocation.restart_failure"),
							error: progress?.error,
							onRestart: restart
						})
					]
				}), progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paths, {
					fromLabel: t("relocation.from"),
					toLabel: t("relocation.to"),
					from: progress.from,
					to: progress.to
				})]
			})
		})]
	});
};
var Spinner = ({ label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "user-data-relocation.spinner",
	className: "flex flex-col items-center gap-3 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "animate-spin text-foreground-tertiary",
		size: 28
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground text-sm",
		children: label
	})]
});
var Copying = ({ label, copied, total }) => {
	const hasTotal = total > 0;
	const percent = hasTotal ? Math.min(100, Math.max(0, Math.round(copied / total * 100))) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "user-data-relocation.copying",
		className: "flex w-full max-w-[360px] flex-col items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 w-full overflow-hidden rounded-full bg-border",
				children: hasTotal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary transition-[width] duration-200",
					style: { width: `${percent}%` }
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/3 animate-pulse rounded-full bg-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-h-4 text-foreground-tertiary text-xs",
				children: hasTotal ? `${percent}%` : ""
			})
		]
	});
};
var Failure = ({ title, description, buttonLabel, error, onRestart }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "user-data-relocation.failure",
	className: "flex w-full flex-col items-center gap-3 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
			className: "text-destructive",
			size: 40
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold text-base text-foreground",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: description
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "max-h-24 w-full overflow-auto whitespace-pre-wrap break-words rounded border border-border bg-background-subtle px-3 py-2 text-left text-foreground-tertiary text-xs",
			children: error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: onRestart,
			className: "mt-2 w-full",
			children: buttonLabel
		})
	]
});
var Completion = ({ title, description, buttonLabel, onRestart }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "user-data-relocation.completion",
	className: "flex w-full flex-col items-center gap-3 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
			className: "text-success",
			size: 40
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold text-base text-foreground",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: description
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: onRestart,
			className: "mt-2 w-full",
			children: buttonLabel
		})
	]
});
var Paths = ({ fromLabel, toLabel, from, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "user-data-relocation.paths",
	className: "mt-4 flex flex-col gap-2 border-border border-t pt-4 text-xs",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathRow, {
		label: fromLabel,
		value: from
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathRow, {
		label: toLabel,
		value: to
	})]
});
var PathRow = ({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "user-data-relocation.path-row",
	className: "flex flex-col gap-0.5",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-medium text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "break-all text-foreground-tertiary",
		children: value
	})]
});
var RelocationApp_default = RelocationApp;
var root = (0, import_client.createRoot)(document.getElementById("root"));
initI18n().then(() => {
	root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelocationApp_default, {}));
});

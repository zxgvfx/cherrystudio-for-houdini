import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
/* empty css                */
import { t as require_client } from "./client-Dri0ImSL.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { r as isMac } from "./platform-fGkkNTU9.js";
import { t as instance } from "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as initReactI18next } from "./initReactI18next-BofyZ-Nu.js";
import "./react-dom-D5lMhlFn.js";
import { t as logo_default } from "./logo-FLnHo1Um.js";
import { n as UiDataSlot, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-D29TbOSD.js";
import { i as success, n as error } from "./toast-BtN4jQ2l.js";
import { t as Alert } from "./alert-DCOQC5CT.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as DIALOG_UNMOUNT_DELAY_MS } from "./dialog-HEaeWHIA.js";
import "./es2015-wfS3L7va.js";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import { t as ArrowRight } from "./arrow-right-QZWv3bkd.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as CircleX } from "./circle-x-WzaIQrTx.js";
import { t as Copy } from "./copy-DHwrRvn7.js";
import { t as Database } from "./database-DlTq_gsH.js";
import { t as Download } from "./download-WNh7i55M.js";
import { t as ExternalLink } from "./external-link-BNegULD7.js";
import { t as FolderOpen } from "./folder-open-Dy927fy9.js";
import { t as History } from "./history-BeiErk8i.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as Minus } from "./minus-C1pbBOW8.js";
import { t as Monitor } from "./monitor-B5-EIZsn.js";
import { t as Moon } from "./moon-B1X-PPO8.js";
import { t as Rocket } from "./rocket-B_QsvJCG.js";
import { t as RotateCcw } from "./rotate-ccw-CnP2I1zC.js";
import { t as Shield } from "./shield-CwKaybkc.js";
import { t as Sparkles } from "./sparkles-D4OSBloB.js";
import { t as Sun } from "./sun-DZPCXLac.js";
import { t as TriangleAlert } from "./triangle-alert-BFkcVc7a.js";
import { t as Wrench } from "./wrench-BqVRRCKS.js";
import { t as X } from "./x-CpgfqVTG.js";
import { t as ToastHost } from "./ToastHost-IGq0t1_z.js";
import { t as clampSurrogateBoundary } from "./text-D5gXrEkX.js";
import { t as Dexie } from "./import-wrapper-prod-CLWkm-I1.js";
var import_client = require_client();
const zhCN = {
	common: {
		close: "关闭",
		error: "错误",
		loading: "加载中",
		success: "成功"
	},
	error: { unknown: "未知错误" },
	settings: { theme: {
		dark: "深色模式",
		light: "浅色模式",
		system: "跟随系统"
	} },
	migration: {
		title: "数据迁移向导",
		stages: {
			introduction: "介绍",
			migration: "迁移",
			completed: "完成"
		},
		buttons: {
			start_migration: "开始迁移",
			restart: "重启应用",
			retry: "重试",
			close: "关闭应用",
			continue_v1: "继续使用 V1",
			ignore_migration: "忽略并使用默认值",
			skip_migration: "跳过迁移",
			more_options: "更多选项"
		},
		window: {
			minimize: "最小化",
			close: "关闭",
			confirm_close: {
				title: "退出数据迁移",
				message: "迁移流程尚未完成，关闭窗口将退出应用，下次启动需要重新开始。确定要退出吗？",
				continue: "继续迁移",
				quit: "退出",
				quit_pending: "当前步骤完成后将自动退出应用，请稍候…"
			}
		},
		language: { select: "切换语言" },
		status: {
			pending: "等待中",
			running: "进行中",
			completed: "完成",
			failed: "失败"
		},
		diagnostics: {
			title: "保存问题排查文件",
			save: "保存诊断包",
			saving: "正在保存…",
			export_description: "诊断包包含迁移错误、系统信息和可用的应用日志。日志可能包含文件路径、错误堆栈、用户内容或凭据；文件只会保存到本地，不会自动上传，请仅发送给 Cherry Studio 支持团队。",
			open_from_error: "导出此错误的诊断包",
			saved_title: "诊断包已保存",
			privacy: "应用日志可能包含文件路径、错误堆栈、用户内容或凭据，请勿分享到公开渠道或提供给 Cherry Studio 支持团队之外的人员。",
			saved_local: "诊断包已保存到本地且未自动上传，请发送至问题反馈邮箱以协助排查。",
			logs_not_included: "未能加入应用日志，当前诊断包仅包含系统信息。",
			open_folder: "打开文件所在位置",
			contact: "复制问题反馈邮箱",
			copy_success: "问题反馈邮箱已复制",
			copy_failed: "问题反馈邮箱复制失败",
			save_failed: "诊断包保存失败",
			open_folder_failed: "无法打开文件所在位置"
		},
		more_options: {
			description: "请选择接下来的处理方式。无论选择哪一种，旧版原始数据都不会被删除。",
			diagnostics_title: "保存问题信息",
			use_v2_title: "直接使用 V2",
			skip_description: "不导入旧版数据，以默认配置开始使用。",
			continue_v1_description: "下载并安装 V1，继续使用当前保留的原始数据。",
			diagnostics_description: "将错误信息和应用日志保存到本地，方便发送给支持团队排查问题。"
		},
		introduction: {
			title: "将数据迁移到新的架构中",
			subtitle: "Cherry Studio V2 · 全新数据架构",
			features: {
				architecture: {
					title: "全新数据架构",
					description: "存储与使用方式重构，效率与安全性大幅提升。"
				},
				migration: {
					title: "需要迁移数据",
					description: "旧版数据需要迁移后，才能在 V2 中继续使用。"
				},
				safety: {
					title: "安全且可重试",
					description: "旧版数据会保留在磁盘中，迁移失败后可重新尝试。"
				}
			},
			data_location: "数据迁移目录：{{path}}"
		},
		skip_dialog: {
			title: "跳过数据迁移",
			warning_prefix: "高危操作：",
			warning_body: "将以默认配置启动，并不再自动提示迁移。",
			points: {
				cleared_strong: "已迁移到新版数据库的记录将被清除",
				cleared_rest: "（如有），新版将以默认数据启动。",
				retained_strong: "旧版原始数据不会被删除",
				retained_rest: "，仍保留在磁盘中，但对话、设置、知识库等内容不会出现在新版中。",
				files: "迁移过程中已复制的文件可能仍占用磁盘空间，但不会出现在新版中。",
				skip_before: "仅当你确定要",
				skip_strong: "放弃本次自动迁移",
				skip_after: "时继续。"
			},
			cancel: "取消",
			confirm: "已知晓风险，跳过并重启",
			confirm_countdown: "已知晓风险，跳过并重启 ({{seconds}}s)",
			failed: "跳过迁移失败，请重试。"
		},
		migration: {
			title: "正在迁移数据...",
			do_not_close: "迁移进行中，请勿关闭应用…"
		},
		progress: {
			processing: "正在处理{{name}}...",
			migrated_boot_config: "已迁移 {{processed}}/{{total}} 条启动配置",
			migrated_chats: "已迁移 {{processed}}/{{total}} 个对话，{{messages}} 条消息",
			migrated_preferences: "已迁移 {{processed}}/{{total}} 条配置",
			migrated_knowledge: "已迁移 {{processed}}/{{total}} 条知识库记录",
			migrated_knowledge_vectors: "已迁移 {{processed}}/{{total}} 个知识库向量工作单元",
			migrated_assistants: "已迁移 {{processed}}/{{total}} 个助手",
			migrated_files: "已迁移 {{processed}}/{{total}} 个文件",
			migrated_mcp_servers: "已迁移 {{processed}}/{{total}} 个 MCP 服务器",
			migrated_miniapps: "已迁移 {{processed}}/{{total}} 个小程序",
			migrated_translate_languages: "已迁移 {{processed}}/{{total}} 种翻译语言",
			migrated_translate_history: "已迁移 {{processed}}/{{total}} 条翻译记录",
			prepared_chats: "已准备 {{processed}}/{{total}} 个对话",
			agents_claude_config: "正在迁移 Agent 配置…",
			agents_claude_config_scanning_start: "正在统计 Agent 配置文件…",
			agents_claude_config_scanning: "正在扫描 Agent 配置：{{processed}}/{{total}} 个文件，{{byteCount}}/{{byteTotal}}",
			agents_claude_config_copying: "正在迁移 Agent 配置：{{processed}}/{{total}} 个文件，{{byteCount}}/{{byteTotal}}",
			agents_claude_config_verifying: "正在验证 Agent 配置：{{processed}}/{{total}} 个文件，{{byteCount}}/{{byteTotal}}",
			agents_messages: "正在准备 Agent 消息 {{processed}}/{{total}}…",
			agents_database: "正在导入 Agent 数据库记录…",
			agents_id_mapping: "正在更新 Agent 和会话标识…",
			agents_identity: "正在迁移 Agent 身份文件 {{processed}}/{{total}}…",
			agents_workspaces: "正在迁移 Agent 工作区 {{processed}}/{{total}}…",
			agents_claude_cache: "正在迁移 Agent 会话缓存 {{processed}}/{{total}}…",
			agents_validation: "正在验证 Agent 迁移数据…"
		},
		completed: {
			title: "欢迎来到 Cherry Studio V2",
			description: "迁移完成，你的数据已经全部就位。重启应用即可开始使用 V2。",
			description_with_warnings: "迁移已完成，但部分内容未能完整迁移。请先查看迁移提示，再重启应用。",
			steps_label: "步骤已完成",
			items_label: "迁移项",
			duration_label: "迁移耗时",
			warning_heading: "{{count}} 条迁移提示",
			warning_description: "数据已迁移完成，但以下内容需要注意。",
			warning_copy: "复制全部提示",
			warning_copy_success: "迁移提示已复制",
			warning_copy_failed: "无法复制迁移提示",
			agent_files_skipped_one: "已跳过 1 个路径重叠的 Agent 文件目标；旧版源数据已保留",
			agent_files_skipped_other: "已跳过 {{count}} 个路径重叠的 Agent 文件目标；旧版源数据已保留"
		},
		error: {
			title: "迁移失败",
			description: "迁移未完成，但您的原始数据仍完好保留。",
			error_prefix: "错误信息：",
			unknown: "未知错误",
			v1_fallback: {
				title: "下载并继续使用 V1",
				description: "您的原始数据完好保存，下载并安装 V1 版本即可继续使用。",
				download: "下载 V1 版本",
				dismiss: "知道了",
				open_failed: "无法打开下载页面"
			}
		},
		version_incompatible: {
			title: "版本升级提示",
			preamble: "Cherry Studio 对数据存储进行了重大重构，为了保证旧数据的安全迁移，我们对升级顺序有严格要求。",
			no_version_log: "无法确定您之前使用的版本。请先安装 {{requiredVersion}} 版本并运行一次，然后再安装此版本进行数据迁移。",
			v1_too_old: "您之前的版本（{{previousVersion}}）过旧，无法直接迁移。请先升级到 {{requiredVersion}} 版本并运行一次，然后再安装此版本。",
			v2_gateway_skipped: "无法从 {{previousVersion}} 直接升级到 {{currentVersion}}。请先安装 {{gatewayVersion}} 版本完成数据迁移，然后再升级到此版本。",
			ignore_hint: "您也可以选择忽略旧数据，直接以全新默认配置启动。"
		}
	}
};
const enUS = {
	common: {
		close: "Close",
		error: "Error",
		loading: "Loading",
		success: "Success"
	},
	error: { unknown: "Unknown error" },
	settings: { theme: {
		dark: "Dark mode",
		light: "Light mode",
		system: "System"
	} },
	migration: {
		title: "Data Migration Wizard",
		stages: {
			introduction: "Introduction",
			migration: "Migration",
			completed: "Completed"
		},
		buttons: {
			start_migration: "Start Migration",
			restart: "Restart App",
			retry: "Retry",
			close: "Close App",
			continue_v1: "Continue using V1",
			ignore_migration: "Ignore and Use Defaults",
			skip_migration: "Skip migration",
			more_options: "More options"
		},
		window: {
			minimize: "Minimize",
			close: "Close",
			confirm_close: {
				title: "Exit data migration",
				message: "Migration isn't finished yet. Closing the window will quit the app and you'll need to start over next launch. Quit anyway?",
				continue: "Continue migration",
				quit: "Quit",
				quit_pending: "The app will close automatically once the current step finishes…"
			}
		},
		language: { select: "Switch language" },
		status: {
			pending: "Pending",
			running: "Running",
			completed: "Completed",
			failed: "Failed"
		},
		diagnostics: {
			title: "Save troubleshooting file",
			save: "Save diagnostic bundle",
			saving: "Saving…",
			export_description: "The bundle includes migration errors, system information, and available application logs. Logs may contain file paths, error stacks, user content, or credentials. It is saved locally and never uploaded automatically; share it only with Cherry Studio support.",
			open_from_error: "Export a diagnostic bundle for this error",
			saved_title: "Diagnostic bundle saved",
			privacy: "Application logs may contain file paths, error stacks, user content, or credentials. Do not share them publicly or with anyone outside the Cherry Studio support team.",
			saved_local: "The diagnostic bundle was saved locally and was not uploaded automatically. Please send it to the feedback email to help us investigate.",
			logs_not_included: "Application logs could not be included. This diagnostic bundle contains only system information.",
			open_folder: "Open file location",
			contact: "Copy feedback email",
			copy_success: "Feedback email copied",
			copy_failed: "Failed to copy feedback email",
			save_failed: "Could not save diagnostic bundle",
			open_folder_failed: "Could not open file location"
		},
		more_options: {
			description: "Choose how you want to continue. Your original V1 data will not be deleted either way.",
			diagnostics_title: "Save troubleshooting information",
			use_v2_title: "Use V2 without importing V1 data",
			skip_description: "Start with default settings without importing your V1 data.",
			continue_v1_description: "Download and install V1 to keep using your original data.",
			diagnostics_description: "Save errors and app logs locally so you can share them with support."
		},
		introduction: {
			title: "Migrate Data to New Architecture",
			subtitle: "Cherry Studio V2 · New Data Architecture",
			features: {
				architecture: {
					title: "New Data Architecture",
					description: "Storage and usage are rebuilt for major gains in efficiency and security."
				},
				migration: {
					title: "Migration Required",
					description: "Legacy data must be migrated before it can be used in V2."
				},
				safety: {
					title: "Safe and Retryable",
					description: "Your legacy data stays on disk, so you can retry if a migration fails."
				}
			},
			data_location: "Data migration directory: {{path}}"
		},
		skip_dialog: {
			title: "Skip Data Migration",
			warning_prefix: "High-risk action: ",
			warning_body: "Starts with default settings, and migration will not be prompted again.",
			points: {
				cleared_strong: "Records already migrated to the new database will be cleared",
				cleared_rest: " (if any), and the new version will start with default data.",
				retained_strong: "Original legacy data will not be deleted",
				retained_rest: " and remains on disk, but chats, settings, knowledge bases, and related content will not appear in the new version.",
				files: "Files copied during migration may still take up disk space, but they will not appear in the new version.",
				skip_before: "Continue only if you are sure you want to ",
				skip_strong: "skip this automatic migration",
				skip_after: "."
			},
			cancel: "Cancel",
			confirm: "I understand the risk, skip and restart",
			confirm_countdown: "I understand the risk, skip and restart ({{seconds}}s)",
			failed: "Failed to skip migration. Please try again."
		},
		migration: {
			title: "Migrating Data...",
			do_not_close: "Migration in progress, please do not close the app…"
		},
		progress: {
			processing: "Processing {{name}}...",
			migrated_boot_config: "Migrated {{processed}}/{{total}} boot config items",
			migrated_chats: "Migrated {{processed}}/{{total}} conversations, {{messages}} messages",
			migrated_preferences: "Migrated {{processed}}/{{total}} preferences",
			migrated_knowledge: "Migrated {{processed}}/{{total}} knowledge records",
			migrated_knowledge_vectors: "Migrated {{processed}}/{{total}} knowledge vector work units",
			migrated_assistants: "Migrated {{processed}}/{{total}} assistants",
			migrated_files: "Migrated {{processed}}/{{total}} files",
			migrated_mcp_servers: "Migrated {{processed}}/{{total}} MCP servers",
			migrated_miniapps: "Migrated {{processed}}/{{total}} mini apps",
			migrated_translate_languages: "Migrated {{processed}}/{{total}} translate languages",
			migrated_translate_history: "Migrated {{processed}}/{{total}} translate history records",
			prepared_chats: "Prepared {{processed}}/{{total}} conversations",
			agents_claude_config: "Migrating Agent configuration…",
			agents_claude_config_scanning_start: "Counting Agent configuration files…",
			agents_claude_config_scanning: "Scanning Agent configuration: {{processed}}/{{total}} files, {{byteCount}}/{{byteTotal}}",
			agents_claude_config_copying: "Migrating Agent configuration: {{processed}}/{{total}} files, {{byteCount}}/{{byteTotal}}",
			agents_claude_config_verifying: "Verifying Agent configuration: {{processed}}/{{total}} files, {{byteCount}}/{{byteTotal}}",
			agents_messages: "Preparing Agent messages {{processed}}/{{total}}…",
			agents_database: "Importing Agent database records…",
			agents_id_mapping: "Updating Agent and Session identifiers…",
			agents_identity: "Migrating Agent identity files {{processed}}/{{total}}…",
			agents_workspaces: "Migrating Agent workspaces {{processed}}/{{total}}…",
			agents_claude_cache: "Migrating Agent session cache {{processed}}/{{total}}…",
			agents_validation: "Validating migrated Agent data…"
		},
		completed: {
			title: "Welcome to Cherry Studio V2",
			description: "Migration is complete. Your data is ready. Restart the app to start using V2.",
			description_with_warnings: "Migration completed with some content omitted. Review the migration notices before restarting the app.",
			steps_label: "Steps completed",
			items_label: "Migration items",
			duration_label: "Migration time",
			warning_heading: "{{count}} migration notice(s)",
			warning_description: "Migration completed, but the following items need attention.",
			warning_copy: "Copy all notices",
			warning_copy_success: "Migration notices copied",
			warning_copy_failed: "Failed to copy migration notices",
			agent_files_skipped_one: "Skipped 1 overlapping Agent filesystem target; legacy source data was preserved",
			agent_files_skipped_other: "Skipped {{count}} overlapping Agent filesystem targets; legacy source data was preserved"
		},
		error: {
			title: "Migration Failed",
			description: "Migration did not finish, but your original data remains intact.",
			error_prefix: "Error: ",
			unknown: "Unknown error",
			v1_fallback: {
				title: "Download and Continue Using V1",
				description: "Your original data is intact. Download and install V1 to keep working.",
				download: "Download V1",
				dismiss: "Got it",
				open_failed: "Could not open the download page"
			}
		},
		version_incompatible: {
			title: "Version Upgrade Required",
			preamble: "Cherry Studio has undergone a major data storage refactoring. To ensure safe migration of your data, we have strict requirements on the upgrade order.",
			no_version_log: "Cannot determine your previous version. Please install version {{requiredVersion}} first and run it at least once, then install this version to complete the data migration.",
			v1_too_old: "Your previous version ({{previousVersion}}) is too old to migrate directly. Please install version {{requiredVersion}} first, then install this version.",
			v2_gateway_skipped: "Cannot upgrade directly from {{previousVersion}} to {{currentVersion}}. Please install version {{gatewayVersion}} first to complete the data migration, then upgrade to this version.",
			ignore_hint: "You can also choose to ignore old data and start fresh with default settings."
		}
	}
};
function detectLanguage() {
	return (navigator.language || navigator.languages?.[0] || "en-US").toLowerCase().includes("zh") ? "zh-CN" : "en-US";
}
var language = detectLanguage();
var initI18n = async () => {
	await instance.use(initReactI18next).init({
		resources: {
			"zh-CN": { translation: zhCN },
			"en-US": { translation: enUS }
		},
		lng: language,
		fallbackLng: "en-US",
		interpolation: { escapeValue: false }
	});
};
const MIGRATION_LOCAL_STORAGE_KEYS = ["onboarding-completed"];
const MigrationIpcChannels = {
	CheckNeeded: "migration:check-needed",
	GetProgress: "migration:get-progress",
	GetLastError: "migration:get-last-error",
	Start: "migration:start",
	PrepareExport: "migration:prepare-export",
	StartMigration: "migration:start-migration",
	ReportExportStage: "migration:report-export-stage",
	ReportError: "migration:report-error",
	Retry: "migration:retry",
	Cancel: "migration:cancel",
	Restart: "migration:restart",
	WriteExportFile: "migration:write-export-file",
	SaveDiagnosticBundle: "migration:save-diagnostic-bundle",
	ShowDiagnosticBundleInFolder: "migration:show-diagnostic-bundle-in-folder",
	OpenDownloadPage: "migration:open-download-page",
	SkipMigration: "migration:skip-migration",
	Minimize: "migration:minimize",
	CloseWindow: "migration:close-window",
	ConfirmClose: "migration:confirm-close",
	ConfirmQuit: "migration:confirm-quit",
	CancelClose: "migration:cancel-close",
	Progress: "migration:progress",
	ExportProgress: "migration:export-progress"
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const CloseMigrationDialog = ({ open, onOpenChange, onConfirm }) => {
	const { t } = useTranslation();
	const continueRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "sm",
			showCloseButton: false,
			onOpenAutoFocus: (event) => {
				event.preventDefault();
				continueRef.current?.focus();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.window.confirm_close.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("migration.window.confirm_close.message") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "destructive",
				onClick: onConfirm,
				children: t("migration.window.confirm_close.quit")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ref: continueRef,
				variant: "emphasis",
				onClick: () => onOpenChange(false),
				children: t("migration.window.confirm_close.continue")
			})] })]
		})
	});
};
var COLOR_CLASSES = [
	"bg-primary",
	"bg-green-500",
	"bg-blue-500",
	"bg-amber-500",
	"bg-pink-500",
	"bg-sky-500"
];
var PIECE_COUNT = 60;
function prefersReducedMotion() {
	return typeof window !== "undefined" && Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}
const Confetti = () => {
	const pieces = (0, import_react.useMemo)(() => Array.from({ length: PIECE_COUNT }).map((_, i) => {
		const angle = Math.random() * Math.PI;
		const velocity = 56 + Math.random() * 148;
		const x = Math.cos(angle) * velocity;
		const rise = -(36 + Math.random() * 124);
		const fall = 210 + Math.random() * 250;
		const rotate = (Math.random() - .5) * 720;
		return {
			id: i,
			x,
			midX: x * .45,
			rise,
			fall,
			delay: Math.random() * .12,
			duration: 1.5 + Math.random() * 1.1,
			size: 5 + Math.random() * 6,
			rotate,
			rotateEnd: rotate * 1.35,
			colorClassName: COLOR_CLASSES[i % COLOR_CLASSES.length],
			round: Math.random() < .35
		};
	}), []);
	if (prefersReducedMotion()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "migration-v2.confetti",
		className: "migration-confetti pointer-events-none absolute top-1/2 left-1/2 z-20 overflow-visible",
		"aria-hidden": true,
		children: pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `animation-migration-confetti-piece ${p.colorClassName}`,
			style: {
				width: p.size,
				height: p.round ? p.size : p.size * .5,
				borderRadius: p.round ? "9999px" : "1px",
				animationDelay: `${p.delay}s`,
				animationDuration: `${p.duration}s`,
				["--confetti-x"]: `${p.x}px`,
				["--confetti-mid-x"]: `${p.midX}px`,
				["--confetti-rise"]: `${p.rise}px`,
				["--confetti-fall"]: `${p.fall}px`,
				["--confetti-rotate"]: `${p.rotate}deg`,
				["--confetti-rotate-end"]: `${p.rotateEnd}deg`
			}
		}, p.id))
	});
};
var logger$2 = loggerService.withContext("useMigrationProgress");
var initialProgress = {
	stage: "introduction",
	overallProgress: 0,
	currentMessage: "Ready to start data migration",
	migrators: []
};
function useMigrationProgress() {
	const [progress, setProgress] = (0, import_react.useState)(initialProgress);
	const [lastError, setLastError] = (0, import_react.useState)(null);
	const migrationStageStartedAtRef = (0, import_react.useRef)(null);
	const applyMigrationStageTiming = (0, import_react.useCallback)((progressData) => {
		if (progressData.stage === "migration") {
			if (migrationStageStartedAtRef.current === null) migrationStageStartedAtRef.current = performance.now();
			return progressData;
		}
		if (progressData.stage === "completed") {
			const startedAt = migrationStageStartedAtRef.current;
			migrationStageStartedAtRef.current = null;
			if (startedAt === null || !progressData.summary) return progressData;
			return {
				...progressData,
				summary: {
					...progressData.summary,
					durationMs: Math.max(0, performance.now() - startedAt)
				}
			};
		}
		migrationStageStartedAtRef.current = null;
		return progressData;
	}, []);
	(0, import_react.useEffect)(() => {
		const handleProgress = (_, progressData) => {
			setProgress(applyMigrationStageTiming(progressData));
			if (progressData.error) setLastError(progressData.error);
		};
		const cleanupProgressListener = window.electron.ipcRenderer.on(MigrationIpcChannels.Progress, handleProgress);
		window.electron.ipcRenderer.invoke(MigrationIpcChannels.GetProgress).then((initialProgress$1) => {
			if (initialProgress$1) setProgress(applyMigrationStageTiming(initialProgress$1));
		}).catch((error$1) => {
			logger$2.error("Failed to get initial migration progress", error$1);
		});
		window.electron.ipcRenderer.invoke(MigrationIpcChannels.GetLastError).then((error$1) => {
			if (error$1) setLastError(error$1);
		}).catch((error$1) => {
			logger$2.error("Failed to get last migration error", error$1);
		});
		return cleanupProgressListener;
	}, [applyMigrationStageTiming]);
	return {
		progress,
		lastError
	};
}
function useMigrationActions() {
	return {
		startMigration: (0, import_react.useCallback)(async (payload) => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.StartMigration, payload);
		}, []),
		retry: (0, import_react.useCallback)(() => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.Retry);
		}, []),
		cancel: (0, import_react.useCallback)(() => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.Cancel);
		}, []),
		restart: (0, import_react.useCallback)(() => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.Restart);
		}, []),
		skipMigration: (0, import_react.useCallback)(() => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.SkipMigration);
		}, []),
		saveDiagnostics: (0, import_react.useCallback)((dialogTitle, logDate) => {
			const payload = {
				dialogTitle,
				logDate
			};
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.SaveDiagnosticBundle, payload);
		}, []),
		showDiagnosticBundleInFolder: (0, import_react.useCallback)(() => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.ShowDiagnosticBundleInFolder);
		}, []),
		openDownloadPage: (0, import_react.useCallback)((language$1) => {
			return window.electron.ipcRenderer.invoke(MigrationIpcChannels.OpenDownloadPage, language$1);
		}, [])
	};
}
var SUPPORT_EMAIL = "support@cherry-ai.com";
var logger$1 = loggerService.withContext("MigrationDiagnosticPanel");
function formatLocalDate(date) {
	return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function MigrationDiagnosticPanel({ embedded = false, onSaved, savedLogs, showPrivacy = true }) {
	const { t } = useTranslation();
	const { saveDiagnostics, showDiagnosticBundleInFolder } = useMigrationActions();
	const [diagnosticStatus, setDiagnosticStatus] = (0, import_react.useState)(() => {
		if (savedLogs === "included") return "saved_with_logs";
		if (savedLogs === "not_included") return "saved_without_logs";
		return "idle";
	});
	const [logDate] = (0, import_react.useState)(() => formatLocalDate(/* @__PURE__ */ new Date()));
	const revealButtonRef = (0, import_react.useRef)(null);
	const saved = diagnosticStatus === "saved_with_logs" || diagnosticStatus === "saved_without_logs";
	(0, import_react.useEffect)(() => {
		if (saved) revealButtonRef.current?.focus();
	}, [saved]);
	const handleSave = async () => {
		setDiagnosticStatus("saving");
		try {
			const result = await saveDiagnostics(t("migration.diagnostics.save"), logDate);
			if (result.status === "canceled") setDiagnosticStatus("idle");
			else if (result.status === "failed") {
				setDiagnosticStatus("failed");
				error(t("migration.diagnostics.save_failed"));
			} else if (onSaved) onSaved(result.logs);
			else setDiagnosticStatus(result.logs === "included" ? "saved_with_logs" : "saved_without_logs");
		} catch (error$1) {
			logger$1.error("Failed to save migration diagnostic bundle", error$1);
			setDiagnosticStatus("failed");
			error(t("migration.diagnostics.save_failed"));
		}
	};
	const handleReveal = async () => {
		try {
			if (!await showDiagnosticBundleInFolder()) error(t("migration.diagnostics.open_folder_failed"));
		} catch (error$1) {
			logger$1.error("Failed to show migration diagnostic bundle in folder", error$1);
			error(t("migration.diagnostics.open_folder_failed"));
		}
	};
	const handleContact = async () => {
		try {
			await navigator.clipboard.writeText(SUPPORT_EMAIL);
			success(t("migration.diagnostics.copy_success"));
		} catch {
			error(t("migration.diagnostics.copy_failed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ui": "migration-v2.diagnostic-panel",
		className: embedded ? "space-y-3 pt-1" : "space-y-3 rounded-xl border border-border bg-muted/15 px-4 py-3",
		children: [
			showPrivacy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs leading-relaxed",
				children: t("migration.diagnostics.privacy")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "migration-v2.diagnostic-panel.status",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				className: "space-y-1 text-xs leading-relaxed",
				children: saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foreground",
					children: t("migration.diagnostics.saved_local")
				}), diagnosticStatus === "saved_without_logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("migration.diagnostics.logs_not_included")
				})] })
			}),
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ref: revealButtonRef,
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: () => void handleReveal(),
					children: t("migration.diagnostics.open_folder")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "default",
					className: "flex-1",
					onClick: () => void handleContact(),
					children: t("migration.diagnostics.contact")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				className: "w-full",
				disabled: diagnosticStatus === "saving",
				onClick: () => void handleSave(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), t(diagnosticStatus === "saving" ? "migration.diagnostics.saving" : "migration.diagnostics.save")]
			})
		]
	});
}
var controlButtonClass = "h-full w-12 rounded-none text-muted-foreground shadow-none transition-[background,color] duration-150 hover:bg-accent hover:text-foreground [&_svg]:pointer-events-none";
const MigrationWindowControls = () => {
	const { t } = useTranslation();
	if (isMac) return null;
	const handleMinimize = () => {
		window.electron.ipcRenderer.invoke(MigrationIpcChannels.Minimize);
	};
	const handleClose = () => {
		window.electron.ipcRenderer.invoke(MigrationIpcChannels.CloseWindow);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "migration-v2.window-controls",
		className: "absolute top-0 right-0 flex h-full items-stretch [-webkit-app-region:no-drag]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon-sm",
			className: controlButtonClass,
			onClick: handleMinimize,
			"aria-label": t("migration.window.minimize"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon-sm",
			className: cn(controlButtonClass, "hover:bg-destructive hover:text-destructive-foreground"),
			onClick: handleClose,
			"aria-label": t("migration.window.close"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
		})]
	});
};
var ICON_WRAP = "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg";
var StatusIcon = ({ status }) => {
	switch (status) {
		case "completed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "migration-v2.status-icon",
			className: cn(ICON_WRAP, "bg-success-subtle text-success-subtle-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				size: 12,
				strokeWidth: 3,
				className: "lucide-custom"
			})
		});
		case "running": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "migration-v2.status-icon",
			className: cn(ICON_WRAP, "bg-primary/10 text-primary"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 12,
				className: "animate-spin"
			})
		});
		case "failed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "migration-v2.status-icon",
			className: cn(ICON_WRAP, "bg-error-subtle text-error-subtle-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 12 })
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "migration-v2.status-icon",
			className: cn(ICON_WRAP, "bg-muted/40 text-foreground-tertiary")
		});
	}
};
var statusTextClass = (status) => {
	switch (status) {
		case "failed": return "text-destructive";
		case "completed": return "text-success";
		case "running": return "text-primary";
		default: return "text-foreground-tertiary";
	}
};
var STATUS_KEY = {
	pending: "migration.status.pending",
	running: "migration.status.running",
	completed: "migration.status.completed",
	failed: "migration.status.failed"
};
const MigratorProgressList = ({ migrators }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "migration-v2.migrator-progress-list",
		className: "divide-y divide-border overflow-hidden rounded-xl border border-border",
		children: migrators.map((migrator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-3.5 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { status: migrator.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex-1 truncate text-sm", migrator.status === "pending" ? "text-foreground-disabled" : "text-foreground"),
					children: migrator.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0 text-xs", statusTextClass(migrator.status)),
					children: migrator.error || t(STATUS_KEY[migrator.status])
				})
			]
		}, migrator.id))
	});
};
var COUNTDOWN_SECONDS = 10;
const SkipMigrationDialog = ({ open, onOpenChange, onConfirm }) => {
	const { t } = useTranslation();
	const [seconds, setSeconds] = (0, import_react.useState)(COUNTDOWN_SECONDS);
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPending(false);
		if (!open) {
			setSeconds(COUNTDOWN_SECONDS);
			return;
		}
		setSeconds(COUNTDOWN_SECONDS);
		const timer = setInterval(() => {
			setSeconds((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [open]);
	const counting = seconds > 0;
	const handleOpenChange = (nextOpen) => {
		if (!nextOpen && pending) return;
		onOpenChange(nextOpen);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "default",
			showCloseButton: false,
			closeOnOverlayClick: !pending,
			"aria-busy": pending || void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.skip_dialog.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						type: "error",
						showIcon: false,
						className: "shadow-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-semibold",
								children: t("migration.skip_dialog.warning_prefix")
							}), t("migration.skip_dialog.warning_body")]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-muted-foreground text-sm leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 size-1.5 shrink-0 rounded-full bg-destructive",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-foreground",
									children: t("migration.skip_dialog.points.cleared_strong")
								}), t("migration.skip_dialog.points.cleared_rest")] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 size-1.5 shrink-0 rounded-full bg-destructive",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-foreground",
									children: t("migration.skip_dialog.points.retained_strong")
								}), t("migration.skip_dialog.points.retained_rest")] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 size-1.5 shrink-0 rounded-full bg-destructive",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("migration.skip_dialog.points.files") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 size-1.5 shrink-0 rounded-full bg-destructive",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									t("migration.skip_dialog.points.skip_before"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-medium text-foreground",
										children: t("migration.skip_dialog.points.skip_strong")
									}),
									t("migration.skip_dialog.points.skip_after")
								] })]
							})
						]
					})]
				}) })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: pending,
					children: t("migration.skip_dialog.cancel")
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "destructive",
				disabled: counting || pending,
				loading: pending,
				onClick: () => {
					setPending(true);
					onConfirm();
				},
				children: counting ? t("migration.skip_dialog.confirm_countdown", { seconds }) : t("migration.skip_dialog.confirm")
			})] })]
		})
	});
};
const V1DownloadDialog = ({ open, onOpenChange, onDownload }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.error.v1_fallback.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("migration.error.v1_fallback.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					children: t("migration.error.v1_fallback.dismiss")
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "emphasis",
				onClick: onDownload,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 }), t("migration.error.v1_fallback.download")]
			})] })]
		})
	});
};
var DEXIE_DB_NAME = "CherryStudio";
var DEXIE_EXPORT_PAGE_SIZE = 100;
var DEXIE_EXPORT_CHUNK_CHAR_LIMIT = 1024 * 1024;
var REQUIRED_TABLES = [
	"topics",
	"files",
	"knowledge_notes",
	"message_blocks"
];
var OPTIONAL_TABLES = [
	"settings",
	"translate_history",
	"quick_phrases",
	"translate_languages"
];
var JsonExportWriter = class {
	pending = "";
	writeMode = "overwrite";
	activeObjects = /* @__PURE__ */ new WeakSet();
	constructor(exportPath, tableName) {
		this.exportPath = exportPath;
		this.tableName = tableName;
	}
	async flush() {
		if (!this.pending) return;
		await window.electron.ipcRenderer.invoke(MigrationIpcChannels.WriteExportFile, this.exportPath, this.tableName, this.pending, this.writeMode);
		this.pending = "";
		this.writeMode = "append";
	}
	async append(text) {
		let offset = 0;
		while (offset < text.length) {
			const available = DEXIE_EXPORT_CHUNK_CHAR_LIMIT - this.pending.length;
			const end = clampSurrogateBoundary(text, Math.min(offset + available, text.length));
			if (end === offset) {
				await this.flush();
				continue;
			}
			this.pending += text.slice(offset, end);
			offset = end;
			if (this.pending.length >= DEXIE_EXPORT_CHUNK_CHAR_LIMIT) await this.flush();
		}
	}
	prepareValue(value) {
		if (value && typeof value === "object") {
			const toJSON = value.toJSON;
			if (typeof toJSON === "function") return toJSON.call(value);
			if (value instanceof Number || value instanceof String || value instanceof Boolean) return value.valueOf();
		}
		return value;
	}
	isOmitted(value) {
		return value === void 0 || typeof value === "function" || typeof value === "symbol";
	}
	async appendString(value) {
		await this.append("\"");
		let offset = 0;
		while (offset < value.length) {
			const end = clampSurrogateBoundary(value, Math.min(offset + DEXIE_EXPORT_CHUNK_CHAR_LIMIT / 4, value.length));
			const encoded = JSON.stringify(value.slice(offset, end));
			await this.append(encoded.slice(1, -1));
			offset = end;
		}
		await this.append("\"");
	}
	async appendPreparedValue(value, arrayElement) {
		if (this.isOmitted(value)) {
			if (arrayElement) await this.append("null");
			return arrayElement;
		}
		if (value === null) {
			await this.append("null");
			return true;
		}
		switch (typeof value) {
			case "string":
				await this.appendString(value);
				return true;
			case "number":
				await this.append(Number.isFinite(value) ? String(value === 0 ? 0 : value) : "null");
				return true;
			case "boolean":
				await this.append(value ? "true" : "false");
				return true;
			case "bigint": throw new TypeError("Do not know how to serialize a BigInt");
			case "object": {
				const object = value;
				if (this.activeObjects.has(object)) throw new TypeError("Converting circular structure to JSON");
				this.activeObjects.add(object);
				try {
					if (Array.isArray(value)) {
						await this.append("[");
						for (let index = 0; index < value.length; index++) {
							if (index > 0) await this.append(",");
							await this.appendValue(value[index], true);
						}
						await this.append("]");
						return true;
					}
					await this.append("{");
					let emitted = 0;
					for (const key of Object.keys(value)) {
						const propertyValue = this.prepareValue(value[key]);
						if (this.isOmitted(propertyValue)) continue;
						if (emitted > 0) await this.append(",");
						await this.appendString(key);
						await this.append(":");
						await this.appendPreparedValue(propertyValue, false);
						emitted++;
					}
					await this.append("}");
					return true;
				} finally {
					this.activeObjects.delete(object);
				}
			}
			default: return false;
		}
	}
	async appendValue(value, arrayElement = false) {
		return this.appendPreparedValue(this.prepareValue(value), arrayElement);
	}
	async close() {
		await this.flush();
	}
};
var DexieExporter = class {
	exportPath;
	constructor(exportPath) {
		this.exportPath = exportPath;
	}
	createRecordExportError(tableName, primaryKey, cause) {
		const causeMessage = cause instanceof Error ? cause.message : String(cause);
		return new Error(`Failed to export Dexie table "${tableName}" at primary key "${String(primaryKey)}": ${causeMessage}`, { cause });
	}
	async exportTable(db, tableName) {
		const table = db.table(tableName);
		let lastPrimaryKey;
		let hasRecords = false;
		const writer = new JsonExportWriter(this.exportPath, tableName);
		await writer.append("[");
		while (true) {
			const primaryKeys = await (lastPrimaryKey === void 0 ? table.orderBy(":id") : table.where(":id").above(lastPrimaryKey)).limit(DEXIE_EXPORT_PAGE_SIZE).primaryKeys();
			if (primaryKeys.length === 0) break;
			for (let index = 0; index < primaryKeys.length; index++) {
				const primaryKey = primaryKeys[index];
				const record = await table.get(primaryKey);
				if (record === void 0) throw this.createRecordExportError(tableName, primaryKey, /* @__PURE__ */ new Error("Record missing from IndexedDB page"));
				try {
					if (hasRecords) await writer.append(",");
					if (!await writer.appendValue(record)) throw new Error("Record is not JSON serializable");
				} catch (error$1) {
					throw this.createRecordExportError(tableName, primaryKey, error$1);
				}
				hasRecords = true;
			}
			lastPrimaryKey = primaryKeys[primaryKeys.length - 1];
		}
		await writer.append("]");
		await writer.close();
	}
	async openLegacyDb() {
		if (!await Dexie.exists(DEXIE_DB_NAME)) return null;
		const db = new Dexie(DEXIE_DB_NAME);
		await db.open();
		return db;
	}
	async exportAll(onProgress) {
		const db = await this.openLegacyDb();
		if (!db) return this.exportPath;
		try {
			const existingTables = db.tables.map((t) => t.name);
			const tablesToExport = [...REQUIRED_TABLES, ...OPTIONAL_TABLES].filter((t) => existingTables.includes(t));
			for (let i = 0; i < tablesToExport.length; i++) {
				const tableName = tablesToExport[i];
				await onProgress?.({
					table: tableName,
					progress: 0,
					total: tablesToExport.length
				});
				await this.exportTable(db, tableName);
				await onProgress?.({
					table: tableName,
					progress: i + 1,
					total: tablesToExport.length
				});
			}
			return this.exportPath;
		} finally {
			db.close();
		}
	}
	async getTableCounts() {
		const db = await this.openLegacyDb();
		if (!db) return {};
		try {
			const counts = {};
			for (const table of db.tables) counts[table.name] = await table.count();
			return counts;
		} finally {
			db.close();
		}
	}
};
var LocalStorageExporter = class {
	exportPath;
	exportedCount = 0;
	constructor(exportPath) {
		this.exportPath = exportPath;
	}
	async export() {
		this.exportedCount = 0;
		await window.electron.ipcRenderer.invoke(MigrationIpcChannels.WriteExportFile, this.exportPath, "localStorage", "[", "overwrite");
		for (const key of MIGRATION_LOCAL_STORAGE_KEYS) {
			const rawValue = localStorage.getItem(key);
			if (rawValue === null) continue;
			let value = rawValue;
			if (rawValue !== null) try {
				value = JSON.parse(rawValue);
			} catch {}
			const record = {
				key,
				value
			};
			await window.electron.ipcRenderer.invoke(MigrationIpcChannels.WriteExportFile, this.exportPath, "localStorage", `${this.exportedCount > 0 ? "," : ""}${JSON.stringify(record)}`, "append");
			this.exportedCount += 1;
		}
		await window.electron.ipcRenderer.invoke(MigrationIpcChannels.WriteExportFile, this.exportPath, "localStorage", "]", "append");
		return `${this.exportPath}/localStorage.json`;
	}
	hasData() {
		return MIGRATION_LOCAL_STORAGE_KEYS.some((key) => localStorage.getItem(key) !== null);
	}
	getEntryCount() {
		return this.exportedCount;
	}
};
var PERSIST_KEY = "persist:cherry-studio";
var EXPORT_CHUNK_CHAR_LIMIT = 1024 * 1024;
var SLICES_TO_EXPORT = [
	"settings",
	"assistants",
	"knowledge",
	"llm",
	"mcp",
	"minapps",
	"note",
	"selectionStore",
	"preprocess",
	"ocr",
	"websearch",
	"codeTools",
	"paintings"
];
var ReduxExporter = class {
	skipWhitespace(text, offset) {
		while (offset < text.length && /\s/u.test(text[offset])) offset++;
		return offset;
	}
	scanStringEnd(text, start) {
		if (text[start] !== "\"") throw new SyntaxError(`Expected string at offset ${start}`);
		for (let offset = start + 1; offset < text.length; offset++) if (text[offset] === "\\") offset++;
		else if (text[offset] === "\"") return offset + 1;
		throw new SyntaxError(`Unterminated string at offset ${start}`);
	}
	scanValueEnd(text, start) {
		if (text[start] === "\"") return this.scanStringEnd(text, start);
		if (text[start] !== "{" && text[start] !== "[") {
			let offset$1 = start;
			while (offset$1 < text.length && text[offset$1] !== "," && text[offset$1] !== "}") offset$1++;
			return offset$1;
		}
		const expectedClosers = [];
		let offset = start;
		while (offset < text.length) {
			const char = text[offset];
			if (char === "\"") {
				offset = this.scanStringEnd(text, offset);
				continue;
			}
			if (char === "{") expectedClosers.push("}");
			else if (char === "[") expectedClosers.push("]");
			else if (char === "}" || char === "]") {
				if (expectedClosers.pop() !== char) throw new SyntaxError(`Mismatched JSON delimiter at offset ${offset}`);
				if (expectedClosers.length === 0) return offset + 1;
			}
			offset++;
		}
		throw new SyntaxError(`Unterminated JSON value at offset ${start}`);
	}
	async visitPersistedSlices(rawData, onSlice) {
		let offset = this.skipWhitespace(rawData, 0);
		if (rawData[offset] !== "{") throw new SyntaxError("Redux Persist root must be a JSON object");
		offset = this.skipWhitespace(rawData, offset + 1);
		if (rawData[offset] === "}") return;
		while (offset < rawData.length) {
			const keyEnd = this.scanStringEnd(rawData, offset);
			const key = JSON.parse(rawData.slice(offset, keyEnd));
			if (typeof key !== "string") throw new SyntaxError(`Invalid Redux Persist key at offset ${offset}`);
			offset = this.skipWhitespace(rawData, keyEnd);
			if (rawData[offset] !== ":") throw new SyntaxError(`Expected ':' after Redux Persist key '${key}'`);
			offset = this.skipWhitespace(rawData, offset + 1);
			const valueEnd = this.scanValueEnd(rawData, offset);
			if (SLICES_TO_EXPORT.includes(key)) {
				if (rawData[offset] !== "\"") throw new SyntaxError(`Redux Persist slice '${key}' is not a string`);
				await onSlice(key, offset, valueEnd);
			}
			offset = this.skipWhitespace(rawData, valueEnd);
			if (rawData[offset] === "}") {
				offset = this.skipWhitespace(rawData, offset + 1);
				if (offset !== rawData.length) throw new SyntaxError(`Unexpected data at offset ${offset}`);
				return;
			}
			if (rawData[offset] !== ",") throw new SyntaxError(`Expected ',' at offset ${offset}`);
			offset = this.skipWhitespace(rawData, offset + 1);
		}
		throw new SyntaxError("Unterminated Redux Persist root object");
	}
	async writeSliceChunk(exportPath, sliceName, chunk, writeMode) {
		await window.electron.ipcRenderer.invoke(MigrationIpcChannels.WriteExportFile, exportPath, sliceName, chunk, writeMode);
	}
	async writeSlice(exportPath, sliceName, rawData, valueStart, valueEnd) {
		let pending = "";
		let writeMode = "overwrite";
		const flush = async () => {
			if (pending.length <= EXPORT_CHUNK_CHAR_LIMIT) return;
			const end = clampSurrogateBoundary(pending, EXPORT_CHUNK_CHAR_LIMIT);
			if (end === 0) return;
			const chunk = pending.slice(0, end);
			pending = pending.slice(end);
			await this.writeSliceChunk(exportPath, sliceName, chunk, writeMode);
			writeMode = "append";
		};
		const append = async (text) => {
			pending += text;
			while (pending.length > EXPORT_CHUNK_CHAR_LIMIT) await flush();
		};
		let offset = valueStart + 1;
		const contentEnd = valueEnd - 1;
		while (offset < contentEnd) {
			let spanEnd = offset;
			const spanLimit = clampSurrogateBoundary(rawData, Math.min(offset + EXPORT_CHUNK_CHAR_LIMIT, contentEnd));
			while (spanEnd < spanLimit && rawData[spanEnd] !== "\\") {
				if (rawData.charCodeAt(spanEnd) <= 31) throw new SyntaxError(`Unescaped control character in Redux Persist slice '${sliceName}'`);
				spanEnd++;
			}
			if (spanEnd > offset) await append(rawData.slice(offset, spanEnd));
			if (spanEnd === contentEnd) break;
			if (rawData[spanEnd] !== "\\") {
				offset = spanEnd;
				continue;
			}
			const escape = rawData[spanEnd + 1];
			switch (escape) {
				case "\"":
				case "\\":
				case "/":
					await append(escape);
					offset = spanEnd + 2;
					break;
				case "b":
					await append("\b");
					offset = spanEnd + 2;
					break;
				case "f":
					await append("\f");
					offset = spanEnd + 2;
					break;
				case "n":
					await append("\n");
					offset = spanEnd + 2;
					break;
				case "r":
					await append("\r");
					offset = spanEnd + 2;
					break;
				case "t":
					await append("	");
					offset = spanEnd + 2;
					break;
				case "u": {
					const hex = rawData.slice(spanEnd + 2, spanEnd + 6);
					if (!/^[0-9a-fA-F]{4}$/u.test(hex)) throw new SyntaxError(`Invalid Unicode escape in Redux Persist slice '${sliceName}'`);
					await append(String.fromCharCode(Number.parseInt(hex, 16)));
					offset = spanEnd + 6;
					break;
				}
				default: throw new SyntaxError(`Invalid escape sequence in Redux Persist slice '${sliceName}'`);
			}
		}
		while (pending.length > EXPORT_CHUNK_CHAR_LIMIT) await flush();
		if (pending.length > 0 || writeMode === "overwrite") await this.writeSliceChunk(exportPath, sliceName, pending, writeMode);
	}
	async export(exportPath) {
		let rawData = localStorage.getItem(PERSIST_KEY);
		if (!rawData) return {
			exportPath,
			slicesFound: [],
			slicesMissing: [...SLICES_TO_EXPORT]
		};
		const foundSlices = /* @__PURE__ */ new Set();
		try {
			await this.visitPersistedSlices(rawData, async (sliceName, valueStart, valueEnd) => {
				await this.writeSlice(exportPath, sliceName, rawData, valueStart, valueEnd);
				foundSlices.add(sliceName);
			});
		} catch (error$1) {
			if (error$1 instanceof SyntaxError) throw new Error(`Failed to parse Redux Persist root data: ${error$1.message}`, { cause: error$1 });
			throw error$1;
		}
		rawData = null;
		return {
			exportPath,
			slicesFound: SLICES_TO_EXPORT.filter((sliceName) => foundSlices.has(sliceName)),
			slicesMissing: SLICES_TO_EXPORT.filter((sliceName) => !foundSlices.has(sliceName))
		};
	}
	getRawData() {
		return localStorage.getItem(PERSIST_KEY);
	}
	hasData() {
		return localStorage.getItem(PERSIST_KEY) !== null;
	}
	getPersistedSlices() {
		const rawData = localStorage.getItem(PERSIST_KEY);
		if (!rawData) return [];
		try {
			const persistedState = JSON.parse(rawData);
			return Object.keys(persistedState).filter((key) => key !== "_persist");
		} catch {
			return [];
		}
	}
};
var logger = loggerService.withContext("MigrationApp");
var badgeToneClass = {
	primary: "border-primary/20 bg-primary/10 text-primary",
	success: "border-success-border bg-success-subtle text-success-subtle-foreground",
	warning: "border-warning-border bg-warning-subtle text-warning-subtle-foreground",
	destructive: "border-error-border bg-error-subtle text-error-subtle-foreground",
	neutral: "border-border bg-muted/40 text-muted-foreground"
};
var StageBadge = ({ tone = "neutral", children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "migration-v2.stage-badge",
	className: cn("mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border [&>svg]:stroke-current [&>svg]:text-current", badgeToneClass[tone]),
	children
});
var ProgressBar = ({ value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "migration-v2.progress-bar",
	className: "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full rounded-full bg-primary transition-[width] duration-300",
		style: { width: `${Math.max(0, Math.min(100, value))}%` }
	})
});
var RAIL_STEPS = [
	{
		n: 1,
		labelKey: "migration.stages.introduction"
	},
	{
		n: 2,
		labelKey: "migration.stages.migration"
	},
	{
		n: 3,
		labelKey: "migration.stages.completed"
	}
];
function stageStepNumber(stage) {
	switch (stage) {
		case "introduction": return 1;
		case "migration":
		case "error": return 2;
		case "completed": return 3;
		case "version_incompatible": return null;
		default: return assertNever(stage);
	}
}
function formatDuration(ms) {
	const totalSeconds = Math.max(0, Math.round(ms / 1e3));
	return `${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60).toString().padStart(2, "0")}`;
}
function errorMessage(error$1) {
	return error$1 instanceof Error ? error$1.message : String(error$1);
}
function assertNever(value) {
	throw new Error(`Unhandled migration stage: ${String(value)}`);
}
var StepRail = ({ stage }) => {
	const { t } = useTranslation();
	const current = stageStepNumber(stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		"data-ui": "migration-v2.step-rail",
		className: "flex w-44 shrink-0 flex-col border-border border-r bg-muted/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-1 flex-col p-6",
			children: RAIL_STEPS.map((step, index) => {
				const isError = stage === "error" && step.n === current;
				const done = current !== null && step.n < current;
				const active = step.n === current;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative flex h-11 w-fit items-center gap-3",
					children: [
						!(index === RAIL_STEPS.length - 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("-translate-x-1/2 absolute top-1/2 left-3 h-11 w-px", done ? "bg-primary/40" : "bg-border") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-medium text-sm", isError && "border border-error-border bg-error-subtle text-error-subtle-foreground", !isError && (active || done) && "bg-primary text-primary-foreground", !isError && !active && !done && "border border-border bg-background text-foreground-disabled"),
							children: isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 13,
								strokeWidth: 2.5,
								className: "lucide-custom"
							}) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 12,
								strokeWidth: 3,
								className: "lucide-custom"
							}) : step.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("relative z-10 truncate text-sm", active && "font-medium text-foreground", done && "text-muted-foreground", !active && !done && "text-foreground-disabled"),
							children: t(step.labelKey)
						})
					]
				}, step.n);
			})
		})
	});
};
var Stat = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "migration-v2.stat",
	className: "flex flex-col items-center justify-center gap-1 px-2 text-center",
	children
});
var TopContent = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "migration-v2.top-content",
	className: "mx-auto max-w-115 text-center",
	children
});
var MigrationOptionsDialog = ({ open, onOpenChange, onSkipMigration, onContinueV1, onCloseApp, onExportDiagnostics, disabled, showLabel = false }) => {
	const { t } = useTranslation();
	const nextDialogTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (nextDialogTimerRef.current) clearTimeout(nextDialogTimerRef.current);
	}, []);
	const transitionTo = (openNextDialog) => {
		onOpenChange(false);
		if (!openNextDialog) return;
		if (nextDialogTimerRef.current) clearTimeout(nextDialogTimerRef.current);
		nextDialogTimerRef.current = setTimeout(() => {
			nextDialogTimerRef.current = null;
			openNextDialog();
		}, 200);
	};
	const handleSkipMigration = () => {
		transitionTo(onSkipMigration);
	};
	const handleContinueV1 = () => {
		transitionTo(onContinueV1);
	};
	const handleExportDiagnostics = () => {
		transitionTo(onExportDiagnostics);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: showLabel ? "outline" : "ghost",
				size: showLabel ? "lg" : "icon-sm",
				disabled,
				"aria-label": t("migration.buttons.more_options"),
				className: cn("text-muted-foreground hover:text-foreground", showLabel && "w-full gap-2", disabled && "text-foreground-disabled hover:text-foreground-disabled"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 15 }), showLabel && t("migration.buttons.more_options")]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: showLabel ? "default" : "sm",
			className: "max-h-[calc(100vh-2rem)] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.buttons.more_options") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("migration.more_options.description") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2.5",
					children: [
						onExportDiagnostics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							"aria-label": t("migration.more_options.diagnostics_title"),
							className: "h-auto w-full items-start justify-start gap-3 whitespace-normal p-4 text-left",
							onClick: handleExportDiagnostics,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium text-foreground text-sm",
									children: t("migration.more_options.diagnostics_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-muted-foreground text-xs leading-relaxed",
									children: t("migration.more_options.diagnostics_description")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							"aria-label": t("migration.more_options.use_v2_title"),
							className: "h-auto w-full items-start justify-start gap-3 whitespace-normal p-4 text-left",
							onClick: handleSkipMigration,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium text-foreground text-sm",
									children: t("migration.more_options.use_v2_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-muted-foreground text-xs leading-relaxed",
									children: t("migration.more_options.skip_description")
								})]
							})]
						}),
						onContinueV1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							"aria-label": t("migration.buttons.continue_v1"),
							className: "h-auto w-full items-start justify-start gap-3 whitespace-normal p-4 text-left",
							onClick: handleContinueV1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium text-foreground text-sm",
									children: t("migration.buttons.continue_v1")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-muted-foreground text-xs leading-relaxed",
									children: t("migration.more_options.continue_v1_description")
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "items-center sm:justify-between",
					children: [onCloseApp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: onCloseApp,
						children: t("migration.buttons.close")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: t("migration.skip_dialog.cancel")
						}) })
					})]
				})
			]
		})]
	});
};
var THEME_STORAGE_KEY = "migration:theme_mode";
var themeLabelKey = {
	dark: "settings.theme.dark",
	light: "settings.theme.light",
	system: "settings.theme.system"
};
var MigrationApp = () => {
	const { t, i18n } = useTranslation();
	const { progress, lastError } = useMigrationProgress();
	const actions = useMigrationActions();
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [localMigrationError, setLocalMigrationError] = (0, import_react.useState)(null);
	const [v1DialogOpen, setV1DialogOpen] = (0, import_react.useState)(false);
	const [skipOpen, setSkipOpen] = (0, import_react.useState)(false);
	const [moreOptionsOpen, setMoreOptionsOpen] = (0, import_react.useState)(false);
	const [diagnosticExportOpen, setDiagnosticExportOpen] = (0, import_react.useState)(false);
	const [diagnosticResult, setDiagnosticResult] = (0, import_react.useState)(null);
	const [warningsDialogOpen, setWarningsDialogOpen] = (0, import_react.useState)(false);
	const [closeConfirmOpen, setCloseConfirmOpen] = (0, import_react.useState)(false);
	const [quitDeferred, setQuitDeferred] = (0, import_react.useState)(false);
	const startGuardRef = (0, import_react.useRef)(false);
	const diagnosticResultTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (diagnosticResultTimerRef.current) clearTimeout(diagnosticResultTimerRef.current);
	}, []);
	const [themeMode, setThemeMode] = (0, import_react.useState)(() => localStorage.getItem(THEME_STORAGE_KEY) ?? "system");
	const toggleTheme = () => {
		const next = themeMode === "light" ? "dark" : themeMode === "dark" ? "system" : "light";
		setThemeMode(next);
		localStorage.setItem(THEME_STORAGE_KEY, next);
	};
	(0, import_react.useEffect)(() => {
		const applyResolved = (resolved) => {
			for (const el of [document.documentElement, document.body]) {
				el.classList.remove("light", "dark");
				el.classList.add(resolved);
			}
		};
		if (themeMode === "light" || themeMode === "dark") {
			applyResolved(themeMode);
			return;
		}
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const update = () => applyResolved(media.matches ? "dark" : "light");
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, [themeMode]);
	const ThemeIcon = themeMode === "dark" ? Moon : themeMode === "light" ? Sun : Monitor;
	(0, import_react.useEffect)(() => {
		const handleConfirmClose = () => setCloseConfirmOpen(true);
		const cleanup = window.electron.ipcRenderer.on(MigrationIpcChannels.ConfirmClose, handleConfirmClose);
		return () => {
			cleanup();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (progress.stage !== "error") setLocalMigrationError(null);
	}, [progress.stage]);
	const runMigration = async () => {
		if (startGuardRef.current) return;
		startGuardRef.current = true;
		setIsLoading(true);
		setLocalMigrationError(null);
		try {
			logger.info("Starting migration process...");
			const exportPaths = await window.electron.ipcRenderer.invoke(MigrationIpcChannels.PrepareExport);
			await window.electron.ipcRenderer.invoke(MigrationIpcChannels.ReportExportStage, { source: "redux" });
			const reduxResult = await new ReduxExporter().export(exportPaths.reduxExportPath);
			logger.info("Redux data exported", {
				slicesFound: reduxResult.slicesFound,
				slicesMissing: reduxResult.slicesMissing,
				exportPath: reduxResult.exportPath
			});
			await new DexieExporter(exportPaths.dexieExportPath).exportAll(async (p) => {
				if (p.progress === 0) await window.electron.ipcRenderer.invoke(MigrationIpcChannels.ReportExportStage, {
					source: "dexie",
					table: p.table
				});
				logger.info("Dexie export progress", p);
			});
			logger.info("Dexie data exported", { exportPath: exportPaths.dexieExportPath });
			await window.electron.ipcRenderer.invoke(MigrationIpcChannels.ReportExportStage, { source: "localStorage" });
			const localStorageExporter = new LocalStorageExporter(exportPaths.localStorageExportDirectory);
			await localStorageExporter.export();
			logger.info("localStorage data exported", {
				entryCount: localStorageExporter.getEntryCount(),
				filePath: exportPaths.localStorageExportPath
			});
			await actions.startMigration({
				reduxExportPath: reduxResult.exportPath,
				dexieExportPath: exportPaths.dexieExportPath,
				localStorageExportPath: exportPaths.localStorageExportPath
			});
		} catch (error$1) {
			logger.error("Failed to start migration", error$1);
			const message = errorMessage(error$1);
			setLocalMigrationError(message);
			window.electron.ipcRenderer.invoke(MigrationIpcChannels.ReportError, message);
		} finally {
			startGuardRef.current = false;
			setIsLoading(false);
		}
	};
	const openDownloadPage = async () => {
		try {
			if (await actions.openDownloadPage(i18n.language)) {
				setV1DialogOpen(false);
				return;
			}
			error(t("migration.error.v1_fallback.open_failed"));
		} catch (error$1) {
			logger.error("Failed to open the v1 download page", error$1);
			error(t("migration.error.v1_fallback.open_failed"));
		}
	};
	const handleDiagnosticSaved = (logs) => {
		setDiagnosticExportOpen(false);
		if (diagnosticResultTimerRef.current) clearTimeout(diagnosticResultTimerRef.current);
		diagnosticResultTimerRef.current = setTimeout(() => {
			diagnosticResultTimerRef.current = null;
			setDiagnosticResult(logs);
		}, 200);
	};
	const openDiagnosticsFromError = () => {
		if (window.getSelection()?.toString().trim()) return;
		setDiagnosticExportOpen(true);
	};
	const copyMigrationWarnings = async (warnings) => {
		try {
			await navigator.clipboard.writeText(warnings.map((warning, index) => `${index + 1}. ${warning}`).join("\n"));
			success(t("migration.completed.warning_copy_success"));
		} catch (error$1) {
			logger.error("Failed to copy migration warnings", error$1);
			error(t("migration.completed.warning_copy_failed"));
		}
	};
	const handleSkipConfirm = async () => {
		try {
			await actions.skipMigration();
		} catch (error$1) {
			logger.error("Failed to skip migration", error$1);
			setSkipOpen(false);
			error(t("migration.skip_dialog.failed"));
		}
	};
	const progressMessage = (0, import_react.useMemo)(() => {
		if (progress.i18nMessage) return t(progress.i18nMessage.key, progress.i18nMessage.params);
		return progress.currentMessage;
	}, [progress, t]);
	const stage = localMigrationError ? "error" : progress.stage;
	const showRail = stage !== "version_incompatible";
	const renderStage = () => {
		switch (stage) {
			case "introduction": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "migration-v2.render-stage",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, {
							tone: "neutral",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {
								size: 28,
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-semibold text-2xl text-foreground tracking-tight",
							children: t("migration.introduction.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground text-sm",
							children: t("migration.introduction.subtitle")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: [
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }),
								title: t("migration.introduction.features.architecture.title"),
								description: t("migration.introduction.features.architecture.description")
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 16 }),
								title: t("migration.introduction.features.migration.title"),
								description: t("migration.introduction.features.migration.description")
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 }),
								title: t("migration.introduction.features.safety.title"),
								description: t("migration.introduction.features.safety.description")
							}
						].map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-xl border border-border bg-muted/15 px-4 py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground",
								children: feature.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground text-sm",
									children: feature.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-muted-foreground text-xs leading-relaxed",
									children: feature.description
								})]
							})]
						}, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "default",
							size: "lg",
							className: "w-full gap-2",
							loading: isLoading,
							onClick: () => void runMigration(),
							children: [t("migration.buttons.start_migration"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
						}), progress.dataLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-border bg-muted/15 px-3 py-2 text-foreground-tertiary text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								size: 14,
								className: "shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 break-all",
								children: t("migration.introduction.data_location", { path: progress.dataLocation })
							})]
						})]
					})
				]
			});
			case "migration": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "migration-v2.render-stage",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, {
							tone: "primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 26,
								strokeWidth: 1.5,
								className: "animate-spin"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-foreground text-lg tracking-tight",
							children: t("migration.migration.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-muted-foreground text-sm",
							children: progressMessage
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex items-center justify-between text-foreground-tertiary text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [Math.round(progress.overallProgress), "%"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { value: progress.overallProgress })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigratorProgressList, { migrators: progress.migrators }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-0.5 text-center text-muted-foreground text-xs",
						children: t("migration.migration.do_not_close")
					})
				]
			});
			case "completed": {
				const summary = progress.summary;
				const warnings = [...(progress.warningMessages ?? []).map((warning) => t(warning.key, warning.params)), ...progress.warnings ?? []];
				const hasWarnings = warnings.length > 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ui": "migration-v2.render-stage",
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto mb-4 inline-block text-[56px] leading-none",
								children: ["🎉", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-2xl text-foreground tracking-tight",
								children: t("migration.completed.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-muted-foreground text-sm leading-relaxed",
								children: t(hasWarnings ? "migration.completed.description_with_warnings" : "migration.completed.description")
							})
						] }),
						summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-muted/10 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stat, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-2xl text-foreground tabular-nums",
									children: [
										summary.completedMigrators,
										"/",
										summary.totalMigrators
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: t("migration.completed.steps_label")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stat, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-2xl text-foreground tabular-nums",
									children: summary.itemsProcessed
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: t("migration.completed.items_label")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stat, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-2xl text-foreground tabular-nums",
									children: formatDuration(summary.durationMs)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: t("migration.completed.duration_label")
								})] })
							]
						}),
						hasWarnings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
							open: warningsDialogOpen,
							onOpenChange: setWarningsDialogOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center",
								"data-migration-warning-trigger": "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "link",
										size: "sm",
										className: "h-auto w-fit gap-2 px-0 py-0 text-warning hover:text-warning",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											size: 14,
											className: "shrink-0"
										}), t("migration.completed.warning_heading", { count: warnings.length })]
									}) })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
								size: "lg",
								className: "max-h-[calc(100vh-2rem)] overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.completed.warning_heading", { count: warnings.length }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("migration.completed.warning_description") })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
										className: "max-h-[50vh]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "text-foreground text-sm leading-relaxed",
											children: warnings.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "wrap-break-words",
												children: warning
											}, index))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "emphasis",
										size: "lg",
										className: "w-full gap-2",
										onClick: () => void copyMigrationWarnings(warnings),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }), t("migration.completed.warning_copy")]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "default",
							size: "lg",
							className: "w-full gap-2",
							onClick: () => actions.restart(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), t("migration.buttons.restart")]
						})
					]
				});
			}
			case "error": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "migration-v2.render-stage",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, {
							tone: "destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								size: 26,
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-foreground text-lg tracking-tight",
							children: t("migration.error.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-muted-foreground text-sm leading-relaxed",
							children: t("migration.error.description")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ui": "migration-v2.render-stage.action.open",
						role: "button",
						tabIndex: 0,
						"aria-label": t("migration.diagnostics.open_from_error"),
						"data-migration-error-details": "",
						className: "cursor-pointer rounded-lg border border-error-border bg-error-subtle px-3.5 py-3 transition-colors hover:border-error focus-visible:border-ring focus-visible:outline-none",
						onClick: openDiagnosticsFromError,
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								setDiagnosticExportOpen(true);
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "wrap-break-words select-text text-error-subtle-foreground text-xs leading-5",
							children: [t("migration.error.error_prefix"), localMigrationError || lastError || progress.error || t("migration.error.unknown")]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "default",
						size: "lg",
						className: "w-full gap-2",
						onClick: () => {
							setLocalMigrationError(null);
							actions.retry();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), t("migration.buttons.retry")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationOptionsDialog, {
						open: moreOptionsOpen,
						onOpenChange: setMoreOptionsOpen,
						onSkipMigration: () => setSkipOpen(true),
						onContinueV1: () => setV1DialogOpen(true),
						onCloseApp: () => actions.cancel(),
						onExportDiagnostics: () => setDiagnosticExportOpen(true),
						showLabel: true
					})
				]
			});
			case "version_incompatible": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "migration-v2.render-stage",
				className: "mx-auto w-full max-w-115 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, {
							tone: "warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								size: 26,
								strokeWidth: 1.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-foreground text-lg tracking-tight",
							children: t("migration.version_incompatible.title")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-xl border border-border bg-muted/10 px-4 py-3 text-muted-foreground text-sm leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("migration.version_incompatible.preamble") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: progressMessage }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("migration.version_incompatible.ignore_hint") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationDiagnosticPanel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "lg",
							onClick: () => actions.cancel(),
							children: t("migration.buttons.close")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "lg",
							className: "flex-1",
							onClick: () => setSkipOpen(true),
							children: t("migration.buttons.ignore_migration")
						})]
					})
				]
			});
			default: return assertNever(stage);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "migration-v2.app",
		className: "flex h-screen w-screen flex-col bg-card text-card-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative flex h-11 shrink-0 items-center justify-center border-border border-b [-webkit-app-region:drag]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-migration-language-select": "",
						className: cn("-translate-y-1/2 absolute top-1/2 z-10 flex items-center gap-1 [-webkit-app-region:no-drag]", isMac ? "right-3" : "left-3"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: i18n.language,
							onValueChange: (lang) => void i18n.changeLanguage(lang),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": t("migration.language.select"),
								size: "sm",
								className: "h-7 w-auto gap-1.5 border-0 bg-transparent px-1.5 text-muted-foreground text-xs shadow-none hover:bg-transparent hover:text-foreground focus-visible:bg-transparent focus-visible:text-foreground aria-expanded:border-transparent aria-expanded:ring-0 dark:bg-transparent [&_svg]:size-3.5 [&_svg]:opacity-60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "zh-CN",
								children: "中文"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "en-US",
								children: "English"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t(themeLabelKey[themeMode] ?? themeLabelKey.system),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": t(themeLabelKey[themeMode] ?? themeLabelKey.system),
								onClick: toggleTheme,
								className: "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									className: "size-3.5",
									strokeWidth: 1.6
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_default,
								alt: "Cherry Studio",
								className: "h-4.5 w-4.5 rounded-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground text-sm",
								children: "Cherry Studio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground-tertiary",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground-tertiary text-xs",
								children: t("migration.title")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationWindowControls, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [showRail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRail, { stage }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: cn("relative min-w-0 flex-1 overflow-y-auto", progress.stage === "completed" && "overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"),
					children: [stage === "introduction" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-2 right-3 z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationOptionsDialog, {
							open: moreOptionsOpen,
							onOpenChange: setMoreOptionsOpen,
							onSkipMigration: () => setSkipOpen(true),
							disabled: isLoading
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-full w-full flex-col justify-center px-16 py-8",
						children: renderStage()
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipMigrationDialog, {
				open: skipOpen,
				onOpenChange: setSkipOpen,
				onConfirm: () => void handleSkipConfirm()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V1DownloadDialog, {
				open: v1DialogOpen,
				onOpenChange: setV1DialogOpen,
				onDownload: () => void openDownloadPage()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: diagnosticExportOpen,
				onOpenChange: setDiagnosticExportOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					size: "default",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.diagnostics.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("migration.diagnostics.export_description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationDiagnosticPanel, {
						embedded: true,
						showPrivacy: false,
						onSaved: handleDiagnosticSaved
					})]
				})
			}),
			diagnosticResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: true,
				onOpenChange: (open) => {
					if (!open) setDiagnosticResult(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("migration.diagnostics.saved_title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "sr-only",
						children: t("migration.diagnostics.saved_local")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationDiagnosticPanel, {
						embedded: true,
						savedLogs: diagnosticResult,
						showPrivacy: false
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseMigrationDialog, {
				open: closeConfirmOpen,
				onOpenChange: (open) => {
					setCloseConfirmOpen(open);
					if (!open) window.electron.ipcRenderer.invoke(MigrationIpcChannels.CancelClose);
				},
				onConfirm: async () => {
					setCloseConfirmOpen(false);
					if (!await window.electron.ipcRenderer.invoke(MigrationIpcChannels.ConfirmQuit)) setQuitDeferred(true);
				}
			}),
			quitDeferred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-16 z-20 flex justify-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
					type: "info",
					showIcon: true,
					message: t("migration.window.confirm_close.quit_pending"),
					className: "pointer-events-auto w-auto shadow-md"
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})] });
};
var MigrationApp_default = MigrationApp;
var root = (0, import_client.createRoot)(document.getElementById("root"));
initI18n().then(() => {
	root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MigrationApp_default, {}));
});

import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./platform-YWZQ2_mC.js";
import "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { n as MenuItem, r as MenuList, t as MenuDivider } from "./menu-item-Boj_QdAM.js";
import { t as PageHeader } from "./page-header-DN3fmPEX.js";
import { t as useMacTransparentWindow_default } from "./useMacTransparentWindow-DCNrLy9X.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as Activity } from "./activity-dM8Sm7da.js";
import { t as Bell } from "./bell-BScqXvQI.js";
import { t as CalendarClock } from "./calendar-clock-B5oxG3yM.js";
import { t as Cloud } from "./cloud-CxXqMX1T.js";
import { t as Command } from "./command-CtYHMkcK.js";
import { t as FileBox } from "./file-box-CrPEOnUP.js";
import { t as FileCode } from "./file-code-DAX41OX2.js";
import { t as HardDrive } from "./hard-drive-SW1ZMj2s.js";
import { t as Info } from "./info-rKrg7-xW.js";
import { t as Package } from "./package-ZrHClX6B.js";
import { t as Palette } from "./palette-CWHPG6GL.js";
import { t as PictureInPicture2 } from "./picture-in-picture-2-DY-JDy9k.js";
import { t as Radio } from "./radio-DSfdARU2.js";
import { t as ScanText } from "./scan-text-Bt66H4NG.js";
import { t as Search } from "./search-CQaFGVmj.js";
import { t as Settings2 } from "./settings-2-BTluMuWp.js";
import { t as Terminal } from "./terminal-REn4fcyn.js";
import { t as TextCursorInput } from "./text-cursor-input-CjPBi4Bp.js";
import { t as ToolCase } from "./tool-case-DruupNDs.js";
import { n as Outlet } from "./Match-CSiChmPW.js";
import "./with-selector-DxfGCgh1.js";
import { t as useNavigate } from "./useNavigate-DEeZmEwY.js";
import { t as useLocation } from "./useLocation-CFVGS7Dv.js";
import { t as Scrollbar_default } from "./Scrollbar-CRo8NoWr.js";
import { i as McpLogo } from "./SvgIcon-C5HzxKyn.js";
import { t as GatewayIcon } from "./GatewayIcon-Bdtwyj7T.js";
import { a as settingsSubmenuItemClassName, i as settingsSubmenuDividerClassName, l as settingsSubmenuSectionTitleClassName, o as settingsSubmenuItemLabelClassName, s as settingsSubmenuListClassName } from "./settingsStyles-xDjqxYiX.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SettingsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;
	const { t } = useTranslation();
	const isMacTransparentWindow = useMacTransparentWindow_default();
	const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);
	const go = (path) => navigate({ to: path });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.view",
		style: isMacTransparentWindow ? { "--settings-group-background": "transparent" } : void 0,
		className: cn("flex min-h-0 flex-1 flex-col dark:[--settings-group-background:var(--background-subtle)]", isMacTransparentWindow ? "bg-transparent" : "bg-background"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.navigation",
				className: "flex min-h-0 w-(--settings-width) min-w-(--settings-width) flex-col border-border border-r-[0.5px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: t("title.settings"),
					className: "mb-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
					className: "min-h-0 flex-1 select-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, {
						className: settingsSubmenuListClassName,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {}),
								label: t("settings.provider.title"),
								active: isActive("/settings/provider"),
								onClick: () => go("/settings/provider")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {}),
								label: t("settings.model"),
								active: isActive("/settings/model"),
								onClick: () => go("/settings/model")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBox, {}),
								label: t("settings.dependencies.localModels.title"),
								active: isActive("/settings/local-models"),
								onClick: () => go("/settings/local-models")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatewayIcon, {}),
								label: t("apiGateway.title"),
								active: isActive("/settings/api-gateway"),
								onClick: () => go("/settings/api-gateway")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.menuGroups.capabilities")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpLogo, {
									width: 16,
									height: 16,
									className: "text-foreground"
								}),
								label: t("agent.settings.toolsMcp.mcp.tab"),
								active: isActive("/settings/mcp"),
								onClick: () => go("/settings/mcp")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, {}),
								label: t("settings.skills.title"),
								active: isActive("/settings/skills"),
								onClick: () => go("/settings/skills")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}),
								label: t("settings.tool.websearch.title"),
								active: isActive("/settings/websearch"),
								onClick: () => go("/settings/websearch")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}),
								label: t("settings.tool.file_processing.features.document_to_markdown.title"),
								active: isActive("/settings/file-processing"),
								onClick: () => go("/settings/file-processing")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanText, {}),
								label: t("settings.tool.file_processing.features.image_to_text.title"),
								active: isActive("/settings/ocr"),
								onClick: () => go("/settings/ocr")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.menuGroups.personal")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {}),
								label: t("settings.appearance.title"),
								active: isActive("/settings/appearance"),
								onClick: () => go("/settings/appearance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}),
								label: t("settings.notification.title"),
								active: isActive("/settings/notifications"),
								onClick: () => go("/settings/notifications")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {}),
								label: t("settings.data.title"),
								active: isActive("/settings/data"),
								onClick: () => go("/settings/data")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
								label: t("settings.usage.title"),
								active: isActive("/settings/usage"),
								onClick: () => go("/settings/usage")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.menuGroups.automation")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
								label: t("settings.channels.title"),
								active: isActive("/settings/channels"),
								onClick: () => go("/settings/channels")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}),
								label: t("settings.scheduledTasks.title"),
								active: isActive("/settings/scheduled-tasks"),
								onClick: () => go("/settings/scheduled-tasks")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {}),
								label: t("settings.shortcuts.title"),
								active: isActive("/settings/shortcut"),
								onClick: () => go("/settings/shortcut")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureInPicture2, {}),
								label: t("settings.quickAssistant.title"),
								active: isActive("/settings/quick-assistant"),
								onClick: () => go("/settings/quick-assistant")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextCursorInput, {}),
								label: t("selection.name"),
								active: isActive("/settings/selection-assistant"),
								onClick: () => go("/settings/selection-assistant")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: settingsSubmenuDividerClassName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: settingsSubmenuSectionTitleClassName,
								children: t("settings.menuGroups.system")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {}),
								label: t("settings.system.title"),
								active: isActive("/settings/system"),
								onClick: () => go("/settings/system")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {}),
								label: t("settings.dependencies.title"),
								active: isActive("/settings/dependencies"),
								onClick: () => go("/settings/dependencies")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
								className: settingsSubmenuItemClassName,
								labelClassName: settingsSubmenuItemLabelClassName,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}),
								label: t("settings.about.label"),
								active: isActive("/settings/about"),
								onClick: () => go("/settings/about")
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full min-h-0 min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "settings.content",
					className: "flex min-h-0 min-w-0 flex-1 overflow-hidden text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			})]
		})
	});
};
var SplitComponent = SettingsPage;
export { SplitComponent as component };

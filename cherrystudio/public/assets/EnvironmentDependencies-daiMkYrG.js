import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { r as formatErrorMessage } from "./error-3V5V4Mev.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as DescriptionSwitch } from "./switch-DEX3m-Zc.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as ConfirmDialog } from "./confirm-dialog-B5-JWpzh.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./input-group-Cx4HnAhR.js";
import { t as SelectDropdown } from "./select-dropdown-DkQrXXq5.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { o as FieldLabel, r as FieldDescription, t as Field } from "./field-v-3EhHEn.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as ArrowBigUp } from "./arrow-big-up-BkMxoeOK.js";
import { t as Download } from "./download-DyAttkgN.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as EyeOff } from "./eye-off-B0yNvNAf.js";
import { t as Eye } from "./eye-B3h_cTL2.js";
import { t as FolderOpen } from "./folder-open-DuPB2puz.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as RefreshCw } from "./refresh-cw-9yFUmry6.js";
import { t as Settings2 } from "./settings-2-BTluMuWp.js";
import { t as Terminal } from "./terminal-REn4fcyn.js";
import { t as Trash2 } from "./trash-2-_PaXFSXZ.js";
import { t as TriangleAlert } from "./triangle-alert-S57Y3qwG.js";
import { t as useNavigate } from "./useNavigate-Co8njXzY.js";
import { t as Icon } from "./iconify-o-kjzozp.js";
import { a as BinaryInstallFailureRow, i as BinaryInstallErrorDialog, n as CODE_CLI_TOOL_PRESETS, o as BinaryInstallingHint, t as interpretBinarySnapshot } from "./binarySnapshot-blxMS3aN.js";
const TOOL_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const TOOL_KEY_RE = /^(?!.*\.\.)(?!.*\/\/)[a-zA-Z0-9@][a-zA-Z0-9@:/_.-]*$/;
const BINARY_INSTALL_PREFERENCE_KEY = "feature.binary.install_settings";
const RUNTIME_INTERPRETERS = ["node", "python"];
function isRuntimeDependency(toolSpec) {
	const spec = toolSpec.startsWith("core:") ? toolSpec.slice(5) : toolSpec;
	if (spec.includes(":")) return false;
	const base = spec.split("@")[0];
	return RUNTIME_INTERPRETERS.includes(base);
}
function validateBinaryToolDefinition(tool) {
	if (!tool.name || !TOOL_NAME_RE.test(tool.name)) throw new Error(`Invalid tool name: ${tool.name}`);
	if (!tool.tool || !TOOL_KEY_RE.test(tool.tool)) throw new Error(`Invalid tool key: ${tool.tool}`);
	if (tool.requestedVersion && !TOOL_KEY_RE.test(tool.requestedVersion)) throw new Error(`Invalid tool version: ${tool.requestedVersion}`);
}
const PRESETS_BINARY_TOOLS = [
	{
		name: "uv",
		displayName: "uv",
		tool: "uv",
		icon: "simple-icons:uv",
		repoUrl: "https://github.com/astral-sh/uv",
		homepage: "https://docs.astral.sh/uv/"
	},
	{
		name: "bun",
		displayName: "Bun",
		tool: "bun",
		icon: "simple-icons:bun",
		repoUrl: "https://github.com/oven-sh/bun",
		homepage: "https://bun.sh"
	},
	{
		name: "fd",
		displayName: "fd",
		tool: "fd",
		repoUrl: "https://github.com/sharkdp/fd"
	},
	{
		name: "rg",
		displayName: "ripgrep",
		tool: "rg",
		repoUrl: "https://github.com/BurntSushi/ripgrep"
	},
	{
		name: "rtk",
		displayName: "RTK",
		tool: "rtk",
		repoUrl: "https://github.com/rtk-ai/rtk",
		homepage: "https://www.rtk-ai.app/"
	},
	{
		name: "lark-cli",
		displayName: "Lark CLI",
		tool: "github:larksuite/cli",
		repoUrl: "https://github.com/larksuite/cli"
	},
	{
		name: "gh",
		displayName: "GitHub CLI",
		tool: "gh",
		icon: "simple-icons:github",
		repoUrl: "https://github.com/cli/cli",
		homepage: "https://cli.github.com"
	},
	{
		name: "ntn",
		displayName: "Notion CLI",
		tool: "npm:ntn",
		icon: "simple-icons:notion",
		repoUrl: "https://github.com/makenotion/cli",
		homepage: "https://ntn.dev"
	},
	{
		name: "pi",
		displayName: "Pi",
		tool: "pi",
		repoUrl: "https://github.com/earendil-works/pi",
		homepage: "https://pi.dev"
	}
];
var DEFAULT_PRESET = {
	url: "",
	labelKey: "settings.dependencies.installSettings.presetLabels.default"
};
const GITHUB_MIRROR_PRESETS = [
	DEFAULT_PRESET,
	{
		url: "https://ghfast.top",
		labelKey: "settings.dependencies.installSettings.presetLabels.ghfast"
	},
	{
		url: "https://ghproxy.net",
		labelKey: "settings.dependencies.installSettings.presetLabels.ghproxy"
	}
];
const NPM_REGISTRY_PRESETS = [
	DEFAULT_PRESET,
	{
		url: "https://registry.npmmirror.com",
		labelKey: "settings.dependencies.installSettings.presetLabels.npmmirror"
	},
	{
		url: "https://registry.npmjs.org",
		labelKey: "settings.dependencies.installSettings.presetLabels.npmOfficial"
	}
];
const PIP_INDEX_PRESETS = [
	DEFAULT_PRESET,
	{
		url: "https://pypi.tuna.tsinghua.edu.cn/simple",
		labelKey: "settings.dependencies.installSettings.presetLabels.tsinghua"
	},
	{
		url: "https://mirrors.aliyun.com/pypi/simple/",
		labelKey: "settings.dependencies.installSettings.presetLabels.aliyun"
	},
	{
		url: "https://pypi.org/simple",
		labelKey: "settings.dependencies.installSettings.presetLabels.pypiOfficial"
	}
];
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("EnvironmentDependencies");
var ToolIcon = ({ icon, className }) => {
	if (icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		icon,
		className: cn("size-5", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: cn("size-5", className) });
};
var CODE_CLI_BINARIES = new Set(CODE_CLI_TOOL_PRESETS.map((preset) => preset.executable));
var EnvironmentDependencies = ({ mini = false }) => {
	const [snapshots, setSnapshots] = (0, import_react.useState)({});
	const [resolutionsReady, setResolutionsReady] = (0, import_react.useState)(false);
	const [latestVersions, setLatestVersions] = (0, import_react.useState)(null);
	const [checkingUpdates, setCheckingUpdates] = (0, import_react.useState)(false);
	const [showAddDialog, setShowAddDialog] = (0, import_react.useState)(false);
	const [showInstallSettings, setShowInstallSettings] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [installError, setInstallError] = (0, import_react.useState)(null);
	const [definitionFallback, setDefinitionFallback] = (0, import_react.useState)(null);
	const deleteTargetRef = (0, import_react.useRef)({
		name: "",
		runtime: false,
		custom: false
	});
	if (deleteTarget) deleteTargetRef.current = deleteTarget;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const mountedRef = (0, import_react.useRef)(true);
	const resolutionRequestIdRef = (0, import_react.useRef)(0);
	const latestRequestIdRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const refreshState = (0, import_react.useCallback)(async () => {
		const requestId = ++resolutionRequestIdRef.current;
		try {
			const nextSnapshots = await ipcApi.request("binary.get_tool_snapshots", PRESETS_BINARY_TOOLS.map((tool) => tool.name));
			if (!mountedRef.current || requestId !== resolutionRequestIdRef.current) return;
			setSnapshots(nextSnapshots);
			setResolutionsReady(true);
		} catch (error) {
			logger.error("Failed to refresh binary state", error);
		}
	}, []);
	const fetchLatestVersions = (0, import_react.useCallback)(async (force = false) => {
		const requestId = ++latestRequestIdRef.current;
		setCheckingUpdates(true);
		try {
			const versions = await ipcApi.request("binary.get_latest_versions", force);
			if (mountedRef.current && requestId === latestRequestIdRef.current) {
				setLatestVersions(versions);
				if (force) toast.success(t("settings.dependencies.updateCheckSuccess"));
			}
			return versions;
		} catch (error) {
			logger.error("Failed to fetch latest versions", error);
			if (force) toast.error(`${t("settings.dependencies.updateCheckFailed")}: ${formatErrorMessage(error)}`);
			return null;
		} finally {
			if (mountedRef.current && requestId === latestRequestIdRef.current) setCheckingUpdates(false);
		}
	}, [t]);
	(0, import_react.useEffect)(() => {
		refreshState();
	}, [refreshState]);
	(0, import_react.useEffect)(() => {
		if (mini) return;
		fetchLatestVersions(false);
	}, [fetchLatestVersions, mini]);
	useIpcOn("binary.availability_changed", () => {
		setLatestVersions(null);
		refreshState();
	});
	const inventorySnapshots = (0, import_react.useMemo)(() => Object.values(snapshots).filter((snapshot) => !CODE_CLI_BINARIES.has(snapshot.name) && !!snapshot.definition), [snapshots]);
	const installTool = async (name, targetVersion) => {
		try {
			await ipcApi.request("binary.install_tool", {
				name,
				...targetVersion ? { targetVersion } : {}
			});
		} catch (error) {
			logger.error("Failed to install tool", error);
		} finally {
			await refreshState();
		}
	};
	const handleAddCustomTool = async (tool) => {
		try {
			validateBinaryToolDefinition(tool);
		} catch {
			toast.error(t("settings.dependencies.invalidTool"));
			throw new Error("invalid");
		}
		if ([
			...PRESETS_BINARY_TOOLS.map((p) => p.name),
			...inventorySnapshots.map((snapshot) => snapshot.name),
			...CODE_CLI_BINARIES
		].includes(tool.name)) {
			toast.error(t("settings.dependencies.duplicateName"));
			throw new Error("duplicate");
		}
		try {
			await ipcApi.request("binary.add_custom_tool", tool);
		} catch (error) {
			logger.error("Failed to add custom tool", error);
			setInstallError({
				name: tool.name,
				message: formatErrorMessage(error),
				action: "install"
			});
			throw error;
		} finally {
			await refreshState();
		}
	};
	const handleRemoveTool = async (target) => {
		try {
			const result = await ipcApi.request("binary.remove_tool", { name: target.name });
			if (result.status === "cleanup_blocked") {
				if (target.custom) setDefinitionFallback({
					name: target.name,
					result
				});
				else setInstallError({
					name: target.name,
					message: result.message ?? t("common.delete_failed"),
					action: "remove"
				});
				return;
			}
		} catch (error) {
			logger.error("Failed to remove tool", error);
			toast.error(formatErrorMessage(error));
		} finally {
			setDeleteTarget(null);
			await refreshState();
		}
	};
	const handleRemoveDefinition = async (name) => {
		try {
			await ipcApi.request("binary.remove_tool", {
				name,
				definitionOnly: true
			});
		} catch (error) {
			logger.error("Failed to remove tool definition", error);
			toast.error(formatErrorMessage(error));
		} finally {
			setDefinitionFallback(null);
			await refreshState();
		}
	};
	const openToolDir = (binaryPath) => {
		const separator = Math.max(binaryPath.lastIndexOf("/"), binaryPath.lastIndexOf("\\"));
		ipcApi.request("system.shell.open_path", separator > 0 ? binaryPath.slice(0, separator) : binaryPath);
	};
	const presetNames = new Set(PRESETS_BINARY_TOOLS.map((tool) => tool.name));
	const extraTools = inventorySnapshots.filter((snapshot) => !presetNames.has(snapshot.name));
	const totalCount = PRESETS_BINARY_TOOLS.length + extraTools.length;
	if (mini) {
		if (!resolutionsReady) return null;
		const uvAvailable = !!snapshots.uv && snapshots.uv.availability.source !== "none";
		const bunAvailable = !!snapshots.bun && snapshots.bun.availability.source !== "none";
		if (uvAvailable && bunAvailable) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "nodrag h-8 rounded-lg px-2 text-destructive shadow-none hover:text-destructive",
			variant: "ghost",
			"aria-label": t("settings.dependencies.title"),
			title: t("settings.dependencies.title"),
			onClick: () => navigate({ to: "/settings/dependencies" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 14 })
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.environment-dependencies",
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-semibold text-[15px] text-foreground leading-6",
							children: t("settings.dependencies.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground-tertiary text-xs",
							children: totalCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-muted-foreground hover:text-foreground",
							onClick: () => void fetchLatestVersions(true),
							disabled: checkingUpdates,
							"aria-label": t("settings.dependencies.checkUpdates"),
							title: t("settings.dependencies.checkUpdates"),
							children: checkingUpdates ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 motion-safe:animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-muted-foreground hover:text-foreground",
							onClick: () => setShowInstallSettings(true),
							"aria-label": t("settings.dependencies.installSettings.title"),
							title: t("settings.dependencies.installSettings.title"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "ml-auto",
							onClick: () => setShowAddDialog(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), t("settings.dependencies.addTool")]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground text-xs leading-5",
					children: t("settings.dependencies.description")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.environment-dependencies.list",
				role: "list",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [PRESETS_BINARY_TOOLS.map((tool) => {
					const snapshot = snapshots[tool.name];
					const latestVersion = latestVersions?.[tool.name];
					const view = interpretBinarySnapshot(snapshot, { latest: latestVersion });
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryToolPresetCard, {
						tool,
						source: view.source,
						applicationStatus: view.applicationStatus,
						systemPath: view.systemPath,
						installedVersion: view.installedVersion,
						latestVersion: view.hasUpdate ? latestVersion : void 0,
						operation: snapshot?.operation,
						onShowError: (message) => setInstallError({
							name: tool.name,
							message,
							action: snapshot?.operation?.status === "failed" ? snapshot.operation.action : "install"
						}),
						onInstall: () => installTool(tool.name, snapshot?.operation?.status === "failed" ? snapshot.operation.targetVersion : void 0),
						onUpdate: () => installTool(tool.name, latestVersion ?? "latest"),
						onOpenPath: () => view.resolvedPath && openToolDir(view.resolvedPath),
						onRemove: () => setDeleteTarget({
							name: tool.name,
							runtime: false,
							custom: false
						})
					}, tool.name);
				}), extraTools.map((snapshot) => {
					const latestVersion = latestVersions?.[snapshot.name];
					const view = interpretBinarySnapshot(snapshot, { latest: latestVersion });
					const toolSpec = snapshot.definition?.tool ?? snapshot.name;
					const runtime = isRuntimeDependency(toolSpec);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomToolCard, {
						tool: snapshot,
						toolSpec,
						runtime,
						available: view.installed,
						systemPath: view.systemPath,
						installedVersion: view.installedVersion,
						latestVersion: view.hasUpdate ? latestVersion : void 0,
						operation: snapshot.operation,
						onShowError: (message) => setInstallError({
							name: snapshot.name,
							message,
							action: snapshot.operation?.status === "failed" ? snapshot.operation.action : "install"
						}),
						onInstall: () => installTool(snapshot.name, snapshot.operation?.status === "failed" ? snapshot.operation.targetVersion : void 0),
						onUpdate: () => installTool(snapshot.name, latestVersion ?? "latest"),
						onOpenPath: () => view.resolvedPath && openToolDir(view.resolvedPath),
						onRemove: () => setDeleteTarget({
							name: snapshot.name,
							runtime,
							custom: true
						})
					}, snapshot.name);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddToolDialog, {
				open: showAddDialog,
				onOpenChange: setShowAddDialog,
				onAdd: handleAddCustomTool
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSettingsDialog, {
				open: showInstallSettings,
				onOpenChange: setShowInstallSettings
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryInstallErrorDialog, {
				error: installError,
				onOpenChange: (open) => !open && setInstallError(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!deleteTarget,
				onOpenChange: (open) => !open && setDeleteTarget(null),
				title: t(deleteTargetRef.current.custom ? "settings.dependencies.removeConfirmTitle" : "settings.dependencies.uninstallConfirmTitle"),
				description: t(deleteTargetRef.current.runtime ? "settings.dependencies.removeRuntimeConfirmMessage" : deleteTargetRef.current.custom ? "settings.dependencies.removeConfirmMessage" : "settings.dependencies.uninstallConfirmMessage", { name: deleteTargetRef.current.name }),
				confirmText: t(deleteTargetRef.current.custom ? "common.delete" : "settings.dependencies.uninstall"),
				cancelText: t("common.cancel"),
				destructive: true,
				onConfirm: async () => {
					if (deleteTarget) await handleRemoveTool({
						name: deleteTarget.name,
						custom: deleteTarget.custom
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!definitionFallback,
				onOpenChange: (open) => !open && setDefinitionFallback(null),
				title: t("settings.dependencies.removeDefinitionOnlyConfirmTitle"),
				description: t("settings.dependencies.removeDefinitionOnlyConfirmMessage", {
					name: definitionFallback?.name,
					details: definitionFallback?.result.reason === "dependency_blocked" && definitionFallback.result.dependents?.length ? t("settings.dependencies.removeDefinitionOnlyDependents", { dependents: definitionFallback.result.dependents.join(", ") }) : definitionFallback?.result.message ?? definitionFallback?.result.reason
				}),
				confirmText: t("common.delete"),
				cancelText: t("common.cancel"),
				destructive: true,
				onConfirm: async () => {
					if (definitionFallback) await handleRemoveDefinition(definitionFallback.name);
				}
			})
		]
	});
};
var BinaryToolPresetCard = ({ tool, source, applicationStatus, systemPath, installedVersion, latestVersion, operation, onShowError, onInstall, onUpdate, onOpenPath, onRemove }) => {
	const { t } = useTranslation();
	const description = t(`settings.dependencies.tools.${tool.name}`);
	const present = source !== "none";
	const isBundled = source === "bundled";
	const isSystem = source === "system";
	const installing = operation?.status === "installing";
	const removing = operation?.status === "removing";
	const failedInstall = operation?.status === "failed" && operation.action === "install";
	const failedRemove = operation?.status === "failed" && operation.action === "remove";
	const busy = installing || removing;
	const applied = applicationStatus === "applied";
	const broken = applicationStatus === "broken";
	const backendControllable = applied || broken;
	const canInstall = applicationStatus === "absent" && source === "none" || applicationStatus === "unknown" || broken || failedInstall;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.binary-tool-preset-card.listitem",
		role: "listitem",
		className: "flex flex-col rounded-xl border border-border p-4 transition-colors duration-200 ease-in-out hover:border-border-strong",
		style: { backgroundColor: "var(--settings-group-background, var(--card))" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex size-10 shrink-0 items-center justify-center rounded-xl", present ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolIcon, { icon: tool.icon })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground text-sm leading-5",
								children: tool.displayName
							}), tool.displayName !== tool.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground-tertiary text-xs",
								children: [
									"(",
									tool.name,
									")"
								]
							})]
						}), present && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 flex flex-wrap items-center gap-1",
							children: [
								installedVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
									children: ["v", installedVersion]
								}),
								latestVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "gap-1 border-success-border bg-success-subtle px-1.5 py-0 text-[11px] text-success-subtle-foreground leading-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBigUp, { className: "size-2.5" }),
										"v",
										latestVersion
									]
								}),
								isBundled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
									children: t("settings.dependencies.source.bundled")
								}),
								isSystem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
									title: systemPath,
									children: t("settings.dependencies.source.system")
								})
							]
						})]
					})]
				}), backendControllable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [applied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						className: "text-muted-foreground hover:text-foreground",
						onClick: onUpdate,
						disabled: busy,
						"aria-label": t("settings.dependencies.update"),
						title: t("settings.dependencies.update"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						className: "text-muted-foreground hover:text-destructive",
						onClick: onRemove,
						disabled: busy,
						"aria-label": t("settings.dependencies.uninstall"),
						title: t("settings.dependencies.uninstall"),
						children: removing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2.5 line-clamp-2 text-muted-foreground text-xs leading-4",
				title: description,
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex min-w-0 items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex min-w-0 items-center gap-1 overflow-hidden text-[11px] text-muted-foreground transition-colors hover:text-foreground",
						onClick: () => void ipcApi.request("system.shell.open_website", tool.repoUrl),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: tool.repoUrl.replace("https://github.com/", "")
						})]
					}),
					tool.homepage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex min-w-0 items-center gap-1 overflow-hidden text-[11px] text-muted-foreground transition-colors hover:text-foreground",
						onClick: () => void ipcApi.request("system.shell.open_website", tool.homepage),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: tool.homepage.replace(/^https?:\/\//, "")
						})]
					}),
					present && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-ui": "settings.binary-tool-preset-card.action.open",
						type: "button",
						onClick: onOpenPath,
						"aria-label": t("settings.dependencies.openBinariesDir"),
						title: t("settings.dependencies.openBinariesDir"),
						className: "inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-3" })
					})
				]
			}),
			(failedInstall || failedRemove) && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryInstallFailureRow, {
				error: operation.error,
				onShowError: () => onShowError(operation.error)
			}),
			canInstall && !failedRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-border border-t pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "h-7 w-full gap-1 text-xs",
					onClick: onInstall,
					disabled: busy,
					loading: installing,
					children: [!installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), installing ? t("settings.dependencies.installing") : failedInstall || broken || applicationStatus === "unknown" ? t("common.retry") : t("settings.mcp.install")]
				}), installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryInstallingHint, {})]
			})
		]
	});
};
var CustomToolCard = ({ tool, toolSpec, available, runtime = false, systemPath, installedVersion, latestVersion, operation, onShowError, onInstall, onUpdate, onOpenPath, onRemove }) => {
	const { t } = useTranslation();
	const installed = available;
	const installing = operation?.status === "installing";
	const removing = operation?.status === "removing";
	const failedInstall = operation?.status === "failed" && operation.action === "install";
	const failedRemove = operation?.status === "failed" && operation.action === "remove";
	const busy = installing || removing;
	const applicationStatus = tool.application?.status;
	const canUpdate = applicationStatus === "applied";
	const canInstall = applicationStatus === "broken" || applicationStatus === "unknown" || applicationStatus === "absent" && tool.availability.source === "none" || failedInstall;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.custom-tool-card.listitem",
		role: "listitem",
		className: "flex flex-col rounded-xl border border-border p-4 transition-colors duration-200 ease-in-out hover:border-border-strong",
		style: { backgroundColor: "var(--settings-group-background, var(--card))" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex size-10 shrink-0 items-center justify-center rounded-xl", installed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground text-sm leading-5",
								children: tool.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-muted-foreground text-xs",
								children: toolSpec
							}),
							installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 flex flex-wrap items-center gap-1",
								children: [
									installedVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
										children: ["v", installedVersion]
									}),
									systemPath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
										title: systemPath,
										children: t("settings.dependencies.source.system")
									}),
									runtime && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "gap-1 px-1.5 py-0 text-[11px] leading-4",
										title: t("settings.dependencies.runtimeDependencyHint"),
										children: t("settings.dependencies.runtimeDependency")
									}),
									latestVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "gap-1 border-success-border bg-success-subtle px-1.5 py-0 text-[11px] text-success-subtle-foreground leading-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBigUp, { className: "size-2.5" }),
											"v",
											latestVersion
										]
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [
						canUpdate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-muted-foreground hover:text-foreground",
							onClick: onUpdate,
							disabled: busy,
							"aria-label": t("settings.dependencies.update"),
							title: t("settings.dependencies.update"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
						}),
						installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-muted-foreground hover:text-foreground",
							onClick: onOpenPath,
							"aria-label": t("settings.dependencies.openBinariesDir"),
							title: t("common.open"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-muted-foreground hover:text-destructive",
							"aria-label": t("settings.dependencies.remove"),
							title: t("settings.dependencies.remove"),
							onClick: onRemove,
							disabled: busy,
							children: removing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				})]
			}),
			(failedInstall || failedRemove) && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryInstallFailureRow, {
				error: operation.error,
				onShowError: () => onShowError(operation.error)
			}),
			canInstall && !failedRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-border border-t pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "h-7 w-full gap-1 text-xs",
					onClick: onInstall,
					disabled: busy,
					loading: installing,
					children: [!installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), installing ? t("settings.dependencies.installing") : failedInstall || applicationStatus === "broken" || applicationStatus === "unknown" ? t("common.retry") : t("settings.mcp.install")]
				}), installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryInstallingHint, {})]
			})
		]
	});
};
function AddToolDialog({ open, onOpenChange, onAdd }) {
	const { t } = useTranslation();
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [searchError, setSearchError] = (0, import_react.useState)(false);
	const [selectedName, setSelectedName] = (0, import_react.useState)("");
	const [selectedTool, setSelectedTool] = (0, import_react.useState)("");
	const [version, setVersion] = (0, import_react.useState)("");
	const [adding, setAdding] = (0, import_react.useState)(false);
	const searchIdRef = (0, import_react.useRef)(0);
	const reset = () => {
		searchIdRef.current++;
		setQuery("");
		setResults([]);
		setSearching(false);
		setSelectedName("");
		setSelectedTool("");
		setVersion("");
		setAdding(false);
	};
	(0, import_react.useEffect)(() => {
		if (!query.trim()) {
			searchIdRef.current++;
			setResults([]);
			setSearching(false);
			setSearchError(false);
			return;
		}
		const id = ++searchIdRef.current;
		const timer = setTimeout(async () => {
			setSearching(true);
			setSearchError(false);
			try {
				const res = await ipcApi.request("binary.search_registry", query.trim());
				if (id === searchIdRef.current) setResults(res);
			} catch {
				if (id === searchIdRef.current) {
					setResults([]);
					setSearchError(true);
				}
			} finally {
				if (id === searchIdRef.current) setSearching(false);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [query]);
	const selectResult = (r) => {
		setSelectedName(r.name);
		setSelectedTool(r.tool);
		setQuery("");
		setResults([]);
	};
	const handleSubmit = async () => {
		if (!selectedName.trim() || !selectedTool.trim()) return;
		setAdding(true);
		try {
			await onAdd({
				name: selectedName.trim(),
				tool: selectedTool.trim(),
				requestedVersion: version.trim() || void 0
			});
			reset();
			onOpenChange(false);
		} catch {} finally {
			setAdding(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) reset();
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.dependencies.addTool") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("settings.dependencies.addToolDescription") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									autoFocus: true,
									placeholder: t("settings.dependencies.searchRegistry"),
									value: query,
									onChange: (e) => setQuery(e.target.value)
								}),
								searching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "-translate-y-1/2 absolute top-1/2 right-3 size-3.5 text-muted-foreground motion-safe:animate-spin" }),
								results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-popover shadow-md",
									children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
										onClick: () => selectResult(r),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: r.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: r.tool
										})]
									}, r.name))
								}),
								searchError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-destructive text-xs",
									children: t("settings.dependencies.searchFailed")
								})
							]
						}),
						selectedName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg bg-muted px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: selectedName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground text-xs",
									children: selectedTool
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: t("settings.dependencies.fieldVersion"),
							value: version,
							onChange: (e) => setVersion(e.target.value)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSubmit,
					disabled: !selectedName.trim() || !selectedTool.trim() || adding,
					children: [adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 motion-safe:animate-spin" }), t("common.add")]
				})] })
			]
		})
	});
}
var isValidUrl = (value) => {
	try {
		const url = new URL(value);
		return (url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password;
	} catch {
		return false;
	}
};
var UrlPresetField = ({ label, description, invalidHint, placeholder, presetLabel, value, presets, autoFocus, onChange, onCommit }) => {
	const { t } = useTranslation();
	const inputId = (0, import_react.useId)();
	const descriptionId = (0, import_react.useId)();
	const invalid = value.trim() !== "" && !isValidUrl(value.trim());
	const DEFAULT_ITEM_ID = "__default__";
	const items = presets.map((preset) => ({
		id: preset.url || DEFAULT_ITEM_ID,
		url: preset.url,
		label: t(preset.labelKey)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor: inputId,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus,
				id: inputId,
				value,
				placeholder,
				"aria-invalid": invalid,
				"aria-describedby": descriptionId,
				onChange: (event) => onChange(event.target.value),
				onBlur: (event) => onCommit(event.target.value),
				className: cn("min-w-0 flex-1", invalid && "border-destructive")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-44 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectDropdown, {
					items,
					selectedId: null,
					onSelect: (id) => {
						const next = id === DEFAULT_ITEM_ID ? "" : id;
						onChange(next);
						onCommit(next);
					},
					placeholder: presetLabel,
					renderSelected: () => null,
					renderItem: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-foreground text-sm",
							children: item.label
						}), item.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "break-all text-muted-foreground text-xs",
							children: item.url
						})]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
			id: descriptionId,
			className: cn(invalid && "text-destructive"),
			children: invalid ? invalidHint : description
		})
	] });
};
var InstallSettingsDialog = ({ open, onOpenChange }) => {
	const { t } = useTranslation();
	const [settings, setSettings] = usePreference(BINARY_INSTALL_PREFERENCE_KEY, { optimistic: false });
	const [draft, setDraft] = (0, import_react.useState)(settings);
	const [showToken, setShowToken] = (0, import_react.useState)(false);
	const tokenId = (0, import_react.useId)();
	const tokenDescriptionId = (0, import_react.useId)();
	const settingsRef = (0, import_react.useRef)(settings);
	const draftRef = (0, import_react.useRef)(settings);
	const commitQueueRef = (0, import_react.useRef)(Promise.resolve());
	settingsRef.current = settings;
	const updateDraft = (key, value) => {
		setDraft((current) => {
			const next = {
				...current,
				[key]: value
			};
			draftRef.current = next;
			return next;
		});
	};
	(0, import_react.useEffect)(() => {
		if (open) {
			draftRef.current = settingsRef.current;
			setDraft(settingsRef.current);
			setShowToken(false);
		}
	}, [open]);
	const requestClose = (nextOpen) => {
		if (!nextOpen) setShowToken(false);
		onOpenChange(nextOpen);
	};
	const commit = (updates) => {
		const next = {
			...draftRef.current,
			...updates
		};
		draftRef.current = next;
		setDraft(next);
		commitQueueRef.current = commitQueueRef.current.then(() => setSettings(next)).catch((error) => {
			toast.error(formatErrorMessage(error));
		});
	};
	const commitUrl = (key, value) => {
		const trimmed = value.trim();
		if (trimmed && !isValidUrl(trimmed)) return;
		updateDraft(key, trimmed);
		if (trimmed !== settingsRef.current[key]) commit({ [key]: trimmed });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: requestClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.dependencies.installSettings.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("settings.dependencies.installSettings.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlPresetField, {
						autoFocus: true,
						label: t("settings.dependencies.installSettings.githubMirror.label"),
						description: t("settings.dependencies.installSettings.githubMirror.help"),
						invalidHint: t("settings.dependencies.installSettings.invalidUrl"),
						placeholder: t("settings.dependencies.installSettings.githubMirror.placeholder"),
						presetLabel: t("settings.dependencies.installSettings.presets"),
						value: draft.githubMirror,
						presets: GITHUB_MIRROR_PRESETS,
						onChange: (githubMirror) => updateDraft("githubMirror", githubMirror),
						onCommit: (value) => commitUrl("githubMirror", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlPresetField, {
						label: t("settings.dependencies.installSettings.npmRegistry.label"),
						description: t("settings.dependencies.installSettings.npmRegistry.help"),
						invalidHint: t("settings.dependencies.installSettings.invalidUrl"),
						placeholder: t("settings.dependencies.installSettings.npmRegistry.placeholder"),
						presetLabel: t("settings.dependencies.installSettings.presets"),
						value: draft.npmRegistry,
						presets: NPM_REGISTRY_PRESETS,
						onChange: (npmRegistry) => updateDraft("npmRegistry", npmRegistry),
						onCommit: (value) => commitUrl("npmRegistry", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlPresetField, {
						label: t("settings.dependencies.installSettings.pipIndexUrl.label"),
						description: t("settings.dependencies.installSettings.pipIndexUrl.help"),
						invalidHint: t("settings.dependencies.installSettings.invalidUrl"),
						placeholder: t("settings.dependencies.installSettings.pipIndexUrl.placeholder"),
						presetLabel: t("settings.dependencies.installSettings.presets"),
						value: draft.pipIndexUrl,
						presets: PIP_INDEX_PRESETS,
						onChange: (pipIndexUrl) => updateDraft("pipIndexUrl", pipIndexUrl),
						onCommit: (value) => commitUrl("pipIndexUrl", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: tokenId,
							children: t("settings.dependencies.installSettings.githubToken.label")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							id: tokenId,
							type: showToken ? "text" : "password",
							autoComplete: "off",
							placeholder: t("settings.dependencies.installSettings.githubToken.placeholder"),
							"aria-describedby": tokenDescriptionId,
							value: draft.githubToken,
							onChange: (event) => updateDraft("githubToken", event.target.value),
							onBlur: () => {
								if (draftRef.current.githubToken !== settingsRef.current.githubToken) commit({ githubToken: draftRef.current.githubToken });
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
								size: "icon-xs",
								onClick: () => setShowToken((current) => !current),
								"aria-label": t(showToken ? "settings.dependencies.installSettings.githubToken.hide" : "settings.dependencies.installSettings.githubToken.show"),
								children: showToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
							id: tokenDescriptionId,
							children: t("settings.dependencies.installSettings.githubToken.help")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionSwitch, {
						size: "sm",
						label: t("settings.dependencies.installSettings.verifySignatures.label"),
						description: t("settings.dependencies.installSettings.verifySignatures.help"),
						checked: draft.verifySignatures,
						onCheckedChange: (verifySignatures) => commit({ verifySignatures })
					})
				]
			})]
		})
	});
};
var EnvironmentDependencies_default = EnvironmentDependencies;
export { EnvironmentDependencies_default as t };

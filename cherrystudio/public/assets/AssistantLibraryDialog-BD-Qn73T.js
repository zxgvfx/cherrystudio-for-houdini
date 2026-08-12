import { s as __toESM } from "./chunk-DiqNceaa.js";
import { i as formatErrorMessageWithPrefix } from "./error-3V5V4Mev.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as DIALOG_UNMOUNT_DELAY_MS } from "./dialog-Bm50HQ1E.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { t as useVirtualizer } from "./esm-D1CPXB7e.js";
import { t as Badge } from "./badge-HGyBlzr8.js";
import { t as Separator } from "./separator-DFnWafbO.js";
import { t as Skeleton } from "./skeleton-CmSX8uoi.js";
import { n as cn } from "./style-qqUWb85F.js";
import { i as createUniqueModelId } from "./model-CfoN7z8F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as Clock } from "./clock-C_51ruVA.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as Search } from "./search-CQaFGVmj.js";
import { t as ToolCase } from "./tool-case-DruupNDs.js";
import { t as X } from "./x-CZLr1OkN.js";
import { _ as useAssistantMutations } from "./resourceCatalog-Bd6dsVEl.js";
import { t as useBundledCatalog } from "./useBundledCatalog-B1h8EHfw.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function AssistantPresetPreviewDialog({ preset, open, adding = false, addedAssistantId, onOpenChange, onAdd, onOpenChat }) {
	const { t } = useTranslation();
	if (!preset) return null;
	const description = preset.description?.trim();
	const prompt = preset.prompt?.trim();
	const groups = (preset.group || []).slice(0, 3);
	const isAdded = Boolean(addedAssistantId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: !adding,
			size: "xl",
			className: "flex h-[min(600px,76vh)] flex-col gap-0 overflow-hidden p-0",
			onPointerDownOutside: (event) => adding && event.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "shrink-0 border-border-subtle border-b px-5 pt-5 pr-12 pb-4 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-base",
							children: preset.emoji || "🤖"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 pt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "truncate",
								children: preset.name
							}), groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "mt-1 flex flex-wrap items-center gap-1",
								children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "border-0 bg-secondary px-1.5 py-px text-muted-foreground text-xs",
									children: group
								}, group))
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-1",
					children: [description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-muted-foreground text-sm",
						children: t("library.assistant_catalog.preview_description")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap text-foreground text-sm leading-relaxed",
						children: description
					})] }), prompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-muted-foreground text-sm",
						children: t("library.assistant_catalog.preview_prompt")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap rounded-md border border-border-subtle bg-muted p-4 text-muted-foreground text-sm leading-relaxed",
						children: prompt
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "shrink-0 border-border-subtle border-t px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: adding,
						onClick: () => onOpenChange(false),
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "emphasis",
						loading: !isAdded && adding,
						disabled: !isAdded && adding,
						onClick: () => {
							if (addedAssistantId) {
								onOpenChat(addedAssistantId);
								onOpenChange(false);
							} else onAdd();
						},
						children: isAdded ? t("library.assistant_catalog.go_to_chat") : t("library.assistant_catalog.add")
					})]
				})
			]
		})
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function formatDate(dateStr) {
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) return dateStr;
	return new Intl.DateTimeFormat(void 0, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(date);
}
function timeAgo(t, dateStr) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const mins = Math.floor(diff / 6e4);
	if (mins < 1) return t("library.time_ago.just_now");
	if (mins < 60) return t("library.time_ago.minutes", { count: mins });
	const hours = Math.floor(mins / 60);
	if (hours < 24) return t("library.time_ago.hours", { count: hours });
	const days = Math.floor(hours / 24);
	if (days < 30) return t("library.time_ago.days", { count: days });
	return t("library.time_ago.months", { count: Math.floor(days / 30) });
}
var SkillDetailDialog = ({ skill, open, onOpenChange }) => {
	const { t } = useTranslation();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(open);
	const closeTimerRef = (0, import_react.useRef)(null);
	const clearCloseTimer = (0, import_react.useCallback)(() => {
		if (closeTimerRef.current === null) return;
		clearTimeout(closeTimerRef.current);
		closeTimerRef.current = null;
	}, []);
	(0, import_react.useEffect)(() => {
		clearCloseTimer();
		setDialogOpen(open);
	}, [
		clearCloseTimer,
		open,
		skill?.id
	]);
	(0, import_react.useEffect)(() => clearCloseTimer, [clearCloseTimer]);
	const handleOpenChange = (0, import_react.useCallback)((nextOpen) => {
		clearCloseTimer();
		setDialogOpen(nextOpen);
		if (nextOpen) {
			onOpenChange(true);
			return;
		}
		closeTimerRef.current = setTimeout(() => {
			closeTimerRef.current = null;
			onOpenChange(false);
		}, 200);
	}, [clearCloseTimer, onOpenChange]);
	if (!skill) return null;
	const sourceTags = skill.sourceTags ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: dialogOpen,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[calc(100vh-2rem)] overflow-hidden sm:max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "pr-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-warning-subtle text-warning",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, {
							size: 22,
							strokeWidth: 1.5
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 pt-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "truncate",
							children: skill.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "border-0 bg-warning-subtle px-2 py-0.5 text-warning-subtle-foreground text-xs",
									children: t("library.type.skill")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: skill.source
								}),
								skill.author ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: skill.author
								}) : null,
								sourceTags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground-tertiary text-xs",
									children: tag
								}, tag))
							]
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[60vh] space-y-6 overflow-y-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "gap-1.5 border-0 bg-success-subtle px-2 py-0.5 text-success-subtle-foreground text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-1.5 rounded-full bg-success",
							"aria-hidden": "true"
						}), t("library.skill_detail.installed")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium text-muted-foreground text-sm",
							children: t("library.skill_detail.description")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-h-10 text-muted-foreground text-sm leading-6",
							children: skill.description || t("library.skill_detail.no_description")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border-subtle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-muted-foreground text-sm",
								children: t("library.skill_detail.created_at")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(skill.createdAt) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-muted-foreground text-sm",
								children: t("library.skill_detail.updated_at")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatDate(skill.updatedAt),
									" (",
									timeAgo(t, skill.updatedAt),
									")"
								] })]
							})]
						})]
					})
				]
			})]
		})
	});
};
var SkillDetailDialog_default = SkillDetailDialog;
const ASSISTANT_CATALOG_MY_TAB = "__mine__";
var ORDERED_GROUP_ALIASES = [
	["精选", "Featured"],
	["职业", "Career"],
	["商业", "Business"],
	["工具", "Tools"],
	["语言", "Language"],
	["办公", "Office"],
	["通用", "General"],
	["写作", "Writing"],
	["编程", "Programming"],
	["情感", "Emotional"],
	["教育", "Education"],
	["创意", "Creative"],
	["学术", "Academic"],
	["设计", "Design"],
	["艺术", "Art"],
	["娱乐", "Entertainment"],
	["生活", "Life"]
];
var orderedGroupRank = /* @__PURE__ */ new Map();
ORDERED_GROUP_ALIASES.forEach((aliases, index) => {
	aliases.forEach((alias) => orderedGroupRank.set(alias, index));
});
function normalizePresets(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((preset) => {
		return Boolean(preset && typeof preset === "object" && typeof preset.id === "string" && typeof preset.name === "string");
	});
}
function getPresetGroups(preset) {
	return Array.isArray(preset.group) ? preset.group.filter(Boolean) : [];
}
function sortGroups(a, b) {
	const rankA = orderedGroupRank.get(a) ?? Number.MAX_SAFE_INTEGER;
	const rankB = orderedGroupRank.get(b) ?? Number.MAX_SAFE_INTEGER;
	if (rankA !== rankB) return rankA - rankB;
	return a.localeCompare(b, "zh");
}
function buildAssistantCatalogTabs(presets, mineCount, mineLabel) {
	const counts = /* @__PURE__ */ new Map();
	presets.forEach((preset) => {
		getPresetGroups(preset).forEach((group) => counts.set(group, (counts.get(group) ?? 0) + 1));
	});
	const systemTabs = Array.from(counts.entries()).sort(([a], [b]) => sortGroups(a, b)).map(([id, count]) => ({
		id,
		label: id,
		count
	}));
	return [{
		id: ASSISTANT_CATALOG_MY_TAB,
		label: mineLabel,
		count: mineCount
	}, ...systemTabs];
}
function filterAssistantCatalogPresets(presets, activeTab, search) {
	if (activeTab === "__mine__") return [];
	const keyword = search.trim().toLowerCase();
	return presets.filter((preset) => {
		if (!getPresetGroups(preset).includes(activeTab)) return false;
		if (!keyword) return true;
		return [
			preset.name,
			preset.description,
			preset.prompt
		].filter(Boolean).some((text) => text?.toLowerCase().includes(keyword));
	});
}
function getAssistantPresetCatalogKey(preset) {
	return preset.id;
}
function toCreateAssistantDtoFromCatalogPreset(preset) {
	const dto = {
		name: preset.name.trim(),
		prompt: preset.prompt?.trim() || ""
	};
	const description = preset.description?.trim();
	if (description) dto.description = description;
	const emoji = preset.emoji?.trim();
	if (emoji) dto.emoji = emoji;
	if (preset.defaultModel?.provider && preset.defaultModel.id) dto.modelId = createUniqueModelId(preset.defaultModel.provider, preset.defaultModel.id);
	return dto;
}
async function loadCatalogPresets(resourcesPath, language) {
	const fileName = language === "zh-CN" ? "agents-zh.json" : "agents-en.json";
	const content = await window.api.fs.read(`${resourcesPath}/data/${fileName}`, "utf-8");
	return normalizePresets(JSON.parse(content));
}
function useAssistantCatalogPresets({ enabled = true } = {}) {
	const { isLoading, items: presets } = useBundledCatalog({
		catalog: "assistant presets",
		enabled,
		load: loadCatalogPresets
	});
	return {
		isLoading,
		presets
	};
}
var LIBRARY_ALL_TAB = "__all__";
var PRESET_ROW_ESTIMATE_PX = 62;
var PRESET_ROW_GAP_PX = 8;
function getPresetSummary(preset) {
	return (preset.description || preset.prompt || "").replace(/\s+/g, " ").trim();
}
function matchesSearch(preset, keyword) {
	if (!keyword) return true;
	return [
		preset.name,
		preset.description,
		preset.prompt
	].filter(Boolean).some((text) => text?.toLowerCase().includes(keyword));
}
function AssistantLibraryDialog({ open, onOpenChange, onAssistantAdded, onOpenAssistantChat }) {
	const { t } = useTranslation();
	const { createAssistant } = useAssistantMutations();
	const { isLoading, presets: rawPresets } = useAssistantCatalogPresets({ enabled: open });
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)(LIBRARY_ALL_TAB);
	const [addingPresetKeys, setAddingPresetKeys] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [addedAssistantPresets, setAddedAssistantPresets] = (0, import_react.useState)({});
	const [previewPreset, setPreviewPreset] = (0, import_react.useState)(null);
	const [previewAdding, setPreviewAdding] = (0, import_react.useState)(false);
	const listScrollRef = (0, import_react.useRef)(null);
	const tabs = (0, import_react.useMemo)(() => {
		const categoryTabs = buildAssistantCatalogTabs(rawPresets, 0, "").filter((tab) => tab.id !== ASSISTANT_CATALOG_MY_TAB);
		return [{
			id: LIBRARY_ALL_TAB,
			label: t("common.all"),
			count: rawPresets.length
		}, ...categoryTabs];
	}, [rawPresets, t]);
	(0, import_react.useEffect)(() => {
		if (tabs.some((tab) => tab.id === activeTab)) return;
		setActiveTab(LIBRARY_ALL_TAB);
	}, [activeTab, tabs]);
	(0, import_react.useEffect)(() => {
		if (open) return;
		setSearch("");
		setActiveTab(LIBRARY_ALL_TAB);
		setAddedAssistantPresets({});
		setPreviewPreset(null);
	}, [open]);
	const visiblePresets = (0, import_react.useMemo)(() => {
		if (activeTab === LIBRARY_ALL_TAB) {
			const keyword = search.trim().toLowerCase();
			return rawPresets.filter((preset) => matchesSearch(preset, keyword));
		}
		return filterAssistantCatalogPresets(rawPresets, activeTab, search);
	}, [
		activeTab,
		rawPresets,
		search
	]);
	const addPreset = (0, import_react.useCallback)(async (preset) => {
		const assistant = await createAssistant(toCreateAssistantDtoFromCatalogPreset(preset));
		setAddedAssistantPresets((current) => ({
			...current,
			[getAssistantPresetCatalogKey(preset)]: assistant.id
		}));
		onAssistantAdded?.();
		toast.success(t("common.add_success"));
		return assistant;
	}, [
		createAssistant,
		onAssistantAdded,
		t
	]);
	const handleAddPreset = (0, import_react.useCallback)(async (preset) => {
		const presetKey = getAssistantPresetCatalogKey(preset);
		if (addingPresetKeys.has(presetKey)) return;
		setAddingPresetKeys((prev) => new Set(prev).add(presetKey));
		try {
			await addPreset(preset);
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("library.assistant_catalog.add_failed")));
		} finally {
			setAddingPresetKeys((prev) => {
				const next = new Set(prev);
				next.delete(presetKey);
				return next;
			});
		}
	}, [
		addPreset,
		addingPresetKeys,
		t
	]);
	const handleAddPreviewPreset = (0, import_react.useCallback)(async () => {
		if (!previewPreset || previewAdding) return;
		setPreviewAdding(true);
		try {
			await addPreset(previewPreset);
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("library.assistant_catalog.add_failed")));
		} finally {
			setPreviewAdding(false);
		}
	}, [
		addPreset,
		previewAdding,
		previewPreset,
		t
	]);
	const handleOpenChat = (0, import_react.useCallback)((assistantId) => {
		if (!onOpenAssistantChat) return;
		onOpenAssistantChat(assistantId);
		onOpenChange(false);
	}, [onOpenAssistantChat, onOpenChange]);
	const handlePreviewOpenChange = (0, import_react.useCallback)((nextOpen) => {
		if (nextOpen || previewAdding) return;
		setPreviewPreset(null);
	}, [previewAdding]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "xl",
			className: "flex h-[min(600px,76vh)] flex-col gap-0 overflow-hidden p-0 pb-3",
			"data-testid": "assistant-library-dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "shrink-0 px-5 pt-5 pb-3 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("library.assistant_catalog.title") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-3 border-border-subtle border-b px-5 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ui": "resource-catalog.assistant-library-dialog.library-tabs",
						className: "min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
						"data-testid": "library-tabs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1",
							children: tabs.map((tab) => {
								const isActive = tab.id === activeTab;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"data-active": isActive,
									onClick: () => setActiveTab(tab.id),
									className: cn("h-8 shrink-0 whitespace-nowrap rounded-lg px-3 text-sm transition-colors", isActive ? "bg-secondary font-medium text-secondary-foreground" : "font-normal text-muted-foreground hover:bg-accent hover:text-foreground"),
									children: tab.label
								}, tab.id);
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-52 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 14,
								className: "-translate-y-1/2 absolute top-1/2 left-2.5 text-foreground-tertiary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: t("library.toolbar.search_placeholder"),
								className: "h-8 rounded-lg border-input bg-background pr-8 pl-8 text-sm placeholder:text-muted-foreground"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": t("common.clear"),
								onClick: () => setSearch(""),
								className: "-translate-y-1/2 absolute top-1/2 right-1 size-6 text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: listScrollRef,
					"aria-busy": isLoading || void 0,
					className: "min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-1",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantLibraryPresetListSkeleton, {}) : visiblePresets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						preset: search ? "no-result" : "no-resource",
						title: search ? t("library.assistant_catalog.no_match_title") : t("library.assistant_catalog.empty_title"),
						description: search ? t("library.assistant_catalog.no_match_description") : t("library.assistant_catalog.empty_description"),
						className: "py-16"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualizedAssistantLibraryPresetList, {
						scrollRef: listScrollRef,
						presets: visiblePresets,
						addingPresetKeys,
						addedAssistantPresets,
						onAddPreset: handleAddPreset,
						onOpenChat: handleOpenChat,
						onPreviewPreset: setPreviewPreset
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantPresetPreviewDialog, {
		preset: previewPreset,
		open: Boolean(previewPreset),
		adding: previewAdding,
		addedAssistantId: previewPreset ? addedAssistantPresets[getAssistantPresetCatalogKey(previewPreset)] : void 0,
		onOpenChange: handlePreviewOpenChange,
		onAdd: handleAddPreviewPreset,
		onOpenChat: handleOpenChat
	})] });
}
function AssistantLibraryPresetListSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "resource-catalog.assistant-library-preset-list.assistant-library-loading",
		className: "flex flex-col gap-2",
		"data-testid": "assistant-library-loading",
		children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-lg border border-border-subtle bg-card px-3.5 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-9 rounded-lg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-2/3" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-20 rounded-md" })
			]
		}, index))
	});
}
function VirtualizedAssistantLibraryPresetList({ scrollRef, presets, addingPresetKeys, addedAssistantPresets, onAddPreset, onOpenChat, onPreviewPreset }) {
	const rowVirtualizer = useVirtualizer({
		count: presets.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => PRESET_ROW_ESTIMATE_PX + PRESET_ROW_GAP_PX,
		overscan: 6
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "resource-catalog.virtualized-assistant-library-preset",
		style: {
			height: rowVirtualizer.getTotalSize(),
			position: "relative"
		},
		children: rowVirtualizer.getVirtualItems().map((virtualRow) => {
			const preset = presets[virtualRow.index];
			if (!preset) return null;
			const presetKey = getAssistantPresetCatalogKey(preset);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: rowVirtualizer.measureElement,
				"data-index": virtualRow.index,
				className: "pb-2",
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					transform: `translateY(${virtualRow.start}px)`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantLibraryPresetRow, {
					preset,
					adding: addingPresetKeys.has(presetKey),
					addedAssistantId: addedAssistantPresets[presetKey],
					onAddPreset,
					onOpenChat,
					onPreviewPreset
				})
			}, virtualRow.key);
		})
	});
}
var AssistantLibraryPresetRow = (0, import_react.memo)(function AssistantLibraryPresetRow$1({ preset, adding, addedAssistantId, onAddPreset, onOpenChat, onPreviewPreset }) {
	const { t } = useTranslation();
	const summary = getPresetSummary(preset);
	const isAdded = Boolean(addedAssistantId);
	const handleAdd = (0, import_react.useCallback)(() => {
		onAddPreset(preset);
	}, [onAddPreset, preset]);
	const handlePreview = (0, import_react.useCallback)(() => {
		onPreviewPreset(preset);
	}, [onPreviewPreset, preset]);
	const activateOnKeyDown = (0, import_react.useCallback)((event) => {
		if (event.target !== event.currentTarget) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handlePreview();
		}
	}, [handlePreview]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.assistant-library-dialog.button",
		role: "button",
		tabIndex: 0,
		"aria-label": preset.name,
		onClick: handlePreview,
		onKeyDown: activateOnKeyDown,
		className: "group flex cursor-pointer items-center gap-3 rounded-lg border border-border-subtle bg-card px-3.5 py-2.5 transition-[border-color,background-color] hover:border-border-strong hover:bg-accent",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-base",
				children: preset.emoji || "🤖"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-medium text-foreground text-sm leading-5",
					children: preset.name
				}), summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-muted-foreground text-xs leading-4",
					children: summary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				onClick: (event) => event.stopPropagation(),
				children: isAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: cn("h-7 gap-1 px-2 text-success hover:text-success"),
					onClick: () => onOpenChat(addedAssistantId),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("library.assistant_catalog.go_to_chat") })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					className: "h-7 gap-1 px-2.5",
					loading: adding,
					onClick: handleAdd,
					children: [!adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("library.assistant_catalog.add") })]
				})
			})
		]
	});
});
export { SkillDetailDialog_default as i, toCreateAssistantDtoFromCatalogPreset as n, useAssistantCatalogPresets as r, AssistantLibraryDialog as t };

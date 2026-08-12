import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { p as CustomTag_default } from "./providerSettings-Dq9K8OTx.js";
import { r as resolver_default } from "./resolver-eUld2ti5.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { i as UiDataSlot, r as cn$1 } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Check$1 } from "./check-sPFH2oYJ.js";
import { t as ChevronDown$1 } from "./chevron-down-BkfPRkug.js";
import { t as ChevronRight } from "./chevron-right-fVORL6mu.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as HelpTooltip } from "./help-tooltip-35QqnCYx.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as cva } from "./dist-5QAtVvkT.js";
import { t as Spinner } from "./spinner-DFTIxGhU.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { i as Flex, r as ColFlex } from "./flex-BmIgOnUt.js";
import { t as Label } from "./label-CUymrXZH.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as CaseSensitive } from "./case-sensitive-Cz_jtDYB.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as ChevronUp } from "./chevron-up-C-an45UL.js";
import { t as Library } from "./library-DsJxLy7X.js";
import { t as User } from "./user-Bx4zmxmo.js";
import { t as WholeWord } from "./whole-word-CEw1cwAZ.js";
import { t as X } from "./x-CZLr1OkN.js";
import { n as createPopup } from "./popup-C0FVl5N5.js";
import { n as getTopicMessages } from "./useTopic-Ry_b31lB.js";
import { a as ModelSelectorRow, c as DEFAULT_SELECTOR_CONTENT_HEIGHT, l as SelectorShell } from "./ModelSelector-Dwt-BrMn.js";
import { t as Scrollbar_default } from "./Scrollbar-CJJ8_OkK.js";
import { i as useKnowledgeBases } from "./useKnowledgeBase-BQiV-Uju.js";
import { _ as messageToMarkdownWithReasoning, g as messageToMarkdown, h as getMessageTitle, i as exportMarkdownToObsidian, v as messagesToMarkdown, y as topicToMarkdown } from "./ExportService-Dd_zlElq.js";
import { c as useListboxKeyboardNavigation, i as useAddKnowledgeItems, n as resolveKnowledgeFileMetadataEntryData } from "./knowledgeFileEntry-Bpf4jmFf.js";
import { m as ActionIconButton_default, p as NarrowLayout_default } from "./dist-B-XyGPl9.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var treeSelectTriggerVariants = cva(cn$1("inline-flex items-center justify-between rounded-md border-1 text-sm transition-colors outline-none font-normal", "bg-input", "text-foreground"), {
	variants: {
		state: {
			default: "border-border focus-visible:border-primary",
			error: "border border-destructive",
			disabled: "opacity-50 cursor-not-allowed pointer-events-none"
		},
		size: {
			sm: "h-8 px-2 text-xs gap-1",
			default: "h-9 px-3 gap-2",
			lg: "h-10 px-4 gap-2"
		}
	},
	defaultVariants: {
		state: "default",
		size: "default"
	}
});
function getOptionLabel(option) {
	return option.label ?? option.title ?? option.value;
}
function nodeToText(node) {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(nodeToText).join(" ");
	return "";
}
function getOptionSearchText(option) {
	return [
		option.searchText,
		nodeToText(option.label),
		nodeToText(option.title),
		option.value
	].filter(Boolean).join(" ").toLowerCase();
}
function findOption(options, value) {
	for (const option of options) {
		if (option.value === value) return option;
		const child = option.children ? findOption(option.children, value) : void 0;
		if (child) return child;
	}
}
function collectExpandableValues(options) {
	const values = [];
	for (const option of options) if (option.children?.length) {
		values.push(option.value);
		values.push(...collectExpandableValues(option.children));
	}
	return values;
}
function toVisibleTree(options, search, filterOption) {
	const normalizedSearch = search.trim().toLowerCase();
	return options.reduce((nodes, option) => {
		const children = option.children ? toVisibleTree(option.children, search, filterOption) : [];
		if ((!normalizedSearch ? true : filterOption ? filterOption(option, search) : getOptionSearchText(option).includes(normalizedSearch)) || children.length > 0) nodes.push({
			option,
			children
		});
		return nodes;
	}, []);
}
function TreeSelect({ treeData, value: controlledValue, defaultValue, onChange, renderOption, renderValue, searchable = true, searchPlaceholder = "Search...", emptyText = "No results found.", filterOption, defaultExpandAll = false, defaultExpandedValues, expandedValues: controlledExpandedValues, onExpandedValuesChange, expandLabel = "Expand", collapseLabel = "Collapse", placeholder = "Please Select", disabled = false, error = false, className, popoverClassName, triggerStyle, width, maxHeight = 320, size, name }) {
	const [internalOpen, setInternalOpen] = import_react.useState(false);
	const [internalValue, setInternalValue] = import_react.useState(defaultValue);
	const [search, setSearch] = import_react.useState("");
	const [internalExpandedValues, setInternalExpandedValues] = import_react.useState(() => {
		if (defaultExpandedValues) return defaultExpandedValues;
		return defaultExpandAll ? collectExpandableValues(treeData) : [];
	});
	const searchInputRef = import_react.useRef(null);
	const value = controlledValue ?? internalValue;
	const selectedOption = value !== void 0 ? findOption(treeData, value) : void 0;
	const expandedValues = controlledExpandedValues ?? internalExpandedValues;
	const expandedSet = import_react.useMemo(() => new Set(expandedValues), [expandedValues]);
	const visibleTree = import_react.useMemo(() => toVisibleTree(treeData, search, filterOption), [
		filterOption,
		search,
		treeData
	]);
	const triggerWidth = width ? typeof width === "number" ? `${width}px` : width : void 0;
	const state = disabled ? "disabled" : error ? "error" : "default";
	const hasSearch = search.trim().length > 0;
	const setExpandedValues = import_react.useCallback((nextValues) => {
		if (controlledExpandedValues === void 0) setInternalExpandedValues(nextValues);
		onExpandedValuesChange?.(nextValues);
	}, [controlledExpandedValues, onExpandedValuesChange]);
	const toggleExpanded = import_react.useCallback((optionValue) => {
		setExpandedValues(expandedSet.has(optionValue) ? expandedValues.filter((value$1) => value$1 !== optionValue) : [...expandedValues, optionValue]);
	}, [
		expandedSet,
		expandedValues,
		setExpandedValues
	]);
	const handleOpenChange = (nextOpen) => {
		setInternalOpen(nextOpen);
		if (!nextOpen) setSearch("");
	};
	const handleSelect = (option) => {
		if (option.disabled) return;
		if (option.selectable === false) {
			if (option.children?.length) toggleExpanded(option.value);
			return;
		}
		if (controlledValue === void 0) setInternalValue(option.value);
		onChange?.(option.value, option);
		handleOpenChange(false);
	};
	const renderTriggerContent = () => {
		if (!selectedOption) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "ui.render-trigger-content",
			className: "truncate text-muted-foreground",
			children: placeholder
		});
		if (renderValue) return renderValue(selectedOption);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.render-trigger-content",
			className: "flex min-w-0 flex-1 items-center gap-2 truncate",
			children: [selectedOption.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0",
				children: selectedOption.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: getOptionLabel(selectedOption)
			})]
		});
	};
	const renderOptionContent = (option, renderState) => {
		if (renderOption) return renderOption(option, renderState);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			option.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.render-option-content",
				className: "shrink-0",
				children: option.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.render-option-content",
				className: "min-w-0 flex-1 truncate",
				children: getOptionLabel(option)
			}),
			renderState.selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check$1, { className: "size-4 shrink-0 text-primary" })
		] });
	};
	const renderNodes = (nodes, depth = 0) => nodes.map(({ option, children }) => {
		const hasChildren = children.length > 0 || Boolean(option.children?.length);
		const expanded = hasSearch || expandedSet.has(option.value);
		const selected = value === option.value;
		const rowState = {
			depth,
			expanded,
			hasChildren,
			selected
		};
		const rowKey = option.key ?? option.value;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.render-nodes",
			className: "flex items-center gap-1",
			style: { paddingLeft: depth * 14 },
			children: [hasChildren ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": expanded ? collapseLabel : expandLabel,
				"aria-expanded": expanded,
				onClick: () => toggleExpanded(option.value),
				className: "flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn$1("size-4 transition-transform", expanded && "rotate-90") })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-ui": "ui.render-nodes.treeitem",
				type: "button",
				role: "treeitem",
				"aria-selected": selected,
				disabled: option.disabled,
				onClick: () => handleSelect(option),
				className: cn$1("flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors", selected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/60", option.disabled && "pointer-events-none opacity-50", option.selectable === false && "text-muted-foreground"),
				children: renderOptionContent(option, rowState)
			})]
		}), hasChildren && expanded && children.length > 0 && renderNodes(children, depth + 1)] }, rowKey);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open: internalOpen,
		onOpenChange: handleOpenChange,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size,
					disabled,
					style: {
						width: triggerWidth,
						...triggerStyle
					},
					className: cn$1(treeSelectTriggerVariants({
						state,
						size
					}), className),
					role: "combobox",
					"aria-expanded": internalOpen,
					"aria-invalid": error,
					children: [renderTriggerContent(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown$1, { className: cn$1("size-4 shrink-0 opacity-50 transition-transform", internalOpen && "rotate-180") })]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				align: "start",
				className: cn$1("w-(--radix-popover-trigger-width) rounded-md p-1", popoverClassName),
				style: { width: triggerWidth },
				onOpenAutoFocus: (event) => {
					if (!searchable) return;
					event.preventDefault();
					searchInputRef.current?.focus();
				},
				children: [searchable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b p-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: searchInputRef,
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: searchPlaceholder,
						className: "h-8 shadow-none"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "ui.tree-select",
					role: "tree",
					className: "overflow-y-auto py-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/40 [&::-webkit-scrollbar]:w-1",
					style: { maxHeight },
					children: visibleTree.length > 0 ? renderNodes(visibleTree) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-6 text-center text-muted-foreground text-sm",
						children: emptyText
					})
				})]
			}),
			name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name,
				value: value ?? ""
			})
		]
	});
}
var logger$2 = loggerService.withContext("ObsidianExportDialog");
var ObsidianProcessingMethod = {
	APPEND: "1",
	PREPEND: "2",
	NEW_OR_OVERWRITE: "3"
};
var FormRow = ({ label, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-ui": "ui.form-row",
	className: "grid grid-cols-[150px_minmax(0,1fr)] items-center gap-3",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		className: "text-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0",
		children
	})]
});
var convertToTreeData = (files) => {
	const treeData = [{
		title: resolver_default.t("chat.topics.export.obsidian_root_directory"),
		value: "",
		isLeaf: false,
		selectable: true
	}];
	const pathMap = { "": treeData[0] };
	const folders = files.filter((file) => file.type === "folder");
	const mdFiles = files.filter((file) => file.type === "markdown");
	const sortedFolders = [...folders].sort((a, b) => a.path.split("/").length - b.path.split("/").length);
	for (const folder of sortedFolders) {
		const parts = folder.path.split("/");
		let currentPath = "";
		let parentPath = "";
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			currentPath = currentPath ? `${currentPath}/${part}` : part;
			if (!pathMap[currentPath]) {
				const node = {
					title: part,
					value: currentPath,
					key: currentPath,
					isLeaf: false,
					selectable: true,
					children: []
				};
				const parentNode = pathMap[parentPath];
				if (parentNode) {
					if (!parentNode.children) parentNode.children = [];
					parentNode.children.push(node);
				}
				pathMap[currentPath] = node;
			}
			parentPath = currentPath;
		}
	}
	for (const file of mdFiles) {
		const fullPath = file.path;
		const dirPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
		const fileName = file.name;
		const parentNode = pathMap[dirPath] || pathMap[""];
		const fileNode = {
			title: fileName,
			value: fullPath,
			isLeaf: true,
			selectable: true,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.convert-to-tree-data",
				style: { marginRight: 4 },
				children: "📄"
			})
		};
		if (!parentNode.children) parentNode.children = [];
		parentNode.children.push(fileNode);
	}
	return treeData;
};
var PopupContainer$1 = ({ title, obsidianTags, processingMethod, open, resolve, message, messages, topic, rawContent }) => {
	const [defaultObsidianVault, setDefaultObsidianVault] = usePreference("data.integration.obsidian.default_vault");
	const [state, setState] = (0, import_react.useState)({
		title,
		tags: obsidianTags || "",
		createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		source: "Cherry Studio",
		processingMethod,
		folder: ""
	});
	const [hasTitleBeenManuallyEdited, setHasTitleBeenManuallyEdited] = (0, import_react.useState)(false);
	const [vaults, setVaults] = (0, import_react.useState)([]);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [fileTreeData, setFileTreeData] = (0, import_react.useState)([]);
	const [selectedVault, setSelectedVault] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [exportReasoning, setExportReasoning] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (files.length > 0) setFileTreeData(convertToTreeData(files));
		else setFileTreeData([{
			title: resolver_default.t("chat.topics.export.obsidian_root_directory"),
			value: "",
			isLeaf: false,
			selectable: true
		}]);
	}, [files]);
	(0, import_react.useEffect)(() => {
		const fetchVaults = async () => {
			try {
				setLoading(true);
				setError(null);
				const vaultsData = await ipcApi.request("export.obsidian.get_vaults");
				if (vaultsData.length === 0) {
					setError(resolver_default.t("chat.topics.export.obsidian_no_vaults"));
					setLoading(false);
					return;
				}
				setVaults(vaultsData);
				const vaultToUse = defaultObsidianVault || vaultsData[0]?.name;
				if (vaultToUse) setSelectedVault(vaultToUse);
			} catch (error$1) {
				logger$2.error("获取Obsidian Vault失败:", error$1);
				setError(resolver_default.t("chat.topics.export.obsidian_fetch_error"));
			} finally {
				setLoading(false);
			}
		};
		fetchVaults();
	}, [defaultObsidianVault, setDefaultObsidianVault]);
	(0, import_react.useEffect)(() => {
		if (selectedVault) {
			const fetchFiles = async () => {
				try {
					setLoading(true);
					setError(null);
					setFiles(await ipcApi.request("export.obsidian.get_files", { vaultName: selectedVault }));
				} catch (error$1) {
					logger$2.error("获取Obsidian文件失败:", error$1);
					setError(resolver_default.t("chat.topics.export.obsidian_fetch_folders_error"));
				} finally {
					setLoading(false);
				}
			};
			fetchFiles();
		}
	}, [selectedVault]);
	const handleOk = async () => {
		if (!selectedVault) {
			setError(resolver_default.t("chat.topics.export.obsidian_no_vault_selected"));
			return;
		}
		let markdown = "";
		if (rawContent) markdown = rawContent;
		else if (topic) markdown = await topicToMarkdown(topic, exportReasoning);
		else if (messages && messages.length > 0) markdown = await messagesToMarkdown(messages, exportReasoning);
		else if (message) markdown = exportReasoning ? await messageToMarkdownWithReasoning(message) : await messageToMarkdown(message);
		else markdown = "";
		let content = "";
		if (state.processingMethod !== ObsidianProcessingMethod.NEW_OR_OVERWRITE) content = `\n---\n${markdown}`;
		else content = `---\ntitle: ${state.title}\ncreated: ${state.createdAt}\nsource: ${state.source}\ntags: ${state.tags}\n---\n${markdown}`;
		if (content === "") {
			toast.error(resolver_default.t("chat.topics.export.obsidian_export_failed"));
			return;
		}
		await navigator.clipboard.writeText(content);
		if (!await exportMarkdownToObsidian({
			...state,
			folder: state.folder,
			vault: selectedVault
		})) return;
		setOpen(false);
		resolve(true);
	};
	const [openState, setOpen] = (0, import_react.useState)(open);
	(0, import_react.useEffect)(() => {
		setOpen(open);
	}, [open]);
	const handleCancel = () => {
		setOpen(false);
		resolve(false);
	};
	const handleChange = (key, value) => {
		setState((prevState) => ({
			...prevState,
			[key]: value
		}));
	};
	const handleTitleInputChange = (newTitle) => {
		handleChange("title", newTitle);
		setHasTitleBeenManuallyEdited(true);
	};
	const handleVaultChange = (value) => {
		setSelectedVault(value);
		setState((prevState) => ({
			...prevState,
			folder: ""
		}));
	};
	const handleFileSelect = (value) => {
		handleChange("folder", value);
		if (value) {
			const selectedFile = files.find((file) => file.path === value);
			if (selectedFile) if (selectedFile.type === "markdown") {
				const fileName = selectedFile.name;
				handleChange("title", fileName.endsWith(".md") ? fileName.substring(0, fileName.length - 3) : fileName);
				setHasTitleBeenManuallyEdited(false);
				handleChange("processingMethod", ObsidianProcessingMethod.APPEND);
			} else {
				handleChange("processingMethod", ObsidianProcessingMethod.NEW_OR_OVERWRITE);
				if (!hasTitleBeenManuallyEdited) handleChange("title", title);
			}
		}
	};
	const handleOpenChange = (nextOpen) => {
		if (!nextOpen) handleCancel();
	};
	const renderVaultSelector = () => {
		if (loading && vaults.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.render-vault-selector",
			className: "flex min-h-20 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: resolver_default.t("chat.topics.export.obsidian_loading") })
		});
		if (vaults.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: selectedVault || void 0,
			onValueChange: handleVaultChange,
			disabled: loading,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: resolver_default.t("chat.topics.export.obsidian_vault_placeholder") })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: vaults.map((vault) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: vault.name,
				children: vault.name
			}, vault.name)) })]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			preset: "no-resource",
			className: "min-h-20 py-4",
			description: resolver_default.t("chat.topics.export.obsidian_no_vaults")
		});
	};
	const renderPathSelector = () => {
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.render-path-selector",
			className: "flex min-h-9 items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: resolver_default.t("chat.topics.export.obsidian_loading") })
		});
		if (selectedVault) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeSelect, {
			value: state.folder,
			onChange: handleFileSelect,
			placeholder: resolver_default.t("chat.topics.export.obsidian_path_placeholder"),
			searchPlaceholder: resolver_default.t("common.search"),
			emptyText: resolver_default.t("common.no_results"),
			expandLabel: resolver_default.t("common.expand"),
			collapseLabel: resolver_default.t("common.collapse"),
			width: "100%",
			maxHeight: 400,
			treeData: fileTreeData
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			preset: "no-resource",
			className: "min-h-20 py-4",
			description: resolver_default.t("chat.topics.export.obsidian_select_vault_first")
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: openState,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-[600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: resolver_default.t("chat.topics.export.obsidian_atributes") }) }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
					className: "mb-1",
					message: error,
					type: "error",
					showIcon: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_title"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: true,
								value: state.title,
								onChange: (e) => handleTitleInputChange(e.target.value),
								placeholder: resolver_default.t("chat.topics.export.obsidian_title_placeholder")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_vault"),
							children: renderVaultSelector()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_path"),
							children: renderPathSelector()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_tags"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: state.tags,
								onChange: (e) => handleChange("tags", e.target.value),
								placeholder: resolver_default.t("chat.topics.export.obsidian_tags_placeholder")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_created"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: state.createdAt,
								onChange: (e) => handleChange("createdAt", e.target.value),
								placeholder: resolver_default.t("chat.topics.export.obsidian_created_placeholder")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_source"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: state.source,
								onChange: (e) => handleChange("source", e.target.value),
								placeholder: resolver_default.t("chat.topics.export.obsidian_source_placeholder")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_operate"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: state.processingMethod || void 0,
									onValueChange: (value) => handleChange("processingMethod", value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: resolver_default.t("chat.topics.export.obsidian_operate_placeholder") })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: ObsidianProcessingMethod.APPEND,
											children: resolver_default.t("chat.topics.export.obsidian_operate_append")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: ObsidianProcessingMethod.PREPEND,
											children: resolver_default.t("chat.topics.export.obsidian_operate_prepend")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: ObsidianProcessingMethod.NEW_OR_OVERWRITE,
											children: resolver_default.t("chat.topics.export.obsidian_operate_new_or_overwrite")
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon-sm",
									disabled: !state.processingMethod,
									"aria-label": resolver_default.t("common.clear"),
									onClick: () => handleChange("processingMethod", void 0),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
								})]
							})
						}),
						!rawContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormRow, {
							label: resolver_default.t("chat.topics.export.obsidian_reasoning"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: exportReasoning,
								onCheckedChange: setExportReasoning
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: handleCancel,
					children: resolver_default.t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: vaults.length === 0 || loading || !!error || !state.title.trim(),
					onClick: handleOk,
					children: resolver_default.t("chat.topics.export.obsidian_btn")
				})] })
			]
		})
	});
};
var ObsidianExportPopupContainer = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopupContainer$1, {
	...props,
	obsidianTags: ""
});
var ObsidianExportPopup_default = createPopup(ObsidianExportPopupContainer, { dismissResult: false });
var KNOWLEDGE_BASE_ROW_HEIGHT = 36;
var KNOWLEDGE_BASE_LIST_PADDING = 8;
var KNOWLEDGE_BASE_EMPTY_LIST_HEIGHT = 80;
var KNOWLEDGE_BASE_SHELL_CHROME_HEIGHT = 40;
const KnowledgeBaseSelector = ({ value, options, placeholder, searchPlaceholder, emptyText, invalid = false, "aria-label": ariaLabel, onChange }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [searchValue, setSearchValue] = (0, import_react.useState)("");
	const selectedOption = options.find((option) => option.value === value);
	const filteredOptions = (0, import_react.useMemo)(() => {
		const query = searchValue.trim().toLowerCase();
		return query ? options.filter((option) => option.label.toLowerCase().includes(query)) : options;
	}, [options, searchValue]);
	const listHeight = filteredOptions.length > 0 ? filteredOptions.length * KNOWLEDGE_BASE_ROW_HEIGHT + KNOWLEDGE_BASE_LIST_PADDING : KNOWLEDGE_BASE_EMPTY_LIST_HEIGHT;
	const contentHeight = Math.min(344, listHeight + KNOWLEDGE_BASE_SHELL_CHROME_HEIGHT);
	const handleOpenChange = (nextOpen) => {
		setOpen(nextOpen);
		if (!nextOpen) setSearchValue("");
	};
	const handleSelect = (nextValue) => {
		onChange(nextValue);
		handleOpenChange(false);
	};
	const { activeIndex, activeOptionId, getOptionId, handleKeyDown, listboxId, listRef, setActiveIndex } = useListboxKeyboardNavigation({
		open,
		options: filteredOptions,
		value,
		onSelect: (option) => handleSelect(option.value)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectorShell, {
		trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			"aria-label": ariaLabel,
			"aria-invalid": invalid || void 0,
			className: cn$1("h-9 w-full min-w-0 justify-between gap-2 rounded-md px-3 font-normal text-sm shadow-none", selectedOption ? "text-foreground" : "text-muted-foreground", invalid && "aria-invalid:border-error-border aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate text-left",
				children: selectedOption?.label ?? placeholder
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 opacity-50" })]
		}),
		open,
		onOpenChange: handleOpenChange,
		width: "var(--radix-popover-trigger-width)",
		contentHeight,
		search: {
			value: searchValue,
			onChange: setSearchValue,
			placeholder: searchPlaceholder,
			ariaControls: listboxId,
			activeDescendant: activeOptionId
		},
		contentProps: { onKeyDown: handleKeyDown },
		"data-testid": "knowledge-base-selector-content",
		children: ({ availableListHeight }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
			id: listboxId,
			ref: listRef,
			role: "listbox",
			"aria-label": ariaLabel,
			tabIndex: -1,
			className: "min-h-0 flex-1 px-1 py-1 outline-none",
			style: { height: availableListHeight ?? listHeight },
			children: filteredOptions.length > 0 ? filteredOptions.map((option, index) => {
				const selected = option.value === value;
				const active = index === activeIndex;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-0.5",
					"data-listbox-option-index": index,
					onMouseEnter: () => {
						if (!option.disabled) setActiveIndex(index);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorRow, {
						selected,
						focused: active,
						disabled: option.disabled,
						showSelectedIndicator: selected,
						leading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-4 shrink-0 text-muted-foreground" }),
						onSelect: () => handleSelect(option.value),
						optionProps: {
							id: getOptionId(index),
							"aria-selected": selected,
							"data-active": active || void 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: option.label
						})
					})
				}, option.value);
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full items-center justify-center px-3 text-center text-muted-foreground text-xs",
				children: emptyText
			})
		})
	});
};
const CONTENT_TYPES = {
	TEXT: "text",
	CODE: "code",
	THINKING: "thinking",
	TOOL_USE: "tools",
	CITATION: "citations",
	TRANSLATION: "translations",
	ERROR: "errors",
	FILE: "files",
	IMAGES: "images"
};
function filePartUrlToPath(url) {
	if (!url.startsWith("file://")) return url;
	try {
		const pathname = decodeURIComponent(new URL(url).pathname);
		if (/^\/[A-Za-z]:\//.test(pathname)) return pathname.slice(1).replace(/\//g, "\\");
		return pathname;
	} catch {
		return url.replace(/^file:\/\//, "");
	}
}
function getParts(message) {
	return message.parts ?? [];
}
function getDataPart(part) {
	if ("data" in part && part.data && typeof part.data === "object") return part.data;
}
function isToolPart(type) {
	return type.startsWith("tool-") || type === "dynamic-tool";
}
function isImageFilePart(part) {
	return Boolean(part.mediaType?.startsWith("image/"));
}
function analyzeMessageContent(message) {
	const stats = {
		text: 0,
		code: 0,
		thinking: 0,
		images: 0,
		files: 0,
		tools: 0,
		citations: 0,
		translations: 0,
		errors: 0
	};
	for (const part of getParts(message)) switch (part.type) {
		case "text":
			if ((part.text ?? "").trim()) stats.text++;
			break;
		case "reasoning":
			stats.thinking++;
			break;
		case "data-code":
			if ((getDataPart(part)?.content ?? "").trim()) stats.code++;
			break;
		case "data-error":
			stats.errors++;
			break;
		case "data-translation":
			stats.translations++;
			break;
		case "file": {
			const filePart = part;
			if (isImageFilePart(filePart)) stats.images++;
			else if (filePart.url) stats.files++;
			break;
		}
		default:
			if (isToolPart(part.type)) stats.tools++;
			break;
	}
	return stats;
}
function processMessageContent(message, selectedTypes) {
	const textParts = [];
	const files = [];
	const selectedTypeSet = new Set(selectedTypes);
	getParts(message).forEach((part, index) => {
		const textContent = processTextlikePart(part, index, message.id, selectedTypeSet);
		if (textContent.trim()) textParts.push(textContent);
		if (selectedTypeSet.has(CONTENT_TYPES.FILE)) {
			const fileContent = filePartToMetadata(part);
			if (fileContent) files.push(fileContent);
		}
	});
	return {
		text: textParts.join("\n\n"),
		files
	};
}
function processTextlikePart(part, index, messageId, selectedTypes) {
	const partId = `${messageId}-part-${index}`;
	switch (part.type) {
		case "text":
			if (!selectedTypes.has(CONTENT_TYPES.TEXT)) return "";
			return part.text || "";
		case "data-code":
			if (!selectedTypes.has(CONTENT_TYPES.CODE)) return "";
			return getDataPart(part)?.content || "";
		case "reasoning":
			if (!selectedTypes.has(CONTENT_TYPES.THINKING)) return "";
			return `<think>\n${part.text || ""}\n</think>`;
		case "data-error": {
			if (!selectedTypes.has(CONTENT_TYPES.ERROR)) return "";
			const data = getDataPart(part);
			const error = data ? {
				name: data.name ?? void 0,
				message: data.message ?? data.code ?? "Error occurred",
				stack: data.stack
			} : void 0;
			return `<error>\n${error ? JSON.stringify(error) : "Error occurred"}\n</error>`;
		}
		case "data-translation": {
			if (!selectedTypes.has(CONTENT_TYPES.TRANSLATION)) return "";
			const data = getDataPart(part);
			return `<translation target="${data?.targetLanguage ?? ""}">\n${data?.content ?? ""}\n</translation>`;
		}
		case "file": {
			const filePart = part;
			if (isImageFilePart(filePart)) {
				if (!selectedTypes.has(CONTENT_TYPES.IMAGES)) return "";
				if (filePart.url) return `<image id="${partId}" filename="${filePart.filename ?? ""}" type="${filePart.mediaType ?? ""}" />`;
				return `<image id="${partId}" />`;
			}
			if (!selectedTypes.has(CONTENT_TYPES.FILE)) return "";
			if (!filePart.url) return "";
			return `<file id="${partId}" filename="${filePart.filename ?? ""}" type="${filePart.mediaType ?? ""}" />`;
		}
		default: {
			if (!isToolPart(part.type)) return "";
			if (!selectedTypes.has(CONTENT_TYPES.TOOL_USE)) return "";
			const toolInfo = {
				id: part.toolCallId ?? partId,
				name: ""
			};
			return `<tool>\n${JSON.stringify(toolInfo, null, 2)}\n</tool>`;
		}
	}
}
function filePartToMetadata(part) {
	if (part.type !== "file") return null;
	const filePart = part;
	if (isImageFilePart(filePart)) return null;
	if (!filePart.url) return null;
	return {
		name: filePart.filename ?? "",
		path: filePartUrlToPath(filePart.url),
		type: filePart.mediaType ?? ""
	};
}
async function analyzeTopicContent(topic) {
	return analyzeMessagesContent(await getTopicMessages(topic.id));
}
function analyzeMessagesContent(messages) {
	const stats = {
		text: 0,
		code: 0,
		thinking: 0,
		images: 0,
		files: 0,
		tools: 0,
		citations: 0,
		translations: 0,
		errors: 0,
		messages: messages.length
	};
	for (const message of messages) {
		const messageStats = analyzeMessageContent(message);
		stats.text += messageStats.text;
		stats.code += messageStats.code;
		stats.thinking += messageStats.thinking;
		stats.images += messageStats.images;
		stats.files += messageStats.files;
		stats.tools += messageStats.tools;
		stats.citations += messageStats.citations;
		stats.translations += messageStats.translations;
		stats.errors += messageStats.errors;
	}
	return stats;
}
function processMessagesContent(title, messages, selectedTypes) {
	const textParts = [];
	const files = [];
	if (new Set(selectedTypes).has(CONTENT_TYPES.TEXT)) textParts.push(`# ${title}`);
	for (const message of messages) {
		const messageResult = processMessageContent(message, selectedTypes);
		if (messageResult.text.trim()) {
			const rolePrefix = message.role === "user" ? `## ${resolver_default.t("common.you")}：` : `## ${resolver_default.t("common.assistant")}：`;
			textParts.push(`${rolePrefix}\n\n${messageResult.text}`);
		}
		files.push(...messageResult.files);
	}
	return {
		text: textParts.join("\n\n---\n\n"),
		files
	};
}
async function processTopicContent(topic, selectedTypes) {
	const messages = await getTopicMessages(topic.id);
	return processMessagesContent(topic.name, messages, selectedTypes);
}
var logger$1 = loggerService.withContext("SaveToKnowledgePopup");
var CONTENT_TYPE_CONFIG = {
	[CONTENT_TYPES.TEXT]: {
		label: "chat.save.knowledge.content.maintext.title",
		description: "chat.save.knowledge.content.maintext.description",
		topicDescription: "chat.save.topic.knowledge.content.maintext.description"
	},
	[CONTENT_TYPES.CODE]: {
		label: "chat.save.knowledge.content.code.title",
		description: "chat.save.knowledge.content.code.description"
	},
	[CONTENT_TYPES.THINKING]: {
		label: "chat.save.knowledge.content.thinking.title",
		description: "chat.save.knowledge.content.thinking.description"
	},
	[CONTENT_TYPES.TOOL_USE]: {
		label: "chat.save.knowledge.content.tool_use.title",
		description: "chat.save.knowledge.content.tool_use.description"
	},
	[CONTENT_TYPES.CITATION]: {
		label: "chat.save.knowledge.content.citation.title",
		description: "chat.save.knowledge.content.citation.description"
	},
	[CONTENT_TYPES.TRANSLATION]: {
		label: "chat.save.knowledge.content.translation.title",
		description: "chat.save.knowledge.content.translation.description"
	},
	[CONTENT_TYPES.ERROR]: {
		label: "chat.save.knowledge.content.error.title",
		description: "chat.save.knowledge.content.error.description"
	},
	[CONTENT_TYPES.FILE]: {
		label: "chat.save.knowledge.content.file.title",
		description: "chat.save.knowledge.content.file.description"
	}
};
var TAG_COLORS = {
	SELECTED: "#008001",
	UNSELECTED: "#8c8c8c"
};
var getNoteSource = async (source, fallbackConversationTitle, sourceTitle) => {
	const trimmedSourceTitle = sourceTitle?.trim();
	if (trimmedSourceTitle) return trimmedSourceTitle;
	if (source.type === "note") return source.data.name.trim() || source.data.id;
	if (source.type === "topic") return source.data.name.trim() || source.data.id;
	if (source.type === "messages") return source.data.title.trim() || fallbackConversationTitle;
	return getMessageTitle(source.data);
};
var PopupContainer = ({ dialogTitle, source, sourceTitle, open, resolve }) => {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [analysisLoading, setAnalysisLoading] = (0, import_react.useState)(true);
	const [selectedBaseId, setSelectedBaseId] = (0, import_react.useState)();
	const [selectedTypes, setSelectedTypes] = (0, import_react.useState)([]);
	const [hasInitialized, setHasInitialized] = (0, import_react.useState)(false);
	const [contentStats, setContentStats] = (0, import_react.useState)(null);
	const { bases } = useKnowledgeBases();
	const { submit: submitKnowledgeItems } = useAddKnowledgeItems(selectedBaseId || "");
	const { t } = useTranslation();
	const isTopicMode = source?.type === "topic";
	const isMessagesMode = source?.type === "messages";
	const isConversationMode = isTopicMode || isMessagesMode;
	const isNoteMode = source?.type === "note";
	(0, import_react.useEffect)(() => {
		const analyze = async () => {
			if (isNoteMode) {
				setAnalysisLoading(false);
				return;
			}
			setAnalysisLoading(true);
			setContentStats(null);
			try {
				setContentStats(isTopicMode ? await analyzeTopicContent(source?.data) : isMessagesMode ? analyzeMessagesContent(source?.data.messages) : analyzeMessageContent(source?.data));
			} catch (error) {
				logger$1.error("analyze content failed:", error);
				setContentStats({
					text: 0,
					code: 0,
					thinking: 0,
					images: 0,
					files: 0,
					tools: 0,
					citations: 0,
					translations: 0,
					errors: 0,
					...isConversationMode && { messages: 0 }
				});
			} finally {
				setAnalysisLoading(false);
			}
		};
		analyze();
	}, [
		source,
		isTopicMode,
		isMessagesMode,
		isConversationMode,
		isNoteMode
	]);
	const contentTypeOptions = (0, import_react.useMemo)(() => {
		if (!contentStats || isNoteMode) return [];
		return Object.entries(CONTENT_TYPE_CONFIG).map(([type, config]) => {
			const contentType = type;
			const count = contentStats[contentType] || 0;
			const descriptionKey = isConversationMode && "topicDescription" in config && config.topicDescription ? config.topicDescription : config.description;
			return {
				type: contentType,
				count,
				enabled: count > 0,
				label: t(config.label),
				description: t(descriptionKey)
			};
		}).filter((option) => option.enabled);
	}, [
		contentStats,
		t,
		isConversationMode,
		isNoteMode
	]);
	const knowledgeBaseOptions = (0, import_react.useMemo)(() => bases.map((base) => ({
		label: base.name,
		value: base.id,
		disabled: base.status !== "completed"
	})), [bases]);
	const formState = (0, import_react.useMemo)(() => {
		const hasValidBase = selectedBaseId && bases.find((base) => base.id === selectedBaseId)?.status === "completed";
		const hasContent = isNoteMode || contentTypeOptions.length > 0;
		return {
			hasValidBase,
			hasContent,
			canSubmit: hasValidBase && (isNoteMode || selectedTypes.length > 0 && hasContent),
			selectedCount: isNoteMode ? 1 : contentTypeOptions.filter((option) => selectedTypes.includes(option.type)).reduce((sum, option) => sum + option.count, 0),
			hasNoSelection: !isNoteMode && selectedTypes.length === 0 && hasContent
		};
	}, [
		selectedBaseId,
		bases,
		contentTypeOptions,
		selectedTypes,
		isNoteMode
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedBaseId) {
			const firstAvailableBase = bases.find((base) => base.status === "completed");
			if (firstAvailableBase) setSelectedBaseId(firstAvailableBase.id);
		}
	}, [bases, selectedBaseId]);
	(0, import_react.useEffect)(() => {
		if (!hasInitialized && contentTypeOptions.length > 0 && !isNoteMode) {
			setSelectedTypes(contentTypeOptions.map((option) => option.type));
			setHasInitialized(true);
		}
	}, [
		contentTypeOptions,
		hasInitialized,
		isNoteMode
	]);
	const uiState = (0, import_react.useMemo)(() => {
		if (analysisLoading) return {
			type: "loading",
			message: t("chat.save.topic.knowledge.loading")
		};
		if (!formState.hasContent && !isNoteMode) return {
			type: "empty",
			message: t(isConversationMode ? "chat.save.topic.knowledge.empty.no_content" : "chat.save.knowledge.empty.no_content")
		};
		if (bases.length === 0) return {
			type: "empty",
			message: t("chat.save.knowledge.empty.no_knowledge_base")
		};
		return { type: "form" };
	}, [
		analysisLoading,
		formState.hasContent,
		bases.length,
		t,
		isConversationMode,
		isNoteMode
	]);
	const handleContentTypeToggle = (type) => {
		setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t$1) => t$1 !== type) : [...prev, type]);
	};
	const onOk = async () => {
		if (!formState.canSubmit) return;
		setLoading(true);
		let savedCount = 0;
		try {
			if (!selectedBaseId) throw new Error("No knowledge base selected");
			const selectedBase = bases.find((base) => base.id === selectedBaseId);
			if (!selectedBase) throw new Error("Selected knowledge base not found");
			if (selectedBase.status !== "completed") throw new Error("Knowledge base is not properly configured. Please check the knowledge base settings.");
			const items = [];
			const noteSource = await getNoteSource(source, t("chat.save.topic.knowledge.source_fallback"), sourceTitle);
			if (isNoteMode) {
				const note = source.data;
				if (!note.externalPath) throw new Error("Note external path is required for export");
				let content = "";
				try {
					content = await window.api.file.readExternal(note.externalPath);
				} catch (error) {
					logger$1.error("Failed to read note file:", error);
					throw new Error("Failed to read note content. Please ensure the file exists and is accessible.");
				}
				if (!content || content.trim() === "") throw new Error("Note content is empty. Cannot export empty notes to knowledge base.");
				logger$1.debug("Note content loaded", { contentLength: content.length });
				items.push({
					type: "note",
					data: {
						source: noteSource,
						content
					}
				});
				savedCount = 1;
			} else {
				const result = isTopicMode ? await processTopicContent(source?.data, selectedTypes) : isMessagesMode ? processMessagesContent(source.data.title, source.data.messages, selectedTypes) : processMessageContent(source?.data, selectedTypes);
				logger$1.debug("Processed content:", result);
				if (result.text.trim() && selectedTypes.some((type) => type !== CONTENT_TYPES.FILE)) {
					items.push({
						type: "note",
						data: {
							source: noteSource,
							content: result.text
						}
					});
					savedCount++;
				}
				if (result.files.length > 0 && selectedTypes.includes(CONTENT_TYPES.FILE)) {
					const fileResults = await Promise.allSettled(result.files.map(resolveKnowledgeFileMetadataEntryData));
					const fileData = fileResults.flatMap((item) => item.status === "fulfilled" ? [item.value] : []);
					const failedFiles = fileResults.flatMap((item, index) => item.status === "rejected" ? [{
						index,
						source: result.files[index]?.origin_name || result.files[index]?.name,
						reason: item.reason instanceof Error ? item.reason.message : String(item.reason)
					}] : []);
					const failedCount = failedFiles.length;
					if (failedCount > 0) {
						logger$1.warn("Failed to resolve some knowledge file entries", {
							failedCount,
							totalCount: fileResults.length,
							failedFiles
						});
						toast.warning(t("chat.save.knowledge.error.file_partial_failed", { count: failedCount }));
					}
					items.push(...fileData.map((data) => ({
						type: "file",
						data
					})));
					savedCount += fileData.length;
				}
			}
			if (items.length > 0) await submitKnowledgeItems(items);
			resolve({
				success: true,
				savedCount
			});
		} catch (error) {
			logger$1.error("save failed:", error);
			let errorMessage = t(isConversationMode ? "chat.save.topic.knowledge.error.save_failed" : "chat.save.knowledge.error.save_failed");
			if (error instanceof Error) {
				if (error.message.includes("not properly configured")) errorMessage = error.message;
				else if (error.message.includes("empty")) errorMessage = error.message;
				else if (error.message.includes("read note content")) errorMessage = error.message;
			}
			toast.error(errorMessage);
			setLoading(false);
		}
	};
	const onCancel = () => {
		resolve(null);
	};
	const renderEmptyState = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.render-empty-state",
		className: "flex min-h-[100px] items-center justify-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground text-sm",
			children: uiState.message
		})
	});
	const renderFormContent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.render-form-content",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("chat.save.knowledge.select.base.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeBaseSelector, {
						"aria-label": t("chat.save.knowledge.select.base.title"),
						emptyText: t("common.no_results"),
						invalid: !formState.hasValidBase && !!selectedBaseId,
						onChange: setSelectedBaseId,
						options: knowledgeBaseOptions,
						placeholder: t("chat.save.knowledge.select.base.placeholder"),
						searchPlaceholder: t("common.search"),
						value: selectedBaseId
					}),
					!formState.hasValidBase && selectedBaseId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-destructive text-xs",
						children: t("chat.save.knowledge.error.invalid_base")
					})
				]
			}),
			!isNoteMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(isConversationMode ? "chat.save.topic.knowledge.select.content.label" : "chat.save.knowledge.select.content.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColFlex, {
					className: "gap-2",
					children: contentTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full cursor-pointer items-center justify-between rounded-md border border-border p-3 text-left transition-colors hover:border-primary",
						onClick: () => handleContentTypeToggle(option.type),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
							className: "items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
									color: selectedTypes.includes(option.type) ? TAG_COLORS.SELECTED : TAG_COLORS.UNSELECTED,
									size: 12,
									children: option.count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpTooltip, { content: option.description })
							]
						}), selectedTypes.includes(option.type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 16,
							color: TAG_COLORS.SELECTED
						})]
					}, option.type))
				})]
			}),
			!isNoteMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex min-h-10 items-center rounded-md bg-muted p-3",
				children: [
					formState.selectedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: t(isConversationMode ? "chat.save.topic.knowledge.select.content.selected_tip" : "chat.save.knowledge.select.content.tip", {
							count: formState.selectedCount,
							...isConversationMode && { messages: contentStats?.messages || 0 }
						})
					}),
					formState.hasNoSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-warning text-xs",
						children: t("chat.save.knowledge.error.no_content_selected")
					}),
					!formState.hasNoSelection && formState.selectedCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs opacity-0",
						children: "\xA0"
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !nextOpen && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: dialogTitle || t(isNoteMode ? "notes.export_knowledge" : isConversationMode ? "chat.save.topic.knowledge.title" : "chat.save.knowledge.title") }) }),
				uiState.type === "form" ? renderFormContent() : renderEmptyState(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onCancel,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onOk,
					loading,
					disabled: !formState.canSubmit || analysisLoading,
					children: t("common.save")
				})] })
			]
		})
	});
};
var popup = createPopup(PopupContainer, { dismissResult: null });
var SaveToKnowledgePopup_default = {
	...popup,
	showForMessage: (message, title) => popup.show({
		dialogTitle: title,
		source: {
			type: "message",
			data: message
		},
		sourceTitle: title
	}),
	showForMessages: (messages, title) => popup.show({
		source: {
			type: "messages",
			data: {
				title,
				messages
			}
		},
		sourceTitle: title
	}),
	showForTopic: (topic, title) => popup.show({
		dialogTitle: title,
		source: {
			type: "topic",
			data: topic
		},
		sourceTitle: title
	}),
	showForNote: (note, title) => popup.show({
		dialogTitle: title,
		source: {
			type: "note",
			data: note
		},
		sourceTitle: title
	})
};
var logger = loggerService.withContext("utils/dom");
function scrollIntoView(element, options) {
	if (!element) {
		logger.warn("[scrollIntoView] Unexpected falsy element. Do nothing as fallback.");
		return;
	}
	element.scrollIntoView(options ?? {
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	});
}
function scrollElementIntoView(element, scrollContainer, behavior = "smooth") {
	if (!scrollContainer) {
		scrollIntoView(element, {
			behavior,
			block: "center",
			inline: "nearest"
		});
		return;
	}
	if (scrollContainer.scrollHeight > scrollContainer.clientHeight || scrollContainer.scrollWidth > scrollContainer.clientWidth) {
		const containerRect = scrollContainer.getBoundingClientRect();
		const elRect = element.getBoundingClientRect();
		const desiredTop = elRect.top - containerRect.top + scrollContainer.scrollTop - Math.max(0, scrollContainer.clientHeight - elRect.height) / 2;
		scrollContainer.scrollTo({
			top: Math.max(0, desiredTop),
			behavior
		});
	} else scrollIntoView(element, {
		behavior,
		block: "center",
		inline: "nearest"
	});
}
const INITIAL_FIND_BAR_STATE = {
	enabled: false,
	query: "",
	caseSensitive: false,
	wholeWord: false,
	includeUser: false
};
function EditorPlacement({ children }) {
	const [narrowMode] = usePreference("chat.narrow_mode");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.editor-placement",
		className: "absolute inset-x-0 top-0 z-[999] flex flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NarrowLayout_default, {
			narrowMode,
			className: "w-full",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[5px]" })]
	});
}
function FindBar({ matchCount, currentIndex, onNavigate, onStateChange, placement = "message-list", showUserToggle = true, ref }) {
	const { t } = useTranslation();
	const inputRef = (0, import_react.useRef)(null);
	const [state, setState] = (0, import_react.useState)(() => ({ ...INITIAL_FIND_BAR_STATE }));
	const [focusSequence, setFocusSequence] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		onStateChange(state);
	}, [onStateChange, state]);
	const focus = (0, import_react.useCallback)(() => {
		setFocusSequence((sequence) => sequence + 1);
	}, []);
	const disable = (0, import_react.useCallback)(() => {
		setState((current) => ({
			...current,
			enabled: false
		}));
	}, []);
	const enable = (0, import_react.useCallback)((initialText) => {
		setState((current) => ({
			...current,
			enabled: true,
			...initialText?.trim() ? { query: initialText } : {}
		}));
		setFocusSequence((sequence) => sequence + 1);
	}, []);
	(0, import_react.useImperativeHandle)(ref, () => ({
		disable,
		enable
	}), [disable, enable]);
	(0, import_react.useEffect)(() => {
		if (!state.enabled || focusSequence === 0) return;
		inputRef.current?.focus();
		inputRef.current?.select();
	}, [focusSequence, state.enabled]);
	const handleInputKeyDown = (0, import_react.useCallback)((event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			onNavigate(event.shiftKey ? -1 : 1);
		} else if (event.key === "Escape") {
			event.stopPropagation();
			disable();
		}
	}, [disable, onNavigate]);
	const updateToggle = (0, import_react.useCallback)((key) => {
		setState((current) => ({
			...current,
			[key]: !current[key]
		}));
		focus();
	}, [focus]);
	if (!state.enabled) return null;
	const searchBar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.find-bar",
		className: cn("z-10 flex items-center justify-center rounded-[10px] border border-primary bg-background px-[15px] py-[5px]", placement === "message-list" ? "absolute top-0 right-5 w-[400px] max-w-[calc(100%-2.5rem)]" : "absolute top-[15px] right-5 left-5 mb-[5px]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-[1_1_auto] items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					"aria-label": t("chat.assistant.search.placeholder"),
					value: state.query,
					onChange: (event) => setState((current) => ({
						...current,
						query: event.target.value
					})),
					onKeyDown: handleInputKeyDown,
					placeholder: t("chat.assistant.search.placeholder"),
					className: "w-full flex-1 border-none bg-transparent px-[5px] py-0 font-[Ubuntu] text-[14px] text-foreground leading-5 outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center",
					children: [
						showUserToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.includes_user_questions"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.includes_user_questions"),
								"aria-pressed": state.includeUser,
								onClick: () => updateToggle("includeUser"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 18,
									style: { color: state.includeUser ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.case_sensitive"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.case_sensitive"),
								"aria-pressed": state.caseSensitive,
								onClick: () => updateToggle("caseSensitive"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseSensitive, {
									size: 18,
									style: { color: state.caseSensitive ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							placement: "bottom",
							content: t("button.whole_word"),
							delay: 800,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
								"aria-label": t("button.whole_word"),
								"aria-pressed": state.wholeWord,
								onClick: () => updateToggle("wholeWord"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WholeWord, {
									size: 18,
									style: { color: state.wholeWord ? "var(--primary)" : "var(--muted-foreground)" }
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-[2px] h-[1.5em] w-px flex-[0_0_auto] bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-[2px] flex w-20 flex-[0_0_auto] justify-center font-[Ubuntu] text-[14px] text-foreground",
				children: matchCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentIndex + 1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: matchCount })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-50",
					children: "0/0"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-row items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.previous"),
						onClick: () => {
							onNavigate(-1);
							focus();
						},
						disabled: matchCount === 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.next"),
						onClick: () => {
							onNavigate(1);
							focus();
						},
						disabled: matchCount === 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIconButton_default, {
						"aria-label": t("common.close"),
						onClick: disable,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})
				]
			})
		]
	});
	return placement === "editor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPlacement, { children: searchBar }) : searchBar;
}
var WORD_SEGMENTER = new Intl.Segmenter(["zh-CN", "en-US"], { granularity: "word" });
var escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function findTextMatches(text, searchText, options) {
	if (!searchText) return [];
	const regex = new RegExp(escapeRegExp(searchText), options.caseSensitive ? "gu" : "giu");
	const matches = Array.from(text.matchAll(regex), (match) => ({
		start: match.index,
		end: match.index + match[0].length
	}));
	if (!options.wholeWord || matches.length === 0) return matches;
	const wordStarts = /* @__PURE__ */ new Set();
	const wordEnds = /* @__PURE__ */ new Set();
	for (const segment of WORD_SEGMENTER.segment(text)) {
		if (!segment.isWordLike) continue;
		wordStarts.add(segment.index);
		wordEnds.add(segment.index + segment.segment.length);
	}
	return matches.filter((match) => wordStarts.has(match.start) && wordEnds.has(match.end));
}
function findRangesInScope(root, searchText, options, filter) {
	const ranges = [];
	const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, filter);
	const allTextNodes = [];
	let fullText = "";
	while (treeWalker.nextNode()) {
		allTextNodes.push({
			node: treeWalker.currentNode,
			startOffset: fullText.length
		});
		fullText += treeWalker.currentNode.nodeValue;
	}
	for (const match of findTextMatches(fullText, searchText, options)) {
		let startNode = null;
		let endNode = null;
		let startOffset = 0;
		let endOffset = 0;
		for (const nodeInfo of allTextNodes) {
			const nodeLength = nodeInfo.node.nodeValue?.length ?? 0;
			if (startNode === null && match.start >= nodeInfo.startOffset && match.start < nodeInfo.startOffset + nodeLength) {
				startNode = nodeInfo.node;
				startOffset = match.start - nodeInfo.startOffset;
			}
			if (match.end > nodeInfo.startOffset && match.end <= nodeInfo.startOffset + nodeLength) {
				endNode = nodeInfo.node;
				endOffset = match.end - nodeInfo.startOffset;
				break;
			}
		}
		if (startNode && endNode) {
			const range = new Range();
			range.setStart(startNode, startOffset);
			range.setEnd(endNode, endOffset);
			ranges.push(range);
		}
	}
	return ranges;
}
const supportsCustomHighlights = () => typeof CSS !== "undefined" && CSS.highlights !== void 0 && typeof Highlight !== "undefined";
export { INITIAL_FIND_BAR_STATE as a, SaveToKnowledgePopup_default as c, FindBar as i, ObsidianExportPopup_default as l, findTextMatches as n, scrollElementIntoView as o, supportsCustomHighlights as r, scrollIntoView as s, findRangesInScope as t };

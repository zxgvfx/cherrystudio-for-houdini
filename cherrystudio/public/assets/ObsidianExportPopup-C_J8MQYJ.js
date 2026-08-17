import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as UiDataSlot, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Check } from "./check-CindNOuQ.js";
import { t as ChevronDown } from "./chevron-down-Dowmjhj0.js";
import { t as ChevronRight } from "./chevron-right-D2nFIQF_.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-B3OAESWo.js";
import { t as Alert } from "./alert-SRAASWPI.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as cva } from "./dist-CilunzGD.js";
import { t as Spinner } from "./spinner-NypUNkDv.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { t as EmptyState } from "./empty-state-C_9tC-cn.js";
import { t as Label } from "./label-BOwZlTgC.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as X } from "./x-Bh2_A30k.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
import { _ as messageToMarkdownWithReasoning, g as messageToMarkdown, i as exportMarkdownToObsidian, v as messagesToMarkdown, y as topicToMarkdown } from "./ExportService-CB3qNdWe.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var treeSelectTriggerVariants = cva(cn("inline-flex items-center justify-between rounded-md border-1 text-sm transition-colors outline-none font-normal", "bg-input", "text-foreground"), {
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
			renderState.selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0 text-primary" })
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-4 transition-transform", expanded && "rotate-90") })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-ui": "ui.render-nodes.treeitem",
				type: "button",
				role: "treeitem",
				"aria-selected": selected,
				disabled: option.disabled,
				onClick: () => handleSelect(option),
				className: cn("flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors", selected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/60", option.disabled && "pointer-events-none opacity-50", option.selectable === false && "text-muted-foreground"),
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
					className: cn(treeSelectTriggerVariants({
						state,
						size
					}), className),
					role: "combobox",
					"aria-expanded": internalOpen,
					"aria-invalid": error,
					children: [renderTriggerContent(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 opacity-50 transition-transform", internalOpen && "rotate-180") })]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				align: "start",
				className: cn("w-(--radix-popover-trigger-width) rounded-md p-1", popoverClassName),
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
var logger = loggerService.withContext("ObsidianExportDialog");
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
var PopupContainer = ({ title, obsidianTags, processingMethod, open, resolve, message, messages, topic, rawContent }) => {
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
				logger.error("获取Obsidian Vault失败:", error$1);
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
					logger.error("获取Obsidian文件失败:", error$1);
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
var ObsidianExportPopupContainer = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopupContainer, {
	...props,
	obsidianTags: ""
});
var ObsidianExportPopup_default = createPopup(ObsidianExportPopupContainer, { dismissResult: false });
export { ObsidianExportPopup_default as t };

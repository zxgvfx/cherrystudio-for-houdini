import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import { r as isMac } from "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { a as DropdownMenuItem, f as DropdownMenuTrigger, r as DropdownMenuContent, t as DropdownMenu } from "./dropdown-menu-EpLFEYGY.js";
import { t as Button } from "./button-Db6_VSWw.js";
import "./react-error-boundary-B3KJNPcX.js";
import "./es2015-DmjbZU9-.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Checkbox } from "./checkbox-D7bjMZU-.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import { t as useVirtualizer } from "./esm-D1CPXB7e.js";
import { a as ContextMenuItemContent, i as ContextMenuItem, o as ContextMenuSeparator, r as ContextMenuContent, t as ContextMenu, u as ContextMenuTrigger } from "./context-menu-CSlIrVcR.js";
import { n as MenuItem, r as MenuList, t as MenuDivider } from "./menu-item-Boj_QdAM.js";
import { t as PageHeader } from "./page-header-DN3fmPEX.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import "./tab-BoJ166Ld.js";
import "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-BAQAVa2r.js";
import { t as AbsoluteFilePathSchema } from "./file-KsLXrn8b.js";
import { c as createFileEntryHandle, i as toSafeFileUrl, u as getFileTypeByExt } from "./file-DzPAqnYr.js";
import "./DataApiService-DP44jQXR.js";
import { c as useQuery, i as useInfiniteQuery, r as useInfiniteFlatItems } from "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as ArrowLeft } from "./arrow-left-BVyI-xLf.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as ChevronUp } from "./chevron-up-C-an45UL.js";
import { t as ChevronsUpDown } from "./chevrons-up-down-Dn-WN3pT.js";
import { t as Ellipsis } from "./ellipsis-Db1MXgzr.js";
import { t as FileCode } from "./file-code-DAX41OX2.js";
import { t as FileQuestionMark } from "./file-question-mark-CEHETqsE.js";
import { t as FileText } from "./file-text-C2NTQkH7.js";
import { t as File } from "./file-BqF9a9qp.js";
import { t as Files } from "./files-Dno8ICUY.js";
import { t as FolderClosed } from "./folder-closed-DaX2woai.js";
import { t as FolderOpen } from "./folder-open-DuPB2puz.js";
import { t as Image } from "./image-BueQcb3X.js";
import { t as Music } from "./music-D5UZ3D9O.js";
import { t as Pencil } from "./pencil-D9tpl364.js";
import { t as RotateCcw } from "./rotate-ccw-BS5J7gIn.js";
import { t as SquareArrowOutUpRight } from "./square-arrow-out-up-right-BxPZ4dXU.js";
import { t as Trash2 } from "./trash-2-_PaXFSXZ.js";
import { t as Upload } from "./upload-Djm0HR6v.js";
import { t as Video } from "./video-kAJ7w1kU.js";
import "./popup-C0FVl5N5.js";
import "./image-Bb803VSe.js";
import { i as normalizeFilePreviewPath } from "./filePreview-HCbM3Csa.js";
import { t as useTimer } from "./useTimer-Brbjkb3R.js";
import { t as ImagePreviewService } from "./ImagePreviewService-baJ3FtkL.js";
import "./FilePreviewLayout-BHC9_5NZ.js";
import "./FilePreviewToolbar-C2Jz3S8R.js";
import "./FilePreviewToolbarButton-CUtcvRPo.js";
import "./safeOpen-BssvK0Fy.js";
import { t as FilePreview } from "./FilePreview-Hqr6AiGk.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function getFormatLabel(format) {
	if (!format) return "—";
	return {
		png: "PNG",
		jpg: "JPG",
		jpeg: "JPEG",
		pdf: "PDF",
		doc: "DOC",
		docx: "DOCX",
		py: "Python",
		ts: "TypeScript",
		tsx: "TSX",
		json: "JSON",
		yaml: "YAML",
		yml: "YAML",
		mp3: "MP3",
		mp4: "MP4",
		md: "Markdown",
		txt: "Text",
		xls: "Excel",
		xlsx: "Excel",
		ppt: "PPT",
		pptx: "PPT",
		bin: "Binary"
	}[format] || format.toUpperCase();
}
function formatFileSize(bytes) {
	if (bytes === null || bytes === void 0 || !Number.isFinite(bytes)) return "—";
	if (bytes < 1024) return `${bytes} B`;
	const units = [
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let value = bytes / 1024;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}
	return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}
const typeIcons = {
	image: Image,
	video: Video,
	audio: Music,
	text: FileCode,
	document: FileText,
	other: File
};
const typeIconColors = {
	image: "text-muted-foreground",
	video: "text-muted-foreground",
	audio: "text-muted-foreground",
	text: "text-muted-foreground",
	document: "text-muted-foreground",
	other: "text-muted-foreground"
};
const typeBgColors = {
	image: "bg-muted",
	video: "bg-muted",
	audio: "bg-muted",
	text: "bg-muted",
	document: "bg-muted",
	other: "bg-muted"
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FileContextMenu({ file, isTrash, actions, children, showRename = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileContextMenuContent, {
		file,
		isTrash,
		actions,
		showRename
	})] });
}
function FileContextMenuContent({ file, isTrash, actions, showRename }) {
	const { t } = useTranslation();
	const canUseFileActions = !file.isMissing;
	const canRename = canUseFileActions && showRename;
	const canShowInFolder = canUseFileActions;
	const hasPrimaryAction = canRename || canShowInFolder;
	if (isTrash) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuContent, {
		className: "min-w-32",
		children: [!file.isMissing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
			onSelect: () => actions.onRestore(file.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 12 }),
				children: t("files.restore")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
			variant: "destructive",
			onSelect: () => actions.onDelete(file.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }),
				children: t("files.permanent_delete")
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuContent, {
		className: "min-w-32",
		children: [
			canRename && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
				onSelect: () => actions.onRename(file.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 12 }),
					children: t("files.rename")
				})
			}),
			canShowInFolder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
				onSelect: () => actions.onShowInFolder(file.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderClosed, { size: 12 }),
					children: t("files.show_in_folder")
				})
			}),
			hasPrimaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
				variant: "destructive",
				onSelect: () => actions.onDelete(file.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItemContent, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }),
					children: file.origin === "external" ? t("files.remove_from_library") : t("files.delete.label")
				})
			})
		]
	});
}
function InlineRename({ value, onConfirm, onCancel, className }) {
	const [text, setText] = (0, import_react.useState)(value);
	const ref = (0, import_react.useRef)(null);
	const { setTimeoutTimer } = useTimer();
	(0, import_react.useEffect)(() => {
		return setTimeoutTimer("inlineRenameFocus", () => {
			const input = ref.current;
			if (!input) return;
			input.focus();
			const dotIdx = value.lastIndexOf(".");
			input.setSelectionRange(0, dotIdx > 0 ? dotIdx : value.length);
		}, 0);
	}, [setTimeoutTimer, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		ref,
		value: text,
		onChange: (e) => setText(e.target.value),
		onKeyDown: (e) => {
			if (e.key === "Enter" && text.trim()) onConfirm(text.trim());
			if (e.key === "Escape") onCancel();
		},
		onBlur: () => {
			if (text.trim()) onConfirm(text.trim());
			else onCancel();
		},
		className: `h-auto rounded-md border border-border bg-background py-0.5 text-foreground text-xs shadow-sm focus-visible:border-ring ${className ?? ""}`,
		onClick: (e) => e.stopPropagation()
	});
}
var GRID_GAP_PX = 12;
var GRID_PADDING_PX = 12;
var GRID_MIN_CARD_WIDTH_PX = 156;
var GRID_ROW_ESTIMATE_PX = 220;
function getGridColumnCount(width) {
	const innerWidth = Math.max(0, width - GRID_PADDING_PX * 2);
	return Math.max(1, Math.floor((innerWidth + GRID_GAP_PX) / (GRID_MIN_CARD_WIDTH_PX + GRID_GAP_PX)));
}
function useGridColumnCount(scrollRef) {
	const [columnCount, setColumnCount] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const element = scrollRef.current;
		if (!element) return;
		const update = () => setColumnCount(getGridColumnCount(element.clientWidth));
		update();
		if (typeof ResizeObserver === "undefined") {
			window.addEventListener("resize", update);
			return () => window.removeEventListener("resize", update);
		}
		const observer = new ResizeObserver(update);
		observer.observe(element);
		return () => observer.disconnect();
	}, [scrollRef]);
	return columnCount;
}
const FileGrid = (0, import_react.memo)(function FileGrid$1({ files, onOpen, onDelete, isTrash, menuActions, scrollRef, onLayoutChange, renamingId, onRenameConfirm, onRenameCancel }) {
	const { t } = useTranslation();
	const columnCount = useGridColumnCount(scrollRef);
	const rows = (0, import_react.useMemo)(() => {
		const nextRows = [];
		for (let index = 0; index < files.length; index += columnCount) nextRows.push(files.slice(index, index + columnCount));
		return nextRows;
	}, [columnCount, files]);
	const getRowKey = (0, import_react.useCallback)((index) => rows[index]?.[0]?.id ?? index, [rows]);
	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => GRID_ROW_ESTIMATE_PX,
		getItemKey: getRowKey,
		overscan: 4
	});
	const totalSize = rowVirtualizer.getTotalSize();
	(0, import_react.useEffect)(() => {
		onLayoutChange();
	}, [
		columnCount,
		onLayoutChange,
		totalSize
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "files.file-grid",
		className: "relative p-3",
		style: { height: totalSize + GRID_PADDING_PX * 2 },
		children: rowVirtualizer.getVirtualItems().map((virtualRow) => {
			const row = rows[virtualRow.index] ?? [];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: rowVirtualizer.measureElement,
				"data-index": virtualRow.index,
				className: "absolute top-3 right-3 left-3 grid gap-3 pb-3",
				style: {
					gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
					transform: `translateY(${virtualRow.start}px)`
				},
				children: row.map((file) => {
					const Icon = typeIcons[file.type];
					const isRenaming = renamingId === file.id;
					const isImage = file.type === "image";
					const previewUrl = isImage && !file.isMissing ? file.previewUrl : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileContextMenu, {
						file,
						isTrash,
						actions: menuActions,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => {
								if (isRenaming || file.isMissing) return;
								onOpen(file);
							},
							className: "group relative cursor-pointer rounded-lg border border-border-subtle bg-card p-1 transition-colors hover:border-border-strong hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${isImage ? "aspect-square" : "h-24"} relative flex items-center justify-center overflow-hidden rounded-md border border-border-subtle ${typeBgColors[file.type]}`,
								children: [
									previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: previewUrl,
										alt: file.name,
										draggable: false,
										className: "h-full w-full object-contain"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 24,
										strokeWidth: 1.2,
										className: typeIconColors[file.type]
									}),
									!isImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-1.5 left-1.5 rounded bg-background/70 px-1.5 py-px font-medium text-muted-foreground text-xs tracking-wide backdrop-blur-sm",
										children: getFormatLabel(file.format)
									}),
									file.isMissing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-1.5 left-1.5 rounded bg-background/80 px-1.5 py-px text-[10px] text-destructive backdrop-blur-sm",
										children: t("files.missing")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1.5 right-1.5 flex items-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											onClick: (e) => {
												e.stopPropagation();
												onDelete(file.id);
											},
											"aria-label": file.origin === "external" ? t("files.remove_from_library") : t("files.delete.label"),
											title: file.origin === "external" ? t("files.remove_from_library") : t("files.delete.label"),
											className: "!text-muted-foreground hover:!text-destructive size-6 min-h-0 rounded bg-background/80 p-0 shadow-xs backdrop-blur-sm transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-1 pt-1.5 pb-0.5",
								children: [isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineRename, {
									value: file.name,
									onConfirm: (v) => onRenameConfirm(file.id, v),
									onCancel: onRenameCancel,
									className: "w-full px-1.5 text-center"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium text-foreground text-sm leading-5",
									title: file.name,
									children: file.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground text-xs leading-4",
										children: file.size
									})
								})]
							})]
						})
					}, file.id);
				})
			}, row[0]?.id ?? virtualRow.key);
		})
	});
});
var FILE_ROW_HEIGHT_PX = 44;
var FILE_LIST_GRID = "grid grid-cols-[2.5rem_minmax(0,1fr)_4.5rem_4rem_7rem_6.5rem] items-center gap-2";
var FILE_LIST_CHECKBOX_CLASS_NAME = "inline-flex items-center justify-center align-middle text-foreground hover:bg-accent data-[state=checked]:border-border-selected data-[state=checked]:bg-background-subtle data-[state=checked]:text-foreground focus-visible:border-ring";
function SortHeader({ label, field, sortKey, sortDir, onSort }) {
	const active = sortKey === field;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "sm",
		onClick: () => onSort(field),
		className: "!text-muted-foreground hover:!text-foreground h-full min-h-0 w-full justify-start gap-1 rounded-none px-0 py-0 font-medium text-xs shadow-none hover:bg-transparent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(active ? sortDir === "asc" ? ChevronUp : ChevronDown : ChevronsUpDown, {
			size: 9,
			className: active ? "shrink-0 opacity-70" : "shrink-0 opacity-40"
		})]
	});
}
const FileListHeader = (0, import_react.memo)(function FileListHeader$1({ visibleSelectionState, onSelectAll, sortKey, sortDir, onSort }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "files.file-list",
		className: `${FILE_LIST_GRID} mx-3 mb-2 h-10 shrink-0 border-border border-b px-2.5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center self-stretch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "flex size-full cursor-pointer items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						size: "sm",
						className: FILE_LIST_CHECKBOX_CLASS_NAME,
						checked: visibleSelectionState,
						onCheckedChange: (checked) => onSelectAll(Boolean(checked)),
						"aria-label": t("files.select_all")
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 self-stretch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
					label: t("files.name"),
					field: "name",
					sortKey,
					sortDir,
					onSort
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-stretch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
					label: t("files.size"),
					field: "size",
					sortKey,
					sortDir,
					onSort
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-stretch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
					label: t("files.type"),
					field: "type",
					sortKey,
					sortDir,
					onSort
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-stretch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
					label: t("files.modified_at"),
					field: "updatedAt",
					sortKey,
					sortDir,
					onSort
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-label": t("files.actions") })
		]
	});
});
const FileList = (0, import_react.memo)(function FileList$1({ files, selectedIds, onSelect, onOpen, onDelete, onRestore, onRename, onShowInFolder, isTrash, menuActions, scrollRef, renamingId, onRenameConfirm, onRenameCancel }) {
	const { t } = useTranslation();
	const getItemKey = (0, import_react.useCallback)((index) => files[index]?.id ?? index, [files]);
	const rowVirtualizer = useVirtualizer({
		count: files.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => FILE_ROW_HEIGHT_PX,
		getItemKey,
		overscan: 8
	});
	(0, import_react.useEffect)(() => {
		if (!renamingId) return;
		const index = files.findIndex((file) => file.id === renamingId);
		if (index >= 0) rowVirtualizer.scrollToIndex(index, { align: "auto" });
	}, [
		files,
		renamingId,
		rowVirtualizer
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "files.file-list",
		className: "relative flex flex-col",
		style: { height: rowVirtualizer.getTotalSize() },
		children: rowVirtualizer.getVirtualItems().map((virtualRow) => {
			const file = files[virtualRow.index];
			if (!file) return null;
			const selected = selectedIds.has(file.id);
			const Icon = typeIcons[file.type];
			const isRenaming = renamingId === file.id;
			const canUseFileActions = !file.isMissing;
			const canRestore = isTrash && canUseFileActions;
			const canOpen = !isTrash && canUseFileActions;
			const canRename = !isTrash && canUseFileActions;
			const canShowInFolder = !isTrash && canUseFileActions;
			const deleteLabel = isTrash ? t("files.permanent_delete") : file.origin === "external" ? t("files.remove_from_library") : t("files.delete.label");
			const renderActionPlaceholder = (key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-6",
				"aria-hidden": "true"
			}, key);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileContextMenu, {
				file,
				isTrash,
				actions: menuActions,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => {
						if (!isRenaming && !file.isMissing) onOpen(file);
					},
					className: `${FILE_LIST_GRID} group absolute top-0 right-3 left-3 h-10 cursor-default rounded-md px-2.5 transition-colors ${selected ? "bg-accent ring-1 ring-border-subtle ring-inset" : "hover:bg-accent"}`,
					style: { transform: `translateY(${virtualRow.start}px)` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center self-stretch",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "flex size-full cursor-pointer items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									size: "sm",
									className: FILE_LIST_CHECKBOX_CLASS_NAME,
									checked: selected,
									onCheckedChange: () => onSelect(file.id),
									onClick: (e) => e.stopPropagation(),
									"data-file-selection-checkbox": true,
									"aria-label": t("files.select_file", { name: file.name })
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-6 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-background-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 14,
									strokeWidth: 1.4,
									className: `shrink-0 ${typeIconColors[file.type]}`
								})
							}), isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineRename, {
								value: file.name,
								onConfirm: (v) => onRenameConfirm(file.id, v),
								onCancel: onRenameCancel,
								className: "flex-1 px-2"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground text-sm",
								children: file.name
							}), file.isMissing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded border border-error-border bg-error-subtle px-1.5 py-0.5 text-[10px] text-error-subtle-foreground",
								children: t("files.missing")
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground text-xs",
							children: file.size
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground text-xs",
							children: getFormatLabel(file.format)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-foreground-tertiary text-xs",
							children: file.updatedAt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-4 justify-items-center gap-0.5 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100",
							children: [
								canOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": t("files.open"),
									title: t("files.open"),
									className: "!text-muted-foreground hover:!text-foreground size-6 hover:bg-transparent",
									onClick: (e) => {
										e.stopPropagation();
										onOpen(file);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareArrowOutUpRight, { size: 13 })
								}) : renderActionPlaceholder("open"),
								canRename ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": t("files.rename"),
									title: t("files.rename"),
									className: "!text-muted-foreground hover:!text-foreground size-6 hover:bg-transparent",
									onClick: (e) => {
										e.stopPropagation();
										onRename(file.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 13 })
								}) : renderActionPlaceholder("rename"),
								canRestore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": t("files.restore"),
									title: t("files.restore"),
									className: "!text-muted-foreground hover:!text-foreground size-6 hover:bg-transparent",
									onClick: (e) => {
										e.stopPropagation();
										onRestore(file.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 })
								}) : canShowInFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": t("files.show_in_folder"),
									title: t("files.show_in_folder"),
									className: "!text-muted-foreground hover:!text-foreground size-6 hover:bg-transparent",
									onClick: (e) => {
										e.stopPropagation();
										onShowInFolder(file.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { size: 14 })
								}) : renderActionPlaceholder("location"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": deleteLabel,
									title: deleteLabel,
									className: "!text-muted-foreground hover:!text-destructive size-6 hover:bg-transparent",
									onClick: (e) => {
										e.stopPropagation();
										onDelete(file.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
								})
							]
						})
					]
				})
			}, file.id);
		})
	});
});
var TYPE_ENTRIES = [
	{
		kind: "type",
		value: "image",
		label: (t) => t("files.image"),
		icon: Image,
		countKey: "type_image"
	},
	{
		kind: "type",
		value: "video",
		label: (t) => t("files.video"),
		icon: Video,
		countKey: "type_video"
	},
	{
		kind: "type",
		value: "audio",
		label: (t) => t("files.audio"),
		icon: Music,
		countKey: "type_audio"
	},
	{
		kind: "type",
		value: "text",
		label: (t) => t("files.text"),
		icon: FileCode,
		countKey: "type_text"
	},
	{
		kind: "type",
		value: "document",
		label: (t) => t("files.document"),
		icon: FileText,
		countKey: "type_document"
	},
	{
		kind: "type",
		value: "other",
		label: (t) => t("files.other"),
		icon: FileQuestionMark,
		countKey: "type_other"
	}
];
var LIBRARY_ENTRIES = [{
	kind: "library",
	value: "all",
	label: (t) => t("files.all"),
	icon: Files,
	countKey: "all"
}, {
	kind: "library",
	value: "trash",
	label: (t) => t("files.trash"),
	icon: Trash2,
	countKey: "trash"
}];
function FileSidebar({ filter, onFilterChange, fileCounts }) {
	const { t } = useTranslation();
	const isActive = (kind, value) => filter.kind === kind && filter.value === value;
	const renderEntry = (entry) => {
		const active = isActive(entry.kind, entry.value);
		const Icon = entry.icon;
		const count = fileCounts[entry.countKey];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
			label: entry.label(t),
			suffix: count !== void 0 && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-xs",
				children: count
			}) : null,
			active,
			onClick: () => onFilterChange({
				kind: entry.kind,
				value: entry.value
			}),
			labelClassName: "group-data-[active=true]:font-medium",
			className: "hover:!bg-muted data-[active=true]:!bg-muted data-[active=true]:!font-medium data-[active=true]:!border-transparent data-[active=true]:!text-foreground h-8 rounded-[10px] border-transparent px-2.5 font-normal text-foreground text-sm [&_svg]:size-4 [&_svg]:text-foreground"
		}, `${entry.kind}-${entry.value}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"data-ui": "files.navigation",
		className: "flex w-(--settings-width) min-w-(--settings-width) shrink-0 select-none flex-col border-border border-r-[0.5px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("files.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, {
				className: "gap-0.5 px-2.5 pb-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2.5 pb-0.5 text-muted-foreground text-xs",
						children: t("files.type")
					}),
					TYPE_ENTRIES.map(renderEntry),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, { className: "my-1 bg-transparent" }),
					LIBRARY_ENTRIES.map(renderEntry)
				]
			})
		})]
	});
}
var logger = loggerService.withContext("FilesPage");
var FILES_PAGE_LIMIT = 100;
var FILE_IPC_BATCH_SIZE = 500;
var FILE_IPC_CREATE_BATCH_SIZE = 100;
async function requestBatchedFileRecords(route, ids) {
	if (ids.length === 0) return {};
	const chunks = [];
	for (let i = 0; i < ids.length; i += FILE_IPC_BATCH_SIZE) chunks.push(ids.slice(i, i + FILE_IPC_BATCH_SIZE));
	const results = await Promise.all(chunks.map((chunk) => {
		switch (route) {
			case "file.batch_get_metadata": return ipcApi.request("file.batch_get_metadata", { items: chunk.map((id) => ({
				key: id,
				handle: {
					kind: "entry",
					entryId: id
				}
			})) });
			case "file.batch_get_physical_paths": return ipcApi.request("file.batch_get_physical_paths", { ids: chunk });
			case "file.batch_get_dangling_states": return ipcApi.request("file.batch_get_dangling_states", { ids: chunk });
		}
	}));
	return Object.assign({}, ...results);
}
async function requestBatchedFileMutation(route, ids) {
	if (ids.length === 0) return {
		succeeded: [],
		failed: []
	};
	const chunks = [];
	for (let i = 0; i < ids.length; i += FILE_IPC_BATCH_SIZE) chunks.push(ids.slice(i, i + FILE_IPC_BATCH_SIZE));
	const results = await Promise.all(chunks.map((chunk) => {
		switch (route) {
			case "file.batch_trash": return ipcApi.request("file.batch_trash", { ids: chunk });
			case "file.batch_restore": return ipcApi.request("file.batch_restore", { ids: chunk });
			case "file.batch_permanent_delete": return ipcApi.request("file.batch_permanent_delete", { ids: chunk });
		}
	}));
	return {
		succeeded: results.flatMap((result) => result.succeeded),
		failed: results.flatMap((result) => result.failed)
	};
}
async function requestBatchedInternalEntryCreates(paths) {
	const chunks = [];
	for (let i = 0; i < paths.length; i += FILE_IPC_CREATE_BATCH_SIZE) chunks.push(paths.slice(i, i + FILE_IPC_CREATE_BATCH_SIZE));
	const results = await Promise.all(chunks.map((chunk) => ipcApi.request("file.batch_create_internal_entries", { items: chunk.map((path) => ({
		source: "path",
		path,
		cleanupPolicy: "manual"
	})) })));
	return {
		succeeded: results.flatMap((result) => result.succeeded),
		failed: results.flatMap((result) => result.failed)
	};
}
function formatDateTime(timestamp) {
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "—";
	const pad = (value) => value.toString().padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function displayNameOf(entry) {
	return entry.ext ? `${entry.name}.${entry.ext}` : entry.name;
}
function stripCurrentExtension(name, format) {
	if (!format) return name;
	const suffix = `.${format}`;
	return name.toLowerCase().endsWith(suffix.toLowerCase()) ? name.slice(0, -suffix.length) : name;
}
function canStartInlineRename(file) {
	return Boolean(file && !file.trashed && !file.isMissing);
}
function toFileItem(entry, metadataById, physicalPathById, danglingStateById) {
	const metadata = metadataById[entry.id];
	const format = entry.ext ?? "";
	const type = getFileTypeByExt(format);
	const sizeBytes = entry.origin === "internal" ? entry.size : metadata?.size ?? 0;
	const createdAt = metadata?.createdAt ?? entry.createdAt;
	const updatedAt = metadata?.modifiedAt ?? entry.updatedAt;
	const physicalPath = physicalPathById[entry.id];
	const danglingState = entry.origin === "external" ? danglingStateById[entry.id] : void 0;
	const isMissing = danglingState === "missing";
	const base = {
		id: entry.id,
		name: displayNameOf(entry),
		format,
		size: metadata == null && entry.origin === "external" ? "—" : formatFileSize(sizeBytes),
		sizeBytes,
		createdAt: formatDateTime(createdAt),
		updatedAt: formatDateTime(updatedAt),
		trashed: entry.origin === "internal" && entry.deletedAt !== void 0,
		danglingState,
		isMissing
	};
	const originFields = entry.origin === "external" ? { origin: "external" } : { origin: "internal" };
	if (type === "image") return {
		...base,
		...originFields,
		type,
		previewUrl: physicalPath ? toSafeFileUrl(physicalPath, entry.ext) : void 0
	};
	return {
		...base,
		...originFields,
		type
	};
}
function warnMutationFailures(action, result) {
	if (!result || result.failed.length === 0) return false;
	logger.warn(`${action} partially failed`, { failed: result.failed });
	return true;
}
function reportMutationFailures(action, result, message) {
	if (warnMutationFailures(action, result)) toast.error(message);
}
function reportImportFailures(result, message) {
	if (result.failed.length > 0) {
		logger.warn("file import partially failed", { failed: result.failed });
		toast.error(message);
	}
}
function shouldIgnoreFileShortcut(event) {
	if (event.defaultPrevented) return true;
	const target = event.target;
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	if (target.closest("[data-file-selection-checkbox]")) return false;
	return Boolean(target.closest("a[href], button, input, select, textarea, [role=\"button\"], [role=\"menuitem\"]"));
}
var FileToolbar = (0, import_react.memo)(function FileToolbar$1({ isTrash, selectedCount, batchDeleteLabel, onBatchDelete, onBatchRestore }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "files.page",
		className: "flex h-7 shrink-0 items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground text-xs",
			children: t("files.footer_selected_count", { count: selectedCount })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "!text-muted-foreground hover:!text-foreground size-6 hover:bg-transparent",
				"aria-label": t("files.actions"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 14 })
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "start",
			className: "min-w-36",
			children: [isTrash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: onBatchRestore,
				children: [
					t("files.restore"),
					" (",
					selectedCount,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				onSelect: onBatchDelete,
				children: [
					batchDeleteLabel,
					" (",
					selectedCount,
					")"
				]
			})]
		})] })]
	});
});
function FilesPage() {
	const { t } = useTranslation();
	const [embeddedPreview, setEmbeddedPreview] = (0, import_react.useState)(null);
	const openRequestTokenRef = (0, import_react.useRef)(0);
	const [metadataById, setMetadataById] = (0, import_react.useState)({});
	const [physicalPathById, setPhysicalPathById] = (0, import_react.useState)({});
	const [danglingStateById, setDanglingStateById] = (0, import_react.useState)({});
	const [filter, setFilter] = (0, import_react.useState)({
		kind: "library",
		value: "all"
	});
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [sortKey, setSortKey] = (0, import_react.useState)("updatedAt");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [renamingId, setRenamingId] = (0, import_react.useState)(null);
	const [pendingPermanentDeleteIds, setPendingPermanentDeleteIds] = (0, import_react.useState)(null);
	const contentScrollRef = (0, import_react.useRef)(null);
	const pendingLoadMoreRef = (0, import_react.useRef)(false);
	const serverSortKey = sortKey === "type" ? "ext" : sortKey;
	const activeFilesQuery = (0, import_react.useMemo)(() => ({
		sortBy: serverSortKey,
		sortOrder: sortDir
	}), [serverSortKey, sortDir]);
	const trashedFilesQuery = (0, import_react.useMemo)(() => ({
		inTrash: true,
		sortBy: serverSortKey,
		sortOrder: sortDir
	}), [serverSortKey, sortDir]);
	const { pages: activeFilePages, isLoading: isActiveFilesLoading, isRefreshing: isActiveFilesRefreshing, error: activeFilesError, hasNext: hasMoreActiveFiles, loadNext: loadMoreActiveFiles, refresh: refreshActiveFiles, reset: resetActiveFiles } = useInfiniteQuery("/files/entries", {
		query: activeFilesQuery,
		limit: FILES_PAGE_LIMIT,
		swrOptions: { keepPreviousData: true }
	});
	const { pages: trashedFilePages, isLoading: isTrashedFilesLoading, isRefreshing: isTrashedFilesRefreshing, error: trashedFilesError, hasNext: hasMoreTrashedFiles, loadNext: loadMoreTrashedFiles, refresh: refreshTrashedFiles, reset: resetTrashedFiles } = useInfiniteQuery("/files/entries", {
		query: trashedFilesQuery,
		limit: FILES_PAGE_LIMIT,
		swrOptions: { keepPreviousData: true }
	});
	const { data: fileStats, error: fileStatsError, refetch: refetchFileStats } = useQuery("/files/entries/stats", { swrOptions: { keepPreviousData: true } });
	const isFilesLoading = isActiveFilesLoading || isTrashedFilesLoading;
	const isFilesRefreshing = isActiveFilesRefreshing || isTrashedFilesRefreshing;
	const activeEntries = useInfiniteFlatItems(activeFilePages);
	const trashedEntries = useInfiniteFlatItems(trashedFilePages);
	const activeFilesTotal = activeFilePages[0]?.total ?? activeEntries.length;
	const trashedFilesTotal = trashedFilePages[0]?.total ?? trashedEntries.length;
	const entries = (0, import_react.useMemo)(() => [...activeEntries, ...trashedEntries], [activeEntries, trashedEntries]);
	const previousNonEmptyEntriesRef = (0, import_react.useRef)([]);
	const isFileQueryPending = isFilesLoading || isFilesRefreshing;
	const displayEntries = (0, import_react.useDeferredValue)(entries.length === 0 && isFileQueryPending && previousNonEmptyEntriesRef.current.length > 0 ? previousNonEmptyEntriesRef.current : entries);
	(0, import_react.useEffect)(() => {
		if (entries.length > 0) previousNonEmptyEntriesRef.current = entries;
	}, [entries]);
	(0, import_react.useEffect)(() => {
		resetActiveFiles();
		resetTrashedFiles();
	}, [
		resetActiveFiles,
		resetTrashedFiles,
		serverSortKey,
		sortDir
	]);
	(0, import_react.useEffect)(() => {
		if (activeFilesError) logger.error("Failed to load active files", activeFilesError);
	}, [activeFilesError]);
	(0, import_react.useEffect)(() => {
		if (trashedFilesError) logger.error("Failed to load trashed files", trashedFilesError);
	}, [trashedFilesError]);
	(0, import_react.useEffect)(() => {
		if (fileStatsError) logger.error("Failed to load file stats", fileStatsError);
	}, [fileStatsError]);
	(0, import_react.useEffect)(() => {
		if (displayEntries.length === 0) {
			if (isFilesLoading || isFilesRefreshing) return;
			setMetadataById((prev) => Object.keys(prev).length === 0 ? prev : {});
			setPhysicalPathById((prev) => Object.keys(prev).length === 0 ? prev : {});
			setDanglingStateById((prev) => Object.keys(prev).length === 0 ? prev : {});
			return;
		}
		let cancelled = false;
		const ids = displayEntries.map((entry) => entry.id);
		const imageIds = displayEntries.filter((entry) => getFileTypeByExt(entry.ext ?? "") === "image").map((entry) => entry.id);
		Promise.all([
			requestBatchedFileRecords("file.batch_get_metadata", ids),
			requestBatchedFileRecords("file.batch_get_physical_paths", imageIds),
			requestBatchedFileRecords("file.batch_get_dangling_states", ids)
		]).then(([metadata, physicalPaths, danglingStates]) => {
			if (cancelled) return;
			setMetadataById(metadata);
			setPhysicalPathById(physicalPaths);
			setDanglingStateById(danglingStates);
		}).catch((error) => {
			if (!cancelled) logger.error("Failed to load file IPC metadata", error);
		});
		return () => {
			cancelled = true;
		};
	}, [
		displayEntries,
		isFilesLoading,
		isFilesRefreshing
	]);
	const files = (0, import_react.useMemo)(() => {
		return displayEntries.map((entry) => toFileItem(entry, metadataById, physicalPathById, danglingStateById));
	}, [
		displayEntries,
		danglingStateById,
		metadataById,
		physicalPathById
	]);
	const refetchFiles = (0, import_react.useCallback)(async () => {
		resetActiveFiles();
		resetTrashedFiles();
		await Promise.all([
			refreshActiveFiles(),
			refreshTrashedFiles(),
			refetchFileStats()
		]);
	}, [
		refetchFileStats,
		refreshActiveFiles,
		refreshTrashedFiles,
		resetActiveFiles,
		resetTrashedFiles
	]);
	const isTrash = filter.kind === "library" && filter.value === "trash";
	const showUploadButton = filter.kind === "library" && filter.value === "all";
	const isImageGrid = filter.kind === "type" && filter.value === "image";
	const activeFilterLabel = filter.kind === "library" ? t(filter.value === "all" ? "files.all" : "files.trash") : t({
		audio: "files.audio",
		document: "files.document",
		image: "files.image",
		other: "files.other",
		text: "files.text",
		video: "files.video"
	}[filter.value]);
	const hasMoreCurrentFiles = isTrash ? hasMoreTrashedFiles : hasMoreActiveFiles;
	const isLoadingMoreActiveFiles = isActiveFilesRefreshing && activeFilePages.length > 0;
	const isLoadingMoreTrashedFiles = isTrashedFilesRefreshing && trashedFilePages.length > 0;
	const isLoadingMoreCurrentFiles = isTrash ? isLoadingMoreTrashedFiles : isLoadingMoreActiveFiles;
	(0, import_react.useEffect)(() => {
		pendingLoadMoreRef.current = false;
	}, [
		hasMoreCurrentFiles,
		isLoadingMoreCurrentFiles,
		entries.length
	]);
	const requestLoadMore = (0, import_react.useCallback)((loadMoreFiles) => {
		pendingLoadMoreRef.current = true;
		queueMicrotask(() => {
			try {
				loadMoreFiles();
			} catch (error) {
				pendingLoadMoreRef.current = false;
				logger.error("Failed to load more files", error);
			}
		});
	}, []);
	const handleContentScroll = (0, import_react.useCallback)(() => {
		const el = contentScrollRef.current;
		if (!el) return;
		if (hasMoreCurrentFiles && !isLoadingMoreCurrentFiles && !pendingLoadMoreRef.current && el.scrollHeight - el.scrollTop - el.clientHeight < 160) requestLoadMore(isTrash ? loadMoreTrashedFiles : loadMoreActiveFiles);
	}, [
		hasMoreCurrentFiles,
		isLoadingMoreCurrentFiles,
		isTrash,
		loadMoreActiveFiles,
		loadMoreTrashedFiles,
		requestLoadMore
	]);
	const maybeFillClientFilteredViewport = (0, import_react.useCallback)(() => {
		if (filter.kind === "library") return;
		const el = contentScrollRef.current;
		if (!el || !hasMoreActiveFiles || isLoadingMoreActiveFiles || pendingLoadMoreRef.current) return;
		if (el.scrollHeight > el.clientHeight) return;
		requestLoadMore(loadMoreActiveFiles);
	}, [
		filter.kind,
		hasMoreActiveFiles,
		isLoadingMoreActiveFiles,
		loadMoreActiveFiles,
		requestLoadMore
	]);
	(0, import_react.useEffect)(() => {
		if (filter.kind === "library") return;
		const el = contentScrollRef.current;
		if (!el) return;
		maybeFillClientFilteredViewport();
		if (typeof ResizeObserver === "undefined") return;
		const resizeObserver = new ResizeObserver(() => maybeFillClientFilteredViewport());
		resizeObserver.observe(el);
		return () => resizeObserver.disconnect();
	}, [filter.kind, maybeFillClientFilteredViewport]);
	const handleOpen = (0, import_react.useCallback)((file) => {
		const requestToken = ++openRequestTokenRef.current;
		requestBatchedFileRecords("file.batch_get_physical_paths", [file.id]).then((physicalPaths) => {
			if (openRequestTokenRef.current !== requestToken) return;
			const filePath = physicalPaths[file.id];
			if (!filePath) throw new Error(`Physical path is unavailable for file ${file.id}`);
			const normalizedPath = normalizeFilePreviewPath(filePath);
			if (file.type === "image") {
				ImagePreviewService.show(toSafeFileUrl(normalizedPath, file.format)).catch((error) => {
					const normalized = error instanceof Error ? error : new Error(String(error));
					logger.error("Failed to open image preview", normalized);
					toast.error(t("files.preview.error"));
				});
				return;
			}
			setEmbeddedPreview((current) => ({
				fileName: file.name,
				filePath: normalizedPath,
				refreshKey: current?.filePath === normalizedPath ? current.refreshKey + 1 : 0
			}));
		}).catch((error) => {
			if (openRequestTokenRef.current !== requestToken) return;
			const normalized = error instanceof Error ? error : new Error(String(error));
			logger.error("Failed to open file preview", normalized);
			toast.error(t("files.preview.error"));
		});
	}, [t]);
	const handleShowInFolder = (0, import_react.useCallback)((id) => {
		ipcApi.request("file.show_in_folder", createFileEntryHandle(id)).catch((error) => {
			logger.error("Failed to show file in folder", error);
		});
	}, []);
	const handleImportPaths = (0, import_react.useCallback)(async (paths) => {
		if (paths.length === 0) return;
		try {
			reportImportFailures(await requestBatchedInternalEntryCreates(paths), t("files.error.import_partial_failed"));
			await refetchFiles();
		} catch (error) {
			logger.error("Failed to import files", error);
			toast.error(t("files.error.import_failed"));
		}
	}, [refetchFiles, t]);
	const handleUploadClick = (0, import_react.useCallback)(async () => {
		try {
			const selected = await window.api.file.select({
				properties: ["openFile", "multiSelections"],
				filters: [{
					name: t("files.all"),
					extensions: ["*"]
				}]
			});
			if (!selected || selected.length === 0) return;
			await handleImportPaths(selected.map((file) => AbsoluteFilePathSchema.safeParse(file.path).data).filter((path) => Boolean(path)));
		} catch (error) {
			logger.error("Failed to select files for import", error);
			toast.error(t("files.error.import_failed"));
		}
	}, [handleImportPaths, t]);
	const filteredFiles = (0, import_react.useMemo)(() => {
		let result = files;
		if (filter.kind === "library") if (filter.value === "trash") result = result.filter((f) => f.trashed);
		else result = result.filter((f) => !f.trashed);
		else if (filter.kind === "type") result = result.filter((f) => !f.trashed && f.type === filter.value);
		return result;
	}, [files, filter]);
	(0, import_react.useEffect)(() => {
		maybeFillClientFilteredViewport();
	}, [
		maybeFillClientFilteredViewport,
		filteredFiles.length,
		files.length
	]);
	const fileCounts = (0, import_react.useMemo)(() => {
		const counts = {
			all: fileStats?.activeTotal ?? activeFilesTotal,
			trash: fileStats?.trashTotal ?? trashedFilesTotal
		};
		if (!fileStats) return counts;
		for (const type of [
			"image",
			"video",
			"audio",
			"text",
			"document",
			"other"
		]) counts[`type_${type}`] = 0;
		for (const { ext, count } of fileStats.extCounts) {
			const type = getFileTypeByExt(ext ?? "");
			counts[`type_${type}`] = (counts[`type_${type}`] ?? 0) + count;
		}
		return counts;
	}, [
		activeFilesTotal,
		fileStats,
		trashedFilesTotal
	]);
	const selectedFiles = (0, import_react.useMemo)(() => files.filter((file) => selectedIds.has(file.id)), [files, selectedIds]);
	const batchDeleteLabel = (0, import_react.useMemo)(() => {
		if (isTrash) return t("files.permanent_delete");
		if (selectedFiles.length > 0 && selectedFiles.every((file) => file.origin === "external")) return t("files.remove_from_library");
		if (selectedFiles.some((file) => file.origin === "external")) return t("files.delete_or_remove");
		return t("files.delete.label");
	}, [
		isTrash,
		selectedFiles,
		t
	]);
	const handleSelect = (0, import_react.useCallback)((id) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	}, []);
	const handleSelectAllVisible = (0, import_react.useCallback)((checked) => {
		setSelectedIds((prev) => {
			if (checked) return new Set([...prev, ...filteredFiles.map((file) => file.id)]);
			const visibleIds = new Set(filteredFiles.map((file) => file.id));
			return new Set([...prev].filter((id) => !visibleIds.has(id)));
		});
	}, [filteredFiles]);
	const visibleSelectionState = (0, import_react.useMemo)(() => {
		if (filteredFiles.length === 0) return false;
		const selectedVisibleCount = filteredFiles.filter((file) => selectedIds.has(file.id)).length;
		if (selectedVisibleCount === 0) return false;
		return selectedVisibleCount === filteredFiles.length ? true : "indeterminate";
	}, [filteredFiles, selectedIds]);
	const performDelete = (0, import_react.useCallback)(async (targetIds) => {
		const targets = files.filter((file) => targetIds.has(file.id));
		if (targets.length === 0) return;
		try {
			if (isTrash) reportMutationFailures("file permanent delete", await requestBatchedFileMutation("file.batch_permanent_delete", targets.map((file) => file.id)), t("files.error.delete_partial_failed"));
			else {
				const trashIds = targets.filter((file) => file.origin === "internal").map((file) => file.id);
				const removeIds = targets.filter((file) => file.origin === "external").map((file) => file.id);
				const [trashResult, removeResult] = await Promise.all([trashIds.length > 0 ? requestBatchedFileMutation("file.batch_trash", trashIds) : Promise.resolve(null), removeIds.length > 0 ? requestBatchedFileMutation("file.batch_permanent_delete", removeIds) : Promise.resolve(null)]);
				const trashFailed = warnMutationFailures("file trash", trashResult);
				const removeFailed = warnMutationFailures("file remove external entries", removeResult);
				if (trashFailed || removeFailed) toast.error(t("files.error.delete_partial_failed"));
			}
			setSelectedIds(/* @__PURE__ */ new Set());
			await refetchFiles();
		} catch (error) {
			logger.error("Failed to delete files", error);
			toast.error(t("files.error.delete_failed"));
		}
	}, [
		files,
		isTrash,
		refetchFiles,
		t
	]);
	const handleDelete = (0, import_react.useCallback)((ids) => {
		const targetIds = ids ?? selectedIds;
		const targets = files.filter((file) => targetIds.has(file.id));
		if (targets.length === 0) return;
		if (isTrash) {
			setPendingPermanentDeleteIds(new Set(targets.map((file) => file.id)));
			return;
		}
		performDelete(new Set(targets.map((file) => file.id)));
	}, [
		files,
		isTrash,
		performDelete,
		selectedIds
	]);
	const emptyTrash = (0, import_react.useCallback)(async () => {
		try {
			reportMutationFailures("file empty trash", await ipcApi.request("file.empty_trash"), t("files.error.delete_partial_failed"));
			setSelectedIds(/* @__PURE__ */ new Set());
			await refetchFiles();
		} catch (error) {
			logger.error("Failed to empty trash", error);
			toast.error(t("files.error.delete_failed"));
		}
	}, [refetchFiles, t]);
	const handlePermanentDeleteConfirm = (0, import_react.useCallback)(() => {
		const ids = pendingPermanentDeleteIds;
		if (!ids) return;
		setPendingPermanentDeleteIds(null);
		if (ids.size === 0) {
			emptyTrash();
			return;
		}
		performDelete(ids);
	}, [
		emptyTrash,
		pendingPermanentDeleteIds,
		performDelete
	]);
	const handleEmptyTrash = (0, import_react.useCallback)(() => {
		if (!isTrash || filteredFiles.length === 0) return;
		setPendingPermanentDeleteIds(/* @__PURE__ */ new Set());
	}, [filteredFiles, isTrash]);
	const handleRestore = (0, import_react.useCallback)(async (ids) => {
		try {
			reportMutationFailures("file restore", await requestBatchedFileMutation("file.batch_restore", [...ids]), t("files.error.restore_partial_failed"));
			setSelectedIds(/* @__PURE__ */ new Set());
			await refetchFiles();
		} catch (error) {
			logger.error("Failed to restore files", error);
			toast.error(t("files.error.restore_failed"));
		}
	}, [refetchFiles, t]);
	const handleRename = (0, import_react.useCallback)(async (id, newName) => {
		const file = files.find((item) => item.id === id);
		if (!file) {
			setRenamingId(null);
			return;
		}
		const entryName = stripCurrentExtension(newName.trim(), file.format).trim();
		if (!entryName) {
			setRenamingId(null);
			return;
		}
		if (entryName === stripCurrentExtension(file.name, file.format).trim()) {
			setRenamingId(null);
			return;
		}
		try {
			await ipcApi.request("file.rename", {
				id,
				newName: entryName
			});
			setRenamingId(null);
			await refetchFiles();
		} catch (error) {
			logger.error("Failed to rename file", error);
			toast.error(t("files.error.rename_failed"));
			setRenamingId(null);
		}
	}, [
		files,
		refetchFiles,
		t
	]);
	const startInlineRename = (0, import_react.useCallback)((id) => {
		setRenamingId(id);
	}, []);
	const listMenuActions = (0, import_react.useMemo)(() => ({
		onRename: startInlineRename,
		onDelete: (id) => handleDelete(new Set([id])),
		onRestore: (id) => void handleRestore(new Set([id])),
		onShowInFolder: handleShowInFolder
	}), [
		handleDelete,
		handleRestore,
		handleShowInFolder,
		startInlineRename
	]);
	const handleSort = (0, import_react.useCallback)((key) => {
		if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	}, [sortKey]);
	const isEmptyTrashConfirm = pendingPermanentDeleteIds?.size === 0;
	const permanentDeleteConfirmCount = isEmptyTrashConfirm ? fileCounts.trash : pendingPermanentDeleteIds?.size ?? 0;
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (embeddedPreview || renamingId || shouldIgnoreFileShortcut(e)) return;
			if ((e.key === "Delete" || e.key === "Backspace") && selectedIds.size > 0) {
				e.preventDefault();
				handleDelete();
			}
			if ((e.key === "F2" || isMac && e.key === "Enter") && selectedIds.size === 1) {
				e.preventDefault();
				const selectedId = [...selectedIds][0];
				const selectedFile = files.find((file) => file.id === selectedId);
				if (!canStartInlineRename(selectedFile)) return;
				startInlineRename(selectedFile.id);
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [
		embeddedPreview,
		files,
		selectedIds,
		handleDelete,
		renamingId,
		startInlineRename
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "files.view",
		className: "relative flex min-h-0 flex-1 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex min-h-0 min-w-0 flex-1 overflow-hidden ${embeddedPreview ? "invisible" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSidebar, {
					filter,
					onFilterChange: (f) => {
						setFilter(f);
						setSelectedIds(/* @__PURE__ */ new Set());
						setRenamingId(null);
						setPendingPermanentDeleteIds(null);
					},
					fileCounts
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: pendingPermanentDeleteIds !== null,
					onOpenChange: (open) => {
						if (!open) setPendingPermanentDeleteIds(null);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						"aria-describedby": void 0,
						className: "max-w-sm rounded-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("files.permanent_delete_confirm.title") }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: t("files.permanent_delete_confirm.description", { count: permanentDeleteConfirmCount })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPendingPermanentDeleteIds(null),
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								size: "sm",
								onClick: handlePermanentDeleteConfirm,
								children: isEmptyTrashConfirm ? t("files.empty_trash") : t("files.permanent_delete")
							})] })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ui": "files.content",
					className: `relative flex min-w-0 flex-1 flex-col transition-colors ${dragOver ? "bg-accent/25" : ""}`,
					onDragOver: (e) => {
						e.preventDefault();
						if (isTrash) {
							setDragOver(false);
							return;
						}
						setDragOver(true);
					},
					onDragLeave: () => setDragOver(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragOver(false);
						if (isTrash) return;
						handleImportPaths(Array.from(e.dataTransfer.files).map((file) => AbsoluteFilePathSchema.safeParse(window.api.file.getPathForFile(file)).data).filter((path) => Boolean(path)));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
							title: activeFilterLabel,
							className: "relative mb-0 h-9 pb-1 after:pointer-events-none after:absolute after:right-3 after:bottom-0 after:left-3 after:border-border after:border-b after:content-['']",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-2",
								children: [!isImageGrid && selectedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileToolbar, {
									isTrash,
									selectedCount: selectedIds.size,
									batchDeleteLabel,
									onBatchDelete: () => handleDelete(),
									onBatchRestore: () => void handleRestore(new Set(selectedIds))
								}), isTrash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									disabled: filteredFiles.length === 0,
									onClick: handleEmptyTrash,
									className: "-translate-y-px h-7 px-2.5 text-muted-foreground text-xs hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), t("files.empty_trash")]
								}) : showUploadButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => void handleUploadClick(),
									className: "-translate-y-px h-7 gap-1.5 rounded-md px-2.5 text-muted-foreground text-xs hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5 translate-y-px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("files.upload") })]
								}) : null]
							})
						}),
						dragOver && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0 z-50 m-2 flex items-center justify-center rounded-lg border-2 border-border-strong border-dashed bg-accent/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									size: 28,
									className: "mx-auto mb-2 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs",
									children: t("files.drag_upload")
								})]
							})
						}),
						!isImageGrid && filteredFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileListHeader, {
							visibleSelectionState,
							onSelectAll: handleSelectAllVisible,
							sortKey,
							sortDir,
							onSort: handleSort
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
							ref: contentScrollRef,
							className: "relative flex-1",
							onScroll: handleContentScroll,
							onClick: (e) => {
								if (e.target === e.currentTarget) {
									setSelectedIds(/* @__PURE__ */ new Set());
									setRenamingId(null);
								}
							},
							children: filteredFiles.length === 0 ? isFilesLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full flex-1 items-center justify-center text-muted-foreground text-sm",
								children: t("common.loading")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full flex-1 flex-col items-center justify-center px-6",
								children: isTrash || files.filter((f) => !f.trashed).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("files.empty.title") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									preset: "no-result",
									title: t("files.empty.no_match_title")
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isImageGrid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGrid, {
								files: filteredFiles,
								scrollRef: contentScrollRef,
								onLayoutChange: maybeFillClientFilteredViewport,
								onOpen: handleOpen,
								onDelete: (id) => handleDelete(new Set([id])),
								isTrash,
								menuActions: listMenuActions,
								renamingId,
								onRenameConfirm: (id, name) => void handleRename(id, name),
								onRenameCancel: () => setRenamingId(null)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileList, {
								files: filteredFiles,
								scrollRef: contentScrollRef,
								selectedIds,
								onSelect: handleSelect,
								onOpen: handleOpen,
								isTrash,
								menuActions: listMenuActions,
								onDelete: (id) => handleDelete(new Set([id])),
								onRestore: (id) => void handleRestore(new Set([id])),
								onRename: startInlineRename,
								onShowInFolder: handleShowInFolder,
								renamingId,
								onRenameConfirm: (id, name) => void handleRename(id, name),
								onRenameCancel: () => setRenamingId(null)
							}) })
						})
					]
				})
			]
		}), embeddedPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			"aria-label": embeddedPreview.fileName,
			className: "absolute inset-0 z-20 flex min-h-0 min-w-0 flex-col overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreview, {
				filePath: embeddedPreview.filePath,
				refreshKey: embeddedPreview.refreshKey,
				header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.back"),
					className: "size-6 min-h-6 min-w-6 rounded p-0 text-muted-foreground shadow-none hover:bg-accent hover:text-foreground",
					onClick: () => setEmbeddedPreview(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate text-foreground text-sm",
					children: embeddedPreview.fileName
				})] })
			})
		})]
	});
}
var SplitComponent = FilesPage;
export { SplitComponent as component };

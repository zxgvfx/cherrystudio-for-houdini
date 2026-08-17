import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { a as CustomTag_default } from "./Model-CdvaPtgc.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as HelpTooltip } from "./help-tooltip-CzQJYxnV.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { i as Flex, r as ColFlex } from "./flex-Cbul8ND0.js";
import { t as Label } from "./label-BOwZlTgC.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as Library } from "./library-CSIGjoJI.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
import { n as getTopicMessages } from "./useTopic-DqjHWqZM.js";
import { t as Scrollbar_default } from "./Scrollbar-DJ9MDpuH.js";
import { c as SelectorShell, i as ModelSelectorRow, s as DEFAULT_SELECTOR_CONTENT_HEIGHT } from "./ModelSelector-HuVsPvx_.js";
import { i as useKnowledgeBases } from "./useKnowledgeBase-BfVSZRCd.js";
import { h as getMessageTitle } from "./ExportService-CB3qNdWe.js";
import { t as useListboxKeyboardNavigation } from "./useListboxKeyboardNavigation-C0D0IZvX.js";
import { i as useAddKnowledgeItems, n as resolveKnowledgeFileMetadataEntryData } from "./knowledgeFileEntry-Be2ByDDf.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
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
			className: cn("h-9 w-full min-w-0 justify-between gap-2 rounded-md px-3 font-normal text-sm shadow-none", selectedOption ? "text-foreground" : "text-muted-foreground", invalid && "aria-invalid:border-error-border aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40"),
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
var logger = loggerService.withContext("SaveToKnowledgePopup");
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
				logger.error("analyze content failed:", error);
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
					logger.error("Failed to read note file:", error);
					throw new Error("Failed to read note content. Please ensure the file exists and is accessible.");
				}
				if (!content || content.trim() === "") throw new Error("Note content is empty. Cannot export empty notes to knowledge base.");
				logger.debug("Note content loaded", { contentLength: content.length });
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
				logger.debug("Processed content:", result);
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
						logger.warn("Failed to resolve some knowledge file entries", {
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
			logger.error("save failed:", error);
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
export { SaveToKnowledgePopup_default as t };

import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as NormalTooltip } from "./tooltip-CJBVkA5B.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as AbsoluteFilePathSchema } from "./file-BaEpIJyZ.js";
import { i as toSafeFileUrl, t as fileUrlToPath } from "./file-C52KaMrN.js";
import { t as Boxes } from "./boxes-NEpVEeyk.js";
import { t as FileCode2 } from "./file-code-2-luDfQWmL.js";
import { t as FileImage } from "./file-image-DkhfFrDp.js";
import { t as FileJson } from "./file-json-RNzhYOZF.js";
import { t as FileSpreadsheet } from "./file-spreadsheet-BEf6ujsg.js";
import { t as FileText } from "./file-text-CbEF-1I4.js";
import { t as FileType2 } from "./file-type-2-CXL-uFd6.js";
import { t as File } from "./file-la_OjH-7.js";
import { t as Folder } from "./folder-1xfPClr_.js";
import { t as Link2 } from "./link-2-CDsnbv4j.js";
import { t as MessagesSquare } from "./messages-square-CeImmQEf.js";
import { t as Presentation } from "./presentation-2kMB2Skd.js";
import { t as TextQuote } from "./text-quote-B4UBBGk7.js";
import { t as ToolCase } from "./tool-case-BY9yQQBD.js";
import { t as X } from "./x-Bh2_A30k.js";
import { r as formatQuotedText } from "./formats-CgjOOl9i.js";
import { t as ImagePreviewService } from "./ImagePreviewService-ClwFTW1F.js";
import { t as BracesVariableIcon } from "./BracesVariableIcon-co6jKDxq.js";
import { d as FILE_TYPE, n as formatFileSize, u as COMPOSER_FILE_KIND } from "./file-CVv-vzb2.js";
import { r as createComposerSecureRandomId } from "./composerFileTokenSource-D7rGs7Mx.js";
import { t as FallbackFavicon_default } from "./FallbackFavicon-DZTDVx89.js";
const QUOTE_TOOLTIP_CONTENT_CLASS_NAME = "max-w-[min(32rem,calc(100vw-2rem))]";
const QUOTE_TOOLTIP_BODY_CLASS_NAME = "whitespace-pre-wrap text-left overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]";
var BLOCKQUOTE_TRAILING_NEWLINE_PATTERN = /(<\/blockquote>)\n$/;
var BLOCKQUOTE_PROMPT_PATTERN = /^<blockquote>\n\n([\s\S]*)\n<\/blockquote>$/;
function formatQuoteTooltipContent(content) {
	return content || void 0;
}
function getQuoteTooltipContent(description, promptText) {
	const content = description || promptText;
	if (!content) return void 0;
	return formatQuoteTooltipContent(content.replace(BLOCKQUOTE_PROMPT_PATTERN, "$1"));
}
function normalizeQuoteTokenPromptText(content) {
	return content.replace(BLOCKQUOTE_TRAILING_NEWLINE_PATTERN, "$1");
}
function formatQuoteTokenPromptText(content) {
	return normalizeQuoteTokenPromptText(formatQuotedText(content));
}
function parseComposerLink(value) {
	const url = value?.trim();
	if (!url || /\s/.test(url)) return null;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:" || !parsed.hostname) return null;
		const hostname = parsed.hostname.replace(/^www\./, "");
		const pathname = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
		return {
			url,
			hostname: parsed.hostname,
			label: `${hostname}${pathname}`
		};
	} catch {
		return null;
	}
}
function createComposerLinkToken(value) {
	const link = parseComposerLink(value);
	if (!link) return null;
	return {
		id: createComposerSecureRandomId("link-token"),
		kind: "link",
		label: link.label,
		promptText: link.url
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("fileTokenPresentation");
var warnedPreviewKeys = /* @__PURE__ */ new Set();
var fileTokenIconClassName = "size-3 shrink-0 text-current";
var fileTokenContainerClassName = "border-border bg-background hover:bg-accent";
var fileTokenVisualPresetByVariant = {
	image: {
		icon: FileImage,
		iconClassName: "bg-cyan-100 text-cyan-700",
		defaultTypeLabel: "IMAGE",
		displayExtensions: [
			"avif",
			"bmp",
			"gif",
			"heic",
			"heif",
			"jpeg",
			"jpg",
			"png",
			"svg",
			"webp"
		]
	},
	word: {
		icon: FileType2,
		iconClassName: "bg-blue-100 text-blue-700",
		defaultTypeLabel: "WORD",
		displayExtensions: ["doc", "docx"]
	},
	excel: {
		icon: FileSpreadsheet,
		iconClassName: "bg-green-100 text-green-700",
		defaultTypeLabel: "EXCEL",
		displayExtensions: [
			"csv",
			"xls",
			"xlsx"
		]
	},
	powerpoint: {
		icon: Presentation,
		iconClassName: "bg-orange-100 text-orange-700",
		defaultTypeLabel: "PPT",
		displayExtensions: ["ppt", "pptx"]
	},
	pdf: {
		icon: FileText,
		iconClassName: "bg-red-100 text-red-700",
		defaultTypeLabel: "PDF",
		displayExtensions: ["pdf"]
	},
	markdown: {
		icon: FileText,
		iconClassName: "bg-gray-100 text-gray-700",
		defaultTypeLabel: "MD",
		displayExtensions: [
			"markdown",
			"md",
			"mdx"
		]
	},
	json: {
		icon: FileJson,
		iconClassName: "bg-violet-100 text-violet-700",
		defaultTypeLabel: "JSON",
		displayExtensions: ["json", "jsonl"]
	},
	code: {
		icon: FileCode2,
		iconClassName: "bg-indigo-100 text-indigo-700",
		defaultTypeLabel: "CODE",
		displayExtensions: [
			"css",
			"go",
			"html",
			"java",
			"js",
			"jsx",
			"py",
			"rs",
			"ts",
			"tsx",
			"xml",
			"yaml",
			"yml"
		]
	},
	document: {
		icon: FileText,
		iconClassName: "bg-slate-100 text-slate-700",
		defaultTypeLabel: "DOCUMENT"
	},
	text: {
		icon: FileText,
		iconClassName: "bg-info-subtle text-info",
		defaultTypeLabel: "TEXT",
		displayExtensions: [
			"log",
			"text",
			"txt"
		]
	},
	fallback: {
		icon: File,
		iconClassName: "bg-accent text-muted-foreground",
		defaultTypeLabel: "FILE"
	}
};
var fileTokenVariantByExtension = new Map(Object.entries(fileTokenVisualPresetByVariant).flatMap(([variant, preset]) => {
	return (("displayExtensions" in preset ? preset.displayExtensions : void 0) ?? []).map((extension) => [extension, variant]);
}));
function getNormalizedFileExtension(file, fallbackLabel) {
	return (file?.ext || fallbackLabel.match(/\.[^.]+$/)?.[0] || "").replace(/^\./, "").toLowerCase();
}
function getFileExtensionLabel(file, fallbackLabel) {
	return getNormalizedFileExtension(file, fallbackLabel).toUpperCase();
}
function getFilePreviewUrl(file, fallbackLabel, previewUrl) {
	if (file?.type !== FILE_TYPE.IMAGE) return void 0;
	const extension = getNormalizedFileExtension(file, fallbackLabel);
	if (previewUrl) try {
		const url = new URL(previewUrl);
		if (url.protocol !== "file:") return previewUrl;
		const parsedPath$1 = AbsoluteFilePathSchema.safeParse(fileUrlToPath(url));
		if (!parsedPath$1.success) {
			if (!warnedPreviewKeys.has(previewUrl)) {
				warnedPreviewKeys.add(previewUrl);
				logger.warn("getFilePreviewUrl: non-absolute path in file: previewUrl", { previewUrl });
			}
			return;
		}
		return toSafeFileUrl(parsedPath$1.data, extension || null);
	} catch {
		return;
	}
	if (!file.path) return void 0;
	const parsedPath = AbsoluteFilePathSchema.safeParse(file.path);
	if (!parsedPath.success) {
		if (!warnedPreviewKeys.has(file.path)) {
			warnedPreviewKeys.add(file.path);
			logger.warn("getFilePreviewUrl: non-absolute/invalid attachment path", { path: file.path });
		}
		return;
	}
	return toSafeFileUrl(parsedPath.data, extension || null);
}
function getFileTokenVariant(file, fallbackLabel) {
	const extension = getNormalizedFileExtension(file, fallbackLabel);
	const extensionVariant = fileTokenVariantByExtension.get(extension);
	if (file?.type === FILE_TYPE.IMAGE) return "image";
	if (extensionVariant) return extensionVariant;
	if (file?.type === FILE_TYPE.DOCUMENT) return "document";
	if (file?.type === FILE_TYPE.TEXT) return "text";
	return "fallback";
}
function getFileTokenPresentation(file, fallbackLabel, previewUrl) {
	const extensionLabel = getFileExtensionLabel(file, fallbackLabel);
	const variant = getFileTokenVariant(file, fallbackLabel);
	const preset = fileTokenVisualPresetByVariant[variant];
	const Icon = preset.icon;
	return {
		variant,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: fileTokenIconClassName,
			"aria-hidden": true
		}),
		previewIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-7",
			"aria-hidden": true
		}),
		containerClassName: fileTokenContainerClassName,
		iconClassName: preset.iconClassName,
		typeLabel: extensionLabel || preset.defaultTypeLabel,
		previewUrl: variant === "image" ? getFilePreviewUrl(file, fallbackLabel, previewUrl) : void 0
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var tokenIconClassName = "size-[1em] shrink-0 text-current opacity-80";
var tokenRemoveIconClassName = "size-[0.95em] shrink-0 text-current";
var TOKEN_POPOVER_OPEN_DELAY_MS = 120;
var TOKEN_POPOVER_CLOSE_DELAY_MS = 160;
var TOKEN_TOOLTIP_DELAY_MS = 300;
var tokenPreviewHeaderClassName = "flex h-20 items-center justify-center border-border-subtle border-b bg-[repeating-linear-gradient(135deg,var(--border-subtle)_0,var(--border-subtle)_1px,transparent_1px,transparent_8px)] bg-muted";
var pastedTextPreviewCache = /* @__PURE__ */ new Map();
var tokenIconByKind = {
	skill: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCase, { className: tokenIconClassName }),
	link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: tokenIconClassName }),
	file: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: tokenIconClassName }),
	folder: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: tokenIconClassName }),
	knowledge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: tokenIconClassName }),
	reference: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { className: tokenIconClassName }),
	quote: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextQuote, { className: tokenIconClassName }),
	promptVariable: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BracesVariableIcon, { className: tokenIconClassName })
};
function stopTokenActionEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}
function InlineTokenRemoveButton({ label, onRemove, className, iconClassName }) {
	const handleRemove = (event) => {
		stopTokenActionEvent(event);
		onRemove();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-ui": "chat.inline-token-remove-button",
		type: "button",
		"aria-label": label,
		title: label,
		"data-composer-token-remove": "",
		className: cn("pointer-events-none absolute inset-0 inline-flex items-center justify-center border-0 bg-transparent p-0 text-current leading-none opacity-0 outline-none transition-opacity", "hover:opacity-100", "focus-visible:pointer-events-auto focus-visible:opacity-100", "group-focus-within/composer-token:pointer-events-auto group-focus-within/composer-token:opacity-100 group-hover/composer-token:pointer-events-auto group-hover/composer-token:opacity-100", className),
		onMouseDown: stopTokenActionEvent,
		onClick: handleRemove,
		onKeyDown: (event) => event.stopPropagation(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
			className: cn(tokenRemoveIconClassName, iconClassName),
			"aria-hidden": true
		})
	});
}
function InlineTokenIconSlot({ icon, removeLabel, onRemove, slotClassName, removeButtonClassName, removeIconClassName }) {
	if (!onRemove) return icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.inline-token-icon-slot",
		className: cn("relative inline-flex shrink-0", slotClassName),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex shrink-0 transition-opacity group-focus-within/composer-token:opacity-0 group-hover/composer-token:opacity-0",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenRemoveButton, {
			label: removeLabel ?? "Remove",
			onRemove,
			className: removeButtonClassName,
			iconClassName: removeIconClassName
		})]
	});
}
function FileTokenImageIcon({ previewUrl, fallbackIcon }) {
	const [failedPreviewUrl, setFailedPreviewUrl] = (0, import_react.useState)();
	if (!previewUrl || previewUrl === failedPreviewUrl) return fallbackIcon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "chat.file-token-image-icon",
		src: previewUrl,
		alt: "",
		"aria-hidden": true,
		draggable: false,
		className: "block size-4.5! shrink-0 object-cover",
		"data-file-token-icon-thumbnail": "",
		onError: () => setFailedPreviewUrl(previewUrl)
	});
}
function isSvgFile(file, label) {
	return (file?.ext || label.match(/\.[^.]+$/)?.[0] || "").replace(/^\./, "").toLowerCase() === "svg";
}
function renderActiveComposerTokenElement({ token, readOnly = false, selected = false, className, children, maxWidthClassName = "max-w-[calc(100%_-_0.25rem)]", onMouseDown, onRemove, removeLabel, icon, colorClassName = "text-primary", interactionProps }) {
	const title = token.kind === "quote" ? void 0 : token.description ?? token.promptText ?? token.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.render-active-composer-token",
		className: cn("group/composer-token mx-0.5 inline-flex select-none items-baseline gap-1 align-baseline leading-[inherit]", maxWidthClassName, colorClassName, readOnly && "focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-none", selected && "text-primary underline decoration-primary/40 underline-offset-2", className),
		title,
		"data-composer-token-kind": token.kind,
		onMouseDown,
		...mergeUiProps(interactionProps, "chat.render-active-composer-token"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex shrink-0 translate-y-[0.08em] items-baseline text-current leading-[inherit]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: token.icon ? token.icon : icon,
				removeLabel,
				onRemove,
				removeButtonClassName: "size-[1em] rounded-[4px]"
			})
		}), children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: token.label
		})]
	});
}
function ActiveComposerToken(props) {
	return renderActiveComposerTokenElement(props);
}
function SkillComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.skill
	});
}
function LinkComposerToken(props) {
	const link = parseComposerLink(props.token.promptText ?? props.token.description);
	if (!link) return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.link
	});
	const openLink = () => {
		ipcApi.request("system.shell.open_website", link.url);
	};
	const handleClick = (event) => {
		stopTokenActionEvent(event);
		openLink();
	};
	const handleKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		openLink();
	};
	return renderActiveComposerTokenElement({
		...props,
		className: cn("cursor-pointer rounded-[4px] focus-visible:bg-accent focus-visible:outline-none", props.className),
		icon: props.readOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.link-composer-token",
			className: "inline-flex size-[1em] shrink-0 items-center justify-center overflow-hidden rounded-[4px] [&>img]:block [&>img]:size-full! [&>img]:object-contain [&>span]:size-full!",
			"data-composer-link-favicon": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackFavicon_default, {
				hostname: link.hostname,
				alt: ""
			})
		}) : tokenIconByKind.link,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.link-composer-token",
			className: "min-w-0 truncate",
			children: link.label
		}),
		interactionProps: {
			role: "link",
			tabIndex: 0,
			"aria-label": link.url,
			onClick: handleClick,
			onKeyDown: handleKeyDown
		}
	});
}
function isComposerAttachment(value) {
	return typeof value === "object" && value !== null;
}
function shouldShowFileTokenPopover(file) {
	return file?.type === FILE_TYPE.IMAGE || file?.composerFileKind === COMPOSER_FILE_KIND.PASTED_TEXT;
}
function readPastedTextPreview(path) {
	let request = pastedTextPreviewCache.get(path);
	if (!request) {
		request = window.api.fs.readText(path).catch((error) => {
			pastedTextPreviewCache.delete(path);
			throw error;
		});
		pastedTextPreviewCache.set(path, request);
	}
	return request;
}
function getReadOnlyFilePreviewPath(readOnlyFilePreview) {
	if (!readOnlyFilePreview?.url) return void 0;
	try {
		return fileUrlToPath(readOnlyFilePreview.url);
	} catch {
		return;
	}
}
function getPastedTextPreviewPath(file, readOnlyFilePreview) {
	return getReadOnlyFilePreviewPath(readOnlyFilePreview) ?? file?.path;
}
function TokenPathTooltipContent({ path, sizeLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.token-path-tooltip-content",
		className: "inline-flex max-w-full items-start gap-2.5 text-left",
		"data-token-path-tooltip": "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-all",
			"data-token-path": "",
			children: path
		}), sizeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-neutral-300",
			"data-token-size": "",
			children: sizeLabel
		})]
	});
}
function PastedTextTokenPreviewCard({ file, readOnlyFilePreview, secondaryAction }) {
	const [previewText, setPreviewText] = (0, import_react.useState)("");
	const previewPath = getPastedTextPreviewPath(file, readOnlyFilePreview);
	(0, import_react.useEffect)(() => {
		if (!previewPath) return;
		let disposed = false;
		readPastedTextPreview(previewPath).then((text) => {
			if (!disposed) setPreviewText(text);
		}).catch(() => {
			if (!disposed) setPreviewText("");
		});
		return () => {
			disposed = true;
		};
	}, [previewPath]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.pasted-text-token-preview",
		className: "w-80 overflow-hidden text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
			className: "max-h-44 min-h-24 overflow-x-hidden bg-muted/50",
			"data-file-token-text-scrollbar": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "m-0 whitespace-pre-wrap break-words p-3 font-[inherit] text-popover-foreground text-xs leading-5",
				children: previewText
			})
		}), secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end border-border-subtle border-t p-2",
			"data-file-token-actions": "",
			children: secondaryAction
		})]
	});
}
function FileTokenPreviewCard({ file, label, presentation, readOnlyFilePreview, secondaryAction }) {
	const { t } = useTranslation();
	const sizeLabel = typeof file?.size === "number" ? formatFileSize(file.size) : void 0;
	const hasActions = Boolean(secondaryAction);
	const [failedPreviewUrl, setFailedPreviewUrl] = (0, import_react.useState)();
	const hasFailedPreview = Boolean(presentation.previewUrl && presentation.previewUrl === failedPreviewUrl);
	const previewUrl = hasFailedPreview ? void 0 : presentation.previewUrl;
	if (file?.composerFileKind === COMPOSER_FILE_KIND.PASTED_TEXT) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PastedTextTokenPreviewCard, {
		file,
		readOnlyFilePreview,
		secondaryAction
	});
	if (previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "flex max-h-48 max-w-60 overflow-hidden bg-muted text-left",
		"data-file-token-image-preview": "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: previewUrl,
			alt: label,
			className: "block max-h-48 max-w-60 object-contain",
			onError: () => setFailedPreviewUrl(previewUrl)
		})
	});
	if (hasFailedPreview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "bg-muted px-5 py-4 text-center text-muted-foreground text-sm",
		"data-file-token-image-preview-error": "",
		children: t("chat.input.image_preview_failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.file-token-preview-card",
		className: "w-72 overflow-hidden text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: tokenPreviewHeaderClassName,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("inline-flex size-12 items-center justify-center rounded-xl bg-background", presentation.iconClassName),
				children: presentation.previewIcon
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2.5 p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1",
				"data-file-token-actions": hasActions ? "" : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-6 min-w-0 items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-semibold text-popover-foreground text-sm leading-5",
							children: label
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-4 min-w-0 items-center gap-1.5 text-muted-foreground text-xs leading-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-medium uppercase",
							children: presentation.typeLabel
						}), sizeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground-tertiary",
							children: "·"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0",
							children: sizeLabel
						})] })]
					}),
					secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-4 shrink-0 items-center justify-end",
						onMouseDown: stopTokenActionEvent,
						children: secondaryAction
					})
				]
			})
		})]
	});
}
function ComposerTokenHoverPopover({ trigger, content, ariaLabel, contentClassName, onActivate }) {
	const [popoverOpen, setPopoverOpen] = (0, import_react.useState)(false);
	const openTimerRef = (0, import_react.useRef)(null);
	const closeTimerRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const popoverOpenReasonRef = (0, import_react.useRef)("pointer");
	const clearOpenTimer = (0, import_react.useCallback)(() => {
		if (openTimerRef.current === null) return;
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	const clearCloseTimer = (0, import_react.useCallback)(() => {
		if (closeTimerRef.current === null) return;
		window.clearTimeout(closeTimerRef.current);
		closeTimerRef.current = null;
	}, []);
	const openPopover = (0, import_react.useCallback)((reason = "pointer") => {
		popoverOpenReasonRef.current = reason;
		clearOpenTimer();
		clearCloseTimer();
		setPopoverOpen(true);
	}, [clearCloseTimer, clearOpenTimer]);
	const closePopover = (0, import_react.useCallback)(() => {
		clearOpenTimer();
		clearCloseTimer();
		setPopoverOpen(false);
	}, [clearCloseTimer, clearOpenTimer]);
	const openPointerPopover = (0, import_react.useCallback)(() => {
		openPopover("pointer");
	}, [openPopover]);
	const scheduleOpenPopover = (0, import_react.useCallback)(() => {
		clearCloseTimer();
		if (popoverOpen || openTimerRef.current !== null) return;
		popoverOpenReasonRef.current = "pointer";
		openTimerRef.current = window.setTimeout(() => {
			openTimerRef.current = null;
			setPopoverOpen(true);
		}, TOKEN_POPOVER_OPEN_DELAY_MS);
	}, [clearCloseTimer, popoverOpen]);
	const scheduleClosePopover = (0, import_react.useCallback)(() => {
		clearOpenTimer();
		clearCloseTimer();
		closeTimerRef.current = window.setTimeout(() => {
			setPopoverOpen(false);
			closeTimerRef.current = null;
		}, TOKEN_POPOVER_CLOSE_DELAY_MS);
	}, [clearCloseTimer, clearOpenTimer]);
	const markPointerOpenReason = (0, import_react.useCallback)(() => {
		popoverOpenReasonRef.current = "pointer";
	}, []);
	const handlePopoverOpenChange = (0, import_react.useCallback)((open) => {
		if (open && popoverOpenReasonRef.current !== "keyboard") popoverOpenReasonRef.current = "pointer";
		clearOpenTimer();
		clearCloseTimer();
		setPopoverOpen(open);
	}, [clearCloseTimer, clearOpenTimer]);
	const handlePopoverOpenAutoFocus = (0, import_react.useCallback)((event) => {
		if (popoverOpenReasonRef.current !== "keyboard") event.preventDefault();
	}, []);
	const handlePopoverCloseAutoFocus = (0, import_react.useCallback)((event) => {
		if (popoverOpenReasonRef.current !== "keyboard") event.preventDefault();
	}, []);
	const isFocusWithinPopover = (0, import_react.useCallback)((target) => {
		if (!(target instanceof Node)) return false;
		return Boolean(triggerRef.current?.contains(target) || contentRef.current?.contains(target));
	}, []);
	const handleTriggerBlur = (0, import_react.useCallback)((event) => {
		if (isFocusWithinPopover(event.relatedTarget)) return;
		scheduleClosePopover();
	}, [isFocusWithinPopover, scheduleClosePopover]);
	const handleContentBlur = (0, import_react.useCallback)((event) => {
		if (isFocusWithinPopover(event.relatedTarget)) return;
		scheduleClosePopover();
	}, [isFocusWithinPopover, scheduleClosePopover]);
	const handleTriggerKeyDown = (0, import_react.useCallback)((event) => {
		if (event.target?.closest("[data-composer-token-remove]")) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			event.stopPropagation();
			if (onActivate) {
				closePopover();
				onActivate();
			} else openPopover("keyboard");
			return;
		}
		if (event.key === "Escape") {
			event.preventDefault();
			event.stopPropagation();
			closePopover();
		}
	}, [
		closePopover,
		onActivate,
		openPopover
	]);
	const handleTriggerClick = (0, import_react.useCallback)((event) => {
		if (!onActivate || event.target?.closest("[data-composer-token-remove]")) return;
		stopTokenActionEvent(event);
		closePopover();
		onActivate();
	}, [closePopover, onActivate]);
	(0, import_react.useEffect)(() => () => {
		clearOpenTimer();
		clearCloseTimer();
	}, [clearCloseTimer, clearOpenTimer]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open: popoverOpen,
		onOpenChange: handlePopoverOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "chat.composer-token-hover-popover.button",
				ref: triggerRef,
				className: "group inline align-baseline outline-none",
				role: "button",
				tabIndex: 0,
				"aria-label": ariaLabel,
				onMouseEnter: scheduleOpenPopover,
				onMouseLeave: scheduleClosePopover,
				onMouseMove: scheduleOpenPopover,
				onPointerDown: markPointerOpenReason,
				onClick: handleTriggerClick,
				onBlur: handleTriggerBlur,
				onKeyDownCapture: handleTriggerKeyDown,
				children: trigger
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			ref: contentRef,
			side: "top",
			align: "start",
			sideOffset: 8,
			className: cn("w-fit max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl p-0 shadow-xl", contentClassName),
			onMouseEnter: openPointerPopover,
			onMouseLeave: scheduleClosePopover,
			onFocus: clearCloseTimer,
			onBlur: handleContentBlur,
			onOpenAutoFocus: handlePopoverOpenAutoFocus,
			onCloseAutoFocus: handlePopoverCloseAutoFocus,
			children: typeof content === "function" ? content({ closePopover }) : content
		})]
	});
}
function FileComposerToken(props) {
	const { imageIconPreview = false, onRemove, removeLabel: removeLabelProp, tooltipActions } = props;
	const tokenFile = isComposerAttachment(props.token.payload) ? props.token.payload : void 0;
	const previewFileType = props.readOnlyFilePreview?.mediaType?.startsWith("image/") ? FILE_TYPE.IMAGE : void 0;
	const file = props.readOnlyFilePreview ? {
		...tokenFile,
		...!tokenFile?.type && previewFileType && { type: previewFileType },
		...props.readOnlyFilePreview.composerFileKind && { composerFileKind: props.readOnlyFilePreview.composerFileKind }
	} : tokenFile;
	const label = file?.origin_name || file?.name || props.token.label;
	const presentation = getFileTokenPresentation(file, label, props.readOnlyFilePreview?.mediaType?.startsWith("image/") ? props.readOnlyFilePreview.url : void 0);
	const openImagePreview = (0, import_react.useCallback)(() => {
		if (!presentation.previewUrl) return;
		ImagePreviewService.show(presentation.previewUrl);
	}, [presentation.previewUrl]);
	const title = props.token.description ?? props.token.promptText ?? label;
	const accessibleTitle = props.readOnly ? label : title;
	const removeLabel = removeLabelProp ?? "Remove";
	const shouldShowPopover = shouldShowFileTokenPopover(file) && (!props.readOnly || Boolean(props.readOnlyFilePreview?.url));
	const pathTooltipPath = props.readOnly ? getReadOnlyFilePreviewPath(props.readOnlyFilePreview) : file?.path;
	const shouldShowPathTooltip = Boolean(pathTooltipPath) && !shouldShowFileTokenPopover(file);
	const shouldUseNeutralImageIcon = imageIconPreview && presentation.variant === "image";
	const tokenIcon = props.token.icon ? props.token.icon : shouldUseNeutralImageIcon && !isSvgFile(file, label) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTokenImageIcon, {
		previewUrl: presentation.previewUrl,
		fallbackIcon: presentation.icon
	}) : presentation.icon;
	const chipElement = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.file-composer-token",
		className: cn("group/composer-token mx-0.5 my-0.5 inline-flex h-6 max-w-[calc(100%_-_0.25rem)] select-none items-center gap-1 overflow-hidden rounded-md border px-1.5 align-middle font-medium text-foreground text-xs leading-[inherit] transition-[color,box-shadow,border-color]", "group-focus-visible:border-primary", props.readOnly && "focus-visible:border-primary focus-visible:outline-none", presentation.containerClassName, props.selected && "border-primary ring-1 ring-primary/40", props.className),
		title: props.readOnly || shouldShowPathTooltip ? void 0 : title,
		"data-composer-token-kind": props.token.kind,
		"data-file-token-variant": presentation.variant,
		onMouseDown: props.onMouseDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("inline-flex size-4.5 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border-0 leading-none", shouldUseNeutralImageIcon ? "bg-accent text-muted-foreground" : presentation.iconClassName),
			"data-file-token-icon": presentation.variant,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: tokenIcon,
				removeLabel,
				onRemove,
				slotClassName: "size-full items-center justify-center",
				removeButtonClassName: "size-full rounded-[5px] bg-muted text-foreground",
				removeIconClassName: "size-3"
			})
		}), props.children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("whitespace-nowrap! min-w-0 max-w-full truncate break-normal", props.maxWidthClassName),
			children: label
		})]
	});
	if (pathTooltipPath && shouldShowPathTooltip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, {
			path: pathTooltipPath,
			sizeLabel: typeof file?.size === "number" ? formatFileSize(file.size) : void 0
		}),
		side: "top",
		sideOffset: 6,
		delayDuration: TOKEN_TOOLTIP_DELAY_MS,
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": accessibleTitle
		} : void 0,
		children: chipElement
	});
	if (props.readOnly && !shouldShowPopover) {
		const sizeLabel = typeof file?.size === "number" ? formatFileSize(file.size) : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, {
				path: label,
				sizeLabel: [presentation.typeLabel, sizeLabel].filter(Boolean).join(" · ")
			}),
			side: "top",
			sideOffset: 6,
			delayDuration: TOKEN_TOOLTIP_DELAY_MS,
			triggerProps: {
				tabIndex: 0,
				"aria-label": accessibleTitle
			},
			children: chipElement
		});
	}
	if (!shouldShowPopover) return chipElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerTokenHoverPopover, {
		trigger: chipElement,
		ariaLabel: accessibleTitle,
		contentClassName: presentation.previewUrl ? "rounded-lg border-0 bg-transparent" : void 0,
		onActivate: presentation.previewUrl ? openImagePreview : void 0,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTokenPreviewCard, {
			file,
			label,
			presentation,
			readOnlyFilePreview: props.readOnlyFilePreview,
			secondaryAction: tooltipActions
		})
	});
}
function FolderComposerToken(props) {
	const title = props.token.promptText ?? props.token.description ?? props.token.label;
	const path = props.token.promptText ?? props.token.description;
	const removeLabel = props.removeLabel ?? "Remove";
	const chipElement = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "chat.folder-composer-token",
		className: cn("group/composer-token mx-0.5 my-0.5 inline-flex h-6 max-w-[calc(100%_-_0.25rem)] select-none items-center gap-1 overflow-hidden rounded-md border px-1.5 align-baseline font-medium text-foreground text-xs leading-[inherit] transition-[color,box-shadow,border-color]", "group-focus-visible:border-primary", props.readOnly && "focus-visible:border-primary focus-visible:outline-none", "border-border bg-background hover:bg-accent", props.selected && "border-primary ring-1 ring-primary/40", props.className),
		title: path ? void 0 : title,
		"data-composer-token-kind": props.token.kind,
		onMouseDown: props.onMouseDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border-0 bg-accent text-muted-foreground leading-none",
			"data-folder-token-icon": "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTokenIconSlot, {
				icon: props.token.icon ? props.token.icon : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
					className: tokenIconClassName,
					"aria-hidden": true
				}),
				removeLabel,
				onRemove: props.onRemove,
				removeButtonClassName: "size-full rounded-[5px]",
				removeIconClassName: "size-3"
			})
		}), props.children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("whitespace-nowrap! min-w-0 max-w-full truncate break-normal", props.maxWidthClassName),
			children: props.token.label
		})]
	});
	if (!path) return chipElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenPathTooltipContent, { path }),
		side: "top",
		sideOffset: 6,
		delayDuration: 300,
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": props.token.label
		} : void 0,
		children: chipElement
	});
}
function KnowledgeComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.knowledge
	});
}
function ReferenceComposerToken(props) {
	return renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.reference
	});
}
function QuoteComposerToken(props) {
	const quoteTooltipContent = getQuoteTooltipContent(props.token.description, props.token.promptText);
	const tokenElement = renderActiveComposerTokenElement({
		...props,
		icon: tokenIconByKind.quote
	});
	if (!quoteTooltipContent) return tokenElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: QUOTE_TOOLTIP_BODY_CLASS_NAME,
			children: quoteTooltipContent
		}),
		side: "top",
		sideOffset: 6,
		delayDuration: 300,
		showArrow: false,
		contentProps: { className: QUOTE_TOOLTIP_CONTENT_CLASS_NAME },
		triggerProps: props.readOnly ? {
			tabIndex: 0,
			"aria-label": props.token.label
		} : void 0,
		children: tokenElement
	});
}
function PromptVariableComposerToken(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveComposerToken, {
		...props,
		icon: tokenIconByKind.promptVariable,
		colorClassName: "text-info"
	});
}
const composerInputTokenComponentByKind = {
	skill: SkillComposerToken,
	link: LinkComposerToken,
	file: FileComposerToken,
	folder: FolderComposerToken,
	knowledge: KnowledgeComposerToken,
	reference: ReferenceComposerToken,
	quote: QuoteComposerToken,
	promptVariable: PromptVariableComposerToken
};
function ComposerToken(props) {
	const TokenComponent = composerInputTokenComponentByKind[props.token.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenComponent, { ...props });
}
export { normalizeQuoteTokenPromptText as a, formatQuoteTokenPromptText as i, FileComposerToken as n, createComposerLinkToken as r, ComposerToken as t };

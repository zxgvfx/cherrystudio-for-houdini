import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { h as parseTranslateLangCode } from "./PreferenceService-uLlqCRc6.js";
import { i as validateApiKey, n as removeApiKey, r as replaceApiKey, t as normalizeApiKeys } from "./apiKeys-hK08zVk9.js";
import { i as joinApiKeyString, n as formatApiKeys, o as splitApiKeyString } from "./format-BU2M4Rvo.js";
import { a as isWin } from "./platform-YWZQ2_mC.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-yBX61WcV.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as InfoTooltip } from "./info-tooltip-B4gcegN9.js";
import { t as Combobox } from "./combobox-D7zDQ7j5.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as Copy } from "./copy-DLNIVOlq.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as List } from "./list-DvMZwghn.js";
import { t as Minus } from "./minus-B8LlKIu6.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as SquareCheckBig } from "./square-check-big-Dfy9DDVk.js";
import { t as X } from "./x-CZLr1OkN.js";
import { n as createPopup, t as popup } from "./popup-C0FVl5N5.js";
import { n as IntelIcon, r as ApplicationIcon, t as TesseractJsIcon } from "./tesseract-js-CbiYFouk.js";
import { i as Doc2xIcon, n as MistralIcon, r as MineruIcon, t as PaddleocrIcon } from "./paddleocr-BVP_FTLF.js";
import { a as SettingHelpText, c as SettingRowTitle, i as SettingHelpLink, o as SettingHelpTextRow, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-aatUlttR.js";
import { o as useLanguages } from "./translate-piZrmqIV.js";
import { r as validateApiHost } from "./api-CXvQpDj3.js";
import { t as Scrollbar_default } from "./Scrollbar-CJJ8_OkK.js";
import { t as EditIcon_default } from "./EditIcon-DyUHpcDD.js";
import { t as PRESETS_FILE_PROCESSORS } from "./fileProcessing-DD904-PM.js";
const BUILTIN_OCR_PROVIDERS_MAP = {
	tesseract: {
		id: "tesseract",
		name: "Tesseract",
		capabilities: { image: true },
		config: { langs: {
			chi_sim: true,
			chi_tra: true,
			eng: true
		} }
	},
	system: {
		id: "system",
		name: "System",
		config: { langs: isWin ? [parseTranslateLangCode("en-us")] : void 0 },
		capabilities: { image: true }
	},
	paddleocr: {
		id: "paddleocr",
		name: "PaddleOCR",
		config: { apiUrl: "" },
		capabilities: { image: true }
	},
	ovocr: {
		id: "ovocr",
		name: "Intel OV(NPU) OCR",
		config: { langs: isWin ? [parseTranslateLangCode("en-us"), parseTranslateLangCode("zh-cn")] : void 0 },
		capabilities: { image: true }
	}
};
Object.values(BUILTIN_OCR_PROVIDERS_MAP);
const TESSERACT_LANG_MAP = {
	"af-za": "afr",
	"am-et": "amh",
	"ar-sa": "ara",
	"as-in": "asm",
	"az-az": "aze",
	"az-cyrl-az": "aze_cyrl",
	"be-by": "bel",
	"bn-bd": "ben",
	"bo-cn": "bod",
	"bs-ba": "bos",
	"bg-bg": "bul",
	"ca-es": "cat",
	"ceb-ph": "ceb",
	"cs-cz": "ces",
	"zh-cn": "chi_sim",
	"zh-tw": "chi_tra",
	"chr-us": "chr",
	"cy-gb": "cym",
	"da-dk": "dan",
	"de-de": "deu",
	"dz-bt": "dzo",
	"el-gr": "ell",
	"en-us": "eng",
	"enm-gb": "enm",
	"eo-world": "epo",
	"et-ee": "est",
	"eu-es": "eus",
	"fa-ir": "fas",
	"fi-fi": "fin",
	"fr-fr": "fra",
	"frk-de": "frk",
	"frm-fr": "frm",
	"ga-ie": "gle",
	"gl-es": "glg",
	"grc-gr": "grc",
	"gu-in": "guj",
	"ht-ht": "hat",
	"he-il": "heb",
	"hi-in": "hin",
	"hr-hr": "hrv",
	"hu-hu": "hun",
	"iu-ca": "iku",
	"id-id": "ind",
	"is-is": "isl",
	"it-it": "ita",
	"ita-it": "ita_old",
	"jv-id": "jav",
	"ja-jp": "jpn",
	"kn-in": "kan",
	"ka-ge": "kat",
	"kat-ge": "kat_old",
	"kk-kz": "kaz",
	"km-kh": "khm",
	"ky-kg": "kir",
	"ko-kr": "kor",
	"ku-tr": "kur",
	"la-la": "lao",
	"la-va": "lat",
	"lv-lv": "lav",
	"lt-lt": "lit",
	"ml-in": "mal",
	"mr-in": "mar",
	"mk-mk": "mkd",
	"mt-mt": "mlt",
	"ms-my": "msa",
	"my-mm": "mya",
	"ne-np": "nep",
	"nl-nl": "nld",
	"no-no": "nor",
	"or-in": "ori",
	"pa-in": "pan",
	"pl-pl": "pol",
	"pt-pt": "por",
	"ps-af": "pus",
	"ro-ro": "ron",
	"ru-ru": "rus",
	"sa-in": "san",
	"si-lk": "sin",
	"sk-sk": "slk",
	"sl-si": "slv",
	"es-es": "spa",
	"spa-es": "spa_old",
	"sq-al": "sqi",
	"sr-rs": "srp",
	"sr-latn-rs": "srp_latn",
	"sw-tz": "swa",
	"sv-se": "swe",
	"syr-sy": "syr",
	"ta-in": "tam",
	"te-in": "tel",
	"tg-tj": "tgk",
	"tl-ph": "tgl",
	"th-th": "tha",
	"ti-er": "tir",
	"tr-tr": "tur",
	"ug-cn": "uig",
	"uk-ua": "ukr",
	"ur-pk": "urd",
	"uz-uz": "uzb",
	"uz-cyrl-uz": "uzb_cyrl",
	"vi-vn": "vie",
	"yi-us": "yid"
};
var FILE_PROCESSING_FEATURE_SECTIONS = [{
	feature: "image_to_text",
	processors: [
		"system",
		"paddleocr",
		"local-paddleocr",
		"tesseract",
		"mistral",
		"ovocr"
	]
}, {
	feature: "document_to_markdown",
	processors: [
		"mineru",
		"paddleocr",
		"doc2x",
		"mistral",
		"open-mineru"
	]
}];
var PROCESSOR_DISPLAY_META = {
	system: {
		nameKey: "settings.tool.file_processing.processors.system.name",
		descriptionKey: "settings.tool.file_processing.processors.system.description",
		logo: ApplicationIcon,
		apiKeyWebsite: null
	},
	tesseract: {
		nameKey: "settings.tool.file_processing.processors.tesseract.name",
		descriptionKey: "settings.tool.file_processing.processors.tesseract.description",
		logo: TesseractJsIcon,
		apiKeyWebsite: null
	},
	paddleocr: {
		nameKey: "settings.tool.file_processing.processors.paddleocr.name",
		descriptionKey: "settings.tool.file_processing.processors.paddleocr.description",
		logo: PaddleocrIcon,
		apiKeyWebsite: "https://aistudio.baidu.com/paddleocr/"
	},
	"local-paddleocr": {
		nameKey: "settings.tool.file_processing.processors.local_paddleocr.name",
		descriptionKey: "settings.tool.file_processing.processors.local_paddleocr.description",
		logo: PaddleocrIcon,
		apiKeyWebsite: null
	},
	ovocr: {
		nameKey: "settings.tool.file_processing.processors.ovocr.name",
		descriptionKey: "settings.tool.file_processing.processors.ovocr.description",
		logo: IntelIcon,
		apiKeyWebsite: null
	},
	mineru: {
		nameKey: "settings.tool.file_processing.processors.mineru.name",
		descriptionKey: "settings.tool.file_processing.processors.mineru.description",
		logo: MineruIcon,
		apiKeyWebsite: "https://mineru.net/apiManage"
	},
	doc2x: {
		nameKey: "settings.tool.file_processing.processors.doc2x.name",
		descriptionKey: "settings.tool.file_processing.processors.doc2x.description",
		logo: Doc2xIcon,
		apiKeyWebsite: "https://open.noedgeai.com/apiKeys"
	},
	mistral: {
		nameKey: "settings.tool.file_processing.processors.mistral.name",
		descriptionKey: "settings.tool.file_processing.processors.mistral.description",
		logo: MistralIcon,
		apiKeyWebsite: "https://mistral.ai/api-keys"
	},
	"open-mineru": {
		nameKey: "settings.tool.file_processing.processors.open_mineru.name",
		descriptionKey: "settings.tool.file_processing.processors.open_mineru.description",
		logo: MineruIcon,
		apiKeyWebsite: "https://github.com/opendatalab/MinerU/"
	}
};
function createMenuEntry(processor, feature, availableProcessorIds) {
	const capability = processor.capabilities.find((item) => item.feature === feature);
	if (!capability) return null;
	if (!availableProcessorIds.has(processor.id)) return null;
	return {
		key: `${feature}:${processor.id}`,
		feature,
		processor,
		capability
	};
}
function sortEntriesByFeatureOrder(entries) {
	return [...entries].sort((a, b) => {
		const order = FILE_PROCESSING_FEATURE_SECTIONS.find((section) => section.feature === a.feature)?.processors ?? [];
		const aIndex = order.indexOf(a.processor.id);
		const bIndex = order.indexOf(b.processor.id);
		if (aIndex === -1 && bIndex === -1) return a.processor.id.localeCompare(b.processor.id);
		if (aIndex === -1) return 1;
		if (bIndex === -1) return -1;
		return aIndex - bIndex;
	});
}
function getFeatureSections(processors, availableProcessorIds) {
	return FILE_PROCESSING_FEATURE_SECTIONS.map(({ feature }) => {
		return {
			feature,
			entries: sortEntriesByFeatureOrder(processors.map((processor) => createMenuEntry(processor, feature, availableProcessorIds)).filter((entry) => Boolean(entry)))
		};
	}).filter((section) => section.entries.length > 0);
}
function getProcessorNameKey(processorId) {
	return PROCESSOR_DISPLAY_META[processorId].nameKey;
}
function getProcessorDescriptionKey(processorId) {
	return PROCESSOR_DISPLAY_META[processorId].descriptionKey;
}
function getProcessorApiKeyWebsite(processorId) {
	return PROCESSOR_DISPLAY_META[processorId].apiKeyWebsite;
}
function getProcessorLogo(processorId) {
	return PROCESSOR_DISPLAY_META[processorId].logo;
}
function supportsApiSettings(processor) {
	return processor.type === "api";
}
function supportsLanguageConfig(processorId) {
	return processorId === "system" || processorId === "tesseract";
}
function canConfigureLanguageOptions(processorId) {
	return processorId === "tesseract" || isWin;
}
function shouldShowLanguageOptions(processorId) {
	return supportsLanguageConfig(processorId) && canConfigureLanguageOptions(processorId);
}
function getTesseractLanguageCode(languageCode) {
	return TESSERACT_LANG_MAP[languageCode];
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function useFileProcessingApiKeyList({ processorId, apiKeys, onSetApiKeys }) {
	const { t } = useTranslation();
	const [pendingNewKey, setPendingNewKey] = (0, import_react.useState)(null);
	const [keys, setKeys] = (0, import_react.useState)(() => normalizeApiKeys(apiKeys));
	const updateKeys = (0, import_react.useCallback)(async (nextKeys) => {
		const normalizedKeys = normalizeApiKeys(nextKeys);
		await onSetApiKeys(processorId, normalizedKeys);
		setKeys(normalizedKeys);
	}, [onSetApiKeys, processorId]);
	const addPendingKey = (0, import_react.useCallback)(() => {
		setPendingNewKey((current) => current ?? { id: Date.now().toString() });
	}, []);
	const addKey = (0, import_react.useCallback)(async (key) => {
		const result = validateApiKey(key, keys, t("settings.provider.api.key.error.empty"), t("settings.provider.api.key.error.duplicate"));
		if (!result.isValid) return result;
		await updateKeys([...keys, key]);
		setPendingNewKey(null);
		return { isValid: true };
	}, [
		keys,
		t,
		updateKeys
	]);
	const updateKey = (0, import_react.useCallback)(async (index, key) => {
		const result = validateApiKey(key, keys.filter((_, itemIndex) => itemIndex !== index), t("settings.provider.api.key.error.empty"), t("settings.provider.api.key.error.duplicate"));
		if (!result.isValid) return result;
		const nextKeys = replaceApiKey(keys, index, key);
		if (!nextKeys) return {
			isValid: false,
			error: "Invalid index"
		};
		await updateKeys(nextKeys);
		return { isValid: true };
	}, [
		keys,
		t,
		updateKeys
	]);
	const removeKey = (0, import_react.useCallback)(async (index) => {
		const nextKeys = removeApiKey(keys, index);
		if (nextKeys) await updateKeys(nextKeys);
	}, [keys, updateKeys]);
	const updateListItem = (0, import_react.useCallback)((item, key) => {
		return item.isNew ? addKey(key) : updateKey(item.index, key);
	}, [addKey, updateKey]);
	const removeListItem = (0, import_react.useCallback)(async (item) => {
		if (item.isNew) {
			setPendingNewKey(null);
			return;
		}
		await removeKey(item.index);
	}, [removeKey]);
	return {
		keys,
		displayItems: (0, import_react.useMemo)(() => {
			const savedItems = keys.map((key, index) => ({
				id: `saved-${index}-${key}`,
				key,
				index,
				isNew: false
			}));
			if (!pendingNewKey) return savedItems;
			return [...savedItems, {
				id: pendingNewKey.id,
				key: "",
				index: keys.length,
				isNew: true
			}];
		}, [keys, pendingNewKey]),
		hasPendingNewKey: Boolean(pendingNewKey),
		addPendingKey,
		updateListItem,
		removeListItem
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger$2 = loggerService.withContext("FileProcessingApiKeyList");
function maskFileProcessingApiKey(key) {
	if (!key) return "";
	if (key.length > 24) return `${key.slice(0, 8)}****${key.slice(-8)}`;
	if (key.length > 16) return `${key.slice(0, 4)}****${key.slice(-4)}`;
	if (key.length > 8) return `${key.slice(0, 2)}****${key.slice(-2)}`;
	return key;
}
var FileProcessingApiKeyItem = ({ item, onUpdate, onRemove }) => {
	const { t } = useTranslation();
	const [isEditing, setIsEditing] = (0, import_react.useState)(item.isNew || !item.key.trim());
	const [editValue, setEditValue] = (0, import_react.useState)(item.key);
	const inputRef = (0, import_react.useRef)(null);
	const hasUnsavedChanges = editValue.trim() !== item.key.trim();
	(0, import_react.useEffect)(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);
	(0, import_react.useEffect)(() => {
		setEditValue(item.key);
		setIsEditing(item.isNew || !item.key.trim());
	}, [item.isNew, item.key]);
	const handleSave = async () => {
		try {
			const result = await onUpdate(editValue);
			if (!result.isValid) {
				toast.warning(result.error);
				return;
			}
			setIsEditing(false);
		} catch (error) {
			logger$2.error("Failed to save file processing API key", error);
			toast.error(t("settings.tool.file_processing.errors.save_failed"));
		}
	};
	const handleCancelEdit = () => {
		if (item.isNew || !item.key.trim()) {
			onRemove();
			return;
		}
		setEditValue(item.key);
		setIsEditing(false);
	};
	const handleCopy = () => {
		navigator.clipboard.writeText(item.key).then(() => toast.success(t("common.copied"))).catch((error) => {
			logger$2.error("Failed to copy file processing API key", error);
			toast.error(t("common.copy_failed"));
		});
	};
	const handleRemove = async () => {
		if (await popup.confirm({
			title: t("common.delete_confirm"),
			centered: true,
			okText: t("common.confirm"),
			cancelText: t("common.cancel")
		})) try {
			await onRemove();
		} catch (error) {
			logger$2.error("Failed to remove file processing API key", error);
			toast.error(t("settings.tool.file_processing.errors.save_failed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.file-processing-api-key",
		className: "flex min-h-10 items-center justify-between gap-2 border-border-subtle border-b px-3 py-2 last:border-b-0",
		children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref: inputRef,
			type: "password",
			value: editValue,
			onChange: (event) => setEditValue(event.target.value),
			onKeyDown: (event) => {
				if (event.key === "Enter") handleSave();
			},
			placeholder: t("settings.provider.api.key.new_key.placeholder"),
			className: "h-8 min-w-0 flex-1 rounded-lg border-border-subtle bg-foreground/3 text-sm leading-tight placeholder:text-muted-foreground md:text-sm",
			spellCheck: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: hasUnsavedChanges ? "default" : "ghost",
				size: "icon-sm",
				"aria-label": t("common.save"),
				onClick: () => void handleSave(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				"aria-label": t("common.cancel"),
				onClick: handleCancelEdit,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			className: "h-auto min-w-0 flex-1 justify-start rounded-none px-0 py-0 text-left text-muted-foreground text-sm leading-tight shadow-none hover:bg-transparent hover:text-foreground",
			onClick: handleCopy,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: maskFileProcessingApiKey(item.key)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.copy"),
					onClick: handleCopy,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.edit"),
					onClick: () => setIsEditing(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon_default, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": t("common.delete"),
					onClick: () => void handleRemove(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
				})
			]
		})] })
	});
};
const FileProcessingApiKeyList = ({ processorId, apiKeys, onSetApiKeys }) => {
	const { t } = useTranslation();
	const { keys, displayItems, hasPendingNewKey, addPendingKey, updateListItem, removeListItem } = useFileProcessingApiKeyList({
		processorId,
		apiKeys,
		onSetApiKeys
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.file-processing-api-key",
		className: "py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border-subtle bg-foreground/2",
			children: displayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 text-muted-foreground text-xs leading-tight",
				children: t("error.no_api_key")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
				className: "max-h-[60vh] overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: displayItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileProcessingApiKeyItem, {
					item,
					onUpdate: (key) => updateListItem(item, key),
					onRemove: () => removeListItem(item)
				}, item.id)) })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3.5 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 text-muted-foreground text-xs leading-tight",
				children: t("settings.provider.api_key.tip")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				className: cn("h-7 rounded-lg px-3", keys.length === 0 ? void 0 : "shrink-0"),
				onClick: addPendingKey,
				autoFocus: keys.length === 0,
				disabled: hasPendingNewKey,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), t("common.add")]
			})]
		})]
	});
};
var PopupContainer = ({ processorId, apiKeys, onSetApiKeys, title, open, resolve }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !nextOpen && resolve(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-150",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-sm",
				children: title || t("settings.provider.api.key.list.title")
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileProcessingApiKeyList, {
				processorId,
				apiKeys,
				onSetApiKeys
			})]
		})
	});
};
const FileProcessingApiKeyListPopup = createPopup(PopupContainer, { dismissResult: null });
const PADDLEOCR_DEPLOYMENT_URL = "https://github.com/PaddlePaddle/PaddleOCR";
function PaddleOcrDeploymentInfo() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.paddle-ocr-deployment-info",
		className: "border-border-subtle border-t pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingHelpTextRow, {
			className: "flex-wrap gap-x-1.5 gap-y-1 py-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpText, {
				className: "text-xs leading-relaxed",
				children: t("settings.tool.file_processing.processors.paddleocr.deployment.description")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingHelpLink, {
				href: PADDLEOCR_DEPLOYMENT_URL,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-1",
				children: [t("settings.tool.file_processing.processors.paddleocr.deployment.docs"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 10 })]
			})]
		})
	});
}
var PADDLEOCR_OCR_MODEL_OPTIONS = ["PP-OCRv6", "PP-OCRv5"];
var PADDLEOCR_DOCUMENT_MODEL_OPTIONS = [
	"PaddleOCR-VL-1.5",
	"PaddleOCR-VL-1.6",
	"PaddleOCR-VL",
	"PP-StructureV3"
];
function PaddleOcrModelSettings({ feature, value, onChange }) {
	const { t } = useTranslation();
	const modelOptions = feature === "image_to_text" ? PADDLEOCR_OCR_MODEL_OPTIONS : PADDLEOCR_DOCUMENT_MODEL_OPTIONS;
	const selectedValue = value.trim() || modelOptions[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.paddle-ocr-model-settings",
		className: "flex flex-col gap-3 border-border-subtle border-t pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
			className: "items-center gap-4 py-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
				className: "w-24 shrink-0",
				children: t("settings.tool.file_processing.processors.paddleocr.fields.parse_model")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: selectedValue,
					onValueChange: onChange,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						size: "sm",
						"aria-label": t("settings.tool.file_processing.processors.paddleocr.fields.parse_model"),
						className: "w-full max-w-65",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						align: "start",
						className: "w-56",
						children: modelOptions.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: model,
							className: "text-sm",
							children: model
						}, model))
					})]
				})
			})]
		})
	});
}
var SIZE_TO_PX = {
	sm: 16,
	md: 22,
	lg: 36
};
function ProcessorAvatar({ processorId, size = "sm", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getProcessorLogo(processorId).Avatar, {
		size: SIZE_TO_PX[size],
		shape: "rounded",
		className: cn("rounded", className)
	});
}
function TesseractLanguagePacks({ options, selectedLanguages, onChange }) {
	const { t } = useTranslation();
	const renderSelectedLanguages = (0, import_react.useCallback)((selectedValue, availableOptions) => {
		const selectedValues = Array.isArray(selectedValue) ? selectedValue : [];
		if (selectedValues.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "settings.tesseract-language-packs",
			className: "text-muted-foreground",
			children: t("common.select")
		});
		const firstValue = selectedValues[0];
		const firstOption = availableOptions.find((option) => option.value === firstValue);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.tesseract-language-packs",
			className: "flex min-w-0 items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate rounded bg-primary/10 px-2 py-0.5 text-primary text-xs",
				children: firstOption?.label ?? firstValue
			}), selectedValues.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs",
				children: ["+", selectedValues.length - 1]
			})]
		});
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.tesseract-language-packs",
		className: "flex flex-col gap-3 border-border-subtle border-t pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
			className: "items-center gap-4 py-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
				className: "w-24 shrink-0",
				children: t("settings.tool.file_processing.fields.languages")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
					multiple: true,
					width: 220,
					value: selectedLanguages,
					options,
					onChange,
					renderValue: renderSelectedLanguages,
					searchable: false,
					placeholder: t("common.select"),
					emptyText: t("common.no_results")
				})
			})]
		})
	});
}
var logger$1 = loggerService.withContext("ProcessorPanel");
function ProcessorPanel({ entry, entries, onSelectEntry, onSetApiKeys, onSetCapabilityField, onSetDefaultProcessor, onSetLanguageOptions }) {
	const { t } = useTranslation();
	const { languages } = useLanguages();
	const processor = entry.processor;
	const processorName = t(getProcessorNameKey(processor.id));
	const apiKeyWebsite = getProcessorApiKeyWebsite(processor.id);
	const featureTitleKey = entry.feature === "image_to_text" ? "settings.tool.file_processing.features.image_to_text.title" : "settings.tool.file_processing.features.document_to_markdown.title";
	const featureTooltipKey = entry.feature === "image_to_text" ? "settings.tool.file_processing.features.image_to_text.tooltip" : "settings.tool.file_processing.features.document_to_markdown.tooltip";
	const featureTitle = t(featureTitleKey);
	const showApiSettings = supportsApiSettings(processor);
	const showLanguageOptions = shouldShowLanguageOptions(processor.id);
	const hasProcessorDetails = showApiSettings || processor.id === "paddleocr" || processor.id === "local-paddleocr" || processor.id === "system" || showLanguageOptions;
	const [apiKeysInput, setApiKeysInput] = (0, import_react.useState)(() => joinApiKeyString(processor.apiKeys ?? []));
	const [apiHostInput, setApiHostInput] = (0, import_react.useState)(entry.capability.apiHost ?? "");
	const [modelIdInput, setModelIdInput] = (0, import_react.useState)(entry.capability.modelId ?? "");
	(0, import_react.useEffect)(() => {
		setApiKeysInput(joinApiKeyString(processor.apiKeys ?? []));
		setApiHostInput(entry.capability.apiHost ?? "");
		setModelIdInput(entry.capability.modelId ?? "");
	}, [entry.key]);
	const languageOptions = (0, import_react.useMemo)(() => {
		if (!languages) return [];
		if (processor.id === "tesseract") return languages.map((language) => {
			const tesseractCode = getTesseractLanguageCode(language.langCode);
			if (!tesseractCode) return null;
			return {
				value: tesseractCode,
				label: language.value
			};
		}).filter((option) => Boolean(option));
		return languages.map((language) => ({
			value: language.langCode,
			label: `${language.emoji} ${language.value}`
		}));
	}, [languages, processor.id]);
	const selectedLanguages = processor.options?.langs ?? [];
	const persist = (0, import_react.useCallback)(async (action, actionName) => {
		try {
			await action();
			return true;
		} catch (error) {
			logger$1.error(`Failed to ${actionName}`, error);
			toast.error(t("settings.tool.file_processing.errors.save_failed"));
			return false;
		}
	}, [t]);
	const handleApiKeysBlur = (0, import_react.useCallback)(async () => {
		await persist(() => onSetApiKeys(processor.id, splitApiKeyString(formatApiKeys(apiKeysInput))), "save API keys");
	}, [
		apiKeysInput,
		onSetApiKeys,
		persist,
		processor.id
	]);
	const openApiKeyList = (0, import_react.useCallback)(async () => {
		await FileProcessingApiKeyListPopup.show({
			processorId: processor.id,
			apiKeys: splitApiKeyString(formatApiKeys(apiKeysInput)),
			onSetApiKeys: async (processorId, apiKeys) => {
				await onSetApiKeys(processorId, apiKeys);
				setApiKeysInput(joinApiKeyString(apiKeys));
			},
			title: `${processorName} ${t("settings.provider.api.key.list.title")}`
		});
	}, [
		apiKeysInput,
		onSetApiKeys,
		processor.id,
		processorName,
		t
	]);
	const handleApiHostBlur = (0, import_react.useCallback)(async () => {
		const trimmedApiHost = apiHostInput.trim();
		setApiHostInput(trimmedApiHost);
		if (!validateApiHost(trimmedApiHost)) {
			toast.warning(t("settings.tool.file_processing.errors.invalid_api_host"));
			return;
		}
		await persist(() => onSetCapabilityField(processor.id, entry.feature, "apiHost", trimmedApiHost), "save API host");
	}, [
		apiHostInput,
		entry.feature,
		onSetCapabilityField,
		persist,
		processor.id,
		t
	]);
	const setModelIdInputAndPersist = (0, import_react.useCallback)(async (value) => {
		setModelIdInput(value);
		await persist(() => onSetCapabilityField(processor.id, entry.feature, "modelId", value), "save model id");
	}, [
		entry.feature,
		onSetCapabilityField,
		persist,
		processor.id
	]);
	const handleProcessorChange = (0, import_react.useCallback)((processorId) => {
		const selectedEntry = entries.find((item) => item.processor.id === processorId);
		if (!selectedEntry || selectedEntry.key === entry.key) return;
		onSelectEntry(selectedEntry);
		persist(() => onSetDefaultProcessor(selectedEntry.feature, selectedEntry.processor.id), "set default processor").then((saved) => {
			if (!saved) onSelectEntry(entry);
		});
	}, [
		entries,
		entry,
		onSelectEntry,
		onSetDefaultProcessor,
		persist
	]);
	const handleLanguagesChange = (0, import_react.useCallback)(async (value) => {
		const processorId = processor.id;
		if (!supportsLanguageConfig(processorId)) return;
		const langs = Array.isArray(value) ? value : [];
		await persist(() => onSetLanguageOptions(processorId, langs), "save language options");
	}, [
		onSetLanguageOptions,
		persist,
		processor.id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		className: "flex w-full flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex min-h-8 flex-wrap items-center justify-between gap-3", hasProcessorDetails && "mb-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, {
					className: "h-8 min-w-0 justify-start gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: featureTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTooltip, {
						content: t(featureTooltipKey),
						placement: "right",
						iconProps: {
							size: 13,
							color: "currentColor",
							className: "shrink-0 opacity-80"
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: processor.id,
					onValueChange: handleProcessorChange,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						size: "sm",
						className: "h-8 w-56 text-sm",
						"aria-label": featureTitle,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("common.select") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: entries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: item.processor.id,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessorAvatar, { processorId: item.processor.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(getProcessorNameKey(item.processor.id)) })]
						})
					}, item.key)) })]
				})]
			}),
			showApiSettings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-border-subtle border-t pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
							className: "font-medium",
							children: t("settings.tool.file_processing.fields.api_key")
						}), apiKeyWebsite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpLink, {
							className: "text-xs leading-5",
							target: "_blank",
							href: apiKeyWebsite,
							children: t("settings.provider.get_api_key")
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: apiKeysInput,
							onChange: (event) => setApiKeysInput(event.target.value),
							onBlur: () => void handleApiKeysBlur(),
							placeholder: t("settings.tool.file_processing.fields.api_keys_placeholder"),
							spellCheck: false,
							className: "min-w-0 flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("settings.provider.api.key.list.open"),
							delay: 500,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "icon-sm",
								className: "size-8 shrink-0 text-muted-foreground shadow-none hover:text-foreground",
								"aria-label": t("settings.provider.api.key.list.open"),
								onClick: () => void openApiKeyList(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 14 })
							})
						})]
					})]
				}), entry.capability.apiHost !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 border-border-subtle border-t pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
						className: "font-medium",
						children: t("settings.tool.file_processing.fields.api_base_url")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: apiHostInput,
						onChange: (event) => setApiHostInput(event.target.value),
						onBlur: () => void handleApiHostBlur(),
						placeholder: t("settings.provider.api_host")
					})]
				}) : null]
			}) : null,
			processor.id === "paddleocr" && entry.capability.modelId !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaddleOcrModelSettings, {
				feature: entry.capability.feature,
				value: modelIdInput,
				onChange: (value) => void setModelIdInputAndPersist(value)
			}) : null,
			processor.id === "paddleocr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaddleOcrDeploymentInfo, {}) : null,
			processor.id === "local-paddleocr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 border-border-subtle border-t pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
					className: "items-start justify-start gap-2 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
						size: 13,
						className: "mt-0.5 shrink-0 text-success"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
							className: "text-success text-xs",
							children: t("settings.tool.file_processing.processors.local_paddleocr.status.local")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpText, {
							className: "mt-1 text-xs",
							children: t(getProcessorDescriptionKey(processor.id))
						})]
					})]
				})
			}) : null,
			processor.id === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 border-border-subtle border-t pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, {
					className: "items-start justify-start gap-2 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
						size: 13,
						className: "mt-0.5 shrink-0 text-success"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, {
						className: "text-success text-xs",
						children: t("settings.tool.file_processing.processors.system.status.available")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingHelpText, {
						className: "mt-1 text-xs",
						children: t("settings.tool.file_processing.processors.system.status.no_configuration")
					})] })]
				})
			}) : null,
			showLanguageOptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TesseractLanguagePacks, {
				options: languageOptions,
				selectedLanguages,
				onChange: (value) => void handleLanguagesChange(value)
			}) : null
		]
	});
}
var logger = loggerService.withContext("useAvailableFileProcessors");
function useAvailableFileProcessors() {
	const [availableProcessors, setAvailableProcessors] = (0, import_react.useState)(() => ({
		processorIds: /* @__PURE__ */ new Set(),
		status: "loading"
	}));
	(0, import_react.useEffect)(() => {
		let mounted = true;
		ipcApi.request("file_processing.list_available_processors").then(({ processorIds }) => {
			if (mounted) setAvailableProcessors({
				processorIds: new Set(processorIds),
				status: "ready"
			});
		}).catch((error) => {
			logger.warn("Failed to list available file processors", error);
			if (mounted) setAvailableProcessors({
				processorIds: /* @__PURE__ */ new Set(),
				status: "error"
			});
		});
		return () => {
			mounted = false;
		};
	}, []);
	return availableProcessors;
}
var FILE_PROCESSING_KEYS = {
	defaultDocumentProcessor: "feature.file_processing.default_document_to_markdown",
	defaultImageProcessor: "feature.file_processing.default_image_to_text"
};
var DEFAULT_KEY_BY_FEATURE = {
	document_to_markdown: "defaultDocumentProcessor",
	image_to_text: "defaultImageProcessor"
};
function useFileProcessingPreferences() {
	const [preferences, setPreferences] = useMultiplePreferences(FILE_PROCESSING_KEYS);
	const [overrides, setOverrides] = usePreference("feature.file_processing.overrides");
	const processors = (0, import_react.useMemo)(() => {
		return PRESETS_FILE_PROCESSORS.map((preset) => {
			const override = overrides[preset.id];
			return {
				...preset,
				...override,
				capabilities: preset.capabilities.map((capability) => ({
					...capability,
					...override?.capabilities?.[capability.feature]
				}))
			};
		});
	}, [overrides]);
	const setDefaultProcessor = (0, import_react.useCallback)(async (feature, processorId) => {
		await setPreferences({ [DEFAULT_KEY_BY_FEATURE[feature]]: processorId });
	}, [setPreferences]);
	const updateProcessor = (0, import_react.useCallback)(async (processorId, patch) => {
		await setOverrides({
			...overrides,
			[processorId]: {
				...overrides[processorId],
				...patch
			}
		});
	}, [overrides, setOverrides]);
	const setApiKeys = (0, import_react.useCallback)(async (processorId, apiKeys) => {
		await updateProcessor(processorId, { apiKeys });
	}, [updateProcessor]);
	const setCapabilityField = (0, import_react.useCallback)(async (processorId, feature, field, value) => {
		await updateProcessor(processorId, { capabilities: {
			...overrides[processorId]?.capabilities,
			[feature]: {
				...overrides[processorId]?.capabilities?.[feature],
				[field]: value
			}
		} });
	}, [overrides, updateProcessor]);
	const setLanguageOptions = (0, import_react.useCallback)(async (processorId, langs) => {
		await updateProcessor(processorId, { options: {
			...overrides[processorId]?.options,
			langs
		} });
	}, [overrides, updateProcessor]);
	return {
		defaultDocumentProcessor: preferences.defaultDocumentProcessor,
		defaultImageProcessor: preferences.defaultImageProcessor,
		overrides,
		processors,
		setApiKeys,
		setCapabilityField,
		setDefaultProcessor,
		setLanguageOptions
	};
}
export { getFeatureSections as i, useAvailableFileProcessors as n, ProcessorPanel as r, useFileProcessingPreferences as t };

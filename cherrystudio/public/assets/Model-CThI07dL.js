import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { D as isEqualsSameValueZero } from "./isEqual-C7zEE0RK.js";
import { t as isArrayLike } from "./isArrayLike-DSMO0VXj.js";
import { u as toPath } from "./getSymbolsIn-DUZGeWP2.js";
import { i as isObject, r as isIndex } from "./isUndefined-Bgp4g_pC.js";
import { n as isSymbol } from "./toInteger-uNKBnrVl.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as X } from "./x-CpgRfh3_.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { S as SERVER_TOOL, v as MODALITY, y as MODEL_CAPABILITY } from "./model-BOGgSmTN.js";
import { t as ArrowUpDown } from "./arrow-up-down-DPtesJTr.js";
import { t as Boxes } from "./boxes-C247Db2w.js";
import { t as Ear } from "./ear-BJBazDT3.js";
import { t as Eye } from "./eye-CtOlZgqN.js";
import { t as Gift } from "./gift-ClN4jnyi.js";
import { t as Globe } from "./globe-D0ZAMdcJ.js";
import { t as Lightbulb } from "./lightbulb-CGGEqCJc.js";
import { t as Video } from "./video-B09HY0Qm.js";
import { t as Wrench } from "./wrench-BqVRRCKS.js";
import { c as isBuiltinWebSearchAvailable, k as isFreeModel } from "./provider-bQl8RVRp.js";
function flatten(arr, depth = 1) {
	const result = [];
	const flooredDepth = Math.floor(depth);
	const recursive = (arr$1, currentDepth) => {
		for (let i = 0; i < arr$1.length; i++) {
			const item = arr$1[i];
			if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
			else result.push(item);
		}
	};
	recursive(arr, 0);
	return result;
}
function isIterateeCall(value, index, object) {
	if (!isObject(object)) return false;
	if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) return isEqualsSameValueZero(object[index], value);
	return false;
}
function getPriority(a) {
	if (typeof a === "symbol") return 1;
	if (a === null) return 2;
	if (a === void 0) return 3;
	if (a !== a) return 4;
	return 0;
}
var compareValues = (a, b, order) => {
	if (a !== b) {
		const aPriority = getPriority(a);
		const bPriority = getPriority(b);
		if (aPriority === bPriority && aPriority === 0) {
			if (a < b) return order === "desc" ? 1 : -1;
			if (a > b) return order === "desc" ? -1 : 1;
		}
		return order === "desc" ? bPriority - aPriority : aPriority - bPriority;
	}
	return 0;
};
var regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var regexIsPlainProp = /^\w*$/;
function isKey(value, object) {
	if (Array.isArray(value)) return false;
	if (typeof value === "number" || typeof value === "boolean" || value == null || isSymbol(value)) return true;
	return typeof value === "string" && (regexIsPlainProp.test(value) || !regexIsDeepProp.test(value)) || object != null && Object.hasOwn(object, value);
}
function orderBy(collection, criteria, orders, guard) {
	if (collection == null) return [];
	orders = guard ? void 0 : orders;
	if (!Array.isArray(collection)) collection = Object.values(collection);
	if (!Array.isArray(criteria)) criteria = criteria == null ? [null] : [criteria];
	if (criteria.length === 0) criteria = [null];
	if (!Array.isArray(orders)) orders = orders == null ? [] : [orders];
	orders = orders.map((order) => String(order));
	const getValueByNestedPath = (object, path) => {
		let target = object;
		for (let i = 0; i < path.length && target != null; ++i) target = target[path[i]];
		return target;
	};
	const getValueByCriterion = (criterion, object) => {
		if (object == null || criterion == null) return object;
		if (typeof criterion === "object" && "key" in criterion) {
			if (Object.hasOwn(object, criterion.key)) return object[criterion.key];
			return getValueByNestedPath(object, criterion.path);
		}
		if (typeof criterion === "function") return criterion(object);
		if (Array.isArray(criterion)) return getValueByNestedPath(object, criterion);
		if (typeof object === "object") return object[criterion];
		return object;
	};
	const preparedCriteria = criteria.map((criterion) => {
		if (Array.isArray(criterion) && criterion.length === 1) criterion = criterion[0];
		if (criterion == null || typeof criterion === "function" || Array.isArray(criterion) || isKey(criterion)) return criterion;
		return {
			key: criterion,
			path: toPath(criterion)
		};
	});
	return collection.map((item) => ({
		original: item,
		criteria: preparedCriteria.map((criterion) => getValueByCriterion(criterion, item))
	})).slice().sort((a, b) => {
		for (let i = 0; i < preparedCriteria.length; i++) {
			const comparedResult = compareValues(a.criteria[i], b.criteria[i], orders[i]);
			if (comparedResult !== 0) return comparedResult;
		}
		return 0;
	}).map((item) => item.original);
}
function sortBy(collection, ...criteria) {
	const length = criteria.length;
	if (length > 1 && isIterateeCall(collection, criteria[0], criteria[1])) criteria = [];
	else if (length > 2 && isIterateeCall(criteria[0], criteria[1], criteria[2])) criteria = [criteria[0]];
	return orderBy(collection, flatten(criteria), ["asc"]);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CustomTag = ({ children, icon, color, size = 12, style, tooltip, closable = false, onClose, onClick, onContextMenu, disabled, inactive, className = "" }) => {
	const actualColor = inactive ? "#aaaaaa" : color;
	const tagContent = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.custom-tag",
		className: `inline-flex items-center gap-1 rounded-full whitespace-nowrap relative transition-opacity duration-200 ${!disabled && onClick ? "cursor-pointer hover:opacity-80" : disabled ? "cursor-not-allowed" : "cursor-auto"} ${className}`,
		style: {
			padding: `${size / 3}px ${closable ? size * 1.8 : size * .8}px ${size / 3}px ${size * .8}px`,
			color: actualColor,
			backgroundColor: actualColor + "20",
			fontSize: `${size}px`,
			lineHeight: 1,
			...style
		},
		onClick: disabled ? void 0 : onClick,
		onContextMenu: disabled ? void 0 : onContextMenu,
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center justify-center",
				style: {
					fontSize: `${size}px`,
					color: "currentColor"
				},
				children: icon
			}),
			children,
			closable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 hover:bg-[#da8a8a] hover:text-white",
				style: {
					right: `${size * .2}px`,
					top: `${size * .2}px`,
					bottom: `${size * .2}px`,
					fontSize: `${size * .8}px`,
					color: actualColor,
					aspectRatio: 1
				},
				onClick: (e) => {
					e.stopPropagation();
					onClose?.();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: size * .8 })
			})
		]
	}), [
		actualColor,
		children,
		closable,
		disabled,
		icon,
		onClick,
		onClose,
		onContextMenu,
		size,
		style,
		className
	]);
	return tooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltip,
		delay: 300,
		children: tagContent
	}) : tagContent;
};
var CustomTag_default = (0, import_react.memo)(CustomTag);
const AudioTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#13c2c2",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ear, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.audio") : void 0,
		...restProps,
		children: showLabel ? t("models.type.audio") : ""
	});
};
const EmbeddingTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#FFA500",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.embedding") : void 0,
		...restProps,
		children: showLabel ? t("models.type.embedding") : ""
	});
};
const FreeTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#7cb305",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.free") : void 0,
		...restProps,
		children: showLabel ? t("models.type.free") : ""
	});
};
const ReasoningTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#6372bd",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.reasoning") : void 0,
		...restProps,
		children: showLabel ? t("models.type.reasoning") : ""
	});
};
const RerankerTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#6495ED",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.rerank") : void 0,
		...restProps,
		children: showLabel ? t("models.type.rerank") : ""
	});
};
const ToolsCallingTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#f18737",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.function_calling") : void 0,
		...restProps,
		children: showLabel ? t("models.type.function_calling") : ""
	});
};
const VideoTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#722ed1",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.video") : void 0,
		...restProps,
		children: showLabel ? t("models.type.video") : ""
	});
};
const VisionTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#00b96b",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.vision") : void 0,
		...restProps,
		children: showLabel ? t("models.type.vision") : ""
	});
};
const WebSearchTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#1677ff",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.websearch") : void 0,
		...restProps,
		children: showLabel ? t("models.type.websearch") : ""
	});
};
const MODEL_DISPLAY_TAGS = [
	...[
		MODEL_CAPABILITY.IMAGE_RECOGNITION,
		MODEL_CAPABILITY.AUDIO_RECOGNITION,
		MODEL_CAPABILITY.VIDEO_RECOGNITION,
		MODEL_CAPABILITY.REASONING,
		MODEL_CAPABILITY.FUNCTION_CALL,
		MODEL_CAPABILITY.EMBEDDING,
		MODEL_CAPABILITY.RERANK
	],
	SERVER_TOOL.WEB_SEARCH,
	"free"
];
var INPUT_MODALITY_BY_DISPLAY_TAG = {
	[MODEL_CAPABILITY.IMAGE_RECOGNITION]: MODALITY.IMAGE,
	[MODEL_CAPABILITY.AUDIO_RECOGNITION]: MODALITY.AUDIO,
	[MODEL_CAPABILITY.VIDEO_RECOGNITION]: MODALITY.VIDEO
};
function isModelTagVisible(tag, { showFree = true, showReasoning = true, showToolsCalling = true } = {}) {
	if (tag === "free") return showFree;
	if (tag === MODEL_CAPABILITY.REASONING) return showReasoning;
	if (tag === MODEL_CAPABILITY.FUNCTION_CALL) return showToolsCalling;
	return true;
}
function modelMatchesDisplayTag(model, tag, provider) {
	if (tag === "free") return isFreeModel(model);
	if (tag === SERVER_TOOL.WEB_SEARCH) return provider ? isBuiltinWebSearchAvailable(model, provider) : false;
	const inputModality = INPUT_MODALITY_BY_DISPLAY_TAG[tag];
	return model.capabilities.includes(tag) || Boolean(inputModality && model.inputModalities?.includes(inputModality));
}
function getModelDisplayTags(model, options, provider) {
	return MODEL_DISPLAY_TAGS.filter((tag) => isModelTagVisible(tag, options) && modelMatchesDisplayTag(model, tag, provider));
}
var MODEL_TAG_COMPONENTS = {
	"image-recognition": VisionTag,
	"audio-recognition": AudioTag,
	"video-recognition": VideoTag,
	"web-search": WebSearchTag,
	reasoning: ReasoningTag,
	"function-call": ToolsCallingTag,
	embedding: EmbeddingTag,
	rerank: RerankerTag,
	free: FreeTag
};
function ModelTag({ tag, size = 12, showTooltip, showLabel = false, ...restProps }) {
	const TagComponent = MODEL_TAG_COMPONENTS[tag];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagComponent, {
		size,
		showTooltip,
		showLabel,
		...restProps
	});
}
export { CustomTag_default as a, modelMatchesDisplayTag as i, ModelTag as n, sortBy as o, getModelDisplayTags as r, MODEL_DISPLAY_TAGS as t };

import { g as __toESM } from "./chunk-st2fFX3F.js";
import { b as LanguageSelect_default } from "./LanguageSelect-DvaTt7Ui.js";
import { aL as ArrowLeftOutlined_default, aX as SwapOutlined_default, ai as EnterOutlined_default, c as init_es$2, cQ as merge, ci as init_omit, cj as omit, co as LoadingOutlined_default, cy as CloseOutlined_default, d5 as init_es$1, d6 as FastColor, dh as init_es, dp as unit, eV as defaultLanguage, ew as require_classnames, ey as i18n_default, ez as useTranslation, f3 as loggerService } from "./es-C7gg5F5w.js";
import { aL as getAssistantMessage, aO as getUserMessage, ax as fetchChatCompletion, bC as MessageErrorBoundary_default, bV as useTranslate, c4 as translateText, cb as MessageContent_default, cw as useHotkeys, d as store_default, dg as useTheme, di as button_default, e1 as useTimer, eF as input_default, eN as divider_default, eP as col_default$1, ef as useTopicMessages, eg as useAssistant, ej as useDefaultModel, eq as Scrollbar_default, et as typography_default, f as useAppSelector, f4 as avatar_default, f9 as select_default, fS as useSettings, fX as ChunkType, fZ as formatErrorMessage, fh as pickClosable, fi as useClosable, fk as alert_default, fl as cancelThrottledBlockUpdate, fo as throttledBlockUpdate, fr as abortCompletion, fs as ConversationService, g0 as isAbortError, g5 as newMessagesActions, g6 as selectMessagesForTopic, gS as getDefaultTopic, gc as getMainTextContent, ge as updateOneBlock, gf as upsertManyBlocks, gg as upsertOneBlock, iK as runAsyncFunction, iN as classNames, iz as getModelLogo, jV as isMac, jY as IpcChannel, k7 as databases_default, kG as LanguagesEnum, kb as createMainTextBlock, kc as createThinkingBlock, ke as require_lodash, kf as AssistantMessageStatus, kg as MessageBlockStatus, kl as ThemeMode } from "./store-C0piQzxG.js";
import { b as require_react } from "./react-Cs7_W7Sm.js";
import { b as require_jsx_runtime } from "./jsx-runtime-VX_aOJrC.js";
import { C as CopyIcon_default, S as space_default, W as tooltip_default, X as isPresetColor, Y as isPresetStatusColor, aG as wave_default, aQ as replaceElement, aT as genPresetColor, aU as genStyleHooks, aV as genSubStyleComponent, a_ as resetComponent, b7 as ConfigContext, bq as dt } from "./ImageViewer-DJ7yIMNp.js";
import { b as CircleArrowLeft } from "./circle-arrow-left-d1czQReV.js";
import { b as Copy } from "./copy-D3xZcu-G.js";
import { b as FileText } from "./file-text-CLQ4i-wx.js";
import { b as Languages } from "./languages-DQ--Dzel.js";
import { b as Lightbulb } from "./lightbulb-B033avh-.js";
import { b as MessageSquare } from "./message-square-izgj7kkC.js";
import { b as Pin } from "./pin-AiYhAgYo.js";
var col_default = col_default$1;
init_es();
init_es$1();
const genBaseStyle = (token) => {
	const { paddingXXS, lineWidth, tagPaddingHorizontal, componentCls, calc } = token;
	const paddingInline = calc(tagPaddingHorizontal).sub(lineWidth).equal();
	const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
	return {
		[componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
			display: "inline-block",
			height: "auto",
			marginInlineEnd: token.marginXS,
			paddingInline,
			fontSize: token.tagFontSize,
			lineHeight: token.tagLineHeight,
			whiteSpace: "nowrap",
			background: token.defaultBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderRadius: token.borderRadiusSM,
			opacity: 1,
			transition: `all ${token.motionDurationMid}`,
			textAlign: "start",
			position: "relative",
			[`&${componentCls}-rtl`]: { direction: "rtl" },
			"&, a, a:hover": { color: token.defaultColor },
			[`${componentCls}-close-icon`]: {
				marginInlineStart: iconMarginInline,
				fontSize: token.tagIconSize,
				color: token.colorIcon,
				cursor: "pointer",
				transition: `all ${token.motionDurationMid}`,
				"&:hover": { color: token.colorTextHeading }
			},
			[`&${componentCls}-has-color`]: {
				borderColor: "transparent",
				[`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: { color: token.colorTextLightSolid }
			},
			"&-checkable": {
				backgroundColor: "transparent",
				borderColor: "transparent",
				cursor: "pointer",
				[`&:not(${componentCls}-checkable-checked):hover`]: {
					color: token.colorPrimary,
					backgroundColor: token.colorFillSecondary
				},
				"&:active, &-checked": { color: token.colorTextLightSolid },
				"&-checked": {
					backgroundColor: token.colorPrimary,
					"&:hover": { backgroundColor: token.colorPrimaryHover }
				},
				"&:active": { backgroundColor: token.colorPrimaryActive }
			},
			"&-hidden": { display: "none" },
			[`> ${token.iconCls} + span, > span + ${token.iconCls}`]: { marginInlineStart: paddingInline }
		}),
		[`${componentCls}-borderless`]: {
			borderColor: "transparent",
			background: token.tagBorderlessBg
		}
	};
};
const prepareToken = (token) => {
	const { lineWidth, fontSizeIcon, calc } = token;
	const tagFontSize = token.fontSizeSM;
	const tagToken = merge(token, {
		tagFontSize,
		tagLineHeight: unit(calc(token.lineHeightSM).mul(tagFontSize).equal()),
		tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(),
		tagPaddingHorizontal: 8,
		tagBorderlessBg: token.defaultBg
	});
	return tagToken;
};
const prepareComponentToken = (token) => ({
	defaultBg: new FastColor(token.colorFillQuaternary).onBackground(token.colorBgContainer).toHexString(),
	defaultColor: token.colorText
});
var style_default = genStyleHooks("Tag", (token) => {
	const tagToken = prepareToken(token);
	return genBaseStyle(tagToken);
}, prepareComponentToken);
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
var __rest$1 = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
const CheckableTag = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, style, className, checked, children, icon, onChange, onClick } = props, restProps = __rest$1(props, [
		"prefixCls",
		"style",
		"className",
		"checked",
		"children",
		"icon",
		"onChange",
		"onClick"
	]);
	const { getPrefixCls, tag } = import_react.useContext(ConfigContext);
	const handleClick = (e) => {
		onChange === null || onChange === void 0 || onChange(!checked);
		onClick === null || onClick === void 0 || onClick(e);
	};
	const prefixCls = getPrefixCls("tag", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default(prefixCls);
	const cls = (0, import_classnames$1.default)(prefixCls, `${prefixCls}-checkable`, { [`${prefixCls}-checkable-checked`]: checked }, tag === null || tag === void 0 ? void 0 : tag.className, className, hashId, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("span", Object.assign({}, restProps, {
		ref,
		style: Object.assign(Object.assign({}, style), tag === null || tag === void 0 ? void 0 : tag.style),
		className: cls,
		onClick: handleClick
	}), icon, /* @__PURE__ */ import_react.createElement("span", null, children)));
});
var CheckableTag_default = CheckableTag;
const genPresetStyle = (token) => genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({ [`${token.componentCls}${token.componentCls}-${colorKey}`]: {
	color: textColor,
	background: lightColor,
	borderColor: lightBorderColor,
	"&-inverse": {
		color: token.colorTextLightSolid,
		background: darkColor,
		borderColor: darkColor
	},
	[`&${token.componentCls}-borderless`]: { borderColor: "transparent" }
} }));
var presetCmp_default = genSubStyleComponent(["Tag", "preset"], (token) => {
	const tagToken = prepareToken(token);
	return genPresetStyle(tagToken);
}, prepareComponentToken);
function capitalize(str) {
	if (typeof str !== "string") return str;
	const ret = str.charAt(0).toUpperCase() + str.slice(1);
	return ret;
}
const genTagStatusStyle = (token, status, cssVariableType) => {
	const capitalizedCssVariableType = capitalize(cssVariableType);
	return { [`${token.componentCls}${token.componentCls}-${status}`]: {
		color: token[`color${cssVariableType}`],
		background: token[`color${capitalizedCssVariableType}Bg`],
		borderColor: token[`color${capitalizedCssVariableType}Border`],
		[`&${token.componentCls}-borderless`]: { borderColor: "transparent" }
	} };
};
var statusCmp_default = genSubStyleComponent(["Tag", "status"], (token) => {
	const tagToken = prepareToken(token);
	return [
		genTagStatusStyle(tagToken, "success", "Success"),
		genTagStatusStyle(tagToken, "processing", "Info"),
		genTagStatusStyle(tagToken, "error", "Error"),
		genTagStatusStyle(tagToken, "warning", "Warning")
	];
}, prepareComponentToken);
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
const InternalTag = /* @__PURE__ */ import_react.forwardRef((tagProps, ref) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, style, children, icon, color, onClose, bordered = true, visible: deprecatedVisible } = tagProps, props = __rest(tagProps, [
		"prefixCls",
		"className",
		"rootClassName",
		"style",
		"children",
		"icon",
		"color",
		"onClose",
		"bordered",
		"visible"
	]);
	const { getPrefixCls, direction, tag: tagContext } = import_react.useContext(ConfigContext);
	const [visible, setVisible] = import_react.useState(true);
	const domProps = omit(props, ["closeIcon", "closable"]);
	import_react.useEffect(() => {
		if (deprecatedVisible !== void 0) setVisible(deprecatedVisible);
	}, [deprecatedVisible]);
	const isPreset = isPresetColor(color);
	const isStatus = isPresetStatusColor(color);
	const isInternalColor = isPreset || isStatus;
	const tagStyle = Object.assign(Object.assign({ backgroundColor: color && !isInternalColor ? color : void 0 }, tagContext === null || tagContext === void 0 ? void 0 : tagContext.style), style);
	const prefixCls = getPrefixCls("tag", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default(prefixCls);
	const tagClassName = (0, import_classnames.default)(prefixCls, tagContext === null || tagContext === void 0 ? void 0 : tagContext.className, {
		[`${prefixCls}-${color}`]: isInternalColor,
		[`${prefixCls}-has-color`]: color && !isInternalColor,
		[`${prefixCls}-hidden`]: !visible,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-borderless`]: !bordered
	}, className, rootClassName, hashId, cssVarCls);
	const handleCloseClick = (e) => {
		e.stopPropagation();
		onClose === null || onClose === void 0 || onClose(e);
		if (e.defaultPrevented) return;
		setVisible(false);
	};
	const [, mergedCloseIcon] = useClosable(pickClosable(tagProps), pickClosable(tagContext), {
		closable: false,
		closeIconRender: (iconNode$1) => {
			const replacement = /* @__PURE__ */ import_react.createElement("span", {
				className: `${prefixCls}-close-icon`,
				onClick: handleCloseClick
			}, iconNode$1);
			return replaceElement(iconNode$1, replacement, (originProps) => ({
				onClick: (e) => {
					var _a;
					(_a = originProps === null || originProps === void 0 ? void 0 : originProps.onClick) === null || _a === void 0 || _a.call(originProps, e);
					handleCloseClick(e);
				},
				className: (0, import_classnames.default)(originProps === null || originProps === void 0 ? void 0 : originProps.className, `${prefixCls}-close-icon`)
			}));
		}
	});
	const isNeedWave = typeof props.onClick === "function" || children && children.type === "a";
	const iconNode = icon || null;
	const kids = iconNode ? /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, iconNode, children && /* @__PURE__ */ import_react.createElement("span", null, children)) : children;
	const tagNode = /* @__PURE__ */ import_react.createElement("span", Object.assign({}, domProps, {
		ref,
		className: tagClassName,
		style: tagStyle
	}), kids, mergedCloseIcon, isPreset && /* @__PURE__ */ import_react.createElement(presetCmp_default, {
		key: "preset",
		prefixCls
	}), isStatus && /* @__PURE__ */ import_react.createElement(statusCmp_default, {
		key: "status",
		prefixCls
	}));
	return wrapCSSVar(isNeedWave ? /* @__PURE__ */ import_react.createElement(wave_default, { component: "Tag" }, tagNode) : tagNode);
});
const Tag$1 = InternalTag;
Tag$1.CheckableTag = CheckableTag_default;
var tag_default = Tag$1;
const ErrorBoundaryContext = (0, import_react.createContext)(null);
const initialState = {
	didCatch: false,
	error: null
};
var ErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
		this.state = initialState;
	}
	static getDerivedStateFromError(error) {
		return {
			didCatch: true,
			error
		};
	}
	resetErrorBoundary() {
		const { error } = this.state;
		if (error !== null) {
			var _this$props$onReset, _this$props;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			(_this$props$onReset = (_this$props = this.props).onReset) === null || _this$props$onReset === void 0 || _this$props$onReset.call(_this$props, {
				args,
				reason: "imperative-api"
			});
			this.setState(initialState);
		}
	}
	componentDidCatch(error, info) {
		var _this$props$onError, _this$props2;
		(_this$props$onError = (_this$props2 = this.props).onError) === null || _this$props$onError === void 0 || _this$props$onError.call(_this$props2, error, info);
	}
	componentDidUpdate(prevProps, prevState) {
		const { didCatch } = this.state;
		const { resetKeys } = this.props;
		if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
			var _this$props$onReset2, _this$props3;
			(_this$props$onReset2 = (_this$props3 = this.props).onReset) === null || _this$props$onReset2 === void 0 || _this$props$onReset2.call(_this$props3, {
				next: resetKeys,
				prev: prevProps.resetKeys,
				reason: "keys"
			});
			this.setState(initialState);
		}
	}
	render() {
		const { children, fallbackRender, FallbackComponent, fallback } = this.props;
		const { didCatch, error } = this.state;
		let childToRender = children;
		if (didCatch) {
			const props = {
				error,
				resetErrorBoundary: this.resetErrorBoundary
			};
			if (typeof fallbackRender === "function") childToRender = fallbackRender(props);
			else if (FallbackComponent) childToRender = (0, import_react.createElement)(FallbackComponent, props);
			else if (fallback !== void 0) childToRender = fallback;
			else throw error;
		}
		return (0, import_react.createElement)(ErrorBoundaryContext.Provider, { value: {
			didCatch,
			error,
			resetErrorBoundary: this.resetErrorBoundary
		} }, childToRender);
	}
};
function hasArrayChanged() {
	let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	let b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const DefaultFallback = (props) => {
	const { t } = useTranslation();
	const { error } = props;
	const debug = async () => {
		await window.api.devTools.toggle();
	};
	const reload = async () => {
		await window.api.reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(alert_default, {
		message: t("error.boundary.default.message"),
		showIcon: true,
		description: formatErrorMessage(error),
		type: "error",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(space_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
			size: "sm",
			onPress: debug,
			children: t("error.boundary.default.devtools")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
			size: "sm",
			onPress: reload,
			children: t("error.boundary.default.reload")
		})] })
	}) });
};
const ErrorBoundaryCustomized = ({ children, fallbackComponent }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
		FallbackComponent: fallbackComponent ?? DefaultFallback,
		children
	});
};
const ErrorContainer = /* @__PURE__ */ dt.div.withConfig({ displayName: "ErrorContainer" })([`display:flex;justify-content:center;align-items:center;width:100%;padding:8px;`]);
var import_lodash$3 = /* @__PURE__ */ __toESM(require_lodash());
const ModelAvatar = ({ model, size, props, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(avatar_default, {
		src: getModelLogo(model?.id || ""),
		style: {
			width: size,
			height: size,
			minWidth: size,
			minHeight: size,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		...props,
		className,
		children: (0, import_lodash$3.first)(model?.name)
	});
};
var ModelAvatar_default = ModelAvatar;
const getMessageBackground = (isBubbleStyle, isAssistantMessage) => isBubbleStyle ? isAssistantMessage ? "transparent" : "var(--chat-background-user)" : void 0;
const MessageItem = ({ message, index, total, route }) => {
	const { messageFont, fontSize } = useSettings();
	const messageContainerRef = (0, import_react.useRef)(null);
	const isAssistantMessage = message.role === "assistant";
	const messageBackground = getMessageBackground(true, isAssistantMessage);
	const maxWidth = "800px";
	if (["summary", "explanation"].includes(route) && index === total - 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContainer, {
		ref: messageContainerRef,
		className: classNames({
			message: true,
			"message-assistant": isAssistantMessage,
			"message-user": !isAssistantMessage
		}),
		style: { maxWidth },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContentContainer, {
			className: "message-content-container",
			style: {
				fontFamily: messageFont === "serif" ? "var(--font-family-serif)" : "var(--font-family)",
				fontSize,
				background: messageBackground
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageErrorBoundary_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent_default, { message }) })
		})
	}, message.id);
};
const MessageContainer = /* @__PURE__ */ dt.div.withConfig({ displayName: "MessageContainer" })([`display:flex;width:100%;flex-direction:column;position:relative;transition:background-color 0.3s ease;&.message-highlight{background-color:var(--color-primary-mute);}.menubar{opacity:0;transition:opacity 0.2s ease;&.show{opacity:1;}}&:hover{.menubar{opacity:1;}}`]);
const MessageContentContainer = /* @__PURE__ */ dt.div.withConfig({ displayName: "MessageContentContainer" })([`max-width:100%;display:flex;flex:1;flex-direction:column;justify-content:space-between;margin-top:20px;`]);
var Message_default = /* @__PURE__ */ (0, import_react.memo)(MessageItem);
await init_es$2();
const Messages = ({ assistant, topic, route, isOutputted }) => {
	const messages = useTopicMessages(topic.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$3, {
		id: "messages",
		children: [!isOutputted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
			style: { fontSize: 16 },
			spin: true
		}), [...messages].reverse().map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message_default, {
			message,
			index,
			total: messages.length,
			route
		}, message.id))]
	}, assistant.id);
};
const Container$3 = /* @__PURE__ */ dt(Scrollbar_default).withConfig({ displayName: "Container" })([`display:flex;flex-direction:column-reverse;align-items:center;padding-bottom:20px;overflow-x:hidden;min-width:100%;background-color:transparent !important;`]);
var Messages_default = Messages;
const ChatWindow = ({ route, assistant, topic, isOutputted }) => {
	if (!assistant || !topic) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main$2, {
		className: "bubble",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages_default, {
			assistant,
			topic,
			route,
			isOutputted
		})
	});
};
const Main$2 = /* @__PURE__ */ dt(Scrollbar_default).withConfig({ displayName: "Main" })([`width:100%;display:flex;flex-direction:row;justify-content:flex-start;margin-bottom:auto;-webkit-app-region:none;background-color:transparent !important;max-height:100%;`]);
var ChatWindow_default = ChatWindow;
await init_es$2();
var import_lodash$2 = /* @__PURE__ */ __toESM(require_lodash());
const logger$1 = loggerService.withContext("TranslateWindow");
let _targetLanguage = (await databases_default.settings.get({ id: "translate:target:language" }))?.value || LanguagesEnum.zhCN;
const Translate = ({ text }) => {
	const [result, setResult] = (0, import_react.useState)("");
	const [targetLanguage, setTargetLanguage] = (0, import_react.useState)(_targetLanguage);
	const { translateModel } = useDefaultModel();
	const { t } = useTranslation();
	const translatingRef = (0, import_react.useRef)(false);
	const { getLanguageByLangcode } = useTranslate();
	_targetLanguage = targetLanguage;
	const translate = (0, import_react.useCallback)(async () => {
		if (!text.trim() || !translateModel) return;
		if (translatingRef.current) return;
		try {
			translatingRef.current = true;
			await translateText(text, targetLanguage, setResult);
			translatingRef.current = false;
		} catch (error) {
			logger$1.error("Error fetching result:", error);
		} finally {
			translatingRef.current = false;
		}
	}, [
		text,
		targetLanguage,
		translateModel
	]);
	(0, import_react.useEffect)(() => {
		runAsyncFunction(async () => {
			const targetLang = await databases_default.settings.get({ id: "translate:target:language" });
			targetLang && setTargetLanguage(getLanguageByLangcode(targetLang.value));
		});
	}, [getLanguageByLangcode]);
	(0, import_react.useEffect)(() => {
		translate();
	}, [translate]);
	useHotkeys("c", () => {
		navigator.clipboard.writeText(result);
		window.toast.success(t("message.copy.success"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(select_default, {
			showSearch: true,
			value: "any",
			style: {
				maxWidth: 200,
				minWidth: 100,
				flex: 1
			},
			optionFilterProp: "label",
			disabled: true,
			options: [{
				label: t("translate.any.language"),
				value: "any"
			}]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapOutlined_default, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
			showSearch: true,
			value: targetLanguage.langCode,
			style: {
				maxWidth: 200,
				minWidth: 130,
				flex: 1
			},
			optionFilterProp: "label",
			onChange: async (value) => {
				await databases_default.settings.put({
					id: "translate:target:language",
					value
				});
				setTargetLanguage(getLanguageByLangcode(value));
			}
		})
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main$1, { children: (0, import_lodash$2.isEmpty)(result) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LoadingText, { children: [t("translate.output.placeholder"), "..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultText, { children: result }) }) })] });
};
const Container$2 = /* @__PURE__ */ dt.div.withConfig({ displayName: "Container" })([`display:flex;flex-direction:column;flex:1;padding:12px;overflow:hidden;-webkit-app-region:none;`]);
const Main$1 = /* @__PURE__ */ dt.div.withConfig({ displayName: "Main" })([`display:flex;flex:1;width:100%;overflow:hidden;`]);
const ResultText = /* @__PURE__ */ dt.div.withConfig({ displayName: "ResultText" })([`white-space:pre-wrap;word-break:break-word;width:100%;`]);
const LoadingText = /* @__PURE__ */ dt.div.withConfig({ displayName: "LoadingText" })([`color:var(--color-text-2);font-style:italic;`]);
const MenuContainer = /* @__PURE__ */ dt.div.withConfig({ displayName: "MenuContainer" })([`display:flex;width:100%;flex-direction:row;align-items:center;justify-content:center;margin-bottom:15px;gap:20px;`]);
const OutputContainer = /* @__PURE__ */ dt(Scrollbar_default).withConfig({ displayName: "OutputContainer" })([`display:flex;flex-direction:column;flex:1;gap:10px;`]);
var TranslateWindow_default = Translate;
init_es$2();
const { Paragraph } = typography_default;
const ClipboardPreview = ({ referenceText, clearClipboard, t }) => {
	if (!referenceText) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClipboardContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, {
			style: {
				fontSize: "14px",
				flexShrink: 0,
				cursor: "pointer"
			},
			className: "nodrag"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paragraph, {
			ellipsis: { rows: 2 },
			style: {
				margin: "0 12px",
				fontSize: 12,
				flex: 1,
				minWidth: 0
			},
			className: "nodrag",
			children: referenceText || t("miniwindow.clipboard.empty")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
			onClick: clearClipboard,
			className: "nodrag",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseOutlined_default, { style: { fontSize: "14px" } })
		})
	] }) });
};
const Container$1 = /* @__PURE__ */ dt.div.withConfig({ displayName: "Container" })([`padding:12px;background-color:var(--color-background-opacity);border-radius:8px;margin-bottom:10px;`]);
const ClipboardContent = /* @__PURE__ */ dt.div.withConfig({ displayName: "ClipboardContent" })([`display:flex;align-items:center;width:100%;color:var(--color-text-secondary);`]);
const CloseButton = /* @__PURE__ */ dt.button.withConfig({ displayName: "CloseButton" })([`background:none;border:none;color:var(--color-text-secondary);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;&:hover{color:var(--color-text);}`]);
var ClipboardPreview_default = ClipboardPreview;
init_es$2();
const FeatureMenus = ({ ref, text, setRoute, onSendMessage }) => {
	const { t } = useTranslation();
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const features = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.chat"),
			active: true,
			onClick: () => {
				if (text) {
					setRoute("chat");
					onSendMessage();
				}
			}
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.translate"),
			onClick: () => text && setRoute("translate")
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.summary"),
			onClick: () => {
				if (text) {
					setRoute("summary");
					onSendMessage(t("prompts.summarize"));
				}
			}
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.explanation"),
			onClick: () => {
				if (text) {
					setRoute("explanation");
					onSendMessage(t("prompts.explanation"));
				}
			}
		}
	], [
		onSendMessage,
		setRoute,
		t,
		text
	]);
	(0, import_react.useImperativeHandle)(ref, () => ({
		nextFeature() {
			setSelectedIndex((prev) => prev < features.length - 1 ? prev + 1 : 0);
		},
		prevFeature() {
			setSelectedIndex((prev) => prev > 0 ? prev - 1 : features.length - 1);
		},
		useFeature() {
			features[selectedIndex].onClick?.();
		},
		resetSelectedIndex() {
			setSelectedIndex(0);
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureList, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureListWrapper, { children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(col_default, {
		span: 24,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
			onClick: feature.onClick,
			className: index === selectedIndex ? "active" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureIcon, { children: feature.icon }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTitle, { children: feature.title }),
				index === selectedIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterOutlined_default, {})
			]
		})
	}, index)) }) });
};
FeatureMenus.displayName = "FeatureMenus";
const FeatureList = /* @__PURE__ */ dt(Scrollbar_default).withConfig({ displayName: "FeatureList" })([`flex-shrink:0;height:auto;-webkit-app-region:none;`]);
const FeatureListWrapper = /* @__PURE__ */ dt.div.withConfig({ displayName: "FeatureListWrapper" })([`display:flex;flex-direction:column;gap:5px;cursor:pointer;`]);
const FeatureItem = /* @__PURE__ */ dt.div.withConfig({ displayName: "FeatureItem" })([`display:flex;flex-direction:row;cursor:pointer;transition:background-color 0s;background:transparent;border:none;padding:8px 16px;display:flex;align-items:center;gap:12px;-webkit-app-region:none;border-radius:8px;user-select:none;&:hover{background:var(--color-background-mute);}&.active{background:var(--color-background-mute);}`]);
const FeatureIcon = /* @__PURE__ */ dt.div.withConfig({ displayName: "FeatureIcon" })([`color:#fff;display:flex;`]);
const FeatureTitle = /* @__PURE__ */ dt.h3.withConfig({ displayName: "FeatureTitle" })([`margin:0;font-size:14px;flex-basis:100%;`]);
var FeatureMenus_default = FeatureMenus;
init_es$2();
const Footer = ({ route, canUseBackspace, loading, clearClipboard, onEsc, setIsPinned, isPinned, onCopy }) => {
	const { t } = useTranslation();
	useHotkeys("esc", () => {
		onEsc();
	});
	useHotkeys("c", () => {
		handleCopy();
	});
	const handleCopy = () => {
		if (loading || !onCopy) return;
		onCopy();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WindowFooter, {
		className: "drag",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterText, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
					style: {
						fontSize: 12,
						color: "var(--color-error)",
						padding: 0
					},
					spin: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowLeft, {
					size: 14,
					color: "var(--color-text)"
				}),
				className: "nodrag",
				onClick: onEsc,
				children: t("miniwindow.footer.esc", { action: loading ? t("miniwindow.footer.esc_pause") : route === "home" ? t("miniwindow.footer.esc_close") : t("miniwindow.footer.esc_back") })
			}),
			route === "home" && !canUseBackspace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftOutlined_default, {}),
				style: { cursor: "pointer" },
				className: "nodrag",
				onClick: () => clearClipboard(),
				children: t("miniwindow.footer.backspace_clear")
			}),
			route !== "home" && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					size: 14,
					color: "var(--color-text)"
				}),
				style: { cursor: "pointer" },
				className: "nodrag",
				onClick: handleCopy,
				children: t("miniwindow.footer.copy_last_message")
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinButtonArea, {
			onClick: () => setIsPinned(!isPinned),
			className: "nodrag",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
				title: t("miniwindow.tooltip.pin"),
				mouseEnterDelay: .8,
				placement: "left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
					size: 14,
					stroke: isPinned ? "var(--color-primary)" : "var(--color-text)",
					style: {
						transform: isPinned ? "rotate(40deg)" : "rotate(0deg)",
						transition: "transform 0.2s ease-in-out"
					}
				})
			})
		})]
	});
};
const WindowFooter = /* @__PURE__ */ dt.div.withConfig({ displayName: "WindowFooter" })([`display:flex;flex-direction:row;justify-content:space-between;padding:5px 0;color:var(--color-text-secondary);font-size:12px;`]);
const FooterText = /* @__PURE__ */ dt.div.withConfig({ displayName: "FooterText" })([`display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);font-size:12px;`]);
const PinButtonArea = /* @__PURE__ */ dt.div.withConfig({ displayName: "PinButtonArea" })([`cursor:pointer;display:flex;align-items:center;margin-right:5px;`]);
const Tag = /* @__PURE__ */ dt(tag_default).withConfig({ displayName: "Tag" })([`cursor:pointer;display:flex;align-items:center;gap:5px;transition:all 0.2s ease-in-out;&:hover{background-color:var(--color-background-soft);color:var(--color-primary);}`]);
var Footer_default = Footer;
const InputBar = ({ ref, text, assistant, placeholder, loading, handleKeyDown, handleChange }) => {
	const inputRef = (0, import_react.useRef)(null);
	const { setTimeoutTimer } = useTimer();
	if (!loading) setTimeoutTimer("focus", () => inputRef.current?.input?.focus(), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputWrapper, {
		ref,
		children: [assistant.model && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
			model: assistant.model,
			size: 30
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: text,
			placeholder,
			variant: "borderless",
			autoFocus: true,
			onKeyDown: handleKeyDown,
			onChange: handleChange,
			ref: inputRef
		})]
	});
};
InputBar.displayName = "InputBar";
const InputWrapper = /* @__PURE__ */ dt.div.withConfig({ displayName: "InputWrapper" })([`display:flex;align-items:center;margin-top:10px;`]);
const Input = /* @__PURE__ */ dt(input_default).withConfig({ displayName: "Input" })([`background:none;border:none;-webkit-app-region:none;font-size:18px;`]);
var InputBar_default = InputBar;
var import_lodash = /* @__PURE__ */ __toESM(require_lodash());
var import_lodash$1 = /* @__PURE__ */ __toESM(require_lodash());
const logger = loggerService.withContext("HomeWindow");
const HomeWindow = ({ draggable = true }) => {
	const { language, readClipboardAtStartup, windowStyle } = useSettings();
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [route, setRoute] = (0, import_react.useState)("home");
	const [isFirstMessage, setIsFirstMessage] = (0, import_react.useState)(true);
	const [userInputText, setUserInputText] = (0, import_react.useState)("");
	const [clipboardText, setClipboardText] = (0, import_react.useState)("");
	const lastClipboardTextRef = (0, import_react.useRef)(null);
	const [isPinned, setIsPinned] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isOutputted, setIsOutputted] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { quickAssistantId } = useAppSelector((state) => state.llm);
	const { assistant: currentAssistant } = useAssistant(quickAssistantId);
	const currentTopic = (0, import_react.useRef)(getDefaultTopic(currentAssistant.id));
	const currentAskId = (0, import_react.useRef)("");
	const inputBarRef = (0, import_react.useRef)(null);
	const featureMenusRef = (0, import_react.useRef)(null);
	const referenceText = (0, import_react.useMemo)(() => clipboardText || userInputText, [clipboardText, userInputText]);
	const userContent = (0, import_react.useMemo)(() => {
		if (isFirstMessage) return referenceText === userInputText ? userInputText : `${referenceText}\n\n${userInputText}`.trim();
		return userInputText.trim();
	}, [
		isFirstMessage,
		referenceText,
		userInputText
	]);
	(0, import_react.useEffect)(() => {
		i18n_default.changeLanguage(language || navigator.language || defaultLanguage);
	}, [language]);
	(0, import_react.useEffect)(() => {
		if (route === "home") {
			setIsFirstMessage(true);
			setError(null);
		}
	}, [route]);
	const focusInput = (0, import_react.useCallback)(() => {
		if (inputBarRef.current) {
			const input = inputBarRef.current.querySelector("input");
			if (input) input.focus();
		}
	}, []);
	const readClipboard = (0, import_react.useCallback)(async () => {
		if (!readClipboardAtStartup || !document.hasFocus()) return;
		try {
			const text = await navigator.clipboard.readText();
			if (text && text !== lastClipboardTextRef.current) {
				lastClipboardTextRef.current = text;
				setClipboardText(text.trim());
			}
		} catch (error$1) {
			logger.warn("Failed to read clipboard:", error$1);
		}
	}, [readClipboardAtStartup]);
	const clearClipboard = (0, import_react.useCallback)(async () => {
		setClipboardText("");
		lastClipboardTextRef.current = null;
		focusInput();
	}, [focusInput]);
	const onWindowShow = (0, import_react.useCallback)(async () => {
		featureMenusRef.current?.resetSelectedIndex();
		await readClipboard();
		focusInput();
	}, [readClipboard, focusInput]);
	(0, import_react.useEffect)(() => {
		window.api.miniWindow.setPin(isPinned);
	}, [isPinned]);
	(0, import_react.useEffect)(() => {
		window.electron.ipcRenderer.on(IpcChannel.ShowMiniWindow, onWindowShow);
		return () => {
			window.electron.ipcRenderer.removeAllListeners(IpcChannel.ShowMiniWindow);
		};
	}, [onWindowShow]);
	(0, import_react.useEffect)(() => {
		readClipboard();
	}, [readClipboard]);
	const handleCloseWindow = (0, import_react.useCallback)(() => window.api.miniWindow.hide(), []);
	const handleKeyDown = (e) => {
		if (e.nativeEvent.isComposing || e.key === "Process") return;
		switch (e.code) {
			case "Enter":
			case "NumpadEnter":
				if (isLoading) return;
				e.preventDefault();
				if (userContent) if (route === "home") featureMenusRef.current?.useFeature();
				else {
					setRoute("chat");
					handleSendMessage();
					focusInput();
				}
				break;
			case "Backspace":
				if (userInputText.length === 0) clearClipboard();
				break;
			case "ArrowUp":
				if (route === "home") {
					e.preventDefault();
					featureMenusRef.current?.prevFeature();
				}
				break;
			case "ArrowDown":
				if (route === "home") {
					e.preventDefault();
					featureMenusRef.current?.nextFeature();
				}
				break;
			case "Escape":
				handleEsc();
				break;
		}
	};
	const handleChange = (e) => {
		setUserInputText(e.target.value);
	};
	const handleError = (error$1) => {
		setIsLoading(false);
		setError(error$1.message);
	};
	const handleSendMessage = (0, import_react.useCallback)(async (prompt) => {
		if ((0, import_lodash.isEmpty)(userContent) || !currentTopic.current) return;
		try {
			const topicId = currentTopic.current.id;
			const { message: userMessage, blocks } = getUserMessage({
				content: [prompt, userContent].filter(Boolean).join("\n\n"),
				assistant: currentAssistant,
				topic: currentTopic.current
			});
			store_default.dispatch(newMessagesActions.addMessage({
				topicId,
				message: userMessage
			}));
			store_default.dispatch(upsertManyBlocks(blocks));
			const assistantMessage = getAssistantMessage({
				assistant: currentAssistant,
				topic: currentTopic.current
			});
			assistantMessage.askId = userMessage.id;
			currentAskId.current = userMessage.id;
			store_default.dispatch(newMessagesActions.addMessage({
				topicId,
				message: assistantMessage
			}));
			const allMessagesForTopic = selectMessagesForTopic(store_default.getState(), topicId);
			const userMessageIndex = allMessagesForTopic.findIndex((m) => m?.id === userMessage.id);
			const messagesForContext = allMessagesForTopic.slice(0, userMessageIndex + 1).filter((m) => m && !m.status?.includes("ing"));
			let blockId = null;
			let thinkingBlockId = null;
			setIsLoading(true);
			setIsOutputted(false);
			setError(null);
			setIsFirstMessage(false);
			setUserInputText("");
			const newAssistant = (0, import_lodash.cloneDeep)(currentAssistant);
			if (!newAssistant.settings) newAssistant.settings = {};
			newAssistant.settings.streamOutput = true;
			newAssistant.webSearchProviderId = void 0;
			newAssistant.mcpServers = void 0;
			newAssistant.knowledge_bases = void 0;
			const { modelMessages, uiMessages } = await ConversationService.prepareMessagesForModel(messagesForContext, newAssistant);
			await fetchChatCompletion({
				messages: modelMessages,
				assistant: newAssistant,
				options: {},
				topicId,
				uiMessages,
				onChunkReceived: (chunk) => {
					switch (chunk.type) {
						case ChunkType.THINKING_START:
							setIsOutputted(true);
							if (thinkingBlockId) store_default.dispatch(updateOneBlock({
								id: thinkingBlockId,
								changes: { status: MessageBlockStatus.STREAMING }
							}));
							else {
								const block = createThinkingBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
								thinkingBlockId = block.id;
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { blockInstruction: { id: block.id } }
								}));
								store_default.dispatch(upsertOneBlock(block));
							}
							break;
						case ChunkType.THINKING_DELTA:
							setIsOutputted(true);
							if (thinkingBlockId) throttledBlockUpdate(thinkingBlockId, {
								content: chunk.text,
								thinking_millsec: chunk.thinking_millsec
							});
							break;
						case ChunkType.THINKING_COMPLETE:
							if (thinkingBlockId) {
								cancelThrottledBlockUpdate(thinkingBlockId);
								store_default.dispatch(updateOneBlock({
									id: thinkingBlockId,
									changes: {
										status: MessageBlockStatus.SUCCESS,
										thinking_millsec: chunk.thinking_millsec
									}
								}));
							}
							break;
						case ChunkType.TEXT_START:
							setIsOutputted(true);
							if (blockId) store_default.dispatch(updateOneBlock({
								id: blockId,
								changes: { status: MessageBlockStatus.STREAMING }
							}));
							else {
								const block = createMainTextBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
								blockId = block.id;
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { blockInstruction: { id: block.id } }
								}));
								store_default.dispatch(upsertOneBlock(block));
							}
							break;
						case ChunkType.TEXT_DELTA:
							setIsOutputted(true);
							if (blockId) throttledBlockUpdate(blockId, { content: chunk.text });
							break;
						case ChunkType.TEXT_COMPLETE:
							if (blockId) {
								cancelThrottledBlockUpdate(blockId);
								store_default.dispatch(updateOneBlock({
									id: blockId,
									changes: {
										content: chunk.text,
										status: MessageBlockStatus.SUCCESS
									}
								}));
							}
							break;
						case ChunkType.ERROR: {
							const isAborted = isAbortError(chunk.error);
							const possibleBlockId = thinkingBlockId || blockId;
							if (possibleBlockId) {
								store_default.dispatch(updateOneBlock({
									id: possibleBlockId,
									changes: { status: isAborted ? MessageBlockStatus.PAUSED : MessageBlockStatus.ERROR }
								}));
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { status: isAborted ? AssistantMessageStatus.PAUSED : AssistantMessageStatus.SUCCESS }
								}));
							}
							if (!isAborted) throw new Error(chunk.error.message);
						}
						case ChunkType.BLOCK_COMPLETE:
							setIsLoading(false);
							setIsOutputted(true);
							currentAskId.current = "";
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId,
								messageId: assistantMessage.id,
								updates: { status: AssistantMessageStatus.SUCCESS }
							}));
							break;
					}
				}
			});
		} catch (err) {
			if (isAbortError(err)) return;
			handleError(err instanceof Error ? err : /* @__PURE__ */ new Error("An error occurred"));
			logger.error("Error fetching result:", err);
		} finally {
			setIsLoading(false);
			setIsOutputted(true);
			currentAskId.current = "";
		}
	}, [userContent, currentAssistant]);
	const handlePause = (0, import_react.useCallback)(() => {
		if (currentAskId.current) {
			abortCompletion(currentAskId.current);
			setIsLoading(false);
			setIsOutputted(true);
			currentAskId.current = "";
		}
	}, []);
	const handleEsc = (0, import_react.useCallback)(() => {
		if (isLoading) handlePause();
		else if (route === "home") handleCloseWindow();
		else {
			if (currentTopic.current) store_default.dispatch(newMessagesActions.clearTopicMessages(currentTopic.current.id));
			currentTopic.current = getDefaultTopic(currentAssistant.id);
			setError(null);
			setRoute("home");
			setUserInputText("");
		}
	}, [
		isLoading,
		route,
		handleCloseWindow,
		currentAssistant.id,
		handlePause
	]);
	const handleCopy = (0, import_react.useCallback)(() => {
		if (!currentTopic.current) return;
		const messages = selectMessagesForTopic(store_default.getState(), currentTopic.current.id);
		const lastMessage = (0, import_lodash$1.last)(messages);
		if (lastMessage) {
			const content = getMainTextContent(lastMessage);
			navigator.clipboard.writeText(content);
			window.toast.success(t("message.copy.success"));
		}
	}, [currentTopic, t]);
	const backgroundColor = (0, import_react.useMemo)(() => {
		if (isMac && windowStyle === "transparent" && theme === ThemeMode.light) return "transparent";
		return "var(--color-background)";
	}, [windowStyle, theme]);
	const inputPlaceholder = (0, import_react.useMemo)(() => {
		if (referenceText && route === "home") return t("miniwindow.input.placeholder.title");
		return t("miniwindow.input.placeholder.empty", { model: quickAssistantId ? currentAssistant.name : currentAssistant.model.name });
	}, [
		referenceText,
		route,
		t,
		quickAssistantId,
		currentAssistant
	]);
	const baseFooterProps = (0, import_react.useMemo)(() => ({
		route,
		loading: isLoading,
		onEsc: handleEsc,
		setIsPinned,
		isPinned
	}), [
		route,
		isLoading,
		handleEsc,
		isPinned
	]);
	switch (route) {
		case "chat":
		case "summary":
		case "explanation": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				route === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBar_default, {
					text: userInputText,
					assistant: currentAssistant,
					referenceText,
					placeholder: inputPlaceholder,
					loading: isLoading,
					handleKeyDown,
					handleChange,
					ref: inputBarRef
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } })] }),
				["summary", "explanation"].includes(route) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: 10 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPreview_default, {
						referenceText,
						clearClipboard,
						t
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWindow_default, {
					route,
					assistant: currentAssistant,
					topic: currentTopic.current,
					isOutputted
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMsg, { children: error }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, {
					...baseFooterProps,
					onCopy: handleCopy
				}, "footer")
			]
		});
		case "translate": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslateWindow_default, { text: referenceText }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, { ...baseFooterProps }, "footer")
			]
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBar_default, {
					text: userInputText,
					assistant: currentAssistant,
					referenceText,
					placeholder: inputPlaceholder,
					loading: isLoading,
					handleKeyDown,
					handleChange,
					ref: inputBarRef
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPreview_default, {
					referenceText,
					clearClipboard,
					t
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureMenus_default, {
					setRoute,
					onSendMessage: handleSendMessage,
					text: userContent,
					ref: featureMenusRef
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, {
					...baseFooterProps,
					canUseBackspace: userInputText.length > 0 || clipboardText.length === 0,
					clearClipboard
				}, "footer")
			]
		});
	}
};
const Container = /* @__PURE__ */ dt.div.withConfig({ displayName: "Container" })([`display:flex;flex:1;height:100%;width:100%;flex-direction:column;-webkit-app-region:`, `;padding:8px 10px;`], ({ $draggable }) => $draggable ? "drag" : "no-drag");
const Main = /* @__PURE__ */ dt.main.withConfig({ displayName: "Main" })([`display:flex;flex-direction:column;flex:1;overflow:hidden;`]);
const ErrorMsg = /* @__PURE__ */ dt.div.withConfig({ displayName: "ErrorMsg" })([`color:var(--color-error);background:rgba(255,0,0,0.15);border:1px solid var(--color-error);padding:8px 12px;border-radius:4px;margin-bottom:12px;font-size:13px;word-break:break-all;`]);
var HomeWindow_default = HomeWindow;
export { HomeWindow_default as b, ModelAvatar_default as c, ErrorBoundaryCustomized as d, tag_default as e, col_default as f };

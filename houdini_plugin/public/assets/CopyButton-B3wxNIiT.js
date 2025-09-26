import { g as __toESM } from "./chunk-st2fFX3F.js";
import { cQ as merge, d5 as init_es$1, d6 as FastColor, dF as init_raf, dG as raf_default, dh as init_es, dp as unit, e4 as composeRef, e7 as init_ref, ew as require_classnames, ez as useTranslation } from "./es-BVhN1ovY.js";
import { b as require_react } from "./react-Cs7_W7Sm.js";
import { b as require_jsx_runtime } from "./jsx-runtime-VX_aOJrC.js";
import { W as tooltip_default, aU as genStyleHooks, a_ as resetComponent, b6 as DisabledContext_default, b9 as useComponentConfig, bq as dt } from "./ImageViewer-BR0HvCkG.js";
import { b as Copy } from "./copy-D3xZcu-G.js";
import { b as es_default, d as init_es$2 } from "./es-DpxEb6R1.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const SliderInternalContext = /* @__PURE__ */ (0, import_react.createContext)({});
var Context_default = SliderInternalContext;
init_raf();
init_ref();
const SliderTooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { open, draggingDelete, value } = props;
	const innerRef = (0, import_react.useRef)(null);
	const mergedOpen = open && !draggingDelete;
	const rafRef = (0, import_react.useRef)(null);
	function cancelKeepAlign() {
		raf_default.cancel(rafRef.current);
		rafRef.current = null;
	}
	function keepAlign() {
		rafRef.current = raf_default(() => {
			var _a;
			(_a = innerRef.current) === null || _a === void 0 || _a.forceAlign();
			rafRef.current = null;
		});
	}
	import_react.useEffect(() => {
		if (mergedOpen) keepAlign();
		else cancelKeepAlign();
		return cancelKeepAlign;
	}, [
		mergedOpen,
		props.title,
		value
	]);
	return /* @__PURE__ */ import_react.createElement(tooltip_default, Object.assign({ ref: composeRef(innerRef, ref) }, props, { open: mergedOpen }));
});
var SliderTooltip_default = SliderTooltip;
init_es();
init_es$1();
const genBaseStyle = (token) => {
	const { componentCls, antCls, controlSize, dotSize, marginFull, marginPart, colorFillContentHover, handleColorDisabled, calc, handleSize, handleSizeHover, handleActiveColor, handleActiveOutlineColor, handleLineWidth, handleLineWidthHover, motionDurationMid } = token;
	return { [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
		position: "relative",
		height: controlSize,
		margin: `${unit(marginPart)} ${unit(marginFull)}`,
		padding: 0,
		cursor: "pointer",
		touchAction: "none",
		"&-vertical": { margin: `${unit(marginFull)} ${unit(marginPart)}` },
		[`${componentCls}-rail`]: {
			position: "absolute",
			backgroundColor: token.railBg,
			borderRadius: token.borderRadiusXS,
			transition: `background-color ${motionDurationMid}`
		},
		[`${componentCls}-track,${componentCls}-tracks`]: {
			position: "absolute",
			transition: `background-color ${motionDurationMid}`
		},
		[`${componentCls}-track`]: {
			backgroundColor: token.trackBg,
			borderRadius: token.borderRadiusXS
		},
		[`${componentCls}-track-draggable`]: {
			boxSizing: "content-box",
			backgroundClip: "content-box",
			border: "solid rgba(0,0,0,0)"
		},
		"&:hover": {
			[`${componentCls}-rail`]: { backgroundColor: token.railHoverBg },
			[`${componentCls}-track`]: { backgroundColor: token.trackHoverBg },
			[`${componentCls}-dot`]: { borderColor: colorFillContentHover },
			[`${componentCls}-handle::after`]: { boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.colorPrimaryBorderHover}` },
			[`${componentCls}-dot-active`]: { borderColor: token.dotActiveBorderColor }
		},
		[`${componentCls}-handle`]: {
			position: "absolute",
			width: handleSize,
			height: handleSize,
			outline: "none",
			userSelect: "none",
			"&-dragging-delete": { opacity: 0 },
			"&::before": {
				content: "\"\"",
				position: "absolute",
				insetInlineStart: calc(handleLineWidth).mul(-1).equal(),
				insetBlockStart: calc(handleLineWidth).mul(-1).equal(),
				width: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
				height: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
				backgroundColor: "transparent"
			},
			"&::after": {
				content: "\"\"",
				position: "absolute",
				insetBlockStart: 0,
				insetInlineStart: 0,
				width: handleSize,
				height: handleSize,
				backgroundColor: token.colorBgElevated,
				boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.handleColor}`,
				outline: `0px solid transparent`,
				borderRadius: "50%",
				cursor: "pointer",
				transition: `
            inset-inline-start ${motionDurationMid},
            inset-block-start ${motionDurationMid},
            width ${motionDurationMid},
            height ${motionDurationMid},
            box-shadow ${motionDurationMid},
            outline ${motionDurationMid}
          `
			},
			"&:hover, &:active, &:focus": {
				"&::before": {
					insetInlineStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
					insetBlockStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
					width: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
					height: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal()
				},
				"&::after": {
					boxShadow: `0 0 0 ${unit(handleLineWidthHover)} ${handleActiveColor}`,
					outline: `6px solid ${handleActiveOutlineColor}`,
					width: handleSizeHover,
					height: handleSizeHover,
					insetInlineStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
					insetBlockStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal()
				}
			}
		},
		[`&-lock ${componentCls}-handle`]: { "&::before, &::after": { transition: "none" } },
		[`${componentCls}-mark`]: {
			position: "absolute",
			fontSize: token.fontSize
		},
		[`${componentCls}-mark-text`]: {
			position: "absolute",
			display: "inline-block",
			color: token.colorTextDescription,
			textAlign: "center",
			wordBreak: "keep-all",
			cursor: "pointer",
			userSelect: "none",
			"&-active": { color: token.colorText }
		},
		[`${componentCls}-step`]: {
			position: "absolute",
			background: "transparent",
			pointerEvents: "none"
		},
		[`${componentCls}-dot`]: {
			position: "absolute",
			width: dotSize,
			height: dotSize,
			backgroundColor: token.colorBgElevated,
			border: `${unit(handleLineWidth)} solid ${token.dotBorderColor}`,
			borderRadius: "50%",
			cursor: "pointer",
			transition: `border-color ${token.motionDurationSlow}`,
			pointerEvents: "auto",
			"&-active": { borderColor: token.dotActiveBorderColor }
		},
		[`&${componentCls}-disabled`]: {
			cursor: "not-allowed",
			[`${componentCls}-rail`]: { backgroundColor: `${token.railBg} !important` },
			[`${componentCls}-track`]: { backgroundColor: `${token.trackBgDisabled} !important` },
			[`
          ${componentCls}-dot
        `]: {
				backgroundColor: token.colorBgElevated,
				borderColor: token.trackBgDisabled,
				boxShadow: "none",
				cursor: "not-allowed"
			},
			[`${componentCls}-handle::after`]: {
				backgroundColor: token.colorBgElevated,
				cursor: "not-allowed",
				width: handleSize,
				height: handleSize,
				boxShadow: `0 0 0 ${unit(handleLineWidth)} ${handleColorDisabled}`,
				insetInlineStart: 0,
				insetBlockStart: 0
			},
			[`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: { cursor: `not-allowed !important` }
		},
		[`&-tooltip ${antCls}-tooltip-inner`]: { minWidth: "unset" }
	}) };
};
const genDirectionStyle = (token, horizontal) => {
	const { componentCls, railSize, handleSize, dotSize, marginFull, calc } = token;
	const railPadding = horizontal ? "paddingBlock" : "paddingInline";
	const full = horizontal ? "width" : "height";
	const part = horizontal ? "height" : "width";
	const handlePos = horizontal ? "insetBlockStart" : "insetInlineStart";
	const markInset = horizontal ? "top" : "insetInlineStart";
	const handlePosSize = calc(railSize).mul(3).sub(handleSize).div(2).equal();
	const draggableBorderSize = calc(handleSize).sub(railSize).div(2).equal();
	const draggableBorder = horizontal ? {
		borderWidth: `${unit(draggableBorderSize)} 0`,
		transform: `translateY(${unit(calc(draggableBorderSize).mul(-1).equal())})`
	} : {
		borderWidth: `0 ${unit(draggableBorderSize)}`,
		transform: `translateX(${unit(token.calc(draggableBorderSize).mul(-1).equal())})`
	};
	return {
		[railPadding]: railSize,
		[part]: calc(railSize).mul(3).equal(),
		[`${componentCls}-rail`]: {
			[full]: "100%",
			[part]: railSize
		},
		[`${componentCls}-track,${componentCls}-tracks`]: { [part]: railSize },
		[`${componentCls}-track-draggable`]: Object.assign({}, draggableBorder),
		[`${componentCls}-handle`]: { [handlePos]: handlePosSize },
		[`${componentCls}-mark`]: {
			insetInlineStart: 0,
			top: 0,
			[markInset]: calc(railSize).mul(3).add(horizontal ? 0 : marginFull).equal(),
			[full]: "100%"
		},
		[`${componentCls}-step`]: {
			insetInlineStart: 0,
			top: 0,
			[markInset]: railSize,
			[full]: "100%",
			[part]: railSize
		},
		[`${componentCls}-dot`]: {
			position: "absolute",
			[handlePos]: calc(railSize).sub(dotSize).div(2).equal()
		}
	};
};
const genHorizontalStyle = (token) => {
	const { componentCls, marginPartWithMark } = token;
	return { [`${componentCls}-horizontal`]: Object.assign(Object.assign({}, genDirectionStyle(token, true)), { [`&${componentCls}-with-marks`]: { marginBottom: marginPartWithMark } }) };
};
const genVerticalStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-vertical`]: Object.assign(Object.assign({}, genDirectionStyle(token, false)), { height: "100%" }) };
};
const prepareComponentToken = (token) => {
	const increaseHandleWidth = 1;
	const controlSize = token.controlHeightLG / 4;
	const controlSizeHover = token.controlHeightSM / 2;
	const handleLineWidth = token.lineWidth + increaseHandleWidth;
	const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 1.5;
	const handleActiveColor = token.colorPrimary;
	const handleActiveOutlineColor = new FastColor(handleActiveColor).setA(.2).toRgbString();
	return {
		controlSize,
		railSize: 4,
		handleSize: controlSize,
		handleSizeHover: controlSizeHover,
		dotSize: 8,
		handleLineWidth,
		handleLineWidthHover,
		railBg: token.colorFillTertiary,
		railHoverBg: token.colorFillSecondary,
		trackBg: token.colorPrimaryBorder,
		trackHoverBg: token.colorPrimaryBorderHover,
		handleColor: token.colorPrimaryBorder,
		handleActiveColor,
		handleActiveOutlineColor,
		handleColorDisabled: new FastColor(token.colorTextDisabled).onBackground(token.colorBgContainer).toHexString(),
		dotBorderColor: token.colorBorderSecondary,
		dotActiveBorderColor: token.colorPrimaryBorder,
		trackBgDisabled: token.colorBgContainerDisabled
	};
};
var style_default = genStyleHooks("Slider", (token) => {
	const sliderToken = merge(token, {
		marginPart: token.calc(token.controlHeight).sub(token.controlSize).div(2).equal(),
		marginFull: token.calc(token.controlSize).div(2).equal(),
		marginPartWithMark: token.calc(token.controlHeightLG).sub(token.controlSize).equal()
	});
	return [
		genBaseStyle(sliderToken),
		genHorizontalStyle(sliderToken),
		genVerticalStyle(sliderToken)
	];
}, prepareComponentToken);
init_raf();
function useRafLock() {
	const [state, setState] = import_react.useState(false);
	const rafRef = import_react.useRef(null);
	const cleanup = () => {
		raf_default.cancel(rafRef.current);
	};
	const setDelayState = (nextState) => {
		cleanup();
		if (nextState) setState(nextState);
		else rafRef.current = raf_default(() => {
			setState(nextState);
		});
	};
	import_react.useEffect(() => cleanup, []);
	return [state, setDelayState];
}
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
init_es$2();
init_raf();
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
function getTipFormatter(tipFormatter, legacyTipFormatter) {
	if (tipFormatter || tipFormatter === null) return tipFormatter;
	if (legacyTipFormatter || legacyTipFormatter === null) return legacyTipFormatter;
	return (val) => typeof val === "number" ? val.toString() : "";
}
const Slider = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, range, className, rootClassName, style, disabled, tooltipPrefixCls: legacyTooltipPrefixCls, tipFormatter: legacyTipFormatter, tooltipVisible: legacyTooltipVisible, getTooltipPopupContainer: legacyGetTooltipPopupContainer, tooltipPlacement: legacyTooltipPlacement, tooltip = {}, onChangeComplete, classNames: sliderClassNames, styles } = props, restProps = __rest(props, [
		"prefixCls",
		"range",
		"className",
		"rootClassName",
		"style",
		"disabled",
		"tooltipPrefixCls",
		"tipFormatter",
		"tooltipVisible",
		"getTooltipPopupContainer",
		"tooltipPlacement",
		"tooltip",
		"onChangeComplete",
		"classNames",
		"styles"
	]);
	const { vertical } = props;
	const { getPrefixCls, direction: contextDirection, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, getPopupContainer } = useComponentConfig("slider");
	const contextDisabled = import_react.useContext(DisabledContext_default);
	const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
	const { handleRender: contextHandleRender, direction: internalContextDirection } = import_react.useContext(Context_default);
	const mergedDirection = internalContextDirection || contextDirection;
	const isRTL = mergedDirection === "rtl";
	const [hoverOpen, setHoverOpen] = useRafLock();
	const [focusOpen, setFocusOpen] = useRafLock();
	const tooltipProps = Object.assign({}, tooltip);
	const { open: tooltipOpen, placement: tooltipPlacement, getPopupContainer: getTooltipPopupContainer, prefixCls: customizeTooltipPrefixCls, formatter: tipFormatter } = tooltipProps;
	const lockOpen = tooltipOpen !== null && tooltipOpen !== void 0 ? tooltipOpen : legacyTooltipVisible;
	const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;
	const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);
	const [dragging, setDragging] = useRafLock();
	const onInternalChangeComplete = (nextValues) => {
		onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(nextValues);
		setDragging(false);
	};
	const getTooltipPlacement = (placement, vert) => {
		if (placement) return placement;
		if (!vert) return "top";
		return isRTL ? "left" : "right";
	};
	const prefixCls = getPrefixCls("slider", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default(prefixCls);
	const rootClassNames = (0, import_classnames.default)(className, contextClassName, contextClassNames.root, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.root, rootClassName, {
		[`${prefixCls}-rtl`]: isRTL,
		[`${prefixCls}-lock`]: dragging
	}, hashId, cssVarCls);
	if (isRTL && !restProps.vertical) restProps.reverse = !restProps.reverse;
	import_react.useEffect(() => {
		const onMouseUp = () => {
			raf_default(() => {
				setFocusOpen(false);
			}, 1);
		};
		document.addEventListener("mouseup", onMouseUp);
		return () => {
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, []);
	const useActiveTooltipHandle = range && !lockOpen;
	const handleRender = contextHandleRender || ((node, info) => {
		const { index } = info;
		const nodeProps = node.props;
		function proxyEvent(eventName, event, triggerRestPropsEvent) {
			var _a, _b, _c, _d;
			if (triggerRestPropsEvent) (_b = (_a = restProps)[eventName]) === null || _b === void 0 || _b.call(_a, event);
			(_d = (_c = nodeProps)[eventName]) === null || _d === void 0 || _d.call(_c, event);
		}
		const passedProps = Object.assign(Object.assign({}, nodeProps), {
			onMouseEnter: (e) => {
				setHoverOpen(true);
				proxyEvent("onMouseEnter", e);
			},
			onMouseLeave: (e) => {
				setHoverOpen(false);
				proxyEvent("onMouseLeave", e);
			},
			onMouseDown: (e) => {
				setFocusOpen(true);
				setDragging(true);
				proxyEvent("onMouseDown", e);
			},
			onFocus: (e) => {
				var _a;
				setFocusOpen(true);
				(_a = restProps.onFocus) === null || _a === void 0 || _a.call(restProps, e);
				proxyEvent("onFocus", e, true);
			},
			onBlur: (e) => {
				var _a;
				setFocusOpen(false);
				(_a = restProps.onBlur) === null || _a === void 0 || _a.call(restProps, e);
				proxyEvent("onBlur", e, true);
			}
		});
		const cloneNode = /* @__PURE__ */ import_react.cloneElement(node, passedProps);
		const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;
		if (!useActiveTooltipHandle) return /* @__PURE__ */ import_react.createElement(SliderTooltip_default, Object.assign({}, tooltipProps, {
			prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
			title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
			value: info.value,
			open,
			placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
			key: index,
			classNames: { root: `${prefixCls}-tooltip` },
			getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
		}), cloneNode);
		return cloneNode;
	});
	const activeHandleRender = useActiveTooltipHandle ? (handle, info) => {
		const cloneNode = /* @__PURE__ */ import_react.cloneElement(handle, { style: Object.assign(Object.assign({}, handle.props.style), { visibility: "hidden" }) });
		return /* @__PURE__ */ import_react.createElement(SliderTooltip_default, Object.assign({}, tooltipProps, {
			prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
			title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
			open: mergedTipFormatter !== null && activeOpen,
			placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
			key: "tooltip",
			classNames: { root: `${prefixCls}-tooltip` },
			getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer,
			draggingDelete: info.draggingDelete
		}), cloneNode);
	} : void 0;
	const rootStyle = Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), styles === null || styles === void 0 ? void 0 : styles.root), style);
	const mergedTracks = Object.assign(Object.assign({}, contextStyles.tracks), styles === null || styles === void 0 ? void 0 : styles.tracks);
	const mergedTracksClassNames = (0, import_classnames.default)(contextClassNames.tracks, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.tracks);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(es_default, Object.assign({}, restProps, {
		classNames: Object.assign({
			handle: (0, import_classnames.default)(contextClassNames.handle, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.handle),
			rail: (0, import_classnames.default)(contextClassNames.rail, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.rail),
			track: (0, import_classnames.default)(contextClassNames.track, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.track)
		}, mergedTracksClassNames ? { tracks: mergedTracksClassNames } : {}),
		styles: Object.assign({
			handle: Object.assign(Object.assign({}, contextStyles.handle), styles === null || styles === void 0 ? void 0 : styles.handle),
			rail: Object.assign(Object.assign({}, contextStyles.rail), styles === null || styles === void 0 ? void 0 : styles.rail),
			track: Object.assign(Object.assign({}, contextStyles.track), styles === null || styles === void 0 ? void 0 : styles.track)
		}, Object.keys(mergedTracks).length ? { tracks: mergedTracks } : {}),
		step: restProps.step,
		range,
		className: rootClassNames,
		style: rootStyle,
		disabled: mergedDisabled,
		ref,
		prefixCls,
		handleRender,
		activeHandleRender,
		onChangeComplete: onInternalChangeComplete
	})));
});
var slider_default = Slider;
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const CopyButton = ({ tooltip, textToCopy, label, color = "var(--color-text-2)", hoverColor = "var(--color-primary)", size = 14 }) => {
	const { t } = useTranslation();
	const handleCopy = () => {
		navigator.clipboard.writeText(textToCopy).then(() => {
			window.toast?.success(t("message.copy.success"));
		}).catch(() => {
			window.toast?.error(t("message.copy.failed"));
		});
	};
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonContainer, {
		$color: color,
		$hoverColor: hoverColor,
		onClick: handleCopy,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			size,
			className: "copy-icon"
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightText, {
			size,
			children: label
		})]
	});
	if (tooltip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
		title: tooltip,
		children: button
	});
	return button;
};
const ButtonContainer = /* @__PURE__ */ dt.div.withConfig({ displayName: "ButtonContainer" })([
	`display:flex;flex-direction:row;align-items:center;gap:4px;cursor:pointer;color:`,
	`;transition:color 0.2s;.copy-icon{color:`,
	`;transition:color 0.2s;}&:hover{color:`,
	`;.copy-icon{color:`,
	`;}}`
], (props) => props.$color, (props) => props.$color, (props) => props.$hoverColor, (props) => props.$hoverColor);
const RightText = /* @__PURE__ */ dt.span.withConfig({ displayName: "RightText" })([`font-size:`, `px;`], (props) => props.size);
var CopyButton_default = CopyButton;
export { CopyButton_default as b, slider_default as c, Context_default as d };

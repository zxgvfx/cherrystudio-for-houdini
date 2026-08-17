import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { n as motion } from "./react-DvbaRg8q.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { t as Search } from "./search-Dz0ktO-n.js";
import { t as X } from "./x-Bh2_A30k.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CollapsibleSearchBar = ({ onSearch, value, placeholder = resolver_default.t("common.search"), tooltip = resolver_default.t("common.search"), clearLabel = resolver_default.t("common.clear"), icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
	size: 14,
	color: "var(--muted-foreground)"
}), maxWidth = "100%", collapsedSize = 32, animated = true, style }) => {
	const [searchVisible, setSearchVisible] = (0, import_react.useState)(false);
	const [internalSearchText, setInternalSearchText] = (0, import_react.useState)("");
	const searchText = value ?? internalSearchText;
	const inputRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const focusTriggerAfterCollapseRef = (0, import_react.useRef)(false);
	const handleTextChange = (0, import_react.useCallback)((text) => {
		if (value === void 0) setInternalSearchText(text);
		onSearch(text);
	}, [onSearch, value]);
	const handleClear = (0, import_react.useCallback)(() => {
		setInternalSearchText("");
		focusTriggerAfterCollapseRef.current = true;
		setSearchVisible(false);
		onSearch("");
	}, [onSearch]);
	(0, import_react.useEffect)(() => {
		if (searchVisible && inputRef.current) inputRef.current.focus();
		else if (focusTriggerAfterCollapseRef.current) {
			focusTriggerAfterCollapseRef.current = false;
			triggerRef.current?.focus();
		}
	}, [searchVisible]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"data-ui": "ui.collapsible-search-bar",
		initial: false,
		animate: searchVisible ? "expanded" : "collapsed",
		variants: {
			expanded: {
				width: maxWidth,
				transition: {
					duration: animated ? .3 : 0,
					ease: "easeInOut"
				}
			},
			collapsed: {
				width: collapsedSize,
				transition: {
					duration: animated ? .3 : 0,
					ease: "easeInOut"
				}
			}
		},
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			position: "relative",
			height: collapsedSize,
			minWidth: 0,
			overflow: "hidden",
			flexShrink: searchVisible ? 1 : 0
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: false,
			animate: searchVisible ? "expanded" : "collapsed",
			variants: {
				expanded: {
					width: "100%",
					opacity: 1,
					transition: {
						duration: animated ? .3 : 0,
						ease: "easeInOut"
					}
				},
				collapsed: {
					width: 0,
					opacity: 0,
					transition: {
						duration: animated ? .3 : 0,
						ease: "easeInOut"
					}
				}
			},
			style: {
				overflow: "hidden",
				flexShrink: 1
			},
			"aria-hidden": !searchVisible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					ref: inputRef,
					type: "search",
					"aria-label": tooltip,
					placeholder,
					value: searchText,
					tabIndex: searchVisible ? 0 : -1,
					className: "h-8 rounded-full pr-8 text-sm shadow-none focus-visible:border-ring focus-visible:ring-0",
					onChange: (e) => handleTextChange(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Escape") {
							e.stopPropagation();
							handleTextChange("");
							if (!searchText) {
								focusTriggerAfterCollapseRef.current = true;
								setSearchVisible(false);
							}
						}
					},
					onBlur: () => {
						if (!searchText) setSearchVisible(false);
					},
					style: {
						width: "100%",
						height: collapsedSize,
						...style
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": searchText ? clearLabel : tooltip,
					tabIndex: searchVisible ? 0 : -1,
					className: "absolute right-2 flex size-4 items-center justify-center text-muted-foreground hover:text-foreground",
					onMouseDown: (e) => e.preventDefault(),
					onClick: searchText ? handleClear : () => inputRef.current?.focus(),
					children: searchText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }) : icon
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			ref: triggerRef,
			type: "button",
			"aria-label": tooltip,
			"aria-hidden": searchVisible,
			tabIndex: searchVisible ? -1 : 0,
			initial: false,
			animate: searchVisible ? "hidden" : "visible",
			className: "rounded-lg transition-colors hover:bg-accent",
			variants: {
				visible: {
					opacity: 1,
					transition: {
						duration: animated ? .1 : 0,
						delay: animated ? .3 : 0,
						ease: "easeInOut"
					}
				},
				hidden: {
					opacity: 0,
					transition: {
						duration: animated ? .1 : 0,
						ease: "easeInOut"
					}
				}
			},
			style: {
				position: "absolute",
				right: 0,
				width: collapsedSize,
				height: collapsedSize,
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				pointerEvents: searchVisible ? "none" : "auto"
			},
			onClick: () => setSearchVisible(true),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: tooltip,
				delay: 500,
				children: icon
			})
		})]
	});
};
var CollapsibleSearchBar_default = (0, import_react.memo)(CollapsibleSearchBar);
export { CollapsibleSearchBar_default as t };

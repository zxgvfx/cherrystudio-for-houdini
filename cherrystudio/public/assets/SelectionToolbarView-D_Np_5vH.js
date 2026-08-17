import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as logo_default } from "./logo-QoERDEp9.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as ClipboardCheck } from "./clipboard-check-CB9pLSR8.js";
import { t as ClipboardCopy } from "./clipboard-copy-lv7tQqrz.js";
import { t as ClipboardX } from "./clipboard-x-4dvDzj55.js";
import { t as MessageSquareHeart } from "./message-square-heart-Df6e7XSt.js";
import { t as SelectionActionIcon_default } from "./SelectionActionIcon-DaNe9Ev1.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var COPY_ICON_CLASS_NAME = "absolute inset-0 size-4 transition-[color,opacity,transform] duration-300";
var ActionIcons = (0, import_react.memo)(({ actionItems, isCompact, handleAction, copyIconStatus, copyIconAnimation }) => {
	const { t } = useTranslation();
	const renderCopyIcon = (0, import_react.useCallback)(() => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: cn("btn-icon", COPY_ICON_CLASS_NAME, copyIconAnimation === "enter" && copyIconStatus !== "normal" && "scale-0 opacity-0", copyIconAnimation !== "enter" && "scale-100 opacity-100") }),
			copyIconStatus === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: cn("btn-icon text-primary", COPY_ICON_CLASS_NAME, copyIconAnimation === "enter" && "scale-100 opacity-100", copyIconAnimation !== "enter" && "scale-0 opacity-0") }),
			copyIconStatus === "fail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardX, { className: cn("btn-icon text-error", COPY_ICON_CLASS_NAME, copyIconAnimation === "enter" && "scale-100 opacity-100", copyIconAnimation !== "enter" && "scale-0 opacity-0") })
		] });
	}, [copyIconAnimation, copyIconStatus]);
	const renderActionButton = (0, import_react.useCallback)((action) => {
		const displayName = action.isBuiltIn ? t(action.name) : action.name;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			"data-ui": "selection.toolbar-view",
			type: "button",
			onClick: () => handleAction(action),
			title: isCompact ? displayName : void 0,
			"aria-label": displayName,
			className: cn("group m-0 flex h-full cursor-pointer! flex-row items-center justify-center gap-0.5 rounded-none border-0 bg-transparent px-2 py-0 shadow-none transition-colors duration-100 [-webkit-app-region:no-drag]", "last:rounded-r-[10px] last:py-0 last:pr-3 last:pl-2", "hover:bg-accent"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative flex size-4 items-center justify-center bg-transparent", "[&_svg]:text-card-foreground", "group-hover:[&_svg]:text-primary"),
				children: action.id === "copy" ? renderCopyIcon() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionActionIcon_default, {
					name: action.icon,
					className: "btn-icon absolute inset-0 size-full bg-transparent transition-colors duration-100",
					fallback: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareHeart, { className: "btn-icon absolute inset-0 size-full bg-transparent transition-colors duration-100" })
				})
			}), !isCompact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("btn-title m-0 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-card-foreground text-sm leading-[1.1] transition-colors duration-100", "group-hover:text-primary"),
				children: displayName
			})]
		}, action.id);
	}, [
		handleAction,
		isCompact,
		t,
		renderCopyIcon
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: actionItems?.map(renderActionButton) });
});
var SelectionToolbarView = ({ actionItems, isCompact, handleAction, copyIconStatus, copyIconAnimation, draggable = false, ref }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "selection.toolbar",
		ref,
		className: cn("m-[2px_3px_5px_3px]! box-border inline-flex h-9 select-none flex-row items-stretch overflow-hidden rounded-[10px] border-0 bg-card p-0! font-[var(--font-family-body)]", "shadow-[var(--selection-toolbar-shadow)] [--selection-toolbar-border:rgb(0_0_0_/_0.08)] [--selection-toolbar-shadow:0_2px_3px_rgb(50_50_50_/_0.1)]", "dark:[--selection-toolbar-border:rgb(255_255_255_/_0.2)] dark:[--selection-toolbar-shadow:0_2px_3px_rgb(50_50_50_/_0.3)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("m-0 flex items-center justify-center rounded-l-[10px] border-[var(--selection-toolbar-border)] border-solid bg-transparent [border-width:0.5px_0_0.5px_0.5px] [padding:0_6px_0_8px]", draggable && "[-webkit-app-region:drag]"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: logo_default,
				className: "size-[22px] rounded-full object-cover",
				draggable: false,
				alt: ""
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex flex-row items-center justify-center bg-transparent [-webkit-app-region:no-drag]", "rounded-[0_10px_10px_0] border-[var(--selection-toolbar-border)] border-solid [border-width:0.5px_0.5px_0.5px_0]"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcons, {
				actionItems,
				isCompact,
				handleAction,
				copyIconStatus,
				copyIconAnimation
			})
		})]
	});
};
var SelectionToolbarView_default = SelectionToolbarView;
export { SelectionToolbarView_default as t };

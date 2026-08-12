import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as Copy } from "./copy-DLNIVOlq.js";
import { t as useTemporaryValue } from "./useTemporaryValue-B7uYRu1H.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CopyButton = ({ tooltip, textToCopy, label, color = "var(--muted-foreground)", hoverColor = "var(--primary)", size = 14, successFeedback = "toast", className, style, onClick, type = "button", ...props }) => {
	const { t } = useTranslation();
	const [copied, setCopied] = useTemporaryValue(false);
	const handleCopy = (event) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		navigator.clipboard.writeText(textToCopy).then(() => {
			if (successFeedback === "icon") setCopied(true);
			else toast.success(t("message.copy.success"));
		}).catch(() => {
			toast.error(t("message.copy.failed"));
		});
	};
	const ariaLabel = props["aria-label"] || tooltip || t("common.copy");
	const buttonStyle = {
		...style,
		"--copy-button-color": color,
		"--copy-button-hover-color": hoverColor
	};
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		"data-ui": "ui.copy-button",
		type,
		className: cn("group flex cursor-pointer flex-row items-center gap-1 text-[var(--copy-button-color)] transition-colors hover:text-[var(--copy-button-hover-color)] disabled:cursor-not-allowed", className),
		style: buttonStyle,
		onClick: handleCopy,
		"aria-label": ariaLabel,
		...mergeUiProps(props, "ui.copy-button"),
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			size,
			className: "copy-icon shrink-0 text-success transition-colors"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			size,
			className: "copy-icon shrink-0 transition-colors"
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { fontSize: size },
			children: label
		})]
	});
	if (tooltip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltip,
		children: button
	});
	return button;
};
var CopyButton_default = CopyButton;
export { CopyButton_default as t };

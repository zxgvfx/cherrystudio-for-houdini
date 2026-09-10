import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as cn } from "./style-BQVh98fR.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as Check } from "./check-C3qUONPw.js";
import { t as Copy } from "./copy-DHwrRvn7.js";
import { t as useTemporaryValue } from "./useTemporaryValue-CJVn11gD.js";
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

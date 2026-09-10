import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Search } from "./search-Df0yvOuM.js";
import { t as X } from "./x-CpgRfh3_.js";
import { i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./input-group-ByE1Uj4h.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function SearchInput({ className, value, disabled, onClear, clearLabel, size, ...props }) {
	const hasValue = value !== void 0 && value !== null && String(value).length > 0;
	const showClear = onClear !== void 0 && clearLabel !== void 0 && hasValue;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		size,
		"data-disabled": disabled ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
				type: "search",
				value,
				disabled,
				className: cn("[&::-webkit-search-cancel-button]:hidden", className),
				...props
			}),
			showClear && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
				align: "inline-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
					type: "button",
					size: "icon-xs",
					"aria-label": clearLabel,
					disabled,
					onClick: onClear,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			})
		]
	});
}
export { SearchInput as t };

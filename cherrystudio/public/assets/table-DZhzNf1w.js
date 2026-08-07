import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.table.table-container part:table-container",
		"data-slot": "table-container",
		className: "relative w-full overflow-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-ui": "ui.table part:table",
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...mergeUiProps(props, "ui.table part:table")
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-ui": "ui.table-header part:table-header",
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...mergeUiProps(props, "ui.table-header part:table-header")
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-ui": "ui.table-body part:table-body",
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...mergeUiProps(props, "ui.table-body part:table-body")
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-ui": "ui.table-row part:table-row",
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
		...mergeUiProps(props, "ui.table-row part:table-row")
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-ui": "ui.table-head part:table-head",
		"data-slot": "table-head",
		className: cn("h-9 px-3 text-left align-middle font-medium text-muted-foreground", className),
		...mergeUiProps(props, "ui.table-head part:table-head")
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-ui": "ui.table-cell part:table-cell",
		"data-slot": "table-cell",
		className: cn("px-3 py-2 align-middle", className),
		...mergeUiProps(props, "ui.table-cell part:table-cell")
	});
}
export { TableHeader as a, TableHead as i, TableBody as n, TableRow as o, TableCell as r, Table as t };

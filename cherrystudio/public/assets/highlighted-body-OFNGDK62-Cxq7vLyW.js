import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import "./react-dom-D5lMhlFn.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { a as R$1, r as Li, t as At } from "./chunk-BO2N2NFS-fKJ-DR8B.js";
import "./extend-BDo4rIBl.js";
import "./marked.esm-5kn1DqGn.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var R = ({ code: s, language: e, raw: t, className: h, startLine: d, lineNumbers: m, ...p }) => {
	let { shikiTheme: l } = (0, import_react.useContext)(R$1), o = Li(), [a, i] = (0, import_react.useState)(t);
	return (0, import_react.useEffect)(() => {
		if (!o) {
			i(t);
			return;
		}
		let r = o.highlight({
			code: s,
			language: e,
			themes: l
		}, (c) => {
			i(c);
		});
		r && i(r);
	}, [
		s,
		e,
		l,
		o,
		t
	]), (0, import_jsx_runtime.jsx)(At, {
		className: h,
		language: e,
		lineNumbers: m,
		result: a,
		startLine: d,
		...p
	});
};
export { R as HighlightedCodeBlockBody };

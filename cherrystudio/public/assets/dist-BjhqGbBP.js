import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_react_dom } from "./react-dom-CKbeLgrG.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { n as createSlot } from "./dist-C0L0ClnX.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = createSlot(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
export { Primitive as t };

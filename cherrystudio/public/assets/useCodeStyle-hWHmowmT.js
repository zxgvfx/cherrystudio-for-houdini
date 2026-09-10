import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const CodeStyleContext = (0, import_react.createContext)(null);
const useCodeStyle = () => {
	const context = (0, import_react.use)(CodeStyleContext);
	if (!context) throw new Error("useCodeStyle must be used within a CodeStyleProvider");
	return context;
};
export { useCodeStyle as n, CodeStyleContext as t };

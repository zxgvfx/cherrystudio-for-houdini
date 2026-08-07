import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const CodeStyleContext = (0, import_react.createContext)(null);
const useCodeStyle = () => {
	const context = (0, import_react.use)(CodeStyleContext);
	if (!context) throw new Error("useCodeStyle must be used within a CodeStyleProvider");
	return context;
};
export { useCodeStyle as n, CodeStyleContext as t };

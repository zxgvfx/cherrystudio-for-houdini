import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const CodeStyleContext = (0, import_react.createContext)(null);
const useCodeStyle = () => {
	const context = (0, import_react.use)(CodeStyleContext);
	if (!context) throw new Error("useCodeStyle must be used within a CodeStyleProvider");
	return context;
};
export { useCodeStyle as n, CodeStyleContext as t };

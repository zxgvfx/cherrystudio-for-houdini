import { s as __toESM } from "./chunk-DiqNceaa.js";
import { c as ThemeMode } from "./PreferenceService-uLlqCRc6.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const ThemeContext = (0, import_react.createContext)({
	theme: ThemeMode.system,
	settedTheme: ThemeMode.dark,
	toggleTheme: () => {},
	setTheme: () => {}
});
const useTheme = () => (0, import_react.use)(ThemeContext);
export { useTheme as n, ThemeContext as t };

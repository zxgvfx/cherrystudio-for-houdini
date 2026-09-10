import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { c as ThemeMode } from "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const ThemeContext = (0, import_react.createContext)({
	theme: ThemeMode.system,
	settedTheme: ThemeMode.dark,
	toggleTheme: () => {},
	setTheme: () => {}
});
const useTheme = () => (0, import_react.use)(ThemeContext);
export { useTheme as n, ThemeContext as t };

import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { c as ThemeMode } from "./PreferenceService-ay5pWhVK.js";
import { t as require_react } from "./react-DXAbXv4a.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const ThemeContext = (0, import_react.createContext)({
	theme: ThemeMode.system,
	settedTheme: ThemeMode.dark,
	toggleTheme: () => {},
	setTheme: () => {}
});
const useTheme = () => (0, import_react.use)(ThemeContext);
export { useTheme as n, ThemeContext as t };

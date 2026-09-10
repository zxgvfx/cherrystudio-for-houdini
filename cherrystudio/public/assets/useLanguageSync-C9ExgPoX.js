import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { c as ThemeMode, t as preferenceService } from "./PreferenceService-CvpJqJd7.js";
import { a as isWin, r as isMac } from "./platform-fGkkNTU9.js";
import { t as DataApiDevtools } from "./dataApiDevtools-Bm4JBknU.js";
import { a as defaultLanguage, n as initI18n, r as resolver_default } from "./resolver-Bn-i1elC.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Alert } from "./alert-DCOQC5CT.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as ThemeContext } from "./useTheme-mM6gKAcD.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-DpcwPFwy.js";
import { t as formatErrorDetails } from "./errorDetails-CwhHRObo.js";
import { n as useUserTheme, t as hasV1CustomCssMarker } from "./customCssMigration-CzAWBFG-.js";
async function prepareWindow(options) {
	DataApiDevtools.exposeControlSurface();
	const preferencesWarm = options.preference === "all" ? preferenceService.preloadAll() : preferenceService.preload(options.preference);
	const prefs = options.preferenceTimeoutMs && options.preferenceTimeoutMs > 0 ? Promise.race([preferencesWarm, new Promise((resolve) => window.setTimeout(resolve, options.preferenceTimeoutMs))]) : preferencesWarm;
	await Promise.all([initI18n(), prefs]);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("ThemeProvider");
var THEME_PREFERENCE_OPTIONS = { optimistic: false };
var tailwindThemeChange = (theme) => {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(theme);
};
var getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? ThemeMode.dark : ThemeMode.light;
const ThemeProvider = ({ children }) => {
	const [settedTheme, setSettedTheme] = usePreference("ui.theme_mode", THEME_PREFERENCE_OPTIONS);
	const [language] = usePreference("app.language");
	const [actualTheme, setActualTheme] = (0, import_react.useState)(() => settedTheme === ThemeMode.light || settedTheme === ThemeMode.dark ? settedTheme : getSystemTheme());
	const { initUserTheme } = useUserTheme();
	useIpcOn("system.native_theme_updated", (actualTheme$1) => setActualTheme(actualTheme$1));
	const toggleTheme = () => {
		const nextTheme = {
			[ThemeMode.light]: ThemeMode.dark,
			[ThemeMode.dark]: ThemeMode.system,
			[ThemeMode.system]: ThemeMode.light
		}[settedTheme];
		setSettedTheme(nextTheme || ThemeMode.system);
	};
	(0, import_react.useEffect)(() => {
		document.body.setAttribute("os", isMac ? "mac" : isWin ? "windows" : "linux");
		if (actualTheme === ThemeMode.dark) {
			document.body.classList.remove("light");
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
			document.body.classList.add("light");
		}
		document.documentElement.lang = language || navigator.language;
		if (settedTheme !== ThemeMode.dark && settedTheme !== ThemeMode.light && settedTheme !== ThemeMode.system) setSettedTheme(ThemeMode.system);
		initUserTheme();
	}, [
		actualTheme,
		initUserTheme,
		language,
		setSettedTheme,
		settedTheme
	]);
	(0, import_react.useEffect)(() => {
		tailwindThemeChange(actualTheme);
	}, [actualTheme]);
	(0, import_react.useEffect)(() => {
		if (settedTheme === ThemeMode.light || settedTheme === ThemeMode.dark) {
			setActualTheme(settedTheme);
			return;
		}
		if (settedTheme !== ThemeMode.system) return;
		let active = true;
		ipcApi.request("system.get_native_theme").then((theme) => {
			if (active) setActualTheme(theme);
		}).catch((error) => logger.error("Failed to resolve system theme", error));
		return () => {
			active = false;
		};
	}, [settedTheme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext, {
		value: {
			theme: actualTheme,
			settedTheme,
			toggleTheme,
			setTheme: setSettedTheme
		},
		children
	});
};
const WindowFatalFallback = ({ error }) => {
	(0, import_react.useEffect)(() => {
		document.getElementById("spinner")?.remove();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.window-fatal-fallback",
		className: "flex h-screen w-screen flex-col items-center justify-center gap-4 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
			type: "error",
			message: resolver_default.t("error.boundary.default.message"),
			description: formatErrorDetails(error),
			className: "max-w-xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => void ipcApi.request("system.toggle_dev_tools"),
				children: resolver_default.t("error.boundary.default.devtools")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => void ipcApi.request("window.main.reload"),
				children: resolver_default.t("error.boundary.default.reload")
			})]
		})]
	});
};
var CUSTOM_CSS_ELEMENT_ID = "user-defined-custom-css";
function useCustomCssInjection(cssText) {
	(0, import_react.useEffect)(() => {
		document.getElementById(CUSTOM_CSS_ELEMENT_ID)?.remove();
		if (!cssText || hasV1CustomCssMarker(cssText)) return;
		const element = document.createElement("style");
		element.id = CUSTOM_CSS_ELEMENT_ID;
		element.textContent = cssText;
		document.head.appendChild(element);
		return () => {
			element.remove();
		};
	}, [cssText]);
}
function useCustomCss() {
	const [customCss] = usePreference("ui.custom_css");
	useCustomCssInjection(customCss);
}
function useLanguageSync() {
	const [language] = usePreference("app.language");
	(0, import_react.useEffect)(() => {
		const apply = () => {
			if (!resolver_default.isInitialized) return;
			resolver_default.changeLanguage(language || navigator.language || "en-US");
		};
		apply();
		if (resolver_default.isInitialized) return;
		resolver_default.on("initialized", apply);
		return () => {
			resolver_default.off("initialized", apply);
		};
	}, [language]);
}
export { prepareWindow as a, ThemeProvider as i, useCustomCss as n, WindowFatalFallback as r, useLanguageSync as t };

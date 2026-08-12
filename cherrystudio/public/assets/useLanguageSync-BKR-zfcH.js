import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { c as ThemeMode, t as preferenceService } from "./PreferenceService-uLlqCRc6.js";
import { a as isWin, r as isMac } from "./platform-YWZQ2_mC.js";
import { t as DataApiDevtools } from "./dataApiDevtools-BVBX5Q3R.js";
import { a as defaultLanguage, n as initI18n, r as resolver_default } from "./resolver-eUld2ti5.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Alert } from "./alert-BwuKGcCL.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as ThemeContext } from "./useTheme-C0NcZaKl.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BDTAufGC.js";
import { t as formatErrorDetails } from "./errorDetails-CsrPCSVK.js";
import { n as useUserTheme, t as hasV1CustomCssMarker } from "./customCssMigration-kFDGIria.js";
async function prepareWindow(options) {
	DataApiDevtools.exposeControlSurface();
	const preferencesWarm = options.preference === "all" ? preferenceService.preloadAll() : preferenceService.preload(options.preference);
	await Promise.all([initI18n(), preferencesWarm]);
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
		resolver_default.changeLanguage(language || navigator.language || "en-US");
	}, [language]);
}
export { prepareWindow as a, ThemeProvider as i, useCustomCss as n, WindowFatalFallback as r, useLanguageSync as t };

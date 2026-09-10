import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { c as ThemeMode } from "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as AbsoluteFilePathSchema } from "./file-OKCzlHoD.js";
import { r as toFileUrl } from "./file-CkrjUGO_.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as joinPath } from "./path-GEcgwPza.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("PrivacyPolicyDialog");
function getPrivacyPolicyAsset(language) {
	return language.toLowerCase().startsWith("zh") ? "privacy-zh.html" : "privacy-en.html";
}
function buildPrivacyPolicyUrl(resourcesPath, language, theme) {
	const filePath = AbsoluteFilePathSchema.parse(joinPath(resourcesPath, `cherry-studio/${getPrivacyPolicyAsset(language)}`));
	const themeName = theme === ThemeMode.dark ? "dark" : "light";
	return `${toFileUrl(filePath)}?theme=${themeName}`;
}
function PrivacyPolicyDialog({ open, onAccept, onDecline, acceptButtonText, isPending = false }) {
	const { t, i18n } = useTranslation();
	const { theme } = useTheme();
	const [privacyUrl, setPrivacyUrl] = (0, import_react.useState)("");
	const [loadFailed, setLoadFailed] = (0, import_react.useState)(false);
	const language = i18n.resolvedLanguage ?? i18n.language ?? "en-US";
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		setPrivacyUrl("");
		setLoadFailed(false);
		ipcApi.request("app.get_info").then(({ resourcesPath }) => {
			if (!cancelled) setPrivacyUrl(buildPrivacyPolicyUrl(resourcesPath, language, theme));
		}).catch((error) => {
			logger.error("Failed to load privacy policy resource", error);
			if (!cancelled) setLoadFailed(true);
		});
		return () => {
			cancelled = true;
		};
	}, [
		language,
		open,
		theme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: false,
			closeOnOverlayClick: false,
			className: "flex h-[min(85vh,760px)] max-h-[calc(100vh-2rem)] w-[min(900px,calc(100vw-2rem))] max-w-none flex-col gap-4 overflow-hidden p-5 sm:max-w-none",
			onEscapeKeyDown: (event) => event.preventDefault(),
			onPointerDownOutside: (event) => event.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("privacy_policy.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "sr-only",
						children: t("privacy_policy.title")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-md bg-background",
					children: privacyUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: privacyUrl,
						title: t("privacy_policy.title"),
						sandbox: "allow-scripts",
						className: "block h-full w-full border-0 bg-transparent"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-muted-foreground text-sm",
						children: [!loadFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loadFailed ? t("privacy_policy.load_failed") : t("common.loading") })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "shrink-0",
					children: [onDecline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						disabled: isPending,
						onClick: () => void onDecline(),
						children: t("common.decline")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						loading: isPending,
						onClick: () => void onAccept(),
						children: acceptButtonText ?? t("common.i_know")
					})]
				})
			]
		})
	});
}
export { PrivacyPolicyDialog as t };

import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as Divider } from "./divider-2gEjzcxJ.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import { i as Qs } from "./chunk-BO2N2NFS-CPhdpqIF.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
import { t as useAppUpdateState } from "./useAppUpdateState-CmzTKOOk.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var RELEASE_NOTE_CATEGORY_PREFIX = "release-note-category:";
var RELEASE_NOTE_CATEGORY_PATTERN = /^(\s*[-*+]\s+)\[([^\]`\r\n]{1,32})\](?=\s)/gm;
var formatReleaseNoteCategories = (releaseNotes) => releaseNotes.replace(RELEASE_NOTE_CATEGORY_PATTERN, (_match, listMarker, category) => `${listMarker}\`${RELEASE_NOTE_CATEGORY_PREFIX}${category.trim()}\``);
function ReleaseNoteInlineCode({ children, node, ...props }) {
	const value = typeof children === "string" ? children : "";
	if (value.startsWith(RELEASE_NOTE_CATEGORY_PREFIX)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.release-note-inline-code",
		className: "inline-flex items-center whitespace-nowrap rounded-sm border border-border-subtle bg-background-subtle px-1.5 py-0.5 align-middle font-medium text-foreground text-xs leading-4",
		children: value.slice(22)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		"data-ui": "ui.release-note-inline-code",
		...mergeUiProps(props, "ui.release-note-inline-code"),
		children
	});
}
const ReleaseNotes = ({ content, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.release-notes",
	className: cn("markdown text-muted-foreground text-sm leading-6 [&>div>p:first-child]:text-[15px] [&>div>p:not(:first-child)]:pt-2 [&>div>p]:font-medium [&>div>p]:text-foreground [&>div]:space-y-3 [&_li]:my-0! [&_li]:py-1 [&_ol]:my-0! [&_ol]:list-outside [&_ol]:pl-5 [&_p]:m-0! [&_ul]:my-0! [&_ul]:list-outside [&_ul]:pl-5", className),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
		mode: "static",
		components: { inlineCode: ReleaseNoteInlineCode },
		children: formatReleaseNoteCategories(content)
	})
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("UpdateDialog");
var PopupContainer = ({ releaseInfo, open, resolve }) => {
	const { t } = useTranslation();
	const [isInstalling, setIsInstalling] = (0, import_react.useState)(false);
	const { updateAppUpdateState } = useAppUpdateState();
	(0, import_react.useEffect)(() => {
		if (releaseInfo) logger.info("Update dialog opened", { version: releaseInfo.version });
	}, [releaseInfo]);
	const handleInstall = async () => {
		setIsInstalling(true);
		try {
			await ipcApi.request("app.updater.quit_and_install");
			resolve({});
		} catch (error) {
			logger.error("Failed to save data before update", error);
			setIsInstalling(false);
			toast.error(t("update.saveDataError"));
		}
	};
	const onCancel = () => {
		updateAppUpdateState({ manualCheck: false });
		resolve({});
	};
	const onIgnore = () => {
		updateAppUpdateState({
			ignore: true,
			manualCheck: false
		});
		resolve({});
	};
	const onOpenChange = (nextOpen) => {
		if (!nextOpen) onCancel();
	};
	const releaseNotes = releaseInfo?.releaseNotes;
	const releaseNotesText = typeof releaseNotes === "string" ? releaseNotes : Array.isArray(releaseNotes) ? releaseNotes.map((note) => note.note).filter(Boolean).join("\n\n") : t("update.noReleaseNotes");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[720px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "pr-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("update.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: t("update.message").replace("{{version}}", releaseInfo?.version || "")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
					className: "max-h-96 overflow-x-hidden pr-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseNotes, { content: releaseNotesText })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "my-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onIgnore,
					disabled: isInstalling,
					children: t("update.later")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleInstall,
					loading: isInstalling,
					children: t("update.install")
				})] })
			]
		})
	});
};
var UpdateDialogPopup_default = createPopup(PopupContainer, { dismissResult: {} });
export { ReleaseNotes as n, UpdateDialogPopup_default as t };

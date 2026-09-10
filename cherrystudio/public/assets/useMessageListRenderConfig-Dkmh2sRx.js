import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_dayjs_min } from "./dayjs.min-BBb2vAs7.js";
import { n as t } from "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { c as writeComposerRichClipboardContent } from "./composerClipboard-DBhZr-TC.js";
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
async function exportTableToExcel(data) {
	if (data.length === 0) return false;
	const XLSX = await __vitePreload(() => import("./xlsx-DXlpCiW4.js"), [], import.meta.url);
	const worksheet = XLSX.utils.aoa_to_sheet(data);
	worksheet["!cols"] = data[0].map((_, colIndex) => {
		const maxLength = Math.max(...data.map((row) => (row[colIndex] || "").toString().length));
		return { wch: Math.min(Math.max(maxLength + 2, 10), 50) };
	});
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
	const buffer = XLSX.write(workbook, {
		type: "array",
		bookType: "xlsx"
	});
	const uint8Array = new Uint8Array(buffer);
	const fileName = `table_${(0, import_dayjs_min.default)().format("YYYY-MM-DD_HHmmss")}.xlsx`;
	const savedPath = await window.api.file.save(fileName, uint8Array, { filters: [{
		name: t("common.export.excel"),
		extensions: ["xlsx"]
	}] });
	return Boolean(savedPath);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function useMessagePlatformActions() {
	const copyText = (0, import_react.useCallback)(async (text, options) => {
		if (!text && options?.emptyMessage) {
			toast.warning(options.emptyMessage);
			return;
		}
		await navigator.clipboard.writeText(text);
		if (options?.successMessage) toast.success(options.successMessage);
	}, []);
	const copyImage = (0, import_react.useCallback)(async (blob, options) => {
		await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
		if (options?.successMessage) toast.success(options.successMessage);
	}, []);
	const copyRichContent = (0, import_react.useCallback)(async (content, options) => {
		await writeComposerRichClipboardContent(content);
		if (options?.successMessage) toast.success(options.successMessage);
	}, []);
	const exportTableAsExcel = (0, import_react.useCallback)((data) => {
		return exportTableToExcel(data);
	}, []);
	const notifyInfo = (0, import_react.useCallback)((message) => {
		toast.info(message);
	}, []);
	const notifySuccess = (0, import_react.useCallback)((message) => {
		toast.success(message);
	}, []);
	const notifyWarning = (0, import_react.useCallback)((message) => {
		toast.warning(message);
	}, []);
	const notifyError = (0, import_react.useCallback)((message) => {
		toast.error(message);
	}, []);
	return (0, import_react.useMemo)(() => ({
		copyText,
		copyRichContent,
		copyImage,
		exportTableAsExcel,
		notifyInfo,
		notifySuccess,
		notifyWarning,
		notifyError
	}), [
		copyImage,
		copyRichContent,
		copyText,
		exportTableAsExcel,
		notifyError,
		notifyInfo,
		notifySuccess,
		notifyWarning
	]);
}
function useMessageListRenderConfig() {
	const [userName] = usePreference("app.user.name");
	const [narrowMode] = usePreference("chat.narrow_mode");
	const [messageStyle] = usePreference("chat.message.style");
	const [messageFont] = usePreference("chat.message.font");
	const [fontSize] = usePreference("chat.message.font_size");
	const [renderInputMessageAsMarkdown] = usePreference("chat.message.render_as_markdown");
	const [codeFancyBlock] = usePreference("chat.code.fancy_block");
	const [thoughtAutoCollapse] = usePreference("chat.message.thought.auto_collapse");
	const [mathEnableSingleDollar] = usePreference("chat.message.math.single_dollar");
	const [showMessageOutline] = usePreference("chat.message.show_outline");
	const [showEstimatedTokens] = usePreference("chat.input.show_estimated_tokens");
	const [multiModelMessageStyle] = usePreference("chat.message.multi_model.style");
	const [multiModelGridColumns, setMultiModelGridColumns] = usePreference("chat.message.multi_model.grid_columns");
	const [multiModelGridPopoverTrigger, setMultiModelGridPopoverTrigger] = usePreference("chat.message.multi_model.grid_popover_trigger");
	const showMessageUsage = typeof window !== "undefined" && "qt" in window || showEstimatedTokens;
	return {
		renderConfig: (0, import_react.useMemo)(() => ({
			userName,
			narrowMode,
			messageStyle,
			messageFont,
			fontSize,
			renderInputMessageAsMarkdown,
			codeFancyBlock,
			thoughtAutoCollapse,
			collapseCompletedToolHistory: true,
			mathEnableSingleDollar,
			showMessageOutline,
			showEstimatedTokens: showMessageUsage,
			multiModelMessageStyle,
			multiModelGridColumns,
			multiModelGridPopoverTrigger
		}), [
			fontSize,
			codeFancyBlock,
			mathEnableSingleDollar,
			messageFont,
			messageStyle,
			multiModelGridColumns,
			multiModelGridPopoverTrigger,
			multiModelMessageStyle,
			narrowMode,
			renderInputMessageAsMarkdown,
			showMessageUsage,
			showMessageOutline,
			thoughtAutoCollapse,
			userName
		]),
		updateRenderConfig: (0, import_react.useCallback)((updates) => {
			if (typeof updates.multiModelGridColumns === "number") setMultiModelGridColumns(updates.multiModelGridColumns);
			if (updates.multiModelGridPopoverTrigger) setMultiModelGridPopoverTrigger(updates.multiModelGridPopoverTrigger);
		}, [setMultiModelGridColumns, setMultiModelGridPopoverTrigger])
	};
}
export { useMessagePlatformActions as n, useMessageListRenderConfig as t };

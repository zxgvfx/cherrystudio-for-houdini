import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { a as isWin, r as isMac } from "./platform-YWZQ2_mC.js";
var logger = loggerService.withContext("Utils:Input");
const getTextFromDropEvent = async (e) => {
	return e.dataTransfer.getData("text");
};
const getFilesFromDropEvent = async (e) => {
	if (e.dataTransfer.files.length > 0) {
		const filePromises = [...e.dataTransfer.files].map(async (file) => {
			try {
				const filePath = window.api.file.getPathForFile(file);
				if (filePath) return window.api.file.get(filePath);
				return null;
			} catch (error) {
				logger.error("getFilesFromDropEvent - getPathForFile error:", error);
				return null;
			}
		});
		const results = await Promise.allSettled(filePromises);
		const list = [];
		for (const result of results) if (result.status === "fulfilled" && result.value !== null) list.push(result.value);
		else if (result.status === "rejected") logger.error("getFilesFromDropEvent:", result.reason);
		return list;
	} else return new Promise((resolve) => {
		let existCodefilesFormat = false;
		for (const item of e.dataTransfer.items) {
			const { type } = item;
			if (type === "codefiles") {
				item.getAsString(async (filePathListString) => {
					const filePathListPromises = JSON.parse(filePathListString).map((filePath) => window.api.file.get(filePath));
					resolve(await Promise.allSettled(filePathListPromises).then((results) => results.filter((result) => result.status === "fulfilled").filter((result) => result.value !== null).map((result) => result.value)));
				});
				existCodefilesFormat = true;
				break;
			}
		}
		if (!existCodefilesFormat) resolve([]);
	});
};
const getSendMessageShortcutLabel = (shortcut) => {
	switch (shortcut) {
		case "Enter": return "Enter";
		case "Ctrl+Enter": return "Ctrl + Enter";
		case "Alt+Enter": return `${isMac ? "⌥" : "Alt"} + Enter`;
		case "Command+Enter": return `${isMac ? "⌘" : isWin ? "Win" : "Super"} + Enter`;
		case "Shift+Enter": return "Shift + Enter";
		default: return shortcut;
	}
};
export { getSendMessageShortcutLabel as n, getTextFromDropEvent as r, getFilesFromDropEvent as t };

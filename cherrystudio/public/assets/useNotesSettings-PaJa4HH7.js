import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as useMultiplePreferences } from "./usePreference-78czMD_R.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { r as getFileDirectory } from "./file-DfGDXADI.js";
var logger$1 = loggerService.withContext("NotesService");
var MARKDOWN_EXT = ".md";
var defaultNotesPathPromise = null;
function projectNotesTree(root, notesPath) {
	const rootPath = normalizePath(notesPath);
	return Object.values(root.children).map((child) => projectChild(child, rootPath));
}
function projectChild(node, rootPath) {
	const isFile = node.kind === "file";
	const externalPath = node.path;
	const baseName = node.basename;
	const displayName = isFile && baseName.toLowerCase().endsWith(MARKDOWN_EXT) ? baseName.slice(0, -3) : baseName;
	const relative = relativePath(externalPath, rootPath);
	const treePath = isFile ? `/${stripMarkdownExt(relative)}` : `/${relative}`.replace(/\/+$/, "") || "/";
	const stats = node.stats;
	const projected = {
		id: externalPath,
		name: displayName,
		type: isFile ? "file" : "folder",
		treePath,
		externalPath,
		createdAt: stats?.birthtime ? new Date(stats.birthtime).toISOString() : "",
		updatedAt: stats?.mtime ? new Date(stats.mtime).toISOString() : ""
	};
	if (!isFile && node.isTreeDir()) projected.children = Object.values(node.children).map((c) => projectChild(c, rootPath));
	return projected;
}
function relativePath(absolute, rootPath) {
	if (absolute === rootPath) return "";
	if (absolute.startsWith(`${rootPath}/`)) return absolute.slice(rootPath.length + 1);
	return absolute;
}
function stripMarkdownExt(p) {
	return p.toLowerCase().endsWith(MARKDOWN_EXT) ? p.slice(0, -3) : p;
}
function sortTree(nodes, sortType) {
	const cloned = nodes.map((node) => ({
		...node,
		children: node.children ? sortTree(node.children, sortType) : void 0
	}));
	const sorter = getSorter(sortType);
	cloned.sort((a, b) => {
		if (a.type === b.type) return sorter(a, b);
		return a.type === "folder" ? -1 : 1;
	});
	return cloned;
}
async function addDir(name, parentPath) {
	const basePath = (await resolveNotesPath(parentPath)).path;
	const { safeName } = await window.api.file.checkFileName(basePath, name, false);
	const fullPath = `${basePath}/${safeName}`;
	await window.api.file.mkdir(fullPath);
	return {
		path: fullPath,
		name: safeName
	};
}
async function addNote(name, content = "", parentPath) {
	const basePath = (await resolveNotesPath(parentPath)).path;
	const { safeName } = await window.api.file.checkFileName(basePath, name, true);
	const notePath = `${basePath}/${safeName}${MARKDOWN_EXT}`;
	await window.api.file.write(notePath, content);
	return {
		path: notePath,
		name: safeName
	};
}
async function getDefaultNotesPath() {
	if (!defaultNotesPathPromise) defaultNotesPathPromise = ipcApi.request("app.get_info").then((appInfo) => normalizePath(appInfo.notesPath)).catch((error) => {
		defaultNotesPathPromise = null;
		throw error;
	});
	return defaultNotesPathPromise;
}
async function resolveNotesPath(parentPath) {
	const basePath = normalizePath(parentPath || "");
	const defaultNotesPath = await getDefaultNotesPath();
	if (!basePath) return {
		path: defaultNotesPath,
		isFallback: true
	};
	if (basePath === defaultNotesPath) return {
		path: basePath,
		isFallback: false
	};
	try {
		if (await window.api.file.validateNotesDirectory(basePath)) return {
			path: basePath,
			isFallback: false
		};
	} catch (error) {
		logger$1.warn("Failed to validate notes directory, fallback to default", {
			basePath,
			error: error.message
		});
		return {
			path: defaultNotesPath,
			isFallback: true
		};
	}
	logger$1.warn("Invalid notes path, fallback to default", {
		invalidPath: basePath,
		defaultNotesPath
	});
	return {
		path: defaultNotesPath,
		isFallback: true
	};
}
async function delNode(node) {
	if (node.type === "folder") await window.api.file.deleteExternalDir(node.externalPath);
	else await window.api.file.deleteExternalFile(node.externalPath);
}
async function renameNode(node, newName) {
	const isFile = node.type === "file";
	const parentDir = normalizePath(getFileDirectory(node.externalPath));
	const { safeName, exists } = await window.api.file.checkFileName(parentDir, newName, isFile);
	if (exists) throw new Error(`Target name already exists: ${safeName}`);
	if (isFile) {
		await window.api.file.rename(node.externalPath, safeName);
		return {
			path: `${parentDir}/${safeName}${MARKDOWN_EXT}`,
			name: safeName
		};
	}
	await window.api.file.renameDir(node.externalPath, safeName);
	return {
		path: `${parentDir}/${safeName}`,
		name: safeName
	};
}
async function uploadNotes(files, targetPath) {
	const basePath = normalizePath(targetPath);
	const totalFiles = files.length;
	if (files.length === 0) return {
		uploadedNodes: [],
		totalFiles: 0,
		skippedFiles: 0,
		failedFiles: 0,
		fileCount: 0,
		folderCount: 0
	};
	try {
		const filePaths = [];
		for (const file of files) if (file.path) filePaths.push(file.path);
		else {
			logger$1.warn("File without path detected, using fallback method");
			return uploadNotesLegacy(files, targetPath);
		}
		const result = await window.api.file.batchUploadMarkdown(filePaths, basePath);
		return {
			uploadedNodes: [],
			totalFiles,
			skippedFiles: result.skippedFiles,
			failedFiles: result.failedFiles,
			fileCount: result.fileCount,
			folderCount: result.folderCount
		};
	} catch (error) {
		logger$1.error("Batch upload failed:", error);
		throw error;
	}
}
async function uploadNotesLegacy(files, targetPath) {
	const basePath = normalizePath(targetPath);
	const markdownFiles = filterMarkdown(files);
	const skippedFiles = files.length - markdownFiles.length;
	if (markdownFiles.length === 0) return {
		uploadedNodes: [],
		totalFiles: files.length,
		skippedFiles,
		failedFiles: 0,
		fileCount: 0,
		folderCount: 0
	};
	const folders = collectFolders(markdownFiles, basePath);
	await createFolders(folders);
	let fileCount = 0;
	let failedFiles = 0;
	const BATCH_SIZE = 5;
	for (let i = 0; i < markdownFiles.length; i += BATCH_SIZE) {
		const batch = markdownFiles.slice(i, i + BATCH_SIZE);
		(await Promise.allSettled(batch.map(async (file) => {
			const { dir, name } = resolveFileTarget(file, basePath);
			const { safeName } = await window.api.file.checkFileName(dir, name, true);
			const finalPath = `${dir}/${safeName}${MARKDOWN_EXT}`;
			const content = await file.text();
			await window.api.file.write(finalPath, content);
			return true;
		}))).forEach((result) => {
			if (result.status === "fulfilled") fileCount += 1;
			else {
				failedFiles += 1;
				logger$1.error("Failed to write uploaded file:", result.reason);
			}
		});
		if (i + BATCH_SIZE < markdownFiles.length) await new Promise((resolve) => setTimeout(resolve, 0));
	}
	return {
		uploadedNodes: [],
		totalFiles: files.length,
		skippedFiles,
		failedFiles,
		fileCount,
		folderCount: folders.size
	};
}
function getSorter(sortType) {
	switch (sortType) {
		case "sort_a2z": return (a, b) => a.name.localeCompare(b.name, void 0, {
			numeric: true,
			sensitivity: "accent"
		});
		case "sort_z2a": return (a, b) => b.name.localeCompare(a.name, void 0, {
			numeric: true,
			sensitivity: "accent"
		});
		case "sort_updated_desc": return (a, b) => getTime(b.updatedAt) - getTime(a.updatedAt);
		case "sort_updated_asc": return (a, b) => getTime(a.updatedAt) - getTime(b.updatedAt);
		case "sort_created_desc": return (a, b) => getTime(b.createdAt) - getTime(a.createdAt);
		case "sort_created_asc": return (a, b) => getTime(a.createdAt) - getTime(b.createdAt);
		default: return (a, b) => a.name.localeCompare(b.name, void 0, {
			numeric: true,
			sensitivity: "accent"
		});
	}
}
function getTime(value) {
	return value ? new Date(value).getTime() : 0;
}
function normalizePath(value) {
	return value.replace(/\\/g, "/");
}
function filterMarkdown(files) {
	return files.filter((file) => file.name.toLowerCase().endsWith(MARKDOWN_EXT));
}
function collectFolders(files, basePath) {
	const folders = /* @__PURE__ */ new Set();
	files.forEach((file) => {
		const relativePath$1 = file.webkitRelativePath || "";
		if (!relativePath$1.includes("/")) return;
		const parts = relativePath$1.split("/");
		parts.pop();
		let current = basePath;
		for (const part of parts) {
			current = `${current}/${part}`;
			folders.add(current);
		}
	});
	return folders;
}
async function createFolders(folders) {
	const ordered = Array.from(folders).sort((a, b) => a.length - b.length);
	for (const folder of ordered) try {
		await window.api.file.mkdir(folder);
	} catch (error) {
		logger$1.error("Failed to create folder while uploading notes", error);
		throw error;
	}
}
function resolveFileTarget(file, basePath) {
	if (!file.webkitRelativePath || !file.webkitRelativePath.includes("/")) return {
		dir: basePath,
		name: file.name.endsWith(MARKDOWN_EXT) ? file.name.slice(0, -3) : file.name
	};
	const parts = file.webkitRelativePath.split("/");
	const fileName = parts.pop() || file.name;
	return {
		dir: `${basePath}/${parts.join("/")}`,
		name: fileName.endsWith(MARKDOWN_EXT) ? fileName.slice(0, -3) : fileName
	};
}
var logger = loggerService.withContext("useNotesSettings");
var NOTES_SETTINGS_PREFERENCE_KEYS = {
	isFullWidth: "feature.notes.full_width",
	fontFamily: "feature.notes.font_family",
	fontSize: "feature.notes.font_size",
	showTableOfContents: "feature.notes.show_table_of_contents",
	defaultViewMode: "feature.notes.default_view_mode",
	defaultEditMode: "feature.notes.default_edit_mode",
	showTabStatus: "feature.notes.show_tab_status",
	notesPath: "feature.notes.path",
	sortType: "feature.notes.sort_type"
};
const useNotesSettings = () => {
	const { t } = useTranslation();
	const [values, setValues] = useMultiplePreferences(NOTES_SETTINGS_PREFERENCE_KEYS);
	const settings = {
		isFullWidth: values.isFullWidth,
		fontFamily: values.fontFamily,
		fontSize: values.fontSize,
		showTableOfContents: values.showTableOfContents,
		defaultViewMode: values.defaultViewMode,
		defaultEditMode: values.defaultEditMode,
		showTabStatus: values.showTabStatus
	};
	const updateSettings = (newSettings) => {
		setValues(newSettings).catch((error) => {
			logger.error("Failed to update notes settings", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	const updateNotesPath = (path) => {
		setValues({ notesPath: path }).catch((error) => {
			logger.error("Failed to update notes path", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	const updateSortType = (value) => {
		setValues({ sortType: value }).catch((error) => {
			logger.error("Failed to update notes sort type", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	return {
		settings,
		updateSettings,
		notesPath: values.notesPath,
		updateNotesPath,
		sortType: values.sortType,
		updateSortType
	};
};
export { projectNotesTree as a, sortTree as c, delNode as i, uploadNotes as l, addDir as n, renameNode as o, addNote as r, resolveNotesPath as s, useNotesSettings as t };

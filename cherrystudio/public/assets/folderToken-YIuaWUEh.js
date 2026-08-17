import { t as AbsoluteFilePathSchema } from "./file-BaEpIJyZ.js";
import { x as canonicalizeFilePath } from "./file-C52KaMrN.js";
import { t as joinPath } from "./path-BMCMV7F6.js";
import { r as createComposerSecureRandomId } from "./composerFileTokenSource-D7rGs7Mx.js";
const WORKSPACE_ROOT_ID = "__workspace_root__";
const getArtifactPaneSelectionPath = (selection) => canonicalizeFilePath(`${selection.workspacePath}/${selection.filePath}`);
const getPathBasename = (path) => {
	const trimmed = path.trim().replace(/[\\/]+$/, "");
	if (!trimmed) return path;
	return trimmed.split(/[/\\]+/).filter(Boolean).at(-1) ?? trimmed;
};
const normalizeTreePath = (path) => {
	const normalized = path.trim().replace(/\\/g, "/");
	const withoutTrailingSlash = normalized.replace(/\/+$/, "");
	if (/^[A-Za-z]:$/.test(withoutTrailingSlash)) return `${withoutTrailingSlash}/`;
	if (!withoutTrailingSlash && normalized.startsWith("/")) return "/";
	return withoutTrailingSlash;
};
const isAbsoluteTreePath = (path) => path.startsWith("/") || /^[A-Za-z]:\//.test(path);
const hasParentTraversal = (path) => path.split(/[/\\]+/).some((segment) => segment === "..");
const getPathDirname = (path) => {
	const normalized = normalizeTreePath(path);
	const basename = getPathBasename(normalized);
	if (!basename || normalized === basename) return "";
	const dirname = normalized.slice(0, normalized.length - basename.length).replace(/\/+$/, "");
	if (!dirname && normalized.startsWith("/")) return "/";
	if (/^[A-Za-z]:$/.test(dirname)) return `${dirname}/`;
	return dirname;
};
const normalizeArtifactPaneFilePath = (workspacePath, rawPath) => {
	const workspace = normalizeTreePath(workspacePath);
	const normalized = normalizeTreePath(rawPath);
	if (!normalized) return null;
	if (normalized === workspace) return null;
	if (workspace === "/" && normalized.startsWith("/")) return normalized.slice(1);
	if (normalized.startsWith(`${workspace}/`)) return normalized.slice(workspace.length + 1);
	if (isAbsoluteTreePath(normalized)) return null;
	return normalized.replace(/^\/+/, "");
};
const resolveArtifactPaneFileSelection = (workspacePath, rawPath) => {
	const normalizedRawPath = normalizeTreePath(rawPath);
	if (!normalizedRawPath) return null;
	const parsedWorkspacePath = workspacePath ? AbsoluteFilePathSchema.safeParse(workspacePath) : null;
	const normalizedWorkspacePath = parsedWorkspacePath?.success ? normalizeTreePath(parsedWorkspacePath.data) : null;
	const windowsWorkspaceMatch = normalizedWorkspacePath?.match(/^([A-Za-z]):\/(.+)$/);
	const malformedWorkspacePrefix = windowsWorkspaceMatch ? `${windowsWorkspaceMatch[1]}:${windowsWorkspaceMatch[2]}`.toLowerCase() : null;
	const normalizedRawPathKey = normalizedRawPath.toLowerCase();
	const isMalformedWorkspacePath = malformedWorkspacePrefix !== null && (normalizedRawPathKey === malformedWorkspacePrefix || normalizedRawPathKey.startsWith(`${malformedWorkspacePrefix}/`));
	if (normalizedWorkspacePath && /^[A-Za-z]:\//.test(normalizedWorkspacePath) && /^[A-Za-z]:(?=[^/])/.test(normalizedRawPath) && !isMalformedWorkspacePath) return null;
	const normalized = isMalformedWorkspacePath ? normalizedRawPath.replace(/^([A-Za-z]:)(?=[^/])/, "$1/") : normalizedRawPath;
	if (parsedWorkspacePath?.success) {
		const validWorkspacePath = parsedWorkspacePath.data;
		const workspaceFilePath = normalizeArtifactPaneFilePath(validWorkspacePath, normalized);
		if (workspaceFilePath) {
			if (!hasParentTraversal(workspaceFilePath)) return {
				workspacePath: validWorkspacePath,
				filePath: workspaceFilePath
			};
			const resolvedAbsolute = joinPath(normalizeTreePath(validWorkspacePath), workspaceFilePath);
			const escapedWorkspacePath = getPathDirname(resolvedAbsolute);
			const escapedFilePath = getPathBasename(resolvedAbsolute);
			return escapedWorkspacePath && escapedFilePath && escapedFilePath !== escapedWorkspacePath ? {
				workspacePath: escapedWorkspacePath,
				filePath: escapedFilePath
			} : null;
		}
	}
	if (!isAbsoluteTreePath(normalized)) return null;
	const externalWorkspacePath = getPathDirname(normalized);
	const filePath = getPathBasename(normalized);
	if (!externalWorkspacePath || !filePath || filePath === externalWorkspacePath) return null;
	return {
		workspacePath: externalWorkspacePath,
		filePath
	};
};
function createComposerFolderToken(path) {
	return {
		id: createComposerSecureRandomId("folder-token"),
		kind: "folder",
		label: getPathBasename(path),
		description: path,
		promptText: path
	};
}
export { normalizeArtifactPaneFilePath as a, getPathBasename as i, WORKSPACE_ROOT_ID as n, resolveArtifactPaneFileSelection as o, getArtifactPaneSelectionPath as r, createComposerFolderToken as t };

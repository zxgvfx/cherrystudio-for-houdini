import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as TreeDir, o as TreeFile, s as rootFromSerialized } from "./file-DzPAqnYr.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useDirectoryTree");
function indexTree(root) {
	const map = /* @__PURE__ */ new Map();
	root.walk((n) => {
		map.set(n.path, n);
	});
	return map;
}
function applyMutation(state, event) {
	if (event.type === "added") {
		if (state.nodes.has(event.path)) return false;
		const parent = state.nodes.get(event.parentPath);
		if (!parent || !(parent instanceof TreeDir)) return false;
		const node$1 = event.kind === "directory" ? new TreeDir({
			path: event.path,
			stats: event.stats
		}) : new TreeFile({
			path: event.path,
			stats: event.stats
		});
		parent.attachChild(node$1);
		state.nodes.set(event.path, node$1);
		return true;
	}
	if (event.type === "removed") {
		const node$1 = state.nodes.get(event.path);
		if (!node$1) return false;
		if (node$1 instanceof TreeDir) {
			const drop = [];
			node$1.walk((n) => {
				if (n !== node$1) drop.push(n.path);
			});
			for (const p of drop) state.nodes.delete(p);
		}
		state.nodes.delete(event.path);
		node$1.remove();
		return true;
	}
	if (event.type === "renamed") {
		const node$1 = state.nodes.get(event.oldPath);
		if (!node$1) return false;
		const oldPaths = [node$1.path];
		if (node$1 instanceof TreeDir) node$1.walk((n) => {
			if (n !== node$1) oldPaths.push(n.path);
		});
		node$1.path = event.newPath;
		for (const p of oldPaths) state.nodes.delete(p);
		state.nodes.set(node$1.path, node$1);
		if (node$1 instanceof TreeDir) node$1.walk((n) => {
			if (n !== node$1) state.nodes.set(n.path, n);
		});
		return true;
	}
	const node = state.nodes.get(event.path);
	if (!node) return false;
	node.stats = event.stats;
	return true;
}
function useDirectoryTree(rootPath, options) {
	const normalizedRootPath = rootPath?.replace(/\\/g, "/");
	const [root, setRoot] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [version, setVersion] = (0, import_react.useState)(0);
	const [treeId, setTreeId] = (0, import_react.useState)(null);
	const mirrorRef = (0, import_react.useRef)(null);
	const optionsRef = (0, import_react.useRef)(options);
	optionsRef.current = options;
	(0, import_react.useEffect)(() => {
		if (!rootPath) {
			setRoot(null);
			setError(null);
			setIsLoading(false);
			setTreeId(null);
			mirrorRef.current = null;
			return;
		}
		let cancelled = false;
		let unsubscribeMutations = null;
		let createdTreeId = null;
		setRoot(null);
		setIsLoading(true);
		setError(null);
		const disposeTree = (treeId$1) => {
			Promise.resolve(window.api.tree.dispose(treeId$1)).catch((err) => {
				logger.error(`Failed to dispose tree ${treeId$1}`, err);
			});
		};
		(async () => {
			try {
				const result = await window.api.tree.create(rootPath, optionsRef.current);
				if (cancelled) {
					disposeTree(result.treeId);
					return;
				}
				createdTreeId = result.treeId;
				const snapshotRoot = rootFromSerialized(result.snapshot);
				mirrorRef.current = {
					root: snapshotRoot,
					nodes: indexTree(snapshotRoot)
				};
				setRoot(snapshotRoot);
				setTreeId(result.treeId);
				setIsLoading(false);
				unsubscribeMutations = window.api.tree.onMutation((payload) => {
					if (payload.treeId !== result.treeId) return;
					const mirror = mirrorRef.current;
					if (!mirror) return;
					if (applyMutation(mirror, payload.event)) setVersion((v) => v + 1);
				});
			} catch (err) {
				if (cancelled) return;
				const normalized = err instanceof Error ? err : new Error(String(err));
				if (normalized.name === "DirectoryTreeStoppedError") {
					setIsLoading(false);
					return;
				}
				logger.error(`Failed to create directory tree for ${rootPath}`, normalized);
				setError(normalized);
				setIsLoading(false);
			}
		})();
		return () => {
			cancelled = true;
			unsubscribeMutations?.();
			if (createdTreeId) disposeTree(createdTreeId);
			mirrorRef.current = null;
			setTreeId(null);
		};
	}, [rootPath]);
	const currentRoot = root?.path === normalizedRootPath ? root : null;
	const getNode = (0, import_react.useCallback)((absPath) => {
		const mirror = mirrorRef.current;
		if (!mirror || mirror.root.path !== normalizedRootPath) return null;
		return mirror.nodes.get(absPath) ?? null;
	}, [normalizedRootPath]);
	return {
		root: currentRoot,
		isLoading,
		error,
		version,
		treeId: currentRoot ? treeId : null,
		getNode
	};
}
function flattenTreeToFiles(nodes) {
	return nodes.flatMap((node) => {
		if (node.type === "file") return [node];
		return node.children ? flattenTreeToFiles(node.children) : [];
	});
}
function normalizePathValue(path) {
	return path.replace(/\\/g, "/");
}
function findNode(tree, nodeId) {
	for (const node of tree) {
		if (node.id === nodeId) return node;
		if (node.children) {
			const found = findNode(node.children, nodeId);
			if (found) return found;
		}
	}
	return null;
}
function findNodeByPath(tree, targetPath) {
	for (const node of tree) {
		if (node.treePath === targetPath || node.externalPath === targetPath) return node;
		if (node.children) {
			const found = findNodeByPath(node.children, targetPath);
			if (found) return found;
		}
	}
	return null;
}
function updateTreeNode(nodes, nodeId, updater) {
	let changed = false;
	const nextNodes = nodes.map((node) => {
		if (node.id === nodeId) {
			changed = true;
			const updated = updater(node);
			if (updated.type === "folder" && !updated.children) return {
				...updated,
				children: []
			};
			return updated;
		}
		if (node.children && node.children.length > 0) {
			const updatedChildren = updateTreeNode(node.children, nodeId, updater);
			if (updatedChildren !== node.children) {
				changed = true;
				return {
					...node,
					children: updatedChildren
				};
			}
		}
		return node;
	});
	return changed ? nextNodes : nodes;
}
function findParent(tree, nodeId) {
	for (const node of tree) {
		if (!node.children) continue;
		if (node.children.some((child) => child.id === nodeId)) return node;
		const found = findParent(node.children, nodeId);
		if (found) return found;
	}
	return null;
}
function reorderTreeNodes(nodes, sourceId, targetId, position) {
	const [updatedNodes, moved] = reorderSiblings(nodes, sourceId, targetId, position);
	if (moved) return updatedNodes;
	let changed = false;
	const nextNodes = nodes.map((node) => {
		if (!node.children || node.children.length === 0) return node;
		const reorderedChildren = reorderTreeNodes(node.children, sourceId, targetId, position);
		if (reorderedChildren !== node.children) {
			changed = true;
			return {
				...node,
				children: reorderedChildren
			};
		}
		return node;
	});
	return changed ? nextNodes : nodes;
}
function reorderSiblings(nodes, sourceId, targetId, position) {
	const sourceIndex = nodes.findIndex((node) => node.id === sourceId);
	const targetIndex = nodes.findIndex((node) => node.id === targetId);
	if (sourceIndex === -1 || targetIndex === -1) return [nodes, false];
	const updated = [...nodes];
	const [sourceNode] = updated.splice(sourceIndex, 1);
	let insertIndex = targetIndex;
	if (sourceIndex < targetIndex) insertIndex -= 1;
	if (position === "after") insertIndex += 1;
	if (insertIndex < 0) insertIndex = 0;
	if (insertIndex > updated.length) insertIndex = updated.length;
	updated.splice(insertIndex, 0, sourceNode);
	return [updated, true];
}
export { normalizePathValue as a, useDirectoryTree as c, flattenTreeToFiles as i, findNodeByPath as n, reorderTreeNodes as o, findParent as r, updateTreeNode as s, findNode as t };

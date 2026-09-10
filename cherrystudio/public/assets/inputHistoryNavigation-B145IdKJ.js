import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var ComposerContext = (0, import_react.createContext)(null);
const ComposerContextProvider = ComposerContext.Provider;
function useComposerContext() {
	return (0, import_react.use)(ComposerContext);
}
function useActiveComposerOverride() {
	return selectActiveComposerOverride(useComposerContext()?.overrides);
}
function selectActiveComposerOverride(overrides) {
	if (!overrides?.length) return null;
	let active = null;
	for (const override of overrides) if (!active || (override.priority ?? 0) > (active.priority ?? 0)) active = override;
	return active;
}
function getNextInputHistoryIndex({ currentIndex, direction, messagesLength }) {
	if (messagesLength === 0) return currentIndex;
	if (direction === "up") return currentIndex < messagesLength - 1 ? currentIndex + 1 : currentIndex;
	if (currentIndex > 0) return currentIndex - 1;
	if (currentIndex === 0) return -1;
	return currentIndex;
}
function shouldHandleInputHistoryNavigation({ isAllSelected, isComposing, isCursorAtHistoryBoundary, isQuickPanelVisible, key, text }) {
	if (isComposing || isQuickPanelVisible) return false;
	if (key !== "ArrowUp" && key !== "ArrowDown") return false;
	return text.trim().length === 0 || isAllSelected || isCursorAtHistoryBoundary;
}
export { useActiveComposerOverride as i, shouldHandleInputHistoryNavigation as n, ComposerContextProvider as r, getNextInputHistoryIndex as t };

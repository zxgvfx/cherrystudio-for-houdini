import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useCloseBeforeAction(onOpenChange) {
	const pendingFrameIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	return (0, import_react.useCallback)((action) => {
		onOpenChange(false);
		const pendingFrame = { completedSynchronously: false };
		pendingFrame.id = window.requestAnimationFrame(() => {
			pendingFrame.completedSynchronously = true;
			if (pendingFrame.id !== void 0) pendingFrameIdsRef.current.delete(pendingFrame.id);
			action();
		});
		if (!pendingFrame.completedSynchronously) pendingFrameIdsRef.current.add(pendingFrame.id);
	}, [onOpenChange]);
}
export { useCloseBeforeAction as t };

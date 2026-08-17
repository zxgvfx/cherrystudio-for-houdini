import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useResizeDrag({ onMove, onEnd, cursor = "col-resize" }) {
	const onMoveRef = (0, import_react.useRef)(onMove);
	const onEndRef = (0, import_react.useRef)(onEnd);
	const cleanupRef = (0, import_react.useRef)(null);
	const [isResizing, setIsResizing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		onMoveRef.current = onMove;
	}, [onMove]);
	(0, import_react.useEffect)(() => {
		onEndRef.current = onEnd;
	}, [onEnd]);
	(0, import_react.useEffect)(() => {
		return () => cleanupRef.current?.();
	}, []);
	return {
		isResizing,
		startResizing: (0, import_react.useCallback)((event) => {
			event.preventDefault();
			cleanupRef.current?.();
			let active = true;
			const previousCursor = document.body.style.cursor;
			const previousUserSelect = document.body.style.userSelect;
			document.body.style.cursor = cursor;
			document.body.style.userSelect = "none";
			setIsResizing(true);
			const onMouseMove = (moveEvent) => {
				if (!active) return;
				onMoveRef.current(moveEvent, cleanup);
			};
			let cleanup = () => {};
			const onVisibilityChange = () => {
				if (document.hidden) cleanup();
			};
			cleanup = () => {
				if (!active) return;
				active = false;
				setIsResizing(false);
				document.body.style.cursor = previousCursor;
				document.body.style.userSelect = previousUserSelect;
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", cleanup);
				document.removeEventListener("mouseleave", cleanup);
				document.removeEventListener("visibilitychange", onVisibilityChange);
				window.removeEventListener("blur", cleanup);
				if (cleanupRef.current === cleanup) cleanupRef.current = null;
				onEndRef.current?.();
			};
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", cleanup);
			document.addEventListener("mouseleave", cleanup);
			document.addEventListener("visibilitychange", onVisibilityChange);
			window.addEventListener("blur", cleanup);
			cleanupRef.current = cleanup;
		}, [cursor])
	};
}
export { useResizeDrag as t };

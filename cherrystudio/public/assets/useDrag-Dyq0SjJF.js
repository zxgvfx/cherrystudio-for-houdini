import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useDrag = (onDrop) => {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	return {
		isDragging,
		setIsDragging,
		handleDragOver: (0, import_react.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
		}, []),
		handleDragEnter: (0, import_react.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
		}, []),
		handleDragLeave: (0, import_react.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			if (e.currentTarget.contains(e.relatedTarget)) return;
			setIsDragging(false);
		}, []),
		handleDrop: (0, import_react.useCallback)(async (e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
			await onDrop?.(e);
		}, [onDrop])
	};
};
export { useDrag as t };

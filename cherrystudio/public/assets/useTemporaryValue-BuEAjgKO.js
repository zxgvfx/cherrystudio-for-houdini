import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useTemporaryValue = (defaultValue, duration = 2e3) => {
	const [value, setValue] = (0, import_react.useState)(defaultValue);
	const timeoutRef = (0, import_react.useRef)(null);
	const setTemporaryValue = (0, import_react.useCallback)((tempValue) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setValue(tempValue);
		if (tempValue !== defaultValue) timeoutRef.current = setTimeout(() => {
			setValue(defaultValue);
			timeoutRef.current = null;
		}, duration);
	}, [defaultValue, duration]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	return [value, setTemporaryValue];
};
export { useTemporaryValue as t };

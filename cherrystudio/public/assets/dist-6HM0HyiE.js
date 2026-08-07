import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
export { useCallbackRef as t };

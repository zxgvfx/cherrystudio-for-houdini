import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useTimer = () => {
	const timeoutMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const intervalMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const clearTimeoutTimer = (0, import_react.useCallback)((key) => {
		clearTimeout(timeoutMapRef.current.get(key));
		timeoutMapRef.current.delete(key);
	}, []);
	const clearIntervalTimer = (0, import_react.useCallback)((key) => {
		clearInterval(intervalMapRef.current.get(key));
		intervalMapRef.current.delete(key);
	}, []);
	const clearAllTimers = (0, import_react.useCallback)(() => {
		timeoutMapRef.current.forEach((timer) => clearTimeout(timer));
		intervalMapRef.current.forEach((timer) => clearInterval(timer));
		timeoutMapRef.current.clear();
		intervalMapRef.current.clear();
	}, []);
	(0, import_react.useEffect)(() => {
		return () => clearAllTimers();
	}, [clearAllTimers]);
	return {
		setTimeoutTimer: (0, import_react.useCallback)((key, ...args) => {
			clearTimeout(timeoutMapRef.current.get(key));
			const timer = setTimeout(...args);
			timeoutMapRef.current.set(key, timer);
			return () => clearTimeoutTimer(key);
		}, [clearTimeoutTimer]),
		setIntervalTimer: (0, import_react.useCallback)((key, ...args) => {
			clearInterval(intervalMapRef.current.get(key));
			const timer = setInterval(...args);
			intervalMapRef.current.set(key, timer);
			return () => clearIntervalTimer(key);
		}, [clearIntervalTimer]),
		clearTimeoutTimer,
		clearIntervalTimer,
		clearAllTimeoutTimers: (0, import_react.useCallback)(() => {
			timeoutMapRef.current.forEach((timer) => clearTimeout(timer));
			timeoutMapRef.current.clear();
		}, []),
		clearAllIntervalTimers: (0, import_react.useCallback)(() => {
			intervalMapRef.current.forEach((timer) => clearInterval(timer));
			intervalMapRef.current.clear();
		}, []),
		clearAllTimers
	};
};
export { useTimer as t };

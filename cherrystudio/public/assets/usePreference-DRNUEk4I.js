import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { n as getDefaultValue, t as preferenceService } from "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("usePreference");
var DEFAULT_PREFERENCE_OPTIONS = { optimistic: true };
function usePreference(key, options = DEFAULT_PREFERENCE_OPTIONS) {
	const rawValue = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => preferenceService.subscribeChange(key)(callback), [key]), (0, import_react.useCallback)(() => preferenceService.getCachedValue(key), [key]), () => void 0);
	(0, import_react.useEffect)(() => {
		if (rawValue === void 0) preferenceService.get(key).catch((error) => {
			logger.error(`Failed to load initial preference ${key}:`, error);
		});
	}, [key, rawValue]);
	return [rawValue !== void 0 ? rawValue : getDefaultValue(key), (0, import_react.useCallback)(async (newValue) => {
		try {
			await preferenceService.set(key, newValue, options);
		} catch (error) {
			logger.error(`Failed to set preference ${key}:`, error);
			throw error;
		}
	}, [key, options])];
}
function useMultiplePreferences(keys, options = DEFAULT_PREFERENCE_OPTIONS) {
	const keyList = (0, import_react.useMemo)(() => Object.values(keys), [keys]);
	const lastSnapshotRef = (0, import_react.useRef)({});
	const rawValues = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => {
		const unsubscribeFunctions = keyList.map((key) => preferenceService.subscribeChange(key)(callback));
		return () => {
			unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
		};
	}, [keyList]), (0, import_react.useCallback)(() => {
		let hasChanged = Object.keys(lastSnapshotRef.current).length === 0;
		const newSnapshot = {};
		for (const [localKey, prefKey] of Object.entries(keys)) {
			const currentValue = preferenceService.getCachedValue(prefKey);
			newSnapshot[localKey] = currentValue;
			if (!hasChanged && lastSnapshotRef.current[localKey] !== currentValue) hasChanged = true;
		}
		if (hasChanged) lastSnapshotRef.current = newSnapshot;
		return lastSnapshotRef.current;
	}, [keys]), () => ({}));
	(0, import_react.useEffect)(() => {
		const uncachedKeys = keyList.filter((key) => {
			const localKey = Object.keys(keys).find((k) => keys[k] === key);
			return (localKey ? rawValues[localKey] : void 0) === void 0 && !preferenceService.isCached(key);
		});
		if (uncachedKeys.length > 0) preferenceService.getMultipleRaw(uncachedKeys).catch((error) => {
			logger.error("Failed to load initial preferences:", error);
		});
	}, [
		keyList,
		rawValues,
		keys
	]);
	return [(0, import_react.useMemo)(() => {
		const result = {};
		for (const [localKey, prefKey] of Object.entries(keys)) {
			const rawValue = rawValues[localKey];
			result[localKey] = rawValue !== void 0 ? rawValue : getDefaultValue(prefKey);
		}
		return result;
	}, [keys, rawValues]), (0, import_react.useCallback)(async (updates) => {
		try {
			const prefUpdates = {};
			for (const [localKey, value] of Object.entries(updates)) {
				const prefKey = keys[localKey];
				if (prefKey) prefUpdates[prefKey] = value;
			}
			await preferenceService.setMultiple(prefUpdates, options);
		} catch (error) {
			logger.error("Failed to update preferences:", error);
			throw error;
		}
	}, [keys, options])];
}
export { usePreference as n, useMultiplePreferences as t };

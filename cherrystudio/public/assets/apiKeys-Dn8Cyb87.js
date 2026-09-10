import { t as isArrayLike } from "./isArrayLike-DSMO0VXj.js";
function compact$1(arr) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (item) result.push(item);
	}
	return result;
}
function compact(arr) {
	if (!isArrayLike(arr)) return [];
	return compact$1(Array.from(arr));
}
function uniq$1(arr) {
	return [...new Set(arr)];
}
function uniq(arr) {
	if (!isArrayLike(arr)) return [];
	return uniq$1(Array.from(arr));
}
function normalizeApiKeys(keys) {
	return uniq(compact(keys.map((key) => key.trim())));
}
function validateApiKey(key, existingKeys, emptyError, duplicateError) {
	const trimmedKey = key.trim();
	if (!trimmedKey) return {
		isValid: false,
		error: emptyError
	};
	if (existingKeys.some((existingKey) => existingKey.trim() === trimmedKey)) return {
		isValid: false,
		error: duplicateError
	};
	return { isValid: true };
}
function replaceApiKey(keys, index, key) {
	if (index < 0 || index >= keys.length) return null;
	const nextKeys = [...keys];
	nextKeys[index] = key;
	return normalizeApiKeys(nextKeys);
}
function removeApiKey(keys, index) {
	if (index < 0 || index >= keys.length) return null;
	return normalizeApiKeys(keys.filter((_, itemIndex) => itemIndex !== index));
}
export { validateApiKey as i, removeApiKey as n, replaceApiKey as r, normalizeApiKeys as t };

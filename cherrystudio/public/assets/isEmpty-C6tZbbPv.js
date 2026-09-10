import { n as isBuffer } from "./isEqual-C7zEE0RK.js";
import { t as isArrayLike } from "./isArrayLike-DSMO0VXj.js";
import { n as isTypedArray, r as isArguments, t as isPrototype } from "./isPrototype-CLntiGJ2.js";
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value)) {
		if (typeof value.splice !== "function" && typeof value !== "string" && !isBuffer(value) && !isTypedArray(value) && !isArguments(value)) return false;
		return value.length === 0;
	}
	if (typeof value === "object" || typeof value === "function") {
		if (value instanceof Map || value instanceof Set) return value.size === 0;
		const keys = Object.keys(value);
		if (isPrototype(value)) return keys.filter((x) => x !== "constructor").length === 0;
		return keys.length === 0;
	}
	return true;
}
export { isEmpty as t };

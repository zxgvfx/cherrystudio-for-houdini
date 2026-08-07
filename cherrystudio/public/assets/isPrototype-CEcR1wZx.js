import { T as getTag } from "./isEqual-DO7BtJs5.js";
function isTypedArray(x) {
	return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function isArguments(value) {
	return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
}
function isTypedArray$1(x) {
	return isTypedArray(x);
}
function isPrototype(value) {
	const constructor = value?.constructor;
	return value === (typeof constructor === "function" ? constructor.prototype : Object.prototype);
}
export { isTypedArray as i, isTypedArray$1 as n, isArguments as r, isPrototype as t };

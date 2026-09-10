function isLength(value) {
	return Number.isSafeInteger(value) && value >= 0;
}
function isArrayLike(value) {
	return value != null && typeof value !== "function" && isLength(value.length);
}
export { isArrayLike as t };

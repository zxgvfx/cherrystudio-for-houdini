import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { t as toArray } from "./toArray-DryE-6I0.js";
function head(arr) {
	return arr[0];
}
function head$1(arr) {
	if (!isArrayLike(arr)) return;
	return head(toArray(arr));
}
export { head$1 as t };

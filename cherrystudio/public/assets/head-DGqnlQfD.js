import { t as isArrayLike } from "./isArrayLike-DSMO0VXj.js";
import { t as toArray } from "./toArray-7j3m6EaV.js";
function head(arr) {
	return arr[0];
}
function head$1(arr) {
	if (!isArrayLike(arr)) return;
	return head(toArray(arr));
}
export { head$1 as t };

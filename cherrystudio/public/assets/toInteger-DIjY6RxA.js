function isSymbol(value) {
	return typeof value === "symbol" || value instanceof Symbol;
}
function toNumber(value) {
	if (isSymbol(value)) return NaN;
	return Number(value);
}
function toFinite(value) {
	if (!value) return value === 0 ? value : 0;
	value = toNumber(value);
	if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
	return value === value ? value : 0;
}
function toInteger(value) {
	const finite = toFinite(value);
	const remainder = finite % 1;
	return remainder ? finite - remainder : finite;
}
export { isSymbol as n, toInteger as t };

function clampSurrogateBoundary(text, index) {
	if (index <= 0 || index >= text.length) return index;
	const high = text.charCodeAt(index - 1);
	const low = text.charCodeAt(index);
	if (high >= 55296 && high <= 56319 && low >= 56320 && low <= 57343) return index - 1;
	return index;
}
export { clampSurrogateBoundary as t };

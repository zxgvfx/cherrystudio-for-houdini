function parseDataUrl(url) {
	if (!url.startsWith("data:")) return null;
	const commaIndex = url.indexOf(",");
	if (commaIndex === -1) return null;
	const [rawMediaType, ...parameters] = url.slice(5, commaIndex).split(";");
	const isBase64 = parameters.some((parameter) => parameter.trim().toLowerCase() === "base64");
	return {
		mediaType: rawMediaType.trim() || void 0,
		isBase64,
		data: url.slice(commaIndex + 1)
	};
}
export { parseDataUrl as t };

const fromUtf8 = (input) => new TextEncoder().encode(input);
const toUtf8 = (input) => {
	if (typeof input === "string") return input;
	if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
	return new TextDecoder("utf-8").decode(input);
};
export { fromUtf8 as n, toUtf8 as t };

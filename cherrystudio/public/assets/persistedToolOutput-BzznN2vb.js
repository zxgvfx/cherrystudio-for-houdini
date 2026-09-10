function isPersistedToolOutput(value) {
	if (typeof value !== "object" || value === null) return false;
	const ref = value.$persistedToolOutput;
	return typeof ref === "object" && ref !== null;
}
function blobRefsOf(ref) {
	if (ref.shape === "entities") return ref.blobRefs;
	const { fileEntryId, vfsFilename, head, tail, totalChars, totalLines } = ref;
	return [{
		key: "",
		fileEntryId,
		vfsFilename,
		head,
		tail,
		totalChars,
		totalLines
	}];
}
function envelopeDisplayExcerpt(ref) {
	const blobs = blobRefsOf(ref);
	return {
		head: blobs[0].head,
		tail: blobs[blobs.length - 1].tail,
		totalChars: blobs.reduce((sum, b) => sum + b.totalChars, 0),
		totalLines: blobs.reduce((sum, b) => sum + b.totalLines, 0)
	};
}
export { isPersistedToolOutput as n, envelopeDisplayExcerpt as t };

import { t as AbsoluteFilePathSchema } from "./file-BaEpIJyZ.js";
import { a as getComposerFileTokenSourceId, n as createComposerFileTokenSourceId } from "./composerFileTokenSource-D7rGs7Mx.js";
function toComposerAttachment(meta) {
	return {
		fileTokenSourceId: getComposerFileTokenSourceId(meta) ?? createComposerFileTokenSourceId(),
		path: AbsoluteFilePathSchema.parse(meta.path),
		name: meta.name,
		origin_name: meta.origin_name,
		ext: meta.ext,
		size: meta.size,
		type: meta.type,
		...meta.composerFileKind && { composerFileKind: meta.composerFileKind }
	};
}
function toComposerAttachments(metas) {
	return metas.map(toComposerAttachment);
}
export { toComposerAttachments as n, toComposerAttachment as t };

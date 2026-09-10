import { C as string, E as url, S as strictObject, c as discriminatedUnion, g as number, n as _enum, p as literal, u as int } from "./schemas-1oAyIgyK.js";
const FILE_TYPE = {
	IMAGE: "image",
	VIDEO: "video",
	AUDIO: "audio",
	TEXT: "text",
	DOCUMENT: "document",
	OTHER: "other"
};
const FileTypeSchema = _enum([
	FILE_TYPE.IMAGE,
	FILE_TYPE.VIDEO,
	FILE_TYPE.AUDIO,
	FILE_TYPE.TEXT,
	FILE_TYPE.DOCUMENT,
	FILE_TYPE.OTHER
]);
const AbsoluteFilePathSchema = string().min(1).refine((s) => !s.includes("\0"), "must not contain null bytes").refine((s) => s.startsWith("/") || /^[A-Za-z]:[/\\]/.test(s) || /^\\\\[^\\]+\\[^\\]+/.test(s), "must be an absolute filesystem path").brand();
string().regex(/^data:[^;,]+;base64,.+$/);
url().refine((value) => value.startsWith("http://") || value.startsWith("https://"));
const SafeExtSchema = string().min(1).max(255).refine((s) => !s.includes("\0"), "Extension must not contain null bytes").refine((s) => !/[/\\]/.test(s), "Extension must not contain path separators").refine((s) => !s.includes("."), "Extension must be bare (no dots), e.g. \"pdf\" not \".pdf\"").refine((s) => !/\s/.test(s), "Extension must not contain whitespace");
strictObject({
	mtime: number(),
	size: int().nonnegative()
});
var physicalMetadataBaseSchema = {
	size: int().nonnegative(),
	createdAt: number().nonnegative(),
	modifiedAt: number().nonnegative()
};
var physicalFileMetadataBaseSchema = {
	...physicalMetadataBaseSchema,
	kind: literal("file"),
	mime: string()
};
discriminatedUnion("kind", [strictObject({
	...physicalMetadataBaseSchema,
	kind: literal("directory")
}), discriminatedUnion("type", [
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.IMAGE),
		width: number().nonnegative().optional(),
		height: number().nonnegative().optional()
	}),
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.DOCUMENT),
		pageCount: int().nonnegative().optional()
	}),
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.TEXT),
		encoding: string().optional()
	}),
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.AUDIO)
	}),
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.VIDEO)
	}),
	strictObject({
		...physicalFileMetadataBaseSchema,
		type: literal(FILE_TYPE.OTHER)
	})
])]);
strictObject({
	path: AbsoluteFilePathSchema,
	name: string(),
	ext: string().nullable(),
	size: int().nonnegative(),
	mime: string(),
	type: FileTypeSchema,
	createdAt: int().nonnegative(),
	modifiedAt: int().nonnegative()
}).brand();
export { SafeExtSchema as i, FILE_TYPE as n, FileTypeSchema as r, AbsoluteFilePathSchema as t };

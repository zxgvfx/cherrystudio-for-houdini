import { i as KnowledgeBaseErrorCodeSchema, o as KnowledgeItemErrorCodeSchema } from "./knowledge-8Me8AnnG.js";
var translateKnowledgeBaseErrorCode = (code, t) => {
	switch (code) {
		case "missing_embedding_model": return t("knowledge.error.missing_embedding_model");
		case "missing_vector_store": return t("knowledge.error.missing_vector_store");
		default: return code;
	}
};
const getKnowledgeBaseFailureReason = (base, t) => {
	const parsedCode = KnowledgeBaseErrorCodeSchema.safeParse(base.error);
	if (parsedCode.success) return translateKnowledgeBaseErrorCode(parsedCode.data, t);
	return t("knowledge.error.failed_base_unknown");
};
var translateKnowledgeItemErrorCode = (code, t) => {
	switch (code) {
		case "directory_not_migrated": return t("knowledge.error.directory_not_migrated");
		case "indexing_interrupted": return t("knowledge.error.indexing_interrupted");
		default: return code;
	}
};
const getKnowledgeItemFailureReason = (item, t) => {
	const parsedCode = KnowledgeItemErrorCodeSchema.safeParse(item.error);
	if (parsedCode.success) return translateKnowledgeItemErrorCode(parsedCode.data, t);
	return item.error;
};
const normalizeKnowledgeError = (error) => {
	if (error instanceof Error) return error;
	return new Error(String(error));
};
export { getKnowledgeItemFailureReason as n, normalizeKnowledgeError as r, getKnowledgeBaseFailureReason as t };

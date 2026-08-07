import { C as string, _ as object, a as array, c as discriminatedUnion, n as _enum, p as literal, y as partialRecord } from "./schemas-CV_EtlSZ.js";
import { a as FILE_PROCESSOR_IDS, i as FILE_PROCESSOR_FEATURES, o as FILE_PROCESSOR_TYPES } from "./PreferenceService-Ba0ofBX2.js";
import { n as FILE_TYPE, r as FileTypeSchema } from "./file-KsLXrn8b.js";
const FileProcessorTypeSchema = _enum(FILE_PROCESSOR_TYPES);
_enum(FILE_PROCESSOR_FEATURES);
const FileProcessorIdSchema = _enum(FILE_PROCESSOR_IDS);
const FileProcessorTemplateSchema = object({
	id: FileProcessorIdSchema,
	type: FileProcessorTypeSchema,
	capabilities: array(discriminatedUnion("feature", [object({
		feature: literal("image_to_text"),
		inputs: array(FileTypeSchema.extract([FILE_TYPE.IMAGE])).min(1),
		output: literal("text"),
		apiHost: string().optional(),
		modelId: string().min(1).optional()
	}).strict(), object({
		feature: literal("document_to_markdown"),
		inputs: array(FileTypeSchema.extract([FILE_TYPE.DOCUMENT])).min(1),
		output: literal("markdown"),
		apiHost: string().optional(),
		modelId: string().min(1).optional()
	}).strict()])).min(1)
}).strict().superRefine((template, ctx) => {
	const seenFeatures = /* @__PURE__ */ new Set();
	template.capabilities.forEach((capability, index) => {
		if (seenFeatures.has(capability.feature)) {
			ctx.addIssue({
				code: "custom",
				path: [
					"capabilities",
					index,
					"feature"
				],
				message: `Duplicate capability feature '${capability.feature}' is not allowed. Use 'inputs' to model multiple input types.`
			});
			return;
		}
		seenFeatures.add(capability.feature);
	});
});
array(FileProcessorTemplateSchema);
const FileProcessorOptionsSchema = object({ langs: array(string()).optional() }).strict();
const FileProcessorCapabilityOverrideSchema = object({
	apiHost: string().optional(),
	modelId: string().min(1).optional()
}).strict();
const FileProcessorCapabilityOverridesSchema = object({
	document_to_markdown: FileProcessorCapabilityOverrideSchema.optional(),
	image_to_text: FileProcessorCapabilityOverrideSchema.optional()
}).strict();
partialRecord(FileProcessorIdSchema, object({
	apiKeys: array(string().min(1)).optional(),
	capabilities: FileProcessorCapabilityOverridesSchema.optional(),
	options: FileProcessorOptionsSchema.optional()
}).strict());
FileProcessorTemplateSchema.extend({
	apiKeys: array(string().min(1)).optional(),
	options: FileProcessorOptionsSchema.optional()
});
const FILE_PROCESSOR_PRESET_MAP = {
	tesseract: {
		type: "builtin",
		capabilities: [{
			feature: "image_to_text",
			inputs: ["image"],
			output: "text"
		}]
	},
	system: {
		type: "builtin",
		capabilities: [{
			feature: "image_to_text",
			inputs: ["image"],
			output: "text"
		}]
	},
	paddleocr: {
		type: "api",
		capabilities: [{
			feature: "image_to_text",
			inputs: ["image"],
			output: "text",
			apiHost: "https://paddleocr.aistudio-app.com/",
			modelId: "PP-OCRv6"
		}, {
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://paddleocr.aistudio-app.com/",
			modelId: "PaddleOCR-VL-1.5"
		}]
	},
	"local-paddleocr": {
		type: "builtin",
		capabilities: [{
			feature: "image_to_text",
			inputs: ["image"],
			output: "text"
		}]
	},
	ovocr: {
		type: "builtin",
		capabilities: [{
			feature: "image_to_text",
			inputs: ["image"],
			output: "text"
		}]
	},
	mineru: {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://mineru.net",
			modelId: "pipeline"
		}]
	},
	doc2x: {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://v2.doc2x.noedgeai.com",
			modelId: "v3-2026"
		}]
	},
	mistral: {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://api.mistral.ai",
			modelId: "mistral-ocr-latest"
		}, {
			feature: "image_to_text",
			inputs: ["image"],
			output: "text",
			apiHost: "https://api.mistral.ai",
			modelId: "mistral-ocr-latest"
		}]
	},
	"open-mineru": {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "http://127.0.0.1:8000"
		}]
	}
};
const PRESETS_FILE_PROCESSORS = FILE_PROCESSOR_IDS.map((id) => ({
	id,
	...FILE_PROCESSOR_PRESET_MAP[id]
}));
export { PRESETS_FILE_PROCESSORS as t };

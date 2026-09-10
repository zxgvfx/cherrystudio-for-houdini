import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { C as string, _ as object, a as array, c as discriminatedUnion, n as _enum, p as literal, u as int, y as partialRecord } from "./schemas-1oAyIgyK.js";
import { a as FILE_PROCESSOR_IDS, i as FILE_PROCESSOR_FEATURES, o as FILE_PROCESSOR_TYPES } from "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as logo_default } from "./logo-FLnHo1Um.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import { n as FILE_TYPE, r as FileTypeSchema } from "./file-OKCzlHoD.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { i as MB, t as GB } from "./constants-BF9E3O0o.js";
import { t as ApplicationIcon } from "./application-EWsmqhb9.js";
import { t as Doc2xIcon } from "./doc2x-DAymYqvY.js";
import { t as IntelIcon } from "./intel-rLo3a8RJ.js";
import { t as MineruIcon } from "./mineru-DyFpRDjr.js";
import { t as MistralIcon } from "./mistral-BJX8d60a.js";
import { t as PaddleocrIcon } from "./paddleocr-C3wpgNcJ.js";
import { t as TesseractJsIcon } from "./tesseract-js-CsdyR4OY.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useAvailableFileProcessors");
function useAvailableFileProcessors() {
	const [availableProcessors, setAvailableProcessors] = (0, import_react.useState)(() => ({
		processorIds: /* @__PURE__ */ new Set(),
		status: "loading"
	}));
	(0, import_react.useEffect)(() => {
		let mounted = true;
		ipcApi.request("file_processing.list_available_processors").then(({ processorIds }) => {
			if (mounted) setAvailableProcessors({
				processorIds: new Set(processorIds),
				status: "ready"
			});
		}).catch((error) => {
			logger.warn("Failed to list available file processors", error);
			if (mounted) setAvailableProcessors({
				processorIds: /* @__PURE__ */ new Set(),
				status: "error"
			});
		});
		return () => {
			mounted = false;
		};
	}, []);
	return availableProcessors;
}
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
		modelId: string().min(1).optional(),
		maxInputBytes: int().positive().optional(),
		maxInputPages: int().positive().optional()
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
			modelId: "PaddleOCR-VL-1.6",
			maxInputBytes: 50 * MB,
			maxInputPages: 100
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
	"local-document": {
		type: "builtin",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown"
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
			modelId: "pipeline",
			maxInputBytes: 200 * MB,
			maxInputPages: 600
		}]
	},
	doc2x: {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://v2.doc2x.noedgeai.com",
			modelId: "v3-2026",
			maxInputBytes: GB,
			maxInputPages: 1e3
		}]
	},
	mistral: {
		type: "api",
		capabilities: [{
			feature: "document_to_markdown",
			inputs: ["document"],
			output: "markdown",
			apiHost: "https://api.mistral.ai",
			modelId: "mistral-ocr-latest",
			maxInputPages: 1e3
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
			apiHost: "http://127.0.0.1:8000",
			maxInputBytes: 200 * MB
		}]
	}
};
const PRESETS_FILE_PROCESSORS = FILE_PROCESSOR_IDS.map((id) => ({
	id,
	...FILE_PROCESSOR_PRESET_MAP[id]
}));
const FILE_PROCESSOR_LOCAL_MODEL = {
	"local-paddleocr": "ocr",
	"local-document": "ocr"
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PROCESSOR_LOGOS = {
	system: ApplicationIcon,
	tesseract: TesseractJsIcon,
	paddleocr: PaddleocrIcon,
	"local-paddleocr": PaddleocrIcon,
	ovocr: IntelIcon,
	mineru: MineruIcon,
	doc2x: Doc2xIcon,
	mistral: MistralIcon,
	"open-mineru": MineruIcon
};
const FileProcessorIcon = ({ processorId, size = 16, className }) => {
	if (processorId === "local-document") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "icons.file-processor-icon",
		src: logo_default,
		alt: "",
		draggable: false,
		className: cn("inline-block shrink-0 rounded-[20%] object-cover", className),
		style: {
			width: size,
			height: size
		}
	});
	const Logo = PROCESSOR_LOGOS[processorId];
	if (!Logo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
		size,
		className: cn("shrink-0 text-muted-foreground", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo.Avatar, {
		size,
		shape: "rounded",
		className: cn("rounded", className)
	});
};
export { useAvailableFileProcessors as i, FILE_PROCESSOR_LOCAL_MODEL as n, PRESETS_FILE_PROCESSORS as r, FileProcessorIcon as t };

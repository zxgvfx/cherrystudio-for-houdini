import { C as string, _ as object, g as number, o as boolean } from "./schemas-CV_EtlSZ.js";
const ContextSettingsCompressOverrideSchema = object({
	enabled: boolean(),
	modelId: string().min(1).nullable().optional()
});
const ContextSettingsOverrideSchema = object({
	enabled: boolean().optional(),
	truncateThreshold: number().int().positive().optional(),
	maxMessages: number().int().min(1).nullable().optional(),
	compress: ContextSettingsCompressOverrideSchema.partial().optional()
});
object({
	enabled: boolean(),
	truncateThreshold: number().int().positive(),
	maxMessages: number().int().min(1).nullable(),
	compress: object({
		enabled: boolean(),
		modelId: string().nullable()
	})
});
const MIN_TRUNCATE_THRESHOLD = 2e3;
const DEFAULT_CONTEXT_SETTINGS = {
	enabled: true,
	truncateThreshold: 5e4,
	maxMessages: null,
	compress: {
		enabled: true,
		modelId: null
	}
};
export { DEFAULT_CONTEXT_SETTINGS as n, MIN_TRUNCATE_THRESHOLD as r, ContextSettingsOverrideSchema as t };

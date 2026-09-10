import { C as string, M as datetime, O as uuidv4, S as strictObject, _ as object, a as array, g as number, n as _enum, o as boolean, x as record } from "./schemas-1oAyIgyK.js";
const McpConfigSampleSchema = object({
	command: string(),
	args: array(string()),
	env: record(string(), string()).optional()
});
const McpServerTypeSchema = _enum([
	"stdio",
	"sse",
	"streamableHttp",
	"inMemory"
]);
const McpServerInstallSourceSchema = _enum([
	"builtin",
	"manual",
	"protocol",
	"unknown"
]);
strictObject({
	id: uuidv4(),
	name: string().min(1),
	type: McpServerTypeSchema.optional(),
	description: string().optional(),
	baseUrl: string().optional(),
	command: string().optional(),
	registryUrl: string().optional(),
	args: array(string()).optional(),
	env: record(string(), string()).optional(),
	headers: record(string(), string()).optional(),
	provider: string().optional(),
	providerUrl: string().optional(),
	logoUrl: string().optional(),
	tags: array(string()).optional(),
	longRunning: boolean().optional(),
	timeout: number().optional(),
	dxtVersion: string().optional(),
	dxtPath: string().optional(),
	reference: string().optional(),
	searchKey: string().optional(),
	configSample: McpConfigSampleSchema.optional(),
	disabledTools: array(string()).optional(),
	disabledAutoApproveTools: array(string()).optional(),
	shouldConfig: boolean().optional(),
	sortOrder: number().optional(),
	isActive: boolean(),
	installSource: McpServerInstallSourceSchema.optional(),
	isTrusted: boolean().optional(),
	trustedAt: number().optional(),
	installedAt: number().optional(),
	createdAt: datetime().optional(),
	updatedAt: datetime().optional()
});
export { McpServerTypeSchema as n, McpConfigSampleSchema as t };

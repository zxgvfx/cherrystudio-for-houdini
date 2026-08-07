import { C as string, M as datetime, O as uuidv4, S as strictObject, _ as object, a as array, b as preprocess, g as number, n as _enum, o as boolean, p as literal, w as union, x as record } from "./schemas-CV_EtlSZ.js";
import { n as isBuiltinMcpServerName } from "./mcp-BYi31fTn.js";
const McpConfigSampleSchema = object({
	command: string(),
	args: array(string()),
	env: record(string(), string()).optional()
});
const McpServerTypeSchema$1 = _enum([
	"stdio",
	"sse",
	"streamableHttp",
	"inMemory"
]);
const McpServerInstallSourceSchema$1 = _enum([
	"builtin",
	"manual",
	"protocol",
	"unknown"
]);
strictObject({
	id: uuidv4(),
	name: string().min(1),
	type: McpServerTypeSchema$1.optional(),
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
	installSource: McpServerInstallSourceSchema$1.optional(),
	isTrusted: boolean().optional(),
	trustedAt: number().optional(),
	installedAt: number().optional(),
	createdAt: datetime().optional(),
	updatedAt: datetime().optional()
});
const McpServerTypeSchema = string().default("stdio").transform((type) => {
	if (type.includes("http")) return "streamableHttp";
	else return type;
}).pipe(union([
	literal("stdio"),
	literal("sse"),
	literal("streamableHttp"),
	literal("inMemory")
]));
const McpServerInstallSourceSchema = _enum([
	"builtin",
	"manual",
	"protocol",
	"unknown"
]).default("unknown");
const McpServerConfigSchema = object({
	id: string().optional().describe("Server internal id."),
	name: string().optional().describe("Server name for identification and display"),
	type: McpServerTypeSchema.optional(),
	description: string().optional().describe("Server description"),
	url: string().optional().describe("Server URL address"),
	baseUrl: string().optional().describe("Server URL address"),
	command: string().optional().describe("The command to execute (e.g., 'uvx', 'npx')"),
	registryUrl: string().optional().describe("Registry URL for the server"),
	args: array(string()).optional().describe("The arguments to pass to the command"),
	env: record(string(), string()).optional().describe("Environment variables for the server process"),
	headers: record(string(), string()).optional().describe("Custom headers configuration"),
	provider: string().optional().describe("Provider name for the server"),
	providerUrl: string().optional().describe("URL of the provider website or documentation"),
	logoUrl: string().optional().describe("URL of the server logo"),
	tags: array(string()).optional().describe("Server tags for categorization"),
	longRunning: boolean().optional().describe("Whether the server is long running"),
	timeout: preprocess((val) => {
		if (typeof val === "string" && val.trim() !== "") {
			const parsed = Number(val);
			return isNaN(parsed) ? val : parsed;
		}
		return val;
	}, number().optional()).describe("Timeout in seconds for requests to this server"),
	dxtVersion: string().optional().describe("Version of the DXT package"),
	dxtPath: string().optional().describe("Path where the DXT package was extracted"),
	reference: string().optional().describe("Reference link for the server"),
	searchKey: string().optional().describe("Search key for the server"),
	configSample: McpConfigSampleSchema.optional().describe("Configuration sample for the server"),
	disabledTools: array(string()).optional().describe("List of disabled tools for this server"),
	disabledAutoApproveTools: array(string()).optional().describe("List of tools that are disabled for auto-approval on this server"),
	shouldConfig: boolean().optional().describe("Whether the server should be configured"),
	isActive: boolean().optional().describe("Whether the server is active"),
	installSource: McpServerInstallSourceSchema.optional().describe("Where the MCP server was installed from"),
	isTrusted: boolean().optional().describe("Whether the MCP server has been trusted by user"),
	trustedAt: number().optional().describe("Timestamp when the server was trusted"),
	installedAt: number().optional().describe("Timestamp when the server was installed")
}).strict().refine((schema) => {
	if (schema.type === "inMemory" && schema.name && !isBuiltinMcpServerName(schema.name)) return false;
	return true;
}, { message: "Server type is inMemory but this is not a builtin MCP server, which is not allowed" }).transform((schema) => {
	if (!schema.type) {
		const url = schema.baseUrl ?? schema.url ?? null;
		if (url !== null) {
			const type = getMcpServerType(url);
			return {
				...schema,
				type
			};
		}
	}
	return schema;
});
const McpConfigSchema = object({ mcpServers: record(string(), McpServerConfigSchema).describe("Mapping of server aliases to their configurations") });
function safeValidateMcpConfig(config) {
	return McpConfigSchema.safeParse(config);
}
function getMcpServerType(url) {
	return url.endsWith("/mcp") ? "streamableHttp" : "sse";
}
export { safeValidateMcpConfig as n, getMcpServerType as t };

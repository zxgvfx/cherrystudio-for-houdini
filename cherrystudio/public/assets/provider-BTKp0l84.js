import { C as string, E as url, T as unknown, _ as object, a as array, c as discriminatedUnion, g as number, n as _enum, o as boolean, p as literal, x as record } from "./schemas-CV_EtlSZ.js";
import { _ as ENDPOINT_TYPE, d as FastModeTransportSchema, f as ServerToolConfigSchema, g as CURRENCY, w as objectValues } from "./model-CfoN7z8F.js";
var EndpointTypeSchema = _enum(objectValues(ENDPOINT_TYPE));
var CatalogApiFeaturesSchema = object({
	arrayContent: boolean().optional(),
	streamOptions: boolean().optional(),
	developerRole: boolean().optional(),
	serviceTier: boolean().optional(),
	verbosity: boolean().optional(),
	reportsActualCost: boolean().optional()
});
object({ website: object({
	official: url().optional(),
	docs: url().optional(),
	apiKey: url().optional(),
	models: url().optional()
}) });
const RuntimeApiKeySchema = object({
	id: string().min(1),
	key: string().trim().min(1),
	label: string().optional(),
	isEnabled: boolean()
}).omit({ key: true });
const AuthTypeSchema = _enum([
	"api-key",
	"oauth",
	"iam-aws",
	"api-key-aws",
	"iam-gcp",
	"iam-azure"
]);
discriminatedUnion("type", [
	object({
		type: literal("api-key"),
		headerName: string().optional(),
		prefix: string().optional(),
		required: boolean().optional()
	}),
	object({
		type: literal("oauth"),
		clientId: string(),
		refreshToken: string().optional(),
		accessToken: string().optional(),
		expiresAt: number().optional(),
		accountId: string().optional()
	}),
	object({
		type: literal("iam-aws"),
		region: string(),
		accessKeyId: string().optional(),
		secretAccessKey: string().optional()
	}),
	object({
		type: literal("api-key-aws"),
		region: string()
	}),
	object({
		type: literal("iam-gcp"),
		project: string(),
		location: string(),
		credentials: record(string(), unknown()).optional()
	}),
	object({
		type: literal("iam-azure"),
		apiVersion: string(),
		deploymentId: string().optional()
	})
]);
const RuntimeApiFeaturesSchema = CatalogApiFeaturesSchema.required();
const ProviderWebsitesSchema = object({
	official: string().optional(),
	apiKey: string().optional(),
	docs: string().optional(),
	models: string().optional()
});
const ProviderSettingsSchema = object({
	serviceTier: string().nullable().optional(),
	verbosity: string().nullable().optional(),
	summaryText: _enum([
		"auto",
		"detailed",
		"concise"
	]).nullable().optional(),
	streamOptions: object({ includeUsage: boolean().optional() }).optional(),
	apiVersion: string().optional(),
	cacheControl: object({
		enabled: boolean(),
		tokenThreshold: number().optional(),
		cacheSystemMessage: boolean().optional(),
		cacheLastNMessages: number().optional()
	}).optional(),
	keepAliveTime: number().optional(),
	rateLimit: number().optional(),
	timeout: number().optional(),
	extraHeaders: record(string(), string()).optional(),
	notes: string().optional(),
	isCentralized: boolean().optional(),
	isAuthed: boolean().optional(),
	oauthUsername: string().optional(),
	oauthAvatar: string().optional()
});
const ModelsApiUrlsSchema = object({
	default: string().optional(),
	embedding: string().optional(),
	image: string().optional(),
	reranker: string().optional()
});
const EndpointConfigSchema = object({
	baseUrl: string().optional(),
	modelsApiUrls: ModelsApiUrlsSchema.optional(),
	adapterFamily: string().optional()
});
object({ baseUrl: string().optional() });
object({
	id: string(),
	presetProviderId: string().optional(),
	name: string(),
	logo: string().optional(),
	logoSrc: string().optional(),
	description: string().optional(),
	websites: ProviderWebsitesSchema.optional(),
	endpointConfigs: record(EndpointTypeSchema, EndpointConfigSchema).optional(),
	defaultChatEndpoint: EndpointTypeSchema.optional(),
	modelListSource: _enum(["api", "registry"]).optional(),
	serverTools: array(ServerToolConfigSchema).optional(),
	authMethods: array(_enum([
		"api-key",
		"oauth",
		"external-cli"
	])).optional(),
	authOptional: boolean().optional(),
	reportedCostCurrency: _enum(objectValues(CURRENCY)).optional(),
	fastMode: object({ transport: FastModeTransportSchema }).optional(),
	apiKeys: array(RuntimeApiKeySchema),
	authType: AuthTypeSchema,
	apiFeatures: RuntimeApiFeaturesSchema,
	settings: ProviderSettingsSchema,
	isEnabled: boolean()
});
const DEFAULT_API_FEATURES = {
	arrayContent: true,
	streamOptions: true,
	developerRole: false,
	serviceTier: false,
	verbosity: false,
	reportsActualCost: false
};
const DEFAULT_PROVIDER_SETTINGS = {};
export { DEFAULT_PROVIDER_SETTINGS as n, DEFAULT_API_FEATURES as t };

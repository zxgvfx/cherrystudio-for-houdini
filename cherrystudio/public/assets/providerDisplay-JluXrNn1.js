import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { _ as ENDPOINT_TYPE } from "./model-DbPSoCMM.js";
import { o as getProviderLabelKey } from "./label-Grg6QUtw.js";
import { f as isLoginBasedProvider } from "./provider-B43PumwQ.js";
function isCanonicalPresetProvider(provider) {
	return provider.presetProviderId != null && provider.id === provider.presetProviderId;
}
function isProviderPresetInstanceSource(provider) {
	if (!isCanonicalPresetProvider(provider) || isLoginBasedProvider(provider) || provider.id === "copilot") return false;
	if (provider.authType !== "api-key" && provider.authType !== "iam-azure") return false;
	const endpoint = provider.defaultChatEndpoint;
	if (endpoint != null) return provider.endpointConfigs?.[endpoint] != null;
	return provider.presetProviderId === "new-api" && provider.endpointConfigs?.[ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS] != null;
}
function getFancyProviderName(provider) {
	if (isCanonicalPresetProvider(provider)) {
		const presetProviderId = provider.presetProviderId;
		if (presetProviderId) return resolver_default.t(getProviderLabelKey(presetProviderId));
	}
	return provider.name;
}
function getProviderSearchString(provider) {
	if (isCanonicalPresetProvider(provider)) {
		const presetProviderId = provider.presetProviderId;
		if (presetProviderId) return `${resolver_default.t(getProviderLabelKey(presetProviderId))} ${provider.id}`;
	}
	return `${provider.id} ${provider.name}`;
}
function matchKeywordsInProvider(keywords, provider, extraSearchString) {
	if (keywords.length === 0) return true;
	const base = getProviderSearchString(provider);
	const searchStr = (extraSearchString ? `${base} ${extraSearchString}` : base).toLowerCase();
	return keywords.every((kw) => searchStr.includes(kw));
}
function replaceEndpointConfigDomain(endpointConfigs, newDomain) {
	if (!endpointConfigs) return {};
	const result = {};
	for (const [key, config] of Object.entries(endpointConfigs)) {
		if (!config) continue;
		const ep = key;
		const baseUrl = config.baseUrl;
		if (!baseUrl) {
			result[ep] = config;
			continue;
		}
		try {
			const parsed = new URL(baseUrl);
			parsed.hostname = newDomain;
			result[ep] = {
				...config,
				baseUrl: parsed.toString().replace(/\/$/, "")
			};
		} catch {
			result[ep] = config;
		}
	}
	return result;
}
export { replaceEndpointConfigDomain as i, isProviderPresetInstanceSource as n, matchKeywordsInProvider as r, getFancyProviderName as t };

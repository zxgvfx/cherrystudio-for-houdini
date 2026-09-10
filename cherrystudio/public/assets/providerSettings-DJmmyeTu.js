import { i as createUniqueModelId } from "./model-BOGgSmTN.js";
import { l as isCherryAIProvider } from "./provider-bQl8RVRp.js";
const LOCAL_EMBEDDING_PROVIDER_ID = "local-embedding";
const LOCAL_EMBEDDING_MODEL_ID = "qwen3-embedding-0.6b";
const LOCAL_EMBEDDING_DIMENSIONS = 1024;
const LOCAL_EMBEDDING_UNIQUE_MODEL_ID = createUniqueModelId(LOCAL_EMBEDDING_PROVIDER_ID, LOCAL_EMBEDDING_MODEL_ID);
function isProviderSettingsListVisibleProvider(provider) {
	return !isCherryAIProvider(provider) && provider.id !== "local-embedding";
}
export { LOCAL_EMBEDDING_UNIQUE_MODEL_ID as i, LOCAL_EMBEDDING_DIMENSIONS as n, LOCAL_EMBEDDING_PROVIDER_ID as r, isProviderSettingsListVisibleProvider as t };

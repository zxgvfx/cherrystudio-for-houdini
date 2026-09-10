import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var ApiKeyContext = (0, import_react.createContext)(null);
const ApiKeyProvider = ApiKeyContext.Provider;
function useAuthenticationApiKey() {
	const value = (0, import_react.use)(ApiKeyContext);
	if (!value) throw new Error("useAuthenticationApiKey must be used within AuthenticationSection");
	return value;
}
export { useAuthenticationApiKey as n, ApiKeyProvider as t };

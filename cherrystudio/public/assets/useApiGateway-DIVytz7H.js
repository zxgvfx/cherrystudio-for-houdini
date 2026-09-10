import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as useMultiplePreferences } from "./usePreference-DRNUEk4I.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as cacheService } from "./CacheService-IyXh62g9.js";
import { a as useSharedCacheValue } from "./useCache-lF6Sw_ck.js";
import { t as toast } from "./toast-D2efAzAF.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var API_GATEWAY_PREFERENCE_KEYS = {
	enabled: "feature.api_gateway.enabled",
	host: "feature.api_gateway.host",
	port: "feature.api_gateway.port",
	apiKey: "feature.api_gateway.api_key"
};
const useApiGateway = () => {
	const { t } = useTranslation();
	const [apiGatewayConfig, setApiGatewayConfig] = useMultiplePreferences(API_GATEWAY_PREFERENCE_KEYS);
	const apiGatewayRunning = useSharedCacheValue("feature.api_gateway.running") ?? false;
	const [apiGatewayLoading, setApiGatewayLoading] = (0, import_react.useState)(() => !cacheService.isSharedCacheReady());
	(0, import_react.useEffect)(() => {
		if (cacheService.isSharedCacheReady()) return;
		return cacheService.onSharedCacheReady(() => setApiGatewayLoading(false));
	}, []);
	return {
		apiGatewayConfig,
		apiGatewayRunning,
		apiGatewayLoading,
		startApiGateway: (0, import_react.useCallback)(async () => {
			if (apiGatewayLoading) return false;
			setApiGatewayLoading(true);
			try {
				const result = await ipcApi.request("api_gateway.start");
				if (result.success) {
					toast.success(t("apiGateway.messages.startSuccess"));
					return true;
				}
				toast.error(t("apiGateway.messages.startError") + result.error);
				return false;
			} catch (error) {
				toast.error(t("apiGateway.messages.startError") + (error.message || error));
				return false;
			} finally {
				setApiGatewayLoading(false);
			}
		}, [apiGatewayLoading, t]),
		stopApiGateway: (0, import_react.useCallback)(async () => {
			if (apiGatewayLoading) return;
			setApiGatewayLoading(true);
			try {
				const result = await ipcApi.request("api_gateway.stop");
				if (result.success) toast.success(t("apiGateway.messages.stopSuccess"));
				else toast.error(t("apiGateway.messages.stopError") + result.error);
			} catch (error) {
				toast.error(t("apiGateway.messages.stopError") + (error.message || error));
			} finally {
				setApiGatewayLoading(false);
			}
		}, [apiGatewayLoading, t]),
		restartApiGateway: (0, import_react.useCallback)(async () => {
			if (apiGatewayLoading) return;
			setApiGatewayLoading(true);
			try {
				const result = await ipcApi.request("api_gateway.restart");
				if (result.success) toast.success(t("apiGateway.messages.restartSuccess"));
				else toast.error(t("apiGateway.messages.restartError") + result.error);
			} catch (error) {
				toast.error(t("apiGateway.messages.restartFailed") + error.message);
			} finally {
				setApiGatewayLoading(false);
			}
		}, [apiGatewayLoading, t]),
		setApiGatewayConfig
	};
};
export { useApiGateway as t };

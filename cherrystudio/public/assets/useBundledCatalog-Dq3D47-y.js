import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as useCache } from "./useCache-lF6Sw_ck.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useBundledCatalog");
function useBundledCatalog({ catalog, enabled = true, load }) {
	const { i18n } = useTranslation();
	const language = i18n?.resolvedLanguage ?? i18n?.language ?? "en-US";
	const [resourcesPath] = useCache("app.path.resources");
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			setIsLoading(false);
			return;
		}
		if (!resourcesPath) {
			logger.warn("Bundled catalog resources path is not ready", { catalog });
			setItems([]);
			setIsLoading(false);
			return;
		}
		let cancelled = false;
		setIsLoading(true);
		load(resourcesPath, language).then((loadedItems) => {
			if (!cancelled) setItems(loadedItems);
		}).catch((error) => {
			if (cancelled) return;
			logger.error("Failed to load bundled catalog", {
				catalog,
				error
			});
			setItems([]);
		}).finally(() => {
			if (!cancelled) setIsLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		catalog,
		enabled,
		language,
		load,
		resourcesPath
	]);
	return {
		isLoading,
		items
	};
}
export { useBundledCatalog as t };

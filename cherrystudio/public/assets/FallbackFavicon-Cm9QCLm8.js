import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("FallbackFavicon");
var FAILED_FAVICON_CACHE_PREFIX = "failed_favicon_";
var FAILED_FAVICON_CACHE_DURATION = 1440 * 60 * 1e3;
var isUrlFailedRecently = (url) => {
	const cacheKey = `${FAILED_FAVICON_CACHE_PREFIX}${url}`;
	const cachedTimestamp = localStorage.getItem(cacheKey);
	if (!cachedTimestamp) return false;
	const timestamp = parseInt(cachedTimestamp, 10);
	if (Date.now() - timestamp < FAILED_FAVICON_CACHE_DURATION) return true;
	localStorage.removeItem(cacheKey);
	return false;
};
var markUrlAsFailed = (url) => {
	const cacheKey = `${FAILED_FAVICON_CACHE_PREFIX}${url}`;
	localStorage.setItem(cacheKey, Date.now().toString());
};
var FallbackFavicon = ({ hostname, alt }) => {
	const [faviconState, setFaviconState] = (0, import_react.useState)({ status: "idle" });
	(0, import_react.useEffect)(() => {
		setFaviconState({ status: "loading" });
		const faviconUrls = [
			`https://icon.horse/icon/${hostname}`,
			`https://favicon.splitbee.io/?url=${hostname}`,
			`https://favicon.im/${hostname}`,
			`https://${hostname}/favicon.ico`
		];
		const validFaviconUrls = faviconUrls.filter((url) => !isUrlFailedRecently(url));
		if (validFaviconUrls.length === 0) {
			setFaviconState({
				status: "loaded",
				src: faviconUrls[0]
			});
			return;
		}
		const controller = new AbortController();
		const { signal } = controller;
		const faviconPromises = validFaviconUrls.map((url) => fetch(url, {
			method: "HEAD",
			signal,
			credentials: "omit"
		}).then((response) => {
			if (response.ok) return url;
			if (response.status >= 400) markUrlAsFailed(url);
			throw new Error(`Failed to fetch ${url}`);
		}).catch((error) => {
			if (error.name === "AbortError") throw error;
			return null;
		}));
		const timeoutPromise = new Promise((resolve) => {
			const timer = setTimeout(() => {
				resolve(faviconUrls[0]);
			}, 2e3);
			signal.addEventListener("abort", () => clearTimeout(timer));
		});
		Promise.race([Promise.any(faviconPromises).then((result) => result || faviconUrls[0]).catch(() => faviconUrls[0]), timeoutPromise]).then((url) => {
			setFaviconState({
				status: "loaded",
				src: url
			});
		}).catch((error) => {
			logger.error("All favicon requests failed:", error);
			setFaviconState({
				status: "loaded",
				src: faviconUrls[0]
			});
		});
		return () => {
			controller.abort();
		};
	}, [hostname]);
	const handleError = () => {
		if (faviconState.status === "loaded") markUrlAsFailed(faviconState.src);
		setFaviconState({ status: "failed" });
	};
	if (faviconState.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "icons.fallback-favicon",
		className: "inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-primary/15 font-bold text-[10px] text-primary",
		children: hostname.charAt(0).toUpperCase()
	});
	if (faviconState.status === "loaded") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "icons.fallback-favicon",
		src: faviconState.src,
		alt,
		onError: handleError,
		className: "h-4 w-4 rounded-[4px] bg-muted"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "icons.fallback-favicon",
		className: "inline-block h-4 w-4 rounded-[4px] bg-muted"
	});
};
var FallbackFavicon_default = FallbackFavicon;
export { FallbackFavicon_default as t };

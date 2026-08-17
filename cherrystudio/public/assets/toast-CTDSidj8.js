import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as createLucideIcon } from "./createLucideIcon-DA_gQr32.js";
import { n as CircleCheck, t as TriangleAlert } from "./triangle-alert-C_3aTl7W.js";
import { t as Info } from "./info-Ce_zTX1O.js";
import { t as X } from "./x-BS4tSESx.js";
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DEFAULT_TIMEOUT = 3e3;
var DEFAULT_TOAST_LABELS = {
	close: "Close",
	error: "Error",
	errorDescription: "An error occurred",
	loading: "Loading...",
	success: "Success"
};
var getToastKey = (key) => String(key ?? `toast-${Date.now()}-${Math.random()}`);
var resolveToastLabels = (labels) => typeof labels === "function" ? labels() : labels;
var getToastLabels = (labels) => ({
	...DEFAULT_TOAST_LABELS,
	...resolveToastLabels(labels)
});
var createToastStore = () => {
	let toastQueue = [];
	const listeners = /* @__PURE__ */ new Set();
	const timers = /* @__PURE__ */ new Map();
	const loadingTokens = /* @__PURE__ */ new Map();
	const notify = () => {
		listeners.forEach((listener) => listener());
	};
	const subscribe = (listener) => {
		listeners.add(listener);
		if (listeners.size > 1) console.error("multiple ToastViewport mounted in one window; every toast will render once per host");
		return () => {
			listeners.delete(listener);
		};
	};
	const getSnapshot = () => toastQueue;
	const clearTimer = (key) => {
		const timer = timers.get(key);
		if (timer) {
			clearTimeout(timer);
			timers.delete(key);
		}
	};
	const remove = (key) => {
		const toast = toastQueue.find((item) => item.key === key);
		clearTimer(key);
		loadingTokens.delete(key);
		toastQueue = toastQueue.filter((item) => item.key !== key);
		toast?.onClose?.();
		notify();
	};
	const schedule = (toast) => {
		clearTimer(toast.key);
		if (toast.timeout === 0 || toast.type === "loading") return;
		const timeout = toast.timeout ?? DEFAULT_TIMEOUT;
		timers.set(toast.key, setTimeout(() => {
			remove(toast.key);
		}, timeout));
	};
	const upsert = (toast) => {
		const existingIndex = toastQueue.findIndex((item) => item.key === toast.key);
		if (existingIndex >= 0) toastQueue = toastQueue.map((item, index) => index === existingIndex ? toast : item);
		else toastQueue = [...toastQueue, toast];
		schedule(toast);
		notify();
	};
	const closeAll = () => {
		toastQueue.forEach((toast) => {
			clearTimer(toast.key);
			loadingTokens.delete(toast.key);
			toast.onClose?.();
		});
		toastQueue = [];
		notify();
	};
	return {
		closeAll,
		getLoadingToken: (key) => loadingTokens.get(key),
		getSnapshot,
		remove,
		setLoadingToken: (key, token) => loadingTokens.set(key, token),
		subscribe,
		unsetLoadingToken: (key) => loadingTokens.delete(key),
		upsert
	};
};
var defaultToastStore = createToastStore();
(0, import_react.createContext)(void 0);
var upsertToast = (toast, store = defaultToastStore) => {
	store.upsert(toast);
};
var createToast = (type, store = defaultToastStore) => {
	return (arg) => {
		const config = typeof arg === "string" ? { title: arg } : arg;
		const key = getToastKey(config.key);
		upsertToast({
			...config,
			key,
			type
		}, store);
		return key;
	};
};
var createLoadingToast = (labels, store = defaultToastStore) => (args) => {
	const toastLabels = getToastLabels(labels);
	const { title, description, icon, onError, promise, timeout, ...restConfig } = args;
	const key = getToastKey(args.key);
	const token = Symbol(key);
	store.setLoadingToken(key, token);
	upsertToast({
		...restConfig,
		description,
		icon,
		key,
		title: title || toastLabels.loading,
		timeout: 0,
		type: "loading"
	}, store);
	promise.then((result) => {
		if (store.getLoadingToken(key) !== token) return result;
		store.unsetLoadingToken(key);
		upsertToast({
			...restConfig,
			description,
			key,
			title: title || toastLabels.success,
			timeout: timeout ?? 2e3,
			type: "success"
		}, store);
		return result;
	}).catch((err) => {
		if (store.getLoadingToken(key) !== token) return;
		store.unsetLoadingToken(key);
		onError?.(err);
		upsertToast({
			...restConfig,
			description: err?.message || description || toastLabels.errorDescription,
			key,
			title: title || toastLabels.error,
			timeout: timeout ?? 0,
			type: "error"
		}, store);
	});
	return key;
};
var createToastUtilities = (labels, store = defaultToastStore) => ({
	closeAll: store.closeAll,
	closeToast: (key) => store.remove(key),
	error: createToast("error", store),
	getToastQueue: () => ({ toasts: store.getSnapshot() }),
	info: createToast("info", store),
	loading: createLoadingToast(labels, store),
	success: createToast("success", store),
	warning: createToast("warning", store)
});
const error = createToast("error");
const success = createToast("success");
createToast("warning");
createToast("info");
createLoadingToast();
const getToastUtilities = (labels) => createToastUtilities(labels);
var typeIconMap = {
	error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 text-destructive" }),
	success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }),
	warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warning" }),
	info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 text-info" }),
	loading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" })
};
var getToastA11yProps = (type) => {
	if (type === "warning" || type === "error") return {
		"aria-live": "assertive",
		role: "alert"
	};
	return {
		"aria-live": "polite",
		role: "status"
	};
};
var ToastItem = ({ labels, store, toast }) => {
	const icon = toast.icon ?? typeIconMap[toast.type];
	const a11yProps = getToastA11yProps(toast.type);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.toast-item",
		...mergeUiProps(a11yProps, "ui.toast-item"),
		className: cn("pointer-events-auto flex min-w-72 max-w-[min(420px,calc(100vw-2rem))] items-start gap-3 [-webkit-app-region:no-drag]", "rounded-md border border-border bg-popover px-4 py-3 text-popover-foreground shadow-lg", toast.className),
		style: toast.style,
		onClick: toast.onClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 flex shrink-0 items-center justify-center",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [toast.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "break-words font-medium text-sm leading-5",
					children: toast.title
				}), toast.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 break-words text-muted-foreground text-xs leading-5",
					children: toast.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": labels.close,
				className: "-mr-1 flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
				onClick: (event) => {
					event.stopPropagation();
					store.remove(toast.key);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			})
		]
	});
};
const ToastViewport = ({ labels, store = defaultToastStore }) => {
	const toasts = (0, import_react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
	const toastLabels = getToastLabels(labels);
	if (toasts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.toast-viewport.region",
		"aria-label": "notifications",
		className: "-translate-x-1/2 pointer-events-none fixed top-5 left-1/2 z-[10000] flex flex-col items-center gap-2",
		role: "region",
		children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastItem, {
			labels: toastLabels,
			store,
			toast
		}, toast.key))
	});
};
export { success as i, error as n, getToastUtilities as r, ToastViewport as t };

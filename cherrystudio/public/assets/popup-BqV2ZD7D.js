import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as DIALOG_UNMOUNT_DELAY_MS } from "./dialog-Bm50HQ1E.js";
var logger = loggerService.withContext("PopupService");
const POPUP_EXIT_MS = 200;
var PopupService = class {
	entries = [];
	listeners = /* @__PURE__ */ new Set();
	exitTimers = /* @__PURE__ */ new Map();
	idCounter = 0;
	generateInstanceId = () => `popup-${++this.idCounter}`;
	subscribe = (listener) => {
		this.listeners.add(listener);
		if (this.listeners.size > 1) logger.error("multiple PopupHost mounted in one window; every popup will render once per host");
		return () => {
			this.listeners.delete(listener);
		};
	};
	getSnapshot = () => this.entries;
	notify() {
		this.listeners.forEach((listener) => listener());
	}
	hasHost() {
		return this.listeners.size > 0;
	}
	add(entry) {
		this.entries = [...this.entries, entry];
		this.notify();
	}
	remove(instanceId) {
		const timer = this.exitTimers.get(instanceId);
		if (timer) {
			clearTimeout(timer);
			this.exitTimers.delete(instanceId);
		}
		this.entries = this.entries.filter((entry) => entry.instanceId !== instanceId);
		this.notify();
	}
	settle(instanceId, result) {
		const entry = this.entries.find((current) => current.instanceId === instanceId);
		if (!entry || !entry.open) return;
		entry.resolve(result);
		this.entries = this.entries.map((current) => current.instanceId === instanceId ? {
			...current,
			open: false
		} : current);
		this.notify();
		this.exitTimers.set(instanceId, setTimeout(() => this.remove(instanceId), POPUP_EXIT_MS));
	}
	showComponent(Component, props, instanceId, dismissResult) {
		if (!this.hasHost()) {
			logger.warn("createPopup show() with no PopupHost mounted; resolving dismissResult", { instanceId });
			return Promise.resolve(dismissResult);
		}
		let resolveFn;
		const promise = new Promise((resolve) => {
			resolveFn = resolve;
		});
		this.add({
			kind: "component",
			instanceId,
			open: true,
			Component,
			props,
			resolve: resolveFn
		});
		return promise;
	}
	showConfirm(confirmType, props) {
		if (!this.hasHost()) {
			logger.warn("confirm popup with no PopupHost mounted; resolving false", { confirmType });
			return Promise.resolve(false);
		}
		const instanceId = this.generateInstanceId();
		let resolveFn;
		const promise = new Promise((resolve) => {
			resolveFn = resolve;
		});
		this.add({
			kind: "confirm",
			instanceId,
			open: true,
			confirmType,
			props,
			resolve: resolveFn
		});
		return promise;
	}
};
const popupService = new PopupService();
function createPopup(Component, opts) {
	const dismissResult = opts?.dismissResult;
	let inFlight = null;
	let currentInstanceId = null;
	const show = (props) => {
		if (inFlight) return inFlight;
		const instanceId = popupService.generateInstanceId();
		currentInstanceId = instanceId;
		const promise = popupService.showComponent(Component, props ?? {}, instanceId, dismissResult);
		inFlight = promise;
		const clear = () => {
			if (currentInstanceId === instanceId) {
				inFlight = null;
				currentInstanceId = null;
			}
		};
		promise.then(clear, clear);
		return promise;
	};
	const hide = () => {
		if (currentInstanceId) popupService.settle(currentInstanceId, dismissResult);
	};
	return {
		show,
		hide
	};
}
var confirm = (props) => popupService.showConfirm("confirm", props);
var error = (props) => popupService.showConfirm("error", props);
var info = (props) => popupService.showConfirm("info", props);
var warning = (props) => popupService.showConfirm("warning", props);
const popup = {
	confirm,
	error,
	info,
	warning
};
export { createPopup as n, popupService as r, popup as t };

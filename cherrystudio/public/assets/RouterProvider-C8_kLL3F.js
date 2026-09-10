import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { a as isWin, n as isLinux } from "./platform-fGkkNTU9.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import { t as Minus } from "./minus-C1pbBOW8.js";
import { t as Square } from "./square-BJWYbffz.js";
import { t as X } from "./x-CpgfqVTG.js";
import { a as usePrevious, i as useLayoutEffect } from "./utils-DnGPxu7s.js";
import { _ as isServer, t as useStore } from "./useStore-dDlHYNm4.js";
import { f as trimPathRight } from "./ClientOnly-xII6tCUc.js";
import { r as rootRouteId } from "./redirect-CGSvTIbK.js";
import { a as ErrorComponent, i as CatchBoundary, l as createNonReactiveMutableStore, o as RouterCore, r as SafeFragment, s as getLocationChangeInfo, t as Match, u as createNonReactiveReadonlyStore } from "./Match-CQrslr0g.js";
import { n as routerContext, t as useRouter } from "./useRouter-DL8y2Z5X.js";
import { n as matchContext } from "./matchContext-BMcKlU7u.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const WindowControlsContainer = ({ className, ...props }) => (0, import_react.createElement)("div", {
	...props,
	className: cn("z-[9999] flex h-full min-h-0 select-none items-stretch [-webkit-app-region:no-drag]", className)
});
const ControlButton = ({ $isClose, className, ...props }) => (0, import_react.createElement)("button", {
	...props,
	className: cn("relative flex h-full w-[46px] cursor-pointer items-center justify-center rounded-none border-none bg-transparent p-0", "text-foreground outline-none transition-[background,color] duration-150 [&_svg]:pointer-events-none", $isClose ? "hover:bg-[#e81123] hover:text-white active:bg-[#c50e1f] active:text-white" : "hover:bg-[rgba(128,128,128,0.3)] hover:text-foreground active:bg-[rgba(128,128,128,0.4)] active:text-foreground", className)
});
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DEFAULT_DELAY = 1e3;
const WindowRestoreIcon = ({ size = "1.1em", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.window-restore-icon.svg4",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className: "lucide lucide-square-icon lucide-square",
	version: "1.1",
	id: "svg4",
	xmlns: "http://www.w3.org/2000/svg",
	...mergeUiProps(props, "ui.window-restore-icon.svg4"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { id: "defs1" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "14.165795",
			height: "14.165795",
			x: "2.7646871",
			y: "7.0695167",
			rx: "1.2377932",
			id: "rect2",
			style: { strokeWidth: "1.57397" }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "m 8.8907777,2.8269172 c -0.5045461,0 -0.9490675,0.2424833 -1.2285866,0.6160739 H 18.993677 c 0.866756,0 1.563332,0.696576 1.563332,1.5633319 v 11.331486 c 0.37359,-0.279519 0.616074,-0.72404 0.616074,-1.228587 V 4.3635407 c 0,-0.8505156 -0.686108,-1.5366235 -1.536624,-1.5366235 z",
			style: {
				strokeWidth: "0.911647",
				strokeDasharray: "none"
			},
			id: "path5"
		})
	]
});
function useHasWindowControls() {
	const [useSystemTitleBar] = usePreference("app.use_system_title_bar");
	return isWin || isLinux && !useSystemTitleBar;
}
var WindowControls = () => {
	const [isMaximized, setIsMaximized] = (0, import_react.useState)(false);
	const { t } = useTranslation();
	const hasWindowControls = useHasWindowControls();
	(0, import_react.useEffect)(() => {
		ipcApi.request("window.is_maximized").then(setIsMaximized);
	}, []);
	useIpcOn("window.maximized_changed", setIsMaximized);
	if (!hasWindowControls) return null;
	const handleMinimize = () => {
		ipcApi.request("window.minimize");
	};
	const handleMaximize = () => {
		if (isMaximized) ipcApi.request("window.unmaximize");
		else ipcApi.request("window.maximize");
	};
	const handleClose = () => {
		ipcApi.request("window.close");
	};
	const tooltipTriggerWrap = { placeholder: "relative z-10 flex h-full min-h-0" };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WindowControlsContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			placement: "bottom",
			content: t("navbar.window.minimize"),
			delay: DEFAULT_DELAY,
			classNames: tooltipTriggerWrap,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
				onClick: handleMinimize,
				"aria-label": t("navbar.window.minimize"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			placement: "bottom",
			content: isMaximized ? t("navbar.window.restore") : t("navbar.window.maximize"),
			delay: DEFAULT_DELAY,
			classNames: tooltipTriggerWrap,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
				onClick: handleMaximize,
				"aria-label": isMaximized ? t("navbar.window.restore") : t("navbar.window.maximize"),
				children: isMaximized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowRestoreIcon, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			placement: "bottom",
			content: t("navbar.window.close"),
			delay: DEFAULT_DELAY,
			classNames: tooltipTriggerWrap,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
				$isClose: true,
				onClick: handleClose,
				"aria-label": t("navbar.window.close"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 })
			})
		})
	] });
};
var WindowControls_default = WindowControls;
function handleHashScroll(router) {
	if (typeof document !== "undefined" && document.querySelector) {
		const location = router.stores.location.state;
		const hashScrollIntoViewOptions = location.state.__hashScrollIntoViewOptions ?? true;
		if (hashScrollIntoViewOptions && location.hash !== "") {
			const el = document.getElementById(location.hash);
			if (el) el.scrollIntoView(hashScrollIntoViewOptions);
		}
	}
}
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
	ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
	ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
	ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
	ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
	ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
	ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
	return ReactiveFlags2;
})(ReactiveFlags || {});
/* @__NO_SIDE_EFFECTS__ */
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link: link$1,
		unlink: unlink$1,
		propagate: propagate$1,
		checkDirty: checkDirty$1,
		shallowPropagate: shallowPropagate$1
	};
	function link$1(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink$1(link2, sub = link2.sub) {
		const dep = link2.dep;
		const prevDep = link2.prevDep;
		const nextDep = link2.nextDep;
		const nextSub = link2.nextSub;
		const prevSub = link2.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate$1(link2) {
		let next = link2.nextSub;
		let stack;
		top: do {
			const sub = link2.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link2, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link2 = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link2 = next) !== void 0) {
				next = link2.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link2 = stack.value;
				stack = stack.prev;
				if (link2 !== void 0) {
					next = link2.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty$1(link2, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link2.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate$1(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link2.nextSub !== void 0 || link2.prevSub !== void 0) stack = {
					value: link2,
					prev: stack
				};
				link2 = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link2 = stack.value;
					stack = stack.prev;
				} else link2 = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate$1(firstSub);
						sub = link2.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link2.sub;
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate$1(link2) {
		do {
			const sub = link2.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link2 = link2.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link2 = sub.depsTail;
		while (link2 !== void 0) {
			if (link2 === checkLink) return true;
			link2 = link2.prevDep;
		}
		return false;
	}
}
function toObserver(nextHandler, errorHandler, completionHandler) {
	const isObserver = typeof nextHandler === "object";
	const self = isObserver ? nextHandler : void 0;
	return {
		next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
		error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
		complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self)
	};
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect2) {
		queuedEffects[queuedEffectsLength++] = effect2;
		effect2.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function batch(fn) {
	try {
		++batchDepth;
		fn();
	} finally {
		if (!--batchDepth) flush();
	}
}
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
function flush() {
	if (batchDepth > 0) return;
	while (notifyIndex < queuedEffectsLength) {
		const effect2 = queuedEffects[notifyIndex];
		queuedEffects[notifyIndex++] = void 0;
		effect2.notify();
	}
	notifyIndex = 0;
	queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
	const isComputed = typeof valueOrFn === "function";
	const getter = valueOrFn;
	const atom = {
		_snapshot: isComputed ? void 0 : valueOrFn,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: isComputed ? ReactiveFlags.None : ReactiveFlags.Mutable,
		get() {
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		},
		subscribe(observerOrFn) {
			const obs = toObserver(observerOrFn);
			const observed = { current: false };
			const e = effect(() => {
				atom.get();
				if (!observed.current) observed.current = true;
				else obs.next?.(atom._snapshot);
			});
			return { unsubscribe: () => {
				e.stop();
			} };
		},
		_update(getValue) {
			const prevSub = activeSub;
			const compare = options?.compare ?? Object.is;
			if (isComputed) {
				activeSub = atom;
				++cycle;
				atom.depsTail = void 0;
			} else if (getValue === void 0) return false;
			if (isComputed) atom.flags = ReactiveFlags.Mutable | ReactiveFlags.RecursedCheck;
			try {
				const oldValue = atom._snapshot;
				const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
				if (oldValue === void 0 || !compare(oldValue, newValue)) {
					atom._snapshot = newValue;
					return true;
				}
				return false;
			} finally {
				activeSub = prevSub;
				if (isComputed) atom.flags &= ~ReactiveFlags.RecursedCheck;
				purgeDeps(atom);
			}
		}
	};
	if (isComputed) {
		atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
		atom.get = function() {
			const flags = atom.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(atom.deps, atom)) {
				if (atom._update()) {
					const subs = atom.subs;
					if (subs !== void 0) shallowPropagate(subs);
				}
			} else if (flags & ReactiveFlags.Pending) atom.flags = flags & ~ReactiveFlags.Pending;
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		};
	} else atom.set = function(valueOrFn2) {
		if (atom._update(valueOrFn2)) {
			const subs = atom.subs;
			if (subs !== void 0) {
				propagate(subs);
				shallowPropagate(subs);
				flush();
			}
		}
	};
	return atom;
}
function effect(fn) {
	const run = () => {
		const prevSub = activeSub;
		activeSub = effectObj;
		++cycle;
		effectObj.depsTail = void 0;
		effectObj.flags = ReactiveFlags.Watching | ReactiveFlags.RecursedCheck;
		try {
			return fn();
		} finally {
			activeSub = prevSub;
			effectObj.flags &= ~ReactiveFlags.RecursedCheck;
			purgeDeps(effectObj);
		}
	};
	const effectObj = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: ReactiveFlags.Watching | ReactiveFlags.RecursedCheck,
		notify() {
			const flags = this.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(this.deps, this)) run();
			else this.flags = ReactiveFlags.Watching;
		},
		stop() {
			this.flags = ReactiveFlags.None;
			this.depsTail = void 0;
			purgeDeps(this);
		}
	};
	run();
	return effectObj;
}
var Store = class {
	constructor(valueOrFn) {
		this.atom = createAtom(valueOrFn);
	}
	setState(updater) {
		this.atom.set(updater);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};
var ReadonlyStore = class {
	constructor(valueOrFn) {
		this.atom = createAtom(valueOrFn);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};
function createStore(valueOrFn) {
	if (typeof valueOrFn === "function") return new ReadonlyStore(valueOrFn);
	return new Store(valueOrFn);
}
function Transitioner() {
	const router = useRouter();
	const mountLoadForRouter = import_react.useRef({
		router,
		mounted: false
	});
	const [isTransitioning, setIsTransitioning] = import_react.useState(false);
	const isLoading = useStore(router.stores.isLoading, (value) => value);
	const hasPendingMatches = useStore(router.stores.hasPendingMatches, (value) => value);
	const previousIsLoading = usePrevious(isLoading);
	const isAnyPending = isLoading || isTransitioning || hasPendingMatches;
	const previousIsAnyPending = usePrevious(isAnyPending);
	const isPagePending = isLoading || hasPendingMatches;
	const previousIsPagePending = usePrevious(isPagePending);
	router.startTransition = (fn) => {
		setIsTransitioning(true);
		import_react.startTransition(() => {
			fn();
			setIsTransitioning(false);
		});
	};
	import_react.useEffect(() => {
		const unsub = router.history.subscribe(router.load);
		const nextLocation = router.buildLocation({
			to: router.latestLocation.pathname,
			search: true,
			params: true,
			hash: true,
			state: true,
			_includeValidateSearch: true
		});
		if (trimPathRight(router.latestLocation.publicHref) !== trimPathRight(nextLocation.publicHref)) router.commitLocation({
			...nextLocation,
			replace: true
		});
		return () => {
			unsub();
		};
	}, [router, router.history]);
	useLayoutEffect(() => {
		if (typeof window !== "undefined" && router.ssr || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) return;
		mountLoadForRouter.current = {
			router,
			mounted: true
		};
		const tryLoad = async () => {
			try {
				await router.load();
			} catch (err) {
				console.error(err);
			}
		};
		tryLoad();
	}, [router]);
	useLayoutEffect(() => {
		if (previousIsLoading && !isLoading) router.emit({
			type: "onLoad",
			...getLocationChangeInfo(router.stores.location.state, router.stores.resolvedLocation.state)
		});
	}, [
		previousIsLoading,
		router,
		isLoading
	]);
	useLayoutEffect(() => {
		if (previousIsPagePending && !isPagePending) router.emit({
			type: "onBeforeRouteMount",
			...getLocationChangeInfo(router.stores.location.state, router.stores.resolvedLocation.state)
		});
	}, [
		isPagePending,
		previousIsPagePending,
		router
	]);
	useLayoutEffect(() => {
		if (previousIsAnyPending && !isAnyPending) {
			const changeInfo = getLocationChangeInfo(router.stores.location.state, router.stores.resolvedLocation.state);
			router.emit({
				type: "onResolved",
				...changeInfo
			});
			batch(() => {
				router.stores.status.setState(() => "idle");
				router.stores.resolvedLocation.setState(() => router.stores.location.state);
			});
			if (changeInfo.hrefChanged) handleHashScroll(router);
		}
	}, [
		isAnyPending,
		previousIsAnyPending,
		router
	]);
	return null;
}
function Matches() {
	const router = useRouter();
	const PendingComponent = router.routesById["__root__"].options.pendingComponent ?? router.options.defaultPendingComponent;
	const pendingElement = PendingComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingComponent, {}) : null;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(typeof document !== "undefined" && router.ssr ? SafeFragment : import_react.Suspense, {
		fallback: pendingElement,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transitioner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchesInner, {})]
	});
	return router.options.InnerWrap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
	const router = useRouter();
	const matchId = useStore(router.stores.firstMatchId, (id) => id);
	const resetKey = useStore(router.stores.loadedAt, (loadedAt) => loadedAt);
	const matchComponent = matchId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Match, { matchId }) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(matchContext.Provider, {
		value: matchId,
		children: router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatchBoundary, {
			getResetKey: () => resetKey,
			errorComponent: ErrorComponent,
			onCatch: void 0,
			children: matchComponent
		})
	});
}
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createStore,
		createReadonlyStore: createStore,
		batch
	};
};
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
function RouterContextProvider({ router, children, ...rest }) {
	if (Object.keys(rest).length > 0) router.update({
		...router.options,
		...rest,
		context: {
			...router.options.context,
			...rest.context
		}
	});
	const provider = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(routerContext.Provider, {
		value: router,
		children
	});
	if (router.options.Wrap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.Wrap, { children: provider });
	return provider;
}
function RouterProvider({ router, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterContextProvider, {
		router,
		...rest,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Matches, {})
	});
}
export { useHasWindowControls as i, createRouter as n, WindowControls_default as r, RouterProvider as t };

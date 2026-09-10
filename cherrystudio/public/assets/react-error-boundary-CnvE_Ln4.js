import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var h = (0, import_react.createContext)(null), c = {
	didCatch: !1,
	error: null
};
var m = class extends import_react.Component {
	constructor(t) {
		super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = c;
	}
	static getDerivedStateFromError(t) {
		return {
			didCatch: !0,
			error: t
		};
	}
	resetErrorBoundary(...t) {
		const { error: e } = this.state;
		e !== null && (this.props.onReset?.({
			args: t,
			reason: "imperative-api"
		}), this.setState(c));
	}
	componentDidCatch(t, e) {
		this.props.onError?.(t, e);
	}
	componentDidUpdate(t, e) {
		const { didCatch: o } = this.state, { resetKeys: n } = this.props;
		o && e.error !== null && C(t.resetKeys, n) && (this.props.onReset?.({
			next: n,
			prev: t.resetKeys,
			reason: "keys"
		}), this.setState(c));
	}
	render() {
		const { children: t, fallbackRender: e, FallbackComponent: o, fallback: n } = this.props, { didCatch: s, error: a } = this.state;
		let i = t;
		if (s) {
			const u = {
				error: a,
				resetErrorBoundary: this.resetErrorBoundary
			};
			if (typeof e == "function") i = e(u);
			else if (o) i = (0, import_react.createElement)(o, u);
			else if (n !== void 0) i = n;
			else throw a;
		}
		return (0, import_react.createElement)(h.Provider, { value: {
			didCatch: s,
			error: a,
			resetErrorBoundary: this.resetErrorBoundary
		} }, i);
	}
};
function C(r = [], t = []) {
	return r.length !== t.length || r.some((e, o) => !Object.is(e, t[o]));
}
export { m as t };

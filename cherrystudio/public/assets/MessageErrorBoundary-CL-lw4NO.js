import { s as __toESM } from "./chunk-DiqNceaa.js";
import { i as isProd } from "./platform-YWZQ2_mC.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ErrorFallback = ({ fallback, error }) => {
	const { t } = useTranslation();
	const errorDescription = !isProd && error ? `${t("error.render.description")}: ${error.message}` : t("error.render.description");
	return fallback || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.error-fallback.alert",
		role: "alert",
		className: "rounded-md border border-error-border bg-error-subtle px-3 py-2 text-error-subtle-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium",
			children: t("error.render.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children: errorDescription
		})]
	});
};
var MessageErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorFallback, {
			fallback: this.props.fallback,
			error: this.state.error
		});
		return this.props.children;
	}
};
var MessageErrorBoundary_default = MessageErrorBoundary;
export { MessageErrorBoundary_default as t };

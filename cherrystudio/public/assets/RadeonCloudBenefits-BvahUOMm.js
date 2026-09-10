import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Gift } from "./gift-ClN4jnyi.js";
import { t as SquareArrowOutUpRight } from "./square-arrow-out-up-right-C1KYX8p6.js";
import "./Scrollbar-CjwT5bYS.js";
import { t as ProviderHelpLink } from "./ProviderSettingsPrimitives-C82JUgBE.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var TOKEN_FACTORY_URL = "https://developer.amd.com.cn/radeon/tokenfactory?source=cherry-studio";
function RadeonCloudBenefits() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.radeon-cloud-benefits.note",
		"data-testid": "radeon-cloud-benefits",
		className: "flex gap-3 rounded-lg border border-success/30 bg-success/10 p-3",
		role: "note",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
			className: "mt-0.5 size-5 shrink-0 text-success",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-foreground text-sm",
					children: t("settings.provider.radeon_cloud.benefits.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-foreground-muted text-xs leading-relaxed",
					children: t("settings.provider.radeon_cloud.benefits.description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProviderHelpLink, {
					className: "mx-0 mt-2 inline-flex items-center gap-1",
					href: TOKEN_FACTORY_URL,
					target: "_blank",
					rel: "noreferrer",
					children: [t("settings.provider.radeon_cloud.benefits.cta"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareArrowOutUpRight, {
						className: "size-3",
						"aria-hidden": true
					})]
				})
			]
		})]
	});
}
export { RadeonCloudBenefits as default };

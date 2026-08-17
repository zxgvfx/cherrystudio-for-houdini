import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { r as getToastUtilities } from "./toast-CTDSidj8.js";
var resolveToastLabels = () => ({
	close: resolver_default.t("common.close"),
	error: resolver_default.t("common.error"),
	errorDescription: resolver_default.t("error.unknown"),
	loading: resolver_default.t("common.loading"),
	success: resolver_default.t("common.success")
});
const toast = getToastUtilities(resolveToastLabels);
export { toast as t };

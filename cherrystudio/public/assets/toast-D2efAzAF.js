import { r as resolver_default } from "./resolver-Bn-i1elC.js";
import { r as getToastUtilities } from "./toast-BtN4jQ2l.js";
var resolveToastLabels = () => ({
	close: resolver_default.t("common.close"),
	error: resolver_default.t("common.error"),
	errorDescription: resolver_default.t("error.unknown"),
	loading: resolver_default.t("common.loading"),
	success: resolver_default.t("common.success")
});
const toast = getToastUtilities(resolveToastLabels);
export { toast as t };

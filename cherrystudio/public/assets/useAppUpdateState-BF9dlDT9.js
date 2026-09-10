import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useCache } from "./useCache-lF6Sw_ck.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useAppUpdateState = () => {
	const [appUpdateState, setAppUpdateState] = useCache("app.dist.update_state");
	return {
		appUpdateState,
		updateAppUpdateState: (0, import_react.useCallback)((state) => {
			setAppUpdateState((previous) => ({
				...previous,
				...state
			}));
		}, [setAppUpdateState])
	};
};
export { useAppUpdateState as t };

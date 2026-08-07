import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as useCache } from "./useCache-SsOQx-L2.js";
import { t as require_react } from "./react-BgPOU4At.js";
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

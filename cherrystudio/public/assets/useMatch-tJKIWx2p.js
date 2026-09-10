import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { _ as isServer, g as replaceEqualDeep, n as invariant, t as useStore } from "./useStore-dDlHYNm4.js";
import { t as useRouter } from "./useRouter-DL8y2Z5X.js";
import { n as matchContext, t as dummyMatchContext } from "./matchContext-BMcKlU7u.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var dummyStore = {
	state: void 0,
	get: () => void 0,
	subscribe: () => () => {}
};
function useMatch(opts) {
	const router = useRouter();
	const nearestMatchId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const key = opts.from ?? nearestMatchId;
	const matchStore = key ? opts.from ? router.stores.getMatchStoreByRouteId(key) : router.stores.activeMatchStoresById.get(key) : void 0;
	const previousResult = import_react.useRef(void 0);
	return useStore(matchStore ?? dummyStore, (match) => {
		if ((opts.shouldThrow ?? true) && !match) invariant();
		if (match === void 0) return;
		const selected = opts.select ? opts.select(match) : match;
		if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
			const shared = replaceEqualDeep(previousResult.current, selected);
			previousResult.current = shared;
			return shared;
		}
		return selected;
	});
}
export { useMatch as t };

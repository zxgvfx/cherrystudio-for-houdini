import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { _ as isServer, g as replaceEqualDeep, t as useStore } from "./useStore-BVKk9vF2.js";
import { t as useRouter } from "./useRouter-MGlqprIR.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useLocation(opts) {
	const router = useRouter();
	const previousResult = (0, import_react.useRef)(void 0);
	return useStore(router.stores.location, (location) => {
		const selected = opts?.select ? opts.select(location) : location;
		if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) {
			const shared = replaceEqualDeep(previousResult.current, selected);
			previousResult.current = shared;
			return shared;
		}
		return selected;
	});
}
export { useLocation as t };

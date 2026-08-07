import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useLayoutEffect2 } from "./dist-CuwIZpzZ.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var useReactId = import_react[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
	const [id, setId] = import_react.useState(useReactId());
	useLayoutEffect2(() => {
		if (!deterministicId) setId((reactId) => reactId ?? String(count++));
	}, [deterministicId]);
	return deterministicId || (id ? `radix-${id}` : "");
}
export { useId as t };

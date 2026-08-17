import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BuGMWdaI.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useWindowInitData() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		ipcApi.request("window.get_init_data").then((initial) => {
			if (!cancelled && initial !== null && initial !== void 0) setData(initial);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	useIpcOn("window.reused", (payload) => {
		if (payload !== void 0 && payload !== null) setData(payload);
	});
	return data;
}
export { useWindowInitData as t };

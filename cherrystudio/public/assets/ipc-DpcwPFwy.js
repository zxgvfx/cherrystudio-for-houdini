import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as IpcErrorCode, t as IpcError } from "./IpcError-CvtL-yge.js";
async function unwrap(pending) {
	const result = await pending;
	if (typeof result !== "object" || result === null || !("ok" in result)) throw new IpcError(IpcErrorCode.INTERNAL, "IpcApi returned a malformed result");
	const envelope = result;
	if (envelope.ok) return envelope.data;
	throw IpcError.fromJSON(envelope.error);
}
const ipcApi = {
	request: (route, ...args) => unwrap(window.api.ipcApi.request(route, args[0])),
	on: (event, callback) => window.api.ipcApi.on(event, callback)
};
var import_react = /* @__PURE__ */ __toESM(require_react());
function useIpcOn(event, handler) {
	const onEvent = (0, import_react.useEffectEvent)(handler);
	(0, import_react.useEffect)(() => {
		return ipcApi.on(event, onEvent);
	}, [event]);
}
export { ipcApi as n, useIpcOn as t };

import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as useSWRImmutable } from "./immutable-BfjW-ZDx.js";
async function loadOvmsSupport() {
	try {
		return await ipcApi.request("ovms.is_supported");
	} catch {
		return false;
	}
}
function useOvmsSupport() {
	const { data } = useSWRImmutable("ovms/isSupported", loadOvmsSupport);
	return { isSupported: data };
}
export { useOvmsSupport as t };

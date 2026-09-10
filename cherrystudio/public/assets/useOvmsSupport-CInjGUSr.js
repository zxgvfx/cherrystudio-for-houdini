import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as useSWRImmutable } from "./immutable-CtJYf-60.js";
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

import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BDTAufGC.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLocalModel(model) {
	const [status, setStatus] = (0, import_react.useState)("not_downloaded");
	const [isStatusResolved, setIsStatusResolved] = (0, import_react.useState)(false);
	const [percent, setPercent] = (0, import_react.useState)(0);
	const mountedRef = (0, import_react.useRef)(true);
	const refreshStatus = (0, import_react.useCallback)(async () => {
		try {
			const result = await ipcApi.request("local_model.get_status", { model });
			if (mountedRef.current) {
				setStatus(result.status);
				setIsStatusResolved(true);
			}
		} catch {}
	}, [model]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		setIsStatusResolved(false);
		refreshStatus();
		return () => {
			mountedRef.current = false;
		};
	}, [refreshStatus]);
	useIpcOn("local_model.download_progress", (progress) => {
		if (!mountedRef.current || progress.model !== model) return;
		setPercent(progress.percent);
		setIsStatusResolved(true);
		if (progress.status === "ready") setStatus("ready");
		else if (progress.status === "error") setStatus("error");
		else if (progress.status === "not_downloaded") {
			setStatus("not_downloaded");
			setPercent(0);
		} else setStatus("downloading");
	});
	return {
		status,
		isStatusResolved,
		percent,
		download: (0, import_react.useCallback)(async () => {
			if (mountedRef.current) {
				setStatus("downloading");
				setPercent(0);
			}
			try {
				const result = await ipcApi.request("local_model.download", { model });
				if (!mountedRef.current) return false;
				if (result.result === "cancelled") {
					setStatus("not_downloaded");
					setPercent(0);
					return false;
				}
				setStatus("ready");
				setPercent(100);
				return true;
			} catch (error) {
				if (!mountedRef.current) return false;
				setStatus("error");
				throw error;
			}
		}, [model]),
		cancel: (0, import_react.useCallback)(async () => {
			try {
				await ipcApi.request("local_model.cancel", { model });
			} finally {
				if (mountedRef.current) {
					setStatus("not_downloaded");
					setPercent(0);
				}
			}
		}, [model]),
		remove: (0, import_react.useCallback)(async () => {
			const result = await ipcApi.request("local_model.remove", { model });
			if (result.removed && mountedRef.current) {
				setStatus("not_downloaded");
				setPercent(0);
			}
			return result;
		}, [model])
	};
}
export { useLocalModel as t };

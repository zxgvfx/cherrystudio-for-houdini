import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BuGMWdaI.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLocalModel(model) {
	const [state, setState] = (0, import_react.useState)({
		status: "not_downloaded",
		errorCode: null
	});
	const [isStatusResolved, setIsStatusResolved] = (0, import_react.useState)(false);
	const [percent, setPercent] = (0, import_react.useState)(0);
	const mountedRef = (0, import_react.useRef)(true);
	const refreshStatus = (0, import_react.useCallback)(async () => {
		try {
			const result = await ipcApi.request("local_model.get_status", { model });
			if (mountedRef.current) {
				setState({
					status: result.status,
					errorCode: result.errorCode ?? null
				});
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
		if (progress.status === "ready") setState({
			status: "ready",
			errorCode: null
		});
		else if (progress.status === "error") setState({
			status: "error",
			errorCode: progress.errorCode ?? "download_failed"
		});
		else if (progress.status === "not_downloaded") {
			setState({
				status: "not_downloaded",
				errorCode: null
			});
			setPercent(0);
		} else setState({
			status: "downloading",
			errorCode: null
		});
	});
	const download = (0, import_react.useCallback)(async () => {
		if (mountedRef.current) {
			setState({
				status: "downloading",
				errorCode: null
			});
			setPercent(0);
		}
		try {
			const result = await ipcApi.request("local_model.download", { model });
			if (!mountedRef.current) return false;
			if (result.result === "cancelled") {
				setState({
					status: "not_downloaded",
					errorCode: null
				});
				setPercent(0);
				return false;
			}
			setState({
				status: "ready",
				errorCode: null
			});
			setPercent(100);
			return true;
		} catch (error) {
			if (!mountedRef.current) return false;
			setState({
				status: "error",
				errorCode: "download_failed"
			});
			throw error;
		}
	}, [model]);
	const cancel = (0, import_react.useCallback)(async () => {
		try {
			await ipcApi.request("local_model.cancel", { model });
		} finally {
			if (mountedRef.current) {
				setState({
					status: "not_downloaded",
					errorCode: null
				});
				setPercent(0);
			}
		}
	}, [model]);
	const remove = (0, import_react.useCallback)(async () => {
		const result = await ipcApi.request("local_model.remove", { model });
		if (result.removed && mountedRef.current) {
			setState({
				status: "not_downloaded",
				errorCode: null
			});
			setPercent(0);
		}
		return result;
	}, [model]);
	return {
		status: state.status,
		errorCode: state.errorCode,
		isStatusResolved,
		percent,
		download,
		cancel,
		remove
	};
}
export { useLocalModel as t };

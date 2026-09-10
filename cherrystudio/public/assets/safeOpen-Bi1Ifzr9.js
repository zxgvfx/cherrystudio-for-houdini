import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as IpcError } from "./IpcError-CvtL-yge.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as fileErrorCodes } from "./file-C14fz2kP.js";
var logger = loggerService.withContext("safeOpen");
async function safeOpen(handle) {
	try {
		await ipcApi.request("file.open", handle);
	} catch (error) {
		if (error instanceof IpcError && error.code === fileErrorCodes.OPEN_BLOCKED_UNSAFE_TYPE) {
			logger.warn("Blocked unsafe default-open; falling back to show in folder", { handle });
			try {
				await ipcApi.request("file.show_in_folder", handle);
			} catch (showError) {
				logger.error("Failed to show blocked file in folder", showError);
				throw showError;
			}
			return;
		}
		logger.error("Failed to open file", error);
		throw error;
	}
}
export { safeOpen as t };

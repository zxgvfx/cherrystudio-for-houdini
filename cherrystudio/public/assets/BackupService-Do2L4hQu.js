import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as preferenceService } from "./PreferenceService-uLlqCRc6.js";
import { t as require_dayjs_min } from "./dayjs.min-CNu3tPBh.js";
import { r as resolver_default } from "./resolver-eUld2ti5.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as popup } from "./popup-C0FVl5N5.js";
import { t as uuid } from "./uuid-Z_-TZRDQ.js";
var NotificationService = class {
	async send(notification) {
		if ((await preferenceService.getMultiple({
			assistant: "app.notification.assistant.enabled",
			backup: "app.notification.backup.enabled",
			knowledge: "app.notification.knowledge.enabled"
		}))[notification.source]) ipcApi.request("notification.send", notification);
	}
};
const notificationService = new NotificationService();
function getLocalizedBackupErrorMessage(error, fallbackKey = "message.backup.failed") {
	const messageKey = error instanceof Error && error.message.includes("BACKUP_ACTIVE_WRITERS") ? "backup.error.active_data_writers" : fallbackKey;
	return resolver_default.t(messageKey);
}
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var logger = loggerService.withContext("BackupService");
var backupSyncState = {
	webdav: {
		lastSyncTime: null,
		syncing: false,
		lastSyncError: null
	},
	s3: {
		lastSyncTime: null,
		syncing: false,
		lastSyncError: null
	},
	local: {
		lastSyncTime: null,
		syncing: false,
		lastSyncError: null
	},
	nutstore: {
		lastSyncTime: null,
		syncing: false,
		lastSyncError: null
	}
};
var backupSyncListeners = /* @__PURE__ */ new Set();
const getBackupSyncState = () => backupSyncState;
const subscribeBackupSyncState = (listener) => {
	backupSyncListeners.add(listener);
	return () => backupSyncListeners.delete(listener);
};
const setBackupSyncState = (type, patch) => {
	backupSyncState = {
		...backupSyncState,
		[type]: {
			...backupSyncState[type],
			...patch
		}
	};
	backupSyncListeners.forEach((listener) => listener());
};
async function recordManualBackupCompletion(type) {
	try {
		await ipcApi.request("backup.manual_completion.record", { type });
	} catch (error) {
		logger.error("Failed to record manual backup completion", error);
	}
}
var setWebDAVSyncState = (patch) => setBackupSyncState("webdav", patch);
var setS3SyncState = (patch) => setBackupSyncState("s3", patch);
var setLocalBackupSyncState = (patch) => setBackupSyncState("local", patch);
async function backup(skipBackupFile = false) {
	const filename = `cherry-studio.${(0, import_dayjs_min.default)().format("YYYYMMDDHHmm")}.zip`;
	const selectFolder = await window.api.file.selectFolder();
	if (selectFolder) {
		await window.api.backup.backup(filename, selectFolder, skipBackupFile);
		toast.success(resolver_default.t("message.backup.success"));
	}
}
async function restore() {
	const file = await window.api.file.open({ filters: [{
		name: "备份文件",
		extensions: ["zip"]
	}] });
	if (file) try {
		await window.api.backup.restore(file.filePath);
		notificationService.send({
			id: uuid(),
			type: "success",
			title: resolver_default.t("common.success"),
			message: resolver_default.t("message.restore.success"),
			silent: false,
			timestamp: Date.now(),
			source: "backup"
		});
		return;
	} catch (error) {
		logger.error("restore: Error restoring backup file:", error);
		popup.error({
			title: resolver_default.t("error.backup.file_format"),
			content: getLocalizedBackupErrorMessage(error, "error.backup.file_format"),
			centered: true
		});
	}
}
async function backupToWebdav({ customFileName = "" } = {}) {
	setWebDAVSyncState({
		syncing: true,
		lastSyncError: null
	});
	const { webdavHost, webdavUser, webdavPass, webdavPath, webdavMaxBackups, webdavSkipBackupFile, webdavDisableStream } = await preferenceService.getMultiple({
		webdavHost: "data.backup.webdav.host",
		webdavUser: "data.backup.webdav.user",
		webdavPass: "data.backup.webdav.pass",
		webdavPath: "data.backup.webdav.path",
		webdavMaxBackups: "data.backup.webdav.max_backups",
		webdavSkipBackupFile: "data.backup.webdav.skip_backup_file",
		webdavDisableStream: "data.backup.webdav.disable_stream"
	});
	const finalFileName = customFileName ? customFileName.endsWith(".zip") ? customFileName : `${customFileName}.zip` : void 0;
	try {
		const { result: success, cleanupFailed } = await window.api.backup.backupToWebdav({
			webdavHost,
			webdavUser,
			webdavPass,
			webdavPath,
			fileName: finalFileName,
			maxBackups: webdavMaxBackups,
			skipBackupFile: webdavSkipBackupFile,
			disableStream: webdavDisableStream
		});
		if (success) {
			await recordManualBackupCompletion("webdav");
			if (cleanupFailed) {
				const message = resolver_default.t("message.backup.cleanup_failed");
				setWebDAVSyncState({ lastSyncError: message });
				toast.warning(message);
			} else {
				setWebDAVSyncState({ lastSyncError: null });
				notificationService.send({
					id: uuid(),
					type: "success",
					title: resolver_default.t("common.success"),
					message: resolver_default.t("message.backup.success"),
					silent: false,
					timestamp: Date.now(),
					source: "backup"
				});
				toast.success(resolver_default.t("message.backup.success"));
			}
		} else {
			const message = resolver_default.t("message.backup.failed");
			setWebDAVSyncState({ lastSyncError: message });
			toast.error(message);
		}
	} catch (error) {
		const message = getLocalizedBackupErrorMessage(error);
		notificationService.send({
			id: uuid(),
			type: "error",
			title: resolver_default.t("message.backup.failed"),
			message,
			silent: false,
			timestamp: Date.now(),
			source: "backup"
		});
		setWebDAVSyncState({ lastSyncError: message });
		toast.error(message);
		logger.error("[Backup] backupToWebdav: Error uploading file to WebDAV:", error);
	} finally {
		setWebDAVSyncState({
			lastSyncTime: Date.now(),
			syncing: false
		});
	}
}
async function restoreFromWebdav(fileName) {
	const { webdavHost, webdavUser, webdavPass, webdavPath } = await preferenceService.getMultiple({
		webdavHost: "data.backup.webdav.host",
		webdavUser: "data.backup.webdav.user",
		webdavPass: "data.backup.webdav.pass",
		webdavPath: "data.backup.webdav.path"
	});
	await window.api.backup.restoreFromWebdav({
		webdavHost,
		webdavUser,
		webdavPass,
		webdavPath,
		fileName
	});
	logger.info("[WebDAVBackup] Backup restore staged, app will restart");
}
async function backupToS3({ customFileName = "" } = {}) {
	setS3SyncState({
		syncing: true,
		lastSyncError: null
	});
	const s3Config = await preferenceService.getMultiple({
		autoSync: "data.backup.s3.auto_sync",
		accessKeyId: "data.backup.s3.access_key_id",
		secretAccessKey: "data.backup.s3.secret_access_key",
		endpoint: "data.backup.s3.endpoint",
		bucket: "data.backup.s3.bucket",
		region: "data.backup.s3.region",
		root: "data.backup.s3.root",
		maxBackups: "data.backup.s3.max_backups",
		skipBackupFile: "data.backup.s3.skip_backup_file",
		syncInterval: "data.backup.s3.sync_interval"
	});
	const finalFileName = customFileName ? customFileName.endsWith(".zip") ? customFileName : `${customFileName}.zip` : void 0;
	try {
		const { result: success, cleanupFailed } = await window.api.backup.backupToS3({
			...s3Config,
			fileName: finalFileName
		});
		if (success) {
			await recordManualBackupCompletion("s3");
			if (cleanupFailed) {
				const message = resolver_default.t("message.backup.cleanup_failed");
				setS3SyncState({ lastSyncError: message });
				toast.warning(message);
			} else {
				setS3SyncState({ lastSyncError: null });
				notificationService.send({
					id: uuid(),
					type: "success",
					title: resolver_default.t("common.success"),
					message: resolver_default.t("message.backup.success"),
					silent: false,
					timestamp: Date.now(),
					source: "backup"
				});
				toast.success(resolver_default.t("message.backup.success"));
			}
		} else {
			const message = resolver_default.t("message.backup.failed");
			setS3SyncState({ lastSyncError: message });
			toast.error(message);
		}
	} catch (error) {
		const message = getLocalizedBackupErrorMessage(error);
		notificationService.send({
			id: uuid(),
			type: "error",
			title: resolver_default.t("message.backup.failed"),
			message,
			silent: false,
			timestamp: Date.now(),
			source: "backup"
		});
		setS3SyncState({ lastSyncError: message });
		logger.error("backupToS3: Error uploading file to S3:", error);
		toast.error(message);
	} finally {
		setS3SyncState({
			lastSyncTime: Date.now(),
			syncing: false
		});
	}
}
async function restoreFromS3(fileName) {
	const s3Config = await preferenceService.getMultiple({
		autoSync: "data.backup.s3.auto_sync",
		accessKeyId: "data.backup.s3.access_key_id",
		secretAccessKey: "data.backup.s3.secret_access_key",
		endpoint: "data.backup.s3.endpoint",
		bucket: "data.backup.s3.bucket",
		region: "data.backup.s3.region",
		root: "data.backup.s3.root",
		maxBackups: "data.backup.s3.max_backups",
		syncInterval: "data.backup.s3.sync_interval"
	});
	if (!fileName) {
		const files = await window.api.backup.listS3Files(s3Config);
		if (files.length > 0) fileName = files[0].fileName;
	}
	if (fileName) {
		await window.api.backup.restoreFromS3({
			...s3Config,
			fileName
		});
		logger.info("[S3Backup] Backup restore staged, app will restart");
	}
}
async function backupToLocal({ customFileName = "" } = {}) {
	setLocalBackupSyncState({
		syncing: true,
		lastSyncError: null
	});
	const { localBackupDirSetting, localBackupMaxBackups, localBackupSkipBackupFile } = await preferenceService.getMultiple({
		localBackupDirSetting: "data.backup.local.dir",
		localBackupMaxBackups: "data.backup.local.max_backups",
		localBackupSkipBackupFile: "data.backup.local.skip_backup_file"
	});
	const localBackupDir = await window.api.resolvePath(localBackupDirSetting);
	const finalFileName = customFileName ? customFileName.endsWith(".zip") ? customFileName : `${customFileName}.zip` : void 0;
	try {
		const { result, cleanupFailed } = await window.api.backup.backupToLocalDir(finalFileName, {
			localBackupDir,
			maxBackups: localBackupMaxBackups,
			skipBackupFile: localBackupSkipBackupFile
		});
		if (result) {
			await recordManualBackupCompletion("local");
			if (cleanupFailed) {
				const message = resolver_default.t("message.backup.cleanup_failed");
				setLocalBackupSyncState({ lastSyncError: message });
				toast.warning(message);
			} else {
				setLocalBackupSyncState({ lastSyncError: null });
				notificationService.send({
					id: uuid(),
					type: "success",
					title: resolver_default.t("common.success"),
					message: resolver_default.t("message.backup.success"),
					silent: false,
					timestamp: Date.now(),
					source: "backup"
				});
			}
		} else {
			const message = resolver_default.t("message.backup.failed");
			setLocalBackupSyncState({ lastSyncError: message });
			popup.error({
				title: message,
				content: message
			});
		}
		return result;
	} catch (error) {
		logger.error("[LocalBackup] Backup failed:", error);
		const message = getLocalizedBackupErrorMessage(error);
		setLocalBackupSyncState({ lastSyncError: message });
		popup.error({
			title: resolver_default.t("message.backup.failed"),
			content: message
		});
		throw error;
	} finally {
		setLocalBackupSyncState({
			lastSyncTime: Date.now(),
			syncing: false
		});
	}
}
async function restoreFromLocal(fileName) {
	const localBackupDirSetting = await preferenceService.get("data.backup.local.dir");
	const localBackupDir = await window.api.resolvePath(localBackupDirSetting);
	await window.api.backup.restoreFromLocalBackup(fileName, localBackupDir);
	logger.info("[LocalBackup] Backup restore staged, app will restart");
	return true;
}
export { getBackupSyncState as a, restoreFromLocal as c, setBackupSyncState as d, subscribeBackupSyncState as f, backupToWebdav as i, restoreFromS3 as l, notificationService as m, backupToLocal as n, recordManualBackupCompletion as o, getLocalizedBackupErrorMessage as p, backupToS3 as r, restore as s, backup as t, restoreFromWebdav as u };

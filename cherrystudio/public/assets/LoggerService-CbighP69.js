let IpcChannel = /* @__PURE__ */ function(IpcChannel$1) {
	IpcChannel$1["App_SetLaunchOnBoot"] = "app:set-launch-on-boot";
	IpcChannel$1["App_SetSpellCheckLanguages"] = "app:set-spell-check-languages";
	IpcChannel$1["App_Select"] = "app:select";
	IpcChannel$1["App_HasWritePermission"] = "app:has-write-permission";
	IpcChannel$1["App_ResolvePath"] = "app:resolve-path";
	IpcChannel$1["App_IsPathInside"] = "app:is-path-inside";
	IpcChannel$1["Application_PreventQuit"] = "application:prevent-quit";
	IpcChannel$1["Application_AllowQuit"] = "application:allow-quit";
	IpcChannel$1["Application_Relaunch"] = "application:relaunch";
	IpcChannel$1["App_LogToMain"] = "app:log-to-main";
	IpcChannel$1["App_QuoteToMain"] = "app:quote-to-main";
	IpcChannel$1["StorageMonitor_GetHealth"] = "storage-monitor:get-health";
	IpcChannel$1["StorageMonitor_HealthChanged"] = "storage-monitor:health-changed";
	IpcChannel$1["Python_ExecutionRequest"] = "python:execution-request";
	IpcChannel$1["Python_ExecutionResponse"] = "python:execution-response";
	IpcChannel$1["Copilot_GetAuthMessage"] = "copilot:get-auth-message";
	IpcChannel$1["Copilot_GetCopilotToken"] = "copilot:get-copilot-token";
	IpcChannel$1["Copilot_SaveCopilotToken"] = "copilot:save-copilot-token";
	IpcChannel$1["Copilot_GetToken"] = "copilot:get-token";
	IpcChannel$1["Copilot_Logout"] = "copilot:logout";
	IpcChannel$1["Copilot_GetUser"] = "copilot:get-user";
	IpcChannel$1["Nutstore_GetSsoUrl"] = "nutstore:get-sso-url";
	IpcChannel$1["Nutstore_DecryptToken"] = "nutstore:decrypt-token";
	IpcChannel$1["Nutstore_GetDirectoryContents"] = "nutstore:get-directory-contents";
	IpcChannel$1["Aes_Decrypt"] = "aes:decrypt";
	IpcChannel$1["Shortcut_RegistrationConflict"] = "shortcut:registration-conflict";
	IpcChannel$1["NativeCommandPopupMenu_Show"] = "native-command-popup-menu:show";
	IpcChannel$1["Tab_MoveWindow"] = "tab:move-window";
	IpcChannel$1["File_Open"] = "file:open";
	IpcChannel$1["File_OpenPath"] = "file:openPath";
	IpcChannel$1["File_Save"] = "file:save";
	IpcChannel$1["File_Select"] = "file:select";
	IpcChannel$1["File_ReadExternal"] = "file:readExternal";
	IpcChannel$1["File_DeleteExternalFile"] = "file:deleteExternalFile";
	IpcChannel$1["File_DeleteExternalDir"] = "file:deleteExternalDir";
	IpcChannel$1["File_Move"] = "file:move";
	IpcChannel$1["File_MoveDir"] = "file:moveDir";
	IpcChannel$1["File_Rename"] = "file:rename";
	IpcChannel$1["File_RenameDir"] = "file:renameDir";
	IpcChannel$1["File_Get"] = "file:get";
	IpcChannel$1["File_SelectFolder"] = "file:selectFolder";
	IpcChannel$1["File_CreateTempFile"] = "file:createTempFile";
	IpcChannel$1["File_Mkdir"] = "file:mkdir";
	IpcChannel$1["File_Write"] = "file:write";
	IpcChannel$1["File_SaveImage"] = "file:saveImage";
	IpcChannel$1["File_BinaryImage"] = "file:binaryImage";
	IpcChannel$1["Fs_Read"] = "fs:read";
	IpcChannel$1["Fs_ReadText"] = "fs:readText";
	IpcChannel$1["File_ListDirectory"] = "file:listDirectory";
	IpcChannel$1["File_ListDirectoryEntries"] = "file:listDirectoryEntries";
	IpcChannel$1["File_CheckFileName"] = "file:checkFileName";
	IpcChannel$1["File_ValidateNotesDirectory"] = "file:validateNotesDirectory";
	IpcChannel$1["File_BatchUploadMarkdown"] = "file:batchUploadMarkdown";
	IpcChannel$1["File_ShowInFolder"] = "file:showInFolder";
	IpcChannel$1["File_CreateInternalEntry"] = "file:createInternalEntry";
	IpcChannel$1["File_EnsureExternalEntry"] = "file:ensureExternalEntry";
	IpcChannel$1["File_GetPhysicalPath"] = "file:getPhysicalPath";
	IpcChannel$1["File_PermanentDelete"] = "file:permanentDelete";
	IpcChannel$1["File_RunSweep"] = "file:runSweep";
	IpcChannel$1["Backup_Backup"] = "backup:backup";
	IpcChannel$1["Backup_Restore"] = "backup:restore";
	IpcChannel$1["Backup_BackupToWebdav"] = "backup:backupToWebdav";
	IpcChannel$1["Backup_RestoreFromWebdav"] = "backup:restoreFromWebdav";
	IpcChannel$1["Backup_ListWebdavFiles"] = "backup:listWebdavFiles";
	IpcChannel$1["Backup_CheckConnection"] = "backup:checkConnection";
	IpcChannel$1["Backup_CreateDirectory"] = "backup:createDirectory";
	IpcChannel$1["Backup_DeleteWebdavFile"] = "backup:deleteWebdavFile";
	IpcChannel$1["Backup_BackupToLocalDir"] = "backup:backupToLocalDir";
	IpcChannel$1["Backup_RestoreFromLocalBackup"] = "backup:restoreFromLocalBackup";
	IpcChannel$1["Backup_ListLocalBackupFiles"] = "backup:listLocalBackupFiles";
	IpcChannel$1["Backup_DeleteLocalBackupFile"] = "backup:deleteLocalBackupFile";
	IpcChannel$1["Backup_BackupToS3"] = "backup:backupToS3";
	IpcChannel$1["Backup_RestoreFromS3"] = "backup:restoreFromS3";
	IpcChannel$1["Backup_ListS3Files"] = "backup:listS3Files";
	IpcChannel$1["Backup_DeleteS3File"] = "backup:deleteS3File";
	IpcChannel$1["Backup_CreateLanTransferBackup"] = "backup:createLanTransferBackup";
	IpcChannel$1["Backup_DeleteLanTransferBackup"] = "backup:deleteLanTransferBackup";
	IpcChannel$1["Zip_Decompress"] = "zip:decompress";
	IpcChannel$1["System_GetHostname"] = "system:getHostname";
	IpcChannel$1["BackupProgress"] = "backup-progress";
	IpcChannel$1["RestoreProgress"] = "restore-progress";
	IpcChannel$1["Preference_Get"] = "preference:get";
	IpcChannel$1["Preference_Set"] = "preference:set";
	IpcChannel$1["Preference_GetMultipleRaw"] = "preference:get-multiple-raw";
	IpcChannel$1["Preference_SetMultiple"] = "preference:set-multiple";
	IpcChannel$1["Preference_GetAll"] = "preference:get-all";
	IpcChannel$1["Preference_Subscribe"] = "preference:subscribe";
	IpcChannel$1["Preference_Changed"] = "preference:changed";
	IpcChannel$1["Cache_Sync"] = "cache:sync";
	IpcChannel$1["Cache_SyncBatch"] = "cache:sync-batch";
	IpcChannel$1["Cache_GetAllShared"] = "cache:get-all-shared";
	IpcChannel$1["DataApi_Request"] = "data-api:request";
	IpcChannel$1["DataApi_DataChanged"] = "data-api:data-changed";
	IpcChannel$1["IpcApi_Request"] = "ipc-api:request";
	IpcChannel$1["IpcApi_Event"] = "ipc-api:event";
	IpcChannel$1["TRACE_GET_DATA"] = "trace:getData";
	IpcChannel$1["TRACE_CLEAN_LOCAL_DATA"] = "trace:cleanLocalData";
	IpcChannel$1["ExternalApps_DetectInstalled"] = "external-apps:detect-installed";
	IpcChannel$1["Skill_ReadFile"] = "skill:read-file";
	IpcChannel$1["Skill_ListFiles"] = "skill:list-files";
	IpcChannel$1["LanTransfer_StartScan"] = "lan-transfer:start-scan";
	IpcChannel$1["LanTransfer_StopScan"] = "lan-transfer:stop-scan";
	IpcChannel$1["LanTransfer_ServicesUpdated"] = "lan-transfer:services-updated";
	IpcChannel$1["LanTransfer_Connect"] = "lan-transfer:connect";
	IpcChannel$1["LanTransfer_Disconnect"] = "lan-transfer:disconnect";
	IpcChannel$1["LanTransfer_ClientEvent"] = "lan-transfer:client-event";
	IpcChannel$1["LanTransfer_SendFile"] = "lan-transfer:send-file";
	IpcChannel$1["LanTransfer_CancelTransfer"] = "lan-transfer:cancel-transfer";
	return IpcChannel$1;
}({});
const LEVEL = {
	ERROR: "error",
	WARN: "warn",
	INFO: "info",
	DEBUG: "debug",
	VERBOSE: "verbose",
	SILLY: "silly",
	NONE: "none"
};
const LEVEL_MAP = {
	error: 10,
	warn: 8,
	info: 6,
	debug: 4,
	verbose: 2,
	silly: 0,
	none: -1
};
var IS_WORKER = typeof window === "undefined";
var IS_DEV = IS_WORKER ? false : window.electron?.process?.env?.NODE_ENV === "development";
var DIAGNOSTICS_ENABLED = IS_WORKER ? false : !!window.electron?.process?.env?.CS_DIAGNOSTICS;
var DEV_LOGGING = IS_DEV || DIAGNOSTICS_ENABLED;
var DEFAULT_LEVEL = DEV_LOGGING ? LEVEL.SILLY : LEVEL.INFO;
var MAIN_LOG_LEVEL = LEVEL.WARN;
var WINDOW_SOURCE_META_NAME = "logger-window-source";
function resolveWindowSourceFromMeta(doc) {
	return (doc?.querySelector(`meta[name="${WINDOW_SOURCE_META_NAME}"]`))?.getAttribute("content")?.trim() ?? "";
}
var LoggerService = class {
	envLevel = LEVEL.NONE;
	envShowModules = [];
	level = DEFAULT_LEVEL;
	logToMainLevel = MAIN_LOG_LEVEL;
	window = "";
	derivedWindow = "";
	module = "";
	context = {};
	constructor() {
		this.derivedWindow = resolveWindowSourceFromMeta(typeof document === "undefined" ? void 0 : document);
		if (DEV_LOGGING) {
			if (window.electron?.process?.env?.CSLOGGER_RENDERER_LEVEL && Object.values(LEVEL).includes(window.electron?.process?.env?.CSLOGGER_RENDERER_LEVEL)) {
				this.envLevel = window.electron?.process?.env?.CSLOGGER_RENDERER_LEVEL;
				console.log(`%c[LoggerService] env CSLOGGER_RENDERER_LEVEL loaded: ${this.envLevel}`, "color: blue; font-weight: bold");
			}
			if (window.electron?.process?.env?.CSLOGGER_RENDERER_SHOW_MODULES) {
				const showModules = window.electron?.process?.env?.CSLOGGER_RENDERER_SHOW_MODULES.split(",").map((module) => module.trim()).filter((module) => module !== "");
				if (showModules.length > 0) {
					this.envShowModules = showModules;
					console.log(`%c[LoggerService] env CSLOGGER_RENDERER_SHOW_MODULES loaded: ${this.envShowModules.join(" ")}`, "color: blue; font-weight: bold");
				}
			}
		}
	}
	initWindowSource(window$1) {
		if (this.window) {
			console.warn("[LoggerService] window source already initialized, current: %s, want to set: %s", this.window, window$1);
			return this;
		}
		this.window = window$1;
		return this;
	}
	withContext(module, context) {
		const newLogger = Object.create(this);
		newLogger.module = module;
		newLogger.context = {
			...this.context,
			...context
		};
		return newLogger;
	}
	processLog(level, message, data) {
		let windowSource = this.window || this.derivedWindow;
		if (!windowSource) {
			console.error("[LoggerService] window source not initialized, please initialize window source first");
			windowSource = "UNKNOWN";
		}
		const currentLevel = LEVEL_MAP[level];
		if (DEV_LOGGING) {
			if (this.envLevel !== LEVEL.NONE && currentLevel < LEVEL_MAP[this.envLevel]) return;
			if (this.module && this.envShowModules.length > 0 && !this.envShowModules.includes(this.module)) return;
		}
		if (currentLevel < LEVEL_MAP[this.level]) return;
		const logMessage = this.module ? `[${this.module}] ${message}` : message;
		switch (level) {
			case LEVEL.ERROR:
				console.error("%c<error>", "color: red; font-weight: bold", logMessage, ...data);
				break;
			case LEVEL.WARN:
				console.warn("%c<warn>", "color: #FFA500; font-weight: bold", logMessage, ...data);
				break;
			case LEVEL.INFO:
				console.info("%c<info>", "color: #32CD32; font-weight: bold", logMessage, ...data);
				break;
			case LEVEL.VERBOSE:
				console.debug("%c<verbose>", "color: #808080", logMessage, ...data);
				break;
			case LEVEL.DEBUG:
				console.debug("%c<debug>", "color: #7B68EE", logMessage, ...data);
				break;
			case LEVEL.SILLY:
				console.debug("%c<silly>", "color: #808080", logMessage, ...data);
				break;
		}
		const forceLogToMain = data.length > 0 && data[data.length - 1]?.logToMain === true;
		if (currentLevel >= LEVEL_MAP[this.logToMainLevel] || forceLogToMain) {
			const source = {
				process: "renderer",
				window: windowSource,
				module: this.module
			};
			if (Object.keys(this.context).length > 0) source.context = this.context;
			if (forceLogToMain) data = data.slice(0, -1);
			if (!IS_WORKER) window.electron.ipcRenderer.invoke(IpcChannel.App_LogToMain, source, level, message, data);
		}
	}
	error(message, ...data) {
		this.processLog(LEVEL.ERROR, message, data);
	}
	warn(message, ...data) {
		this.processLog(LEVEL.WARN, message, data);
	}
	info(message, ...data) {
		this.processLog(LEVEL.INFO, message, data);
	}
	verbose(message, ...data) {
		this.processLog(LEVEL.VERBOSE, message, data);
	}
	debug(message, ...data) {
		this.processLog(LEVEL.DEBUG, message, data);
	}
	silly(message, ...data) {
		this.processLog(LEVEL.SILLY, message, data);
	}
	setLevel(level) {
		this.level = level;
	}
	getLevel() {
		return this.level;
	}
	resetLevel() {
		this.setLevel(DEFAULT_LEVEL);
	}
	setLogToMainLevel(level) {
		this.logToMainLevel = level;
	}
	getLogToMainLevel() {
		return this.logToMainLevel;
	}
	resetLogToMainLevel() {
		this.setLogToMainLevel(MAIN_LOG_LEVEL);
	}
};
const loggerService = new LoggerService();
export { IpcChannel as n, loggerService as t };

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
let IpcChannel = /* @__PURE__ */ function(IpcChannel$1) {
	IpcChannel$1["App_GetCacheSize"] = "app:get-cache-size";
	IpcChannel$1["App_ClearCache"] = "app:clear-cache";
	IpcChannel$1["App_SetLaunchOnBoot"] = "app:set-launch-on-boot";
	IpcChannel$1["App_SetLanguage"] = "app:set-language";
	IpcChannel$1["App_SetEnableSpellCheck"] = "app:set-enable-spell-check";
	IpcChannel$1["App_SetSpellCheckLanguages"] = "app:set-spell-check-languages";
	IpcChannel$1["App_CheckForUpdate"] = "app:check-for-update";
	IpcChannel$1["App_QuitAndInstall"] = "app:quit-and-install";
	IpcChannel$1["App_Reload"] = "app:reload";
	IpcChannel$1["App_Quit"] = "app:quit";
	IpcChannel$1["App_Info"] = "app:info";
	IpcChannel$1["App_Proxy"] = "app:proxy";
	IpcChannel$1["App_SetLaunchToTray"] = "app:set-launch-to-tray";
	IpcChannel$1["App_SetTray"] = "app:set-tray";
	IpcChannel$1["App_SetTrayOnClose"] = "app:set-tray-on-close";
	IpcChannel$1["App_SetTheme"] = "app:set-theme";
	IpcChannel$1["App_SetAutoUpdate"] = "app:set-auto-update";
	IpcChannel$1["App_SetTestPlan"] = "app:set-test-plan";
	IpcChannel$1["App_SetTestChannel"] = "app:set-test-channel";
	IpcChannel$1["App_HandleZoomFactor"] = "app:handle-zoom-factor";
	IpcChannel$1["App_Select"] = "app:select";
	IpcChannel$1["App_HasWritePermission"] = "app:has-write-permission";
	IpcChannel$1["App_ResolvePath"] = "app:resolve-path";
	IpcChannel$1["App_IsPathInside"] = "app:is-path-inside";
	IpcChannel$1["App_Copy"] = "app:copy";
	IpcChannel$1["App_SetStopQuitApp"] = "app:set-stop-quit-app";
	IpcChannel$1["App_SetAppDataPath"] = "app:set-app-data-path";
	IpcChannel$1["App_GetDataPathFromArgs"] = "app:get-data-path-from-args";
	IpcChannel$1["App_FlushAppData"] = "app:flush-app-data";
	IpcChannel$1["App_IsNotEmptyDir"] = "app:is-not-empty-dir";
	IpcChannel$1["App_RelaunchApp"] = "app:relaunch-app";
	IpcChannel$1["App_ResetData"] = "app:reset-data";
	IpcChannel$1["App_IsBinaryExist"] = "app:is-binary-exist";
	IpcChannel$1["App_GetBinaryPath"] = "app:get-binary-path";
	IpcChannel$1["App_InstallUvBinary"] = "app:install-uv-binary";
	IpcChannel$1["App_InstallBunBinary"] = "app:install-bun-binary";
	IpcChannel$1["App_InstallOvmsBinary"] = "app:install-ovms-binary";
	IpcChannel$1["App_LogToMain"] = "app:log-to-main";
	IpcChannel$1["App_SaveData"] = "app:save-data";
	IpcChannel$1["App_GetDiskInfo"] = "app:get-disk-info";
	IpcChannel$1["App_SetFullScreen"] = "app:set-full-screen";
	IpcChannel$1["App_IsFullScreen"] = "app:is-full-screen";
	IpcChannel$1["App_GetSystemFonts"] = "app:get-system-fonts";
	IpcChannel$1["App_GetIpCountry"] = "app:get-ip-country";
	IpcChannel$1["APP_CrashRenderProcess"] = "app:crash-render-process";
	IpcChannel$1["App_MacIsProcessTrusted"] = "app:mac-is-process-trusted";
	IpcChannel$1["App_MacRequestProcessTrust"] = "app:mac-request-process-trust";
	IpcChannel$1["App_QuoteToMain"] = "app:quote-to-main";
	IpcChannel$1["App_SetDisableHardwareAcceleration"] = "app:set-disable-hardware-acceleration";
	IpcChannel$1["App_SetUseSystemTitleBar"] = "app:set-use-system-title-bar";
	IpcChannel$1["Notification_Send"] = "notification:send";
	IpcChannel$1["Notification_OnClick"] = "notification:on-click";
	IpcChannel$1["Webview_SetOpenLinkExternal"] = "webview:set-open-link-external";
	IpcChannel$1["Webview_SetSpellCheckEnabled"] = "webview:set-spell-check-enabled";
	IpcChannel$1["Webview_SearchHotkey"] = "webview:search-hotkey";
	IpcChannel$1["Webview_PrintToPDF"] = "webview:print-to-pdf";
	IpcChannel$1["Webview_SaveAsHTML"] = "webview:save-as-html";
	IpcChannel$1["Open_Path"] = "open:path";
	IpcChannel$1["Open_Website"] = "open:website";
	IpcChannel$1["Minapp"] = "minapp";
	IpcChannel$1["Config_Set"] = "config:set";
	IpcChannel$1["Config_Get"] = "config:get";
	IpcChannel$1["Config_GetMergedConfig"] = "config:get-merged";
	IpcChannel$1["Config_Reload"] = "config:reload";
	IpcChannel$1["Config_UpdateUserModels"] = "config:update-user-models";
	IpcChannel$1["Config_UpdateUserMcpServers"] = "config:update-user-mcp-servers";
	IpcChannel$1["Config_UpdateDefaultModelSettings"] = "config:update-default-model-settings";
	IpcChannel$1["Config_GetLastRequestCost"] = "config:get-last-request-cost";
	IpcChannel$1["MiniWindow_Show"] = "miniwindow:show";
	IpcChannel$1["MiniWindow_Hide"] = "miniwindow:hide";
	IpcChannel$1["MiniWindow_Close"] = "miniwindow:close";
	IpcChannel$1["MiniWindow_Toggle"] = "miniwindow:toggle";
	IpcChannel$1["MiniWindow_SetPin"] = "miniwindow:set-pin";
	IpcChannel$1["Mcp_AddServer"] = "mcp:add-server";
	IpcChannel$1["Mcp_RemoveServer"] = "mcp:remove-server";
	IpcChannel$1["Mcp_RestartServer"] = "mcp:restart-server";
	IpcChannel$1["Mcp_StopServer"] = "mcp:stop-server";
	IpcChannel$1["Mcp_ListTools"] = "mcp:list-tools";
	IpcChannel$1["Mcp_CallTool"] = "mcp:call-tool";
	IpcChannel$1["Mcp_ListPrompts"] = "mcp:list-prompts";
	IpcChannel$1["Mcp_GetPrompt"] = "mcp:get-prompt";
	IpcChannel$1["Mcp_ListResources"] = "mcp:list-resources";
	IpcChannel$1["Mcp_GetResource"] = "mcp:get-resource";
	IpcChannel$1["Mcp_GetInstallInfo"] = "mcp:get-install-info";
	IpcChannel$1["Mcp_ServersChanged"] = "mcp:servers-changed";
	IpcChannel$1["Mcp_ServersUpdated"] = "mcp:servers-updated";
	IpcChannel$1["Mcp_CheckConnectivity"] = "mcp:check-connectivity";
	IpcChannel$1["Mcp_UploadDxt"] = "mcp:upload-dxt";
	IpcChannel$1["Mcp_AbortTool"] = "mcp:abort-tool";
	IpcChannel$1["Mcp_ResolveHubTool"] = "mcp:resolve-hub-tool";
	IpcChannel$1["Mcp_GetServerVersion"] = "mcp:get-server-version";
	IpcChannel$1["Mcp_Progress"] = "mcp:progress";
	IpcChannel$1["Mcp_GetServerLogs"] = "mcp:get-server-logs";
	IpcChannel$1["Mcp_ServerLog"] = "mcp:server-log";
	IpcChannel$1["Python_Execute"] = "python:execute";
	IpcChannel$1["AgentMessage_PersistExchange"] = "agent-message:persist-exchange";
	IpcChannel$1["AgentMessage_GetHistory"] = "agent-message:get-history";
	IpcChannel$1["AgentToolPermission_Request"] = "agent-tool-permission:request";
	IpcChannel$1["AgentToolPermission_Response"] = "agent-tool-permission:response";
	IpcChannel$1["AgentToolPermission_Result"] = "agent-tool-permission:result";
	IpcChannel$1["Copilot_GetAuthMessage"] = "copilot:get-auth-message";
	IpcChannel$1["Copilot_GetCopilotToken"] = "copilot:get-copilot-token";
	IpcChannel$1["Copilot_SaveCopilotToken"] = "copilot:save-copilot-token";
	IpcChannel$1["Copilot_GetToken"] = "copilot:get-token";
	IpcChannel$1["Copilot_Logout"] = "copilot:logout";
	IpcChannel$1["Copilot_GetUser"] = "copilot:get-user";
	IpcChannel$1["CherryIN_SaveToken"] = "cherryin:save-token";
	IpcChannel$1["CherryIN_HasToken"] = "cherryin:has-token";
	IpcChannel$1["CherryIN_GetBalance"] = "cherryin:get-balance";
	IpcChannel$1["CherryIN_Logout"] = "cherryin:logout";
	IpcChannel$1["CherryIN_StartOAuthFlow"] = "cherryin:start-oauth-flow";
	IpcChannel$1["CherryIN_ExchangeToken"] = "cherryin:exchange-token";
	IpcChannel$1["Obsidian_GetVaults"] = "obsidian:get-vaults";
	IpcChannel$1["Obsidian_GetFiles"] = "obsidian:get-files";
	IpcChannel$1["Nutstore_GetSsoUrl"] = "nutstore:get-sso-url";
	IpcChannel$1["Nutstore_DecryptToken"] = "nutstore:decrypt-token";
	IpcChannel$1["Nutstore_GetDirectoryContents"] = "nutstore:get-directory-contents";
	IpcChannel$1["Aes_Encrypt"] = "aes:encrypt";
	IpcChannel$1["Aes_Decrypt"] = "aes:decrypt";
	IpcChannel$1["Gemini_UploadFile"] = "gemini:upload-file";
	IpcChannel$1["Gemini_Base64File"] = "gemini:base64-file";
	IpcChannel$1["Gemini_RetrieveFile"] = "gemini:retrieve-file";
	IpcChannel$1["Gemini_ListFiles"] = "gemini:list-files";
	IpcChannel$1["Gemini_DeleteFile"] = "gemini:delete-file";
	IpcChannel$1["VertexAI_GetAuthHeaders"] = "vertexai:get-auth-headers";
	IpcChannel$1["VertexAI_GetAccessToken"] = "vertexai:get-access-token";
	IpcChannel$1["VertexAI_ClearAuthCache"] = "vertexai:clear-auth-cache";
	IpcChannel$1["Windows_ResetMinimumSize"] = "window:reset-minimum-size";
	IpcChannel$1["Windows_SetMinimumSize"] = "window:set-minimum-size";
	IpcChannel$1["Windows_Resize"] = "window:resize";
	IpcChannel$1["Windows_GetSize"] = "window:get-size";
	IpcChannel$1["Windows_Minimize"] = "window:minimize";
	IpcChannel$1["Windows_Maximize"] = "window:maximize";
	IpcChannel$1["Windows_Unmaximize"] = "window:unmaximize";
	IpcChannel$1["Windows_Close"] = "window:close";
	IpcChannel$1["Windows_IsMaximized"] = "window:is-maximized";
	IpcChannel$1["Windows_MaximizedChanged"] = "window:maximized-changed";
	IpcChannel$1["Windows_NavigateToAbout"] = "window:navigate-to-about";
	IpcChannel$1["KnowledgeBase_Create"] = "knowledge-base:create";
	IpcChannel$1["KnowledgeBase_Reset"] = "knowledge-base:reset";
	IpcChannel$1["KnowledgeBase_Delete"] = "knowledge-base:delete";
	IpcChannel$1["KnowledgeBase_Add"] = "knowledge-base:add";
	IpcChannel$1["KnowledgeBase_Remove"] = "knowledge-base:remove";
	IpcChannel$1["KnowledgeBase_Search"] = "knowledge-base:search";
	IpcChannel$1["KnowledgeBase_Rerank"] = "knowledge-base:rerank";
	IpcChannel$1["File_Open"] = "file:open";
	IpcChannel$1["File_OpenPath"] = "file:openPath";
	IpcChannel$1["File_Save"] = "file:save";
	IpcChannel$1["File_Select"] = "file:select";
	IpcChannel$1["File_Upload"] = "file:upload";
	IpcChannel$1["File_Clear"] = "file:clear";
	IpcChannel$1["File_Read"] = "file:read";
	IpcChannel$1["File_ReadExternal"] = "file:readExternal";
	IpcChannel$1["File_Delete"] = "file:delete";
	IpcChannel$1["File_DeleteDir"] = "file:deleteDir";
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
	IpcChannel$1["File_WriteWithId"] = "file:writeWithId";
	IpcChannel$1["File_SaveImage"] = "file:saveImage";
	IpcChannel$1["File_Base64Image"] = "file:base64Image";
	IpcChannel$1["File_SaveBase64Image"] = "file:saveBase64Image";
	IpcChannel$1["File_SavePastedImage"] = "file:savePastedImage";
	IpcChannel$1["File_Download"] = "file:download";
	IpcChannel$1["File_Copy"] = "file:copy";
	IpcChannel$1["File_BinaryImage"] = "file:binaryImage";
	IpcChannel$1["File_Base64File"] = "file:base64File";
	IpcChannel$1["File_TranscodeAudioToWav"] = "file:transcodeAudioToWav";
	IpcChannel$1["File_TranscodeAudio"] = "file:transcodeAudio";
	IpcChannel$1["File_GetPdfInfo"] = "file:getPdfInfo";
	IpcChannel$1["Fs_Read"] = "fs:read";
	IpcChannel$1["Fs_ReadText"] = "fs:readText";
	IpcChannel$1["File_OpenWithRelativePath"] = "file:openWithRelativePath";
	IpcChannel$1["File_IsTextFile"] = "file:isTextFile";
	IpcChannel$1["File_IsDirectory"] = "file:isDirectory";
	IpcChannel$1["File_ListDirectory"] = "file:listDirectory";
	IpcChannel$1["File_GetDirectoryStructure"] = "file:getDirectoryStructure";
	IpcChannel$1["File_CheckFileName"] = "file:checkFileName";
	IpcChannel$1["File_ValidateNotesDirectory"] = "file:validateNotesDirectory";
	IpcChannel$1["File_StartWatcher"] = "file:startWatcher";
	IpcChannel$1["File_StopWatcher"] = "file:stopWatcher";
	IpcChannel$1["File_PauseWatcher"] = "file:pauseWatcher";
	IpcChannel$1["File_ResumeWatcher"] = "file:resumeWatcher";
	IpcChannel$1["File_BatchUploadMarkdown"] = "file:batchUploadMarkdown";
	IpcChannel$1["File_ShowInFolder"] = "file:showInFolder";
	IpcChannel$1["FileService_Upload"] = "file-service:upload";
	IpcChannel$1["FileService_List"] = "file-service:list";
	IpcChannel$1["FileService_Delete"] = "file-service:delete";
	IpcChannel$1["FileService_Retrieve"] = "file-service:retrieve";
	IpcChannel$1["Export_Word"] = "export:word";
	IpcChannel$1["Shortcuts_Update"] = "shortcuts:update";
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
	IpcChannel$1["Backup_CheckS3Connection"] = "backup:checkS3Connection";
	IpcChannel$1["Backup_CreateLanTransferBackup"] = "backup:createLanTransferBackup";
	IpcChannel$1["Backup_DeleteTempBackup"] = "backup:deleteTempBackup";
	IpcChannel$1["Zip_Compress"] = "zip:compress";
	IpcChannel$1["Zip_Decompress"] = "zip:decompress";
	IpcChannel$1["System_GetDeviceType"] = "system:getDeviceType";
	IpcChannel$1["System_GetHostname"] = "system:getHostname";
	IpcChannel$1["System_GetCpuName"] = "system:getCpuName";
	IpcChannel$1["System_CheckGitBash"] = "system:checkGitBash";
	IpcChannel$1["System_GetGitBashPath"] = "system:getGitBashPath";
	IpcChannel$1["System_GetGitBashPathInfo"] = "system:getGitBashPathInfo";
	IpcChannel$1["System_SetGitBashPath"] = "system:setGitBashPath";
	IpcChannel$1["System_ToggleDevTools"] = "system:toggleDevTools";
	IpcChannel$1["BackupProgress"] = "backup-progress";
	IpcChannel$1["ThemeUpdated"] = "theme:updated";
	IpcChannel$1["RestoreProgress"] = "restore-progress";
	IpcChannel$1["UpdateError"] = "update-error";
	IpcChannel$1["UpdateAvailable"] = "update-available";
	IpcChannel$1["UpdateNotAvailable"] = "update-not-available";
	IpcChannel$1["DownloadProgress"] = "download-progress";
	IpcChannel$1["UpdateDownloaded"] = "update-downloaded";
	IpcChannel$1["DownloadUpdate"] = "download-update";
	IpcChannel$1["DirectoryProcessingPercent"] = "directory-processing-percent";
	IpcChannel$1["FullscreenStatusChanged"] = "fullscreen-status-changed";
	IpcChannel$1["HideMiniWindow"] = "hide-mini-window";
	IpcChannel$1["ShowMiniWindow"] = "show-mini-window";
	IpcChannel$1["ReduxStoreReady"] = "redux-store-ready";
	IpcChannel$1["SearchWindow_Open"] = "search-window:open";
	IpcChannel$1["SearchWindow_Close"] = "search-window:close";
	IpcChannel$1["SearchWindow_OpenUrl"] = "search-window:open-url";
	IpcChannel$1["StoreSync_Subscribe"] = "store-sync:subscribe";
	IpcChannel$1["StoreSync_Unsubscribe"] = "store-sync:unsubscribe";
	IpcChannel$1["StoreSync_OnUpdate"] = "store-sync:on-update";
	IpcChannel$1["StoreSync_BroadcastSync"] = "store-sync:broadcast-sync";
	IpcChannel$1["Provider_AddKey"] = "provider:add-key";
	IpcChannel$1["Selection_TextSelected"] = "selection:text-selected";
	IpcChannel$1["Selection_ToolbarHide"] = "selection:toolbar-hide";
	IpcChannel$1["Selection_ToolbarVisibilityChange"] = "selection:toolbar-visibility-change";
	IpcChannel$1["Selection_ToolbarDetermineSize"] = "selection:toolbar-determine-size";
	IpcChannel$1["Selection_WriteToClipboard"] = "selection:write-to-clipboard";
	IpcChannel$1["Selection_SetEnabled"] = "selection:set-enabled";
	IpcChannel$1["Selection_SetTriggerMode"] = "selection:set-trigger-mode";
	IpcChannel$1["Selection_SetFilterMode"] = "selection:set-filter-mode";
	IpcChannel$1["Selection_SetFilterList"] = "selection:set-filter-list";
	IpcChannel$1["Selection_SetFollowToolbar"] = "selection:set-follow-toolbar";
	IpcChannel$1["Selection_SetRemeberWinSize"] = "selection:set-remeber-win-size";
	IpcChannel$1["Selection_ActionWindowClose"] = "selection:action-window-close";
	IpcChannel$1["Selection_ActionWindowMinimize"] = "selection:action-window-minimize";
	IpcChannel$1["Selection_ActionWindowPin"] = "selection:action-window-pin";
	IpcChannel$1["Selection_ActionWindowResize"] = "selection:action-window-resize";
	IpcChannel$1["Selection_ProcessAction"] = "selection:process-action";
	IpcChannel$1["Selection_UpdateActionData"] = "selection:update-action-data";
	IpcChannel$1["Memory_Add"] = "memory:add";
	IpcChannel$1["Memory_Search"] = "memory:search";
	IpcChannel$1["Memory_List"] = "memory:list";
	IpcChannel$1["Memory_Delete"] = "memory:delete";
	IpcChannel$1["Memory_Update"] = "memory:update";
	IpcChannel$1["Memory_Get"] = "memory:get";
	IpcChannel$1["Memory_SetConfig"] = "memory:set-config";
	IpcChannel$1["Memory_DeleteUser"] = "memory:delete-user";
	IpcChannel$1["Memory_DeleteAllMemoriesForUser"] = "memory:delete-all-memories-for-user";
	IpcChannel$1["Memory_GetUsersList"] = "memory:get-users-list";
	IpcChannel$1["Memory_MigrateMemoryDb"] = "memory:migrate-memory-db";
	IpcChannel$1["TRACE_SAVE_DATA"] = "trace:saveData";
	IpcChannel$1["TRACE_GET_DATA"] = "trace:getData";
	IpcChannel$1["TRACE_SAVE_ENTITY"] = "trace:saveEntity";
	IpcChannel$1["TRACE_GET_ENTITY"] = "trace:getEntity";
	IpcChannel$1["TRACE_BIND_TOPIC"] = "trace:bindTopic";
	IpcChannel$1["TRACE_CLEAN_TOPIC"] = "trace:cleanTopic";
	IpcChannel$1["TRACE_TOKEN_USAGE"] = "trace:tokenUsage";
	IpcChannel$1["TRACE_CLEAN_HISTORY"] = "trace:cleanHistory";
	IpcChannel$1["TRACE_OPEN_WINDOW"] = "trace:openWindow";
	IpcChannel$1["TRACE_SET_TITLE"] = "trace:setTitle";
	IpcChannel$1["TRACE_ADD_END_MESSAGE"] = "trace:addEndMessage";
	IpcChannel$1["TRACE_CLEAN_LOCAL_DATA"] = "trace:cleanLocalData";
	IpcChannel$1["TRACE_ADD_STREAM_MESSAGE"] = "trace:addStreamMessage";
	IpcChannel$1["ApiServer_Start"] = "api-server:start";
	IpcChannel$1["ApiServer_Stop"] = "api-server:stop";
	IpcChannel$1["ApiServer_Restart"] = "api-server:restart";
	IpcChannel$1["ApiServer_GetStatus"] = "api-server:get-status";
	IpcChannel$1["ApiServer_Ready"] = "api-server:ready";
	IpcChannel$1["ApiServer_GetConfig"] = "api-server:get-config";
	IpcChannel$1["Anthropic_StartOAuthFlow"] = "anthropic:start-oauth-flow";
	IpcChannel$1["Anthropic_CompleteOAuthWithCode"] = "anthropic:complete-oauth-with-code";
	IpcChannel$1["Anthropic_CancelOAuthFlow"] = "anthropic:cancel-oauth-flow";
	IpcChannel$1["Anthropic_GetAccessToken"] = "anthropic:get-access-token";
	IpcChannel$1["Anthropic_HasCredentials"] = "anthropic:has-credentials";
	IpcChannel$1["Anthropic_ClearCredentials"] = "anthropic:clear-credentials";
	IpcChannel$1["ExternalApps_DetectInstalled"] = "external-apps:detect-installed";
	IpcChannel$1["CodeTools_Run"] = "code-tools:run";
	IpcChannel$1["CodeTools_GetAvailableTerminals"] = "code-tools:get-available-terminals";
	IpcChannel$1["CodeTools_SetCustomTerminalPath"] = "code-tools:set-custom-terminal-path";
	IpcChannel$1["CodeTools_GetCustomTerminalPath"] = "code-tools:get-custom-terminal-path";
	IpcChannel$1["CodeTools_RemoveCustomTerminalPath"] = "code-tools:remove-custom-terminal-path";
	IpcChannel$1["OCR_ocr"] = "ocr:ocr";
	IpcChannel$1["OCR_ListProviders"] = "ocr:list-providers";
	IpcChannel$1["Ovms_IsSupported"] = "ovms:is-supported";
	IpcChannel$1["Ovms_AddModel"] = "ovms:add-model";
	IpcChannel$1["Ovms_StopAddModel"] = "ovms:stop-addmodel";
	IpcChannel$1["Ovms_GetModels"] = "ovms:get-models";
	IpcChannel$1["Ovms_IsRunning"] = "ovms:is-running";
	IpcChannel$1["Ovms_GetStatus"] = "ovms:get-status";
	IpcChannel$1["Ovms_RunOVMS"] = "ovms:run-ovms";
	IpcChannel$1["Ovms_StopOVMS"] = "ovms:stop-ovms";
	IpcChannel$1["Cherryai_GetSignature"] = "cherryai:get-signature";
	IpcChannel$1["ClaudeCodePlugin_Install"] = "claudeCodePlugin:install";
	IpcChannel$1["ClaudeCodePlugin_Uninstall"] = "claudeCodePlugin:uninstall";
	IpcChannel$1["ClaudeCodePlugin_UninstallPackage"] = "claudeCodePlugin:uninstall-package";
	IpcChannel$1["ClaudeCodePlugin_ListInstalled"] = "claudeCodePlugin:list-installed";
	IpcChannel$1["ClaudeCodePlugin_WriteContent"] = "claudeCodePlugin:write-content";
	IpcChannel$1["ClaudeCodePlugin_InstallFromZip"] = "claudeCodePlugin:install-from-zip";
	IpcChannel$1["ClaudeCodePlugin_InstallFromDirectory"] = "claudeCodePlugin:install-from-directory";
	IpcChannel$1["LocalTransfer_ListServices"] = "local-transfer:list";
	IpcChannel$1["LocalTransfer_StartScan"] = "local-transfer:start-scan";
	IpcChannel$1["LocalTransfer_StopScan"] = "local-transfer:stop-scan";
	IpcChannel$1["LocalTransfer_ServicesUpdated"] = "local-transfer:services-updated";
	IpcChannel$1["LocalTransfer_Connect"] = "local-transfer:connect";
	IpcChannel$1["LocalTransfer_Disconnect"] = "local-transfer:disconnect";
	IpcChannel$1["LocalTransfer_ClientEvent"] = "local-transfer:client-event";
	IpcChannel$1["LocalTransfer_SendFile"] = "local-transfer:send-file";
	IpcChannel$1["LocalTransfer_CancelTransfer"] = "local-transfer:cancel-transfer";
	IpcChannel$1["OpenClaw_CheckInstalled"] = "openclaw:check-installed";
	IpcChannel$1["OpenClaw_Install"] = "openclaw:install";
	IpcChannel$1["OpenClaw_Uninstall"] = "openclaw:uninstall";
	IpcChannel$1["OpenClaw_InstallProgress"] = "openclaw:install-progress";
	IpcChannel$1["OpenClaw_StartGateway"] = "openclaw:start-gateway";
	IpcChannel$1["OpenClaw_StopGateway"] = "openclaw:stop-gateway";
	IpcChannel$1["OpenClaw_GetStatus"] = "openclaw:get-status";
	IpcChannel$1["OpenClaw_CheckHealth"] = "openclaw:check-health";
	IpcChannel$1["OpenClaw_GetDashboardUrl"] = "openclaw:get-dashboard-url";
	IpcChannel$1["OpenClaw_SyncConfig"] = "openclaw:sync-config";
	IpcChannel$1["OpenClaw_GetChannels"] = "openclaw:get-channels";
	IpcChannel$1["OpenClaw_CheckUpdate"] = "openclaw:check-update";
	IpcChannel$1["OpenClaw_PerformUpdate"] = "openclaw:perform-update";
	IpcChannel$1["Analytics_TrackTokenUsage"] = "analytics:track-token-usage";
	return IpcChannel$1;
}({});
const IS_WORKER = typeof window === "undefined";
const IS_DEV = IS_WORKER ? false : window.electron?.process?.env?.NODE_ENV === "development";
const DEFAULT_LEVEL = IS_DEV ? LEVEL.SILLY : LEVEL.INFO;
const MAIN_LOG_LEVEL = LEVEL.WARN;
const loggerService = class LoggerService {
	static instance;
	envLevel = LEVEL.NONE;
	envShowModules = [];
	level = DEFAULT_LEVEL;
	logToMainLevel = MAIN_LOG_LEVEL;
	window = "";
	module = "";
	context = {};
	constructor() {
		if (IS_DEV) {
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
	static getInstance() {
		if (!LoggerService.instance) LoggerService.instance = new LoggerService();
		return LoggerService.instance;
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
		let windowSource = this.window;
		if (!this.window) {
			console.error("[LoggerService] window source not initialized, please initialize window source first");
			windowSource = "UNKNOWN";
		}
		const currentLevel = LEVEL_MAP[level];
		if (IS_DEV) {
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
}.getInstance();
const defaultPerf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const warned = /* @__PURE__ */ new Set();
/* c8 ignore start */
const PROCESS = typeof process === "object" && !!process ? process : {};
/* c8 ignore start */
const emitWarning = (msg, type, code, fn) => {
	typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
/* c8 ignore start */
if (typeof AC === "undefined") {
	AS = class AbortSignal {
		onabort;
		_onabort = [];
		reason;
		aborted = false;
		addEventListener(_, fn) {
			this._onabort.push(fn);
		}
	};
	AC = class AbortController {
		constructor() {
			warnACPolyfill();
		}
		signal = new AS();
		abort(reason) {
			if (this.signal.aborted) return;
			this.signal.reason = reason;
			this.signal.aborted = true;
			for (const fn of this.signal._onabort) fn(reason);
			this.signal.onabort?.(reason);
		}
	};
	let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
	const warnACPolyfill = () => {
		if (!printACPolyfillWarning) return;
		printACPolyfillWarning = false;
		emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
	};
}
/* c8 ignore stop */
const shouldWarn = (code) => !warned.has(code);
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
/* c8 ignore start */
const getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
/* c8 ignore stop */
var ZeroArray = class extends Array {
	constructor(size) {
		super(size);
		this.fill(0);
	}
};
var Stack = class Stack {
	heap;
	length;
	static #constructing = false;
	static create(max) {
		const HeapCls = getUintArray(max);
		if (!HeapCls) return [];
		Stack.#constructing = true;
		const s = new Stack(max, HeapCls);
		Stack.#constructing = false;
		return s;
	}
	constructor(max, HeapCls) {
		/* c8 ignore start */
		if (!Stack.#constructing) throw new TypeError("instantiate Stack using Stack.create(n)");
		/* c8 ignore stop */
		this.heap = new HeapCls(max);
		this.length = 0;
	}
	push(n) {
		this.heap[this.length++] = n;
	}
	pop() {
		return this.heap[--this.length];
	}
};
var LRUCache = class LRUCache {
	#max;
	#maxSize;
	#dispose;
	#onInsert;
	#disposeAfter;
	#fetchMethod;
	#memoMethod;
	#perf;
	get perf() {
		return this.#perf;
	}
	ttl;
	ttlResolution;
	ttlAutopurge;
	updateAgeOnGet;
	updateAgeOnHas;
	allowStale;
	noDisposeOnSet;
	noUpdateTTL;
	maxEntrySize;
	sizeCalculation;
	noDeleteOnFetchRejection;
	noDeleteOnStaleGet;
	allowStaleOnFetchAbort;
	allowStaleOnFetchRejection;
	ignoreFetchAbort;
	#size;
	#calculatedSize;
	#keyMap;
	#keyList;
	#valList;
	#next;
	#prev;
	#head;
	#tail;
	#free;
	#disposed;
	#sizes;
	#starts;
	#ttls;
	#autopurgeTimers;
	#hasDispose;
	#hasFetchMethod;
	#hasDisposeAfter;
	#hasOnInsert;
	static unsafeExposeInternals(c) {
		return {
			starts: c.#starts,
			ttls: c.#ttls,
			autopurgeTimers: c.#autopurgeTimers,
			sizes: c.#sizes,
			keyMap: c.#keyMap,
			keyList: c.#keyList,
			valList: c.#valList,
			next: c.#next,
			prev: c.#prev,
			get head() {
				return c.#head;
			},
			get tail() {
				return c.#tail;
			},
			free: c.#free,
			isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
			backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
			moveToTail: (index) => c.#moveToTail(index),
			indexes: (options) => c.#indexes(options),
			rindexes: (options) => c.#rindexes(options),
			isStale: (index) => c.#isStale(index)
		};
	}
	get max() {
		return this.#max;
	}
	get maxSize() {
		return this.#maxSize;
	}
	get calculatedSize() {
		return this.#calculatedSize;
	}
	get size() {
		return this.#size;
	}
	get fetchMethod() {
		return this.#fetchMethod;
	}
	get memoMethod() {
		return this.#memoMethod;
	}
	get dispose() {
		return this.#dispose;
	}
	get onInsert() {
		return this.#onInsert;
	}
	get disposeAfter() {
		return this.#disposeAfter;
	}
	constructor(options) {
		const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, perf } = options;
		if (perf !== void 0) {
			if (typeof perf?.now !== "function") throw new TypeError("perf option must have a now() method if specified");
		}
		this.#perf = perf ?? defaultPerf;
		if (max !== 0 && !isPosInt(max)) throw new TypeError("max option must be a nonnegative integer");
		const UintArray = max ? getUintArray(max) : Array;
		if (!UintArray) throw new Error("invalid max value: " + max);
		this.#max = max;
		this.#maxSize = maxSize;
		this.maxEntrySize = maxEntrySize || this.#maxSize;
		this.sizeCalculation = sizeCalculation;
		if (this.sizeCalculation) {
			if (!this.#maxSize && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
			if (typeof this.sizeCalculation !== "function") throw new TypeError("sizeCalculation set to non-function");
		}
		if (memoMethod !== void 0 && typeof memoMethod !== "function") throw new TypeError("memoMethod must be a function if defined");
		this.#memoMethod = memoMethod;
		if (fetchMethod !== void 0 && typeof fetchMethod !== "function") throw new TypeError("fetchMethod must be a function if specified");
		this.#fetchMethod = fetchMethod;
		this.#hasFetchMethod = !!fetchMethod;
		this.#keyMap = /* @__PURE__ */ new Map();
		this.#keyList = new Array(max).fill(void 0);
		this.#valList = new Array(max).fill(void 0);
		this.#next = new UintArray(max);
		this.#prev = new UintArray(max);
		this.#head = 0;
		this.#tail = 0;
		this.#free = Stack.create(max);
		this.#size = 0;
		this.#calculatedSize = 0;
		if (typeof dispose === "function") this.#dispose = dispose;
		if (typeof onInsert === "function") this.#onInsert = onInsert;
		if (typeof disposeAfter === "function") {
			this.#disposeAfter = disposeAfter;
			this.#disposed = [];
		} else {
			this.#disposeAfter = void 0;
			this.#disposed = void 0;
		}
		this.#hasDispose = !!this.#dispose;
		this.#hasOnInsert = !!this.#onInsert;
		this.#hasDisposeAfter = !!this.#disposeAfter;
		this.noDisposeOnSet = !!noDisposeOnSet;
		this.noUpdateTTL = !!noUpdateTTL;
		this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
		this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
		this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
		this.ignoreFetchAbort = !!ignoreFetchAbort;
		if (this.maxEntrySize !== 0) {
			if (this.#maxSize !== 0) {
				if (!isPosInt(this.#maxSize)) throw new TypeError("maxSize must be a positive integer if specified");
			}
			if (!isPosInt(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
			this.#initializeSizeTracking();
		}
		this.allowStale = !!allowStale;
		this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
		this.updateAgeOnGet = !!updateAgeOnGet;
		this.updateAgeOnHas = !!updateAgeOnHas;
		this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
		this.ttlAutopurge = !!ttlAutopurge;
		this.ttl = ttl || 0;
		if (this.ttl) {
			if (!isPosInt(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
			this.#initializeTTLTracking();
		}
		if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
		if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
			const code = "LRU_CACHE_UNBOUNDED";
			if (shouldWarn(code)) {
				warned.add(code);
				emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", code, LRUCache);
			}
		}
	}
	getRemainingTTL(key) {
		return this.#keyMap.has(key) ? Infinity : 0;
	}
	#initializeTTLTracking() {
		const ttls = new ZeroArray(this.#max);
		const starts = new ZeroArray(this.#max);
		this.#ttls = ttls;
		this.#starts = starts;
		const purgeTimers = this.ttlAutopurge ? new Array(this.#max) : void 0;
		this.#autopurgeTimers = purgeTimers;
		this.#setItemTTL = (index, ttl, start = this.#perf.now()) => {
			starts[index] = ttl !== 0 ? start : 0;
			ttls[index] = ttl;
			if (purgeTimers?.[index]) {
				clearTimeout(purgeTimers[index]);
				purgeTimers[index] = void 0;
			}
			if (ttl !== 0 && purgeTimers) {
				const t = setTimeout(() => {
					if (this.#isStale(index)) this.#delete(this.#keyList[index], "expire");
				}, ttl + 1);
				/* c8 ignore start */
				if (t.unref) t.unref();
				/* c8 ignore stop */
				purgeTimers[index] = t;
			}
		};
		this.#updateItemAge = (index) => {
			starts[index] = ttls[index] !== 0 ? this.#perf.now() : 0;
		};
		this.#statusTTL = (status, index) => {
			if (ttls[index]) {
				const ttl = ttls[index];
				const start = starts[index];
				/* c8 ignore next */
				if (!ttl || !start) return;
				status.ttl = ttl;
				status.start = start;
				status.now = cachedNow || getNow();
				status.remainingTTL = ttl - (status.now - start);
			}
		};
		let cachedNow = 0;
		const getNow = () => {
			const n = this.#perf.now();
			if (this.ttlResolution > 0) {
				cachedNow = n;
				const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
				/* c8 ignore start */
				if (t.unref) t.unref();
			}
			return n;
		};
		this.getRemainingTTL = (key) => {
			const index = this.#keyMap.get(key);
			if (index === void 0) return 0;
			const ttl = ttls[index];
			const start = starts[index];
			if (!ttl || !start) return Infinity;
			return ttl - ((cachedNow || getNow()) - start);
		};
		this.#isStale = (index) => {
			const s = starts[index];
			const t = ttls[index];
			return !!t && !!s && (cachedNow || getNow()) - s > t;
		};
	}
	#updateItemAge = () => {};
	#statusTTL = () => {};
	#setItemTTL = () => {};
	/* c8 ignore stop */
	#isStale = () => false;
	#initializeSizeTracking() {
		const sizes = new ZeroArray(this.#max);
		this.#calculatedSize = 0;
		this.#sizes = sizes;
		this.#removeItemSize = (index) => {
			this.#calculatedSize -= sizes[index];
			sizes[index] = 0;
		};
		this.#requireSize = (k, v, size, sizeCalculation) => {
			if (this.#isBackgroundFetch(v)) return 0;
			if (!isPosInt(size)) if (sizeCalculation) {
				if (typeof sizeCalculation !== "function") throw new TypeError("sizeCalculation must be a function");
				size = sizeCalculation(v, k);
				if (!isPosInt(size)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
			} else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
			return size;
		};
		this.#addItemSize = (index, size, status) => {
			sizes[index] = size;
			if (this.#maxSize) {
				const maxSize = this.#maxSize - sizes[index];
				while (this.#calculatedSize > maxSize) this.#evict(true);
			}
			this.#calculatedSize += sizes[index];
			if (status) {
				status.entrySize = size;
				status.totalCalculatedSize = this.#calculatedSize;
			}
		};
	}
	#removeItemSize = (_i) => {};
	#addItemSize = (_i, _s, _st) => {};
	#requireSize = (_k, _v, size, sizeCalculation) => {
		if (size || sizeCalculation) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
		return 0;
	};
	*#indexes({ allowStale = this.allowStale } = {}) {
		if (this.#size) for (let i = this.#tail;;) {
			if (!this.#isValidIndex(i)) break;
			if (allowStale || !this.#isStale(i)) yield i;
			if (i === this.#head) break;
			else i = this.#prev[i];
		}
	}
	*#rindexes({ allowStale = this.allowStale } = {}) {
		if (this.#size) for (let i = this.#head;;) {
			if (!this.#isValidIndex(i)) break;
			if (allowStale || !this.#isStale(i)) yield i;
			if (i === this.#tail) break;
			else i = this.#next[i];
		}
	}
	#isValidIndex(index) {
		return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
	}
	*entries() {
		for (const i of this.#indexes()) if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield [this.#keyList[i], this.#valList[i]];
	}
	*rentries() {
		for (const i of this.#rindexes()) if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield [this.#keyList[i], this.#valList[i]];
	}
	*keys() {
		for (const i of this.#indexes()) {
			const k = this.#keyList[i];
			if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield k;
		}
	}
	*rkeys() {
		for (const i of this.#rindexes()) {
			const k = this.#keyList[i];
			if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield k;
		}
	}
	*values() {
		for (const i of this.#indexes()) if (this.#valList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield this.#valList[i];
	}
	*rvalues() {
		for (const i of this.#rindexes()) if (this.#valList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) yield this.#valList[i];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	[Symbol.toStringTag] = "LRUCache";
	find(fn, getOptions = {}) {
		for (const i of this.#indexes()) {
			const v = this.#valList[i];
			const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			if (fn(value, this.#keyList[i], this)) return this.get(this.#keyList[i], getOptions);
		}
	}
	forEach(fn, thisp = this) {
		for (const i of this.#indexes()) {
			const v = this.#valList[i];
			const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			fn.call(thisp, value, this.#keyList[i], this);
		}
	}
	rforEach(fn, thisp = this) {
		for (const i of this.#rindexes()) {
			const v = this.#valList[i];
			const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			fn.call(thisp, value, this.#keyList[i], this);
		}
	}
	purgeStale() {
		let deleted = false;
		for (const i of this.#rindexes({ allowStale: true })) if (this.#isStale(i)) {
			this.#delete(this.#keyList[i], "expire");
			deleted = true;
		}
		return deleted;
	}
	info(key) {
		const i = this.#keyMap.get(key);
		if (i === void 0) return void 0;
		const v = this.#valList[i];
		/* c8 ignore start - this isn't tested for the info function,
		* but it's the same logic as found in other places. */
		const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
		if (value === void 0) return void 0;
		/* c8 ignore end */
		const entry = { value };
		if (this.#ttls && this.#starts) {
			const ttl = this.#ttls[i];
			const start = this.#starts[i];
			if (ttl && start) {
				entry.ttl = ttl - (this.#perf.now() - start);
				entry.start = Date.now();
			}
		}
		if (this.#sizes) entry.size = this.#sizes[i];
		return entry;
	}
	dump() {
		const arr = [];
		for (const i of this.#indexes({ allowStale: true })) {
			const key = this.#keyList[i];
			const v = this.#valList[i];
			const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
			if (value === void 0 || key === void 0) continue;
			const entry = { value };
			if (this.#ttls && this.#starts) {
				entry.ttl = this.#ttls[i];
				const age = this.#perf.now() - this.#starts[i];
				entry.start = Math.floor(Date.now() - age);
			}
			if (this.#sizes) entry.size = this.#sizes[i];
			arr.unshift([key, entry]);
		}
		return arr;
	}
	load(arr) {
		this.clear();
		for (const [key, entry] of arr) {
			if (entry.start) {
				const age = Date.now() - entry.start;
				entry.start = this.#perf.now() - age;
			}
			this.set(key, entry.value, entry);
		}
	}
	set(k, v, setOptions = {}) {
		if (v === void 0) {
			this.delete(k);
			return this;
		}
		const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
		let { noUpdateTTL = this.noUpdateTTL } = setOptions;
		const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
		if (this.maxEntrySize && size > this.maxEntrySize) {
			if (status) {
				status.set = "miss";
				status.maxEntrySizeExceeded = true;
			}
			this.#delete(k, "set");
			return this;
		}
		let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
		if (index === void 0) {
			index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
			this.#keyList[index] = k;
			this.#valList[index] = v;
			this.#keyMap.set(k, index);
			this.#next[this.#tail] = index;
			this.#prev[index] = this.#tail;
			this.#tail = index;
			this.#size++;
			this.#addItemSize(index, size, status);
			if (status) status.set = "add";
			noUpdateTTL = false;
			if (this.#hasOnInsert) this.#onInsert?.(v, k, "add");
		} else {
			this.#moveToTail(index);
			const oldVal = this.#valList[index];
			if (v !== oldVal) {
				if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
					oldVal.__abortController.abort(/* @__PURE__ */ new Error("replaced"));
					const { __staleWhileFetching: s } = oldVal;
					if (s !== void 0 && !noDisposeOnSet) {
						if (this.#hasDispose) this.#dispose?.(s, k, "set");
						if (this.#hasDisposeAfter) this.#disposed?.push([
							s,
							k,
							"set"
						]);
					}
				} else if (!noDisposeOnSet) {
					if (this.#hasDispose) this.#dispose?.(oldVal, k, "set");
					if (this.#hasDisposeAfter) this.#disposed?.push([
						oldVal,
						k,
						"set"
					]);
				}
				this.#removeItemSize(index);
				this.#addItemSize(index, size, status);
				this.#valList[index] = v;
				if (status) {
					status.set = "replace";
					const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
					if (oldValue !== void 0) status.oldValue = oldValue;
				}
			} else if (status) status.set = "update";
			if (this.#hasOnInsert) this.onInsert?.(v, k, v === oldVal ? "update" : "replace");
		}
		if (ttl !== 0 && !this.#ttls) this.#initializeTTLTracking();
		if (this.#ttls) {
			if (!noUpdateTTL) this.#setItemTTL(index, ttl, start);
			if (status) this.#statusTTL(status, index);
		}
		if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
			const dt = this.#disposed;
			let task;
			while (task = dt?.shift()) this.#disposeAfter?.(...task);
		}
		return this;
	}
	pop() {
		try {
			while (this.#size) {
				const val = this.#valList[this.#head];
				this.#evict(true);
				if (this.#isBackgroundFetch(val)) {
					if (val.__staleWhileFetching) return val.__staleWhileFetching;
				} else if (val !== void 0) return val;
			}
		} finally {
			if (this.#hasDisposeAfter && this.#disposed) {
				const dt = this.#disposed;
				let task;
				while (task = dt?.shift()) this.#disposeAfter?.(...task);
			}
		}
	}
	#evict(free) {
		const head = this.#head;
		const k = this.#keyList[head];
		const v = this.#valList[head];
		if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) v.__abortController.abort(/* @__PURE__ */ new Error("evicted"));
		else if (this.#hasDispose || this.#hasDisposeAfter) {
			if (this.#hasDispose) this.#dispose?.(v, k, "evict");
			if (this.#hasDisposeAfter) this.#disposed?.push([
				v,
				k,
				"evict"
			]);
		}
		this.#removeItemSize(head);
		if (this.#autopurgeTimers?.[head]) {
			clearTimeout(this.#autopurgeTimers[head]);
			this.#autopurgeTimers[head] = void 0;
		}
		if (free) {
			this.#keyList[head] = void 0;
			this.#valList[head] = void 0;
			this.#free.push(head);
		}
		if (this.#size === 1) {
			this.#head = this.#tail = 0;
			this.#free.length = 0;
		} else this.#head = this.#next[head];
		this.#keyMap.delete(k);
		this.#size--;
		return head;
	}
	has(k, hasOptions = {}) {
		const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
		const index = this.#keyMap.get(k);
		if (index !== void 0) {
			const v = this.#valList[index];
			if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) return false;
			if (!this.#isStale(index)) {
				if (updateAgeOnHas) this.#updateItemAge(index);
				if (status) {
					status.has = "hit";
					this.#statusTTL(status, index);
				}
				return true;
			} else if (status) {
				status.has = "stale";
				this.#statusTTL(status, index);
			}
		} else if (status) status.has = "miss";
		return false;
	}
	peek(k, peekOptions = {}) {
		const { allowStale = this.allowStale } = peekOptions;
		const index = this.#keyMap.get(k);
		if (index === void 0 || !allowStale && this.#isStale(index)) return;
		const v = this.#valList[index];
		return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
	}
	#backgroundFetch(k, index, options, context) {
		const v = index === void 0 ? void 0 : this.#valList[index];
		if (this.#isBackgroundFetch(v)) return v;
		const ac = new AC();
		const { signal } = options;
		signal?.addEventListener("abort", () => ac.abort(signal.reason), { signal: ac.signal });
		const fetchOpts = {
			signal: ac.signal,
			options,
			context
		};
		const cb = (v$1, updateCache = false) => {
			const { aborted } = ac.signal;
			const ignoreAbort = options.ignoreFetchAbort && v$1 !== void 0;
			if (options.status) if (aborted && !updateCache) {
				options.status.fetchAborted = true;
				options.status.fetchError = ac.signal.reason;
				if (ignoreAbort) options.status.fetchAbortIgnored = true;
			} else options.status.fetchResolved = true;
			if (aborted && !ignoreAbort && !updateCache) return fetchFail(ac.signal.reason);
			const bf$1 = p;
			const vl = this.#valList[index];
			if (vl === p || ignoreAbort && updateCache && vl === void 0) if (v$1 === void 0) if (bf$1.__staleWhileFetching !== void 0) this.#valList[index] = bf$1.__staleWhileFetching;
			else this.#delete(k, "fetch");
			else {
				if (options.status) options.status.fetchUpdated = true;
				this.set(k, v$1, fetchOpts.options);
			}
			return v$1;
		};
		const eb = (er) => {
			if (options.status) {
				options.status.fetchRejected = true;
				options.status.fetchError = er;
			}
			return fetchFail(er);
		};
		const fetchFail = (er) => {
			const { aborted } = ac.signal;
			const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
			const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
			const noDelete = allowStale || options.noDeleteOnFetchRejection;
			const bf$1 = p;
			if (this.#valList[index] === p) {
				if (!noDelete || bf$1.__staleWhileFetching === void 0) this.#delete(k, "fetch");
				else if (!allowStaleAborted) this.#valList[index] = bf$1.__staleWhileFetching;
			}
			if (allowStale) {
				if (options.status && bf$1.__staleWhileFetching !== void 0) options.status.returnedStale = true;
				return bf$1.__staleWhileFetching;
			} else if (bf$1.__returned === bf$1) throw er;
		};
		const pcall = (res, rej) => {
			const fmp = this.#fetchMethod?.(k, v, fetchOpts);
			if (fmp && fmp instanceof Promise) fmp.then((v$1) => res(v$1 === void 0 ? void 0 : v$1), rej);
			ac.signal.addEventListener("abort", () => {
				if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
					res(void 0);
					if (options.allowStaleOnFetchAbort) res = (v$1) => cb(v$1, true);
				}
			});
		};
		if (options.status) options.status.fetchDispatched = true;
		const p = new Promise(pcall).then(cb, eb);
		const bf = Object.assign(p, {
			__abortController: ac,
			__staleWhileFetching: v,
			__returned: void 0
		});
		if (index === void 0) {
			this.set(k, bf, {
				...fetchOpts.options,
				status: void 0
			});
			index = this.#keyMap.get(k);
		} else this.#valList[index] = bf;
		return bf;
	}
	#isBackgroundFetch(p) {
		if (!this.#hasFetchMethod) return false;
		const b = p;
		return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
	}
	async fetch(k, fetchOptions = {}) {
		const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal } = fetchOptions;
		if (!this.#hasFetchMethod) {
			if (status) status.fetch = "get";
			return this.get(k, {
				allowStale,
				updateAgeOnGet,
				noDeleteOnStaleGet,
				status
			});
		}
		const options = {
			allowStale,
			updateAgeOnGet,
			noDeleteOnStaleGet,
			ttl,
			noDisposeOnSet,
			size,
			sizeCalculation,
			noUpdateTTL,
			noDeleteOnFetchRejection,
			allowStaleOnFetchRejection,
			allowStaleOnFetchAbort,
			ignoreFetchAbort,
			status,
			signal
		};
		let index = this.#keyMap.get(k);
		if (index === void 0) {
			if (status) status.fetch = "miss";
			const p = this.#backgroundFetch(k, index, options, context);
			return p.__returned = p;
		} else {
			const v = this.#valList[index];
			if (this.#isBackgroundFetch(v)) {
				const stale = allowStale && v.__staleWhileFetching !== void 0;
				if (status) {
					status.fetch = "inflight";
					if (stale) status.returnedStale = true;
				}
				return stale ? v.__staleWhileFetching : v.__returned = v;
			}
			const isStale = this.#isStale(index);
			if (!forceRefresh && !isStale) {
				if (status) status.fetch = "hit";
				this.#moveToTail(index);
				if (updateAgeOnGet) this.#updateItemAge(index);
				if (status) this.#statusTTL(status, index);
				return v;
			}
			const p = this.#backgroundFetch(k, index, options, context);
			const staleVal = p.__staleWhileFetching !== void 0 && allowStale;
			if (status) {
				status.fetch = isStale ? "stale" : "refresh";
				if (staleVal && isStale) status.returnedStale = true;
			}
			return staleVal ? p.__staleWhileFetching : p.__returned = p;
		}
	}
	async forceFetch(k, fetchOptions = {}) {
		const v = await this.fetch(k, fetchOptions);
		if (v === void 0) throw new Error("fetch() returned undefined");
		return v;
	}
	memo(k, memoOptions = {}) {
		const memoMethod = this.#memoMethod;
		if (!memoMethod) throw new Error("no memoMethod provided to constructor");
		const { context, forceRefresh, ...options } = memoOptions;
		const v = this.get(k, options);
		if (!forceRefresh && v !== void 0) return v;
		const vv = memoMethod(k, v, {
			options,
			context
		});
		this.set(k, vv, options);
		return vv;
	}
	get(k, getOptions = {}) {
		const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
		const index = this.#keyMap.get(k);
		if (index !== void 0) {
			const value = this.#valList[index];
			const fetching = this.#isBackgroundFetch(value);
			if (status) this.#statusTTL(status, index);
			if (this.#isStale(index)) {
				if (status) status.get = "stale";
				if (!fetching) {
					if (!noDeleteOnStaleGet) this.#delete(k, "expire");
					if (status && allowStale) status.returnedStale = true;
					return allowStale ? value : void 0;
				} else {
					if (status && allowStale && value.__staleWhileFetching !== void 0) status.returnedStale = true;
					return allowStale ? value.__staleWhileFetching : void 0;
				}
			} else {
				if (status) status.get = "hit";
				if (fetching) return value.__staleWhileFetching;
				this.#moveToTail(index);
				if (updateAgeOnGet) this.#updateItemAge(index);
				return value;
			}
		} else if (status) status.get = "miss";
	}
	#connect(p, n) {
		this.#prev[n] = p;
		this.#next[p] = n;
	}
	#moveToTail(index) {
		if (index !== this.#tail) {
			if (index === this.#head) this.#head = this.#next[index];
			else this.#connect(this.#prev[index], this.#next[index]);
			this.#connect(this.#tail, index);
			this.#tail = index;
		}
	}
	delete(k) {
		return this.#delete(k, "delete");
	}
	#delete(k, reason) {
		let deleted = false;
		if (this.#size !== 0) {
			const index = this.#keyMap.get(k);
			if (index !== void 0) {
				if (this.#autopurgeTimers?.[index]) {
					clearTimeout(this.#autopurgeTimers?.[index]);
					this.#autopurgeTimers[index] = void 0;
				}
				deleted = true;
				if (this.#size === 1) this.#clear(reason);
				else {
					this.#removeItemSize(index);
					const v = this.#valList[index];
					if (this.#isBackgroundFetch(v)) v.__abortController.abort(/* @__PURE__ */ new Error("deleted"));
					else if (this.#hasDispose || this.#hasDisposeAfter) {
						if (this.#hasDispose) this.#dispose?.(v, k, reason);
						if (this.#hasDisposeAfter) this.#disposed?.push([
							v,
							k,
							reason
						]);
					}
					this.#keyMap.delete(k);
					this.#keyList[index] = void 0;
					this.#valList[index] = void 0;
					if (index === this.#tail) this.#tail = this.#prev[index];
					else if (index === this.#head) this.#head = this.#next[index];
					else {
						const pi = this.#prev[index];
						this.#next[pi] = this.#next[index];
						const ni = this.#next[index];
						this.#prev[ni] = this.#prev[index];
					}
					this.#size--;
					this.#free.push(index);
				}
			}
		}
		if (this.#hasDisposeAfter && this.#disposed?.length) {
			const dt = this.#disposed;
			let task;
			while (task = dt?.shift()) this.#disposeAfter?.(...task);
		}
		return deleted;
	}
	clear() {
		return this.#clear("delete");
	}
	#clear(reason) {
		for (const index of this.#rindexes({ allowStale: true })) {
			const v = this.#valList[index];
			if (this.#isBackgroundFetch(v)) v.__abortController.abort(/* @__PURE__ */ new Error("deleted"));
			else {
				const k = this.#keyList[index];
				if (this.#hasDispose) this.#dispose?.(v, k, reason);
				if (this.#hasDisposeAfter) this.#disposed?.push([
					v,
					k,
					reason
				]);
			}
		}
		this.#keyMap.clear();
		this.#valList.fill(void 0);
		this.#keyList.fill(void 0);
		if (this.#ttls && this.#starts) {
			this.#ttls.fill(0);
			this.#starts.fill(0);
			for (const t of this.#autopurgeTimers ?? []) if (t !== void 0) clearTimeout(t);
			this.#autopurgeTimers?.fill(void 0);
		}
		if (this.#sizes) this.#sizes.fill(0);
		this.#head = 0;
		this.#tail = 0;
		this.#free.length = 0;
		this.#calculatedSize = 0;
		this.#size = 0;
		if (this.#hasDisposeAfter && this.#disposed) {
			const dt = this.#disposed;
			let task;
			while (task = dt?.shift()) this.#disposeAfter?.(...task);
		}
	}
};
var ShikiStreamTokenizer = class {
	options;
	linesUnstable = [];
	lastUnstableCodeChunk = "";
	lastStableGrammarState;
	constructor(options) {
		this.options = options;
	}
	async enqueue(chunk) {
		const subTrunks = splitToSubTrunks(this.lastUnstableCodeChunk + chunk);
		const stable = [];
		const unstable = [];
		const recall = this.linesUnstable.length;
		subTrunks.forEach((subTrunck, i) => {
			const isLastChunk = i === subTrunks.length - 1;
			const result = this.options.highlighter.codeToTokens(subTrunck, {
				...this.options,
				grammarState: this.lastStableGrammarState
			});
			if (!isLastChunk) {
				this.lastStableGrammarState = result.grammarState;
				result.tokens.forEach((tokenLine) => {
					stable.push(tokenLine);
				});
			} else {
				unstable.push(result.tokens[0]);
				this.lastUnstableCodeChunk = subTrunck;
			}
		});
		this.linesUnstable = unstable;
		return {
			recall,
			stable,
			unstable
		};
	}
	close() {
		const stable = this.linesUnstable;
		this.linesUnstable = [];
		this.lastUnstableCodeChunk = "";
		this.lastStableGrammarState = void 0;
		return { stable };
	}
	clear() {
		this.linesUnstable = [];
		this.lastUnstableCodeChunk = "";
		this.lastStableGrammarState = void 0;
	}
};
function splitToSubTrunks(chunk) {
	const lastNewlineIndex = chunk.lastIndexOf("\n");
	if (lastNewlineIndex === -1) return [chunk];
	return [chunk.substring(0, lastNewlineIndex), chunk.substring(lastNewlineIndex + 1)];
}
const logger = loggerService.initWindowSource("Worker").withContext("ShikiStream");
let highlighter = null;
const tokenizerMap = new LRUCache({
	max: 100,
	ttl: 1e3 * 60 * 15,
	updateAgeOnGet: true,
	dispose: (value) => {
		if (value) value.clear();
	}
});
async function initHighlighter(themes, languages) {
	const { createHighlighter } = await import("./dist-DhKBbL0M.js");
	highlighter = await createHighlighter({
		langs: languages,
		themes
	});
}
async function ensureLanguageAndThemeLoaded(language, theme) {
	if (!highlighter) throw new Error("Highlighter not initialized");
	let actualLanguage = language;
	let actualTheme = theme;
	if (!highlighter.getLoadedLanguages().includes(language)) try {
		if (["text", "ansi"].includes(language)) await highlighter.loadLanguage(language);
		else {
			const { bundledLanguages } = await import("./dist-DhKBbL0M.js");
			const languageImportFn = bundledLanguages[language];
			const langData = await languageImportFn();
			await highlighter.loadLanguage(langData);
		}
	} catch (error) {
		await highlighter.loadLanguage("text");
		actualLanguage = "text";
	}
	if (!highlighter.getLoadedThemes().includes(theme)) try {
		const { bundledThemes } = await import("./dist-DhKBbL0M.js");
		const themeImportFn = bundledThemes[theme];
		const themeData = await themeImportFn();
		await highlighter.loadTheme(themeData);
	} catch (error) {
		logger.debug(`Worker: Failed to load theme '${theme}', falling back to 'one-light':`, error);
		const { bundledThemes } = await import("./dist-DhKBbL0M.js");
		const oneLightTheme = await bundledThemes["one-light"]();
		await highlighter.loadTheme(oneLightTheme);
		actualTheme = "one-light";
	}
	return {
		actualLanguage,
		actualTheme
	};
}
async function getStreamTokenizer(callerId, language, theme) {
	const cacheKey = `${callerId}-${language}-${theme}`;
	if (tokenizerMap.has(cacheKey)) return tokenizerMap.get(cacheKey);
	if (!highlighter) throw new Error("Highlighter not initialized");
	const { actualLanguage, actualTheme } = await ensureLanguageAndThemeLoaded(language, theme);
	const tokenizer = new ShikiStreamTokenizer({
		highlighter,
		lang: actualLanguage,
		theme: actualTheme
	});
	tokenizerMap.set(cacheKey, tokenizer);
	return tokenizer;
}
async function highlightCodeChunk(callerId, chunk, language, theme) {
	try {
		const result = await (await getStreamTokenizer(callerId, language, theme)).enqueue(chunk);
		return {
			lines: [...result.stable, ...result.unstable],
			recall: result.recall
		};
	} catch (error) {
		logger.error("Worker failed to highlight code chunk:", error);
		return {
			lines: [[{
				content: chunk || "",
				color: "#000000",
				offset: 0
			}]],
			recall: 0
		};
	}
}
function cleanupTokenizer(callerId) {
	for (const key of tokenizerMap.keys()) if (key.startsWith(`${callerId}-`)) tokenizerMap.delete(key);
}
self.onmessage = async (e) => {
	const { id, type } = e.data;
	try {
		switch (type) {
			case "init":
				if (e.data.languages && e.data.themes) {
					await initHighlighter(e.data.themes, e.data.languages);
					self.postMessage({
						id,
						type: "init-result",
						result: { success: true }
					});
				} else throw new Error("Missing required init parameters");
				break;
			case "highlight":
				if (!highlighter) throw new Error("Highlighter not initialized");
				if (e.data.callerId && e.data.chunk && e.data.language && e.data.theme) {
					const result = await highlightCodeChunk(e.data.callerId, e.data.chunk, e.data.language, e.data.theme);
					self.postMessage({
						id,
						type: "highlight-result",
						result
					});
				} else throw new Error("Missing required highlight parameters");
				break;
			case "cleanup":
				if (e.data.callerId) {
					cleanupTokenizer(e.data.callerId);
					self.postMessage({
						id,
						type: "cleanup-result",
						result: { success: true }
					});
				} else throw new Error("Missing callerId for cleanup");
				break;
			case "dispose":
				tokenizerMap.clear();
				highlighter?.dispose();
				highlighter = null;
				self.postMessage({
					id,
					type: "dispose-result",
					result: { success: true }
				});
				break;
			default: throw new Error(`Unknown command: ${type}`);
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		self.postMessage({
			id,
			type: "error",
			error: errorMessage
		});
	}
};

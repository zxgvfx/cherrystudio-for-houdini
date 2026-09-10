import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { f as getFileTypeByExt } from "./file-CkrjUGO_.js";
import { t as Box } from "./box-BOQ7EOue.js";
import { t as File } from "./file-Cp4G4u6m.js";
import { n as buildAgentSessionTopicId } from "./agentSession-DEX9ehkG.js";
import { o as isToolUIPart } from "./dist-CK6lZPpu.js";
import { t as useExecutionOverlay } from "./useExecutionOverlay-Cx6lCsHu.js";
import { i as useTopicStreamStatus, r as useTopicOverlayHandoffOnTerminal } from "./useTopicStreamStatus-Be-jC8fI.js";
import { _ as pipelineAssetFileUrl } from "./tokenView-yvehtvx6.js";
import { d as FILE_TYPE } from "./file-B-bjOfog.js";
import { a as knowledgeBaseToComposerToken, i as getComposerTokenIds, n as composerKnowledgeBaseTokenId, o as cocoSessionAssetPromptText, r as fileToComposerToken, s as filterCocoSessionAssets, t as composerFileTokenId } from "./composerTokens-DYa0FU5N.js";
import { a as serializeComposerDocument } from "./composerDraft-CEGp3JAk.js";
import { a as useChatWithHistory, c as useMessageStreamingLayers, i as useConversationTurnController, o as useToolApprovalComposerOverrides, r as mergeMessagesById, s as createOverlayRefreshHandoff } from "./buildFileParts-69zcS5WM.js";
import { ct as invalidateCachedMessageUiStates, dt as isAskUserQuestionToolName, ft as parseAskUserQuestionToolInput } from "./agent-e68nHjCJ.js";
import { n as useAgentSessionParts } from "./useAgentSessionParts-CXWIKKtJ.js";
const agentFileToComposerToken = fileToComposerToken;
const agentKnowledgeBaseToComposerToken = knowledgeBaseToComposerToken;
const getAgentComposerTokenIds = getComposerTokenIds;
const agentComposerTokenId = {
	file: composerFileTokenId,
	knowledge: composerKnowledgeBaseTokenId,
	skill: (skill) => `skill:${skill.filename}`
};
function agentSkillToComposerToken(skill) {
	return {
		id: agentComposerTokenId.skill(skill),
		kind: "skill",
		label: skill.name,
		...skill.description && { description: skill.description },
		promptText: `Use the ${skill.name} skill.`,
		payload: skill
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function fileTypeForAsset(asset) {
	if (asset.kind === "image") return FILE_TYPE.IMAGE;
	if (asset.kind === "video") return FILE_TYPE.VIDEO;
	const ext = asset.name.includes(".") ? `.${asset.name.split(".").pop()}` : "";
	return ext ? getFileTypeByExt(ext) : FILE_TYPE.OTHER;
}
function cocoSessionAssetTokenSourceId(assetId) {
	return `coco-asset-${assetId}`;
}
function previewUrlForSessionAsset(asset) {
	if (asset.previewUrl) return asset.previewUrl;
	if (asset.kind === "image" || asset.kind === "video") return pipelineAssetFileUrl(asset.assetId);
}
function sessionAssetToComposerAttachment(asset) {
	const ext = asset.name.includes(".") ? `.${asset.name.split(".").pop()}` : "";
	const previewUrl = previewUrlForSessionAsset(asset);
	return {
		fileTokenSourceId: cocoSessionAssetTokenSourceId(asset.assetId),
		name: asset.name,
		origin_name: asset.name,
		size: typeof asset.sizeBytes === "number" && asset.sizeBytes > 0 ? asset.sizeBytes : 0,
		ext,
		type: fileTypeForAsset(asset),
		pipelineAssetId: asset.assetId,
		...previewUrl ? { previewUrl } : {}
	};
}
function assetThumb(asset) {
	const previewUrl = previewUrlForSessionAsset(asset);
	if (asset.kind === "image" && previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "chat.asset-thumb",
		src: previewUrl,
		alt: "",
		width: 16,
		height: 16,
		style: {
			objectFit: "cover",
			borderRadius: 2,
			display: "block"
		}
	});
	if (asset.kind === "model") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { size: 16 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { size: 16 });
}
function buildCocoSessionAssetMentionItems(options) {
	const matched = filterCocoSessionAssets(options.assets, options.query);
	if (matched.length === 0) return [{
		id: "coco-session-asset:empty",
		label: "本会话还没有可引用的资产",
		description: "上传或生成文件后会出现在这里",
		disabled: true,
		command: () => void 0
	}];
	return matched.map((asset) => {
		const tokenFile = sessionAssetToComposerAttachment(asset);
		const token = {
			...agentFileToComposerToken(tokenFile),
			promptText: cocoSessionAssetPromptText(asset)
		};
		const isSelectedFile = (currentFile) => currentFile.pipelineAssetId === asset.assetId || agentComposerTokenId.file(currentFile) === token.id;
		return {
			id: `coco-session-asset:${asset.assetId}`,
			label: asset.name,
			description: asset.caption,
			icon: assetThumb(asset),
			filterText: `${asset.name} ${asset.caption} ${asset.assetId}`,
			disabled: options.files.some(isSelectedFile),
			command: ({ editor }) => {
				if (!serializeComposerDocument(editor).tokens.some((currentToken) => currentToken.id === token.id)) editor.chain().focus().insertComposerToken(token).insertContent(" ").run();
				options.setFiles((prevFiles) => prevFiles.some(isSelectedFile) ? prevFiles : [...prevFiles, tokenFile]);
			}
		};
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function getAgentTurnParts(input) {
	return input.options?.body?.userMessageParts ?? (input.text ? [{
		type: "text",
		text: input.text
	}] : []);
}
function getToolNameFromPart(part) {
	if (part.toolName?.trim()) return part.toolName;
	if (part.type?.startsWith("tool-")) return part.type.replace(/^tool-/, "");
	return "";
}
function isAskUserQuestionApprovalResponse(input) {
	return input.approved === true && !!input.updatedInput && isAskUserQuestionToolName(getToolNameFromPart(input.match.part)) && !!parseAskUserQuestionToolInput(input.updatedInput)?.answers;
}
function getAskUserQuestionAnswers(value) {
	const answers = parseAskUserQuestionToolInput(value)?.answers;
	return answers && Object.keys(answers).length > 0 ? answers : void 0;
}
function hasAskUserQuestionAnswers(part) {
	const outputContent = typeof part.output === "object" && part.output !== null && "content" in part.output ? part.output.content : void 0;
	return !!(getAskUserQuestionAnswers(part.input) ?? getAskUserQuestionAnswers(part.output) ?? getAskUserQuestionAnswers(outputContent));
}
function findAskUserQuestionPartByCallId(partsByMessageId, toolCallId) {
	for (const parts of Object.values(partsByMessageId)) for (const part of parts) {
		if (!isToolUIPart(part)) continue;
		const toolPart = part;
		if (toolPart.toolCallId !== toolCallId) continue;
		if (!isAskUserQuestionToolName(getToolNameFromPart(toolPart))) continue;
		return toolPart;
	}
}
function useAgentChatRuntimeState({ sessionId, sessionMessagesEnabled, sessionHistoryFetchOnMount, reservedMessages }) {
	const sessionTopicId = (0, import_react.useMemo)(() => sessionId ? buildAgentSessionTopicId(sessionId) : "", [sessionId]);
	const { messages: uiMessages, isLoading, hasOlder, loadOlder, refresh, seedReservedMessages, deleteMessage: deleteSessionMessage } = useAgentSessionParts(sessionId, {
		enabled: sessionMessagesEnabled,
		fetchOnMount: sessionHistoryFetchOnMount
	});
	(0, import_react.useLayoutEffect)(() => {
		if (!sessionMessagesEnabled || reservedMessages.length === 0) return;
		seedReservedMessages(reservedMessages);
	}, [
		reservedMessages,
		seedReservedMessages,
		sessionMessagesEnabled
	]);
	const { activeExecutions, setMessages, stop } = useChatWithHistory(sessionTopicId, uiMessages, refresh);
	const { send } = useConversationTurnController({
		scopeKey: sessionTopicId,
		historyAdapter: (0, import_react.useMemo)(() => ({
			seedReservedMessages,
			refresh,
			rollback: refresh
		}), [refresh, seedReservedMessages]),
		ensureConversation: (0, import_react.useCallback)(() => ({ topicId: sessionTopicId }), [sessionTopicId]),
		buildStreamRequest: (0, import_react.useCallback)((input, conversation) => ({
			trigger: "submit-message",
			topicId: conversation.topicId,
			userMessageParts: getAgentTurnParts(input),
			reasoningEffort: input.options?.body?.reasoningEffort,
			...input.options?.body?.fastMode === true ? { fastMode: true } : {}
		}), [])
	});
	const sendMessage = (0, import_react.useCallback)(async (message, options) => {
		await send({
			text: message?.text ?? "",
			options
		});
	}, [send]);
	const deleteMessage = (0, import_react.useCallback)(async (messageId) => {
		await deleteSessionMessage(messageId);
		invalidateCachedMessageUiStates([messageId]);
		setMessages((current) => current.filter((message) => message.id !== messageId));
	}, [deleteSessionMessage, setMessages]);
	const { overlay, liveAssistants, reset: resetOverlay } = useExecutionOverlay(sessionTopicId, activeExecutions, uiMessages);
	const { partsByMessageId, streamingLayers } = useMessageStreamingLayers({
		messages: uiMessages,
		overlay,
		executions: activeExecutions,
		liveAssistants
	});
	const [optimisticAskUserQuestionInputsByToolCallId, setOptimisticAskUserQuestionInputsByToolCallId] = (0, import_react.useState)({});
	useTopicOverlayHandoffOnTerminal(sessionTopicId, createOverlayRefreshHandoff(refresh, resetOverlay));
	const optimisticInputsResetTopicIdRef = (0, import_react.useRef)(sessionTopicId);
	(0, import_react.useEffect)(() => {
		if (optimisticInputsResetTopicIdRef.current === sessionTopicId) return;
		optimisticInputsResetTopicIdRef.current = sessionTopicId;
		setOptimisticAskUserQuestionInputsByToolCallId({});
	}, [sessionTopicId]);
	(0, import_react.useEffect)(() => {
		setOptimisticAskUserQuestionInputsByToolCallId((current) => {
			let next = current;
			let changed = false;
			for (const toolCallId of Object.keys(current)) {
				const sourcePart = findAskUserQuestionPartByCallId(partsByMessageId, toolCallId);
				if (!sourcePart || !hasAskUserQuestionAnswers(sourcePart)) continue;
				if (!changed) {
					next = { ...current };
					changed = true;
				}
				delete next[toolCallId];
			}
			return changed ? next : current;
		});
	}, [partsByMessageId]);
	const removeOptimisticAskUserQuestionInput = (0, import_react.useCallback)((toolCallId) => {
		setOptimisticAskUserQuestionInputsByToolCallId((current) => {
			if (!(toolCallId in current)) return current;
			const next = { ...current };
			delete next[toolCallId];
			return next;
		});
	}, []);
	const displayMessages = (0, import_react.useMemo)(() => mergeMessagesById(uiMessages, liveAssistants), [liveAssistants, uiMessages]);
	const respondToolApproval = (0, import_react.useCallback)(async (input) => {
		const { match, approved, reason, updatedInput } = input;
		const approvalId = match.approvalId;
		const optimisticToolCallId = isAskUserQuestionApprovalResponse(input) ? match.toolCallId : void 0;
		if (optimisticToolCallId) setOptimisticAskUserQuestionInputsByToolCallId((current) => ({
			...current,
			[optimisticToolCallId]: input.updatedInput
		}));
		let result;
		try {
			result = await ipcApi.request("ai.tool.respond_approval", {
				approvalId,
				approved,
				reason,
				updatedInput,
				topicId: sessionTopicId,
				anchorId: match.messageId
			});
		} catch (error) {
			if (optimisticToolCallId) removeOptimisticAskUserQuestionInput(optimisticToolCallId);
			throw error;
		}
		if (!result.ok) {
			if (optimisticToolCallId) removeOptimisticAskUserQuestionInput(optimisticToolCallId);
			throw new Error("Tool approval response was not accepted");
		}
		await refresh();
	}, [
		refresh,
		removeOptimisticAskUserQuestionInput,
		sessionTopicId
	]);
	const toolApprovalComposerOverrides = useToolApprovalComposerOverrides({
		partsByMessageId,
		streamingLayers,
		onRespond: respondToolApproval
	});
	const { isPending } = useTopicStreamStatus(sessionTopicId);
	return {
		sessionId,
		uiMessages: displayMessages,
		partsByMessageId,
		streamingLayers,
		optimisticAskUserQuestionInputsByToolCallId,
		isLoading,
		hasOlder,
		loadOlder,
		isPending,
		stop,
		sendMessage,
		deleteMessage,
		respondToolApproval,
		composerContext: (0, import_react.useMemo)(() => ({ overrides: toolApprovalComposerOverrides }), [toolApprovalComposerOverrides])
	};
}
export { agentFileToComposerToken as a, getAgentComposerTokenIds as c, agentComposerTokenId as i, buildCocoSessionAssetMentionItems as n, agentKnowledgeBaseToComposerToken as o, sessionAssetToComposerAttachment as r, agentSkillToComposerToken as s, useAgentChatRuntimeState as t };

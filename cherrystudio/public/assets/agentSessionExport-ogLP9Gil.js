import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { C as string, M as datetime, S as strictObject, a as array, o as boolean } from "./schemas-1oAyIgyK.js";
import { W as number } from "./error-CskkREu_.js";
import { t as instance } from "./i18next-CqNcSVOM.js";
import { t as markdownToPlainText } from "./markdown-6Z4S4-65.js";
import { a as isUniqueModelId, o as parseUniqueModelId } from "./model-BOGgSmTN.js";
import { a as MessageStatsSchema, i as MessageSnapshotSchema, n as MessageDataSchema, o as MessageStatusSchema, t as ContentMessageRoleSchema } from "./message-CtGMR9KJ.js";
import { t as dataApiService } from "./DataApiService-Csr1w5Kb.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { n as buildAgentSessionTopicId } from "./agentSession-DEX9ehkG.js";
import { r as messagesToPlainText } from "./export-CKbKnh5G.js";
import { n as exportMarkdownContentAsFile, v as messagesToMarkdown } from "./ExportService-DMrpeVgj.js";
strictObject({
	cursor: string().optional(),
	messageId: string().min(1).optional(),
	limit: number().int().positive().max(200).optional(),
	deferToolOutputs: boolean().optional()
});
var AgentSessionMessageBaseSchema = strictObject({
	role: ContentMessageRoleSchema,
	data: MessageDataSchema,
	status: MessageStatusSchema,
	modelId: string().nullable(),
	messageSnapshot: MessageSnapshotSchema.nullable(),
	stats: MessageStatsSchema.nullable()
});
AgentSessionMessageBaseSchema.extend({
	id: string(),
	sessionId: string(),
	searchableText: string(),
	runtimeResumeToken: string().nullable(),
	createdAt: datetime(),
	updatedAt: datetime()
});
const CreateAgentSessionMessageSchema = AgentSessionMessageBaseSchema.pick({
	modelId: true,
	messageSnapshot: true
}).partial().extend({
	id: string().optional(),
	role: ContentMessageRoleSchema,
	data: MessageDataSchema,
	status: MessageStatusSchema.optional()
});
strictObject({
	sessionId: string(),
	runtimeResumeToken: string().optional(),
	messages: array(CreateAgentSessionMessageSchema)
});
AgentSessionMessageBaseSchema.pick({ data: true });
var logger = loggerService.withContext("agentSessionExport");
function getAgentSessionExportTitle(session) {
	return session.name.trim() || instance.t("agent.session.new") || session.id;
}
function modelSnapshotToModel(snapshot) {
	if (!snapshot) return void 0;
	return {
		id: snapshot.id,
		name: snapshot.name,
		provider: snapshot.provider,
		group: snapshot.group ?? ""
	};
}
function agentSessionMessageToExportView(row, agentId, modelFallback) {
	let modelSnapshot = row.messageSnapshot?.model;
	if (!modelSnapshot && row.modelId && isUniqueModelId(row.modelId)) {
		const { providerId, modelId } = parseUniqueModelId(row.modelId);
		modelSnapshot = {
			id: modelId,
			name: modelId,
			provider: providerId
		};
	}
	if (!modelSnapshot && row.role === "assistant") modelSnapshot = modelFallback;
	return {
		id: row.id,
		role: row.role,
		assistantId: agentId ?? void 0,
		topicId: buildAgentSessionTopicId(row.sessionId),
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
		status: row.status,
		modelId: row.modelId ?? void 0,
		model: modelSnapshotToModel(modelSnapshot),
		messageSnapshot: row.messageSnapshot ?? void 0,
		stats: row.stats ?? void 0,
		parts: row.data.parts ?? []
	};
}
async function getAgentSessionMessagesForExport(session, options = {}) {
	const pages = [];
	let cursor;
	let collected = 0;
	do {
		const query = cursor ? {
			limit: 200,
			cursor
		} : { limit: 200 };
		const response = await dataApiService.get(`/agent-sessions/${session.id}/messages`, { query });
		pages.push(response.items.map((row) => agentSessionMessageToExportView(row, session.agentId, options.modelFallback)));
		collected += response.items.length;
		cursor = response.nextCursor;
	} while (cursor && (!options.maxMessages || collected < options.maxMessages));
	return pages.reverse().flatMap((page) => page.reverse());
}
async function agentSessionToMarkdown(session, exportReasoning, excludeCitations, options = {}) {
	const title = getAgentSessionExportTitle(session);
	const messages = await getAgentSessionMessagesForExport(session, options);
	if (messages.length === 0) return `# ${title}`;
	return `# ${title}\n\n${await messagesToMarkdown(messages, exportReasoning, excludeCitations)}`;
}
async function agentSessionToPlainText(session, options = {}) {
	const title = markdownToPlainText(getAgentSessionExportTitle(session)).trim();
	const messages = await getAgentSessionMessagesForExport(session, options);
	if (messages.length === 0) return title;
	return `${title}\n\n${messagesToPlainText(messages)}`;
}
async function copyAgentSessionAsMarkdown(session, options = {}) {
	try {
		const markdown = await agentSessionToMarkdown(session, void 0, void 0, options);
		await navigator.clipboard.writeText(markdown);
		toast.success(instance.t("message.copy.success"));
	} catch (error) {
		logger.error("Failed to copy agent session as markdown", error, { sessionId: session.id });
		toast.error(instance.t("common.copy_failed"));
	}
}
async function copyAgentSessionAsPlainText(session, options = {}) {
	try {
		const plainText = await agentSessionToPlainText(session, options);
		await navigator.clipboard.writeText(plainText);
		toast.success(instance.t("message.copy.success"));
	} catch (error) {
		logger.error("Failed to copy agent session as plain text", error, { sessionId: session.id });
		toast.error(instance.t("common.copy_failed"));
	}
}
async function exportAgentSessionAsMarkdown(session, exportReasoning, excludeCitations, options = {}) {
	try {
		const markdown = await agentSessionToMarkdown(session, exportReasoning, excludeCitations, options);
		await exportMarkdownContentAsFile(getAgentSessionExportTitle(session), markdown);
	} catch (error) {
		logger.error("Failed to export agent session as markdown", error, { sessionId: session.id });
		toast.error(instance.t("chat.topics.export.failed"));
	}
}
export { exportAgentSessionAsMarkdown as a, copyAgentSessionAsPlainText as i, agentSessionToPlainText as n, getAgentSessionExportTitle as o, copyAgentSessionAsMarkdown as r, getAgentSessionMessagesForExport as s, agentSessionToMarkdown as t };

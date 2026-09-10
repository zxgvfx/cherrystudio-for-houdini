import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as Checkbox } from "./checkbox-DNPP_2-D.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { t as Kbd } from "./kbd-Bk40TDX7.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { n as cn } from "./style-BQVh98fR.js";
import { d as createFilePathHandle, r as toFileUrl } from "./file-CkrjUGO_.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as ArrowRight } from "./arrow-right-QZWv3bkd.js";
import { t as ChevronLeft } from "./chevron-left-CDfuD6DI.js";
import { t as ChevronRight } from "./chevron-right-B3uo_bD5.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as Pencil } from "./pencil-DNqUonRT.js";
import { t as X } from "./x-CpgfqVTG.js";
import { o as isToolUIPart } from "./dist-CK6lZPpu.js";
import { s as withCherryMeta } from "./uiParts-ClY38h-2.js";
import { a as useChat, i as Chat, n as ipcChatTransport, r as getStreamBlockedMessage } from "./useExecutionOverlay-Cx6lCsHu.js";
import { i as useTopicStreamStatus, n as useTopicDbRefreshOnAwaitingApproval } from "./useTopicStreamStatus-Be-jC8fI.js";
import { t as useHotkeys } from "./react-hotkeys-hook.esm-Bq09MseZ.js";
import { T as ToolArgsTable, _ as isValidAgentToolsType, dt as isAskUserQuestionToolName, et as APPROVAL_REQUESTED, ft as parseAskUserQuestionToolInput, g as UnknownToolRenderer, nt as buildToolResponseFromPart, ut as AgentToolsType, v as renderTool } from "./agent-e68nHjCJ.js";
import { a as getToolGroupSemanticTitle, i as getToolGroupIcon, u as ToolDisclosure } from "./ToolBlockGroup-DmvbWNSS.js";
import { t as Scrollbar_default } from "./Scrollbar-CjwT5bYS.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function stringArraysEqual(previous, next) {
	if (previous === next) return true;
	if (previous.length !== next.length) return false;
	return previous.every((value, index) => value === next[index]);
}
function useStableStringArray(values) {
	const stableRef = (0, import_react.useRef)(values);
	if (!stringArraysEqual(stableRef.current, values)) stableRef.current = values;
	return stableRef.current;
}
function partsContentEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		const previousPart = a[i];
		const nextPart = b[i];
		if (previousPart === nextPart) continue;
		if (previousPart.type !== "data-translation" || nextPart.type !== "data-translation") return false;
		if (previousPart.id !== nextPart.id || previousPart.data.content !== nextPart.data.content || previousPart.data.targetLanguage !== nextPart.data.targetLanguage || previousPart.data.sourceLanguage !== nextPart.data.sourceLanguage || previousPart.data.sourceBlockId !== nextPart.data.sourceBlockId) return false;
	}
	return true;
}
function appendTranslation(parts, trEntry) {
	if (!trEntry) return parts;
	const filtered = parts.filter((part) => part.type !== "data-translation");
	const translationPart = {
		type: "data-translation",
		data: {
			content: trEntry.content,
			targetLanguage: trEntry.targetLanguage,
			...trEntry.sourceLanguage && { sourceLanguage: trEntry.sourceLanguage }
		}
	};
	return [...filtered, translationPart];
}
function useStableMessagePartsLayers(messages, overlay, translationOverlay) {
	const cacheRef = (0, import_react.useRef)({
		messageCount: 0,
		value: {
			historyPartsByMessageId: {},
			partsByMessageId: {}
		}
	});
	return (0, import_react.useMemo)(() => {
		const previous = cacheRef.current;
		const previousHistory = previous.value.historyPartsByMessageId;
		const previousCurrent = previous.value.partsByMessageId;
		const nextHistory = {};
		const nextCurrent = {};
		let historyChanged = previous.messageCount !== messages.length;
		let currentChanged = previous.messageCount !== messages.length;
		let hasExecutionOverlay = false;
		for (const message of messages) {
			const baseParts = message.parts ?? [];
			const translation = translationOverlay[message.id];
			const historyCandidate = appendTranslation(baseParts, translation);
			const previousHistoryParts = previousHistory[message.id];
			const historyParts = previousHistoryParts && partsContentEqual(previousHistoryParts, historyCandidate) ? previousHistoryParts : historyCandidate;
			nextHistory[message.id] = historyParts;
			historyChanged ||= historyParts !== previousHistoryParts;
			const executionParts = overlay[message.id];
			const usesExecutionOverlay = executionParts !== void 0 && executionParts.length > 0;
			hasExecutionOverlay ||= usesExecutionOverlay;
			const currentCandidate = usesExecutionOverlay ? appendTranslation(executionParts, translation) : historyParts;
			const previousCurrentParts = previousCurrent[message.id];
			const currentParts = previousCurrentParts && partsContentEqual(previousCurrentParts, currentCandidate) ? previousCurrentParts : currentCandidate;
			nextCurrent[message.id] = currentParts;
			currentChanged ||= currentParts !== previousCurrentParts;
		}
		for (const [messageId, executionParts] of Object.entries(overlay)) {
			if (messageId in nextCurrent || executionParts.length === 0) continue;
			hasExecutionOverlay = true;
			const currentCandidate = appendTranslation(executionParts, translationOverlay[messageId]);
			const previousCurrentParts = previousCurrent[messageId];
			const currentParts = previousCurrentParts && partsContentEqual(previousCurrentParts, currentCandidate) ? previousCurrentParts : currentCandidate;
			nextCurrent[messageId] = currentParts;
			currentChanged ||= currentParts !== previousCurrentParts;
		}
		if (!currentChanged) {
			for (const messageId in previousCurrent) if (!(messageId in nextCurrent)) {
				currentChanged = true;
				break;
			}
		}
		const historyPartsByMessageId = historyChanged ? nextHistory : previousHistory;
		let partsByMessageId = previousCurrent;
		if (!hasExecutionOverlay) partsByMessageId = historyPartsByMessageId;
		else if (currentChanged) partsByMessageId = nextCurrent;
		if (previous.messageCount === messages.length && historyPartsByMessageId === previousHistory && partsByMessageId === previousCurrent) return previous.value;
		const value = {
			historyPartsByMessageId,
			partsByMessageId
		};
		cacheRef.current = {
			messageCount: messages.length,
			value
		};
		return value;
	}, [
		messages,
		overlay,
		translationOverlay
	]);
}
var EMPTY_TRANSLATION_OVERLAY = {};
function createOverlayRefreshHandoff(refresh, resetOverlay) {
	return async () => {
		try {
			await refresh();
		} finally {
			resetOverlay();
		}
	};
}
function useMessageStreamingLayers({ messages, overlay, executions, liveAssistants, translationOverlay = EMPTY_TRANSLATION_OVERLAY }) {
	const { historyPartsByMessageId, partsByMessageId } = useStableMessagePartsLayers(messages, overlay, translationOverlay);
	const liveMessageIds = useStableStringArray((0, import_react.useMemo)(() => Array.from(new Set([...executions.flatMap((execution) => execution.anchorMessageId ? [execution.anchorMessageId] : []), ...liveAssistants.map((message) => message.id)])), [executions, liveAssistants]));
	return {
		partsByMessageId,
		liveMessageIds,
		streamingLayers: (0, import_react.useMemo)(() => ({
			historyPartsByMessageId,
			liveMessageIds
		}), [historyPartsByMessageId, liveMessageIds])
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger$3 = loggerService.withContext("AskUserQuestionComposer");
function isFreeTextOptionLabel(label, otherLabel) {
	const normalized = label.trim().toLowerCase();
	if (!normalized) return false;
	return normalized === otherLabel.trim().toLowerCase() || normalized === "其他" || normalized === "其它" || normalized === "other" || normalized === "custom" || normalized === "自定义";
}
function createAskUserQuestionComposerOverride({ request, onRespond }) {
	return {
		id: `ask-user-question:${request.approvalId}`,
		priority: 100,
		render: ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskUserQuestionComposer, {
			request,
			onRespond,
			className
		})
	};
}
function AskUserQuestionComposer({ request, onRespond, className }) {
	const { t } = useTranslation();
	const questions = request.input.questions;
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const [selectedAnswers, setSelectedAnswers] = (0, import_react.useState)({});
	const [customAnswers, setCustomAnswers] = (0, import_react.useState)({});
	const [isCustomModeByIndex, setIsCustomModeByIndex] = (0, import_react.useState)({});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const customInputWrapperRef = (0, import_react.useRef)(null);
	const shouldFocusCustomInputRef = (0, import_react.useRef)(false);
	const currentQuestion = questions[currentIndex];
	const totalQuestions = questions.length;
	const isFirstQuestion = currentIndex === 0;
	const isLastQuestion = currentIndex === totalQuestions - 1;
	const currentCustomAnswer = customAnswers[currentIndex] ?? "";
	const currentCustomAnswerText = currentCustomAnswer.trim();
	const otherLabel = t("agent.askUserQuestion.other");
	const otherDescription = t("agent.askUserQuestion.otherDescription");
	const isFreeTextSelected = Boolean(isCustomModeByIndex[currentIndex] || currentCustomAnswerText);
	const displayedOptions = (0, import_react.useMemo)(() => {
		if (!currentQuestion) return [];
		if (currentQuestion.options.some((option) => isFreeTextOptionLabel(option.label, otherLabel))) return currentQuestion.options;
		return [...currentQuestion.options, {
			label: otherLabel,
			description: otherDescription
		}];
	}, [
		currentQuestion,
		otherDescription,
		otherLabel
	]);
	(0, import_react.useEffect)(() => {
		if (!shouldFocusCustomInputRef.current) return;
		shouldFocusCustomInputRef.current = false;
		customInputWrapperRef.current?.querySelector("input")?.focus();
	}, [currentIndex, isCustomModeByIndex]);
	const hasAnswerAt = (0, import_react.useCallback)((index, answersByIndex = selectedAnswers) => {
		return (answersByIndex[index] ?? []).length > 0;
	}, [selectedAnswers]);
	const hasAnyAnswer = (0, import_react.useCallback)((answersByIndex = selectedAnswers) => questions.some((_, index) => hasAnswerAt(index, answersByIndex)), [
		hasAnswerAt,
		questions,
		selectedAnswers
	]);
	const selectedForCurrent = selectedAnswers[currentIndex] ?? [];
	const hasAnySelectedAnswer = (0, import_react.useMemo)(() => hasAnyAnswer(selectedAnswers), [hasAnyAnswer, selectedAnswers]);
	const customActionSubmitsAll = isLastQuestion && (hasAnySelectedAnswer || !!currentCustomAnswerText);
	const buildAnswers = (0, import_react.useCallback)((answersByIndex = selectedAnswers) => {
		const answers = {};
		questions.forEach((question, index) => {
			const values = answersByIndex[index] ?? [];
			if (values.length > 0) answers[question.question] = values.join(", ");
		});
		return answers;
	}, [questions, selectedAnswers]);
	const respond = (0, import_react.useCallback)(async (input) => {
		setIsSubmitting(true);
		try {
			await onRespond(input);
		} catch (error) {
			logger$3.error("Failed to send ask-user-question response", error, {
				approvalId: request.approvalId,
				messageId: request.messageId,
				toolCallId: request.toolCallId
			});
			toast.error(t("agent.toolPermission.error.sendFailed"));
			setIsSubmitting(false);
		}
	}, [
		onRespond,
		request.approvalId,
		request.messageId,
		request.toolCallId,
		t
	]);
	const submitAnswers = (0, import_react.useCallback)(async (answersByIndex = selectedAnswers) => {
		if (!hasAnyAnswer(answersByIndex) || isSubmitting) return;
		await respond({
			match: request.match,
			approved: true,
			updatedInput: {
				...request.input,
				answers: buildAnswers(answersByIndex)
			}
		});
	}, [
		buildAnswers,
		hasAnyAnswer,
		isSubmitting,
		request.input,
		request.match,
		respond,
		selectedAnswers
	]);
	const handleDismiss = (0, import_react.useCallback)(async () => {
		if (isSubmitting) return;
		await respond({
			match: request.match,
			approved: false,
			reason: "User dismissed AskUserQuestion"
		});
	}, [
		isSubmitting,
		request.match,
		respond
	]);
	const completeCurrentQuestion = (0, import_react.useCallback)((answersByIndex) => {
		if (isLastQuestion) {
			submitAnswers(answersByIndex);
			return;
		}
		setCurrentIndex((index) => Math.min(totalQuestions - 1, index + 1));
	}, [
		isLastQuestion,
		submitAnswers,
		totalQuestions
	]);
	const handleSelectFreeText = (0, import_react.useCallback)(() => {
		if (!currentQuestion || isSubmitting) return;
		shouldFocusCustomInputRef.current = true;
		setIsCustomModeByIndex((prev) => ({
			...prev,
			[currentIndex]: true
		}));
		setSelectedAnswers((prev) => ({
			...prev,
			[currentIndex]: []
		}));
	}, [
		currentIndex,
		currentQuestion,
		isSubmitting
	]);
	const handleSelectOption = (0, import_react.useCallback)((label) => {
		if (!currentQuestion || isSubmitting) return;
		if (isFreeTextOptionLabel(label, otherLabel)) {
			handleSelectFreeText();
			return;
		}
		const isMultiSelect = currentQuestion.multiSelect;
		const current = selectedAnswers[currentIndex] ?? [];
		const nextForCurrent = isMultiSelect ? current.includes(label) ? current.filter((value) => value !== label) : [...current, label] : [label];
		const nextSelectedAnswers = {
			...selectedAnswers,
			[currentIndex]: nextForCurrent
		};
		setIsCustomModeByIndex((prev) => ({
			...prev,
			[currentIndex]: false
		}));
		setCustomAnswers((prev) => ({
			...prev,
			[currentIndex]: ""
		}));
		setSelectedAnswers(nextSelectedAnswers);
		if (!isMultiSelect) completeCurrentQuestion(nextSelectedAnswers);
	}, [
		completeCurrentQuestion,
		currentIndex,
		currentQuestion,
		handleSelectFreeText,
		isSubmitting,
		otherLabel,
		selectedAnswers
	]);
	const handleCustomAction = (0, import_react.useCallback)(async () => {
		if (isSubmitting) return;
		if (currentCustomAnswerText) {
			const nextSelectedAnswers = {
				...selectedAnswers,
				[currentIndex]: [currentCustomAnswerText]
			};
			setSelectedAnswers(nextSelectedAnswers);
			completeCurrentQuestion(nextSelectedAnswers);
			return;
		}
		if (customActionSubmitsAll) {
			await submitAnswers(selectedAnswers);
			return;
		}
		if (!isLastQuestion) setCurrentIndex((index) => index + 1);
	}, [
		completeCurrentQuestion,
		currentCustomAnswerText,
		currentIndex,
		customActionSubmitsAll,
		isLastQuestion,
		isSubmitting,
		selectedAnswers,
		submitAnswers
	]);
	if (!currentQuestion) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.ask-user-question-composer",
		"data-composer-viewport-inset-target": "",
		className: cn("pointer-events-auto relative z-2 flex flex-col px-4.5 pt-0 pb-4.5", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[17px] border-[0.5px] border-border p-2.5 backdrop-blur",
			style: { backgroundColor: "color-mix(in srgb, var(--background) 88%, transparent)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-h-40 min-w-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words font-semibold text-foreground text-sm leading-5",
						children: currentQuestion.question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-0.5 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								className: "size-7 shadow-none",
								"aria-label": t("agent.askUserQuestion.previous"),
								disabled: isFirstQuestion || isSubmitting,
								onClick: () => setCurrentIndex((index) => Math.max(0, index - 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-11 text-center text-xs",
								children: t("agent.askUserQuestion.progress", {
									current: currentIndex + 1,
									total: totalQuestions
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								className: "size-7 shadow-none",
								"aria-label": isLastQuestion ? t("agent.askUserQuestion.submit") : t("agent.askUserQuestion.next"),
								disabled: isLastQuestion && !hasAnySelectedAnswer || isSubmitting,
								onClick: isLastQuestion ? () => void submitAnswers() : () => setCurrentIndex((index) => Math.min(totalQuestions - 1, index + 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								className: "size-7 shadow-none",
								"aria-label": t("agent.askUserQuestion.close"),
								disabled: isSubmitting,
								onClick: handleDismiss,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-col gap-1.5",
					children: displayedOptions.map((option, optionIndex) => {
						const isFreeText = isFreeTextOptionLabel(option.label, otherLabel);
						const isSelected = isFreeText ? isFreeTextSelected : selectedForCurrent.includes(option.label);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							className: cn("group h-auto min-h-11 w-full justify-start gap-3 whitespace-normal rounded-[12px] px-3 py-2 text-left shadow-none", "hover:bg-muted focus-visible:bg-muted", isSelected && "bg-muted"),
							disabled: isSubmitting,
							"aria-pressed": isSelected,
							onClick: () => handleSelectOption(option.label),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-8 shrink-0 items-center justify-center rounded-full font-semibold text-sm transition-colors", isSelected ? "bg-foreground text-background" : "bg-muted text-muted-foreground group-hover:bg-foreground group-hover:text-background"),
									children: optionIndex + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block whitespace-normal break-words font-semibold text-foreground text-sm leading-5",
										children: option.label
									}), option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block whitespace-normal break-words font-medium text-muted-foreground text-xs leading-4",
										children: option.description
									})]
								}),
								isFreeText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: cn("size-4 shrink-0 text-muted-foreground transition-opacity", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100") }) : currentQuestion.multiSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: isSelected,
									size: "sm",
									"aria-hidden": "true",
									tabIndex: -1,
									className: "pointer-events-none"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: cn("size-4 shrink-0 text-muted-foreground transition-opacity", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100") })
							]
						}, `${option.label}-${optionIndex}`);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2 border-border-subtle border-t pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: customInputWrapperRef,
						className: "relative min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "-translate-y-1/2 absolute top-1/2 left-3 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: currentCustomAnswer,
							disabled: isSubmitting,
							placeholder: t("agent.askUserQuestion.customPlaceholder"),
							className: cn("h-9 rounded-full border-transparent bg-muted/70 pl-9 text-sm shadow-none focus-visible:border-transparent", isFreeTextSelected && "bg-muted ring-1 ring-foreground/20"),
							onChange: (event) => {
								const value = event.target.value;
								setCustomAnswers((prev) => ({
									...prev,
									[currentIndex]: value
								}));
								setIsCustomModeByIndex((prev) => ({
									...prev,
									[currentIndex]: true
								}));
								setSelectedAnswers((prev) => ({
									...prev,
									[currentIndex]: []
								}));
							},
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.nativeEvent.isComposing) {
									event.preventDefault();
									handleCustomAction();
								}
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-9 px-2.5 font-semibold text-muted-foreground text-sm shadow-none hover:bg-transparent hover:text-foreground",
						loading: customActionSubmitsAll && isSubmitting,
						disabled: isSubmitting,
						onClick: handleCustomAction,
						children: currentCustomAnswerText || customActionSubmitsAll ? t("agent.askUserQuestion.submit") : t("agent.askUserQuestion.skip")
					})]
				})
			]
		})
	});
}
function getToolName$1(part) {
	if (part.toolName?.trim()) return part.toolName;
	if (part.type.startsWith("tool-")) return part.type.replace(/^tool-/, "");
	return "";
}
function findLatestPendingAskUserQuestionRequest(partsByMessageId) {
	let latest = null;
	for (const [messageId, parts] of Object.entries(partsByMessageId)) for (const part of parts) {
		if (!isToolUIPart(part)) continue;
		const toolPart = part;
		const approvalId = toolPart.approval?.id;
		if (!isAskUserQuestionToolName(getToolName$1(toolPart)) || toolPart.state !== "approval-requested" || !approvalId) continue;
		const input = parseAskUserQuestionToolInput(toolPart.input);
		if (!input?.questions.length) continue;
		latest = {
			messageId,
			toolCallId: toolPart.toolCallId,
			approvalId,
			input,
			match: {
				part,
				state: toolPart.state,
				toolCallId: toolPart.toolCallId,
				messageId,
				approvalId,
				input: toolPart.input
			}
		};
	}
	return latest;
}
function getToolName(part) {
	if (part.toolName?.trim()) return part.toolName;
	if (part.type.startsWith("tool-")) return part.type.replace(/^tool-/, "");
	return "";
}
function getToolDisplayName(toolResponse) {
	return toolResponse.tool.name;
}
function getStringField(value, fields) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return void 0;
	const record = value;
	for (const field of fields) {
		const candidate = record[field];
		if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
	}
}
function getPermissionTitle(part, fallback) {
	return getStringField(part.input, [
		"question",
		"message",
		"prompt",
		"title",
		"description"
	]) ?? fallback;
}
function findNextPendingPermissionRequest(partsByMessageId) {
	const messages = Object.entries(partsByMessageId);
	for (let messageIndex = messages.length - 1; messageIndex >= 0; messageIndex--) {
		const [messageId, parts] = messages[messageIndex];
		for (const part of parts) {
			if (!isToolUIPart(part)) continue;
			const toolPart = part;
			const toolName = getToolName(toolPart);
			const approvalId = toolPart.approval?.id;
			if (toolName === AgentToolsType.AskUserQuestion || toolPart.state !== "approval-requested" || !approvalId) continue;
			const toolResponse = buildToolResponseFromPart(part);
			if (!toolResponse) continue;
			return {
				messageId,
				toolCallId: toolPart.toolCallId,
				approvalId,
				title: getPermissionTitle(toolPart, getToolDisplayName(toolResponse)),
				toolResponse,
				match: {
					part,
					state: toolPart.state,
					toolCallId: toolPart.toolCallId,
					messageId,
					approvalId,
					input: toolPart.input
				}
			};
		}
	}
	return null;
}
var logger$2 = loggerService.withContext("PermissionRequestComposer");
function isHandledElsewhere(event) {
	return event.defaultPrevented || event.isComposing;
}
function isMcpToolResponse(toolResponse) {
	return toolResponse.tool.type === "mcp";
}
function normalizeArgs(args) {
	if (args === void 0 || args === null) return null;
	if (typeof args === "object") return args;
	return { value: args };
}
var BUILTIN_TOOLS_WITH_OWN_PREVIEW_SCROLL = new Set([
	AgentToolsType.Bash,
	AgentToolsType.BashOutput,
	AgentToolsType.Glob,
	AgentToolsType.Grep,
	AgentToolsType.Read,
	AgentToolsType.Skill,
	AgentToolsType.Write
]);
function renderBuiltinPreviewChildren(toolName, children) {
	if (children === void 0 || children === null || BUILTIN_TOOLS_WITH_OWN_PREVIEW_SCROLL.has(toolName)) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
		className: "max-h-60 overflow-x-hidden",
		"data-testid": "permission-builtin-body-scroll",
		children
	});
}
function createPermissionRequestComposerOverride({ request, onRespond }) {
	return {
		id: `tool-permission:${request.approvalId}`,
		priority: 90,
		render: ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionRequestComposer, {
			request,
			onRespond,
			className
		})
	};
}
function BuiltinPermissionPreview({ toolResponse }) {
	const toolName = toolResponse.tool.name;
	const input = toolResponse.arguments;
	const renderedItem = isValidAgentToolsType(toolName) ? renderTool(toolName, input) : UnknownToolRenderer({
		toolName,
		input
	});
	const item = {
		...renderedItem,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionPreviewHeader, { toolName }),
		children: renderBuiltinPreviewChildren(toolName, renderedItem.children),
		classNames: {
			...renderedItem.classNames,
			header: cn("px-3 py-2", renderedItem.classNames?.header),
			body: cn("max-h-none overflow-visible bg-transparent p-2 text-foreground", renderedItem.classNames?.body)
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, {
		className: "w-full",
		variant: "light",
		defaultActiveKey: [String(renderedItem.key ?? toolName)],
		items: [item]
	});
}
function McpPermissionPreview({ toolResponse }) {
	const { t } = useTranslation();
	const args = normalizeArgs(toolResponse.arguments);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.mcp-permission-preview",
		className: "px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionPreviewHeader, {
			toolName: toolResponse.tool.name,
			description: toolResponse.tool.description
		}), args ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
			className: "max-h-60 overflow-x-hidden",
			"data-testid": "permission-mcp-args-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolArgsTable, {
				args,
				title: t("message.tools.sections.input")
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-2 text-muted-foreground text-xs",
			children: t("message.tools.noData")
		})]
	});
}
function PermissionPreview({ toolResponse }) {
	if (isMcpToolResponse(toolResponse)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpPermissionPreview, { toolResponse });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltinPermissionPreview, { toolResponse });
}
function getPermissionRequestSubtitle(request) {
	const title = request.title.trim();
	const toolName = request.toolResponse.tool.name.trim();
	if (!title || title === toolName) return null;
	return title;
}
function PermissionPreviewHeader({ toolName, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.permission-preview-header",
		className: "min-w-0 text-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "truncate font-medium",
			children: toolName
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 line-clamp-2 text-muted-foreground text-xs leading-4",
			children: description
		}) : null]
	});
}
function PermissionRequestComposer({ request, onRespond, className }) {
	const { t } = useTranslation();
	const [submittingApprovalId, setSubmittingApprovalId] = (0, import_react.useState)(null);
	const isSubmitting = submittingApprovalId === request.approvalId;
	const subtitle = getPermissionRequestSubtitle(request);
	const ToolIcon = getToolGroupIcon(request.toolResponse.tool, request.toolResponse.arguments);
	const toolTitle = getToolGroupSemanticTitle(request.toolResponse, "waiting", t);
	const respond = (0, import_react.useCallback)(async (input, action) => {
		const approvalId = request.approvalId;
		setSubmittingApprovalId(approvalId);
		try {
			await onRespond(input);
		} catch (error) {
			logger$2.error("Failed to send permission response", error, {
				action,
				approvalId
			});
			toast.error(t("agent.toolPermission.error.sendFailed"));
			setSubmittingApprovalId((current) => current === approvalId ? null : current);
		}
	}, [
		onRespond,
		request.approvalId,
		t
	]);
	const approve = (0, import_react.useCallback)(async () => {
		if (isSubmitting) return;
		await respond({
			match: request.match,
			approved: true
		}, "approve");
	}, [
		isSubmitting,
		request.match,
		respond
	]);
	const deny = (0, import_react.useCallback)(async () => {
		if (isSubmitting) return;
		await respond({
			match: request.match,
			approved: false,
			reason: t("agent.toolPermission.defaultDenyMessage")
		}, "deny");
	}, [
		isSubmitting,
		request.match,
		respond,
		t
	]);
	useHotkeys("enter", () => void approve(), {
		preventDefault: true,
		ignoreEventWhen: isHandledElsewhere
	}, [approve]);
	useHotkeys("esc", () => void deny(), {
		preventDefault: true,
		ignoreEventWhen: isHandledElsewhere
	}, [deny]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.permission-request-composer",
		"data-composer-viewport-inset-target": "",
		className: cn("pointer-events-auto relative z-2 flex flex-col px-4.5 pt-0 pb-4.5", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[17px] border-[0.5px] border-border p-2.5 shadow-[0_1px_5px_rgba(15,23,42,0.05)] backdrop-blur dark:shadow-[0_1px_5px_rgba(0,0,0,0.14)]",
			style: { backgroundColor: "color-mix(in srgb, var(--background) 88%, transparent)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2 px-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex shrink-0 items-center gap-2 font-semibold text-foreground text-sm leading-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex shrink-0 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolIcon, {
									"aria-hidden": "true",
									className: "size-4"
								})
							}), toolTitle]
						}),
						subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate text-muted-foreground text-xs",
							children: subtitle
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-ui": "chat.permission-request-composer.status",
							role: "status",
							"aria-live": "polite",
							className: "ml-auto shrink-0",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-1 font-medium text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"aria-hidden": "true",
									className: "size-3 animate-spin"
								}), t("message.processing")]
							}) : null
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "chat.permission-request-composer.permission-preview",
					className: "mt-2 overflow-hidden rounded-[12px] bg-muted dark:bg-muted/30",
					"data-testid": "permission-preview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionPreview, { toolResponse: request.toolResponse })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2.5 flex justify-end gap-2 px-1 pb-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						disabled: isSubmitting,
						onClick: () => void deny(),
						children: [t("agent.toolPermission.button.deny"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
							"aria-hidden": "true",
							className: "bg-muted text-muted-foreground",
							children: "Esc"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "emphasis",
						disabled: isSubmitting,
						onClick: () => void approve(),
						children: [t("agent.toolPermission.button.allow"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
							"aria-hidden": "true",
							className: "bg-current/10 text-current",
							children: "Enter"
						})]
					})]
				})
			]
		})
	});
}
function useToolApprovalComposerOverrides({ partsByMessageId, streamingLayers, onRespond }) {
	const settledHistoryParts = (0, import_react.useMemo)(() => {
		if (!streamingLayers) return null;
		const liveMessageIdSet = new Set(streamingLayers.liveMessageIds);
		const historyParts = {};
		for (const [messageId, parts] of Object.entries(streamingLayers.historyPartsByMessageId)) if (!liveMessageIdSet.has(messageId)) historyParts[messageId] = parts;
		return historyParts;
	}, [streamingLayers]);
	const currentParts = (0, import_react.useMemo)(() => {
		if (!streamingLayers) return partsByMessageId;
		const liveParts = {};
		for (const messageId of streamingLayers.liveMessageIds) {
			const parts = partsByMessageId[messageId];
			if (parts) liveParts[messageId] = parts;
		}
		return liveParts;
	}, [streamingLayers, partsByMessageId]);
	const historyAskUserQuestionRequest = (0, import_react.useMemo)(() => settledHistoryParts ? findLatestPendingAskUserQuestionRequest(settledHistoryParts) : null, [settledHistoryParts]);
	const askUserQuestionRequest = (0, import_react.useMemo)(() => findLatestPendingAskUserQuestionRequest(currentParts), [currentParts]) ?? historyAskUserQuestionRequest;
	const historyPermissionRequest = (0, import_react.useMemo)(() => settledHistoryParts ? findNextPendingPermissionRequest(settledHistoryParts) : null, [settledHistoryParts]);
	const permissionRequest = (0, import_react.useMemo)(() => findNextPendingPermissionRequest(currentParts), [currentParts]) ?? historyPermissionRequest;
	return (0, import_react.useMemo)(() => {
		const overrides = [];
		if (askUserQuestionRequest) overrides.push(createAskUserQuestionComposerOverride({
			request: askUserQuestionRequest,
			onRespond
		}));
		if (permissionRequest) overrides.push(createPermissionRequestComposerOverride({
			request: permissionRequest,
			onRespond
		}));
		return overrides;
	}, [
		askUserQuestionRequest,
		onRespond,
		permissionRequest
	]);
}
var logger$1 = loggerService.withContext("useChatWithHistory");
var EMPTY_EXECUTIONS = Object.freeze([]);
function useChatWithHistory(topicId, initialMessages, refresh) {
	const enabled = Boolean(topicId);
	const chat = (0, import_react.useMemo)(() => new Chat({
		id: topicId,
		transport: ipcChatTransport,
		messages: initialMessages,
		onError: (streamError) => {
			logger$1.error("AI stream error", {
				topicId,
				streamError
			});
		}
	}), [topicId]);
	const { setMessages, stop: sdkStop, status, error, sendMessage: sdkSendMessage, regenerate: sdkRegenerate, resumeStream } = useChat({
		chat,
		experimental_throttle: 100
	});
	const selfInitiatedSendRef = (0, import_react.useRef)(false);
	const sendMessage = (0, import_react.useCallback)((message, options) => {
		selfInitiatedSendRef.current = true;
		return sdkSendMessage(message, options);
	}, [sdkSendMessage]);
	const regenerate = (0, import_react.useCallback)((options) => {
		selfInitiatedSendRef.current = true;
		return sdkRegenerate(options);
	}, [sdkRegenerate]);
	const stop = (0, import_react.useCallback)(async () => {
		if (enabled) ipcApi.request("ai.stream.abort", { topicId }).catch((err) => {
			logger$1.warn("streamAbort failed", {
				topicId,
				err
			});
		});
		await sdkStop();
	}, [
		enabled,
		sdkStop,
		topicId
	]);
	const refreshRef = (0, import_react.useRef)(refresh);
	refreshRef.current = refresh;
	const { status: topicStreamStatus, activeExecutions: liveExecutions } = useTopicStreamStatus(topicId);
	const activeExecutions = liveExecutions.length > 0 ? liveExecutions : EMPTY_EXECUTIONS;
	const topicSelectionToken = (0, import_react.useMemo)(() => Symbol(topicId), [topicId]);
	const currentTopicSelectionTokenRef = (0, import_react.useRef)(topicSelectionToken);
	currentTopicSelectionTokenRef.current = topicSelectionToken;
	const resumeInFlightRef = (0, import_react.useRef)(null);
	const statusRef = (0, import_react.useRef)(status);
	statusRef.current = status;
	const resumeStreamRef = (0, import_react.useRef)(resumeStream);
	resumeStreamRef.current = resumeStream;
	const resumeActiveStream = (0, import_react.useCallback)((reason) => {
		if (!enabled) return;
		if (reason === "mount" && (statusRef.current === "streaming" || statusRef.current === "submitted")) return;
		if (resumeInFlightRef.current?.ownerToken === topicSelectionToken) return;
		const token = Symbol(topicId);
		resumeInFlightRef.current = {
			ownerToken: topicSelectionToken,
			token
		};
		(async () => {
			if (reason === "started-event") try {
				await refreshRef.current();
			} catch (err) {
				logger$1.warn("Failed to refresh messages before resuming stream", {
					topicId,
					err
				});
			}
			if (resumeInFlightRef.current?.token !== token || currentTopicSelectionTokenRef.current !== topicSelectionToken) return;
			if (statusRef.current === "streaming" || statusRef.current === "submitted") return;
			await resumeStreamRef.current();
		})().catch((err) => {
			logger$1.warn("Failed to resume active stream", {
				topicId,
				reason,
				err
			});
		}).finally(() => {
			if (resumeInFlightRef.current?.token === token) resumeInFlightRef.current = null;
		});
	}, [
		enabled,
		topicId,
		topicSelectionToken
	]);
	(0, import_react.useEffect)(() => {
		resumeActiveStream("mount");
	}, [resumeActiveStream]);
	useTopicDbRefreshOnAwaitingApproval(topicId, refresh);
	const prevTopicStatusRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const previous = prevTopicStatusRef.current;
		const prev = previous?.topicId === topicId ? previous.status : void 0;
		prevTopicStatusRef.current = {
			status: topicStreamStatus,
			topicId
		};
		if (!enabled) return;
		if (topicStreamStatus === "pending" && prev !== "pending") if (selfInitiatedSendRef.current) selfInitiatedSendRef.current = false;
		else resumeActiveStream("started-event");
	}, [
		enabled,
		resumeActiveStream,
		topicId,
		topicStreamStatus
	]);
	return {
		sendMessage,
		regenerate,
		stop,
		error,
		status,
		setMessages,
		activeExecutions,
		chat
	};
}
var logger = loggerService.withContext("useConversationTurnController");
function useConversationTurnController({ scopeKey, historyAdapter, ensureConversation, buildStreamRequest, refreshMetadata }) {
	const [phase, setPhase] = (0, import_react.useState)("draft");
	const scopeEpochRef = (0, import_react.useRef)(0);
	(0, import_react.useLayoutEffect)(() => {
		scopeEpochRef.current += 1;
	}, [scopeKey]);
	(0, import_react.useEffect)(() => {
		setPhase("draft");
	}, [scopeKey]);
	const send = (0, import_react.useCallback)(async (input) => {
		const scopeEpoch = scopeEpochRef.current;
		const isCurrentScope = () => scopeEpochRef.current === scopeEpoch;
		let conversation = null;
		try {
			setPhase("persisting");
			conversation = await ensureConversation(input);
			if (!conversation) {
				if (isCurrentScope()) setPhase("draft");
				return null;
			}
			if (isCurrentScope()) setPhase("opening");
			const ack = await ipcApi.request("ai.stream.open", buildStreamRequest(input, conversation));
			Promise.resolve(refreshMetadata?.(conversation, ack)).catch((err) => {
				logger.warn("Failed to refresh conversation metadata after stream open", err);
			});
			if (!isCurrentScope()) return ack;
			if (ack.mode === "blocked") {
				toast.error(getStreamBlockedMessage(ack));
				if (isCurrentScope()) setPhase("ready");
				return ack;
			}
			const reservedMessages = ack.reservedMessages ?? [];
			if (reservedMessages.length > 0) await historyAdapter.seedReservedMessages(reservedMessages, {
				activeExecutions: ack.activeExecutions,
				preserveActiveNode: ack.preserveActiveNode
			});
			if (isCurrentScope()) setPhase("streaming");
			return ack;
		} catch (err) {
			if (isCurrentScope()) {
				try {
					await historyAdapter.rollback();
				} catch (rollbackErr) {
					logger.warn("Failed to rollback conversation history after stream open failure", rollbackErr);
				}
				setPhase("draft");
			}
			throw err;
		}
	}, [
		buildStreamRequest,
		ensureConversation,
		historyAdapter,
		refreshMetadata
	]);
	return {
		phase,
		layout: phase === "draft" ? "draft" : "docked",
		send
	};
}
function mergeMessagesById(...sources) {
	const order = [];
	const byId = /* @__PURE__ */ new Map();
	for (const messages of sources) for (const message of messages) {
		const existing = byId.get(message.id);
		if (!existing) {
			order.push(message.id);
			byId.set(message.id, message);
			continue;
		}
		const metadata = existing.metadata || message.metadata ? {
			...existing.metadata,
			...message.metadata
		} : void 0;
		byId.set(message.id, {
			...existing,
			...message,
			...metadata && { metadata }
		});
	}
	return order.flatMap((id) => {
		const message = byId.get(id);
		return message ? [message] : [];
	});
}
function withComposerFilePartMeta(part, attachment, fileEntryId) {
	return withCherryMeta(part, {
		...fileEntryId ? { fileEntryId } : {},
		fileTokenSourceId: attachment.fileTokenSourceId,
		...attachment.composerFileKind ? { composerFileKind: attachment.composerFileKind } : {},
		...attachment.pipelineAssetId ? { pipelineAssetId: attachment.pipelineAssetId } : {},
		...attachment.previewUrl ? { previewUrl: attachment.previewUrl } : {}
	});
}
async function buildFilePartsForAttachments(attachments) {
	const paths = attachments.map((attachment) => {
		if (attachment.pipelineAssetId) return attachment.path;
		if (!attachment.path) throw new Error(`Cannot send attachment "${attachment.origin_name || attachment.name}": it has no file path`);
		return attachment.path;
	});
	return Promise.all(attachments.map(async (attachment, index) => {
		if (attachment.pipelineAssetId) {
			const url = attachment.previewUrl || (paths[index] ? toFileUrl(paths[index]) : `pipeline-asset://${attachment.pipelineAssetId}`);
			return withComposerFilePartMeta({
				type: "file",
				mediaType: attachment.type === "image" ? "image/png" : attachment.type === "video" ? "video/mp4" : "application/octet-stream",
				url,
				filename: attachment.origin_name || attachment.name
			}, attachment);
		}
		const entry = await window.api.file.createInternalEntry({
			source: "path",
			path: paths[index],
			cleanupPolicy: "delete_when_unreferenced"
		});
		const physicalPath = await window.api.file.getPhysicalPath({ id: entry.id });
		const metadata = await ipcApi.request("file.get_metadata", createFilePathHandle(physicalPath));
		if (metadata === null) throw new Error(`Failed to read metadata for freshly created file entry ${entry.id}`);
		return withComposerFilePartMeta({
			type: "file",
			mediaType: metadata.kind === "file" ? metadata.mime : "application/octet-stream",
			url: toFileUrl(physicalPath),
			filename: attachment.origin_name || attachment.name
		}, attachment, entry.id);
	}));
}
export { useChatWithHistory as a, useMessageStreamingLayers as c, useConversationTurnController as i, withComposerFilePartMeta as n, useToolApprovalComposerOverrides as o, mergeMessagesById as r, createOverlayRefreshHandoff as s, buildFilePartsForAttachments as t };

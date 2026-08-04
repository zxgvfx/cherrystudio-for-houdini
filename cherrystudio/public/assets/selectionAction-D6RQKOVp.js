import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-DMmcWmzd.js";
import { n as AntdProvider_default, r as require_lib, t as LanguageSelect_default } from "./LanguageSelect-C81Nbpdk.js";
import { Kr as LoadingOutlined_default, Qo as IpcChannel, Uo as defaultLanguage, Zo as loggerService, _o as i18n_default, n as init_es, yo as useTranslation } from "./es-CndCVlxX.js";
import { $c as getDefaultAssistant, Ci as getToastUtilities, Di as useHotkeys, Dr as detectLanguage, Hr as MessageContent_default, Ja as useTopicMessages, Jf as StoreSyncService_default, Jp as UNKNOWN, Kf as isMac, Ks as isAbortError, Qa as cancelThrottledBlockUpdate, Qc as getAssistantById, To as newMessagesActions, Ua as useTimer, Vs as formatErrorMessage, Wo as abortCompletion, Xs as ERROR_I18N_KEY_STREAM_PAUSED, Yf as Provider_default, Ys as ERROR_I18N_KEY_REQUEST_TIMEOUT, Zs as ChunkType, an as getUserMessage, ap as databases_default, ba as ThemeProvider, cc as upsertOneBlock, cp as createMainTextBlock, el as getDefaultModel, fp as require_lodash, fs as pauseTrace, io as throttledBlockUpdate, mp as MessageBlockStatus, n as store_default, nl as getDefaultTranslateAssistant, nn as getAssistantMessage, oc as updateOneBlock, pa as CodeStyleProvider, pc as useSettings, pp as AssistantMessageStatus, pt as ConversationService, qf as isWin, qp as LanguagesEnum, qs as isTimeoutError, sc as upsertManyBlocks, sp as createErrorBlock, st as fetchChatCompletion, t as persistor, tl as getDefaultTopic, up as createThinkingBlock, wr as useTranslate } from "./store-CcCQoZLu.js";
import "./dayjs.min-A7WN91xd.js";
import { t as require_react } from "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import { Ut as button_default, bt as tooltip_default, k as RefreshIcon_default, mt as dropdown_default } from "./ImageViewer-ODeK7vRu.js";
import "./Component-DLAh4rKR.js";
import { t as ArrowRight } from "./arrow-right-D2oVAR0E.js";
import { t as ChevronDown } from "./chevron-down-Cz0gHmMR.js";
import { t as CircleQuestionMark } from "./circle-question-mark-CB989y3L.js";
import { t as CircleX } from "./circle-x-D8cDeGz0.js";
import { t as Copy } from "./copy-uuZbe8cL.js";
import { t as Droplet } from "./droplet-MyHqgo7S.js";
import { t as Minus } from "./minus-C3z-AGut.js";
import { t as Pause } from "./pause-CsOr6cEI.js";
import { t as Pin } from "./pin-DCLPZlBA.js";
import { t as Settings2 } from "./settings-2-CfK_8dut.js";
import { t as X } from "./x-C0KRTbLV.js";
import "./es-DsSI1lSu.js";
import { n as slider_default, t as CopyButton_default } from "./CopyButton-B2wPC-mV.js";
import { n as dt, r as ft } from "./styled-components.browser.esm-CWwHPchJ.js";
import "./dist-B0d1CYLd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BEUwrBtJ.js";
import "./dist-B1WQMAJb.js";
import "./katex-BYiF-YTA.js";
import "./dist-NDLMieGj.js";
import "./purify.es-CkyOJxeY.js";
import "./markdown-it-BOysPDJQ.js";
import "./EventStreamCodec-DE3dEgH1.js";
import { t as PersistGate } from "./react-Ddk9VlpO.js";
import "./en_US-_QmElOun.js";
import { r as useSelectionAssistant, t as DynamicIcon } from "./DynamicIcon-BXoTdM9K.js";
var import_client = require_client();
await init_es();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_lodash = require_lodash();
var logger$2 = loggerService.withContext("ActionUtils");
const processMessages = async (assistant, topic, promptContent, setAskId, onStream, onFinish, onError) => {
	if (!assistant || !topic) return;
	try {
		const { message: userMessage, blocks: userBlocks } = getUserMessage({
			assistant,
			topic,
			content: promptContent
		});
		setAskId(userMessage.id);
		store_default.dispatch(newMessagesActions.addMessage({
			topicId: topic.id,
			message: userMessage
		}));
		store_default.dispatch(upsertManyBlocks(userBlocks));
		let textBlockId = null;
		let thinkingBlockId = null;
		let thinkingStartTime = null;
		let textBlockContent = "";
		const resolveThinkingDuration = (duration) => {
			if (typeof duration === "number" && Number.isFinite(duration)) return duration;
			if (thinkingStartTime !== null) return Math.max(0, performance.now() - thinkingStartTime);
			return 0;
		};
		const assistantMessage = getAssistantMessage({
			assistant,
			topic
		});
		store_default.dispatch(newMessagesActions.addMessage({
			topicId: topic.id,
			message: assistantMessage
		}));
		let finished = false;
		const newAssistant = (0, import_lodash.cloneDeep)(assistant);
		if (!newAssistant.settings) newAssistant.settings = {};
		newAssistant.settings.streamOutput = true;
		newAssistant.webSearchProviderId = void 0;
		newAssistant.mcpServers = void 0;
		newAssistant.knowledge_bases = void 0;
		const { modelMessages, uiMessages } = await ConversationService.prepareMessagesForModel([userMessage], newAssistant);
		await fetchChatCompletion({
			messages: modelMessages,
			assistant: newAssistant,
			requestOptions: {},
			uiMessages,
			onChunkReceived: (chunk) => {
				if (finished) return;
				switch (chunk.type) {
					case ChunkType.THINKING_START:
						thinkingStartTime = performance.now();
						if (thinkingBlockId) store_default.dispatch(updateOneBlock({
							id: thinkingBlockId,
							changes: { status: MessageBlockStatus.STREAMING }
						}));
						else {
							const block = createThinkingBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
							thinkingBlockId = block.id;
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId: topic.id,
								messageId: assistantMessage.id,
								updates: { blockInstruction: { id: block.id } }
							}));
							store_default.dispatch(upsertOneBlock(block));
						}
						break;
					case ChunkType.THINKING_DELTA:
						if (thinkingBlockId) {
							if (thinkingStartTime === null) thinkingStartTime = performance.now();
							const thinkingDuration = resolveThinkingDuration(chunk.thinking_millsec);
							throttledBlockUpdate(thinkingBlockId, {
								content: chunk.text,
								thinking_millsec: thinkingDuration
							});
						}
						onStream();
						break;
					case ChunkType.THINKING_COMPLETE:
						if (thinkingBlockId) {
							const thinkingDuration = resolveThinkingDuration(chunk.thinking_millsec);
							cancelThrottledBlockUpdate(thinkingBlockId);
							store_default.dispatch(updateOneBlock({
								id: thinkingBlockId,
								changes: {
									content: chunk.text,
									status: MessageBlockStatus.SUCCESS,
									thinking_millsec: thinkingDuration
								}
							}));
							thinkingBlockId = null;
						}
						thinkingStartTime = null;
						break;
					case ChunkType.TEXT_START:
						if (textBlockId) store_default.dispatch(updateOneBlock({
							id: textBlockId,
							changes: { status: MessageBlockStatus.STREAMING }
						}));
						else {
							const block = createMainTextBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
							textBlockId = block.id;
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId: topic.id,
								messageId: assistantMessage.id,
								updates: { blockInstruction: { id: block.id } }
							}));
							store_default.dispatch(upsertOneBlock(block));
						}
						break;
					case ChunkType.TEXT_DELTA:
						if (textBlockId) throttledBlockUpdate(textBlockId, { content: chunk.text });
						onStream();
						textBlockContent = chunk.text;
						break;
					case ChunkType.TEXT_COMPLETE:
						if (textBlockId) {
							cancelThrottledBlockUpdate(textBlockId);
							store_default.dispatch(updateOneBlock({
								id: textBlockId,
								changes: {
									content: chunk.text,
									status: MessageBlockStatus.SUCCESS
								}
							}));
							onFinish(chunk.text);
							textBlockContent = chunk.text;
							textBlockId = null;
						}
						break;
					case ChunkType.BLOCK_COMPLETE:
						store_default.dispatch(newMessagesActions.updateMessage({
							topicId: topic.id,
							messageId: assistantMessage.id,
							updates: { status: AssistantMessageStatus.SUCCESS }
						}));
						break;
					case ChunkType.LLM_RESPONSE_COMPLETE:
						finished = true;
						break;
					case ChunkType.ERROR:
						{
							const blockId = textBlockId || thinkingBlockId;
							thinkingStartTime = null;
							if (blockId) store_default.dispatch(updateOneBlock({
								id: blockId,
								changes: { status: isAbortError(chunk.error) ? MessageBlockStatus.PAUSED : MessageBlockStatus.ERROR }
							}));
							const isErrorTypeAbort = isAbortError(chunk.error);
							const isErrorTypeTimeout = isTimeoutError(chunk.error);
							const i18nKey = isErrorTypeAbort ? ERROR_I18N_KEY_STREAM_PAUSED : isErrorTypeTimeout ? ERROR_I18N_KEY_REQUEST_TIMEOUT : void 0;
							const serializableError = {
								name: chunk.error.name,
								message: chunk.error.message || formatErrorMessage(chunk.error),
								originalMessage: chunk.error.message,
								...i18nKey && { i18nKey },
								stack: chunk.error.stack,
								status: chunk.error.status || chunk.error.code,
								requestId: chunk.error.request_id
							};
							const errorBlock = createErrorBlock(assistantMessage.id, serializableError, { status: isErrorTypeAbort ? MessageBlockStatus.PAUSED : MessageBlockStatus.ERROR });
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId: topic.id,
								messageId: assistantMessage.id,
								updates: { blockInstruction: { id: errorBlock.id } }
							}));
							store_default.dispatch(upsertOneBlock(errorBlock));
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId: topic.id,
								messageId: assistantMessage.id,
								updates: { status: isAbortError(chunk.error) ? AssistantMessageStatus.PAUSED : AssistantMessageStatus.ERROR }
							}));
							onFinish(textBlockContent);
						}
						break;
				}
			}
		});
	} catch (err) {
		if (isAbortError(err)) return;
		onError(err instanceof Error ? err : /* @__PURE__ */ new Error("An error occurred"));
		logger$2.error("Error fetching result:", err);
	}
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var WindowFooter = ({ content = "", loading = false, onPause = void 0, onRegenerate = void 0 }) => {
	const { t } = useTranslation();
	const [isWindowFocus, setIsWindowFocus] = (0, import_react.useState)(true);
	const [isCopyHovered, setIsCopyHovered] = (0, import_react.useState)(false);
	const [isEscHovered, setIsEscHovered] = (0, import_react.useState)(false);
	const [isRegenerateHovered, setIsRegenerateHovered] = (0, import_react.useState)(false);
	const [isContainerHovered, setIsContainerHovered] = (0, import_react.useState)(false);
	const [isShowMe, setIsShowMe] = (0, import_react.useState)(true);
	const hideTimerRef = (0, import_react.useRef)(null);
	const { setTimeoutTimer } = useTimer();
	(0, import_react.useEffect)(() => {
		window.addEventListener("focus", handleWindowFocus);
		window.addEventListener("blur", handleWindowBlur);
		return () => {
			window.removeEventListener("focus", handleWindowFocus);
			window.removeEventListener("blur", handleWindowBlur);
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		hideTimerRef.current = setTimeout(() => {
			setIsShowMe(false);
			hideTimerRef.current = null;
		}, 3e3);
		return () => {
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		};
	}, []);
	const showMePeriod = () => {
		if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		setIsShowMe(true);
		hideTimerRef.current = setTimeout(() => {
			setIsShowMe(false);
			hideTimerRef.current = null;
		}, 2e3);
	};
	useHotkeys("c", () => {
		showMePeriod();
		handleCopy();
	});
	useHotkeys("r", () => {
		showMePeriod();
		handleRegenerate();
	});
	useHotkeys("esc", () => {
		showMePeriod();
		handleEsc();
	});
	const handleEsc = () => {
		setIsEscHovered(true);
		setTimeoutTimer("handleEsc", () => {
			setIsEscHovered(false);
		}, 200);
		if (loading && onPause) onPause();
		else window.api.selection.closeActionWindow();
	};
	const handleRegenerate = () => {
		setIsRegenerateHovered(true);
		setTimeoutTimer("handleRegenerate_1", () => {
			setIsRegenerateHovered(false);
		}, 200);
		if (loading && onPause) onPause();
		if (onRegenerate) setTimeoutTimer("handleRegenerate_2", () => {
			onRegenerate();
		}, 200);
	};
	const handleCopy = () => {
		if (!content || loading) return;
		navigator.clipboard.writeText(content).then(() => {
			window.toast.success(t("message.copy.success"));
			setIsCopyHovered(true);
			setTimeoutTimer("handleCopy", () => {
				setIsCopyHovered(false);
			}, 200);
		}).catch(() => {
			window.toast.error(t("message.copy.failed"));
		});
	};
	const handleWindowFocus = () => {
		setIsWindowFocus(true);
	};
	const handleWindowBlur = () => {
		setIsWindowFocus(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container$2, {
		onMouseEnter: () => setIsContainerHovered(true),
		onMouseLeave: () => setIsContainerHovered(false),
		$isHovered: isContainerHovered,
		$showInitially: isShowMe,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OpButtonWrapper, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpButton, {
				onClick: handleEsc,
				$isWindowFocus: isWindowFocus,
				"data-hovered": isEscHovered,
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LoadingIconWrapper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
					size: 14,
					className: "btn-icon loading-icon",
					style: {
						position: "absolute",
						left: 1,
						top: 1
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
					style: {
						fontSize: 16,
						position: "absolute",
						left: 0,
						top: 0
					},
					className: "btn-icon loading-icon",
					spin: true
				})] }), t("selection.action.window.esc_stop")] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
					size: 14,
					className: "btn-icon"
				}), t("selection.action.window.esc_close")] })
			}),
			onRegenerate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OpButton, {
				onClick: handleRegenerate,
				$isWindowFocus: isWindowFocus,
				"data-hovered": isRegenerateHovered,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshIcon_default, {
					size: 14,
					className: "btn-icon"
				}), t("selection.action.window.r_regenerate")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OpButton, {
				onClick: handleCopy,
				$isWindowFocus: isWindowFocus && !!content,
				"data-hovered": isCopyHovered,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					size: 14,
					className: "btn-icon"
				}), t("selection.action.window.c_copy")]
			})
		] })
	});
};
var Container$2 = dt.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
  min-width: min-content;
  width: calc(100% - 16px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  height: 32px;
  backdrop-filter: blur(8px);
  border-radius: 8px;
  opacity: ${(props) => props.$showInitially ? 1 : 0};
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;
var OpButtonWrapper = dt.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 12px;
  gap: 6px;
`;
var OpButton = dt.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text-secondary);
  height: 22px;
  opacity: ${(props) => props.$isWindowFocus ? 1 : .2};
  transition: opacity 0.3s ease;
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  .btn-icon {
    color: var(--color-text-secondary);
  }

  .loading-icon {
    color: var(--color-error);
  }

  &:hover,
  &[data-hovered='true'] {
    color: var(--color-primary) !important;

    .btn-icon {
      color: var(--color-primary) !important;
      transition: color 0.2s ease;
    }
  }
`;
var LoadingIconWrapper = dt.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 16px;
  height: 16px;
`;
var WindowFooter_default = WindowFooter;
await init_es();
var logger$1 = loggerService.withContext("ActionGeneral");
var ActionGeneral = import_react.memo(({ action, scrollToBottom }) => {
	const { t } = useTranslation();
	const { language } = useSettings();
	const [error, setError] = (0, import_react.useState)(null);
	const [showOriginal, setShowOriginal] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("preparing");
	const [contentToCopy, setContentToCopy] = (0, import_react.useState)("");
	const initialized = (0, import_react.useRef)(false);
	const assistantRef = (0, import_react.useRef)(null);
	const topicRef = (0, import_react.useRef)(null);
	const promptContentRef = (0, import_react.useRef)("");
	const askId = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (initialized.current) return;
		initialized.current = true;
		const currentAssistant = action.assistantId ? getAssistantById(action.assistantId) || getDefaultAssistant() : getDefaultAssistant();
		assistantRef.current = {
			...currentAssistant,
			model: currentAssistant.model || getDefaultModel()
		};
		topicRef.current = getDefaultTopic(currentAssistant.id);
		let userContent = "";
		switch (action.id) {
			case "summary":
				userContent = t("selection.action.prompt.summary", { language }) + action.selectedText;
				break;
			case "explain":
				userContent = t("selection.action.prompt.explain", { language }) + action.selectedText;
				break;
			case "refine":
				userContent = t("selection.action.prompt.refine", { text: action.selectedText ?? "" });
				break;
			default:
				if (!action.prompt) {
					userContent = action.selectedText || "";
					break;
				}
				if (action.prompt.includes("{{text}}")) {
					userContent = action.prompt.replaceAll("{{text}}", action.selectedText);
					break;
				}
				userContent = action.prompt + "\n\n" + action.selectedText;
		}
		promptContentRef.current = userContent;
	}, [
		action,
		language,
		t
	]);
	const fetchResult = (0, import_react.useCallback)(() => {
		if (!initialized.current) return;
		setStatus("preparing");
		const setAskId = (id) => {
			askId.current = id;
		};
		const onStream = () => {
			setStatus("streaming");
			scrollToBottom?.();
		};
		const onFinish = (content) => {
			setStatus("finished");
			setContentToCopy(content);
		};
		const onError = (error$1) => {
			setStatus("finished");
			setError(error$1.message);
		};
		if (!assistantRef.current || !topicRef.current) return;
		logger$1.debug("Before peocess message", { assistant: assistantRef.current });
		processMessages(assistantRef.current, topicRef.current, promptContentRef.current, setAskId, onStream, onFinish, onError);
	}, [scrollToBottom]);
	(0, import_react.useEffect)(() => {
		fetchResult();
	}, [fetchResult]);
	const allMessages = useTopicMessages(topicRef.current?.id || "");
	const currentAssistantMessage = (0, import_react.useMemo)(() => {
		const assistantMessages = allMessages.filter((message) => message.role === "assistant");
		if (assistantMessages.length === 0) return null;
		return assistantMessages[assistantMessages.length - 1];
	}, [allMessages]);
	(0, import_react.useEffect)(() => {
		switch (currentAssistantMessage?.status) {
			case AssistantMessageStatus.PROCESSING:
			case AssistantMessageStatus.PENDING:
			case AssistantMessageStatus.SEARCHING:
				setStatus("streaming");
				break;
			case AssistantMessageStatus.PAUSED:
			case AssistantMessageStatus.ERROR:
			case AssistantMessageStatus.SUCCESS:
				setStatus("finished");
				break;
			case void 0: break;
			default: logger$1.warn("Unexpected assistant message status:", { status: currentAssistantMessage?.status });
		}
	}, [currentAssistantMessage?.status]);
	const isPreparing = status === "preparing";
	const isStreaming = status === "streaming";
	const handlePause = () => {
		if (askId.current) abortCompletion(askId.current);
		if (topicRef.current?.id) pauseTrace(topicRef.current.id);
	};
	const handleRegenerate = () => {
		setContentToCopy("");
		fetchResult();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$1, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContainer$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalHeader$1, {
				onClick: () => setShowOriginal(!showOriginal),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showOriginal ? t("selection.action.window.original_hide") : t("selection.action.window.original_show") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 14,
					className: showOriginal ? "expanded" : ""
				})]
			}) }),
			showOriginal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalContent$1, { children: [action.selectedText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginalContentCopyWrapper$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
				textToCopy: action.selectedText,
				tooltip: t("selection.action.window.original_copy"),
				size: 12
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Result$1, { children: [isPreparing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
				style: { fontSize: 16 },
				spin: true
			}), !isPreparing && currentAssistantMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent_default, { message: currentAssistantMessage }, currentAssistantMessage.id)] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMsg$1, { children: error })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterPadding$1, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFooter_default, {
			loading: isStreaming,
			onPause: handlePause,
			onRegenerate: handleRegenerate,
			content: contentToCopy
		})
	] });
});
var Container$1 = dt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
var Result$1 = dt.div`
  margin-top: 4px;
  width: 100%;
`;
var MenuContainer$1 = dt.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
var OriginalHeader$1 = dt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 12px;

  &:hover {
    color: var(--color-primary);
  }

  .lucide {
    transition: transform 0.2s ease;
    &.expanded {
      transform: rotate(180deg);
    }
  }
`;
var OriginalContent$1 = dt.div`
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 12px;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  color: var(--color-text-secondary);
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;
var OriginalContentCopyWrapper$1 = dt.div`
  display: flex;
  justify-content: flex-end;
`;
var FooterPadding$1 = dt.div`
  min-height: 12px;
`;
var ErrorMsg$1 = dt.div`
  color: var(--color-error);
  background: rgba(255, 0, 0, 0.15);
  border: 1px solid var(--color-error);
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 13px;
  word-break: break-all;
`;
var ActionGeneral_default = ActionGeneral;
await init_es();
var logger = loggerService.withContext("ActionTranslate");
var ActionTranslate = ({ action, scrollToBottom }) => {
	const { t } = useTranslation();
	const { language } = useSettings();
	const { getLanguageByLangcode, isLoaded: isLanguagesLoaded } = useTranslate();
	const [targetLanguage, setTargetLanguage] = (0, import_react.useState)(() => {
		const lang = getLanguageByLangcode(language);
		if (lang !== UNKNOWN) return lang;
		else {
			logger.warn("[initialize targetLanguage] Unexpected UNKNOWN. Fallback to zh-CN");
			return LanguagesEnum.zhCN;
		}
	});
	const [alterLanguage, setAlterLanguage] = (0, import_react.useState)(LanguagesEnum.enUS);
	const [detectedLanguage, setDetectedLanguage] = (0, import_react.useState)(null);
	const [actualTargetLanguage, setActualTargetLanguage] = (0, import_react.useState)(targetLanguage);
	const [error, setError] = (0, import_react.useState)("");
	const [showOriginal, setShowOriginal] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("preparing");
	const [contentToCopy, setContentToCopy] = (0, import_react.useState)("");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const assistantRef = (0, import_react.useRef)(null);
	const topicRef = (0, import_react.useRef)(null);
	const askId = (0, import_react.useRef)("");
	const targetLangRef = (0, import_react.useRef)(targetLanguage);
	const updateLanguagePair = (0, import_react.useCallback)(async () => {
		if (!isLanguagesLoaded) {
			logger.silly("[updateLanguagePair] Languages are not loaded. Skip.");
			return;
		}
		const biDirectionLangPair = await databases_default.settings.get({ id: "translate:bidirectional:pair" });
		if (biDirectionLangPair && biDirectionLangPair.value[0]) {
			const targetLang = getLanguageByLangcode(biDirectionLangPair.value[0]);
			setTargetLanguage(targetLang);
			targetLangRef.current = targetLang;
		}
		if (biDirectionLangPair && biDirectionLangPair.value[1]) setAlterLanguage(getLanguageByLangcode(biDirectionLangPair.value[1]));
	}, [getLanguageByLangcode, isLanguagesLoaded]);
	const initialize = (0, import_react.useCallback)(async () => {
		if (initialized) {
			logger.silly("[initialize] Already initialized.");
			return;
		}
		if (!isLanguagesLoaded) {
			logger.silly("[initialize] Languages not loaded. Skip initialization.");
			return;
		}
		if (action.selectedText === void 0) {
			logger.error("[initialize] No selected text.");
			return;
		}
		logger.silly("[initialize] Start initialization.");
		await updateLanguagePair();
		logger.silly("[initialize] UpdateLanguagePair completed.");
		const currentAssistant = getDefaultTranslateAssistant(targetLangRef.current, action.selectedText);
		assistantRef.current = currentAssistant;
		topicRef.current = getDefaultTopic(currentAssistant.id);
		setInitialized(true);
	}, [
		action.selectedText,
		initialized,
		isLanguagesLoaded,
		updateLanguagePair
	]);
	(0, import_react.useEffect)(() => {
		initialize();
	}, [initialize]);
	const fetchResult = (0, import_react.useCallback)(async () => {
		if (!assistantRef.current || !topicRef.current || !action.selectedText || !initialized) return;
		const setAskId = (id) => {
			askId.current = id;
		};
		const onStream = () => {
			setStatus("streaming");
			scrollToBottom?.();
		};
		const onFinish = (content) => {
			setStatus("finished");
			setContentToCopy(content);
		};
		const onError = (error$1) => {
			setStatus("finished");
			setError(error$1.message);
		};
		let sourceLanguageCode;
		try {
			sourceLanguageCode = await detectLanguage(action.selectedText);
		} catch (err) {
			onError(err instanceof Error ? err : /* @__PURE__ */ new Error("An error occurred"));
			logger.error("Error detecting language:", err);
			return;
		}
		setDetectedLanguage(getLanguageByLangcode(sourceLanguageCode));
		let translateLang;
		if (sourceLanguageCode === UNKNOWN.langCode) {
			logger.debug("Unknown source language. Just use target language.");
			translateLang = targetLanguage;
		} else {
			logger.debug("Detected Language: ", { sourceLanguage: sourceLanguageCode });
			if (sourceLanguageCode === targetLanguage.langCode) translateLang = alterLanguage;
			else translateLang = targetLanguage;
		}
		setActualTargetLanguage(translateLang);
		const assistant = getDefaultTranslateAssistant(translateLang, action.selectedText);
		assistantRef.current = assistant;
		logger.debug("process once");
		processMessages(assistant, topicRef.current, assistant.content, setAskId, onStream, onFinish, onError);
	}, [
		action,
		targetLanguage,
		alterLanguage,
		scrollToBottom,
		initialized,
		getLanguageByLangcode
	]);
	(0, import_react.useEffect)(() => {
		fetchResult();
	}, [fetchResult]);
	const allMessages = useTopicMessages(topicRef.current?.id || "");
	const currentAssistantMessage = (0, import_react.useMemo)(() => {
		const assistantMessages = allMessages.filter((message) => message.role === "assistant");
		if (assistantMessages.length === 0) return null;
		return assistantMessages[assistantMessages.length - 1];
	}, [allMessages]);
	(0, import_react.useEffect)(() => {
		switch (currentAssistantMessage?.status) {
			case AssistantMessageStatus.PROCESSING:
			case AssistantMessageStatus.PENDING:
			case AssistantMessageStatus.SEARCHING:
				setStatus("streaming");
				break;
			case AssistantMessageStatus.PAUSED:
			case AssistantMessageStatus.ERROR:
			case AssistantMessageStatus.SUCCESS:
				setStatus("finished");
				break;
			case void 0: break;
			default: logger.warn("Unexpected assistant message status:", { status: currentAssistantMessage?.status });
		}
	}, [currentAssistantMessage?.status]);
	const isPreparing = status === "preparing";
	const isStreaming = status === "streaming";
	const handleChangeLanguage = (0, import_react.useCallback)((newTargetLanguage, newAlterLanguage) => {
		if (!initialized) return;
		setTargetLanguage(newTargetLanguage);
		targetLangRef.current = newTargetLanguage;
		setAlterLanguage(newAlterLanguage);
		databases_default.settings.put({
			id: "translate:bidirectional:pair",
			value: [newTargetLanguage.langCode, newAlterLanguage.langCode]
		});
	}, [initialized]);
	const handleDirectTargetChange = (0, import_react.useCallback)((langCode) => {
		if (!initialized) return;
		const newLang = getLanguageByLangcode(langCode);
		setActualTargetLanguage(newLang);
		if (newLang.langCode !== targetLanguage.langCode && newLang.langCode !== alterLanguage.langCode) {
			setTargetLanguage(newLang);
			targetLangRef.current = newLang;
			databases_default.settings.put({
				id: "translate:bidirectional:pair",
				value: [newLang.langCode, alterLanguage.langCode]
			});
		}
	}, [
		initialized,
		getLanguageByLangcode,
		targetLanguage.langCode,
		alterLanguage.langCode
	]);
	const settingsMenuItems = (0, import_react.useMemo)(() => [{
		key: "preferred",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLabel, { children: t("translate.preferred_target") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
			value: targetLanguage.langCode,
			style: { width: "100%" },
			listHeight: 160,
			size: "small",
			onClick: (e) => e.stopPropagation(),
			onChange: (value) => {
				handleChangeLanguage(getLanguageByLangcode(value), alterLanguage);
				setSettingsOpen(false);
			},
			disabled: isStreaming
		})] })
	}, {
		key: "alter",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLabel, { children: t("translate.alter_language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
			value: alterLanguage.langCode,
			style: { width: "100%" },
			listHeight: 160,
			size: "small",
			onClick: (e) => e.stopPropagation(),
			onChange: (value) => {
				handleChangeLanguage(targetLanguage, getLanguageByLangcode(value));
				setSettingsOpen(false);
			},
			disabled: isStreaming
		})] })
	}], [
		t,
		targetLanguage,
		alterLanguage,
		isStreaming,
		getLanguageByLangcode,
		handleChangeLanguage
	]);
	const handlePause = () => {
		logger.silly("Try to pause: ", { id: askId.current });
		if (askId.current) abortCompletion(askId.current);
		if (topicRef.current?.id) pauseTrace(topicRef.current.id);
	};
	const handleRegenerate = () => {
		setContentToCopy("");
		fetchResult();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDropdownStyles, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuContainer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LeftGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetectedLanguageTag, { children: isPreparing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("translate.detecting") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { marginRight: 4 },
					children: detectedLanguage?.emoji || "🌐"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detectedLanguage?.label() || t("translate.detected_source") })] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					size: 16,
					color: "var(--color-text-3)",
					style: { flexShrink: 0 }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
					value: actualTargetLanguage.langCode,
					style: {
						minWidth: 100,
						maxWidth: 160
					},
					listHeight: 160,
					size: "small",
					optionFilterProp: "label",
					onChange: handleDirectTargetChange,
					disabled: isStreaming
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(dropdown_default, {
					menu: {
						items: settingsMenuItems,
						selectable: false,
						className: "settings-dropdown-menu"
					},
					trigger: ["click"],
					placement: "bottomRight",
					open: settingsOpen,
					onOpenChange: setSettingsOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
						title: t("translate.language_settings"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsButton, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 14 }) })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
					title: t("selection.action.translate.smart_translate_tips"),
					placement: "bottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpIcon, { size: 14 })
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalHeader, {
				onClick: () => setShowOriginal(!showOriginal),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showOriginal ? t("selection.action.window.original_hide") : t("selection.action.window.original_show") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 14,
					className: showOriginal ? "expanded" : ""
				})]
			})] }),
			showOriginal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalContent, { children: [
				action.selectedText,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginalContentCopyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
					textToCopy: action.selectedText,
					tooltip: t("selection.action.window.original_copy"),
					size: 12
				}) })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Result, { children: [isPreparing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
				style: { fontSize: 16 },
				spin: true
			}), !isPreparing && currentAssistantMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent_default, { message: currentAssistantMessage }, currentAssistantMessage.id)] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMsg, { children: error })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterPadding, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFooter_default, {
			loading: isStreaming,
			onPause: handlePause,
			onRegenerate: handleRegenerate,
			content: contentToCopy
		})
	] });
};
var Container = dt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;
var Result = dt.div`
  margin-top: 16px;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;
var MenuContainer = dt.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
var OriginalHeader = dt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 12px;
  padding: 4px 0;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
  }

  .lucide {
    transition: transform 0.2s ease;
    &.expanded {
      transform: rotate(180deg);
    }
  }
`;
var OriginalContent = dt.div`
  margin-top: 8px;
  padding: 8px;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  color: var(--color-text-secondary);
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;
var OriginalContentCopyWrapper = dt.div`
  display: flex;
  justify-content: flex-end;
`;
var FooterPadding = dt.div`
  min-height: 12px;
`;
var ErrorMsg = dt.div`
  color: var(--color-error);
  background: rgba(255, 0, 0, 0.15);
  border: 1px solid var(--color-error);
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 13px;
  word-break: break-all;
`;
var LeftGroup = dt.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 1;
  min-width: 0;
`;
var DetectedLanguageTag = dt.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
`;
var SettingsButton = dt.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-3);
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-background-soft);
    color: var(--color-text);
  }
`;
var SettingsMenuItem = dt.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
  min-width: 180px;
  cursor: default;
`;
var SettingsLabel = dt.span`
  font-size: 12px;
  color: var(--color-text-secondary);
`;
var HelpIcon = dt(CircleQuestionMark)`
  cursor: pointer;
  color: var(--color-text-3);
  flex-shrink: 0;
`;
var SettingsDropdownStyles = ft`
  .settings-dropdown-menu {
    .ant-dropdown-menu-item {
      cursor: default !important;
      &:hover {
        background-color: transparent !important;
      }
    }
  }
`;
var ActionTranslate_default = ActionTranslate;
var SelectionActionApp = () => {
	const { language, customCss } = useSettings();
	const { t } = useTranslation();
	const [action, setAction] = (0, import_react.useState)(null);
	const isActionLoaded = (0, import_react.useRef)(false);
	const { isAutoClose, isAutoPin, actionWindowOpacity } = useSelectionAssistant();
	const [isPinned, setIsPinned] = (0, import_react.useState)(isAutoPin);
	const [isWindowFocus, setIsWindowFocus] = (0, import_react.useState)(true);
	const [showOpacitySlider, setShowOpacitySlider] = (0, import_react.useState)(false);
	const [opacity, setOpacity] = (0, import_react.useState)(actionWindowOpacity);
	const shouldCloseWhenBlur = (0, import_react.useRef)(false);
	const contentElementRef = (0, import_react.useRef)(null);
	const isAutoScrollEnabled = (0, import_react.useRef)(true);
	const lastScrollHeight = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const actionListenRemover = window.electron?.ipcRenderer.on(IpcChannel.Selection_UpdateActionData, (_, actionItem) => {
			setAction(actionItem);
			isActionLoaded.current = true;
		});
		window.addEventListener("focus", handleWindowFocus);
		window.addEventListener("blur", handleWindowBlur);
		return () => {
			actionListenRemover();
			window.removeEventListener("focus", handleWindowFocus);
			window.removeEventListener("blur", handleWindowBlur);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (isAutoPin) {
			window.api.selection.pinActionWindow(true);
			setIsPinned(true);
		} else if (!isActionLoaded.current) {
			window.api.selection.pinActionWindow(false);
			setIsPinned(false);
		}
	}, [isAutoPin]);
	(0, import_react.useEffect)(() => {
		shouldCloseWhenBlur.current = isAutoClose && !isPinned;
	}, [isAutoClose, isPinned]);
	(0, import_react.useEffect)(() => {
		i18n_default.changeLanguage(language || navigator.language || "en-US");
	}, [language]);
	(0, import_react.useEffect)(() => {
		let customCssElement = document.getElementById("user-defined-custom-css");
		if (customCssElement) customCssElement.remove();
		if (customCss) {
			customCssElement = document.createElement("style");
			customCssElement.id = "user-defined-custom-css";
			customCssElement.textContent = customCss;
			document.head.appendChild(customCssElement);
		}
	}, [customCss]);
	(0, import_react.useEffect)(() => {
		const contentEl = contentElementRef.current;
		if (contentEl) {
			contentEl.addEventListener("scroll", handleUserScroll);
			lastScrollHeight.current = contentEl.scrollHeight;
		}
		return () => {
			if (contentEl) contentEl.removeEventListener("scroll", handleUserScroll);
		};
	}, [action]);
	(0, import_react.useEffect)(() => {
		if (action) document.title = `${action.isBuiltIn ? t(action.name) : action.name} - ${t("selection.name")}`;
	}, [action, t]);
	(0, import_react.useEffect)(() => {
		if (!isActionLoaded.current) setOpacity(actionWindowOpacity);
	}, [actionWindowOpacity]);
	const handleMinimize = () => {
		window.api.selection.minimizeActionWindow();
	};
	const handleClose = () => {
		window.api.selection.closeActionWindow();
	};
	const togglePin = () => {
		setIsPinned(!isPinned);
		window.api.selection.pinActionWindow(!isPinned);
	};
	const handleWindowFocus = () => {
		setIsWindowFocus(true);
	};
	const handleWindowBlur = () => {
		if (shouldCloseWhenBlur.current) {
			handleClose();
			return;
		}
		setIsWindowFocus(false);
	};
	const handleOpacityChange = (value) => {
		setOpacity(value);
	};
	const handleScrollToBottom = (0, import_react.useCallback)(() => {
		if (contentElementRef.current && isAutoScrollEnabled.current) contentElementRef.current.scrollTo({
			top: contentElementRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, []);
	const handleUserScroll = () => {
		if (!contentElementRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = contentElementRef.current;
		const contentIncreased = scrollHeight > lastScrollHeight.current;
		lastScrollHeight.current = scrollHeight;
		if (contentIncreased && isAutoScrollEnabled.current) return;
		if (Math.abs(scrollHeight - scrollTop - clientHeight) < 32) isAutoScrollEnabled.current = true;
		else isAutoScrollEnabled.current = false;
	};
	const handleResizeStart = (0, import_react.useCallback)((e, direction) => {
		e.preventDefault();
		e.stopPropagation();
		let lastX = e.screenX;
		let lastY = e.screenY;
		const handleMouseMove = (moveEvent) => {
			const deltaX = moveEvent.screenX - lastX;
			const deltaY = moveEvent.screenY - lastY;
			if (deltaX !== 0 || deltaY !== 0) {
				window.api.selection.resizeActionWindow(deltaX, deltaY, direction);
				lastX = moveEvent.screenX;
				lastY = moveEvent.screenY;
			}
		};
		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	}, []);
	if (!action) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WindowFrame, {
		$opacity: opacity / 100,
		children: [
			isWin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "n",
					onMouseDown: (e) => handleResizeStart(e, "n")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "s",
					onMouseDown: (e) => handleResizeStart(e, "s")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "e",
					onMouseDown: (e) => handleResizeStart(e, "e")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "w",
					onMouseDown: (e) => handleResizeStart(e, "w")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "ne",
					onMouseDown: (e) => handleResizeStart(e, "ne")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "nw",
					onMouseDown: (e) => handleResizeStart(e, "nw")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "se",
					onMouseDown: (e) => handleResizeStart(e, "se")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeHandle, {
					$direction: "sw",
					onMouseDown: (e) => handleResizeStart(e, "sw")
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TitleBar, {
				$isWindowFocus: isWindowFocus,
				style: isMac ? { paddingLeft: "70px" } : {},
				children: [
					action.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBarIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
						name: action.icon,
						size: 16,
						style: { color: "var(--color-text-1)" },
						fallback: () => {}
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBarCaption, { children: action.isBuiltIn ? t(action.name) : action.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TitleBarButtons, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
							title: isPinned ? t("selection.action.window.pinned") : t("selection.action.window.pin"),
							placement: "bottom",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinButton, {
								type: "text",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
									size: 14,
									className: isPinned ? "pinned" : ""
								}),
								onClick: togglePin,
								className: isPinned ? "pinned" : ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
							title: t("selection.action.window.opacity"),
							placement: "bottom",
							...showOpacitySlider ? { open: false } : {},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinButton, {
								type: "text",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { size: 14 }),
								onClick: () => setShowOpacitySlider(!showOpacitySlider),
								className: showOpacitySlider ? "active" : "",
								style: { paddingBottom: "2px" }
							})
						}),
						showOpacitySlider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpacitySlider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(slider_default, {
							vertical: true,
							min: 20,
							max: 100,
							value: opacity,
							onChange: handleOpacityChange,
							onChangeComplete: () => setShowOpacitySlider(false),
							tooltip: { formatter: (value) => `${value}%` }
						}) }),
						!isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinButton, {
							type: "text",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 }),
							onClick: handleMinimize
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinButton, {
							type: "text",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 }),
							onClick: handleClose,
							className: "close"
						})] })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				ref: contentElementRef,
				children: [action.id == "translate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTranslate_default, {
					action,
					scrollToBottom: handleScrollToBottom
				}), action.id != "translate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionGeneral_default, {
					action,
					scrollToBottom: handleScrollToBottom
				})]
			}) })
		]
	});
};
var WindowFrame = dt.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  margin: 2px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 0px 0px 2px var(--color-text-3);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  opacity: ${(props) => props.$opacity};
`;
var TitleBar = dt.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 32px;
  padding: 0 8px;
  background-color: ${(props) => props.$isWindowFocus ? "var(--color-background-mute)" : "var(--color-background-soft)"};
  transition: background-color 0.3s ease;
  -webkit-app-region: drag;
`;
var TitleBarIcon = dt.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`;
var TitleBarCaption = dt.div`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 400;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-1);
`;
var TitleBarButtons = dt.div`
  display: flex;
  gap: 8px;
  -webkit-app-region: no-drag;
  position: relative;

  .lucide {
    &.pinned {
      color: var(--color-primary);
    }
  }
`;
var WinButton = dt(button_default)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 4px;
  transition: all 0.2s;
  color: var(--color-icon);

  .anticon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    stroke-width: 2;
    transition: transform 0.2s ease;
  }

  &.pinned {
    svg {
      transform: rotate(45deg);
    }

    &:hover {
      background-color: var(--color-primary-mute) !important;
    }
  }

  &.close {
    &:hover {
      background-color: var(--color-error) !important;
      color: var(--color-white) !important;
    }
  }

  &.active {
    background-color: var(--color-primary-mute) !important;
    color: var(--color-primary) !important;
  }

  &:hover {
    background-color: var(--color-hover) !important;
    color: var(--color-icon-white) !important;
  }
`;
var MainContainer = dt.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
var Content = dt.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  overflow: auto;
  font-size: 14px;
  -webkit-app-region: none;
  user-select: text;
  /* width: 100%; */
  max-width: 1280px;
`;
var OpacitySlider = dt.div`
  position: absolute;
  left: 42px;
  top: 100%;
  margin-top: 8px;
  background-color: var(--color-background-mute);
  padding: 16px 8px 12px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  height: 120px;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 1 !important;

  .ant-slider {
    height: 100%;
    margin: 0;
  }

  .ant-slider-rail {
    background-color: var(--color-border);
  }

  .ant-slider-track {
    background-color: var(--color-primary);
  }

  .ant-slider-handle {
    border-color: var(--color-primary);

    &:hover {
      border-color: var(--color-primary);
    }

    &.ant-slider-handle-active {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-mute);
    }
  }
`;
var ResizeHandle = dt.div`
  position: absolute;
  -webkit-app-region: no-drag;
  z-index: 10;

  ${({ $direction }) => {
	const edgeSize = "6px";
	const cornerSize = "12px";
	switch ($direction) {
		case "n": return `
          top: 0;
          left: ${cornerSize};
          right: ${cornerSize};
          height: ${edgeSize};
          cursor: ns-resize;
        `;
		case "s": return `
          bottom: 0;
          left: ${cornerSize};
          right: ${cornerSize};
          height: ${edgeSize};
          cursor: ns-resize;
        `;
		case "e": return `
          right: 0;
          top: ${cornerSize};
          bottom: ${cornerSize};
          width: ${edgeSize};
          cursor: ew-resize;
        `;
		case "w": return `
          left: 0;
          top: ${cornerSize};
          bottom: ${cornerSize};
          width: ${edgeSize};
          cursor: ew-resize;
        `;
		case "ne": return `
          top: 0;
          right: 0;
          width: ${cornerSize};
          height: ${cornerSize};
          cursor: nesw-resize;
        `;
		case "nw": return `
          top: 0;
          left: 0;
          width: ${cornerSize};
          height: ${cornerSize};
          cursor: nwse-resize;
        `;
		case "se": return `
          bottom: 0;
          right: 0;
          width: ${cornerSize};
          height: ${cornerSize};
          cursor: nwse-resize;
        `;
		case "sw": return `
          bottom: 0;
          left: 0;
          width: ${cornerSize};
          height: ${cornerSize};
          cursor: nesw-resize;
        `;
		default: return "";
	}
}}
`;
var SelectionActionApp_default = SelectionActionApp;
loggerService.initWindowSource("SelectionActionWindow");
function initKeyv() {
	window.keyv = new import_lib.default();
	window.keyv.init();
}
initKeyv();
StoreSyncService_default.subscribe();
var App = () => {
	(0, import_react.useEffect)(() => {
		window.toast = getToastUtilities();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store: store_default,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntdProvider_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeStyleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {
			loading: null,
			persistor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionActionApp_default, {})
		}) }) }) })
	});
};
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));

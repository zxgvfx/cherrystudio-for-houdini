import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as LanguageSelect_default } from "./LanguageSelect-CZ6Tj4PS.js";
import { Gr as LoadingOutlined_default, Ho as defaultLanguage, Jt as ArrowLeftOutlined_default, Xo as loggerService, Zo as IpcChannel, bt as EnterOutlined_default, go as i18n_default, n as init_es, on as SwapOutlined_default, ti as CloseOutlined_default, vo as useTranslation } from "./es-CRkf9ice.js";
import { Ds as useDefaultModel, Ei as useHotkeys, Fr as translateText, Gd as input_default, Gs as isAbortError, Gu as classNames, Ha as useTimer, Hp as LanguagesEnum, Hu as runAsyncFunction, Nd as tag_default, Rt as ModelAvatar_default, To as selectMessagesForTopic, Uo as abortCompletion, Vf as isMac, Vr as MessageContent_default, Xc as getDefaultTopic, Xs as ChunkType, Ya as Scrollbar_default, Za as cancelThrottledBlockUpdate, ac as updateOneBlock, ap as createThinkingBlock, ar as MessageErrorBoundary_default, ba as useTheme, cp as AssistantMessageStatus, df as select_default, dp as ThemeMode, ef as divider_default, ep as databases_default, fc as useSettings, ht as replacePromptVariables, i as useAppSelector, in as getUserMessage, jd as typography_default, lp as MessageBlockStatus, n as store_default, nc as getMainTextContent, nf as col_default$1, oc as upsertManyBlocks, pt as ConversationService, qa as useTopicMessages, ro as throttledBlockUpdate, rp as createMainTextBlock, sc as upsertOneBlock, sp as require_lodash, st as fetchChatCompletion, tn as getAssistantMessage, wo as newMessagesActions, wr as useTranslate, ws as useAssistant } from "./store-DxDhJR5y.js";
import { t as require_react } from "./react-1FqkuScD.js";
import { bt as tooltip_default, z as CopyIcon_default } from "./ImageViewer-CM8D5DNp.js";
import { t as CircleArrowLeft } from "./circle-arrow-left-4U9oLhgt.js";
import { t as Copy } from "./copy-uuZbe8cL.js";
import { t as FileText } from "./file-text-BnqUsPef.js";
import { t as Languages } from "./languages-BE3wPVEe.js";
import { t as Lightbulb } from "./lightbulb-6vsiSlWh.js";
import { t as MessageSquare } from "./message-square-CVbMgFXc.js";
import { t as Pin } from "./pin-Bye6ICwE.js";
import { n as dt } from "./styled-components.browser.esm-BcmQ0ilM.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cpik8iNG.js";
var col_default = col_default$1;
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var getMessageBackground = (isBubbleStyle, isAssistantMessage) => isBubbleStyle ? isAssistantMessage ? "transparent" : "var(--chat-background-user)" : void 0;
var MessageItem = ({ message, index, total, route }) => {
	const { messageFont, fontSize } = useSettings();
	const messageContainerRef = (0, import_react.useRef)(null);
	const isAssistantMessage = message.role === "assistant";
	const messageBackground = getMessageBackground(true, isAssistantMessage);
	const maxWidth = "800px";
	if (["summary", "explanation"].includes(route) && index === total - 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContainer, {
		ref: messageContainerRef,
		className: classNames({
			message: true,
			"message-assistant": isAssistantMessage,
			"message-user": !isAssistantMessage
		}),
		style: { maxWidth },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContentContainer, {
			className: "message-content-container",
			style: {
				fontFamily: messageFont === "serif" ? "var(--font-family-serif)" : "var(--font-family)",
				fontSize,
				background: messageBackground
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageErrorBoundary_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent_default, { message }) })
		})
	}, message.id);
};
var MessageContainer = dt.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  transition: background-color 0.3s ease;
  &.message-highlight {
    background-color: var(--color-primary-mute);
  }
  .menubar {
    opacity: 0;
    transition: opacity 0.2s ease;
    &.show {
      opacity: 1;
    }
  }
  &:hover {
    .menubar {
      opacity: 1;
    }
  }
`;
var MessageContentContainer = dt.div`
  max-width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;
var Message_default = (0, import_react.memo)(MessageItem);
await init_es();
var Messages = ({ assistant, topic, route, isOutputted }) => {
	const messages = useTopicMessages(topic.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$3, {
		id: "messages",
		children: [!isOutputted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
			style: { fontSize: 16 },
			spin: true
		}), [...messages].reverse().map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message_default, {
			message,
			index,
			total: messages.length,
			route
		}, message.id))]
	}, assistant.id);
};
var Container$3 = dt(Scrollbar_default)`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding-bottom: 20px;
  overflow-x: hidden;
  min-width: 100%;
  background-color: transparent !important;
`;
var Messages_default = Messages;
var ChatWindow = ({ route, assistant, topic, isOutputted }) => {
	if (!assistant || !topic) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main$2, {
		className: "bubble",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages_default, {
			assistant,
			topic,
			route,
			isOutputted
		})
	});
};
var Main$2 = dt(Scrollbar_default)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: auto;
  -webkit-app-region: none;
  background-color: transparent !important;
  max-height: 100%;
`;
var ChatWindow_default = ChatWindow;
await init_es();
var import_lodash$2 = require_lodash();
var logger$1 = loggerService.withContext("TranslateWindow");
var _targetLanguage = (await databases_default.settings.get({ id: "translate:target:language" }))?.value || LanguagesEnum.zhCN;
var Translate = ({ text }) => {
	const [result, setResult] = (0, import_react.useState)("");
	const [targetLanguage, setTargetLanguage] = (0, import_react.useState)(_targetLanguage);
	const { translateModel } = useDefaultModel();
	const { t } = useTranslation();
	const translatingRef = (0, import_react.useRef)(false);
	const { getLanguageByLangcode } = useTranslate();
	_targetLanguage = targetLanguage;
	const translate = (0, import_react.useCallback)(async () => {
		if (!text.trim() || !translateModel) return;
		if (translatingRef.current) return;
		try {
			translatingRef.current = true;
			await translateText(text, targetLanguage, setResult);
			translatingRef.current = false;
		} catch (error) {
			logger$1.error("Error fetching result:", error);
		} finally {
			translatingRef.current = false;
		}
	}, [
		text,
		targetLanguage,
		translateModel
	]);
	(0, import_react.useEffect)(() => {
		runAsyncFunction(async () => {
			const targetLang = await databases_default.settings.get({ id: "translate:target:language" });
			targetLang && setTargetLanguage(getLanguageByLangcode(targetLang.value));
		});
	}, [getLanguageByLangcode]);
	(0, import_react.useEffect)(() => {
		translate();
	}, [translate]);
	useHotkeys("c", () => {
		navigator.clipboard.writeText(result);
		window.toast.success(t("message.copy.success"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(select_default, {
			showSearch: true,
			value: "any",
			style: {
				maxWidth: 200,
				minWidth: 100,
				flex: 1
			},
			optionFilterProp: "label",
			disabled: true,
			options: [{
				label: t("translate.any.language"),
				value: "any"
			}]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapOutlined_default, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
			showSearch: true,
			value: targetLanguage.langCode,
			style: {
				maxWidth: 200,
				minWidth: 130,
				flex: 1
			},
			optionFilterProp: "label",
			onChange: async (value) => {
				await databases_default.settings.put({
					id: "translate:target:language",
					value
				});
				setTargetLanguage(getLanguageByLangcode(value));
			}
		})
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main$1, { children: (0, import_lodash$2.isEmpty)(result) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LoadingText, { children: [t("translate.output.placeholder"), "..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultText, { children: result }) }) })] });
};
var Container$2 = dt.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px;
  /* padding-right: 0; */
  overflow: hidden;
  -webkit-app-region: none;
`;
var Main$1 = dt.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
`;
var ResultText = dt.div`
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;
var LoadingText = dt.div`
  color: var(--color-text-2);
  font-style: italic;
`;
var MenuContainer = dt.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  gap: 20px;
`;
var OutputContainer = dt(Scrollbar_default)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;
var TranslateWindow_default = Translate;
init_es();
var { Paragraph } = typography_default;
var ClipboardPreview = ({ referenceText, clearClipboard, t }) => {
	if (!referenceText) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClipboardContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, {
			style: {
				fontSize: "14px",
				flexShrink: 0,
				cursor: "pointer"
			},
			className: "nodrag"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paragraph, {
			ellipsis: { rows: 2 },
			style: {
				margin: "0 12px",
				fontSize: 12,
				flex: 1,
				minWidth: 0
			},
			className: "nodrag",
			children: referenceText || t("miniwindow.clipboard.empty")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
			onClick: clearClipboard,
			className: "nodrag",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseOutlined_default, { style: { fontSize: "14px" } })
		})
	] }) });
};
var Container$1 = dt.div`
  padding: 12px;
  background-color: var(--color-background-opacity);
  border-radius: 8px;
  margin-bottom: 10px;
`;
var ClipboardContent = dt.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--color-text-secondary);
`;
var CloseButton = dt.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: var(--color-text);
  }
`;
var ClipboardPreview_default = ClipboardPreview;
init_es();
var FeatureMenus = ({ ref, text, setRoute, onSendMessage }) => {
	const { t } = useTranslation();
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const features = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.chat"),
			active: true,
			onClick: () => {
				if (text) {
					setRoute("chat");
					onSendMessage();
				}
			}
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.translate"),
			onClick: () => text && setRoute("translate")
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.summary"),
			onClick: () => {
				if (text) {
					setRoute("summary");
					onSendMessage(t("prompts.summarize"));
				}
			}
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
				size: 16,
				color: "var(--color-text)"
			}),
			title: t("miniwindow.feature.explanation"),
			onClick: () => {
				if (text) {
					setRoute("explanation");
					onSendMessage(t("prompts.explanation"));
				}
			}
		}
	], [
		onSendMessage,
		setRoute,
		t,
		text
	]);
	(0, import_react.useImperativeHandle)(ref, () => ({
		nextFeature() {
			setSelectedIndex((prev) => prev < features.length - 1 ? prev + 1 : 0);
		},
		prevFeature() {
			setSelectedIndex((prev) => prev > 0 ? prev - 1 : features.length - 1);
		},
		useFeature() {
			features[selectedIndex].onClick?.();
		},
		resetSelectedIndex() {
			setSelectedIndex(0);
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureList, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureListWrapper, { children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(col_default, {
		span: 24,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
			onClick: feature.onClick,
			className: index === selectedIndex ? "active" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureIcon, { children: feature.icon }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTitle, { children: feature.title }),
				index === selectedIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterOutlined_default, {})
			]
		})
	}, index)) }) });
};
FeatureMenus.displayName = "FeatureMenus";
var FeatureList = dt(Scrollbar_default)`
  flex-shrink: 0;
  height: auto;
  -webkit-app-region: none;
`;
var FeatureListWrapper = dt.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
`;
var FeatureItem = dt.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: background-color 0s;
  background: transparent;
  border: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  -webkit-app-region: none;
  border-radius: 8px;
  user-select: none;

  &:hover {
    background: var(--color-background-mute);
  }

  &.active {
    background: var(--color-background-mute);
  }
`;
var FeatureIcon = dt.div`
  color: #fff;
  display: flex;
`;
var FeatureTitle = dt.h3`
  margin: 0;
  font-size: 14px;
  flex-basis: 100%;
`;
var FeatureMenus_default = FeatureMenus;
init_es();
var Footer = ({ route, canUseBackspace, loading, clearClipboard, onEsc, setIsPinned, isPinned, onCopy }) => {
	const { t } = useTranslation();
	useHotkeys("esc", () => {
		onEsc();
	});
	useHotkeys("c", () => {
		handleCopy();
	});
	const handleCopy = () => {
		if (loading || !onCopy) return;
		onCopy();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WindowFooter, {
		className: "drag",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterText, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingOutlined_default, {
					style: {
						fontSize: 12,
						color: "var(--color-error)",
						padding: 0
					},
					spin: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowLeft, {
					size: 14,
					color: "var(--color-text)"
				}),
				className: "nodrag",
				onClick: onEsc,
				children: t("miniwindow.footer.esc", { action: loading ? t("miniwindow.footer.esc_pause") : route === "home" ? t("miniwindow.footer.esc_close") : t("miniwindow.footer.esc_back") })
			}),
			route === "home" && !canUseBackspace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftOutlined_default, {}),
				style: { cursor: "pointer" },
				className: "nodrag",
				onClick: () => clearClipboard(),
				children: t("miniwindow.footer.backspace_clear")
			}),
			route !== "home" && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				bordered: false,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					size: 14,
					color: "var(--color-text)"
				}),
				style: { cursor: "pointer" },
				className: "nodrag",
				onClick: handleCopy,
				children: t("miniwindow.footer.copy_last_message")
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinButtonArea, {
			onClick: () => setIsPinned(!isPinned),
			className: "nodrag",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tooltip_default, {
				title: t("miniwindow.tooltip.pin"),
				mouseEnterDelay: .8,
				placement: "left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
					size: 14,
					stroke: isPinned ? "var(--color-primary)" : "var(--color-text)",
					style: {
						transform: isPinned ? "rotate(40deg)" : "rotate(0deg)",
						transition: "transform 0.2s ease-in-out"
					}
				})
			})
		})]
	});
};
var WindowFooter = dt.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
  color: var(--color-text-secondary);
  font-size: 12px;
`;
var FooterText = dt.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 12px;
`;
var PinButtonArea = dt.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 5px;
`;
var Tag = dt(tag_default)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-background-soft);
    color: var(--color-primary);
  }
`;
var Footer_default = Footer;
var InputBar = ({ ref, text, assistant, placeholder, loading, handleKeyDown, handleChange }) => {
	const inputRef = (0, import_react.useRef)(null);
	const { setTimeoutTimer } = useTimer();
	if (!loading) setTimeoutTimer("focus", () => inputRef.current?.input?.focus(), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputWrapper, {
		ref,
		children: [assistant.model && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
			model: assistant.model,
			size: 30
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: text,
			placeholder,
			variant: "borderless",
			autoFocus: true,
			onKeyDown: handleKeyDown,
			onChange: handleChange,
			ref: inputRef
		})]
	});
};
InputBar.displayName = "InputBar";
var InputWrapper = dt.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
var Input = dt(input_default)`
  background: none;
  border: none;
  -webkit-app-region: none;
  font-size: 18px;
`;
var InputBar_default = InputBar;
var import_lodash = require_lodash();
var import_lodash$1 = require_lodash();
var logger = loggerService.withContext("HomeWindow");
var HomeWindow = ({ draggable = true }) => {
	const { language, readClipboardAtStartup, windowStyle } = useSettings();
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [route, setRoute] = (0, import_react.useState)("home");
	const [isFirstMessage, setIsFirstMessage] = (0, import_react.useState)(true);
	const [userInputText, setUserInputText] = (0, import_react.useState)("");
	const [clipboardText, setClipboardText] = (0, import_react.useState)("");
	const lastClipboardTextRef = (0, import_react.useRef)(null);
	const [isPinned, setIsPinned] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isOutputted, setIsOutputted] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { quickAssistantId } = useAppSelector((state) => state.llm);
	const { assistant: currentAssistant } = useAssistant(quickAssistantId);
	const currentTopic = (0, import_react.useRef)(getDefaultTopic(currentAssistant.id));
	const currentAskId = (0, import_react.useRef)("");
	const inputBarRef = (0, import_react.useRef)(null);
	const featureMenusRef = (0, import_react.useRef)(null);
	const referenceText = (0, import_react.useMemo)(() => clipboardText || userInputText, [clipboardText, userInputText]);
	const userContent = (0, import_react.useMemo)(() => {
		if (isFirstMessage) return referenceText === userInputText ? userInputText : `${referenceText}\n\n${userInputText}`.trim();
		return userInputText.trim();
	}, [
		isFirstMessage,
		referenceText,
		userInputText
	]);
	(0, import_react.useEffect)(() => {
		i18n_default.changeLanguage(language || navigator.language || "en-US");
	}, [language]);
	(0, import_react.useEffect)(() => {
		if (route === "home") {
			setIsFirstMessage(true);
			setError(null);
		}
	}, [route]);
	const focusInput = (0, import_react.useCallback)(() => {
		if (inputBarRef.current) {
			const input = inputBarRef.current.querySelector("input");
			if (input) input.focus();
		}
	}, []);
	const readClipboard = (0, import_react.useCallback)(async () => {
		if (!readClipboardAtStartup || !document.hasFocus()) return;
		try {
			const text = await navigator.clipboard.readText();
			if (text && text !== lastClipboardTextRef.current) {
				lastClipboardTextRef.current = text;
				setClipboardText(text.trim());
			}
		} catch (error$1) {
			logger.warn("Failed to read clipboard:", error$1);
		}
	}, [readClipboardAtStartup]);
	const clearClipboard = (0, import_react.useCallback)(async () => {
		setClipboardText("");
		lastClipboardTextRef.current = null;
		focusInput();
	}, [focusInput]);
	const onWindowShow = (0, import_react.useCallback)(async () => {
		await readClipboard();
		focusInput();
	}, [readClipboard, focusInput]);
	(0, import_react.useEffect)(() => {
		window.api.miniWindow.setPin(isPinned);
	}, [isPinned]);
	(0, import_react.useEffect)(() => {
		window.electron.ipcRenderer.on(IpcChannel.ShowMiniWindow, onWindowShow);
		return () => {
			window.electron.ipcRenderer.removeAllListeners(IpcChannel.ShowMiniWindow);
		};
	}, [onWindowShow]);
	(0, import_react.useEffect)(() => {
		readClipboard();
	}, [readClipboard]);
	const handleCloseWindow = (0, import_react.useCallback)(() => window.api.miniWindow.hide(), []);
	const handleKeyDown = (e) => {
		if (e.nativeEvent.isComposing || e.key === "Process") return;
		switch (e.code) {
			case "Enter":
			case "NumpadEnter":
				if (isLoading) return;
				e.preventDefault();
				if (userContent) if (route === "home") featureMenusRef.current?.useFeature();
				else {
					setRoute("chat");
					handleSendMessage();
					focusInput();
				}
				break;
			case "Backspace":
				if (userInputText.length === 0) clearClipboard();
				break;
			case "ArrowUp":
				if (route === "home") {
					e.preventDefault();
					featureMenusRef.current?.prevFeature();
				}
				break;
			case "ArrowDown":
				if (route === "home") {
					e.preventDefault();
					featureMenusRef.current?.nextFeature();
				}
				break;
			case "Escape":
				handleEsc();
				break;
		}
	};
	const handleChange = (e) => {
		setUserInputText(e.target.value);
	};
	const handleError = (error$1) => {
		setIsLoading(false);
		setError(error$1.message);
	};
	const handleSendMessage = (0, import_react.useCallback)(async (prompt) => {
		if ((0, import_lodash.isEmpty)(userContent) || !currentTopic.current) return;
		try {
			const topicId = currentTopic.current.id;
			const { message: userMessage, blocks } = getUserMessage({
				content: [prompt, userContent].filter(Boolean).join("\n\n"),
				assistant: currentAssistant,
				topic: currentTopic.current
			});
			store_default.dispatch(newMessagesActions.addMessage({
				topicId,
				message: userMessage
			}));
			store_default.dispatch(upsertManyBlocks(blocks));
			const assistantMessage = getAssistantMessage({
				assistant: currentAssistant,
				topic: currentTopic.current
			});
			assistantMessage.askId = userMessage.id;
			currentAskId.current = userMessage.id;
			store_default.dispatch(newMessagesActions.addMessage({
				topicId,
				message: assistantMessage
			}));
			const allMessagesForTopic = selectMessagesForTopic(store_default.getState(), topicId);
			const userMessageIndex = allMessagesForTopic.findIndex((m) => m?.id === userMessage.id);
			const messagesForContext = allMessagesForTopic.slice(0, userMessageIndex + 1).filter((m) => m && !m.status?.includes("ing"));
			let blockId = null;
			let thinkingBlockId = null;
			let thinkingStartTime = null;
			const resolveThinkingDuration = (duration) => {
				if (typeof duration === "number" && Number.isFinite(duration)) return duration;
				if (thinkingStartTime !== null) return Math.max(0, performance.now() - thinkingStartTime);
				return 0;
			};
			setIsLoading(true);
			setIsOutputted(false);
			setError(null);
			setIsFirstMessage(false);
			setUserInputText("");
			const newAssistant = (0, import_lodash.cloneDeep)(currentAssistant);
			if (!newAssistant.settings) newAssistant.settings = {};
			newAssistant.settings.streamOutput = true;
			newAssistant.webSearchProviderId = void 0;
			newAssistant.mcpServers = void 0;
			newAssistant.knowledge_bases = void 0;
			newAssistant.prompt = await replacePromptVariables(currentAssistant.prompt, currentAssistant?.model.name);
			const { modelMessages, uiMessages } = await ConversationService.prepareMessagesForModel(messagesForContext, newAssistant);
			await fetchChatCompletion({
				messages: modelMessages,
				assistant: newAssistant,
				requestOptions: {},
				topicId,
				uiMessages,
				onChunkReceived: (chunk) => {
					switch (chunk.type) {
						case ChunkType.THINKING_START:
							setIsOutputted(true);
							thinkingStartTime = performance.now();
							if (thinkingBlockId) store_default.dispatch(updateOneBlock({
								id: thinkingBlockId,
								changes: { status: MessageBlockStatus.STREAMING }
							}));
							else {
								const block = createThinkingBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
								thinkingBlockId = block.id;
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { blockInstruction: { id: block.id } }
								}));
								store_default.dispatch(upsertOneBlock(block));
							}
							break;
						case ChunkType.THINKING_DELTA:
							setIsOutputted(true);
							if (thinkingBlockId) {
								if (thinkingStartTime === null) thinkingStartTime = performance.now();
								const thinkingDuration = resolveThinkingDuration(chunk.thinking_millsec);
								throttledBlockUpdate(thinkingBlockId, {
									content: chunk.text,
									thinking_millsec: thinkingDuration
								});
							}
							break;
						case ChunkType.THINKING_COMPLETE:
							if (thinkingBlockId) {
								const thinkingDuration = resolveThinkingDuration(chunk.thinking_millsec);
								cancelThrottledBlockUpdate(thinkingBlockId);
								store_default.dispatch(updateOneBlock({
									id: thinkingBlockId,
									changes: {
										status: MessageBlockStatus.SUCCESS,
										thinking_millsec: thinkingDuration
									}
								}));
							}
							thinkingStartTime = null;
							thinkingBlockId = null;
							break;
						case ChunkType.TEXT_START:
							setIsOutputted(true);
							if (blockId) store_default.dispatch(updateOneBlock({
								id: blockId,
								changes: { status: MessageBlockStatus.STREAMING }
							}));
							else {
								const block = createMainTextBlock(assistantMessage.id, "", { status: MessageBlockStatus.STREAMING });
								blockId = block.id;
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { blockInstruction: { id: block.id } }
								}));
								store_default.dispatch(upsertOneBlock(block));
							}
							break;
						case ChunkType.TEXT_DELTA:
							setIsOutputted(true);
							if (blockId) throttledBlockUpdate(blockId, { content: chunk.text });
							break;
						case ChunkType.TEXT_COMPLETE:
							if (blockId) {
								cancelThrottledBlockUpdate(blockId);
								store_default.dispatch(updateOneBlock({
									id: blockId,
									changes: {
										content: chunk.text,
										status: MessageBlockStatus.SUCCESS
									}
								}));
							}
							break;
						case ChunkType.ERROR: {
							const isAborted = isAbortError(chunk.error);
							const possibleBlockId = thinkingBlockId || blockId;
							if (possibleBlockId) {
								store_default.dispatch(updateOneBlock({
									id: possibleBlockId,
									changes: { status: isAborted ? MessageBlockStatus.PAUSED : MessageBlockStatus.ERROR }
								}));
								store_default.dispatch(newMessagesActions.updateMessage({
									topicId,
									messageId: assistantMessage.id,
									updates: { status: isAborted ? AssistantMessageStatus.PAUSED : AssistantMessageStatus.SUCCESS }
								}));
							}
							if (!isAborted) throw new Error(chunk.error.message);
							thinkingStartTime = null;
							thinkingBlockId = null;
						}
						case ChunkType.BLOCK_COMPLETE:
							setIsLoading(false);
							setIsOutputted(true);
							currentAskId.current = "";
							store_default.dispatch(newMessagesActions.updateMessage({
								topicId,
								messageId: assistantMessage.id,
								updates: { status: AssistantMessageStatus.SUCCESS }
							}));
							break;
					}
				}
			});
		} catch (err) {
			if (isAbortError(err)) return;
			handleError(err instanceof Error ? err : /* @__PURE__ */ new Error("An error occurred"));
			logger.error("Error fetching result:", err);
		} finally {
			setIsLoading(false);
			setIsOutputted(true);
			currentAskId.current = "";
		}
	}, [userContent, currentAssistant]);
	const handlePause = (0, import_react.useCallback)(() => {
		if (currentAskId.current) {
			abortCompletion(currentAskId.current);
			setIsLoading(false);
			setIsOutputted(true);
			currentAskId.current = "";
		}
	}, []);
	const handleEsc = (0, import_react.useCallback)(() => {
		if (isLoading) handlePause();
		else if (route === "home") handleCloseWindow();
		else {
			if (currentTopic.current) store_default.dispatch(newMessagesActions.clearTopicMessages(currentTopic.current.id));
			currentTopic.current = getDefaultTopic(currentAssistant.id);
			featureMenusRef.current?.resetSelectedIndex();
			setError(null);
			setRoute("home");
			setUserInputText("");
		}
	}, [
		isLoading,
		route,
		handleCloseWindow,
		currentAssistant.id,
		handlePause
	]);
	const handleCopy = (0, import_react.useCallback)(() => {
		if (!currentTopic.current) return;
		const lastMessage = (0, import_lodash$1.last)(selectMessagesForTopic(store_default.getState(), currentTopic.current.id));
		if (lastMessage) {
			const content = getMainTextContent(lastMessage);
			navigator.clipboard.writeText(content);
			window.toast.success(t("message.copy.success"));
		}
	}, [currentTopic, t]);
	const backgroundColor = (0, import_react.useMemo)(() => {
		if (isMac && windowStyle === "transparent" && theme === ThemeMode.light) return "transparent";
		return "var(--color-background)";
	}, [windowStyle, theme]);
	const inputPlaceholder = (0, import_react.useMemo)(() => {
		if (referenceText && route === "home") return t("miniwindow.input.placeholder.title");
		return t("miniwindow.input.placeholder.empty", { model: quickAssistantId ? currentAssistant.name : currentAssistant.model.name });
	}, [
		referenceText,
		route,
		t,
		quickAssistantId,
		currentAssistant
	]);
	const baseFooterProps = (0, import_react.useMemo)(() => ({
		route,
		loading: isLoading,
		onEsc: handleEsc,
		setIsPinned,
		isPinned
	}), [
		route,
		isLoading,
		handleEsc,
		isPinned
	]);
	switch (route) {
		case "chat":
		case "summary":
		case "explanation": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				route === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBar_default, {
					text: userInputText,
					assistant: currentAssistant,
					referenceText,
					placeholder: inputPlaceholder,
					loading: isLoading,
					handleKeyDown,
					handleChange,
					ref: inputBarRef
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } })] }),
				["summary", "explanation"].includes(route) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: 10 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPreview_default, {
						referenceText,
						clearClipboard,
						t
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWindow_default, {
					route,
					assistant: currentAssistant,
					topic: currentTopic.current,
					isOutputted
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMsg, { children: error }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, {
					...baseFooterProps,
					onCopy: handleCopy
				}, "footer")
			]
		});
		case "translate": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslateWindow_default, { text: referenceText }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, { ...baseFooterProps }, "footer")
			]
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			style: { backgroundColor },
			$draggable: draggable,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBar_default, {
					text: userInputText,
					assistant: currentAssistant,
					referenceText,
					placeholder: inputPlaceholder,
					loading: isLoading,
					handleKeyDown,
					handleChange,
					ref: inputBarRef
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPreview_default, {
					referenceText,
					clearClipboard,
					t
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureMenus_default, {
					setRoute,
					onSendMessage: handleSendMessage,
					text: userContent,
					ref: featureMenusRef
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(divider_default, { style: { margin: "10px 0" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, {
					...baseFooterProps,
					canUseBackspace: userInputText.length > 0 || clipboardText.length === 0,
					clearClipboard
				}, "footer")
			]
		});
	}
};
var Container = dt.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  flex-direction: column;
  -webkit-app-region: ${({ $draggable }) => $draggable ? "drag" : "no-drag"};
  padding: 8px 10px;
`;
var Main = dt.main`
  display: flex;
  flex-direction: column;

  flex: 1;
  overflow: hidden;
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
var HomeWindow_default = HomeWindow;
export { col_default as n, HomeWindow_default as t };

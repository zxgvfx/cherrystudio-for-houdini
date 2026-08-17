import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const RefreshProvider = (0, import_react.createContext)(null).Provider;
const PartsContext = (0, import_react.createContext)(null);
var EMPTY_MESSAGE_PARTS = [];
var MessagePartsScopeContext = (0, import_react.createContext)(null);
var MessageIdContext = (0, import_react.createContext)(void 0);
function PartsProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartsContext, {
		value,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagePartsScopeContext, {
			value: null,
			children
		})
	});
}
function MessagePartsScopeProvider({ messageId, parts, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageIdContext, {
		value: messageId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagePartsScopeContext, {
			value: (0, import_react.useMemo)(() => ({
				messageId,
				parts
			}), [messageId, parts]),
			children
		})
	});
}
function usePartsMap() {
	return (0, import_react.use)(PartsContext);
}
function useMessagePartsScopeId() {
	return (0, import_react.use)(MessageIdContext);
}
function parseBlockId(blockId) {
	const lastBlockDash = blockId.lastIndexOf("-block-");
	if (lastBlockDash === -1) return null;
	const messageId = blockId.slice(0, lastBlockDash);
	const index = parseInt(blockId.slice(lastBlockDash + 7), 10);
	if (isNaN(index)) return null;
	return {
		messageId,
		index
	};
}
const TranslationOverlayContext = (0, import_react.createContext)(null);
const TranslationOverlayProvider = TranslationOverlayContext.Provider;
const TranslationOverlaySetterProvider = (0, import_react.createContext)(null).Provider;
function useTranslationOverlayEntry(messageId) {
	return (0, import_react.use)(TranslationOverlayContext)?.[messageId];
}
function useMessageParts(messageId) {
	const scope = (0, import_react.use)(MessagePartsScopeContext);
	if (scope?.messageId === messageId) return scope.parts;
	return (0, import_react.use)(PartsContext)?.[messageId] ?? EMPTY_MESSAGE_PARTS;
}
function resolvePartFromParts(partsMap, partId) {
	let parsed = parseBlockId(partId);
	if (!parsed) {
		const lastPartDash = partId.lastIndexOf("-part-");
		if (lastPartDash !== -1) {
			const messageId = partId.slice(0, lastPartDash);
			const index = parseInt(partId.slice(lastPartDash + 6), 10);
			if (!isNaN(index)) parsed = {
				messageId,
				index
			};
		}
	}
	if (!parsed) return null;
	const parts = partsMap[parsed.messageId];
	if (!parts || parsed.index >= parts.length) return null;
	return {
		part: parts[parsed.index],
		messageId: parsed.messageId,
		index: parsed.index
	};
}
export { TranslationOverlayProvider as a, useMessageParts as c, useTranslationOverlayEntry as d, RefreshProvider as i, useMessagePartsScopeId as l, PartsContext as n, TranslationOverlaySetterProvider as o, PartsProvider as r, resolvePartFromParts as s, MessagePartsScopeProvider as t, usePartsMap as u };

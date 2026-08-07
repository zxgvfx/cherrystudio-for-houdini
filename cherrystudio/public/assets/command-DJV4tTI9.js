import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { r as DefaultPreferences } from "./PreferenceService-Ba0ofBX2.js";
import { o as platform, r as isMac } from "./platform-YWZQ2_mC.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-78czMD_R.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const ContextKeySnapshotContext = (0, import_react.createContext)(null);
const ContextKeyRegisterContext = (0, import_react.createContext)(null);
const rendererPlatform = platform ?? "unknown";
var fallbackSnapshot = new Map([["platform", rendererPlatform]]);
function useCommandContextSnapshot() {
	return (0, import_react.use)(ContextKeySnapshotContext) ?? fallbackSnapshot;
}
function useCommandContextReader() {
	return useCommandContextSnapshot();
}
var logger = loggerService.withContext("useCommandRuntime");
var EMPTY_SHORTCUT_PREFERENCES = {};
var NO_OP_RUNTIME = {
	execute: (command) => logger.warn(`No renderer command runtime mounted: ${command}`),
	hasHandler: () => false,
	registerHandler: () => () => {}
};
const CommandRuntimeContext = (0, import_react.createContext)(null);
const CommandSharedPreferencesContext = (0, import_react.createContext)(null);
function useCommandRuntime() {
	return (0, import_react.use)(CommandRuntimeContext) ?? NO_OP_RUNTIME;
}
function useCommandHandler(command, handler, options) {
	const runtime = useCommandRuntime();
	const handlerRef = (0, import_react.useRef)(handler);
	handlerRef.current = handler;
	const enabled = options?.enabled !== false;
	(0, import_react.useEffect)(() => {
		return runtime.registerHandler(command, () => handlerRef.current(), { enabled });
	}, [
		command,
		enabled,
		runtime
	]);
}
function useCommandShortcutPreferences() {
	return (0, import_react.use)(CommandSharedPreferencesContext)?.shortcutPreferences ?? EMPTY_SHORTCUT_PREFERENCES;
}
function useCommandMenuPresentationMode() {
	return (0, import_react.use)(CommandSharedPreferencesContext)?.menuPresentationMode;
}
var DNF_TERM_LIMIT = 64;
var ContextExprParseError = class extends Error {
	constructor(message, source, position) {
		super(`${message} at ${position} in "${source}"`);
		this.source = source;
		this.position = position;
		this.name = "ContextExprParseError";
	}
};
var isIdentifierStart = (char) => /[A-Za-z_]/.test(char);
var isIdentifierPart = (char) => /[A-Za-z0-9_.:-]/.test(char);
var tokenize = (source) => {
	const tokens = [];
	let index = 0;
	const fail = (message) => {
		throw new ContextExprParseError(message, source, index);
	};
	while (index < source.length) {
		const char = source[index];
		if (/\s/.test(char)) {
			index++;
			continue;
		}
		const two = source.slice(index, index + 2);
		if (two === "&&" || two === "||" || two === "==" || two === "!=") {
			tokens.push({
				type: "operator",
				value: two
			});
			index += 2;
			continue;
		}
		if (char === "!" || char === "(" || char === ")") {
			tokens.push({
				type: "operator",
				value: char
			});
			index++;
			continue;
		}
		if (char === "'" || char === "\"") {
			const quote = char;
			let value = "";
			let closed = false;
			index++;
			while (index < source.length) {
				const next = source[index];
				if (next === quote) {
					index++;
					tokens.push({
						type: "string",
						value
					});
					closed = true;
					break;
				}
				if (next === "\\") {
					const escaped = source[index + 1];
					if (escaped == null) fail("Unterminated string literal");
					value += escaped;
					index += 2;
					continue;
				}
				value += next;
				index++;
			}
			if (!closed) fail("Unterminated string literal");
			continue;
		}
		if (/[0-9]/.test(char)) {
			const start = index;
			while (index < source.length && /[0-9.]/.test(source[index])) index++;
			const raw = source.slice(start, index);
			const value = Number(raw);
			if (!Number.isFinite(value)) fail(`Invalid number "${raw}"`);
			tokens.push({
				type: "number",
				value
			});
			continue;
		}
		if (isIdentifierStart(char)) {
			const start = index;
			index++;
			while (index < source.length && isIdentifierPart(source[index])) index++;
			const value = source.slice(start, index);
			if (value === "true" || value === "false") tokens.push({
				type: "boolean",
				value: value === "true"
			});
			else tokens.push({
				type: "identifier",
				value
			});
			continue;
		}
		fail(`Unexpected token "${char}"`);
	}
	tokens.push({ type: "eof" });
	return tokens;
};
var Parser = class {
	index = 0;
	constructor(source, tokens) {
		this.source = source;
		this.tokens = tokens;
	}
	parse() {
		const expr = this.parseOr();
		if (this.peek().type !== "eof") this.fail("Unexpected trailing token");
		return expr;
	}
	parseOr() {
		const exprs = [this.parseAnd()];
		while (this.matchOperator("||")) exprs.push(this.parseAnd());
		return exprs.length === 1 ? exprs[0] : {
			type: "or",
			exprs
		};
	}
	parseAnd() {
		const exprs = [this.parseEquality()];
		while (this.matchOperator("&&")) exprs.push(this.parseEquality());
		return exprs.length === 1 ? exprs[0] : {
			type: "and",
			exprs
		};
	}
	parseEquality() {
		const left = this.parseUnary();
		const operator = this.matchOperator("==") ? "==" : this.matchOperator("!=") ? "!=" : null;
		if (!operator) return left;
		if (left.type !== "key") this.fail("Left side of equality must be a context key");
		const value = this.parseLiteral();
		return operator === "==" ? {
			type: "equals",
			key: left.key,
			value
		} : {
			type: "notEquals",
			key: left.key,
			value
		};
	}
	parseUnary() {
		if (this.matchOperator("!")) return {
			type: "not",
			expr: this.parseUnary()
		};
		return this.parsePrimary();
	}
	parsePrimary() {
		const token = this.peek();
		if (token.type === "identifier") {
			this.index++;
			return {
				type: "key",
				key: token.value
			};
		}
		if (this.matchOperator("(")) {
			const expr = this.parseOr();
			this.expectOperator(")");
			return expr;
		}
		this.fail("Expected context key or grouped expression");
	}
	parseLiteral() {
		const token = this.peek();
		if (token.type === "string" || token.type === "number" || token.type === "boolean") {
			this.index++;
			return token.value;
		}
		this.fail("Expected literal");
	}
	peek() {
		return this.tokens[this.index];
	}
	matchOperator(value) {
		const token = this.peek();
		if (token.type === "operator" && token.value === value) {
			this.index++;
			return true;
		}
		return false;
	}
	expectOperator(value) {
		if (!this.matchOperator(value)) this.fail(`Expected "${value}"`);
	}
	fail(message) {
		throw new ContextExprParseError(message, this.source, this.index);
	}
};
const parseContextExpr = (source) => {
	const trimmed = source.trim();
	if (!trimmed) throw new ContextExprParseError("Empty context expression", source, 0);
	return new Parser(trimmed, tokenize(trimmed)).parse();
};
var readContextValue = (context, key) => {
	if (typeof context === "function") return context(key);
	if (context instanceof Map) return context.get(key);
	return context[key];
};
const evaluateContextExpr = (expr, context) => {
	if (!expr) return true;
	switch (expr.type) {
		case "key": return Boolean(readContextValue(context, expr.key));
		case "not": return !evaluateContextExpr(expr.expr, context);
		case "and": return expr.exprs.every((item) => evaluateContextExpr(item, context));
		case "or": return expr.exprs.some((item) => evaluateContextExpr(item, context));
		case "equals": return readContextValue(context, expr.key) === expr.value;
		case "notEquals": return readContextValue(context, expr.key) !== expr.value;
	}
};
var createConstraint = (patch) => ({
	notEquals: [],
	...patch
});
var cloneTerm = (term) => {
	const next = /* @__PURE__ */ new Map();
	for (const [key, constraint] of term) next.set(key, {
		...constraint,
		notEquals: [...constraint.notEquals]
	});
	return next;
};
var valuesEqual = (left, right) => left === right;
var mergeConstraint = (left, right) => {
	const next = {
		polarity: left.polarity,
		equals: left.equals,
		notEquals: [...left.notEquals]
	};
	if (right.polarity) {
		if (next.polarity && next.polarity !== right.polarity) return;
		next.polarity = right.polarity;
	}
	if (right.equals !== void 0) {
		if (next.equals !== void 0 && !valuesEqual(next.equals, right.equals)) return;
		if (next.notEquals.some((value) => valuesEqual(value, right.equals))) return;
		next.equals = right.equals;
	}
	for (const value of right.notEquals) {
		if (next.equals !== void 0 && valuesEqual(next.equals, value)) return;
		if (!next.notEquals.some((item) => valuesEqual(item, value))) next.notEquals.push(value);
	}
	if (next.equals !== void 0 && next.polarity) {
		const isTruthy = Boolean(next.equals);
		if (next.polarity === "truthy" && !isTruthy || next.polarity === "falsy" && isTruthy) return;
	}
	return next;
};
var mergeTerm = (left, right) => {
	const next = cloneTerm(left);
	for (const [key, rightConstraint] of right) {
		const leftConstraint = next.get(key);
		if (!leftConstraint) {
			next.set(key, {
				...rightConstraint,
				notEquals: [...rightConstraint.notEquals]
			});
			continue;
		}
		const merged = mergeConstraint(leftConstraint, rightConstraint);
		if (!merged) return;
		next.set(key, merged);
	}
	return next;
};
var mergeDnfTerms = (left, right) => {
	if (!left || !right) return;
	const result = [];
	for (const leftTerm of left) for (const rightTerm of right) {
		if (result.length >= DNF_TERM_LIMIT) return;
		const merged = mergeTerm(leftTerm, rightTerm);
		if (merged) result.push(merged);
	}
	return result;
};
var concatDnfTerms = (left, right) => {
	if (!left || !right) return;
	if (left.length + right.length > DNF_TERM_LIMIT) return;
	return [...left, ...right];
};
var singleConstraintTerm = (key, constraint) => [new Map([[key, constraint]])];
var toDnfTerms = (expr, negated = false) => {
	if (!expr) return negated ? [] : [/* @__PURE__ */ new Map()];
	switch (expr.type) {
		case "key": return singleConstraintTerm(expr.key, createConstraint({ polarity: negated ? "falsy" : "truthy" }));
		case "equals": return singleConstraintTerm(expr.key, negated ? createConstraint({ notEquals: [expr.value] }) : createConstraint({ equals: expr.value }));
		case "notEquals": return singleConstraintTerm(expr.key, negated ? createConstraint({ equals: expr.value }) : createConstraint({ notEquals: [expr.value] }));
		case "not": return toDnfTerms(expr.expr, !negated);
		case "and":
			if (negated) return expr.exprs.reduce((acc, item) => concatDnfTerms(acc, toDnfTerms(item, true)), []);
			return expr.exprs.reduce((acc, item) => mergeDnfTerms(acc, toDnfTerms(item)), [/* @__PURE__ */ new Map()]);
		case "or":
			if (negated) return expr.exprs.reduce((acc, item) => mergeDnfTerms(acc, toDnfTerms(item, true)), [/* @__PURE__ */ new Map()]);
			return expr.exprs.reduce((acc, item) => concatDnfTerms(acc, toDnfTerms(item)), []);
	}
};
const canContextExprsOverlap = (left, right) => {
	const leftTerms = toDnfTerms(left);
	const rightTerms = toDnfTerms(right);
	if (!leftTerms || !rightTerms) return true;
	if (leftTerms.length === 0 || rightTerms.length === 0) return false;
	for (const leftTerm of leftTerms) for (const rightTerm of rightTerms) if (mergeTerm(leftTerm, rightTerm)) return true;
	return false;
};
var ContextKeyService = class {
	values = /* @__PURE__ */ new Map();
	get(key) {
		return this.values.get(key);
	}
	set(key, value) {
		if (value === void 0) {
			this.values.delete(key);
			return;
		}
		this.values.set(key, value);
	}
	update(values) {
		for (const [key, value] of Object.entries(values)) this.set(key, value);
	}
	evaluate(expr) {
		return evaluateContextExpr(expr, this.values);
	}
	snapshot() {
		return new Map(this.values);
	}
};
var defineCommand = (definition) => definition;
const COMMAND_DEFINITIONS = [
	defineCommand({
		id: "app.fullscreen.exit",
		titleKey: "settings.shortcuts.exit_fullscreen",
		categoryKey: "settings.shortcuts.general",
		scope: "renderer",
		keybinding: {
			defaultBinding: ["Escape"],
			editable: false
		}
	}),
	defineCommand({
		id: "app.search",
		titleKey: "settings.shortcuts.search_message",
		categoryKey: "settings.shortcuts.general",
		scope: "renderer",
		keybinding: { defaultBinding: [
			"CommandOrControl",
			"Shift",
			"F"
		] }
	}),
	defineCommand({
		id: "app.print",
		titleKey: "settings.shortcuts.print",
		categoryKey: "settings.shortcuts.general",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "P"] }
	}),
	defineCommand({
		id: "app.sidebar.toggle",
		titleKey: "settings.shortcuts.toggle_left_sidebar",
		categoryKey: "settings.shortcuts.topic",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "["] }
	}),
	defineCommand({
		id: "app.settings.open",
		titleKey: "settings.shortcuts.show_settings",
		categoryKey: "settings.shortcuts.general",
		scope: "main",
		keybinding: {
			defaultBinding: ["CommandOrControl", ","],
			editable: false
		}
	}),
	defineCommand({
		id: "app.window.show",
		titleKey: "settings.shortcuts.show_app",
		categoryKey: "settings.shortcuts.general",
		scope: "main",
		keybinding: {
			defaultBinding: [],
			global: true
		}
	}),
	defineCommand({
		id: "app.zoom.in",
		titleKey: "settings.shortcuts.zoom_in",
		categoryKey: "settings.shortcuts.general",
		scope: "main",
		keybinding: {
			defaultBinding: ["CommandOrControl", "="],
			additionalBindings: [["CommandOrControl", "numadd"]],
			editable: false
		}
	}),
	defineCommand({
		id: "app.zoom.out",
		titleKey: "settings.shortcuts.zoom_out",
		categoryKey: "settings.shortcuts.general",
		scope: "main",
		keybinding: {
			defaultBinding: ["CommandOrControl", "-"],
			additionalBindings: [["CommandOrControl", "numsub"]],
			editable: false
		}
	}),
	defineCommand({
		id: "app.zoom.reset",
		titleKey: "settings.shortcuts.zoom_reset",
		categoryKey: "settings.shortcuts.general",
		scope: "main",
		keybinding: {
			defaultBinding: ["CommandOrControl", "0"],
			editable: false
		}
	}),
	defineCommand({
		id: "chat.context.toggle_new",
		titleKey: "settings.shortcuts.toggle_new_context",
		categoryKey: "settings.shortcuts.chat",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "K"] }
	}),
	defineCommand({
		id: "chat.message.copy_last",
		titleKey: "settings.shortcuts.copy_last_message",
		categoryKey: "settings.shortcuts.chat",
		scope: "renderer",
		keybinding: { defaultBinding: [
			"CommandOrControl",
			"Shift",
			"C"
		] }
	}),
	defineCommand({
		id: "chat.message.edit_last_user",
		titleKey: "settings.shortcuts.edit_last_user_message",
		categoryKey: "settings.shortcuts.chat",
		scope: "renderer",
		keybinding: { defaultBinding: [
			"CommandOrControl",
			"Shift",
			"E"
		] }
	}),
	defineCommand({
		id: "chat.message.search",
		titleKey: "settings.shortcuts.search_message_in_chat",
		categoryKey: "settings.shortcuts.chat",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "F"] }
	}),
	defineCommand({
		id: "chat.model.select",
		titleKey: "settings.shortcuts.select_model",
		categoryKey: "settings.shortcuts.chat",
		scope: "renderer",
		keybinding: { defaultBinding: [
			"CommandOrControl",
			"Shift",
			"M"
		] }
	}),
	defineCommand({
		id: "quick_assistant.toggle",
		titleKey: "settings.shortcuts.quick_assistant",
		categoryKey: "settings.shortcuts.feature.quick_assistant",
		scope: "main",
		enablement: "feature.quick_assistant.enabled",
		keybinding: {
			defaultBinding: ["CommandOrControl", "E"],
			global: true,
			when: "feature.quick_assistant.enabled"
		}
	}),
	defineCommand({
		id: "selection.capture_text",
		titleKey: "settings.shortcuts.selection_assistant_select_text",
		categoryKey: "settings.shortcuts.feature.selection",
		scope: "main",
		enablement: "feature.selection.enabled",
		keybinding: {
			defaultBinding: [],
			global: true,
			when: "feature.selection.enabled",
			supportedPlatforms: [
				"darwin",
				"win32",
				"linux"
			]
		}
	}),
	defineCommand({
		id: "selection.toggle",
		titleKey: "settings.shortcuts.selection_assistant_toggle",
		categoryKey: "settings.shortcuts.feature.selection",
		scope: "main",
		enablement: "feature.selection.enabled",
		keybinding: {
			defaultBinding: [],
			global: true,
			when: "feature.selection.enabled",
			supportedPlatforms: [
				"darwin",
				"win32",
				"linux"
			]
		}
	}),
	defineCommand({
		id: "topic.create",
		titleKey: "settings.shortcuts.new_topic",
		categoryKey: "settings.shortcuts.topic",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "N"] }
	}),
	defineCommand({
		id: "topic.rename",
		titleKey: "settings.shortcuts.rename_topic",
		categoryKey: "settings.shortcuts.topic",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "T"] }
	}),
	defineCommand({
		id: "topic.sidebar.toggle",
		titleKey: "settings.shortcuts.toggle_right_sidebar",
		categoryKey: "settings.shortcuts.topic",
		scope: "renderer",
		keybinding: { defaultBinding: ["CommandOrControl", "]"] }
	})
];
const commandShortcutPreferenceKey = (command) => `shortcut.${command}`;
const KEYBINDING_RULES = COMMAND_DEFINITIONS.flatMap((definition) => definition.keybinding ? [{
	command: definition.id,
	scope: definition.scope,
	...definition.keybinding
}] : []);
var registerCommand = (definition) => ({
	id: definition.id,
	titleKey: definition.titleKey,
	categoryKey: definition.categoryKey,
	scope: definition.scope,
	iconKey: definition.iconKey,
	enablement: definition.enablement ? parseContextExpr(definition.enablement) : void 0,
	enablementSource: definition.enablement
});
var registerKeybinding = (rule) => ({
	...rule,
	preferenceKey: commandShortcutPreferenceKey(rule.command),
	when: rule.when ? parseContextExpr(rule.when) : void 0,
	whenSource: rule.when
});
const REGISTERED_COMMANDS = COMMAND_DEFINITIONS.map(registerCommand);
const REGISTERED_KEYBINDINGS = KEYBINDING_RULES.map(registerKeybinding);
var commandMap = new Map(REGISTERED_COMMANDS.map((definition) => [definition.id, definition]));
var keybindingMap = new Map(REGISTERED_KEYBINDINGS.map((rule) => [rule.command, rule]));
const findCommandDefinition = (id) => commandMap.get(id);
const findKeybindingRule = (id) => keybindingMap.get(id);
const SHORTCUT_MODIFIERS = [
	"CommandOrControl",
	"Command",
	"Ctrl",
	"Alt",
	"AltGr",
	"Shift",
	"Meta"
];
const SHORTCUT_LETTERS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
];
const SHORTCUT_DIGITS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
const SHORTCUT_FUNCTION_KEYS = [
	"F1",
	"F2",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12"
];
const SHORTCUT_SYMBOLS = [
	"=",
	"-",
	"[",
	"]",
	",",
	".",
	"/",
	"\\",
	";",
	"'",
	"`"
];
const SHORTCUT_NAMED_KEYS = [
	"Escape",
	"Enter",
	"Tab",
	"Space",
	"Backspace",
	"Delete",
	"Insert",
	"Home",
	"End",
	"PageUp",
	"PageDown",
	"Up",
	"Down",
	"Left",
	"Right",
	"numadd",
	"numsub"
];
var shortcutTokens = [
	...SHORTCUT_MODIFIERS,
	...SHORTCUT_LETTERS,
	...SHORTCUT_DIGITS,
	...SHORTCUT_FUNCTION_KEYS,
	...SHORTCUT_SYMBOLS,
	...SHORTCUT_NAMED_KEYS
];
var shortcutTokenSet = new Set(shortcutTokens);
var shortcutModifierSet = new Set(SHORTCUT_MODIFIERS);
var shortcutFunctionKeySet = new Set(SHORTCUT_FUNCTION_KEYS);
var shortcutTokenLowerCaseMap = new Map(shortcutTokens.map((token) => [token.toLowerCase(), token]));
var keyAliases = {
	Cmd: "Command",
	cmd: "Command",
	Command: "Command",
	command: "Command",
	Control: "Ctrl",
	control: "Ctrl",
	ctrl: "Ctrl",
	Option: "Alt",
	option: "Alt",
	AltGraph: "AltGr",
	altgraph: "AltGr",
	Esc: "Escape",
	esc: "Escape",
	Spacebar: "Space",
	spacebar: "Space",
	ArrowUp: "Up",
	ArrowDown: "Down",
	ArrowLeft: "Left",
	ArrowRight: "Right",
	Add: "numadd",
	NumpadAdd: "numadd",
	Subtract: "numsub",
	NumpadSubtract: "numsub",
	Slash: "/",
	Semicolon: ";",
	BracketLeft: "[",
	BracketRight: "]",
	Backslash: "\\",
	Quote: "'",
	Comma: ",",
	Period: ".",
	Minus: "-",
	Equal: "=",
	Backquote: "`"
};
var domCodeToToken = {
	NumpadEnter: "Enter",
	NumpadAdd: "numadd",
	NumpadSubtract: "numsub"
};
const isShortcutToken = (value) => typeof value === "string" && shortcutTokenSet.has(value);
const isShortcutModifier = (value) => typeof value === "string" && shortcutModifierSet.has(value);
const isShortcutFunctionKey = (value) => typeof value === "string" && shortcutFunctionKeySet.has(value);
const normalizeShortcutToken = (value) => {
	const trimmed = value.trim();
	if (!trimmed) return void 0;
	if (isShortcutToken(trimmed)) return trimmed;
	if (keyAliases[trimmed]) return keyAliases[trimmed];
	const canonicalToken = shortcutTokenLowerCaseMap.get(trimmed.toLowerCase());
	if (canonicalToken) return canonicalToken;
	if (domCodeToToken[trimmed]) return domCodeToToken[trimmed];
	const letterMatch = trimmed.match(/^Key([A-Z])$/);
	if (letterMatch) return letterMatch[1];
	const digitMatch = trimmed.match(/^(?:Digit|Numpad)(\d)$/);
	if (digitMatch) return digitMatch[1];
	const upper = trimmed.toUpperCase();
	if (/^[A-Z]$/.test(upper) && isShortcutToken(upper)) return upper;
	if (/^F(?:[1-9]|1[0-2])$/.test(upper) && isShortcutToken(upper)) return upper;
	const lower = trimmed.toLowerCase();
	if (lower === "commandorcontrol") return "CommandOrControl";
	if (lower === "altgr") return "AltGr";
	if (lower === "numadd") return "numadd";
	if (lower === "numsub") return "numsub";
};
const normalizeShortcutBinding = (value) => {
	if (!Array.isArray(value)) return [];
	const tokens = [];
	for (const item of value) {
		if (typeof item !== "string") return [];
		const token = normalizeShortcutToken(item);
		if (!token) return [];
		tokens.push(token);
	}
	return tokens;
};
const isShortcutBinding = (value) => {
	if (!Array.isArray(value)) return false;
	return value.every(isShortcutToken);
};
var acceleratorKeyMap = {
	Command: "CommandOrControl",
	Cmd: "CommandOrControl",
	Control: "Ctrl",
	Meta: "Meta",
	ArrowUp: "Up",
	ArrowDown: "Down",
	ArrowLeft: "Left",
	ArrowRight: "Right",
	AltGraph: "AltGr",
	Slash: "/",
	Semicolon: ";",
	BracketLeft: "[",
	BracketRight: "]",
	Backslash: "\\",
	Quote: "'",
	Comma: ",",
	Minus: "-",
	Equal: "="
};
const convertKeyToAccelerator = (key) => acceleratorKeyMap[key] ?? normalizeShortcutToken(key);
const formatKeyDisplay = (key, isMac$1) => {
	switch (key.toLowerCase()) {
		case "ctrl":
		case "control": return isMac$1 ? "⌃" : "Ctrl";
		case "command":
		case "cmd": return isMac$1 ? "⌘" : "Win";
		case "commandorcontrol": return isMac$1 ? "⌘" : "Ctrl";
		case "alt": return isMac$1 ? "⌥" : "Alt";
		case "altgr": return "AltGr";
		case "shift": return isMac$1 ? "⇧" : "Shift";
		case "meta": return isMac$1 ? "⌘" : "Win";
		default: return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
	}
};
const formatShortcutDisplay = (keys, isMac$1) => {
	return keys.map((key) => formatKeyDisplay(key, isMac$1)).join(isMac$1 ? "" : "+");
};
const isValidShortcut = (binding) => {
	if (!binding.length || !isShortcutBinding(binding)) return false;
	if (new Set(binding).size !== binding.length) return false;
	const hasModifier = binding.some(isShortcutModifier);
	const hasNonModifier = binding.some((key) => !isShortcutModifier(key));
	const isSpecialKey = binding.length === 1 && (binding[0] === "Escape" || isShortcutFunctionKey(binding[0]));
	return hasModifier && hasNonModifier || isSpecialKey;
};
var isPlatformSupported = (rule, platform$1) => {
	if (!rule.supportedPlatforms?.length || !platform$1) return true;
	return rule.supportedPlatforms.includes(platform$1);
};
var isScopeSupported = (rule, scope) => {
	if (!scope) return true;
	return rule.scope === scope || rule.scope === "both";
};
var scopesOverlap = (left, right) => left === right || left === "both" || right === "both";
var platformsOverlap = (left, right, platform$1) => {
	if (platform$1) {
		const leftSupportsPlatform = !left?.length || left.includes(platform$1);
		const rightSupportsPlatform = !right?.length || right.includes(platform$1);
		return leftSupportsPlatform && rightSupportsPlatform;
	}
	if (!left?.length || !right?.length) return true;
	return left.some((item) => right.includes(item));
};
var shortcutBindingMatches = (left, right) => {
	if (left.length !== right.length) return false;
	const leftTokens = new Set(left);
	if (leftTokens.size !== right.length) return false;
	return right.every((token) => leftTokens.has(token));
};
var getTriggerBindings = (binding, additionalBindings = []) => [{
	binding,
	trigger: "primary"
}, ...additionalBindings.map((additionalBinding) => ({
	binding: additionalBinding,
	trigger: "additional"
}))];
const getCommandAccelerator = (binding) => {
	if (!binding.length) return;
	return binding.join("+");
};
var getDefaultShortcutPreferenceForRule = (rule) => {
	const fallback = DefaultPreferences.default[rule.preferenceKey];
	return {
		binding: fallback?.binding?.length ? normalizeShortcutBinding(fallback.binding) : rule.defaultBinding,
		enabled: typeof fallback?.enabled === "boolean" ? fallback.enabled : true
	};
};
const getCommandDefaultShortcutPreference = (command) => {
	const rule = findKeybindingRule(command);
	if (!rule) return;
	return getDefaultShortcutPreferenceForRule(rule);
};
const resolveCommandShortcutPreference = (command, preference) => {
	const rule = findKeybindingRule(command);
	if (!rule) return;
	const fallback = getDefaultShortcutPreferenceForRule(rule);
	return {
		binding: preference != null ? preference.binding?.length ? normalizeShortcutBinding(preference.binding) : [] : fallback.binding,
		enabled: typeof preference?.enabled === "boolean" ? preference.enabled : fallback.enabled
	};
};
const resolveCommandKeybinding = ({ command, preference, context, platform: platform$1 }) => {
	const rule = findKeybindingRule(command);
	if (!rule || !isPlatformSupported(rule, platform$1) || !evaluateContextExpr(rule.when, context)) return;
	const shortcutPreference = resolveCommandShortcutPreference(command, preference);
	if (!shortcutPreference) return;
	return {
		command,
		binding: shortcutPreference.binding,
		enabled: shortcutPreference.enabled,
		accelerator: shortcutPreference.enabled ? getCommandAccelerator(shortcutPreference.binding) : void 0,
		additionalBindings: rule.additionalBindings ?? []
	};
};
const resolveCommandByKeybinding = ({ binding, preferences, context, platform: platform$1, scope, canExecuteCommand }) => {
	if (!binding.length) return;
	for (const rule of REGISTERED_KEYBINDINGS) {
		if (!isScopeSupported(rule, scope)) continue;
		if (!isPlatformSupported(rule, platform$1) || !evaluateContextExpr(rule.when, context)) continue;
		if (canExecuteCommand && !canExecuteCommand(rule.command)) continue;
		const resolved = resolveCommandKeybinding({
			command: rule.command,
			preference: preferences?.[rule.command],
			context,
			platform: platform$1
		});
		if (!resolved?.enabled || !resolved.binding.length) continue;
		if ([resolved.binding, ...resolved.additionalBindings].some((triggerBinding) => shortcutBindingMatches(binding, triggerBinding))) return rule.command;
	}
};
const findKeybindingConflicts = ({ command, preference, preferences, platform: platform$1, rules = REGISTERED_KEYBINDINGS }) => {
	const commandRule = rules.find((rule) => rule.command === command);
	if (!commandRule || !preference.enabled || !preference.binding.length || !isPlatformSupported(commandRule, platform$1)) return [];
	const candidateBinding = normalizeShortcutBinding(preference.binding);
	const candidateTriggers = getTriggerBindings(candidateBinding, commandRule.additionalBindings);
	const preferenceLookup = {
		...preferences,
		[command]: {
			...preference,
			binding: candidateBinding
		}
	};
	const conflicts = [];
	for (const rule of rules) {
		if (rule.command === command) continue;
		if (!scopesOverlap(commandRule.scope, rule.scope)) continue;
		if (!platformsOverlap(commandRule.supportedPlatforms, rule.supportedPlatforms, platform$1)) continue;
		if (!canContextExprsOverlap(commandRule.when, rule.when)) continue;
		const conflictingPreference = resolveCommandShortcutPreference(rule.command, preferenceLookup[rule.command]);
		if (!conflictingPreference?.enabled || !conflictingPreference.binding.length) continue;
		const conflictingTriggers = getTriggerBindings(normalizeShortcutBinding(conflictingPreference.binding), rule.additionalBindings);
		for (const candidate of candidateTriggers) for (const conflicting of conflictingTriggers) if (shortcutBindingMatches(candidate.binding, conflicting.binding)) conflicts.push({
			command,
			conflictingCommand: rule.command,
			binding: candidate.binding,
			conflictingBinding: conflicting.binding,
			trigger: candidate.trigger,
			conflictingTrigger: conflicting.trigger
		});
	}
	return conflicts;
};
const resolveMenuPresentationMode = (location, preferredMode) => {
	if (location === "app.menu" || location === "tray.menu") return "native";
	return preferredMode;
};
const MENU_CONTRIBUTIONS = [
	{
		location: "app.menu",
		command: "app.settings.open",
		group: "app",
		order: 10
	},
	{
		location: "app.menu",
		command: "app.zoom.reset",
		group: "view",
		order: 10
	},
	{
		location: "app.menu",
		command: "app.zoom.in",
		group: "view",
		order: 20
	},
	{
		location: "app.menu",
		command: "app.zoom.out",
		group: "view",
		order: 30
	},
	{
		location: "command.palette",
		command: "app.search",
		group: "navigation",
		order: 10
	},
	{
		location: "command.palette",
		command: "topic.create",
		group: "topic",
		order: 10
	},
	{
		location: "chat.input.tools.context",
		command: "topic.create",
		group: "chat",
		order: 10
	},
	{
		location: "chat.input.toolbar",
		command: "topic.create",
		group: "topic",
		order: 10
	}
];
var registerMenuContribution = (contribution) => {
	if (!findCommandDefinition(contribution.command)) throw new Error(`Cannot register menu contribution for unknown command: ${contribution.command}`);
	return {
		...contribution,
		when: contribution.when ? parseContextExpr(contribution.when) : void 0,
		whenSource: contribution.when
	};
};
var resolveContributions = (contributions, { location, context, getCommandState }) => {
	const items = [];
	let previousGroup = null;
	const matched = contributions.filter((contribution) => contribution.location === location).filter((contribution) => evaluateContextExpr(contribution.when, context)).sort((a, b) => a.group.localeCompare(b.group) || a.order - b.order || a.command.localeCompare(b.command));
	for (const contribution of matched) {
		if (previousGroup && previousGroup !== contribution.group) items.push({ type: "separator" });
		const state = getCommandState(contribution.command);
		items.push({
			type: "command",
			command: contribution.command,
			label: state.label,
			enabled: state.enabled,
			checked: state.checked,
			destructive: state.destructive,
			iconKey: state.iconKey,
			shortcutLabel: state.shortcutLabel ?? "",
			accelerator: state.accelerator
		});
		previousGroup = contribution.group;
	}
	return {
		location,
		items
	};
};
var REGISTERED_MENU_CONTRIBUTIONS = MENU_CONTRIBUTIONS.map(registerMenuContribution);
const resolveMenu = (options) => resolveContributions(REGISTERED_MENU_CONTRIBUTIONS, options);
var shortcutPreferenceKeyMap = REGISTERED_KEYBINDINGS.reduce((acc, rule) => {
	acc[rule.command] = rule.preferenceKey;
	return acc;
}, {});
var commandCategoryToSettingsGroup = (categoryKey) => {
	if (categoryKey === "settings.shortcuts.general") return "general";
	if (categoryKey === "settings.shortcuts.chat") return "chat";
	if (categoryKey === "settings.shortcuts.topic") return "topic";
	return "assistant";
};
var buildNextPreference = (state, currentValue, patch) => {
	const current = currentValue ?? {};
	return {
		binding: Array.isArray(patch.binding) ? normalizeShortcutBinding(patch.binding) : Array.isArray(current.binding) ? normalizeShortcutBinding(current.binding) : state.binding,
		enabled: typeof patch.enabled === "boolean" ? patch.enabled : typeof current.enabled === "boolean" ? current.enabled : state.enabled
	};
};
const getAllShortcutDefaultPreferences = () => {
	return REGISTERED_KEYBINDINGS.reduce((acc, rule) => {
		const defaultPreference = getCommandDefaultShortcutPreference(rule.command);
		if (!defaultPreference) return acc;
		acc[rule.preferenceKey] = {
			binding: defaultPreference.binding,
			enabled: defaultPreference.enabled
		};
		return acc;
	}, {});
};
const useCommandShortcuts = () => {
	const { t } = useTranslation();
	const context = useCommandContextReader();
	const [values, setValues] = useMultiplePreferences(shortcutPreferenceKeyMap);
	const updatePreference = (0, import_react.useCallback)(async (key, patch) => {
		const rule = REGISTERED_KEYBINDINGS.find((item) => item.preferenceKey === key);
		if (!rule) return;
		const currentValue = values[rule.command];
		const state = resolveCommandShortcutPreference(rule.command, currentValue);
		if (!state) return;
		const nextValue = buildNextPreference(state, currentValue, patch);
		await setValues({ [rule.command]: nextValue });
	}, [setValues, values]);
	return {
		shortcuts: (0, import_react.useMemo)(() => REGISTERED_KEYBINDINGS.flatMap((rule) => {
			const command = findCommandDefinition(rule.command);
			if (!command) return [];
			const supported = rule.supportedPlatforms;
			if (supported && platform && !supported.includes(platform)) return [];
			if (!evaluateContextExpr(command.enablement, context) || !evaluateContextExpr(rule.when, context)) return [];
			const rawValue = values[rule.command];
			const preference = resolveCommandShortcutPreference(rule.command, rawValue);
			const defaultPreference = getCommandDefaultShortcutPreference(rule.command);
			if (!preference || !defaultPreference) return [];
			return [{
				command: rule.command,
				key: rule.preferenceKey,
				label: t(command.titleKey),
				group: commandCategoryToSettingsGroup(command.categoryKey),
				keybinding: rule,
				preference: {
					binding: preference.binding,
					enabled: preference.enabled && preference.binding.length > 0
				},
				defaultPreference
			}];
		}), [
			context,
			t,
			values
		]),
		updatePreference
	};
};
var getEventKeyToken = (event) => {
	const fromCode = event.code ? convertKeyToAccelerator(event.code) : void 0;
	const fromKey = convertKeyToAccelerator(event.key);
	const token = fromCode ?? fromKey;
	if (token === "CommandOrControl" || token === "Command" || token === "Ctrl" || token === "Alt" || token === "AltGr" || token === "Shift" || token === "Meta") return;
	return token;
};
const getShortcutBindingFromKeyboardEvent = (event, platform$1) => {
	const binding = [];
	if (platform$1 === "darwin") {
		if (event.metaKey) binding.push("CommandOrControl");
		if (event.ctrlKey) binding.push("Ctrl");
	} else {
		if (event.ctrlKey) binding.push("CommandOrControl");
		if (event.metaKey) binding.push(platform$1 ? "Meta" : "CommandOrControl");
	}
	if (event.altKey) binding.push("Alt");
	if (event.shiftKey) binding.push("Shift");
	const keyToken = getEventKeyToken(event);
	if (keyToken) binding.push(keyToken);
	return normalizeShortcutBinding(binding);
};
const getCommandShortcutLabel = (command, preference, options) => {
	const resolved = resolveCommandKeybinding({
		command,
		preference,
		context: options.context,
		platform: options.platform
	});
	if (!resolved?.enabled || !resolved.binding.length) return "";
	return formatShortcutDisplay(resolved.binding, options.isMac);
};
const resolveCommandDisplayState = (command, options) => {
	const { definition, preference, context, hasHandler, translate } = options;
	return {
		label: definition ? translate(definition.titleKey) : command,
		enabled: Boolean(definition && hasHandler(command) && evaluateContextExpr(definition.enablement, context)),
		iconKey: definition?.iconKey,
		shortcutLabel: getCommandShortcutLabel(command, preference, {
			context,
			isMac: options.isMac,
			platform: options.platform
		})
	};
};
function useResolvedCommand(command) {
	const { t } = useTranslation();
	const runtime = useCommandRuntime();
	const context = useCommandContextReader();
	const definition = findCommandDefinition(command);
	const [preference] = usePreference(findKeybindingRule(command)?.preferenceKey ?? "shortcut.topic.create");
	return (0, import_react.useMemo)(() => {
		return {
			id: command,
			...resolveCommandDisplayState(command, {
				definition,
				preference,
				context,
				hasHandler: runtime.hasHandler,
				translate: t,
				isMac,
				platform
			}),
			execute: () => runtime.execute(command)
		};
	}, [
		command,
		context,
		definition,
		preference,
		runtime,
		t
	]);
}
function useResolvedCommandMenu(location) {
	const { t } = useTranslation();
	const runtime = useCommandRuntime();
	const context = useCommandContextReader();
	const shortcutPreferences = useCommandShortcutPreferences();
	return (0, import_react.useMemo)(() => resolveMenu({
		location,
		context,
		getCommandState: (command) => {
			const definition = findCommandDefinition(command);
			const preference = findKeybindingRule(command) ? shortcutPreferences[command] : void 0;
			const keybinding = resolveCommandKeybinding({
				command,
				preference,
				context,
				platform
			});
			return {
				...resolveCommandDisplayState(command, {
					definition,
					preference,
					context,
					hasHandler: runtime.hasHandler,
					translate: t,
					isMac,
					platform
				}),
				accelerator: keybinding?.accelerator
			};
		}
	}), [
		context,
		location,
		runtime,
		shortcutPreferences,
		t
	]);
}
export { useCommandRuntime as C, rendererPlatform as D, ContextKeySnapshotContext as E, useCommandContextReader as O, useCommandMenuPresentationMode as S, ContextKeyRegisterContext as T, findKeybindingRule as _, getAllShortcutDefaultPreferences as a, CommandSharedPreferencesContext as b, findKeybindingConflicts as c, formatKeyDisplay as d, formatShortcutDisplay as f, findCommandDefinition as g, REGISTERED_KEYBINDINGS as h, getShortcutBindingFromKeyboardEvent as i, useCommandContextSnapshot as k, resolveCommandByKeybinding as l, normalizeShortcutToken as m, useResolvedCommand as n, useCommandShortcuts as o, isValidShortcut as p, getCommandShortcutLabel as r, resolveMenuPresentationMode as s, useResolvedCommandMenu as t, convertKeyToAccelerator as u, ContextKeyService as v, useCommandShortcutPreferences as w, useCommandHandler as x, CommandRuntimeContext as y };

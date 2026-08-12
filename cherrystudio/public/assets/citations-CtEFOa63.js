import { s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
import { C as string, _ as object, a as array, g as number, n as _enum, o as boolean, w as union } from "./schemas-CV_EtlSZ.js";
import { d as decodeString, f as handle, g as formatCodeAsIndented, h as encodeCharacterReference, k as visit, p as formatHeadingAsSetext, r as remarkParse, t as unified, v as patternInScope } from "./lib-BGOUa2xQ.js";
import { t as zwitch } from "./zwitch-B7UdpQMH.js";
import { c as isKnowledgeCitation, l as isMemoryCitation, s as ReferenceCategory, u as isWebCitation } from "./message-By01RpZa.js";
import { i as isMcpContentBlock } from "./mcp-UjkdK7II.js";
import { a as isToolUIPart, n as getToolName } from "./dist-DF8MwS3b.js";
import { i as readCherryMeta } from "./uiParts-CtZmiNbl.js";
import { n as objectValues } from "./object-92KyJeQ-.js";
import { t as cleanMarkdownContent } from "./formats-nJh-2jBy.js";
import { s as KnowledgeItemStatusSchema } from "./knowledge-DMDRrLza.js";
import { n as parseFunctionCallToolName } from "./mcpToolName-Cvibldfy.js";
import { i as isDeferredToolOutput, r as isPersistedToolOutput } from "./transport-CTTVYBal.js";
var own = {}.hasOwnProperty;
function configure(base, extension) {
	let index = -1;
	let key;
	if (extension.extensions) while (++index < extension.extensions.length) configure(base, extension.extensions[index]);
	for (key in extension) if (own.call(extension, key)) switch (key) {
		case "extensions": break;
		case "unsafe":
			list(base[key], extension[key]);
			break;
		case "join":
			list(base[key], extension[key]);
			break;
		case "handlers":
			map(base[key], extension[key]);
			break;
		default: base.options[key] = extension[key];
	}
	return base;
}
function list(left, right) {
	if (right) left.push(...right);
}
function map(left, right) {
	if (right) Object.assign(left, right);
}
const join = [joinDefaults];
function joinDefaults(left, right, parent, state) {
	if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) return false;
	if ("spread" in parent && typeof parent.spread === "boolean") {
		if (left.type === "paragraph" && (left.type === right.type || right.type === "definition" || right.type === "heading" && formatHeadingAsSetext(right, state))) return;
		return parent.spread ? 1 : 0;
	}
}
var fullPhrasingSpans = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
const unsafe = [
	{
		character: "	",
		after: "[\\r\\n]",
		inConstruct: "phrasing"
	},
	{
		character: "	",
		before: "[\\r\\n]",
		inConstruct: "phrasing"
	},
	{
		character: "	",
		inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
	},
	{
		character: "\r",
		inConstruct: [
			"codeFencedLangGraveAccent",
			"codeFencedLangTilde",
			"codeFencedMetaGraveAccent",
			"codeFencedMetaTilde",
			"destinationLiteral",
			"headingAtx"
		]
	},
	{
		character: "\n",
		inConstruct: [
			"codeFencedLangGraveAccent",
			"codeFencedLangTilde",
			"codeFencedMetaGraveAccent",
			"codeFencedMetaTilde",
			"destinationLiteral",
			"headingAtx"
		]
	},
	{
		character: " ",
		after: "[\\r\\n]",
		inConstruct: "phrasing"
	},
	{
		character: " ",
		before: "[\\r\\n]",
		inConstruct: "phrasing"
	},
	{
		character: " ",
		inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
	},
	{
		character: "!",
		after: "\\[",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		character: "\"",
		inConstruct: "titleQuote"
	},
	{
		atBreak: true,
		character: "#"
	},
	{
		character: "#",
		inConstruct: "headingAtx",
		after: "(?:[\r\n]|$)"
	},
	{
		character: "&",
		after: "[#A-Za-z]",
		inConstruct: "phrasing"
	},
	{
		character: "'",
		inConstruct: "titleApostrophe"
	},
	{
		character: "(",
		inConstruct: "destinationRaw"
	},
	{
		before: "\\]",
		character: "(",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		atBreak: true,
		before: "\\d+",
		character: ")"
	},
	{
		character: ")",
		inConstruct: "destinationRaw"
	},
	{
		atBreak: true,
		character: "*",
		after: "(?:[ 	\r\n*])"
	},
	{
		character: "*",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		atBreak: true,
		character: "+",
		after: "(?:[ 	\r\n])"
	},
	{
		atBreak: true,
		character: "-",
		after: "(?:[ 	\r\n-])"
	},
	{
		atBreak: true,
		before: "\\d+",
		character: ".",
		after: "(?:[ 	\r\n]|$)"
	},
	{
		atBreak: true,
		character: "<",
		after: "[!/?A-Za-z]"
	},
	{
		character: "<",
		after: "[!/?A-Za-z]",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		character: "<",
		inConstruct: "destinationLiteral"
	},
	{
		atBreak: true,
		character: "="
	},
	{
		atBreak: true,
		character: ">"
	},
	{
		character: ">",
		inConstruct: "destinationLiteral"
	},
	{
		atBreak: true,
		character: "["
	},
	{
		character: "[",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		character: "[",
		inConstruct: ["label", "reference"]
	},
	{
		character: "\\",
		after: "[\\r\\n]",
		inConstruct: "phrasing"
	},
	{
		character: "]",
		inConstruct: ["label", "reference"]
	},
	{
		atBreak: true,
		character: "_"
	},
	{
		character: "_",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		atBreak: true,
		character: "`"
	},
	{
		character: "`",
		inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
	},
	{
		character: "`",
		inConstruct: "phrasing",
		notInConstruct: fullPhrasingSpans
	},
	{
		atBreak: true,
		character: "~"
	}
];
function association(node) {
	if (node.label || !node.identifier) return node.label || "";
	return decodeString(node.identifier);
}
function compilePattern(pattern) {
	if (!pattern._compiled) {
		const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
		pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""), "g");
	}
	return pattern._compiled;
}
function containerPhrasing(parent, state, info) {
	const indexStack = state.indexStack;
	const children = parent.children || [];
	const results = [];
	let index = -1;
	let before = info.before;
	let encodeAfter;
	indexStack.push(-1);
	let tracker = state.createTracker(info);
	while (++index < children.length) {
		const child = children[index];
		let after;
		indexStack[indexStack.length - 1] = index;
		if (index + 1 < children.length) {
			let handle$1 = state.handle.handlers[children[index + 1].type];
			if (handle$1 && handle$1.peek) handle$1 = handle$1.peek;
			after = handle$1 ? handle$1(children[index + 1], parent, state, {
				before: "",
				after: "",
				...tracker.current()
			}).charAt(0) : "";
		} else after = info.after;
		if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
			results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
			before = " ";
			tracker = state.createTracker(info);
			tracker.move(results.join(""));
		}
		let value = state.handle(child, parent, state, {
			...tracker.current(),
			after,
			before
		});
		if (encodeAfter && encodeAfter === value.slice(0, 1)) value = encodeCharacterReference(encodeAfter.charCodeAt(0)) + value.slice(1);
		const encodingInfo = state.attentionEncodeSurroundingInfo;
		state.attentionEncodeSurroundingInfo = void 0;
		encodeAfter = void 0;
		if (encodingInfo) {
			if (results.length > 0 && encodingInfo.before && before === results[results.length - 1].slice(-1)) results[results.length - 1] = results[results.length - 1].slice(0, -1) + encodeCharacterReference(before.charCodeAt(0));
			if (encodingInfo.after) encodeAfter = after;
		}
		tracker.move(value);
		results.push(value);
		before = value.slice(-1);
	}
	indexStack.pop();
	return results.join("");
}
function containerFlow(parent, state, info) {
	const indexStack = state.indexStack;
	const children = parent.children || [];
	const tracker = state.createTracker(info);
	const results = [];
	let index = -1;
	indexStack.push(-1);
	while (++index < children.length) {
		const child = children[index];
		indexStack[indexStack.length - 1] = index;
		results.push(tracker.move(state.handle(child, parent, state, {
			before: "\n",
			after: "\n",
			...tracker.current()
		})));
		if (child.type !== "list") state.bulletLastUsed = void 0;
		if (index < children.length - 1) results.push(tracker.move(between(child, children[index + 1], parent, state)));
	}
	indexStack.pop();
	return results.join("");
}
function between(left, right, parent, state) {
	let index = state.join.length;
	while (index--) {
		const result = state.join[index](left, right, parent, state);
		if (result === true || result === 1) break;
		if (typeof result === "number") return "\n".repeat(1 + result);
		if (result === false) return "\n\n<!---->\n\n";
	}
	return "\n\n";
}
var eol = /\r?\n|\r/g;
function indentLines(value, map$1) {
	const result = [];
	let start = 0;
	let line = 0;
	let match;
	while (match = eol.exec(value)) {
		one(value.slice(start, match.index));
		result.push(match[0]);
		start = match.index + match[0].length;
		line++;
	}
	one(value.slice(start));
	return result.join("");
	function one(value$1) {
		result.push(map$1(value$1, line, !value$1));
	}
}
function safe(state, input, config) {
	const value = (config.before || "") + (input || "") + (config.after || "");
	const positions = [];
	const result = [];
	const infos = {};
	let index = -1;
	while (++index < state.unsafe.length) {
		const pattern = state.unsafe[index];
		if (!patternInScope(state.stack, pattern)) continue;
		const expression = state.compilePattern(pattern);
		let match;
		while (match = expression.exec(value)) {
			const before = "before" in pattern || Boolean(pattern.atBreak);
			const after = "after" in pattern;
			const position = match.index + (before ? match[1].length : 0);
			if (positions.includes(position)) {
				if (infos[position].before && !before) infos[position].before = false;
				if (infos[position].after && !after) infos[position].after = false;
			} else {
				positions.push(position);
				infos[position] = {
					before,
					after
				};
			}
		}
	}
	positions.sort(numerical);
	let start = config.before ? config.before.length : 0;
	const end = value.length - (config.after ? config.after.length : 0);
	index = -1;
	while (++index < positions.length) {
		const position = positions[index];
		if (position < start || position >= end) continue;
		if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after || positions[index - 1] === position - 1 && infos[position].before && !infos[position - 1].before && !infos[position - 1].after) continue;
		if (start !== position) result.push(escapeBackslashes(value.slice(start, position), "\\"));
		start = position;
		if (/[!-/:-@[-`{-~]/.test(value.charAt(position)) && (!config.encode || !config.encode.includes(value.charAt(position)))) result.push("\\");
		else {
			result.push(encodeCharacterReference(value.charCodeAt(position)));
			start++;
		}
	}
	result.push(escapeBackslashes(value.slice(start, end), config.after));
	return result.join("");
}
function numerical(a, b) {
	return a - b;
}
function escapeBackslashes(value, after) {
	const expression = /\\(?=[!-/:-@[-`{-~])/g;
	const positions = [];
	const results = [];
	const whole = value + after;
	let index = -1;
	let start = 0;
	let match;
	while (match = expression.exec(whole)) positions.push(match.index);
	while (++index < positions.length) {
		if (start !== positions[index]) results.push(value.slice(start, positions[index]));
		results.push("\\");
		start = positions[index];
	}
	results.push(value.slice(start));
	return results.join("");
}
function track(config) {
	/* c8 ignore next 5 */
	const options = config || {};
	const now = options.now || {};
	let lineShift = options.lineShift || 0;
	let line = now.line || 1;
	let column = now.column || 1;
	return {
		move,
		current,
		shift
	};
	function current() {
		return {
			now: {
				line,
				column
			},
			lineShift
		};
	}
	function shift(value) {
		lineShift += value;
	}
	function move(input) {
		const value = input || "";
		const chunks = value.split(/\r?\n|\r/g);
		const tail = chunks[chunks.length - 1];
		line += chunks.length - 1;
		column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
		return value;
	}
}
function toMarkdown(tree, options) {
	const settings = options || {};
	const state = {
		associationId: association,
		containerPhrasing: containerPhrasingBound,
		containerFlow: containerFlowBound,
		createTracker: track,
		compilePattern,
		enter,
		handlers: { ...handle },
		handle: void 0,
		indentLines,
		indexStack: [],
		join: [...join],
		options: {},
		safe: safeBound,
		stack: [],
		unsafe: [...unsafe]
	};
	configure(state, settings);
	if (state.options.tightDefinitions) state.join.push(joinDefinition);
	state.handle = zwitch("type", {
		invalid,
		unknown,
		handlers: state.handlers
	});
	let result = state.handle(tree, void 0, state, {
		before: "\n",
		after: "\n",
		now: {
			line: 1,
			column: 1
		},
		lineShift: 0
	});
	if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) result += "\n";
	return result;
	function enter(name) {
		state.stack.push(name);
		return exit;
		function exit() {
			state.stack.pop();
		}
	}
}
function invalid(value) {
	throw new Error("Cannot handle value `" + value + "`, expected node");
}
function unknown(value) {
	const node = value;
	throw new Error("Cannot handle unknown node `" + node.type + "`");
}
function joinDefinition(left, right) {
	if (left.type === "definition" && left.type === right.type) return 0;
}
function containerPhrasingBound(parent, info) {
	return containerPhrasing(parent, this, info);
}
function containerFlowBound(parent, info) {
	return containerFlow(parent, this, info);
}
function safeBound(value, config) {
	return safe(this, value, config);
}
function remarkStringify(options) {
	const self = this;
	self.compiler = compiler;
	function compiler(tree) {
		return toMarkdown(tree, {
			...self.data("settings"),
			...options,
			extensions: self.data("toMarkdownExtensions") || []
		});
	}
}
var import_remove_markdown = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(md, options) {
		options = options || {};
		options.listUnicodeChar = options.hasOwnProperty("listUnicodeChar") ? options.listUnicodeChar : false;
		options.stripListLeaders = options.hasOwnProperty("stripListLeaders") ? options.stripListLeaders : true;
		options.gfm = options.hasOwnProperty("gfm") ? options.gfm : true;
		options.useImgAltText = options.hasOwnProperty("useImgAltText") ? options.useImgAltText : true;
		options.abbr = options.hasOwnProperty("abbr") ? options.abbr : false;
		options.replaceLinksWithURL = options.hasOwnProperty("replaceLinksWithURL") ? options.replaceLinksWithURL : false;
		options.htmlTagsToSkip = options.hasOwnProperty("htmlTagsToSkip") ? options.htmlTagsToSkip : [];
		options.throwError = options.hasOwnProperty("throwError") ? options.throwError : false;
		var output = md || "";
		output = output.replace(/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/gm, "");
		try {
			if (options.stripListLeaders) if (options.listUnicodeChar) output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + " $1");
			else output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1");
			if (options.gfm) output = output.replace(/\n={2,}/g, "\n").replace(/~{3}.*\n/g, "").replace(/~~/g, "").replace(/```(?:.*)\n([\s\S]*?)```/g, (_, code) => code.trim());
			if (options.abbr) output = output.replace(/\*\[.*\]:.*\n/, "");
			let htmlReplaceRegex = /<[^>]*>/g;
			if (options.htmlTagsToSkip && options.htmlTagsToSkip.length > 0) {
				const joinedHtmlTagsToSkip = options.htmlTagsToSkip.join("|");
				htmlReplaceRegex = new RegExp(`<(?!\/?(${joinedHtmlTagsToSkip})(?=>|\s[^>]*>))[^>]*>`, "g");
			}
			output = output.replace(htmlReplaceRegex, "").replace(/^[=\-]{2,}\s*$/g, "").replace(/\[\^.+?\](\: .*?$)?/g, "").replace(/\s{0,2}\[.*?\]: .*?$/g, "").replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? "$1" : "").replace(/\[([\s\S]*?)\]\s*[\(\[].*?[\)\]]/g, options.replaceLinksWithURL ? "$2" : "$1").replace(/^(\n)?\s{0,3}>\s?/gm, "$1").replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "").replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, "$1$3$4$6").replace(/([\*]+)(\S)(.*?\S)??\1/g, "$2$3").replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, "$1$3$4$5").replace(/(`{3,})(.*?)\1/gm, "$2").replace(/`(.+?)`/g, "$1").replace(/~(.*?)~/g, "$1");
		} catch (e) {
			if (options.throwError) throw e;
			console.error("remove-markdown encountered error: %s", e);
			return md;
		}
		return output;
	};
})))());
const findCitationInChildren = (children) => {
	if (!children) return "";
	for (const child of Array.isArray(children) ? children : [children]) {
		if (typeof child === "object" && child?.props?.["data-citation"]) return child.props["data-citation"];
		if (typeof child === "object" && child?.props?.children) {
			const found = findCitationInChildren(child.props.children);
			if (found) return found;
		}
	}
	return "";
};
var containsLatexRegex = /\\\(.*?\\\)|\\\[.*?\\\]/s;
const processLatexBrackets = (text) => {
	if (!containsLatexRegex.test(text)) return text;
	const protectedItems = [];
	let processedContent = text;
	processedContent = processedContent.replace(/(```[\s\S]*?```|`[^`]*`)/g, (match) => {
		const index = protectedItems.length;
		protectedItems.push(match);
		return `__CHERRY_STUDIO_PROTECTED_${index}__`;
	}).replace(/\[([^[\]]*(?:\[[^\]]*\][^[\]]*)*)\]\([^)]*?\)/g, (match) => {
		const index = protectedItems.length;
		protectedItems.push(match);
		return `__CHERRY_STUDIO_PROTECTED_${index}__`;
	});
	const processMath = (content, openDelim, closeDelim, wrapper) => {
		let result$1 = "";
		let remaining = content;
		while (remaining.length > 0) {
			const match = findLatexMatch(remaining, openDelim, closeDelim);
			if (!match) {
				result$1 += remaining;
				break;
			}
			result$1 += match.pre;
			result$1 += `${wrapper}${match.body}${wrapper}`;
			remaining = match.post;
		}
		return result$1;
	};
	let result = processMath(processedContent, "\\[", "\\]", "$$");
	result = processMath(result, "\\(", "\\)", "$");
	result = result.replace(/__CHERRY_STUDIO_PROTECTED_(\d+)__/g, (match, indexStr) => {
		const index = parseInt(indexStr, 10);
		if (index >= 0 && index < protectedItems.length) return protectedItems[index];
		return match;
	});
	return result;
};
var findLatexMatch = (text, openDelim, closeDelim) => {
	const escaped = (i) => {
		let count = 0;
		while (--i >= 0 && text[i] === "\\") count++;
		return count & 1;
	};
	for (let i = 0, n = text.length; i <= n - openDelim.length; i++) {
		if (!text.startsWith(openDelim, i) || escaped(i)) continue;
		for (let j = i + openDelim.length, depth = 1; j <= n - closeDelim.length && depth; j++) {
			const delta = text.startsWith(openDelim, j) && !escaped(j) ? 1 : text.startsWith(closeDelim, j) && !escaped(j) ? -1 : 0;
			if (delta) {
				depth += delta;
				if (!depth) return {
					start: i,
					end: j + closeDelim.length,
					pre: text.slice(0, i),
					body: text.slice(i + openDelim.length, j),
					post: text.slice(j + closeDelim.length)
				};
				j += (delta > 0 ? openDelim : closeDelim).length - 1;
			}
		}
	}
	return null;
};
function convertMathFormula(input) {
	if (!input) return input;
	let result = input;
	result = result.replaceAll("\\[", "$$$$").replaceAll("\\]", "$$$$");
	result = result.replaceAll("\\(", "$$").replaceAll("\\)", "$$");
	return result;
}
function removeTrailingDoubleSpaces(markdown) {
	return markdown.replace(/ {2}$/gm, "");
}
function getCodeBlockId(start) {
	return start ? `${start.line}:${start.column}:${start.offset}` : null;
}
function updateCodeBlock(raw, id, newContent) {
	const tree = unified().use(remarkParse).parse(raw);
	visit(tree, "code", (node) => {
		const startIndex = getCodeBlockId(node.position?.start);
		if (startIndex && id && startIndex === id) node.value = newContent;
	});
	return unified().use(remarkStringify).stringify(tree);
}
const markdownToPlainText = (markdown) => {
	if (!markdown) return "";
	return (0, import_remove_markdown.default)(markdown);
};
const purifyMarkdownImages = (markdown) => {
	return markdown.replace(/(!\[[^\]]*\]\()\s*data:image\/[\w+.-]+;base64\s*,[\w+/=]+(?:\s*[\w+/=]+)*\s*\)/gi, "$1image_url)");
};
function convertReferencesToCitationReferences(references, blockId) {
	const citations = references.filter((ref) => ref.category === ReferenceCategory.CITATION);
	if (citations.length === 0) return void 0;
	return citations.map((ref) => ({
		citationBlockId: blockId,
		citationBlockSource: isWebCitation(ref) ? ref.content?.source ?? void 0 : void 0
	}));
}
function toHostOrUrl$1(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
function extractOpenRouterContent(entry) {
	if (!entry.providerMetadata || typeof entry.providerMetadata !== "object") return void 0;
	const providerMetadata = entry.providerMetadata;
	if (!providerMetadata.openrouter || typeof providerMetadata.openrouter !== "object") return void 0;
	const openrouterMeta = providerMetadata.openrouter;
	return typeof openrouterMeta.content === "string" ? openrouterMeta.content : void 0;
}
function readExplicitCitationNumber(entry) {
	const value = entry.number;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}
function normalizeWebResult(result) {
	if (typeof result === "string") return {
		number: 0,
		url: result,
		title: toHostOrUrl$1(result),
		showFavicon: true,
		type: "websearch"
	};
	if (!result || typeof result !== "object") return null;
	const entry = result;
	const openAiUrlCitation = entry.url_citation && typeof entry.url_citation === "object" ? entry.url_citation : void 0;
	const webEntry = entry.web && typeof entry.web === "object" ? entry.web : void 0;
	const url = typeof entry.url === "string" && entry.url || typeof entry.link === "string" && entry.link || typeof openAiUrlCitation?.url === "string" && openAiUrlCitation.url || typeof webEntry?.uri === "string" && webEntry.uri || "";
	const title = typeof entry.title === "string" && entry.title || typeof openAiUrlCitation?.title === "string" && openAiUrlCitation.title || typeof webEntry?.title === "string" && webEntry.title || toHostOrUrl$1(url);
	const content = typeof entry.content === "string" && entry.content || extractOpenRouterContent(entry);
	if (!url && !title && !content) return null;
	return {
		number: readExplicitCitationNumber(entry),
		url,
		title,
		content,
		showFavicon: true,
		type: "websearch"
	};
}
function normalizeWebResults(results) {
	if (results && typeof results === "object" && Array.isArray(results.groundingChunks)) {
		const obj = results;
		const chunks = obj.groundingChunks;
		const groundingSupports = obj.groundingSupports && Array.isArray(obj.groundingSupports) ? obj.groundingSupports : void 0;
		return chunks.map((chunk, index) => {
			const web = chunk?.web && typeof chunk.web === "object" ? chunk.web : void 0;
			const url = typeof web?.uri === "string" ? web.uri : "";
			if (!url) return null;
			return {
				number: index + 1,
				url,
				title: typeof web?.title === "string" ? web.title : toHostOrUrl$1(url),
				showFavicon: true,
				type: "websearch",
				...groundingSupports ? { metadata: groundingSupports } : {}
			};
		}).filter(Boolean);
	}
	return (Array.isArray(results) ? results : results && typeof results === "object" && Array.isArray(results.results) ? results.results : []).map(normalizeWebResult).filter((c) => c !== null);
}
function assignMissingCitationNumbers(citations) {
	const assigned = new Set(citations.filter((citation) => citation.number > 0).map((citation) => citation.number));
	let nextNumber = 1;
	return citations.map((citation) => {
		if (citation.number > 0) return citation;
		while (assigned.has(nextNumber)) nextNumber += 1;
		assigned.add(nextNumber);
		return {
			...citation,
			number: nextNumber
		};
	});
}
function convertReferencesToCitations(references) {
	const all = [];
	for (const ref of references) {
		if (isWebCitation(ref)) {
			all.push(...normalizeWebResults(ref.content?.results));
			continue;
		}
		if (isKnowledgeCitation(ref)) {
			const knowledge = Array.isArray(ref.content) ? ref.content : [];
			const usedNumbers = new Set(all.filter((citation) => citation.number > 0).map((citation) => citation.number));
			all.push(...knowledge.map((item) => {
				const number$1 = item.id > 0 && !usedNumbers.has(item.id) ? item.id : 0;
				if (number$1 > 0) usedNumbers.add(number$1);
				const fileMatch = item.sourceUrl?.match(/\[(.*?)]\(http:\/\/file\/(.*?)\)/);
				return {
					number: number$1,
					url: fileMatch ? `http://file/${fileMatch[2]}` : item.sourceUrl || "",
					title: fileMatch ? fileMatch[1] : item.sourceUrl || "",
					content: item.content,
					showFavicon: true,
					type: "knowledge"
				};
			}));
			continue;
		}
		if (isMemoryCitation(ref)) {
			const memories = Array.isArray(ref.content) ? ref.content : [];
			all.push(...memories.map((item) => ({
				number: 0,
				url: "",
				title: `Memory ${item.hash?.slice(0, 8) || ""}`.trim(),
				content: item.memory,
				showFavicon: false,
				type: "memory"
			})));
		}
	}
	const urlSet = /* @__PURE__ */ new Set();
	return assignMissingCitationNumbers(all.filter((citation) => {
		if (citation.type === "knowledge" || citation.type === "memory") return true;
		if (!citation.url) return true;
		if (urlSet.has(citation.url)) return false;
		urlSet.add(citation.url);
		return true;
	}));
}
const WEB_SEARCH_SOURCE = {
	WEBSEARCH: "websearch",
	OPENAI: "openai",
	OPENAI_RESPONSE: "openai-response",
	OPENROUTER: "openrouter",
	ANTHROPIC: "anthropic",
	GEMINI: "gemini",
	PERPLEXITY: "perplexity",
	QWEN: "qwen",
	HUNYUAN: "hunyuan",
	ZHIPU: "zhipu",
	GROK: "grok",
	AISDK: "ai-sdk"
};
_enum(objectValues(WEB_SEARCH_SOURCE));
var MARKDOWN_CODE_PATTERN = /```[\s\S]*?```|`[^`\n]*`/gm;
function mapMarkdownOutsideCode(content, transform) {
	MARKDOWN_CODE_PATTERN.lastIndex = 0;
	let cursor = 0;
	let result = "";
	let match;
	while ((match = MARKDOWN_CODE_PATTERN.exec(content)) !== null) {
		result += transform(content.slice(cursor, match.index));
		result += match[0];
		cursor = match.index + match[0].length;
	}
	return result + transform(content.slice(cursor));
}
function toTooltipCitation(citation) {
	return citation.content ? {
		...citation,
		content: cleanMarkdownContent(citation.content).substring(0, 200)
	} : citation;
}
function determineCitationSource(citationReferences) {
	if (citationReferences?.length) return citationReferences.find((ref) => ref.citationBlockSource)?.citationBlockSource;
}
function withCitationTags(content, citations, sourceType) {
	if (!content || citations.length === 0) return content;
	const cleaned = citations.map(toTooltipCitation);
	return mapCitationMarksToTags(normalizeCitationMarks(content, new Map(cleaned.map((c) => [c.number, c])), sourceType), new Map(cleaned.map((c) => [String(c.number), c])));
}
function normalizeCitationMarks(content, citationMap, sourceType) {
	const codeBlockRegex = MARKDOWN_CODE_PATTERN;
	const getSkipRanges = () => {
		const skipRanges = [];
		codeBlockRegex.lastIndex = 0;
		let match;
		while ((match = codeBlockRegex.exec(content)) !== null) skipRanges.push({
			start: match.index,
			end: match.index + match[0].length
		});
		return skipRanges;
	};
	const shouldSkip = (pos, skipRanges = getSkipRanges()) => {
		for (const range of skipRanges) {
			if (pos >= range.start && pos < range.end) return true;
			if (range.start > pos) break;
		}
		return false;
	};
	const applyReplacements = (regex, getReplacementFn) => {
		const replacements = [];
		const skipRanges = getSkipRanges();
		regex.lastIndex = 0;
		let m;
		while ((m = regex.exec(content)) !== null) if (!shouldSkip(m.index, skipRanges)) {
			const replacement = getReplacementFn(m);
			if (replacement !== null) replacements.push({
				start: m.index,
				end: m.index + m[0].length,
				replacement
			});
		}
		replacements.reverse().forEach(({ start, end, replacement }) => {
			content = content.slice(0, start) + replacement + content.slice(end);
		});
	};
	const normalizePlainBracketMarks = () => {
		applyReplacements(/\[(\d+)\]/g, (match) => {
			const citationNum = parseInt(match[1], 10);
			return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
		});
	};
	switch (sourceType) {
		case WEB_SEARCH_SOURCE.OPENAI:
		case WEB_SEARCH_SOURCE.OPENAI_RESPONSE:
		case WEB_SEARCH_SOURCE.AISDK:
		case WEB_SEARCH_SOURCE.PERPLEXITY:
			applyReplacements(/\[<sup>(\d+)<\/sup>\]\([^)]*\)/g, (m) => {
				const citationNum = parseInt(m[1], 10);
				return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
			});
			normalizePlainBracketMarks();
			break;
		case WEB_SEARCH_SOURCE.GEMINI: {
			const metadata = Array.from(citationMap.values())[0]?.metadata;
			if (metadata?.length) {
				const contentBytes = new TextEncoder().encode(content);
				const byteOffsetToCharOffset = (byteOffset) => {
					return new TextDecoder().decode(contentBytes.slice(0, byteOffset)).length;
				};
				const insertions = [];
				metadata.forEach((support) => {
					if (!support.groundingChunkIndices || !support.segment) return;
					const { endIndex } = support.segment;
					if (endIndex == null) return;
					const tag = support.groundingChunkIndices.map((citationNum) => {
						return citationMap.get(citationNum + 1) ? `[cite:${citationNum + 1}]` : "";
					}).filter(Boolean).join("");
					if (tag) insertions.push({
						position: byteOffsetToCharOffset(endIndex),
						tag
					});
				});
				insertions.sort((a, b) => b.position - a.position);
				for (const { position, tag } of insertions) if (!shouldSkip(position)) content = content.slice(0, position) + tag + content.slice(position);
			}
			break;
		}
		case WEB_SEARCH_SOURCE.GROK:
			applyReplacements(/\[\[(\d+)\]\]\([^)]*\)/g, (m) => {
				const citationNum = parseInt(m[1], 10);
				return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
			});
			break;
		default: normalizePlainBracketMarks();
	}
	return content;
}
function mapCitationMarksToTags(content, citationMap) {
	return mapMarkdownOutsideCode(content, (text) => text.replace(/\[cite:([\w-]+)\]/g, (match, id) => {
		const citation = citationMap.get(id);
		return citation ? generateCitationTag(citation) : match;
	}));
}
const isLinkableCitationUrl = (url) => !!url && url.startsWith("http");
function generateCitationTag(citation) {
	const supTag = `<sup data-citation='${citation.number}'>${citation.number}</sup>`;
	if (!isLinkableCitationUrl(citation.url)) return supTag;
	return `[${supTag}](${citation.url.replace(/\|/g, "%7C")})`;
}
function isHttpUrl(value) {
	try {
		const { protocol } = new URL(value);
		return protocol === "http:" || protocol === "https:";
	} catch {
		return false;
	}
}
const GENERATE_IMAGE_TOOL_NAME = "generate_image";
const generateImageOutputSchema = array(object({
	id: string().describe("File entry id of the generated image."),
	name: string().describe("File name of the generated image.")
}));
const KB_LIST_TOOL_NAME = "kb_list";
object({
	query: string().trim().min(1).max(200).optional().describe("List mode only: case-insensitive substring filter against base name and sample sources."),
	groupId: string().trim().min(1).optional().describe("List mode only: restrict the result to a single knowledge base group. Omit to span all groups."),
	baseId: string().trim().min(1).optional().describe("Pass a base id (from a prior list-mode call) to switch to outline mode: return that base’s folder/document tree instead of the list of bases. Omit to list the bases."),
	maxDepth: number().int().nonnegative().optional().describe("Outline mode only (requires `baseId`): limit the tree to this many folder levels (0 = top level).")
});
object({
	query: string().trim().max(200).describe("List mode only: case-insensitive substring filter against base name and sample sources. Pass an empty string to list all."),
	groupId: string().trim().describe("List mode only: restrict the result to a single knowledge base group. Pass an empty string to span all groups."),
	baseId: string().trim().describe("Pass a base id (from a prior list-mode call) to switch to outline mode: return that base’s folder/document tree instead of the list of bases. Pass an empty string to list the bases."),
	maxDepth: number().int().min(-1).describe("Outline mode only (requires `baseId`): limit the tree to this many folder levels (0 = top level). Pass -1 for unlimited depth.")
});
array(object({
	id: string(),
	name: string(),
	groupId: string().nullable(),
	status: _enum(["completed", "failed"]),
	itemCount: number().int().nonnegative().optional(),
	sampleSources: array(string()),
	itemsUnavailable: boolean().optional()
}));
const KB_SEARCH_TOOL_NAME = "kb_search";
const kbSearchInputSchema = object({
	query: string().trim().min(2, "Query must be at least 2 characters").max(200, "Query should be concise — break long questions into multiple searches").describe("Self-contained keyword search. MUST NOT use pronouns (\"it\", \"their\") or context-dependent references; expand the topic from earlier messages when the user asks a follow-up. Examples: ✓ \"Cherry Studio MCP cache invalidation\", ✗ \"its cache\"."),
	baseIds: array(string().trim().min(1)).min(1).describe("IDs of the knowledge bases to search, picked from the result of kb_list. At least one is required; pass multiple to fan out across related bases.")
});
const kbSearchOutputSchema = array(object({
	id: union([string(), number().int().positive()]),
	baseId: string().optional(),
	conceptId: string().optional(),
	title: string().optional(),
	type: string().optional(),
	content: string(),
	score: number().min(0).max(1)
}));
const KB_READ_TOOL_NAME = "kb_read";
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to read from — a base id from kb_list or a kb_search hit."),
	conceptId: string().trim().min(1).describe("Concept ID of the document to read — the `conceptId` field of a kb_search hit (its relative path)."),
	charStart: number().int().nonnegative().optional().describe("Read mode only: 0-based start offset of the slice to read. Omit to start at the beginning."),
	charEnd: number().int().positive().optional().describe("Read mode only: end offset (exclusive) of the slice. Omit to read to the end. Long reads are capped; when `totalChars` exceeds the returned `charEnd`, page on by calling again with `charStart` set to that `charEnd`."),
	pattern: string().min(1).max(200).optional().describe("Pass a JavaScript regular expression to switch to grep mode: instead of the document text, return each matching line with its character offsets and a snippet (anchors `^`/`$` bind to each line; a match cannot span lines). Use this for an exact lookup — a number, code symbol, term, quote. Omit to read the document text; use kb_search for semantic/meaning-based lookup across documents."),
	ignoreCase: boolean().optional().describe("Grep mode only: case-insensitive matching. Defaults to true."),
	maxMatches: number().int().positive().max(200).optional().describe("Grep mode only: maximum matches to return (default 50, hard cap 200). `totalMatches` always reports the full count.")
});
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to read from — a base id from kb_list or a kb_search hit."),
	conceptId: string().trim().min(1).describe("Concept ID of the document to read — the `conceptId` field of a kb_search hit (its relative path)."),
	charStart: number().int().nonnegative().describe("Read mode only: 0-based start offset of the slice to read. Pass 0 to start at the beginning."),
	charEnd: number().int().nonnegative().describe("Read mode only: end offset (exclusive) of the slice. Pass 0 to read to the end. Long reads are capped; when `totalChars` exceeds the returned `charEnd`, page on by calling again with `charStart` set to that `charEnd`."),
	pattern: string().max(200).describe("Pass a JavaScript regular expression to switch to grep mode: instead of the document text, return each matching line with its character offsets and a snippet (anchors `^`/`$` bind to each line; a match cannot span lines). Use this for an exact lookup — a number, code symbol, term, quote. Pass an empty string to read the document text; use kb_search for semantic/meaning-based lookup across documents."),
	ignoreCase: boolean().describe("Grep mode only: case-insensitive matching. Pass true for the default; ignored in read mode."),
	maxMatches: number().int().nonnegative().max(200).describe("Grep mode only: maximum matches to return (default 50, hard cap 200). Pass 0 to use the default. `totalMatches` always reports the full count.")
});
const kbReadOutputSchema = object({
	id: string().optional(),
	baseId: string().optional(),
	conceptId: string(),
	title: string(),
	type: string(),
	totalChars: number().int().nonnegative(),
	charStart: number().int().nonnegative(),
	charEnd: number().int().nonnegative(),
	content: string(),
	truncated: boolean()
});
const kbGrepMatchSchema = object({
	line: number().int().positive(),
	charStart: number().int().nonnegative(),
	charEnd: number().int().nonnegative(),
	snippet: string()
});
const kbGrepOutputSchema = object({
	id: string().optional(),
	baseId: string().optional(),
	conceptId: string(),
	title: string(),
	type: string(),
	totalMatches: number().int().nonnegative(),
	matches: array(kbGrepMatchSchema)
});
const kbTreeNodeSchema = object({
	depth: number().int().nonnegative(),
	title: string(),
	type: string(),
	status: KnowledgeItemStatusSchema,
	conceptId: string().optional()
});
object({
	baseId: string(),
	totalItems: number().int().nonnegative(),
	truncated: boolean(),
	nodes: array(kbTreeNodeSchema)
});
const KB_MANAGE_TOOL_NAME = "kb_manage";
const KB_MANAGE_ACTIONS = [
	"add",
	"delete",
	"refresh"
];
const KB_MANAGE_ADD_TYPES = [
	"file",
	"url",
	"note"
];
const KB_MANAGE_UNUSED_TYPE = "none";
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to modify — a base id from kb_list."),
	action: _enum(KB_MANAGE_ACTIONS).describe("add: import a new source (set `type` + its field). delete: remove documents by `conceptIds`. refresh: re-index documents by `conceptIds`. All actions modify the base and require user approval."),
	type: _enum(KB_MANAGE_ADD_TYPES).optional().describe("For action=\"add\" only: the source kind — \"file\" (set `path`), \"url\" (set `url`), or \"note\" (set `content`)."),
	path: string().trim().min(1).optional().describe("For action=\"add\", type=\"file\": absolute local filesystem path of the file to import."),
	url: string().trim().min(1).optional().describe("For action=\"add\", type=\"url\": the URL to fetch and index."),
	content: string().min(1).optional().describe("For action=\"add\", type=\"note\": the plain-text note content to index."),
	title: string().trim().min(1).optional().describe("For action=\"add\", type=\"note\": optional display title (defaults to the note's first line)."),
	conceptIds: array(string().trim().min(1)).optional().describe("For action=\"delete\"/\"refresh\": Concept IDs (the `conceptId` field of a kb_search hit or a kb_list result) to operate on.")
});
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to modify — a base id from kb_list."),
	action: _enum(KB_MANAGE_ACTIONS).describe("add: import a new source (set `type` + its field). delete: remove documents by `conceptIds`. refresh: re-index documents by `conceptIds`. All actions modify the base and require user approval."),
	type: _enum([...KB_MANAGE_ADD_TYPES, KB_MANAGE_UNUSED_TYPE]).describe("For action=\"add\" only: the source kind — \"file\" (set `path`), \"url\" (set `url`), or \"note\" (set `content`). Pass \"none\" for delete or refresh."),
	path: string().trim().describe("For action=\"add\", type=\"file\": absolute local filesystem path of the file to import. Pass an empty string otherwise."),
	url: string().trim().describe("For action=\"add\", type=\"url\": the URL to fetch and index. Pass an empty string otherwise."),
	content: string().describe("For action=\"add\", type=\"note\": the plain-text note content to index. Pass an empty string otherwise."),
	title: string().trim().describe("For action=\"add\", type=\"note\": optional display title (defaults to the note's first line). Pass an empty string to omit."),
	conceptIds: array(string().trim().min(1)).describe("For action=\"delete\"/\"refresh\": Concept IDs (the `conceptId` field of a kb_search hit or a kb_list result) to operate on. Pass an empty array for add.")
});
object({
	action: _enum(KB_MANAGE_ACTIONS),
	added: array(string()).optional(),
	deleted: array(string()).optional(),
	refreshed: array(string()).optional(),
	notFound: array(string()).optional()
});
const WEB_SEARCH_TOOL_NAME = "web_search";
const WEB_FETCH_TOOL_NAME = "web_fetch";
const webSearchInputSchema = object({ query: string().trim().min(2, "Query must be at least 2 characters").max(200, "Query should be concise — break long questions into multiple searches").describe("Self-contained web search query. MUST NOT use pronouns (\"it\", \"their\") or context-dependent references; expand the topic from earlier messages when the user asks a follow-up. Examples: ✓ \"Anthropic Claude 4.5 release date\", ✗ \"when did it ship\".") });
const webSearchOutputSchema = array(object({
	id: union([string(), number().int().positive()]),
	title: string(),
	url: string(),
	content: string()
}));
object({ urls: array(string().trim().min(1).refine(isHttpUrl, "must be an absolute http(s) URL")).min(1).max(20, "Fetch at most 20 URLs per call").describe("Absolute http(s) web page URLs to fetch and summarize. Use web_search first when you do not know the URL.") });
const REPORT_ARTIFACTS_TOOL_NAME = "report_artifacts";
const reportArtifactsInputSchema = object({
	artifacts: array(object({
		path: string().trim().min(1).describe("Absolute or workspace-relative path to a final deliverable file."),
		description: string().trim().min(1).optional().describe("One-line description of what this file is.")
	})).min(1).describe("The final deliverable file(s) produced for the user. List only finished outputs — never intermediate, scratch, or temporary files."),
	summary: string().trim().min(1).optional().describe("One-line summary of what was produced.")
});
object({
	filename: string().trim().min(1).describe("Name of the attached file to read, exactly as it appears in the attachment manifest in the conversation."),
	offset: number().int().nonnegative().describe("0-based character offset to start from. Page through long documents with offset + limit. Use 0 to start at the beginning."),
	limit: number().int().nonnegative().max(2e5).describe(`Max characters to return. Use 0 to default to 8000.`)
});
union([object({
	text: string(),
	totalChars: number().int().nonnegative(),
	nextOffset: number().int().nonnegative().optional()
}), object({ error: string() })]);
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isToolType(value) {
	return value === "mcp" || value === "builtin" || value === "provider";
}
function isMcpContentArray(value) {
	return Array.isArray(value) && value.every(isMcpContentBlock);
}
function extractOutputMetadata(output) {
	if (!isRecord$1(output)) return { response: output };
	const metadata = isRecord$1(output.metadata) ? output.metadata : void 0;
	if ("content" in output || metadata) {
		const normalizedMeta = metadata ? {
			description: typeof metadata.description === "string" ? metadata.description : void 0,
			name: typeof metadata.name === "string" ? metadata.name : void 0,
			serverId: typeof metadata.serverId === "string" ? metadata.serverId : void 0,
			serverName: typeof metadata.serverName === "string" ? metadata.serverName : void 0,
			type: isToolType(metadata.type) ? metadata.type : void 0
		} : void 0;
		return {
			response: normalizedMeta?.type === "mcp" && isMcpContentArray(output.content) ? output : output.content,
			metadata: normalizedMeta
		};
	}
	return { response: output };
}
function normalizeToolOutputResponse(output) {
	return extractOutputMetadata(output).response;
}
var EMPTY_MESSAGE_CITATIONS = {
	byId: /* @__PURE__ */ new Map(),
	byMarkerNumber: /* @__PURE__ */ new Map(),
	all: []
};
var CITABLE_TOOL_NAMES = new Set([
	WEB_SEARCH_TOOL_NAME,
	WEB_FETCH_TOOL_NAME,
	KB_SEARCH_TOOL_NAME,
	KB_READ_TOOL_NAME
]);
var CHERRY_TOOLS_MCP_SERVER = "cherry-tools";
var TOOL_INVOKE_TOOL_NAME = "tool_invoke";
var KNOWLEDGE_SNIPPET_MAX_CHARS = 300;
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toHostOrUrl(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
function sourceIdToNumber(sourceId) {
	if (typeof sourceId !== "string") return void 0;
	const match = sourceId.match(/^citation-(\d+)$/);
	if (!match) return void 0;
	const value = Number(match[1]);
	return Number.isFinite(value) && value >= 0 ? value + 1 : void 0;
}
function resolveCitableToolName(part) {
	if (!isToolUIPart(part)) return null;
	const toolPart = part;
	if (toolPart.state !== "output-available") return null;
	const rawName = getToolName(toolPart);
	if (CITABLE_TOOL_NAMES.has(rawName)) {
		if (part.type !== "dynamic-tool") return rawName;
		const partMetadata = readCherryMeta(part)?.tool;
		const outputMetadata = extractOutputMetadata(toolPart.output).metadata;
		const belongsToCherryTools = (metadata) => metadata?.serverId === CHERRY_TOOLS_MCP_SERVER || metadata?.serverName === CHERRY_TOOLS_MCP_SERVER;
		return belongsToCherryTools(partMetadata) || belongsToCherryTools(outputMetadata) ? rawName : null;
	}
	if (rawName === TOOL_INVOKE_TOOL_NAME) {
		const input = toolPart.input;
		if (isRecord(input) && typeof input.name === "string" && CITABLE_TOOL_NAMES.has(input.name)) return input.name;
		return null;
	}
	const parsed = parseFunctionCallToolName(rawName);
	if (parsed && parsed.serverPart === CHERRY_TOOLS_MCP_SERVER && CITABLE_TOOL_NAMES.has(parsed.toolPart)) return parsed.toolPart;
	return null;
}
function unwrapCitableOutput(output) {
	if (isPersistedToolOutput(output)) {
		const ref = output.$persistedToolOutput;
		return ref.shape === "entities" ? ref.skeleton : output;
	}
	if (isDeferredToolOutput(output) && output.skeleton !== void 0) return output.skeleton;
	return output;
}
function toSnippet(content) {
	const trimmed = content.trim();
	if (trimmed.length <= KNOWLEDGE_SNIPPET_MAX_CHARS) return trimmed;
	return `${trimmed.slice(0, KNOWLEDGE_SNIPPET_MAX_CHARS)}…`;
}
function parseKbReadCitation(output) {
	const read = kbReadOutputSchema.safeParse(output);
	if (read.success) {
		const { id: id$1, baseId: baseId$1, conceptId: conceptId$1, title: title$1, content } = read.data;
		return id$1 ? {
			id: id$1,
			baseId: baseId$1,
			conceptId: conceptId$1,
			title: title$1,
			content: toSnippet(content)
		} : null;
	}
	const grep = kbGrepOutputSchema.safeParse(output);
	if (!grep.success) return null;
	const { id, baseId, conceptId, title, matches } = grep.data;
	if (!id || matches.length === 0) return null;
	return {
		id,
		baseId,
		conceptId,
		title,
		content: toSnippet(matches.map((match) => match.snippet).join(" … "))
	};
}
function documentKey(item) {
	if (!item.conceptId) return void 0;
	return `${item.baseId ?? ""}\u0000${item.conceptId}`;
}
function markerNumberOfId(id) {
	if (typeof id === "number") return id;
	const suffix = id.match(/(\d+)$/)?.[1];
	return suffix ? Number(suffix) : void 0;
}
function resolveMessageCitations(parts) {
	const byId = /* @__PURE__ */ new Map();
	const byMarkerNumber = /* @__PURE__ */ new Map();
	const all = [];
	const byUrl = /* @__PURE__ */ new Map();
	for (const part of parts) {
		if (part.type !== "source-url" || typeof part.url !== "string" || !part.url || byUrl.has(part.url)) continue;
		const number$1 = sourceIdToNumber(part.sourceId) ?? all.length + 1;
		const citation = {
			number: number$1,
			url: part.url,
			title: part.title || toHostOrUrl(part.url),
			showFavicon: true,
			type: "websearch"
		};
		byId.set(String(number$1), citation);
		byMarkerNumber.set(number$1, citation);
		byUrl.set(part.url, citation);
		all.push(citation);
	}
	let nextNumber = all.reduce((max, citation) => Math.max(max, citation.number), 0) + 1;
	let lookupCallCount = 0;
	const toolMarkerCandidates = /* @__PURE__ */ new Map();
	const byDocument = /* @__PURE__ */ new Map();
	const addKnowledgeCitation = (item) => {
		const key = String(item.id);
		if (byId.has(key)) return;
		const document = documentKey(item);
		const existing = document ? byDocument.get(document) : void 0;
		if (existing) {
			byId.set(key, existing);
			return;
		}
		const citation = {
			number: nextNumber++,
			url: "",
			title: item.title || "",
			content: item.content,
			showFavicon: false,
			type: "knowledge"
		};
		byId.set(key, citation);
		if (document) byDocument.set(document, citation);
		all.push(citation);
		const markerNumber = markerNumberOfId(item.id);
		if (markerNumber !== void 0 && !toolMarkerCandidates.has(markerNumber)) toolMarkerCandidates.set(markerNumber, citation);
	};
	for (const part of parts) {
		const toolName = resolveCitableToolName(part);
		if (!toolName) continue;
		const rawOutput = unwrapCitableOutput(part.output);
		const output = normalizeToolOutputResponse(rawOutput);
		if (toolName === "kb_search") {
			const parsed$1 = kbSearchOutputSchema.safeParse(output);
			if (!parsed$1.success || parsed$1.data.length === 0) continue;
			lookupCallCount += 1;
			for (const item of parsed$1.data) addKnowledgeCitation(item);
			continue;
		}
		if (toolName === "kb_read") {
			const item = parseKbReadCitation(rawOutput) ?? parseKbReadCitation(output);
			if (!item) continue;
			lookupCallCount += 1;
			addKnowledgeCitation(item);
			continue;
		}
		const parsed = webSearchOutputSchema.safeParse(output);
		if (!parsed.success || parsed.data.length === 0) continue;
		lookupCallCount += 1;
		for (const item of parsed.data) {
			const key = String(item.id);
			if (byId.has(key)) continue;
			const existing = item.url ? byUrl.get(item.url) : void 0;
			if (existing) {
				byId.set(key, existing);
				continue;
			}
			const citation = {
				number: nextNumber++,
				url: item.url,
				title: item.title || toHostOrUrl(item.url),
				content: item.content,
				showFavicon: true,
				type: "websearch"
			};
			byId.set(key, citation);
			if (item.url) byUrl.set(item.url, citation);
			all.push(citation);
			const markerNumber = markerNumberOfId(item.id);
			if (markerNumber !== void 0 && !toolMarkerCandidates.has(markerNumber)) toolMarkerCandidates.set(markerNumber, citation);
		}
	}
	if (lookupCallCount === 1) {
		for (const [markerNumber, citation] of toolMarkerCandidates) if (!byMarkerNumber.has(markerNumber)) byMarkerNumber.set(markerNumber, citation);
	}
	if (all.length === 0) return EMPTY_MESSAGE_CITATIONS;
	return {
		byId,
		byMarkerNumber,
		all
	};
}
function createCitationLookup(citations) {
	const cleanCache = /* @__PURE__ */ new Map();
	const clean = (citation) => {
		const cached = cleanCache.get(citation);
		if (cached) return cached;
		const cleaned = citation.content ? {
			...citation,
			content: cleanMarkdownContent(citation.content)
		} : citation;
		cleanCache.set(citation, cleaned);
		return cleaned;
	};
	const markerNumberMap = /* @__PURE__ */ new Map();
	for (const [markerNumber, citation] of citations.byMarkerNumber) markerNumberMap.set(markerNumber, clean(citation));
	const lookup = /* @__PURE__ */ new Map();
	for (const [id, citation] of citations.byId) lookup.set(id, clean(citation));
	for (const [markerNumber, citation] of markerNumberMap) {
		const key = String(markerNumber);
		if (!lookup.has(key)) lookup.set(key, citation);
	}
	return {
		lookup,
		markerNumberMap
	};
}
function normalizeMarkerContent(content, markerNumberMap) {
	return markerNumberMap.size > 0 ? normalizeCitationMarks(content, markerNumberMap, WEB_SEARCH_SOURCE.AISDK) : content;
}
function collapseMarkerRuns(text, byMarker) {
	return text.replace(/\[cite:[\w-]+\](?:[ \t]*\[cite:[\w-]+\])+/g, (run) => {
		const seen = /* @__PURE__ */ new Set();
		const kept = [];
		for (const match of run.matchAll(/\[cite:([\w-]+)\]/g)) {
			const citation = byMarker.get(match[1]);
			if (citation && seen.has(citation)) continue;
			if (citation) seen.add(citation);
			kept.push(match[0]);
		}
		return kept.join("");
	});
}
function resolveCitationMarkerParts(contents, citations) {
	if (citations.byId.size === 0) return contents.map((content) => ({
		content,
		byMarker: /* @__PURE__ */ new Map(),
		cited: []
	}));
	const { lookup, markerNumberMap } = createCitationLookup(citations);
	const displayed = /* @__PURE__ */ new Map();
	let nextDisplayNumber = 1;
	return contents.map((content) => {
		const byMarker = /* @__PURE__ */ new Map();
		const cited = [];
		const seenInPart = /* @__PURE__ */ new Set();
		return {
			content: mapMarkdownOutsideCode(normalizeMarkerContent(content, markerNumberMap), (text) => {
				for (const match of text.matchAll(/\[cite:([\w-]+)\]/g)) {
					const citation = lookup.get(match[1]);
					if (!citation) continue;
					let display = displayed.get(citation);
					if (!display) {
						display = {
							...citation,
							number: nextDisplayNumber++
						};
						displayed.set(citation, display);
					}
					byMarker.set(match[1], display);
					if (!seenInPart.has(display)) {
						seenInPart.add(display);
						cited.push(display);
					}
				}
				return collapseMarkerRuns(text, byMarker);
			}),
			byMarker,
			cited
		};
	});
}
function resolveCitationMarkers(content, citations) {
	return resolveCitationMarkerParts([content], citations)[0];
}
var CITATION_MARKER_PATTERN = /([ \t]?)\[cite:([\w-]+)\]/g;
function toExportableCitations(content, parts) {
	const { content: resolved, byMarker, cited } = resolveCitationMarkers(content, resolveMessageCitations(parts));
	return {
		content: mapMarkdownOutsideCode(resolved, (text) => text.replace(CITATION_MARKER_PATTERN, (_match, space, id) => {
			const citation = byMarker.get(id);
			return citation ? `${space}[${citation.number}]` : "";
		})),
		cited
	};
}
function stripCitationMarkers(content) {
	return mapMarkdownOutsideCode(content, (text) => text.replace(CITATION_MARKER_PATTERN, ""));
}
function withToolCitationTags(content, citations, displayByMarker) {
	let projection;
	if (displayByMarker) {
		const { markerNumberMap } = createCitationLookup(citations);
		const cited$1 = [];
		const seen = /* @__PURE__ */ new Set();
		projection = {
			content: mapMarkdownOutsideCode(normalizeMarkerContent(content, markerNumberMap), (text) => {
				for (const match of text.matchAll(/\[cite:([\w-]+)\]/g)) {
					const citation = displayByMarker.get(match[1]);
					if (citation && !seen.has(citation)) {
						seen.add(citation);
						cited$1.push(citation);
					}
				}
				return collapseMarkerRuns(text, displayByMarker);
			}),
			byMarker: new Map(displayByMarker),
			cited: cited$1
		};
	} else projection = resolveCitationMarkers(content, citations);
	const { content: resolved, byMarker, cited } = projection;
	return {
		content: mapCitationMarksToTags(resolved, byMarker),
		cited
	};
}
export { markdownToPlainText as A, toTooltipCitation as C, convertMathFormula as D, convertReferencesToCitations as E, purifyMarkdownImages as M, removeTrailingDoubleSpaces as N, findCitationInChildren as O, updateCodeBlock as P, isLinkableCitationUrl as S, convertReferencesToCitationReferences as T, webSearchInputSchema as _, withToolCitationTags as a, generateImageOutputSchema as b, normalizeToolOutputResponse as c, KB_READ_TOOL_NAME as d, KB_SEARCH_TOOL_NAME as f, reportArtifactsInputSchema as g, kbSearchOutputSchema as h, toExportableCitations as i, processLatexBrackets as j, getCodeBlockId as k, KB_LIST_TOOL_NAME as l, kbSearchInputSchema as m, resolveMessageCitations as n, extractOutputMetadata as o, REPORT_ARTIFACTS_TOOL_NAME as p, stripCitationMarkers as r, isToolType as s, resolveCitationMarkerParts as t, KB_MANAGE_TOOL_NAME as u, webSearchOutputSchema as v, withCitationTags as w, determineCitationSource as x, GENERATE_IMAGE_TOOL_NAME as y };

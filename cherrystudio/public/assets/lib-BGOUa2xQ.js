import { r as __export, s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
const convert = (function(test) {
	if (test === null || test === void 0) return ok$1;
	if (typeof test === "function") return castFactory(test);
	if (typeof test === "object") return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
	if (typeof test === "string") return typeFactory(test);
	throw new Error("Expected function, string, or object as test");
});
function anyFactory(tests) {
	const checks = [];
	let index$1 = -1;
	while (++index$1 < tests.length) checks[index$1] = convert(tests[index$1]);
	return castFactory(any);
	function any(...parameters) {
		let index$2 = -1;
		while (++index$2 < checks.length) if (checks[index$2].apply(this, parameters)) return true;
		return false;
	}
}
function propertiesFactory(check) {
	const checkAsRecord = check;
	return castFactory(all$1);
	function all$1(node$1) {
		const nodeAsRecord = node$1;
		let key;
		for (key in check) if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
		return true;
	}
}
function typeFactory(check) {
	return castFactory(type);
	function type(node$1) {
		return node$1 && node$1.type === check;
	}
}
function castFactory(testFunction) {
	return check;
	function check(value, index$1, parent) {
		return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index$1 === "number" ? index$1 : void 0, parent || void 0));
	}
}
function ok$1() {
	return true;
}
function looksLikeANode(value) {
	return value !== null && typeof value === "object" && "type" in value;
}
function color(d) {
	return d;
}
var empty = [];
const CONTINUE = true;
const SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
	let check;
	if (typeof test === "function" && typeof visitor !== "function") {
		reverse = visitor;
		visitor = test;
	} else check = test;
	const is = convert(check);
	const step = reverse ? -1 : 1;
	factory(tree, void 0, [])();
	function factory(node$1, index$1, parents) {
		const value = node$1 && typeof node$1 === "object" ? node$1 : {};
		if (typeof value.type === "string") {
			const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
			Object.defineProperty(visit$1, "name", { value: "node (" + color(node$1.type + (name ? "<" + name + ">" : "")) + ")" });
		}
		return visit$1;
		function visit$1() {
			let result = empty;
			let subresult;
			let offset;
			let grandparents;
			if (!test || is(node$1, index$1, parents[parents.length - 1] || void 0)) {
				result = toResult(visitor(node$1, parents));
				if (result[0] === false) return result;
			}
			if ("children" in node$1 && node$1.children) {
				const nodeAsParent = node$1;
				if (nodeAsParent.children && result[0] !== "skip") {
					offset = (reverse ? nodeAsParent.children.length : -1) + step;
					grandparents = parents.concat(nodeAsParent);
					while (offset > -1 && offset < nodeAsParent.children.length) {
						const child = nodeAsParent.children[offset];
						subresult = factory(child, offset, grandparents)();
						if (subresult[0] === false) return subresult;
						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
					}
				}
			}
			return result;
		}
	}
}
function toResult(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "number") return [true, value];
	return value === null || value === void 0 ? empty : [value];
}
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
	let reverse;
	let test;
	let visitor;
	if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
		test = void 0;
		visitor = testOrVisitor;
		reverse = visitorOrReverse;
	} else {
		test = testOrVisitor;
		visitor = visitorOrReverse;
		reverse = maybeReverse;
	}
	visitParents(tree, test, overload, reverse);
	function overload(node$1, parents) {
		const parent = parents[parents.length - 1];
		const index$1 = parent ? parent.children.indexOf(node$1) : void 0;
		return visitor(node$1, index$1, parent);
	}
}
function ok() {}
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code$1) {
	return code$1 !== null && (code$1 < 32 || code$1 === 127);
}
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code$1) {
	return code$1 !== null && code$1 < -2;
}
function markdownLineEndingOrSpace(code$1) {
	return code$1 !== null && (code$1 < 0 || code$1 === 32);
}
function markdownSpace(code$1) {
	return code$1 === -2 || code$1 === -1 || code$1 === 32;
}
const unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
const unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
	return check;
	function check(code$1) {
		return code$1 !== null && code$1 > -1 && regex.test(String.fromCharCode(code$1));
	}
}
function normalizeIdentifier(value) {
	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
function blockquote(node$1, _, state, info) {
	const exit$1 = state.enter("blockquote");
	const tracker = state.createTracker(info);
	tracker.move("> ");
	tracker.shift(2);
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$1);
	exit$1();
	return value;
}
function map$1(line, _, blank) {
	return ">" + (blank ? "" : " ") + line;
}
function patternInScope(stack, pattern) {
	return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list$2, none) {
	if (typeof list$2 === "string") list$2 = [list$2];
	if (!list$2 || list$2.length === 0) return none;
	let index$1 = -1;
	while (++index$1 < list$2.length) if (stack.includes(list$2[index$1])) return true;
	return false;
}
function hardBreak(_, _1, state, info) {
	let index$1 = -1;
	while (++index$1 < state.unsafe.length) if (state.unsafe[index$1].character === "\n" && patternInScope(state.stack, state.unsafe[index$1])) return /[ \t]/.test(info.before) ? "" : " ";
	return "\\\n";
}
function longestStreak(value, substring) {
	const source = String(value);
	let index$1 = source.indexOf(substring);
	let expected = index$1;
	let count = 0;
	let max = 0;
	if (typeof substring !== "string") throw new TypeError("Expected substring");
	while (index$1 !== -1) {
		if (index$1 === expected) {
			if (++count > max) max = count;
		} else count = 1;
		expected = index$1 + substring.length;
		index$1 = source.indexOf(substring, expected);
	}
	return max;
}
function formatCodeAsIndented(node$1, state) {
	return Boolean(state.options.fences === false && node$1.value && !node$1.lang && /[^ \r\n]/.test(node$1.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node$1.value));
}
function checkFence(state) {
	const marker = state.options.fence || "`";
	if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
	return marker;
}
function code(node$1, _, state, info) {
	const marker = checkFence(state);
	const raw = node$1.value || "";
	const suffix = marker === "`" ? "GraveAccent" : "Tilde";
	if (formatCodeAsIndented(node$1, state)) {
		const exit$2 = state.enter("codeIndented");
		const value$1 = state.indentLines(raw, map);
		exit$2();
		return value$1;
	}
	const tracker = state.createTracker(info);
	const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
	const exit$1 = state.enter("codeFenced");
	let value = tracker.move(sequence);
	if (node$1.lang) {
		const subexit = state.enter(`codeFencedLang${suffix}`);
		value += tracker.move(state.safe(node$1.lang, {
			before: value,
			after: " ",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	if (node$1.lang && node$1.meta) {
		const subexit = state.enter(`codeFencedMeta${suffix}`);
		value += tracker.move(" ");
		value += tracker.move(state.safe(node$1.meta, {
			before: value,
			after: "\n",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	value += tracker.move("\n");
	if (raw) value += tracker.move(raw + "\n");
	value += tracker.move(sequence);
	exit$1();
	return value;
}
function map(line, _, blank) {
	return (blank ? "" : "    ") + line;
}
function checkQuote(state) {
	const marker = state.options.quote || "\"";
	if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
	return marker;
}
function definition$1(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$1 = state.enter("definition");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	value += tracker.move(state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("]: ");
	subexit();
	if (!node$1.url || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : "\n",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	exit$1();
	return value;
}
function checkEmphasis(state) {
	const marker = state.options.emphasis || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
	return marker;
}
function encodeCharacterReference(code$1) {
	return "&#x" + code$1.toString(16).toUpperCase() + ";";
}
function classifyCharacter(code$1) {
	if (code$1 === null || markdownLineEndingOrSpace(code$1) || unicodeWhitespace(code$1)) return 1;
	if (unicodePunctuation(code$1)) return 2;
}
function encodeInfo(outside, inside, marker) {
	const outsideKind = classifyCharacter(outside);
	const insideKind = classifyCharacter(inside);
	if (outsideKind === void 0) return insideKind === void 0 ? marker === "_" ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: true
	};
	if (outsideKind === 1) return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	};
	return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: false
	} : {
		inside: false,
		outside: false
	};
}
emphasis.peek = emphasisPeek;
function emphasis(node$1, _, state, info) {
	const marker = checkEmphasis(state);
	const exit$1 = state.enter("emphasis");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker);
	exit$1();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function emphasisPeek(_, _1, state) {
	return state.options.emphasis || "*";
}
var emptyOptions = {};
function toString(value, options) {
	const settings = options || emptyOptions;
	return one(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
}
function one(value, includeImageAlt, includeHtml) {
	if (node(value)) {
		if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
		if (includeImageAlt && "alt" in value && value.alt) return value.alt;
		if ("children" in value) return all(value.children, includeImageAlt, includeHtml);
	}
	if (Array.isArray(value)) return all(value, includeImageAlt, includeHtml);
	return "";
}
function all(values, includeImageAlt, includeHtml) {
	const result = [];
	let index$1 = -1;
	while (++index$1 < values.length) result[index$1] = one(values[index$1], includeImageAlt, includeHtml);
	return result.join("");
}
function node(value) {
	return Boolean(value && typeof value === "object");
}
function formatHeadingAsSetext(node$1, state) {
	let literalWithBreak = false;
	visit(node$1, function(node$2) {
		if ("value" in node$2 && /\r?\n|\r/.test(node$2.value) || node$2.type === "break") {
			literalWithBreak = true;
			return false;
		}
	});
	return Boolean((!node$1.depth || node$1.depth < 3) && toString(node$1) && (state.options.setext || literalWithBreak));
}
function heading(node$1, _, state, info) {
	const rank = Math.max(Math.min(6, node$1.depth || 1), 1);
	const tracker = state.createTracker(info);
	if (formatHeadingAsSetext(node$1, state)) {
		const exit$2 = state.enter("headingSetext");
		const subexit$1 = state.enter("phrasing");
		const value$1 = state.containerPhrasing(node$1, {
			...tracker.current(),
			before: "\n",
			after: "\n"
		});
		subexit$1();
		exit$2();
		return value$1 + "\n" + (rank === 1 ? "=" : "-").repeat(value$1.length - (Math.max(value$1.lastIndexOf("\r"), value$1.lastIndexOf("\n")) + 1));
	}
	const sequence = "#".repeat(rank);
	const exit$1 = state.enter("headingAtx");
	const subexit = state.enter("phrasing");
	tracker.move(sequence + " ");
	let value = state.containerPhrasing(node$1, {
		before: "# ",
		after: "\n",
		...tracker.current()
	});
	if (/^[\t ]/.test(value)) value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
	value = value ? sequence + " " + value : sequence;
	if (state.options.closeAtx) value += " " + sequence;
	subexit();
	exit$1();
	return value;
}
html.peek = htmlPeek;
function html(node$1) {
	return node$1.value || "";
}
function htmlPeek() {
	return "<";
}
image.peek = imagePeek;
function image(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$1 = state.enter("image");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	value += tracker.move(state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$1();
	return value;
}
function imagePeek() {
	return "!";
}
imageReference.peek = imageReferencePeek;
function imageReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$1 = state.enter("imageReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	const alt = state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(alt + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$1();
	if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function imageReferencePeek() {
	return "!";
}
inlineCode.peek = inlineCodePeek;
function inlineCode(node$1, _, state) {
	let value = node$1.value || "";
	let sequence = "`";
	let index$1 = -1;
	while ((/* @__PURE__ */ new RegExp("(^|[^`])" + sequence + "([^`]|$)")).test(value)) sequence += "`";
	if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
	while (++index$1 < state.unsafe.length) {
		const pattern = state.unsafe[index$1];
		const expression = state.compilePattern(pattern);
		let match;
		if (!pattern.atBreak) continue;
		while (match = expression.exec(value)) {
			let position$1 = match.index;
			if (value.charCodeAt(position$1) === 10 && value.charCodeAt(position$1 - 1) === 13) position$1--;
			value = value.slice(0, position$1) + " " + value.slice(match.index + 1);
		}
	}
	return sequence + value + sequence;
}
function inlineCodePeek() {
	return "`";
}
function formatLinkAsAutolink(node$1, state) {
	const raw = toString(node$1);
	return Boolean(!state.options.resourceLink && node$1.url && !node$1.title && node$1.children && node$1.children.length === 1 && node$1.children[0].type === "text" && (raw === node$1.url || "mailto:" + raw === node$1.url) && /^[a-z][a-z+.-]+:/i.test(node$1.url) && !/[\0- <>\u007F]/.test(node$1.url));
}
link.peek = linkPeek;
function link(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const tracker = state.createTracker(info);
	let exit$1;
	let subexit;
	if (formatLinkAsAutolink(node$1, state)) {
		const stack = state.stack;
		state.stack = [];
		exit$1 = state.enter("autolink");
		let value$1 = tracker.move("<");
		value$1 += tracker.move(state.containerPhrasing(node$1, {
			before: value$1,
			after: ">",
			...tracker.current()
		}));
		value$1 += tracker.move(">");
		exit$1();
		state.stack = stack;
		return value$1;
	}
	exit$1 = state.enter("link");
	subexit = state.enter("label");
	let value = tracker.move("[");
	value += tracker.move(state.containerPhrasing(node$1, {
		before: value,
		after: "](",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$1();
	return value;
}
function linkPeek(node$1, _, state) {
	return formatLinkAsAutolink(node$1, state) ? "<" : "[";
}
linkReference.peek = linkReferencePeek;
function linkReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$1 = state.enter("linkReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	const text$3 = state.containerPhrasing(node$1, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(text$3 + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$1();
	if (type === "full" || !text$3 || text$3 !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function linkReferencePeek() {
	return "[";
}
function checkBullet(state) {
	const marker = state.options.bullet || "*";
	if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return marker;
}
function checkBulletOther(state) {
	const bullet = checkBullet(state);
	const bulletOther = state.options.bulletOther;
	if (!bulletOther) return bullet === "*" ? "-" : "*";
	if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
	return bulletOther;
}
function checkBulletOrdered(state) {
	const marker = state.options.bulletOrdered || ".";
	if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
	return marker;
}
function checkRule(state) {
	const marker = state.options.rule || "*";
	if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
	return marker;
}
function list$1(node$1, parent, state, info) {
	const exit$1 = state.enter("list");
	const bulletCurrent = state.bulletCurrent;
	let bullet = node$1.ordered ? checkBulletOrdered(state) : checkBullet(state);
	const bulletOther = node$1.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
	let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
	if (!node$1.ordered) {
		const firstListItem = node$1.children ? node$1.children[0] : void 0;
		if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
		if (checkRule(state) === bullet && firstListItem) {
			let index$1 = -1;
			while (++index$1 < node$1.children.length) {
				const item = node$1.children[index$1];
				if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
					useDifferentMarker = true;
					break;
				}
			}
		}
	}
	if (useDifferentMarker) bullet = bulletOther;
	state.bulletCurrent = bullet;
	const value = state.containerFlow(node$1, info);
	state.bulletLastUsed = bullet;
	state.bulletCurrent = bulletCurrent;
	exit$1();
	return value;
}
function checkListItemIndent(state) {
	const style = state.options.listItemIndent || "one";
	if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return style;
}
function listItem(node$1, parent, state, info) {
	const listItemIndent = checkListItemIndent(state);
	let bullet = state.bulletCurrent || checkBullet(state);
	if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node$1)) + bullet;
	let size = bullet.length + 1;
	if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node$1.spread)) size = Math.ceil(size / 4) * 4;
	const tracker = state.createTracker(info);
	tracker.move(bullet + " ".repeat(size - bullet.length));
	tracker.shift(size);
	const exit$1 = state.enter("listItem");
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$2);
	exit$1();
	return value;
	function map$2(line, index$1, blank) {
		if (index$1) return (blank ? "" : " ".repeat(size)) + line;
		return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
	}
}
function paragraph(node$1, _, state, info) {
	const exit$1 = state.enter("paragraph");
	const subexit = state.enter("phrasing");
	const value = state.containerPhrasing(node$1, info);
	subexit();
	exit$1();
	return value;
}
const phrasing = convert([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
function root(node$1, _, state, info) {
	return (node$1.children.some(function(d) {
		return phrasing(d);
	}) ? state.containerPhrasing : state.containerFlow).call(state, node$1, info);
}
function checkStrong(state) {
	const marker = state.options.strong || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
	return marker;
}
strong.peek = strongPeek;
function strong(node$1, _, state, info) {
	const marker = checkStrong(state);
	const exit$1 = state.enter("strong");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker + marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker + marker);
	exit$1();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function strongPeek(_, _1, state) {
	return state.options.strong || "*";
}
function text$2(node$1, _, state, info) {
	return state.safe(node$1.value, info);
}
function checkRuleRepetition(state) {
	const repetition = state.options.ruleRepetition || 3;
	if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
	return repetition;
}
function thematicBreak$1(_, _1, state) {
	const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
	return state.options.ruleSpaces ? value.slice(0, -1) : value;
}
const handle = {
	blockquote,
	break: hardBreak,
	code,
	definition: definition$1,
	emphasis,
	hardBreak,
	heading,
	html,
	image,
	imageReference,
	inlineCode,
	link,
	linkReference,
	list: list$1,
	listItem,
	paragraph,
	root,
	strong,
	text: text$2,
	thematicBreak: thematicBreak$1
};
var element$1 = document.createElement("i");
function decodeNamedCharacterReference(value) {
	const characterReference$1 = "&" + value + ";";
	element$1.innerHTML = characterReference$1;
	const character = element$1.textContent;
	if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
	return character === characterReference$1 ? false : character;
}
function decodeNumericCharacterReference(value, base) {
	const code$1 = Number.parseInt(value, base);
	if (code$1 < 9 || code$1 === 11 || code$1 > 13 && code$1 < 32 || code$1 > 126 && code$1 < 160 || code$1 > 55295 && code$1 < 57344 || code$1 > 64975 && code$1 < 65008 || (code$1 & 65535) === 65535 || (code$1 & 65535) === 65534 || code$1 > 1114111) return "�";
	return String.fromCodePoint(code$1);
}
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
	return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
	if ($1) return $1;
	if ($2.charCodeAt(0) === 35) {
		const head = $2.charCodeAt(1);
		const hex = head === 120 || head === 88;
		return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
	}
	return decodeNamedCharacterReference($2) || $0;
}
function splice(list$2, start, remove, items) {
	const end = list$2.length;
	let chunkStart = 0;
	let parameters;
	if (start < 0) start = -start > end ? 0 : end + start;
	else start = start > end ? end : start;
	remove = remove > 0 ? remove : 0;
	if (items.length < 1e4) {
		parameters = Array.from(items);
		parameters.unshift(start, remove);
		list$2.splice(...parameters);
	} else {
		if (remove) list$2.splice(start, remove);
		while (chunkStart < items.length) {
			parameters = items.slice(chunkStart, chunkStart + 1e4);
			parameters.unshift(start, 0);
			list$2.splice(...parameters);
			chunkStart += 1e4;
			start += 1e4;
		}
	}
}
function push(list$2, items) {
	if (list$2.length > 0) {
		splice(list$2, list$2.length, 0, items);
		return list$2;
	}
	return items;
}
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
	const all$1 = {};
	let index$1 = -1;
	while (++index$1 < extensions.length) syntaxExtension(all$1, extensions[index$1]);
	return all$1;
}
function syntaxExtension(all$1, extension$1) {
	let hook;
	for (hook in extension$1) {
		const left = (hasOwnProperty.call(all$1, hook) ? all$1[hook] : void 0) || (all$1[hook] = {});
		const right = extension$1[hook];
		let code$1;
		if (right) for (code$1 in right) {
			if (!hasOwnProperty.call(left, code$1)) left[code$1] = [];
			const value = right[code$1];
			constructs(left[code$1], Array.isArray(value) ? value : value ? [value] : []);
		}
	}
}
function constructs(existing, list$2) {
	let index$1 = -1;
	const before = [];
	while (++index$1 < list$2.length) (list$2[index$1].add === "after" ? existing : before).push(list$2[index$1]);
	splice(existing, 0, 0, before);
}
function resolveAll(constructs$1, events, context) {
	const called = [];
	let index$1 = -1;
	while (++index$1 < constructs$1.length) {
		const resolve = constructs$1[index$1].resolveAll;
		if (resolve && !called.includes(resolve)) {
			events = resolve(events, context);
			called.push(resolve);
		}
	}
	return events;
}
const attention = {
	name: "attention",
	resolveAll: resolveAllAttention,
	tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
	let index$1 = -1;
	let open;
	let group;
	let text$3;
	let openingSequence;
	let closingSequence;
	let use;
	let nextEvents;
	let offset;
	while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "attentionSequence" && events[index$1][1]._close) {
		open = index$1;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index$1][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index$1][1]._open) && (events[index$1][1].end.offset - events[index$1][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index$1][1].end.offset - events[index$1][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index$1][1].end.offset - events[index$1][1].start.offset > 1 ? 2 : 1;
			const start = { ...events[open][1].end };
			const end = { ...events[index$1][1].start };
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start,
				end: { ...events[open][1].end }
			};
			closingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...events[index$1][1].start },
				end
			};
			text$3 = {
				type: use > 1 ? "strongText" : "emphasisText",
				start: { ...events[open][1].end },
				end: { ...events[index$1][1].start }
			};
			group = {
				type: use > 1 ? "strong" : "emphasis",
				start: { ...openingSequence.start },
				end: { ...closingSequence.end }
			};
			events[open][1].end = { ...openingSequence.start };
			events[index$1][1].start = { ...closingSequence.end };
			nextEvents = [];
			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
				"enter",
				events[open][1],
				context
			], [
				"exit",
				events[open][1],
				context
			]]);
			nextEvents = push(nextEvents, [
				[
					"enter",
					group,
					context
				],
				[
					"enter",
					openingSequence,
					context
				],
				[
					"exit",
					openingSequence,
					context
				],
				[
					"enter",
					text$3,
					context
				]
			]);
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index$1), context));
			nextEvents = push(nextEvents, [
				[
					"exit",
					text$3,
					context
				],
				[
					"enter",
					closingSequence,
					context
				],
				[
					"exit",
					closingSequence,
					context
				],
				[
					"exit",
					group,
					context
				]
			]);
			if (events[index$1][1].end.offset - events[index$1][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index$1][1],
					context
				], [
					"exit",
					events[index$1][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index$1 - open + 3, nextEvents);
			index$1 = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index$1 = -1;
	while (++index$1 < events.length) if (events[index$1][1].type === "attentionSequence") events[index$1][1].type = "data";
	return events;
}
function tokenizeAttention(effects, ok$2) {
	const attentionMarkers$1 = this.parser.constructs.attentionMarkers.null;
	const previous$1 = this.previous;
	const before = classifyCharacter(previous$1);
	let marker;
	return start;
	function start(code$1) {
		marker = code$1;
		effects.enter("attentionSequence");
		return inside(code$1);
	}
	function inside(code$1) {
		if (code$1 === marker) {
			effects.consume(code$1);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(code$1);
		const open = !after || after === 2 && before || attentionMarkers$1.includes(code$1);
		const close = !before || before === 2 && after || attentionMarkers$1.includes(previous$1);
		token._open = Boolean(marker === 42 ? open : open && (before || !close));
		token._close = Boolean(marker === 42 ? close : close && (after || !open));
		return ok$2(code$1);
	}
}
function movePoint(point$2, offset) {
	point$2.column += offset;
	point$2.offset += offset;
	point$2._bufferIndex += offset;
}
const autolink = {
	name: "autolink",
	tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$1) {
		effects.enter("autolink");
		effects.enter("autolinkMarker");
		effects.consume(code$1);
		effects.exit("autolinkMarker");
		effects.enter("autolinkProtocol");
		return open;
	}
	function open(code$1) {
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			return schemeOrEmailAtext;
		}
		if (code$1 === 64) return nok(code$1);
		return emailAtext(code$1);
	}
	function schemeOrEmailAtext(code$1) {
		if (code$1 === 43 || code$1 === 45 || code$1 === 46 || asciiAlphanumeric(code$1)) {
			size = 1;
			return schemeInsideOrEmailAtext(code$1);
		}
		return emailAtext(code$1);
	}
	function schemeInsideOrEmailAtext(code$1) {
		if (code$1 === 58) {
			effects.consume(code$1);
			size = 0;
			return urlInside;
		}
		if ((code$1 === 43 || code$1 === 45 || code$1 === 46 || asciiAlphanumeric(code$1)) && size++ < 32) {
			effects.consume(code$1);
			return schemeInsideOrEmailAtext;
		}
		size = 0;
		return emailAtext(code$1);
	}
	function urlInside(code$1) {
		if (code$1 === 62) {
			effects.exit("autolinkProtocol");
			effects.enter("autolinkMarker");
			effects.consume(code$1);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		if (code$1 === null || code$1 === 32 || code$1 === 60 || asciiControl(code$1)) return nok(code$1);
		effects.consume(code$1);
		return urlInside;
	}
	function emailAtext(code$1) {
		if (code$1 === 64) {
			effects.consume(code$1);
			return emailAtSignOrDot;
		}
		if (asciiAtext(code$1)) {
			effects.consume(code$1);
			return emailAtext;
		}
		return nok(code$1);
	}
	function emailAtSignOrDot(code$1) {
		return asciiAlphanumeric(code$1) ? emailLabel(code$1) : nok(code$1);
	}
	function emailLabel(code$1) {
		if (code$1 === 46) {
			effects.consume(code$1);
			size = 0;
			return emailAtSignOrDot;
		}
		if (code$1 === 62) {
			effects.exit("autolinkProtocol").type = "autolinkEmail";
			effects.enter("autolinkMarker");
			effects.consume(code$1);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		return emailValue(code$1);
	}
	function emailValue(code$1) {
		if ((code$1 === 45 || asciiAlphanumeric(code$1)) && size++ < 63) {
			const next = code$1 === 45 ? emailValue : emailLabel;
			effects.consume(code$1);
			return next;
		}
		return nok(code$1);
	}
}
function factorySpace(effects, ok$2, type, max) {
	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
	let size = 0;
	return start;
	function start(code$1) {
		if (markdownSpace(code$1)) {
			effects.enter(type);
			return prefix(code$1);
		}
		return ok$2(code$1);
	}
	function prefix(code$1) {
		if (markdownSpace(code$1) && size++ < limit) {
			effects.consume(code$1);
			return prefix;
		}
		effects.exit(type);
		return ok$2(code$1);
	}
}
const blankLine = {
	partial: true,
	tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok$2, nok) {
	return start;
	function start(code$1) {
		return markdownSpace(code$1) ? factorySpace(effects, after, "linePrefix")(code$1) : after(code$1);
	}
	function after(code$1) {
		return code$1 === null || markdownLineEnding(code$1) ? ok$2(code$1) : nok(code$1);
	}
}
const blockQuote = {
	continuation: { tokenize: tokenizeBlockQuoteContinuation },
	exit,
	name: "blockQuote",
	tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		if (code$1 === 62) {
			const state = self.containerState;
			if (!state.open) {
				effects.enter("blockQuote", { _container: true });
				state.open = true;
			}
			effects.enter("blockQuotePrefix");
			effects.enter("blockQuoteMarker");
			effects.consume(code$1);
			effects.exit("blockQuoteMarker");
			return after;
		}
		return nok(code$1);
	}
	function after(code$1) {
		if (markdownSpace(code$1)) {
			effects.enter("blockQuotePrefixWhitespace");
			effects.consume(code$1);
			effects.exit("blockQuotePrefixWhitespace");
			effects.exit("blockQuotePrefix");
			return ok$2;
		}
		effects.exit("blockQuotePrefix");
		return ok$2(code$1);
	}
}
function tokenizeBlockQuoteContinuation(effects, ok$2, nok) {
	const self = this;
	return contStart;
	function contStart(code$1) {
		if (markdownSpace(code$1)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$1);
		return contBefore(code$1);
	}
	function contBefore(code$1) {
		return effects.attempt(blockQuote, ok$2, nok)(code$1);
	}
}
function exit(effects) {
	effects.exit("blockQuote");
}
const characterEscape = {
	name: "characterEscape",
	tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok$2, nok) {
	return start;
	function start(code$1) {
		effects.enter("characterEscape");
		effects.enter("escapeMarker");
		effects.consume(code$1);
		effects.exit("escapeMarker");
		return inside;
	}
	function inside(code$1) {
		if (asciiPunctuation(code$1)) {
			effects.enter("characterEscapeValue");
			effects.consume(code$1);
			effects.exit("characterEscapeValue");
			effects.exit("characterEscape");
			return ok$2;
		}
		return nok(code$1);
	}
}
var element = document.createElement("i");
function decodeNamedCharacterReference$1(value) {
	const characterReference$1 = "&" + value + ";";
	element.innerHTML = characterReference$1;
	const character = element.textContent;
	if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
	return character === characterReference$1 ? false : character;
}
const characterReference = {
	name: "characterReference",
	tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok$2, nok) {
	const self = this;
	let size = 0;
	let max;
	let test;
	return start;
	function start(code$1) {
		effects.enter("characterReference");
		effects.enter("characterReferenceMarker");
		effects.consume(code$1);
		effects.exit("characterReferenceMarker");
		return open;
	}
	function open(code$1) {
		if (code$1 === 35) {
			effects.enter("characterReferenceMarkerNumeric");
			effects.consume(code$1);
			effects.exit("characterReferenceMarkerNumeric");
			return numeric;
		}
		effects.enter("characterReferenceValue");
		max = 31;
		test = asciiAlphanumeric;
		return value(code$1);
	}
	function numeric(code$1) {
		if (code$1 === 88 || code$1 === 120) {
			effects.enter("characterReferenceMarkerHexadecimal");
			effects.consume(code$1);
			effects.exit("characterReferenceMarkerHexadecimal");
			effects.enter("characterReferenceValue");
			max = 6;
			test = asciiHexDigit;
			return value;
		}
		effects.enter("characterReferenceValue");
		max = 7;
		test = asciiDigit;
		return value(code$1);
	}
	function value(code$1) {
		if (code$1 === 59 && size) {
			const token = effects.exit("characterReferenceValue");
			if (test === asciiAlphanumeric && !decodeNamedCharacterReference$1(self.sliceSerialize(token))) return nok(code$1);
			effects.enter("characterReferenceMarker");
			effects.consume(code$1);
			effects.exit("characterReferenceMarker");
			effects.exit("characterReference");
			return ok$2;
		}
		if (test(code$1) && size++ < max) {
			effects.consume(code$1);
			return value;
		}
		return nok(code$1);
	}
}
var nonLazyContinuation = {
	partial: true,
	tokenize: tokenizeNonLazyContinuation
};
const codeFenced = {
	concrete: true,
	name: "codeFenced",
	tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok$2, nok) {
	const self = this;
	const closeStart = {
		partial: true,
		tokenize: tokenizeCloseStart
	};
	let initialPrefix = 0;
	let sizeOpen = 0;
	let marker;
	return start;
	function start(code$1) {
		return beforeSequenceOpen(code$1);
	}
	function beforeSequenceOpen(code$1) {
		const tail = self.events[self.events.length - 1];
		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		marker = code$1;
		effects.enter("codeFenced");
		effects.enter("codeFencedFence");
		effects.enter("codeFencedFenceSequence");
		return sequenceOpen(code$1);
	}
	function sequenceOpen(code$1) {
		if (code$1 === marker) {
			sizeOpen++;
			effects.consume(code$1);
			return sequenceOpen;
		}
		if (sizeOpen < 3) return nok(code$1);
		effects.exit("codeFencedFenceSequence");
		return markdownSpace(code$1) ? factorySpace(effects, infoBefore, "whitespace")(code$1) : infoBefore(code$1);
	}
	function infoBefore(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("codeFencedFence");
			return self.interrupt ? ok$2(code$1) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$1);
		}
		effects.enter("codeFencedFenceInfo");
		effects.enter("chunkString", { contentType: "string" });
		return info(code$1);
	}
	function info(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return infoBefore(code$1);
		}
		if (markdownSpace(code$1)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return factorySpace(effects, metaBefore, "whitespace")(code$1);
		}
		if (code$1 === 96 && code$1 === marker) return nok(code$1);
		effects.consume(code$1);
		return info;
	}
	function metaBefore(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) return infoBefore(code$1);
		effects.enter("codeFencedFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code$1);
	}
	function meta(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceMeta");
			return infoBefore(code$1);
		}
		if (code$1 === 96 && code$1 === marker) return nok(code$1);
		effects.consume(code$1);
		return meta;
	}
	function atNonLazyBreak(code$1) {
		return effects.attempt(closeStart, after, contentBefore)(code$1);
	}
	function contentBefore(code$1) {
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return contentStart;
	}
	function contentStart(code$1) {
		return initialPrefix > 0 && markdownSpace(code$1) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code$1) : beforeContentChunk(code$1);
	}
	function beforeContentChunk(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$1);
		effects.enter("codeFlowValue");
		return contentChunk(code$1);
	}
	function contentChunk(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("codeFlowValue");
			return beforeContentChunk(code$1);
		}
		effects.consume(code$1);
		return contentChunk;
	}
	function after(code$1) {
		effects.exit("codeFenced");
		return ok$2(code$1);
	}
	function tokenizeCloseStart(effects$1, ok$3, nok$1) {
		let size = 0;
		return startBefore;
		function startBefore(code$1) {
			effects$1.enter("lineEnding");
			effects$1.consume(code$1);
			effects$1.exit("lineEnding");
			return start$1;
		}
		function start$1(code$1) {
			effects$1.enter("codeFencedFence");
			return markdownSpace(code$1) ? factorySpace(effects$1, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$1) : beforeSequenceClose(code$1);
		}
		function beforeSequenceClose(code$1) {
			if (code$1 === marker) {
				effects$1.enter("codeFencedFenceSequence");
				return sequenceClose(code$1);
			}
			return nok$1(code$1);
		}
		function sequenceClose(code$1) {
			if (code$1 === marker) {
				size++;
				effects$1.consume(code$1);
				return sequenceClose;
			}
			if (size >= sizeOpen) {
				effects$1.exit("codeFencedFenceSequence");
				return markdownSpace(code$1) ? factorySpace(effects$1, sequenceCloseAfter, "whitespace")(code$1) : sequenceCloseAfter(code$1);
			}
			return nok$1(code$1);
		}
		function sequenceCloseAfter(code$1) {
			if (code$1 === null || markdownLineEnding(code$1)) {
				effects$1.exit("codeFencedFence");
				return ok$3(code$1);
			}
			return nok$1(code$1);
		}
	}
}
function tokenizeNonLazyContinuation(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		if (code$1 === null) return nok(code$1);
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return lineStart;
	}
	function lineStart(code$1) {
		return self.parser.lazy[self.now().line] ? nok(code$1) : ok$2(code$1);
	}
}
const codeIndented = {
	name: "codeIndented",
	tokenize: tokenizeCodeIndented
};
var furtherStart = {
	partial: true,
	tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		effects.enter("codeIndented");
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$1);
	}
	function afterPrefix(code$1) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code$1) : nok(code$1);
	}
	function atBreak(code$1) {
		if (code$1 === null) return after(code$1);
		if (markdownLineEnding(code$1)) return effects.attempt(furtherStart, atBreak, after)(code$1);
		effects.enter("codeFlowValue");
		return inside(code$1);
	}
	function inside(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("codeFlowValue");
			return atBreak(code$1);
		}
		effects.consume(code$1);
		return inside;
	}
	function after(code$1) {
		effects.exit("codeIndented");
		return ok$2(code$1);
	}
}
function tokenizeFurtherStart(effects, ok$2, nok) {
	const self = this;
	return furtherStart$1;
	function furtherStart$1(code$1) {
		if (self.parser.lazy[self.now().line]) return nok(code$1);
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			return furtherStart$1;
		}
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$1);
	}
	function afterPrefix(code$1) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok$2(code$1) : markdownLineEnding(code$1) ? furtherStart$1(code$1) : nok(code$1);
	}
}
const codeText = {
	name: "codeText",
	previous,
	resolve: resolveCodeText,
	tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	let index$1;
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index$1 = headEnterIndex;
		while (++index$1 < tailExitIndex) if (events[index$1][1].type === "codeTextData") {
			events[headEnterIndex][1].type = "codeTextPadding";
			events[tailExitIndex][1].type = "codeTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index$1 = headEnterIndex - 1;
	tailExitIndex++;
	while (++index$1 <= tailExitIndex) if (enter === void 0) {
		if (index$1 !== tailExitIndex && events[index$1][1].type !== "lineEnding") enter = index$1;
	} else if (index$1 === tailExitIndex || events[index$1][1].type === "lineEnding") {
		events[enter][1].type = "codeTextData";
		if (index$1 !== enter + 2) {
			events[enter][1].end = events[index$1 - 1][1].end;
			events.splice(enter + 2, index$1 - enter - 2);
			tailExitIndex -= index$1 - enter - 2;
			index$1 = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
function previous(code$1) {
	return code$1 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok$2, nok) {
	let sizeOpen = 0;
	let size;
	let token;
	return start;
	function start(code$1) {
		effects.enter("codeText");
		effects.enter("codeTextSequence");
		return sequenceOpen(code$1);
	}
	function sequenceOpen(code$1) {
		if (code$1 === 96) {
			effects.consume(code$1);
			sizeOpen++;
			return sequenceOpen;
		}
		effects.exit("codeTextSequence");
		return between(code$1);
	}
	function between(code$1) {
		if (code$1 === null) return nok(code$1);
		if (code$1 === 32) {
			effects.enter("space");
			effects.consume(code$1);
			effects.exit("space");
			return between;
		}
		if (code$1 === 96) {
			token = effects.enter("codeTextSequence");
			size = 0;
			return sequenceClose(code$1);
		}
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			return between;
		}
		effects.enter("codeTextData");
		return data(code$1);
	}
	function data(code$1) {
		if (code$1 === null || code$1 === 32 || code$1 === 96 || markdownLineEnding(code$1)) {
			effects.exit("codeTextData");
			return between(code$1);
		}
		effects.consume(code$1);
		return data;
	}
	function sequenceClose(code$1) {
		if (code$1 === 96) {
			effects.consume(code$1);
			size++;
			return sequenceClose;
		}
		if (size === sizeOpen) {
			effects.exit("codeTextSequence");
			effects.exit("codeText");
			return ok$2(code$1);
		}
		token.type = "codeTextData";
		return data(code$1);
	}
}
var SpliceBuffer = class {
	constructor(initial) {
		this.left = initial ? [...initial] : [];
		this.right = [];
	}
	get(index$1) {
		if (index$1 < 0 || index$1 >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + index$1 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		if (index$1 < this.left.length) return this.left[index$1];
		return this.right[this.right.length - index$1 + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		this.setCursor(0);
		return this.right.pop();
	}
	slice(start, end) {
		const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
		if (stop < this.left.length) return this.left.slice(start, stop);
		if (start > this.left.length) return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
		return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
	}
	splice(start, deleteCount, items) {
		const count = deleteCount || 0;
		this.setCursor(Math.trunc(start));
		const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
		if (items) chunkedPush(this.left, items);
		return removed.reverse();
	}
	pop() {
		this.setCursor(Number.POSITIVE_INFINITY);
		return this.left.pop();
	}
	push(item) {
		this.setCursor(Number.POSITIVE_INFINITY);
		this.left.push(item);
	}
	pushMany(items) {
		this.setCursor(Number.POSITIVE_INFINITY);
		chunkedPush(this.left, items);
	}
	unshift(item) {
		this.setCursor(0);
		this.right.push(item);
	}
	unshiftMany(items) {
		this.setCursor(0);
		chunkedPush(this.right, items.reverse());
	}
	setCursor(n) {
		if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
		if (n < this.left.length) {
			const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
			chunkedPush(this.right, removed.reverse());
		} else {
			const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
			chunkedPush(this.left, removed.reverse());
		}
	}
};
function chunkedPush(list$2, right) {
	let chunkStart = 0;
	if (right.length < 1e4) list$2.push(...right);
	else while (chunkStart < right.length) {
		list$2.push(...right.slice(chunkStart, chunkStart + 1e4));
		chunkStart += 1e4;
	}
}
function subtokenize(eventsArray) {
	const jumps = {};
	let index$1 = -1;
	let event;
	let lineIndex;
	let otherIndex;
	let otherEvent;
	let parameters;
	let subevents;
	let more;
	const events = new SpliceBuffer(eventsArray);
	while (++index$1 < events.length) {
		while (index$1 in jumps) index$1 = jumps[index$1];
		event = events.get(index$1);
		if (index$1 && event[1].type === "chunkFlow" && events.get(index$1 - 1)[1].type === "listItemPrefix") {
			subevents = event[1]._tokenizer.events;
			otherIndex = 0;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
				if (subevents[otherIndex][1].type === "content") break;
				if (subevents[otherIndex][1].type === "chunkText") {
					subevents[otherIndex][1]._isInFirstContentOfListItem = true;
					otherIndex++;
				}
			}
		}
		if (event[0] === "enter") {
			if (event[1].contentType) {
				Object.assign(jumps, subcontent(events, index$1));
				index$1 = jumps[index$1];
				more = true;
			}
		} else if (event[1]._container) {
			otherIndex = index$1;
			lineIndex = void 0;
			while (otherIndex--) {
				otherEvent = events.get(otherIndex);
				if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
					if (otherEvent[0] === "enter") {
						if (lineIndex) events.get(lineIndex)[1].type = "lineEndingBlank";
						otherEvent[1].type = "lineEnding";
						lineIndex = otherIndex;
					}
				} else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {} else break;
			}
			if (lineIndex) {
				event[1].end = { ...events.get(lineIndex)[1].start };
				parameters = events.slice(lineIndex, index$1);
				parameters.unshift(event);
				events.splice(lineIndex, index$1 - lineIndex + 1, parameters);
			}
		}
	}
	splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
	return !more;
}
function subcontent(events, eventIndex) {
	const token = events.get(eventIndex)[1];
	const context = events.get(eventIndex)[2];
	let startPosition = eventIndex - 1;
	const startPositions = [];
	let tokenizer = token._tokenizer;
	if (!tokenizer) {
		tokenizer = context.parser[token.contentType](token.start);
		if (token._contentTypeTextTrailing) tokenizer._contentTypeTextTrailing = true;
	}
	const childEvents = tokenizer.events;
	const jumps = [];
	const gaps = {};
	let stream;
	let previous$1;
	let index$1 = -1;
	let current = token;
	let adjust = 0;
	let start = 0;
	const breaks = [start];
	while (current) {
		while (events.get(++startPosition)[1] !== current);
		startPositions.push(startPosition);
		if (!current._tokenizer) {
			stream = context.sliceStream(current);
			if (!current.next) stream.push(null);
			if (previous$1) tokenizer.defineSkip(current.start);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
			tokenizer.write(stream);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
		}
		previous$1 = current;
		current = current.next;
	}
	current = token;
	while (++index$1 < childEvents.length) if (childEvents[index$1][0] === "exit" && childEvents[index$1 - 1][0] === "enter" && childEvents[index$1][1].type === childEvents[index$1 - 1][1].type && childEvents[index$1][1].start.line !== childEvents[index$1][1].end.line) {
		start = index$1 + 1;
		breaks.push(start);
		current._tokenizer = void 0;
		current.previous = void 0;
		current = current.next;
	}
	tokenizer.events = [];
	if (current) {
		current._tokenizer = void 0;
		current.previous = void 0;
	} else breaks.pop();
	index$1 = breaks.length;
	while (index$1--) {
		const slice = childEvents.slice(breaks[index$1], breaks[index$1 + 1]);
		const start$1 = startPositions.pop();
		jumps.push([start$1, start$1 + slice.length - 1]);
		events.splice(start$1, 2, slice);
	}
	jumps.reverse();
	index$1 = -1;
	while (++index$1 < jumps.length) {
		gaps[adjust + jumps[index$1][0]] = adjust + jumps[index$1][1];
		adjust += jumps[index$1][1] - jumps[index$1][0] - 1;
	}
	return gaps;
}
const content$1 = {
	resolve: resolveContent,
	tokenize: tokenizeContent
};
var continuationConstruct = {
	partial: true,
	tokenize: tokenizeContinuation
};
function resolveContent(events) {
	subtokenize(events);
	return events;
}
function tokenizeContent(effects, ok$2) {
	let previous$1;
	return chunkStart;
	function chunkStart(code$1) {
		effects.enter("content");
		previous$1 = effects.enter("chunkContent", { contentType: "content" });
		return chunkInside(code$1);
	}
	function chunkInside(code$1) {
		if (code$1 === null) return contentEnd(code$1);
		if (markdownLineEnding(code$1)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code$1);
		effects.consume(code$1);
		return chunkInside;
	}
	function contentEnd(code$1) {
		effects.exit("chunkContent");
		effects.exit("content");
		return ok$2(code$1);
	}
	function contentContinue(code$1) {
		effects.consume(code$1);
		effects.exit("chunkContent");
		previous$1.next = effects.enter("chunkContent", {
			contentType: "content",
			previous: previous$1
		});
		previous$1 = previous$1.next;
		return chunkInside;
	}
}
function tokenizeContinuation(effects, ok$2, nok) {
	const self = this;
	return startLookahead;
	function startLookahead(code$1) {
		effects.exit("chunkContent");
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return factorySpace(effects, prefixed, "linePrefix");
	}
	function prefixed(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) return nok(code$1);
		const tail = self.events[self.events.length - 1];
		if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok$2(code$1);
		return effects.interrupt(self.parser.constructs.flow, nok, ok$2)(code$1);
	}
}
function factoryDestination(effects, ok$2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
	const limit = max || Number.POSITIVE_INFINITY;
	let balance = 0;
	return start;
	function start(code$1) {
		if (code$1 === 60) {
			effects.enter(type);
			effects.enter(literalType);
			effects.enter(literalMarkerType);
			effects.consume(code$1);
			effects.exit(literalMarkerType);
			return enclosedBefore;
		}
		if (code$1 === null || code$1 === 32 || code$1 === 41 || asciiControl(code$1)) return nok(code$1);
		effects.enter(type);
		effects.enter(rawType);
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return raw(code$1);
	}
	function enclosedBefore(code$1) {
		if (code$1 === 62) {
			effects.enter(literalMarkerType);
			effects.consume(code$1);
			effects.exit(literalMarkerType);
			effects.exit(literalType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return enclosed(code$1);
	}
	function enclosed(code$1) {
		if (code$1 === 62) {
			effects.exit("chunkString");
			effects.exit(stringType);
			return enclosedBefore(code$1);
		}
		if (code$1 === null || code$1 === 60 || markdownLineEnding(code$1)) return nok(code$1);
		effects.consume(code$1);
		return code$1 === 92 ? enclosedEscape : enclosed;
	}
	function enclosedEscape(code$1) {
		if (code$1 === 60 || code$1 === 62 || code$1 === 92) {
			effects.consume(code$1);
			return enclosed;
		}
		return enclosed(code$1);
	}
	function raw(code$1) {
		if (!balance && (code$1 === null || code$1 === 41 || markdownLineEndingOrSpace(code$1))) {
			effects.exit("chunkString");
			effects.exit(stringType);
			effects.exit(rawType);
			effects.exit(type);
			return ok$2(code$1);
		}
		if (balance < limit && code$1 === 40) {
			effects.consume(code$1);
			balance++;
			return raw;
		}
		if (code$1 === 41) {
			effects.consume(code$1);
			balance--;
			return raw;
		}
		if (code$1 === null || code$1 === 32 || code$1 === 40 || asciiControl(code$1)) return nok(code$1);
		effects.consume(code$1);
		return code$1 === 92 ? rawEscape : raw;
	}
	function rawEscape(code$1) {
		if (code$1 === 40 || code$1 === 41 || code$1 === 92) {
			effects.consume(code$1);
			return raw;
		}
		return raw(code$1);
	}
}
function factoryLabel(effects, ok$2, nok, type, markerType, stringType) {
	const self = this;
	let size = 0;
	let seen;
	return start;
	function start(code$1) {
		effects.enter(type);
		effects.enter(markerType);
		effects.consume(code$1);
		effects.exit(markerType);
		effects.enter(stringType);
		return atBreak;
	}
	function atBreak(code$1) {
		if (size > 999 || code$1 === null || code$1 === 91 || code$1 === 93 && !seen || code$1 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code$1);
		if (code$1 === 93) {
			effects.exit(stringType);
			effects.enter(markerType);
			effects.consume(code$1);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			return atBreak;
		}
		effects.enter("chunkString", { contentType: "string" });
		return labelInside(code$1);
	}
	function labelInside(code$1) {
		if (code$1 === null || code$1 === 91 || code$1 === 93 || markdownLineEnding(code$1) || size++ > 999) {
			effects.exit("chunkString");
			return atBreak(code$1);
		}
		effects.consume(code$1);
		if (!seen) seen = !markdownSpace(code$1);
		return code$1 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$1) {
		if (code$1 === 91 || code$1 === 92 || code$1 === 93) {
			effects.consume(code$1);
			size++;
			return labelInside;
		}
		return labelInside(code$1);
	}
}
function factoryTitle(effects, ok$2, nok, type, markerType, stringType) {
	let marker;
	return start;
	function start(code$1) {
		if (code$1 === 34 || code$1 === 39 || code$1 === 40) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code$1);
			effects.exit(markerType);
			marker = code$1 === 40 ? 41 : code$1;
			return begin;
		}
		return nok(code$1);
	}
	function begin(code$1) {
		if (code$1 === marker) {
			effects.enter(markerType);
			effects.consume(code$1);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		return atBreak(code$1);
	}
	function atBreak(code$1) {
		if (code$1 === marker) {
			effects.exit(stringType);
			return begin(marker);
		}
		if (code$1 === null) return nok(code$1);
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			return factorySpace(effects, atBreak, "linePrefix");
		}
		effects.enter("chunkString", { contentType: "string" });
		return inside(code$1);
	}
	function inside(code$1) {
		if (code$1 === marker || code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("chunkString");
			return atBreak(code$1);
		}
		effects.consume(code$1);
		return code$1 === 92 ? escape : inside;
	}
	function escape(code$1) {
		if (code$1 === marker || code$1 === 92) {
			effects.consume(code$1);
			return inside;
		}
		return inside(code$1);
	}
}
function factoryWhitespace(effects, ok$2) {
	let seen;
	return start;
	function start(code$1) {
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			seen = true;
			return start;
		}
		if (markdownSpace(code$1)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code$1);
		return ok$2(code$1);
	}
}
const definition = {
	name: "definition",
	tokenize: tokenizeDefinition
};
var titleBefore = {
	partial: true,
	tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok$2, nok) {
	const self = this;
	let identifier;
	return start;
	function start(code$1) {
		effects.enter("definition");
		return before(code$1);
	}
	function before(code$1) {
		return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code$1);
	}
	function labelAfter(code$1) {
		identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
		if (code$1 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$1);
			effects.exit("definitionMarker");
			return markerAfter;
		}
		return nok(code$1);
	}
	function markerAfter(code$1) {
		return markdownLineEndingOrSpace(code$1) ? factoryWhitespace(effects, destinationBefore)(code$1) : destinationBefore(code$1);
	}
	function destinationBefore(code$1) {
		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code$1);
	}
	function destinationAfter(code$1) {
		return effects.attempt(titleBefore, after, after)(code$1);
	}
	function after(code$1) {
		return markdownSpace(code$1) ? factorySpace(effects, afterWhitespace, "whitespace")(code$1) : afterWhitespace(code$1);
	}
	function afterWhitespace(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("definition");
			self.parser.defined.push(identifier);
			return ok$2(code$1);
		}
		return nok(code$1);
	}
}
function tokenizeTitleBefore(effects, ok$2, nok) {
	return titleBefore$1;
	function titleBefore$1(code$1) {
		return markdownLineEndingOrSpace(code$1) ? factoryWhitespace(effects, beforeMarker)(code$1) : nok(code$1);
	}
	function beforeMarker(code$1) {
		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code$1);
	}
	function titleAfter(code$1) {
		return markdownSpace(code$1) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code$1) : titleAfterOptionalWhitespace(code$1);
	}
	function titleAfterOptionalWhitespace(code$1) {
		return code$1 === null || markdownLineEnding(code$1) ? ok$2(code$1) : nok(code$1);
	}
}
const hardBreakEscape = {
	name: "hardBreakEscape",
	tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok$2, nok) {
	return start;
	function start(code$1) {
		effects.enter("hardBreakEscape");
		effects.consume(code$1);
		return after;
	}
	function after(code$1) {
		if (markdownLineEnding(code$1)) {
			effects.exit("hardBreakEscape");
			return ok$2(code$1);
		}
		return nok(code$1);
	}
}
const headingAtx = {
	name: "headingAtx",
	resolve: resolveHeadingAtx,
	tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
	let contentEnd = events.length - 2;
	let contentStart = 3;
	let content$2;
	let text$3;
	if (events[contentStart][1].type === "whitespace") contentStart += 2;
	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	if (contentEnd > contentStart) {
		content$2 = {
			type: "atxHeadingText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end
		};
		text$3 = {
			type: "chunkText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end,
			contentType: "text"
		};
		splice(events, contentStart, contentEnd - contentStart + 1, [
			[
				"enter",
				content$2,
				context
			],
			[
				"enter",
				text$3,
				context
			],
			[
				"exit",
				text$3,
				context
			],
			[
				"exit",
				content$2,
				context
			]
		]);
	}
	return events;
}
function tokenizeHeadingAtx(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$1) {
		effects.enter("atxHeading");
		return before(code$1);
	}
	function before(code$1) {
		effects.enter("atxHeadingSequence");
		return sequenceOpen(code$1);
	}
	function sequenceOpen(code$1) {
		if (code$1 === 35 && size++ < 6) {
			effects.consume(code$1);
			return sequenceOpen;
		}
		if (code$1 === null || markdownLineEndingOrSpace(code$1)) {
			effects.exit("atxHeadingSequence");
			return atBreak(code$1);
		}
		return nok(code$1);
	}
	function atBreak(code$1) {
		if (code$1 === 35) {
			effects.enter("atxHeadingSequence");
			return sequenceFurther(code$1);
		}
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("atxHeading");
			return ok$2(code$1);
		}
		if (markdownSpace(code$1)) return factorySpace(effects, atBreak, "whitespace")(code$1);
		effects.enter("atxHeadingText");
		return data(code$1);
	}
	function sequenceFurther(code$1) {
		if (code$1 === 35) {
			effects.consume(code$1);
			return sequenceFurther;
		}
		effects.exit("atxHeadingSequence");
		return atBreak(code$1);
	}
	function data(code$1) {
		if (code$1 === null || code$1 === 35 || markdownLineEndingOrSpace(code$1)) {
			effects.exit("atxHeadingText");
			return atBreak(code$1);
		}
		effects.consume(code$1);
		return data;
	}
}
const htmlBlockNames = [
	"address",
	"article",
	"aside",
	"base",
	"basefont",
	"blockquote",
	"body",
	"caption",
	"center",
	"col",
	"colgroup",
	"dd",
	"details",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"iframe",
	"legend",
	"li",
	"link",
	"main",
	"menu",
	"menuitem",
	"nav",
	"noframes",
	"ol",
	"optgroup",
	"option",
	"p",
	"param",
	"search",
	"section",
	"summary",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"title",
	"tr",
	"track",
	"ul"
];
const htmlRawNames = [
	"pre",
	"script",
	"style",
	"textarea"
];
const htmlFlow = {
	concrete: true,
	name: "htmlFlow",
	resolveTo: resolveToHtmlFlow,
	tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
	partial: true,
	tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
	partial: true,
	tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
	let index$1 = events.length;
	while (index$1--) if (events[index$1][0] === "enter" && events[index$1][1].type === "htmlFlow") break;
	if (index$1 > 1 && events[index$1 - 2][1].type === "linePrefix") {
		events[index$1][1].start = events[index$1 - 2][1].start;
		events[index$1 + 1][1].start = events[index$1 - 2][1].start;
		events.splice(index$1 - 2, 2);
	}
	return events;
}
function tokenizeHtmlFlow(effects, ok$2, nok) {
	const self = this;
	let marker;
	let closingTag;
	let buffer;
	let index$1;
	let markerB;
	return start;
	function start(code$1) {
		return before(code$1);
	}
	function before(code$1) {
		effects.enter("htmlFlow");
		effects.enter("htmlFlowData");
		effects.consume(code$1);
		return open;
	}
	function open(code$1) {
		if (code$1 === 33) {
			effects.consume(code$1);
			return declarationOpen;
		}
		if (code$1 === 47) {
			effects.consume(code$1);
			closingTag = true;
			return tagCloseStart;
		}
		if (code$1 === 63) {
			effects.consume(code$1);
			marker = 3;
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			buffer = String.fromCharCode(code$1);
			return tagName;
		}
		return nok(code$1);
	}
	function declarationOpen(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			marker = 2;
			return commentOpenInside;
		}
		if (code$1 === 91) {
			effects.consume(code$1);
			marker = 5;
			index$1 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			marker = 4;
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$1);
	}
	function commentOpenInside(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$1);
	}
	function cdataOpenInside(code$1) {
		if (code$1 === "CDATA[".charCodeAt(index$1++)) {
			effects.consume(code$1);
			if (index$1 === 6) return self.interrupt ? ok$2 : continuation;
			return cdataOpenInside;
		}
		return nok(code$1);
	}
	function tagCloseStart(code$1) {
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			buffer = String.fromCharCode(code$1);
			return tagName;
		}
		return nok(code$1);
	}
	function tagName(code$1) {
		if (code$1 === null || code$1 === 47 || code$1 === 62 || markdownLineEndingOrSpace(code$1)) {
			const slash = code$1 === 47;
			const name = buffer.toLowerCase();
			if (!slash && !closingTag && htmlRawNames.includes(name)) {
				marker = 1;
				return self.interrupt ? ok$2(code$1) : continuation(code$1);
			}
			if (htmlBlockNames.includes(buffer.toLowerCase())) {
				marker = 6;
				if (slash) {
					effects.consume(code$1);
					return basicSelfClosing;
				}
				return self.interrupt ? ok$2(code$1) : continuation(code$1);
			}
			marker = 7;
			return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code$1) : closingTag ? completeClosingTagAfter(code$1) : completeAttributeNameBefore(code$1);
		}
		if (code$1 === 45 || asciiAlphanumeric(code$1)) {
			effects.consume(code$1);
			buffer += String.fromCharCode(code$1);
			return tagName;
		}
		return nok(code$1);
	}
	function basicSelfClosing(code$1) {
		if (code$1 === 62) {
			effects.consume(code$1);
			return self.interrupt ? ok$2 : continuation;
		}
		return nok(code$1);
	}
	function completeClosingTagAfter(code$1) {
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return completeClosingTagAfter;
		}
		return completeEnd(code$1);
	}
	function completeAttributeNameBefore(code$1) {
		if (code$1 === 47) {
			effects.consume(code$1);
			return completeEnd;
		}
		if (code$1 === 58 || code$1 === 95 || asciiAlpha(code$1)) {
			effects.consume(code$1);
			return completeAttributeName;
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return completeAttributeNameBefore;
		}
		return completeEnd(code$1);
	}
	function completeAttributeName(code$1) {
		if (code$1 === 45 || code$1 === 46 || code$1 === 58 || code$1 === 95 || asciiAlphanumeric(code$1)) {
			effects.consume(code$1);
			return completeAttributeName;
		}
		return completeAttributeNameAfter(code$1);
	}
	function completeAttributeNameAfter(code$1) {
		if (code$1 === 61) {
			effects.consume(code$1);
			return completeAttributeValueBefore;
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return completeAttributeNameAfter;
		}
		return completeAttributeNameBefore(code$1);
	}
	function completeAttributeValueBefore(code$1) {
		if (code$1 === null || code$1 === 60 || code$1 === 61 || code$1 === 62 || code$1 === 96) return nok(code$1);
		if (code$1 === 34 || code$1 === 39) {
			effects.consume(code$1);
			markerB = code$1;
			return completeAttributeValueQuoted;
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return completeAttributeValueBefore;
		}
		return completeAttributeValueUnquoted(code$1);
	}
	function completeAttributeValueQuoted(code$1) {
		if (code$1 === markerB) {
			effects.consume(code$1);
			markerB = null;
			return completeAttributeValueQuotedAfter;
		}
		if (code$1 === null || markdownLineEnding(code$1)) return nok(code$1);
		effects.consume(code$1);
		return completeAttributeValueQuoted;
	}
	function completeAttributeValueUnquoted(code$1) {
		if (code$1 === null || code$1 === 34 || code$1 === 39 || code$1 === 47 || code$1 === 60 || code$1 === 61 || code$1 === 62 || code$1 === 96 || markdownLineEndingOrSpace(code$1)) return completeAttributeNameAfter(code$1);
		effects.consume(code$1);
		return completeAttributeValueUnquoted;
	}
	function completeAttributeValueQuotedAfter(code$1) {
		if (code$1 === 47 || code$1 === 62 || markdownSpace(code$1)) return completeAttributeNameBefore(code$1);
		return nok(code$1);
	}
	function completeEnd(code$1) {
		if (code$1 === 62) {
			effects.consume(code$1);
			return completeAfter;
		}
		return nok(code$1);
	}
	function completeAfter(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) return continuation(code$1);
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return completeAfter;
		}
		return nok(code$1);
	}
	function continuation(code$1) {
		if (code$1 === 45 && marker === 2) {
			effects.consume(code$1);
			return continuationCommentInside;
		}
		if (code$1 === 60 && marker === 1) {
			effects.consume(code$1);
			return continuationRawTagOpen;
		}
		if (code$1 === 62 && marker === 4) {
			effects.consume(code$1);
			return continuationClose;
		}
		if (code$1 === 63 && marker === 3) {
			effects.consume(code$1);
			return continuationDeclarationInside;
		}
		if (code$1 === 93 && marker === 5) {
			effects.consume(code$1);
			return continuationCdataInside;
		}
		if (markdownLineEnding(code$1) && (marker === 6 || marker === 7)) {
			effects.exit("htmlFlowData");
			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code$1);
		}
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("htmlFlowData");
			return continuationStart(code$1);
		}
		effects.consume(code$1);
		return continuation;
	}
	function continuationStart(code$1) {
		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code$1);
	}
	function continuationStartNonLazy(code$1) {
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return continuationBefore;
	}
	function continuationBefore(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) return continuationStart(code$1);
		effects.enter("htmlFlowData");
		return continuation(code$1);
	}
	function continuationCommentInside(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			return continuationDeclarationInside;
		}
		return continuation(code$1);
	}
	function continuationRawTagOpen(code$1) {
		if (code$1 === 47) {
			effects.consume(code$1);
			buffer = "";
			return continuationRawEndTag;
		}
		return continuation(code$1);
	}
	function continuationRawEndTag(code$1) {
		if (code$1 === 62) {
			const name = buffer.toLowerCase();
			if (htmlRawNames.includes(name)) {
				effects.consume(code$1);
				return continuationClose;
			}
			return continuation(code$1);
		}
		if (asciiAlpha(code$1) && buffer.length < 8) {
			effects.consume(code$1);
			buffer += String.fromCharCode(code$1);
			return continuationRawEndTag;
		}
		return continuation(code$1);
	}
	function continuationCdataInside(code$1) {
		if (code$1 === 93) {
			effects.consume(code$1);
			return continuationDeclarationInside;
		}
		return continuation(code$1);
	}
	function continuationDeclarationInside(code$1) {
		if (code$1 === 62) {
			effects.consume(code$1);
			return continuationClose;
		}
		if (code$1 === 45 && marker === 2) {
			effects.consume(code$1);
			return continuationDeclarationInside;
		}
		return continuation(code$1);
	}
	function continuationClose(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("htmlFlowData");
			return continuationAfter(code$1);
		}
		effects.consume(code$1);
		return continuationClose;
	}
	function continuationAfter(code$1) {
		effects.exit("htmlFlow");
		return ok$2(code$1);
	}
}
function tokenizeNonLazyContinuationStart(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		if (markdownLineEnding(code$1)) {
			effects.enter("lineEnding");
			effects.consume(code$1);
			effects.exit("lineEnding");
			return after;
		}
		return nok(code$1);
	}
	function after(code$1) {
		return self.parser.lazy[self.now().line] ? nok(code$1) : ok$2(code$1);
	}
}
function tokenizeBlankLineBefore(effects, ok$2, nok) {
	return start;
	function start(code$1) {
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return effects.attempt(blankLine, ok$2, nok);
	}
}
const htmlText = {
	name: "htmlText",
	tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok$2, nok) {
	const self = this;
	let marker;
	let index$1;
	let returnState;
	return start;
	function start(code$1) {
		effects.enter("htmlText");
		effects.enter("htmlTextData");
		effects.consume(code$1);
		return open;
	}
	function open(code$1) {
		if (code$1 === 33) {
			effects.consume(code$1);
			return declarationOpen;
		}
		if (code$1 === 47) {
			effects.consume(code$1);
			return tagCloseStart;
		}
		if (code$1 === 63) {
			effects.consume(code$1);
			return instruction;
		}
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			return tagOpen;
		}
		return nok(code$1);
	}
	function declarationOpen(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			return commentOpenInside;
		}
		if (code$1 === 91) {
			effects.consume(code$1);
			index$1 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			return declaration;
		}
		return nok(code$1);
	}
	function commentOpenInside(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			return commentEnd;
		}
		return nok(code$1);
	}
	function comment(code$1) {
		if (code$1 === null) return nok(code$1);
		if (code$1 === 45) {
			effects.consume(code$1);
			return commentClose;
		}
		if (markdownLineEnding(code$1)) {
			returnState = comment;
			return lineEndingBefore(code$1);
		}
		effects.consume(code$1);
		return comment;
	}
	function commentClose(code$1) {
		if (code$1 === 45) {
			effects.consume(code$1);
			return commentEnd;
		}
		return comment(code$1);
	}
	function commentEnd(code$1) {
		return code$1 === 62 ? end(code$1) : code$1 === 45 ? commentClose(code$1) : comment(code$1);
	}
	function cdataOpenInside(code$1) {
		if (code$1 === "CDATA[".charCodeAt(index$1++)) {
			effects.consume(code$1);
			return index$1 === 6 ? cdata : cdataOpenInside;
		}
		return nok(code$1);
	}
	function cdata(code$1) {
		if (code$1 === null) return nok(code$1);
		if (code$1 === 93) {
			effects.consume(code$1);
			return cdataClose;
		}
		if (markdownLineEnding(code$1)) {
			returnState = cdata;
			return lineEndingBefore(code$1);
		}
		effects.consume(code$1);
		return cdata;
	}
	function cdataClose(code$1) {
		if (code$1 === 93) {
			effects.consume(code$1);
			return cdataEnd;
		}
		return cdata(code$1);
	}
	function cdataEnd(code$1) {
		if (code$1 === 62) return end(code$1);
		if (code$1 === 93) {
			effects.consume(code$1);
			return cdataEnd;
		}
		return cdata(code$1);
	}
	function declaration(code$1) {
		if (code$1 === null || code$1 === 62) return end(code$1);
		if (markdownLineEnding(code$1)) {
			returnState = declaration;
			return lineEndingBefore(code$1);
		}
		effects.consume(code$1);
		return declaration;
	}
	function instruction(code$1) {
		if (code$1 === null) return nok(code$1);
		if (code$1 === 63) {
			effects.consume(code$1);
			return instructionClose;
		}
		if (markdownLineEnding(code$1)) {
			returnState = instruction;
			return lineEndingBefore(code$1);
		}
		effects.consume(code$1);
		return instruction;
	}
	function instructionClose(code$1) {
		return code$1 === 62 ? end(code$1) : instruction(code$1);
	}
	function tagCloseStart(code$1) {
		if (asciiAlpha(code$1)) {
			effects.consume(code$1);
			return tagClose;
		}
		return nok(code$1);
	}
	function tagClose(code$1) {
		if (code$1 === 45 || asciiAlphanumeric(code$1)) {
			effects.consume(code$1);
			return tagClose;
		}
		return tagCloseBetween(code$1);
	}
	function tagCloseBetween(code$1) {
		if (markdownLineEnding(code$1)) {
			returnState = tagCloseBetween;
			return lineEndingBefore(code$1);
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return tagCloseBetween;
		}
		return end(code$1);
	}
	function tagOpen(code$1) {
		if (code$1 === 45 || asciiAlphanumeric(code$1)) {
			effects.consume(code$1);
			return tagOpen;
		}
		if (code$1 === 47 || code$1 === 62 || markdownLineEndingOrSpace(code$1)) return tagOpenBetween(code$1);
		return nok(code$1);
	}
	function tagOpenBetween(code$1) {
		if (code$1 === 47) {
			effects.consume(code$1);
			return end;
		}
		if (code$1 === 58 || code$1 === 95 || asciiAlpha(code$1)) {
			effects.consume(code$1);
			return tagOpenAttributeName;
		}
		if (markdownLineEnding(code$1)) {
			returnState = tagOpenBetween;
			return lineEndingBefore(code$1);
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return tagOpenBetween;
		}
		return end(code$1);
	}
	function tagOpenAttributeName(code$1) {
		if (code$1 === 45 || code$1 === 46 || code$1 === 58 || code$1 === 95 || asciiAlphanumeric(code$1)) {
			effects.consume(code$1);
			return tagOpenAttributeName;
		}
		return tagOpenAttributeNameAfter(code$1);
	}
	function tagOpenAttributeNameAfter(code$1) {
		if (code$1 === 61) {
			effects.consume(code$1);
			return tagOpenAttributeValueBefore;
		}
		if (markdownLineEnding(code$1)) {
			returnState = tagOpenAttributeNameAfter;
			return lineEndingBefore(code$1);
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return tagOpenAttributeNameAfter;
		}
		return tagOpenBetween(code$1);
	}
	function tagOpenAttributeValueBefore(code$1) {
		if (code$1 === null || code$1 === 60 || code$1 === 61 || code$1 === 62 || code$1 === 96) return nok(code$1);
		if (code$1 === 34 || code$1 === 39) {
			effects.consume(code$1);
			marker = code$1;
			return tagOpenAttributeValueQuoted;
		}
		if (markdownLineEnding(code$1)) {
			returnState = tagOpenAttributeValueBefore;
			return lineEndingBefore(code$1);
		}
		if (markdownSpace(code$1)) {
			effects.consume(code$1);
			return tagOpenAttributeValueBefore;
		}
		effects.consume(code$1);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuoted(code$1) {
		if (code$1 === marker) {
			effects.consume(code$1);
			marker = void 0;
			return tagOpenAttributeValueQuotedAfter;
		}
		if (code$1 === null) return nok(code$1);
		if (markdownLineEnding(code$1)) {
			returnState = tagOpenAttributeValueQuoted;
			return lineEndingBefore(code$1);
		}
		effects.consume(code$1);
		return tagOpenAttributeValueQuoted;
	}
	function tagOpenAttributeValueUnquoted(code$1) {
		if (code$1 === null || code$1 === 34 || code$1 === 39 || code$1 === 60 || code$1 === 61 || code$1 === 96) return nok(code$1);
		if (code$1 === 47 || code$1 === 62 || markdownLineEndingOrSpace(code$1)) return tagOpenBetween(code$1);
		effects.consume(code$1);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuotedAfter(code$1) {
		if (code$1 === 47 || code$1 === 62 || markdownLineEndingOrSpace(code$1)) return tagOpenBetween(code$1);
		return nok(code$1);
	}
	function end(code$1) {
		if (code$1 === 62) {
			effects.consume(code$1);
			effects.exit("htmlTextData");
			effects.exit("htmlText");
			return ok$2;
		}
		return nok(code$1);
	}
	function lineEndingBefore(code$1) {
		effects.exit("htmlTextData");
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return lineEndingAfter;
	}
	function lineEndingAfter(code$1) {
		return markdownSpace(code$1) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$1) : lineEndingAfterPrefix(code$1);
	}
	function lineEndingAfterPrefix(code$1) {
		effects.enter("htmlTextData");
		return returnState(code$1);
	}
}
const labelEnd = {
	name: "labelEnd",
	resolveAll: resolveAllLabelEnd,
	resolveTo: resolveToLabelEnd,
	tokenize: tokenizeLabelEnd
};
var resourceConstruct = { tokenize: tokenizeResource };
var referenceFullConstruct = { tokenize: tokenizeReferenceFull };
var referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
function resolveAllLabelEnd(events) {
	let index$1 = -1;
	const newEvents = [];
	while (++index$1 < events.length) {
		const token = events[index$1][1];
		newEvents.push(events[index$1]);
		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
			const offset = token.type === "labelImage" ? 4 : 2;
			token.type = "data";
			index$1 += offset;
		}
	}
	if (events.length !== newEvents.length) splice(events, 0, events.length, newEvents);
	return events;
}
function resolveToLabelEnd(events, context) {
	let index$1 = events.length;
	let offset = 0;
	let token;
	let open;
	let close;
	let media;
	while (index$1--) {
		token = events[index$1][1];
		if (open) {
			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
			if (events[index$1][0] === "enter" && token.type === "labelLink") token._inactive = true;
		} else if (close) {
			if (events[index$1][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
				open = index$1;
				if (token.type !== "labelLink") {
					offset = 2;
					break;
				}
			}
		} else if (token.type === "labelEnd") close = index$1;
	}
	const group = {
		type: events[open][1].type === "labelLink" ? "link" : "image",
		start: { ...events[open][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	const label = {
		type: "label",
		start: { ...events[open][1].start },
		end: { ...events[close][1].end }
	};
	const text$3 = {
		type: "labelText",
		start: { ...events[open + offset + 2][1].end },
		end: { ...events[close - 2][1].start }
	};
	media = [[
		"enter",
		group,
		context
	], [
		"enter",
		label,
		context
	]];
	media = push(media, events.slice(open + 1, open + offset + 3));
	media = push(media, [[
		"enter",
		text$3,
		context
	]]);
	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
	media = push(media, [
		[
			"exit",
			text$3,
			context
		],
		events[close - 2],
		events[close - 1],
		[
			"exit",
			label,
			context
		]
	]);
	media = push(media, events.slice(close + 1));
	media = push(media, [[
		"exit",
		group,
		context
	]]);
	splice(events, open, events.length, media);
	return events;
}
function tokenizeLabelEnd(effects, ok$2, nok) {
	const self = this;
	let index$1 = self.events.length;
	let labelStart;
	let defined;
	while (index$1--) if ((self.events[index$1][1].type === "labelImage" || self.events[index$1][1].type === "labelLink") && !self.events[index$1][1]._balanced) {
		labelStart = self.events[index$1][1];
		break;
	}
	return start;
	function start(code$1) {
		if (!labelStart) return nok(code$1);
		if (labelStart._inactive) return labelEndNok(code$1);
		defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		})));
		effects.enter("labelEnd");
		effects.enter("labelMarker");
		effects.consume(code$1);
		effects.exit("labelMarker");
		effects.exit("labelEnd");
		return after;
	}
	function after(code$1) {
		if (code$1 === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code$1);
		if (code$1 === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code$1);
		return defined ? labelEndOk(code$1) : labelEndNok(code$1);
	}
	function referenceNotFull(code$1) {
		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code$1);
	}
	function labelEndOk(code$1) {
		return ok$2(code$1);
	}
	function labelEndNok(code$1) {
		labelStart._balanced = true;
		return nok(code$1);
	}
}
function tokenizeResource(effects, ok$2, nok) {
	return resourceStart;
	function resourceStart(code$1) {
		effects.enter("resource");
		effects.enter("resourceMarker");
		effects.consume(code$1);
		effects.exit("resourceMarker");
		return resourceBefore;
	}
	function resourceBefore(code$1) {
		return markdownLineEndingOrSpace(code$1) ? factoryWhitespace(effects, resourceOpen)(code$1) : resourceOpen(code$1);
	}
	function resourceOpen(code$1) {
		if (code$1 === 41) return resourceEnd(code$1);
		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code$1);
	}
	function resourceDestinationAfter(code$1) {
		return markdownLineEndingOrSpace(code$1) ? factoryWhitespace(effects, resourceBetween)(code$1) : resourceEnd(code$1);
	}
	function resourceDestinationMissing(code$1) {
		return nok(code$1);
	}
	function resourceBetween(code$1) {
		if (code$1 === 34 || code$1 === 39 || code$1 === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code$1);
		return resourceEnd(code$1);
	}
	function resourceTitleAfter(code$1) {
		return markdownLineEndingOrSpace(code$1) ? factoryWhitespace(effects, resourceEnd)(code$1) : resourceEnd(code$1);
	}
	function resourceEnd(code$1) {
		if (code$1 === 41) {
			effects.enter("resourceMarker");
			effects.consume(code$1);
			effects.exit("resourceMarker");
			effects.exit("resource");
			return ok$2;
		}
		return nok(code$1);
	}
}
function tokenizeReferenceFull(effects, ok$2, nok) {
	const self = this;
	return referenceFull;
	function referenceFull(code$1) {
		return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code$1);
	}
	function referenceFullAfter(code$1) {
		return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok$2(code$1) : nok(code$1);
	}
	function referenceFullMissing(code$1) {
		return nok(code$1);
	}
}
function tokenizeReferenceCollapsed(effects, ok$2, nok) {
	return referenceCollapsedStart;
	function referenceCollapsedStart(code$1) {
		effects.enter("reference");
		effects.enter("referenceMarker");
		effects.consume(code$1);
		effects.exit("referenceMarker");
		return referenceCollapsedOpen;
	}
	function referenceCollapsedOpen(code$1) {
		if (code$1 === 93) {
			effects.enter("referenceMarker");
			effects.consume(code$1);
			effects.exit("referenceMarker");
			effects.exit("reference");
			return ok$2;
		}
		return nok(code$1);
	}
}
const labelStartImage = {
	name: "labelStartImage",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		effects.enter("labelImage");
		effects.enter("labelImageMarker");
		effects.consume(code$1);
		effects.exit("labelImageMarker");
		return open;
	}
	function open(code$1) {
		if (code$1 === 91) {
			effects.enter("labelMarker");
			effects.consume(code$1);
			effects.exit("labelMarker");
			effects.exit("labelImage");
			return after;
		}
		return nok(code$1);
	}
	function after(code$1) {
		/* c8 ignore next 3 */
		return code$1 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$1) : ok$2(code$1);
	}
}
const labelStartLink = {
	name: "labelStartLink",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$1) {
		effects.enter("labelLink");
		effects.enter("labelMarker");
		effects.consume(code$1);
		effects.exit("labelMarker");
		effects.exit("labelLink");
		return after;
	}
	function after(code$1) {
		/* c8 ignore next 3 */
		return code$1 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$1) : ok$2(code$1);
	}
}
const lineEnding = {
	name: "lineEnding",
	tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok$2) {
	return start;
	function start(code$1) {
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return factorySpace(effects, ok$2, "linePrefix");
	}
}
const thematicBreak = {
	name: "thematicBreak",
	tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok$2, nok) {
	let size = 0;
	let marker;
	return start;
	function start(code$1) {
		effects.enter("thematicBreak");
		return before(code$1);
	}
	function before(code$1) {
		marker = code$1;
		return atBreak(code$1);
	}
	function atBreak(code$1) {
		if (code$1 === marker) {
			effects.enter("thematicBreakSequence");
			return sequence(code$1);
		}
		if (size >= 3 && (code$1 === null || markdownLineEnding(code$1))) {
			effects.exit("thematicBreak");
			return ok$2(code$1);
		}
		return nok(code$1);
	}
	function sequence(code$1) {
		if (code$1 === marker) {
			effects.consume(code$1);
			size++;
			return sequence;
		}
		effects.exit("thematicBreakSequence");
		return markdownSpace(code$1) ? factorySpace(effects, atBreak, "whitespace")(code$1) : atBreak(code$1);
	}
}
const list = {
	continuation: { tokenize: tokenizeListContinuation },
	exit: tokenizeListEnd,
	name: "list",
	tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
	partial: true,
	tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
	partial: true,
	tokenize: tokenizeIndent
};
function tokenizeListStart(effects, ok$2, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let size = 0;
	return start;
	function start(code$1) {
		const kind = self.containerState.type || (code$1 === 42 || code$1 === 43 || code$1 === 45 ? "listUnordered" : "listOrdered");
		if (kind === "listUnordered" ? !self.containerState.marker || code$1 === self.containerState.marker : asciiDigit(code$1)) {
			if (!self.containerState.type) {
				self.containerState.type = kind;
				effects.enter(kind, { _container: true });
			}
			if (kind === "listUnordered") {
				effects.enter("listItemPrefix");
				return code$1 === 42 || code$1 === 45 ? effects.check(thematicBreak, nok, atMarker)(code$1) : atMarker(code$1);
			}
			if (!self.interrupt || code$1 === 49) {
				effects.enter("listItemPrefix");
				effects.enter("listItemValue");
				return inside(code$1);
			}
		}
		return nok(code$1);
	}
	function inside(code$1) {
		if (asciiDigit(code$1) && ++size < 10) {
			effects.consume(code$1);
			return inside;
		}
		if ((!self.interrupt || size < 2) && (self.containerState.marker ? code$1 === self.containerState.marker : code$1 === 41 || code$1 === 46)) {
			effects.exit("listItemValue");
			return atMarker(code$1);
		}
		return nok(code$1);
	}
	function atMarker(code$1) {
		effects.enter("listItemMarker");
		effects.consume(code$1);
		effects.exit("listItemMarker");
		self.containerState.marker = self.containerState.marker || code$1;
		return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
	}
	function onBlank(code$1) {
		self.containerState.initialBlankLine = true;
		initialSize++;
		return endOfPrefix(code$1);
	}
	function otherPrefix(code$1) {
		if (markdownSpace(code$1)) {
			effects.enter("listItemPrefixWhitespace");
			effects.consume(code$1);
			effects.exit("listItemPrefixWhitespace");
			return endOfPrefix;
		}
		return nok(code$1);
	}
	function endOfPrefix(code$1) {
		self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
		return ok$2(code$1);
	}
}
function tokenizeListContinuation(effects, ok$2, nok) {
	const self = this;
	self.containerState._closeFlow = void 0;
	return effects.check(blankLine, onBlank, notBlank);
	function onBlank(code$1) {
		self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
		return factorySpace(effects, ok$2, "listItemIndent", self.containerState.size + 1)(code$1);
	}
	function notBlank(code$1) {
		if (self.containerState.furtherBlankLines || !markdownSpace(code$1)) {
			self.containerState.furtherBlankLines = void 0;
			self.containerState.initialBlankLine = void 0;
			return notInCurrentItem(code$1);
		}
		self.containerState.furtherBlankLines = void 0;
		self.containerState.initialBlankLine = void 0;
		return effects.attempt(indentConstruct, ok$2, notInCurrentItem)(code$1);
	}
	function notInCurrentItem(code$1) {
		self.containerState._closeFlow = true;
		self.interrupt = void 0;
		return factorySpace(effects, effects.attempt(list, ok$2, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$1);
	}
}
function tokenizeIndent(effects, ok$2, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
	function afterPrefix(code$1) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok$2(code$1) : nok(code$1);
	}
}
function tokenizeListEnd(effects) {
	effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok$2, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function afterPrefix(code$1) {
		const tail = self.events[self.events.length - 1];
		return !markdownSpace(code$1) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok$2(code$1) : nok(code$1);
	}
}
const setextUnderline = {
	name: "setextUnderline",
	resolveTo: resolveToSetextUnderline,
	tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
	let index$1 = events.length;
	let content$2;
	let text$3;
	let definition$2;
	while (index$1--) if (events[index$1][0] === "enter") {
		if (events[index$1][1].type === "content") {
			content$2 = index$1;
			break;
		}
		if (events[index$1][1].type === "paragraph") text$3 = index$1;
	} else {
		if (events[index$1][1].type === "content") events.splice(index$1, 1);
		if (!definition$2 && events[index$1][1].type === "definition") definition$2 = index$1;
	}
	const heading$1 = {
		type: "setextHeading",
		start: { ...events[content$2][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	events[text$3][1].type = "setextHeadingText";
	if (definition$2) {
		events.splice(text$3, 0, [
			"enter",
			heading$1,
			context
		]);
		events.splice(definition$2 + 1, 0, [
			"exit",
			events[content$2][1],
			context
		]);
		events[content$2][1].end = { ...events[definition$2][1].end };
	} else events[content$2][1] = heading$1;
	events.push([
		"exit",
		heading$1,
		context
	]);
	return events;
}
function tokenizeSetextUnderline(effects, ok$2, nok) {
	const self = this;
	let marker;
	return start;
	function start(code$1) {
		let index$1 = self.events.length;
		let paragraph$1;
		while (index$1--) if (self.events[index$1][1].type !== "lineEnding" && self.events[index$1][1].type !== "linePrefix" && self.events[index$1][1].type !== "content") {
			paragraph$1 = self.events[index$1][1].type === "paragraph";
			break;
		}
		if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph$1)) {
			effects.enter("setextHeadingLine");
			marker = code$1;
			return before(code$1);
		}
		return nok(code$1);
	}
	function before(code$1) {
		effects.enter("setextHeadingLineSequence");
		return inside(code$1);
	}
	function inside(code$1) {
		if (code$1 === marker) {
			effects.consume(code$1);
			return inside;
		}
		effects.exit("setextHeadingLineSequence");
		return markdownSpace(code$1) ? factorySpace(effects, after, "lineSuffix")(code$1) : after(code$1);
	}
	function after(code$1) {
		if (code$1 === null || markdownLineEnding(code$1)) {
			effects.exit("setextHeadingLine");
			return ok$2(code$1);
		}
		return nok(code$1);
	}
}
function stringifyPosition(value) {
	if (!value || typeof value !== "object") return "";
	if ("position" in value || "type" in value) return position(value.position);
	if ("start" in value || "end" in value) return position(value);
	if ("line" in value || "column" in value) return point$1(value);
	return "";
}
function point$1(point$2) {
	return index(point$2 && point$2.line) + ":" + index(point$2 && point$2.column);
}
function position(pos) {
	return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
	return value && typeof value === "number" ? value : 1;
}
var VFileMessage = class extends Error {
	constructor(causeOrReason, optionsOrParentOrPlace, origin) {
		super();
		if (typeof optionsOrParentOrPlace === "string") {
			origin = optionsOrParentOrPlace;
			optionsOrParentOrPlace = void 0;
		}
		let reason = "";
		let options = {};
		let legacyCause = false;
		if (optionsOrParentOrPlace) if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) options = { place: optionsOrParentOrPlace };
		else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) options = { place: optionsOrParentOrPlace };
		else if ("type" in optionsOrParentOrPlace) options = {
			ancestors: [optionsOrParentOrPlace],
			place: optionsOrParentOrPlace.position
		};
		else options = { ...optionsOrParentOrPlace };
		if (typeof causeOrReason === "string") reason = causeOrReason;
		else if (!options.cause && causeOrReason) {
			legacyCause = true;
			reason = causeOrReason.message;
			options.cause = causeOrReason;
		}
		if (!options.ruleId && !options.source && typeof origin === "string") {
			const index$1 = origin.indexOf(":");
			if (index$1 === -1) options.ruleId = origin;
			else {
				options.source = origin.slice(0, index$1);
				options.ruleId = origin.slice(index$1 + 1);
			}
		}
		if (!options.place && options.ancestors && options.ancestors) {
			const parent = options.ancestors[options.ancestors.length - 1];
			if (parent) options.place = parent.position;
		}
		const start = options.place && "start" in options.place ? options.place.start : options.place;
		this.ancestors = options.ancestors || void 0;
		this.cause = options.cause || void 0;
		this.column = start ? start.column : void 0;
		this.fatal = void 0;
		this.file = "";
		this.message = reason;
		this.line = start ? start.line : void 0;
		this.name = stringifyPosition(options.place) || "1:1";
		this.place = options.place || void 0;
		this.reason = this.message;
		this.ruleId = options.ruleId || void 0;
		this.source = options.source || void 0;
		this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
		this.actual = void 0;
		this.expected = void 0;
		this.note = void 0;
		this.url = void 0;
	}
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;
const content = { tokenize: initializeContent };
function initializeContent(effects) {
	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
	let previous$1;
	return contentStart;
	function afterContentStartConstruct(code$1) {
		if (code$1 === null) {
			effects.consume(code$1);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		return factorySpace(effects, contentStart, "linePrefix");
	}
	function paragraphInitial(code$1) {
		effects.enter("paragraph");
		return lineStart(code$1);
	}
	function lineStart(code$1) {
		const token = effects.enter("chunkText", {
			contentType: "text",
			previous: previous$1
		});
		if (previous$1) previous$1.next = token;
		previous$1 = token;
		return data(code$1);
	}
	function data(code$1) {
		if (code$1 === null) {
			effects.exit("chunkText");
			effects.exit("paragraph");
			effects.consume(code$1);
			return;
		}
		if (markdownLineEnding(code$1)) {
			effects.consume(code$1);
			effects.exit("chunkText");
			return lineStart;
		}
		effects.consume(code$1);
		return data;
	}
}
const document$1 = { tokenize: initializeDocument };
var containerConstruct = { tokenize: tokenizeContainer };
function initializeDocument(effects) {
	const self = this;
	const stack = [];
	let continued = 0;
	let childFlow;
	let childToken;
	let lineStartOffset;
	return start;
	function start(code$1) {
		if (continued < stack.length) {
			const item = stack[continued];
			self.containerState = item[1];
			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code$1);
		}
		return checkNewContainers(code$1);
	}
	function documentContinue(code$1) {
		continued++;
		if (self.containerState._closeFlow) {
			self.containerState._closeFlow = void 0;
			if (childFlow) closeFlow();
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let point$2;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				point$2 = self.events[indexBeforeFlow][1].end;
				break;
			}
			exitContainers(continued);
			let index$1 = indexBeforeExits;
			while (index$1 < self.events.length) {
				self.events[index$1][1].end = { ...point$2 };
				index$1++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index$1;
			return checkNewContainers(code$1);
		}
		return start(code$1);
	}
	function checkNewContainers(code$1) {
		if (continued === stack.length) {
			if (!childFlow) return documentContinued(code$1);
			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code$1);
			self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
		}
		self.containerState = {};
		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code$1);
	}
	function thereIsANewContainer(code$1) {
		if (childFlow) closeFlow();
		exitContainers(continued);
		return documentContinued(code$1);
	}
	function thereIsNoNewContainer(code$1) {
		self.parser.lazy[self.now().line] = continued !== stack.length;
		lineStartOffset = self.now().offset;
		return flowStart(code$1);
	}
	function documentContinued(code$1) {
		self.containerState = {};
		return effects.attempt(containerConstruct, containerContinue, flowStart)(code$1);
	}
	function containerContinue(code$1) {
		continued++;
		stack.push([self.currentConstruct, self.containerState]);
		return documentContinued(code$1);
	}
	function flowStart(code$1) {
		if (code$1 === null) {
			if (childFlow) closeFlow();
			exitContainers(0);
			effects.consume(code$1);
			return;
		}
		childFlow = childFlow || self.parser.flow(self.now());
		effects.enter("chunkFlow", {
			_tokenizer: childFlow,
			contentType: "flow",
			previous: childToken
		});
		return flowContinue(code$1);
	}
	function flowContinue(code$1) {
		if (code$1 === null) {
			writeToChild(effects.exit("chunkFlow"), true);
			exitContainers(0);
			effects.consume(code$1);
			return;
		}
		if (markdownLineEnding(code$1)) {
			effects.consume(code$1);
			writeToChild(effects.exit("chunkFlow"));
			continued = 0;
			self.interrupt = void 0;
			return start;
		}
		effects.consume(code$1);
		return flowContinue;
	}
	function writeToChild(token, endOfFile) {
		const stream = self.sliceStream(token);
		if (endOfFile) stream.push(null);
		token.previous = childToken;
		if (childToken) childToken.next = token;
		childToken = token;
		childFlow.defineSkip(token.start);
		childFlow.write(stream);
		if (self.parser.lazy[token.start.line]) {
			let index$1 = childFlow.events.length;
			while (index$1--) if (childFlow.events[index$1][1].start.offset < lineStartOffset && (!childFlow.events[index$1][1].end || childFlow.events[index$1][1].end.offset > lineStartOffset)) return;
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let seen;
			let point$2;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				if (seen) {
					point$2 = self.events[indexBeforeFlow][1].end;
					break;
				}
				seen = true;
			}
			exitContainers(continued);
			index$1 = indexBeforeExits;
			while (index$1 < self.events.length) {
				self.events[index$1][1].end = { ...point$2 };
				index$1++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index$1;
		}
	}
	function exitContainers(size) {
		let index$1 = stack.length;
		while (index$1-- > size) {
			const entry = stack[index$1];
			self.containerState = entry[1];
			entry[0].exit.call(self, effects);
		}
		stack.length = size;
	}
	function closeFlow() {
		childFlow.write([null]);
		childToken = void 0;
		childFlow = void 0;
		self.containerState._closeFlow = void 0;
	}
}
function tokenizeContainer(effects, ok$2, nok) {
	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok$2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
const flow = { tokenize: initializeFlow };
function initializeFlow(effects) {
	const self = this;
	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content$1, afterConstruct)), "linePrefix")));
	return initial;
	function atBlankEnding(code$1) {
		if (code$1 === null) {
			effects.consume(code$1);
			return;
		}
		effects.enter("lineEndingBlank");
		effects.consume(code$1);
		effects.exit("lineEndingBlank");
		self.currentConstruct = void 0;
		return initial;
	}
	function afterConstruct(code$1) {
		if (code$1 === null) {
			effects.consume(code$1);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$1);
		effects.exit("lineEnding");
		self.currentConstruct = void 0;
		return initial;
	}
}
const resolver = { resolveAll: createResolver() };
const string = initializeFactory("string");
const text = initializeFactory("text");
function initializeFactory(field) {
	return {
		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
		tokenize: initializeText
	};
	function initializeText(effects) {
		const self = this;
		const constructs$1 = this.parser.constructs[field];
		const text$3 = effects.attempt(constructs$1, start, notText);
		return start;
		function start(code$1) {
			return atBreak(code$1) ? text$3(code$1) : notText(code$1);
		}
		function notText(code$1) {
			if (code$1 === null) {
				effects.consume(code$1);
				return;
			}
			effects.enter("data");
			effects.consume(code$1);
			return data;
		}
		function data(code$1) {
			if (atBreak(code$1)) {
				effects.exit("data");
				return text$3(code$1);
			}
			effects.consume(code$1);
			return data;
		}
		function atBreak(code$1) {
			if (code$1 === null) return true;
			const list$2 = constructs$1[code$1];
			let index$1 = -1;
			if (list$2) while (++index$1 < list$2.length) {
				const item = list$2[index$1];
				if (!item.previous || item.previous.call(self, self.previous)) return true;
			}
			return false;
		}
	}
}
function createResolver(extraResolver) {
	return resolveAllText;
	function resolveAllText(events, context) {
		let index$1 = -1;
		let enter;
		while (++index$1 <= events.length) if (enter === void 0) {
			if (events[index$1] && events[index$1][1].type === "data") {
				enter = index$1;
				index$1++;
			}
		} else if (!events[index$1] || events[index$1][1].type !== "data") {
			if (index$1 !== enter + 2) {
				events[enter][1].end = events[index$1 - 1][1].end;
				events.splice(enter + 2, index$1 - enter - 2);
				index$1 = enter + 2;
			}
			enter = void 0;
		}
		return extraResolver ? extraResolver(events, context) : events;
	}
}
function resolveAllLineSuffixes(events, context) {
	let eventIndex = 0;
	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
		const data = events[eventIndex - 1][1];
		const chunks = context.sliceStream(data);
		let index$1 = chunks.length;
		let bufferIndex = -1;
		let size = 0;
		let tabs;
		while (index$1--) {
			const chunk = chunks[index$1];
			if (typeof chunk === "string") {
				bufferIndex = chunk.length;
				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
					size++;
					bufferIndex--;
				}
				if (bufferIndex) break;
				bufferIndex = -1;
			} else if (chunk === -2) {
				tabs = true;
				size++;
			} else if (chunk === -1) {} else {
				index$1++;
				break;
			}
		}
		if (context._contentTypeTextTrailing && eventIndex === events.length) size = 0;
		if (size) {
			const token = {
				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: index$1 ? bufferIndex : data.start._bufferIndex + bufferIndex,
					_index: data.start._index + index$1,
					line: data.end.line,
					column: data.end.column - size,
					offset: data.end.offset - size
				},
				end: { ...data.end }
			};
			data.end = { ...token.start };
			if (data.start.offset === data.end.offset) Object.assign(data, token);
			else {
				events.splice(eventIndex, 0, [
					"enter",
					token,
					context
				], [
					"exit",
					token,
					context
				]);
				eventIndex += 2;
			}
		}
		eventIndex++;
	}
	return events;
}
var constructs_exports = /* @__PURE__ */ __export({
	attentionMarkers: () => attentionMarkers,
	contentInitial: () => contentInitial,
	disable: () => disable,
	document: () => document$2,
	flow: () => flow$1,
	flowInitial: () => flowInitial,
	insideSpan: () => insideSpan,
	string: () => string$1,
	text: () => text$1
}, 1);
const document$2 = {
	[42]: list,
	[43]: list,
	[45]: list,
	[48]: list,
	[49]: list,
	[50]: list,
	[51]: list,
	[52]: list,
	[53]: list,
	[54]: list,
	[55]: list,
	[56]: list,
	[57]: list,
	[62]: blockQuote
};
const contentInitial = { [91]: definition };
const flowInitial = {
	[-2]: codeIndented,
	[-1]: codeIndented,
	[32]: codeIndented
};
const flow$1 = {
	[35]: headingAtx,
	[42]: thematicBreak,
	[45]: [setextUnderline, thematicBreak],
	[60]: htmlFlow,
	[61]: setextUnderline,
	[95]: thematicBreak,
	[96]: codeFenced,
	[126]: codeFenced
};
const string$1 = {
	[38]: characterReference,
	[92]: characterEscape
};
const text$1 = {
	[-5]: lineEnding,
	[-4]: lineEnding,
	[-3]: lineEnding,
	[33]: labelStartImage,
	[38]: characterReference,
	[42]: attention,
	[60]: [autolink, htmlText],
	[91]: labelStartLink,
	[92]: [hardBreakEscape, characterEscape],
	[93]: labelEnd,
	[95]: attention,
	[96]: codeText
};
const insideSpan = { null: [attention, resolver] };
const attentionMarkers = { null: [42, 95] };
const disable = { null: [] };
function createTokenizer(parser, initialize, from) {
	let point$2 = {
		_bufferIndex: -1,
		_index: 0,
		line: from && from.line || 1,
		column: from && from.column || 1,
		offset: from && from.offset || 0
	};
	const columnStart = {};
	const resolveAllConstructs = [];
	let chunks = [];
	let stack = [];
	const effects = {
		attempt: constructFactory(onsuccessfulconstruct),
		check: constructFactory(onsuccessfulcheck),
		consume,
		enter,
		exit: exit$1,
		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
	};
	const context = {
		code: null,
		containerState: {},
		defineSkip,
		events: [],
		now,
		parser,
		previous: null,
		sliceSerialize,
		sliceStream,
		write
	};
	let state = initialize.tokenize.call(context, effects);
	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
	return context;
	function write(slice) {
		chunks = push(chunks, slice);
		main();
		if (chunks[chunks.length - 1] !== null) return [];
		addResult(initialize, 0);
		context.events = resolveAll(resolveAllConstructs, context.events, context);
		return context.events;
	}
	function sliceSerialize(token, expandTabs) {
		return serializeChunks(sliceStream(token), expandTabs);
	}
	function sliceStream(token) {
		return sliceChunks(chunks, token);
	}
	function now() {
		const { _bufferIndex, _index, line, column, offset } = point$2;
		return {
			_bufferIndex,
			_index,
			line,
			column,
			offset
		};
	}
	function defineSkip(value) {
		columnStart[value.line] = value.column;
		accountForPotentialSkip();
	}
	function main() {
		let chunkIndex;
		while (point$2._index < chunks.length) {
			const chunk = chunks[point$2._index];
			if (typeof chunk === "string") {
				chunkIndex = point$2._index;
				if (point$2._bufferIndex < 0) point$2._bufferIndex = 0;
				while (point$2._index === chunkIndex && point$2._bufferIndex < chunk.length) go(chunk.charCodeAt(point$2._bufferIndex));
			} else go(chunk);
		}
	}
	function go(code$1) {
		state = state(code$1);
	}
	function consume(code$1) {
		if (markdownLineEnding(code$1)) {
			point$2.line++;
			point$2.column = 1;
			point$2.offset += code$1 === -3 ? 2 : 1;
			accountForPotentialSkip();
		} else if (code$1 !== -1) {
			point$2.column++;
			point$2.offset++;
		}
		if (point$2._bufferIndex < 0) point$2._index++;
		else {
			point$2._bufferIndex++;
			if (point$2._bufferIndex === chunks[point$2._index].length) {
				point$2._bufferIndex = -1;
				point$2._index++;
			}
		}
		context.previous = code$1;
	}
	function enter(type, fields) {
		const token = fields || {};
		token.type = type;
		token.start = now();
		context.events.push([
			"enter",
			token,
			context
		]);
		stack.push(token);
		return token;
	}
	function exit$1(type) {
		const token = stack.pop();
		token.end = now();
		context.events.push([
			"exit",
			token,
			context
		]);
		return token;
	}
	function onsuccessfulconstruct(construct, info) {
		addResult(construct, info.from);
	}
	function onsuccessfulcheck(_, info) {
		info.restore();
	}
	function constructFactory(onreturn, fields) {
		return hook;
		function hook(constructs$1, returnState, bogusState) {
			let listOfConstructs;
			let constructIndex;
			let currentConstruct;
			let info;
			return Array.isArray(constructs$1) ? handleListOfConstructs(constructs$1) : "tokenize" in constructs$1 ? handleListOfConstructs([constructs$1]) : handleMapOfConstructs(constructs$1);
			function handleMapOfConstructs(map$2) {
				return start;
				function start(code$1) {
					const left = code$1 !== null && map$2[code$1];
					const all$1 = code$1 !== null && map$2.null;
					return handleListOfConstructs([...Array.isArray(left) ? left : left ? [left] : [], ...Array.isArray(all$1) ? all$1 : all$1 ? [all$1] : []])(code$1);
				}
			}
			function handleListOfConstructs(list$2) {
				listOfConstructs = list$2;
				constructIndex = 0;
				if (list$2.length === 0) return bogusState;
				return handleConstruct(list$2[constructIndex]);
			}
			function handleConstruct(construct) {
				return start;
				function start(code$1) {
					info = store();
					currentConstruct = construct;
					if (!construct.partial) context.currentConstruct = construct;
					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code$1);
					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok$2, nok)(code$1);
				}
			}
			function ok$2(code$1) {
				onreturn(currentConstruct, info);
				return returnState;
			}
			function nok(code$1) {
				info.restore();
				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
				return bogusState;
			}
		}
	}
	function addResult(construct, from$1) {
		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
		if (construct.resolve) splice(context.events, from$1, context.events.length - from$1, construct.resolve(context.events.slice(from$1), context));
		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
	}
	function store() {
		const startPoint = now();
		const startPrevious = context.previous;
		const startCurrentConstruct = context.currentConstruct;
		const startEventsIndex = context.events.length;
		const startStack = Array.from(stack);
		return {
			from: startEventsIndex,
			restore
		};
		function restore() {
			point$2 = startPoint;
			context.previous = startPrevious;
			context.currentConstruct = startCurrentConstruct;
			context.events.length = startEventsIndex;
			stack = startStack;
			accountForPotentialSkip();
		}
	}
	function accountForPotentialSkip() {
		if (point$2.line in columnStart && point$2.column < 2) {
			point$2.column = columnStart[point$2.line];
			point$2.offset += columnStart[point$2.line] - 1;
		}
	}
}
function sliceChunks(chunks, token) {
	const startIndex = token.start._index;
	const startBufferIndex = token.start._bufferIndex;
	const endIndex = token.end._index;
	const endBufferIndex = token.end._bufferIndex;
	let view;
	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	else {
		view = chunks.slice(startIndex, endIndex);
		if (startBufferIndex > -1) {
			const head = view[0];
			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
			else view.shift();
		}
		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
	}
	return view;
}
function serializeChunks(chunks, expandTabs) {
	let index$1 = -1;
	const result = [];
	let atTab;
	while (++index$1 < chunks.length) {
		const chunk = chunks[index$1];
		let value;
		if (typeof chunk === "string") value = chunk;
		else switch (chunk) {
			case -5:
				value = "\r";
				break;
			case -4:
				value = "\n";
				break;
			case -3:
				value = "\r\n";
				break;
			case -2:
				value = expandTabs ? " " : "	";
				break;
			case -1:
				if (!expandTabs && atTab) continue;
				value = " ";
				break;
			default: value = String.fromCharCode(chunk);
		}
		atTab = chunk === -2;
		result.push(value);
	}
	return result.join("");
}
function parse(options) {
	const parser = {
		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
		content: create(content),
		defined: [],
		document: create(document$1),
		flow: create(flow),
		lazy: {},
		string: create(string),
		text: create(text)
	};
	return parser;
	function create(initial) {
		return creator;
		function creator(from) {
			return createTokenizer(parser, initial, from);
		}
	}
}
function postprocess(events) {
	while (!subtokenize(events));
	return events;
}
var search = /[\0\t\n\r]/g;
function preprocess() {
	let column = 1;
	let buffer = "";
	let start = true;
	let atCarriageReturn;
	return preprocessor;
	function preprocessor(value, encoding, end) {
		const chunks = [];
		let match;
		let next;
		let startPosition;
		let endPosition;
		let code$1;
		value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
		startPosition = 0;
		buffer = "";
		if (start) {
			if (value.charCodeAt(0) === 65279) startPosition++;
			start = void 0;
		}
		while (startPosition < value.length) {
			search.lastIndex = startPosition;
			match = search.exec(value);
			endPosition = match && match.index !== void 0 ? match.index : value.length;
			code$1 = value.charCodeAt(endPosition);
			if (!match) {
				buffer = value.slice(startPosition);
				break;
			}
			if (code$1 === 10 && startPosition === endPosition && atCarriageReturn) {
				chunks.push(-3);
				atCarriageReturn = void 0;
			} else {
				if (atCarriageReturn) {
					chunks.push(-5);
					atCarriageReturn = void 0;
				}
				if (startPosition < endPosition) {
					chunks.push(value.slice(startPosition, endPosition));
					column += endPosition - startPosition;
				}
				switch (code$1) {
					case 0:
						chunks.push(65533);
						column++;
						break;
					case 9:
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
						break;
					case 10:
						chunks.push(-4);
						column = 1;
						break;
					default:
						atCarriageReturn = true;
						column = 1;
				}
			}
			startPosition = endPosition + 1;
		}
		if (end) {
			if (atCarriageReturn) chunks.push(-5);
			if (buffer) chunks.push(buffer);
			chunks.push(null);
		}
		return chunks;
	}
}
var own$1 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
	if (typeof encoding !== "string") {
		options = encoding;
		encoding = void 0;
	}
	return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
}
function compiler(options) {
	const config = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: opener(link$1),
			autolinkProtocol: onenterdata,
			autolinkEmail: onenterdata,
			atxHeading: opener(heading$1),
			blockQuote: opener(blockQuote$1),
			characterEscape: onenterdata,
			characterReference: onenterdata,
			codeFenced: opener(codeFlow),
			codeFencedFenceInfo: buffer,
			codeFencedFenceMeta: buffer,
			codeIndented: opener(codeFlow, buffer),
			codeText: opener(codeText$1, buffer),
			codeTextData: onenterdata,
			data: onenterdata,
			codeFlowValue: onenterdata,
			definition: opener(definition$2),
			definitionDestinationString: buffer,
			definitionLabelString: buffer,
			definitionTitleString: buffer,
			emphasis: opener(emphasis$1),
			hardBreakEscape: opener(hardBreak$1),
			hardBreakTrailing: opener(hardBreak$1),
			htmlFlow: opener(html$1, buffer),
			htmlFlowData: onenterdata,
			htmlText: opener(html$1, buffer),
			htmlTextData: onenterdata,
			image: opener(image$1),
			label: buffer,
			link: opener(link$1),
			listItem: opener(listItem$1),
			listItemValue: onenterlistitemvalue,
			listOrdered: opener(list$2, onenterlistordered),
			listUnordered: opener(list$2),
			paragraph: opener(paragraph$1),
			reference: onenterreference,
			referenceString: buffer,
			resourceDestinationString: buffer,
			resourceTitleString: buffer,
			setextHeading: opener(heading$1),
			strong: opener(strong$1),
			thematicBreak: opener(thematicBreak$2)
		},
		exit: {
			atxHeading: closer(),
			atxHeadingSequence: onexitatxheadingsequence,
			autolink: closer(),
			autolinkEmail: onexitautolinkemail,
			autolinkProtocol: onexitautolinkprotocol,
			blockQuote: closer(),
			characterEscapeValue: onexitdata,
			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
			characterReferenceValue: onexitcharacterreferencevalue,
			characterReference: onexitcharacterreference,
			codeFenced: closer(onexitcodefenced),
			codeFencedFence: onexitcodefencedfence,
			codeFencedFenceInfo: onexitcodefencedfenceinfo,
			codeFencedFenceMeta: onexitcodefencedfencemeta,
			codeFlowValue: onexitdata,
			codeIndented: closer(onexitcodeindented),
			codeText: closer(onexitcodetext),
			codeTextData: onexitdata,
			data: onexitdata,
			definition: closer(),
			definitionDestinationString: onexitdefinitiondestinationstring,
			definitionLabelString: onexitdefinitionlabelstring,
			definitionTitleString: onexitdefinitiontitlestring,
			emphasis: closer(),
			hardBreakEscape: closer(onexithardbreak),
			hardBreakTrailing: closer(onexithardbreak),
			htmlFlow: closer(onexithtmlflow),
			htmlFlowData: onexitdata,
			htmlText: closer(onexithtmltext),
			htmlTextData: onexitdata,
			image: closer(onexitimage),
			label: onexitlabel,
			labelText: onexitlabeltext,
			lineEnding: onexitlineending,
			link: closer(onexitlink),
			listItem: closer(),
			listOrdered: closer(),
			listUnordered: closer(),
			paragraph: closer(),
			referenceString: onexitreferencestring,
			resourceDestinationString: onexitresourcedestinationstring,
			resourceTitleString: onexitresourcetitlestring,
			resource: onexitresource,
			setextHeading: closer(onexitsetextheading),
			setextHeadingLineSequence: onexitsetextheadinglinesequence,
			setextHeadingText: onexitsetextheadingtext,
			strong: closer(),
			thematicBreak: closer()
		}
	};
	configure(config, (options || {}).mdastExtensions || []);
	const data = {};
	return compile;
	function compile(events) {
		let tree = {
			type: "root",
			children: []
		};
		const context = {
			stack: [tree],
			tokenStack: [],
			config,
			enter,
			exit: exit$1,
			buffer,
			resume,
			data
		};
		const listStack = [];
		let index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][1].type === "listOrdered" || events[index$1][1].type === "listUnordered") if (events[index$1][0] === "enter") listStack.push(index$1);
		else index$1 = prepareList(events, listStack.pop(), index$1);
		index$1 = -1;
		while (++index$1 < events.length) {
			const handler = config[events[index$1][0]];
			if (own$1.call(handler, events[index$1][1].type)) handler[events[index$1][1].type].call(Object.assign({ sliceSerialize: events[index$1][2].sliceSerialize }, context), events[index$1][1]);
		}
		if (context.tokenStack.length > 0) {
			const tail = context.tokenStack[context.tokenStack.length - 1];
			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
		}
		tree.position = {
			start: point(events.length > 0 ? events[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: point(events.length > 0 ? events[events.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		};
		index$1 = -1;
		while (++index$1 < config.transforms.length) tree = config.transforms[index$1](tree) || tree;
		return tree;
	}
	function prepareList(events, start, length) {
		let index$1 = start - 1;
		let containerBalance = -1;
		let listSpread = false;
		let listItem$2;
		let lineIndex;
		let firstBlankLineIndex;
		let atMarker;
		while (++index$1 <= length) {
			const event = events[index$1];
			switch (event[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					if (event[0] === "enter") containerBalance++;
					else containerBalance--;
					atMarker = void 0;
					break;
				case "lineEndingBlank":
					if (event[0] === "enter") {
						if (listItem$2 && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index$1;
						atMarker = void 0;
					}
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: atMarker = void 0;
			}
			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
				if (listItem$2) {
					let tailIndex = index$1;
					lineIndex = void 0;
					while (tailIndex--) {
						const tailEvent = events[tailIndex];
						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
							if (tailEvent[0] === "exit") continue;
							if (lineIndex) {
								events[lineIndex][1].type = "lineEndingBlank";
								listSpread = true;
							}
							tailEvent[1].type = "lineEnding";
							lineIndex = tailIndex;
						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
					}
					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem$2._spread = true;
					listItem$2.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
					events.splice(lineIndex || index$1, 0, [
						"exit",
						listItem$2,
						event[2]
					]);
					index$1++;
					length++;
				}
				if (event[1].type === "listItemPrefix") {
					const item = {
						type: "listItem",
						_spread: false,
						start: Object.assign({}, event[1].start),
						end: void 0
					};
					listItem$2 = item;
					events.splice(index$1, 0, [
						"enter",
						item,
						event[2]
					]);
					index$1++;
					length++;
					firstBlankLineIndex = void 0;
					atMarker = true;
				}
			}
		}
		events[start][1]._spread = listSpread;
		return length;
	}
	function opener(create, and) {
		return open;
		function open(token) {
			enter.call(this, create(token), token);
			if (and) and.call(this, token);
		}
	}
	function buffer() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function enter(node$1, token, errorHandler) {
		this.stack[this.stack.length - 1].children.push(node$1);
		this.stack.push(node$1);
		this.tokenStack.push([token, errorHandler || void 0]);
		node$1.position = {
			start: point(token.start),
			end: void 0
		};
	}
	function closer(and) {
		return close;
		function close(token) {
			if (and) and.call(this, token);
			exit$1.call(this, token);
		}
	}
	function exit$1(token, onExitError) {
		const node$1 = this.stack.pop();
		const open = this.tokenStack.pop();
		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
			start: token.start,
			end: token.end
		}) + "): it’s not open");
		else if (open[0].type !== token.type) if (onExitError) onExitError.call(this, token, open[0]);
		else (open[1] || defaultOnError).call(this, token, open[0]);
		node$1.position.end = point(token.end);
	}
	function resume() {
		return toString(this.stack.pop());
	}
	function onenterlistordered() {
		this.data.expectingFirstListItemValue = true;
	}
	function onenterlistitemvalue(token) {
		if (this.data.expectingFirstListItemValue) {
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
			this.data.expectingFirstListItemValue = void 0;
		}
	}
	function onexitcodefencedfenceinfo() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.lang = data$1;
	}
	function onexitcodefencedfencemeta() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.meta = data$1;
	}
	function onexitcodefencedfence() {
		if (this.data.flowCodeInside) return;
		this.buffer();
		this.data.flowCodeInside = true;
	}
	function onexitcodefenced() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		this.data.flowCodeInside = void 0;
	}
	function onexitcodeindented() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/(\r?\n|\r)$/g, "");
	}
	function onexitdefinitionlabelstring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	}
	function onexitdefinitiontitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitdefinitiondestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitatxheadingsequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		if (!node$1.depth) node$1.depth = this.sliceSerialize(token).length;
	}
	function onexitsetextheadingtext() {
		this.data.setextHeadingSlurpLineEnding = true;
	}
	function onexitsetextheadinglinesequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		node$1.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
	}
	function onexitsetextheading() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function onenterdata(token) {
		const siblings = this.stack[this.stack.length - 1].children;
		let tail = siblings[siblings.length - 1];
		if (!tail || tail.type !== "text") {
			tail = text$3();
			tail.position = {
				start: point(token.start),
				end: void 0
			};
			siblings.push(tail);
		}
		this.stack.push(tail);
	}
	function onexitdata(token) {
		const tail = this.stack.pop();
		tail.value += this.sliceSerialize(token);
		tail.position.end = point(token.end);
	}
	function onexitlineending(token) {
		const context = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			const tail = context.children[context.children.length - 1];
			tail.position.end = point(token.end);
			this.data.atHardBreak = void 0;
			return;
		}
		if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
			onenterdata.call(this, token);
			onexitdata.call(this, token);
		}
	}
	function onexithardbreak() {
		this.data.atHardBreak = true;
	}
	function onexithtmlflow() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexithtmltext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitcodetext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitlink() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitimage() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitlabeltext(token) {
		const string$2 = this.sliceSerialize(token);
		const ancestor = this.stack[this.stack.length - 2];
		ancestor.label = decodeString(string$2);
		ancestor.identifier = normalizeIdentifier(string$2).toLowerCase();
	}
	function onexitlabel() {
		const fragment = this.stack[this.stack.length - 1];
		const value = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		this.data.inReference = true;
		if (node$1.type === "link") node$1.children = fragment.children;
		else node$1.alt = value;
	}
	function onexitresourcedestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitresourcetitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitresource() {
		this.data.inReference = void 0;
	}
	function onenterreference() {
		this.data.referenceType = "collapsed";
	}
	function onexitreferencestring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		this.data.referenceType = "full";
	}
	function onexitcharacterreferencemarker(token) {
		this.data.characterReferenceType = token.type;
	}
	function onexitcharacterreferencevalue(token) {
		const data$1 = this.sliceSerialize(token);
		const type = this.data.characterReferenceType;
		let value;
		if (type) {
			value = decodeNumericCharacterReference(data$1, type === "characterReferenceMarkerNumeric" ? 10 : 16);
			this.data.characterReferenceType = void 0;
		} else value = decodeNamedCharacterReference(data$1);
		const tail = this.stack[this.stack.length - 1];
		tail.value += value;
	}
	function onexitcharacterreference(token) {
		const tail = this.stack.pop();
		tail.position.end = point(token.end);
	}
	function onexitautolinkprotocol(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = this.sliceSerialize(token);
	}
	function onexitautolinkemail(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = "mailto:" + this.sliceSerialize(token);
	}
	function blockQuote$1() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function codeFlow() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function codeText$1() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function definition$2() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function emphasis$1() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function heading$1() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function hardBreak$1() {
		return { type: "break" };
	}
	function html$1() {
		return {
			type: "html",
			value: ""
		};
	}
	function image$1() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function link$1() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function list$2(token) {
		return {
			type: "list",
			ordered: token.type === "listOrdered",
			start: null,
			spread: token._spread,
			children: []
		};
	}
	function listItem$1(token) {
		return {
			type: "listItem",
			spread: token._spread,
			checked: null,
			children: []
		};
	}
	function paragraph$1() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function strong$1() {
		return {
			type: "strong",
			children: []
		};
	}
	function text$3() {
		return {
			type: "text",
			value: ""
		};
	}
	function thematicBreak$2() {
		return { type: "thematicBreak" };
	}
}
function point(d) {
	return {
		line: d.line,
		column: d.column,
		offset: d.offset
	};
}
function configure(combined, extensions) {
	let index$1 = -1;
	while (++index$1 < extensions.length) {
		const value = extensions[index$1];
		if (Array.isArray(value)) configure(combined, value);
		else extension(combined, value);
	}
}
function extension(combined, extension$1) {
	let key;
	for (key in extension$1) if (own$1.call(extension$1, key)) switch (key) {
		case "canContainEols": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "transforms": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "enter":
		case "exit": {
			const right = extension$1[key];
			if (right) Object.assign(combined[key], right);
			break;
		}
	}
}
function defaultOnError(left, right) {
	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
		start: left.start,
		end: left.end
	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is open");
	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is still open");
}
function remarkParse(options) {
	const self = this;
	self.parser = parser;
	function parser(doc) {
		return fromMarkdown(doc, {
			...self.data("settings"),
			...options,
			extensions: self.data("micromarkExtensions") || [],
			mdastExtensions: self.data("fromMarkdownExtensions") || []
		});
	}
}
function bail(error) {
	if (error) throw error;
}
var require_extend = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;
	var isArray = function isArray$1(arr) {
		if (typeof Array.isArray === "function") return Array.isArray(arr);
		return toStr.call(arr) === "[object Array]";
	};
	var isPlainObject$1 = function isPlainObject$2(obj) {
		if (!obj || toStr.call(obj) !== "[object Object]") return false;
		var hasOwnConstructor = hasOwn.call(obj, "constructor");
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return false;
		var key;
		for (key in obj);
		return typeof key === "undefined" || hasOwn.call(obj, key);
	};
	var setProperty = function setProperty$1(target, options) {
		if (defineProperty && options.name === "__proto__") defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
		else target[options.name] = options.newValue;
	};
	var getProperty = function getProperty$1(obj, name) {
		if (name === "__proto__") {
			if (!hasOwn.call(obj, name)) return;
			else if (gOPD) return gOPD(obj, name).value;
		}
		return obj[name];
	};
	module.exports = function extend$1() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (target == null || typeof target !== "object" && typeof target !== "function") target = {};
		for (; i < length; ++i) {
			options = arguments[i];
			if (options != null) for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);
				if (target !== copy) {
					if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else clone = src && isPlainObject$1(src) ? src : {};
						setProperty(target, {
							name,
							newValue: extend$1(deep, clone, copy)
						});
					} else if (typeof copy !== "undefined") setProperty(target, {
						name,
						newValue: copy
					});
				}
			}
		}
		return target;
	};
}));
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function trough() {
	const fns = [];
	const pipeline = {
		run,
		use
	};
	return pipeline;
	function run(...values) {
		let middlewareIndex = -1;
		const callback = values.pop();
		if (typeof callback !== "function") throw new TypeError("Expected function as last argument, not " + callback);
		next(null, ...values);
		function next(error, ...output) {
			const fn = fns[++middlewareIndex];
			let index$1 = -1;
			if (error) {
				callback(error);
				return;
			}
			while (++index$1 < values.length) if (output[index$1] === null || output[index$1] === void 0) output[index$1] = values[index$1];
			values = output;
			if (fn) wrap(fn, next)(...output);
			else callback(null, ...output);
		}
	}
	function use(middelware) {
		if (typeof middelware !== "function") throw new TypeError("Expected `middelware` to be a function, not " + middelware);
		fns.push(middelware);
		return pipeline;
	}
}
function wrap(middleware, callback) {
	let called;
	return wrapped;
	function wrapped(...parameters) {
		const fnExpectsCallback = middleware.length > parameters.length;
		let result;
		if (fnExpectsCallback) parameters.push(done);
		try {
			result = middleware.apply(this, parameters);
		} catch (error) {
			const exception = error;
			if (fnExpectsCallback && called) throw exception;
			return done(exception);
		}
		if (!fnExpectsCallback) if (result && result.then && typeof result.then === "function") result.then(then, done);
		else if (result instanceof Error) done(result);
		else then(result);
	}
	function done(error, ...output) {
		if (!called) {
			called = true;
			callback(error, ...output);
		}
	}
	function then(value) {
		done(null, value);
	}
}
const minpath = {
	basename,
	dirname,
	extname,
	join,
	sep: "/"
};
function basename(path, extname$1) {
	if (extname$1 !== void 0 && typeof extname$1 !== "string") throw new TypeError("\"ext\" argument must be a string");
	assertPath$1(path);
	let start = 0;
	let end = -1;
	let index$1 = path.length;
	let seenNonSlash;
	if (extname$1 === void 0 || extname$1.length === 0 || extname$1.length > path.length) {
		while (index$1--) if (path.codePointAt(index$1) === 47) {
			if (seenNonSlash) {
				start = index$1 + 1;
				break;
			}
		} else if (end < 0) {
			seenNonSlash = true;
			end = index$1 + 1;
		}
		return end < 0 ? "" : path.slice(start, end);
	}
	if (extname$1 === path) return "";
	let firstNonSlashEnd = -1;
	let extnameIndex = extname$1.length - 1;
	while (index$1--) if (path.codePointAt(index$1) === 47) {
		if (seenNonSlash) {
			start = index$1 + 1;
			break;
		}
	} else {
		if (firstNonSlashEnd < 0) {
			seenNonSlash = true;
			firstNonSlashEnd = index$1 + 1;
		}
		if (extnameIndex > -1) if (path.codePointAt(index$1) === extname$1.codePointAt(extnameIndex--)) {
			if (extnameIndex < 0) end = index$1;
		} else {
			extnameIndex = -1;
			end = firstNonSlashEnd;
		}
	}
	if (start === end) end = firstNonSlashEnd;
	else if (end < 0) end = path.length;
	return path.slice(start, end);
}
function dirname(path) {
	assertPath$1(path);
	if (path.length === 0) return ".";
	let end = -1;
	let index$1 = path.length;
	let unmatchedSlash;
	while (--index$1) if (path.codePointAt(index$1) === 47) {
		if (unmatchedSlash) {
			end = index$1;
			break;
		}
	} else if (!unmatchedSlash) unmatchedSlash = true;
	return end < 0 ? path.codePointAt(0) === 47 ? "/" : "." : end === 1 && path.codePointAt(0) === 47 ? "//" : path.slice(0, end);
}
function extname(path) {
	assertPath$1(path);
	let index$1 = path.length;
	let end = -1;
	let startPart = 0;
	let startDot = -1;
	let preDotState = 0;
	let unmatchedSlash;
	while (index$1--) {
		const code$1 = path.codePointAt(index$1);
		if (code$1 === 47) {
			if (unmatchedSlash) {
				startPart = index$1 + 1;
				break;
			}
			continue;
		}
		if (end < 0) {
			unmatchedSlash = true;
			end = index$1 + 1;
		}
		if (code$1 === 46) {
			if (startDot < 0) startDot = index$1;
			else if (preDotState !== 1) preDotState = 1;
		} else if (startDot > -1) preDotState = -1;
	}
	if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
	return path.slice(startDot, end);
}
function join(...segments) {
	let index$1 = -1;
	let joined;
	while (++index$1 < segments.length) {
		assertPath$1(segments[index$1]);
		if (segments[index$1]) joined = joined === void 0 ? segments[index$1] : joined + "/" + segments[index$1];
	}
	return joined === void 0 ? "." : normalize(joined);
}
function normalize(path) {
	assertPath$1(path);
	const absolute = path.codePointAt(0) === 47;
	let value = normalizeString(path, !absolute);
	if (value.length === 0 && !absolute) value = ".";
	if (value.length > 0 && path.codePointAt(path.length - 1) === 47) value += "/";
	return absolute ? "/" + value : value;
}
function normalizeString(path, allowAboveRoot) {
	let result = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let index$1 = -1;
	let code$1;
	let lastSlashIndex;
	while (++index$1 <= path.length) {
		if (index$1 < path.length) code$1 = path.codePointAt(index$1);
		else if (code$1 === 47) break;
		else code$1 = 47;
		if (code$1 === 47) {
			if (lastSlash === index$1 - 1 || dots === 1) {} else if (lastSlash !== index$1 - 1 && dots === 2) {
				if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
					if (result.length > 2) {
						lastSlashIndex = result.lastIndexOf("/");
						if (lastSlashIndex !== result.length - 1) {
							if (lastSlashIndex < 0) {
								result = "";
								lastSegmentLength = 0;
							} else {
								result = result.slice(0, lastSlashIndex);
								lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
							}
							lastSlash = index$1;
							dots = 0;
							continue;
						}
					} else if (result.length > 0) {
						result = "";
						lastSegmentLength = 0;
						lastSlash = index$1;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					result = result.length > 0 ? result + "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (result.length > 0) result += "/" + path.slice(lastSlash + 1, index$1);
				else result = path.slice(lastSlash + 1, index$1);
				lastSegmentLength = index$1 - lastSlash - 1;
			}
			lastSlash = index$1;
			dots = 0;
		} else if (code$1 === 46 && dots > -1) dots++;
		else dots = -1;
	}
	return result;
}
function assertPath$1(path) {
	if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
const minproc = { cwd };
function cwd() {
	return "/";
}
function isUrl(fileUrlOrPath) {
	return Boolean(fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && fileUrlOrPath.auth === void 0);
}
function urlToPath(path) {
	if (typeof path === "string") path = new URL(path);
	else if (!isUrl(path)) {
		const error = /* @__PURE__ */ new TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + path + "`");
		error.code = "ERR_INVALID_ARG_TYPE";
		throw error;
	}
	if (path.protocol !== "file:") {
		const error = /* @__PURE__ */ new TypeError("The URL must be of scheme file");
		error.code = "ERR_INVALID_URL_SCHEME";
		throw error;
	}
	return getPathFromURLPosix(path);
}
function getPathFromURLPosix(url) {
	if (url.hostname !== "") {
		const error = /* @__PURE__ */ new TypeError("File URL host must be \"localhost\" or empty on darwin");
		error.code = "ERR_INVALID_FILE_URL_HOST";
		throw error;
	}
	const pathname = url.pathname;
	let index$1 = -1;
	while (++index$1 < pathname.length) if (pathname.codePointAt(index$1) === 37 && pathname.codePointAt(index$1 + 1) === 50) {
		const third = pathname.codePointAt(index$1 + 2);
		if (third === 70 || third === 102) {
			const error = /* @__PURE__ */ new TypeError("File URL path must not include encoded / characters");
			error.code = "ERR_INVALID_FILE_URL_PATH";
			throw error;
		}
	}
	return decodeURIComponent(pathname);
}
var order = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
];
var VFile = class {
	constructor(value) {
		let options;
		if (!value) options = {};
		else if (isUrl(value)) options = { path: value };
		else if (typeof value === "string" || isUint8Array$1(value)) options = { value };
		else options = value;
		this.cwd = "cwd" in options ? "" : minproc.cwd();
		this.data = {};
		this.history = [];
		this.messages = [];
		this.value;
		this.map;
		this.result;
		this.stored;
		let index$1 = -1;
		while (++index$1 < order.length) {
			const field$1 = order[index$1];
			if (field$1 in options && options[field$1] !== void 0 && options[field$1] !== null) this[field$1] = field$1 === "history" ? [...options[field$1]] : options[field$1];
		}
		let field;
		for (field in options) if (!order.includes(field)) this[field] = options[field];
	}
	get basename() {
		return typeof this.path === "string" ? minpath.basename(this.path) : void 0;
	}
	set basename(basename$1) {
		assertNonEmpty(basename$1, "basename");
		assertPart(basename$1, "basename");
		this.path = minpath.join(this.dirname || "", basename$1);
	}
	get dirname() {
		return typeof this.path === "string" ? minpath.dirname(this.path) : void 0;
	}
	set dirname(dirname$1) {
		assertPath(this.basename, "dirname");
		this.path = minpath.join(dirname$1 || "", this.basename);
	}
	get extname() {
		return typeof this.path === "string" ? minpath.extname(this.path) : void 0;
	}
	set extname(extname$1) {
		assertPart(extname$1, "extname");
		assertPath(this.dirname, "extname");
		if (extname$1) {
			if (extname$1.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
			if (extname$1.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
		}
		this.path = minpath.join(this.dirname, this.stem + (extname$1 || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(path) {
		if (isUrl(path)) path = urlToPath(path);
		assertNonEmpty(path, "path");
		if (this.path !== path) this.history.push(path);
	}
	get stem() {
		return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : void 0;
	}
	set stem(stem) {
		assertNonEmpty(stem, "stem");
		assertPart(stem, "stem");
		this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
	}
	fail(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
		message.fatal = true;
		throw message;
	}
	info(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
		message.fatal = void 0;
		return message;
	}
	message(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = new VFileMessage(causeOrReason, optionsOrParentOrPlace, origin);
		if (this.path) {
			message.name = this.path + ":" + message.name;
			message.file = this.path;
		}
		message.fatal = false;
		this.messages.push(message);
		return message;
	}
	toString(encoding) {
		if (this.value === void 0) return "";
		if (typeof this.value === "string") return this.value;
		return new TextDecoder(encoding || void 0).decode(this.value);
	}
};
function assertPart(part, name) {
	if (part && part.includes(minpath.sep)) throw new Error("`" + name + "` cannot be a path: did not expect `" + minpath.sep + "`");
}
function assertNonEmpty(part, name) {
	if (!part) throw new Error("`" + name + "` cannot be empty");
}
function assertPath(path, name) {
	if (!path) throw new Error("Setting `" + name + "` requires `path` to be set too");
}
function isUint8Array$1(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
const CallableInstance = (function(property) {
	const proto = this.constructor.prototype;
	const value = proto[property];
	const apply = function() {
		return value.apply(apply, arguments);
	};
	Object.setPrototypeOf(apply, proto);
	return apply;
});
var import_extend = /* @__PURE__ */ __toESM(require_extend(), 1);
var own = {}.hasOwnProperty;
const unified = new class Processor extends CallableInstance {
	constructor() {
		super("copy");
		this.Compiler = void 0;
		this.Parser = void 0;
		this.attachers = [];
		this.compiler = void 0;
		this.freezeIndex = -1;
		this.frozen = void 0;
		this.namespace = {};
		this.parser = void 0;
		this.transformers = trough();
	}
	copy() {
		const destination = new Processor();
		let index$1 = -1;
		while (++index$1 < this.attachers.length) {
			const attacher = this.attachers[index$1];
			destination.use(...attacher);
		}
		destination.data((0, import_extend.default)(true, {}, this.namespace));
		return destination;
	}
	data(key, value) {
		if (typeof key === "string") {
			if (arguments.length === 2) {
				assertUnfrozen("data", this.frozen);
				this.namespace[key] = value;
				return this;
			}
			return own.call(this.namespace, key) && this.namespace[key] || void 0;
		}
		if (key) {
			assertUnfrozen("data", this.frozen);
			this.namespace = key;
			return this;
		}
		return this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		const self = this;
		while (++this.freezeIndex < this.attachers.length) {
			const [attacher, ...options] = this.attachers[this.freezeIndex];
			if (options[0] === false) continue;
			if (options[0] === true) options[0] = void 0;
			const transformer = attacher.call(self, ...options);
			if (typeof transformer === "function") this.transformers.use(transformer);
		}
		this.frozen = true;
		this.freezeIndex = Number.POSITIVE_INFINITY;
		return this;
	}
	parse(file) {
		this.freeze();
		const realFile = vfile(file);
		const parser = this.parser || this.Parser;
		assertParser("parse", parser);
		return parser(String(realFile), realFile);
	}
	process(file, done) {
		const self = this;
		this.freeze();
		assertParser("process", this.parser || this.Parser);
		assertCompiler("process", this.compiler || this.Compiler);
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			const parseTree = self.parse(realFile);
			self.run(parseTree, realFile, function(error, tree, file$1) {
				if (error || !tree || !file$1) return realDone(error);
				const compileTree = tree;
				const compileResult = self.stringify(compileTree, file$1);
				if (looksLikeAValue(compileResult)) file$1.value = compileResult;
				else file$1.result = compileResult;
				realDone(error, file$1);
			});
			function realDone(error, file$1) {
				if (error || !file$1) reject(error);
				else if (resolve) resolve(file$1);
				else done(void 0, file$1);
			}
		}
	}
	processSync(file) {
		let complete = false;
		let result;
		this.freeze();
		assertParser("processSync", this.parser || this.Parser);
		assertCompiler("processSync", this.compiler || this.Compiler);
		this.process(file, realDone);
		assertDone("processSync", "process", complete);
		return result;
		function realDone(error, file$1) {
			complete = true;
			bail(error);
			result = file$1;
		}
	}
	run(tree, file, done) {
		assertNode(tree);
		this.freeze();
		const transformers = this.transformers;
		if (!done && typeof file === "function") {
			done = file;
			file = void 0;
		}
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			transformers.run(tree, realFile, realDone);
			function realDone(error, outputTree, file$1) {
				const resultingTree = outputTree || tree;
				if (error) reject(error);
				else if (resolve) resolve(resultingTree);
				else done(void 0, resultingTree, file$1);
			}
		}
	}
	runSync(tree, file) {
		let complete = false;
		let result;
		this.run(tree, file, realDone);
		assertDone("runSync", "run", complete);
		return result;
		function realDone(error, tree$1) {
			bail(error);
			result = tree$1;
			complete = true;
		}
	}
	stringify(tree, file) {
		this.freeze();
		const realFile = vfile(file);
		const compiler$1 = this.compiler || this.Compiler;
		assertCompiler("stringify", compiler$1);
		assertNode(tree);
		return compiler$1(tree, realFile);
	}
	use(value, ...parameters) {
		const attachers = this.attachers;
		const namespace = this.namespace;
		assertUnfrozen("use", this.frozen);
		if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin(value, parameters);
		else if (typeof value === "object") if (Array.isArray(value)) addList(value);
		else addPreset(value);
		else throw new TypeError("Expected usable value, not `" + value + "`");
		return this;
		function add(value$1) {
			if (typeof value$1 === "function") addPlugin(value$1, []);
			else if (typeof value$1 === "object") if (Array.isArray(value$1)) {
				const [plugin, ...parameters$1] = value$1;
				addPlugin(plugin, parameters$1);
			} else addPreset(value$1);
			else throw new TypeError("Expected usable value, not `" + value$1 + "`");
		}
		function addPreset(result) {
			if (!("plugins" in result) && !("settings" in result)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			addList(result.plugins);
			if (result.settings) namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
		}
		function addList(plugins) {
			let index$1 = -1;
			if (plugins === null || plugins === void 0) {} else if (Array.isArray(plugins)) while (++index$1 < plugins.length) {
				const thing = plugins[index$1];
				add(thing);
			}
			else throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
		}
		function addPlugin(plugin, parameters$1) {
			let index$1 = -1;
			let entryIndex = -1;
			while (++index$1 < attachers.length) if (attachers[index$1][0] === plugin) {
				entryIndex = index$1;
				break;
			}
			if (entryIndex === -1) attachers.push([plugin, ...parameters$1]);
			else if (parameters$1.length > 0) {
				let [primary, ...rest] = parameters$1;
				const currentPrimary = attachers[entryIndex][1];
				if (isPlainObject(currentPrimary) && isPlainObject(primary)) primary = (0, import_extend.default)(true, currentPrimary, primary);
				attachers[entryIndex] = [
					plugin,
					primary,
					...rest
				];
			}
		}
	}
}().freeze();
function assertParser(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `parser`");
}
function assertCompiler(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `compiler`");
}
function assertUnfrozen(name, frozen) {
	if (frozen) throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function assertNode(node$1) {
	if (!isPlainObject(node$1) || typeof node$1.type !== "string") throw new TypeError("Expected node, got `" + node$1 + "`");
}
function assertDone(name, asyncName, complete) {
	if (!complete) throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
}
function vfile(value) {
	return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
	return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
function looksLikeAValue(value) {
	return typeof value === "string" || isUint8Array(value);
}
function isUint8Array(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
export { CONTINUE as A, markdownLineEnding as C, unicodeWhitespace as D, unicodePunctuation as E, visitParents as M, convert as N, ok as O, asciiControl as S, markdownSpace as T, longestStreak as _, blankLine as a, asciiAlpha as b, combineExtensions as c, decodeString as d, handle as f, formatCodeAsIndented as g, encodeCharacterReference as h, VFileMessage as i, SKIP as j, visit as k, push as l, classifyCharacter as m, require_extend as n, factorySpace as o, formatHeadingAsSetext as p, remarkParse as r, resolveAll as s, unified as t, splice as u, patternInScope as v, markdownLineEndingOrSpace as w, asciiAlphanumeric as x, normalizeIdentifier as y };

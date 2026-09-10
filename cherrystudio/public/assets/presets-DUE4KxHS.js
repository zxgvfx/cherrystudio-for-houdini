import { A as SKIP, C as markdownLineEndingOrSpace, D as ok, M as convert, O as visit, S as markdownLineEnding, a as factorySpace, c as push, g as longestStreak, j as visitParents, l as splice, o as resolveAll } from "./lib-bQ5eoMyy.js";
import { d as webNamespaces, f as h$1, p as s } from "./chunk-BO2N2NFS-fKJ-DR8B.js";
import { c as createHighlighter, h as bundledLanguages, t as createJavaScriptRegexEngine, v as bundledLanguagesInfo } from "./dist-ry9cWLbi.js";
import { t as katex } from "./katex-hMbgOs8f.js";
import { t as mermaid_default } from "./mermaid.core-EJboeJDS.js";
const ambiguousRanges = [
	161,
	161,
	164,
	164,
	167,
	168,
	170,
	170,
	173,
	174,
	176,
	180,
	182,
	186,
	188,
	191,
	198,
	198,
	208,
	208,
	215,
	216,
	222,
	225,
	230,
	230,
	232,
	234,
	236,
	237,
	240,
	240,
	242,
	243,
	247,
	250,
	252,
	252,
	254,
	254,
	257,
	257,
	273,
	273,
	275,
	275,
	283,
	283,
	294,
	295,
	299,
	299,
	305,
	307,
	312,
	312,
	319,
	322,
	324,
	324,
	328,
	331,
	333,
	333,
	338,
	339,
	358,
	359,
	363,
	363,
	462,
	462,
	464,
	464,
	466,
	466,
	468,
	468,
	470,
	470,
	472,
	472,
	474,
	474,
	476,
	476,
	593,
	593,
	609,
	609,
	708,
	708,
	711,
	711,
	713,
	715,
	717,
	717,
	720,
	720,
	728,
	731,
	733,
	733,
	735,
	735,
	768,
	879,
	913,
	929,
	931,
	937,
	945,
	961,
	963,
	969,
	1025,
	1025,
	1040,
	1103,
	1105,
	1105,
	8208,
	8208,
	8211,
	8214,
	8216,
	8217,
	8220,
	8221,
	8224,
	8226,
	8228,
	8231,
	8240,
	8240,
	8242,
	8243,
	8245,
	8245,
	8251,
	8251,
	8254,
	8254,
	8308,
	8308,
	8319,
	8319,
	8321,
	8324,
	8364,
	8364,
	8451,
	8451,
	8453,
	8453,
	8457,
	8457,
	8467,
	8467,
	8470,
	8470,
	8481,
	8482,
	8486,
	8486,
	8491,
	8491,
	8531,
	8532,
	8539,
	8542,
	8544,
	8555,
	8560,
	8569,
	8585,
	8585,
	8592,
	8601,
	8632,
	8633,
	8658,
	8658,
	8660,
	8660,
	8679,
	8679,
	8704,
	8704,
	8706,
	8707,
	8711,
	8712,
	8715,
	8715,
	8719,
	8719,
	8721,
	8721,
	8725,
	8725,
	8730,
	8730,
	8733,
	8736,
	8739,
	8739,
	8741,
	8741,
	8743,
	8748,
	8750,
	8750,
	8756,
	8759,
	8764,
	8765,
	8776,
	8776,
	8780,
	8780,
	8786,
	8786,
	8800,
	8801,
	8804,
	8807,
	8810,
	8811,
	8814,
	8815,
	8834,
	8835,
	8838,
	8839,
	8853,
	8853,
	8857,
	8857,
	8869,
	8869,
	8895,
	8895,
	8978,
	8978,
	9312,
	9449,
	9451,
	9547,
	9552,
	9587,
	9600,
	9615,
	9618,
	9621,
	9632,
	9633,
	9635,
	9641,
	9650,
	9651,
	9654,
	9655,
	9660,
	9661,
	9664,
	9665,
	9670,
	9672,
	9675,
	9675,
	9678,
	9681,
	9698,
	9701,
	9711,
	9711,
	9733,
	9734,
	9737,
	9737,
	9742,
	9743,
	9756,
	9756,
	9758,
	9758,
	9792,
	9792,
	9794,
	9794,
	9824,
	9825,
	9827,
	9829,
	9831,
	9834,
	9836,
	9837,
	9839,
	9839,
	9886,
	9887,
	9919,
	9919,
	9926,
	9933,
	9935,
	9939,
	9941,
	9953,
	9955,
	9955,
	9960,
	9961,
	9963,
	9969,
	9972,
	9972,
	9974,
	9977,
	9979,
	9980,
	9982,
	9983,
	10045,
	10045,
	10102,
	10111,
	11094,
	11097,
	12872,
	12879,
	57344,
	63743,
	65024,
	65039,
	65533,
	65533,
	127232,
	127242,
	127248,
	127277,
	127280,
	127337,
	127344,
	127373,
	127375,
	127376,
	127387,
	127404,
	917760,
	917999,
	983040,
	1048573,
	1048576,
	1114109
];
const fullwidthRanges = [
	12288,
	12288,
	65281,
	65376,
	65504,
	65510
];
const halfwidthRanges = [
	8361,
	8361,
	65377,
	65470,
	65474,
	65479,
	65482,
	65487,
	65490,
	65495,
	65498,
	65500,
	65512,
	65518
];
const narrowRanges = [
	32,
	126,
	162,
	163,
	165,
	166,
	172,
	172,
	175,
	175,
	10214,
	10221,
	10629,
	10630
];
const wideRanges = [
	4352,
	4447,
	8986,
	8987,
	9001,
	9002,
	9193,
	9196,
	9200,
	9200,
	9203,
	9203,
	9725,
	9726,
	9748,
	9749,
	9776,
	9783,
	9800,
	9811,
	9855,
	9855,
	9866,
	9871,
	9875,
	9875,
	9889,
	9889,
	9898,
	9899,
	9917,
	9918,
	9924,
	9925,
	9934,
	9934,
	9940,
	9940,
	9962,
	9962,
	9970,
	9971,
	9973,
	9973,
	9978,
	9978,
	9981,
	9981,
	9989,
	9989,
	9994,
	9995,
	10024,
	10024,
	10060,
	10060,
	10062,
	10062,
	10067,
	10069,
	10071,
	10071,
	10133,
	10135,
	10160,
	10160,
	10175,
	10175,
	11035,
	11036,
	11088,
	11088,
	11093,
	11093,
	11904,
	11929,
	11931,
	12019,
	12032,
	12245,
	12272,
	12287,
	12289,
	12350,
	12353,
	12438,
	12441,
	12543,
	12549,
	12591,
	12593,
	12686,
	12688,
	12773,
	12783,
	12830,
	12832,
	12871,
	12880,
	42124,
	42128,
	42182,
	43360,
	43388,
	44032,
	55203,
	63744,
	64255,
	65040,
	65049,
	65072,
	65106,
	65108,
	65126,
	65128,
	65131,
	94176,
	94180,
	94192,
	94198,
	94208,
	101589,
	101631,
	101662,
	101760,
	101874,
	110576,
	110579,
	110581,
	110587,
	110589,
	110590,
	110592,
	110882,
	110898,
	110898,
	110928,
	110930,
	110933,
	110933,
	110948,
	110951,
	110960,
	111355,
	119552,
	119638,
	119648,
	119670,
	126980,
	126980,
	127183,
	127183,
	127374,
	127374,
	127377,
	127386,
	127488,
	127490,
	127504,
	127547,
	127552,
	127560,
	127568,
	127569,
	127584,
	127589,
	127744,
	127776,
	127789,
	127797,
	127799,
	127868,
	127870,
	127891,
	127904,
	127946,
	127951,
	127955,
	127968,
	127984,
	127988,
	127988,
	127992,
	128062,
	128064,
	128064,
	128066,
	128252,
	128255,
	128317,
	128331,
	128334,
	128336,
	128359,
	128378,
	128378,
	128405,
	128406,
	128420,
	128420,
	128507,
	128591,
	128640,
	128709,
	128716,
	128716,
	128720,
	128722,
	128725,
	128728,
	128732,
	128735,
	128747,
	128748,
	128756,
	128764,
	128992,
	129003,
	129008,
	129008,
	129292,
	129338,
	129340,
	129349,
	129351,
	129535,
	129648,
	129660,
	129664,
	129674,
	129678,
	129734,
	129736,
	129736,
	129741,
	129756,
	129759,
	129770,
	129775,
	129784,
	131072,
	196605,
	196608,
	262141
];
const isInRange = (ranges, codePoint) => {
	let low = 0;
	let high = Math.floor(ranges.length / 2) - 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const i = mid * 2;
		if (codePoint < ranges[i]) high = mid - 1;
		else if (codePoint > ranges[i + 1]) low = mid + 1;
		else return true;
	}
	return false;
};
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = /* @__PURE__ */ findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
	let fastPathStart = ranges[0];
	let fastPathEnd = ranges[1];
	for (let index = 0; index < ranges.length; index += 2) {
		const start = ranges[index];
		const end = ranges[index + 1];
		if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) return [start, end];
		if (end - start > fastPathEnd - fastPathStart) {
			fastPathStart = start;
			fastPathEnd = end;
		}
	}
	return [fastPathStart, fastPathEnd];
}
const isAmbiguous = (codePoint) => {
	if (codePoint < 161 || codePoint > 1114109) return false;
	return isInRange(ambiguousRanges, codePoint);
};
const isFullWidth = (codePoint) => {
	if (codePoint < 12288 || codePoint > 65510) return false;
	return isInRange(fullwidthRanges, codePoint);
};
var isHalfWidth = (codePoint) => {
	if (codePoint < 8361 || codePoint > 65518) return false;
	return isInRange(halfwidthRanges, codePoint);
};
var isNarrow = (codePoint) => {
	if (codePoint < 32 || codePoint > 10630) return false;
	return isInRange(narrowRanges, codePoint);
};
const isWide = (codePoint) => {
	if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) return true;
	if (codePoint < 4352 || codePoint > 262141) return false;
	return isInRange(wideRanges, codePoint);
};
function getCategory(codePoint) {
	if (isAmbiguous(codePoint)) return "ambiguous";
	if (isFullWidth(codePoint)) return "fullwidth";
	if (isHalfWidth(codePoint)) return "halfwidth";
	if (isNarrow(codePoint)) return "narrow";
	if (isWide(codePoint)) return "wide";
	return "neutral";
}
function validate(codePoint) {
	if (!Number.isSafeInteger(codePoint)) throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
}
function eastAsianWidthType(codePoint) {
	validate(codePoint);
	return getCategory(codePoint);
}
function isEmoji(uc) {
	return /^\p{Emoji_Presentation}/u.test(String.fromCodePoint(uc));
}
function cjkOrIvs(uc) {
	if (!uc || uc < 4352) return false;
	switch (eastAsianWidthType(uc)) {
		case "fullwidth":
		case "halfwidth": return true;
		case "wide": return !isEmoji(uc);
		case "narrow": return false;
		case "ambiguous": return 917760 <= uc && uc <= 917999 ? null : false;
		case "neutral": return /^\p{sc=Hangul}/u.test(String.fromCodePoint(uc));
	}
}
function isCjkAmbiguousPunctuation(main, vs) {
	if (vs !== 65025 || !main || main < 8216) return false;
	return main === 8216 || main === 8217 || main === 8220 || main === 8221;
}
function nonEmojiGeneralUseVS(code) {
	return code !== null && code >= 65024 && code <= 65038;
}
var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
	return check;
	function check(code) {
		return code !== null && code > -1 && regex.test(String.fromCodePoint(code));
	}
}
const codes = {
	carriageReturn: -5,
	lineFeed: -4,
	carriageReturnLineFeed: -3,
	horizontalTab: -2,
	virtualSpace: -1,
	eof: null,
	nul: 0,
	soh: 1,
	stx: 2,
	etx: 3,
	eot: 4,
	enq: 5,
	ack: 6,
	bel: 7,
	bs: 8,
	ht: 9,
	lf: 10,
	vt: 11,
	ff: 12,
	cr: 13,
	so: 14,
	si: 15,
	dle: 16,
	dc1: 17,
	dc2: 18,
	dc3: 19,
	dc4: 20,
	nak: 21,
	syn: 22,
	etb: 23,
	can: 24,
	em: 25,
	sub: 26,
	esc: 27,
	fs: 28,
	gs: 29,
	rs: 30,
	us: 31,
	space: 32,
	exclamationMark: 33,
	quotationMark: 34,
	numberSign: 35,
	dollarSign: 36,
	percentSign: 37,
	ampersand: 38,
	apostrophe: 39,
	leftParenthesis: 40,
	rightParenthesis: 41,
	asterisk: 42,
	plusSign: 43,
	comma: 44,
	dash: 45,
	dot: 46,
	slash: 47,
	digit0: 48,
	digit1: 49,
	digit2: 50,
	digit3: 51,
	digit4: 52,
	digit5: 53,
	digit6: 54,
	digit7: 55,
	digit8: 56,
	digit9: 57,
	colon: 58,
	semicolon: 59,
	lessThan: 60,
	equalsTo: 61,
	greaterThan: 62,
	questionMark: 63,
	atSign: 64,
	uppercaseA: 65,
	uppercaseB: 66,
	uppercaseC: 67,
	uppercaseD: 68,
	uppercaseE: 69,
	uppercaseF: 70,
	uppercaseG: 71,
	uppercaseH: 72,
	uppercaseI: 73,
	uppercaseJ: 74,
	uppercaseK: 75,
	uppercaseL: 76,
	uppercaseM: 77,
	uppercaseN: 78,
	uppercaseO: 79,
	uppercaseP: 80,
	uppercaseQ: 81,
	uppercaseR: 82,
	uppercaseS: 83,
	uppercaseT: 84,
	uppercaseU: 85,
	uppercaseV: 86,
	uppercaseW: 87,
	uppercaseX: 88,
	uppercaseY: 89,
	uppercaseZ: 90,
	leftSquareBracket: 91,
	backslash: 92,
	rightSquareBracket: 93,
	caret: 94,
	underscore: 95,
	graveAccent: 96,
	lowercaseA: 97,
	lowercaseB: 98,
	lowercaseC: 99,
	lowercaseD: 100,
	lowercaseE: 101,
	lowercaseF: 102,
	lowercaseG: 103,
	lowercaseH: 104,
	lowercaseI: 105,
	lowercaseJ: 106,
	lowercaseK: 107,
	lowercaseL: 108,
	lowercaseM: 109,
	lowercaseN: 110,
	lowercaseO: 111,
	lowercaseP: 112,
	lowercaseQ: 113,
	lowercaseR: 114,
	lowercaseS: 115,
	lowercaseT: 116,
	lowercaseU: 117,
	lowercaseV: 118,
	lowercaseW: 119,
	lowercaseX: 120,
	lowercaseY: 121,
	lowercaseZ: 122,
	leftCurlyBrace: 123,
	verticalBar: 124,
	rightCurlyBrace: 125,
	tilde: 126,
	del: 127,
	byteOrderMarker: 65279,
	replacementCharacter: 65533
};
const constants = {
	attentionSideAfter: 2,
	attentionSideBefore: 1,
	atxHeadingOpeningFenceSizeMax: 6,
	autolinkDomainSizeMax: 63,
	autolinkSchemeSizeMax: 32,
	cdataOpeningString: "CDATA[",
	characterGroupPunctuation: 2,
	characterGroupWhitespace: 1,
	characterReferenceDecimalSizeMax: 7,
	characterReferenceHexadecimalSizeMax: 6,
	characterReferenceNamedSizeMax: 31,
	codeFencedSequenceSizeMin: 3,
	contentTypeContent: "content",
	contentTypeDocument: "document",
	contentTypeFlow: "flow",
	contentTypeString: "string",
	contentTypeText: "text",
	hardBreakPrefixSizeMin: 2,
	htmlBasic: 6,
	htmlCdata: 5,
	htmlComment: 2,
	htmlComplete: 7,
	htmlDeclaration: 4,
	htmlInstruction: 3,
	htmlRawSizeMax: 8,
	htmlRaw: 1,
	linkResourceDestinationBalanceMax: 32,
	linkReferenceSizeMax: 999,
	listItemValueSizeMax: 10,
	numericBaseDecimal: 10,
	numericBaseHexadecimal: 16,
	tabSize: 4,
	thematicBreakMarkerCountMin: 3,
	v8MaxSafeChunkSize: 1e4
};
const types = {
	data: "data",
	whitespace: "whitespace",
	lineEnding: "lineEnding",
	lineEndingBlank: "lineEndingBlank",
	linePrefix: "linePrefix",
	lineSuffix: "lineSuffix",
	atxHeading: "atxHeading",
	atxHeadingSequence: "atxHeadingSequence",
	atxHeadingText: "atxHeadingText",
	autolink: "autolink",
	autolinkEmail: "autolinkEmail",
	autolinkMarker: "autolinkMarker",
	autolinkProtocol: "autolinkProtocol",
	characterEscape: "characterEscape",
	characterEscapeValue: "characterEscapeValue",
	characterReference: "characterReference",
	characterReferenceMarker: "characterReferenceMarker",
	characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
	characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
	characterReferenceValue: "characterReferenceValue",
	codeFenced: "codeFenced",
	codeFencedFence: "codeFencedFence",
	codeFencedFenceSequence: "codeFencedFenceSequence",
	codeFencedFenceInfo: "codeFencedFenceInfo",
	codeFencedFenceMeta: "codeFencedFenceMeta",
	codeFlowValue: "codeFlowValue",
	codeIndented: "codeIndented",
	codeText: "codeText",
	codeTextData: "codeTextData",
	codeTextPadding: "codeTextPadding",
	codeTextSequence: "codeTextSequence",
	content: "content",
	definition: "definition",
	definitionDestination: "definitionDestination",
	definitionDestinationLiteral: "definitionDestinationLiteral",
	definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
	definitionDestinationRaw: "definitionDestinationRaw",
	definitionDestinationString: "definitionDestinationString",
	definitionLabel: "definitionLabel",
	definitionLabelMarker: "definitionLabelMarker",
	definitionLabelString: "definitionLabelString",
	definitionMarker: "definitionMarker",
	definitionTitle: "definitionTitle",
	definitionTitleMarker: "definitionTitleMarker",
	definitionTitleString: "definitionTitleString",
	emphasis: "emphasis",
	emphasisSequence: "emphasisSequence",
	emphasisText: "emphasisText",
	escapeMarker: "escapeMarker",
	hardBreakEscape: "hardBreakEscape",
	hardBreakTrailing: "hardBreakTrailing",
	htmlFlow: "htmlFlow",
	htmlFlowData: "htmlFlowData",
	htmlText: "htmlText",
	htmlTextData: "htmlTextData",
	image: "image",
	label: "label",
	labelText: "labelText",
	labelLink: "labelLink",
	labelImage: "labelImage",
	labelMarker: "labelMarker",
	labelImageMarker: "labelImageMarker",
	labelEnd: "labelEnd",
	link: "link",
	paragraph: "paragraph",
	reference: "reference",
	referenceMarker: "referenceMarker",
	referenceString: "referenceString",
	resource: "resource",
	resourceDestination: "resourceDestination",
	resourceDestinationLiteral: "resourceDestinationLiteral",
	resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
	resourceDestinationRaw: "resourceDestinationRaw",
	resourceDestinationString: "resourceDestinationString",
	resourceMarker: "resourceMarker",
	resourceTitle: "resourceTitle",
	resourceTitleMarker: "resourceTitleMarker",
	resourceTitleString: "resourceTitleString",
	setextHeading: "setextHeading",
	setextHeadingText: "setextHeadingText",
	setextHeadingLine: "setextHeadingLine",
	setextHeadingLineSequence: "setextHeadingLineSequence",
	strong: "strong",
	strongSequence: "strongSequence",
	strongText: "strongText",
	thematicBreak: "thematicBreak",
	thematicBreakSequence: "thematicBreakSequence",
	blockQuote: "blockQuote",
	blockQuotePrefix: "blockQuotePrefix",
	blockQuoteMarker: "blockQuoteMarker",
	blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
	listOrdered: "listOrdered",
	listUnordered: "listUnordered",
	listItemIndent: "listItemIndent",
	listItemMarker: "listItemMarker",
	listItemPrefix: "listItemPrefix",
	listItemPrefixWhitespace: "listItemPrefixWhitespace",
	listItemValue: "listItemValue",
	chunkDocument: "chunkDocument",
	chunkContent: "chunkContent",
	chunkFlow: "chunkFlow",
	chunkText: "chunkText",
	chunkString: "chunkString"
};
function isUnicodeWhitespace(category) {
	return Boolean(category & constants.characterGroupWhitespace);
}
function isNonCjkPunctuation(category) {
	return (category & constantsEx.cjkPunctuation) === constants.characterGroupPunctuation;
}
function isCjk(category) {
	return Boolean(category & constantsEx.cjk);
}
function isIvs(category) {
	return category === constantsEx.ivs;
}
function isCjkOrIvs(category) {
	return Boolean(category & constantsEx.cjkOrIvs);
}
function isNonEmojiGeneralUseVS(category) {
	return category === constantsEx.nonEmojiGeneralUseVS;
}
function isSpaceOrPunctuation(category) {
	return Boolean(category & constantsEx.spaceOrPunctuation);
}
var constantsEx;
(function(_constantsEx) {
	_constantsEx.spaceOrPunctuation = 3;
	_constantsEx.cjk = 4096;
	_constantsEx.cjkPunctuation = 4098;
	_constantsEx.ivs = 8192;
	_constantsEx.cjkOrIvs = 12288;
	_constantsEx.nonEmojiGeneralUseVS = 16384;
	_constantsEx.variationSelector = 24576;
	_constantsEx.ivsToCjkRightShift = 1;
})(constantsEx || (constantsEx = {}));
function classifyCharacter(code) {
	if (code === codes.eof || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return constants.characterGroupWhitespace;
	let value = 0;
	if (code >= 4352) {
		if (nonEmojiGeneralUseVS(code)) return constantsEx.nonEmojiGeneralUseVS;
		switch (cjkOrIvs(code)) {
			case null: return constantsEx.ivs;
			case true:
				value |= constantsEx.cjk;
				break;
		}
	}
	if (unicodePunctuation(code)) value |= constants.characterGroupPunctuation;
	return value;
}
function classifyPrecedingCharacter(before, get2Previous, previous$1) {
	if (!isNonEmojiGeneralUseVS(before)) return before;
	const twoPrevious = get2Previous();
	const twoBefore = classifyCharacter(twoPrevious);
	return !twoPrevious || isUnicodeWhitespace(twoBefore) ? before : isCjkAmbiguousPunctuation(twoPrevious, previous$1) ? constantsEx.cjkPunctuation : stripIvs(twoBefore);
}
function stripIvs(twoBefore) {
	return twoBefore & ~constantsEx.ivs;
}
function isCodeHighSurrogate(code) {
	return Boolean(code && code >= 55296 && code <= 56319);
}
function isCodeLowSurrogate(code) {
	return Boolean(code && code >= 56320 && code <= 57343);
}
function tryGetGenuinePreviousCode(code, nowPoint, sliceSerialize) {
	if (nowPoint._bufferIndex < 2) return code;
	const previousCandidate = sliceSerialize({
		start: {
			...nowPoint,
			_bufferIndex: nowPoint._bufferIndex - 2
		},
		end: nowPoint
	}).codePointAt(0);
	return previousCandidate && previousCandidate >= 65536 ? previousCandidate : code;
}
function tryGetCodeTwoBefore(previousCode, nowPoint, sliceSerialize) {
	const previousWidth = previousCode >= 65536 ? 2 : 1;
	if (nowPoint._bufferIndex < 1 + previousWidth) return null;
	const idealStart = nowPoint._bufferIndex - previousWidth - 2;
	const twoPreviousBuffer = sliceSerialize({
		start: {
			...nowPoint,
			_bufferIndex: idealStart >= 0 ? idealStart : 0
		},
		end: {
			...nowPoint,
			_bufferIndex: nowPoint._bufferIndex - previousWidth
		}
	});
	const twoPreviousLast = twoPreviousBuffer.charCodeAt(twoPreviousBuffer.length - 1);
	if (Number.isNaN(twoPreviousLast)) return null;
	if (twoPreviousBuffer.length < 2 || twoPreviousLast < 56320 || 57343 < twoPreviousLast) return twoPreviousLast;
	const twoPreviousCandidate = twoPreviousBuffer.codePointAt(0);
	if (twoPreviousCandidate && twoPreviousCandidate >= 65536) return twoPreviousCandidate;
	return twoPreviousLast;
}
var TwoPreviousCode = class {
	cachedValue = void 0;
	constructor(previousCode, nowPoint, sliceSerialize) {
		this.previousCode = previousCode;
		this.nowPoint = nowPoint;
		this.sliceSerialize = sliceSerialize;
	}
	value() {
		if (this.cachedValue === void 0) this.cachedValue = tryGetCodeTwoBefore(this.previousCode, this.nowPoint, this.sliceSerialize);
		return this.cachedValue;
	}
};
function tryGetGenuineNextCode(code, nowPoint, sliceSerialize) {
	const nextCandidate = sliceSerialize({
		start: nowPoint,
		end: {
			...nowPoint,
			_bufferIndex: nowPoint._bufferIndex + 2
		}
	}).codePointAt(0);
	return nextCandidate && nextCandidate >= 65536 ? nextCandidate : code;
}
var encodedOutsideBoundary$1 = ";".codePointAt(0) ?? codes.eof;
var encodedInsideBoundary$1 = "&".codePointAt(0) ?? codes.eof;
function cjkFriendlyToMarkdown() {
	return { handlers: {
		emphasis,
		strong,
		text: text$2
	} };
}
emphasis.peek = emphasisPeek;
strong.peek = strongPeek;
function emphasis(node, parent, state, info) {
	return serializeAttention(node, parent, state, info, emphasisPeek(node, parent, state), 1);
}
function strong(node, parent, state, info) {
	return serializeAttention(node, parent, state, info, strongPeek(node, parent, state), 2);
}
function emphasisPeek(_, _parent, state) {
	return state.options.emphasis || "*";
}
function strongPeek(_, _parent, state) {
	return state.options.strong || "*";
}
function serializeAttention(node, parent, state, info, marker, size) {
	const sequence = marker.repeat(size);
	const exit = state.enter(size === 1 ? "emphasis" : "strong");
	const tracker = state.createTracker(info);
	const before = tracker.move(sequence);
	let between = tracker.move(state.containerPhrasing(node, {
		after: marker,
		before,
		...tracker.current()
	}));
	const beforeBoundary = resolveBeforeBoundary$1(node, parent, state, info.before);
	const afterBoundary = resolveAfterBoundary$1(node, parent, state, info.after);
	const open = encodeInfoCjk$1(beforeBoundary, firstCodePoint$1(between), marker, "open");
	if (open.inside && between) between = encodeFirstCodePoint$1(between);
	const close = encodeInfoCjk$1({
		current: lastCodePoint$1(between),
		previous: codePointBeforeLast$1(between)
	}, afterBoundary, marker, "close");
	if (close.inside && between) between = encodeLastCodePoint$1(between);
	const after = tracker.move(sequence);
	exit();
	const encodeAfterSupplementary = close.outside && shouldEncodeAfterSupplementaryText$1(parent, state);
	state.attentionEncodeSurroundingInfo = {
		after: close.outside && !encodeAfterSupplementary,
		before: open.outside
	};
	getCjkFriendlyState$1(state).cjkFriendlyEncodeAfterSupplementaryText = encodeAfterSupplementary;
	return before + between + after;
}
function text$2(node, _parent, state, info) {
	const cjkFriendlyState = getCjkFriendlyState$1(state);
	if (!cjkFriendlyState.cjkFriendlyEncodeAfterSupplementaryText) return state.safe(node.value, info);
	cjkFriendlyState.cjkFriendlyEncodeAfterSupplementaryText = false;
	const [first = ""] = [...node.value];
	const rest = node.value.slice(first.length);
	return `${encodeCharacterReference$1(first.codePointAt(0) ?? codes.eof)}${state.safe(rest, {
		...info,
		before: ";"
	})}`;
}
function encodeInfoCjk$1(before, after, marker, target) {
	const beforeKind = classifyBoundaryBefore$1(before);
	const afterKind = classifyCharacter(after);
	if (!isCjkOrIvs(beforeKind) && !isCjkOrIvs(afterKind)) return target === "open" ? encodeInfoFallback$1(beforeKind, afterKind, marker) : encodeInfoFallback$1(afterKind, beforeKind, marker);
	const raw = {
		inside: false,
		outside: false
	};
	const preserveOutside = {
		inside: true,
		outside: false
	};
	const preserveInside = {
		inside: false,
		outside: true
	};
	const encodeBoth = {
		inside: true,
		outside: true
	};
	for (const candidate of [
		raw,
		preserveOutside,
		preserveInside,
		encodeBoth
	]) {
		const candidateBefore = target === "open" ? candidate.outside ? encodedBoundaryBeforeContext$1 : before : candidate.inside ? encodedBoundaryBeforeContext$1 : before;
		const candidateAfter = target === "open" ? candidate.inside ? encodedBoundaryAfter$1 : after : candidate.outside ? encodedBoundaryAfter$1 : after;
		if (target === "open" ? canOpen$1(marker, candidateBefore, candidateAfter) : canClose$1(marker, candidateBefore, candidateAfter)) return candidate;
	}
	return encodeBoth;
}
function encodeInfoFallback$1(outsideKind, insideKind, marker) {
	if (isLetterLike$1(outsideKind)) return isLetterLike$1(insideKind) ? marker === "_" ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	} : isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: true
	};
	if (isUnicodeWhitespace(outsideKind)) return isLetterLike$1(insideKind) ? {
		inside: false,
		outside: false
	} : isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	};
	return isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: false
	} : {
		inside: false,
		outside: false
	};
}
function canOpen$1(marker, before, afterCode) {
	const beforeKind = classifyBoundaryBefore$1(before);
	const { close, open } = getAttentionSides$1(beforeKind, classifyCharacter(afterCode));
	return marker === "_" ? open && (isSpaceOrPunctuation(beforeKind) || !close) : open;
}
function canClose$1(marker, before, afterCode) {
	const afterKind = classifyCharacter(afterCode);
	const { close, open } = getAttentionSides$1(classifyBoundaryBefore$1(before), afterKind);
	return marker === "_" ? close && (isSpaceOrPunctuation(afterKind) || !open) : close;
}
function getAttentionSides$1(beforeKind, afterKind) {
	const beforeNonCjkPunctuation = isNonCjkPunctuation(beforeKind);
	const beforeSpaceOrNonCjkPunctuation = beforeNonCjkPunctuation || isUnicodeWhitespace(beforeKind);
	const afterNonCjkPunctuation = isNonCjkPunctuation(afterKind);
	const afterSpaceOrNonCjkPunctuation = afterNonCjkPunctuation || isUnicodeWhitespace(afterKind);
	return {
		open: !afterSpaceOrNonCjkPunctuation || afterNonCjkPunctuation && (beforeSpaceOrNonCjkPunctuation || isCjkOrIvs(beforeKind)),
		close: !beforeSpaceOrNonCjkPunctuation || beforeNonCjkPunctuation && (afterSpaceOrNonCjkPunctuation || isCjk(afterKind))
	};
}
function isLetterLike$1(kind) {
	return !isUnicodeWhitespace(kind) && !isNonCjkPunctuation(kind);
}
function classifyBoundaryBefore$1(before) {
	const kind = classifyCharacter(before.current);
	return before.current === null || !isNonEmojiGeneralUseVS(kind) ? kind : classifyPrecedingCharacter(kind, () => before.previous, before.current);
}
function resolveBeforeBoundary$1(node, parent, state, fallback) {
	let current = lastCodePoint$1(fallback);
	let previous$1 = codePointBeforeLast$1(fallback);
	if (needsPreviousBoundaryRecovery$1(current) || needsPreviousContext$1(current, previous$1)) {
		const siblingText = getAdjacentSiblingText$1(node, parent, state, -1);
		if (siblingText) {
			current = lastCodePoint$1(siblingText);
			previous$1 = codePointBeforeLast$1(siblingText);
		}
	}
	return {
		current,
		previous: previous$1
	};
}
function resolveAfterBoundary$1(node, parent, state, fallback) {
	const current = firstCodePoint$1(fallback);
	if (!needsNextBoundaryRecovery$1(current)) return current;
	const siblingText = getAdjacentSiblingText$1(node, parent, state, 1);
	return siblingText ? firstCodePoint$1(siblingText) : current;
}
function needsPreviousBoundaryRecovery$1(codePoint) {
	return codePoint !== null && 56320 <= codePoint && codePoint <= 57343;
}
function needsNextBoundaryRecovery$1(codePoint) {
	return codePoint !== null && 55296 <= codePoint && codePoint <= 56319;
}
function needsPreviousContext$1(current, previous$1) {
	return isNonEmojiGeneralUseVS(classifyCharacter(current)) && (previous$1 === null || previous$1 === codes.eof);
}
function getAdjacentSiblingText$1(node, parent, state, offset) {
	if (!parent) return;
	const stackIndex = state.indexStack.at(-1);
	const siblings = parent.children;
	const index = typeof stackIndex === "number" ? stackIndex : siblings.indexOf(node);
	if (index < 0) return;
	const sibling = siblings[index + offset];
	return getNodeTextContent$1(sibling) || void 0;
}
function shouldEncodeAfterSupplementaryText$1(parent, state) {
	if (!parent) return false;
	const stackIndex = state.indexStack.at(-1);
	if (typeof stackIndex !== "number") return false;
	const sibling = parent.children[stackIndex + 1];
	return sibling?.type === "text" && (firstCodePoint$1(sibling.value) ?? 0) > 65535;
}
function getCjkFriendlyState$1(state) {
	return state;
}
function getNodeTextContent$1(node) {
	if (!node || typeof node !== "object") return "";
	if ("value" in node && typeof node.value === "string") return node.value;
	if ("alt" in node && typeof node.alt === "string") return node.alt;
	if ("children" in node && Array.isArray(node.children)) return node.children.map(getNodeTextContent$1).join("");
	return "";
}
function encodeCharacterReference$1(codePoint) {
	return `&#x${(codePoint ?? 0).toString(16).toUpperCase()};`;
}
function encodeFirstCodePoint$1(value) {
	const [first = ""] = [...value];
	return encodeCharacterReference$1(first.codePointAt(0) ?? codes.eof) + value.slice(first.length);
}
function encodeLastCodePoint$1(value) {
	const characters = [...value];
	const last = characters.pop();
	return `${characters.join("")}${encodeCharacterReference$1(last?.codePointAt(0) ?? codes.eof)}`;
}
function codePointBeforeLast$1(value) {
	const characters = [...value];
	characters.pop();
	return characters.at(-1)?.codePointAt(0) ?? codes.eof;
}
function firstCodePoint$1(value) {
	return value.codePointAt(0) ?? codes.eof;
}
function lastCodePoint$1(value) {
	return [...value].at(-1)?.codePointAt(0) ?? codes.eof;
}
var encodedBoundaryBeforeContext$1 = {
	current: encodedOutsideBoundary$1,
	previous: codes.eof
};
var encodedBoundaryAfter$1 = encodedInsideBoundary$1;
var attention = {
	name: "attention",
	resolveAll: resolveAllAttention,
	tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
	let index = -1;
	let open;
	let group;
	let text$3;
	let openingSequence;
	let closingSequence;
	let use;
	let nextEvents;
	let offset;
	while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
		open = index;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
			const start = { ...events[open][1].end };
			const end = { ...events[index][1].start };
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? types.strongSequence : types.emphasisSequence,
				start,
				end: { ...events[open][1].end }
			};
			closingSequence = {
				type: use > 1 ? types.strongSequence : types.emphasisSequence,
				start: { ...events[index][1].start },
				end
			};
			text$3 = {
				type: use > 1 ? types.strongText : types.emphasisText,
				start: { ...events[open][1].end },
				end: { ...events[index][1].start }
			};
			group = {
				type: use > 1 ? types.strong : types.emphasis,
				start: { ...openingSequence.start },
				end: { ...closingSequence.end }
			};
			events[open][1].end = { ...openingSequence.start };
			events[index][1].start = { ...closingSequence.end };
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
			context.parser.constructs.insideSpan.null;
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
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
			if (events[index][1].end.offset - events[index][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index][1],
					context
				], [
					"exit",
					events[index][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index - open + 3, nextEvents);
			index = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index = -1;
	while (++index < events.length) if (events[index][1].type === "attentionSequence") events[index][1].type = "data";
	return events;
}
function tokenizeAttention(effects, ok$1) {
	const attentionMarkers = this.parser.constructs.attentionMarkers.null;
	const { now, sliceSerialize, previous: tentativePrevious } = this;
	const previous$1 = isCodeLowSurrogate(tentativePrevious) ? tryGetGenuinePreviousCode(tentativePrevious, now(), sliceSerialize) : tentativePrevious;
	const before = classifyCharacter(previous$1);
	const twoPrevious = new TwoPreviousCode(previous$1, now(), sliceSerialize);
	const beforePrimary = classifyPrecedingCharacter(before, twoPrevious.value.bind(twoPrevious), previous$1);
	let marker;
	return start;
	function start(code) {
		code === codes.asterisk || codes.underscore;
		marker = code;
		effects.enter("attentionSequence");
		return inside(code);
	}
	function inside(code) {
		if (code === marker) {
			effects.consume(code);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(isCodeHighSurrogate(code) ? tryGetGenuineNextCode(code, now(), sliceSerialize) : code);
		const beforeNonCjkPunctuation = isNonCjkPunctuation(beforePrimary);
		const beforeSpaceOrNonCjkPunctuation = beforeNonCjkPunctuation || isUnicodeWhitespace(beforePrimary);
		const afterNonCjkPunctuation = isNonCjkPunctuation(after);
		const afterSpaceOrNonCjkPunctuation = afterNonCjkPunctuation || isUnicodeWhitespace(after);
		const beforeCjkOrIvs = isCjkOrIvs(beforePrimary);
		const open = !afterSpaceOrNonCjkPunctuation || afterNonCjkPunctuation && (beforeSpaceOrNonCjkPunctuation || beforeCjkOrIvs) || attentionMarkers.includes(code);
		const close = !beforeSpaceOrNonCjkPunctuation || beforeNonCjkPunctuation && (afterSpaceOrNonCjkPunctuation || isCjk(after)) || attentionMarkers.includes(previous$1);
		token._open = Boolean(marker === codes.asterisk ? open : open && (isSpaceOrPunctuation(beforePrimary) || !close));
		token._close = Boolean(marker === codes.asterisk ? close : close && (isSpaceOrPunctuation(after) || !open));
		return ok$1(code);
	}
}
function movePoint(point, offset) {
	point.column += offset;
	point.offset += offset;
	point._bufferIndex += offset;
}
function cjkFriendlyExtension() {
	return {
		text: {
			[codes.asterisk]: attention,
			[codes.underscore]: attention
		},
		insideSpan: { null: [attention] }
	};
}
function remarkCjkFriendly() {
	const data = this.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(cjkFriendlyExtension());
	toMarkdownExtensions.push(cjkFriendlyToMarkdown());
}
var constructsWithoutStrikethrough = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
var encodedOutsideBoundary = ";".codePointAt(0) ?? codes.eof;
var encodedInsideBoundary = "&".codePointAt(0) ?? codes.eof;
function cjkFriendlyGfmStrikethroughToMarkdown() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: constructsWithoutStrikethrough
		}],
		handlers: {
			delete: handleDelete,
			text: text$1
		}
	};
}
handleDelete.peek = peekDelete;
function handleDelete(node, parent, state, info) {
	const sequence = "~~";
	const exit = state.enter("strikethrough");
	const tracker = state.createTracker(info);
	const before = tracker.move(sequence);
	let between = tracker.move(state.containerPhrasing(node, {
		after: "~",
		before,
		...tracker.current()
	}));
	const beforeBoundary = resolveBeforeBoundary(node, parent, state, info.before);
	const afterBoundary = resolveAfterBoundary(node, parent, state, info.after);
	const open = encodeInfoCjk(beforeBoundary, firstCodePoint(between), "open");
	if (open.inside && between) between = encodeFirstCodePoint(between);
	const close = encodeInfoCjk({
		current: lastCodePoint(between),
		previous: codePointBeforeLast(between)
	}, afterBoundary, "close");
	if (close.inside && between) between = encodeLastCodePoint(between);
	const after = tracker.move(sequence);
	exit();
	const encodeAfterSupplementary = close.outside && shouldEncodeAfterSupplementaryText(parent, state);
	state.attentionEncodeSurroundingInfo = {
		after: close.outside && !encodeAfterSupplementary,
		before: open.outside
	};
	getCjkFriendlyState(state).cjkFriendlyEncodeAfterSupplementaryText = encodeAfterSupplementary;
	return before + between + after;
}
function text$1(node, _parent, state, info) {
	const cjkFriendlyState = getCjkFriendlyState(state);
	if (!cjkFriendlyState.cjkFriendlyEncodeAfterSupplementaryText) return state.safe(node.value, info);
	cjkFriendlyState.cjkFriendlyEncodeAfterSupplementaryText = false;
	const [first = ""] = [...node.value];
	const rest = node.value.slice(first.length);
	return `${encodeCharacterReference(first.codePointAt(0) ?? codes.eof)}${state.safe(rest, {
		...info,
		before: ";"
	})}`;
}
function peekDelete() {
	return "~";
}
function encodeInfoCjk(before, after, target) {
	const beforeKind = classifyBoundaryBefore(before);
	const afterKind = classifyCharacter(after);
	if (!isCjkOrIvs(beforeKind) && !isCjkOrIvs(afterKind)) return target === "open" ? encodeInfoFallback(beforeKind, afterKind) : encodeInfoFallback(afterKind, beforeKind);
	const raw = {
		inside: false,
		outside: false
	};
	const preserveOutside = {
		inside: true,
		outside: false
	};
	const preserveInside = {
		inside: false,
		outside: true
	};
	const encodeBoth = {
		inside: true,
		outside: true
	};
	for (const candidate of [
		raw,
		preserveOutside,
		preserveInside,
		encodeBoth
	]) {
		const candidateBefore = target === "open" ? candidate.outside ? encodedBoundaryBeforeContext : before : candidate.inside ? encodedBoundaryBeforeContext : before;
		const candidateAfter = target === "open" ? candidate.inside ? encodedBoundaryAfter : after : candidate.outside ? encodedBoundaryAfter : after;
		if (target === "open" ? canOpen(candidateBefore, candidateAfter) : canClose(candidateBefore, candidateAfter)) return candidate;
	}
	return encodeBoth;
}
function encodeInfoFallback(outsideKind, insideKind) {
	if (isLetterLike(outsideKind)) return isLetterLike(insideKind) ? {
		inside: false,
		outside: false
	} : isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: true
	};
	if (isUnicodeWhitespace(outsideKind)) return isLetterLike(insideKind) ? {
		inside: false,
		outside: false
	} : isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	};
	return isUnicodeWhitespace(insideKind) ? {
		inside: true,
		outside: false
	} : {
		inside: false,
		outside: false
	};
}
function canOpen(before, afterCode) {
	const { open } = getAttentionSides(classifyBoundaryBefore(before), classifyCharacter(afterCode));
	return open;
}
function canClose(before, afterCode) {
	const afterKind = classifyCharacter(afterCode);
	const { close } = getAttentionSides(classifyBoundaryBefore(before), afterKind);
	return close;
}
function getAttentionSides(beforeKind, afterKind) {
	const beforeNonCjkPunctuation = isNonCjkPunctuation(beforeKind);
	const beforeSpaceOrNonCjkPunctuation = beforeNonCjkPunctuation || isUnicodeWhitespace(beforeKind);
	const afterNonCjkPunctuation = isNonCjkPunctuation(afterKind);
	const afterSpaceOrNonCjkPunctuation = afterNonCjkPunctuation || isUnicodeWhitespace(afterKind);
	return {
		open: !afterSpaceOrNonCjkPunctuation || afterNonCjkPunctuation && (beforeSpaceOrNonCjkPunctuation || isCjkOrIvs(beforeKind)),
		close: !beforeSpaceOrNonCjkPunctuation || beforeNonCjkPunctuation && (afterSpaceOrNonCjkPunctuation || isCjk(afterKind))
	};
}
function isLetterLike(kind) {
	return !isUnicodeWhitespace(kind) && !isNonCjkPunctuation(kind);
}
function classifyBoundaryBefore(before) {
	const kind = classifyCharacter(before.current);
	return before.current === null || !isNonEmojiGeneralUseVS(kind) ? kind : classifyPrecedingCharacter(kind, () => before.previous, before.current);
}
function resolveBeforeBoundary(node, parent, state, fallback) {
	let current = lastCodePoint(fallback);
	let previous$1 = codePointBeforeLast(fallback);
	if (needsPreviousBoundaryRecovery(current) || needsPreviousContext(current, previous$1)) {
		const siblingText = getAdjacentSiblingText(node, parent, state, -1);
		if (siblingText) {
			current = lastCodePoint(siblingText);
			previous$1 = codePointBeforeLast(siblingText);
		}
	}
	return {
		current,
		previous: previous$1
	};
}
function resolveAfterBoundary(node, parent, state, fallback) {
	const current = firstCodePoint(fallback);
	if (!needsNextBoundaryRecovery(current)) return current;
	const siblingText = getAdjacentSiblingText(node, parent, state, 1);
	return siblingText ? firstCodePoint(siblingText) : current;
}
function needsPreviousBoundaryRecovery(codePoint) {
	return codePoint !== null && 56320 <= codePoint && codePoint <= 57343;
}
function needsNextBoundaryRecovery(codePoint) {
	return codePoint !== null && 55296 <= codePoint && codePoint <= 56319;
}
function needsPreviousContext(current, previous$1) {
	return isNonEmojiGeneralUseVS(classifyCharacter(current)) && (previous$1 === null || previous$1 === codes.eof);
}
function getAdjacentSiblingText(node, parent, state, offset) {
	if (!parent) return;
	const stackIndex = state.indexStack.at(-1);
	const siblings = parent.children;
	const index = typeof stackIndex === "number" ? stackIndex : siblings.indexOf(node);
	if (index < 0) return;
	const sibling = siblings[index + offset];
	return getNodeTextContent(sibling) || void 0;
}
function shouldEncodeAfterSupplementaryText(parent, state) {
	if (!parent) return false;
	const stackIndex = state.indexStack.at(-1);
	if (typeof stackIndex !== "number") return false;
	const sibling = parent.children[stackIndex + 1];
	return sibling?.type === "text" && (firstCodePoint(sibling.value) ?? 0) > 65535;
}
function getCjkFriendlyState(state) {
	return state;
}
function getNodeTextContent(node) {
	if (!node || typeof node !== "object") return "";
	if ("value" in node && typeof node.value === "string") return node.value;
	if ("alt" in node && typeof node.alt === "string") return node.alt;
	if ("children" in node && Array.isArray(node.children)) return node.children.map(getNodeTextContent).join("");
	return "";
}
function encodeCharacterReference(codePoint) {
	return `&#x${(codePoint ?? 0).toString(16).toUpperCase()};`;
}
function encodeFirstCodePoint(value) {
	const [first = ""] = [...value];
	return encodeCharacterReference(first.codePointAt(0) ?? codes.eof) + value.slice(first.length);
}
function encodeLastCodePoint(value) {
	const characters = [...value];
	const last = characters.pop();
	return `${characters.join("")}${encodeCharacterReference(last?.codePointAt(0) ?? codes.eof)}`;
}
function codePointBeforeLast(value) {
	const characters = [...value];
	characters.pop();
	return characters.at(-1)?.codePointAt(0) ?? codes.eof;
}
function firstCodePoint(value) {
	return value.codePointAt(0) ?? codes.eof;
}
function lastCodePoint(value) {
	return [...value].at(-1)?.codePointAt(0) ?? codes.eof;
}
var encodedBoundaryBeforeContext = {
	current: encodedOutsideBoundary,
	previous: codes.eof
};
var encodedBoundaryAfter = encodedInsideBoundary;
function gfmStrikethroughCjkFriendly(options) {
	let single = (options || {}).singleTilde;
	const tokenizer = {
		name: "strikethrough",
		tokenize: tokenizeStrikethrough,
		resolveAll: resolveAllStrikethrough
	};
	if (single === null || single === void 0) single = true;
	return {
		text: { [codes.tilde]: tokenizer },
		insideSpan: { null: [tokenizer] },
		attentionMarkers: { null: [codes.tilde] }
	};
	function resolveAllStrikethrough(events, context) {
		let index = -1;
		while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
			let open = index;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
				events[index][1].type = "strikethroughSequence";
				events[open][1].type = "strikethroughSequence";
				const strikethrough = {
					type: "strikethrough",
					start: Object.assign({}, events[open][1].start),
					end: Object.assign({}, events[index][1].end)
				};
				const text$3 = {
					type: "strikethroughText",
					start: Object.assign({}, events[open][1].end),
					end: Object.assign({}, events[index][1].start)
				};
				const nextEvents = [
					[
						"enter",
						strikethrough,
						context
					],
					[
						"enter",
						events[open][1],
						context
					],
					[
						"exit",
						events[open][1],
						context
					],
					[
						"enter",
						text$3,
						context
					]
				];
				const insideSpan = context.parser.constructs.insideSpan.null;
				if (insideSpan) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan, events.slice(open + 1, index), context));
				splice(nextEvents, nextEvents.length, 0, [
					[
						"exit",
						text$3,
						context
					],
					[
						"enter",
						events[index][1],
						context
					],
					[
						"exit",
						events[index][1],
						context
					],
					[
						"exit",
						strikethrough,
						context
					]
				]);
				splice(events, open - 1, index - open + 3, nextEvents);
				index = open + nextEvents.length - 2;
				break;
			}
		}
		index = -1;
		while (++index < events.length) if (events[index][1].type === "strikethroughSequenceTemporary") events[index][1].type = types.data;
		return events;
	}
	function tokenizeStrikethrough(effects, ok$1, nok) {
		const { now, sliceSerialize, previous: tentativePrevious } = this;
		const previous$1 = isCodeLowSurrogate(tentativePrevious) ? tryGetGenuinePreviousCode(tentativePrevious, now(), sliceSerialize) : tentativePrevious;
		const before = classifyCharacter(previous$1);
		const twoPrevious = new TwoPreviousCode(previous$1, now(), sliceSerialize);
		const beforePrimary = classifyPrecedingCharacter(before, twoPrevious.value.bind(twoPrevious), previous$1);
		const events = this.events;
		let size = 0;
		return start;
		function start(code) {
			codes.tilde;
			if (previous$1 === codes.tilde && events[events.length - 1][1].type !== types.characterEscape) return nok(code);
			effects.enter("strikethroughSequenceTemporary");
			return more(code);
		}
		function more(code) {
			const before$1 = classifyCharacter(previous$1);
			if (code === codes.tilde) {
				if (size > 1) return nok(code);
				effects.consume(code);
				size++;
				return more;
			}
			if (size < 2 && !single) return nok(code);
			const token = effects.exit("strikethroughSequenceTemporary");
			const after = classifyCharacter(isCodeHighSurrogate(code) ? tryGetGenuineNextCode(code, now(), sliceSerialize) : code);
			const beforeSpaceOrNonCjkPunctuation = isNonCjkPunctuation(beforePrimary) || isUnicodeWhitespace(beforePrimary);
			const afterSpaceOrNonCjkPunctuation = isNonCjkPunctuation(after) || isUnicodeWhitespace(after);
			const beforeCjkOrIvs = isCjk(beforePrimary) || isIvs(before$1);
			token._open = !afterSpaceOrNonCjkPunctuation || after === constants.attentionSideAfter && (beforeSpaceOrNonCjkPunctuation || beforeCjkOrIvs);
			token._close = !beforeSpaceOrNonCjkPunctuation || before$1 === constants.attentionSideAfter && (afterSpaceOrNonCjkPunctuation || isCjk(after));
			return ok$1(code);
		}
	}
}
function remarkGfmStrikethroughCjkFriendly(options) {
	const data = this.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(gfmStrikethroughCjkFriendly(options));
	toMarkdownExtensions.push(cjkFriendlyGfmStrikethroughToMarkdown());
}
var k = new Set([
	"。",
	"．",
	"，",
	"、",
	"？",
	"！",
	"：",
	"；",
	"（",
	"）",
	"【",
	"】",
	"「",
	"」",
	"『",
	"』",
	"〈",
	"〉",
	"《",
	"》"
]), m$1 = /^(https?:\/\/|mailto:|www\.)/i, f$1 = (t) => {
	if (t.children.length !== 1) return false;
	let r$1 = t.children[0];
	return r$1.type === "text" && r$1.value === t.url;
}, P$1 = (t) => {
	let r$1 = 0;
	for (let e of t) {
		if (k.has(e)) return r$1;
		r$1 += e.length;
	}
	return null;
}, p$2 = (t, r$1) => ({
	...r$1,
	url: t,
	children: [{
		type: "text",
		value: t
	}]
}), d = (t) => ({
	type: "text",
	value: t
}), y = () => (t) => {
	visit(t, "link", (r$1, e, i) => {
		if (!i || typeof e != "number" || !f$1(r$1) || !m$1.test(r$1.url)) return;
		let n = P$1(r$1.url);
		if (n === null || n === 0) return;
		let l = r$1.url.slice(0, n), u = r$1.url.slice(n), o$2 = p$2(l, r$1), s$2 = d(u);
		return i.children.splice(e, 1, o$2, s$2), e + 1;
	});
};
function b() {
	let t = [remarkCjkFriendly], r$1 = [y, remarkGfmStrikethroughCjkFriendly];
	return {
		name: "cjk",
		type: "cjk",
		remarkPluginsBefore: t,
		remarkPluginsAfter: r$1,
		remarkPlugins: [...t, ...r$1]
	};
}
var A = b();
var S = createJavaScriptRegexEngine({ forgiving: true }), C = Object.fromEntries(bundledLanguagesInfo.flatMap((e) => {
	var n;
	return ((n = e.aliases) != null ? n : []).map((t) => [t, e.id]);
})), r = new Set(Object.keys(bundledLanguages)), B = (e) => {
	let t = e.trim().toLowerCase();
	return C[t] || (r.has(t), t);
}, c = /* @__PURE__ */ new Map(), p$1 = /* @__PURE__ */ new Map(), s$1 = /* @__PURE__ */ new Map(), o$1 = (e) => {
	var n;
	return typeof e == "string" ? e : (n = e.name) != null ? n : "custom";
}, v = (e, n) => `${e}-${o$1(n[0])}-${o$1(n[1])}`, x = (e, n, t) => {
	let g$1 = e.slice(0, 100), u = e.length > 100 ? e.slice(-100) : "";
	return `${n}:${t[0]}:${t[1]}:${e.length}:${g$1}:${u}`;
}, P = (e, n) => {
	let t = v(e, n);
	if (c.has(t)) return c.get(t);
	let g$1 = createHighlighter({
		themes: n,
		langs: [e],
		engine: S
	});
	return c.set(t, g$1), g$1;
};
function $(e = {}) {
	var t;
	let n = (t = e.themes) != null ? t : ["github-light", "github-dark"];
	return {
		name: "shiki",
		type: "code-highlighter",
		supportsLanguage(g$1) {
			let u = B(g$1);
			return r.has(u);
		},
		getSupportedLanguages() {
			return Array.from(r);
		},
		getThemes() {
			return n;
		},
		highlight({ code: g$1, language: u, themes: h$2 }, m$2) {
			let i = B(u), d$1 = [o$1(h$2[0]), o$1(h$2[1])], a = x(g$1, i, d$1);
			if (p$1.has(a)) {
				let R = p$1.get(a);
				p$1.delete(a);
				p$1.set(a, R);
				return R;
			}
			m$2 && (s$1.has(a) || s$1.set(a, /* @__PURE__ */ new Set()), s$1.get(a).add(m$2));
			return P(r.has(i) ? i : "text", h$2).then((l) => {
				let y$1 = l.getLoadedLanguages().includes(i) ? i : "text", L = l.codeToTokens(g$1, {
					lang: y$1,
					themes: {
						light: d$1[0],
						dark: d$1[1]
					}
				});
				p$1.set(a, L);
				while (p$1.size > 24) {
					let R = p$1.keys().next().value;
					p$1.delete(R);
				}
				let T = s$1.get(a);
				if (T) {
					for (let H of T) H(L);
					s$1.delete(a);
				}
			}).catch((l) => {
				console.error("[Streamdown Code] Failed to highlight code:", l), s$1.delete(a);
			}), null;
		}
	};
}
var G = $();
function fromDom(tree, options) {
	return transform(tree, options || {}) || {
		type: "root",
		children: []
	};
}
function transform(node, options) {
	const transformed = one(node, options);
	if (transformed && options.afterTransform) options.afterTransform(node, transformed);
	return transformed;
}
function one(node, options) {
	switch (node.nodeType) {
		case 1: return element$1(node, options);
		case 3: return text(node);
		case 8: return comment(node);
		case 9: return root(node, options);
		case 10: return doctype();
		case 11: return root(node, options);
		default: return;
	}
}
function root(node, options) {
	return {
		type: "root",
		children: all(node, options)
	};
}
function doctype() {
	return { type: "doctype" };
}
function text(node) {
	return {
		type: "text",
		value: node.nodeValue || ""
	};
}
function comment(node) {
	return {
		type: "comment",
		value: node.nodeValue || ""
	};
}
function element$1(node, options) {
	const space = node.namespaceURI;
	const x$1 = space === webNamespaces.svg ? s : h$1;
	const tagName = space === webNamespaces.html ? node.tagName.toLowerCase() : node.tagName;
	const content = space === webNamespaces.html && tagName === "template" ? node.content : node;
	const attributes = node.getAttributeNames();
	const properties = {};
	let index = -1;
	while (++index < attributes.length) properties[attributes[index]] = node.getAttribute(attributes[index]) || "";
	return x$1(tagName, properties, all(content, options));
}
function all(node, options) {
	const nodes = node.childNodes;
	const children = [];
	let index = -1;
	while (++index < nodes.length) {
		const child = transform(nodes[index], options);
		if (child !== void 0) children.push(child);
	}
	return children;
}
var parser = new DOMParser();
function fromHtmlIsomorphic(value, options) {
	return fromDom(options?.fragment ? parseFragment(value) : parser.parseFromString(value, "text/html"));
}
function parseFragment(value) {
	const template = document.createElement("template");
	template.innerHTML = value;
	return template.content;
}
const findAfter = (function(parent, index, test) {
	const is = convert(test);
	if (!parent || !parent.type || !parent.children) throw new Error("Expected parent node");
	if (typeof index === "number") {
		if (index < 0 || index === Number.POSITIVE_INFINITY) throw new Error("Expected positive finite number as index");
	} else {
		index = parent.children.indexOf(index);
		if (index < 0) throw new Error("Expected child node or index");
	}
	while (++index < parent.children.length) if (is(parent.children[index], index, parent)) return parent.children[index];
});
const convertElement = (function(test) {
	if (test === null || test === void 0) return element;
	if (typeof test === "string") return tagNameFactory(test);
	if (typeof test === "object") return anyFactory(test);
	if (typeof test === "function") return castFactory(test);
	throw new Error("Expected function, string, or array as `test`");
});
function anyFactory(tests) {
	const checks = [];
	let index = -1;
	while (++index < tests.length) checks[index] = convertElement(tests[index]);
	return castFactory(any);
	function any(...parameters) {
		let index$1 = -1;
		while (++index$1 < checks.length) if (checks[index$1].apply(this, parameters)) return true;
		return false;
	}
}
function tagNameFactory(check) {
	return castFactory(tagName);
	function tagName(element$2) {
		return element$2.tagName === check;
	}
}
function castFactory(testFunction) {
	return check;
	function check(value, index, parent) {
		return Boolean(looksLikeAnElement(value) && testFunction.call(this, value, typeof index === "number" ? index : void 0, parent || void 0));
	}
}
function element(element$2) {
	return Boolean(element$2 && typeof element$2 === "object" && "type" in element$2 && element$2.type === "element" && "tagName" in element$2 && typeof element$2.tagName === "string");
}
function looksLikeAnElement(value) {
	return value !== null && typeof value === "object" && "type" in value && "tagName" in value;
}
var searchLineFeeds = /\n/g;
var searchTabOrSpaces = /[\t ]+/g;
var br = convertElement("br");
var cell = convertElement(isCell);
var p = convertElement("p");
var row = convertElement("tr");
var notRendered = convertElement([
	"datalist",
	"head",
	"noembed",
	"noframes",
	"noscript",
	"rp",
	"script",
	"style",
	"template",
	"title",
	hidden,
	closedDialog
]);
var blockOrCaption = convertElement([
	"address",
	"article",
	"aside",
	"blockquote",
	"body",
	"caption",
	"center",
	"dd",
	"dialog",
	"dir",
	"dl",
	"dt",
	"div",
	"figure",
	"figcaption",
	"footer",
	"form,",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"hr",
	"html",
	"legend",
	"li",
	"listing",
	"main",
	"menu",
	"nav",
	"ol",
	"p",
	"plaintext",
	"pre",
	"section",
	"ul",
	"xmp"
]);
function toText(tree, options) {
	const options_ = options || {};
	const children = "children" in tree ? tree.children : [];
	const block = blockOrCaption(tree);
	const whitespace = inferWhitespace(tree, {
		whitespace: options_.whitespace || "normal",
		breakBefore: false,
		breakAfter: false
	});
	const results = [];
	if (tree.type === "text" || tree.type === "comment") results.push(...collectText(tree, {
		whitespace,
		breakBefore: true,
		breakAfter: true
	}));
	let index = -1;
	while (++index < children.length) results.push(...renderedTextCollection(children[index], tree, {
		whitespace,
		breakBefore: index ? void 0 : block,
		breakAfter: index < children.length - 1 ? br(children[index + 1]) : block
	}));
	const result = [];
	let count;
	index = -1;
	while (++index < results.length) {
		const value = results[index];
		if (typeof value === "number") {
			if (count !== void 0 && value > count) count = value;
		} else if (value) {
			if (count !== void 0 && count > -1) result.push("\n".repeat(count) || " ");
			count = -1;
			result.push(value);
		}
	}
	return result.join("");
}
function renderedTextCollection(node, parent, info) {
	if (node.type === "element") return collectElement(node, parent, info);
	if (node.type === "text") return info.whitespace === "normal" ? collectText(node, info) : collectPreText(node);
	return [];
}
function collectElement(node, parent, info) {
	const whitespace = inferWhitespace(node, info);
	const children = node.children || [];
	let index = -1;
	let items = [];
	if (notRendered(node)) return items;
	let prefix;
	let suffix;
	if (br(node)) suffix = "\n";
	else if (row(node) && findAfter(parent, node, row)) suffix = "\n";
	else if (p(node)) {
		prefix = 2;
		suffix = 2;
	} else if (blockOrCaption(node)) {
		prefix = 1;
		suffix = 1;
	}
	while (++index < children.length) items = items.concat(renderedTextCollection(children[index], node, {
		whitespace,
		breakBefore: index ? void 0 : prefix,
		breakAfter: index < children.length - 1 ? br(children[index + 1]) : suffix
	}));
	if (cell(node) && findAfter(parent, node, cell)) items.push("	");
	if (prefix) items.unshift(prefix);
	if (suffix) items.push(suffix);
	return items;
}
function collectText(node, info) {
	const value = String(node.value);
	const lines = [];
	const result = [];
	let start = 0;
	while (start <= value.length) {
		searchLineFeeds.lastIndex = start;
		const match = searchLineFeeds.exec(value);
		const end = match && "index" in match ? match.index : value.length;
		lines.push(trimAndCollapseSpacesAndTabs(value.slice(start, end).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), start === 0 ? info.breakBefore : true, end === value.length ? info.breakAfter : true));
		start = end + 1;
	}
	let index = -1;
	let join;
	while (++index < lines.length) if (lines[index].charCodeAt(lines[index].length - 1) === 8203 || index < lines.length - 1 && lines[index + 1].charCodeAt(0) === 8203) {
		result.push(lines[index]);
		join = void 0;
	} else if (lines[index]) {
		if (typeof join === "number") result.push(join);
		result.push(lines[index]);
		join = 0;
	} else if (index === 0 || index === lines.length - 1) result.push(0);
	return result;
}
function collectPreText(node) {
	return [String(node.value)];
}
function trimAndCollapseSpacesAndTabs(value, breakBefore, breakAfter) {
	const result = [];
	let start = 0;
	let end;
	while (start < value.length) {
		searchTabOrSpaces.lastIndex = start;
		const match = searchTabOrSpaces.exec(value);
		end = match ? match.index : value.length;
		if (!start && !end && match && !breakBefore) result.push("");
		if (start !== end) result.push(value.slice(start, end));
		start = match ? end + match[0].length : end;
	}
	if (start !== end && !breakAfter) result.push("");
	return result.join(" ");
}
function inferWhitespace(node, info) {
	if (node.type === "element") {
		const properties = node.properties || {};
		switch (node.tagName) {
			case "listing":
			case "plaintext":
			case "xmp": return "pre";
			case "nobr": return "nowrap";
			case "pre": return properties.wrap ? "pre-wrap" : "pre";
			case "td":
			case "th": return properties.noWrap ? "nowrap" : info.whitespace;
			case "textarea": return "pre-wrap";
			default:
		}
	}
	return info.whitespace;
}
function hidden(node) {
	return Boolean((node.properties || {}).hidden);
}
function isCell(node) {
	return node.tagName === "td" || node.tagName === "th";
}
function closedDialog(node) {
	return node.tagName === "dialog" && !(node.properties || {}).open;
}
var emptyOptions$1 = {};
var emptyClasses = [];
function rehypeKatex(options) {
	const settings = options || emptyOptions$1;
	return function(tree, file) {
		visitParents(tree, "element", function(element$2, parents) {
			const classes = Array.isArray(element$2.properties.className) ? element$2.properties.className : emptyClasses;
			const languageMath = classes.includes("language-math");
			const mathDisplay = classes.includes("math-display");
			const mathInline = classes.includes("math-inline");
			let displayMode = mathDisplay;
			if (!languageMath && !mathDisplay && !mathInline) return;
			let parent = parents[parents.length - 1];
			let scope = element$2;
			if (element$2.tagName === "code" && languageMath && parent && parent.type === "element" && parent.tagName === "pre") {
				scope = parent;
				parent = parents[parents.length - 2];
				displayMode = true;
			}
			/* c8 ignore next -- verbose to test. */
			if (!parent) return;
			const value = toText(scope, { whitespace: "pre" });
			let result;
			try {
				result = katex.renderToString(value, {
					...settings,
					displayMode,
					throwOnError: true
				});
			} catch (error) {
				const cause = error;
				const ruleId = cause.name.toLowerCase();
				file.message("Could not render math with KaTeX", {
					ancestors: [...parents, element$2],
					cause,
					place: element$2.position,
					ruleId,
					source: "rehype-katex"
				});
				try {
					result = katex.renderToString(value, {
						...settings,
						displayMode,
						strict: "ignore",
						throwOnError: false
					});
				} catch {
					result = [{
						type: "element",
						tagName: "span",
						properties: {
							className: ["katex-error"],
							style: "color:" + (settings.errorColor || "#cc0000"),
							title: String(error)
						},
						children: [{
							type: "text",
							value
						}]
					}];
				}
			}
			if (typeof result === "string") result = fromHtmlIsomorphic(result, { fragment: true }).children;
			const index = parent.children.indexOf(scope);
			parent.children.splice(index, 1, ...result);
			return SKIP;
		});
	};
}
function mathFromMarkdown() {
	return {
		enter: {
			mathFlow: enterMathFlow,
			mathFlowFenceMeta: enterMathFlowMeta,
			mathText: enterMathText
		},
		exit: {
			mathFlow: exitMathFlow,
			mathFlowFence: exitMathFlowFence,
			mathFlowFenceMeta: exitMathFlowMeta,
			mathFlowValue: exitMathData,
			mathText: exitMathText,
			mathTextData: exitMathData
		}
	};
	function enterMathFlow(token) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, token);
	}
	function enterMathFlowMeta() {
		this.buffer();
	}
	function exitMathFlowMeta() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.meta = data;
	}
	function exitMathFlowFence() {
		if (this.data.mathFlowInside) return;
		this.buffer();
		this.data.mathFlowInside = true;
	}
	function exitMathFlow(token) {
		const data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		const node = this.stack[this.stack.length - 1];
		node.type;
		this.exit(token);
		node.value = data;
		const code = node.data.hChildren[0];
		code.type;
		code.tagName;
		code.children.push({
			type: "text",
			value: data
		});
		this.data.mathFlowInside = void 0;
	}
	function enterMathText(token) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, token);
		this.buffer();
	}
	function exitMathText(token) {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		this.exit(token);
		node.value = data;
		node.data.hChildren.push({
			type: "text",
			value: data
		});
	}
	function exitMathData(token) {
		this.config.enter.data.call(this, token);
		this.config.exit.data.call(this, token);
	}
}
function mathToMarkdown(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	inlineMath.peek = inlineMathPeek;
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: single ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: true,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math: math$1,
			inlineMath
		}
	};
	function math$1(node, _, state, info) {
		const raw = node.value || "";
		const tracker = state.createTracker(info);
		const sequence = "$".repeat(Math.max(longestStreak(raw, "$") + 1, 2));
		const exit = state.enter("mathFlow");
		let value = tracker.move(sequence);
		if (node.meta) {
			const subexit = state.enter("mathFlowMeta");
			value += tracker.move(state.safe(node.meta, {
				after: "\n",
				before: value,
				encode: ["$"],
				...tracker.current()
			}));
			subexit();
		}
		value += tracker.move("\n");
		if (raw) value += tracker.move(raw + "\n");
		value += tracker.move(sequence);
		exit();
		return value;
	}
	function inlineMath(node, _, state) {
		let value = node.value || "";
		let size = 1;
		if (!single) size++;
		while ((/* @__PURE__ */ new RegExp("(^|[^$])" + "\\$".repeat(size) + "([^$]|$)")).test(value)) size++;
		const sequence = "$".repeat(size);
		if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^\$|\$$/.test(value))) value = " " + value + " ";
		let index = -1;
		while (++index < state.unsafe.length) {
			const pattern = state.unsafe[index];
			if (!pattern.atBreak) continue;
			const expression = state.compilePattern(pattern);
			let match;
			while (match = expression.exec(value)) {
				let position = match.index;
				if (value.codePointAt(position) === 10 && value.codePointAt(position - 1) === 13) position--;
				value = value.slice(0, position) + " " + value.slice(match.index + 1);
			}
		}
		return sequence + value + sequence;
	}
	function inlineMathPeek() {
		return "$";
	}
}
const mathFlow = {
	tokenize: tokenizeMathFenced,
	concrete: true,
	name: "mathFlow"
};
var nonLazyContinuation = {
	tokenize: tokenizeNonLazyContinuation,
	partial: true
};
function tokenizeMathFenced(effects, ok$1, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	const initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let sizeOpen = 0;
	return start;
	function start(code) {
		effects.enter("mathFlow");
		effects.enter("mathFlowFence");
		effects.enter("mathFlowFenceSequence");
		return sequenceOpen(code);
	}
	function sequenceOpen(code) {
		if (code === 36) {
			effects.consume(code);
			sizeOpen++;
			return sequenceOpen;
		}
		if (sizeOpen < 2) return nok(code);
		effects.exit("mathFlowFenceSequence");
		return factorySpace(effects, metaBefore, "whitespace")(code);
	}
	function metaBefore(code) {
		if (code === null || markdownLineEnding(code)) return metaAfter(code);
		effects.enter("mathFlowFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code);
	}
	function meta(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("mathFlowFenceMeta");
			return metaAfter(code);
		}
		if (code === 36) return nok(code);
		effects.consume(code);
		return meta;
	}
	function metaAfter(code) {
		effects.exit("mathFlowFence");
		if (self.interrupt) return ok$1(code);
		return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
	}
	function beforeNonLazyContinuation(code) {
		return effects.attempt({
			tokenize: tokenizeClosingFence,
			partial: true
		}, after, contentStart)(code);
	}
	function contentStart(code) {
		return (initialSize ? factorySpace(effects, beforeContentChunk, "linePrefix", initialSize + 1) : beforeContentChunk)(code);
	}
	function beforeContentChunk(code) {
		if (code === null) return after(code);
		if (markdownLineEnding(code)) return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
		effects.enter("mathFlowValue");
		return contentChunk(code);
	}
	function contentChunk(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("mathFlowValue");
			return beforeContentChunk(code);
		}
		effects.consume(code);
		return contentChunk;
	}
	function after(code) {
		effects.exit("mathFlow");
		return ok$1(code);
	}
	function tokenizeClosingFence(effects$1, ok$2, nok$1) {
		let size = 0;
		return factorySpace(effects$1, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function beforeSequenceClose(code) {
			effects$1.enter("mathFlowFence");
			effects$1.enter("mathFlowFenceSequence");
			return sequenceClose(code);
		}
		function sequenceClose(code) {
			if (code === 36) {
				size++;
				effects$1.consume(code);
				return sequenceClose;
			}
			if (size < sizeOpen) return nok$1(code);
			effects$1.exit("mathFlowFenceSequence");
			return factorySpace(effects$1, afterSequenceClose, "whitespace")(code);
		}
		function afterSequenceClose(code) {
			if (code === null || markdownLineEnding(code)) {
				effects$1.exit("mathFlowFence");
				return ok$2(code);
			}
			return nok$1(code);
		}
	}
}
function tokenizeNonLazyContinuation(effects, ok$1, nok) {
	const self = this;
	return start;
	function start(code) {
		if (code === null) return ok$1(code);
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineStart;
	}
	function lineStart(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok$1(code);
	}
}
function mathText(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	return {
		tokenize: tokenizeMathText,
		resolve: resolveMathText,
		previous,
		name: "mathText"
	};
	function tokenizeMathText(effects, ok$1, nok) {
		let sizeOpen = 0;
		let size;
		let token;
		return start;
		function start(code) {
			effects.enter("mathText");
			effects.enter("mathTextSequence");
			return sequenceOpen(code);
		}
		function sequenceOpen(code) {
			if (code === 36) {
				effects.consume(code);
				sizeOpen++;
				return sequenceOpen;
			}
			if (sizeOpen < 2 && !single) return nok(code);
			effects.exit("mathTextSequence");
			return between(code);
		}
		function between(code) {
			if (code === null) return nok(code);
			if (code === 36) {
				token = effects.enter("mathTextSequence");
				size = 0;
				return sequenceClose(code);
			}
			if (code === 32) {
				effects.enter("space");
				effects.consume(code);
				effects.exit("space");
				return between;
			}
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return between;
			}
			effects.enter("mathTextData");
			return data(code);
		}
		function data(code) {
			if (code === null || code === 32 || code === 36 || markdownLineEnding(code)) {
				effects.exit("mathTextData");
				return between(code);
			}
			effects.consume(code);
			return data;
		}
		function sequenceClose(code) {
			if (code === 36) {
				effects.consume(code);
				size++;
				return sequenceClose;
			}
			if (size === sizeOpen) {
				effects.exit("mathTextSequence");
				effects.exit("mathText");
				return ok$1(code);
			}
			token.type = "mathTextData";
			return data(code);
		}
	}
}
function resolveMathText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	let index;
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index = headEnterIndex;
		while (++index < tailExitIndex) if (events[index][1].type === "mathTextData") {
			events[tailExitIndex][1].type = "mathTextPadding";
			events[headEnterIndex][1].type = "mathTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index = headEnterIndex - 1;
	tailExitIndex++;
	while (++index <= tailExitIndex) if (enter === void 0) {
		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
		events[enter][1].type = "mathTextData";
		if (index !== enter + 2) {
			events[enter][1].end = events[index - 1][1].end;
			events.splice(enter + 2, index - enter - 2);
			tailExitIndex -= index - enter - 2;
			index = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
function previous(code) {
	return code !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function math(options) {
	return {
		flow: { [36]: mathFlow },
		text: { [36]: mathText(options) }
	};
}
var emptyOptions = {};
function remarkMath(options) {
	const self = this;
	const settings = options || emptyOptions;
	const data = self.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(math(settings));
	fromMarkdownExtensions.push(mathFromMarkdown());
	toMarkdownExtensions.push(mathToMarkdown(settings));
}
function g(e = {}) {
	var t, r$1;
	return {
		name: "katex",
		type: "math",
		remarkPlugin: [remarkMath, { singleDollarTextMath: (t = e.singleDollarTextMath) != null ? t : false }],
		rehypePlugin: [rehypeKatex, { errorColor: (r$1 = e.errorColor) != null ? r$1 : "var(--color-muted-foreground)" }],
		getStyles() {
			return "katex/dist/katex.min.css";
		}
	};
}
g();
var m = {
	startOnLoad: false,
	theme: "default",
	securityLevel: "strict",
	fontFamily: "monospace",
	suppressErrorRendering: true
};
function o(a = {}) {
	let e = false, r$1 = {
		...m,
		...a.config
	}, t = {
		initialize(i) {
			r$1 = {
				...m,
				...a.config,
				...i
			}, mermaid_default.initialize(r$1), e = true;
		},
		async render(i, g$1) {
			return e || (mermaid_default.initialize(r$1), e = true), await mermaid_default.render(i, g$1);
		}
	};
	return {
		name: "mermaid",
		type: "diagram",
		language: "mermaid",
		getMermaid(i) {
			return i && t.initialize(i), t;
		}
	};
}
var f = o();
const defaultMarkdownPlugins = {
	code: G,
	cjk: A
};
function withMath(opts) {
	return g({ singleDollarTextMath: opts?.singleDollar ?? false });
}
function withMermaid() {
	return f;
}
function withFullMarkdown(opts) {
	return {
		...defaultMarkdownPlugins,
		math: withMath({ singleDollar: opts?.singleDollarMath ?? false }),
		mermaid: withMermaid()
	};
}
export { withFullMarkdown as n, withMath as r, defaultMarkdownPlugins as t };

var PATTERNS = {
	whitespace: /^\s+$/,
	cjk: /[\u4E00-\u9FFF\u3400-\u4DBF\u3000-\u303F\uFF00-\uFFEF\u30A0-\u30FF\u2E80-\u2EFF\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/,
	numeric: /^\d+(?:[.,]\d+)*$/,
	punctuation: /[.,!?;(){}[\]<>:/\\|@#$%^&*+=`~_-]/,
	alphanumeric: /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]+$/
};
var TOKEN_SPLIT_PATTERN = /* @__PURE__ */ new RegExp(`(\\s+|${PATTERNS.punctuation.source}+)`);
var DEFAULT_CHARS_PER_TOKEN = 6;
var SHORT_TOKEN_THRESHOLD = 3;
var DEFAULT_LANGUAGE_CONFIGS = [
	{
		pattern: /[äöüßẞ]/i,
		averageCharsPerToken: 3
	},
	{
		pattern: /[éèêëàâîïôûùüÿçœæáíóúñ]/i,
		averageCharsPerToken: 3
	},
	{
		pattern: /[ąćęłńóśźżěščřžýůúďťň]/i,
		averageCharsPerToken: 3.5
	}
];
function estimateTokenCount(text, options = {}) {
	if (!text) return 0;
	const { defaultCharsPerToken = DEFAULT_CHARS_PER_TOKEN, languageConfigs = DEFAULT_LANGUAGE_CONFIGS } = options;
	const segments = text.split(TOKEN_SPLIT_PATTERN).filter(Boolean);
	let tokenCount = 0;
	for (const segment of segments) tokenCount += estimateSegmentTokens(segment, languageConfigs, defaultCharsPerToken);
	return tokenCount;
}
function sliceByTokens(text, start = 0, end, options = {}) {
	if (!text) return "";
	const { defaultCharsPerToken = DEFAULT_CHARS_PER_TOKEN, languageConfigs = DEFAULT_LANGUAGE_CONFIGS } = options;
	let totalTokens = 0;
	if (start < 0 || end !== void 0 && end < 0) totalTokens = estimateTokenCount(text, options);
	const normalizedStart = start < 0 ? Math.max(0, totalTokens + start) : Math.max(0, start);
	const normalizedEnd = end === void 0 ? Infinity : end < 0 ? Math.max(0, totalTokens + end) : end;
	if (normalizedStart >= normalizedEnd) return "";
	const segments = text.split(TOKEN_SPLIT_PATTERN).filter(Boolean);
	const parts = [];
	let currentTokenPos = 0;
	for (const segment of segments) {
		if (currentTokenPos >= normalizedEnd) break;
		const tokenCount = estimateSegmentTokens(segment, languageConfigs, defaultCharsPerToken);
		const extracted = extractSegmentPart(segment, currentTokenPos, tokenCount, normalizedStart, normalizedEnd);
		if (extracted) parts.push(extracted);
		currentTokenPos += tokenCount;
	}
	return parts.join("");
}
function estimateSegmentTokens(segment, languageConfigs, defaultCharsPerToken) {
	if (PATTERNS.whitespace.test(segment)) return 0;
	if (PATTERNS.cjk.test(segment)) return getCharacterCount(segment);
	if (PATTERNS.numeric.test(segment)) return 1;
	if (segment.length <= SHORT_TOKEN_THRESHOLD) return 1;
	if (PATTERNS.punctuation.test(segment)) return segment.length > 1 ? Math.ceil(segment.length / 2) : 1;
	if (PATTERNS.alphanumeric.test(segment)) {
		const charsPerToken = getLanguageSpecificCharsPerToken(segment, languageConfigs) ?? defaultCharsPerToken;
		return Math.ceil(segment.length / charsPerToken);
	}
	return getCharacterCount(segment);
}
function getLanguageSpecificCharsPerToken(segment, languageConfigs) {
	for (const config of languageConfigs) if (config.pattern.test(segment)) return config.averageCharsPerToken;
}
function getCharacterCount(text) {
	return Array.from(text).length;
}
function extractSegmentPart(segment, segmentTokenStart, segmentTokenCount, targetStart, targetEnd) {
	if (segmentTokenCount === 0) return segmentTokenStart >= targetStart && segmentTokenStart < targetEnd ? segment : "";
	const segmentTokenEnd = segmentTokenStart + segmentTokenCount;
	if (segmentTokenStart >= targetEnd || segmentTokenEnd <= targetStart) return "";
	const overlapStart = Math.max(0, targetStart - segmentTokenStart);
	const overlapEnd = Math.min(segmentTokenCount, targetEnd - segmentTokenStart);
	if (overlapStart === 0 && overlapEnd === segmentTokenCount) return segment;
	const charStart = Math.floor(overlapStart / segmentTokenCount * segment.length);
	const charEnd = Math.ceil(overlapEnd / segmentTokenCount * segment.length);
	return segment.slice(charStart, charEnd);
}
export { sliceByTokens as n, estimateTokenCount as t };

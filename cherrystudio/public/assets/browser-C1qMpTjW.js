var constants_default = {
	MAX_TEXT_LENGTH: 2e3,
	MAX_MENTION_LENGTH: 2e3,
	MAX_BLOCKS: 100,
	MAX_BLOCKS_REQUEST: 999,
	MAX_CHILD_ARRAY_DEPTH: 2,
	MAX_PAYLOAD_SIZE: 45e4,
	MAX_EQUATION_LENGTH: 1e3,
	MAX_URL_LENGTH: 2e3,
	MAX_PHONE_NUMBER_LENGTH: 200,
	MAX_EMAIL_LENGTH: 200,
	MAX_MULTI_SELECT_COUNT: 100,
	MAX_RELATION_COUNT: 100,
	MAX_PEOPLE_COUNT: 100,
	IMAGE_SUPPORT: { FORMATS: [
		"bmp",
		"gif",
		"heic",
		"jpeg",
		"jpg",
		"png",
		"svg",
		"tif",
		"tiff"
	] },
	VIDEO_SUPPORT: {
		FORMATS: [
			"amv",
			"asf",
			"avi",
			"f4v",
			"flv",
			"gifv",
			"mkv",
			"mov",
			"mpg",
			"mpeg",
			"mpv",
			"mp4",
			"m4v",
			"qt",
			"wmv"
		],
		SITES: ["youtube.com"]
	},
	AUDIO_SUPPORT: { FORMATS: [
		"mp3",
		"wav",
		"ogg",
		"mid",
		"midi",
		"wma",
		"aac",
		"m4a",
		"m4b"
	] },
	DOCUMENT_SUPPORT: { FORMATS: [
		"pdf",
		"json",
		"txt"
	] }
};
function isSingleEmoji(string) {
	const trimmedString = string.trim();
	return /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(?:\p{Emoji_Modifier})?$/u.test(trimmedString);
}
function isValidURL(string) {
	validateStringLength({
		string,
		type: "url"
	});
	try {
		const url2 = new URL(string);
		return url2.protocol === "http:" || url2.protocol === "https:";
	} catch (e) {
		return false;
	}
}
function isValidUUID(string) {
	return /^[0-9a-fA-F]{8}(-?[0-9a-fA-F]{4}){3}-?[0-9a-fA-F]{12}$/.test(string);
}
function validateImageURL(url2) {
	try {
		const supportedFormats = constants_default.IMAGE_SUPPORT.FORMATS.join("|");
		return new RegExp(`\\.(${supportedFormats})$`, "i").test(url2) && isValidURL(url2);
	} catch (e) {
		return false;
	}
}
function validateVideoURL(url2) {
	try {
		const supportedFormats = constants_default.VIDEO_SUPPORT.FORMATS.join("|");
		const formatRegex = new RegExp(`\\.(${supportedFormats})$`, "i");
		const supportedSites = constants_default.VIDEO_SUPPORT.SITES.join("|");
		const siteRegex = new RegExp(`(${supportedSites})`, "i");
		return (formatRegex.test(url2) || siteRegex.test(url2)) && isValidURL(url2);
	} catch (e) {
		return false;
	}
}
function validateAudioURL(url2) {
	try {
		const supportedFormats = constants_default.AUDIO_SUPPORT.FORMATS.join("|");
		return new RegExp(`\\.(${supportedFormats})$`, "i").test(url2) && isValidURL(url2);
	} catch (e) {
		return false;
	}
}
function validatePDFURL(url2) {
	try {
		return new RegExp(`\\.pdf$`, "i").test(url2) && isValidURL(url2);
	} catch (e) {
		return false;
	}
}
function validateStringLength({ string, type, limit }) {
	if (typeof string !== "string") {
		console.warn(`Invalid input sent to validateStringLength(). Expected a string, got: ${typeof string}. String: ${string}. Type: ${type}. Limit: ${limit}.`);
		return;
	}
	let resolvedLimit = limit;
	if (typeof resolvedLimit !== "number" || resolvedLimit <= 0) switch (type) {
		case "text":
			resolvedLimit = constants_default.MAX_TEXT_LENGTH;
			break;
		case "mention":
			resolvedLimit = constants_default.MAX_MENTION_LENGTH;
			break;
		case "equation":
			resolvedLimit = constants_default.MAX_EQUATION_LENGTH;
			break;
		case "url":
			resolvedLimit = constants_default.MAX_URL_LENGTH;
			break;
		case "email":
			resolvedLimit = constants_default.MAX_EMAIL_LENGTH;
			break;
		case "phone_number":
			resolvedLimit = constants_default.MAX_PHONE_NUMBER_LENGTH;
			break;
		default: resolvedLimit = void 0;
	}
	if (typeof resolvedLimit === "number" && string.length > resolvedLimit) {
		const displayString = string.length > 500 ? string.slice(0, 500) + "...[truncated]" : string;
		console.warn(`String length is over the limit. String length: ${string.length}, Max length: ${resolvedLimit}. String: ${displayString}. Type: ${type}.`);
	}
}
function validateArrayLength({ array, type, limit }) {
	if (!Array.isArray(array)) {
		console.warn(`Invalid input sent to validateArrayLength(). Expected an array, got: ${typeof array}. Array: ${array}. Type: ${type}. Limit: ${limit}.`);
		return;
	}
	let resolvedLimit = limit;
	if (typeof resolvedLimit !== "number" || resolvedLimit <= 0) switch (type) {
		case "relation":
			resolvedLimit = constants_default.MAX_RELATION_COUNT;
			break;
		case "multi_select":
			resolvedLimit = constants_default.MAX_MULTI_SELECT_COUNT;
			break;
		case "people":
			resolvedLimit = constants_default.MAX_PEOPLE_COUNT;
			break;
		default: resolvedLimit = void 0;
	}
	if (typeof resolvedLimit === "number" && array.length > resolvedLimit) {
		const displayArray = array.length > 10 ? array.slice(0, 10) + "...[truncated]" : array;
		console.warn(`Array length is over the limit. Array length: ${array.length}, Max length: ${resolvedLimit}. Array: ${displayArray}. Type: ${type}.`);
	}
}
function enforceStringLength(string, limit) {
	if (typeof string !== "string") {
		console.error("Invalid input sent to enforceStringLength(). Expected a string, got: ", string, typeof string);
		throw new Error("Invalid input: Expected a string.");
	}
	const charLimit = constants_default.MAX_TEXT_LENGTH;
	const softLimit = limit && limit > 0 ? limit : charLimit * .8;
	if (string.length < charLimit) return [string];
	else {
		let chunks = [];
		let currentIndex = 0;
		while (currentIndex < string.length) {
			let nextCutIndex = Math.min(currentIndex + softLimit, string.length);
			let nextSpaceIndex = string.indexOf(" ", nextCutIndex);
			if (nextSpaceIndex === -1 || nextSpaceIndex - currentIndex > softLimit) nextSpaceIndex = nextCutIndex;
			while (nextSpaceIndex > 0 && string.charCodeAt(nextSpaceIndex - 1) >= 55296 && string.charCodeAt(nextSpaceIndex - 1) <= 56319) nextSpaceIndex--;
			chunks.push(string.substring(currentIndex, nextSpaceIndex));
			currentIndex = nextSpaceIndex + 1;
		}
		return chunks;
	}
}
function validateDate(dateInput) {
	let date2;
	if (dateInput === null) return null;
	if (dateInput instanceof Date) date2 = dateInput;
	else if (typeof dateInput === "string") date2 = new Date(dateInput);
	else {
		console.warn(`Invalid input: Expected a Date object or string representing a date. Returning null.`);
		return null;
	}
	if (!isNaN(date2.getTime())) {
		const isoString = date2.toISOString();
		if (typeof dateInput === "string" && !dateInput.includes(":") && !dateInput.includes("T")) return isoString.split("T")[0];
		else return isoString;
	} else {
		console.warn(`Invalid date string or Date object provided. Returning null.`);
		return null;
	}
}
function getDepth(arr, level = 0) {
	if (!Array.isArray(arr) || arr.length === 0) return level;
	let maxDepth = level;
	for (let block2 of arr) if (block2[block2.type].children) {
		const depth = getDepth(block2[block2.type].children, level + 1);
		maxDepth = Math.max(maxDepth, depth);
	}
	return maxDepth;
}
function getTotalCount(arr) {
	if (!arr || arr?.length === 0) return 0;
	return arr.reduce((acc, child) => {
		if (child[child.type].children) return acc + 1 + getTotalCount(child[child.type].children);
		return acc;
	}, 0);
}
function getLongestArray(arr, count = 0) {
	if (!Array.isArray(arr) || arr.length === 0) return count;
	let maxLength = Math.max(count, arr.length);
	for (let block2 of arr) if (block2[block2.type].children) {
		const count2 = getLongestArray(block2[block2.type].children, maxLength);
		maxLength = Math.max(count2, maxLength);
	}
	return maxLength;
}
function getPayloadSize(arr) {
	if (!arr || !Array.isArray(arr)) return 0;
	return arr.reduce((acc, block2) => {
		return acc + new TextEncoder().encode(JSON.stringify(block2)).length;
	}, 0);
}
function validateAndSplitBlock(block2, limit) {
	if (!block2 || typeof block2 !== "object") {
		console.warn(`Invalid input sent to validateAndSplitBlock(). Expected a Notion block object, got: ${typeof block2}. Block: ${block2}.`);
		return [];
	}
	if (!block2.type) {
		console.warn(`Invalid Notion block: missing 'type' property. Block: ${JSON.stringify(block2)}.`);
		return [];
	}
	const blockContent = block2[block2.type];
	if (!blockContent) return [block2];
	function processRichTextArray(richTextArray, textLimit = limit) {
		const processedRichText = [];
		for (const richTextItem of richTextArray) if (richTextItem.type === "text" && richTextItem.text && richTextItem.text.content) {
			const textChunks = enforceStringLength(richTextItem.text.content, textLimit);
			for (const chunk of textChunks) processedRichText.push({
				...richTextItem,
				text: {
					...richTextItem.text,
					content: chunk
				}
			});
		} else if (richTextItem.type === "equation" && richTextItem.equation && richTextItem.equation.expression) {
			const equationChunks = enforceStringLength(richTextItem.equation.expression, constants_default.MAX_EQUATION_LENGTH);
			for (const chunk of equationChunks) processedRichText.push({
				...richTextItem,
				equation: {
					...richTextItem.equation,
					expression: chunk
				}
			});
		} else processedRichText.push(richTextItem);
		return processedRichText;
	}
	if (blockContent.rich_text) {
		const processedRichText = processRichTextArray(blockContent.rich_text);
		if (processedRichText.length <= constants_default.MAX_BLOCKS) return [{
			...block2,
			[block2.type]: {
				...blockContent,
				rich_text: processedRichText
			}
		}];
		const splitBlocks = [];
		const chunkSize = constants_default.MAX_BLOCKS;
		for (let i = 0; i < processedRichText.length; i += chunkSize) {
			const richTextChunk = processedRichText.slice(i, i + chunkSize);
			const isFirstBlock = i === 0;
			const newBlock = {
				type: block2.type,
				[block2.type]: {
					...blockContent,
					rich_text: richTextChunk
				}
			};
			if (blockContent.color) newBlock[block2.type].color = blockContent.color;
			if (isFirstBlock && blockContent.children) newBlock[block2.type].children = blockContent.children;
			splitBlocks.push(newBlock);
		}
		console.info(`Block split into ${splitBlocks.length} blocks due to rich text array exceeding MAX_BLOCKS limit. Original rich text count: ${blockContent.rich_text.length}, Processed count: ${processedRichText.length}.`);
		return splitBlocks;
	}
	if ([
		"image",
		"video",
		"audio",
		"file",
		"pdf",
		"code"
	].includes(block2.type) && blockContent.caption) {
		const processedCaption = processRichTextArray(blockContent.caption);
		if (processedCaption.length > constants_default.MAX_BLOCKS) {
			const truncatedCaption = processedCaption.slice(0, constants_default.MAX_BLOCKS);
			let previewText = "";
			if (processedCaption[0] && processedCaption[0].type === "text" && processedCaption[0].text && processedCaption[0].text.content) previewText = processedCaption[0].text.content;
			else if (processedCaption[0] && processedCaption[0].type === "equation" && processedCaption[0].equation && processedCaption[0].equation.expression) previewText = processedCaption[0].equation.expression;
			const displayText = previewText.length > 500 ? previewText.slice(0, 500) + "...[truncated]" : previewText;
			console.warn(`Caption array exceeded MAX_BLOCKS limit (${constants_default.MAX_BLOCKS}). Truncated from ${processedCaption.length} to ${constants_default.MAX_BLOCKS} rich text objects. Block type: ${block2.type}. Preview: ${displayText}`);
			return [{
				...block2,
				[block2.type]: {
					...blockContent,
					caption: truncatedCaption
				}
			}];
		}
		return [{
			...block2,
			[block2.type]: {
				...blockContent,
				caption: processedCaption
			}
		}];
	}
	return [block2];
}
function extractNotionPageId(url2) {
	if (!url2 || typeof url2 !== "string") return null;
	const [baseUrl] = url2.split("?");
	const match = baseUrl.match(/([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})(?![a-f0-9])/i);
	if (!match) return null;
	return match[1].replace(/-/g, "");
}
var LOG_PREFIX = "buildRichTextObj";
var PREVIEW_MAX_LENGTH = 200;
var DEFAULT_OVERFLOW_STRATEGY = "split";
var DEFAULT_INVALID_URL_STRATEGY = "warn";
var DEFAULT_INVALID_MENTION_STRATEGY = "warn";
var OVERFLOW_STRATEGIES = /* @__PURE__ */ new Set([
	"split",
	"truncate",
	"throw"
]);
var INVALID_URL_STRATEGIES = /* @__PURE__ */ new Set([
	"warn",
	"strip",
	"throw"
]);
var INVALID_MENTION_STRATEGIES = /* @__PURE__ */ new Set([
	"warn",
	"strip",
	"throw"
]);
var ALLOWED_ANNOTATION_KEYS = /* @__PURE__ */ new Set([
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"code",
	"color"
]);
function buildRichTextObj(input, options = {}) {
	if (arguments.length > 1 && options && typeof options === "object" && !Array.isArray(options) && Object.keys(options).length > 0 && Object.keys(options).every((key) => ALLOWED_ANNOTATION_KEYS.has(key))) options = {
		annotations: options,
		url: arguments[2],
		type: arguments[3] || "text"
	};
	const { annotations = {}, url: url2, type = "text", overflow = DEFAULT_OVERFLOW_STRATEGY, onInvalidUrl = DEFAULT_INVALID_URL_STRATEGY, onInvalidMentionId = DEFAULT_INVALID_MENTION_STRATEGY } = options;
	const overflowStrategy = normalizeStrategy(overflow, OVERFLOW_STRATEGIES, DEFAULT_OVERFLOW_STRATEGY);
	const invalidUrlStrategy = normalizeStrategy(onInvalidUrl, INVALID_URL_STRATEGIES, DEFAULT_INVALID_URL_STRATEGY);
	const invalidMentionStrategy = normalizeStrategy(onInvalidMentionId, INVALID_MENTION_STRATEGIES, DEFAULT_INVALID_MENTION_STRATEGY);
	const sanitizedAnnotations = sanitizeAnnotations(annotations);
	let resolvedUrl = url2 ?? null;
	if (resolvedUrl) resolvedUrl = sanitizeUrl(resolvedUrl, invalidUrlStrategy, input);
	if (typeof input === "string") {
		const chunks = applyOverflowStrategy(input, {
			limit: getMaxLengthForType(type),
			strategy: overflowStrategy,
			type
		});
		switch (type) {
			case "text": return chunks.map((content) => ({
				type: "text",
				text: {
					content,
					link: resolvedUrl ? { url: resolvedUrl } : null
				},
				annotations: { ...sanitizedAnnotations },
				...resolvedUrl ? { href: resolvedUrl } : {}
			}));
			case "equation": return chunks.map((expression) => ({
				type: "equation",
				equation: { expression },
				annotations: { ...sanitizedAnnotations },
				...resolvedUrl ? { href: resolvedUrl } : {}
			}));
			default: break;
		}
	}
	if (typeof input === "object") {
		if (type === "text" || !type) return [{
			type: "text",
			text: input
		}];
		switch (type) {
			case "equation": {
				const expression = typeof input?.expression === "string" ? input.expression : null;
				if (expression) return applyOverflowStrategy(expression, {
					limit: getMaxLengthForType("equation"),
					strategy: overflowStrategy,
					type: "equation"
				}).map((segment) => ({
					type: "equation",
					equation: {
						...input,
						expression: segment
					},
					annotations: { ...annotations },
					...resolvedUrl ? { href: resolvedUrl } : {}
				}));
				return [{
					type: "equation",
					equation: { ...input },
					annotations: { ...sanitizedAnnotations },
					...resolvedUrl ? { href: resolvedUrl } : {}
				}];
			}
			case "mention": return processMentionInput(input, {
				annotations: sanitizedAnnotations,
				url: resolvedUrl,
				onInvalidMentionId: invalidMentionStrategy,
				overflow: overflowStrategy,
				onInvalidUrl: invalidUrlStrategy
			});
			default: {
				const error2 = `Unsupported rich text type: ${type}`;
				console.error(error2);
				throw new Error(error2);
			}
		}
	}
	const error = `Invalid input sent to buildRichTextObj()`;
	console.error(error);
	throw new Error(error);
}
function mentionUser(userId, options = {}) {
	return buildRichTextObj({
		type: "user",
		user: { id: userId }
	}, {
		type: "mention",
		...options
	});
}
function mentionDate(date2, options = {}) {
	const dateObj = typeof date2 === "string" ? { start: date2 } : date2;
	if (!dateObj || !dateObj.start) console.warn(`Invalid date. Date: ${date2}.`);
	if (dateObj.end && !dateObj.start) console.warn(`Invalid date. Date: ${date2}. End date provided without start date.`);
	return buildRichTextObj({
		type: "date",
		date: {
			start: validateDate(dateObj.start),
			end: dateObj.end ? validateDate(dateObj.end) : null
		}
	}, {
		type: "mention",
		...options
	});
}
function mentionDatabase(databaseId, options = {}) {
	return buildRichTextObj({
		type: "database",
		database: { id: databaseId }
	}, {
		type: "mention",
		...options
	});
}
function mentionPage(pageId2, options = {}) {
	return buildRichTextObj({
		type: "page",
		page: { id: pageId2 }
	}, {
		type: "mention",
		...options
	});
}
function enforceRichText(content) {
	if (!content) return [];
	if (Array.isArray(content)) return content.flatMap((item) => typeof item === "string" ? enforceRichText(item) : enforceRichTextObject(item));
	if (typeof content === "string") return enforceStringLength(content).flatMap((string) => {
		const isURL = isValidURL(string);
		const isBold = /^\*{2}[\s\S]*?\*{2}$/.test(string);
		const isItalic = /^[\*_]{1}[^\*_]{1}[\s\S]*?[^\*_]{1}[\*_]{1}$/.test(string);
		const isBoldItalic = /^\*{3}[\s\S]*?\*{3}$/.test(string);
		let plainString = string;
		if (isBold || isItalic || isBoldItalic) plainString = string.replace(/^(\*|_)+|(\*|_)+$/g, "");
		return buildRichTextObj(plainString, {
			annotations: {
				bold: isBold || isBoldItalic,
				italic: isItalic || isBoldItalic
			},
			url: isURL ? plainString : null
		});
	});
	if (typeof content === "number") return buildRichTextObj(content.toString());
	if (typeof content === "object") return [enforceRichTextObject(content)];
	console.warn(`Invalid input for rich text. Returning empty array.`);
	return [];
}
function enforceRichTextObject(obj) {
	if (typeof obj === "string") return buildRichTextObj(obj)[0];
	if (obj?.type === "text" && obj?.text && typeof obj.text.content === "string") {
		validateStringLength({
			string: obj.text.content,
			type: "text"
		});
		return obj;
	}
	if (obj?.type === "equation" && typeof obj?.equation?.expression === "string") {
		validateStringLength({
			string: obj.equation.expression,
			type: "equation"
		});
		return obj;
	}
	if (obj?.type === "mention" && obj?.mention && typeof obj.mention === "object") {
		validateStringLength({
			string: obj.mention.type,
			type: "mention"
		});
		return obj;
	}
	if (obj?.type === "equation" && typeof obj?.expression === "string") {
		validateStringLength({
			string: obj.expression,
			type: "equation"
		});
		return {
			type: "equation",
			equation: { expression: obj.expression },
			...obj.annotations ? { annotations: obj.annotations } : {}
		};
	}
	if ((/* @__PURE__ */ new Set([
		"database",
		"date",
		"page",
		"user"
	])).has(obj?.type)) {
		const { annotations, type, ...rest } = obj;
		return {
			type: "mention",
			mention: {
				type,
				[type]: rest
			},
			...annotations ? { annotations } : {}
		};
	}
	console.warn(`Invalid rich text object. Returning empty rich text object.`);
	return buildRichTextObj("")[0];
}
function normalizeStrategy(value, allowedStrategies, fallback) {
	if (!value || typeof value !== "string") return fallback;
	const normalized = value.toLowerCase();
	if (allowedStrategies.has(normalized)) return normalized;
	console.warn(`[${LOG_PREFIX}] Unknown strategy "${value}". Falling back to "${fallback}".`);
	return fallback;
}
function createPreview(value, maxLength = PREVIEW_MAX_LENGTH) {
	if (value === null || value === void 0) return "";
	const stringValue = typeof value === "string" ? value : String(value);
	return stringValue.length > maxLength ? `${stringValue.slice(0, maxLength)}...[truncated]` : stringValue;
}
function sanitizeAnnotations(input) {
	if (!input || typeof input !== "object") return {};
	const sanitized = {};
	for (const key of ALLOWED_ANNOTATION_KEYS) if (Object.prototype.hasOwnProperty.call(input, key)) sanitized[key] = input[key];
	return sanitized;
}
function getMaxLengthForType(type) {
	switch (type) {
		case "equation": return constants_default.MAX_EQUATION_LENGTH;
		case "mention": return constants_default.MAX_MENTION_LENGTH;
		case "text":
		default: return constants_default.MAX_TEXT_LENGTH;
	}
}
function isHighSurrogate(codePoint) {
	return codePoint >= 55296 && codePoint <= 56319;
}
function splitStringByLimit(value, limit) {
	if (!limit || limit <= 0) limit = constants_default.MAX_TEXT_LENGTH;
	const segments = [];
	let index = 0;
	while (index < value.length) {
		let end = Math.min(index + limit, value.length);
		if (end < value.length) {
			if (isHighSurrogate(value.charCodeAt(end - 1))) {
				end += 1;
				if (end > value.length) end = value.length;
			}
		}
		if (end === index) {
			end = Math.min(index + limit, value.length);
			if (end === index) end = Math.min(index + 1, value.length);
		}
		segments.push(value.slice(index, end));
		index = end;
	}
	return segments;
}
function applyOverflowStrategy(value, { limit, strategy, type }) {
	if (typeof value !== "string") return [value];
	if (value.length <= limit) return [value];
	const preview = createPreview(value);
	switch (strategy) {
		case "split": {
			const chunks = splitStringByLimit(value, limit);
			console.warn(`[${LOG_PREFIX}] Input for type "${type}" exceeded ${limit} characters. Strategy: split into ${chunks.length} chunk(s). Preview: ${preview}`);
			return chunks;
		}
		case "truncate":
			console.warn(`[${LOG_PREFIX}] Input for type "${type}" exceeded ${limit} characters. Strategy: truncate. Preview: ${preview}`);
			return [value.slice(0, limit)];
		case "throw": throw new Error(`[${LOG_PREFIX}] Input for type "${type}" exceeded maximum length (${value.length} > ${limit}). Preview: ${preview}`);
		default: {
			console.warn(`[${LOG_PREFIX}] Unknown overflow strategy "${strategy}". Falling back to split.`);
			const chunks = splitStringByLimit(value, limit);
			console.warn(`[${LOG_PREFIX}] Input for type "${type}" exceeded ${limit} characters. Strategy: split into ${chunks.length} chunk(s). Preview: ${preview}`);
			return chunks;
		}
	}
}
function sanitizeUrl(url2, strategy, contextPreview) {
	if (!url2) return null;
	validateStringLength({
		string: url2,
		type: "url"
	});
	if (isValidURL(url2)) return url2;
	const preview = createPreview(contextPreview);
	switch (strategy) {
		case "warn":
			console.warn(`[${LOG_PREFIX}] Invalid URL "${url2}". Strategy: warn. Input preview: ${preview}`);
			return url2;
		case "strip":
			console.warn(`[${LOG_PREFIX}] Invalid URL "${url2}". Strategy: strip (link removed). Input preview: ${preview}`);
			return null;
		case "throw": throw new Error(`[${LOG_PREFIX}] Invalid URL "${url2}". Strategy: throw. Input preview: ${preview}`);
		default:
			console.warn(`[${LOG_PREFIX}] Unknown invalid URL strategy "${strategy}". Defaulting to warn.`);
			console.warn(`[${LOG_PREFIX}] Invalid URL "${url2}". Strategy: warn. Input preview: ${preview}`);
			return url2;
	}
}
function extractMentionId(mention) {
	if (!mention || typeof mention !== "object") return null;
	switch (mention.type) {
		case "user": return mention.user?.id ?? null;
		case "page": return mention.page?.id ?? null;
		case "database": return mention.database?.id ?? null;
		default: return null;
	}
}
function createMentionPlainText(mention) {
	if (!mention || typeof mention !== "object") return "";
	switch (mention.type) {
		case "user": return "@User";
		case "page": return "Page";
		case "database": return "Database";
		case "date": return mention.date?.start ?? "Date";
		case "template_mention": return "Template";
		default: return "Mention";
	}
}
function processMentionInput(mention, { annotations, url: url2, onInvalidMentionId, overflow, onInvalidUrl }) {
	const sanitizedAnnotations = sanitizeAnnotations(annotations);
	if (!mention || typeof mention !== "object" || typeof mention.type !== "string") {
		console.warn(`[${LOG_PREFIX}] Invalid mention payload provided. Converting to empty text.`);
		return buildRichTextObj("", {
			annotations: sanitizedAnnotations,
			url: url2,
			overflow,
			onInvalidUrl,
			onInvalidMentionId
		});
	}
	const mentionId = extractMentionId(mention);
	if (mentionId && !isValidUUID(mentionId)) {
		const preview = createPreview(mentionId);
		switch (onInvalidMentionId) {
			case "warn":
				console.warn(`[${LOG_PREFIX}] Invalid ${mention.type} ID "${mentionId}". Strategy: warn. Preview: ${preview}`);
				break;
			case "strip":
				console.warn(`[${LOG_PREFIX}] Invalid ${mention.type} ID "${mentionId}". Strategy: strip (converted to text). Preview: ${preview}`);
				return buildRichTextObj(`Invalid ${mention.type} mention (${preview})`, {
					annotations: sanitizedAnnotations,
					...url2 ? { url: url2 } : {},
					overflow,
					onInvalidUrl,
					onInvalidMentionId
				});
			case "throw": throw new Error(`[${LOG_PREFIX}] Invalid ${mention.type} ID "${mentionId}". Strategy: throw. Preview: ${preview}`);
			default:
				console.warn(`[${LOG_PREFIX}] Unknown invalid mention strategy "${onInvalidMentionId}". Defaulting to warn.`);
				console.warn(`[${LOG_PREFIX}] Invalid ${mention.type} ID "${mentionId}". Strategy: warn. Preview: ${preview}`);
		}
	}
	const plainText = createMentionPlainText(mention);
	return [{
		type: "mention",
		mention,
		annotations: { ...sanitizedAnnotations },
		...plainText ? { plain_text: plainText } : {},
		...url2 ? { href: url2 } : {}
	}];
}
function setIcon(value) {
	if (typeof value !== "string") return {};
	const isEmoji = isSingleEmoji(value);
	const isImageURL = validateImageURL(value);
	const isUUID = isValidUUID(value);
	if (isImageURL) return createExternal(value);
	else if (isEmoji) return createEmoji(value);
	else if (isUUID) return createFile(value);
	else return;
}
function createExternal(url2) {
	return {
		type: "external",
		external: { url: url2 }
	};
}
function createEmoji(emoji) {
	return {
		type: "emoji",
		emoji
	};
}
function createFile(id) {
	return {
		type: "file_upload",
		file_upload: { id }
	};
}
var block = {
	audio: {
		supports_children: false,
		createBlock: (options) => {
			let url2, id, caption;
			if (typeof options === "string") {
				url2 = options;
				caption = [];
			} else ({url: url2, id, caption = []} = options);
			let urlOrId = url2 || id;
			const isValidAudio = validateAudioURL(urlOrId) || isValidUUID(urlOrId);
			const isFileUpload = isValidUUID(urlOrId);
			const isExternal = isValidURL(urlOrId);
			const audioType = isFileUpload ? "file_upload" : isExternal ? "external" : "file";
			if (!isValidAudio) console.warn(`${urlOrId} is not a valid audio URL or file upload ID.`);
			return isValidAudio ? {
				type: "audio",
				audio: {
					type: audioType,
					[audioType]: { [audioType === "file_upload" ? "id" : "url"]: urlOrId },
					caption: enforceRichText(caption)
				}
			} : null;
		}
	},
	bookmark: {
		supports_children: false,
		createBlock: (options) => {
			let url2, caption;
			if (typeof options === "string") {
				url2 = options;
				caption = [];
			} else ({url: url2, caption = []} = options);
			return {
				type: "bookmark",
				bookmark: {
					url: url2,
					caption: enforceRichText(caption)
				}
			};
		}
	},
	breadcrumb: {
		supports_children: false,
		createBlock: () => {
			return {
				type: "breadcrumb",
				breadcrumb: {}
			};
		}
	},
	bulleted_list_item: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				children = [];
				color = "default";
			} else ({rich_text = [], children = [], color = "default"} = options);
			return {
				type: "bulleted_list_item",
				bulleted_list_item: {
					rich_text: enforceRichText(rich_text),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	callout: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, icon2, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				icon2 = "";
				children = [];
				color = "default";
			} else ({rich_text = [], icon: icon2 = "", children = [], color = "default"} = options);
			return {
				type: "callout",
				callout: {
					rich_text: enforceRichText(rich_text),
					icon: setIcon(icon2),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	code: {
		supports_children: false,
		createBlock: (options) => {
			let rich_text, caption, language;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				caption = [];
				language = "plain text";
			} else ({rich_text = [], caption = [], language = "plain text"} = options);
			return {
				type: "code",
				code: {
					rich_text: enforceRichText(rich_text),
					caption: enforceRichText(caption),
					language
				}
			};
		}
	},
	column_list: {
		supports_children: true,
		createBlock: (options) => {
			if (typeof options === "string" || typeof options === "function") return null;
			if (!options || Array.isArray(options) && options.length === 0 || typeof options === "object" && Object.keys(options).length < 1) return {
				type: "column_list",
				column_list: {}
			};
			if (typeof options === "number") {
				let columns = [];
				for (let i = 0; i < options; i++) {
					const column2 = {
						type: "column",
						column: { children: [block.paragraph.createBlock("")] }
					};
					columns.push(column2);
				}
				return {
					type: "column_list",
					column_list: { children: columns }
				};
			}
			if (Array.isArray(options)) {
				let columns = [];
				for (let option of options) {
					if (typeof option === "object" && option.hasOwnProperty("column")) columns.push(option);
					if (Array.isArray(option)) {
						let blocks = [];
						for (let singleBlock of option) if (typeof singleBlock === "string") {
							const paragraph2 = block.paragraph.createBlock(singleBlock);
							blocks.push(paragraph2);
						} else if (typeof singleBlock === "object" && singleBlock !== null && !singleBlock.hasOwnProperty("column")) blocks.push(singleBlock);
						const column2 = {
							type: "column",
							column: { children: blocks }
						};
						columns.push(column2);
					}
					if (typeof option === "string") {
						const column2 = {
							type: "column",
							column: { children: [block.paragraph.createBlock(option)] }
						};
						columns.push(column2);
					}
					if (!Array.isArray(option) && typeof option === "object" && !option.hasOwnProperty("column")) {
						const column2 = {
							type: "column",
							column: { children: [option] }
						};
						columns.push(column2);
					}
				}
				return {
					type: "column_list",
					column_list: { children: columns }
				};
			}
		}
	},
	column: {
		supports_children: true,
		createBlock: (options) => {
			if (!options || Array.isArray(options) && options.length === 0 || typeof options === "object" && Object.keys(options).length < 1) return {
				type: "column",
				column: { children: [] }
			};
			if (typeof options === "string") return {
				type: "column",
				column: { children: [block.paragraph.createBlock(options)] }
			};
			if (Array.isArray(options)) {
				let blocks = [];
				for (let singleBlock of options) if (typeof singleBlock === "string") {
					const paragraph2 = block.paragraph.createBlock(singleBlock);
					blocks.push(paragraph2);
				} else if (typeof singleBlock === "object" && singleBlock !== null && !singleBlock.hasOwnProperty("column")) blocks.push(singleBlock);
				return {
					type: "column",
					column: { children: blocks }
				};
			}
		}
	},
	divider: {
		supports_children: false,
		createBlock: () => ({
			type: "divider",
			divider: {}
		})
	},
	embed: {
		supports_children: false,
		createBlock: (options) => {
			return {
				type: "embed",
				embed: { url: typeof options === "string" ? options : options.url }
			};
		}
	},
	file: {
		supports_children: false,
		createBlock: (options) => {
			let url2, id, name, caption;
			if (typeof options === "string") {
				url2 = options;
				name = "";
				caption = [];
			} else ({url: url2, id, name = "", caption = []} = options);
			let urlOrId = url2 || id;
			const isValid = isValidURL(urlOrId) || isValidUUID(urlOrId);
			const isFileUpload = isValidUUID(urlOrId);
			const isExternal = isValidURL(urlOrId);
			const fileType = isFileUpload ? "file_upload" : isExternal ? "external" : "file";
			if (!isValid) console.warn(`${urlOrId} is not a valid file URL or file upload ID.`);
			return isValid ? {
				type: "file",
				file: {
					type: fileType,
					[fileType]: { [fileType === "file_upload" ? "id" : "url"]: urlOrId },
					caption: enforceRichText(caption),
					name: name && name !== "" ? name : void 0
				}
			} : null;
		}
	},
	heading_1: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, color, is_toggleable, children;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				color = "default";
				is_toggleable = false;
				children = [];
			} else ({rich_text = [], color = "default", is_toggleable = false, children = []} = options);
			return {
				type: "heading_1",
				heading_1: {
					rich_text: enforceRichText(rich_text),
					color,
					is_toggleable,
					...children.length > 0 && { children }
				}
			};
		}
	},
	heading_2: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, color, is_toggleable, children;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				color = "default";
				is_toggleable = false;
				children = [];
			} else ({rich_text = [], color = "default", is_toggleable = false, children = []} = options);
			return {
				type: "heading_2",
				heading_2: {
					rich_text: enforceRichText(rich_text),
					color,
					is_toggleable,
					...children.length > 0 && { children }
				}
			};
		}
	},
	heading_3: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, color, is_toggleable, children;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				color = "default";
				is_toggleable = false;
				children = [];
			} else ({rich_text = [], color = "default", is_toggleable = false, children = []} = options);
			return {
				type: "heading_3",
				heading_3: {
					rich_text: enforceRichText(rich_text),
					color,
					is_toggleable,
					...children.length > 0 && { children }
				}
			};
		}
	},
	image: {
		supports_children: false,
		createBlock: (options) => {
			let url2, id, caption;
			if (typeof options === "string") {
				url2 = options;
				caption = [];
			} else ({url: url2, id, caption = []} = options);
			let urlOrId = url2 || id;
			const isValidImage = validateImageURL(urlOrId) || isValidUUID(urlOrId);
			const isFileUpload = isValidUUID(urlOrId);
			const isExternal = isValidURL(urlOrId);
			const imageType = isFileUpload ? "file_upload" : isExternal ? "external" : "file";
			if (!isValidImage) console.warn(`${urlOrId} is not a valid image URL or file upload ID.`);
			return isValidImage ? {
				type: "image",
				image: {
					type: imageType,
					[imageType]: { [imageType === "file_upload" ? "id" : "url"]: urlOrId },
					caption: enforceRichText(caption)
				}
			} : null;
		}
	},
	numbered_list_item: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				children = [];
				color = "default";
			} else ({rich_text = [], children = [], color = "default"} = options);
			return {
				type: "numbered_list_item",
				numbered_list_item: {
					rich_text: enforceRichText(rich_text),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	paragraph: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				children = [];
				color = "default";
			} else ({rich_text = [], children = [], color = "default"} = options);
			return {
				type: "paragraph",
				paragraph: {
					rich_text: rich_text === "" ? buildRichTextObj("") : enforceRichText(rich_text),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	pdf: {
		supports_children: false,
		createBlock: (options) => {
			let url2, id, caption;
			if (typeof options === "string") {
				url2 = options;
				caption = [];
			} else ({url: url2, id, caption = []} = options);
			let urlOrId = url2 || id;
			const isValidPDF = validatePDFURL(urlOrId) || isValidUUID(urlOrId);
			const isFileUpload = isValidUUID(urlOrId);
			const isExternal = isValidURL(urlOrId);
			const pdfType = isFileUpload ? "file_upload" : isExternal ? "external" : "file";
			if (!isValidPDF) console.warn(`${urlOrId} is not a valid PDF URL or file upload ID.`);
			return isValidPDF ? {
				type: "pdf",
				pdf: {
					type: pdfType,
					[pdfType]: { [pdfType === "file_upload" ? "id" : "url"]: urlOrId },
					caption: enforceRichText(caption)
				}
			} : null;
		}
	},
	quote: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				children = [];
				color = "default";
			} else ({rich_text = [], children = [], color = "default"} = options);
			return {
				type: "quote",
				quote: {
					rich_text: enforceRichText(rich_text),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	table: {
		supports_children: true,
		createBlock: (options) => {
			let has_column_header = false;
			let has_row_header = false;
			let rows = [];
			let table_width;
			if (options && typeof options === "object" && !Array.isArray(options)) ({has_column_header = false, has_row_header = false, rows = [], table_width} = options);
			else if (typeof options === "number") table_width = options;
			const children = rows.map((row) => Array.isArray(row) ? block.table_row.createBlock(row) : row);
			let derivedWidth;
			if (children.length > 0) {
				const firstRowBlock = children[0];
				if (firstRowBlock?.table_row?.cells) derivedWidth = firstRowBlock.table_row.cells.length;
				else if (Array.isArray(rows[0])) derivedWidth = rows[0].length;
				if (table_width !== void 0 && table_width !== derivedWidth) console.warn(`[NotionHelper] Supplied table_width (${table_width}) does not match first row width (${derivedWidth}). Using first row width.`);
			}
			return {
				type: "table",
				table: {
					table_width: derivedWidth ?? table_width ?? 0,
					has_column_header,
					has_row_header,
					children
				}
			};
		}
	},
	table_row: {
		supports_children: false,
		createBlock: (cells = []) => ({
			type: "table_row",
			table_row: { cells: cells.map((cell) => typeof cell === "string" || typeof cell === "number" ? enforceRichText(cell) : cell) }
		})
	},
	table_of_contents: {
		supports_children: false,
		createBlock: (options = "default") => {
			return {
				type: "table_of_contents",
				table_of_contents: { color: typeof options === "string" ? options : options.color || "default" }
			};
		}
	},
	to_do: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, checked, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				checked = false;
				children = [];
				color = "default";
			} else ({rich_text = [], checked = false, children = [], color = "default"} = options);
			return {
				type: "to_do",
				to_do: {
					rich_text: enforceRichText(rich_text),
					checked,
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	toggle: {
		supports_children: true,
		createBlock: (options) => {
			let rich_text, children, color;
			if (typeof options === "string" || Array.isArray(options)) {
				rich_text = options;
				children = [];
				color = "default";
			} else ({rich_text = [], children = [], color = "default"} = options);
			return {
				type: "toggle",
				toggle: {
					rich_text: enforceRichText(rich_text),
					color,
					...children.length > 0 && { children }
				}
			};
		}
	},
	video: {
		supports_children: false,
		createBlock: (options) => {
			let url2, id, caption;
			if (typeof options === "string") {
				url2 = options;
				caption = [];
			} else ({url: url2, id, caption = []} = options);
			let urlOrId = url2 || id;
			const isValidVideo = validateVideoURL(urlOrId) || isValidUUID(urlOrId);
			const isFileUpload = isValidUUID(urlOrId);
			const isExternal = isValidURL(urlOrId);
			const videoType = isFileUpload ? "file_upload" : isExternal ? "external" : "file";
			if (!isValidVideo) console.warn(`${urlOrId} is not a valid video URL or file upload ID.`);
			return isValidVideo ? {
				type: "video",
				video: {
					type: videoType,
					[videoType]: { [videoType === "file_upload" ? "id" : "url"]: urlOrId },
					caption: enforceRichText(caption)
				}
			} : null;
		}
	}
};
function audio(options) {
	return block.audio.createBlock(options);
}
function bookmark(options) {
	return block.bookmark.createBlock(options);
}
function breadcrumb() {
	return block.breadcrumb.createBlock();
}
function bulletedListItem(options) {
	return block.bulleted_list_item.createBlock(options);
}
function bullet(options) {
	return bulletedListItem(options);
}
function callout(options) {
	return block.callout.createBlock(options);
}
function code(options) {
	return block.code.createBlock(options);
}
function columnList(options) {
	return block.column_list.createBlock(options);
}
function column(options) {
	return block.column.createBlock(options);
}
function divider() {
	return block.divider.createBlock();
}
function embed(options) {
	return block.embed.createBlock(options);
}
function file(options) {
	return block.file.createBlock(options);
}
function heading1(options) {
	return block.heading_1.createBlock(options);
}
function heading2(options) {
	return block.heading_2.createBlock(options);
}
function heading3(options) {
	return block.heading_3.createBlock(options);
}
function image(options) {
	return block.image.createBlock(options);
}
function numberedListItem(options) {
	return block.numbered_list_item.createBlock(options);
}
function num(options) {
	return numberedListItem(options);
}
function paragraph(options) {
	return block.paragraph.createBlock(options);
}
function pdf(options) {
	return block.pdf.createBlock(options);
}
function quote(options) {
	return block.quote.createBlock(options);
}
function table(options) {
	return block.table.createBlock(options);
}
function tableRow(cells) {
	return block.table_row.createBlock(cells);
}
function tableOfContents(options) {
	return block.table_of_contents.createBlock(options);
}
function toDo(options) {
	return block.to_do.createBlock(options);
}
function toggle(options) {
	return block.toggle.createBlock(options);
}
function video(options) {
	return block.video.createBlock(options);
}
function makeParagraphBlocks(strings) {
	if (!Array.isArray(strings) || strings.length < 1) {
		console.error(`Invalid argument passed to makeParagraphs(). Expected a non-empty array.`);
		console.dir(strings);
		throw new Error(`Invalid argument: Expected a non-empty array.`);
	}
	return strings.filter((string) => typeof string === "string").flatMap((string) => enforceStringLength(string)).map((string) => buildRichTextObj(string)).map((richText2) => block.paragraph.createBlock({ rich_text: richText2 }));
}
var page_meta = {
	parent: {
		type: "string",
		createMeta: ({ id, type }) => {
			if (type === "database_id") console.warn("Creating a page with a parent database_id is deprecated, and will not work in databases with more than one data source. Use parentDataSource() with a data_source_id instead.");
			if (typeof type === "string") {
				const normalized = type.toLowerCase().replace(/[-_]/g, "");
				if (["page", "pageid"].includes(normalized)) type = "page_id";
				else if (["database", "databaseid"].includes(normalized)) type = "database_id";
				else if ([
					"datasource",
					"datasourceid",
					"datasource_id",
					"data_source",
					"data_sourceid",
					"data_source_id"
				].includes(normalized)) type = "data_source_id";
			}
			return {
				type,
				[type]: id
			};
		}
	},
	page: {
		type: "string",
		createMeta: (page_id) => validateValue(page_id, "UUID")
	},
	block: {
		type: "string",
		createMeta: (block_id) => validateValue(block_id, "UUID")
	},
	property: {
		type: "string",
		createMeta: (property_id) => validateValue(property_id, "string")
	},
	icon: {
		type: "string",
		createMeta: (value) => setIcon(value)
	},
	cover: {
		type: "string",
		createMeta: (value) => setIcon(value)
	},
	template: {
		type: "string",
		createMeta: (templateChoice) => {
			if (templateChoice === void 0 || templateChoice === null || typeof templateChoice !== "string" && typeof templateChoice !== "object") {
				console.warn("template() method called in builder without a valid template choice. Ignoring this method call.");
				return null;
			}
			if (typeof templateChoice === "string") if (templateChoice.toLowerCase() === "none") return null;
			else if (templateChoice.toLowerCase() === "default") return { type: "default" };
			else if (isValidUUID(templateChoice)) return {
				type: "template_id",
				template_id: templateChoice
			};
			else {
				console.warn(`Invalid template choice: ${templateChoice} \u2013\xA0returning null.`);
				return null;
			}
			else if (typeof templateChoice === "object") {
				if (!templateChoice.hasOwnProperty("type")) {
					console.warn(`Template object does not have a "type" property. Returning null.`);
					return null;
				}
				if (templateChoice.type === "template_id" && templateChoice.hasOwnProperty("template_id") && isValidUUID(templateChoice.template_id)) return templateChoice;
				else if (templateChoice.type === "default" || templateChoice.type === "none") return templateChoice;
				else {
					console.warn(`Invalid template choice: ${templateChoice} \u2013\xA0returning null.`);
					return null;
				}
			}
		}
	}
};
function parentDatabase(database_id) {
	return page_meta.parent.createMeta({
		id: database_id,
		type: "database_id"
	});
}
function parentDb(database_id) {
	return parentDatabase(database_id);
}
function parentDataSource(data_source_id) {
	return page_meta.parent.createMeta({
		id: data_source_id,
		type: "data_source_id"
	});
}
function parentDs(data_source_id) {
	return parentDataSource(data_source_id);
}
function parentPage(page_id) {
	return page_meta.parent.createMeta({
		id: page_id,
		type: "page_id"
	});
}
function pageId(page_id) {
	return page_meta.page.createMeta(page_id);
}
function blockId(block_id) {
	return page_meta.block.createMeta(block_id);
}
function propertyId(property_id) {
	return page_meta.property.createMeta(property_id);
}
function cover(url2) {
	return page_meta.cover.createMeta(url2);
}
function icon(url2) {
	return page_meta.icon.createMeta(url2);
}
var page_props = {
	title: {
		type: "string[]",
		setProp: (value) => ({ title: validateValue(value, "rich_text") })
	},
	rich_text: {
		type: "string[]",
		returns: "rich_text",
		setProp: (value) => ({ rich_text: validateValue(value, "rich_text") })
	},
	checkbox: {
		type: "boolean",
		returns: "boolean",
		setProp: (value) => ({ checkbox: validateValue(value, "boolean") })
	},
	date: {
		type: "string",
		returns: "date",
		setProp: (start, end = null) => {
			const date2 = { date: {
				start: validateValue(start, "date"),
				end: end ? validateValue(end, "date") : null
			} };
			if (!date2 || !date2.date || date2.date.start == null) return { date: null };
			return date2;
		}
	},
	email: {
		type: "string",
		returns: "email",
		setProp: (value) => ({ email: validateValue(value, "email") })
	},
	files: {
		type: "string[]",
		returns: "array",
		setProp: (files2, fileName) => {
			const processFile = (file2) => {
				if (typeof file2 === "string") {
					const isFileUpload = validateValue(file2, "UUID");
					const isExternal = validateValue(file2, "url");
					const isValidFile = isFileUpload || isExternal;
					const needsName = isExternal || isFileUpload && fileName;
					if (!isValidFile) return null;
					else return {
						...needsName && { name: fileName && fileName !== "" ? validateValue(fileName, "string") : validateValue(file2, "string") },
						[isExternal ? "external" : "file_upload"]: { [isExternal ? "url" : "id"]: file2 }
					};
				} else if (Array.isArray(file2) && file2.length === 2) {
					const [urlOrId, name] = file2;
					const isFileUpload = validateValue(urlOrId, "UUID");
					const isExternal = validateValue(urlOrId, "url");
					const isValidFile = isFileUpload || isExternal;
					const needsName = isExternal || isFileUpload && name;
					if (!isValidFile) return null;
					else return {
						...needsName && { name: validateValue(name, "string") ? validateValue(name, "string") : validateValue(urlOrId, "string") },
						[isExternal ? "external" : "file_upload"]: { [isExternal ? "url" : "id"]: urlOrId }
					};
				} else if (typeof file2 === "object") {
					if (file2.external && file2.external.url) if (!validateValue(file2.external.url, "url")) return null;
					else return {
						name: validateValue(file2.name, "string") ? validateValue(file2.name, "string") : validateValue(file2.external.url, "string"),
						external: { url: validateValue(file2.external.url, "url") }
					};
					else if (file2.file_upload && file2.file_upload.id) if (!validateValue(file2.file_upload.id, "UUID")) return null;
					else return {
						...file2.name && validateValue(file2.name, "string") !== "" && { name: validateValue(file2.name, "string") },
						file_upload: { id: file2.file_upload.id }
					};
					else if (file2.url) if (!validateValue(file2.url, "url")) return null;
					else return {
						name: validateValue(file2.name, "string") ? validateValue(file2.name, "string") : validateValue(file2.url, "string"),
						external: { url: validateValue(file2.url, "url") }
					};
					else if (file2.id) if (!validateValue(file2.id, "UUID")) return null;
					else return {
						...file2.name && validateValue(file2.name, "string") !== "" && { name: validateValue(file2.name, "string") },
						file_upload: { id: validateValue(file2.id, "UUID") }
					};
				}
				return null;
			};
			let fileObjects;
			if (typeof files2 === "string") fileObjects = [processFile(files2)];
			else if (Array.isArray(files2)) fileObjects = files2.map(processFile).filter(Boolean);
			else if (typeof files2 === "object") fileObjects = [processFile(files2)];
			else return { files: null };
			return fileObjects.length > 0 ? { files: fileObjects } : { files: null };
		}
	},
	multi_select: {
		type: "string[]",
		returns: "array",
		setProp: (values) => {
			if (typeof values === "string") {
				const validatedValue = validateValue(values, "string");
				return { multi_select: validatedValue ? [{ name: validatedValue }] : null };
			} else if (Array.isArray(values)) {
				validateArrayLength({
					array: values,
					type: "multi_select"
				});
				const validValues = values.map((value) => {
					const validatedValue = validateValue(value, "string");
					return validatedValue ? { name: validatedValue } : null;
				}).filter(Boolean);
				return { multi_select: validValues.length > 0 ? validValues : null };
			} else return { multi_select: null };
		}
	},
	number: {
		type: "number",
		returns: "number",
		setProp: (value) => ({ number: validateValue(value, "number") })
	},
	people: {
		type: "string[]",
		returns: "array",
		setProp: (values) => {
			const processUser = (value) => {
				if (typeof value === "string") {
					const person = validateValue(value, "string");
					return person ? {
						object: "user",
						id: person
					} : null;
				} else if (typeof value === "object" && value !== null) {
					if (value.id && value.id !== "") return {
						object: "user",
						id: value
					};
				}
				return null;
			};
			let people2;
			if (typeof values === "string") people2 = [processUser(values)];
			else if (Array.isArray(values)) {
				validateArrayLength({
					array: values,
					type: "people"
				});
				people2 = values.map(processUser).filter(Boolean);
			} else if (typeof values === "object" && values !== null) people2 = [processUser(values)];
			else return { people: null };
			return { people: people2.length > 0 ? people2 : null };
		}
	},
	phone_number: {
		type: "string",
		returns: "string",
		setProp: (value) => ({ phone_number: validateValue(value, "phone_number") })
	},
	relation: {
		type: "string[]",
		returns: "array",
		setProp: (values) => {
			const processRelation = (value) => {
				if (typeof value === "string") {
					const page = validateValue(value, "string");
					return page ? { id: page } : null;
				} else if (typeof value === "object") {
					if (value.id) return { id: validateValue(value.id, "string") };
				}
				return null;
			};
			let relations;
			if (typeof values === "string") relations = [processRelation(values)];
			else if (Array.isArray(values)) {
				validateArrayLength({
					array: values,
					type: "relation"
				});
				relations = values.map(processRelation).filter(Boolean);
			} else if (typeof values === "object") relations = [processRelation(values)];
			else return { relation: null };
			return { relation: relations.length > 0 ? relations : null };
		}
	},
	select: {
		type: "string",
		returns: "string",
		setProp: (value) => ({ select: { name: validateValue(value, "string") } })
	},
	status: {
		type: "string",
		returns: "string",
		setProp: (value) => ({ status: { name: validateValue(value, "string") } })
	},
	url: {
		type: "string",
		returns: "string",
		setProp: (value) => ({ url: validateValue(value, "url") })
	}
};
function title(value) {
	return page_props.title.setProp(value);
}
function richText(value) {
	return page_props.rich_text.setProp(value);
}
function checkbox(value) {
	return page_props.checkbox.setProp(value);
}
function date(start, end) {
	return page_props.date.setProp(start, end);
}
function email(value) {
	return page_props.email.setProp(value);
}
function files(files2) {
	return page_props.files.setProp(files2);
}
function multiSelect(values) {
	return page_props.multi_select.setProp(values);
}
function number(value) {
	return page_props.number.setProp(value);
}
function people(people2) {
	return page_props.people.setProp(people2);
}
function phoneNumber(value) {
	return page_props.phone_number.setProp(value);
}
function relation(values) {
	return page_props.relation.setProp(values);
}
function select(value) {
	return page_props.select.setProp(value);
}
function status(value) {
	return page_props.status.setProp(value);
}
function url(value) {
	return page_props.url.setProp(value);
}
function validateValue(value, type) {
	if (value === void 0 || value === null || !type || typeof type !== "string") {
		console.error(`Invalid value or type variable provided to validateValue(). Passed value: ${value}`);
		throw new Error(`Invalid value or type variable provided to validateValue().`);
	}
	if (type === "rich_text") return enforceRichText(value);
	if (type === "number") {
		if (typeof value === "string") {
			console.warn(`String data passed to a number property. Attempting to convert to a number. Passed value: ${value}`);
			const num2 = Number(value);
			if (!isNaN(num2)) return num2;
			else return null;
		}
		if (typeof value !== "number") {
			console.warn(`Invalid data type passed to a number property. Returning null. Passed value: ${value}`);
			return null;
		}
		return value;
	}
	if (type === "boolean") {
		if (typeof value !== "boolean") {
			console.warn(`Invalid data type passed to a boolean property. Returning null. Passed value: ${value}`);
			return null;
		}
		return value;
	}
	if (type === "date") return validateDate(value);
	if (type === "string") {
		if (typeof value !== "string") {
			console.warn(`Invalid data type passed to a string property. Returning null. Passed value: ${value}`);
			return null;
		}
		return value;
	}
	if (type === "url") {
		if (typeof value !== "string") {
			console.warn(`Invalid data type passed to a url property. Returning null. Passed value: ${value}`);
			return null;
		}
		if (isValidURL(value)) return value;
		else {
			console.warn(`Invalid URL. Returning null. Passed value: ${value}`);
			return null;
		}
	}
	if (type === "email") {
		if (typeof value !== "string") {
			console.warn(`Invalid data type passed to a email property. Returning null. Passed value: ${value}`);
			return null;
		}
		validateStringLength({
			string: value,
			type: "email"
		});
		return value;
	}
	if (type === "phone_number") {
		if (typeof value !== "string") {
			console.warn(`Invalid data type passed to a phone number property. Returning null. Passed value: ${value}`);
			return null;
		}
		validateStringLength({
			string: value,
			type: "phone_number"
		});
		return value;
	}
	if (type === "UUID") if (isValidUUID(value)) return value;
	else {
		console.warn(`Invalid UUID. Returning null. Passed value: ${value}`);
		return null;
	}
	console.warn(`Type specified to validateValue is not a valid type. Returning the input...`);
	return value;
}
function quickPages({ parent, parent_type, pages, schema, childrenFn }) {
	let pageArray;
	if (Array.isArray(pages)) pageArray = pages;
	else pageArray[pages];
	return pages.map((page) => {
		const iconSchema = Object.fromEntries(Object.entries(schema).filter(([propName, propDef]) => propDef[1] === "icon"));
		const coverSchema = Object.fromEntries(Object.entries(schema).filter(([propName, propDef]) => propDef[1] === "cover"));
		let icon2;
		if (Object.entries(iconSchema).length === 1) {
			let entry = page[Object.keys(iconSchema)[0]];
			if (entry && typeof entry === "string" && entry !== "") icon2 = entry;
		} else if (page.icon && typeof page.icon === "string" && page.icon !== "") icon2 = page.icon;
		let cover2;
		if (Object.entries(coverSchema).length === 1) {
			let entry = page[Object.keys(coverSchema)[0]];
			if (entry && typeof entry === "string" && entry !== "") cover2 = entry;
		} else if (page.cover && typeof page.cover === "string" && page.cover !== "") cover2 = page.cover;
		const finalPage = {
			parent: page_meta.parent.createMeta({
				id: parent,
				type: parent_type
			}),
			...icon2 && { icon: page_meta.icon.createMeta(icon2) },
			...cover2 && { cover: page_meta.cover.createMeta(cover2) }
		};
		const validatedSchema = Object.fromEntries(Object.entries(schema).filter(([propName, propDef]) => Object.keys(page_props).includes(propDef[1])));
		finalPage.properties = Object.entries(page).filter(([key]) => key in validatedSchema).reduce((acc, [key, val]) => {
			const [propName, propType] = validatedSchema[key];
			let value;
			if (["title", "rich_text"].includes(propType) && typeof val === "string") value = buildRichTextObj(val);
			else value = val;
			const propResult = page_props[propType].setProp(value);
			if (propResult[Object.keys(propResult)[0]] !== null) acc[propName] = propResult;
			return acc;
		}, {});
		let pageChildren;
		const childrenSchema = Object.fromEntries(Object.entries(schema).filter(([propName, propDef]) => propDef[1] === "children"));
		let childrenProp;
		if (Object.entries(childrenSchema).length === 1) childrenProp = page[Object.keys(childrenSchema)[0]];
		else if (page.children) childrenProp = page.children;
		if (childrenProp) {
			if (typeof childrenProp === "string" && childrenProp.trim()) pageChildren = [childrenProp];
			else if (Array.isArray(childrenProp) && childrenProp.length > 0) pageChildren = childrenProp;
			else {
				console.warn(`Invalid page children data type submitted for the page object below. Children data will be omitted.`);
				console.dir(page);
				pageChildren = [];
			}
			console.log(typeof childrenFn);
			if (typeof childrenFn === "function") finalPage.children = childrenFn(pageChildren);
			else if (typeof pageChildren[0] === "string") finalPage.children = makeParagraphBlocks(pageChildren);
		}
		return finalPage;
	});
}
function createNotionBuilder({ strict = false, limitNesting = true, limitChildren = true, allowBlankParagraphs = false, handleTemplatePageChildren = false } = {}) {
	let data, currentBlockStack, nestingLevel, hasPageParent, parentIsDataSource, hasPageId, hasBlockId, hasProperty, hasBlock, nullParent;
	function resetBuilder() {
		data = {
			properties: {},
			children: []
		};
		currentBlockStack = [{
			block: data,
			children: data.children
		}];
		nestingLevel = 0;
		hasPageParent = false;
		parentIsDataSource = false;
		hasProperty = false;
		hasBlock = false;
		nullParent = false;
	}
	function validateTables(blocks) {
		const errors = [];
		function checkBlock(block2) {
			if (!block2 || typeof block2 !== "object") return;
			if (block2.type === "table") {
				if ((block2.table?.children || []).length === 0) errors.push("Table block found without any children. Tables must have at least one table_row child.");
			}
			if (block2.children && Array.isArray(block2.children)) block2.children.forEach(checkBlock);
			if (block2.table?.children) block2.table.children.forEach(checkBlock);
			if (block2.column_list?.children) block2.column_list.children.forEach(checkBlock);
			if (block2.column?.children) block2.column.children.forEach(checkBlock);
			if (block2.toggle?.children) block2.toggle.children.forEach(checkBlock);
			if (block2.callout?.children) block2.callout.children.forEach(checkBlock);
			if (block2.quote?.children) block2.quote.children.forEach(checkBlock);
			if (block2.bulleted_list_item?.children) block2.bulleted_list_item.children.forEach(checkBlock);
			if (block2.numbered_list_item?.children) block2.numbered_list_item.children.forEach(checkBlock);
			if (block2.to_do?.children) block2.to_do.children.forEach(checkBlock);
		}
		if (Array.isArray(blocks)) blocks.forEach(checkBlock);
		else if (blocks && typeof blocks === "object") checkBlock(blocks);
		return errors;
	}
	function chunkBlocks(blocks, chunkSize = constants_default.MAX_BLOCKS) {
		const chunkedBlocks = [];
		for (let i = 0; i < blocks.length; i += chunkSize) chunkedBlocks.push(blocks.slice(i, i + chunkSize));
		return chunkedBlocks;
	}
	function removeNullProps(propertyObj) {
		for (let key in propertyObj) if (typeof propertyObj[key] === "object" && propertyObj[key] !== null) {
			const subKeys = Object.keys(propertyObj[key]);
			if (subKeys.length === 1 && propertyObj[key][subKeys[0]] === null) delete propertyObj[key];
		}
	}
	resetBuilder();
	return {
		parentDatabase(database_id) {
			data.parent = page_meta.parent.createMeta({
				id: database_id,
				type: "database_id"
			});
			hasPageParent = true;
			parentIsDataSource = true;
			return this;
		},
		parentDb(database_id) {
			return this.parentDatabase(database_id);
		},
		parentDataSource(data_source_id) {
			data.parent = page_meta.parent.createMeta({
				id: data_source_id,
				type: "data_source_id"
			});
			hasPageParent = true;
			parentIsDataSource = true;
			return this;
		},
		parentDs(data_source_id) {
			return this.parentDataSource(data_source_id);
		},
		parentPage(page_id) {
			data.parent = page_meta.parent.createMeta({
				id: page_id,
				type: "page_id"
			});
			hasPageParent = true;
			return this;
		},
		pageId(page_id) {
			data.page_id = page_meta.page.createMeta(page_id);
			hasPageId = true;
			return this;
		},
		propertyId(property_id) {
			data.property_id = page_meta.property.createMeta(property_id);
			return this;
		},
		blockId(block_id) {
			data.block_id = page_meta.block.createMeta(block_id);
			hasBlockId = true;
			return this;
		},
		cover(url2) {
			if (url2 === void 0 || url2 === null || url2 === "") return this;
			data.cover = page_meta.cover.createMeta(url2);
			return this;
		},
		icon(url2) {
			if (url2 === void 0 || url2 === null || url2 === "") return this;
			data.icon = page_meta.icon.createMeta(url2);
			return this;
		},
		template(templateChoice) {
			if (templateChoice === void 0 || templateChoice === null || typeof templateChoice !== "string" && typeof templateChoice !== "object") {
				console.warn("template() method called in builder without a valid template choice. Ignoring this method call.");
				return this;
			}
			data.template = page_meta.template.createMeta(templateChoice);
			return this;
		},
		property(name, type, value) {
			if (!page_props[type]) {
				const error = `Invalid property type: ${type}`;
				console.error(error);
				throw new Error(error);
			}
			if (name === void 0 || name === null || type === void 0 || type === null || value === void 0 || value === null) if (strict === true) {
				const error = `Null or invalid property name, type, or value provided.

Name: ${name}
Type: ${type}
Value: ${value}

Strict mode is enabled, so cannot construct property object. Disable strict mode in createNotionBuilder() to simply ignore this property method call.`;
				console.error(error);
				throw new Error(error);
			} else {
				console.warn(`Null or invalid property name, type, or value provided.

Name: ${name}
Type: ${type}
Value: ${value}

This method call will be ignored. You can instead cause createNotionBuilder() to throw an error in instance like these by calling createNotionBuilder(strict = true)`);
				return this;
			}
			data.properties[name] = page_props[type].setProp(value);
			hasProperty = true;
			return this;
		},
		title(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "title", value);
		},
		richText(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "rich_text", value);
		},
		checkbox(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "checkbox", value);
		},
		date(name, start, end = null) {
			if (start === void 0 || start === null) return this;
			else {
				data.properties[name] = page_props.date.setProp(start, end);
				hasProperty = true;
				return this;
			}
		},
		email(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "email", value);
		},
		files(name, files2) {
			if (files2 === void 0 || files2 === null) return this;
			else return this.property(name, "files", files2);
		},
		multiSelect(name, values) {
			if (values === void 0 || values === null) return this;
			else return this.property(name, "multi_select", values);
		},
		number(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "number", value);
		},
		people(name, people2) {
			if (people2 === void 0 || people2 === null) return this;
			else return this.property(name, "people", people2);
		},
		phoneNumber(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "phone_number", value);
		},
		relation(name, pages) {
			if (pages === void 0 || pages === null) return this;
			else return this.property(name, "relation", pages);
		},
		select(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "select", value);
		},
		status(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "status", value);
		},
		url(name, value) {
			if (value === void 0 || value === null) return this;
			else return this.property(name, "url", value);
		},
		startParent(blockType, options = {}) {
			if (blockType === void 0 || blockType === null || (options === void 0 || options === null || Object.keys(options).length < 1) && ![
				"breadcrumb",
				"column_list",
				"column",
				"divider",
				"table"
			].includes(blockType)) if (strict === true) {
				const error = `Null/undefined block type, or null/undefined options provided to startParent():

Block type: ${blockType}
Options: ${options}

Strict mode is enabled, so this method is throwing an error. You can call createNotionBuilder() without the strict argument if you'd just like this method call to be ignored instead.`;
				console.error(error);
				throw new Error(error);
			} else {
				const warning = `Null/undefined block type, or null/undefined options provided to startParent():

Block type: ${blockType}
Options: ${options}

Strict mode is disabled, so this method call will simply be ignored. Calling endparent() may result in an error, though the library will try to prevent this.`;
				console.warn(warning);
				nullParent = true;
				return this;
			}
			if (limitNesting === true && nestingLevel > 2) {
				const error = `Nesting level exceeded. Requests can only have 2 levels of nested child blocks.`;
				console.error(error);
				throw new Error(error);
			}
			if (!block[blockType].supports_children) {
				const error = `startParent() called with type ${blockType}, which does not support child blocks.`;
				console.error(error);
				throw new Error(error);
			}
			const newBlock = block[blockType].createBlock(options);
			if (!newBlock[blockType].hasOwnProperty("children")) newBlock[blockType].children = [];
			if (newBlock[blockType].hasOwnProperty("is_toggleable") && newBlock[blockType].is_toggleable === false) newBlock[blockType].is_toggleable = true;
			currentBlockStack[currentBlockStack.length - 1].children.push(newBlock);
			currentBlockStack.push({
				block: newBlock,
				children: newBlock[blockType].children
			});
			nestingLevel++;
			hasBlock = true;
			return this;
		},
		endParent() {
			if (nullParent == true) {
				nullParent = false;
				return this;
			}
			if (currentBlockStack.length > 1) {
				currentBlockStack.pop();
				nestingLevel--;
			}
			return this;
		},
		addBlock(blockType, options = {}) {
			const optionlessBlockTypes = [
				"breadcrumb",
				"column_list",
				"column",
				"divider",
				"table",
				"table_of_contents"
			];
			if (typeof options === "number") options = String(options);
			if (blockType === void 0 || blockType === null || (options === void 0 || options === null || Object.keys(options).length < 1) && !optionlessBlockTypes.includes(blockType)) if (strict === true) {
				const error = `Null/undefined block type, or null/undefined options provided to addBlock():

Block type: ${blockType}
Options: ${options}

Strict mode is enabled, so this method is throwing an error. You can call createNotionBuilder() without the strict argument if you'd just like this method call to be ignored instead.`;
				console.error(error);
				throw new Error(error);
			} else {
				const warning = `Null/undefined block type, or null/undefined options provided to addBlock():

Block type: ${blockType}
Options: ${options}

Strict mode is disabled, so this method call will simply be ignored.`;
				console.warn(warning);
				nullParent = true;
				return this;
			}
			const newBlock = block[blockType].createBlock(options);
			if (blockType === "table_row" && currentBlockStack.length > 0) {
				const parentBlock = currentBlockStack[currentBlockStack.length - 1].block;
				if (parentBlock?.type === "table") {
					const rowCells = newBlock?.table_row?.cells;
					const rowWidth = rowCells && Array.isArray(rowCells) ? rowCells.length : 0;
					const currentTableWidth = parentBlock?.table?.table_width ?? 0;
					if ((parentBlock?.table?.children?.length ?? 0) === 0) {
						if (currentTableWidth === 0) parentBlock.table.table_width = rowWidth;
						else if (rowWidth > currentTableWidth) {
							console.warn(`[NotionBuilder] First table row has ${rowWidth} columns, but table_width was set to ${currentTableWidth}. Updating table_width to ${rowWidth}.`);
							parentBlock.table.table_width = rowWidth;
						}
					}
				}
			}
			currentBlockStack[currentBlockStack.length - 1].children.push(newBlock);
			hasBlock = true;
			return this;
		},
		addExistingBlock(existingBlock, limit) {
			if (!existingBlock || typeof existingBlock !== "object" || !existingBlock.type) if (strict === true) {
				const error = `Invalid block provided to addExistingBlock():

Block: ${JSON.stringify(existingBlock)}

Strict mode is enabled, so this method is throwing an error.`;
				console.error(error);
				throw new Error(error);
			} else {
				const warning = `Invalid block provided to addExistingBlock():

Block: ${JSON.stringify(existingBlock)}

Strict mode is disabled, so this method call will simply be ignored.`;
				console.warn(warning);
				nullParent = true;
				return this;
			}
			const validatedBlocks = validateAndSplitBlock(existingBlock, limit);
			for (const validatedBlock of validatedBlocks) currentBlockStack[currentBlockStack.length - 1].children.push(validatedBlock);
			hasBlock = true;
			return this;
		},
		blank() {
			const newBlock = block.paragraph.createBlock("");
			currentBlockStack[currentBlockStack.length - 1].children.push(newBlock);
			hasBlock = true;
			return this;
		},
		paragraph(options) {
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) {
				enforceStringLength(options).filter(Boolean).forEach((string) => this.addBlock("paragraph", string));
				return this;
			} else if ((typeof options === "string" && options === "" || !options) && allowBlankParagraphs === true) return this.blank();
			else return this.addBlock("paragraph", options);
		},
		heading1(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("heading_1", value);
		},
		heading2(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("heading_2", value);
		},
		heading3(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("heading_3", value);
		},
		bulletedListItem(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("bulleted_list_item", value);
		},
		bullet(options) {
			return this.bulletedListItem(options);
		},
		numberedListItem(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("numbered_list_item", value);
		},
		num(options) {
			return this.numberedListItem(options);
		},
		toDo(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("to_do", value);
		},
		toggle(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("toggle", value);
		},
		code(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("code", value);
		},
		quote(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("quote", value);
		},
		callout(options) {
			let value;
			if (typeof options === "string" && options.length > constants_default.MAX_TEXT_LENGTH) value = enforceStringLength(options).filter(Boolean);
			else value = options;
			return this.addBlock("callout", value);
		},
		divider() {
			return this.addBlock("divider", {});
		},
		image(options) {
			return this.addBlock("image", options);
		},
		video(options) {
			return this.addBlock("video", options);
		},
		audio(options) {
			return this.addBlock("audio", options);
		},
		file(options) {
			return this.addBlock("file", options);
		},
		pdf(options) {
			return this.addBlock("pdf", options);
		},
		bookmark(options) {
			return this.addBlock("bookmark", options);
		},
		embed(options) {
			return this.addBlock("embed", options);
		},
		tableOfContents(options) {
			return this.addBlock("table_of_contents", options);
		},
		table(options) {
			return this.startParent("table", options);
		},
		tableRow(options) {
			return this.addBlock("table_row", options);
		},
		endTable() {
			return this.endParent();
		},
		breadcrumb() {
			return this.addBlock("breadcrumb");
		},
		columnList(options) {
			return this.startParent("column_list", options);
		},
		endColumnList() {
			return this.endParent();
		},
		column(options) {
			return this.startParent("column", options);
		},
		endColumn() {
			return this.endParent();
		},
		loop(blockTypeOrCallback, arr) {
			if (arr === void 0 || arr === null || arr.length < 1) return this;
			if (typeof blockTypeOrCallback === "function") arr.forEach((element, index) => {
				blockTypeOrCallback(this, element, index);
			});
			else arr.forEach((element) => {
				this.addBlock(blockTypeOrCallback, element);
			});
			return this;
		},
		build() {
			let result = {
				content: null,
				additionalBlocks: []
			};
			if (hasProperty) removeNullProps(data.properties);
			if (handleTemplatePageChildren && data.template && data.template.type && data.template.type !== "none") {
				if (data.children && data.children.length > 0) {
					result.additionalBlocks = chunkBlocks(data.children);
					delete data.children;
				}
			}
			if (hasPageParent) {
				if (!parentIsDataSource) {
					if (data.properties) {
						for (const key in data.properties) if (data.properties[key] && typeof data.properties[key] === "object" && "title" in data.properties[key] && key !== "title") {
							console.warn(`[NotionBuilder] Non-standard title property "${key}" found (expected "title" due to page having a parent type of Page rather than Data Source). Automatically renaming property "${key}" to "title".`);
							data.properties["title"] = data.properties[key];
							delete data.properties[key];
							break;
						}
					}
				}
				if (limitChildren === true && data.children.length > constants_default.MAX_BLOCKS) {
					const chunkedBlocks = chunkBlocks(data.children);
					data.children = chunkedBlocks[0];
					result.additionalBlocks = chunkedBlocks.slice(1);
				}
				const { parent, ...rest } = data;
				result.content = parent ? {
					parent,
					...rest
				} : data;
			} else if (hasPageId) {
				if (limitChildren === true && data.children.length > constants_default.MAX_BLOCKS) {
					const chunkedBlocks = chunkBlocks(data.children);
					data.children = chunkedBlocks[0];
					result.additionalBlocks = chunkedBlocks.slice(1);
				}
				const { page_id, ...rest } = data;
				result.content = page_id ? {
					page_id,
					...rest
				} : data;
			} else if (hasBlockId) {
				if (limitChildren === true && data.children.length > constants_default.MAX_BLOCKS) {
					const chunkedBlocks = chunkBlocks(data.children);
					data.children = chunkedBlocks[0];
					result.additionalBlocks = chunkedBlocks.slice(1);
				}
				const { block_id, ...rest } = data;
				result.content = block_id ? {
					block_id,
					...rest
				} : data;
			} else if (hasProperty && !hasBlock) result.content = data.properties;
			else if (hasBlock && !hasProperty) if (limitChildren === true && data.children.length > constants_default.MAX_BLOCKS) {
				const chunkedBlocks = chunkBlocks(data.children);
				result.content = chunkedBlocks[0];
				result.additionalBlocks = chunkedBlocks.slice(1);
			} else result.content = data.children;
			else if (!hasPageParent && hasProperty && hasBlock) {
				console.warn(`Properties and blocks were added, so a full page object will be returned. However, it has no parent page or database specified.`);
				if (limitChildren === true && data.children.length > constants_default.MAX_BLOCKS) {
					const chunkedBlocks = chunkBlocks(data.children);
					data.children = chunkedBlocks[0];
					result.additionalBlocks = chunkedBlocks.slice(1);
				}
				result.content = data;
			} else if (!hasPageParent && !hasProperty && !hasBlock) {
				const error = `No data was added to the builder.`;
				console.error(error);
				throw new Error(error);
			}
			if (hasBlock) {
				const blocksToValidate = [];
				if (result.content) {
					if (Array.isArray(result.content)) blocksToValidate.push(...result.content);
					else if (result.content.children && Array.isArray(result.content.children)) blocksToValidate.push(...result.content.children);
				}
				if (result.additionalBlocks && Array.isArray(result.additionalBlocks)) result.additionalBlocks.forEach((chunk) => {
					if (Array.isArray(chunk)) blocksToValidate.push(...chunk);
				});
				const tableErrors = validateTables(blocksToValidate);
				if (tableErrors.length > 0) {
					const error = `[NotionBuilder] ${tableErrors.join(" ")}`;
					console.error(error);
					throw new Error(error);
				}
			}
			resetBuilder();
			return result;
		},
		createPage(creationCallback, appendCallback) {},
		reset() {
			resetBuilder();
			return this;
		}
	};
}
function createNotion(options) {
	console.warn("createNotion() is deprecated. Please use createNotionBuilder() instead.");
	return createNotionBuilder(options);
}
var request = {
	pages: { create: async ({ data, client, apiCall, getPage = (response) => response, getResults = (response) => response.results, templateWaitMs = 3e3, onTemplatePageCreated, skipAutoAppendOnTemplate = false, debug = false }) => {
		if (!data.parent) {
			const error = `No parent page or database provided. Page cannot be created.`;
			console.error(error);
			throw new Error(error);
		}
		const isUsingTemplate = data.template && data.template.type && data.template.type !== "none";
		let pageChildren = [];
		if (data.children) {
			pageChildren = [...data.children];
			data.children = [];
			if (isUsingTemplate) delete data.children;
			else {
				const hasNestedChildren = (block2) => {
					if (!block2[block2.type]?.children?.length) return false;
					return block2[block2.type].children.some((child) => child[child.type]?.children?.length > 0);
				};
				const countBlocksIncludingChildren = (block2) => {
					let count = 1;
					if (block2[block2.type]?.children?.length) count += block2[block2.type].children.length;
					return count;
				};
				const hasExcessiveChildrenArray = (block2) => {
					if (!block2[block2.type]?.children?.length) return false;
					return block2[block2.type].children.length > constants_default.MAX_BLOCKS;
				};
				const baseDataSize = new TextEncoder().encode(JSON.stringify(data)).length;
				const MAX_PAYLOAD_SIZE = constants_default.MAX_PAYLOAD_SIZE;
				let currentPayloadSize = baseDataSize;
				let totalBlockCount = 0;
				let i = 0;
				for (; i < pageChildren.length; i++) {
					const block2 = pageChildren[i];
					const blockSize = new TextEncoder().encode(JSON.stringify(block2)).length;
					const wouldExceedPayload = currentPayloadSize + blockSize > MAX_PAYLOAD_SIZE;
					const wouldExceedBlockLimit = data.children.length >= constants_default.MAX_BLOCKS;
					const wouldExceedTotalBlocks = totalBlockCount + countBlocksIncludingChildren(block2) > constants_default.MAX_BLOCKS_REQUEST;
					const blockHasNestedChildren = hasNestedChildren(block2);
					const blockHasExcessiveChildren = hasExcessiveChildrenArray(block2);
					if (wouldExceedPayload || wouldExceedBlockLimit || wouldExceedTotalBlocks || blockHasNestedChildren || blockHasExcessiveChildren) break;
					data.children.push(block2);
					currentPayloadSize += blockSize;
					totalBlockCount += countBlocksIncludingChildren(block2);
				}
				pageChildren = pageChildren.slice(i);
			}
		}
		let callingFunction;
		if (client && typeof client.pages.create === "function") callingFunction = async (data2) => {
			try {
				return await client.pages.create(data2);
			} catch (error) {
				console.error(`Error encountered when calling Notion API to create page: ${error}`);
				throw error;
			}
		};
		else if (typeof apiCall === "function") callingFunction = async (data2) => {
			try {
				try {
					return await apiCall({
						type: "create_page",
						data: data2
					});
				} catch (error) {
					return await apiCall(data2);
				}
			} catch (error) {
				console.error(`Error encountered when calling Notion API to create page: ${error}`);
				throw error;
			}
		};
		try {
			if (debug) console.log("\n[DEBUG] Creating page with data:", JSON.stringify(data, null, 2).substring(0, 500) + "...");
			const response = await callingFunction(data);
			if (debug) console.log("[DEBUG] Page created successfully:", response?.id || "No ID in response");
			let createdPage;
			if (response) createdPage = getPage(response);
			if (createdPage && isUsingTemplate) {
				if (typeof onTemplatePageCreated === "function") await onTemplatePageCreated({
					page: createdPage,
					template: data.template,
					fallbackWaitMs: templateWaitMs
				});
				else if (templateWaitMs > 0) await new Promise((resolve) => setTimeout(resolve, templateWaitMs));
				if (skipAutoAppendOnTemplate && pageChildren && pageChildren.length > 0) return {
					apiResponse: response,
					pendingChildren: pageChildren,
					pageId: createdPage.id
				};
			}
			if (createdPage && pageChildren && pageChildren.length > 0) try {
				if (debug) console.log(`[DEBUG] Appending ${pageChildren.length} blocks to page ${createdPage.id}`);
				const appendedBlocks = await request.blocks.children.append({
					block_id: createdPage.id,
					children: pageChildren,
					client,
					apiCall,
					getResults,
					debug
				});
				if (debug) console.log(`[DEBUG] Block append completed. API calls made: ${appendedBlocks?.apiCallCount || 0}`);
				return {
					apiResponse: response,
					appendedBlocks
				};
			} catch (error) {
				console.error(`Encountered error when trying to append children blocks to page ${createdPage.id}: ${error}`);
				throw error;
			}
			return { apiResponse: response };
		} catch (error) {
			console.error(`Encountered error when trying to create page: ${error}`);
			throw error;
		}
	} },
	blocks: { children: { append: (() => {
		let apiCallCount = 0;
		const specialTypes = ["column_list"];
		function createSlices(arr) {
			const MAX_PAYLOAD_SIZE = constants_default.MAX_PAYLOAD_SIZE;
			let chunks = [];
			let tempArr = [];
			let count = 0;
			let currentPayloadSize = 0;
			for (let block2 of arr) {
				const blockPayload = JSON.stringify(block2);
				const blockSize = new TextEncoder().encode(blockPayload).length;
				if (blockSize > MAX_PAYLOAD_SIZE) {
					if (tempArr.length > 0) {
						chunks.push(tempArr);
						tempArr = [];
						count = 0;
						currentPayloadSize = 0;
					}
					chunks.push([block2]);
					continue;
				}
				const wouldExceedPayload = currentPayloadSize + blockSize > MAX_PAYLOAD_SIZE;
				const wouldExceedCount = count > 99;
				const hasTypeMismatch = tempArr.length > 0 && block2 && (specialTypes.includes(block2.type) && !specialTypes.includes(tempArr[0].type) || !specialTypes.includes(block2.type) && specialTypes.includes(tempArr[0].type));
				if (wouldExceedPayload || wouldExceedCount || hasTypeMismatch) {
					chunks.push(tempArr);
					tempArr = [];
					tempArr.push(block2);
					count = 1;
					currentPayloadSize = blockSize;
				} else {
					tempArr.push(block2);
					count++;
					currentPayloadSize += blockSize;
				}
			}
			if (tempArr.length > 0) chunks.push(tempArr);
			return chunks;
		}
		async function appendInternal({ block_id, children, after = null, client, apiCall, getResults = (response) => response.results, debug = false }) {
			if (!children || children.length < 1) {
				console.warn(`No children provided to append function.`);
				return null;
			}
			let allResponses = [];
			try {
				if (debug) console.log(`
[DEBUG] appendInternal called with ${children.length} children for block ${block_id}`);
				const chunks = createSlices(children);
				if (debug) console.log(`[DEBUG] Created ${chunks.length} chunks from ${children.length} children`);
				let currentAfter = after;
				const shouldChainChunks = after !== null && after !== void 0;
				for (let chunk of chunks) {
					const chunkChildren = [];
					const blockLimit = constants_default.MAX_BLOCKS_REQUEST;
					const blocksInChunk = getTotalCount(chunk);
					const maxChildArrayLimit = constants_default.MAX_BLOCKS;
					const maxChildArrayLength = getLongestArray(chunk);
					const maxDepthLimit = constants_default.MAX_CHILD_ARRAY_DEPTH;
					const maxDepth = getDepth(chunk);
					if (debug) console.log(`[DEBUG] Processing chunk with ${chunk.length} blocks (depth: ${maxDepth}, child array length: ${maxChildArrayLength})`);
					if (!specialTypes.includes(chunk[0].type) && (blocksInChunk > blockLimit || maxDepth > maxDepthLimit || maxChildArrayLength > maxChildArrayLimit)) {
						let blocksUsed = chunk.length;
						for (let block2 of chunk) {
							const type = block2.type;
							if (block2[type] && block2[type].children && block2[type].children.length > 0) {
								const blockMaxDepth = getDepth(block2[type].children, 1);
								const blockMaxChildArrayLength = getLongestArray(block2[type].children);
								const blockTotalChildBlockCount = getTotalCount(block2[type].children);
								getPayloadSize(block2[type].children);
								if (blockMaxDepth <= maxDepthLimit && blockMaxChildArrayLength <= maxChildArrayLimit && blocksUsed + blockTotalChildBlockCount < blockLimit - 100) {
									blocksUsed += blockTotalChildBlockCount;
									chunkChildren.push([]);
								} else {
									const childrenArray = block2[type].children;
									if (type === "table") {
										const firstRowsCount = Math.max(1, Math.min(blockLimit - 100 - blocksUsed, block2[type].children.length, maxChildArrayLimit));
										blocksUsed += firstRowsCount;
										const firstRows = childrenArray.slice(0, firstRowsCount);
										const remainingRows = childrenArray.slice(firstRowsCount);
										chunkChildren.push(remainingRows);
										block2[type].children = [];
										block2[type].children.push(...firstRows);
									} else {
										chunkChildren.push(childrenArray);
										block2[type].children = [];
									}
								}
							} else chunkChildren.push([]);
						}
					} else chunkChildren.push(...chunk.map(() => []));
					let callingFunction;
					if (client && typeof client.blocks.children.append === "function") callingFunction = async function(block_id2, children2, after2) {
						apiCallCount++;
						try {
							return await client.blocks.children.append({
								block_id: block_id2,
								children: children2,
								...after2 && after2 !== null && { after: after2 }
							});
						} catch (error) {
							console.error(`Error encountered when calling Notion API to append block: ${error}`);
							throw error;
						}
					};
					else if (typeof apiCall === "function") callingFunction = async function(block_id2, children2, after2) {
						apiCallCount++;
						try {
							try {
								return await apiCall({
									type: "append_blocks",
									data: {
										block_id: block_id2,
										children: children2,
										after: after2
									}
								});
							} catch (error) {
								return await apiCall(block_id2, children2, after2);
							}
						} catch (error) {
							console.error(`Error encountered when calling Notion API to append block: ${error}`);
							throw error;
						}
					};
					else {
						const error = `No Notion SDK client object or custom API call function provided to append function.`;
						console.error(error);
						throw new Error(error);
					}
					if (debug) {
						console.log(`[DEBUG] Making API call to append ${chunk.length} blocks to block ${block_id}`);
						console.log(`[DEBUG] Chunk payload size: ${JSON.stringify(chunk).length} bytes`);
					}
					const response = await callingFunction(block_id, chunk, currentAfter);
					if (debug) console.log(`[DEBUG] API call successful`);
					if (response) {
						allResponses.push(response);
						const results = getResults(response);
						if (shouldChainChunks && results && results.length > 0) currentAfter = results[results.length - 1].id;
						for (let [index, block2] of chunk.entries()) if (chunkChildren[index].length > 0) {
							if (results[index] && block2.type === results[index].type) {
								const nestedResponses = await appendInternal({
									block_id: results[index].id,
									children: chunkChildren[index],
									client,
									apiCall,
									getResults,
									debug
								});
								if (nestedResponses) allResponses = allResponses.concat(nestedResponses);
							}
						}
					} else console.warn(`Failed to append chunk to block ${block_id}`);
				}
				return allResponses;
			} catch (error) {
				console.error(`Error occurred in appendInternal: ${error}`);
				throw error;
			}
		}
		const append = async (options) => {
			apiCallCount = 0;
			try {
				return {
					apiResponses: await appendInternal(options),
					apiCallCount
				};
			} catch (error) {
				console.error(`Encountered error while appending block children: ${error}`);
				return {
					apiResponses: null,
					apiCallCount,
					error: error.message
				};
			}
		};
		append.resetApiCallCount = () => {
			apiCallCount = 0;
		};
		return append;
	})() } }
};
function createPage(options) {
	return request.pages.create(options);
}
function appendBlocks(options) {
	return request.blocks.children.append(options);
}
var index_default = {
	buildRichTextObj,
	mentionUser,
	mentionDate,
	mentionDatabase,
	mentionPage,
	makeParagraphBlocks,
	block,
	request,
	setIcon,
	createPage,
	appendBlocks,
	page_meta,
	page_props,
	quickPages,
	createNotionBuilder,
	createNotion,
	parentDatabase,
	parentDb,
	parentDataSource,
	parentDs,
	parentPage,
	pageId,
	blockId,
	propertyId,
	cover,
	icon,
	title,
	richText,
	checkbox,
	date,
	email,
	files,
	multiSelect,
	number,
	people,
	phoneNumber,
	relation,
	select,
	status,
	url,
	audio,
	bookmark,
	breadcrumb,
	bulletedListItem,
	bullet,
	callout,
	code,
	divider,
	embed,
	file,
	heading1,
	heading2,
	heading3,
	image,
	numberedListItem,
	num,
	paragraph,
	pdf,
	quote,
	table,
	tableRow,
	tableOfContents,
	toDo,
	toggle,
	video,
	getDepth,
	getLongestArray,
	getTotalCount,
	getPayloadSize,
	validateAndSplitBlock,
	extractNotionPageId,
	isValidUUID
};
export { appendBlocks, audio, block, blockId, bookmark, breadcrumb, buildRichTextObj, bullet, bulletedListItem, callout, checkbox, code, column, columnList, cover, createNotion, createNotionBuilder, createPage, date, index_default as default, divider, email, embed, extractNotionPageId, file, files, getDepth, getLongestArray, getPayloadSize, getTotalCount, heading1, heading2, heading3, icon, image, isValidUUID, makeParagraphBlocks, mentionDatabase, mentionDate, mentionPage, mentionUser, multiSelect, num, number, numberedListItem, pageId, page_meta, page_props, paragraph, parentDataSource, parentDatabase, parentDb, parentDs, parentPage, pdf, people, phoneNumber, propertyId, quickPages, quote, relation, request, richText, select, setIcon, status, table, tableOfContents, tableRow, title, toDo, toggle, url, validateAndSplitBlock, video };

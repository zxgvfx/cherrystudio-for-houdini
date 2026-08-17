const getDefaultGroupName = (id, provider) => {
	const str = id.toLowerCase();
	let firstDelimiters = [
		"/",
		" ",
		":"
	];
	let secondDelimiters = ["-", "_"];
	if (provider && [
		"aihubmix",
		"silicon",
		"ocoolai",
		"o3",
		"dmxapi"
	].includes(provider.toLowerCase())) {
		firstDelimiters = [
			"/",
			" ",
			"-",
			"_",
			":"
		];
		secondDelimiters = [];
	}
	for (const delimiter of firstDelimiters) if (str.includes(delimiter)) return str.split(delimiter)[0];
	for (const delimiter of secondDelimiters) if (str.includes(delimiter)) {
		const parts = str.split(delimiter);
		return parts.length > 1 ? parts[0] + "-" + parts[1] : parts[0];
	}
	return str;
};
const getBaseModelName = (id, delimiter = "/") => {
	const parts = id.split(delimiter);
	return parts[parts.length - 1];
};
const getLowerBaseModelName = (id, delimiter = "/") => {
	let baseModelName = getBaseModelName(id.toLowerCase().startsWith("accounts/fireworks/models/") ? id.replace(/(\d)p(?=\d)/g, "$1.") : id, delimiter).toLowerCase();
	if (baseModelName.endsWith(":free")) baseModelName = baseModelName.replace(":free", "");
	if (baseModelName.endsWith("(free)")) baseModelName = baseModelName.replace("(free)", "");
	if (baseModelName.endsWith(":cloud")) baseModelName = baseModelName.replace(":cloud", "");
	return baseModelName;
};
var EMOJI_PART_PATTERN = String.raw`(?:\p{Emoji}\uFE0F|\p{Emoji_Presentation})(?:\p{Emoji_Modifier})?`;
var KEYCAP_EMOJI_PATTERN = String.raw`(?:[0-9#*]\uFE0F?\u20E3)`;
var REGIONAL_FLAG_EMOJI_PATTERN = String.raw`(?:\p{Regional_Indicator}{2})`;
var EMOJI_SEQUENCE_PATTERN = String.raw`(?:${EMOJI_PART_PATTERN}(?:\u200D${EMOJI_PART_PATTERN})*)`;
var EMOJI_CLUSTER_PATTERN = String.raw`(?:${KEYCAP_EMOJI_PATTERN}|${REGIONAL_FLAG_EMOJI_PATTERN}|${EMOJI_SEQUENCE_PATTERN})`;
var EMOJI_REGEX = new RegExp(`^(?:${EMOJI_CLUSTER_PATTERN})+$`, "u");
var EMOJI_LEADING_REGEX = new RegExp(`^(?:${EMOJI_CLUSTER_PATTERN})+`, "u");
var FIRST_LETTER_OR_EMOJI_REGEX = new RegExp(`${EMOJI_CLUSTER_PATTERN}|\\p{L}\\p{M}*`, "u");
function firstLetter(str) {
	const match = str?.match(FIRST_LETTER_OR_EMOJI_REGEX);
	return match ? match[0] : "";
}
function removeLeadingEmoji(str) {
	return str.replace(EMOJI_LEADING_REGEX, "").trim();
}
function getLeadingEmoji(str) {
	const match = str.match(EMOJI_LEADING_REGEX);
	return match ? match[0] : "";
}
function isEmoji(str) {
	if (str.startsWith("data:")) return false;
	if (str.startsWith("http")) return false;
	return EMOJI_REGEX.test(str);
}
function removeSpecialCharactersForTopicName(str) {
	return str.replace(/["'\r\n]+/g, " ").trim();
}
function getFirstCharacter(str) {
	for (const char of str) return char;
	return "";
}
export { getLowerBaseModelName as a, removeSpecialCharactersForTopicName as c, getLeadingEmoji as i, getDefaultGroupName as n, isEmoji as o, getFirstCharacter as r, removeLeadingEmoji as s, firstLetter as t };

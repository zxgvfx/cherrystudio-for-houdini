import { o as languageNativeNameMap } from "./resolver-Bn-i1elC.js";
const appLanguageOptions = [
	{
		value: "zh-CN",
		flag: "🇨🇳"
	},
	{
		value: "zh-TW",
		flag: "🇭🇰"
	},
	{
		value: "en-US",
		flag: "🇺🇸"
	},
	{
		value: "de-DE",
		flag: "🇩🇪"
	},
	{
		value: "ja-JP",
		flag: "🇯🇵"
	},
	{
		value: "ru-RU",
		flag: "🇷🇺"
	},
	{
		value: "el-GR",
		flag: "🇬🇷"
	},
	{
		value: "es-ES",
		flag: "🇪🇸"
	},
	{
		value: "fr-FR",
		flag: "🇫🇷"
	},
	{
		value: "pt-PT",
		flag: "🇵🇹"
	},
	{
		value: "ro-RO",
		flag: "🇷🇴"
	},
	{
		value: "vi-VN",
		flag: "🇻🇳"
	}
].map(({ value, flag }) => ({
	value,
	flag,
	label: languageNativeNameMap[value]
}));
function isAppLanguage(value) {
	return appLanguageOptions.some((option) => option.value === value);
}
export { isAppLanguage as n, appLanguageOptions as t };

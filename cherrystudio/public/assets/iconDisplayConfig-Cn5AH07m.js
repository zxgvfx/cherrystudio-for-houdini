const miniAppContainedIcon = {
	scale: 5 / 7,
	borderRadius: 10
};
var providerListContainedIcon = {
	scale: 5 / 7,
	borderRadius: 5
};
var defaultIcon = { scale: 1.2 };
var ICON_DISPLAY_CONFIG = {
	"mini-app": {
		abacus: miniAppContainedIcon,
		zeroone: miniAppContainedIcon,
		minimax: miniAppContainedIcon,
		groq: miniAppContainedIcon,
		anthropic: miniAppContainedIcon,
		claude: miniAppContainedIcon,
		felo: miniAppContainedIcon,
		mintop3: miniAppContainedIcon,
		"3mintop": miniAppContainedIcon,
		coze: miniAppContainedIcon,
		ling: miniAppContainedIcon
	},
	"provider-list": {
		cherryin: providerListContainedIcon,
		aihubmix: providerListContainedIcon,
		lmstudio: providerListContainedIcon,
		anthropic: providerListContainedIcon,
		yi: providerListContainedIcon,
		groq: providerListContainedIcon,
		"aws-bedrock": providerListContainedIcon
	}
};
function getIconDisplayConfig(context, iconId) {
	if (!iconId) return void 0;
	return ICON_DISPLAY_CONFIG[context][iconId.toLowerCase()] ?? defaultIcon;
}
export { miniAppContainedIcon as n, getIconDisplayConfig as t };

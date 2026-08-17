import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
import { C as HappyhorseLight, D as FishaudioDark, E as FishaudioLight, G as AceDark, H as Ai21Light, L as BilibiliindexLight, O as EssentialaiLight, R as BilibiliindexDark, U as Ai21Dark, W as AceLight, _ as LongcatDark, d as OpenaiDark, g as LongcatLight, n as YiDark, p as NanobananaLight, t as YiLight, u as OpenaiLight } from "./icons-models-DRQrweKe.js";
import { d as SunoDark, o as TrinityLight, on as GlmLight, s as TrinityDark, sn as GlmDark, t as ZaiDark, u as SunoLight } from "./icons-models-BsyM7B-T.js";
import { _ as AwsDark, c as MimoLight, f as IdeogramLight, g as AwsLight, l as MimoDark, n as XiaomimimoDark, o as MoonshotLight, p as IdeogramDark, s as MoonshotDark, t as XiaomimimoLight } from "./icons-models-UpouSgg-.js";
import { n as GptRealtimeLight, r as Gpt4oMiniTtsLight, t as NousresearchLight } from "./icons-models-obrhKIof.js";
import { r as GptOss120bLight, s as Gpt51ChatLatestLight } from "./icons-models-DyCEYFa6.js";
import { n as DolphinDark } from "./icons-models-5ThNuqsR.js";
import { t as DolphinLight } from "./icons-models-C3lX2CaV.js";
import { a as Gpt51CodexMiniLight, i as Gpt52ChatLatestLight } from "./icons-models-DvZd0yVq.js";
import { i as Gpt51CodexMaxLight, t as GptRealtime15Light } from "./icons-models-kV1nZqwP.js";
import { a as Gpt45PreviewLight, n as GptRealtimeMiniLight, t as NousresearchDark } from "./icons-models-DMuBAPnt.js";
import { i as Gpt4TurboPreviewLight, t as GptAudioMiniLight } from "./icons-models-DuZrj5EY.js";
import { t as Gpt5ChatLatestLight } from "./icons-models-CA9_e7qz.js";
import { n as Gpt4oMiniRealtimePreviewLight, r as Gpt4oAudioPreviewLight, t as Gpt4oSearchPreviewLight } from "./icons-models-CxjX38xD.js";
import { i as Gpt4oMiniAudioPreviewLight, n as Gpt4oMiniTranscribeLight, r as Gpt4oMiniSearchPreviewLight, t as Gpt4oTranscribeLight } from "./icons-models-5Z5oIFTj.js";
import { i as Gpt4oRealtimePreviewLight, r as Gpt4oTranscribeDiarizeLight } from "./icons-models-M7BrFdXE.js";
import { i as GptImage15Light, t as GptRealtime21Light } from "./icons-models-B54FkkWj.js";
import { n as GptRealtime21MiniLight, r as GptImage1MiniLight, t as GptRealtimeTranslateLight } from "./icons-models-B4S6KC_s.js";
import { a as Gpt53ChatLatestLight } from "./icons-models-Drv2tiAB.js";
import { n as GptRealtime2Light, t as GptRealtimeWhisperLight } from "./icons-models-C3RPIpI3.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function AceAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Ace = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AceDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const AceIcon = /* @__PURE__ */ Object.assign(Ace, {
	Avatar: AceAvatar,
	colorPrimary: "#000000"
});
var Ai2Light = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.ai2-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.ai2-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#F0529C",
		d: "M10.3967 10.2432H7.19866V7.2H9.77192C10.1154 7.2 10.396 6.91865 10.396 6.57567V4H13.4386V7.2C13.4387 7.59973 13.3601 7.99555 13.2072 8.36486C13.0543 8.73417 12.8302 9.06972 12.5476 9.35233C12.2651 9.63495 11.9296 9.8591 11.5604 10.012C11.1912 10.1648 10.7955 10.2434 10.396 10.2432H10.3967ZM7.19866 10.5561H4V13.5993H6.5746C6.91743 13.5993 7.19866 13.8807 7.19866 14.2237V16.7993H10.2406V13.5993C10.2407 13.1997 10.1621 12.8039 10.0093 12.4346C9.85642 12.0654 9.63235 11.7298 9.34986 11.4472C9.06737 11.1646 8.73199 10.9405 8.36288 10.7876C7.99377 10.6346 7.59816 10.556 7.19866 10.5561ZM17.4254 10.3987C17.2601 10.3981 17.1016 10.3322 16.9847 10.2152C16.8678 10.0982 16.8019 9.93975 16.8013 9.77434V7.2H13.7594V10.3987C13.7592 10.7984 13.8377 11.1942 13.9905 11.5636C14.1434 11.9329 14.3674 12.2685 14.6499 12.5512C14.9324 12.8339 15.2678 13.0581 15.637 13.211C16.0061 13.364 16.4018 13.4427 16.8013 13.4426H20V10.4H17.4254V10.3987ZM10.5533 16.8V20H13.596V17.4243C13.596 17.0807 13.8772 16.8 14.22 16.8H16.7946V13.7547H13.5953C13.1957 13.7546 12.8 13.8332 12.4307 13.9861C12.0615 14.139 11.726 14.3632 11.4434 14.6459C11.1609 14.9286 10.9368 15.2642 10.7839 15.6336C10.6311 16.003 10.5525 16.3989 10.5527 16.7987L10.5533 16.8Z"
	})
});
function Ai21Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Ai21 = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const Ai21Icon = /* @__PURE__ */ Object.assign(Ai21, {
	Avatar: Ai21Avatar,
	colorPrimary: "#000000"
});
var AnthropicDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.anthropic-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.anthropic-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M13.218 6H15.62L20 17H17.598L13.218 6ZM8.37933 6H10.8907L15.2707 17H12.8213L11.926 14.6899H7.34467L6.44867 16.9993H4L8.38 6.00134L8.37933 6ZM11.134 12.6474L9.63533 8.78137L8.13667 12.6481H11.1333L11.134 12.6474Z",
		clipRule: "evenodd"
	})
});
var AnthropicLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.anthropic-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.anthropic-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M13.218 6H15.62L20 17H17.598L13.218 6ZM8.37933 6H10.8907L15.2707 17H12.8213L11.926 14.6899H7.34467L6.44867 16.9993H4L8.38 6.00134L8.37933 6ZM11.134 12.6474L9.63533 8.78137L8.13667 12.6481H11.1333L11.134 12.6474Z",
		clipRule: "evenodd"
	})
});
function AnthropicAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Anthropic = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnthropicDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const AnthropicIcon = /* @__PURE__ */ Object.assign(Anthropic, {
	Avatar: AnthropicAvatar,
	colorPrimary: "#000000"
});
var ArceeLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.arcee-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.arcee-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#008C8C",
		d: "M12.9365 6.62387L5.85737 19H4L12.0095 5L12.9365 6.62387ZM15.336 10.8294L8.85037 19H6.78842L14.4724 9.31757L15.336 10.8287V10.8294ZM20 19H13.486L19.1614 17.5305L20 19ZM17.6909 14.9543L12.3956 18.9986H9.72673L16.8814 13.5354L17.6909 14.9543Z"
	})
});
var AssemblyaiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.assemblyai-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.assemblyai-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#2545D3",
		d: "M11.0633 5C10.567 4.99993 10.0822 5.14978 9.67254 5.42994C9.26284 5.71009 8.94733 6.10746 8.76734 6.57L4 18.84H7.62133L11.374 9.18267H11.3753C11.4229 9.06405 11.5049 8.96239 11.6108 8.89079C11.7167 8.81918 11.8415 8.78092 11.9693 8.78092C12.0971 8.78092 12.222 8.81918 12.3279 8.89079C12.4338 8.96239 12.5158 9.06405 12.5633 9.18267H13.0633V7.22333H12.1347L12.9987 5H11.0633Z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#566DE8",
		d: "M8.76733 6.57C8.93979 6.127 9.23675 5.74336 9.62239 5.46537C10.008 5.18738 10.4659 5.02691 10.9407 5.00333L10.9393 5H12.9367C13.9527 5 14.8653 5.624 15.2327 6.57L20 18.84H16.3167L11.6933 6.942C11.5596 6.64641 11.3433 6.39572 11.0706 6.22002C10.7978 6.04432 10.4802 5.95108 10.1557 5.95151C9.83126 5.95193 9.51384 6.04599 9.24154 6.2224C8.96925 6.39881 8.75366 6.65007 8.62067 6.946L8.76733 6.57Z"
	})]
});
function AwsAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Aws = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const AwsIcon = /* @__PURE__ */ Object.assign(Aws, {
	Avatar: AwsAvatar,
	colorPrimary: "#000000"
});
var AyaLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.aya-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.aya-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#416FDC",
		d: "M16.803 4.0877C16.76 4.01703 16.6606 3.97437 16.5746 4.01703L14.9697 4.90568C14.1599 5.35767 13.6482 5.83699 13.3353 6.75364C13.1971 7.16286 13.1459 7.59613 13.1851 8.02599C13.2243 8.45586 13.3529 8.87297 13.5629 9.25091C13.6052 9.32158 13.7053 9.36424 13.7899 9.32158L15.3961 8.43293C16.206 7.98094 16.7177 7.50162 17.0299 6.58497C17.1684 6.1757 17.2197 5.74234 17.1806 5.31235C17.1415 4.88236 17.0129 4.46511 16.803 4.08703V4.0877ZM5.29332 7.61428C5.23706 7.61547 5.18344 7.63819 5.14365 7.67769C5.10387 7.71719 5.08098 7.77043 5.07978 7.82628C5.07978 8.96892 5.5767 9.99823 6.359 10.7035C7.26823 11.5222 8.12037 11.7335 9.2861 11.7335H11.588C11.7015 11.7335 11.8009 11.6349 11.8009 11.5222C11.8009 10.3796 11.304 9.34891 10.5223 8.64426C9.61246 7.82628 8.76031 7.61362 7.59458 7.61362H5.29399L5.29332 7.61428ZM19.9993 11.0282C19.998 10.9726 19.9751 10.9196 19.9355 10.8803C19.8958 10.8409 19.8425 10.8182 19.7865 10.8169V10.8302H17.4563C16.2765 10.8302 15.4102 11.0569 14.4863 11.8749C13.6905 12.5655 13.1795 13.6235 13.1795 14.7808C13.1795 14.8935 13.2789 14.9921 13.3924 14.9921H15.7225C16.9023 14.9921 17.7686 14.7661 18.6926 13.9481C19.1044 13.5795 19.4336 13.1291 19.6588 12.6261C19.8841 12.1231 19.9996 11.5787 19.9993 11.0282ZM4 14.5268C4 14.3715 4.12759 14.2301 4.29815 14.2301H7.52407C9.15785 14.2301 10.3511 14.5408 11.6303 15.6834C12.7249 16.6567 13.4065 18.11 13.4206 19.7033C13.4206 19.8587 13.293 20 13.1224 20H9.89718C8.26273 20 7.06946 19.704 5.79024 18.5614C4.69568 17.5734 4.0141 16.1201 4 14.5268Z"
	})
});
var BaaiDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.baai-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.baai-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M4 7.12L9.74 4L12.1287 5.336L14.1953 4.17933L20 7.42667V13.2273L17.612 14.5633V16.876L12.0253 20L6.37067 16.9867V14.422L4 13.2667V7.12ZM4.856 8.10133V10.0573L10.1467 12.7893L10.1253 13.7353L4.856 11.0153V12.7873L11.5513 16.3227V11.8467L4.856 8.10133ZM12.0167 11.1227L18.544 7.56933L16.7907 6.58933L11.8587 9.34733L11.0247 8.85667L15.9353 6.11L14.1953 5.13667L7.658 8.69667L12.0167 11.1233V11.1227ZM6.8 8.21867L11.2727 5.81467L9.74 4.95733L5.264 7.364L6.8 8.21867ZM14.16 17.848L12.4147 18.8247V11.96L16.756 9.532V16.3973L15.016 17.3707V11.8767L14.1607 12.3313V17.8493L14.16 17.848ZM7.22667 14.9013L11.5513 17.28V18.7667L7.22667 16.5087V14.902V14.9013ZM19.144 12.748V8.19467L17.612 9.05333V13.606L19.144 12.7487V12.748Z",
		clipRule: "evenodd"
	})
});
var BaaiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.baai-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.baai-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M4 7.12L9.74 4L12.1287 5.336L14.1953 4.17933L20 7.42667V13.2273L17.612 14.5633V16.876L12.0253 20L6.37067 16.9867V14.422L4 13.2667V7.12ZM4.856 8.10133V10.0573L10.1467 12.7893L10.1253 13.7353L4.856 11.0153V12.7873L11.5513 16.3227V11.8467L4.856 8.10133ZM12.0167 11.1227L18.544 7.56933L16.7907 6.58933L11.8587 9.34733L11.0247 8.85667L15.9353 6.11L14.1953 5.13667L7.658 8.69667L12.0167 11.1233V11.1227ZM6.8 8.21867L11.2727 5.81467L9.74 4.95733L5.264 7.364L6.8 8.21867ZM14.16 17.848L12.4147 18.8247V11.96L16.756 9.532V16.3973L15.016 17.3707V11.8767L14.1607 12.3313V17.8493L14.16 17.848ZM7.22667 14.9013L11.5513 17.28V18.7667L7.22667 16.5087V14.902V14.9013ZM19.144 12.748V8.19467L17.612 9.05333V13.606L19.144 12.7487V12.748Z",
		clipRule: "evenodd"
	})
});
function BaaiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Baai = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaaiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const BaaiIcon = /* @__PURE__ */ Object.assign(Baai, {
	Avatar: BaaiAvatar,
	colorPrimary: "#000000"
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var BaichuanLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.baichuan-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.baichuan-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: `url(#${iconId}-baichuanlight__a)`,
			d: "M9.33309 4H7.00582L5.55127 7.24975V15.85L4 19H7.78182L9.25673 15.85L9.33309 4ZM14.6669 4H10.8851V19H14.6669V4ZM16.2182 8.29975H20V19H16.2182V8.29975ZM20 4H16.2182V7.09975H20V4Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: `${iconId}-baichuanlight__a`,
			x1: 6.842,
			x2: 19.148,
			y1: 5.302,
			y2: 18.493,
			gradientUnits: "userSpaceOnUse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#FEC13E" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: 1,
				stopColor: "#FF6933"
			})]
		}) })]
	});
};
var BaiducloudLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.baiducloud-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.baiducloud-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#5BCA87",
			d: "M18.5566 7.74L15.9013 9.28C15.8103 9.33197 15.7074 9.35931 15.6026 9.35931C15.4978 9.35931 15.3949 9.33197 15.3039 9.28L12.3733 7.58933C12.2822 7.53724 12.1792 7.50983 12.0743 7.50983C11.9694 7.50983 11.8663 7.53724 11.7753 7.58933L8.85062 9.28C8.75966 9.33197 8.65671 9.35931 8.55195 9.35931C8.44719 9.35931 8.34424 9.33197 8.25329 9.28L5.59729 7.74467L12.0813 4L18.5566 7.74Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EC5D3E",
			d: "M16.5073 10.3113C16.418 10.3639 16.3441 10.439 16.2929 10.5291C16.2417 10.6191 16.2149 10.721 16.2153 10.8246V14.206C16.2148 14.31 16.1872 14.412 16.1351 14.502C16.0831 14.5921 16.0085 14.667 15.9186 14.7193L12.9666 16.3926C12.8755 16.4447 12.8 16.5202 12.7479 16.6113C12.6957 16.7024 12.6688 16.8057 12.67 16.9106V19.982L15.6226 18.2913L19.1626 16.26V8.7713L16.5073 10.3113Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#2464F5",
			d: "M11.4 16.6273C11.3531 16.5332 11.2831 16.4525 11.1967 16.3927L8.24399 14.7153C8.15676 14.6619 8.0846 14.587 8.03433 14.4979C7.98405 14.4088 7.95732 14.3083 7.95666 14.206V10.8207C7.95459 10.7176 7.92572 10.6169 7.87288 10.5284C7.82004 10.4399 7.74506 10.3667 7.65533 10.316L7.35466 10.1427L5 8.772V16.26L8.54066 18.2913L11.4973 20V16.928C11.4928 16.821 11.4592 16.7166 11.4 16.6273Z"
		})
	]
});
function BilibiliindexAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Bilibiliindex = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliindexDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const BilibiliindexIcon = /* @__PURE__ */ Object.assign(Bilibiliindex, {
	Avatar: BilibiliindexAvatar,
	colorPrimary: "#000000"
});
var BytedanceLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.bytedance-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.bytedance-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#00C8D2",
			d: "M14.1411 16.336L12.9018 16.0123V10.0981L14.2283 9.76214C14.9556 9.57742 15.5665 9.42687 15.5956 9.43269C15.6189 9.43269 15.6363 11.0581 15.6363 13.0487V16.6654L15.5083 16.6596C15.4327 16.6596 14.816 16.5098 14.1411 16.336Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#3C8CFF",
			d: "M8.36365 14.8486C8.36365 12.8588 8.3811 11.2268 8.41019 11.2268C8.43347 11.221 9.04438 11.3723 9.77747 11.557L11.0982 11.8923L11.0866 14.8377L11.0691 17.7825L9.88219 18.0894C9.23056 18.2566 8.61965 18.413 8.53237 18.4305L8.36365 18.4712V14.8486Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#78E6DC",
			d: "M17.2654 11.8923C17.2654 5.32507 17.2713 4.97234 17.3702 5.00143C17.4225 5.01889 17.9404 5.15198 18.5164 5.2967C19.0924 5.44725 19.6625 5.59125 19.7847 5.62034L20 5.67852L19.9884 11.904L19.9709 18.1352L18.7898 18.4363C18.144 18.6036 17.5331 18.7542 17.44 18.7782L17.2654 18.8182V11.8923Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#325AB4",
			d: "M4 11.9156C4 8.5134 4.01745 5.73013 4.04655 5.73013C4.06982 5.73013 4.68073 5.88068 5.408 6.06031L6.73455 6.39559V11.9098C6.73455 14.9352 6.72291 17.4181 6.71127 17.4181C6.69382 17.4181 6.07709 17.5745 5.344 17.7599L4 18.1003V11.9156Z"
		})
	]
});
var DalleLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.dalle-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.dalle-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FFFF67",
			d: "M4 10H7.2V13.3333H4V10Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#43FFFF",
			d: "M7.20001 10H10.4V13.3333H7.20001V10Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#51DA4B",
			d: "M10.4 10H13.6V13.3333H10.4V10Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FF6E3D",
			d: "M13.6 10H16.8V13.3333H13.6V10Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#3C46FF",
			d: "M16.8 10H20V13.3333H16.8V10Z"
		})
	]
});
var DbrxLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.dbrx-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.dbrx-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#EE3D2C",
		d: "M18.1961 10.596L11.5075 14.326L4.34432 10.3407L4 10.5247V13.418L11.5068 17.5887L18.1961 13.8727V15.404L11.5075 19.1347L4.34432 15.1487L4 15.3333V15.83L11.5068 20L19 15.83V12.9367L18.6557 12.752L11.5075 16.7233L4.80386 13.0073V11.4753L11.5075 15.1913L19 11.0213V8.17L18.627 7.95733L11.5075 11.9147L5.14818 8.39733L11.5075 4.86533L16.7323 7.77333L17.1911 7.518V7.16333L11.5075 4L4 8.17V8.624L11.5068 12.794L18.1961 9.064V10.596Z"
	})
});
var DeepmindLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.deepmind-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.deepmind-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#4285F4",
		fillRule: "evenodd",
		d: "M7.992 6.08133C7.39211 6.66806 6.92935 7.38015 6.63684 8.16663C6.34433 8.95311 6.2293 9.79453 6.3 10.6307C6.53267 13.5693 9.304 15.9607 11.8173 15.9607C14.1553 15.9607 15.0707 13.92 14.8447 12.534C14.7612 12.0249 14.5425 11.5476 14.2113 11.152C14.6327 11.3787 15.0407 11.6693 15.4173 12.0187C16.4307 12.962 17.044 14.1713 17.142 15.4187C17.36 18.1753 15.32 21 11.9087 21C10.7787 21 9.58867 20.712 8.58867 20.238C5.87733 18.958 4 16.198 4 13.0013C4 10.0473 5.60333 7.46667 7.992 6.08133ZM12.0907 5C13.2213 5 14.4113 5.288 15.4107 5.762C18.124 7.042 20 9.802 20 12.9987C20 15.9527 18.3967 18.534 16.008 19.9187C16.6079 19.3319 17.0707 18.6199 17.3632 17.8334C17.6557 17.0469 17.7707 16.2055 17.7 15.3693C17.4673 12.4307 14.696 10.0393 12.1827 10.0393C9.84467 10.0393 8.92933 12.08 9.15533 13.466C9.2388 13.9755 9.45831 14.4529 9.79067 14.848C9.35305 14.6119 8.94751 14.3206 8.584 13.9813C7.57067 13.038 6.95733 11.83 6.858 10.5813C6.64 7.82467 8.67933 5 12.0907 5Z",
		clipRule: "evenodd"
	})
});
function DolphinAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Dolphin = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolphinDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const DolphinIcon = /* @__PURE__ */ Object.assign(Dolphin, {
	Avatar: DolphinAvatar,
	colorPrimary: "#000000"
});
function EssentialaiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EssentialaiLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var FireworksLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.fireworks-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.fireworks-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#5019C5",
		fillRule: "evenodd",
		d: "M13.8667 8L11.9993 12.53L10.13 8H8.93133L10.9793 12.952C11.0612 13.1534 11.2012 13.3258 11.3815 13.4473C11.5618 13.5687 11.7742 13.6337 11.9916 13.6338C12.2089 13.634 12.4214 13.5693 12.6019 13.4481C12.7824 13.3269 12.9226 13.1546 13.0047 12.9533L15.0653 8H13.8667ZM14.664 14.9013L18.08 11.4053L17.614 10.2927L13.8833 14.1187C13.731 14.2748 13.6281 14.4723 13.5874 14.6865C13.5468 14.9008 13.5701 15.1223 13.6547 15.3233C13.7376 15.523 13.8779 15.6937 14.0578 15.8138C14.2377 15.9339 14.4491 15.998 14.6653 15.998L14.6667 16L20 15.9867L19.534 14.874L14.6653 14.9013H14.664ZM5.92 11.4027L6.386 10.29L10.1167 14.116C10.4287 14.4353 10.5187 14.9087 10.3453 15.3207C10.2623 15.5203 10.122 15.6909 9.94214 15.811C9.76228 15.9311 9.55091 15.9952 9.33467 15.9953L4.00133 15.9833L4 15.9847L4.466 14.872L9.33467 14.9L5.92 11.4027Z",
		clipRule: "evenodd"
	})
});
function FishaudioAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Fishaudio = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FishaudioDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const FishaudioIcon = /* @__PURE__ */ Object.assign(Fishaudio, {
	Avatar: FishaudioAvatar,
	colorPrimary: "#000000"
});
var FluxDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.flux-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.flux-dark"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M4 18.122L12.0067 6L20 18.122H18.5113L12.006 8.252L6.314 16.8707H14.3953L15.2213 18.122H4Z",
		clipRule: "evenodd"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M9.37927 15.4827L10.7613 13.406L12.1439 15.4827H9.37927ZM16.1599 18.122L12.3813 12.3173H13.8326L17.6233 18.122H16.1599ZM17.1599 12.1173L18.5799 9.99066L19.9999 12.1173H17.1599Z",
		clipRule: "evenodd"
	})]
});
var FluxLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.flux-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.flux-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M4 18.122L12.0067 6L20 18.122H18.5113L12.006 8.252L6.314 16.8707H14.3953L15.2213 18.122H4Z",
		clipRule: "evenodd"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M9.3793 15.4827L10.7613 13.406L12.144 15.4827H9.3793ZM16.16 18.122L12.3813 12.3173H13.8326L17.6233 18.122H16.16ZM17.16 12.1173L18.58 9.99066L20 12.1173H17.16Z",
		clipRule: "evenodd"
	})]
});
function FluxAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Flux = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluxDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const FluxIcon = /* @__PURE__ */ Object.assign(Flux, {
	Avatar: FluxAvatar,
	colorPrimary: "#000000"
});
function GlmAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Glm = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlmDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const GlmIcon = /* @__PURE__ */ Object.assign(Glm, {
	Avatar: GlmAvatar,
	colorPrimary: "#000000"
});
var GoogleLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.google-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.google-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#4285F4",
			d: "M21 12.2005C21 11.46 20.9387 10.92 20.8069 10.3596H12.1833V13.7002H17.2446C17.1431 14.5298 16.5925 15.78 15.3677 16.6203L15.3505 16.7316L18.0767 18.8016L18.2648 18.8196C20.001 17.2503 21 14.9397 21 12.2005Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#34A853",
			d: "M12.1841 21C14.6632 21 16.7447 20.1998 18.2657 18.8195L15.3677 16.6203C14.592 17.1505 13.5513 17.5203 12.1841 17.5203C11.0317 17.5204 9.90809 17.1597 8.97104 16.4888C8.03399 15.8179 7.33047 14.8705 6.95919 13.7795L6.85119 13.7885L4.01619 15.9387L3.97937 16.0402C5.48974 18.9799 8.59228 21 12.1841 21Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FBBC05",
			d: "M6.96 13.7796C6.75877 13.2077 6.65451 12.6062 6.65155 12C6.65155 11.3798 6.76446 10.7801 6.94691 10.2205L6.942 10.1002L4.07182 7.91565L3.97773 7.95983C3.3361 9.20999 3.00097 10.5948 3 12C3 13.4498 3.35673 14.8203 3.97936 16.0402L6.96 13.7796Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EB4335",
			d: "M12.1841 6.47973C13.9088 6.47973 15.0715 7.20955 15.735 7.81991L18.3262 5.34C16.7348 3.89018 14.6632 3 12.1841 3C8.59147 3 5.48974 5.02009 3.97937 7.95982L6.94937 10.2205C7.32384 9.12954 8.02952 8.18273 8.96794 7.51214C9.90636 6.84155 11.0307 6.48062 12.1841 6.47973Z"
		})
	]
});
function Gpt45PreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt45PreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4TurboPreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4TurboPreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oAudioPreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oAudioPreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oMiniAudioPreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oMiniAudioPreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oMiniRealtimePreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oMiniRealtimePreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oMiniSearchPreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oMiniSearchPreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oMiniTranscribeAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oMiniTranscribeLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oMiniTtsAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oMiniTtsLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oRealtimePreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oRealtimePreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oSearchPreviewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oSearchPreviewLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oTranscribeDiarizeAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oTranscribeDiarizeLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt4oTranscribeAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt4oTranscribeLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt51ChatLatestAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt51ChatLatestLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt51CodexMaxAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt51CodexMaxLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt51CodexMiniAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt51CodexMiniLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt52ChatLatestAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt52ChatLatestLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt53ChatLatestAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt53ChatLatestLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function Gpt5ChatLatestAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gpt5ChatLatestLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptAudioMiniAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptAudioMiniLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptImage15Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptImage15Light, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptImage1MiniAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptImage1MiniLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptOss120bAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptOss120bLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtime15Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtime15Light, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtime21MiniAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtime21MiniLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtime21Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtime21Light, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtime2Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtime2Light, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtimeMiniAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtimeMiniLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtimeTranslateAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtimeTranslateLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtimeWhisperAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtimeWhisperLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function GptRealtimeAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GptRealtimeLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var GrokDark = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.grok-dark",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.grok-dark"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
			id: `${iconId}-grokdark__a`,
			width: 16,
			height: 16,
			x: 4,
			y: 4,
			maskUnits: "userSpaceOnUse",
			style: { maskType: "luminance" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fff",
				d: "M20 4H4V20H20V4Z"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			mask: `url(#${iconId}-grokdark__a)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fff",
				fillRule: "evenodd",
				d: "M10.18 14.1933L15.4987 10.262C15.7593 10.0687 16.132 10.144 16.2567 10.4433C16.91 12.0227 16.618 13.92 15.3167 15.2227C14.016 16.5253 12.2053 16.8107 10.5507 16.16L8.74333 16.998C11.336 18.772 14.484 18.3333 16.4513 16.3627C18.012 14.8 18.4953 12.67 18.0433 10.7493L18.0473 10.754C17.392 7.93266 18.2087 6.80466 19.8807 4.49866C19.9207 4.44399 19.9607 4.38933 20 4.33333L17.7993 6.53666V6.53L10.178 14.1947M9.082 15.1487C7.22067 13.3687 7.542 10.6147 9.12933 9.026C10.3033 7.85066 12.2273 7.37066 13.9067 8.07599L15.71 7.24266C15.3352 6.96694 14.9251 6.74272 14.4907 6.576C13.3985 6.129 12.1986 6.01493 11.0418 6.24814C9.88499 6.48134 8.82297 7.05142 7.98933 7.88666C6.30067 9.57733 5.76933 12.1773 6.68133 14.396C7.36267 16.054 6.246 17.2267 5.12133 18.4107C4.722 18.8307 4.322 19.25 4 19.694L9.08 15.1507",
				clipRule: "evenodd"
			})
		})]
	});
};
var GrokLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.grok-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.grok-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
			id: `${iconId}-groklight__a`,
			width: 16,
			height: 16,
			x: 4,
			y: 4,
			maskUnits: "userSpaceOnUse",
			style: { maskType: "luminance" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fff",
				d: "M20 4H4V20H20V4Z"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			mask: `url(#${iconId}-groklight__a)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#000",
				fillRule: "evenodd",
				d: "M10.18 14.1933L15.4987 10.262C15.7593 10.0687 16.132 10.144 16.2567 10.4433C16.91 12.0227 16.618 13.92 15.3167 15.2227C14.016 16.5253 12.2053 16.8107 10.5507 16.16L8.74333 16.998C11.336 18.772 14.484 18.3333 16.4513 16.3627C18.012 14.8 18.4953 12.67 18.0433 10.7493L18.0473 10.754C17.392 7.93268 18.2087 6.80468 19.8807 4.49868C19.9207 4.44401 19.9607 4.38934 20 4.33334L17.7993 6.53668V6.53001L10.178 14.1947M9.082 15.1487C7.22067 13.3687 7.542 10.6147 9.12933 9.02601C10.3033 7.85068 12.2273 7.37068 13.9067 8.07601L15.71 7.24268C15.3352 6.96696 14.9251 6.74273 14.4907 6.57601C13.3985 6.12901 12.1986 6.01494 11.0418 6.24816C9.88499 6.48136 8.82297 7.05144 7.98933 7.88668C6.30067 9.57734 5.76933 12.1773 6.68133 14.396C7.36267 16.054 6.246 17.2267 5.12133 18.4107C4.722 18.8307 4.322 19.25 4 19.694L9.08 15.1507",
				clipRule: "evenodd"
			})
		})]
	});
};
function GrokAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Grok = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const GrokIcon = /* @__PURE__ */ Object.assign(Grok, {
	Avatar: GrokAvatar,
	colorPrimary: "#000000"
});
function HappyhorseAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HappyhorseLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function IdeogramAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Ideogram = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeogramDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const IdeogramIcon = /* @__PURE__ */ Object.assign(Ideogram, {
	Avatar: IdeogramAvatar,
	colorPrimary: "#000000"
});
var InceptionDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.inception-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.inception-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M14.0124 4H9.00655L4 9.00582V14.0124H9.00655V9.00582H14.0124V4ZM9.98836 20H14.9935L20 14.9935V9.98764H14.9935V14.9935H9.98836V20Z",
		clipRule: "evenodd"
	})
});
var InceptionLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.inception-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.inception-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M14.0124 4H9.00655L4 9.00582V14.0124H9.00655V9.00582H14.0124V4ZM9.98836 20H14.9935L20 14.9935V9.98764H14.9935V14.9935H9.98836V20Z",
		clipRule: "evenodd"
	})
});
function InceptionAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Inception = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InceptionDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const InceptionIcon = /* @__PURE__ */ Object.assign(Inception, {
	Avatar: InceptionAvatar,
	colorPrimary: "#000000"
});
var InflectionDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.inflection-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.inflection-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M9.5829 20C9.21599 20 9.00069 19.7947 9.00069 19.4507V19.27C9.00069 18.9273 9.17238 18.7667 9.49083 18.6527L10.2004 18.424C10.6906 18.2433 10.8609 18.0353 10.8609 17.5553V6.44467C10.8609 5.96467 10.6906 5.75867 10.2004 5.576L9.48529 5.34667C9.16684 5.23267 9 5.07467 9 4.72933V4.54933C9.00069 4.206 9.22084 4 9.58775 4H14.4116C14.7792 4 15 4.206 15 4.54933V4.73C15 5.07267 14.8276 5.23333 14.5092 5.34733L13.7954 5.574C13.2811 5.75533 13.1087 5.96267 13.1087 6.44267V17.552C13.1087 18.032 13.2811 18.2373 13.7954 18.4207L14.5043 18.6487C14.8228 18.7633 14.9945 18.9207 14.9945 19.266V19.4473C14.9945 19.7907 14.7743 19.9967 14.406 19.9967L9.58359 20H9.5829Z",
		clipRule: "evenodd"
	})
});
var InflectionLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.inflection-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.inflection-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M9.5829 20C9.21599 20 9.00069 19.7947 9.00069 19.4507V19.27C9.00069 18.9273 9.17238 18.7667 9.49083 18.6527L10.2004 18.424C10.6906 18.2433 10.8609 18.0353 10.8609 17.5553V6.44467C10.8609 5.96467 10.6906 5.75867 10.2004 5.576L9.48529 5.34667C9.16684 5.23267 9 5.07467 9 4.72933V4.54933C9.00069 4.206 9.22084 4 9.58775 4H14.4116C14.7792 4 15 4.206 15 4.54933V4.73C15 5.07267 14.8276 5.23333 14.5092 5.34733L13.7954 5.574C13.2811 5.75533 13.1087 5.96267 13.1087 6.44267V17.552C13.1087 18.032 13.2811 18.2373 13.7954 18.4207L14.5043 18.6487C14.8228 18.7633 14.9945 18.9207 14.9945 19.266V19.4473C14.9945 19.7907 14.7743 19.9967 14.406 19.9967L9.58359 20H9.5829Z",
		clipRule: "evenodd"
	})
});
function InflectionAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Inflection = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InflectionDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const InflectionIcon = /* @__PURE__ */ Object.assign(Inflection, {
	Avatar: InflectionAvatar,
	colorPrimary: "#000000"
});
var JinaDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.jina-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.jina-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M7.68671 19.9368C8.66448 19.9368 9.60221 19.5383 10.2936 18.8289C10.985 18.1195 11.3734 17.1573 11.3734 16.1541C11.3734 15.1509 10.985 14.1887 10.2936 13.4793C9.60221 12.7699 8.66448 12.3714 7.68671 12.3714C6.70893 12.3714 5.7712 12.7699 5.07981 13.4793C4.38842 14.1887 4 15.1509 4 16.1541C4 17.1573 4.38842 18.1195 5.07981 18.8289C5.7712 19.5383 6.70893 19.9368 7.68671 19.9368ZM19.1152 4.01231C19.6064 4.01231 20 4.41615 20 4.92013V12.309C20 16.5198 16.6817 19.9499 12.6266 20V12.3213L12.6026 4.90781C12.6026 4.40384 12.9954 4 13.4874 4H19.2136L19.1152 4.01231Z",
		clipRule: "evenodd"
	})
});
var JinaLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.jina-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.jina-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M7.68671 19.9368C8.66448 19.9368 9.60221 19.5383 10.2936 18.8289C10.985 18.1195 11.3734 17.1573 11.3734 16.1541C11.3734 15.1509 10.985 14.1887 10.2936 13.4793C9.60221 12.7699 8.66448 12.3714 7.68671 12.3714C6.70893 12.3714 5.7712 12.7699 5.07981 13.4793C4.38842 14.1887 4 15.1509 4 16.1541C4 17.1573 4.38842 18.1195 5.07981 18.8289C5.7712 19.5383 6.70893 19.9368 7.68671 19.9368ZM19.1152 4.01231C19.6064 4.01231 20 4.41615 20 4.92013V12.309C20 16.5198 16.6817 19.9499 12.6266 20V12.3213L12.6026 4.90781C12.6026 4.40384 12.9954 4 13.4874 4H19.2136L19.1152 4.01231Z",
		clipRule: "evenodd"
	})
});
function JinaAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Jina = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JinaDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const JinaIcon = /* @__PURE__ */ Object.assign(Jina, {
	Avatar: JinaAvatar,
	colorPrimary: "#000000"
});
var KimiDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.kimi-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.kimi-dark"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#027AFF",
		fillRule: "evenodd",
		d: "M16.9886 8.40141C17.1046 8.25253 17.2065 8.11652 17.314 7.98485C17.3639 7.92288 17.3596 7.87575 17.3111 7.81103C16.8447 7.19781 16.8006 6.51697 17.069 5.82616C17.2706 5.30628 17.7164 5.06262 18.2612 5.01076C18.6008 4.97873 18.9342 5.01352 19.2433 5.17868C19.6493 5.39595 19.8856 5.72718 19.9625 6.1843C20.0238 6.54901 20.0124 6.90505 19.9092 7.25833C19.7261 7.88363 19.2767 8.20764 18.6607 8.28956C18.1494 8.35795 17.6309 8.36649 17.1152 8.40141C17.0755 8.4043 17.0348 8.40141 16.9886 8.40141Z",
		clipRule: "evenodd"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M15.7239 5.60089H12.643L10.2038 11.1631H6.75549V5.62518H4V19.9556H6.75615V13.9185H11.6161C12.4529 13.9185 13.217 13.4306 13.5696 12.6722V19.9556H16.3257V13.9185C16.3257 12.4821 15.2033 11.2742 13.7704 11.1695V11.1623H12.257C12.6217 11.0378 12.9568 10.8395 13.2414 10.5798C13.5261 10.32 13.7542 10.0044 13.9114 9.65254L15.7239 5.60089Z",
		clipRule: "evenodd"
	})]
});
var KimiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.kimi-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.kimi-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#027AFF",
		fillRule: "evenodd",
		d: "M16.9886 8.40141C17.1047 8.25253 17.2065 8.11652 17.3141 7.98485C17.3639 7.92288 17.3596 7.87575 17.3112 7.81103C16.8447 7.19781 16.8006 6.51697 17.0691 5.82616C17.2706 5.30628 17.7164 5.06262 18.2613 5.01076C18.6009 4.97873 18.9342 5.01352 19.2434 5.17868C19.6493 5.39595 19.8856 5.72718 19.9625 6.1843C20.0239 6.54901 20.0124 6.90505 19.9092 7.25833C19.7261 7.88363 19.2767 8.20764 18.6608 8.28956C18.1494 8.35795 17.631 8.36649 17.1153 8.40141C17.0755 8.4043 17.0348 8.40141 16.9886 8.40141Z",
		clipRule: "evenodd"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M15.7239 5.60089H12.643L10.2038 11.1631H6.75549V5.62518H4V19.9556H6.75615V13.9185H11.6161C12.4529 13.9185 13.217 13.4306 13.5696 12.6722V19.9556H16.3257V13.9185C16.3257 12.4821 15.2033 11.2742 13.7704 11.1695V11.1623H12.257C12.6217 11.0378 12.9568 10.8395 13.2414 10.5798C13.5261 10.32 13.7542 10.0044 13.9114 9.65254L15.7239 5.60089Z",
		clipRule: "evenodd"
	})]
});
function KimiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Kimi = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KimiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const KimiIcon = /* @__PURE__ */ Object.assign(Kimi, {
	Avatar: KimiAvatar,
	colorPrimary: "#027AFF"
});
var LiquidDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.liquid-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.liquid-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M12.1996 9.69733L12.1955 9.70067L13.7666 13.2007C13.9846 13.6291 14.1005 14.13 14.1 14.642C14.1 15.1447 13.99 15.6153 13.7992 16.0167L17 14.6893L11.9933 4L10.7872 6.58133L12.1996 9.69733ZM9.50804 20L12.0228 17.298H12.0161C10.8655 17.298 9.93322 16.1087 9.93322 14.642C9.93322 14.1127 10.0551 13.6193 10.2651 13.2047L11.7506 9.88733L10.516 7.16267L7 14.6893L9.50441 20H9.50804ZM13.0858 16.9213H13.0852L10.2262 20H14.4686L16.6194 15.4873L13.0858 16.9213Z",
		clipRule: "evenodd"
	})
});
var LiquidLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.liquid-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.liquid-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M12.1996 9.69733L12.1955 9.70067L13.7666 13.2007C13.9846 13.6291 14.1005 14.13 14.1 14.642C14.1 15.1447 13.99 15.6153 13.7992 16.0167L17 14.6893L11.9933 4L10.7872 6.58133L12.1996 9.69733ZM9.50804 20L12.0228 17.298H12.0161C10.8655 17.298 9.93322 16.1087 9.93322 14.642C9.93322 14.1127 10.0551 13.6193 10.2651 13.2047L11.7506 9.88733L10.516 7.16267L7 14.6893L9.50441 20H9.50804ZM13.0858 16.9213H13.0852L10.2262 20H14.4686L16.6194 15.4873L13.0858 16.9213Z",
		clipRule: "evenodd"
	})
});
function LiquidAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Liquid = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const LiquidIcon = /* @__PURE__ */ Object.assign(Liquid, {
	Avatar: LiquidAvatar,
	colorPrimary: "#000000"
});
function LongcatAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Longcat = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongcatDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const LongcatIcon = /* @__PURE__ */ Object.assign(Longcat, {
	Avatar: LongcatAvatar,
	colorPrimary: "#29E154"
});
var MenloLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.menlo-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.menlo-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#FF5C00",
		d: "M15.23 4.99467L16 6.024V11L15.23 12.0067L14.4605 11V6.024L15.2305 4.99467H15.23ZM11.4955 4.99467L12.274 6.024V11L11.4955 12.0067L10.7255 11V6.024L11.4955 4.99467ZM7.77 12.0067L7 10.9993V6.024L7.77 4.99467L8.5395 6.024V11L7.77 12.0067ZM7 13.0127L7.77 12.006L8.5395 13.0127V18.9933L7.7695 20L7 18.9933V13.012V13.0127ZM15.23 20L14.4605 18.9933V13.012L15.2305 12.0053L16 13.0127V18.994L15.23 20ZM8.54 4H10.7265L11.4965 4.99467L10.7265 6.024H8.5395L7.77 4.99467L8.54 4ZM12.275 4H14.461L15.2305 4.99467L14.461 6.024H12.274L11.4955 4.99467L12.274 4H12.275Z"
	})
});
var MicrosoftLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.microsoft-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.microsoft-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#F25022",
			d: "M11.592 4H4V11.5936H11.5936V4H11.592Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#7FBA00",
			d: "M20 4H12.4064V11.5936H20V4Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#00A4EF",
			d: "M11.592 12.4064H4V20H11.5936V12.4064H11.592Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FFB900",
			d: "M20 12.4064H12.4064V20H20V12.4064Z"
		})
	]
});
function MimoAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Mimo = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MimoDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const MimoIcon = /* @__PURE__ */ Object.assign(Mimo, {
	Avatar: MimoAvatar,
	colorPrimary: "#000000"
});
var MistralLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.mistral-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.mistral-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "gold",
			d: "M6.28534 6H8.57134V8.28534H6.28534V6ZM15.428 6H17.7147V8.28534H15.428V6Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FFAF00",
			d: "M6.28534 8.28534H10.8567V10.5713H6.28601L6.28534 8.28534ZM13.1427 8.28534H17.714V10.5713H13.1427V8.28534Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FF8205",
			d: "M6.28534 10.572H17.7147V12.8573H6.28534V10.572Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FA500F",
			d: "M6.28534 12.8573H8.57134V15.1427H6.28534V12.8573ZM10.8573 12.8573H13.1433V15.1427H10.8573V12.8573ZM15.428 12.8573H17.7147V15.1427H15.428V12.8573Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#E10500",
			d: "M4 15.1427H10.8573V17.4287H4V15.1427ZM13.1427 15.1427H20V17.4287H13.1427V15.1427Z"
		})
	]
});
function MoonshotAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Moonshot = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonshotDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const MoonshotIcon = /* @__PURE__ */ Object.assign(Moonshot, {
	Avatar: MoonshotAvatar,
	colorPrimary: "#000000"
});
function NanobananaAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NanobananaLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
function NousresearchAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Nousresearch = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NousresearchDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const NousresearchIcon = /* @__PURE__ */ Object.assign(Nousresearch, {
	Avatar: NousresearchAvatar,
	colorPrimary: "#000000"
});
var NvidiaLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.nvidia-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.nvidia-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#74B71B",
		d: "M9.97236 9.28291V8.28858C10.0647 8.28125 10.1585 8.27611 10.2545 8.27318C12.8698 8.18739 14.5869 10.608 14.5869 10.608C14.5869 10.608 12.7338 13.2822 10.7455 13.2822C10.4824 13.2835 10.2211 13.2401 9.97236 13.1539V10.1409C10.9905 10.2684 11.1949 10.7363 11.8073 11.7966L13.1695 10.6036C12.8481 10.1968 12.443 9.86512 11.9822 9.63143C11.5214 9.39773 11.0159 9.26757 10.5004 9.24992C10.3232 9.25079 10.1462 9.26156 9.97018 9.28218M9.97018 6V7.4849C10.0647 7.47757 10.1585 7.47097 10.2524 7.4673C13.8902 7.33971 16.2604 10.5662 16.2604 10.5662C16.2604 10.5662 13.5382 14.0053 10.7018 14.0053C10.456 14.0053 10.2109 13.9825 9.96945 13.9378V14.8544C10.1716 14.8823 10.3753 14.8962 10.5789 14.8962C13.2182 14.8962 15.1265 13.4956 16.9745 11.8391C17.2807 12.0936 18.5353 12.714 18.7935 12.986C17.0364 14.5134 12.9404 15.7453 10.6189 15.7453C10.3949 15.7453 10.1804 15.7307 9.96873 15.7102V17H20V6.00073H9.97091L9.97018 6ZM9.97018 13.1539V13.9371C7.52945 13.4854 6.85236 10.8499 6.85236 10.8499C7.68274 9.98255 8.78343 9.42907 9.97018 9.28218V10.1416H9.96655C9.61833 10.1383 9.27385 10.2142 8.95879 10.3638C8.64373 10.5133 8.36621 10.7327 8.14691 11.0054C8.14691 11.0054 8.59418 12.6736 9.97018 13.1539ZM5.63491 10.7348C6.67927 9.31591 8.256 8.42644 9.97018 8.28858V7.48417C6.77091 7.75108 4 10.564 4 10.564C4 10.564 5.56945 15.2768 9.97091 15.708V14.8529C6.74182 14.4335 5.63636 10.7363 5.63636 10.7363H5.63491V10.7348Z"
	})
});
function OpenaiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Openai = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenaiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const OpenaiIcon = /* @__PURE__ */ Object.assign(Openai, {
	Avatar: OpenaiAvatar,
	colorPrimary: "#000000"
});
var OpenrouterLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.openrouter-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.openrouter-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#C8FF00",
		d: "M16.4361 6.00065C17.3355 6.00065 18.1982 6.3483 18.8342 6.96712C19.4703 7.58594 19.8276 8.42524 19.8276 9.30039C19.8276 10.1755 19.4703 11.0148 18.8342 11.6337C18.1982 12.2525 17.3355 12.6001 16.4361 12.6001L19.8003 15.8733C20.2269 16.2891 19.9249 17 19.3202 17H9.653C8.15373 17 6.71587 16.4205 5.65572 15.3891C4.59558 14.3576 4 12.9587 4 11.5C4 10.0413 4.59558 8.64236 5.65572 7.61091C6.71587 6.57946 8.15373 6 9.653 6H16.4367L16.4361 6.00065ZM9.65233 8.19961C8.75266 8.19961 7.88984 8.54733 7.25368 9.16627C6.61752 9.78522 6.26013 10.6247 6.26013 11.5C6.26013 12.3753 6.61752 13.2148 7.25368 13.8337C7.88984 14.4527 8.75266 14.8004 9.65233 14.8004C10.5519 14.8004 11.4146 14.4527 12.0507 13.8338C12.6868 13.2149 13.0442 12.3756 13.0442 11.5003C13.0442 10.6251 12.6868 9.78571 12.0507 9.16683C11.4146 8.54794 10.5519 8.19961 9.65233 8.19961Z"
	})
});
function OpenrouterAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var PerplexityLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.perplexity-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.perplexity-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#22B8CD",
		d: "M17.19 4V8.848H19V15.7467H17.0433V20L12.352 15.8707V19.9673H11.6247V15.866L6.928 20V15.69H5V8.792H6.92267V4L11.6247 8.32933V4.12667H12.3513V8.45333L17.19 4ZM12.352 10.0293V14.9087L16.316 18.398V13.6267L12.352 10.0293ZM11.6193 9.976L7.65533 13.5747V18.398L11.6193 14.9087V9.97667V9.976ZM17.0433 15.0293H18.2727V9.566H12.9733L17.0433 13.2593V15.0293ZM11.0553 9.50933H5.72667V14.9727H6.92667V13.2553L11.0547 9.50867L11.0553 9.50933ZM7.65 5.65067V8.79067H11.06L7.65 5.65067ZM16.4627 5.65067L13.0527 8.79067H16.4627V5.65067Z"
	})
});
function PerplexityAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerplexityLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var PhindDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.phind-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.phind-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M6.11995 7.02851V20H8.49049V14.7382C8.49049 14.7382 8.49504 14.7382 8.49504 14.7429V14.4002C9.30689 15.2009 10.3267 15.7562 11.4558 15.9462C11.7275 15.9875 12.0044 16.0108 12.2852 16.0108C15.0964 15.9275 17.5307 13.7896 17.9395 10.8557C18.0504 10.0746 18.0085 9.27857 17.8162 8.51422C17.6239 7.74987 17.2851 7.03246 16.8196 6.40387C16.3562 5.77146 15.7758 5.23906 15.1115 4.83718C14.4471 4.43531 13.712 4.17187 12.9482 4.06196C12.1836 3.94853 11.4047 3.99114 10.6562 4.18734C9.90774 4.38354 9.20443 4.72947 8.58669 5.20525C8.43199 5.32058 8.28769 5.44524 8.14664 5.57523L6.4872 4.21462L5 6.10255L6.11995 7.02851ZM12.15 6.20454C12.9226 6.20361 13.676 6.45083 14.3046 6.91151C14.9332 7.37218 15.4053 8.02318 15.6548 8.77311C15.8158 9.26175 15.8774 9.77909 15.8357 10.2931C15.794 10.8071 15.6498 11.3069 15.4122 11.7615C15.1746 12.2161 14.8485 12.6159 14.4542 12.9361C14.0599 13.2562 13.6057 13.49 13.1198 13.6229C12.8037 13.7108 12.4775 13.7543 12.15 13.7522C11.5156 13.7522 10.9215 13.5903 10.4002 13.3036C9.92422 13.0478 9.51038 12.6855 9.18924 12.2436C8.81791 11.7439 8.57899 11.1542 8.49569 10.5317C8.4682 10.3495 8.4545 10.1654 8.45474 9.98106C8.45474 7.89381 10.1096 6.20454 12.15 6.20454Z",
		clipRule: "evenodd"
	})
});
var PhindLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.phind-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.phind-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M6.11995 7.02851V20H8.49049V14.7382C8.49049 14.7382 8.49504 14.7382 8.49504 14.7429V14.4002C9.30689 15.2009 10.3267 15.7562 11.4558 15.9462C11.7275 15.9875 12.0044 16.0108 12.2852 16.0108C15.0964 15.9275 17.5307 13.7896 17.9395 10.8557C18.0504 10.0746 18.0085 9.27857 17.8162 8.51422C17.6239 7.74987 17.2851 7.03246 16.8196 6.40387C16.3562 5.77146 15.7758 5.23906 15.1115 4.83718C14.4471 4.43531 13.712 4.17187 12.9482 4.06196C12.1836 3.94853 11.4047 3.99114 10.6562 4.18734C9.90774 4.38354 9.20443 4.72947 8.58669 5.20525C8.43199 5.32058 8.28769 5.44524 8.14664 5.57523L6.4872 4.21462L5 6.10255L6.11995 7.02851ZM12.15 6.20454C12.9226 6.20361 13.676 6.45083 14.3046 6.91151C14.9332 7.37218 15.4053 8.02318 15.6548 8.77311C15.8158 9.26175 15.8774 9.77909 15.8357 10.2931C15.794 10.8071 15.6498 11.3069 15.4122 11.7615C15.1746 12.2161 14.8485 12.6159 14.4542 12.9361C14.0599 13.2562 13.6057 13.49 13.1198 13.6229C12.8037 13.7108 12.4775 13.7543 12.15 13.7522C11.5156 13.7522 10.9215 13.5903 10.4002 13.3036C9.92422 13.0478 9.51038 12.6855 9.18924 12.2436C8.81791 11.7439 8.57899 11.1542 8.49569 10.5317C8.4682 10.3495 8.4545 10.1654 8.45474 9.98106C8.45474 7.89381 10.1096 6.20454 12.15 6.20454Z",
		clipRule: "evenodd"
	})
});
function PhindAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Phind = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhindDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const PhindIcon = /* @__PURE__ */ Object.assign(Phind, {
	Avatar: PhindAvatar,
	colorPrimary: "#000000"
});
var QiniuLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.qiniu-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.qiniu-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#06AEEF",
		d: "M20 6.0334C19.8952 5.99817 19.7836 5.99067 19.6752 6.01158C19.5669 6.03249 19.4654 6.08114 19.38 6.15308C18.1478 7.65606 16.5129 8.7497 14.6806 9.29669C12.8484 9.84368 10.9004 9.81963 9.08132 9.22756L8.67306 7.69181C8.61136 7.5123 8.48964 7.36142 8.32979 7.26631C8.16995 7.17119 7.98247 7.13809 7.80109 7.17295L7.9955 8.79345C6.68791 8.1787 6.33005 8.09024 5.41272 6.97225C5.28455 6.87264 4.26857 5.93825 4 6.0334C4.76734 8.14192 6.28454 9.86907 8.24247 10.8629L8.77386 15.3007C8.77386 15.3007 9.01148 17 10.5545 17H13.8566C15.4004 17 15.638 15.3007 15.638 15.3007L16.011 12.1192C15.008 12.0374 14.3779 12.7562 14.1778 13.4676C13.8429 14.6674 13.8429 14.7432 13.7767 14.9528C13.6413 15.3802 13.1963 15.4315 13.1963 15.4315H11.2141C11.2141 15.4315 10.7698 15.3795 10.6337 14.9528C10.5473 14.677 10.1103 13.0647 9.67247 11.4294C11.7357 12.0297 13.9421 11.8081 15.8546 10.8087C17.7671 9.80918 19.2471 8.1054 20 6.0334Z"
	})
});
var RelaceDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.relace-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.relace-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M20 20H4V4H20V20ZM5.42691 14.3505C6.85891 14.5687 9.08364 14.656 11.0851 14.2262C11.7425 14.0844 12.3527 13.8916 12.896 13.6422C11.8815 11.1695 11.6778 9.44873 11.9767 8.27636C12.3156 6.95055 13.2851 6.39273 14.1571 6.384H14.1644C14.6647 6.384 15.704 6.51273 16.4051 7.36582C17.1345 8.25309 17.2895 9.65818 16.5942 11.7229C16.2276 12.8087 15.5491 13.6255 14.7076 14.2364C15.6698 16.4131 16.2422 17.5076 16.5898 18.0793C16.752 18.3462 16.8604 18.4895 16.9295 18.5731H18.5731V5.42691H5.42691V14.3505ZM13.4633 14.952C12.8 15.2524 12.0909 15.4691 11.3855 15.6211C9.26909 16.0764 6.97891 16.0044 5.42691 15.7913V18.5731H15.224C14.8407 17.904 14.288 16.8109 13.4633 14.952ZM14.1687 7.81018C13.9338 7.81382 13.536 7.94182 13.36 8.62982C13.1782 9.33891 13.2429 10.6487 14.1273 12.8771C14.64 12.4422 15.024 11.9105 15.2407 11.2676C15.872 9.39418 15.5716 8.59855 15.3033 8.272C15.008 7.91273 14.5105 7.81091 14.1687 7.81018Z",
		clipRule: "evenodd"
	})
});
var RelaceLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.relace-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.relace-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M20 20H4V4H20V20ZM5.42691 14.3505C6.85891 14.5687 9.08364 14.656 11.0851 14.2262C11.7425 14.0844 12.3527 13.8916 12.896 13.6422C11.8815 11.1695 11.6778 9.44873 11.9767 8.27636C12.3156 6.95055 13.2851 6.39273 14.1571 6.384H14.1644C14.6647 6.384 15.704 6.51273 16.4051 7.36582C17.1345 8.25309 17.2895 9.65818 16.5942 11.7229C16.2276 12.8087 15.5491 13.6255 14.7076 14.2364C15.6698 16.4131 16.2422 17.5076 16.5898 18.0793C16.752 18.3462 16.8604 18.4895 16.9295 18.5731H18.5731V5.42691H5.42691V14.3505ZM13.4633 14.952C12.8 15.2524 12.0909 15.4691 11.3855 15.6211C9.26909 16.0764 6.97891 16.0044 5.42691 15.7913V18.5731H15.224C14.8407 17.904 14.288 16.8109 13.4633 14.952ZM14.1687 7.81018C13.9338 7.81382 13.536 7.94182 13.36 8.62982C13.1782 9.33891 13.2429 10.6487 14.1273 12.8771C14.64 12.4422 15.024 11.9105 15.2407 11.2676C15.872 9.39418 15.5716 8.59855 15.3033 8.272C15.008 7.91273 14.5105 7.81091 14.1687 7.81018Z",
		clipRule: "evenodd"
	})
});
function RelaceAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Relace = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelaceDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const RelaceIcon = /* @__PURE__ */ Object.assign(Relace, {
	Avatar: RelaceAvatar,
	colorPrimary: "#000000"
});
var SkyworkLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.skywork-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.skywork-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#4D5EFF",
		d: "M12.9558 5.17096C11.927 4.36924 10.6484 3.95593 9.345 4.00373C8.04158 4.05152 6.79674 4.55736 5.82942 5.43228C4.73732 6.41996 4.08192 7.80073 4.00717 9.2713C3.93242 10.7419 4.44445 12.182 5.43077 13.2753C6.30431 14.244 7.49146 14.8738 8.78342 15.0537C10.0754 15.2337 11.3894 14.9524 12.4945 14.2592L8.18598 9.48412L12.9558 5.17096Z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#00FFCE",
		d: "M11.0458 18.4944C12.0745 19.2958 13.3528 19.7089 14.6559 19.6611C15.9591 19.6133 17.2036 19.1077 18.1709 18.2331C19.2628 17.2453 19.9181 15.8646 19.9928 14.3941C20.0676 12.9235 19.5557 11.4835 18.5695 10.3901C17.696 9.42134 16.5088 8.79161 15.2169 8.61164C13.9249 8.43167 12.6109 8.71299 11.5058 9.40612L15.8143 14.1813L11.0445 18.4944H11.0458Z"
	})]
});
var SparkLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.spark-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.spark-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#3DC8F9",
			d: "M5 13.099C5 10.3874 6.92832 8.42917 10.0921 5.47617C9.63993 10.9599 14.5512 11.2305 13.5863 13.9727C12.8976 15.931 10.634 15.3286 10.3933 14.9063C10.3933 14.9063 11.2364 15.1477 11.3568 14.3039C11.4778 13.4601 9.79019 13.0086 8.70638 10.8695C6.89771 12.9481 8.04274 17.1358 11.6281 17.1358C14.9421 17.1358 16.2075 13.7014 15.0326 11.5018C15.0326 11.5018 17.8645 11.9839 18.1059 14.1529C18.3466 16.3226 15.5752 20.0888 11.779 19.9984C7.98291 19.908 5 17.1059 5 13.099Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA0100",
			d: "M16.0273 8.24829L11.6886 4C11.3269 8.12725 12.291 9.82531 15.0931 10.5982C16.9915 11.122 17.3936 11.3216 18.2263 12.5265C17.9911 10.8521 17.6837 9.8747 16.0273 8.24829Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#1652D8",
			fillRule: "evenodd",
			d: "M9.89243 16.7463C10.3856 16.9925 10.9651 17.1358 11.6281 17.1358C14.9421 17.1358 16.2075 13.7014 15.0325 11.5018C15.0325 11.5018 17.8645 11.9839 18.1059 14.1529C18.2144 15.1289 17.7128 16.4277 16.7828 17.5546C14.3772 18.6468 11.7115 18.1389 9.89243 16.7463Z",
			clipRule: "evenodd"
		})
	]
});
var StabilityLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.stability-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.stability-light"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: `url(#${iconId}-stabilitylight__a)`,
				d: "M8.52582 18.0909C11.6182 18.0909 13.6298 16.4764 13.6298 14.0473C13.6298 12.1636 12.4065 10.9665 10.2189 10.4705L8.81527 10.0553C7.58327 9.78255 6.864 9.45527 7.03345 8.61891C7.17454 7.92291 7.59563 7.53018 8.57672 7.53018C11.6931 7.53018 12.848 8.61891 12.848 8.61891V6.00073C12.848 6.00073 11.7236 5 8.57672 5C5.60945 5 4 6.50545 4 8.83491C4 10.7185 5.11564 11.8145 7.37818 12.3345L7.62109 12.3949C7.96509 12.4996 8.42982 12.6385 9.01454 12.8109C10.1709 13.0836 10.4684 13.3731 10.4684 14.2407C10.4684 15.0335 9.632 15.4844 8.52654 15.4844C5.33891 15.4844 4 13.8953 4 13.8953V16.7964C4 16.7964 4.83782 18.0909 8.52582 18.0909Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#E80000",
				d: "M18.0902 17.8945C19.1847 17.8945 20 17.1142 20 16.0574C20 14.9782 19.208 14.2204 18.0902 14.2204C16.9956 14.2204 16.2036 14.9782 16.2036 16.0574C16.2036 17.1367 16.9956 17.8945 18.0902 17.8945Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${iconId}-stabilitylight__a`,
				x1: 8.815,
				x2: 8.815,
				y1: 5,
				y2: 18.091,
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#9D39FF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: 1,
					stopColor: "#A380FF"
				})]
			}) })
		]
	});
};
var StepfunLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.stepfun-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.stepfun-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: `url(#${iconId}-stepfunlight__a)`,
			fillRule: "evenodd",
			d: "M18.6747 4H19.3627V4.6304H20V5.28868H19.3627V6.57055H18.6747V5.28936H17.4227V4.62972H18.6747V4ZM5.73333 12.4128V5.27168H6.37933V12.4135H5.73267L5.73333 12.4128ZM12.682 12.8616H19.982V13.4859H15.8433V20H12.682V12.8609V12.8616ZM7.75267 6.26658V14.6692H4V17.7361H10.924V9.44033H17.906L17.904 6.2659L7.75267 6.26658Z",
			clipRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: `${iconId}-stepfunlight__a`,
			x1: 5.097,
			x2: 16.491,
			y1: 5.303,
			y2: 18.8,
			gradientUnits: "userSpaceOnUse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#01A9FF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: 1,
				stopColor: "#0160FF"
			})]
		}) })]
	});
};
function SunoAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Suno = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const SunoIcon = /* @__PURE__ */ Object.assign(Suno, {
	Avatar: SunoAvatar,
	colorPrimary: "#000000"
});
var TiiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.tii-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.tii-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#6400FF",
		d: "M10.232 9.04199H6V10.5133H7.18V14.9587H9.05133V10.5133H10.2313L10.232 9.04199ZM12.708 9.04199H10.8367V14.9587H12.708V9.04199ZM15.7887 9.04199H13.9173V14.9587H15.7887V9.04199Z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#6400FF",
		d: "M10.8333 20V19.2967C12.8399 19.2967 14.5753 18.5773 15.9913 17.158C17.4066 15.738 18.1306 14.0067 18.1306 12C18.1306 9.994 17.4106 8.262 15.9913 6.84267C14.5726 5.42267 12.8366 4.70267 10.8339 4.70267V4C13.0299 4 14.9326 4.78933 16.4886 6.34533C18.0446 7.90133 18.8333 9.804 18.8333 12C18.8333 14.1967 18.0446 16.1033 16.4879 17.6553C14.9313 19.2073 13.0333 20 10.8339 20H10.8333Z"
	})]
});
function TrinityAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Trinity = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinityDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const TrinityIcon = /* @__PURE__ */ Object.assign(Trinity, {
	Avatar: TrinityAvatar,
	colorPrimary: "#000000"
});
var UpstageLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.upstage-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "ui.upstage-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: `url(#${iconId}-upstagelight__a)`,
			d: "M17.2606 4L17.0102 4.86467H18.7516L19 4H17.2606ZM14.8632 5.51333L14.6108 6.37867H18.3166L18.565 5.51333H14.8632ZM12.6512 7.02667L12.3988 7.892H17.8809L18.1293 7.02667H12.6512ZM5.9063 8.54L5.65321 9.40533H17.4452L17.6936 8.54067H5.90496L5.9063 8.54ZM6.60046 10.054L6.34804 10.9187H17.0102L17.2586 10.054H6.59912H6.60046ZM6.73741 20L6.98983 19.1353H5.24571L5 20H6.73741ZM9.13676 18.4867L9.38918 17.622H5.6814L5.43637 18.4867H9.13676ZM11.3488 16.9727L11.6012 16.108H6.11643L5.87072 16.9727H11.3488ZM18.0944 15.4593L18.3468 14.5947H6.55212L6.30642 15.4593H18.0944ZM17.3975 13.946L17.6499 13.0813H6.98782L6.74211 13.946H17.3975ZM16.6047 12.4327L16.8571 11.568H6.85288L6.60717 12.4327H16.6054H16.6047Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: `${iconId}-upstagelight__a`,
			x1: 12,
			x2: 12,
			y1: 4,
			y2: 20,
			gradientUnits: "userSpaceOnUse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#AEBCFE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: 1,
				stopColor: "#805DFA"
			})]
		}) })]
	});
};
var V0Dark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.v0-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.v0-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M13.5013 9.50025H17.2507C17.3093 9.50025 17.368 9.50425 17.424 9.51225L13.5107 13.4262C13.5023 13.3677 13.4981 13.3087 13.498 13.2495V9.50025H11.998V13.2495C11.9979 13.6108 12.069 13.9685 12.2072 14.3022C12.3453 14.6359 12.5479 14.9392 12.8033 15.1946C13.0586 15.45 13.3618 15.6526 13.6955 15.7908C14.0292 15.929 14.3868 16.0001 14.748 16H18.4973V14.4998H14.748C14.688 14.4998 14.6287 14.4957 14.5713 14.4877L18.4873 10.5704C18.4961 10.63 18.5005 10.6902 18.5007 10.7505V14.4998H20V10.7498C20 10.3887 19.9289 10.0311 19.7907 9.69749C19.6526 9.36387 19.45 9.06074 19.1947 8.8054C18.9394 8.55005 18.6364 8.34751 18.3028 8.20932C17.9692 8.07113 17.6117 8 17.2507 8H13.5013V9.50025ZM4 9.00017V9.00417L9.124 15.5306C9.74 16.3147 10.9993 15.8793 10.9993 14.8818V9.00017H9.5V13.5809L5.904 9.00017H4Z",
		clipRule: "evenodd"
	})
});
var V0Light = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.v0-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.v0-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M13.5013 9.50025H17.2507C17.3093 9.50025 17.368 9.50425 17.424 9.51225L13.5107 13.4262C13.5023 13.3677 13.4981 13.3087 13.498 13.2495V9.50025H11.998V13.2495C11.9979 13.6108 12.069 13.9685 12.2072 14.3022C12.3453 14.6359 12.5479 14.9392 12.8033 15.1946C13.0586 15.45 13.3618 15.6526 13.6955 15.7908C14.0292 15.929 14.3868 16.0001 14.748 16H18.4973V14.4998H14.748C14.688 14.4998 14.6287 14.4957 14.5713 14.4877L18.4873 10.5704C18.4961 10.63 18.5005 10.6902 18.5007 10.7505V14.4998H20V10.7498C20 10.3887 19.9289 10.0311 19.7907 9.69749C19.6526 9.36387 19.45 9.06074 19.1947 8.8054C18.9394 8.55005 18.6364 8.34751 18.3028 8.20932C17.9692 8.07113 17.6117 8 17.2507 8H13.5013V9.50025ZM4 9.00017V9.00417L9.124 15.5306C9.74 16.3147 10.9993 15.8793 10.9993 14.8818V9.00017H9.5V13.5809L5.904 9.00017H4Z",
		clipRule: "evenodd"
	})
});
function V0Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Light, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Dark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var V0 = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Light, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Dark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Light, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V0Dark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const V0Icon = /* @__PURE__ */ Object.assign(V0, {
	Avatar: V0Avatar,
	colorPrimary: "#000000"
});
var VoyageDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.voyage-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.voyage-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		d: "M6.87413 4V4.044C6.85688 4.09685 6.84636 4.15174 6.84283 4.20733C6.83565 4.28067 6.83239 4.346 6.83239 4.404C6.83239 4.63 6.86044 4.88067 6.91587 5.15733C6.97913 5.42733 7.09457 5.76533 7.26217 6.17333L11.9089 17.084L16.3985 6.26C16.5035 5.99067 16.6157 5.696 16.7343 5.37533C16.853 5.05533 16.9124 4.73133 16.9124 4.40333C16.9148 4.2803 16.8936 4.15797 16.8498 4.04333V4H19V4.044C18.867 4.182 18.7065 4.42933 18.5174 4.78667C18.3283 5.14333 18.1222 5.58333 17.8985 6.108L11.888 20H11.0487L5.35326 6.64333C5.22022 6.33 5.08065 6.028 4.93326 5.73667C4.7937 5.44533 4.66065 5.18333 4.53543 4.95C4.40891 4.71 4.29739 4.51 4.19957 4.35C4.13798 4.24429 4.07138 4.14173 4 4.04267V4H6.87413Z"
	})
});
var VoyageLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.voyage-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.voyage-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		d: "M6.87413 4V4.044C6.85688 4.09685 6.84636 4.15174 6.84283 4.20733C6.83565 4.28067 6.83239 4.346 6.83239 4.404C6.83239 4.63 6.86044 4.88067 6.91587 5.15733C6.97913 5.42733 7.09457 5.76533 7.26217 6.17333L11.9089 17.084L16.3985 6.26C16.5035 5.99067 16.6157 5.696 16.7343 5.37533C16.853 5.05533 16.9124 4.73133 16.9124 4.40333C16.9148 4.2803 16.8936 4.15797 16.8498 4.04333V4H19V4.044C18.867 4.182 18.7065 4.42933 18.5174 4.78667C18.3283 5.14333 18.1222 5.58333 17.8985 6.108L11.888 20H11.0487L5.35326 6.64333C5.22022 6.33 5.08065 6.028 4.93326 5.73667C4.7937 5.44533 4.66065 5.18333 4.53543 4.95C4.40891 4.71 4.29739 4.51 4.19957 4.35C4.13798 4.24429 4.07138 4.14173 4 4.04267V4H6.87413Z"
	})
});
function VoyageAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Voyage = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const VoyageIcon = /* @__PURE__ */ Object.assign(Voyage, {
	Avatar: VoyageAvatar,
	colorPrimary: "#000000"
});
function XiaomimimoAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Xiaomimimo = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XiaomimimoDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const XiaomimimoIcon = /* @__PURE__ */ Object.assign(Xiaomimimo, {
	Avatar: XiaomimimoAvatar,
	colorPrimary: "#000000"
});
function YiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Yi = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const YiIcon = /* @__PURE__ */ Object.assign(Yi, {
	Avatar: YiAvatar,
	colorPrimary: "#000000"
});
var ZaiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.zai-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 24 24",
	...mergeUiProps(props, "ui.zai-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M12.07 5L10.618 6.91945H4.43533L5.88667 5H12.0707H12.07ZM19.5027 16.0812L18.052 18H11.8907L13.34 16.0812H19.5027ZM20 5L10.176 18H4L13.824 5H20Z",
		clipRule: "evenodd"
	})
});
function ZaiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Zai = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZaiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const ZaiIcon = /* @__PURE__ */ Object.assign(Zai, {
	Avatar: ZaiAvatar,
	colorPrimary: "#000000"
});
export { Gpt52ChatLatestAvatar as $, LongcatIcon as A, AyaLight as At, GptRealtimeWhisperAvatar as B, NousresearchIcon as C, DbrxLight as Ct, MimoIcon as D, BaiducloudLight as Dt, MistralLight as E, BilibiliindexIcon as Et, InceptionIcon as F, Ai21Icon as Ft, GptRealtime21MiniAvatar as G, GptRealtimeMiniAvatar as H, IdeogramIcon as I, Ai2Light as It, GptImage1MiniAvatar as J, GptRealtime15Avatar as K, HappyhorseAvatar as L, AceIcon as Lt, KimiIcon as M, AssemblyaiLight as Mt, JinaIcon as N, ArceeLight as Nt, MicrosoftLight as O, BaichuanLight as Ot, InflectionIcon as P, AnthropicIcon as Pt, Gpt53ChatLatestAvatar as Q, GrokIcon as R, NvidiaLight as S, DeepmindLight as St, MoonshotIcon as T, BytedanceLight as Tt, GptRealtime2Avatar as U, GptRealtimeTranslateAvatar as V, GptRealtime21Avatar as W, GptAudioMiniAvatar as X, GptImage15Avatar as Y, Gpt5ChatLatestAvatar as Z, PerplexityAvatar as _, FluxIcon as _t, V0Icon as a, Gpt4oSearchPreviewAvatar as at, OpenrouterLight as b, EssentialaiAvatar as bt, TiiLight as c, Gpt4oMiniTranscribeAvatar as ct, StabilityLight as d, Gpt4oMiniAudioPreviewAvatar as dt, Gpt51CodexMiniAvatar as et, SparkLight as f, Gpt4oAudioPreviewAvatar as ft, PhindIcon as g, GlmIcon as gt, QiniuLight as h, GoogleLight as ht, VoyageIcon as i, Gpt4oTranscribeDiarizeAvatar as it, LiquidIcon as j, AwsIcon as jt, MenloLight as k, BaaiIcon as kt, SunoIcon as l, Gpt4oMiniSearchPreviewAvatar as lt, RelaceIcon as m, Gpt45PreviewAvatar as mt, YiIcon as n, Gpt51ChatLatestAvatar as nt, UpstageLight as o, Gpt4oRealtimePreviewAvatar as ot, SkyworkLight as p, Gpt4TurboPreviewAvatar as pt, GptOss120bAvatar as q, XiaomimimoIcon as r, Gpt4oTranscribeAvatar as rt, TrinityIcon as s, Gpt4oMiniTtsAvatar as st, ZaiIcon as t, Gpt51CodexMaxAvatar as tt, StepfunLight as u, Gpt4oMiniRealtimePreviewAvatar as ut, PerplexityLight as v, FishaudioIcon as vt, NanobananaAvatar as w, DalleLight as wt, OpenaiIcon as x, DolphinIcon as xt, OpenrouterAvatar as y, FireworksLight as yt, GptRealtimeAvatar as z };

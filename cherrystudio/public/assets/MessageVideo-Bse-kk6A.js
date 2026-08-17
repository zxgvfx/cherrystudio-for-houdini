const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./react-Cw-xbr9H.js","./dist-CVwFLyiY.js","./hls-BtFWqAkR.js","./react-DXAbXv4a.js","./rolldown-runtime-BeJLVFtF.js","./react-Be25crrj.js","./preload-helper-DXC6tWlX.js","./dist-ByyCnXSb.js","./react-C6m14tWM.js","./react-Dg_h0Ti4.js","./react-DB4JvCVV.js","./react-DAK4R0Qz.js","./react-CIRQy7dT.js","./react-qSVCuDZN.js","./Preview-3tIGTdw7.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
var MATCH_URL_MUX = /stream\.mux\.com\/(?!\w+\.m3u8)(\w+)/;
var MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
var MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/;
var MATCH_URL_WISTIA = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/;
var MATCH_URL_SPOTIFY = /open\.spotify\.com\/(\w+)\/(\w+)/i;
var MATCH_URL_TWITCH = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+|(videos?\/|\?video=)\d+)($|\?)/;
var MATCH_URL_TIKTOK = /tiktok\.com\/(?:player\/v1\/|share\/video\/|@[^/]+\/video\/)([0-9]+)/;
var canPlayFile = (url, test) => {
	if (Array.isArray(url)) {
		for (const item of url) {
			if (typeof item === "string" && canPlayFile(item, test)) return true;
			if (canPlayFile(item.src, test)) return true;
		}
		return false;
	}
	return test(url);
};
var canPlay = {
	html: (url) => canPlayFile(url, (u) => AUDIO_EXTENSIONS.test(u) || VIDEO_EXTENSIONS.test(u)),
	hls: (url) => canPlayFile(url, (u) => HLS_EXTENSIONS.test(u)),
	dash: (url) => canPlayFile(url, (u) => DASH_EXTENSIONS.test(u)),
	mux: (url) => MATCH_URL_MUX.test(url),
	youtube: (url) => MATCH_URL_YOUTUBE.test(url),
	vimeo: (url) => MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url),
	wistia: (url) => MATCH_URL_WISTIA.test(url),
	spotify: (url) => MATCH_URL_SPOTIFY.test(url),
	twitch: (url) => MATCH_URL_TWITCH.test(url),
	tiktok: (url) => MATCH_URL_TIKTOK.test(url)
};
var HtmlPlayer_default = import_react.forwardRef((props, ref) => {
	const Media = AUDIO_EXTENSIONS.test(`${props.src}`) ? "audio" : "video";
	return /* @__PURE__ */ import_react.createElement(Media, {
		...props,
		ref
	}, props.children);
});
var players_default = [
	{
		key: "hls",
		name: "hls.js",
		canPlay: canPlay.hls,
		canEnablePIP: () => true,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerHls' */
			"./react-Cw-xbr9H.js"
), __vite__mapDeps([0,1,2,3,4]), import.meta.url))
	},
	{
		key: "dash",
		name: "dash.js",
		canPlay: canPlay.dash,
		canEnablePIP: () => true,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerDash' */
			"./react-Be25crrj.js"
), __vite__mapDeps([5,6,1,3,4]), import.meta.url))
	},
	{
		key: "mux",
		name: "Mux",
		canPlay: canPlay.mux,
		canEnablePIP: () => true,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerMux' */
			"./dist-ByyCnXSb.js"
), __vite__mapDeps([7,1,2,3,4]), import.meta.url))
	},
	{
		key: "youtube",
		name: "YouTube",
		canPlay: canPlay.youtube,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerYouTube' */
			"./react-C6m14tWM.js"
), __vite__mapDeps([8,3,4]), import.meta.url))
	},
	{
		key: "vimeo",
		name: "Vimeo",
		canPlay: canPlay.vimeo,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerVimeo' */
			"./react-Dg_h0Ti4.js"
), __vite__mapDeps([9,3,4]), import.meta.url))
	},
	{
		key: "wistia",
		name: "Wistia",
		canPlay: canPlay.wistia,
		canEnablePIP: () => true,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerWistia' */
			"./react-DB4JvCVV.js"
), __vite__mapDeps([10,6,3,4]), import.meta.url))
	},
	{
		key: "spotify",
		name: "Spotify",
		canPlay: canPlay.spotify,
		canEnablePIP: () => false,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerSpotify' */
			"./react-DAK4R0Qz.js"
), __vite__mapDeps([11,3,4]), import.meta.url))
	},
	{
		key: "twitch",
		name: "Twitch",
		canPlay: canPlay.twitch,
		canEnablePIP: () => false,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerTwitch' */
			"./react-CIRQy7dT.js"
), __vite__mapDeps([12,3,4]), import.meta.url))
	},
	{
		key: "tiktok",
		name: "TikTok",
		canPlay: canPlay.tiktok,
		canEnablePIP: () => false,
		player: (0, import_react.lazy)(() => __vitePreload(() => import(
			/* webpackChunkName: 'reactPlayerTiktok' */
			"./react-qSVCuDZN.js"
), __vite__mapDeps([13,3,4]), import.meta.url))
	},
	{
		key: "html",
		name: "html",
		canPlay: canPlay.html,
		canEnablePIP: () => true,
		player: HtmlPlayer_default
	}
];
var defaultProps = {
	width: "320px",
	height: "180px",
	volume: 1,
	playbackRate: 1,
	previewTabIndex: 0,
	previewAriaLabel: "",
	oEmbedUrl: "https://noembed.com/embed?url={url}"
};
var Player = import_react.forwardRef((props, ref) => {
	const { playing, pip } = props;
	const Player2 = props.activePlayer;
	const playerRef = (0, import_react.useRef)(null);
	const startOnPlayRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		var _a, _b;
		if (!playerRef.current) return;
		if (playerRef.current.paused && playing === true) playerRef.current.play();
		if (!playerRef.current.paused && playing === false) playerRef.current.pause();
		playerRef.current.playbackRate = (_a = props.playbackRate) != null ? _a : 1;
		playerRef.current.volume = (_b = props.volume) != null ? _b : 1;
	});
	(0, import_react.useEffect)(() => {
		var _a, _b, _c, _d, _e;
		if (!playerRef.current || !globalThis.document) return;
		if (pip && !document.pictureInPictureElement) try {
			(_b = (_a = playerRef.current).requestPictureInPicture) == null || _b.call(_a);
		} catch (err) {}
		if (!pip && document.pictureInPictureElement) try {
			(_d = (_c = playerRef.current).exitPictureInPicture) == null || _d.call(_c);
			(_e = document.exitPictureInPicture) == null || _e.call(document);
		} catch (err) {}
	}, [pip]);
	const handleLoadStart = (event) => {
		var _a, _b;
		startOnPlayRef.current = true;
		(_a = props.onReady) == null || _a.call(props);
		(_b = props.onLoadStart) == null || _b.call(props, event);
	};
	const handlePlay = (event) => {
		var _a, _b;
		if (startOnPlayRef.current) {
			startOnPlayRef.current = false;
			(_a = props.onStart) == null || _a.call(props, event);
		}
		(_b = props.onPlay) == null || _b.call(props, event);
	};
	if (!Player2) return null;
	const eventProps = {};
	const reactPlayerEventHandlers = ["onReady", "onStart"];
	for (const key in props) if (key.startsWith("on") && !reactPlayerEventHandlers.includes(key)) eventProps[key] = props[key];
	return /* @__PURE__ */ import_react.createElement(Player2, {
		...eventProps,
		style: props.style,
		className: props.className,
		slot: props.slot,
		ref: (0, import_react.useCallback)((node) => {
			playerRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref !== null) ref.current = node;
		}, [ref]),
		src: props.src,
		crossOrigin: props.crossOrigin,
		preload: props.preload,
		controls: props.controls,
		muted: props.muted,
		autoPlay: props.autoPlay,
		loop: props.loop,
		playsInline: props.playsInline,
		disableRemotePlayback: props.disableRemotePlayback,
		config: props.config,
		onLoadStart: handleLoadStart,
		onPlay: handlePlay
	}, props.children);
});
Player.displayName = "Player";
var Player_default = Player;
var Preview = (0, import_react.lazy)(() => __vitePreload(() => import(
	/* webpackChunkName: 'reactPlayerPreview' */
	"./Preview-3tIGTdw7.js"
), __vite__mapDeps([14,3,4]), import.meta.url));
var customPlayers = [];
var createReactPlayer = (players, playerFallback) => {
	const getActivePlayer = (src) => {
		for (const player of [...customPlayers, ...players]) if (src && player.canPlay(src)) return player;
		if (playerFallback) return playerFallback;
		return null;
	};
	const ReactPlayer = import_react.forwardRef((_props, ref) => {
		const props = {
			...defaultProps,
			..._props
		};
		const { src, slot, className, style, width, height, fallback: fallback$1, wrapper } = props;
		const [showPreview, setShowPreview] = (0, import_react.useState)(!!props.light);
		(0, import_react.useEffect)(() => {
			if (props.light) setShowPreview(true);
			else setShowPreview(false);
		}, [props.light]);
		const handleClickPreview = (e) => {
			var _a;
			setShowPreview(false);
			(_a = props.onClickPreview) == null || _a.call(props, e);
		};
		const renderPreview = (src2) => {
			if (!src2) return null;
			const { light, playIcon, previewTabIndex, oEmbedUrl, previewAriaLabel } = props;
			return /* @__PURE__ */ import_react.createElement(Preview, {
				src: src2,
				light,
				playIcon,
				previewTabIndex,
				previewAriaLabel,
				oEmbedUrl,
				onClickPreview: handleClickPreview
			});
		};
		const renderActivePlayer = (src2) => {
			var _a, _b;
			const player = getActivePlayer(src2);
			if (!player) return null;
			const { style: style2, width: width2, height: height2, wrapper: wrapper2 } = props;
			const config = (_a = props.config) == null ? void 0 : _a[player.key];
			return /* @__PURE__ */ import_react.createElement(Player_default, {
				...props,
				ref,
				activePlayer: (_b = player.player) != null ? _b : player,
				slot: wrapper2 ? void 0 : slot,
				className: wrapper2 ? void 0 : className,
				style: wrapper2 ? {
					display: "block",
					width: "100%",
					height: "100%"
				} : {
					display: "block",
					width: width2,
					height: height2,
					...style2
				},
				config
			});
		};
		const Wrapper = wrapper == null ? ForwardChildren : wrapper;
		const UniversalSuspense = fallback$1 === false ? ForwardChildren : import_react.Suspense;
		return /* @__PURE__ */ import_react.createElement(Wrapper, {
			slot,
			className,
			style: {
				width,
				height,
				...style
			}
		}, /* @__PURE__ */ import_react.createElement(UniversalSuspense, { fallback: fallback$1 }, showPreview ? renderPreview(src) : renderActivePlayer(src)));
	});
	ReactPlayer.displayName = "ReactPlayer";
	ReactPlayer.addCustomPlayer = (player) => {
		customPlayers.push(player);
	};
	ReactPlayer.removeCustomPlayers = () => {
		customPlayers.length = 0;
	};
	ReactPlayer.canPlay = (src) => {
		if (src) {
			for (const Player2 of [...customPlayers, ...players]) if (Player2.canPlay(src)) return true;
		}
		return false;
	};
	ReactPlayer.canEnablePIP = (src) => {
		var _a;
		if (src) {
			for (const Player2 of [...customPlayers, ...players]) if (Player2.canPlay(src) && ((_a = Player2.canEnablePIP) == null ? void 0 : _a.call(Player2))) return true;
		}
		return false;
	};
	return ReactPlayer;
};
var ForwardChildren = ({ children }) => children;
var fallback = players_default[players_default.length - 1];
var src_default = createReactPlayer(players_default, fallback);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("MessageVideo");
var MessageVideo = ({ url, filePath, videoPath, startTime }) => {
	const playerRef = (0, import_react.useRef)(null);
	const { t } = useTranslation();
	logger.debug(`MessageVideo: ${JSON.stringify({
		url,
		filePath,
		videoPath,
		startTime
	})}`);
	if (!url && !filePath) return null;
	const renderLocalVideo = () => {
		if (!filePath) {
			logger.warn("Local video was requested but filePath is missing.");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "chat.render-local-video",
				children: t("message.video.error.local_file_missing")
			});
		}
		const videoSrc = `file://${videoPath ?? filePath}`;
		const handleReady = () => {
			const start = Math.floor(startTime ?? 0);
			if (playerRef.current) playerRef.current.currentTime = start;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(src_default, {
			ref: playerRef,
			style: {
				height: "100%",
				width: "100%"
			},
			src: videoSrc,
			controls: true,
			onReady: handleReady
		});
	};
	const renderVideo = () => {
		if (filePath) return renderLocalVideo();
		logger.warn(`Unsupported video or missing necessary data.`);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "chat.render-video",
			children: t("message.video.error.unsupported_type")
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.message-video",
		className: "aspect-video h-auto w-full max-w-140 bg-black",
		children: renderVideo()
	});
};
var MessageVideo_default = MessageVideo;
export { MessageVideo_default as default };

const RELEASE_INLINE_WEBGL_EVENT = "coco:release-webgl";
const QT_COMPOSITOR_PAUSE_MS = 1200;
var pauseGeneration = 0;
function hostWindow() {
	if (typeof window === "undefined") return null;
	return window;
}
function pauseQtCompositor(ms = QT_COMPOSITOR_PAUSE_MS) {
	const win = hostWindow();
	if (!win) return;
	const token = ++pauseGeneration;
	win.__cocoPauseQtHeartbeat = true;
	window.setTimeout(() => {
		if (token !== pauseGeneration) return;
		win.__cocoPauseQtHeartbeat = false;
	}, ms);
}
function releaseInlineWebGL() {
	const win = hostWindow();
	if (!win) return;
	pauseQtCompositor();
	win.dispatchEvent(new Event(RELEASE_INLINE_WEBGL_EVENT));
}
export { pauseQtCompositor as n, releaseInlineWebGL as r, RELEASE_INLINE_WEBGL_EVENT as t };

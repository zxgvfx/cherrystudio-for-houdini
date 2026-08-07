import { r as isMac } from "./platform-YWZQ2_mC.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
function useMacTransparentWindow() {
	const [windowStyle] = usePreference("ui.window_style");
	return isMac && windowStyle === "transparent";
}
var useMacTransparentWindow_default = useMacTransparentWindow;
export { useMacTransparentWindow_default as t };

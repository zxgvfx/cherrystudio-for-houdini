import { r as isMac } from "./platform-YWZQ2_mC.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
function useMacTransparentWindow() {
	const [windowStyle] = usePreference("ui.window_style");
	return isMac && windowStyle === "transparent";
}
var useMacTransparentWindow_default = useMacTransparentWindow;
export { useMacTransparentWindow_default as t };

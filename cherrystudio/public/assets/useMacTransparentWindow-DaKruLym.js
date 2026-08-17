import { r as isMac } from "./platform-CINZzEpE.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
function useMacTransparentWindow() {
	const [windowStyle] = usePreference("ui.window_style");
	return isMac && windowStyle === "transparent";
}
var useMacTransparentWindow_default = useMacTransparentWindow;
export { useMacTransparentWindow_default as t };

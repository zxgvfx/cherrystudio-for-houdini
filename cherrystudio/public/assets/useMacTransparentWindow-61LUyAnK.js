import { r as isMac } from "./platform-fGkkNTU9.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
function useMacTransparentWindow() {
	const [windowStyle] = usePreference("ui.window_style");
	return isMac && windowStyle === "transparent";
}
var useMacTransparentWindow_default = useMacTransparentWindow;
export { useMacTransparentWindow_default as t };

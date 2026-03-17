import { n as __name } from "./src-6zIEfxP7.js";
var getSubGraphTitleMargins = /* @__PURE__ */ __name(({ flowchart }) => {
	const subGraphTitleTopMargin = flowchart?.subGraphTitleMargin?.top ?? 0;
	const subGraphTitleBottomMargin = flowchart?.subGraphTitleMargin?.bottom ?? 0;
	return {
		subGraphTitleTopMargin,
		subGraphTitleBottomMargin,
		subGraphTitleTotalMargin: subGraphTitleTopMargin + subGraphTitleBottomMargin
	};
}, "getSubGraphTitleMargins");
export { getSubGraphTitleMargins as t };

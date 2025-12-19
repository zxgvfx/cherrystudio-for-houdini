import { d as __name } from "./src-CEhSfknn.js";
var getSubGraphTitleMargins = /* @__PURE__ */ __name(({ flowchart }) => {
	const subGraphTitleTopMargin = flowchart?.subGraphTitleMargin?.top ?? 0;
	const subGraphTitleBottomMargin = flowchart?.subGraphTitleMargin?.bottom ?? 0;
	const subGraphTitleTotalMargin = subGraphTitleTopMargin + subGraphTitleBottomMargin;
	return {
		subGraphTitleTopMargin,
		subGraphTitleBottomMargin,
		subGraphTitleTotalMargin
	};
}, "getSubGraphTitleMargins");
export { getSubGraphTitleMargins as b };

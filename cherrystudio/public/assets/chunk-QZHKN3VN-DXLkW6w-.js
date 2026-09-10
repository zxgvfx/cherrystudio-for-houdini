import { n as __name } from "./src-BxTmfvcS.js";
var ImperativeState = class {
	constructor(init) {
		this.init = init;
		this.records = this.init();
	}
	static {
		__name(this, "ImperativeState");
	}
	reset() {
		this.records = this.init();
	}
};
export { ImperativeState as t };

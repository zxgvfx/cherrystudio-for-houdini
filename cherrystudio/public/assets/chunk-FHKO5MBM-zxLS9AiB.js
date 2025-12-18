import { d as __name } from "./src-rJjPA-w6.js";
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
export { ImperativeState as b };

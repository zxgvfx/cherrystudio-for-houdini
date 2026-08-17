var AsyncInitializer = class {
	promise = null;
	factory;
	constructor(factory) {
		this.factory = factory;
	}
	async get(...args) {
		if (!this.promise) this.promise = this.factory(...args);
		return this.promise;
	}
};
export { AsyncInitializer as t };

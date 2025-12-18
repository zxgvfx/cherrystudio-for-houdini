import { b as __commonJSMin } from "./chunk-st2fFX3F.js";
var require_get_context = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp$1 = Object.defineProperty;
	var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __export$1 = (target, all) => {
		for (var name in all) __defProp$1(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$1 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$1 = (mod) => __copyProps$1(__defProp$1({}, "__esModule", { value: true }), mod);
	var get_context_exports = {};
	__export$1(get_context_exports, {
		SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
		getContext: () => getContext
	});
	module.exports = __toCommonJS$1(get_context_exports);
	const SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
	function getContext() {
		const fromSymbol = globalThis;
		return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
	}
}));
var require_index_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var index_browser_exports = {};
	__export(index_browser_exports, {
		getContext: () => import_get_context.getContext,
		getVercelOidcToken: () => getVercelOidcToken,
		getVercelOidcTokenSync: () => getVercelOidcTokenSync
	});
	module.exports = __toCommonJS(index_browser_exports);
	var import_get_context = require_get_context();
	async function getVercelOidcToken() {
		return "";
	}
	function getVercelOidcTokenSync() {
		return "";
	}
}));
export { require_index_browser as b };

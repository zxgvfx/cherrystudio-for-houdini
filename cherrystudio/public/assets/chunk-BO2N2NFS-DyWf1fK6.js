const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./highlighted-body-OFNGDK62-DplTqrHC.js","./lib-BGOUa2xQ.js","./chunk-DiqNceaa.js","./marked.esm-Dt1bmnBy.js","./react-dom-CKbeLgrG.js","./react-BgPOU4At.js","./jsx-runtime-DCB_IiL2.js","./mermaid-GHXKKRXX-CyNkZ4mx.js"])))=>i.map(i=>d[i]);
import { s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { t as require_react_dom } from "./react-dom-CKbeLgrG.js";
import { t as clsx } from "./clsx-Bu5J6-zp.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { A as CONTINUE, C as markdownLineEnding, D as unicodeWhitespace, E as unicodePunctuation, M as visitParents, N as convert, O as ok, S as asciiControl, T as markdownSpace, a as blankLine, b as asciiAlpha, c as combineExtensions, f as handle, i as VFileMessage, j as SKIP, k as visit, m as classifyCharacter, o as factorySpace, r as remarkParse, s as resolveAll, t as unified, u as splice, w as markdownLineEndingOrSpace, x as asciiAlphanumeric, y as normalizeIdentifier } from "./lib-BGOUa2xQ.js";
import { a as stringify$1, c as html$1, d as hastToReact, f as normalize, i as parse$1, l as svg, n as ccount, o as parse, r as htmlVoidElements, s as stringify, t as whitespace, u as find } from "./lib-6TKYmTQn.js";
import { t as zwitch } from "./zwitch-B7UdpQMH.js";
import { a as htmlDecodeTree, n as EntityDecoder, t as DecodingMode } from "./decode-uCeDNj3-.js";
import { t as twMerge } from "./bundle-mjs-CwOjJOmf.js";
import { n as x } from "./marked.esm-Dt1bmnBy.js";
const BlockPolicy = {
	indicator: "indicator",
	textOnly: "text-only",
	remove: "remove"
};
function harden({ defaultOrigin = "", allowedLinkPrefixes = [], allowedImagePrefixes = [], allowDataImages = false, allowedProtocols = [], blockedImageClass = "inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded text-sm", blockedLinkClass = "text-gray-500", linkBlockPolicy = BlockPolicy.indicator, imageBlockPolicy = BlockPolicy.indicator }) {
	const hasSpecificLinkPrefixes = allowedLinkPrefixes.length && !allowedLinkPrefixes.every((p$1) => p$1 === "*");
	const hasSpecificImagePrefixes = allowedImagePrefixes.length && !allowedImagePrefixes.every((p$1) => p$1 === "*");
	if (!defaultOrigin && (hasSpecificLinkPrefixes || hasSpecificImagePrefixes)) throw new Error("defaultOrigin is required when allowedLinkPrefixes or allowedImagePrefixes are provided");
	return (tree) => {
		const visitor = createVisitor(defaultOrigin, allowedLinkPrefixes, allowedImagePrefixes, allowDataImages, allowedProtocols, blockedImageClass, blockedLinkClass, linkBlockPolicy, imageBlockPolicy);
		stripNullChildren(tree);
		visit(tree, visitor);
	};
}
function parseUrl(url, defaultOrigin) {
	if (typeof url !== "string") return null;
	try {
		return new URL(url);
	} catch {
		if (defaultOrigin) try {
			return new URL(url, defaultOrigin);
		} catch {
			return null;
		}
		if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) try {
			return new URL(url, "http://example.com");
		} catch {
			return null;
		}
		return null;
	}
}
function isPathRelativeUrl(url) {
	if (typeof url !== "string") return false;
	return url.startsWith("/") || url.startsWith("./") || url.startsWith("../");
}
var safeProtocols = new Set([
	"https:",
	"http:",
	"irc:",
	"ircs:",
	"mailto:",
	"xmpp:",
	"blob:"
]);
var blockedProtocols = new Set([
	"javascript:",
	"data:",
	"file:",
	"vbscript:"
]);
function transformUrl(url, allowedPrefixes, defaultOrigin, allowDataImages = false, isImage = false, allowedProtocols = []) {
	if (!url) return null;
	if (typeof url === "string" && url.startsWith("#") && !isImage) try {
		if (new URL(url, "http://example.com").hash === url) return url;
	} catch {}
	if (typeof url === "string" && url.startsWith("data:")) {
		if (isImage && allowDataImages && url.startsWith("data:image/")) return url;
		return null;
	}
	if (typeof url === "string" && url.startsWith("blob:")) {
		try {
			if (new URL(url).protocol === "blob:" && url.length > 5) {
				const afterProtocol = url.substring(5);
				if (afterProtocol && afterProtocol.length > 0 && afterProtocol !== "invalid") return url;
			}
		} catch {
			return null;
		}
		return null;
	}
	const parsedUrl = parseUrl(url, defaultOrigin);
	if (!parsedUrl) return null;
	if (blockedProtocols.has(parsedUrl.protocol)) return null;
	if (!(safeProtocols.has(parsedUrl.protocol) || allowedProtocols.includes(parsedUrl.protocol) || allowedProtocols.includes("*"))) return null;
	if (parsedUrl.protocol === "mailto:" || !parsedUrl.protocol.match(/^https?:$/)) return parsedUrl.href;
	const inputWasRelative = isPathRelativeUrl(url);
	if (parsedUrl && allowedPrefixes.some((prefix) => {
		const parsedPrefix = parseUrl(prefix, defaultOrigin);
		if (!parsedPrefix) return false;
		if (parsedPrefix.origin !== parsedUrl.origin) return false;
		return parsedUrl.href.startsWith(parsedPrefix.href);
	})) {
		if (inputWasRelative) return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
		return parsedUrl.href;
	}
	if (allowedPrefixes.includes("*")) {
		if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return null;
		if (inputWasRelative) return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
		return parsedUrl.href;
	}
	return null;
}
function stripNullChildren(node) {
	if ("children" in node && Array.isArray(node.children)) {
		node.children = node.children.filter((child) => child != null);
		for (const child of node.children) stripNullChildren(child);
	}
}
var SEEN = Symbol("node-seen");
function resolveLinkBlockPolicy(node, policy, blockedLinkClass) {
	if (policy === BlockPolicy.remove) return { type: "remove" };
	if (policy === BlockPolicy.textOnly) return {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: {},
			children: [...node.children]
		}
	};
	return {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: {
				title: "Blocked URL: " + String(node.properties.href),
				class: blockedLinkClass
			},
			children: [...node.children, {
				type: "text",
				value: " [blocked]"
			}]
		}
	};
}
function resolveImageBlockPolicy(node, policy, blockedImageClass) {
	if (policy === BlockPolicy.remove) return { type: "remove" };
	if (policy === BlockPolicy.textOnly) {
		const altText = String(node.properties.alt || "");
		if (!altText) return { type: "remove" };
		return {
			type: "replace",
			element: {
				type: "element",
				tagName: "span",
				properties: {},
				children: [{
					type: "text",
					value: altText
				}]
			}
		};
	}
	return {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: { class: blockedImageClass },
			children: [{
				type: "text",
				value: "[Image blocked: " + String(node.properties.alt || "No description") + "]"
			}]
		}
	};
}
var createVisitor = (defaultOrigin, allowedLinkPrefixes, allowedImagePrefixes, allowDataImages, allowedProtocols, blockedImageClass, blockedLinkClass, linkBlockPolicy, imageBlockPolicy) => {
	const visitor = (node, index$1, parent) => {
		if (node.type !== "element" || node[SEEN]) return true;
		if (node.tagName === "a") {
			const transformedUrl = transformUrl(node.properties.href, allowedLinkPrefixes, defaultOrigin, false, false, allowedProtocols);
			if (transformedUrl === null) {
				node[SEEN] = true;
				visit(node, visitor);
				if (parent && typeof index$1 === "number") {
					const result = resolveLinkBlockPolicy(node, linkBlockPolicy, blockedLinkClass);
					if (result.type === "remove") {
						parent.children.splice(index$1, 1);
						return [SKIP, index$1];
					}
					parent.children[index$1] = result.element;
				}
				return SKIP;
			} else {
				node.properties.href = transformedUrl;
				node.properties.target = "_blank";
				node.properties.rel = "noopener noreferrer";
				return true;
			}
		}
		if (node.tagName === "img") {
			const transformedUrl = transformUrl(node.properties.src, allowedImagePrefixes, defaultOrigin, allowDataImages, true, allowedProtocols);
			if (transformedUrl === null) {
				node[SEEN] = true;
				visit(node, visitor);
				if (parent && typeof index$1 === "number") {
					const result = resolveImageBlockPolicy(node, imageBlockPolicy, blockedImageClass);
					if (result.type === "remove") {
						parent.children.splice(index$1, 1);
						return [SKIP, index$1];
					}
					parent.children[index$1] = result.element;
				}
				return SKIP;
			} else {
				node.properties.src = transformedUrl;
				return true;
			}
		}
		return true;
	};
	return visitor;
};
var env = typeof self === "object" ? self : globalThis;
var deserializer = ($$2, _) => {
	const as$1 = (out, index$1) => {
		$$2.set(index$1, out);
		return out;
	};
	const unpair = (index$1) => {
		if ($$2.has(index$1)) return $$2.get(index$1);
		const [type, value] = _[index$1];
		switch (type) {
			case 0:
			case -1: return as$1(value, index$1);
			case 1: {
				const arr = as$1([], index$1);
				for (const index$2 of value) arr.push(unpair(index$2));
				return arr;
			}
			case 2: {
				const object = as$1({}, index$1);
				for (const [key, index$2] of value) object[unpair(key)] = unpair(index$2);
				return object;
			}
			case 3: return as$1(new Date(value), index$1);
			case 4: {
				const { source, flags } = value;
				return as$1(new RegExp(source, flags), index$1);
			}
			case 5: {
				const map = as$1(/* @__PURE__ */ new Map(), index$1);
				for (const [key, index$2] of value) map.set(unpair(key), unpair(index$2));
				return map;
			}
			case 6: {
				const set = as$1(/* @__PURE__ */ new Set(), index$1);
				for (const index$2 of value) set.add(unpair(index$2));
				return set;
			}
			case 7: {
				const { name: name$1, message } = value;
				return as$1(new env[name$1](message), index$1);
			}
			case 8: return as$1(BigInt(value), index$1);
			case "BigInt": return as$1(Object(BigInt(value)), index$1);
			case "ArrayBuffer": return as$1(new Uint8Array(value).buffer, value);
			case "DataView": {
				const { buffer } = new Uint8Array(value);
				return as$1(new DataView(buffer), value);
			}
		}
		return as$1(new env[type](value), index$1);
	};
	return unpair;
};
const deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
var EMPTY = "";
var { toString } = {};
var { keys } = Object;
var typeOf = (value) => {
	const type = typeof value;
	if (type !== "object" || !value) return [0, type];
	const asString = toString.call(value).slice(8, -1);
	switch (asString) {
		case "Array": return [1, EMPTY];
		case "Object": return [2, EMPTY];
		case "Date": return [3, EMPTY];
		case "RegExp": return [4, EMPTY];
		case "Map": return [5, EMPTY];
		case "Set": return [6, EMPTY];
		case "DataView": return [1, asString];
	}
	if (asString.includes("Array")) return [1, asString];
	if (asString.includes("Error")) return [7, asString];
	return [2, asString];
};
var shouldSkip = ([TYPE, type]) => TYPE === 0 && (type === "function" || type === "symbol");
var serializer = (strict, json, $$2, _) => {
	const as$1 = (out, value) => {
		const index$1 = _.push(out) - 1;
		$$2.set(value, index$1);
		return index$1;
	};
	const pair = (value) => {
		if ($$2.has(value)) return $$2.get(value);
		let [TYPE, type] = typeOf(value);
		switch (TYPE) {
			case 0: {
				let entry = value;
				switch (type) {
					case "bigint":
						TYPE = 8;
						entry = value.toString();
						break;
					case "function":
					case "symbol":
						if (strict) throw new TypeError("unable to serialize " + type);
						entry = null;
						break;
					case "undefined": return as$1([-1], value);
				}
				return as$1([TYPE, entry], value);
			}
			case 1: {
				if (type) {
					let spread = value;
					if (type === "DataView") spread = new Uint8Array(value.buffer);
					else if (type === "ArrayBuffer") spread = new Uint8Array(value);
					return as$1([type, [...spread]], value);
				}
				const arr = [];
				const index$1 = as$1([TYPE, arr], value);
				for (const entry of value) arr.push(pair(entry));
				return index$1;
			}
			case 2: {
				if (type) switch (type) {
					case "BigInt": return as$1([type, value.toString()], value);
					case "Boolean":
					case "Number":
					case "String": return as$1([type, value.valueOf()], value);
				}
				if (json && "toJSON" in value) return pair(value.toJSON());
				const entries = [];
				const index$1 = as$1([TYPE, entries], value);
				for (const key of keys(value)) if (strict || !shouldSkip(typeOf(value[key]))) entries.push([pair(key), pair(value[key])]);
				return index$1;
			}
			case 3: return as$1([TYPE, value.toISOString()], value);
			case 4: {
				const { source, flags } = value;
				return as$1([TYPE, {
					source,
					flags
				}], value);
			}
			case 5: {
				const entries = [];
				const index$1 = as$1([TYPE, entries], value);
				for (const [key, entry] of value) if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry)))) entries.push([pair(key), pair(entry)]);
				return index$1;
			}
			case 6: {
				const entries = [];
				const index$1 = as$1([TYPE, entries], value);
				for (const entry of value) if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
				return index$1;
			}
		}
		const { message } = value;
		return as$1([TYPE, {
			name: type,
			message
		}], value);
	};
	return pair;
};
const serialize$1 = (value, { json, lossy } = {}) => {
	const _ = [];
	return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
};
var esm_default = typeof structuredClone === "function" ? (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize$1(any, options)) : structuredClone(any) : (any, options) => deserialize(serialize$1(any, options));
var search = /[#.]/g;
function parseSelector(selector, defaultTagName) {
	const value = selector || "";
	const props = {};
	let start = 0;
	let previous$1;
	let tagName;
	while (start < value.length) {
		search.lastIndex = start;
		const match = search.exec(value);
		const subvalue = value.slice(start, match ? match.index : value.length);
		if (subvalue) {
			if (!previous$1) tagName = subvalue;
			else if (previous$1 === "#") props.id = subvalue;
			else if (Array.isArray(props.className)) props.className.push(subvalue);
			else props.className = [subvalue];
			start += subvalue.length;
		}
		if (match) {
			previous$1 = match[0];
			start++;
		}
	}
	return {
		type: "element",
		tagName: tagName || defaultTagName || "div",
		properties: props,
		children: []
	};
}
function createH(schema, defaultTagName, caseSensitive) {
	const adjust = caseSensitive ? createAdjustMap(caseSensitive) : void 0;
	function h$2(selector, properties$1, ...children$1) {
		let node;
		if (selector === null || selector === void 0) {
			node = {
				type: "root",
				children: []
			};
			const child = properties$1;
			children$1.unshift(child);
		} else {
			node = parseSelector(selector, defaultTagName);
			const lower = node.tagName.toLowerCase();
			const adjusted = adjust ? adjust.get(lower) : void 0;
			node.tagName = adjusted || lower;
			if (isChild(properties$1)) children$1.unshift(properties$1);
			else for (const [key, value] of Object.entries(properties$1)) addProperty(schema, node.properties, key, value);
		}
		for (const child of children$1) addChild(node.children, child);
		if (node.type === "element" && node.tagName === "template") {
			node.content = {
				type: "root",
				children: node.children
			};
			node.children = [];
		}
		return node;
	}
	return h$2;
}
function isChild(value) {
	if (value === null || typeof value !== "object" || Array.isArray(value)) return true;
	if (typeof value.type !== "string") return false;
	const record = value;
	const keys$1 = Object.keys(value);
	for (const key of keys$1) {
		const value$1 = record[key];
		if (value$1 && typeof value$1 === "object") {
			if (!Array.isArray(value$1)) return true;
			const list$1 = value$1;
			for (const item of list$1) if (typeof item !== "number" && typeof item !== "string") return true;
		}
	}
	if ("children" in value && Array.isArray(value.children)) return true;
	return false;
}
function addProperty(schema, properties$1, key, value) {
	const info = find(schema, key);
	let result;
	if (value === null || value === void 0) return;
	if (typeof value === "number") {
		if (Number.isNaN(value)) return;
		result = value;
	} else if (typeof value === "boolean") result = value;
	else if (typeof value === "string") if (info.spaceSeparated) result = parse$1(value);
	else if (info.commaSeparated) result = parse(value);
	else if (info.commaOrSpaceSeparated) result = parse$1(parse(value).join(" "));
	else result = parsePrimitive(info, info.property, value);
	else if (Array.isArray(value)) result = [...value];
	else result = info.property === "style" ? style(value) : String(value);
	if (Array.isArray(result)) {
		const finalResult = [];
		for (const item of result) finalResult.push(parsePrimitive(info, info.property, item));
		result = finalResult;
	}
	if (info.property === "className" && Array.isArray(properties$1.className)) result = properties$1.className.concat(result);
	properties$1[info.property] = result;
}
function addChild(nodes, value) {
	if (value === null || value === void 0) {} else if (typeof value === "number" || typeof value === "string") nodes.push({
		type: "text",
		value: String(value)
	});
	else if (Array.isArray(value)) for (const child of value) addChild(nodes, child);
	else if (typeof value === "object" && "type" in value) if (value.type === "root") addChild(nodes, value.children);
	else nodes.push(value);
	else throw new Error("Expected node, nodes, or string, got `" + value + "`");
}
function parsePrimitive(info, name$1, value) {
	if (typeof value === "string") {
		if (info.number && value && !Number.isNaN(Number(value))) return Number(value);
		if ((info.boolean || info.overloadedBoolean) && (value === "" || normalize(value) === normalize(name$1))) return true;
	}
	return value;
}
function style(styles) {
	const result = [];
	for (const [key, value] of Object.entries(styles)) result.push([key, value].join(": "));
	return result.join("; ");
}
function createAdjustMap(values) {
	const result = /* @__PURE__ */ new Map();
	for (const value of values) result.set(value.toLowerCase(), value);
	return result;
}
const svgCaseSensitiveTagNames = [
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"solidColor",
	"textArea",
	"textPath"
];
const h$1 = createH(html$1, "div");
const s = createH(svg, "g", svgCaseSensitiveTagNames);
function location(file) {
	const value = String(file);
	const indices = [];
	return {
		toOffset,
		toPoint
	};
	function toPoint(offset) {
		if (typeof offset === "number" && offset > -1 && offset <= value.length) {
			let index$1 = 0;
			while (true) {
				let end = indices[index$1];
				if (end === void 0) {
					const eol = next(value, indices[index$1 - 1]);
					end = eol === -1 ? value.length + 1 : eol + 1;
					indices[index$1] = end;
				}
				if (end > offset) return {
					line: index$1 + 1,
					column: offset - (index$1 > 0 ? indices[index$1 - 1] : 0) + 1,
					offset
				};
				index$1++;
			}
		}
	}
	function toOffset(point$2) {
		if (point$2 && typeof point$2.line === "number" && typeof point$2.column === "number" && !Number.isNaN(point$2.line) && !Number.isNaN(point$2.column)) {
			while (indices.length < point$2.line) {
				const from = indices[indices.length - 1];
				const eol = next(value, from);
				const end = eol === -1 ? value.length + 1 : eol + 1;
				if (from === end) break;
				indices.push(end);
			}
			const offset = (point$2.line > 1 ? indices[point$2.line - 2] : 0) + point$2.column - 1;
			if (offset < indices[point$2.line - 1]) return offset;
		}
	}
}
function next(value, from) {
	const cr$1 = value.indexOf("\r", from);
	const lf = value.indexOf("\n", from);
	if (lf === -1) return cr$1;
	if (cr$1 === -1 || cr$1 + 1 === lf) return lf;
	return cr$1 < lf ? cr$1 : lf;
}
const webNamespaces = {
	html: "http://www.w3.org/1999/xhtml",
	mathml: "http://www.w3.org/1998/Math/MathML",
	svg: "http://www.w3.org/2000/svg",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
var own$4 = {}.hasOwnProperty;
var proto = Object.prototype;
function fromParse5(tree, options) {
	const settings = options || {};
	return one$2({
		file: settings.file || void 0,
		location: false,
		schema: settings.space === "svg" ? svg : html$1,
		verbose: settings.verbose || false
	}, tree);
}
function one$2(state, node) {
	let result;
	switch (node.nodeName) {
		case "#comment": {
			const reference = node;
			result = {
				type: "comment",
				value: reference.data
			};
			patch$3(state, reference, result);
			return result;
		}
		case "#document":
		case "#document-fragment": {
			const reference = node;
			const quirksMode = "mode" in reference ? reference.mode === "quirks" || reference.mode === "limited-quirks" : false;
			result = {
				type: "root",
				children: all$2(state, node.childNodes),
				data: { quirksMode }
			};
			if (state.file && state.location) {
				const document$1 = String(state.file);
				const loc = location(document$1);
				const start = loc.toPoint(0);
				const end = loc.toPoint(document$1.length);
				result.position = {
					start,
					end
				};
			}
			return result;
		}
		case "#documentType": {
			const reference = node;
			result = { type: "doctype" };
			patch$3(state, reference, result);
			return result;
		}
		case "#text": {
			const reference = node;
			result = {
				type: "text",
				value: reference.value
			};
			patch$3(state, reference, result);
			return result;
		}
		default:
			result = element$4(state, node);
			return result;
	}
}
function all$2(state, nodes) {
	let index$1 = -1;
	const results = [];
	while (++index$1 < nodes.length) {
		const result = one$2(state, nodes[index$1]);
		results.push(result);
	}
	return results;
}
function element$4(state, node) {
	const schema = state.schema;
	state.schema = node.namespaceURI === webNamespaces.svg ? svg : html$1;
	let index$1 = -1;
	const properties$1 = {};
	while (++index$1 < node.attrs.length) {
		const attribute = node.attrs[index$1];
		const name$1 = (attribute.prefix ? attribute.prefix + ":" : "") + attribute.name;
		if (!own$4.call(proto, name$1)) properties$1[name$1] = attribute.value;
	}
	const result = (state.schema.space === "svg" ? s : h$1)(node.tagName, properties$1, all$2(state, node.childNodes));
	patch$3(state, node, result);
	if (result.tagName === "template") {
		const reference = node;
		const pos = reference.sourceCodeLocation;
		const startTag$1 = pos && pos.startTag && position$1(pos.startTag);
		const endTag$1 = pos && pos.endTag && position$1(pos.endTag);
		const content = one$2(state, reference.content);
		if (startTag$1 && endTag$1 && state.file) content.position = {
			start: startTag$1.end,
			end: endTag$1.start
		};
		result.content = content;
	}
	state.schema = schema;
	return result;
}
function patch$3(state, from, to) {
	if ("sourceCodeLocation" in from && from.sourceCodeLocation && state.file) {
		const position$2 = createLocation(state, to, from.sourceCodeLocation);
		if (position$2) {
			state.location = true;
			to.position = position$2;
		}
	}
}
function createLocation(state, node, location$1) {
	const result = position$1(location$1);
	if (node.type === "element") {
		const tail = node.children[node.children.length - 1];
		if (result && !location$1.endTag && tail && tail.position && tail.position.end) result.end = Object.assign({}, tail.position.end);
		if (state.verbose) {
			const properties$1 = {};
			let key;
			if (location$1.attrs) {
				for (key in location$1.attrs) if (own$4.call(location$1.attrs, key)) properties$1[find(state.schema, key).property] = position$1(location$1.attrs[key]);
			}
			location$1.startTag;
			const opening = position$1(location$1.startTag);
			const closing = location$1.endTag ? position$1(location$1.endTag) : void 0;
			const data = { opening };
			if (closing) data.closing = closing;
			data.properties = properties$1;
			node.data = { position: data };
		}
	}
	return result;
}
function position$1(loc) {
	const start = point$1({
		line: loc.startLine,
		column: loc.startCol,
		offset: loc.startOffset
	});
	const end = point$1({
		line: loc.endLine,
		column: loc.endCol,
		offset: loc.endOffset
	});
	return start || end ? {
		start,
		end
	} : void 0;
}
function point$1(point$2) {
	return point$2.line && point$2.column ? point$2 : void 0;
}
var emptyOptions$3 = {};
var own$3 = {}.hasOwnProperty;
var one$1 = zwitch("type", { handlers: {
	root: root$4,
	element: element$3,
	text: text$5,
	comment: comment$2,
	doctype: doctype$2
} });
function toParse5(tree, options) {
	const space$1 = (options || emptyOptions$3).space;
	return one$1(tree, space$1 === "svg" ? svg : html$1);
}
function root$4(node, schema) {
	const result = {
		nodeName: "#document",
		mode: (node.data || {}).quirksMode ? "quirks" : "no-quirks",
		childNodes: []
	};
	result.childNodes = all$1(node.children, result, schema);
	patch$2(node, result);
	return result;
}
function fragment(node, schema) {
	const result = {
		nodeName: "#document-fragment",
		childNodes: []
	};
	result.childNodes = all$1(node.children, result, schema);
	patch$2(node, result);
	return result;
}
function doctype$2(node) {
	const result = {
		nodeName: "#documentType",
		name: "html",
		publicId: "",
		systemId: "",
		parentNode: null
	};
	patch$2(node, result);
	return result;
}
function text$5(node) {
	const result = {
		nodeName: "#text",
		value: node.value,
		parentNode: null
	};
	patch$2(node, result);
	return result;
}
function comment$2(node) {
	const result = {
		nodeName: "#comment",
		data: node.value,
		parentNode: null
	};
	patch$2(node, result);
	return result;
}
function element$3(node, schema) {
	const parentSchema = schema;
	let currentSchema = parentSchema;
	if (node.type === "element" && node.tagName.toLowerCase() === "svg" && parentSchema.space === "html") currentSchema = svg;
	const attrs = [];
	let prop;
	if (node.properties) {
		for (prop in node.properties) if (prop !== "children" && own$3.call(node.properties, prop)) {
			const result$1 = createProperty$1(currentSchema, prop, node.properties[prop]);
			if (result$1) attrs.push(result$1);
		}
	}
	const space$1 = currentSchema.space;
	const result = {
		nodeName: node.tagName,
		tagName: node.tagName,
		attrs,
		namespaceURI: webNamespaces[space$1],
		childNodes: [],
		parentNode: null
	};
	result.childNodes = all$1(node.children, result, currentSchema);
	patch$2(node, result);
	if (node.tagName === "template" && node.content) result.content = fragment(node.content, currentSchema);
	return result;
}
function createProperty$1(schema, prop, value) {
	const info = find(schema, prop);
	if (value === false || value === null || value === void 0 || typeof value === "number" && Number.isNaN(value) || !value && info.boolean) return;
	if (Array.isArray(value)) value = info.commaSeparated ? stringify(value) : stringify$1(value);
	const attribute = {
		name: info.attribute,
		value: value === true ? "" : String(value)
	};
	if (info.space && info.space !== "html" && info.space !== "svg") {
		const index$1 = attribute.name.indexOf(":");
		if (index$1 < 0) attribute.prefix = "";
		else {
			attribute.name = attribute.name.slice(index$1 + 1);
			attribute.prefix = info.attribute.slice(0, index$1);
		}
		attribute.namespace = webNamespaces[info.space];
	}
	return attribute;
}
function all$1(children$1, parentNode, schema) {
	let index$1 = -1;
	const results = [];
	if (children$1) while (++index$1 < children$1.length) {
		const child = one$1(children$1[index$1], schema);
		child.parentNode = parentNode;
		results.push(child);
	}
	return results;
}
function patch$2(from, to) {
	const position$2 = from.position;
	if (position$2 && position$2.start && position$2.end) {
		position$2.start.offset;
		position$2.end.offset;
		to.sourceCodeLocation = {
			startLine: position$2.start.line,
			startCol: position$2.start.column,
			startOffset: position$2.start.offset,
			endLine: position$2.end.line,
			endCol: position$2.end.column,
			endOffset: position$2.end.offset
		};
	}
}
var UNDEFINED_CODE_POINTS = new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]);
var CODE_POINTS;
(function(CODE_POINTS$1) {
	CODE_POINTS$1[CODE_POINTS$1["EOF"] = -1] = "EOF";
	CODE_POINTS$1[CODE_POINTS$1["NULL"] = 0] = "NULL";
	CODE_POINTS$1[CODE_POINTS$1["TABULATION"] = 9] = "TABULATION";
	CODE_POINTS$1[CODE_POINTS$1["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
	CODE_POINTS$1[CODE_POINTS$1["LINE_FEED"] = 10] = "LINE_FEED";
	CODE_POINTS$1[CODE_POINTS$1["FORM_FEED"] = 12] = "FORM_FEED";
	CODE_POINTS$1[CODE_POINTS$1["SPACE"] = 32] = "SPACE";
	CODE_POINTS$1[CODE_POINTS$1["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
	CODE_POINTS$1[CODE_POINTS$1["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
	CODE_POINTS$1[CODE_POINTS$1["AMPERSAND"] = 38] = "AMPERSAND";
	CODE_POINTS$1[CODE_POINTS$1["APOSTROPHE"] = 39] = "APOSTROPHE";
	CODE_POINTS$1[CODE_POINTS$1["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
	CODE_POINTS$1[CODE_POINTS$1["SOLIDUS"] = 47] = "SOLIDUS";
	CODE_POINTS$1[CODE_POINTS$1["DIGIT_0"] = 48] = "DIGIT_0";
	CODE_POINTS$1[CODE_POINTS$1["DIGIT_9"] = 57] = "DIGIT_9";
	CODE_POINTS$1[CODE_POINTS$1["SEMICOLON"] = 59] = "SEMICOLON";
	CODE_POINTS$1[CODE_POINTS$1["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
	CODE_POINTS$1[CODE_POINTS$1["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
	CODE_POINTS$1[CODE_POINTS$1["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
	CODE_POINTS$1[CODE_POINTS$1["QUESTION_MARK"] = 63] = "QUESTION_MARK";
	CODE_POINTS$1[CODE_POINTS$1["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
	CODE_POINTS$1[CODE_POINTS$1["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
	CODE_POINTS$1[CODE_POINTS$1["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
	CODE_POINTS$1[CODE_POINTS$1["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
	CODE_POINTS$1[CODE_POINTS$1["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
	CODE_POINTS$1[CODE_POINTS$1["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
const SEQUENCES = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function isSurrogate(cp) {
	return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
	return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
	return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
	return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
	return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}
var ERR;
(function(ERR$1) {
	ERR$1["controlCharacterInInputStream"] = "control-character-in-input-stream";
	ERR$1["noncharacterInInputStream"] = "noncharacter-in-input-stream";
	ERR$1["surrogateInInputStream"] = "surrogate-in-input-stream";
	ERR$1["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
	ERR$1["endTagWithAttributes"] = "end-tag-with-attributes";
	ERR$1["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
	ERR$1["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
	ERR$1["unexpectedNullCharacter"] = "unexpected-null-character";
	ERR$1["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
	ERR$1["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
	ERR$1["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
	ERR$1["missingEndTagName"] = "missing-end-tag-name";
	ERR$1["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
	ERR$1["unknownNamedCharacterReference"] = "unknown-named-character-reference";
	ERR$1["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
	ERR$1["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
	ERR$1["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
	ERR$1["eofBeforeTagName"] = "eof-before-tag-name";
	ERR$1["eofInTag"] = "eof-in-tag";
	ERR$1["missingAttributeValue"] = "missing-attribute-value";
	ERR$1["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
	ERR$1["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
	ERR$1["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
	ERR$1["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
	ERR$1["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
	ERR$1["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
	ERR$1["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
	ERR$1["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
	ERR$1["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
	ERR$1["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
	ERR$1["cdataInHtmlContent"] = "cdata-in-html-content";
	ERR$1["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
	ERR$1["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
	ERR$1["eofInDoctype"] = "eof-in-doctype";
	ERR$1["nestedComment"] = "nested-comment";
	ERR$1["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
	ERR$1["eofInComment"] = "eof-in-comment";
	ERR$1["incorrectlyClosedComment"] = "incorrectly-closed-comment";
	ERR$1["eofInCdata"] = "eof-in-cdata";
	ERR$1["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
	ERR$1["nullCharacterReference"] = "null-character-reference";
	ERR$1["surrogateCharacterReference"] = "surrogate-character-reference";
	ERR$1["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
	ERR$1["controlCharacterReference"] = "control-character-reference";
	ERR$1["noncharacterCharacterReference"] = "noncharacter-character-reference";
	ERR$1["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
	ERR$1["missingDoctypeName"] = "missing-doctype-name";
	ERR$1["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
	ERR$1["duplicateAttribute"] = "duplicate-attribute";
	ERR$1["nonConformingDoctype"] = "non-conforming-doctype";
	ERR$1["missingDoctype"] = "missing-doctype";
	ERR$1["misplacedDoctype"] = "misplaced-doctype";
	ERR$1["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
	ERR$1["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
	ERR$1["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
	ERR$1["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
	ERR$1["abandonedHeadElementChild"] = "abandoned-head-element-child";
	ERR$1["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
	ERR$1["nestedNoscriptInHead"] = "nested-noscript-in-head";
	ERR$1["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));
var DEFAULT_BUFFER_WATERLINE = 65536;
var Preprocessor = class {
	constructor(handler) {
		this.handler = handler;
		this.html = "";
		this.pos = -1;
		this.lastGapPos = -2;
		this.gapStack = [];
		this.skipNextNewLine = false;
		this.lastChunkWritten = false;
		this.endOfChunkHit = false;
		this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
		this.isEol = false;
		this.lineStartPos = 0;
		this.droppedBufferSize = 0;
		this.line = 1;
		this.lastErrOffset = -1;
	}
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.pos;
	}
	getError(code$2, cpOffset) {
		const { line, col, offset } = this;
		const startCol = col + cpOffset;
		const startOffset = offset + cpOffset;
		return {
			code: code$2,
			startLine: line,
			endLine: line,
			startCol,
			endCol: startCol,
			startOffset,
			endOffset: startOffset
		};
	}
	_err(code$2) {
		if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
			this.lastErrOffset = this.offset;
			this.handler.onParseError(this.getError(code$2, 0));
		}
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos);
		this.lastGapPos = this.pos;
	}
	_processSurrogate(cp) {
		if (this.pos !== this.html.length - 1) {
			const nextCp = this.html.charCodeAt(this.pos + 1);
			if (isSurrogatePair(nextCp)) {
				this.pos++;
				this._addGap();
				return getSurrogatePairCodePoint(cp, nextCp);
			}
		} else if (!this.lastChunkWritten) {
			this.endOfChunkHit = true;
			return CODE_POINTS.EOF;
		}
		this._err(ERR.surrogateInInputStream);
		return cp;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk() {
		if (this.willDropParsedChunk()) {
			this.html = this.html.substring(this.pos);
			this.lineStartPos -= this.pos;
			this.droppedBufferSize += this.pos;
			this.pos = 0;
			this.lastGapPos = -2;
			this.gapStack.length = 0;
		}
	}
	write(chunk, isLastChunk) {
		if (this.html.length > 0) this.html += chunk;
		else this.html = chunk;
		this.endOfChunkHit = false;
		this.lastChunkWritten = isLastChunk;
	}
	insertHtmlAtCurrentPos(chunk) {
		this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
		this.endOfChunkHit = false;
	}
	startsWith(pattern, caseSensitive) {
		if (this.pos + pattern.length > this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return false;
		}
		if (caseSensitive) return this.html.startsWith(pattern, this.pos);
		for (let i = 0; i < pattern.length; i++) if ((this.html.charCodeAt(this.pos + i) | 32) !== pattern.charCodeAt(i)) return false;
		return true;
	}
	peek(offset) {
		const pos = this.pos + offset;
		if (pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		const code$2 = this.html.charCodeAt(pos);
		return code$2 === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code$2;
	}
	advance() {
		this.pos++;
		if (this.isEol) {
			this.isEol = false;
			this.line++;
			this.lineStartPos = this.pos;
		}
		if (this.pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		let cp = this.html.charCodeAt(this.pos);
		if (cp === CODE_POINTS.CARRIAGE_RETURN) {
			this.isEol = true;
			this.skipNextNewLine = true;
			return CODE_POINTS.LINE_FEED;
		}
		if (cp === CODE_POINTS.LINE_FEED) {
			this.isEol = true;
			if (this.skipNextNewLine) {
				this.line--;
				this.skipNextNewLine = false;
				this._addGap();
				return this.advance();
			}
		}
		this.skipNextNewLine = false;
		if (isSurrogate(cp)) cp = this._processSurrogate(cp);
		if (!(this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976)) this._checkForProblematicCharacters(cp);
		return cp;
	}
	_checkForProblematicCharacters(cp) {
		if (isControlCodePoint(cp)) this._err(ERR.controlCharacterInInputStream);
		else if (isUndefinedCodePoint(cp)) this._err(ERR.noncharacterInInputStream);
	}
	retreat(count) {
		this.pos -= count;
		while (this.pos < this.lastGapPos) {
			this.lastGapPos = this.gapStack.pop();
			this.pos--;
		}
		this.isEol = false;
	}
};
var TokenType;
(function(TokenType$1) {
	TokenType$1[TokenType$1["CHARACTER"] = 0] = "CHARACTER";
	TokenType$1[TokenType$1["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
	TokenType$1[TokenType$1["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
	TokenType$1[TokenType$1["START_TAG"] = 3] = "START_TAG";
	TokenType$1[TokenType$1["END_TAG"] = 4] = "END_TAG";
	TokenType$1[TokenType$1["COMMENT"] = 5] = "COMMENT";
	TokenType$1[TokenType$1["DOCTYPE"] = 6] = "DOCTYPE";
	TokenType$1[TokenType$1["EOF"] = 7] = "EOF";
	TokenType$1[TokenType$1["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
	for (let i = token.attrs.length - 1; i >= 0; i--) if (token.attrs[i].name === attrName) return token.attrs[i].value;
	return null;
}
var NS;
(function(NS$1) {
	NS$1["HTML"] = "http://www.w3.org/1999/xhtml";
	NS$1["MATHML"] = "http://www.w3.org/1998/Math/MathML";
	NS$1["SVG"] = "http://www.w3.org/2000/svg";
	NS$1["XLINK"] = "http://www.w3.org/1999/xlink";
	NS$1["XML"] = "http://www.w3.org/XML/1998/namespace";
	NS$1["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS$1) {
	ATTRS$1["TYPE"] = "type";
	ATTRS$1["ACTION"] = "action";
	ATTRS$1["ENCODING"] = "encoding";
	ATTRS$1["PROMPT"] = "prompt";
	ATTRS$1["NAME"] = "name";
	ATTRS$1["COLOR"] = "color";
	ATTRS$1["FACE"] = "face";
	ATTRS$1["SIZE"] = "size";
})(ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE$1) {
	DOCUMENT_MODE$1["NO_QUIRKS"] = "no-quirks";
	DOCUMENT_MODE$1["QUIRKS"] = "quirks";
	DOCUMENT_MODE$1["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES$1) {
	TAG_NAMES$1["A"] = "a";
	TAG_NAMES$1["ADDRESS"] = "address";
	TAG_NAMES$1["ANNOTATION_XML"] = "annotation-xml";
	TAG_NAMES$1["APPLET"] = "applet";
	TAG_NAMES$1["AREA"] = "area";
	TAG_NAMES$1["ARTICLE"] = "article";
	TAG_NAMES$1["ASIDE"] = "aside";
	TAG_NAMES$1["B"] = "b";
	TAG_NAMES$1["BASE"] = "base";
	TAG_NAMES$1["BASEFONT"] = "basefont";
	TAG_NAMES$1["BGSOUND"] = "bgsound";
	TAG_NAMES$1["BIG"] = "big";
	TAG_NAMES$1["BLOCKQUOTE"] = "blockquote";
	TAG_NAMES$1["BODY"] = "body";
	TAG_NAMES$1["BR"] = "br";
	TAG_NAMES$1["BUTTON"] = "button";
	TAG_NAMES$1["CAPTION"] = "caption";
	TAG_NAMES$1["CENTER"] = "center";
	TAG_NAMES$1["CODE"] = "code";
	TAG_NAMES$1["COL"] = "col";
	TAG_NAMES$1["COLGROUP"] = "colgroup";
	TAG_NAMES$1["DD"] = "dd";
	TAG_NAMES$1["DESC"] = "desc";
	TAG_NAMES$1["DETAILS"] = "details";
	TAG_NAMES$1["DIALOG"] = "dialog";
	TAG_NAMES$1["DIR"] = "dir";
	TAG_NAMES$1["DIV"] = "div";
	TAG_NAMES$1["DL"] = "dl";
	TAG_NAMES$1["DT"] = "dt";
	TAG_NAMES$1["EM"] = "em";
	TAG_NAMES$1["EMBED"] = "embed";
	TAG_NAMES$1["FIELDSET"] = "fieldset";
	TAG_NAMES$1["FIGCAPTION"] = "figcaption";
	TAG_NAMES$1["FIGURE"] = "figure";
	TAG_NAMES$1["FONT"] = "font";
	TAG_NAMES$1["FOOTER"] = "footer";
	TAG_NAMES$1["FOREIGN_OBJECT"] = "foreignObject";
	TAG_NAMES$1["FORM"] = "form";
	TAG_NAMES$1["FRAME"] = "frame";
	TAG_NAMES$1["FRAMESET"] = "frameset";
	TAG_NAMES$1["H1"] = "h1";
	TAG_NAMES$1["H2"] = "h2";
	TAG_NAMES$1["H3"] = "h3";
	TAG_NAMES$1["H4"] = "h4";
	TAG_NAMES$1["H5"] = "h5";
	TAG_NAMES$1["H6"] = "h6";
	TAG_NAMES$1["HEAD"] = "head";
	TAG_NAMES$1["HEADER"] = "header";
	TAG_NAMES$1["HGROUP"] = "hgroup";
	TAG_NAMES$1["HR"] = "hr";
	TAG_NAMES$1["HTML"] = "html";
	TAG_NAMES$1["I"] = "i";
	TAG_NAMES$1["IMG"] = "img";
	TAG_NAMES$1["IMAGE"] = "image";
	TAG_NAMES$1["INPUT"] = "input";
	TAG_NAMES$1["IFRAME"] = "iframe";
	TAG_NAMES$1["KEYGEN"] = "keygen";
	TAG_NAMES$1["LABEL"] = "label";
	TAG_NAMES$1["LI"] = "li";
	TAG_NAMES$1["LINK"] = "link";
	TAG_NAMES$1["LISTING"] = "listing";
	TAG_NAMES$1["MAIN"] = "main";
	TAG_NAMES$1["MALIGNMARK"] = "malignmark";
	TAG_NAMES$1["MARQUEE"] = "marquee";
	TAG_NAMES$1["MATH"] = "math";
	TAG_NAMES$1["MENU"] = "menu";
	TAG_NAMES$1["META"] = "meta";
	TAG_NAMES$1["MGLYPH"] = "mglyph";
	TAG_NAMES$1["MI"] = "mi";
	TAG_NAMES$1["MO"] = "mo";
	TAG_NAMES$1["MN"] = "mn";
	TAG_NAMES$1["MS"] = "ms";
	TAG_NAMES$1["MTEXT"] = "mtext";
	TAG_NAMES$1["NAV"] = "nav";
	TAG_NAMES$1["NOBR"] = "nobr";
	TAG_NAMES$1["NOFRAMES"] = "noframes";
	TAG_NAMES$1["NOEMBED"] = "noembed";
	TAG_NAMES$1["NOSCRIPT"] = "noscript";
	TAG_NAMES$1["OBJECT"] = "object";
	TAG_NAMES$1["OL"] = "ol";
	TAG_NAMES$1["OPTGROUP"] = "optgroup";
	TAG_NAMES$1["OPTION"] = "option";
	TAG_NAMES$1["P"] = "p";
	TAG_NAMES$1["PARAM"] = "param";
	TAG_NAMES$1["PLAINTEXT"] = "plaintext";
	TAG_NAMES$1["PRE"] = "pre";
	TAG_NAMES$1["RB"] = "rb";
	TAG_NAMES$1["RP"] = "rp";
	TAG_NAMES$1["RT"] = "rt";
	TAG_NAMES$1["RTC"] = "rtc";
	TAG_NAMES$1["RUBY"] = "ruby";
	TAG_NAMES$1["S"] = "s";
	TAG_NAMES$1["SCRIPT"] = "script";
	TAG_NAMES$1["SEARCH"] = "search";
	TAG_NAMES$1["SECTION"] = "section";
	TAG_NAMES$1["SELECT"] = "select";
	TAG_NAMES$1["SOURCE"] = "source";
	TAG_NAMES$1["SMALL"] = "small";
	TAG_NAMES$1["SPAN"] = "span";
	TAG_NAMES$1["STRIKE"] = "strike";
	TAG_NAMES$1["STRONG"] = "strong";
	TAG_NAMES$1["STYLE"] = "style";
	TAG_NAMES$1["SUB"] = "sub";
	TAG_NAMES$1["SUMMARY"] = "summary";
	TAG_NAMES$1["SUP"] = "sup";
	TAG_NAMES$1["TABLE"] = "table";
	TAG_NAMES$1["TBODY"] = "tbody";
	TAG_NAMES$1["TEMPLATE"] = "template";
	TAG_NAMES$1["TEXTAREA"] = "textarea";
	TAG_NAMES$1["TFOOT"] = "tfoot";
	TAG_NAMES$1["TD"] = "td";
	TAG_NAMES$1["TH"] = "th";
	TAG_NAMES$1["THEAD"] = "thead";
	TAG_NAMES$1["TITLE"] = "title";
	TAG_NAMES$1["TR"] = "tr";
	TAG_NAMES$1["TRACK"] = "track";
	TAG_NAMES$1["TT"] = "tt";
	TAG_NAMES$1["U"] = "u";
	TAG_NAMES$1["UL"] = "ul";
	TAG_NAMES$1["SVG"] = "svg";
	TAG_NAMES$1["VAR"] = "var";
	TAG_NAMES$1["WBR"] = "wbr";
	TAG_NAMES$1["XMP"] = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID$1) {
	TAG_ID$1[TAG_ID$1["UNKNOWN"] = 0] = "UNKNOWN";
	TAG_ID$1[TAG_ID$1["A"] = 1] = "A";
	TAG_ID$1[TAG_ID$1["ADDRESS"] = 2] = "ADDRESS";
	TAG_ID$1[TAG_ID$1["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
	TAG_ID$1[TAG_ID$1["APPLET"] = 4] = "APPLET";
	TAG_ID$1[TAG_ID$1["AREA"] = 5] = "AREA";
	TAG_ID$1[TAG_ID$1["ARTICLE"] = 6] = "ARTICLE";
	TAG_ID$1[TAG_ID$1["ASIDE"] = 7] = "ASIDE";
	TAG_ID$1[TAG_ID$1["B"] = 8] = "B";
	TAG_ID$1[TAG_ID$1["BASE"] = 9] = "BASE";
	TAG_ID$1[TAG_ID$1["BASEFONT"] = 10] = "BASEFONT";
	TAG_ID$1[TAG_ID$1["BGSOUND"] = 11] = "BGSOUND";
	TAG_ID$1[TAG_ID$1["BIG"] = 12] = "BIG";
	TAG_ID$1[TAG_ID$1["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
	TAG_ID$1[TAG_ID$1["BODY"] = 14] = "BODY";
	TAG_ID$1[TAG_ID$1["BR"] = 15] = "BR";
	TAG_ID$1[TAG_ID$1["BUTTON"] = 16] = "BUTTON";
	TAG_ID$1[TAG_ID$1["CAPTION"] = 17] = "CAPTION";
	TAG_ID$1[TAG_ID$1["CENTER"] = 18] = "CENTER";
	TAG_ID$1[TAG_ID$1["CODE"] = 19] = "CODE";
	TAG_ID$1[TAG_ID$1["COL"] = 20] = "COL";
	TAG_ID$1[TAG_ID$1["COLGROUP"] = 21] = "COLGROUP";
	TAG_ID$1[TAG_ID$1["DD"] = 22] = "DD";
	TAG_ID$1[TAG_ID$1["DESC"] = 23] = "DESC";
	TAG_ID$1[TAG_ID$1["DETAILS"] = 24] = "DETAILS";
	TAG_ID$1[TAG_ID$1["DIALOG"] = 25] = "DIALOG";
	TAG_ID$1[TAG_ID$1["DIR"] = 26] = "DIR";
	TAG_ID$1[TAG_ID$1["DIV"] = 27] = "DIV";
	TAG_ID$1[TAG_ID$1["DL"] = 28] = "DL";
	TAG_ID$1[TAG_ID$1["DT"] = 29] = "DT";
	TAG_ID$1[TAG_ID$1["EM"] = 30] = "EM";
	TAG_ID$1[TAG_ID$1["EMBED"] = 31] = "EMBED";
	TAG_ID$1[TAG_ID$1["FIELDSET"] = 32] = "FIELDSET";
	TAG_ID$1[TAG_ID$1["FIGCAPTION"] = 33] = "FIGCAPTION";
	TAG_ID$1[TAG_ID$1["FIGURE"] = 34] = "FIGURE";
	TAG_ID$1[TAG_ID$1["FONT"] = 35] = "FONT";
	TAG_ID$1[TAG_ID$1["FOOTER"] = 36] = "FOOTER";
	TAG_ID$1[TAG_ID$1["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
	TAG_ID$1[TAG_ID$1["FORM"] = 38] = "FORM";
	TAG_ID$1[TAG_ID$1["FRAME"] = 39] = "FRAME";
	TAG_ID$1[TAG_ID$1["FRAMESET"] = 40] = "FRAMESET";
	TAG_ID$1[TAG_ID$1["H1"] = 41] = "H1";
	TAG_ID$1[TAG_ID$1["H2"] = 42] = "H2";
	TAG_ID$1[TAG_ID$1["H3"] = 43] = "H3";
	TAG_ID$1[TAG_ID$1["H4"] = 44] = "H4";
	TAG_ID$1[TAG_ID$1["H5"] = 45] = "H5";
	TAG_ID$1[TAG_ID$1["H6"] = 46] = "H6";
	TAG_ID$1[TAG_ID$1["HEAD"] = 47] = "HEAD";
	TAG_ID$1[TAG_ID$1["HEADER"] = 48] = "HEADER";
	TAG_ID$1[TAG_ID$1["HGROUP"] = 49] = "HGROUP";
	TAG_ID$1[TAG_ID$1["HR"] = 50] = "HR";
	TAG_ID$1[TAG_ID$1["HTML"] = 51] = "HTML";
	TAG_ID$1[TAG_ID$1["I"] = 52] = "I";
	TAG_ID$1[TAG_ID$1["IMG"] = 53] = "IMG";
	TAG_ID$1[TAG_ID$1["IMAGE"] = 54] = "IMAGE";
	TAG_ID$1[TAG_ID$1["INPUT"] = 55] = "INPUT";
	TAG_ID$1[TAG_ID$1["IFRAME"] = 56] = "IFRAME";
	TAG_ID$1[TAG_ID$1["KEYGEN"] = 57] = "KEYGEN";
	TAG_ID$1[TAG_ID$1["LABEL"] = 58] = "LABEL";
	TAG_ID$1[TAG_ID$1["LI"] = 59] = "LI";
	TAG_ID$1[TAG_ID$1["LINK"] = 60] = "LINK";
	TAG_ID$1[TAG_ID$1["LISTING"] = 61] = "LISTING";
	TAG_ID$1[TAG_ID$1["MAIN"] = 62] = "MAIN";
	TAG_ID$1[TAG_ID$1["MALIGNMARK"] = 63] = "MALIGNMARK";
	TAG_ID$1[TAG_ID$1["MARQUEE"] = 64] = "MARQUEE";
	TAG_ID$1[TAG_ID$1["MATH"] = 65] = "MATH";
	TAG_ID$1[TAG_ID$1["MENU"] = 66] = "MENU";
	TAG_ID$1[TAG_ID$1["META"] = 67] = "META";
	TAG_ID$1[TAG_ID$1["MGLYPH"] = 68] = "MGLYPH";
	TAG_ID$1[TAG_ID$1["MI"] = 69] = "MI";
	TAG_ID$1[TAG_ID$1["MO"] = 70] = "MO";
	TAG_ID$1[TAG_ID$1["MN"] = 71] = "MN";
	TAG_ID$1[TAG_ID$1["MS"] = 72] = "MS";
	TAG_ID$1[TAG_ID$1["MTEXT"] = 73] = "MTEXT";
	TAG_ID$1[TAG_ID$1["NAV"] = 74] = "NAV";
	TAG_ID$1[TAG_ID$1["NOBR"] = 75] = "NOBR";
	TAG_ID$1[TAG_ID$1["NOFRAMES"] = 76] = "NOFRAMES";
	TAG_ID$1[TAG_ID$1["NOEMBED"] = 77] = "NOEMBED";
	TAG_ID$1[TAG_ID$1["NOSCRIPT"] = 78] = "NOSCRIPT";
	TAG_ID$1[TAG_ID$1["OBJECT"] = 79] = "OBJECT";
	TAG_ID$1[TAG_ID$1["OL"] = 80] = "OL";
	TAG_ID$1[TAG_ID$1["OPTGROUP"] = 81] = "OPTGROUP";
	TAG_ID$1[TAG_ID$1["OPTION"] = 82] = "OPTION";
	TAG_ID$1[TAG_ID$1["P"] = 83] = "P";
	TAG_ID$1[TAG_ID$1["PARAM"] = 84] = "PARAM";
	TAG_ID$1[TAG_ID$1["PLAINTEXT"] = 85] = "PLAINTEXT";
	TAG_ID$1[TAG_ID$1["PRE"] = 86] = "PRE";
	TAG_ID$1[TAG_ID$1["RB"] = 87] = "RB";
	TAG_ID$1[TAG_ID$1["RP"] = 88] = "RP";
	TAG_ID$1[TAG_ID$1["RT"] = 89] = "RT";
	TAG_ID$1[TAG_ID$1["RTC"] = 90] = "RTC";
	TAG_ID$1[TAG_ID$1["RUBY"] = 91] = "RUBY";
	TAG_ID$1[TAG_ID$1["S"] = 92] = "S";
	TAG_ID$1[TAG_ID$1["SCRIPT"] = 93] = "SCRIPT";
	TAG_ID$1[TAG_ID$1["SEARCH"] = 94] = "SEARCH";
	TAG_ID$1[TAG_ID$1["SECTION"] = 95] = "SECTION";
	TAG_ID$1[TAG_ID$1["SELECT"] = 96] = "SELECT";
	TAG_ID$1[TAG_ID$1["SOURCE"] = 97] = "SOURCE";
	TAG_ID$1[TAG_ID$1["SMALL"] = 98] = "SMALL";
	TAG_ID$1[TAG_ID$1["SPAN"] = 99] = "SPAN";
	TAG_ID$1[TAG_ID$1["STRIKE"] = 100] = "STRIKE";
	TAG_ID$1[TAG_ID$1["STRONG"] = 101] = "STRONG";
	TAG_ID$1[TAG_ID$1["STYLE"] = 102] = "STYLE";
	TAG_ID$1[TAG_ID$1["SUB"] = 103] = "SUB";
	TAG_ID$1[TAG_ID$1["SUMMARY"] = 104] = "SUMMARY";
	TAG_ID$1[TAG_ID$1["SUP"] = 105] = "SUP";
	TAG_ID$1[TAG_ID$1["TABLE"] = 106] = "TABLE";
	TAG_ID$1[TAG_ID$1["TBODY"] = 107] = "TBODY";
	TAG_ID$1[TAG_ID$1["TEMPLATE"] = 108] = "TEMPLATE";
	TAG_ID$1[TAG_ID$1["TEXTAREA"] = 109] = "TEXTAREA";
	TAG_ID$1[TAG_ID$1["TFOOT"] = 110] = "TFOOT";
	TAG_ID$1[TAG_ID$1["TD"] = 111] = "TD";
	TAG_ID$1[TAG_ID$1["TH"] = 112] = "TH";
	TAG_ID$1[TAG_ID$1["THEAD"] = 113] = "THEAD";
	TAG_ID$1[TAG_ID$1["TITLE"] = 114] = "TITLE";
	TAG_ID$1[TAG_ID$1["TR"] = 115] = "TR";
	TAG_ID$1[TAG_ID$1["TRACK"] = 116] = "TRACK";
	TAG_ID$1[TAG_ID$1["TT"] = 117] = "TT";
	TAG_ID$1[TAG_ID$1["U"] = 118] = "U";
	TAG_ID$1[TAG_ID$1["UL"] = 119] = "UL";
	TAG_ID$1[TAG_ID$1["SVG"] = 120] = "SVG";
	TAG_ID$1[TAG_ID$1["VAR"] = 121] = "VAR";
	TAG_ID$1[TAG_ID$1["WBR"] = 122] = "WBR";
	TAG_ID$1[TAG_ID$1["XMP"] = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
var TAG_NAME_TO_ID = new Map([
	[TAG_NAMES.A, TAG_ID.A],
	[TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
	[TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
	[TAG_NAMES.APPLET, TAG_ID.APPLET],
	[TAG_NAMES.AREA, TAG_ID.AREA],
	[TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
	[TAG_NAMES.ASIDE, TAG_ID.ASIDE],
	[TAG_NAMES.B, TAG_ID.B],
	[TAG_NAMES.BASE, TAG_ID.BASE],
	[TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
	[TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
	[TAG_NAMES.BIG, TAG_ID.BIG],
	[TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
	[TAG_NAMES.BODY, TAG_ID.BODY],
	[TAG_NAMES.BR, TAG_ID.BR],
	[TAG_NAMES.BUTTON, TAG_ID.BUTTON],
	[TAG_NAMES.CAPTION, TAG_ID.CAPTION],
	[TAG_NAMES.CENTER, TAG_ID.CENTER],
	[TAG_NAMES.CODE, TAG_ID.CODE],
	[TAG_NAMES.COL, TAG_ID.COL],
	[TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
	[TAG_NAMES.DD, TAG_ID.DD],
	[TAG_NAMES.DESC, TAG_ID.DESC],
	[TAG_NAMES.DETAILS, TAG_ID.DETAILS],
	[TAG_NAMES.DIALOG, TAG_ID.DIALOG],
	[TAG_NAMES.DIR, TAG_ID.DIR],
	[TAG_NAMES.DIV, TAG_ID.DIV],
	[TAG_NAMES.DL, TAG_ID.DL],
	[TAG_NAMES.DT, TAG_ID.DT],
	[TAG_NAMES.EM, TAG_ID.EM],
	[TAG_NAMES.EMBED, TAG_ID.EMBED],
	[TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
	[TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
	[TAG_NAMES.FIGURE, TAG_ID.FIGURE],
	[TAG_NAMES.FONT, TAG_ID.FONT],
	[TAG_NAMES.FOOTER, TAG_ID.FOOTER],
	[TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
	[TAG_NAMES.FORM, TAG_ID.FORM],
	[TAG_NAMES.FRAME, TAG_ID.FRAME],
	[TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
	[TAG_NAMES.H1, TAG_ID.H1],
	[TAG_NAMES.H2, TAG_ID.H2],
	[TAG_NAMES.H3, TAG_ID.H3],
	[TAG_NAMES.H4, TAG_ID.H4],
	[TAG_NAMES.H5, TAG_ID.H5],
	[TAG_NAMES.H6, TAG_ID.H6],
	[TAG_NAMES.HEAD, TAG_ID.HEAD],
	[TAG_NAMES.HEADER, TAG_ID.HEADER],
	[TAG_NAMES.HGROUP, TAG_ID.HGROUP],
	[TAG_NAMES.HR, TAG_ID.HR],
	[TAG_NAMES.HTML, TAG_ID.HTML],
	[TAG_NAMES.I, TAG_ID.I],
	[TAG_NAMES.IMG, TAG_ID.IMG],
	[TAG_NAMES.IMAGE, TAG_ID.IMAGE],
	[TAG_NAMES.INPUT, TAG_ID.INPUT],
	[TAG_NAMES.IFRAME, TAG_ID.IFRAME],
	[TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
	[TAG_NAMES.LABEL, TAG_ID.LABEL],
	[TAG_NAMES.LI, TAG_ID.LI],
	[TAG_NAMES.LINK, TAG_ID.LINK],
	[TAG_NAMES.LISTING, TAG_ID.LISTING],
	[TAG_NAMES.MAIN, TAG_ID.MAIN],
	[TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
	[TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
	[TAG_NAMES.MATH, TAG_ID.MATH],
	[TAG_NAMES.MENU, TAG_ID.MENU],
	[TAG_NAMES.META, TAG_ID.META],
	[TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
	[TAG_NAMES.MI, TAG_ID.MI],
	[TAG_NAMES.MO, TAG_ID.MO],
	[TAG_NAMES.MN, TAG_ID.MN],
	[TAG_NAMES.MS, TAG_ID.MS],
	[TAG_NAMES.MTEXT, TAG_ID.MTEXT],
	[TAG_NAMES.NAV, TAG_ID.NAV],
	[TAG_NAMES.NOBR, TAG_ID.NOBR],
	[TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
	[TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
	[TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
	[TAG_NAMES.OBJECT, TAG_ID.OBJECT],
	[TAG_NAMES.OL, TAG_ID.OL],
	[TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
	[TAG_NAMES.OPTION, TAG_ID.OPTION],
	[TAG_NAMES.P, TAG_ID.P],
	[TAG_NAMES.PARAM, TAG_ID.PARAM],
	[TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
	[TAG_NAMES.PRE, TAG_ID.PRE],
	[TAG_NAMES.RB, TAG_ID.RB],
	[TAG_NAMES.RP, TAG_ID.RP],
	[TAG_NAMES.RT, TAG_ID.RT],
	[TAG_NAMES.RTC, TAG_ID.RTC],
	[TAG_NAMES.RUBY, TAG_ID.RUBY],
	[TAG_NAMES.S, TAG_ID.S],
	[TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
	[TAG_NAMES.SEARCH, TAG_ID.SEARCH],
	[TAG_NAMES.SECTION, TAG_ID.SECTION],
	[TAG_NAMES.SELECT, TAG_ID.SELECT],
	[TAG_NAMES.SOURCE, TAG_ID.SOURCE],
	[TAG_NAMES.SMALL, TAG_ID.SMALL],
	[TAG_NAMES.SPAN, TAG_ID.SPAN],
	[TAG_NAMES.STRIKE, TAG_ID.STRIKE],
	[TAG_NAMES.STRONG, TAG_ID.STRONG],
	[TAG_NAMES.STYLE, TAG_ID.STYLE],
	[TAG_NAMES.SUB, TAG_ID.SUB],
	[TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
	[TAG_NAMES.SUP, TAG_ID.SUP],
	[TAG_NAMES.TABLE, TAG_ID.TABLE],
	[TAG_NAMES.TBODY, TAG_ID.TBODY],
	[TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
	[TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
	[TAG_NAMES.TFOOT, TAG_ID.TFOOT],
	[TAG_NAMES.TD, TAG_ID.TD],
	[TAG_NAMES.TH, TAG_ID.TH],
	[TAG_NAMES.THEAD, TAG_ID.THEAD],
	[TAG_NAMES.TITLE, TAG_ID.TITLE],
	[TAG_NAMES.TR, TAG_ID.TR],
	[TAG_NAMES.TRACK, TAG_ID.TRACK],
	[TAG_NAMES.TT, TAG_ID.TT],
	[TAG_NAMES.U, TAG_ID.U],
	[TAG_NAMES.UL, TAG_ID.UL],
	[TAG_NAMES.SVG, TAG_ID.SVG],
	[TAG_NAMES.VAR, TAG_ID.VAR],
	[TAG_NAMES.WBR, TAG_ID.WBR],
	[TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
	var _a;
	return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
}
var $$1 = TAG_ID;
const SPECIAL_ELEMENTS = {
	[NS.HTML]: new Set([
		$$1.ADDRESS,
		$$1.APPLET,
		$$1.AREA,
		$$1.ARTICLE,
		$$1.ASIDE,
		$$1.BASE,
		$$1.BASEFONT,
		$$1.BGSOUND,
		$$1.BLOCKQUOTE,
		$$1.BODY,
		$$1.BR,
		$$1.BUTTON,
		$$1.CAPTION,
		$$1.CENTER,
		$$1.COL,
		$$1.COLGROUP,
		$$1.DD,
		$$1.DETAILS,
		$$1.DIR,
		$$1.DIV,
		$$1.DL,
		$$1.DT,
		$$1.EMBED,
		$$1.FIELDSET,
		$$1.FIGCAPTION,
		$$1.FIGURE,
		$$1.FOOTER,
		$$1.FORM,
		$$1.FRAME,
		$$1.FRAMESET,
		$$1.H1,
		$$1.H2,
		$$1.H3,
		$$1.H4,
		$$1.H5,
		$$1.H6,
		$$1.HEAD,
		$$1.HEADER,
		$$1.HGROUP,
		$$1.HR,
		$$1.HTML,
		$$1.IFRAME,
		$$1.IMG,
		$$1.INPUT,
		$$1.LI,
		$$1.LINK,
		$$1.LISTING,
		$$1.MAIN,
		$$1.MARQUEE,
		$$1.MENU,
		$$1.META,
		$$1.NAV,
		$$1.NOEMBED,
		$$1.NOFRAMES,
		$$1.NOSCRIPT,
		$$1.OBJECT,
		$$1.OL,
		$$1.P,
		$$1.PARAM,
		$$1.PLAINTEXT,
		$$1.PRE,
		$$1.SCRIPT,
		$$1.SECTION,
		$$1.SELECT,
		$$1.SOURCE,
		$$1.STYLE,
		$$1.SUMMARY,
		$$1.TABLE,
		$$1.TBODY,
		$$1.TD,
		$$1.TEMPLATE,
		$$1.TEXTAREA,
		$$1.TFOOT,
		$$1.TH,
		$$1.THEAD,
		$$1.TITLE,
		$$1.TR,
		$$1.TRACK,
		$$1.UL,
		$$1.WBR,
		$$1.XMP
	]),
	[NS.MATHML]: new Set([
		$$1.MI,
		$$1.MO,
		$$1.MN,
		$$1.MS,
		$$1.MTEXT,
		$$1.ANNOTATION_XML
	]),
	[NS.SVG]: new Set([
		$$1.TITLE,
		$$1.FOREIGN_OBJECT,
		$$1.DESC
	]),
	[NS.XLINK]: /* @__PURE__ */ new Set(),
	[NS.XML]: /* @__PURE__ */ new Set(),
	[NS.XMLNS]: /* @__PURE__ */ new Set()
};
const NUMBERED_HEADERS = new Set([
	$$1.H1,
	$$1.H2,
	$$1.H3,
	$$1.H4,
	$$1.H5,
	$$1.H6
]);
new Set([
	TAG_NAMES.STYLE,
	TAG_NAMES.SCRIPT,
	TAG_NAMES.XMP,
	TAG_NAMES.IFRAME,
	TAG_NAMES.NOEMBED,
	TAG_NAMES.NOFRAMES,
	TAG_NAMES.PLAINTEXT
]);
var State;
(function(State$1) {
	State$1[State$1["DATA"] = 0] = "DATA";
	State$1[State$1["RCDATA"] = 1] = "RCDATA";
	State$1[State$1["RAWTEXT"] = 2] = "RAWTEXT";
	State$1[State$1["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
	State$1[State$1["PLAINTEXT"] = 4] = "PLAINTEXT";
	State$1[State$1["TAG_OPEN"] = 5] = "TAG_OPEN";
	State$1[State$1["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
	State$1[State$1["TAG_NAME"] = 7] = "TAG_NAME";
	State$1[State$1["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
	State$1[State$1["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
	State$1[State$1["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
	State$1[State$1["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
	State$1[State$1["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
	State$1[State$1["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
	State$1[State$1["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
	State$1[State$1["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
	State$1[State$1["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
	State$1[State$1["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
	State$1[State$1["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
	State$1[State$1["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
	State$1[State$1["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
	State$1[State$1["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
	State$1[State$1["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
	State$1[State$1["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
	State$1[State$1["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
	State$1[State$1["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
	State$1[State$1["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
	State$1[State$1["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
	State$1[State$1["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
	State$1[State$1["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
	State$1[State$1["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
	State$1[State$1["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
	State$1[State$1["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
	State$1[State$1["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
	State$1[State$1["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
	State$1[State$1["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
	State$1[State$1["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
	State$1[State$1["COMMENT_START"] = 42] = "COMMENT_START";
	State$1[State$1["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
	State$1[State$1["COMMENT"] = 44] = "COMMENT";
	State$1[State$1["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
	State$1[State$1["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
	State$1[State$1["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
	State$1[State$1["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
	State$1[State$1["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
	State$1[State$1["COMMENT_END"] = 50] = "COMMENT_END";
	State$1[State$1["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
	State$1[State$1["DOCTYPE"] = 52] = "DOCTYPE";
	State$1[State$1["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
	State$1[State$1["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
	State$1[State$1["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
	State$1[State$1["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
	State$1[State$1["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
	State$1[State$1["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
	State$1[State$1["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
	State$1[State$1["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
	State$1[State$1["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
	State$1[State$1["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
	State$1[State$1["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
	State$1[State$1["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
	State$1[State$1["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
	State$1[State$1["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
	State$1[State$1["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
	State$1[State$1["CDATA_SECTION"] = 68] = "CDATA_SECTION";
	State$1[State$1["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
	State$1[State$1["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
	State$1[State$1["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
	State$1[State$1["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
const TokenizerMode = {
	DATA: State.DATA,
	RCDATA: State.RCDATA,
	RAWTEXT: State.RAWTEXT,
	SCRIPT_DATA: State.SCRIPT_DATA,
	PLAINTEXT: State.PLAINTEXT,
	CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp) {
	return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
	return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
	return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
	return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric(cp) {
	return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function toAsciiLower(cp) {
	return cp + 32;
}
function isWhitespace(cp) {
	return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
	return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code$2) {
	if (code$2 === CODE_POINTS.NULL) return ERR.nullCharacterReference;
	else if (code$2 > 1114111) return ERR.characterReferenceOutsideUnicodeRange;
	else if (isSurrogate(code$2)) return ERR.surrogateCharacterReference;
	else if (isUndefinedCodePoint(code$2)) return ERR.noncharacterCharacterReference;
	else if (isControlCodePoint(code$2) || code$2 === CODE_POINTS.CARRIAGE_RETURN) return ERR.controlCharacterReference;
	return null;
}
var Tokenizer = class {
	constructor(options, handler) {
		this.options = options;
		this.handler = handler;
		this.paused = false;
		this.inLoop = false;
		this.inForeignNode = false;
		this.lastStartTagName = "";
		this.active = false;
		this.state = State.DATA;
		this.returnState = State.DATA;
		this.entityStartPos = 0;
		this.consumedAfterSnapshot = -1;
		this.currentCharacterToken = null;
		this.currentToken = null;
		this.currentAttr = {
			name: "",
			value: ""
		};
		this.preprocessor = new Preprocessor(handler);
		this.currentLocation = this.getCurrentLocation(-1);
		this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
			this.preprocessor.pos = this.entityStartPos + consumed - 1;
			this._flushCodePointConsumedAsCharacterReference(cp);
		}, handler.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(ERR.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (consumed) => {
				this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
			},
			validateNumericCharacterReference: (code$2) => {
				const error = getErrorForNumericCharacterReference(code$2);
				if (error) this._err(error, 1);
			}
		} : void 0);
	}
	_err(code$2, cpOffset = 0) {
		var _a, _b;
		(_b = (_a = this.handler).onParseError) === null || _b === void 0 || _b.call(_a, this.preprocessor.getError(code$2, cpOffset));
	}
	getCurrentLocation(offset) {
		if (!this.options.sourceCodeLocationInfo) return null;
		return {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - offset,
			startOffset: this.preprocessor.offset - offset,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
	}
	_runParsingLoop() {
		if (this.inLoop) return;
		this.inLoop = true;
		while (this.active && !this.paused) {
			this.consumedAfterSnapshot = 0;
			const cp = this._consume();
			if (!this._ensureHibernation()) this._callState(cp);
		}
		this.inLoop = false;
	}
	pause() {
		this.paused = true;
	}
	resume(writeCallback) {
		if (!this.paused) throw new Error("Parser was already resumed");
		this.paused = false;
		if (this.inLoop) return;
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	write(chunk, isLastChunk, writeCallback) {
		this.active = true;
		this.preprocessor.write(chunk, isLastChunk);
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	insertHtmlAtCurrentPos(chunk) {
		this.active = true;
		this.preprocessor.insertHtmlAtCurrentPos(chunk);
		this._runParsingLoop();
	}
	_ensureHibernation() {
		if (this.preprocessor.endOfChunkHit) {
			this.preprocessor.retreat(this.consumedAfterSnapshot);
			this.consumedAfterSnapshot = 0;
			this.active = false;
			return true;
		}
		return false;
	}
	_consume() {
		this.consumedAfterSnapshot++;
		return this.preprocessor.advance();
	}
	_advanceBy(count) {
		this.consumedAfterSnapshot += count;
		for (let i = 0; i < count; i++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(pattern, caseSensitive) {
		if (this.preprocessor.startsWith(pattern, caseSensitive)) {
			this._advanceBy(pattern.length - 1);
			return true;
		}
		return false;
	}
	_createStartTagToken() {
		this.currentToken = {
			type: TokenType.START_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this.currentToken = {
			type: TokenType.END_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(offset) {
		this.currentToken = {
			type: TokenType.COMMENT,
			data: "",
			location: this.getCurrentLocation(offset)
		};
	}
	_createDoctypeToken(initialName) {
		this.currentToken = {
			type: TokenType.DOCTYPE,
			name: initialName,
			forceQuirks: false,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(type, chars) {
		this.currentCharacterToken = {
			type,
			chars,
			location: this.currentLocation
		};
	}
	_createAttr(attrNameFirstCh) {
		this.currentAttr = {
			name: attrNameFirstCh,
			value: ""
		};
		this.currentLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var _a;
		var _b;
		const token = this.currentToken;
		if (getTokenAttr(token, this.currentAttr.name) === null) {
			token.attrs.push(this.currentAttr);
			if (token.location && this.currentLocation) {
				const attrLocations = (_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : _b.attrs = Object.create(null);
				attrLocations[this.currentAttr.name] = this.currentLocation;
				this._leaveAttrValue();
			}
		} else this._err(ERR.duplicateAttribute);
	}
	_leaveAttrValue() {
		if (this.currentLocation) {
			this.currentLocation.endLine = this.preprocessor.line;
			this.currentLocation.endCol = this.preprocessor.col;
			this.currentLocation.endOffset = this.preprocessor.offset;
		}
	}
	prepareToken(ct$1) {
		this._emitCurrentCharacterToken(ct$1.location);
		this.currentToken = null;
		if (ct$1.location) {
			ct$1.location.endLine = this.preprocessor.line;
			ct$1.location.endCol = this.preprocessor.col + 1;
			ct$1.location.endOffset = this.preprocessor.offset + 1;
		}
		this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		const ct$1 = this.currentToken;
		this.prepareToken(ct$1);
		ct$1.tagID = getTagID(ct$1.tagName);
		if (ct$1.type === TokenType.START_TAG) {
			this.lastStartTagName = ct$1.tagName;
			this.handler.onStartTag(ct$1);
		} else {
			if (ct$1.attrs.length > 0) this._err(ERR.endTagWithAttributes);
			if (ct$1.selfClosing) this._err(ERR.endTagWithTrailingSolidus);
			this.handler.onEndTag(ct$1);
		}
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(ct$1) {
		this.prepareToken(ct$1);
		this.handler.onComment(ct$1);
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(ct$1) {
		this.prepareToken(ct$1);
		this.handler.onDoctype(ct$1);
		this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(nextLocation) {
		if (this.currentCharacterToken) {
			if (nextLocation && this.currentCharacterToken.location) {
				this.currentCharacterToken.location.endLine = nextLocation.startLine;
				this.currentCharacterToken.location.endCol = nextLocation.startCol;
				this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
			}
			switch (this.currentCharacterToken.type) {
				case TokenType.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case TokenType.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case TokenType.WHITESPACE_CHARACTER:
					this.handler.onWhitespaceCharacter(this.currentCharacterToken);
					break;
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		const location$1 = this.getCurrentLocation(0);
		if (location$1) {
			location$1.endLine = location$1.startLine;
			location$1.endCol = location$1.startCol;
			location$1.endOffset = location$1.startOffset;
		}
		this._emitCurrentCharacterToken(location$1);
		this.handler.onEof({
			type: TokenType.EOF,
			location: location$1
		});
		this.active = false;
	}
	_appendCharToCurrentCharacterToken(type, ch) {
		if (this.currentCharacterToken) if (this.currentCharacterToken.type === type) {
			this.currentCharacterToken.chars += ch;
			return;
		} else {
			this.currentLocation = this.getCurrentLocation(0);
			this._emitCurrentCharacterToken(this.currentLocation);
			this.preprocessor.dropParsedChunk();
		}
		this._createCharacterToken(type, ch);
	}
	_emitCodePoint(cp) {
		const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
		this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
	}
	_emitChars(ch) {
		this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
	}
	_startCharacterReference() {
		this.returnState = this.state;
		this.state = State.CHARACTER_REFERENCE;
		this.entityStartPos = this.preprocessor.pos;
		this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(cp) {
		if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += String.fromCodePoint(cp);
		else this._emitCodePoint(cp);
	}
	_callState(cp) {
		switch (this.state) {
			case State.DATA:
				this._stateData(cp);
				break;
			case State.RCDATA:
				this._stateRcdata(cp);
				break;
			case State.RAWTEXT:
				this._stateRawtext(cp);
				break;
			case State.SCRIPT_DATA:
				this._stateScriptData(cp);
				break;
			case State.PLAINTEXT:
				this._statePlaintext(cp);
				break;
			case State.TAG_OPEN:
				this._stateTagOpen(cp);
				break;
			case State.END_TAG_OPEN:
				this._stateEndTagOpen(cp);
				break;
			case State.TAG_NAME:
				this._stateTagName(cp);
				break;
			case State.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(cp);
				break;
			case State.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(cp);
				break;
			case State.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(cp);
				break;
			case State.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(cp);
				break;
			case State.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(cp);
				break;
			case State.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(cp);
				break;
			case State.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(cp);
				break;
			case State.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(cp);
				break;
			case State.ATTRIBUTE_NAME:
				this._stateAttributeName(cp);
				break;
			case State.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(cp);
				break;
			case State.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(cp);
				break;
			case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(cp);
				break;
			case State.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(cp);
				break;
			case State.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(cp);
				break;
			case State.BOGUS_COMMENT:
				this._stateBogusComment(cp);
				break;
			case State.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(cp);
				break;
			case State.COMMENT_START:
				this._stateCommentStart(cp);
				break;
			case State.COMMENT_START_DASH:
				this._stateCommentStartDash(cp);
				break;
			case State.COMMENT:
				this._stateComment(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(cp);
				break;
			case State.COMMENT_END_DASH:
				this._stateCommentEndDash(cp);
				break;
			case State.COMMENT_END:
				this._stateCommentEnd(cp);
				break;
			case State.COMMENT_END_BANG:
				this._stateCommentEndBang(cp);
				break;
			case State.DOCTYPE:
				this._stateDoctype(cp);
				break;
			case State.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(cp);
				break;
			case State.DOCTYPE_NAME:
				this._stateDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(cp);
				break;
			case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(cp);
				break;
			case State.BOGUS_DOCTYPE:
				this._stateBogusDoctype(cp);
				break;
			case State.CDATA_SECTION:
				this._stateCdataSection(cp);
				break;
			case State.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(cp);
				break;
			case State.CDATA_SECTION_END:
				this._stateCdataSectionEnd(cp);
				break;
			case State.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case State.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(cp);
				break;
			default: throw new Error("Unknown state");
		}
	}
	_stateData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.TAG_OPEN;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRcdata(cp) {
		switch (cp) {
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RCDATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRawtext(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RAWTEXT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_statePlaintext(cp) {
		switch (cp) {
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createStartTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.MARKUP_DECLARATION_OPEN;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.END_TAG_OPEN;
				break;
			case CODE_POINTS.QUESTION_MARK:
				this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
				this._createCommentToken(1);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("<");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._emitChars("<");
				this.state = State.DATA;
				this._stateData(cp);
		}
	}
	_stateEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createEndTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingEndTagName);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("</");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._createCommentToken(2);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
		}
	}
	_stateTagName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.tagName += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateRcdataLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RCDATA_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRcdataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RCDATA_END_TAG_NAME;
			this._stateRcdataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	handleSpecialEndTag(_cp) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, false)) return !this._ensureHibernation();
		this._createEndTagToken();
		const token = this.currentToken;
		token.tagName = this.lastStartTagName;
		switch (this.preprocessor.peek(this.lastStartTagName.length)) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				return false;
			case CODE_POINTS.SOLIDUS:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.SELF_CLOSING_START_TAG;
				return false;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._advanceBy(this.lastStartTagName.length);
				this.emitCurrentTagToken();
				this.state = State.DATA;
				return false;
			default: return !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRawtextLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RAWTEXT_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RAWTEXT_END_TAG_NAME;
			this._stateRawtextEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateScriptDataLessThanSign(cp) {
		switch (cp) {
			case CODE_POINTS.SOLIDUS:
				this.state = State.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.SCRIPT_DATA_ESCAPE_START;
				this._emitChars("<!");
				break;
			default:
				this._emitChars("<");
				this.state = State.SCRIPT_DATA;
				this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_END_TAG_NAME;
			this._stateScriptDataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStart(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStartDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
		else if (isAsciiLetter(cp)) {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
			this._stateScriptDataDoubleEscapeStart(cp);
		} else {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
			this._stateScriptDataEscapedEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeStart(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
			this._emitChars("/");
		} else {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeEnd(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateBeforeAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
				this._createAttr("=");
				this.state = State.ATTRIBUTE_NAME;
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this._leaveAttrName();
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._leaveAttrName();
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
				this._err(ERR.unexpectedCharacterInAttributeName);
				this.currentAttr.name += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateBeforeAttributeValue(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingAttributeValue);
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			default:
				this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
				this._stateAttributeValueUnquoted(cp);
		}
	}
	_stateAttributeValueDoubleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueSingleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueUnquoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
			case CODE_POINTS.EQUALS_SIGN:
			case CODE_POINTS.GRAVE_ACCENT:
				this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
				this.currentAttr.value += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAfterAttributeValueQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this._leaveAttrValue();
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingWhitespaceBetweenAttributes);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateSelfClosingStartTag(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN: {
				const token = this.currentToken;
				token.selfClosing = true;
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			}
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedSolidusInTag);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateBogusComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateMarkupDeclarationOpen(cp) {
		if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
			this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
			this.state = State.COMMENT_START;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
			this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
			this.state = State.DOCTYPE;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) if (this.inForeignNode) this.state = State.CDATA_SECTION;
		else {
			this._err(ERR.cdataInHtmlContent);
			this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
			this.currentToken.data = "[CDATA[";
			this.state = State.BOGUS_COMMENT;
		}
		else if (!this._ensureHibernation()) {
			this._err(ERR.incorrectlyOpenedComment);
			this._createCommentToken(2);
			this.state = State.BOGUS_COMMENT;
			this._stateBogusComment(cp);
		}
	}
	_stateCommentStart(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_START_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				const token = this.currentToken;
				this.emitCurrentComment(token);
				break;
			}
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentStartDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				this.state = State.COMMENT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateCommentLessThanSign(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				token.data += "!";
				this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				break;
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBang(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
		else {
			this.state = State.COMMENT;
			this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBangDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
		else {
			this.state = State.COMMENT_END_DASH;
			this._stateCommentEndDash(cp);
		}
	}
	_stateCommentLessThanSignBangDashDash(cp) {
		if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) this._err(ERR.nestedComment);
		this.state = State.COMMENT_END;
		this._stateCommentEnd(cp);
	}
	_stateCommentEndDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEnd(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.COMMENT_END_BANG;
				break;
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "-";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEndBang(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "--!";
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.incorrectlyClosedComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--!";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateDoctype(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
				break;
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._err(ERR.missingWhitespaceBeforeDoctypeName);
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
		}
	}
	_stateBeforeDoctypeName(cp) {
		if (isAsciiUpper(cp)) {
			this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
			this.state = State.DOCTYPE_NAME;
		} else switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._createDoctypeToken("�");
				this.state = State.DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.missingDoctypeName);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			}
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._createDoctypeToken(String.fromCodePoint(cp));
				this.state = State.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.AFTER_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.name += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
			else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
			else if (!this._ensureHibernation()) {
				this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
			}
		}
	}
	_stateAfterDoctypePublicKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateAfterDoctypeSystemKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBogusDoctype(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
		}
	}
	_stateCdataSection(cp) {
		switch (cp) {
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this.state = State.CDATA_SECTION_BRACKET;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInCdata);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateCdataSectionBracket(cp) {
		if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) this.state = State.CDATA_SECTION_END;
		else {
			this._emitChars("]");
			this.state = State.CDATA_SECTION;
			this._stateCdataSection(cp);
		}
	}
	_stateCdataSectionEnd(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				break;
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this._emitChars("]");
				break;
			default:
				this._emitChars("]]");
				this.state = State.CDATA_SECTION;
				this._stateCdataSection(cp);
		}
	}
	_stateCharacterReference() {
		let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (length < 0) if (this.preprocessor.lastChunkWritten) length = this.entityDecoder.end();
		else {
			this.active = false;
			this.preprocessor.pos = this.preprocessor.html.length - 1;
			this.consumedAfterSnapshot = 0;
			this.preprocessor.endOfChunkHit = true;
			return;
		}
		if (length === 0) {
			this.preprocessor.pos = this.entityStartPos;
			this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
			this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
		} else this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(cp) {
		if (isAsciiAlphaNumeric(cp)) this._flushCodePointConsumedAsCharacterReference(cp);
		else {
			if (cp === CODE_POINTS.SEMICOLON) this._err(ERR.unknownNamedCharacterReference);
			this.state = this.returnState;
			this._callState(cp);
		}
	}
};
var IMPLICIT_END_TAG_REQUIRED = new Set([
	TAG_ID.DD,
	TAG_ID.DT,
	TAG_ID.LI,
	TAG_ID.OPTGROUP,
	TAG_ID.OPTION,
	TAG_ID.P,
	TAG_ID.RB,
	TAG_ID.RP,
	TAG_ID.RT,
	TAG_ID.RTC
]);
var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = new Set([
	...IMPLICIT_END_TAG_REQUIRED,
	TAG_ID.CAPTION,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
var SCOPING_ELEMENTS_HTML = new Set([
	TAG_ID.APPLET,
	TAG_ID.CAPTION,
	TAG_ID.HTML,
	TAG_ID.MARQUEE,
	TAG_ID.OBJECT,
	TAG_ID.TABLE,
	TAG_ID.TD,
	TAG_ID.TEMPLATE,
	TAG_ID.TH
]);
var SCOPING_ELEMENTS_HTML_LIST = new Set([
	...SCOPING_ELEMENTS_HTML,
	TAG_ID.OL,
	TAG_ID.UL
]);
var SCOPING_ELEMENTS_HTML_BUTTON = new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
var SCOPING_ELEMENTS_MATHML = new Set([
	TAG_ID.ANNOTATION_XML,
	TAG_ID.MI,
	TAG_ID.MN,
	TAG_ID.MO,
	TAG_ID.MS,
	TAG_ID.MTEXT
]);
var SCOPING_ELEMENTS_SVG = new Set([
	TAG_ID.DESC,
	TAG_ID.FOREIGN_OBJECT,
	TAG_ID.TITLE
]);
var TABLE_ROW_CONTEXT = new Set([
	TAG_ID.TR,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
var TABLE_BODY_CONTEXT = new Set([
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
var TABLE_CONTEXT = new Set([
	TAG_ID.TABLE,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
var TABLE_CELLS = new Set([TAG_ID.TD, TAG_ID.TH]);
var OpenElementStack = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(document$1, treeAdapter, handler) {
		this.treeAdapter = treeAdapter;
		this.handler = handler;
		this.items = [];
		this.tagIDs = [];
		this.stackTop = -1;
		this.tmplCount = 0;
		this.currentTagId = TAG_ID.UNKNOWN;
		this.current = document$1;
	}
	_indexOf(element$5) {
		return this.items.lastIndexOf(element$5, this.stackTop);
	}
	_isInTemplate() {
		return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop];
		this.currentTagId = this.tagIDs[this.stackTop];
	}
	push(element$5, tagID) {
		this.stackTop++;
		this.items[this.stackTop] = element$5;
		this.current = element$5;
		this.tagIDs[this.stackTop] = tagID;
		this.currentTagId = tagID;
		if (this._isInTemplate()) this.tmplCount++;
		this.handler.onItemPush(element$5, tagID, true);
	}
	pop() {
		const popped = this.current;
		if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
		this.stackTop--;
		this._updateCurrentElement();
		this.handler.onItemPop(popped, true);
	}
	replace(oldElement, newElement) {
		const idx = this._indexOf(oldElement);
		this.items[idx] = newElement;
		if (idx === this.stackTop) this.current = newElement;
	}
	insertAfter(referenceElement, newElement, newElementID) {
		const insertionIdx = this._indexOf(referenceElement) + 1;
		this.items.splice(insertionIdx, 0, newElement);
		this.tagIDs.splice(insertionIdx, 0, newElementID);
		this.stackTop++;
		if (insertionIdx === this.stackTop) this._updateCurrentElement();
		if (this.current && this.currentTagId !== void 0) this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
	}
	popUntilTagNamePopped(tagName) {
		let targetIdx = this.stackTop + 1;
		do
			targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
		while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
		this.shortenToLength(Math.max(targetIdx, 0));
	}
	shortenToLength(idx) {
		while (this.stackTop >= idx) {
			const popped = this.current;
			if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount -= 1;
			this.stackTop--;
			this._updateCurrentElement();
			this.handler.onItemPop(popped, this.stackTop < idx);
		}
	}
	popUntilElementPopped(element$5) {
		const idx = this._indexOf(element$5);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilPopped(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
	}
	popUntilTableCellPopped() {
		this.popUntilPopped(TABLE_CELLS, NS.HTML);
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0;
		this.shortenToLength(1);
	}
	_indexOfTagNames(tagNames, namespace) {
		for (let i = this.stackTop; i >= 0; i--) if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) return i;
		return -1;
	}
	clearBackTo(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(idx + 1);
	}
	clearBackToTableContext() {
		this.clearBackTo(TABLE_CONTEXT, NS.HTML);
	}
	clearBackToTableBodyContext() {
		this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
	}
	clearBackToTableRowContext() {
		this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
	}
	remove(element$5) {
		const idx = this._indexOf(element$5);
		if (idx >= 0) if (idx === this.stackTop) this.pop();
		else {
			this.items.splice(idx, 1);
			this.tagIDs.splice(idx, 1);
			this.stackTop--;
			this._updateCurrentElement();
			this.handler.onItemPop(element$5, false);
		}
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
	}
	contains(element$5) {
		return this._indexOf(element$5) > -1;
	}
	getCommonAncestor(element$5) {
		const elementIdx = this._indexOf(element$5) - 1;
		return elementIdx >= 0 ? this.items[elementIdx] : null;
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
	}
	hasInDynamicScope(tagName, htmlScope) {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn$2 = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (tn$2 === tagName) return true;
					if (htmlScope.has(tn$2)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn$2)) return false;
					break;
				case NS.MATHML:
					if (SCOPING_ELEMENTS_MATHML.has(tn$2)) return false;
					break;
			}
		}
		return true;
	}
	hasInScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
	}
	hasInListItemScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
	}
	hasInButtonScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
	}
	hasNumberedHeaderInScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn$2 = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (NUMBERED_HEADERS.has(tn$2)) return true;
					if (SCOPING_ELEMENTS_HTML.has(tn$2)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn$2)) return false;
					break;
				case NS.MATHML:
					if (SCOPING_ELEMENTS_MATHML.has(tn$2)) return false;
					break;
			}
		}
		return true;
	}
	hasInTableScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasTableBodyContextInTableScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case TAG_ID.TBODY:
				case TAG_ID.THEAD:
				case TAG_ID.TFOOT: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasInSelectScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.OPTION:
				case TAG_ID.OPTGROUP: break;
				default: return false;
			}
		}
		return true;
	}
	generateImpliedEndTags() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsWithExclusion(exclusionId) {
		while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
};
var NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType$1) {
	EntryType$1[EntryType$1["Marker"] = 0] = "Marker";
	EntryType$1[EntryType$1["Element"] = 1] = "Element";
})(EntryType || (EntryType = {}));
var MARKER = { type: EntryType.Marker };
var FormattingElementList = class {
	constructor(treeAdapter) {
		this.treeAdapter = treeAdapter;
		this.entries = [];
		this.bookmark = null;
	}
	_getNoahArkConditionCandidates(newElement, neAttrs) {
		const candidates = [];
		const neAttrsLength = neAttrs.length;
		const neTagName = this.treeAdapter.getTagName(newElement);
		const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			if (entry.type === EntryType.Marker) break;
			const { element: element$5 } = entry;
			if (this.treeAdapter.getTagName(element$5) === neTagName && this.treeAdapter.getNamespaceURI(element$5) === neNamespaceURI) {
				const elementAttrs = this.treeAdapter.getAttrList(element$5);
				if (elementAttrs.length === neAttrsLength) candidates.push({
					idx: i,
					attrs: elementAttrs
				});
			}
		}
		return candidates;
	}
	_ensureNoahArkCondition(newElement) {
		if (this.entries.length < NOAH_ARK_CAPACITY) return;
		const neAttrs = this.treeAdapter.getAttrList(newElement);
		const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
		if (candidates.length < NOAH_ARK_CAPACITY) return;
		const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
		let validCandidates = 0;
		for (let i = 0; i < candidates.length; i++) {
			const candidate = candidates[i];
			if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
				validCandidates += 1;
				if (validCandidates >= NOAH_ARK_CAPACITY) this.entries.splice(candidate.idx, 1);
			}
		}
	}
	insertMarker() {
		this.entries.unshift(MARKER);
	}
	pushElement(element$5, token) {
		this._ensureNoahArkCondition(element$5);
		this.entries.unshift({
			type: EntryType.Element,
			element: element$5,
			token
		});
	}
	insertElementAfterBookmark(element$5, token) {
		const bookmarkIdx = this.entries.indexOf(this.bookmark);
		this.entries.splice(bookmarkIdx, 0, {
			type: EntryType.Element,
			element: element$5,
			token
		});
	}
	removeEntry(entry) {
		const entryIndex = this.entries.indexOf(entry);
		if (entryIndex !== -1) this.entries.splice(entryIndex, 1);
	}
	clearToLastMarker() {
		const markerIdx = this.entries.indexOf(MARKER);
		if (markerIdx === -1) this.entries.length = 0;
		else this.entries.splice(0, markerIdx + 1);
	}
	getElementEntryInScopeWithTagName(tagName) {
		const entry = this.entries.find((entry$1) => entry$1.type === EntryType.Marker || this.treeAdapter.getTagName(entry$1.element) === tagName);
		return entry && entry.type === EntryType.Element ? entry : null;
	}
	getElementEntry(element$5) {
		return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element$5);
	}
};
const defaultTreeAdapter = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: DOCUMENT_MODE.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(tagName, namespaceURI, attrs) {
		return {
			nodeName: tagName,
			tagName,
			attrs,
			namespaceURI,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(data) {
		return {
			nodeName: "#comment",
			data,
			parentNode: null
		};
	},
	createTextNode(value) {
		return {
			nodeName: "#text",
			value,
			parentNode: null
		};
	},
	appendChild(parentNode, newNode) {
		parentNode.childNodes.push(newNode);
		newNode.parentNode = parentNode;
	},
	insertBefore(parentNode, newNode, referenceNode) {
		const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
		parentNode.childNodes.splice(insertionIdx, 0, newNode);
		newNode.parentNode = parentNode;
	},
	setTemplateContent(templateElement, contentElement) {
		templateElement.content = contentElement;
	},
	getTemplateContent(templateElement) {
		return templateElement.content;
	},
	setDocumentType(document$1, name$1, publicId, systemId) {
		const doctypeNode = document$1.childNodes.find((node) => node.nodeName === "#documentType");
		if (doctypeNode) {
			doctypeNode.name = name$1;
			doctypeNode.publicId = publicId;
			doctypeNode.systemId = systemId;
		} else {
			const node = {
				nodeName: "#documentType",
				name: name$1,
				publicId,
				systemId,
				parentNode: null
			};
			defaultTreeAdapter.appendChild(document$1, node);
		}
	},
	setDocumentMode(document$1, mode) {
		document$1.mode = mode;
	},
	getDocumentMode(document$1) {
		return document$1.mode;
	},
	detachNode(node) {
		if (node.parentNode) {
			const idx = node.parentNode.childNodes.indexOf(node);
			node.parentNode.childNodes.splice(idx, 1);
			node.parentNode = null;
		}
	},
	insertText(parentNode, text$6) {
		if (parentNode.childNodes.length > 0) {
			const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
			if (defaultTreeAdapter.isTextNode(prevNode)) {
				prevNode.value += text$6;
				return;
			}
		}
		defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text$6));
	},
	insertTextBefore(parentNode, text$6, referenceNode) {
		const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
		if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) prevNode.value += text$6;
		else defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text$6), referenceNode);
	},
	adoptAttributes(recipient, attrs) {
		const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
		for (let j$1 = 0; j$1 < attrs.length; j$1++) if (!recipientAttrsMap.has(attrs[j$1].name)) recipient.attrs.push(attrs[j$1]);
	},
	getFirstChild(node) {
		return node.childNodes[0];
	},
	getChildNodes(node) {
		return node.childNodes;
	},
	getParentNode(node) {
		return node.parentNode;
	},
	getAttrList(element$5) {
		return element$5.attrs;
	},
	getTagName(element$5) {
		return element$5.tagName;
	},
	getNamespaceURI(element$5) {
		return element$5.namespaceURI;
	},
	getTextNodeContent(textNode) {
		return textNode.value;
	},
	getCommentNodeContent(commentNode) {
		return commentNode.data;
	},
	getDocumentTypeNodeName(doctypeNode) {
		return doctypeNode.name;
	},
	getDocumentTypeNodePublicId(doctypeNode) {
		return doctypeNode.publicId;
	},
	getDocumentTypeNodeSystemId(doctypeNode) {
		return doctypeNode.systemId;
	},
	isTextNode(node) {
		return node.nodeName === "#text";
	},
	isCommentNode(node) {
		return node.nodeName === "#comment";
	},
	isDocumentTypeNode(node) {
		return node.nodeName === "#documentType";
	},
	isElementNode(node) {
		return Object.prototype.hasOwnProperty.call(node, "tagName");
	},
	setNodeSourceCodeLocation(node, location$1) {
		node.sourceCodeLocation = location$1;
	},
	getNodeSourceCodeLocation(node) {
		return node.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(node, endLocation) {
		node.sourceCodeLocation = {
			...node.sourceCodeLocation,
			...endLocation
		};
	}
};
var VALID_DOCTYPE_NAME = "html";
var VALID_SYSTEM_ID = "about:legacy-compat";
var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
	"+//silmaril//dtd html pro v0r11 19970101//",
	"-//as//dtd html 3.0 aswedit + extensions//",
	"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
	"-//ietf//dtd html 2.0 level 1//",
	"-//ietf//dtd html 2.0 level 2//",
	"-//ietf//dtd html 2.0 strict level 1//",
	"-//ietf//dtd html 2.0 strict level 2//",
	"-//ietf//dtd html 2.0 strict//",
	"-//ietf//dtd html 2.0//",
	"-//ietf//dtd html 2.1e//",
	"-//ietf//dtd html 3.0//",
	"-//ietf//dtd html 3.2 final//",
	"-//ietf//dtd html 3.2//",
	"-//ietf//dtd html 3//",
	"-//ietf//dtd html level 0//",
	"-//ietf//dtd html level 1//",
	"-//ietf//dtd html level 2//",
	"-//ietf//dtd html level 3//",
	"-//ietf//dtd html strict level 0//",
	"-//ietf//dtd html strict level 1//",
	"-//ietf//dtd html strict level 2//",
	"-//ietf//dtd html strict level 3//",
	"-//ietf//dtd html strict//",
	"-//ietf//dtd html//",
	"-//metrius//dtd metrius presentational//",
	"-//microsoft//dtd internet explorer 2.0 html strict//",
	"-//microsoft//dtd internet explorer 2.0 html//",
	"-//microsoft//dtd internet explorer 2.0 tables//",
	"-//microsoft//dtd internet explorer 3.0 html strict//",
	"-//microsoft//dtd internet explorer 3.0 html//",
	"-//microsoft//dtd internet explorer 3.0 tables//",
	"-//netscape comm. corp.//dtd html//",
	"-//netscape comm. corp.//dtd strict html//",
	"-//o'reilly and associates//dtd html 2.0//",
	"-//o'reilly and associates//dtd html extended 1.0//",
	"-//o'reilly and associates//dtd html extended relaxed 1.0//",
	"-//sq//dtd html 2.0 hotmetal + extensions//",
	"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
	"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
	"-//spyglass//dtd html 2.0 extended//",
	"-//sun microsystems corp.//dtd hotjava html//",
	"-//sun microsystems corp.//dtd hotjava strict html//",
	"-//w3c//dtd html 3 1995-03-24//",
	"-//w3c//dtd html 3.2 draft//",
	"-//w3c//dtd html 3.2 final//",
	"-//w3c//dtd html 3.2//",
	"-//w3c//dtd html 3.2s draft//",
	"-//w3c//dtd html 4.0 frameset//",
	"-//w3c//dtd html 4.0 transitional//",
	"-//w3c//dtd html experimental 19960712//",
	"-//w3c//dtd html experimental 970421//",
	"-//w3c//dtd w3 html//",
	"-//w3o//dtd w3 html 3.0//",
	"-//webtechs//dtd mozilla html 2.0//",
	"-//webtechs//dtd mozilla html//"
];
var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
var QUIRKS_MODE_PUBLIC_IDS = new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]);
var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
	return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
	return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
	if (token.name !== VALID_DOCTYPE_NAME) return DOCUMENT_MODE.QUIRKS;
	const { systemId } = token;
	if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) return DOCUMENT_MODE.QUIRKS;
	let { publicId } = token;
	if (publicId !== null) {
		publicId = publicId.toLowerCase();
		if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) return DOCUMENT_MODE.QUIRKS;
		let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.QUIRKS;
		prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.LIMITED_QUIRKS;
	}
	return DOCUMENT_MODE.NO_QUIRKS;
}
var MIME_TYPES = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
};
var DEFINITION_URL_ATTR = "definitionurl";
var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
	"attributeName",
	"attributeType",
	"baseFrequency",
	"baseProfile",
	"calcMode",
	"clipPathUnits",
	"diffuseConstant",
	"edgeMode",
	"filterUnits",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"kernelMatrix",
	"kernelUnitLength",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"limitingConeAngle",
	"markerHeight",
	"markerUnits",
	"markerWidth",
	"maskContentUnits",
	"maskUnits",
	"numOctaves",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"refX",
	"refY",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"specularConstant",
	"specularExponent",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stitchTiles",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textLength",
	"viewBox",
	"viewTarget",
	"xChannelSelector",
	"yChannelSelector",
	"zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
var XML_ATTRS_ADJUSTMENT_MAP = new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: NS.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: NS.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: NS.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: NS.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: NS.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: NS.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: NS.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: NS.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: NS.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: NS.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: NS.XMLNS
	}]
]);
const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"textPath"
].map((tn$2) => [tn$2.toLowerCase(), tn$2]));
var EXITS_FOREIGN_CONTENT = new Set([
	TAG_ID.B,
	TAG_ID.BIG,
	TAG_ID.BLOCKQUOTE,
	TAG_ID.BODY,
	TAG_ID.BR,
	TAG_ID.CENTER,
	TAG_ID.CODE,
	TAG_ID.DD,
	TAG_ID.DIV,
	TAG_ID.DL,
	TAG_ID.DT,
	TAG_ID.EM,
	TAG_ID.EMBED,
	TAG_ID.H1,
	TAG_ID.H2,
	TAG_ID.H3,
	TAG_ID.H4,
	TAG_ID.H5,
	TAG_ID.H6,
	TAG_ID.HEAD,
	TAG_ID.HR,
	TAG_ID.I,
	TAG_ID.IMG,
	TAG_ID.LI,
	TAG_ID.LISTING,
	TAG_ID.MENU,
	TAG_ID.META,
	TAG_ID.NOBR,
	TAG_ID.OL,
	TAG_ID.P,
	TAG_ID.PRE,
	TAG_ID.RUBY,
	TAG_ID.S,
	TAG_ID.SMALL,
	TAG_ID.SPAN,
	TAG_ID.STRONG,
	TAG_ID.STRIKE,
	TAG_ID.SUB,
	TAG_ID.SUP,
	TAG_ID.TABLE,
	TAG_ID.TT,
	TAG_ID.U,
	TAG_ID.UL,
	TAG_ID.VAR
]);
function causesExit(startTagToken) {
	const tn$2 = startTagToken.tagID;
	return tn$2 === TAG_ID.FONT && startTagToken.attrs.some(({ name: name$1 }) => name$1 === ATTRS.COLOR || name$1 === ATTRS.SIZE || name$1 === ATTRS.FACE) || EXITS_FOREIGN_CONTENT.has(tn$2);
}
function adjustTokenMathMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) if (token.attrs[i].name === DEFINITION_URL_ATTR) {
		token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
		break;
	}
}
function adjustTokenSVGAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrName != null) token.attrs[i].name = adjustedAttrName;
	}
}
function adjustTokenXMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrEntry) {
			token.attrs[i].prefix = adjustedAttrEntry.prefix;
			token.attrs[i].name = adjustedAttrEntry.name;
			token.attrs[i].namespace = adjustedAttrEntry.namespace;
		}
	}
}
function adjustTokenSVGTagName(token) {
	const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
	if (adjustedTagName != null) {
		token.tagName = adjustedTagName;
		token.tagID = getTagID(token.tagName);
	}
}
function isMathMLTextIntegrationPoint(tn$2, ns$1) {
	return ns$1 === NS.MATHML && (tn$2 === TAG_ID.MI || tn$2 === TAG_ID.MO || tn$2 === TAG_ID.MN || tn$2 === TAG_ID.MS || tn$2 === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn$2, ns$1, attrs) {
	if (ns$1 === NS.MATHML && tn$2 === TAG_ID.ANNOTATION_XML) {
		for (let i = 0; i < attrs.length; i++) if (attrs[i].name === ATTRS.ENCODING) {
			const value = attrs[i].value.toLowerCase();
			return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
		}
	}
	return ns$1 === NS.SVG && (tn$2 === TAG_ID.FOREIGN_OBJECT || tn$2 === TAG_ID.DESC || tn$2 === TAG_ID.TITLE);
}
function isIntegrationPoint(tn$2, ns$1, attrs, foreignNS) {
	return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn$2, ns$1, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn$2, ns$1);
}
var HIDDEN_INPUT_TYPE = "hidden";
var AA_OUTER_LOOP_ITER = 8;
var AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode$1) {
	InsertionMode$1[InsertionMode$1["INITIAL"] = 0] = "INITIAL";
	InsertionMode$1[InsertionMode$1["BEFORE_HTML"] = 1] = "BEFORE_HTML";
	InsertionMode$1[InsertionMode$1["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
	InsertionMode$1[InsertionMode$1["IN_HEAD"] = 3] = "IN_HEAD";
	InsertionMode$1[InsertionMode$1["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
	InsertionMode$1[InsertionMode$1["AFTER_HEAD"] = 5] = "AFTER_HEAD";
	InsertionMode$1[InsertionMode$1["IN_BODY"] = 6] = "IN_BODY";
	InsertionMode$1[InsertionMode$1["TEXT"] = 7] = "TEXT";
	InsertionMode$1[InsertionMode$1["IN_TABLE"] = 8] = "IN_TABLE";
	InsertionMode$1[InsertionMode$1["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
	InsertionMode$1[InsertionMode$1["IN_CAPTION"] = 10] = "IN_CAPTION";
	InsertionMode$1[InsertionMode$1["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
	InsertionMode$1[InsertionMode$1["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
	InsertionMode$1[InsertionMode$1["IN_ROW"] = 13] = "IN_ROW";
	InsertionMode$1[InsertionMode$1["IN_CELL"] = 14] = "IN_CELL";
	InsertionMode$1[InsertionMode$1["IN_SELECT"] = 15] = "IN_SELECT";
	InsertionMode$1[InsertionMode$1["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
	InsertionMode$1[InsertionMode$1["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
	InsertionMode$1[InsertionMode$1["AFTER_BODY"] = 18] = "AFTER_BODY";
	InsertionMode$1[InsertionMode$1["IN_FRAMESET"] = 19] = "IN_FRAMESET";
	InsertionMode$1[InsertionMode$1["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
	InsertionMode$1[InsertionMode$1["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
	InsertionMode$1[InsertionMode$1["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
var BASE_LOC = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
};
var TABLE_STRUCTURE_TAGS = new Set([
	TAG_ID.TABLE,
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
var defaultParserOptions = {
	scriptingEnabled: true,
	sourceCodeLocationInfo: false,
	treeAdapter: defaultTreeAdapter,
	onParseError: null
};
var Parser = class {
	constructor(options, document$1, fragmentContext = null, scriptHandler = null) {
		this.fragmentContext = fragmentContext;
		this.scriptHandler = scriptHandler;
		this.currentToken = null;
		this.stopped = false;
		this.insertionMode = InsertionMode.INITIAL;
		this.originalInsertionMode = InsertionMode.INITIAL;
		this.headElement = null;
		this.formElement = null;
		this.currentNotInHTML = false;
		this.tmplInsertionModeStack = [];
		this.pendingCharacterTokens = [];
		this.hasNonWhitespacePendingCharacterToken = false;
		this.framesetOk = true;
		this.skipNextNewLine = false;
		this.fosterParentingEnabled = false;
		this.options = {
			...defaultParserOptions,
			...options
		};
		this.treeAdapter = this.options.treeAdapter;
		this.onParseError = this.options.onParseError;
		if (this.onParseError) this.options.sourceCodeLocationInfo = true;
		this.document = document$1 !== null && document$1 !== void 0 ? document$1 : this.treeAdapter.createDocument();
		this.tokenizer = new Tokenizer(this.options, this);
		this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
		this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
		this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
		this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
	}
	static parse(html$2, options) {
		const parser = new this(options);
		parser.tokenizer.write(html$2, true);
		return parser.document;
	}
	static getFragmentParser(fragmentContext, options) {
		const opts = {
			...defaultParserOptions,
			...options
		};
		fragmentContext !== null && fragmentContext !== void 0 || (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
		const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
		const parser = new this(opts, documentMock, fragmentContext);
		if (parser.fragmentContextID === TAG_ID.TEMPLATE) parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
		parser._initTokenizerForFragmentParsing();
		parser._insertFakeRootElement();
		parser._resetInsertionMode();
		parser._findFormInFragmentContext();
		return parser;
	}
	getFragment() {
		const rootElement = this.treeAdapter.getFirstChild(this.document);
		const fragment$1 = this.treeAdapter.createDocumentFragment();
		this._adoptNodes(rootElement, fragment$1);
		return fragment$1;
	}
	_err(token, code$2, beforeToken) {
		var _a;
		if (!this.onParseError) return;
		const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
		const err = {
			code: code$2,
			startLine: loc.startLine,
			startCol: loc.startCol,
			startOffset: loc.startOffset,
			endLine: beforeToken ? loc.startLine : loc.endLine,
			endCol: beforeToken ? loc.startCol : loc.endCol,
			endOffset: beforeToken ? loc.startOffset : loc.endOffset
		};
		this.onParseError(err);
	}
	onItemPush(node, tid, isTop) {
		var _a, _b;
		(_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 || _b.call(_a, node);
		if (isTop && this.openElements.stackTop > 0) this._setContextModes(node, tid);
	}
	onItemPop(node, isTop) {
		var _a, _b;
		if (this.options.sourceCodeLocationInfo) this._setEndLocation(node, this.currentToken);
		(_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 || _b.call(_a, node, this.openElements.current);
		if (isTop) {
			let current;
			let currentTagId;
			if (this.openElements.stackTop === 0 && this.fragmentContext) {
				current = this.fragmentContext;
				currentTagId = this.fragmentContextID;
			} else ({current, currentTagId} = this.openElements);
			this._setContextModes(current, currentTagId);
		}
	}
	_setContextModes(current, tid) {
		const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
		this.currentNotInHTML = !isHTML;
		this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
	}
	_switchToTextParsing(currentToken, nextTokenizerState) {
		this._insertElement(currentToken, NS.HTML);
		this.tokenizer.state = nextTokenizerState;
		this.originalInsertionMode = this.insertionMode;
		this.insertionMode = InsertionMode.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = InsertionMode.TEXT;
		this.originalInsertionMode = InsertionMode.IN_BODY;
		this.tokenizer.state = TokenizerMode.PLAINTEXT;
	}
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	_findFormInFragmentContext() {
		let node = this.fragmentContext;
		while (node) {
			if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
				this.formElement = node;
				break;
			}
			node = this.treeAdapter.getParentNode(node);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) return;
		switch (this.fragmentContextID) {
			case TAG_ID.TITLE:
			case TAG_ID.TEXTAREA:
				this.tokenizer.state = TokenizerMode.RCDATA;
				break;
			case TAG_ID.STYLE:
			case TAG_ID.XMP:
			case TAG_ID.IFRAME:
			case TAG_ID.NOEMBED:
			case TAG_ID.NOFRAMES:
			case TAG_ID.NOSCRIPT:
				this.tokenizer.state = TokenizerMode.RAWTEXT;
				break;
			case TAG_ID.SCRIPT:
				this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
				break;
			case TAG_ID.PLAINTEXT:
				this.tokenizer.state = TokenizerMode.PLAINTEXT;
				break;
			default:
		}
	}
	_setDocumentType(token) {
		const name$1 = token.name || "";
		const publicId = token.publicId || "";
		const systemId = token.systemId || "";
		this.treeAdapter.setDocumentType(this.document, name$1, publicId, systemId);
		if (token.location) {
			const docTypeNode = this.treeAdapter.getChildNodes(this.document).find((node) => this.treeAdapter.isDocumentTypeNode(node));
			if (docTypeNode) this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
		}
	}
	_attachElementToTree(element$5, location$1) {
		if (this.options.sourceCodeLocationInfo) {
			const loc = location$1 && {
				...location$1,
				startTag: location$1
			};
			this.treeAdapter.setNodeSourceCodeLocation(element$5, loc);
		}
		if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(element$5);
		else {
			const parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element$5);
		}
	}
	_appendElement(token, namespaceURI) {
		const element$5 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element$5, token.location);
	}
	_insertElement(token, namespaceURI) {
		const element$5 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element$5, token.location);
		this.openElements.push(element$5, token.tagID);
	}
	_insertFakeElement(tagName, tagID) {
		const element$5 = this.treeAdapter.createElement(tagName, NS.HTML, []);
		this._attachElementToTree(element$5, null);
		this.openElements.push(element$5, tagID);
	}
	_insertTemplate(token) {
		const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
		const content = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(tmpl, content);
		this._attachElementToTree(tmpl, token.location);
		this.openElements.push(tmpl, token.tagID);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(content, null);
	}
	_insertFakeRootElement() {
		const element$5 = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(element$5, null);
		this.treeAdapter.appendChild(this.openElements.current, element$5);
		this.openElements.push(element$5, TAG_ID.HTML);
	}
	_appendCommentNode(token, parent) {
		const commentNode = this.treeAdapter.createCommentNode(token.data);
		this.treeAdapter.appendChild(parent, commentNode);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
	}
	_insertCharacters(token) {
		let parent;
		let beforeElement;
		if (this._shouldFosterParentOnInsertion()) {
			({parent, beforeElement} = this._findFosterParentingLocation());
			if (beforeElement) this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
			else this.treeAdapter.insertText(parent, token.chars);
		} else {
			parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.insertText(parent, token.chars);
		}
		if (!token.location) return;
		const siblings = this.treeAdapter.getChildNodes(parent);
		const textNode = siblings[(beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(textNode)) {
			const { endLine, endCol, endOffset } = token.location;
			this.treeAdapter.updateNodeSourceCodeLocation(textNode, {
				endLine,
				endCol,
				endOffset
			});
		} else if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
	}
	_adoptNodes(donor, recipient) {
		for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
			this.treeAdapter.detachNode(child);
			this.treeAdapter.appendChild(recipient, child);
		}
	}
	_setEndLocation(element$5, closingToken) {
		if (this.treeAdapter.getNodeSourceCodeLocation(element$5) && closingToken.location) {
			const ctLoc = closingToken.location;
			const tn$2 = this.treeAdapter.getTagName(element$5);
			const endLoc = closingToken.type === TokenType.END_TAG && tn$2 === closingToken.tagName ? {
				endTag: { ...ctLoc },
				endLine: ctLoc.endLine,
				endCol: ctLoc.endCol,
				endOffset: ctLoc.endOffset
			} : {
				endLine: ctLoc.startLine,
				endCol: ctLoc.startCol,
				endOffset: ctLoc.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(element$5, endLoc);
		}
	}
	shouldProcessStartTagTokenInForeignContent(token) {
		if (!this.currentNotInHTML) return false;
		let current;
		let currentTagId;
		if (this.openElements.stackTop === 0 && this.fragmentContext) {
			current = this.fragmentContext;
			currentTagId = this.fragmentContextID;
		} else ({current, currentTagId} = this.openElements);
		if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) return false;
		return this.tokenizer.inForeignNode || (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML);
	}
	_processToken(token) {
		switch (token.type) {
			case TokenType.CHARACTER:
				this.onCharacter(token);
				break;
			case TokenType.NULL_CHARACTER:
				this.onNullCharacter(token);
				break;
			case TokenType.COMMENT:
				this.onComment(token);
				break;
			case TokenType.DOCTYPE:
				this.onDoctype(token);
				break;
			case TokenType.START_TAG:
				this._processStartTag(token);
				break;
			case TokenType.END_TAG:
				this.onEndTag(token);
				break;
			case TokenType.EOF:
				this.onEof(token);
				break;
			case TokenType.WHITESPACE_CHARACTER:
				this.onWhitespaceCharacter(token);
				break;
		}
	}
	_isIntegrationPoint(tid, element$5, foreignNS) {
		return isIntegrationPoint(tid, this.treeAdapter.getNamespaceURI(element$5), this.treeAdapter.getAttrList(element$5), foreignNS);
	}
	_reconstructActiveFormattingElements() {
		const listLength = this.activeFormattingElements.entries.length;
		if (listLength) {
			const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
			const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
			for (let i = unopenIdx; i >= 0; i--) {
				const entry = this.activeFormattingElements.entries[i];
				this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
				entry.element = this.openElements.current;
			}
		}
	}
	_closeTableCell() {
		this.openElements.generateImpliedEndTags();
		this.openElements.popUntilTableCellPopped();
		this.activeFormattingElements.clearToLastMarker();
		this.insertionMode = InsertionMode.IN_ROW;
	}
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
		this.openElements.popUntilTagNamePopped(TAG_ID.P);
	}
	_resetInsertionMode() {
		for (let i = this.openElements.stackTop; i >= 0; i--) switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
			case TAG_ID.TR:
				this.insertionMode = InsertionMode.IN_ROW;
				return;
			case TAG_ID.TBODY:
			case TAG_ID.THEAD:
			case TAG_ID.TFOOT:
				this.insertionMode = InsertionMode.IN_TABLE_BODY;
				return;
			case TAG_ID.CAPTION:
				this.insertionMode = InsertionMode.IN_CAPTION;
				return;
			case TAG_ID.COLGROUP:
				this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
				return;
			case TAG_ID.TABLE:
				this.insertionMode = InsertionMode.IN_TABLE;
				return;
			case TAG_ID.BODY:
				this.insertionMode = InsertionMode.IN_BODY;
				return;
			case TAG_ID.FRAMESET:
				this.insertionMode = InsertionMode.IN_FRAMESET;
				return;
			case TAG_ID.SELECT:
				this._resetInsertionModeForSelect(i);
				return;
			case TAG_ID.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[0];
				return;
			case TAG_ID.HTML:
				this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
				return;
			case TAG_ID.TD:
			case TAG_ID.TH:
				if (i > 0) {
					this.insertionMode = InsertionMode.IN_CELL;
					return;
				}
				break;
			case TAG_ID.HEAD:
				if (i > 0) {
					this.insertionMode = InsertionMode.IN_HEAD;
					return;
				}
				break;
		}
		this.insertionMode = InsertionMode.IN_BODY;
	}
	_resetInsertionModeForSelect(selectIdx) {
		if (selectIdx > 0) for (let i = selectIdx - 1; i > 0; i--) {
			const tn$2 = this.openElements.tagIDs[i];
			if (tn$2 === TAG_ID.TEMPLATE) break;
			else if (tn$2 === TAG_ID.TABLE) {
				this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = InsertionMode.IN_SELECT;
	}
	_isElementCausesFosterParenting(tn$2) {
		return TABLE_STRUCTURE_TAGS.has(tn$2);
	}
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	_findFosterParentingLocation() {
		for (let i = this.openElements.stackTop; i >= 0; i--) {
			const openElement = this.openElements.items[i];
			switch (this.openElements.tagIDs[i]) {
				case TAG_ID.TEMPLATE:
					if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) return {
						parent: this.treeAdapter.getTemplateContent(openElement),
						beforeElement: null
					};
					break;
				case TAG_ID.TABLE: {
					const parent = this.treeAdapter.getParentNode(openElement);
					if (parent) return {
						parent,
						beforeElement: openElement
					};
					return {
						parent: this.openElements.items[i - 1],
						beforeElement: null
					};
				}
				default:
			}
		}
		return {
			parent: this.openElements.items[0],
			beforeElement: null
		};
	}
	_fosterParentElement(element$5) {
		const location$1 = this._findFosterParentingLocation();
		if (location$1.beforeElement) this.treeAdapter.insertBefore(location$1.parent, element$5, location$1.beforeElement);
		else this.treeAdapter.appendChild(location$1.parent, element$5);
	}
	_isSpecialElement(element$5, id) {
		return SPECIAL_ELEMENTS[this.treeAdapter.getNamespaceURI(element$5)].has(id);
	}
	onCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			characterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
				characterInBody(this, token);
				break;
			case InsertionMode.TEXT:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				characterInTableText(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				tokenAfterAfterBody(this, token);
				break;
			default:
		}
	}
	onNullCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			nullCharacterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.TEXT:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				tokenAfterAfterBody(this, token);
				break;
			default:
		}
	}
	onComment(token) {
		this.skipNextNewLine = false;
		if (this.currentNotInHTML) {
			appendComment(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
			case InsertionMode.BEFORE_HTML:
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				appendComment(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				appendCommentToRootHtmlElement(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET:
				appendCommentToDocument(this, token);
				break;
			default:
		}
	}
	onDoctype(token) {
		this.skipNextNewLine = false;
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				doctypeInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
				this._err(token, ERR.misplacedDoctype);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			default:
		}
	}
	onStartTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		this._processStartTag(token);
		if (token.selfClosing && !token.ackSelfClosing) this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	_processStartTag(token) {
		if (this.shouldProcessStartTagTokenInForeignContent(token)) startTagInForeignContent(this, token);
		else this._startTagOutsideForeignContent(token);
	}
	_startTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				startTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				startTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				startTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				startTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				startTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				startTagInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
				startTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				startTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				startTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				startTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				startTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				startTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				startTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				startTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				startTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				startTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				startTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				startTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				startTagAfterAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_FRAMESET:
				startTagAfterAfterFrameset(this, token);
				break;
			default:
		}
	}
	onEndTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		if (this.currentNotInHTML) endTagInForeignContent(this, token);
		else this._endTagOutsideForeignContent(token);
	}
	_endTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				endTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				endTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				endTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				endTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				endTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				endTagInBody(this, token);
				break;
			case InsertionMode.TEXT:
				endTagInText(this, token);
				break;
			case InsertionMode.IN_TABLE:
				endTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				endTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				endTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				endTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				endTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				endTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				endTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				endTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				endTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				endTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				endTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				endTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				tokenAfterAfterBody(this, token);
				break;
			default:
		}
	}
	onEof(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				eofInBody(this, token);
				break;
			case InsertionMode.TEXT:
				eofInText(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				eofInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET:
				stopParsing(this, token);
				break;
			default:
		}
	}
	onWhitespaceCharacter(token) {
		if (this.skipNextNewLine) {
			this.skipNextNewLine = false;
			if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
				if (token.chars.length === 1) return;
				token.chars = token.chars.substr(1);
			}
		}
		if (this.tokenizer.inForeignNode) {
			this._insertCharacters(token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.TEXT:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.AFTER_BODY:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET:
				whitespaceCharacterInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				whitespaceCharacterInTableText(this, token);
				break;
			default:
		}
	}
};
function aaObtainFormattingElementEntry(p$1, token) {
	let formattingElementEntry = p$1.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
	if (formattingElementEntry) {
		if (!p$1.openElements.contains(formattingElementEntry.element)) {
			p$1.activeFormattingElements.removeEntry(formattingElementEntry);
			formattingElementEntry = null;
		} else if (!p$1.openElements.hasInScope(token.tagID)) formattingElementEntry = null;
	} else genericEndTagInBody(p$1, token);
	return formattingElementEntry;
}
function aaObtainFurthestBlock(p$1, formattingElementEntry) {
	let furthestBlock = null;
	let idx = p$1.openElements.stackTop;
	for (; idx >= 0; idx--) {
		const element$5 = p$1.openElements.items[idx];
		if (element$5 === formattingElementEntry.element) break;
		if (p$1._isSpecialElement(element$5, p$1.openElements.tagIDs[idx])) furthestBlock = element$5;
	}
	if (!furthestBlock) {
		p$1.openElements.shortenToLength(Math.max(idx, 0));
		p$1.activeFormattingElements.removeEntry(formattingElementEntry);
	}
	return furthestBlock;
}
function aaInnerLoop(p$1, furthestBlock, formattingElement) {
	let lastElement = furthestBlock;
	let nextElement = p$1.openElements.getCommonAncestor(furthestBlock);
	for (let i = 0, element$5 = nextElement; element$5 !== formattingElement; i++, element$5 = nextElement) {
		nextElement = p$1.openElements.getCommonAncestor(element$5);
		const elementEntry = p$1.activeFormattingElements.getElementEntry(element$5);
		const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
		if (!elementEntry || counterOverflow) {
			if (counterOverflow) p$1.activeFormattingElements.removeEntry(elementEntry);
			p$1.openElements.remove(element$5);
		} else {
			element$5 = aaRecreateElementFromEntry(p$1, elementEntry);
			if (lastElement === furthestBlock) p$1.activeFormattingElements.bookmark = elementEntry;
			p$1.treeAdapter.detachNode(lastElement);
			p$1.treeAdapter.appendChild(element$5, lastElement);
			lastElement = element$5;
		}
	}
	return lastElement;
}
function aaRecreateElementFromEntry(p$1, elementEntry) {
	const ns$1 = p$1.treeAdapter.getNamespaceURI(elementEntry.element);
	const newElement = p$1.treeAdapter.createElement(elementEntry.token.tagName, ns$1, elementEntry.token.attrs);
	p$1.openElements.replace(elementEntry.element, newElement);
	elementEntry.element = newElement;
	return newElement;
}
function aaInsertLastNodeInCommonAncestor(p$1, commonAncestor, lastElement) {
	const tid = getTagID(p$1.treeAdapter.getTagName(commonAncestor));
	if (p$1._isElementCausesFosterParenting(tid)) p$1._fosterParentElement(lastElement);
	else {
		const ns$1 = p$1.treeAdapter.getNamespaceURI(commonAncestor);
		if (tid === TAG_ID.TEMPLATE && ns$1 === NS.HTML) commonAncestor = p$1.treeAdapter.getTemplateContent(commonAncestor);
		p$1.treeAdapter.appendChild(commonAncestor, lastElement);
	}
}
function aaReplaceFormattingElement(p$1, furthestBlock, formattingElementEntry) {
	const ns$1 = p$1.treeAdapter.getNamespaceURI(formattingElementEntry.element);
	const { token } = formattingElementEntry;
	const newElement = p$1.treeAdapter.createElement(token.tagName, ns$1, token.attrs);
	p$1._adoptNodes(furthestBlock, newElement);
	p$1.treeAdapter.appendChild(furthestBlock, newElement);
	p$1.activeFormattingElements.insertElementAfterBookmark(newElement, token);
	p$1.activeFormattingElements.removeEntry(formattingElementEntry);
	p$1.openElements.remove(formattingElementEntry.element);
	p$1.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p$1, token) {
	for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
		const formattingElementEntry = aaObtainFormattingElementEntry(p$1, token);
		if (!formattingElementEntry) break;
		const furthestBlock = aaObtainFurthestBlock(p$1, formattingElementEntry);
		if (!furthestBlock) break;
		p$1.activeFormattingElements.bookmark = formattingElementEntry;
		const lastElement = aaInnerLoop(p$1, furthestBlock, formattingElementEntry.element);
		const commonAncestor = p$1.openElements.getCommonAncestor(formattingElementEntry.element);
		p$1.treeAdapter.detachNode(lastElement);
		if (commonAncestor) aaInsertLastNodeInCommonAncestor(p$1, commonAncestor, lastElement);
		aaReplaceFormattingElement(p$1, furthestBlock, formattingElementEntry);
	}
}
function appendComment(p$1, token) {
	p$1._appendCommentNode(token, p$1.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p$1, token) {
	p$1._appendCommentNode(token, p$1.openElements.items[0]);
}
function appendCommentToDocument(p$1, token) {
	p$1._appendCommentNode(token, p$1.document);
}
function stopParsing(p$1, token) {
	p$1.stopped = true;
	if (token.location) {
		const target = p$1.fragmentContext ? 0 : 2;
		for (let i = p$1.openElements.stackTop; i >= target; i--) p$1._setEndLocation(p$1.openElements.items[i], token);
		if (!p$1.fragmentContext && p$1.openElements.stackTop >= 0) {
			const htmlElement = p$1.openElements.items[0];
			const htmlLocation = p$1.treeAdapter.getNodeSourceCodeLocation(htmlElement);
			if (htmlLocation && !htmlLocation.endTag) {
				p$1._setEndLocation(htmlElement, token);
				if (p$1.openElements.stackTop >= 1) {
					const bodyElement = p$1.openElements.items[1];
					const bodyLocation = p$1.treeAdapter.getNodeSourceCodeLocation(bodyElement);
					if (bodyLocation && !bodyLocation.endTag) p$1._setEndLocation(bodyElement, token);
				}
			}
		}
	}
}
function doctypeInInitialMode(p$1, token) {
	p$1._setDocumentType(token);
	const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
	if (!isConforming(token)) p$1._err(token, ERR.nonConformingDoctype);
	p$1.treeAdapter.setDocumentMode(p$1.document, mode);
	p$1.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p$1, token) {
	p$1._err(token, ERR.missingDoctype, true);
	p$1.treeAdapter.setDocumentMode(p$1.document, DOCUMENT_MODE.QUIRKS);
	p$1.insertionMode = InsertionMode.BEFORE_HTML;
	p$1._processToken(token);
}
function startTagBeforeHtml(p$1, token) {
	if (token.tagID === TAG_ID.HTML) {
		p$1._insertElement(token, NS.HTML);
		p$1.insertionMode = InsertionMode.BEFORE_HEAD;
	} else tokenBeforeHtml(p$1, token);
}
function endTagBeforeHtml(p$1, token) {
	const tn$2 = token.tagID;
	if (tn$2 === TAG_ID.HTML || tn$2 === TAG_ID.HEAD || tn$2 === TAG_ID.BODY || tn$2 === TAG_ID.BR) tokenBeforeHtml(p$1, token);
}
function tokenBeforeHtml(p$1, token) {
	p$1._insertFakeRootElement();
	p$1.insertionMode = InsertionMode.BEFORE_HEAD;
	p$1._processToken(token);
}
function startTagBeforeHead(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.HEAD:
			p$1._insertElement(token, NS.HTML);
			p$1.headElement = p$1.openElements.current;
			p$1.insertionMode = InsertionMode.IN_HEAD;
			break;
		default: tokenBeforeHead(p$1, token);
	}
}
function endTagBeforeHead(p$1, token) {
	const tn$2 = token.tagID;
	if (tn$2 === TAG_ID.HEAD || tn$2 === TAG_ID.BODY || tn$2 === TAG_ID.HTML || tn$2 === TAG_ID.BR) tokenBeforeHead(p$1, token);
	else p$1._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenBeforeHead(p$1, token) {
	p$1._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
	p$1.headElement = p$1.openElements.current;
	p$1.insertionMode = InsertionMode.IN_HEAD;
	p$1._processToken(token);
}
function startTagInHead(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
			p$1._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TITLE:
			p$1._switchToTextParsing(token, TokenizerMode.RCDATA);
			break;
		case TAG_ID.NOSCRIPT:
			if (p$1.options.scriptingEnabled) p$1._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			else {
				p$1._insertElement(token, NS.HTML);
				p$1.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
			}
			break;
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			p$1._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			break;
		case TAG_ID.SCRIPT:
			p$1._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
			break;
		case TAG_ID.TEMPLATE:
			p$1._insertTemplate(token);
			p$1.activeFormattingElements.insertMarker();
			p$1.framesetOk = false;
			p$1.insertionMode = InsertionMode.IN_TEMPLATE;
			p$1.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
			break;
		case TAG_ID.HEAD:
			p$1._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenInHead(p$1, token);
	}
}
function endTagInHead(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HEAD:
			p$1.openElements.pop();
			p$1.insertionMode = InsertionMode.AFTER_HEAD;
			break;
		case TAG_ID.BODY:
		case TAG_ID.BR:
		case TAG_ID.HTML:
			tokenInHead(p$1, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		default: p$1._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function templateEndTagInHead(p$1, token) {
	if (p$1.openElements.tmplCount > 0) {
		p$1.openElements.generateImpliedEndTagsThoroughly();
		if (p$1.openElements.currentTagId !== TAG_ID.TEMPLATE) p$1._err(token, ERR.closingOfElementWithOpenChildElements);
		p$1.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p$1.activeFormattingElements.clearToLastMarker();
		p$1.tmplInsertionModeStack.shift();
		p$1._resetInsertionMode();
	} else p$1._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenInHead(p$1, token) {
	p$1.openElements.pop();
	p$1.insertionMode = InsertionMode.AFTER_HEAD;
	p$1._processToken(token);
}
function startTagInHeadNoScript(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.HEAD:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			startTagInHead(p$1, token);
			break;
		case TAG_ID.NOSCRIPT:
			p$1._err(token, ERR.nestedNoscriptInHead);
			break;
		default: tokenInHeadNoScript(p$1, token);
	}
}
function endTagInHeadNoScript(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.NOSCRIPT:
			p$1.openElements.pop();
			p$1.insertionMode = InsertionMode.IN_HEAD;
			break;
		case TAG_ID.BR:
			tokenInHeadNoScript(p$1, token);
			break;
		default: p$1._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenInHeadNoScript(p$1, token) {
	const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
	p$1._err(token, errCode);
	p$1.openElements.pop();
	p$1.insertionMode = InsertionMode.IN_HEAD;
	p$1._processToken(token);
}
function startTagAfterHead(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.BODY:
			p$1._insertElement(token, NS.HTML);
			p$1.framesetOk = false;
			p$1.insertionMode = InsertionMode.IN_BODY;
			break;
		case TAG_ID.FRAMESET:
			p$1._insertElement(token, NS.HTML);
			p$1.insertionMode = InsertionMode.IN_FRAMESET;
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			p$1._err(token, ERR.abandonedHeadElementChild);
			p$1.openElements.push(p$1.headElement, TAG_ID.HEAD);
			startTagInHead(p$1, token);
			p$1.openElements.remove(p$1.headElement);
			break;
		case TAG_ID.HEAD:
			p$1._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenAfterHead(p$1, token);
	}
}
function endTagAfterHead(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.BODY:
		case TAG_ID.HTML:
		case TAG_ID.BR:
			tokenAfterHead(p$1, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		default: p$1._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenAfterHead(p$1, token) {
	p$1._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
	p$1.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p$1, token);
}
function modeInBody(p$1, token) {
	switch (token.type) {
		case TokenType.CHARACTER:
			characterInBody(p$1, token);
			break;
		case TokenType.WHITESPACE_CHARACTER:
			whitespaceCharacterInBody(p$1, token);
			break;
		case TokenType.COMMENT:
			appendComment(p$1, token);
			break;
		case TokenType.START_TAG:
			startTagInBody(p$1, token);
			break;
		case TokenType.END_TAG:
			endTagInBody(p$1, token);
			break;
		case TokenType.EOF:
			eofInBody(p$1, token);
			break;
		default:
	}
}
function whitespaceCharacterInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertCharacters(token);
}
function characterInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertCharacters(token);
	p$1.framesetOk = false;
}
function htmlStartTagInBody(p$1, token) {
	if (p$1.openElements.tmplCount === 0) p$1.treeAdapter.adoptAttributes(p$1.openElements.items[0], token.attrs);
}
function bodyStartTagInBody(p$1, token) {
	const bodyElement = p$1.openElements.tryPeekProperlyNestedBodyElement();
	if (bodyElement && p$1.openElements.tmplCount === 0) {
		p$1.framesetOk = false;
		p$1.treeAdapter.adoptAttributes(bodyElement, token.attrs);
	}
}
function framesetStartTagInBody(p$1, token) {
	const bodyElement = p$1.openElements.tryPeekProperlyNestedBodyElement();
	if (p$1.framesetOk && bodyElement) {
		p$1.treeAdapter.detachNode(bodyElement);
		p$1.openElements.popAllUpToHtmlElement();
		p$1._insertElement(token, NS.HTML);
		p$1.insertionMode = InsertionMode.IN_FRAMESET;
	}
}
function addressStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	if (p$1.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p$1.openElements.currentTagId)) p$1.openElements.pop();
	p$1._insertElement(token, NS.HTML);
}
function preStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._insertElement(token, NS.HTML);
	p$1.skipNextNewLine = true;
	p$1.framesetOk = false;
}
function formStartTagInBody(p$1, token) {
	const inTemplate = p$1.openElements.tmplCount > 0;
	if (!p$1.formElement || inTemplate) {
		if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
		p$1._insertElement(token, NS.HTML);
		if (!inTemplate) p$1.formElement = p$1.openElements.current;
	}
}
function listItemStartTagInBody(p$1, token) {
	p$1.framesetOk = false;
	const tn$2 = token.tagID;
	for (let i = p$1.openElements.stackTop; i >= 0; i--) {
		const elementId = p$1.openElements.tagIDs[i];
		if (tn$2 === TAG_ID.LI && elementId === TAG_ID.LI || (tn$2 === TAG_ID.DD || tn$2 === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
			p$1.openElements.generateImpliedEndTagsWithExclusion(elementId);
			p$1.openElements.popUntilTagNamePopped(elementId);
			break;
		}
		if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p$1._isSpecialElement(p$1.openElements.items[i], elementId)) break;
	}
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._insertElement(token, NS.HTML);
	p$1.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInScope(TAG_ID.BUTTON)) {
		p$1.openElements.generateImpliedEndTags();
		p$1.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
	}
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
	p$1.framesetOk = false;
}
function aStartTagInBody(p$1, token) {
	const activeElementEntry = p$1.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
	if (activeElementEntry) {
		callAdoptionAgency(p$1, token);
		p$1.openElements.remove(activeElementEntry.element);
		p$1.activeFormattingElements.removeEntry(activeElementEntry);
	}
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
	p$1.activeFormattingElements.pushElement(p$1.openElements.current, token);
}
function bStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
	p$1.activeFormattingElements.pushElement(p$1.openElements.current, token);
}
function nobrStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	if (p$1.openElements.hasInScope(TAG_ID.NOBR)) {
		callAdoptionAgency(p$1, token);
		p$1._reconstructActiveFormattingElements();
	}
	p$1._insertElement(token, NS.HTML);
	p$1.activeFormattingElements.pushElement(p$1.openElements.current, token);
}
function appletStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
	p$1.activeFormattingElements.insertMarker();
	p$1.framesetOk = false;
}
function tableStartTagInBody(p$1, token) {
	if (p$1.treeAdapter.getDocumentMode(p$1.document) !== DOCUMENT_MODE.QUIRKS && p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._insertElement(token, NS.HTML);
	p$1.framesetOk = false;
	p$1.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._appendElement(token, NS.HTML);
	p$1.framesetOk = false;
	token.ackSelfClosing = true;
}
function isHiddenInput(token) {
	const inputType = getTokenAttr(token, ATTRS.TYPE);
	return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._appendElement(token, NS.HTML);
	if (!isHiddenInput(token)) p$1.framesetOk = false;
	token.ackSelfClosing = true;
}
function paramStartTagInBody(p$1, token) {
	p$1._appendElement(token, NS.HTML);
	token.ackSelfClosing = true;
}
function hrStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._appendElement(token, NS.HTML);
	p$1.framesetOk = false;
	token.ackSelfClosing = true;
}
function imageStartTagInBody(p$1, token) {
	token.tagName = TAG_NAMES.IMG;
	token.tagID = TAG_ID.IMG;
	areaStartTagInBody(p$1, token);
}
function textareaStartTagInBody(p$1, token) {
	p$1._insertElement(token, NS.HTML);
	p$1.skipNextNewLine = true;
	p$1.tokenizer.state = TokenizerMode.RCDATA;
	p$1.originalInsertionMode = p$1.insertionMode;
	p$1.framesetOk = false;
	p$1.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._closePElement();
	p$1._reconstructActiveFormattingElements();
	p$1.framesetOk = false;
	p$1._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p$1, token) {
	p$1.framesetOk = false;
	p$1._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p$1, token) {
	p$1._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
	p$1.framesetOk = false;
	p$1.insertionMode = p$1.insertionMode === InsertionMode.IN_TABLE || p$1.insertionMode === InsertionMode.IN_CAPTION || p$1.insertionMode === InsertionMode.IN_TABLE_BODY || p$1.insertionMode === InsertionMode.IN_ROW || p$1.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p$1, token) {
	if (p$1.openElements.currentTagId === TAG_ID.OPTION) p$1.openElements.pop();
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInScope(TAG_ID.RUBY)) p$1.openElements.generateImpliedEndTags();
	p$1._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p$1, token) {
	if (p$1.openElements.hasInScope(TAG_ID.RUBY)) p$1.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
	p$1._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	adjustTokenMathMLAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p$1._appendElement(token, NS.MATHML);
	else p$1._insertElement(token, NS.MATHML);
	token.ackSelfClosing = true;
}
function svgStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	adjustTokenSVGAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p$1._appendElement(token, NS.SVG);
	else p$1._insertElement(token, NS.SVG);
	token.ackSelfClosing = true;
}
function genericStartTagInBody(p$1, token) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertElement(token, NS.HTML);
}
function startTagInBody(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.B:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			bStartTagInBody(p$1, token);
			break;
		case TAG_ID.A:
			aStartTagInBody(p$1, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderStartTagInBody(p$1, token);
			break;
		case TAG_ID.P:
		case TAG_ID.DL:
		case TAG_ID.OL:
		case TAG_ID.UL:
		case TAG_ID.DIV:
		case TAG_ID.DIR:
		case TAG_ID.NAV:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.DETAILS:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressStartTagInBody(p$1, token);
			break;
		case TAG_ID.LI:
		case TAG_ID.DD:
		case TAG_ID.DT:
			listItemStartTagInBody(p$1, token);
			break;
		case TAG_ID.BR:
		case TAG_ID.IMG:
		case TAG_ID.WBR:
		case TAG_ID.AREA:
		case TAG_ID.EMBED:
		case TAG_ID.KEYGEN:
			areaStartTagInBody(p$1, token);
			break;
		case TAG_ID.HR:
			hrStartTagInBody(p$1, token);
			break;
		case TAG_ID.RB:
		case TAG_ID.RTC:
			rbStartTagInBody(p$1, token);
			break;
		case TAG_ID.RT:
		case TAG_ID.RP:
			rtStartTagInBody(p$1, token);
			break;
		case TAG_ID.PRE:
		case TAG_ID.LISTING:
			preStartTagInBody(p$1, token);
			break;
		case TAG_ID.XMP:
			xmpStartTagInBody(p$1, token);
			break;
		case TAG_ID.SVG:
			svgStartTagInBody(p$1, token);
			break;
		case TAG_ID.HTML:
			htmlStartTagInBody(p$1, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.STYLE:
		case TAG_ID.TITLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.BGSOUND:
		case TAG_ID.BASEFONT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p$1, token);
			break;
		case TAG_ID.BODY:
			bodyStartTagInBody(p$1, token);
			break;
		case TAG_ID.FORM:
			formStartTagInBody(p$1, token);
			break;
		case TAG_ID.NOBR:
			nobrStartTagInBody(p$1, token);
			break;
		case TAG_ID.MATH:
			mathStartTagInBody(p$1, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInBody(p$1, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInBody(p$1, token);
			break;
		case TAG_ID.PARAM:
		case TAG_ID.TRACK:
		case TAG_ID.SOURCE:
			paramStartTagInBody(p$1, token);
			break;
		case TAG_ID.IMAGE:
			imageStartTagInBody(p$1, token);
			break;
		case TAG_ID.BUTTON:
			buttonStartTagInBody(p$1, token);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletStartTagInBody(p$1, token);
			break;
		case TAG_ID.IFRAME:
			iframeStartTagInBody(p$1, token);
			break;
		case TAG_ID.SELECT:
			selectStartTagInBody(p$1, token);
			break;
		case TAG_ID.OPTION:
		case TAG_ID.OPTGROUP:
			optgroupStartTagInBody(p$1, token);
			break;
		case TAG_ID.NOEMBED:
		case TAG_ID.NOFRAMES:
			rawTextStartTagInBody(p$1, token);
			break;
		case TAG_ID.FRAMESET:
			framesetStartTagInBody(p$1, token);
			break;
		case TAG_ID.TEXTAREA:
			textareaStartTagInBody(p$1, token);
			break;
		case TAG_ID.NOSCRIPT:
			if (p$1.options.scriptingEnabled) rawTextStartTagInBody(p$1, token);
			else genericStartTagInBody(p$1, token);
			break;
		case TAG_ID.PLAINTEXT:
			plaintextStartTagInBody(p$1, token);
			break;
		case TAG_ID.COL:
		case TAG_ID.TH:
		case TAG_ID.TD:
		case TAG_ID.TR:
		case TAG_ID.HEAD:
		case TAG_ID.FRAME:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP: break;
		default: genericStartTagInBody(p$1, token);
	}
}
function bodyEndTagInBody(p$1, token) {
	if (p$1.openElements.hasInScope(TAG_ID.BODY)) {
		p$1.insertionMode = InsertionMode.AFTER_BODY;
		if (p$1.options.sourceCodeLocationInfo) {
			const bodyElement = p$1.openElements.tryPeekProperlyNestedBodyElement();
			if (bodyElement) p$1._setEndLocation(bodyElement, token);
		}
	}
}
function htmlEndTagInBody(p$1, token) {
	if (p$1.openElements.hasInScope(TAG_ID.BODY)) {
		p$1.insertionMode = InsertionMode.AFTER_BODY;
		endTagAfterBody(p$1, token);
	}
}
function addressEndTagInBody(p$1, token) {
	const tn$2 = token.tagID;
	if (p$1.openElements.hasInScope(tn$2)) {
		p$1.openElements.generateImpliedEndTags();
		p$1.openElements.popUntilTagNamePopped(tn$2);
	}
}
function formEndTagInBody(p$1) {
	const inTemplate = p$1.openElements.tmplCount > 0;
	const { formElement } = p$1;
	if (!inTemplate) p$1.formElement = null;
	if ((formElement || inTemplate) && p$1.openElements.hasInScope(TAG_ID.FORM)) {
		p$1.openElements.generateImpliedEndTags();
		if (inTemplate) p$1.openElements.popUntilTagNamePopped(TAG_ID.FORM);
		else if (formElement) p$1.openElements.remove(formElement);
	}
}
function pEndTagInBody(p$1) {
	if (!p$1.openElements.hasInButtonScope(TAG_ID.P)) p$1._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
	p$1._closePElement();
}
function liEndTagInBody(p$1) {
	if (p$1.openElements.hasInListItemScope(TAG_ID.LI)) {
		p$1.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
		p$1.openElements.popUntilTagNamePopped(TAG_ID.LI);
	}
}
function ddEndTagInBody(p$1, token) {
	const tn$2 = token.tagID;
	if (p$1.openElements.hasInScope(tn$2)) {
		p$1.openElements.generateImpliedEndTagsWithExclusion(tn$2);
		p$1.openElements.popUntilTagNamePopped(tn$2);
	}
}
function numberedHeaderEndTagInBody(p$1) {
	if (p$1.openElements.hasNumberedHeaderInScope()) {
		p$1.openElements.generateImpliedEndTags();
		p$1.openElements.popUntilNumberedHeaderPopped();
	}
}
function appletEndTagInBody(p$1, token) {
	const tn$2 = token.tagID;
	if (p$1.openElements.hasInScope(tn$2)) {
		p$1.openElements.generateImpliedEndTags();
		p$1.openElements.popUntilTagNamePopped(tn$2);
		p$1.activeFormattingElements.clearToLastMarker();
	}
}
function brEndTagInBody(p$1) {
	p$1._reconstructActiveFormattingElements();
	p$1._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
	p$1.openElements.pop();
	p$1.framesetOk = false;
}
function genericEndTagInBody(p$1, token) {
	const tn$2 = token.tagName;
	const tid = token.tagID;
	for (let i = p$1.openElements.stackTop; i > 0; i--) {
		const element$5 = p$1.openElements.items[i];
		const elementId = p$1.openElements.tagIDs[i];
		if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p$1.treeAdapter.getTagName(element$5) === tn$2)) {
			p$1.openElements.generateImpliedEndTagsWithExclusion(tid);
			if (p$1.openElements.stackTop >= i) p$1.openElements.shortenToLength(i);
			break;
		}
		if (p$1._isSpecialElement(element$5, elementId)) break;
	}
}
function endTagInBody(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.A:
		case TAG_ID.B:
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.NOBR:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			callAdoptionAgency(p$1, token);
			break;
		case TAG_ID.P:
			pEndTagInBody(p$1);
			break;
		case TAG_ID.DL:
		case TAG_ID.UL:
		case TAG_ID.OL:
		case TAG_ID.DIR:
		case TAG_ID.DIV:
		case TAG_ID.NAV:
		case TAG_ID.PRE:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.BUTTON:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.DETAILS:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.LISTING:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressEndTagInBody(p$1, token);
			break;
		case TAG_ID.LI:
			liEndTagInBody(p$1);
			break;
		case TAG_ID.DD:
		case TAG_ID.DT:
			ddEndTagInBody(p$1, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderEndTagInBody(p$1);
			break;
		case TAG_ID.BR:
			brEndTagInBody(p$1);
			break;
		case TAG_ID.BODY:
			bodyEndTagInBody(p$1, token);
			break;
		case TAG_ID.HTML:
			htmlEndTagInBody(p$1, token);
			break;
		case TAG_ID.FORM:
			formEndTagInBody(p$1);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletEndTagInBody(p$1, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		default: genericEndTagInBody(p$1, token);
	}
}
function eofInBody(p$1, token) {
	if (p$1.tmplInsertionModeStack.length > 0) eofInTemplate(p$1, token);
	else stopParsing(p$1, token);
}
function endTagInText(p$1, token) {
	var _a;
	if (token.tagID === TAG_ID.SCRIPT) (_a = p$1.scriptHandler) === null || _a === void 0 || _a.call(p$1, p$1.openElements.current);
	p$1.openElements.pop();
	p$1.insertionMode = p$1.originalInsertionMode;
}
function eofInText(p$1, token) {
	p$1._err(token, ERR.eofInElementThatCanContainOnlyText);
	p$1.openElements.pop();
	p$1.insertionMode = p$1.originalInsertionMode;
	p$1.onEof(token);
}
function characterInTable(p$1, token) {
	if (p$1.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p$1.openElements.currentTagId)) {
		p$1.pendingCharacterTokens.length = 0;
		p$1.hasNonWhitespacePendingCharacterToken = false;
		p$1.originalInsertionMode = p$1.insertionMode;
		p$1.insertionMode = InsertionMode.IN_TABLE_TEXT;
		switch (token.type) {
			case TokenType.CHARACTER:
				characterInTableText(p$1, token);
				break;
			case TokenType.WHITESPACE_CHARACTER:
				whitespaceCharacterInTableText(p$1, token);
				break;
		}
	} else tokenInTable(p$1, token);
}
function captionStartTagInTable(p$1, token) {
	p$1.openElements.clearBackToTableContext();
	p$1.activeFormattingElements.insertMarker();
	p$1._insertElement(token, NS.HTML);
	p$1.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p$1, token) {
	p$1.openElements.clearBackToTableContext();
	p$1._insertElement(token, NS.HTML);
	p$1.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p$1, token) {
	p$1.openElements.clearBackToTableContext();
	p$1._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
	p$1.insertionMode = InsertionMode.IN_COLUMN_GROUP;
	startTagInColumnGroup(p$1, token);
}
function tbodyStartTagInTable(p$1, token) {
	p$1.openElements.clearBackToTableContext();
	p$1._insertElement(token, NS.HTML);
	p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p$1, token) {
	p$1.openElements.clearBackToTableContext();
	p$1._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
	p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
	startTagInTableBody(p$1, token);
}
function tableStartTagInTable(p$1, token) {
	if (p$1.openElements.hasInTableScope(TAG_ID.TABLE)) {
		p$1.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
		p$1._resetInsertionMode();
		p$1._processStartTag(token);
	}
}
function inputStartTagInTable(p$1, token) {
	if (isHiddenInput(token)) p$1._appendElement(token, NS.HTML);
	else tokenInTable(p$1, token);
	token.ackSelfClosing = true;
}
function formStartTagInTable(p$1, token) {
	if (!p$1.formElement && p$1.openElements.tmplCount === 0) {
		p$1._insertElement(token, NS.HTML);
		p$1.formElement = p$1.openElements.current;
		p$1.openElements.pop();
	}
}
function startTagInTable(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR:
			tdStartTagInTable(p$1, token);
			break;
		case TAG_ID.STYLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p$1, token);
			break;
		case TAG_ID.COL:
			colStartTagInTable(p$1, token);
			break;
		case TAG_ID.FORM:
			formStartTagInTable(p$1, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInTable(p$1, token);
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			tbodyStartTagInTable(p$1, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInTable(p$1, token);
			break;
		case TAG_ID.CAPTION:
			captionStartTagInTable(p$1, token);
			break;
		case TAG_ID.COLGROUP:
			colgroupStartTagInTable(p$1, token);
			break;
		default: tokenInTable(p$1, token);
	}
}
function endTagInTable(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.TABLE:
			if (p$1.openElements.hasInTableScope(TAG_ID.TABLE)) {
				p$1.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
				p$1._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: tokenInTable(p$1, token);
	}
}
function tokenInTable(p$1, token) {
	const savedFosterParentingState = p$1.fosterParentingEnabled;
	p$1.fosterParentingEnabled = true;
	modeInBody(p$1, token);
	p$1.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p$1, token) {
	p$1.pendingCharacterTokens.push(token);
}
function characterInTableText(p$1, token) {
	p$1.pendingCharacterTokens.push(token);
	p$1.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p$1, token) {
	let i = 0;
	if (p$1.hasNonWhitespacePendingCharacterToken) for (; i < p$1.pendingCharacterTokens.length; i++) tokenInTable(p$1, p$1.pendingCharacterTokens[i]);
	else for (; i < p$1.pendingCharacterTokens.length; i++) p$1._insertCharacters(p$1.pendingCharacterTokens[i]);
	p$1.insertionMode = p$1.originalInsertionMode;
	p$1._processToken(token);
}
var TABLE_VOID_ELEMENTS = new Set([
	TAG_ID.CAPTION,
	TAG_ID.COL,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
function startTagInCaption(p$1, token) {
	const tn$2 = token.tagID;
	if (TABLE_VOID_ELEMENTS.has(tn$2)) {
		if (p$1.openElements.hasInTableScope(TAG_ID.CAPTION)) {
			p$1.openElements.generateImpliedEndTags();
			p$1.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
			p$1.activeFormattingElements.clearToLastMarker();
			p$1.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p$1, token);
		}
	} else startTagInBody(p$1, token);
}
function endTagInCaption(p$1, token) {
	const tn$2 = token.tagID;
	switch (tn$2) {
		case TAG_ID.CAPTION:
		case TAG_ID.TABLE:
			if (p$1.openElements.hasInTableScope(TAG_ID.CAPTION)) {
				p$1.openElements.generateImpliedEndTags();
				p$1.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
				p$1.activeFormattingElements.clearToLastMarker();
				p$1.insertionMode = InsertionMode.IN_TABLE;
				if (tn$2 === TAG_ID.TABLE) endTagInTable(p$1, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: endTagInBody(p$1, token);
	}
}
function startTagInColumnGroup(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.COL:
			p$1._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TEMPLATE:
			startTagInHead(p$1, token);
			break;
		default: tokenInColumnGroup(p$1, token);
	}
}
function endTagInColumnGroup(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.COLGROUP:
			if (p$1.openElements.currentTagId === TAG_ID.COLGROUP) {
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		case TAG_ID.COL: break;
		default: tokenInColumnGroup(p$1, token);
	}
}
function tokenInColumnGroup(p$1, token) {
	if (p$1.openElements.currentTagId === TAG_ID.COLGROUP) {
		p$1.openElements.pop();
		p$1.insertionMode = InsertionMode.IN_TABLE;
		p$1._processToken(token);
	}
}
function startTagInTableBody(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			p$1.openElements.clearBackToTableBodyContext();
			p$1._insertElement(token, NS.HTML);
			p$1.insertionMode = InsertionMode.IN_ROW;
			break;
		case TAG_ID.TH:
		case TAG_ID.TD:
			p$1.openElements.clearBackToTableBodyContext();
			p$1._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
			p$1.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p$1, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p$1.openElements.hasTableBodyContextInTableScope()) {
				p$1.openElements.clearBackToTableBodyContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE;
				startTagInTable(p$1, token);
			}
			break;
		default: startTagInTable(p$1, token);
	}
}
function endTagInTableBody(p$1, token) {
	const tn$2 = token.tagID;
	switch (token.tagID) {
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p$1.openElements.hasInTableScope(tn$2)) {
				p$1.openElements.clearBackToTableBodyContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TABLE:
			if (p$1.openElements.hasTableBodyContextInTableScope()) {
				p$1.openElements.clearBackToTableBodyContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE;
				endTagInTable(p$1, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR: break;
		default: endTagInTable(p$1, token);
	}
}
function startTagInRow(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.TH:
		case TAG_ID.TD:
			p$1.openElements.clearBackToTableRowContext();
			p$1._insertElement(token, NS.HTML);
			p$1.insertionMode = InsertionMode.IN_CELL;
			p$1.activeFormattingElements.insertMarker();
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p$1.openElements.hasInTableScope(TAG_ID.TR)) {
				p$1.openElements.clearBackToTableRowContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
				startTagInTableBody(p$1, token);
			}
			break;
		default: startTagInTable(p$1, token);
	}
}
function endTagInRow(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			if (p$1.openElements.hasInTableScope(TAG_ID.TR)) {
				p$1.openElements.clearBackToTableRowContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
			}
			break;
		case TAG_ID.TABLE:
			if (p$1.openElements.hasInTableScope(TAG_ID.TR)) {
				p$1.openElements.clearBackToTableRowContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p$1, token);
			}
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p$1.openElements.hasInTableScope(token.tagID) || p$1.openElements.hasInTableScope(TAG_ID.TR)) {
				p$1.openElements.clearBackToTableRowContext();
				p$1.openElements.pop();
				p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p$1, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH: break;
		default: endTagInTable(p$1, token);
	}
}
function startTagInCell(p$1, token) {
	const tn$2 = token.tagID;
	if (TABLE_VOID_ELEMENTS.has(tn$2)) {
		if (p$1.openElements.hasInTableScope(TAG_ID.TD) || p$1.openElements.hasInTableScope(TAG_ID.TH)) {
			p$1._closeTableCell();
			startTagInRow(p$1, token);
		}
	} else startTagInBody(p$1, token);
}
function endTagInCell(p$1, token) {
	const tn$2 = token.tagID;
	switch (tn$2) {
		case TAG_ID.TD:
		case TAG_ID.TH:
			if (p$1.openElements.hasInTableScope(tn$2)) {
				p$1.openElements.generateImpliedEndTags();
				p$1.openElements.popUntilTagNamePopped(tn$2);
				p$1.activeFormattingElements.clearToLastMarker();
				p$1.insertionMode = InsertionMode.IN_ROW;
			}
			break;
		case TAG_ID.TABLE:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p$1.openElements.hasInTableScope(tn$2)) {
				p$1._closeTableCell();
				endTagInRow(p$1, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML: break;
		default: endTagInBody(p$1, token);
	}
}
function startTagInSelect(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.OPTION:
			if (p$1.openElements.currentTagId === TAG_ID.OPTION) p$1.openElements.pop();
			p$1._insertElement(token, NS.HTML);
			break;
		case TAG_ID.OPTGROUP:
			if (p$1.openElements.currentTagId === TAG_ID.OPTION) p$1.openElements.pop();
			if (p$1.openElements.currentTagId === TAG_ID.OPTGROUP) p$1.openElements.pop();
			p$1._insertElement(token, NS.HTML);
			break;
		case TAG_ID.HR:
			if (p$1.openElements.currentTagId === TAG_ID.OPTION) p$1.openElements.pop();
			if (p$1.openElements.currentTagId === TAG_ID.OPTGROUP) p$1.openElements.pop();
			p$1._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.INPUT:
		case TAG_ID.KEYGEN:
		case TAG_ID.TEXTAREA:
		case TAG_ID.SELECT:
			if (p$1.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p$1.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p$1._resetInsertionMode();
				if (token.tagID !== TAG_ID.SELECT) p$1._processStartTag(token);
			}
			break;
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p$1, token);
			break;
		default:
	}
}
function endTagInSelect(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.OPTGROUP:
			if (p$1.openElements.stackTop > 0 && p$1.openElements.currentTagId === TAG_ID.OPTION && p$1.openElements.tagIDs[p$1.openElements.stackTop - 1] === TAG_ID.OPTGROUP) p$1.openElements.pop();
			if (p$1.openElements.currentTagId === TAG_ID.OPTGROUP) p$1.openElements.pop();
			break;
		case TAG_ID.OPTION:
			if (p$1.openElements.currentTagId === TAG_ID.OPTION) p$1.openElements.pop();
			break;
		case TAG_ID.SELECT:
			if (p$1.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p$1.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p$1._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p$1, token);
			break;
		default:
	}
}
function startTagInSelectInTable(p$1, token) {
	const tn$2 = token.tagID;
	if (tn$2 === TAG_ID.CAPTION || tn$2 === TAG_ID.TABLE || tn$2 === TAG_ID.TBODY || tn$2 === TAG_ID.TFOOT || tn$2 === TAG_ID.THEAD || tn$2 === TAG_ID.TR || tn$2 === TAG_ID.TD || tn$2 === TAG_ID.TH) {
		p$1.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
		p$1._resetInsertionMode();
		p$1._processStartTag(token);
	} else startTagInSelect(p$1, token);
}
function endTagInSelectInTable(p$1, token) {
	const tn$2 = token.tagID;
	if (tn$2 === TAG_ID.CAPTION || tn$2 === TAG_ID.TABLE || tn$2 === TAG_ID.TBODY || tn$2 === TAG_ID.TFOOT || tn$2 === TAG_ID.THEAD || tn$2 === TAG_ID.TR || tn$2 === TAG_ID.TD || tn$2 === TAG_ID.TH) {
		if (p$1.openElements.hasInTableScope(tn$2)) {
			p$1.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
			p$1._resetInsertionMode();
			p$1.onEndTag(token);
		}
	} else endTagInSelect(p$1, token);
}
function startTagInTemplate(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			startTagInHead(p$1, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			p$1.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
			p$1.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p$1, token);
			break;
		case TAG_ID.COL:
			p$1.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
			p$1.insertionMode = InsertionMode.IN_COLUMN_GROUP;
			startTagInColumnGroup(p$1, token);
			break;
		case TAG_ID.TR:
			p$1.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
			p$1.insertionMode = InsertionMode.IN_TABLE_BODY;
			startTagInTableBody(p$1, token);
			break;
		case TAG_ID.TD:
		case TAG_ID.TH:
			p$1.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
			p$1.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p$1, token);
			break;
		default:
			p$1.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
			p$1.insertionMode = InsertionMode.IN_BODY;
			startTagInBody(p$1, token);
	}
}
function endTagInTemplate(p$1, token) {
	if (token.tagID === TAG_ID.TEMPLATE) templateEndTagInHead(p$1, token);
}
function eofInTemplate(p$1, token) {
	if (p$1.openElements.tmplCount > 0) {
		p$1.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p$1.activeFormattingElements.clearToLastMarker();
		p$1.tmplInsertionModeStack.shift();
		p$1._resetInsertionMode();
		p$1.onEof(token);
	} else stopParsing(p$1, token);
}
function startTagAfterBody(p$1, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p$1, token);
	else tokenAfterBody(p$1, token);
}
function endTagAfterBody(p$1, token) {
	var _a;
	if (token.tagID === TAG_ID.HTML) {
		if (!p$1.fragmentContext) p$1.insertionMode = InsertionMode.AFTER_AFTER_BODY;
		if (p$1.options.sourceCodeLocationInfo && p$1.openElements.tagIDs[0] === TAG_ID.HTML) {
			p$1._setEndLocation(p$1.openElements.items[0], token);
			const bodyElement = p$1.openElements.items[1];
			if (bodyElement && !((_a = p$1.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) p$1._setEndLocation(bodyElement, token);
		}
	} else tokenAfterBody(p$1, token);
}
function tokenAfterBody(p$1, token) {
	p$1.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p$1, token);
}
function startTagInFrameset(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.FRAMESET:
			p$1._insertElement(token, NS.HTML);
			break;
		case TAG_ID.FRAME:
			p$1._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.NOFRAMES:
			startTagInHead(p$1, token);
			break;
		default:
	}
}
function endTagInFrameset(p$1, token) {
	if (token.tagID === TAG_ID.FRAMESET && !p$1.openElements.isRootHtmlElementCurrent()) {
		p$1.openElements.pop();
		if (!p$1.fragmentContext && p$1.openElements.currentTagId !== TAG_ID.FRAMESET) p$1.insertionMode = InsertionMode.AFTER_FRAMESET;
	}
}
function startTagAfterFrameset(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.NOFRAMES:
			startTagInHead(p$1, token);
			break;
		default:
	}
}
function endTagAfterFrameset(p$1, token) {
	if (token.tagID === TAG_ID.HTML) p$1.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
}
function startTagAfterAfterBody(p$1, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p$1, token);
	else tokenAfterAfterBody(p$1, token);
}
function tokenAfterAfterBody(p$1, token) {
	p$1.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p$1, token);
}
function startTagAfterAfterFrameset(p$1, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p$1, token);
			break;
		case TAG_ID.NOFRAMES:
			startTagInHead(p$1, token);
			break;
		default:
	}
}
function nullCharacterInForeignContent(p$1, token) {
	token.chars = "�";
	p$1._insertCharacters(token);
}
function characterInForeignContent(p$1, token) {
	p$1._insertCharacters(token);
	p$1.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p$1) {
	while (p$1.treeAdapter.getNamespaceURI(p$1.openElements.current) !== NS.HTML && p$1.openElements.currentTagId !== void 0 && !p$1._isIntegrationPoint(p$1.openElements.currentTagId, p$1.openElements.current)) p$1.openElements.pop();
}
function startTagInForeignContent(p$1, token) {
	if (causesExit(token)) {
		popUntilHtmlOrIntegrationPoint(p$1);
		p$1._startTagOutsideForeignContent(token);
	} else {
		const current = p$1._getAdjustedCurrentElement();
		const currentNs = p$1.treeAdapter.getNamespaceURI(current);
		if (currentNs === NS.MATHML) adjustTokenMathMLAttrs(token);
		else if (currentNs === NS.SVG) {
			adjustTokenSVGTagName(token);
			adjustTokenSVGAttrs(token);
		}
		adjustTokenXMLAttrs(token);
		if (token.selfClosing) p$1._appendElement(token, currentNs);
		else p$1._insertElement(token, currentNs);
		token.ackSelfClosing = true;
	}
}
function endTagInForeignContent(p$1, token) {
	if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
		popUntilHtmlOrIntegrationPoint(p$1);
		p$1._endTagOutsideForeignContent(token);
		return;
	}
	for (let i = p$1.openElements.stackTop; i > 0; i--) {
		const element$5 = p$1.openElements.items[i];
		if (p$1.treeAdapter.getNamespaceURI(element$5) === NS.HTML) {
			p$1._endTagOutsideForeignContent(token);
			break;
		}
		const tagName = p$1.treeAdapter.getTagName(element$5);
		if (tagName.toLowerCase() === token.tagName) {
			token.tagName = tagName;
			p$1.openElements.shortenToLength(i);
			break;
		}
	}
}
new Set([
	TAG_NAMES.AREA,
	TAG_NAMES.BASE,
	TAG_NAMES.BASEFONT,
	TAG_NAMES.BGSOUND,
	TAG_NAMES.BR,
	TAG_NAMES.COL,
	TAG_NAMES.EMBED,
	TAG_NAMES.FRAME,
	TAG_NAMES.HR,
	TAG_NAMES.IMG,
	TAG_NAMES.INPUT,
	TAG_NAMES.KEYGEN,
	TAG_NAMES.LINK,
	TAG_NAMES.META,
	TAG_NAMES.PARAM,
	TAG_NAMES.SOURCE,
	TAG_NAMES.TRACK,
	TAG_NAMES.WBR
]);
const pointEnd = point("end");
const pointStart = point("start");
function point(type) {
	return point$2;
	function point$2(node) {
		const point$3 = node && node.position && node.position[type] || {};
		if (typeof point$3.line === "number" && point$3.line > 0 && typeof point$3.column === "number" && point$3.column > 0) return {
			line: point$3.line,
			column: point$3.column,
			offset: typeof point$3.offset === "number" && point$3.offset > -1 ? point$3.offset : void 0
		};
	}
}
function position(node) {
	const start = pointStart(node);
	const end = pointEnd(node);
	if (start && end) return {
		start,
		end
	};
}
var gfmTagfilterExpression = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|textarea|title|xmp)(?=[\t\n\f\r />])/gi;
var knownMdxNames = new Set([
	"mdxFlowExpression",
	"mdxJsxFlowElement",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"mdxjsEsm"
]);
var parseOptions = {
	sourceCodeLocationInfo: true,
	scriptingEnabled: false
};
function raw(tree, options) {
	const document$1 = documentMode(tree);
	const one$3 = zwitch("type", {
		handlers: {
			root: root$3,
			element: element$2,
			text: text$4,
			comment: comment$1,
			doctype: doctype$1,
			raw: handleRaw
		},
		unknown
	});
	const state = {
		parser: document$1 ? new Parser(parseOptions) : Parser.getFragmentParser(void 0, parseOptions),
		handle(node) {
			one$3(node, state);
		},
		stitches: false,
		options: options || {}
	};
	one$3(tree, state);
	resetTokenizer(state, pointStart());
	const result = fromParse5(document$1 ? state.parser.document : state.parser.getFragment(), { file: state.options.file });
	if (state.stitches) visit(result, "comment", function(node, index$1, parent) {
		const stitch$1 = node;
		if (stitch$1.value.stitch && parent && index$1 !== void 0) {
			const siblings = parent.children;
			siblings[index$1] = stitch$1.value.stitch;
			return index$1;
		}
	});
	if (result.type === "root" && result.children.length === 1 && result.children[0].type === tree.type) return result.children[0];
	return result;
}
function all(nodes, state) {
	let index$1 = -1;
	/* istanbul ignore else - invalid nodes, see rehypejs/rehype-raw#7. */
	if (nodes) while (++index$1 < nodes.length) state.handle(nodes[index$1]);
}
function root$3(node, state) {
	all(node.children, state);
}
function element$2(node, state) {
	startTag(node, state);
	all(node.children, state);
	endTag(node, state);
}
function text$4(node, state) {
	if (state.parser.tokenizer.state > 4) state.parser.tokenizer.state = 0;
	const token = {
		type: TokenType.CHARACTER,
		chars: node.value,
		location: createParse5Location(node)
	};
	resetTokenizer(state, pointStart(node));
	state.parser.currentToken = token;
	state.parser._processToken(state.parser.currentToken);
}
function doctype$1(node, state) {
	const token = {
		type: TokenType.DOCTYPE,
		name: "html",
		forceQuirks: false,
		publicId: "",
		systemId: "",
		location: createParse5Location(node)
	};
	resetTokenizer(state, pointStart(node));
	state.parser.currentToken = token;
	state.parser._processToken(state.parser.currentToken);
}
function stitch(node, state) {
	state.stitches = true;
	const clone = cloneWithoutChildren(node);
	if ("children" in node && "children" in clone) clone.children = raw({
		type: "root",
		children: node.children
	}, state.options).children;
	comment$1({
		type: "comment",
		value: { stitch: clone }
	}, state);
}
function comment$1(node, state) {
	const data = node.value;
	const token = {
		type: TokenType.COMMENT,
		data,
		location: createParse5Location(node)
	};
	resetTokenizer(state, pointStart(node));
	state.parser.currentToken = token;
	state.parser._processToken(state.parser.currentToken);
}
function handleRaw(node, state) {
	state.parser.tokenizer.preprocessor.html = "";
	state.parser.tokenizer.preprocessor.pos = -1;
	state.parser.tokenizer.preprocessor.lastGapPos = -2;
	state.parser.tokenizer.preprocessor.gapStack = [];
	state.parser.tokenizer.preprocessor.skipNextNewLine = false;
	state.parser.tokenizer.preprocessor.lastChunkWritten = false;
	state.parser.tokenizer.preprocessor.endOfChunkHit = false;
	state.parser.tokenizer.preprocessor.isEol = false;
	setPoint(state, pointStart(node));
	state.parser.tokenizer.write(state.options.tagfilter ? node.value.replace(gfmTagfilterExpression, "&lt;$1$2") : node.value, false);
	state.parser.tokenizer._runParsingLoop();
	/* c8 ignore next 12 -- removed in <https://github.com/inikulin/parse5/pull/897> */
	if (state.parser.tokenizer.state === 72 || state.parser.tokenizer.state === 78) {
		state.parser.tokenizer.preprocessor.lastChunkWritten = true;
		const cp = state.parser.tokenizer._consume();
		state.parser.tokenizer._callState(cp);
	}
}
function unknown(node_, state) {
	const node = node_;
	if (state.options.passThrough && state.options.passThrough.includes(node.type)) stitch(node, state);
	else {
		let extra = "";
		if (knownMdxNames.has(node.type)) extra = ". It looks like you are using MDX nodes with `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its a bad and slow idea. If you use this because you are using markdown syntax, then you have to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs), but you can also migrate to use the MDX syntax";
		throw new Error("Cannot compile `" + node.type + "` node" + extra);
	}
}
function resetTokenizer(state, point$2) {
	setPoint(state, point$2);
	const token = state.parser.tokenizer.currentCharacterToken;
	if (token && token.location) {
		token.location.endLine = state.parser.tokenizer.preprocessor.line;
		token.location.endCol = state.parser.tokenizer.preprocessor.col + 1;
		token.location.endOffset = state.parser.tokenizer.preprocessor.offset + 1;
		state.parser.currentToken = token;
		state.parser._processToken(state.parser.currentToken);
	}
	state.parser.tokenizer.paused = false;
	state.parser.tokenizer.inLoop = false;
	state.parser.tokenizer.active = false;
	state.parser.tokenizer.returnState = TokenizerMode.DATA;
	state.parser.tokenizer.charRefCode = -1;
	state.parser.tokenizer.consumedAfterSnapshot = -1;
	state.parser.tokenizer.currentLocation = null;
	state.parser.tokenizer.currentCharacterToken = null;
	state.parser.tokenizer.currentToken = null;
	state.parser.tokenizer.currentAttr = {
		name: "",
		value: ""
	};
}
function setPoint(state, point$2) {
	if (point$2 && point$2.offset !== void 0) {
		const location$1 = {
			startLine: point$2.line,
			startCol: point$2.column,
			startOffset: point$2.offset,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
		state.parser.tokenizer.preprocessor.lineStartPos = -point$2.column + 1;
		state.parser.tokenizer.preprocessor.droppedBufferSize = point$2.offset;
		state.parser.tokenizer.preprocessor.line = point$2.line;
		state.parser.tokenizer.currentLocation = location$1;
	}
}
function startTag(node, state) {
	const tagName = node.tagName.toLowerCase();
	if (state.parser.tokenizer.state === TokenizerMode.PLAINTEXT) return;
	resetTokenizer(state, pointStart(node));
	const current = state.parser.openElements.current;
	let ns$1 = "namespaceURI" in current ? current.namespaceURI : webNamespaces.html;
	if (ns$1 === webNamespaces.html && tagName === "svg") ns$1 = webNamespaces.svg;
	const result = toParse5({
		...node,
		children: []
	}, { space: ns$1 === webNamespaces.svg ? "svg" : "html" });
	const tag = {
		type: TokenType.START_TAG,
		tagName,
		tagID: getTagID(tagName),
		selfClosing: false,
		ackSelfClosing: false,
		attrs: "attrs" in result ? result.attrs : [],
		location: createParse5Location(node)
	};
	state.parser.currentToken = tag;
	state.parser._processToken(state.parser.currentToken);
	state.parser.tokenizer.lastStartTagName = tagName;
}
function endTag(node, state) {
	const tagName = node.tagName.toLowerCase();
	if (!state.parser.tokenizer.inForeignNode && htmlVoidElements.includes(tagName)) return;
	if (state.parser.tokenizer.state === TokenizerMode.PLAINTEXT) return;
	resetTokenizer(state, pointEnd(node));
	const tag = {
		type: TokenType.END_TAG,
		tagName,
		tagID: getTagID(tagName),
		selfClosing: false,
		ackSelfClosing: false,
		attrs: [],
		location: createParse5Location(node)
	};
	state.parser.currentToken = tag;
	state.parser._processToken(state.parser.currentToken);
	if (tagName === state.parser.tokenizer.lastStartTagName && (state.parser.tokenizer.state === TokenizerMode.RCDATA || state.parser.tokenizer.state === TokenizerMode.RAWTEXT || state.parser.tokenizer.state === TokenizerMode.SCRIPT_DATA)) state.parser.tokenizer.state = TokenizerMode.DATA;
}
function documentMode(node) {
	const head = node.type === "root" ? node.children[0] : node;
	return Boolean(head && (head.type === "doctype" || head.type === "element" && head.tagName.toLowerCase() === "html"));
}
function createParse5Location(node) {
	const start = pointStart(node) || {
		line: void 0,
		column: void 0,
		offset: void 0
	};
	const end = pointEnd(node) || {
		line: void 0,
		column: void 0,
		offset: void 0
	};
	return {
		startLine: start.line,
		startCol: start.column,
		startOffset: start.offset,
		endLine: end.line,
		endCol: end.column,
		endOffset: end.offset
	};
}
function cloneWithoutChildren(node) {
	return "children" in node ? esm_default({
		...node,
		children: []
	}) : esm_default(node);
}
function rehypeRaw(options) {
	return function(tree, file) {
		return raw(tree, {
			...options,
			file
		});
	};
}
var aria = [
	"ariaDescribedBy",
	"ariaLabel",
	"ariaLabelledBy"
];
const defaultSchema = {
	ancestors: {
		tbody: ["table"],
		td: ["table"],
		th: ["table"],
		thead: ["table"],
		tfoot: ["table"],
		tr: ["table"]
	},
	attributes: {
		a: [
			...aria,
			"dataFootnoteBackref",
			"dataFootnoteRef",
			["className", "data-footnote-backref"],
			"href"
		],
		blockquote: ["cite"],
		code: [["className", /^language-./]],
		del: ["cite"],
		div: ["itemScope", "itemType"],
		dl: [...aria],
		h2: [["className", "sr-only"]],
		img: [
			...aria,
			"longDesc",
			"src"
		],
		input: [["disabled", true], ["type", "checkbox"]],
		ins: ["cite"],
		li: [["className", "task-list-item"]],
		ol: [...aria, ["className", "contains-task-list"]],
		q: ["cite"],
		section: ["dataFootnotes", ["className", "footnotes"]],
		source: ["srcSet"],
		summary: [...aria],
		table: [...aria],
		ul: [...aria, ["className", "contains-task-list"]],
		"*": [
			"abbr",
			"accept",
			"acceptCharset",
			"accessKey",
			"action",
			"align",
			"alt",
			"axis",
			"border",
			"cellPadding",
			"cellSpacing",
			"char",
			"charOff",
			"charSet",
			"checked",
			"clear",
			"colSpan",
			"color",
			"cols",
			"compact",
			"coords",
			"dateTime",
			"dir",
			"encType",
			"frame",
			"hSpace",
			"headers",
			"height",
			"hrefLang",
			"htmlFor",
			"id",
			"isMap",
			"itemProp",
			"label",
			"lang",
			"maxLength",
			"media",
			"method",
			"multiple",
			"name",
			"noHref",
			"noShade",
			"noWrap",
			"open",
			"prompt",
			"readOnly",
			"rev",
			"rowSpan",
			"rows",
			"rules",
			"scope",
			"selected",
			"shape",
			"size",
			"span",
			"start",
			"summary",
			"tabIndex",
			"title",
			"useMap",
			"vAlign",
			"value",
			"width"
		]
	},
	clobber: [
		"ariaDescribedBy",
		"ariaLabelledBy",
		"id",
		"name"
	],
	clobberPrefix: "user-content-",
	protocols: {
		cite: ["http", "https"],
		href: [
			"http",
			"https",
			"irc",
			"ircs",
			"mailto",
			"xmpp"
		],
		longDesc: ["http", "https"],
		src: ["http", "https"]
	},
	required: { input: {
		disabled: true,
		type: "checkbox"
	} },
	strip: ["script"],
	tagNames: [
		"a",
		"b",
		"blockquote",
		"br",
		"code",
		"dd",
		"del",
		"details",
		"div",
		"dl",
		"dt",
		"em",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hr",
		"i",
		"img",
		"input",
		"ins",
		"kbd",
		"li",
		"ol",
		"p",
		"picture",
		"pre",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"section",
		"source",
		"span",
		"strike",
		"strong",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"tr",
		"tt",
		"ul",
		"var"
	]
};
var own$2 = {}.hasOwnProperty;
function sanitize(node, options) {
	let result = {
		type: "root",
		children: []
	};
	const replace$1 = transform({
		schema: options ? {
			...defaultSchema,
			...options
		} : defaultSchema,
		stack: []
	}, node);
	if (replace$1) if (Array.isArray(replace$1)) if (replace$1.length === 1) result = replace$1[0];
	else result.children = replace$1;
	else result = replace$1;
	return result;
}
function transform(state, node) {
	if (node && typeof node === "object") {
		const unsafe = node;
		switch (typeof unsafe.type === "string" ? unsafe.type : "") {
			case "comment": return comment(state, unsafe);
			case "doctype": return doctype(state, unsafe);
			case "element": return element$1(state, unsafe);
			case "root": return root$2(state, unsafe);
			case "text": return text$3(state, unsafe);
			default:
		}
	}
}
function comment(state, unsafe) {
	if (state.schema.allowComments) {
		const result = typeof unsafe.value === "string" ? unsafe.value : "";
		const index$1 = result.indexOf("-->");
		const node = {
			type: "comment",
			value: index$1 < 0 ? result : result.slice(0, index$1)
		};
		patch$1(node, unsafe);
		return node;
	}
}
function doctype(state, unsafe) {
	if (state.schema.allowDoctypes) {
		const node = { type: "doctype" };
		patch$1(node, unsafe);
		return node;
	}
}
function element$1(state, unsafe) {
	const name$1 = typeof unsafe.tagName === "string" ? unsafe.tagName : "";
	state.stack.push(name$1);
	const content = children(state, unsafe.children);
	const properties_ = properties(state, unsafe.properties);
	state.stack.pop();
	let safeElement = false;
	if (name$1 && name$1 !== "*" && (!state.schema.tagNames || state.schema.tagNames.includes(name$1))) {
		safeElement = true;
		if (state.schema.ancestors && own$2.call(state.schema.ancestors, name$1)) {
			const ancestors = state.schema.ancestors[name$1];
			let index$1 = -1;
			safeElement = false;
			while (++index$1 < ancestors.length) if (state.stack.includes(ancestors[index$1])) safeElement = true;
		}
	}
	if (!safeElement) return state.schema.strip && !state.schema.strip.includes(name$1) ? content : void 0;
	const node = {
		type: "element",
		tagName: name$1,
		properties: properties_,
		children: content
	};
	patch$1(node, unsafe);
	return node;
}
function root$2(state, unsafe) {
	const node = {
		type: "root",
		children: children(state, unsafe.children)
	};
	patch$1(node, unsafe);
	return node;
}
function text$3(_, unsafe) {
	const node = {
		type: "text",
		value: typeof unsafe.value === "string" ? unsafe.value : ""
	};
	patch$1(node, unsafe);
	return node;
}
function children(state, children$1) {
	const results = [];
	if (Array.isArray(children$1)) {
		const childrenUnknown = children$1;
		let index$1 = -1;
		while (++index$1 < childrenUnknown.length) {
			const value = transform(state, childrenUnknown[index$1]);
			if (value) if (Array.isArray(value)) results.push(...value);
			else results.push(value);
		}
	}
	return results;
}
function properties(state, properties$1) {
	const tagName = state.stack[state.stack.length - 1];
	const attributes = state.schema.attributes;
	const required = state.schema.required;
	const specific = attributes && own$2.call(attributes, tagName) ? attributes[tagName] : void 0;
	const defaults = attributes && own$2.call(attributes, "*") ? attributes["*"] : void 0;
	const properties_ = properties$1 && typeof properties$1 === "object" ? properties$1 : {};
	const result = {};
	let key;
	for (key in properties_) if (own$2.call(properties_, key)) {
		const unsafe = properties_[key];
		let safe = propertyValue(state, findDefinition(specific, key), key, unsafe);
		if (safe === null || safe === void 0) safe = propertyValue(state, findDefinition(defaults, key), key, unsafe);
		if (safe !== null && safe !== void 0) result[key] = safe;
	}
	if (required && own$2.call(required, tagName)) {
		const properties$2 = required[tagName];
		for (key in properties$2) if (own$2.call(properties$2, key) && !own$2.call(result, key)) result[key] = properties$2[key];
	}
	return result;
}
function propertyValue(state, definition, key, value) {
	return definition ? Array.isArray(value) ? propertyValueMany(state, definition, key, value) : propertyValuePrimitive(state, definition, key, value) : void 0;
}
function propertyValueMany(state, definition, key, values) {
	let index$1 = -1;
	const result = [];
	while (++index$1 < values.length) {
		const value = propertyValuePrimitive(state, definition, key, values[index$1]);
		if (typeof value === "number" || typeof value === "string") result.push(value);
	}
	return result;
}
function propertyValuePrimitive(state, definition, key, value) {
	if (typeof value !== "boolean" && typeof value !== "number" && typeof value !== "string") return;
	if (!safeProtocol(state, key, value)) return;
	if (typeof definition === "object" && definition.length > 1) {
		let ok$1 = false;
		let index$1 = 0;
		while (++index$1 < definition.length) {
			const allowed = definition[index$1];
			if (allowed && typeof allowed === "object" && "flags" in allowed) {
				if (allowed.test(String(value))) {
					ok$1 = true;
					break;
				}
			} else if (allowed === value) {
				ok$1 = true;
				break;
			}
		}
		if (!ok$1) return;
	}
	return state.schema.clobber && state.schema.clobberPrefix && state.schema.clobber.includes(key) ? state.schema.clobberPrefix + value : value;
}
function safeProtocol(state, key, value) {
	const protocols = state.schema.protocols && own$2.call(state.schema.protocols, key) ? state.schema.protocols[key] : void 0;
	if (!protocols || protocols.length === 0) return true;
	const url = String(value);
	const colon = url.indexOf(":");
	const questionMark = url.indexOf("?");
	const numberSign = url.indexOf("#");
	const slash = url.indexOf("/");
	if (colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign) return true;
	let index$1 = -1;
	while (++index$1 < protocols.length) {
		const protocol = protocols[index$1];
		if (colon === protocol.length && url.slice(0, protocol.length) === protocol) return true;
	}
	return false;
}
function patch$1(node, unsafe) {
	const cleanPosition = position(unsafe);
	if (unsafe.data) node.data = esm_default(unsafe.data);
	if (cleanPosition) node.position = cleanPosition;
}
function findDefinition(definitions, key) {
	let dataDefault;
	let index$1 = -1;
	if (definitions) while (++index$1 < definitions.length) {
		const entry = definitions[index$1];
		const name$1 = typeof entry === "string" ? entry : entry[0];
		if (name$1 === key) return entry;
		if (name$1 === "data*") dataDefault = entry;
	}
	if (key.length > 4 && key.slice(0, 4).toLowerCase() === "data") return dataDefault;
}
function rehypeSanitize(options) {
	return function(tree) {
		return sanitize(tree, options);
	};
}
function escapeStringRegexp(string) {
	if (typeof string !== "string") throw new TypeError("Expected a string");
	return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function findAndReplace(tree, list$1, options) {
	const ignored = convert((options || {}).ignore || []);
	const pairs = toPairs(list$1);
	let pairIndex = -1;
	while (++pairIndex < pairs.length) visitParents(tree, "text", visitor);
	function visitor(node, parents) {
		let index$1 = -1;
		let grandparent;
		while (++index$1 < parents.length) {
			const parent = parents[index$1];
			const siblings = grandparent ? grandparent.children : void 0;
			if (ignored(parent, siblings ? siblings.indexOf(parent) : void 0, grandparent)) return;
			grandparent = parent;
		}
		if (grandparent) return handler(node, parents);
	}
	function handler(node, parents) {
		const parent = parents[parents.length - 1];
		const find$1 = pairs[pairIndex][0];
		const replace$1 = pairs[pairIndex][1];
		let start = 0;
		const index$1 = parent.children.indexOf(node);
		let change = false;
		let nodes = [];
		find$1.lastIndex = 0;
		let match = find$1.exec(node.value);
		while (match) {
			const position$2 = match.index;
			const matchObject = {
				index: match.index,
				input: match.input,
				stack: [...parents, node]
			};
			let value = replace$1(...match, matchObject);
			if (typeof value === "string") value = value.length > 0 ? {
				type: "text",
				value
			} : void 0;
			if (value === false) find$1.lastIndex = position$2 + 1;
			else {
				if (start !== position$2) nodes.push({
					type: "text",
					value: node.value.slice(start, position$2)
				});
				if (Array.isArray(value)) nodes.push(...value);
				else if (value) nodes.push(value);
				start = position$2 + match[0].length;
				change = true;
			}
			if (!find$1.global) break;
			match = find$1.exec(node.value);
		}
		if (change) {
			if (start < node.value.length) nodes.push({
				type: "text",
				value: node.value.slice(start)
			});
			parent.children.splice(index$1, 1, ...nodes);
		} else nodes = [node];
		return index$1 + nodes.length;
	}
}
function toPairs(tupleOrList) {
	const result = [];
	if (!Array.isArray(tupleOrList)) throw new TypeError("Expected find and replace tuple or list of tuples");
	const list$1 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
	let index$1 = -1;
	while (++index$1 < list$1.length) {
		const tuple = list$1[index$1];
		result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
	}
	return result;
}
function toExpression(find$1) {
	return typeof find$1 === "string" ? new RegExp(escapeStringRegexp(find$1), "g") : find$1;
}
function toFunction(replace$1) {
	return typeof replace$1 === "function" ? replace$1 : function() {
		return replace$1;
	};
}
var inConstruct = "phrasing";
var notInConstruct = [
	"autolink",
	"link",
	"image",
	"label"
];
function gfmAutolinkLiteralFromMarkdown() {
	return {
		transforms: [transformGfmAutolinkLiterals],
		enter: {
			literalAutolink: enterLiteralAutolink,
			literalAutolinkEmail: enterLiteralAutolinkValue,
			literalAutolinkHttp: enterLiteralAutolinkValue,
			literalAutolinkWww: enterLiteralAutolinkValue
		},
		exit: {
			literalAutolink: exitLiteralAutolink,
			literalAutolinkEmail: exitLiteralAutolinkEmail,
			literalAutolinkHttp: exitLiteralAutolinkHttp,
			literalAutolinkWww: exitLiteralAutolinkWww
		}
	};
}
function gfmAutolinkLiteralToMarkdown() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct,
			notInConstruct
		}
	] };
}
function enterLiteralAutolink(token) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, token);
}
function enterLiteralAutolinkValue(token) {
	this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
	this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
	this.config.exit.data.call(this, token);
	const node = this.stack[this.stack.length - 1];
	node.type;
	node.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
	this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
	this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
	findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]], { ignore: ["link", "linkReference"] });
}
function findUrl(_, protocol, domain$1, path$1, match) {
	let prefix = "";
	if (!previous(match)) return false;
	if (/^w/i.test(protocol)) {
		domain$1 = protocol + domain$1;
		protocol = "";
		prefix = "http://";
	}
	if (!isCorrectDomain(domain$1)) return false;
	const parts = splitUrl(domain$1 + path$1);
	if (!parts[0]) return false;
	const result = {
		type: "link",
		title: null,
		url: prefix + protocol + parts[0],
		children: [{
			type: "text",
			value: protocol + parts[0]
		}]
	};
	if (parts[1]) return [result, {
		type: "text",
		value: parts[1]
	}];
	return result;
}
function findEmail(_, atext, label, match) {
	if (!previous(match, true) || /[-\d_]$/.test(label)) return false;
	return {
		type: "link",
		title: null,
		url: "mailto:" + atext + "@" + label,
		children: [{
			type: "text",
			value: atext + "@" + label
		}]
	};
}
function isCorrectDomain(domain$1) {
	const parts = domain$1.split(".");
	if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
	return true;
}
function splitUrl(url) {
	const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
	if (!trailExec) return [url, void 0];
	url = url.slice(0, trailExec.index);
	let trail$1 = trailExec[0];
	let closingParenIndex = trail$1.indexOf(")");
	const openingParens = ccount(url, "(");
	let closingParens = ccount(url, ")");
	while (closingParenIndex !== -1 && openingParens > closingParens) {
		url += trail$1.slice(0, closingParenIndex + 1);
		trail$1 = trail$1.slice(closingParenIndex + 1);
		closingParenIndex = trail$1.indexOf(")");
		closingParens++;
	}
	return [url, trail$1];
}
function previous(match, email) {
	const code$2 = match.input.charCodeAt(match.index - 1);
	return (match.index === 0 || unicodeWhitespace(code$2) || unicodePunctuation(code$2)) && (!email || code$2 !== 47);
}
footnoteReference$1.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
	this.buffer();
}
function enterFootnoteCall(token) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, token);
}
function enterFootnoteDefinitionLabelString() {
	this.buffer();
}
function enterFootnoteDefinition(token) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, token);
}
function exitFootnoteCallString(token) {
	const label = this.resume();
	const node = this.stack[this.stack.length - 1];
	node.type;
	node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node.label = label;
}
function exitFootnoteCall(token) {
	this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
	const label = this.resume();
	const node = this.stack[this.stack.length - 1];
	node.type;
	node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node.label = label;
}
function exitFootnoteDefinition(token) {
	this.exit(token);
}
function footnoteReferencePeek() {
	return "[";
}
function footnoteReference$1(node, _, state, info) {
	const tracker = state.createTracker(info);
	let value = tracker.move("[^");
	const exit$1 = state.enter("footnoteReference");
	const subexit = state.enter("reference");
	value += tracker.move(state.safe(state.associationId(node), {
		after: "]",
		before: value
	}));
	subexit();
	exit$1();
	value += tracker.move("]");
	return value;
}
function gfmFootnoteFromMarkdown() {
	return {
		enter: {
			gfmFootnoteCallString: enterFootnoteCallString,
			gfmFootnoteCall: enterFootnoteCall,
			gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: enterFootnoteDefinition
		},
		exit: {
			gfmFootnoteCallString: exitFootnoteCallString,
			gfmFootnoteCall: exitFootnoteCall,
			gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: exitFootnoteDefinition
		}
	};
}
function gfmFootnoteToMarkdown(options) {
	let firstLineBlank = false;
	if (options && options.firstLineBlank) firstLineBlank = true;
	return {
		handlers: {
			footnoteDefinition,
			footnoteReference: footnoteReference$1
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function footnoteDefinition(node, _, state, info) {
		const tracker = state.createTracker(info);
		let value = tracker.move("[^");
		const exit$1 = state.enter("footnoteDefinition");
		const subexit = state.enter("label");
		value += tracker.move(state.safe(state.associationId(node), {
			before: value,
			after: "]"
		}));
		subexit();
		value += tracker.move("]:");
		if (node.children && node.children.length > 0) {
			tracker.shift(4);
			value += tracker.move((firstLineBlank ? "\n" : " ") + state.indentLines(state.containerFlow(node, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
		}
		exit$1();
		return value;
	}
}
function mapExceptFirst(line, index$1, blank) {
	return index$1 === 0 ? line : mapAll(line, index$1, blank);
}
function mapAll(line, index$1, blank) {
	return (blank ? "" : "    ") + line;
}
var constructsWithoutStrikethrough = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: enterStrikethrough },
		exit: { strikethrough: exitStrikethrough }
	};
}
function gfmStrikethroughToMarkdown() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: constructsWithoutStrikethrough
		}],
		handlers: { delete: handleDelete }
	};
}
function enterStrikethrough(token) {
	this.enter({
		type: "delete",
		children: []
	}, token);
}
function exitStrikethrough(token) {
	this.exit(token);
}
function handleDelete(node, _, state, info) {
	const tracker = state.createTracker(info);
	const exit$1 = state.enter("strikethrough");
	let value = tracker.move("~~");
	value += state.containerPhrasing(node, {
		...tracker.current(),
		before: value,
		after: "~"
	});
	value += tracker.move("~~");
	exit$1();
	return value;
}
function peekDelete() {
	return "~";
}
function defaultStringLength(value) {
	return value.length;
}
function markdownTable(table$1, options) {
	const settings = options || {};
	const align = (settings.align || []).concat();
	const stringLength = settings.stringLength || defaultStringLength;
	const alignments = [];
	const cellMatrix = [];
	const sizeMatrix = [];
	const longestCellByColumn = [];
	let mostCellsPerRow = 0;
	let rowIndex = -1;
	while (++rowIndex < table$1.length) {
		const row$1 = [];
		const sizes$1 = [];
		let columnIndex$1 = -1;
		if (table$1[rowIndex].length > mostCellsPerRow) mostCellsPerRow = table$1[rowIndex].length;
		while (++columnIndex$1 < table$1[rowIndex].length) {
			const cell = serialize(table$1[rowIndex][columnIndex$1]);
			if (settings.alignDelimiters !== false) {
				const size = stringLength(cell);
				sizes$1[columnIndex$1] = size;
				if (longestCellByColumn[columnIndex$1] === void 0 || size > longestCellByColumn[columnIndex$1]) longestCellByColumn[columnIndex$1] = size;
			}
			row$1.push(cell);
		}
		cellMatrix[rowIndex] = row$1;
		sizeMatrix[rowIndex] = sizes$1;
	}
	let columnIndex = -1;
	if (typeof align === "object" && "length" in align) while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = toAlignment(align[columnIndex]);
	else {
		const code$2 = toAlignment(align);
		while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = code$2;
	}
	columnIndex = -1;
	const row = [];
	const sizes = [];
	while (++columnIndex < mostCellsPerRow) {
		const code$2 = alignments[columnIndex];
		let before = "";
		let after = "";
		if (code$2 === 99) {
			before = ":";
			after = ":";
		} else if (code$2 === 108) before = ":";
		else if (code$2 === 114) after = ":";
		let size = settings.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
		const cell = before + "-".repeat(size) + after;
		if (settings.alignDelimiters !== false) {
			size = before.length + size + after.length;
			if (size > longestCellByColumn[columnIndex]) longestCellByColumn[columnIndex] = size;
			sizes[columnIndex] = size;
		}
		row[columnIndex] = cell;
	}
	cellMatrix.splice(1, 0, row);
	sizeMatrix.splice(1, 0, sizes);
	rowIndex = -1;
	const lines = [];
	while (++rowIndex < cellMatrix.length) {
		const row$1 = cellMatrix[rowIndex];
		const sizes$1 = sizeMatrix[rowIndex];
		columnIndex = -1;
		const line = [];
		while (++columnIndex < mostCellsPerRow) {
			const cell = row$1[columnIndex] || "";
			let before = "";
			let after = "";
			if (settings.alignDelimiters !== false) {
				const size = longestCellByColumn[columnIndex] - (sizes$1[columnIndex] || 0);
				const code$2 = alignments[columnIndex];
				if (code$2 === 114) before = " ".repeat(size);
				else if (code$2 === 99) if (size % 2) {
					before = " ".repeat(size / 2 + .5);
					after = " ".repeat(size / 2 - .5);
				} else {
					before = " ".repeat(size / 2);
					after = before;
				}
				else after = " ".repeat(size);
			}
			if (settings.delimiterStart !== false && !columnIndex) line.push("|");
			if (settings.padding !== false && !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) line.push(" ");
			if (settings.alignDelimiters !== false) line.push(before);
			line.push(cell);
			if (settings.alignDelimiters !== false) line.push(after);
			if (settings.padding !== false) line.push(" ");
			if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) line.push("|");
		}
		lines.push(settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join(""));
	}
	return lines.join("\n");
}
function serialize(value) {
	return value === null || value === void 0 ? "" : String(value);
}
function toAlignment(value) {
	const code$2 = typeof value === "string" ? value.codePointAt(0) : 0;
	return code$2 === 67 || code$2 === 99 ? 99 : code$2 === 76 || code$2 === 108 ? 108 : code$2 === 82 || code$2 === 114 ? 114 : 0;
}
function gfmTableFromMarkdown() {
	return {
		enter: {
			table: enterTable,
			tableData: enterCell,
			tableHeader: enterCell,
			tableRow: enterRow
		},
		exit: {
			codeText: exitCodeText,
			table: exitTable,
			tableData: exit,
			tableHeader: exit,
			tableRow: exit
		}
	};
}
function enterTable(token) {
	const align = token._align;
	this.enter({
		type: "table",
		align: align.map(function(d$1) {
			return d$1 === "none" ? null : d$1;
		}),
		children: []
	}, token);
	this.data.inTable = true;
}
function exitTable(token) {
	this.exit(token);
	this.data.inTable = void 0;
}
function enterRow(token) {
	this.enter({
		type: "tableRow",
		children: []
	}, token);
}
function exit(token) {
	this.exit(token);
}
function enterCell(token) {
	this.enter({
		type: "tableCell",
		children: []
	}, token);
}
function exitCodeText(token) {
	let value = this.resume();
	if (this.data.inTable) value = value.replace(/\\([\\|])/g, replace);
	const node = this.stack[this.stack.length - 1];
	node.type;
	node.value = value;
	this.exit(token);
}
function replace($0, $1) {
	return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
	const settings = options || {};
	const padding = settings.tableCellPadding;
	const alignDelimiters = settings.tablePipeAlign;
	const stringLength = settings.stringLength;
	const around = padding ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: ":",
				after: "-"
			},
			{
				atBreak: true,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: inlineCodeWithTable,
			table: handleTable,
			tableCell: handleTableCell,
			tableRow: handleTableRow
		}
	};
	function handleTable(node, _, state, info) {
		return serializeData(handleTableAsData(node, state, info), node.align);
	}
	function handleTableRow(node, _, state, info) {
		const value = serializeData([handleTableRowAsData(node, state, info)]);
		return value.slice(0, value.indexOf("\n"));
	}
	function handleTableCell(node, _, state, info) {
		const exit$1 = state.enter("tableCell");
		const subexit = state.enter("phrasing");
		const value = state.containerPhrasing(node, {
			...info,
			before: around,
			after: around
		});
		subexit();
		exit$1();
		return value;
	}
	function serializeData(matrix, align) {
		return markdownTable(matrix, {
			align,
			alignDelimiters,
			padding,
			stringLength
		});
	}
	function handleTableAsData(node, state, info) {
		const children$1 = node.children;
		let index$1 = -1;
		const result = [];
		const subexit = state.enter("table");
		while (++index$1 < children$1.length) result[index$1] = handleTableRowAsData(children$1[index$1], state, info);
		subexit();
		return result;
	}
	function handleTableRowAsData(node, state, info) {
		const children$1 = node.children;
		let index$1 = -1;
		const result = [];
		const subexit = state.enter("tableRow");
		while (++index$1 < children$1.length) result[index$1] = handleTableCell(children$1[index$1], node, state, info);
		subexit();
		return result;
	}
	function inlineCodeWithTable(node, parent, state) {
		let value = handle.inlineCode(node, parent, state);
		if (state.stack.includes("tableCell")) value = value.replace(/\|/g, "\\$&");
		return value;
	}
}
function gfmTaskListItemFromMarkdown() {
	return { exit: {
		taskListCheckValueChecked: exitCheck,
		taskListCheckValueUnchecked: exitCheck,
		paragraph: exitParagraphWithTaskListItem
	} };
}
function gfmTaskListItemToMarkdown() {
	return {
		unsafe: [{
			atBreak: true,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: listItemWithTaskListItem }
	};
}
function exitCheck(token) {
	const node = this.stack[this.stack.length - 2];
	node.type;
	node.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
	const parent = this.stack[this.stack.length - 2];
	if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
		const node = this.stack[this.stack.length - 1];
		node.type;
		const head = node.children[0];
		if (head && head.type === "text") {
			const siblings = parent.children;
			let index$1 = -1;
			let firstParaghraph;
			while (++index$1 < siblings.length) {
				const sibling = siblings[index$1];
				if (sibling.type === "paragraph") {
					firstParaghraph = sibling;
					break;
				}
			}
			if (firstParaghraph === node) {
				head.value = head.value.slice(1);
				if (head.value.length === 0) node.children.shift();
				else if (node.position && head.position && typeof head.position.start.offset === "number") {
					head.position.start.column++;
					head.position.start.offset++;
					node.position.start = Object.assign({}, head.position.start);
				}
			}
		}
	}
	this.exit(token);
}
function listItemWithTaskListItem(node, parent, state, info) {
	const head = node.children[0];
	const checkable = typeof node.checked === "boolean" && head && head.type === "paragraph";
	const checkbox = "[" + (node.checked ? "x" : " ") + "] ";
	const tracker = state.createTracker(info);
	if (checkable) tracker.move(checkbox);
	let value = handle.listItem(node, parent, state, {
		...info,
		...tracker.current()
	});
	if (checkable) value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	return value;
	function check($0) {
		return $0 + checkbox;
	}
}
function gfmFromMarkdown() {
	return [
		gfmAutolinkLiteralFromMarkdown(),
		gfmFootnoteFromMarkdown(),
		gfmStrikethroughFromMarkdown(),
		gfmTableFromMarkdown(),
		gfmTaskListItemFromMarkdown()
	];
}
function gfmToMarkdown(options) {
	return { extensions: [
		gfmAutolinkLiteralToMarkdown(),
		gfmFootnoteToMarkdown(options),
		gfmStrikethroughToMarkdown(),
		gfmTableToMarkdown(options),
		gfmTaskListItemToMarkdown()
	] };
}
var wwwPrefix = {
	tokenize: tokenizeWwwPrefix,
	partial: true
};
var domain = {
	tokenize: tokenizeDomain,
	partial: true
};
var path = {
	tokenize: tokenizePath,
	partial: true
};
var trail = {
	tokenize: tokenizeTrail,
	partial: true
};
var emailDomainDotTrail = {
	tokenize: tokenizeEmailDomainDotTrail,
	partial: true
};
var wwwAutolink = {
	name: "wwwAutolink",
	tokenize: tokenizeWwwAutolink,
	previous: previousWww
};
var protocolAutolink = {
	name: "protocolAutolink",
	tokenize: tokenizeProtocolAutolink,
	previous: previousProtocol
};
var emailAutolink = {
	name: "emailAutolink",
	tokenize: tokenizeEmailAutolink,
	previous: previousEmail
};
var text$2 = {};
function gfmAutolinkLiteral() {
	return { text: text$2 };
}
var code$1 = 48;
while (code$1 < 123) {
	text$2[code$1] = emailAutolink;
	code$1++;
	if (code$1 === 58) code$1 = 65;
	else if (code$1 === 91) code$1 = 97;
}
text$2[43] = emailAutolink;
text$2[45] = emailAutolink;
text$2[46] = emailAutolink;
text$2[95] = emailAutolink;
text$2[72] = [emailAutolink, protocolAutolink];
text$2[104] = [emailAutolink, protocolAutolink];
text$2[87] = [emailAutolink, wwwAutolink];
text$2[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok$1, nok) {
	const self$1 = this;
	let dot;
	let data;
	return start;
	function start(code$2) {
		if (!gfmAtext(code$2) || !previousEmail.call(self$1, self$1.previous) || previousUnbalanced(self$1.events)) return nok(code$2);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkEmail");
		return atext(code$2);
	}
	function atext(code$2) {
		if (gfmAtext(code$2)) {
			effects.consume(code$2);
			return atext;
		}
		if (code$2 === 64) {
			effects.consume(code$2);
			return emailDomain;
		}
		return nok(code$2);
	}
	function emailDomain(code$2) {
		if (code$2 === 46) return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code$2);
		if (code$2 === 45 || code$2 === 95 || asciiAlphanumeric(code$2)) {
			data = true;
			effects.consume(code$2);
			return emailDomain;
		}
		return emailDomainAfter(code$2);
	}
	function emailDomainDot(code$2) {
		effects.consume(code$2);
		dot = true;
		return emailDomain;
	}
	function emailDomainAfter(code$2) {
		if (data && dot && asciiAlpha(self$1.previous)) {
			effects.exit("literalAutolinkEmail");
			effects.exit("literalAutolink");
			return ok$1(code$2);
		}
		return nok(code$2);
	}
}
function tokenizeWwwAutolink(effects, ok$1, nok) {
	const self$1 = this;
	return wwwStart;
	function wwwStart(code$2) {
		if (code$2 !== 87 && code$2 !== 119 || !previousWww.call(self$1, self$1.previous) || previousUnbalanced(self$1.events)) return nok(code$2);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkWww");
		return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code$2);
	}
	function wwwAfter(code$2) {
		effects.exit("literalAutolinkWww");
		effects.exit("literalAutolink");
		return ok$1(code$2);
	}
}
function tokenizeProtocolAutolink(effects, ok$1, nok) {
	const self$1 = this;
	let buffer = "";
	let seen = false;
	return protocolStart;
	function protocolStart(code$2) {
		if ((code$2 === 72 || code$2 === 104) && previousProtocol.call(self$1, self$1.previous) && !previousUnbalanced(self$1.events)) {
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkHttp");
			buffer += String.fromCodePoint(code$2);
			effects.consume(code$2);
			return protocolPrefixInside;
		}
		return nok(code$2);
	}
	function protocolPrefixInside(code$2) {
		if (asciiAlpha(code$2) && buffer.length < 5) {
			buffer += String.fromCodePoint(code$2);
			effects.consume(code$2);
			return protocolPrefixInside;
		}
		if (code$2 === 58) {
			const protocol = buffer.toLowerCase();
			if (protocol === "http" || protocol === "https") {
				effects.consume(code$2);
				return protocolSlashesInside;
			}
		}
		return nok(code$2);
	}
	function protocolSlashesInside(code$2) {
		if (code$2 === 47) {
			effects.consume(code$2);
			if (seen) return afterProtocol;
			seen = true;
			return protocolSlashesInside;
		}
		return nok(code$2);
	}
	function afterProtocol(code$2) {
		return code$2 === null || asciiControl(code$2) || markdownLineEndingOrSpace(code$2) || unicodeWhitespace(code$2) || unicodePunctuation(code$2) ? nok(code$2) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code$2);
	}
	function protocolAfter(code$2) {
		effects.exit("literalAutolinkHttp");
		effects.exit("literalAutolink");
		return ok$1(code$2);
	}
}
function tokenizeWwwPrefix(effects, ok$1, nok) {
	let size = 0;
	return wwwPrefixInside;
	function wwwPrefixInside(code$2) {
		if ((code$2 === 87 || code$2 === 119) && size < 3) {
			size++;
			effects.consume(code$2);
			return wwwPrefixInside;
		}
		if (code$2 === 46 && size === 3) {
			effects.consume(code$2);
			return wwwPrefixAfter;
		}
		return nok(code$2);
	}
	function wwwPrefixAfter(code$2) {
		return code$2 === null ? nok(code$2) : ok$1(code$2);
	}
}
function tokenizeDomain(effects, ok$1, nok) {
	let underscoreInLastSegment;
	let underscoreInLastLastSegment;
	let seen;
	return domainInside;
	function domainInside(code$2) {
		if (code$2 === 46 || code$2 === 95) return effects.check(trail, domainAfter, domainAtPunctuation)(code$2);
		if (code$2 === null || markdownLineEndingOrSpace(code$2) || unicodeWhitespace(code$2) || code$2 !== 45 && unicodePunctuation(code$2)) return domainAfter(code$2);
		seen = true;
		effects.consume(code$2);
		return domainInside;
	}
	function domainAtPunctuation(code$2) {
		if (code$2 === 95) underscoreInLastSegment = true;
		else {
			underscoreInLastLastSegment = underscoreInLastSegment;
			underscoreInLastSegment = void 0;
		}
		effects.consume(code$2);
		return domainInside;
	}
	function domainAfter(code$2) {
		if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) return nok(code$2);
		return ok$1(code$2);
	}
}
function tokenizePath(effects, ok$1) {
	let sizeOpen = 0;
	let sizeClose = 0;
	return pathInside;
	function pathInside(code$2) {
		if (code$2 === 40) {
			sizeOpen++;
			effects.consume(code$2);
			return pathInside;
		}
		if (code$2 === 41 && sizeClose < sizeOpen) return pathAtPunctuation(code$2);
		if (code$2 === 33 || code$2 === 34 || code$2 === 38 || code$2 === 39 || code$2 === 41 || code$2 === 42 || code$2 === 44 || code$2 === 46 || code$2 === 58 || code$2 === 59 || code$2 === 60 || code$2 === 63 || code$2 === 93 || code$2 === 95 || code$2 === 126) return effects.check(trail, ok$1, pathAtPunctuation)(code$2);
		if (code$2 === null || markdownLineEndingOrSpace(code$2) || unicodeWhitespace(code$2)) return ok$1(code$2);
		effects.consume(code$2);
		return pathInside;
	}
	function pathAtPunctuation(code$2) {
		if (code$2 === 41) sizeClose++;
		effects.consume(code$2);
		return pathInside;
	}
}
function tokenizeTrail(effects, ok$1, nok) {
	return trail$1;
	function trail$1(code$2) {
		if (code$2 === 33 || code$2 === 34 || code$2 === 39 || code$2 === 41 || code$2 === 42 || code$2 === 44 || code$2 === 46 || code$2 === 58 || code$2 === 59 || code$2 === 63 || code$2 === 95 || code$2 === 126) {
			effects.consume(code$2);
			return trail$1;
		}
		if (code$2 === 38) {
			effects.consume(code$2);
			return trailCharacterReferenceStart;
		}
		if (code$2 === 93) {
			effects.consume(code$2);
			return trailBracketAfter;
		}
		if (code$2 === 60 || code$2 === null || markdownLineEndingOrSpace(code$2) || unicodeWhitespace(code$2)) return ok$1(code$2);
		return nok(code$2);
	}
	function trailBracketAfter(code$2) {
		if (code$2 === null || code$2 === 40 || code$2 === 91 || markdownLineEndingOrSpace(code$2) || unicodeWhitespace(code$2)) return ok$1(code$2);
		return trail$1(code$2);
	}
	function trailCharacterReferenceStart(code$2) {
		return asciiAlpha(code$2) ? trailCharacterReferenceInside(code$2) : nok(code$2);
	}
	function trailCharacterReferenceInside(code$2) {
		if (code$2 === 59) {
			effects.consume(code$2);
			return trail$1;
		}
		if (asciiAlpha(code$2)) {
			effects.consume(code$2);
			return trailCharacterReferenceInside;
		}
		return nok(code$2);
	}
}
function tokenizeEmailDomainDotTrail(effects, ok$1, nok) {
	return start;
	function start(code$2) {
		effects.consume(code$2);
		return after;
	}
	function after(code$2) {
		return asciiAlphanumeric(code$2) ? nok(code$2) : ok$1(code$2);
	}
}
function previousWww(code$2) {
	return code$2 === null || code$2 === 40 || code$2 === 42 || code$2 === 95 || code$2 === 91 || code$2 === 93 || code$2 === 126 || markdownLineEndingOrSpace(code$2);
}
function previousProtocol(code$2) {
	return !asciiAlpha(code$2);
}
function previousEmail(code$2) {
	return !(code$2 === 47 || gfmAtext(code$2));
}
function gfmAtext(code$2) {
	return code$2 === 43 || code$2 === 45 || code$2 === 46 || code$2 === 95 || asciiAlphanumeric(code$2);
}
function previousUnbalanced(events) {
	let index$1 = events.length;
	let result = false;
	while (index$1--) {
		const token = events[index$1][1];
		if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
			result = true;
			break;
		}
		if (token._gfmAutolinkLiteralWalkedInto) {
			result = false;
			break;
		}
	}
	if (events.length > 0 && !result) events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
	return result;
}
function normalizeUri(value) {
	const result = [];
	let index$1 = -1;
	let start = 0;
	let skip = 0;
	while (++index$1 < value.length) {
		const code$2 = value.charCodeAt(index$1);
		let replace$1 = "";
		if (code$2 === 37 && asciiAlphanumeric(value.charCodeAt(index$1 + 1)) && asciiAlphanumeric(value.charCodeAt(index$1 + 2))) skip = 2;
		else if (code$2 < 128) {
			if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code$2))) replace$1 = String.fromCharCode(code$2);
		} else if (code$2 > 55295 && code$2 < 57344) {
			const next$1 = value.charCodeAt(index$1 + 1);
			if (code$2 < 56320 && next$1 > 56319 && next$1 < 57344) {
				replace$1 = String.fromCharCode(code$2, next$1);
				skip = 1;
			} else replace$1 = "�";
		} else replace$1 = String.fromCharCode(code$2);
		if (replace$1) {
			result.push(value.slice(start, index$1), encodeURIComponent(replace$1));
			start = index$1 + skip + 1;
			replace$1 = "";
		}
		if (skip) {
			index$1 += skip;
			skip = 0;
		}
	}
	return result.join("") + value.slice(start);
}
var indent = {
	tokenize: tokenizeIndent,
	partial: true
};
function gfmFootnote() {
	return {
		document: { [91]: {
			name: "gfmFootnoteDefinition",
			tokenize: tokenizeDefinitionStart,
			continuation: { tokenize: tokenizeDefinitionContinuation },
			exit: gfmFootnoteDefinitionEnd
		} },
		text: {
			[91]: {
				name: "gfmFootnoteCall",
				tokenize: tokenizeGfmFootnoteCall
			},
			[93]: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: tokenizePotentialGfmFootnoteCall,
				resolveTo: resolveToPotentialGfmFootnoteCall
			}
		}
	};
}
function tokenizePotentialGfmFootnoteCall(effects, ok$1, nok) {
	const self$1 = this;
	let index$1 = self$1.events.length;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let labelStart;
	while (index$1--) {
		const token = self$1.events[index$1][1];
		if (token.type === "labelImage") {
			labelStart = token;
			break;
		}
		if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") break;
	}
	return start;
	function start(code$2) {
		if (!labelStart || !labelStart._balanced) return nok(code$2);
		const id = normalizeIdentifier(self$1.sliceSerialize({
			start: labelStart.end,
			end: self$1.now()
		}));
		if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) return nok(code$2);
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$2);
		effects.exit("gfmFootnoteCallLabelMarker");
		return ok$1(code$2);
	}
}
function resolveToPotentialGfmFootnoteCall(events, context) {
	let index$1 = events.length;
	while (index$1--) if (events[index$1][1].type === "labelImage" && events[index$1][0] === "enter") {
		events[index$1][1];
		break;
	}
	events[index$1 + 1][1].type = "data";
	events[index$1 + 3][1].type = "gfmFootnoteCallLabelMarker";
	const call = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, events[index$1 + 3][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	const marker = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, events[index$1 + 3][1].end),
		end: Object.assign({}, events[index$1 + 3][1].end)
	};
	marker.end.column++;
	marker.end.offset++;
	marker.end._bufferIndex++;
	const string = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, marker.end),
		end: Object.assign({}, events[events.length - 1][1].start)
	};
	const chunk = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, string.start),
		end: Object.assign({}, string.end)
	};
	const replacement = [
		events[index$1 + 1],
		events[index$1 + 2],
		[
			"enter",
			call,
			context
		],
		events[index$1 + 3],
		events[index$1 + 4],
		[
			"enter",
			marker,
			context
		],
		[
			"exit",
			marker,
			context
		],
		[
			"enter",
			string,
			context
		],
		[
			"enter",
			chunk,
			context
		],
		[
			"exit",
			chunk,
			context
		],
		[
			"exit",
			string,
			context
		],
		events[events.length - 2],
		events[events.length - 1],
		[
			"exit",
			call,
			context
		]
	];
	events.splice(index$1, events.length - index$1 + 1, ...replacement);
	return events;
}
function tokenizeGfmFootnoteCall(effects, ok$1, nok) {
	const self$1 = this;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let size = 0;
	let data;
	return start;
	function start(code$2) {
		effects.enter("gfmFootnoteCall");
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$2);
		effects.exit("gfmFootnoteCallLabelMarker");
		return callStart;
	}
	function callStart(code$2) {
		if (code$2 !== 94) return nok(code$2);
		effects.enter("gfmFootnoteCallMarker");
		effects.consume(code$2);
		effects.exit("gfmFootnoteCallMarker");
		effects.enter("gfmFootnoteCallString");
		effects.enter("chunkString").contentType = "string";
		return callData;
	}
	function callData(code$2) {
		if (size > 999 || code$2 === 93 && !data || code$2 === null || code$2 === 91 || markdownLineEndingOrSpace(code$2)) return nok(code$2);
		if (code$2 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteCallString");
			if (!defined.includes(normalizeIdentifier(self$1.sliceSerialize(token)))) return nok(code$2);
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code$2);
			effects.exit("gfmFootnoteCallLabelMarker");
			effects.exit("gfmFootnoteCall");
			return ok$1;
		}
		if (!markdownLineEndingOrSpace(code$2)) data = true;
		size++;
		effects.consume(code$2);
		return code$2 === 92 ? callEscape : callData;
	}
	function callEscape(code$2) {
		if (code$2 === 91 || code$2 === 92 || code$2 === 93) {
			effects.consume(code$2);
			size++;
			return callData;
		}
		return callData(code$2);
	}
}
function tokenizeDefinitionStart(effects, ok$1, nok) {
	const self$1 = this;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let identifier;
	let size = 0;
	let data;
	return start;
	function start(code$2) {
		effects.enter("gfmFootnoteDefinition")._container = true;
		effects.enter("gfmFootnoteDefinitionLabel");
		effects.enter("gfmFootnoteDefinitionLabelMarker");
		effects.consume(code$2);
		effects.exit("gfmFootnoteDefinitionLabelMarker");
		return labelAtMarker;
	}
	function labelAtMarker(code$2) {
		if (code$2 === 94) {
			effects.enter("gfmFootnoteDefinitionMarker");
			effects.consume(code$2);
			effects.exit("gfmFootnoteDefinitionMarker");
			effects.enter("gfmFootnoteDefinitionLabelString");
			effects.enter("chunkString").contentType = "string";
			return labelInside;
		}
		return nok(code$2);
	}
	function labelInside(code$2) {
		if (size > 999 || code$2 === 93 && !data || code$2 === null || code$2 === 91 || markdownLineEndingOrSpace(code$2)) return nok(code$2);
		if (code$2 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteDefinitionLabelString");
			identifier = normalizeIdentifier(self$1.sliceSerialize(token));
			effects.enter("gfmFootnoteDefinitionLabelMarker");
			effects.consume(code$2);
			effects.exit("gfmFootnoteDefinitionLabelMarker");
			effects.exit("gfmFootnoteDefinitionLabel");
			return labelAfter;
		}
		if (!markdownLineEndingOrSpace(code$2)) data = true;
		size++;
		effects.consume(code$2);
		return code$2 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$2) {
		if (code$2 === 91 || code$2 === 92 || code$2 === 93) {
			effects.consume(code$2);
			size++;
			return labelInside;
		}
		return labelInside(code$2);
	}
	function labelAfter(code$2) {
		if (code$2 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$2);
			effects.exit("definitionMarker");
			if (!defined.includes(identifier)) defined.push(identifier);
			return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
		}
		return nok(code$2);
	}
	function whitespaceAfter(code$2) {
		return ok$1(code$2);
	}
}
function tokenizeDefinitionContinuation(effects, ok$1, nok) {
	return effects.check(blankLine, ok$1, effects.attempt(indent, ok$1, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
	effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent(effects, ok$1, nok) {
	const self$1 = this;
	return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 5);
	function afterPrefix(code$2) {
		const tail = self$1.events[self$1.events.length - 1];
		return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok$1(code$2) : nok(code$2);
	}
}
function gfmStrikethrough(options) {
	let single = (options || {}).singleTilde;
	const tokenizer = {
		name: "strikethrough",
		tokenize: tokenizeStrikethrough,
		resolveAll: resolveAllStrikethrough
	};
	if (single === null || single === void 0) single = true;
	return {
		text: { [126]: tokenizer },
		insideSpan: { null: [tokenizer] },
		attentionMarkers: { null: [126] }
	};
	function resolveAllStrikethrough(events, context) {
		let index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "strikethroughSequenceTemporary" && events[index$1][1]._close) {
			let open = index$1;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index$1][1].end.offset - events[index$1][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
				events[index$1][1].type = "strikethroughSequence";
				events[open][1].type = "strikethroughSequence";
				const strikethrough$1 = {
					type: "strikethrough",
					start: Object.assign({}, events[open][1].start),
					end: Object.assign({}, events[index$1][1].end)
				};
				const text$6 = {
					type: "strikethroughText",
					start: Object.assign({}, events[open][1].end),
					end: Object.assign({}, events[index$1][1].start)
				};
				const nextEvents = [
					[
						"enter",
						strikethrough$1,
						context
					],
					[
						"enter",
						events[open][1],
						context
					],
					[
						"exit",
						events[open][1],
						context
					],
					[
						"enter",
						text$6,
						context
					]
				];
				const insideSpan = context.parser.constructs.insideSpan.null;
				if (insideSpan) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan, events.slice(open + 1, index$1), context));
				splice(nextEvents, nextEvents.length, 0, [
					[
						"exit",
						text$6,
						context
					],
					[
						"enter",
						events[index$1][1],
						context
					],
					[
						"exit",
						events[index$1][1],
						context
					],
					[
						"exit",
						strikethrough$1,
						context
					]
				]);
				splice(events, open - 1, index$1 - open + 3, nextEvents);
				index$1 = open + nextEvents.length - 2;
				break;
			}
		}
		index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][1].type === "strikethroughSequenceTemporary") events[index$1][1].type = "data";
		return events;
	}
	function tokenizeStrikethrough(effects, ok$1, nok) {
		const previous$1 = this.previous;
		const events = this.events;
		let size = 0;
		return start;
		function start(code$2) {
			if (previous$1 === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code$2);
			effects.enter("strikethroughSequenceTemporary");
			return more(code$2);
		}
		function more(code$2) {
			const before = classifyCharacter(previous$1);
			if (code$2 === 126) {
				if (size > 1) return nok(code$2);
				effects.consume(code$2);
				size++;
				return more;
			}
			if (size < 2 && !single) return nok(code$2);
			const token = effects.exit("strikethroughSequenceTemporary");
			const after = classifyCharacter(code$2);
			token._open = !after || after === 2 && Boolean(before);
			token._close = !before || before === 2 && Boolean(after);
			return ok$1(code$2);
		}
	}
}
var EditMap = class {
	constructor() {
		this.map = [];
	}
	add(index$1, remove, add) {
		addImplementation(this, index$1, remove, add);
	}
	consume(events) {
		this.map.sort(function(a, b$1) {
			return a[0] - b$1[0];
		});
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.length === 0) return;
		let index$1 = this.map.length;
		const vecs = [];
		while (index$1 > 0) {
			index$1 -= 1;
			vecs.push(events.slice(this.map[index$1][0] + this.map[index$1][1]), this.map[index$1][2]);
			events.length = this.map[index$1][0];
		}
		vecs.push(events.slice());
		events.length = 0;
		let slice = vecs.pop();
		while (slice) {
			for (const element$5 of slice) events.push(element$5);
			slice = vecs.pop();
		}
		this.map.length = 0;
	}
};
function addImplementation(editMap, at$1, remove, add) {
	let index$1 = 0;
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (remove === 0 && add.length === 0) return;
	while (index$1 < editMap.map.length) {
		if (editMap.map[index$1][0] === at$1) {
			editMap.map[index$1][1] += remove;
			editMap.map[index$1][2].push(...add);
			return;
		}
		index$1 += 1;
	}
	editMap.map.push([
		at$1,
		remove,
		add
	]);
}
function gfmTableAlign(events, index$1) {
	let inDelimiterRow = false;
	const align = [];
	while (index$1 < events.length) {
		const event = events[index$1];
		if (inDelimiterRow) {
			if (event[0] === "enter") {
				if (event[1].type === "tableContent") align.push(events[index$1 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			} else if (event[1].type === "tableContent") {
				if (events[index$1 - 1][1].type === "tableDelimiterMarker") {
					const alignIndex = align.length - 1;
					align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
				}
			} else if (event[1].type === "tableDelimiterRow") break;
		} else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") inDelimiterRow = true;
		index$1 += 1;
	}
	return align;
}
function gfmTable() {
	return { flow: { null: {
		name: "table",
		tokenize: tokenizeTable,
		resolveAll: resolveTable
	} } };
}
function tokenizeTable(effects, ok$1, nok) {
	const self$1 = this;
	let size = 0;
	let sizeB = 0;
	let seen;
	return start;
	function start(code$2) {
		let index$1 = self$1.events.length - 1;
		while (index$1 > -1) {
			const type = self$1.events[index$1][1].type;
			if (type === "lineEnding" || type === "linePrefix") index$1--;
			else break;
		}
		const tail = index$1 > -1 ? self$1.events[index$1][1].type : null;
		const next$1 = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
		if (next$1 === bodyRowStart && self$1.parser.lazy[self$1.now().line]) return nok(code$2);
		return next$1(code$2);
	}
	function headRowBefore(code$2) {
		effects.enter("tableHead");
		effects.enter("tableRow");
		return headRowStart(code$2);
	}
	function headRowStart(code$2) {
		if (code$2 === 124) return headRowBreak(code$2);
		seen = true;
		sizeB += 1;
		return headRowBreak(code$2);
	}
	function headRowBreak(code$2) {
		if (code$2 === null) return nok(code$2);
		if (markdownLineEnding(code$2)) {
			if (sizeB > 1) {
				sizeB = 0;
				self$1.interrupt = true;
				effects.exit("tableRow");
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return headDelimiterStart;
			}
			return nok(code$2);
		}
		if (markdownSpace(code$2)) return factorySpace(effects, headRowBreak, "whitespace")(code$2);
		sizeB += 1;
		if (seen) {
			seen = false;
			size += 1;
		}
		if (code$2 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$2);
			effects.exit("tableCellDivider");
			seen = true;
			return headRowBreak;
		}
		effects.enter("data");
		return headRowData(code$2);
	}
	function headRowData(code$2) {
		if (code$2 === null || code$2 === 124 || markdownLineEndingOrSpace(code$2)) {
			effects.exit("data");
			return headRowBreak(code$2);
		}
		effects.consume(code$2);
		return code$2 === 92 ? headRowEscape : headRowData;
	}
	function headRowEscape(code$2) {
		if (code$2 === 92 || code$2 === 124) {
			effects.consume(code$2);
			return headRowData;
		}
		return headRowData(code$2);
	}
	function headDelimiterStart(code$2) {
		self$1.interrupt = false;
		if (self$1.parser.lazy[self$1.now().line]) return nok(code$2);
		effects.enter("tableDelimiterRow");
		seen = false;
		if (markdownSpace(code$2)) return factorySpace(effects, headDelimiterBefore, "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$2);
		return headDelimiterBefore(code$2);
	}
	function headDelimiterBefore(code$2) {
		if (code$2 === 45 || code$2 === 58) return headDelimiterValueBefore(code$2);
		if (code$2 === 124) {
			seen = true;
			effects.enter("tableCellDivider");
			effects.consume(code$2);
			effects.exit("tableCellDivider");
			return headDelimiterCellBefore;
		}
		return headDelimiterNok(code$2);
	}
	function headDelimiterCellBefore(code$2) {
		if (markdownSpace(code$2)) return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code$2);
		return headDelimiterValueBefore(code$2);
	}
	function headDelimiterValueBefore(code$2) {
		if (code$2 === 58) {
			sizeB += 1;
			seen = true;
			effects.enter("tableDelimiterMarker");
			effects.consume(code$2);
			effects.exit("tableDelimiterMarker");
			return headDelimiterLeftAlignmentAfter;
		}
		if (code$2 === 45) {
			sizeB += 1;
			return headDelimiterLeftAlignmentAfter(code$2);
		}
		if (code$2 === null || markdownLineEnding(code$2)) return headDelimiterCellAfter(code$2);
		return headDelimiterNok(code$2);
	}
	function headDelimiterLeftAlignmentAfter(code$2) {
		if (code$2 === 45) {
			effects.enter("tableDelimiterFiller");
			return headDelimiterFiller(code$2);
		}
		return headDelimiterNok(code$2);
	}
	function headDelimiterFiller(code$2) {
		if (code$2 === 45) {
			effects.consume(code$2);
			return headDelimiterFiller;
		}
		if (code$2 === 58) {
			seen = true;
			effects.exit("tableDelimiterFiller");
			effects.enter("tableDelimiterMarker");
			effects.consume(code$2);
			effects.exit("tableDelimiterMarker");
			return headDelimiterRightAlignmentAfter;
		}
		effects.exit("tableDelimiterFiller");
		return headDelimiterRightAlignmentAfter(code$2);
	}
	function headDelimiterRightAlignmentAfter(code$2) {
		if (markdownSpace(code$2)) return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code$2);
		return headDelimiterCellAfter(code$2);
	}
	function headDelimiterCellAfter(code$2) {
		if (code$2 === 124) return headDelimiterBefore(code$2);
		if (code$2 === null || markdownLineEnding(code$2)) {
			if (!seen || size !== sizeB) return headDelimiterNok(code$2);
			effects.exit("tableDelimiterRow");
			effects.exit("tableHead");
			return ok$1(code$2);
		}
		return headDelimiterNok(code$2);
	}
	function headDelimiterNok(code$2) {
		return nok(code$2);
	}
	function bodyRowStart(code$2) {
		effects.enter("tableRow");
		return bodyRowBreak(code$2);
	}
	function bodyRowBreak(code$2) {
		if (code$2 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$2);
			effects.exit("tableCellDivider");
			return bodyRowBreak;
		}
		if (code$2 === null || markdownLineEnding(code$2)) {
			effects.exit("tableRow");
			return ok$1(code$2);
		}
		if (markdownSpace(code$2)) return factorySpace(effects, bodyRowBreak, "whitespace")(code$2);
		effects.enter("data");
		return bodyRowData(code$2);
	}
	function bodyRowData(code$2) {
		if (code$2 === null || code$2 === 124 || markdownLineEndingOrSpace(code$2)) {
			effects.exit("data");
			return bodyRowBreak(code$2);
		}
		effects.consume(code$2);
		return code$2 === 92 ? bodyRowEscape : bodyRowData;
	}
	function bodyRowEscape(code$2) {
		if (code$2 === 92 || code$2 === 124) {
			effects.consume(code$2);
			return bodyRowData;
		}
		return bodyRowData(code$2);
	}
}
function resolveTable(events, context) {
	let index$1 = -1;
	let inFirstCellAwaitingPipe = true;
	let rowKind = 0;
	let lastCell = [
		0,
		0,
		0,
		0
	];
	let cell = [
		0,
		0,
		0,
		0
	];
	let afterHeadAwaitingFirstBodyRow = false;
	let lastTableEnd = 0;
	let currentTable;
	let currentBody;
	let currentCell;
	const map = new EditMap();
	while (++index$1 < events.length) {
		const event = events[index$1];
		const token = event[1];
		if (event[0] === "enter") {
			if (token.type === "tableHead") {
				afterHeadAwaitingFirstBodyRow = false;
				if (lastTableEnd !== 0) {
					flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
					currentBody = void 0;
					lastTableEnd = 0;
				}
				currentTable = {
					type: "table",
					start: Object.assign({}, token.start),
					end: Object.assign({}, token.end)
				};
				map.add(index$1, 0, [[
					"enter",
					currentTable,
					context
				]]);
			} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
				inFirstCellAwaitingPipe = true;
				currentCell = void 0;
				lastCell = [
					0,
					0,
					0,
					0
				];
				cell = [
					0,
					index$1 + 1,
					0,
					0
				];
				if (afterHeadAwaitingFirstBodyRow) {
					afterHeadAwaitingFirstBodyRow = false;
					currentBody = {
						type: "tableBody",
						start: Object.assign({}, token.start),
						end: Object.assign({}, token.end)
					};
					map.add(index$1, 0, [[
						"enter",
						currentBody,
						context
					]]);
				}
				rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
			} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
				inFirstCellAwaitingPipe = false;
				if (cell[2] === 0) {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
						lastCell = [
							0,
							0,
							0,
							0
						];
					}
					cell[2] = index$1;
				}
			} else if (token.type === "tableCellDivider") if (inFirstCellAwaitingPipe) inFirstCellAwaitingPipe = false;
			else {
				if (lastCell[1] !== 0) {
					cell[0] = cell[1];
					currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
				}
				lastCell = cell;
				cell = [
					lastCell[1],
					index$1,
					0,
					0
				];
			}
		} else if (token.type === "tableHead") {
			afterHeadAwaitingFirstBodyRow = true;
			lastTableEnd = index$1;
		} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
			lastTableEnd = index$1;
			if (lastCell[1] !== 0) {
				cell[0] = cell[1];
				currentCell = flushCell(map, context, lastCell, rowKind, index$1, currentCell);
			} else if (cell[1] !== 0) currentCell = flushCell(map, context, cell, rowKind, index$1, currentCell);
			rowKind = 0;
		} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) cell[3] = index$1;
	}
	if (lastTableEnd !== 0) flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
	map.consume(context.events);
	index$1 = -1;
	while (++index$1 < context.events.length) {
		const event = context.events[index$1];
		if (event[0] === "enter" && event[1].type === "table") event[1]._align = gfmTableAlign(context.events, index$1);
	}
	return events;
}
function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
	const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
	const valueName = "tableContent";
	if (range[0] !== 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
		map.add(range[0], 0, [[
			"exit",
			previousCell,
			context
		]]);
	}
	const now = getPoint(context.events, range[1]);
	previousCell = {
		type: groupName,
		start: Object.assign({}, now),
		end: Object.assign({}, now)
	};
	map.add(range[1], 0, [[
		"enter",
		previousCell,
		context
	]]);
	if (range[2] !== 0) {
		const relatedStart = getPoint(context.events, range[2]);
		const relatedEnd = getPoint(context.events, range[3]);
		const valueToken = {
			type: valueName,
			start: Object.assign({}, relatedStart),
			end: Object.assign({}, relatedEnd)
		};
		map.add(range[2], 0, [[
			"enter",
			valueToken,
			context
		]]);
		if (rowKind !== 2) {
			const start = context.events[range[2]];
			const end = context.events[range[3]];
			start[1].end = Object.assign({}, end[1].end);
			start[1].type = "chunkText";
			start[1].contentType = "text";
			if (range[3] > range[2] + 1) {
				const a = range[2] + 1;
				const b$1 = range[3] - range[2] - 1;
				map.add(a, b$1, []);
			}
		}
		map.add(range[3] + 1, 0, [[
			"exit",
			valueToken,
			context
		]]);
	}
	if (rowEnd !== void 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
		map.add(rowEnd, 0, [[
			"exit",
			previousCell,
			context
		]]);
		previousCell = void 0;
	}
	return previousCell;
}
function flushTableEnd(map, context, index$1, table$1, tableBody) {
	const exits = [];
	const related = getPoint(context.events, index$1);
	if (tableBody) {
		tableBody.end = Object.assign({}, related);
		exits.push([
			"exit",
			tableBody,
			context
		]);
	}
	table$1.end = Object.assign({}, related);
	exits.push([
		"exit",
		table$1,
		context
	]);
	map.add(index$1 + 1, 0, exits);
}
function getPoint(events, index$1) {
	const event = events[index$1];
	const side = event[0] === "enter" ? "start" : "end";
	return event[1][side];
}
var tasklistCheck = {
	name: "tasklistCheck",
	tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
	return { text: { [91]: tasklistCheck } };
}
function tokenizeTasklistCheck(effects, ok$1, nok) {
	const self$1 = this;
	return open;
	function open(code$2) {
		if (self$1.previous !== null || !self$1._gfmTasklistFirstContentOfListItem) return nok(code$2);
		effects.enter("taskListCheck");
		effects.enter("taskListCheckMarker");
		effects.consume(code$2);
		effects.exit("taskListCheckMarker");
		return inside;
	}
	function inside(code$2) {
		if (markdownLineEndingOrSpace(code$2)) {
			effects.enter("taskListCheckValueUnchecked");
			effects.consume(code$2);
			effects.exit("taskListCheckValueUnchecked");
			return close;
		}
		if (code$2 === 88 || code$2 === 120) {
			effects.enter("taskListCheckValueChecked");
			effects.consume(code$2);
			effects.exit("taskListCheckValueChecked");
			return close;
		}
		return nok(code$2);
	}
	function close(code$2) {
		if (code$2 === 93) {
			effects.enter("taskListCheckMarker");
			effects.consume(code$2);
			effects.exit("taskListCheckMarker");
			effects.exit("taskListCheck");
			return after;
		}
		return nok(code$2);
	}
	function after(code$2) {
		if (markdownLineEnding(code$2)) return ok$1(code$2);
		if (markdownSpace(code$2)) return effects.check({ tokenize: spaceThenNonSpace }, ok$1, nok)(code$2);
		return nok(code$2);
	}
}
function spaceThenNonSpace(effects, ok$1, nok) {
	return factorySpace(effects, after, "whitespace");
	function after(code$2) {
		return code$2 === null ? nok(code$2) : ok$1(code$2);
	}
}
function gfm(options) {
	return combineExtensions([
		gfmAutolinkLiteral(),
		gfmFootnote(),
		gfmStrikethrough(options),
		gfmTable(),
		gfmTaskListItem()
	]);
}
var emptyOptions$2 = {};
function remarkGfm(options) {
	const self$1 = this;
	const settings = options || emptyOptions$2;
	const data = self$1.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(gfm(settings));
	fromMarkdownExtensions.push(gfmFromMarkdown());
	toMarkdownExtensions.push(gfmToMarkdown(settings));
}
var cn$1 = Object.defineProperty, un$1 = Object.defineProperties;
var fn = Object.getOwnPropertyDescriptors;
var $ = Object.getOwnPropertySymbols;
var dn$1 = Object.prototype.hasOwnProperty, gn$1 = Object.prototype.propertyIsEnumerable;
var O = (n, r, e) => r in n ? cn$1(n, r, {
	enumerable: true,
	configurable: true,
	writable: true,
	value: e
}) : n[r] = e, I = (n, r) => {
	for (var e in r || (r = {})) dn$1.call(r, e) && O(n, e, r[e]);
	if ($) for (var e of $(r)) gn$1.call(r, e) && O(n, e, r[e]);
	return n;
}, k = (n, r) => un$1(n, fn(r));
var c = (n, r) => {
	let e = false, i = false;
	for (let s$1 = 0; s$1 < r; s$1 += 1) {
		if (n[s$1] === "\\" && s$1 + 1 < n.length && n[s$1 + 1] === "`") {
			s$1 += 1;
			continue;
		}
		if (n.substring(s$1, s$1 + 3) === "```") {
			i = !i, s$1 += 2;
			continue;
		}
		!i && n[s$1] === "`" && (e = !e);
	}
	return e || i;
}, hn$1 = (n, r) => {
	let e = n.substring(r, r + 3) === "```", i = r > 0 && n.substring(r - 1, r + 2) === "```", s$1 = r > 1 && n.substring(r - 2, r + 1) === "```";
	return e || i || s$1;
}, L$1 = (n) => {
	let r = 0;
	for (let e = 0; e < n.length; e += 1) {
		if (n[e] === "\\" && e + 1 < n.length && n[e + 1] === "`") {
			e += 1;
			continue;
		}
		n[e] === "`" && !hn$1(n, e) && (r += 1);
	}
	return r;
}, f = (n, r) => {
	let e = false, i = false, s$1 = -1;
	for (let o = 0; o < n.length; o += 1) {
		if (n[o] === "\\" && o + 1 < n.length && n[o + 1] === "`") {
			o += 1;
			continue;
		}
		if (n.substring(o, o + 3) === "```") {
			i = !i, o += 2;
			continue;
		}
		if (!i && n[o] === "`") if (e) {
			if (s$1 < r && r < o) return true;
			e = false, s$1 = -1;
		} else e = true, s$1 = o;
	}
	return false;
};
var mn$1 = /^(\s*(?:[-*+]|\d+[.)]) +)>(=?\s*[$]?\d)/gm, E$1 = (n) => !n || typeof n != "string" || !n.includes(">") ? n : n.replace(mn$1, (r, e, i, s$1) => c(n, s$1) ? r : `${e}\\>${i}`);
var M = /(\*\*)([^*]*\*?)$/, N = /(__)([^_]*?)$/, y$1 = /(\*\*\*)([^*]*?)$/, R$1 = /(\*)([^*]*?)$/, U = /(_)([^_]*?)$/, W$1 = /(`)([^`]*?)$/, K = /(~~)([^~]*?)$/, d = /^[\s_~*`]*$/, b = /^[\s]*[-*+][\s]+$/, H = /[\p{L}\p{N}_]/u, D$1 = /^```[^`\n]*```?$/, w = /^\*{4,}$/;
var G = /(__)([^_]+)_$/, F = /(~~)([^~]+)~$/;
var T = /~~/g, g = (n) => {
	if (!n) return false;
	let r = n.charCodeAt(0);
	return r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122 || r === 95 ? true : H.test(n);
}, X = (n, r) => {
	let e = 1;
	for (let i = r - 1; i >= 0; i -= 1) if (n[i] === "]") e += 1;
	else if (n[i] === "[" && (e -= 1, e === 0)) return i;
	return -1;
}, C = (n, r) => {
	let e = 1;
	for (let i = r + 1; i < n.length; i += 1) if (n[i] === "[") e += 1;
	else if (n[i] === "]" && (e -= 1, e === 0)) return i;
	return -1;
}, h = (n, r) => {
	let e = false, i = false;
	for (let s$1 = 0; s$1 < n.length && s$1 < r; s$1 += 1) {
		if (n[s$1] === "\\" && n[s$1 + 1] === "$") {
			s$1 += 1;
			continue;
		}
		n[s$1] === "$" && (n[s$1 + 1] === "$" ? (i = !i, s$1 += 1, e = false) : i || (e = !e));
	}
	return e || i;
}, In = (n, r) => {
	for (let e = r; e < n.length; e += 1) {
		if (n[e] === ")") return true;
		if (n[e] === `
`) return false;
	}
	return false;
}, m = (n, r) => {
	for (let e = r - 1; e >= 0; e -= 1) {
		if (n[e] === ")") return false;
		if (n[e] === "(") return e > 0 && n[e - 1] === "]" ? In(n, r) : false;
		if (n[e] === `
`) return false;
	}
	return false;
}, z = (n, r) => {
	for (let e = r - 1; e >= 0; e -= 1) {
		if (n[e] === ">") return false;
		if (n[e] === "<") {
			let i = e + 1 < n.length ? n[e + 1] : "";
			return i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i === "/";
		}
		if (n[e] === `
`) return false;
	}
	return false;
}, p = (n, r, e) => {
	let i = 0;
	for (let l = r - 1; l >= 0; l -= 1) if (n[l] === `
`) {
		i = l + 1;
		break;
	}
	let s$1 = n.length;
	for (let l = r; l < n.length; l += 1) if (n[l] === `
`) {
		s$1 = l;
		break;
	}
	let o = n.substring(i, s$1), t = 0, a = false;
	for (let l of o) if (l === e) t += 1;
	else if (l !== " " && l !== "	") {
		a = true;
		break;
	}
	return t >= 3 && !a;
};
var kn = (n, r, e, i) => e === "\\" || n.includes("$") && h(n, r) ? true : e !== "*" && i === "*" ? (r < n.length - 2 ? n[r + 2] : "") !== "*" : !!(e === "*" || e && i && g(e) && g(i) || (!e || e === " " || e === "	" || e === `
`) && (!i || i === " " || i === "	" || i === `
`)), Y = (n) => {
	let r = 0, e = false, i = n.length;
	for (let s$1 = 0; s$1 < i; s$1 += 1) {
		if (n[s$1] === "`" && s$1 + 2 < i && n[s$1 + 1] === "`" && n[s$1 + 2] === "`") {
			e = !e, s$1 += 2;
			continue;
		}
		if (e || n[s$1] !== "*") continue;
		let o = s$1 > 0 ? n[s$1 - 1] : "", t = s$1 < i - 1 ? n[s$1 + 1] : "";
		kn(n, s$1, o, t) || (r += 1);
	}
	return r;
}, bn$1 = (n, r, e, i) => !!(e === "\\" || n.includes("$") && h(n, r) || m(n, r) || z(n, r) || e === "_" || i === "_" || e && i && g(e) && g(i)), Tn$1 = (n) => {
	let r = 0, e = false, i = n.length;
	for (let s$1 = 0; s$1 < i; s$1 += 1) {
		if (n[s$1] === "`" && s$1 + 2 < i && n[s$1 + 1] === "`" && n[s$1 + 2] === "`") {
			e = !e, s$1 += 2;
			continue;
		}
		if (e || n[s$1] !== "_") continue;
		let o = s$1 > 0 ? n[s$1 - 1] : "", t = s$1 < i - 1 ? n[s$1 + 1] : "";
		bn$1(n, s$1, o, t) || (r += 1);
	}
	return r;
}, Cn = (n) => {
	let r = 0, e = 0, i = false;
	for (let s$1 = 0; s$1 < n.length; s$1 += 1) {
		if (n[s$1] === "`" && s$1 + 2 < n.length && n[s$1 + 1] === "`" && n[s$1 + 2] === "`") {
			e >= 3 && (r += Math.floor(e / 3)), e = 0, i = !i, s$1 += 2;
			continue;
		}
		i || (n[s$1] === "*" ? e += 1 : (e >= 3 && (r += Math.floor(e / 3)), e = 0));
	}
	return e >= 3 && (r += Math.floor(e / 3)), r;
}, A = (n) => {
	let r = 0, e = false;
	for (let i = 0; i < n.length; i += 1) {
		if (n[i] === "`" && i + 2 < n.length && n[i + 1] === "`" && n[i + 2] === "`") {
			e = !e, i += 2;
			continue;
		}
		e || n[i] === "*" && i + 1 < n.length && n[i + 1] === "*" && (r += 1, i += 1);
	}
	return r;
}, v = (n) => {
	let r = 0, e = false;
	for (let i = 0; i < n.length; i += 1) {
		if (n[i] === "`" && i + 2 < n.length && n[i + 1] === "`" && n[i + 2] === "`") {
			e = !e, i += 2;
			continue;
		}
		e || n[i] === "_" && i + 1 < n.length && n[i + 1] === "_" && (r += 1, i += 1);
	}
	return r;
}, An$1 = (n, r, e) => {
	if (!r || d.test(r)) return true;
	let s$1 = n.substring(0, e).lastIndexOf(`
`), o = s$1 === -1 ? 0 : s$1 + 1, t = n.substring(o, e);
	return b.test(t) && r.includes(`
`) ? true : p(n, e, "*");
}, j = (n) => {
	let r = n.match(M);
	if (!r) return n;
	let e = r[2], i = n.lastIndexOf(r[1]);
	return c(n, i) || f(n, i) || An$1(n, e, i) ? n : A(n) % 2 === 1 ? e.endsWith("*") ? `${n}*` : `${n}**` : n;
}, Bn$1 = (n, r, e) => {
	if (!r || d.test(r)) return true;
	let s$1 = n.substring(0, e).lastIndexOf(`
`), o = s$1 === -1 ? 0 : s$1 + 1, t = n.substring(o, e);
	return b.test(t) && r.includes(`
`) ? true : p(n, e, "_");
}, Q = (n) => {
	let r = n.match(N);
	if (!r) {
		let o = n.match(G);
		if (o) {
			let t = n.lastIndexOf(o[1]);
			if (!(c(n, t) || f(n, t)) && v(n) % 2 === 1) return `${n}_`;
		}
		return n;
	}
	let e = r[2], i = n.lastIndexOf(r[1]);
	return c(n, i) || f(n, i) || Bn$1(n, e, i) ? n : v(n) % 2 === 1 ? `${n}__` : n;
}, Sn = (n) => {
	let r = false;
	for (let e = 0; e < n.length; e += 1) {
		if (n[e] === "`" && e + 2 < n.length && n[e + 1] === "`" && n[e + 2] === "`") {
			r = !r, e += 2;
			continue;
		}
		if (!r && n[e] === "*" && n[e - 1] !== "*" && n[e + 1] !== "*" && n[e - 1] !== "\\" && !h(n, e)) {
			let i = e > 0 ? n[e - 1] : "", s$1 = e < n.length - 1 ? n[e + 1] : "";
			if ((!i || i === " " || i === "	" || i === `
`) && (!s$1 || s$1 === " " || s$1 === "	" || s$1 === `
`) || i && s$1 && g(i) && g(s$1)) continue;
			return e;
		}
	}
	return -1;
}, Z = (n) => {
	if (!n.match(R$1)) return n;
	let e = Sn(n);
	if (e === -1 || c(n, e) || f(n, e)) return n;
	let i = n.substring(e + 1);
	return !i || d.test(i) ? n : Y(n) % 2 === 1 ? `${n}*` : n;
}, q = (n) => {
	let r = false;
	for (let e = 0; e < n.length; e += 1) {
		if (n[e] === "`" && e + 2 < n.length && n[e + 1] === "`" && n[e + 2] === "`") {
			r = !r, e += 2;
			continue;
		}
		if (!r && n[e] === "_" && n[e - 1] !== "_" && n[e + 1] !== "_" && n[e - 1] !== "\\" && !h(n, e) && !m(n, e)) {
			let i = e > 0 ? n[e - 1] : "", s$1 = e < n.length - 1 ? n[e + 1] : "";
			if (i && s$1 && g(i) && g(s$1)) continue;
			return e;
		}
	}
	return -1;
}, _n$1 = (n) => {
	let r = n.length;
	for (; r > 0 && n[r - 1] === `
`;) r -= 1;
	if (r < n.length) return `${n.slice(0, r)}_${n.slice(r)}`;
	return `${n}_`;
}, Pn = (n) => {
	if (!n.endsWith("**")) return null;
	let r = n.slice(0, -2);
	if (A(r) % 2 !== 1) return null;
	let i = r.indexOf("**"), s$1 = q(r);
	return i !== -1 && s$1 !== -1 && i < s$1 ? `${r}_**` : null;
}, J = (n) => {
	if (!n.match(U)) return n;
	let e = q(n);
	if (e === -1) return n;
	let i = n.substring(e + 1);
	if (!i || d.test(i) || c(n, e) || f(n, e)) return n;
	if (Tn$1(n) % 2 === 1) {
		let o = Pn(n);
		return o !== null ? o : _n$1(n);
	}
	return n;
}, $n$1 = (n) => {
	let r = A(n), e = Y(n);
	return r % 2 === 0 && e % 2 === 0;
}, On$1 = (n, r, e) => !r || d.test(r) || c(n, e) || f(n, e) ? true : p(n, e, "*"), V = (n) => {
	if (w.test(n)) return n;
	let r = n.match(y$1);
	if (!r) return n;
	let e = r[2];
	return On$1(n, e, n.lastIndexOf(r[1])) ? n : Cn(n) % 2 === 1 ? $n$1(n) ? n : `${n}***` : n;
};
var Ln = /<[a-zA-Z/][^>]*$/, x$1 = (n) => {
	let r = n.match(Ln);
	return !r || r.index === void 0 || c(n, r.index) ? n : n.substring(0, r.index).trimEnd();
};
var En = (n) => !n.match(D$1) || n.includes(`
`) ? null : n.endsWith("``") && !n.endsWith("```") ? `${n}\`` : n, Mn = (n) => (n.match(/```/g) || []).length % 2 === 1, nn$1 = (n) => {
	let r = En(n);
	if (r !== null) return r;
	let e = n.match(W$1);
	if (e && !Mn(n)) {
		let i = e[2];
		if (!i || d.test(i)) return n;
		if (L$1(n) % 2 === 1) return `${n}\``;
	}
	return n;
};
var en$1 = (n, r) => r >= 2 && n.substring(r - 2, r + 1) === "```" || r >= 1 && n.substring(r - 1, r + 2) === "```" || r <= n.length - 3 && n.substring(r, r + 3) === "```", Nn$1 = (n) => {
	let r = 0, e = false;
	for (let i = 0; i < n.length - 1; i += 1) n[i] === "`" && !en$1(n, i) && (e = !e), !e && n[i] === "$" && n[i + 1] === "$" && (r += 1, i += 1);
	return r;
}, yn$1 = (n) => {
	let r = 0, e = false;
	for (let i = 0; i < n.length; i += 1) {
		if (n[i] === "\\") {
			i += 1;
			continue;
		}
		if (n[i] === "`" && !en$1(n, i)) {
			e = !e;
			continue;
		}
		!e && n[i] === "$" && (i + 1 < n.length && n[i + 1] === "$" ? i += 1 : r += 1);
	}
	return r;
}, Rn = (n) => {
	if (n.endsWith("$") && !n.endsWith("$$")) return `${n}$`;
	let r = n.indexOf("$$");
	return r !== -1 && n.indexOf(`
`, r) !== -1 && !n.endsWith(`
`) ? `${n}
$$` : `${n}$$`;
}, rn$1 = (n) => Nn$1(n) % 2 === 0 ? n : Rn(n), sn$1 = (n) => yn$1(n) % 2 === 1 ? `${n}$` : n;
var Un = (n, r, e) => {
	if (n.substring(r + 2).includes(")")) return null;
	let s$1 = X(n, r);
	if (s$1 === -1 || c(n, s$1)) return null;
	let o = s$1 > 0 && n[s$1 - 1] === "!", t = o ? s$1 - 1 : s$1, a = n.substring(0, t);
	if (o) return a;
	let l = n.substring(s$1 + 1, r);
	return e === "text-only" ? `${a}${l}` : `${a}[${l}](streamdown:incomplete-link)`;
}, on$1 = (n, r) => {
	for (let e = 0; e < r; e++) if (n[e] === "[" && !c(n, e)) {
		if (e > 0 && n[e - 1] === "!") continue;
		let i = C(n, e);
		if (i === -1) return e;
		if (i + 1 < n.length && n[i + 1] === "(") {
			let s$1 = n.indexOf(")", i + 2);
			s$1 !== -1 && (e = s$1);
		}
	}
	return r;
}, Wn$1 = (n, r, e) => {
	let i = r > 0 && n[r - 1] === "!", s$1 = i ? r - 1 : r;
	if (!n.substring(r + 1).includes("]")) {
		let a = n.substring(0, s$1);
		if (i) return a;
		if (e === "text-only") {
			let l = on$1(n, r);
			return n.substring(0, l) + n.substring(l + 1);
		}
		return `${n}](streamdown:incomplete-link)`;
	}
	if (C(n, r) === -1) {
		let a = n.substring(0, s$1);
		if (i) return a;
		if (e === "text-only") {
			let l = on$1(n, r);
			return n.substring(0, l) + n.substring(l + 1);
		}
		return `${n}](streamdown:incomplete-link)`;
	}
	return null;
}, B = (n, r = "protocol") => {
	let e = n.lastIndexOf("](");
	if (e !== -1 && !c(n, e)) {
		let i = Un(n, e, r);
		if (i !== null) return i;
	}
	for (let i = n.length - 1; i >= 0; i -= 1) if (n[i] === "[" && !c(n, i)) {
		let s$1 = Wn$1(n, i, r);
		if (s$1 !== null) return s$1;
	}
	return n;
};
var Kn = /^-{1,2}$/, Hn = /^[\s]*-{1,2}[\s]+$/, Dn = /^={1,2}$/, wn$1 = /^[\s]*={1,2}[\s]+$/, ln$1 = (n) => {
	if (!n || typeof n != "string") return n;
	let r = n.lastIndexOf(`
`);
	if (r === -1) return n;
	let e = n.substring(r + 1), i = n.substring(0, r), s$1 = e.trim();
	if (Kn.test(s$1) && !e.match(Hn)) {
		let t = i.split(`
`).at(-1);
		if (t && t.trim().length > 0) return `${n}\u200B`;
	}
	if (Dn.test(s$1) && !e.match(wn$1)) {
		let t = i.split(`
`).at(-1);
		if (t && t.trim().length > 0) return `${n}\u200B`;
	}
	return n;
};
var Gn$1 = new RegExp("(?<=[\\p{L}\\p{N}_])~(?!~)(?=[\\p{L}\\p{N}_])", "gu"), tn$1 = (n) => !n || typeof n != "string" || !n.includes("~") ? n : n.replace(Gn$1, (r, e) => c(n, e) ? r : "\\~");
var an$1 = (n) => {
	var e, i;
	let r = n.match(K);
	if (r) {
		let s$1 = r[2];
		if (!s$1 || d.test(s$1)) return n;
		let o = n.lastIndexOf(r[1]);
		if (c(n, o) || f(n, o)) return n;
		if (((e = n.match(T)) == null ? void 0 : e.length) % 2 === 1) return `${n}~~`;
	} else {
		let s$1 = n.match(F);
		if (s$1) {
			let o = n.lastIndexOf(s$1[0].slice(0, 2));
			if (c(n, o) || f(n, o)) return n;
			if (((i = n.match(T)) == null ? void 0 : i.length) % 2 === 1) return `${n}~`;
		}
	}
	return n;
};
var S = (n) => n !== false, Fn$1 = (n) => n === true, u = {
	SINGLE_TILDE: 0,
	COMPARISON_OPERATORS: 5,
	HTML_TAGS: 10,
	SETEXT_HEADINGS: 15,
	LINKS: 20,
	BOLD_ITALIC: 30,
	BOLD: 35,
	ITALIC_DOUBLE_UNDERSCORE: 40,
	ITALIC_SINGLE_ASTERISK: 41,
	ITALIC_SINGLE_UNDERSCORE: 42,
	INLINE_CODE: 50,
	STRIKETHROUGH: 60,
	KATEX: 70,
	INLINE_KATEX: 75,
	DEFAULT: 100
}, Xn$1 = [
	{
		handler: {
			name: "singleTilde",
			handle: tn$1,
			priority: u.SINGLE_TILDE
		},
		optionKey: "singleTilde"
	},
	{
		handler: {
			name: "comparisonOperators",
			handle: E$1,
			priority: u.COMPARISON_OPERATORS
		},
		optionKey: "comparisonOperators"
	},
	{
		handler: {
			name: "htmlTags",
			handle: x$1,
			priority: u.HTML_TAGS
		},
		optionKey: "htmlTags"
	},
	{
		handler: {
			name: "setextHeadings",
			handle: ln$1,
			priority: u.SETEXT_HEADINGS
		},
		optionKey: "setextHeadings"
	},
	{
		handler: {
			name: "links",
			handle: B,
			priority: u.LINKS
		},
		optionKey: "links",
		earlyReturn: (n) => n.endsWith("](streamdown:incomplete-link)")
	},
	{
		handler: {
			name: "boldItalic",
			handle: V,
			priority: u.BOLD_ITALIC
		},
		optionKey: "boldItalic"
	},
	{
		handler: {
			name: "bold",
			handle: j,
			priority: u.BOLD
		},
		optionKey: "bold"
	},
	{
		handler: {
			name: "italicDoubleUnderscore",
			handle: Q,
			priority: u.ITALIC_DOUBLE_UNDERSCORE
		},
		optionKey: "italic"
	},
	{
		handler: {
			name: "italicSingleAsterisk",
			handle: Z,
			priority: u.ITALIC_SINGLE_ASTERISK
		},
		optionKey: "italic"
	},
	{
		handler: {
			name: "italicSingleUnderscore",
			handle: J,
			priority: u.ITALIC_SINGLE_UNDERSCORE
		},
		optionKey: "italic"
	},
	{
		handler: {
			name: "inlineCode",
			handle: nn$1,
			priority: u.INLINE_CODE
		},
		optionKey: "inlineCode"
	},
	{
		handler: {
			name: "strikethrough",
			handle: an$1,
			priority: u.STRIKETHROUGH
		},
		optionKey: "strikethrough"
	},
	{
		handler: {
			name: "katex",
			handle: rn$1,
			priority: u.KATEX
		},
		optionKey: "katex"
	},
	{
		handler: {
			name: "inlineKatex",
			handle: sn$1,
			priority: u.INLINE_KATEX
		},
		optionKey: "inlineKatex"
	}
], zn$1 = (n) => {
	var e;
	let r = (e = n == null ? void 0 : n.linkMode) != null ? e : "protocol";
	return Xn$1.filter(({ handler: i, optionKey: s$1 }) => i.name === "links" ? S(n == null ? void 0 : n.links) || S(n == null ? void 0 : n.images) : i.name === "inlineKatex" ? Fn$1(n == null ? void 0 : n.inlineKatex) : S(n == null ? void 0 : n[s$1])).map(({ handler: i, earlyReturn: s$1 }) => i.name === "links" ? {
		handler: k(I({}, i), { handle: (o) => B(o, r) }),
		earlyReturn: r === "protocol" ? s$1 : void 0
	} : {
		handler: i,
		earlyReturn: s$1
	});
}, vn$1 = (n, r) => {
	var t;
	if (!n || typeof n != "string") return n;
	let e = n.endsWith(" ") && !n.endsWith("  ") ? n.slice(0, -1) : n, i = zn$1(r), s$1 = ((t = r == null ? void 0 : r.handlers) != null ? t : []).map((a) => {
		var l;
		return {
			handler: k(I({}, a), { priority: (l = a.priority) != null ? l : u.DEFAULT }),
			earlyReturn: void 0
		};
	}), o = [...i, ...s$1].sort((a, l) => {
		var _, P;
		return ((_ = a.handler.priority) != null ? _ : 0) - ((P = l.handler.priority) != null ? P : 0);
	});
	for (let { handler: a, earlyReturn: l } of o) if (e = a.handle(e), l != null && l(e)) return e;
	return e;
}, $e = vn$1;
var nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var emptyOptions$1 = {};
function name(name$1, options) {
	return ((options || emptyOptions$1).jsx ? nameReJsx : nameRe).test(name$1);
}
var require_cjs$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;
	var TRIM_REGEX = /^\s+|\s+$/g;
	var NEWLINE = "\n";
	var FORWARD_SLASH = "/";
	var ASTERISK = "*";
	var EMPTY_STRING = "";
	var TYPE_COMMENT = "comment";
	var TYPE_DECLARATION = "declaration";
	function index(style$1, options) {
		if (typeof style$1 !== "string") throw new TypeError("First argument must be a string");
		if (!style$1) return [];
		options = options || {};
		var lineno = 1;
		var column = 1;
		function updatePosition(str) {
			var lines = str.match(NEWLINE_REGEX);
			if (lines) lineno += lines.length;
			var i = str.lastIndexOf(NEWLINE);
			column = ~i ? str.length - i : column + str.length;
		}
		function position$2() {
			var start = {
				line: lineno,
				column
			};
			return function(node) {
				node.position = new Position(start);
				whitespace$1();
				return node;
			};
		}
		function Position(start) {
			this.start = start;
			this.end = {
				line: lineno,
				column
			};
			this.source = options.source;
		}
		Position.prototype.content = style$1;
		function error(msg) {
			var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
			err.reason = msg;
			err.filename = options.source;
			err.line = lineno;
			err.column = column;
			err.source = style$1;
			if (options.silent);
			else throw err;
		}
		function match(re$1) {
			var m$1 = re$1.exec(style$1);
			if (!m$1) return;
			var str = m$1[0];
			updatePosition(str);
			style$1 = style$1.slice(str.length);
			return m$1;
		}
		function whitespace$1() {
			match(WHITESPACE_REGEX);
		}
		function comments(rules) {
			var c$1;
			rules = rules || [];
			while (c$1 = comment$3()) if (c$1 !== false) rules.push(c$1);
			return rules;
		}
		function comment$3() {
			var pos = position$2();
			if (FORWARD_SLASH != style$1.charAt(0) || ASTERISK != style$1.charAt(1)) return;
			var i = 2;
			while (EMPTY_STRING != style$1.charAt(i) && (ASTERISK != style$1.charAt(i) || FORWARD_SLASH != style$1.charAt(i + 1))) ++i;
			i += 2;
			if (EMPTY_STRING === style$1.charAt(i - 1)) return error("End of comment missing");
			var str = style$1.slice(2, i - 2);
			column += 2;
			updatePosition(str);
			style$1 = style$1.slice(i);
			column += 2;
			return pos({
				type: TYPE_COMMENT,
				comment: str
			});
		}
		function declaration() {
			var pos = position$2();
			var prop = match(PROPERTY_REGEX);
			if (!prop) return;
			comment$3();
			if (!match(COLON_REGEX)) return error("property missing ':'");
			var val = match(VALUE_REGEX);
			var ret = pos({
				type: TYPE_DECLARATION,
				property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			match(SEMICOLON_REGEX);
			return ret;
		}
		function declarations() {
			var decls = [];
			comments(decls);
			var decl;
			while (decl = declaration()) if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
			return decls;
		}
		whitespace$1();
		return declarations();
	}
	function trim(str) {
		return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}
	module.exports = index;
}));
var require_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StyleToObject;
	var inline_style_parser_1 = __importDefault(require_cjs$2());
	function StyleToObject(style$1, iterator) {
		let styleObject = null;
		if (!style$1 || typeof style$1 !== "string") return styleObject;
		const declarations = (0, inline_style_parser_1.default)(style$1);
		const hasIterator = typeof iterator === "function";
		declarations.forEach((declaration) => {
			if (declaration.type !== "declaration") return;
			const { property, value } = declaration;
			if (hasIterator) iterator(property, value, declaration);
			else if (value) {
				styleObject = styleObject || {};
				styleObject[property] = value;
			}
		});
		return styleObject;
	}
}));
var require_utilities = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.camelCase = void 0;
	var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9_-]+$/;
	var HYPHEN_REGEX = /-([a-z])/g;
	var NO_HYPHEN_REGEX = /^[^-]+$/;
	var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
	var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;
	var skipCamelCase = function(property) {
		return !property || NO_HYPHEN_REGEX.test(property) || CUSTOM_PROPERTY_REGEX.test(property);
	};
	var capitalize = function(match, character) {
		return character.toUpperCase();
	};
	var trimHyphen = function(match, prefix) {
		return "".concat(prefix, "-");
	};
	var camelCase = function(property, options) {
		if (options === void 0) options = {};
		if (skipCamelCase(property)) return property;
		property = property.toLowerCase();
		if (options.reactCompat) property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
		else property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
		return property.replace(HYPHEN_REGEX, capitalize);
	};
	exports.camelCase = camelCase;
}));
var import_cjs = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var style_to_object_1 = (exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_cjs$1());
	var utilities_1 = require_utilities();
	function StyleToJS(style$1, options) {
		var output = {};
		if (!style$1 || typeof style$1 !== "string") return output;
		(0, style_to_object_1.default)(style$1, function(property, value) {
			if (property && value) output[(0, utilities_1.camelCase)(property, options)] = value;
		});
		return output;
	}
	StyleToJS.default = StyleToJS;
	module.exports = StyleToJS;
})))(), 1);
var own$1 = {}.hasOwnProperty;
var emptyMap = /* @__PURE__ */ new Map();
var cap = /[A-Z]/g;
var tableElements = new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]);
var tableCellElement = new Set(["td", "th"]);
var docs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function toJsxRuntime(tree, options) {
	if (!options || options.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
	const filePath = options.filePath || void 0;
	let create;
	if (options.development) {
		if (typeof options.jsxDEV !== "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
		create = developmentCreate(filePath, options.jsxDEV);
	} else {
		if (typeof options.jsx !== "function") throw new TypeError("Expected `jsx` in production options");
		if (typeof options.jsxs !== "function") throw new TypeError("Expected `jsxs` in production options");
		create = productionCreate(filePath, options.jsx, options.jsxs);
	}
	const state = {
		Fragment: options.Fragment,
		ancestors: [],
		components: options.components || {},
		create,
		elementAttributeNameCase: options.elementAttributeNameCase || "react",
		evaluater: options.createEvaluater ? options.createEvaluater() : void 0,
		filePath,
		ignoreInvalidStyle: options.ignoreInvalidStyle || false,
		passKeys: options.passKeys !== false,
		passNode: options.passNode || false,
		schema: options.space === "svg" ? svg : html$1,
		stylePropertyNameCase: options.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: options.tableCellAlignToStyle !== false
	};
	const result = one(state, tree, void 0);
	if (result && typeof result !== "string") return result;
	return state.create(tree, state.Fragment, { children: result || void 0 }, void 0);
}
function one(state, node, key) {
	if (node.type === "element") return element(state, node, key);
	if (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") return mdxExpression(state, node);
	if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") return mdxJsxElement(state, node, key);
	if (node.type === "mdxjsEsm") return mdxEsm(state, node);
	if (node.type === "root") return root$1(state, node, key);
	if (node.type === "text") return text$1(state, node);
}
function element(state, node, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node.tagName.toLowerCase() === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node);
	const type = findComponentFromName(state, node.tagName, false);
	const props = createElementProps(state, node);
	let children$1 = createChildren(state, node);
	if (tableElements.has(node.tagName)) children$1 = children$1.filter(function(child) {
		return typeof child === "string" ? !whitespace(child) : true;
	});
	addNode(state, props, type, node);
	addChildren(props, children$1);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node, type, props, key);
}
function mdxExpression(state, node) {
	if (node.data && node.data.estree && state.evaluater) {
		const expression = node.data.estree.body[0];
		expression.type;
		return state.evaluater.evaluateExpression(expression.expression);
	}
	crashEstree(state, node.position);
}
function mdxEsm(state, node) {
	if (node.data && node.data.estree && state.evaluater) return state.evaluater.evaluateProgram(node.data.estree);
	crashEstree(state, node.position);
}
function mdxJsxElement(state, node, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node.name === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node);
	const type = node.name === null ? state.Fragment : findComponentFromName(state, node.name, true);
	const props = createJsxElementProps(state, node);
	const children$1 = createChildren(state, node);
	addNode(state, props, type, node);
	addChildren(props, children$1);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node, type, props, key);
}
function root$1(state, node, key) {
	const props = {};
	addChildren(props, createChildren(state, node));
	return state.create(node, state.Fragment, props, key);
}
function text$1(_, node) {
	return node.value;
}
function addNode(state, props, type, node) {
	if (typeof type !== "string" && type !== state.Fragment && state.passNode) props.node = node;
}
function addChildren(props, children$1) {
	if (children$1.length > 0) {
		const value = children$1.length > 1 ? children$1 : children$1[0];
		if (value) props.children = value;
	}
}
function productionCreate(_, jsx$1, jsxs$1) {
	return create;
	function create(_$1, type, props, key) {
		const fn$1 = Array.isArray(props.children) ? jsxs$1 : jsx$1;
		return key ? fn$1(type, props, key) : fn$1(type, props);
	}
}
function developmentCreate(filePath, jsxDEV) {
	return create;
	function create(node, type, props, key) {
		const isStaticChildren = Array.isArray(props.children);
		const point$2 = pointStart(node);
		return jsxDEV(type, props, key, isStaticChildren, {
			columnNumber: point$2 ? point$2.column - 1 : void 0,
			fileName: filePath,
			lineNumber: point$2 ? point$2.line : void 0
		}, void 0);
	}
}
function createElementProps(state, node) {
	const props = {};
	let alignValue;
	let prop;
	for (prop in node.properties) if (prop !== "children" && own$1.call(node.properties, prop)) {
		const result = createProperty(state, prop, node.properties[prop]);
		if (result) {
			const [key, value] = result;
			if (state.tableCellAlignToStyle && key === "align" && typeof value === "string" && tableCellElement.has(node.tagName)) alignValue = value;
			else props[key] = value;
		}
	}
	if (alignValue) {
		const style$1 = props.style || (props.style = {});
		style$1[state.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = alignValue;
	}
	return props;
}
function createJsxElementProps(state, node) {
	const props = {};
	for (const attribute of node.attributes) if (attribute.type === "mdxJsxExpressionAttribute") if (attribute.data && attribute.data.estree && state.evaluater) {
		const expression = attribute.data.estree.body[0];
		expression.type;
		const objectExpression = expression.expression;
		objectExpression.type;
		const property = objectExpression.properties[0];
		property.type;
		Object.assign(props, state.evaluater.evaluateExpression(property.argument));
	} else crashEstree(state, node.position);
	else {
		const name$1 = attribute.name;
		let value;
		if (attribute.value && typeof attribute.value === "object") if (attribute.value.data && attribute.value.data.estree && state.evaluater) {
			const expression = attribute.value.data.estree.body[0];
			expression.type;
			value = state.evaluater.evaluateExpression(expression.expression);
		} else crashEstree(state, node.position);
		else value = attribute.value === null ? true : attribute.value;
		props[name$1] = value;
	}
	return props;
}
function createChildren(state, node) {
	const children$1 = [];
	let index$1 = -1;
	/* c8 ignore next */
	const countsByName = state.passKeys ? /* @__PURE__ */ new Map() : emptyMap;
	while (++index$1 < node.children.length) {
		const child = node.children[index$1];
		let key;
		if (state.passKeys) {
			const name$1 = child.type === "element" ? child.tagName : child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child.name : void 0;
			if (name$1) {
				const count = countsByName.get(name$1) || 0;
				key = name$1 + "-" + count;
				countsByName.set(name$1, count + 1);
			}
		}
		const result = one(state, child, key);
		if (result !== void 0) children$1.push(result);
	}
	return children$1;
}
function createProperty(state, prop, value) {
	const info = find(state.schema, prop);
	if (value === null || value === void 0 || typeof value === "number" && Number.isNaN(value)) return;
	if (Array.isArray(value)) value = info.commaSeparated ? stringify(value) : stringify$1(value);
	if (info.property === "style") {
		let styleObject = typeof value === "object" ? value : parseStyle(state, String(value));
		if (state.stylePropertyNameCase === "css") styleObject = transformStylesToCssCasing(styleObject);
		return ["style", styleObject];
	}
	return [state.elementAttributeNameCase === "react" && info.space ? hastToReact[info.property] || info.property : info.attribute, value];
}
function parseStyle(state, value) {
	try {
		return (0, import_cjs.default)(value, { reactCompat: true });
	} catch (error) {
		if (state.ignoreInvalidStyle) return {};
		const cause = error;
		const message = new VFileMessage("Cannot parse `style` attribute", {
			ancestors: state.ancestors,
			cause,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		message.file = state.filePath || void 0;
		message.url = docs + "#cannot-parse-style-attribute";
		throw message;
	}
}
function findComponentFromName(state, name$1, allowExpression) {
	let result;
	if (!allowExpression) result = {
		type: "Literal",
		value: name$1
	};
	else if (name$1.includes(".")) {
		const identifiers = name$1.split(".");
		let index$1 = -1;
		let node;
		while (++index$1 < identifiers.length) {
			const prop = name(identifiers[index$1]) ? {
				type: "Identifier",
				name: identifiers[index$1]
			} : {
				type: "Literal",
				value: identifiers[index$1]
			};
			node = node ? {
				type: "MemberExpression",
				object: node,
				property: prop,
				computed: Boolean(index$1 && prop.type === "Literal"),
				optional: false
			} : prop;
		}
		result = node;
	} else result = name(name$1) && !/^[a-z]/.test(name$1) ? {
		type: "Identifier",
		name: name$1
	} : {
		type: "Literal",
		value: name$1
	};
	if (result.type === "Literal") {
		const name$2 = result.value;
		return own$1.call(state.components, name$2) ? state.components[name$2] : name$2;
	}
	if (state.evaluater) return state.evaluater.evaluateExpression(result);
	crashEstree(state);
}
function crashEstree(state, place) {
	const message = new VFileMessage("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: state.ancestors,
		place,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	message.file = state.filePath || void 0;
	message.url = docs + "#cannot-handle-mdx-estrees-without-createevaluater";
	throw message;
}
function transformStylesToCssCasing(domCasing) {
	const cssCasing = {};
	let from;
	for (from in domCasing) if (own$1.call(domCasing, from)) cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
	return cssCasing;
}
function transformStyleToCssCasing(from) {
	let to = from.replace(cap, toDash);
	if (to.slice(0, 3) === "ms-") to = "-" + to;
	return to;
}
function toDash($0) {
	return "-" + $0.toLowerCase();
}
const urlAttributes = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
};
function blockquote(state, node) {
	const result = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: state.wrap(state.all(node), true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function hardBreak(state, node) {
	const result = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return [state.applyData(node, result), {
		type: "text",
		value: "\n"
	}];
}
function code(state, node) {
	const value = node.value ? node.value + "\n" : "";
	const properties$1 = {};
	const language = node.lang ? node.lang.split(/\s+/) : [];
	if (language.length > 0) properties$1.className = ["language-" + language[0]];
	let result = {
		type: "element",
		tagName: "code",
		properties: properties$1,
		children: [{
			type: "text",
			value
		}]
	};
	if (node.meta) result.data = { meta: node.meta };
	state.patch(node, result);
	result = state.applyData(node, result);
	result = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [result]
	};
	state.patch(node, result);
	return result;
}
function strikethrough(state, node) {
	const result = {
		type: "element",
		tagName: "del",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function emphasis(state, node) {
	const result = {
		type: "element",
		tagName: "em",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function footnoteReference(state, node) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const id = String(node.identifier).toUpperCase();
	const safeId = normalizeUri(id.toLowerCase());
	const index$1 = state.footnoteOrder.indexOf(id);
	let counter;
	let reuseCounter = state.footnoteCounts.get(id);
	if (reuseCounter === void 0) {
		reuseCounter = 0;
		state.footnoteOrder.push(id);
		counter = state.footnoteOrder.length;
	} else counter = index$1 + 1;
	reuseCounter += 1;
	state.footnoteCounts.set(id, reuseCounter);
	const link$1 = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + clobberPrefix + "fn-" + safeId,
			id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
			dataFootnoteRef: true,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(counter)
		}]
	};
	state.patch(node, link$1);
	const sup = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [link$1]
	};
	state.patch(node, sup);
	return state.applyData(node, sup);
}
function heading(state, node) {
	const result = {
		type: "element",
		tagName: "h" + node.depth,
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function html(state, node) {
	if (state.options.allowDangerousHtml) {
		const result = {
			type: "raw",
			value: node.value
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
}
function revert(state, node) {
	const subtype = node.referenceType;
	let suffix = "]";
	if (subtype === "collapsed") suffix += "[]";
	else if (subtype === "full") suffix += "[" + (node.label || node.identifier) + "]";
	if (node.type === "imageReference") return [{
		type: "text",
		value: "![" + node.alt + suffix
	}];
	const contents = state.all(node);
	const head = contents[0];
	if (head && head.type === "text") head.value = "[" + head.value;
	else contents.unshift({
		type: "text",
		value: "["
	});
	const tail = contents[contents.length - 1];
	if (tail && tail.type === "text") tail.value += suffix;
	else contents.push({
		type: "text",
		value: suffix
	});
	return contents;
}
function imageReference(state, node) {
	const id = String(node.identifier).toUpperCase();
	const definition = state.definitionById.get(id);
	if (!definition) return revert(state, node);
	const properties$1 = {
		src: normalizeUri(definition.url || ""),
		alt: node.alt
	};
	if (definition.title !== null && definition.title !== void 0) properties$1.title = definition.title;
	const result = {
		type: "element",
		tagName: "img",
		properties: properties$1,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function image(state, node) {
	const properties$1 = { src: normalizeUri(node.url) };
	if (node.alt !== null && node.alt !== void 0) properties$1.alt = node.alt;
	if (node.title !== null && node.title !== void 0) properties$1.title = node.title;
	const result = {
		type: "element",
		tagName: "img",
		properties: properties$1,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function inlineCode(state, node) {
	const text$6 = {
		type: "text",
		value: node.value.replace(/\r?\n|\r/g, " ")
	};
	state.patch(node, text$6);
	const result = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [text$6]
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function linkReference(state, node) {
	const id = String(node.identifier).toUpperCase();
	const definition = state.definitionById.get(id);
	if (!definition) return revert(state, node);
	const properties$1 = { href: normalizeUri(definition.url || "") };
	if (definition.title !== null && definition.title !== void 0) properties$1.title = definition.title;
	const result = {
		type: "element",
		tagName: "a",
		properties: properties$1,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function link(state, node) {
	const properties$1 = { href: normalizeUri(node.url) };
	if (node.title !== null && node.title !== void 0) properties$1.title = node.title;
	const result = {
		type: "element",
		tagName: "a",
		properties: properties$1,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function listItem(state, node, parent) {
	const results = state.all(node);
	const loose = parent ? listLoose(parent) : listItemLoose(node);
	const properties$1 = {};
	const children$1 = [];
	if (typeof node.checked === "boolean") {
		const head = results[0];
		let paragraph$1;
		if (head && head.type === "element" && head.tagName === "p") paragraph$1 = head;
		else {
			paragraph$1 = {
				type: "element",
				tagName: "p",
				properties: {},
				children: []
			};
			results.unshift(paragraph$1);
		}
		if (paragraph$1.children.length > 0) paragraph$1.children.unshift({
			type: "text",
			value: " "
		});
		paragraph$1.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: node.checked,
				disabled: true
			},
			children: []
		});
		properties$1.className = ["task-list-item"];
	}
	let index$1 = -1;
	while (++index$1 < results.length) {
		const child = results[index$1];
		if (loose || index$1 !== 0 || child.type !== "element" || child.tagName !== "p") children$1.push({
			type: "text",
			value: "\n"
		});
		if (child.type === "element" && child.tagName === "p" && !loose) children$1.push(...child.children);
		else children$1.push(child);
	}
	const tail = results[results.length - 1];
	if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children$1.push({
		type: "text",
		value: "\n"
	});
	const result = {
		type: "element",
		tagName: "li",
		properties: properties$1,
		children: children$1
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function listLoose(node) {
	let loose = false;
	if (node.type === "list") {
		loose = node.spread || false;
		const children$1 = node.children;
		let index$1 = -1;
		while (!loose && ++index$1 < children$1.length) loose = listItemLoose(children$1[index$1]);
	}
	return loose;
}
function listItemLoose(node) {
	const spread = node.spread;
	return spread === null || spread === void 0 ? node.children.length > 1 : spread;
}
function list(state, node) {
	const properties$1 = {};
	const results = state.all(node);
	let index$1 = -1;
	if (typeof node.start === "number" && node.start !== 1) properties$1.start = node.start;
	while (++index$1 < results.length) {
		const child = results[index$1];
		if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
			properties$1.className = ["contains-task-list"];
			break;
		}
	}
	const result = {
		type: "element",
		tagName: node.ordered ? "ol" : "ul",
		properties: properties$1,
		children: state.wrap(results, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function paragraph(state, node) {
	const result = {
		type: "element",
		tagName: "p",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function root(state, node) {
	const result = {
		type: "root",
		children: state.wrap(state.all(node))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function strong(state, node) {
	const result = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function table(state, node) {
	const rows = state.all(node);
	const firstRow = rows.shift();
	const tableContent = [];
	if (firstRow) {
		const head = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: state.wrap([firstRow], true)
		};
		state.patch(node.children[0], head);
		tableContent.push(head);
	}
	if (rows.length > 0) {
		const body = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: state.wrap(rows, true)
		};
		const start = pointStart(node.children[1]);
		const end = pointEnd(node.children[node.children.length - 1]);
		if (start && end) body.position = {
			start,
			end
		};
		tableContent.push(body);
	}
	const result = {
		type: "element",
		tagName: "table",
		properties: {},
		children: state.wrap(tableContent, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function tableRow(state, node, parent) {
	const siblings = parent ? parent.children : void 0;
	const tagName = (siblings ? siblings.indexOf(node) : 1) === 0 ? "th" : "td";
	const align = parent && parent.type === "table" ? parent.align : void 0;
	const length = align ? align.length : node.children.length;
	let cellIndex = -1;
	const cells = [];
	while (++cellIndex < length) {
		const cell = node.children[cellIndex];
		const properties$1 = {};
		const alignValue = align ? align[cellIndex] : void 0;
		if (alignValue) properties$1.align = alignValue;
		let result$1 = {
			type: "element",
			tagName,
			properties: properties$1,
			children: []
		};
		if (cell) {
			result$1.children = state.all(cell);
			state.patch(cell, result$1);
			result$1 = state.applyData(cell, result$1);
		}
		cells.push(result$1);
	}
	const result = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: state.wrap(cells, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function tableCell(state, node) {
	const result = {
		type: "element",
		tagName: "td",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var tab = 9;
var space = 32;
function trimLines(value) {
	const source = String(value);
	const search$1 = /\r?\n|\r/g;
	let match = search$1.exec(source);
	let last = 0;
	const lines = [];
	while (match) {
		lines.push(trimLine(source.slice(last, match.index), last > 0, true), match[0]);
		last = match.index + match[0].length;
		match = search$1.exec(source);
	}
	lines.push(trimLine(source.slice(last), last > 0, false));
	return lines.join("");
}
function trimLine(value, start, end) {
	let startIndex = 0;
	let endIndex = value.length;
	if (start) {
		let code$2 = value.codePointAt(startIndex);
		while (code$2 === tab || code$2 === space) {
			startIndex++;
			code$2 = value.codePointAt(startIndex);
		}
	}
	if (end) {
		let code$2 = value.codePointAt(endIndex - 1);
		while (code$2 === tab || code$2 === space) {
			endIndex--;
			code$2 = value.codePointAt(endIndex - 1);
		}
	}
	return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
function text(state, node) {
	const result = {
		type: "text",
		value: trimLines(String(node.value))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function thematicBreak(state, node) {
	const result = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
const handlers = {
	blockquote,
	break: hardBreak,
	code,
	delete: strikethrough,
	emphasis,
	footnoteReference,
	heading,
	html,
	imageReference,
	image,
	inlineCode,
	linkReference,
	link,
	listItem,
	list,
	paragraph,
	root,
	strong,
	table,
	tableCell,
	tableRow,
	text,
	thematicBreak,
	toml: ignore,
	yaml: ignore,
	definition: ignore,
	footnoteDefinition: ignore
};
function ignore() {}
function defaultFootnoteBackContent(_, rereferenceIndex) {
	const result = [{
		type: "text",
		value: "↩"
	}];
	if (rereferenceIndex > 1) result.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(rereferenceIndex)
		}]
	});
	return result;
}
function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
	return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
}
function footer(state) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
	const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
	const footnoteLabel = state.options.footnoteLabel || "Footnotes";
	const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
	const footnoteLabelProperties = state.options.footnoteLabelProperties || { className: ["sr-only"] };
	const listItems = [];
	let referenceIndex = -1;
	while (++referenceIndex < state.footnoteOrder.length) {
		const definition = state.footnoteById.get(state.footnoteOrder[referenceIndex]);
		if (!definition) continue;
		const content = state.all(definition);
		const id = String(definition.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		let rereferenceIndex = 0;
		const backReferences = [];
		const counts = state.footnoteCounts.get(id);
		while (counts !== void 0 && ++rereferenceIndex <= counts) {
			if (backReferences.length > 0) backReferences.push({
				type: "text",
				value: " "
			});
			let children$1 = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
			if (typeof children$1 === "string") children$1 = {
				type: "text",
				value: children$1
			};
			backReferences.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(children$1) ? children$1 : [children$1]
			});
		}
		const tail = content[content.length - 1];
		if (tail && tail.type === "element" && tail.tagName === "p") {
			const tailTail = tail.children[tail.children.length - 1];
			if (tailTail && tailTail.type === "text") tailTail.value += " ";
			else tail.children.push({
				type: "text",
				value: " "
			});
			tail.children.push(...backReferences);
		} else content.push(...backReferences);
		const listItem$1 = {
			type: "element",
			tagName: "li",
			properties: { id: clobberPrefix + "fn-" + safeId },
			children: state.wrap(content, true)
		};
		state.patch(definition, listItem$1);
		listItems.push(listItem$1);
	}
	if (listItems.length === 0) return;
	return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: true,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: footnoteLabelTagName,
				properties: {
					...esm_default(footnoteLabelProperties),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: footnoteLabel
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: state.wrap(listItems, true)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
var own = {}.hasOwnProperty;
var emptyOptions = {};
function createState(tree, options) {
	const settings = options || emptyOptions;
	const definitionById = /* @__PURE__ */ new Map();
	const footnoteById = /* @__PURE__ */ new Map();
	const state = {
		all: all$3,
		applyData,
		definitionById,
		footnoteById,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...handlers,
			...settings.handlers
		},
		one: one$3,
		options: settings,
		patch,
		wrap
	};
	visit(tree, function(node) {
		if (node.type === "definition" || node.type === "footnoteDefinition") {
			const map = node.type === "definition" ? definitionById : footnoteById;
			const id = String(node.identifier).toUpperCase();
			if (!map.has(id)) map.set(id, node);
		}
	});
	return state;
	function one$3(node, parent) {
		const type = node.type;
		const handle$1 = state.handlers[type];
		if (own.call(state.handlers, type) && handle$1) return handle$1(state, node, parent);
		if (state.options.passThrough && state.options.passThrough.includes(type)) {
			if ("children" in node) {
				const { children: children$1, ...shallow } = node;
				const result = esm_default(shallow);
				result.children = state.all(node);
				return result;
			}
			return esm_default(node);
		}
		return (state.options.unknownHandler || defaultUnknownHandler)(state, node, parent);
	}
	function all$3(parent) {
		const values = [];
		if ("children" in parent) {
			const nodes = parent.children;
			let index$1 = -1;
			while (++index$1 < nodes.length) {
				const result = state.one(nodes[index$1], parent);
				if (result) {
					if (index$1 && nodes[index$1 - 1].type === "break") {
						if (!Array.isArray(result) && result.type === "text") result.value = trimMarkdownSpaceStart(result.value);
						if (!Array.isArray(result) && result.type === "element") {
							const head = result.children[0];
							if (head && head.type === "text") head.value = trimMarkdownSpaceStart(head.value);
						}
					}
					if (Array.isArray(result)) values.push(...result);
					else values.push(result);
				}
			}
		}
		return values;
	}
}
function patch(from, to) {
	if (from.position) to.position = position(from);
}
function applyData(from, to) {
	let result = to;
	if (from && from.data) {
		const hName = from.data.hName;
		const hChildren = from.data.hChildren;
		const hProperties = from.data.hProperties;
		if (typeof hName === "string") if (result.type === "element") result.tagName = hName;
		else result = {
			type: "element",
			tagName: hName,
			properties: {},
			children: "children" in result ? result.children : [result]
		};
		if (result.type === "element" && hProperties) Object.assign(result.properties, esm_default(hProperties));
		if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
	}
	return result;
}
function defaultUnknownHandler(state, node) {
	const data = node.data || {};
	const result = "value" in node && !(own.call(data, "hProperties") || own.call(data, "hChildren")) ? {
		type: "text",
		value: node.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
function wrap(nodes, loose) {
	const result = [];
	let index$1 = -1;
	if (loose) result.push({
		type: "text",
		value: "\n"
	});
	while (++index$1 < nodes.length) {
		if (index$1) result.push({
			type: "text",
			value: "\n"
		});
		result.push(nodes[index$1]);
	}
	if (loose && nodes.length > 0) result.push({
		type: "text",
		value: "\n"
	});
	return result;
}
function trimMarkdownSpaceStart(value) {
	let index$1 = 0;
	let code$2 = value.charCodeAt(index$1);
	while (code$2 === 9 || code$2 === 32) {
		index$1++;
		code$2 = value.charCodeAt(index$1);
	}
	return value.slice(index$1);
}
function toHast(tree, options) {
	const state = createState(tree, options);
	const node = state.one(tree, void 0);
	const foot = footer(state);
	const result = Array.isArray(node) ? {
		type: "root",
		children: node
	} : node || {
		type: "root",
		children: []
	};
	if (foot) {
		"children" in result;
		result.children.push({
			type: "text",
			value: "\n"
		}, foot);
	}
	return result;
}
function remarkRehype(destination, options) {
	if (destination && "run" in destination) return async function(tree, file) {
		const hastTree = toHast(tree, {
			file,
			...options
		});
		await destination.run(hastTree, file);
	};
	return function(tree, file) {
		return toHast(tree, {
			file,
			...destination || options
		});
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var import_react_dom = require_react_dom();
var Bn = 300, An = "300px", On = 500;
function Rt(e = {}) {
	let { immediate: t = false, debounceDelay: o = Bn, rootMargin: n = An, idleTimeout: r = On } = e, [s$1, a] = (0, import_react.useState)(false), l = (0, import_react.useRef)(null), i = (0, import_react.useRef)(null), d$1 = (0, import_react.useRef)(null), c$1 = (0, import_react.useMemo)(() => (u$1) => {
		let f$1 = Date.now();
		return window.setTimeout(() => {
			u$1({
				didTimeout: false,
				timeRemaining: () => Math.max(0, 50 - (Date.now() - f$1))
			});
		}, 1);
	}, []), p$1 = (0, import_react.useMemo)(() => typeof window != "undefined" && window.requestIdleCallback ? (u$1, f$1) => window.requestIdleCallback(u$1, f$1) : c$1, [c$1]), m$1 = (0, import_react.useMemo)(() => typeof window != "undefined" && window.cancelIdleCallback ? (u$1) => window.cancelIdleCallback(u$1) : (u$1) => {
		clearTimeout(u$1);
	}, []);
	return (0, import_react.useEffect)(() => {
		if (t) {
			a(true);
			return;
		}
		let u$1 = l.current;
		if (!u$1) return;
		i.current && (clearTimeout(i.current), i.current = null), d$1.current && (m$1(d$1.current), d$1.current = null);
		let f$1 = () => {
			i.current && (clearTimeout(i.current), i.current = null), d$1.current && (m$1(d$1.current), d$1.current = null);
		}, h$2 = (v$1) => {
			d$1.current = p$1((w$1) => {
				w$1.timeRemaining() > 0 || w$1.didTimeout ? (a(true), v$1.disconnect()) : d$1.current = p$1(() => {
					a(true), v$1.disconnect();
				}, { timeout: r / 2 });
			}, { timeout: r });
		}, b$1 = (v$1) => {
			f$1(), i.current = window.setTimeout(() => {
				var M$1, H$1;
				let w$1 = v$1.takeRecords();
				(w$1.length === 0 || (H$1 = (M$1 = w$1.at(-1)) == null ? void 0 : M$1.isIntersecting) != null && H$1) && h$2(v$1);
			}, o);
		}, g$1 = (v$1, w$1) => {
			v$1.isIntersecting ? b$1(w$1) : f$1();
		}, T$1 = new IntersectionObserver((v$1) => {
			for (let w$1 of v$1) g$1(w$1, T$1);
		}, {
			rootMargin: n,
			threshold: 0
		});
		return T$1.observe(u$1), () => {
			i.current && clearTimeout(i.current), d$1.current && m$1(d$1.current), T$1.disconnect();
		};
	}, [
		t,
		o,
		n,
		r,
		m$1,
		p$1
	]), {
		shouldRender: s$1,
		containerRef: l
	};
}
var St = /\s/, Fn = /^\s+$/, zn = new Set([
	"code",
	"pre",
	"svg",
	"math",
	"annotation"
]), _n = (e) => typeof e == "object" && e !== null && "type" in e && e.type === "element", qn = (e) => e.some((t) => _n(t) && zn.has(t.tagName)), $n = (e) => {
	let t = [], o = "", n = false;
	for (let r of e) {
		let s$1 = St.test(r);
		s$1 !== n && o && (t.push(o), o = ""), o += r, n = s$1;
	}
	return o && t.push(o), t;
}, Wn = (e) => {
	let t = [], o = "";
	for (let n of e) St.test(n) ? o += n : (o && (t.push(o), o = ""), t.push(n));
	return o && t.push(o), t;
}, Zn = (e, t, o, n, r, s$1) => {
	let a = `--sd-animation:sd-${t};--sd-duration:${r ? 0 : o}ms;--sd-easing:${n}`;
	return s$1 && (a += `;--sd-delay:${s$1}ms`), {
		type: "element",
		tagName: "span",
		properties: {
			"data-sd-animate": true,
			style: a
		},
		children: [{
			type: "text",
			value: e
		}]
	};
}, Xn = (e, t, o, n, r) => {
	let s$1 = t.at(-1);
	if (!(s$1 && "children" in s$1)) return;
	if (qn(t)) return SKIP;
	let a = s$1, l = a.children.indexOf(e);
	if (l === -1) return;
	let i = e.value;
	if (!i.trim()) {
		r.count += i.length;
		return;
	}
	let d$1 = o.sep === "char" ? Wn(i) : $n(i), c$1 = n.prevContentLength, p$1 = d$1.map((m$1) => {
		let u$1 = r.count;
		if (r.count += m$1.length, Fn.test(m$1)) return {
			type: "text",
			value: m$1
		};
		let f$1 = c$1 > 0 && u$1 < c$1, h$2 = f$1 ? 0 : r.newIndex++ * o.stagger;
		return Zn(m$1, o.animation, o.duration, o.easing, f$1, h$2);
	});
	return a.children.splice(l, 1, ...p$1), l + p$1.length;
}, Jn = 0;
function be(e) {
	var s$1, a, l, i, d$1;
	let t = {
		animation: (s$1 = e == null ? void 0 : e.animation) != null ? s$1 : "fadeIn",
		duration: (a = e == null ? void 0 : e.duration) != null ? a : 150,
		easing: (l = e == null ? void 0 : e.easing) != null ? l : "ease",
		sep: (i = e == null ? void 0 : e.sep) != null ? i : "word",
		stagger: (d$1 = e == null ? void 0 : e.stagger) != null ? d$1 : 40
	}, o = {
		prevContentLength: 0,
		lastRenderCharCount: 0
	}, n = Jn++, r = () => (c$1) => {
		let p$1 = {
			count: 0,
			newIndex: 0
		};
		visitParents(c$1, "text", (m$1, u$1) => Xn(m$1, u$1, t, o, p$1)), o.lastRenderCharCount = p$1.count, o.prevContentLength = 0;
	};
	return Object.defineProperty(r, "name", { value: `rehypeAnimate$${n}` }), {
		name: "animate",
		type: "animate",
		rehypePlugin: r,
		setPrevContentLength(c$1) {
			o.prevContentLength = c$1;
		},
		getLastRenderCharCount() {
			let c$1 = o.lastRenderCharCount;
			return o.lastRenderCharCount = 0, c$1;
		}
	};
}
be();
var et = (0, import_react.createContext)(false), tt = () => (0, import_react.useContext)(et);
var he = (...e) => twMerge(clsx(e)), Gn = (e, t) => {
	if (!e || !t) return t;
	let o = `${e}:`;
	return t.split(/\s+/).filter(Boolean).map((n) => n.startsWith(o) ? n : `${e}:${n}`).join(" ");
}, Dt = (e) => e ? (...t) => Gn(e, twMerge(clsx(t))) : he, W = (e, t, o) => {
	let n = typeof t == "string" && o.startsWith("text/csv") ? "﻿" : "", r = typeof t == "string" ? new Blob([n + t], { type: o }) : t, s$1 = URL.createObjectURL(r), a = document.createElement("a");
	a.href = s$1, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(s$1);
};
var Ee = (0, import_react.createContext)(he), y = () => (0, import_react.useContext)(Ee);
var tr = he("block", "before:content-[counter(line)]", "before:inline-block", "before:[counter-increment:line]", "before:w-6", "before:mr-4", "before:text-[13px]", "before:text-right", "before:text-muted-foreground/50", "before:font-mono", "before:select-none"), or = (e) => {
	let t = {};
	for (let o of e.split(";")) {
		let n = o.indexOf(":");
		if (n > 0) {
			let r = o.slice(0, n).trim(), s$1 = o.slice(n + 1).trim();
			r && s$1 && (t[r] = s$1);
		}
	}
	return t;
}, At = (0, import_react.memo)(({ children: e, result: t, language: o, className: n, startLine: r, lineNumbers: s$1 = true, ...a }) => {
	let l = y(), i = (0, import_react.useMemo)(() => l(tr), [l]), d$1 = (0, import_react.useMemo)(() => {
		let c$1 = {};
		return t.bg && (c$1["--sdm-bg"] = t.bg), t.fg && (c$1["--sdm-fg"] = t.fg), t.rootStyle && Object.assign(c$1, or(t.rootStyle)), c$1;
	}, [
		t.bg,
		t.fg,
		t.rootStyle
	]);
	return (0, import_jsx_runtime.jsx)("div", {
		className: l(n, "overflow-x-auto rounded-md border border-border bg-background p-4 text-sm"),
		"data-language": o,
		"data-streamdown": "code-block-body",
		...a,
		children: (0, import_jsx_runtime.jsx)("pre", {
			className: l(n, "bg-[var(--sdm-bg,inherit]", "dark:bg-[var(--shiki-dark-bg,var(--sdm-bg,inherit)]"),
			style: d$1,
			children: (0, import_jsx_runtime.jsx)("code", {
				className: s$1 ? l("[counter-increment:line_0] [counter-reset:line]") : void 0,
				style: s$1 && r && r > 1 ? { counterReset: `line ${r - 1}` } : void 0,
				children: t.tokens.map((c$1, p$1) => (0, import_jsx_runtime.jsx)("span", {
					className: s$1 ? i : void 0,
					children: c$1.length === 0 || c$1.length === 1 && c$1[0].content === "" ? `
` : c$1.map((m$1, u$1) => {
						let f$1 = {}, h$2 = !!m$1.bgColor;
						if (m$1.color && (f$1["--sdm-c"] = m$1.color), m$1.bgColor && (f$1["--sdm-tbg"] = m$1.bgColor), m$1.htmlStyle) for (let [b$1, g$1] of Object.entries(m$1.htmlStyle)) b$1 === "color" ? f$1["--sdm-c"] = g$1 : b$1 === "background-color" ? (f$1["--sdm-tbg"] = g$1, h$2 = true) : f$1[b$1] = g$1;
						return (0, import_jsx_runtime.jsx)("span", {
							className: l("text-[var(--sdm-c,inherit)]", "dark:text-[var(--shiki-dark,var(--sdm-c,inherit))]", h$2 && "bg-[var(--sdm-tbg)]", h$2 && "dark:bg-[var(--shiki-dark-bg,var(--sdm-tbg))]"),
							style: f$1,
							...m$1.htmlAttrs,
							children: m$1.content
						}, u$1);
					})
				}, p$1))
			})
		})
	});
}, (e, t) => e.result === t.result && e.language === t.language && e.className === t.className && e.startLine === t.startLine && e.lineNumbers === t.lineNumbers);
var ot = ({ className: e, language: t, style: o, isIncomplete: n, ...r }) => {
	return (0, import_jsx_runtime.jsx)("div", {
		className: y()("my-4 flex w-full flex-col gap-2 rounded-xl border border-border bg-sidebar p-2", e),
		"data-incomplete": n || void 0,
		"data-language": t,
		"data-streamdown": "code-block",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "auto 200px",
			...o
		},
		...r
	});
};
var nt = (0, import_react.createContext)({ code: "" }), He = () => (0, import_react.useContext)(nt);
var rt = ({ language: e }) => {
	let t = y();
	return (0, import_jsx_runtime.jsx)("div", {
		className: t("flex h-8 items-center text-muted-foreground text-xs"),
		"data-language": e,
		"data-streamdown": "code-block-header",
		children: (0, import_jsx_runtime.jsx)("span", {
			className: t("ml-1 font-mono lowercase"),
			children: e
		})
	});
};
var lr = (e) => {
	let t = e.length;
	for (; t > 0 && e[t - 1] === `
`;) t--;
	return e.slice(0, t);
}, cr = (0, import_react.lazy)(() => __vitePreload(() => import("./highlighted-body-OFNGDK62-DplTqrHC.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url).then((e) => ({ default: e.HighlightedCodeBlockBody }))), st = ({ code: e, language: t, className: o, children: n, isIncomplete: r = false, startLine: s$1, lineNumbers: a, ...l }) => {
	let i = y(), d$1 = (0, import_react.useMemo)(() => lr(e), [e]), c$1 = (0, import_react.useMemo)(() => ({
		bg: "transparent",
		fg: "inherit",
		tokens: d$1.split(`
`).map((p$1) => [{
			content: p$1,
			color: "inherit",
			bgColor: "transparent",
			htmlStyle: {},
			offset: 0
		}])
	}), [d$1]);
	return (0, import_jsx_runtime.jsx)(nt.Provider, {
		value: { code: e },
		children: (0, import_jsx_runtime.jsxs)(ot, {
			isIncomplete: r,
			language: t,
			children: [
				(0, import_jsx_runtime.jsx)(rt, { language: t }),
				n ? (0, import_jsx_runtime.jsx)("div", {
					className: i("pointer-events-none sticky top-2 z-10 -mt-10 flex h-8 items-center justify-end"),
					children: (0, import_jsx_runtime.jsx)("div", {
						className: i("pointer-events-auto flex shrink-0 items-center gap-2 rounded-md border border-sidebar bg-sidebar/80 px-1.5 py-1 supports-[backdrop-filter]:bg-sidebar/70 supports-[backdrop-filter]:backdrop-blur"),
						"data-streamdown": "code-block-actions",
						children: n
					})
				}) : null,
				(0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: (0, import_jsx_runtime.jsx)(At, {
						className: o,
						language: t,
						lineNumbers: a,
						result: c$1,
						startLine: s$1,
						...l
					}),
					children: (0, import_jsx_runtime.jsx)(cr, {
						className: o,
						code: d$1,
						language: t,
						lineNumbers: a,
						raw: c$1,
						startLine: s$1,
						...l
					})
				})
			]
		})
	});
};
var jt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), Ft = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), zt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M8.75 1V1.75V8.68934L10.7197 6.71967L11.25 6.18934L12.3107 7.25L11.7803 7.78033L8.70711 10.8536C8.31658 11.2441 7.68342 11.2441 7.29289 10.8536L4.21967 7.78033L3.68934 7.25L4.75 6.18934L5.28033 6.71967L7.25 8.68934V1.75V1H8.75ZM13.5 9.25V13.5H2.5V9.25V8.5H1V9.25V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.25V8.5H13.5V9.25Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), _t = (e) => (0, import_jsx_runtime.jsxs)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M8 0V4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M8 16V12",
			opacity: "0.5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M3.29773 1.52783L5.64887 4.7639",
			opacity: "0.9",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M12.7023 1.52783L10.3511 4.7639",
			opacity: "0.1",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M12.7023 14.472L10.3511 11.236",
			opacity: "0.4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M3.29773 14.472L5.64887 11.236",
			opacity: "0.6",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M15.6085 5.52783L11.8043 6.7639",
			opacity: "0.2",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M0.391602 10.472L4.19583 9.23598",
			opacity: "0.7",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M15.6085 10.4722L11.8043 9.2361",
			opacity: "0.3",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M0.391602 5.52783L4.19583 6.7639",
			opacity: "0.8",
			stroke: "currentColor",
			strokeWidth: "1.5"
		})
	]
}), qt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1 5.25V6H2.5V5.25V2.5H5.25H6V1H5.25H2C1.44772 1 1 1.44772 1 2V5.25ZM5.25 14.9994H6V13.4994H5.25H2.5V10.7494V9.99939H1V10.7494V13.9994C1 14.5517 1.44772 14.9994 2 14.9994H5.25ZM15 10V10.75V14C15 14.5523 14.5523 15 14 15H10.75H10V13.5H10.75H13.5V10.75V10H15ZM10.75 1H10V2.5H10.75H13.5V5.25V6H15V5.25V2C15 1.44772 14.5523 1 14 1H10.75Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), $t = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M13.5 8C13.5 4.96643 11.0257 2.5 7.96452 2.5C5.42843 2.5 3.29365 4.19393 2.63724 6.5H5.25H6V8H5.25H0.75C0.335787 8 0 7.66421 0 7.25V2.75V2H1.5V2.75V5.23347C2.57851 2.74164 5.06835 1 7.96452 1C11.8461 1 15 4.13001 15 8C15 11.87 11.8461 15 7.96452 15C5.62368 15 3.54872 13.8617 2.27046 12.1122L1.828 11.5066L3.03915 10.6217L3.48161 11.2273C4.48831 12.6051 6.12055 13.5 7.96452 13.5C11.0257 13.5 13.5 11.0336 13.5 8Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), Wt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), Zt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M13.5 10.25V13.25C13.5 13.3881 13.3881 13.5 13.25 13.5H2.75C2.61193 13.5 2.5 13.3881 2.5 13.25L2.5 2.75C2.5 2.61193 2.61193 2.5 2.75 2.5H5.75H6.5V1H5.75H2.75C1.7835 1 1 1.7835 1 2.75V13.25C1 14.2165 1.7835 15 2.75 15H13.25C14.2165 15 15 14.2165 15 13.25V10.25V9.5H13.5V10.25ZM9 1H9.75H14.2495C14.6637 1 14.9995 1.33579 14.9995 1.75V6.25V7H13.4995V6.25V3.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L12.4388 2.5H9.75H9V1Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), Xt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0ZM4.125 5.875H4.75H5.875V4.75V4.125H7.125V4.75V5.875H8.25H8.875V7.125H8.25H7.125V8.25V8.875H5.875V8.25V7.125H4.75H4.125V5.875Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
}), Jt = (e) => (0, import_jsx_runtime.jsx)("svg", {
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0ZM4.125 5.875H4.75H8.25H8.875V7.125H8.25H4.75H4.125V5.875Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var we = {
	CheckIcon: jt,
	CopyIcon: Ft,
	DownloadIcon: zt,
	ExternalLinkIcon: Zt,
	Loader2Icon: _t,
	Maximize2Icon: qt,
	RotateCcwIcon: $t,
	XIcon: Wt,
	ZoomInIcon: Xt,
	ZoomOutIcon: Jt
}, Ut = (0, import_react.createContext)(we), fr = (e, t) => {
	if (e === t) return true;
	if (!(e && t)) return e === t;
	let o = Object.keys(e), n = Object.keys(t);
	return o.length !== n.length ? false : o.every((r) => e[r] === t[r]);
}, at = ({ icons: e, children: t }) => {
	let o = (0, import_react.useRef)(e), n = (0, import_react.useRef)(e ? {
		...we,
		...e
	} : we);
	fr(o.current, e) || (o.current = e, n.current = e ? {
		...we,
		...e
	} : we);
	let r = n.current;
	return (0, import_jsx_runtime.jsx)(Ut.Provider, {
		value: r,
		children: t
	});
}, L = () => (0, import_react.useContext)(Ut);
var De = {
	copyCode: "Copy Code",
	downloadFile: "Download file",
	downloadDiagram: "Download diagram",
	downloadDiagramAsSvg: "Download diagram as SVG",
	downloadDiagramAsPng: "Download diagram as PNG",
	downloadDiagramAsMmd: "Download diagram as MMD",
	viewFullscreen: "View fullscreen",
	exitFullscreen: "Exit fullscreen",
	mermaidFormatSvg: "SVG",
	mermaidFormatPng: "PNG",
	mermaidFormatMmd: "MMD",
	copyTable: "Copy table",
	copyTableAsMarkdown: "Copy table as Markdown",
	copyTableAsCsv: "Copy table as CSV",
	copyTableAsTsv: "Copy table as TSV",
	downloadTable: "Download table",
	downloadTableAsCsv: "Download table as CSV",
	downloadTableAsMarkdown: "Download table as Markdown",
	tableFormatMarkdown: "Markdown",
	tableFormatCsv: "CSV",
	tableFormatTsv: "TSV",
	imageNotAvailable: "Image not available",
	downloadImage: "Download image",
	openExternalLink: "Open external link?",
	externalLinkWarning: "You're about to visit an external website.",
	close: "Close",
	copyLink: "Copy link",
	copied: "Copied",
	openLink: "Open link"
}, Be = (0, import_react.createContext)(De), D = () => (0, import_react.useContext)(Be);
var Ae = ({ onCopy: e, onError: t, timeout: o = 2e3, children: n, className: r, code: s$1, ...a }) => {
	let l = y(), [i, d$1] = (0, import_react.useState)(false), c$1 = (0, import_react.useRef)(0), { code: p$1 } = He(), { isAnimating: m$1 } = (0, import_react.useContext)(R), u$1 = D(), f$1 = s$1 != null ? s$1 : p$1, h$2 = async () => {
		var T$1;
		if (typeof window == "undefined" || !((T$1 = navigator == null ? void 0 : navigator.clipboard) != null && T$1.writeText)) {
			t?.(/* @__PURE__ */ new Error("Clipboard API not available"));
			return;
		}
		try {
			i || (await navigator.clipboard.writeText(f$1), d$1(!0), e?.(), c$1.current = window.setTimeout(() => d$1(!1), o));
		} catch (v$1) {
			t?.(v$1);
		}
	};
	(0, import_react.useEffect)(() => () => {
		window.clearTimeout(c$1.current);
	}, []);
	let b$1 = L(), g$1 = i ? b$1.CheckIcon : b$1.CopyIcon;
	return (0, import_jsx_runtime.jsx)("button", {
		className: l("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		"data-streamdown": "code-block-copy-button",
		disabled: m$1,
		onClick: h$2,
		title: u$1.copyCode,
		type: "button",
		...a,
		children: n != null ? n : (0, import_jsx_runtime.jsx)(g$1, { size: 14 })
	});
};
var Yt = {
	"1c": "1c",
	"1c-query": "1cq",
	abap: "abap",
	"actionscript-3": "as",
	ada: "ada",
	adoc: "adoc",
	"angular-html": "html",
	"angular-ts": "ts",
	apache: "conf",
	apex: "cls",
	apl: "apl",
	applescript: "applescript",
	ara: "ara",
	asciidoc: "adoc",
	asm: "asm",
	astro: "astro",
	awk: "awk",
	ballerina: "bal",
	bash: "sh",
	bat: "bat",
	batch: "bat",
	be: "be",
	beancount: "beancount",
	berry: "berry",
	bibtex: "bib",
	bicep: "bicep",
	blade: "blade.php",
	bsl: "bsl",
	c: "c",
	"c#": "cs",
	"c++": "cpp",
	cadence: "cdc",
	cairo: "cairo",
	cdc: "cdc",
	clarity: "clar",
	clj: "clj",
	clojure: "clj",
	"closure-templates": "soy",
	cmake: "cmake",
	cmd: "cmd",
	cobol: "cob",
	codeowners: "CODEOWNERS",
	codeql: "ql",
	coffee: "coffee",
	coffeescript: "coffee",
	"common-lisp": "lisp",
	console: "sh",
	coq: "v",
	cpp: "cpp",
	cql: "cql",
	crystal: "cr",
	cs: "cs",
	csharp: "cs",
	css: "css",
	csv: "csv",
	cue: "cue",
	cypher: "cql",
	d: "d",
	dart: "dart",
	dax: "dax",
	desktop: "desktop",
	diff: "diff",
	docker: "dockerfile",
	dockerfile: "dockerfile",
	dotenv: "env",
	"dream-maker": "dm",
	edge: "edge",
	elisp: "el",
	elixir: "ex",
	elm: "elm",
	"emacs-lisp": "el",
	erb: "erb",
	erl: "erl",
	erlang: "erl",
	f: "f",
	"f#": "fs",
	f03: "f03",
	f08: "f08",
	f18: "f18",
	f77: "f77",
	f90: "f90",
	f95: "f95",
	fennel: "fnl",
	fish: "fish",
	fluent: "ftl",
	for: "for",
	"fortran-fixed-form": "f",
	"fortran-free-form": "f90",
	fs: "fs",
	fsharp: "fs",
	fsl: "fsl",
	ftl: "ftl",
	gdresource: "tres",
	gdscript: "gd",
	gdshader: "gdshader",
	genie: "gs",
	gherkin: "feature",
	"git-commit": "gitcommit",
	"git-rebase": "gitrebase",
	gjs: "js",
	gleam: "gleam",
	"glimmer-js": "js",
	"glimmer-ts": "ts",
	glsl: "glsl",
	gnuplot: "plt",
	go: "go",
	gql: "gql",
	graphql: "graphql",
	groovy: "groovy",
	gts: "gts",
	hack: "hack",
	haml: "haml",
	handlebars: "hbs",
	haskell: "hs",
	haxe: "hx",
	hbs: "hbs",
	hcl: "hcl",
	hjson: "hjson",
	hlsl: "hlsl",
	hs: "hs",
	html: "html",
	"html-derivative": "html",
	http: "http",
	hxml: "hxml",
	hy: "hy",
	imba: "imba",
	ini: "ini",
	jade: "jade",
	java: "java",
	javascript: "js",
	jinja: "jinja",
	jison: "jison",
	jl: "jl",
	js: "js",
	json: "json",
	json5: "json5",
	jsonc: "jsonc",
	jsonl: "jsonl",
	jsonnet: "jsonnet",
	jssm: "jssm",
	jsx: "jsx",
	julia: "jl",
	kotlin: "kt",
	kql: "kql",
	kt: "kt",
	kts: "kts",
	kusto: "kql",
	latex: "tex",
	lean: "lean",
	lean4: "lean",
	less: "less",
	liquid: "liquid",
	lisp: "lisp",
	lit: "lit",
	llvm: "ll",
	log: "log",
	logo: "logo",
	lua: "lua",
	luau: "luau",
	make: "mak",
	makefile: "mak",
	markdown: "md",
	marko: "marko",
	matlab: "m",
	md: "md",
	mdc: "mdc",
	mdx: "mdx",
	mediawiki: "wiki",
	mermaid: "mmd",
	mips: "s",
	mipsasm: "s",
	mmd: "mmd",
	mojo: "mojo",
	move: "move",
	nar: "nar",
	narrat: "narrat",
	nextflow: "nf",
	nf: "nf",
	nginx: "conf",
	nim: "nim",
	nix: "nix",
	nu: "nu",
	nushell: "nu",
	objc: "m",
	"objective-c": "m",
	"objective-cpp": "mm",
	ocaml: "ml",
	pascal: "pas",
	perl: "pl",
	perl6: "p6",
	php: "php",
	plsql: "pls",
	po: "po",
	polar: "polar",
	postcss: "pcss",
	pot: "pot",
	potx: "potx",
	powerquery: "pq",
	powershell: "ps1",
	prisma: "prisma",
	prolog: "pl",
	properties: "properties",
	proto: "proto",
	protobuf: "proto",
	ps: "ps",
	ps1: "ps1",
	pug: "pug",
	puppet: "pp",
	purescript: "purs",
	py: "py",
	python: "py",
	ql: "ql",
	qml: "qml",
	qmldir: "qmldir",
	qss: "qss",
	r: "r",
	racket: "rkt",
	raku: "raku",
	razor: "cshtml",
	rb: "rb",
	reg: "reg",
	regex: "regex",
	regexp: "regexp",
	rel: "rel",
	riscv: "s",
	rs: "rs",
	rst: "rst",
	ruby: "rb",
	rust: "rs",
	sas: "sas",
	sass: "sass",
	scala: "scala",
	scheme: "scm",
	scss: "scss",
	sdbl: "sdbl",
	sh: "sh",
	shader: "shader",
	shaderlab: "shader",
	shell: "sh",
	shellscript: "sh",
	shellsession: "sh",
	smalltalk: "st",
	solidity: "sol",
	soy: "soy",
	sparql: "rq",
	spl: "spl",
	splunk: "spl",
	sql: "sql",
	"ssh-config": "config",
	stata: "do",
	styl: "styl",
	stylus: "styl",
	svelte: "svelte",
	swift: "swift",
	"system-verilog": "sv",
	systemd: "service",
	talon: "talon",
	talonscript: "talon",
	tasl: "tasl",
	tcl: "tcl",
	templ: "templ",
	terraform: "tf",
	tex: "tex",
	tf: "tf",
	tfvars: "tfvars",
	toml: "toml",
	ts: "ts",
	"ts-tags": "ts",
	tsp: "tsp",
	tsv: "tsv",
	tsx: "tsx",
	turtle: "ttl",
	twig: "twig",
	typ: "typ",
	typescript: "ts",
	typespec: "tsp",
	typst: "typ",
	v: "v",
	vala: "vala",
	vb: "vb",
	verilog: "v",
	vhdl: "vhdl",
	vim: "vim",
	viml: "vim",
	vimscript: "vim",
	vue: "vue",
	"vue-html": "html",
	"vue-vine": "vine",
	vy: "vy",
	vyper: "vy",
	wasm: "wasm",
	wenyan: "wy",
	wgsl: "wgsl",
	wiki: "wiki",
	wikitext: "wiki",
	wit: "wit",
	wl: "wl",
	wolfram: "wl",
	xml: "xml",
	xsl: "xsl",
	yaml: "yaml",
	yml: "yml",
	zenscript: "zs",
	zig: "zig",
	zsh: "zsh",
	文言: "wy"
}, it = ({ onDownload: e, onError: t, language: o, children: n, className: r, code: s$1, ...a }) => {
	let l = y(), { code: i } = He(), { isAnimating: d$1 } = (0, import_react.useContext)(R), c$1 = D(), p$1 = L(), m$1 = s$1 != null ? s$1 : i, f$1 = `file.${o && o in Yt ? Yt[o] : "txt"}`, h$2 = "text/plain", b$1 = () => {
		try {
			W(f$1, m$1, h$2), e?.();
		} catch (g$1) {
			t?.(g$1);
		}
	};
	return (0, import_jsx_runtime.jsx)("button", {
		className: l("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		"data-streamdown": "code-block-download-button",
		disabled: d$1,
		onClick: b$1,
		title: c$1.downloadFile,
		type: "button",
		...a,
		children: n != null ? n : (0, import_jsx_runtime.jsx)(p$1.DownloadIcon, { size: 14 })
	});
};
var Oe = () => {
	let { Loader2Icon: e } = L(), t = y();
	return (0, import_jsx_runtime.jsxs)("div", {
		className: t("w-full divide-y divide-border overflow-hidden rounded-xl border border-border"),
		children: [(0, import_jsx_runtime.jsx)("div", { className: t("h-[46px] w-full bg-muted/80") }), (0, import_jsx_runtime.jsx)("div", {
			className: t("flex w-full items-center justify-center p-4"),
			children: (0, import_jsx_runtime.jsx)(e, { className: t("size-4 animate-spin") })
		})]
	});
};
var Mr = /\.[^/.]+$/, oo = ({ node: e, className: t, src: o, alt: n, onLoad: r, onError: s$1, ...a }) => {
	let { DownloadIcon: l } = L(), i = y(), d$1 = (0, import_react.useRef)(null), [c$1, p$1] = (0, import_react.useState)(false), [m$1, u$1] = (0, import_react.useState)(false), f$1 = D(), h$2 = a.width != null || a.height != null, b$1 = (c$1 || h$2) && !m$1, g$1 = m$1 && !h$2;
	(0, import_react.useEffect)(() => {
		let P = d$1.current;
		if (P != null && P.complete) {
			let M$1 = P.naturalWidth > 0;
			p$1(M$1), u$1(!M$1);
		}
	}, []);
	let T$1 = (0, import_react.useCallback)((P) => {
		p$1(true), u$1(false), r?.(P);
	}, [r]), v$1 = (0, import_react.useCallback)((P) => {
		p$1(false), u$1(true), s$1?.(P);
	}, [s$1]), w$1 = async () => {
		if (o) try {
			let M$1 = await (await fetch(o)).blob(), S$1 = new URL(o, window.location.origin).pathname.split("/").pop() || "", F$1 = S$1.split(".").pop(), j$1 = S$1.includes(".") && F$1 !== void 0 && F$1.length <= 4, z$1 = "";
			if (j$1) z$1 = S$1;
			else {
				let B$1 = M$1.type, _ = "png";
				B$1.includes("jpeg") || B$1.includes("jpg") ? _ = "jpg" : B$1.includes("png") ? _ = "png" : B$1.includes("svg") ? _ = "svg" : B$1.includes("gif") ? _ = "gif" : B$1.includes("webp") && (_ = "webp"), z$1 = `${(n || S$1 || "image").replace(Mr, "")}.${_}`;
			}
			W(z$1, M$1, M$1.type);
		} catch (P) {
			window.open(o, "_blank");
		}
	};
	return o ? (0, import_jsx_runtime.jsxs)("div", {
		className: i("group relative my-4 inline-block"),
		"data-streamdown": "image-wrapper",
		children: [
			(0, import_jsx_runtime.jsx)("img", {
				alt: n,
				className: i("max-w-full rounded-lg", g$1 && "hidden", t),
				"data-streamdown": "image",
				onError: v$1,
				onLoad: T$1,
				ref: d$1,
				src: o,
				...a
			}),
			g$1 && (0, import_jsx_runtime.jsx)("span", {
				className: i("text-muted-foreground text-xs italic"),
				"data-streamdown": "image-fallback",
				children: f$1.imageNotAvailable
			}),
			(0, import_jsx_runtime.jsx)("div", { className: i("pointer-events-none absolute inset-0 hidden rounded-lg bg-black/10 group-hover:block") }),
			b$1 && (0, import_jsx_runtime.jsx)("button", {
				className: i("absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-background", "opacity-0 group-hover:opacity-100"),
				onClick: w$1,
				title: f$1.downloadImage,
				type: "button",
				children: (0, import_jsx_runtime.jsx)(l, { size: 14 })
			})
		]
	}) : null;
};
var ke = 0, le = () => {
	ke += 1, ke === 1 && (document.body.style.overflow = "hidden");
}, ce = () => {
	ke = Math.max(0, ke - 1), ke === 0 && (document.body.style.overflow = "");
};
var so = ({ url: e, isOpen: t, onClose: o, onConfirm: n }) => {
	let { CheckIcon: r, CopyIcon: s$1, ExternalLinkIcon: a, XIcon: l } = L(), i = y(), [d$1, c$1] = (0, import_react.useState)(false), p$1 = D(), m$1 = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(e), c$1(!0), setTimeout(() => c$1(!1), 2e3);
		} catch (f$1) {}
	}, [e]), u$1 = (0, import_react.useCallback)(() => {
		n(), o();
	}, [n, o]);
	return (0, import_react.useEffect)(() => {
		if (t) {
			le();
			let f$1 = (h$2) => {
				h$2.key === "Escape" && o();
			};
			return document.addEventListener("keydown", f$1), () => {
				document.removeEventListener("keydown", f$1), ce();
			};
		}
	}, [t, o]), t ? (0, import_jsx_runtime.jsx)("div", {
		className: i("fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"),
		"data-streamdown": "link-safety-modal",
		onClick: o,
		onKeyDown: (f$1) => {
			f$1.key === "Escape" && o();
		},
		role: "button",
		tabIndex: 0,
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: i("relative mx-4 flex w-full max-w-md flex-col gap-4 rounded-xl border bg-background p-6 shadow-lg"),
			onClick: (f$1) => f$1.stopPropagation(),
			onKeyDown: (f$1) => f$1.stopPropagation(),
			role: "presentation",
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: i("absolute top-4 right-4 rounded-md p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
					onClick: o,
					title: p$1.close,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(l, { size: 16 })
				}),
				(0, import_jsx_runtime.jsxs)("div", {
					className: i("flex flex-col gap-2"),
					children: [(0, import_jsx_runtime.jsxs)("div", {
						className: i("flex items-center gap-2 font-semibold text-lg"),
						children: [(0, import_jsx_runtime.jsx)(a, { size: 20 }), (0, import_jsx_runtime.jsx)("span", { children: p$1.openExternalLink })]
					}), (0, import_jsx_runtime.jsx)("p", {
						className: i("text-muted-foreground text-sm"),
						children: p$1.externalLinkWarning
					})]
				}),
				(0, import_jsx_runtime.jsx)("div", {
					className: i("break-all rounded-md bg-muted p-3 font-mono text-sm", e.length > 100 && "max-h-32 overflow-y-auto"),
					children: e
				}),
				(0, import_jsx_runtime.jsxs)("div", {
					className: i("flex gap-2"),
					children: [(0, import_jsx_runtime.jsx)("button", {
						className: i("flex flex-1 items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 font-medium text-sm transition-all hover:bg-muted"),
						onClick: m$1,
						type: "button",
						children: d$1 ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(r, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: p$1.copied })] }) : (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(s$1, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: p$1.copyLink })] })
					}), (0, import_jsx_runtime.jsxs)("button", {
						className: i("flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-all hover:bg-primary/90"),
						onClick: u$1,
						type: "button",
						children: [(0, import_jsx_runtime.jsx)(a, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: p$1.openLink })]
					})]
				})
			]
		})
	}) : null;
};
var Ve = (0, import_react.createContext)(null), ct = () => (0, import_react.useContext)(Ve), Li = () => {
	var t;
	let e = ct();
	return (t = e == null ? void 0 : e.code) != null ? t : null;
}, de = () => {
	var t;
	let e = ct();
	return (t = e == null ? void 0 : e.mermaid) != null ? t : null;
};
var ao = (e) => {
	var o;
	let t = ct();
	return t != null && t.renderers && e && (o = t.renderers.find((n) => Array.isArray(n.language) ? n.language.includes(e) : n.language === e)) != null ? o : null;
};
var io = (e, t) => {
	var n;
	let o = (n = void 0) != null ? n : 5;
	return new Promise((r, s$1) => {
		let a = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e))), l = new Image();
		l.crossOrigin = "anonymous", l.onload = () => {
			let i = document.createElement("canvas"), d$1 = l.width * o, c$1 = l.height * o;
			i.width = d$1, i.height = c$1;
			let p$1 = i.getContext("2d");
			if (!p$1) {
				s$1(/* @__PURE__ */ new Error("Failed to create 2D canvas context for PNG export"));
				return;
			}
			p$1.drawImage(l, 0, 0, d$1, c$1), i.toBlob((m$1) => {
				if (!m$1) {
					s$1(/* @__PURE__ */ new Error("Failed to create PNG blob"));
					return;
				}
				r(m$1);
			}, "image/png");
		}, l.onerror = () => s$1(/* @__PURE__ */ new Error("Failed to load SVG image")), l.src = a;
	});
};
var co = ({ chart: e, children: t, className: o, onDownload: n, config: r, onError: s$1 }) => {
	let a = y(), [l, i] = (0, import_react.useState)(false), d$1 = (0, import_react.useRef)(null), { isAnimating: c$1 } = (0, import_react.useContext)(R), p$1 = L(), m$1 = de(), u$1 = D(), f$1 = async (h$2) => {
		try {
			if (h$2 === "mmd") {
				W("diagram.mmd", e, "text/plain"), i(!1), n?.(h$2);
				return;
			}
			if (!m$1) {
				s$1?.(/* @__PURE__ */ new Error("Mermaid plugin not available"));
				return;
			}
			let b$1 = m$1.getMermaid(r), g$1 = e.split("").reduce((w$1, P) => (w$1 << 5) - w$1 + P.charCodeAt(0) | 0, 0), T$1 = `mermaid-${Math.abs(g$1)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: v$1 } = await b$1.render(T$1, e);
			if (!v$1) {
				s$1?.(/* @__PURE__ */ new Error("SVG not found. Please wait for the diagram to render."));
				return;
			}
			if (h$2 === "svg") {
				W("diagram.svg", v$1, "image/svg+xml"), i(!1), n?.(h$2);
				return;
			}
			if (h$2 === "png") {
				W("diagram.png", await io(v$1), "image/png"), n?.(h$2), i(!1);
				return;
			}
		} catch (b$1) {
			s$1?.(b$1);
		}
	};
	return (0, import_react.useEffect)(() => {
		let h$2 = (b$1) => {
			let g$1 = b$1.composedPath();
			d$1.current && !g$1.includes(d$1.current) && i(false);
		};
		return document.addEventListener("mousedown", h$2), () => {
			document.removeEventListener("mousedown", h$2);
		};
	}, []), (0, import_jsx_runtime.jsxs)("div", {
		className: a("relative"),
		ref: d$1,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: a("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", o),
			disabled: c$1,
			onClick: () => i(!l),
			title: u$1.downloadDiagram,
			type: "button",
			children: t != null ? t : (0, import_jsx_runtime.jsx)(p$1.DownloadIcon, { size: 14 })
		}), l ? (0, import_jsx_runtime.jsxs)("div", {
			className: a("absolute top-full right-0 z-10 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("svg"),
					title: u$1.downloadDiagramAsSvg,
					type: "button",
					children: u$1.mermaidFormatSvg
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("png"),
					title: u$1.downloadDiagramAsPng,
					type: "button",
					children: u$1.mermaidFormatPng
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("mmd"),
					title: u$1.downloadDiagramAsMmd,
					type: "button",
					children: u$1.mermaidFormatMmd
				})
			]
		}) : null]
	});
};
var fo = ({ chart: e, config: t, onFullscreen: o, onExit: n, className: r, ...s$1 }) => {
	let { Maximize2Icon: a, XIcon: l } = L(), i = y(), [d$1, c$1] = (0, import_react.useState)(false), { isAnimating: p$1, controls: m$1 } = (0, import_react.useContext)(R), u$1 = D(), f$1 = (() => {
		if (typeof m$1 == "boolean") return m$1;
		let b$1 = m$1.mermaid;
		return b$1 === false ? false : b$1 === true || b$1 === void 0 ? true : b$1.panZoom !== false;
	})(), h$2 = () => {
		c$1(!d$1);
	};
	return (0, import_react.useEffect)(() => {
		if (d$1) {
			le();
			let b$1 = (g$1) => {
				g$1.key === "Escape" && c$1(false);
			};
			return document.addEventListener("keydown", b$1), () => {
				document.removeEventListener("keydown", b$1), ce();
			};
		}
	}, [d$1]), (0, import_react.useEffect)(() => {
		d$1 ? o?.() : n && n();
	}, [
		d$1,
		o,
		n
	]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: i("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		disabled: p$1,
		onClick: h$2,
		title: u$1.viewFullscreen,
		type: "button",
		...s$1,
		children: (0, import_jsx_runtime.jsx)(a, { size: 14 })
	}), d$1 ? (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsxs)("div", {
		className: i("fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"),
		onClick: h$2,
		onKeyDown: (b$1) => {
			b$1.key === "Escape" && h$2();
		},
		role: "button",
		tabIndex: 0,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: i("absolute top-4 right-4 z-10 rounded-md p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
			onClick: h$2,
			title: u$1.exitFullscreen,
			type: "button",
			children: (0, import_jsx_runtime.jsx)(l, { size: 20 })
		}), (0, import_jsx_runtime.jsx)("div", {
			className: i("flex size-full items-center justify-center p-4"),
			onClick: (b$1) => b$1.stopPropagation(),
			onKeyDown: (b$1) => b$1.stopPropagation(),
			role: "presentation",
			children: (0, import_jsx_runtime.jsx)(po, {
				chart: e,
				className: i("size-full [&_svg]:h-auto [&_svg]:w-auto"),
				config: t,
				fullscreen: true,
				showControls: f$1
			})
		})]
	}), document.body) : null] });
};
var ue = (e) => {
	var s$1, a;
	let t = [], o = [], n = e.querySelectorAll("thead th");
	for (let l of n) t.push(((s$1 = l.textContent) == null ? void 0 : s$1.trim()) || "");
	let r = e.querySelectorAll("tbody tr");
	for (let l of r) {
		let i = [], d$1 = l.querySelectorAll("td");
		for (let c$1 of d$1) i.push(((a = c$1.textContent) == null ? void 0 : a.trim()) || "");
		o.push(i);
	}
	return {
		headers: t,
		rows: o
	};
}, ne = (e) => {
	let { headers: t, rows: o } = e, n = (l) => {
		let i = false, d$1 = false;
		for (let c$1 of l) {
			if (c$1 === "\"") {
				i = true, d$1 = true;
				break;
			}
			(c$1 === "," || c$1 === `
`) && (i = true);
		}
		return i ? d$1 ? `"${l.replace(/"/g, "\"\"")}"` : `"${l}"` : l;
	}, r = t.length > 0 ? o.length + 1 : o.length, s$1 = new Array(r), a = 0;
	t.length > 0 && (s$1[a] = t.map(n).join(","), a += 1);
	for (let l of o) s$1[a] = l.map(n).join(","), a += 1;
	return s$1.join(`
`);
}, dt = (e) => {
	let { headers: t, rows: o } = e, n = (l) => {
		let i = false;
		for (let c$1 of l) if (c$1 === "	" || c$1 === `
` || c$1 === "\r") {
			i = true;
			break;
		}
		if (!i) return l;
		let d$1 = [];
		for (let c$1 of l) c$1 === "	" ? d$1.push("\\t") : c$1 === `
` ? d$1.push("\\n") : c$1 === "\r" ? d$1.push("\\r") : d$1.push(c$1);
		return d$1.join("");
	}, r = t.length > 0 ? o.length + 1 : o.length, s$1 = new Array(r), a = 0;
	t.length > 0 && (s$1[a] = t.map(n).join("	"), a += 1);
	for (let l of o) s$1[a] = l.map(n).join("	"), a += 1;
	return s$1.join(`
`);
}, je = (e) => {
	let t = false;
	for (let n of e) if (n === "\\" || n === "|") {
		t = true;
		break;
	}
	if (!t) return e;
	let o = [];
	for (let n of e) n === "\\" ? o.push("\\\\") : n === "|" ? o.push("\\|") : o.push(n);
	return o.join("");
}, re = (e) => {
	let { headers: t, rows: o } = e;
	if (t.length === 0) return "";
	let n = new Array(o.length + 2), r = 0;
	n[r] = `| ${t.map((l) => je(l)).join(" | ")} |`, r += 1;
	let a = new Array(t.length);
	for (let l = 0; l < t.length; l += 1) a[l] = "---";
	n[r] = `| ${a.join(" | ")} |`, r += 1;
	for (let l of o) if (l.length < t.length) {
		let i = new Array(t.length);
		for (let d$1 = 0; d$1 < t.length; d$1 += 1) i[d$1] = d$1 < l.length ? je(l[d$1]) : "";
		n[r] = `| ${i.join(" | ")} |`, r += 1;
	} else n[r] = `| ${l.map((d$1) => je(d$1)).join(" | ")} |`, r += 1;
	return n.join(`
`);
};
var Te = ({ children: e, className: t, onCopy: o, onError: n, timeout: r = 2e3 }) => {
	let s$1 = y(), [a, l] = (0, import_react.useState)(false), [i, d$1] = (0, import_react.useState)(false), c$1 = (0, import_react.useRef)(null), p$1 = (0, import_react.useRef)(0), { isAnimating: m$1 } = (0, import_react.useContext)(R), u$1 = D(), f$1 = async (g$1) => {
		var T$1, v$1;
		if (typeof window == "undefined" || !((T$1 = navigator == null ? void 0 : navigator.clipboard) != null && T$1.write)) {
			n?.(/* @__PURE__ */ new Error("Clipboard API not available"));
			return;
		}
		try {
			let w$1 = (v$1 = c$1.current) == null ? void 0 : v$1.closest("[data-streamdown=\"table-wrapper\"]"), P = w$1 == null ? void 0 : w$1.querySelector("table");
			if (!P) {
				n?.(/* @__PURE__ */ new Error("Table not found"));
				return;
			}
			let M$1 = ue(P), F$1 = ({
				csv: ne,
				tsv: dt,
				md: re
			}[g$1] || re)(M$1), j$1 = new ClipboardItem({
				"text/plain": new Blob([F$1], { type: "text/plain" }),
				"text/html": new Blob([P.outerHTML], { type: "text/html" })
			});
			await navigator.clipboard.write([j$1]), d$1(!0), l(!1), o?.(g$1), p$1.current = window.setTimeout(() => d$1(!1), r);
		} catch (w$1) {
			n?.(w$1);
		}
	};
	(0, import_react.useEffect)(() => {
		let g$1 = (T$1) => {
			let v$1 = T$1.composedPath();
			c$1.current && !v$1.includes(c$1.current) && l(false);
		};
		return document.addEventListener("mousedown", g$1), () => {
			document.removeEventListener("mousedown", g$1), window.clearTimeout(p$1.current);
		};
	}, []);
	let h$2 = L(), b$1 = i ? h$2.CheckIcon : h$2.CopyIcon;
	return (0, import_jsx_runtime.jsxs)("div", {
		className: s$1("relative"),
		ref: c$1,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: s$1("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: m$1,
			onClick: () => l(!a),
			title: u$1.copyTable,
			type: "button",
			children: e != null ? e : (0, import_jsx_runtime.jsx)(b$1, {
				height: 14,
				width: 14
			})
		}), a ? (0, import_jsx_runtime.jsxs)("div", {
			className: s$1("absolute top-full right-0 z-20 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: s$1("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("md"),
					title: u$1.copyTableAsMarkdown,
					type: "button",
					children: u$1.tableFormatMarkdown
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: s$1("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("csv"),
					title: u$1.copyTableAsCsv,
					type: "button",
					children: u$1.tableFormatCsv
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: s$1("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => f$1("tsv"),
					title: u$1.copyTableAsTsv,
					type: "button",
					children: u$1.tableFormatTsv
				})
			]
		}) : null]
	});
}, Pe = ({ children: e, className: t, onDownload: o, onError: n }) => {
	let r = y(), [s$1, a] = (0, import_react.useState)(false), l = (0, import_react.useRef)(null), { isAnimating: i } = (0, import_react.useContext)(R), d$1 = D(), c$1 = L(), p$1 = (m$1) => {
		var u$1;
		try {
			let f$1 = (u$1 = l.current) == null ? void 0 : u$1.closest("[data-streamdown=\"table-wrapper\"]"), h$2 = f$1 == null ? void 0 : f$1.querySelector("table");
			if (!h$2) {
				n?.(/* @__PURE__ */ new Error("Table not found"));
				return;
			}
			let b$1 = ue(h$2), g$1 = m$1 === "csv" ? ne(b$1) : re(b$1);
			W(`table.${m$1 === "csv" ? "csv" : "md"}`, g$1, m$1 === "csv" ? "text/csv" : "text/markdown"), a(!1), o?.(m$1);
		} catch (f$1) {
			n?.(f$1);
		}
	};
	return (0, import_react.useEffect)(() => {
		let m$1 = (u$1) => {
			let f$1 = u$1.composedPath();
			l.current && !f$1.includes(l.current) && a(false);
		};
		return document.addEventListener("mousedown", m$1), () => {
			document.removeEventListener("mousedown", m$1);
		};
	}, []), (0, import_jsx_runtime.jsxs)("div", {
		className: r("relative"),
		ref: l,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: r("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: i,
			onClick: () => a(!s$1),
			title: d$1.downloadTable,
			type: "button",
			children: e != null ? e : (0, import_jsx_runtime.jsx)(c$1.DownloadIcon, { size: 14 })
		}), s$1 ? (0, import_jsx_runtime.jsxs)("div", {
			className: r("absolute top-full right-0 z-20 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [(0, import_jsx_runtime.jsx)("button", {
				className: r("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
				onClick: () => p$1("csv"),
				title: d$1.downloadTableAsCsv,
				type: "button",
				children: d$1.tableFormatCsv
			}), (0, import_jsx_runtime.jsx)("button", {
				className: r("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
				onClick: () => p$1("markdown"),
				title: d$1.downloadTableAsMarkdown,
				type: "button",
				children: d$1.tableFormatMarkdown
			})]
		}) : null]
	});
};
var Co = ({ children: e, className: t, showCopy: o = true, showDownload: n = true }) => {
	let { Maximize2Icon: r, XIcon: s$1 } = L(), a = y(), [l, i] = (0, import_react.useState)(false), { isAnimating: d$1 } = (0, import_react.useContext)(R), c$1 = D(), p$1 = () => {
		i(true);
	}, m$1 = () => {
		i(false);
	};
	return (0, import_react.useEffect)(() => {
		if (l) {
			le();
			let u$1 = (f$1) => {
				f$1.key === "Escape" && i(false);
			};
			return document.addEventListener("keydown", u$1), () => {
				document.removeEventListener("keydown", u$1), ce();
			};
		}
	}, [l]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: a("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
		disabled: d$1,
		onClick: p$1,
		title: c$1.viewFullscreen,
		type: "button",
		children: (0, import_jsx_runtime.jsx)(r, { size: 14 })
	}), l ? (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)("div", {
		"aria-label": c$1.viewFullscreen,
		"aria-modal": "true",
		className: a("fixed inset-0 z-50 flex flex-col bg-background"),
		"data-streamdown": "table-fullscreen",
		onClick: m$1,
		onKeyDown: (u$1) => {
			u$1.key === "Escape" && m$1();
		},
		role: "dialog",
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: a("flex h-full flex-col"),
			onClick: (u$1) => u$1.stopPropagation(),
			onKeyDown: (u$1) => u$1.stopPropagation(),
			role: "presentation",
			children: [(0, import_jsx_runtime.jsxs)("div", {
				className: a("flex items-center justify-end gap-1 p-4"),
				children: [
					o ? (0, import_jsx_runtime.jsx)(Te, {}) : null,
					n ? (0, import_jsx_runtime.jsx)(Pe, {}) : null,
					(0, import_jsx_runtime.jsx)("button", {
						className: a("rounded-md p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
						onClick: m$1,
						title: c$1.exitFullscreen,
						type: "button",
						children: (0, import_jsx_runtime.jsx)(s$1, { size: 20 })
					})
				]
			}), (0, import_jsx_runtime.jsx)("div", {
				className: a("flex-1 overflow-auto p-4 pt-0 [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10"),
				children: (0, import_jsx_runtime.jsx)("table", {
					className: a("w-full border-collapse border border-border"),
					"data-streamdown": "table",
					children: e
				})
			})]
		})
	}), document.body) : null] });
};
var vo = ({ children: e, className: t, showControls: o, showCopy: n = true, showDownload: r = true, showFullscreen: s$1 = true, ...a }) => {
	let l = y(), i = o && n, d$1 = o && r, c$1 = o && s$1, p$1 = i || d$1 || c$1;
	return (0, import_jsx_runtime.jsxs)("div", {
		className: l("my-4 flex flex-col gap-2 rounded-lg border border-border bg-sidebar p-2"),
		"data-streamdown": "table-wrapper",
		children: [p$1 ? (0, import_jsx_runtime.jsxs)("div", {
			className: l("flex items-center justify-end gap-1"),
			children: [
				i ? (0, import_jsx_runtime.jsx)(Te, {}) : null,
				d$1 ? (0, import_jsx_runtime.jsx)(Pe, {}) : null,
				c$1 ? (0, import_jsx_runtime.jsx)(Co, {
					showCopy: i,
					showDownload: d$1,
					children: e
				}) : null
			]
		}) : null, (0, import_jsx_runtime.jsx)("div", {
			className: l("border-collapse overflow-x-auto overflow-y-auto rounded-md border border-border bg-background"),
			children: (0, import_jsx_runtime.jsx)("table", {
				className: l("w-full divide-y divide-border", t),
				"data-streamdown": "table",
				...a,
				children: e
			})
		})]
	});
};
var es = /startLine=(\d+)/, ts = /\bnoLineNumbers\b/, os = (0, import_react.lazy)(() => __vitePreload(() => import("./mermaid-GHXKKRXX-CyNkZ4mx.js"), __vite__mapDeps([7,1,2,3,4,5,6]), import.meta.url).then((e) => ({ default: e.Mermaid }))), ns = /language-([^\s]+)/;
function qe(e, t) {
	if (!(e != null && e.position || t != null && t.position)) return true;
	if (!(e != null && e.position && t != null && t.position)) return false;
	let o = e.position.start, n = t.position.start, r = e.position.end, s$1 = t.position.end;
	return (o == null ? void 0 : o.line) === (n == null ? void 0 : n.line) && (o == null ? void 0 : o.column) === (n == null ? void 0 : n.column) && (r == null ? void 0 : r.line) === (s$1 == null ? void 0 : s$1.line) && (r == null ? void 0 : r.column) === (s$1 == null ? void 0 : s$1.column);
}
function E(e, t) {
	return e.className === t.className && qe(e.node, t.node);
}
var ft = (e, t) => typeof e == "boolean" ? e : e[t] !== false, pt = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.table;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
}, To = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.code;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
}, Fe = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.mermaid;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
}, bt = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("ol", {
		className: y()("list-inside list-decimal whitespace-normal [li_&]:pl-6", t),
		"data-streamdown": "ordered-list",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
bt.displayName = "MarkdownOl";
var Po = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("li", {
		className: y()("py-1 [&>p]:inline", t),
		"data-streamdown": "list-item",
		...n,
		children: e
	});
}, (e, t) => e.className === t.className && qe(e.node, t.node));
Po.displayName = "MarkdownLi";
var Mo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("ul", {
		className: y()("list-inside list-disc whitespace-normal [li_&]:pl-6", t),
		"data-streamdown": "unordered-list",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Mo.displayName = "MarkdownUl";
var Io = (0, import_react.memo)(({ className: e, node: t, ...o }) => {
	return (0, import_jsx_runtime.jsx)("hr", {
		className: y()("my-6 border-border", e),
		"data-streamdown": "horizontal-rule",
		...o
	});
}, (e, t) => E(e, t));
Io.displayName = "MarkdownHr";
var No = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("span", {
		className: y()("font-semibold", t),
		"data-streamdown": "strong",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
No.displayName = "MarkdownStrong";
var rs = ({ children: e, className: t, href: o, node: n, ...r }) => {
	let s$1 = y(), { linkSafety: a } = (0, import_react.useContext)(R), [l, i] = (0, import_react.useState)(false), d$1 = o === "streamdown:incomplete-link", c$1 = (0, import_react.useCallback)(async (f$1) => {
		if (!(!(a != null && a.enabled && o) || d$1)) {
			if (f$1.preventDefault(), a.onLinkCheck && await a.onLinkCheck(o)) {
				window.open(o, "_blank", "noreferrer");
				return;
			}
			i(true);
		}
	}, [
		a,
		o,
		d$1
	]), p$1 = (0, import_react.useCallback)(() => {
		o && window.open(o, "_blank", "noreferrer");
	}, [o]), m$1 = (0, import_react.useCallback)(() => {
		i(false);
	}, []), u$1 = {
		url: o != null ? o : "",
		isOpen: l,
		onClose: m$1,
		onConfirm: p$1
	};
	return a != null && a.enabled && o ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: s$1("wrap-anywhere appearance-none text-left font-medium text-primary underline", t),
		"data-incomplete": d$1,
		"data-streamdown": "link",
		onClick: c$1,
		type: "button",
		children: e
	}), a.renderModal ? a.renderModal(u$1) : (0, import_jsx_runtime.jsx)(so, { ...u$1 })] }) : (0, import_jsx_runtime.jsx)("a", {
		className: s$1("wrap-anywhere font-medium text-primary underline", t),
		"data-incomplete": d$1,
		"data-streamdown": "link",
		href: o,
		rel: "noreferrer",
		target: "_blank",
		...r,
		children: e
	});
}, Lo = (0, import_react.memo)(rs, (e, t) => E(e, t) && e.href === t.href);
Lo.displayName = "MarkdownA";
var Ro = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h1", {
		className: y()("mt-6 mb-2 font-semibold text-3xl", t),
		"data-streamdown": "heading-1",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Ro.displayName = "MarkdownH1";
var So = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h2", {
		className: y()("mt-6 mb-2 font-semibold text-2xl", t),
		"data-streamdown": "heading-2",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
So.displayName = "MarkdownH2";
var Eo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h3", {
		className: y()("mt-6 mb-2 font-semibold text-xl", t),
		"data-streamdown": "heading-3",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Eo.displayName = "MarkdownH3";
var Ho = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h4", {
		className: y()("mt-6 mb-2 font-semibold text-lg", t),
		"data-streamdown": "heading-4",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Ho.displayName = "MarkdownH4";
var Do = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h5", {
		className: y()("mt-6 mb-2 font-semibold text-base", t),
		"data-streamdown": "heading-5",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Do.displayName = "MarkdownH5";
var Bo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("h6", {
		className: y()("mt-6 mb-2 font-semibold text-sm", t),
		"data-streamdown": "heading-6",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Bo.displayName = "MarkdownH6";
var Ao = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let { controls: r } = (0, import_react.useContext)(R);
	return (0, import_jsx_runtime.jsx)(vo, {
		className: t,
		showControls: ft(r, "table"),
		showCopy: pt(r, "copy"),
		showDownload: pt(r, "download"),
		showFullscreen: pt(r, "fullscreen"),
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Ao.displayName = "MarkdownTable";
var Oo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("thead", {
		className: y()("bg-muted/80", t),
		"data-streamdown": "table-header",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Oo.displayName = "MarkdownThead";
var Vo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("tbody", {
		className: y()("divide-y divide-border", t),
		"data-streamdown": "table-body",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Vo.displayName = "MarkdownTbody";
var jo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("tr", {
		className: y()("border-border", t),
		"data-streamdown": "table-row",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
jo.displayName = "MarkdownTr";
var Fo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("th", {
		className: y()("whitespace-nowrap px-4 py-2 text-left font-semibold text-sm", t),
		"data-streamdown": "table-header-cell",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Fo.displayName = "MarkdownTh";
var zo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("td", {
		className: y()("px-4 py-2 text-sm", t),
		"data-streamdown": "table-cell",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
zo.displayName = "MarkdownTd";
var _o = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("blockquote", {
		className: y()("my-4 border-muted-foreground/30 border-l-4 pl-4 text-muted-foreground italic", t),
		"data-streamdown": "blockquote",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
_o.displayName = "MarkdownBlockquote";
var qo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("sup", {
		className: y()("text-sm", t),
		"data-streamdown": "superscript",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
qo.displayName = "MarkdownSup";
var $o = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	return (0, import_jsx_runtime.jsx)("sub", {
		className: y()("text-sm", t),
		"data-streamdown": "subscript",
		...n,
		children: e
	});
}, (e, t) => E(e, t));
$o.displayName = "MarkdownSub";
var Wo = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	if ("data-footnotes" in n) {
		let s$1 = (i) => {
			var m$1, u$1;
			if (!(0, import_react.isValidElement)(i)) return false;
			let d$1 = Array.isArray(i.props.children) ? i.props.children : [i.props.children], c$1 = false, p$1 = false;
			for (let f$1 of d$1) if (f$1) {
				if (typeof f$1 == "string") f$1.trim() !== "" && (c$1 = true);
				else if ((0, import_react.isValidElement)(f$1)) if (((m$1 = f$1.props) == null ? void 0 : m$1["data-footnote-backref"]) !== void 0) p$1 = true;
				else {
					let h$2 = Array.isArray(f$1.props.children) ? f$1.props.children : [f$1.props.children];
					for (let b$1 of h$2) {
						if (typeof b$1 == "string" && b$1.trim() !== "") {
							c$1 = true;
							break;
						}
						if ((0, import_react.isValidElement)(b$1) && ((u$1 = b$1.props) == null ? void 0 : u$1["data-footnote-backref"]) === void 0) {
							c$1 = true;
							break;
						}
					}
				}
			}
			return p$1 && !c$1;
		}, a = Array.isArray(e) ? e.map((i) => {
			if (!(0, import_react.isValidElement)(i)) return i;
			if (i.type === bt) {
				let c$1 = (Array.isArray(i.props.children) ? i.props.children : [i.props.children]).filter((p$1) => !s$1(p$1));
				return c$1.length === 0 ? null : {
					...i,
					props: {
						...i.props,
						children: c$1
					}
				};
			}
			return i;
		}) : e;
		return (Array.isArray(a) ? a.some((i) => i !== null) : a !== null) ? (0, import_jsx_runtime.jsx)("section", {
			className: t,
			...n,
			children: a
		}) : null;
	}
	return (0, import_jsx_runtime.jsx)("section", {
		className: t,
		...n,
		children: e
	});
}, (e, t) => E(e, t));
Wo.displayName = "MarkdownSection";
var ss = ({ node: e, className: t, children: o, ...n }) => {
	var S$1, F$1;
	let r = y(), s$1 = !("data-block" in n), { mermaid: a, controls: l, lineNumbers: i } = (0, import_react.useContext)(R), d$1 = de(), c$1 = tt(), p$1 = t == null ? void 0 : t.match(ns), m$1 = (S$1 = p$1 == null ? void 0 : p$1.at(1)) != null ? S$1 : "", u$1 = ao(m$1);
	if (s$1) return (0, import_jsx_runtime.jsx)("code", {
		className: r("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", t),
		"data-streamdown": "inline-code",
		...n,
		children: o
	});
	let f$1 = (F$1 = e == null ? void 0 : e.properties) == null ? void 0 : F$1.metastring, h$2 = f$1 == null ? void 0 : f$1.match(es), b$1 = h$2 ? Number.parseInt(h$2[1], 10) : void 0, g$1 = b$1 !== void 0 && b$1 >= 1 ? b$1 : void 0, v$1 = !(f$1 ? ts.test(f$1) : false) && i !== false, w$1 = "";
	if ((0, import_react.isValidElement)(o) && o.props && typeof o.props == "object" && "children" in o.props && typeof o.props.children == "string" ? w$1 = o.props.children : typeof o == "string" && (w$1 = o), u$1) {
		let j$1 = u$1.component;
		return (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: (0, import_jsx_runtime.jsx)(Oe, {}),
			children: (0, import_jsx_runtime.jsx)(j$1, {
				code: w$1,
				isIncomplete: c$1,
				language: m$1,
				meta: f$1
			})
		});
	}
	if (m$1 === "mermaid" && d$1) {
		let j$1 = ft(l, "mermaid"), z$1 = Fe(l, "download"), B$1 = Fe(l, "copy"), _ = Fe(l, "fullscreen"), Q$1 = Fe(l, "panZoom"), U$1 = j$1 && (z$1 || B$1 || _);
		return (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: (0, import_jsx_runtime.jsx)(Oe, {}),
			children: (0, import_jsx_runtime.jsxs)("div", {
				className: r("group relative my-4 flex w-full flex-col gap-2 rounded-xl border border-border bg-sidebar p-2", t),
				"data-streamdown": "mermaid-block",
				children: [
					(0, import_jsx_runtime.jsx)("div", {
						className: r("flex h-8 items-center text-muted-foreground text-xs"),
						children: (0, import_jsx_runtime.jsx)("span", {
							className: r("ml-1 font-mono lowercase"),
							children: "mermaid"
						})
					}),
					U$1 ? (0, import_jsx_runtime.jsx)("div", {
						className: r("pointer-events-none sticky top-2 z-10 -mt-10 flex h-8 items-center justify-end"),
						children: (0, import_jsx_runtime.jsxs)("div", {
							className: r("pointer-events-auto flex shrink-0 items-center gap-2 rounded-md border border-sidebar bg-sidebar/80 px-1.5 py-1 supports-[backdrop-filter]:bg-sidebar/70 supports-[backdrop-filter]:backdrop-blur"),
							"data-streamdown": "mermaid-block-actions",
							children: [
								z$1 ? (0, import_jsx_runtime.jsx)(co, {
									chart: w$1,
									config: a == null ? void 0 : a.config
								}) : null,
								B$1 ? (0, import_jsx_runtime.jsx)(Ae, { code: w$1 }) : null,
								_ ? (0, import_jsx_runtime.jsx)(fo, {
									chart: w$1,
									config: a == null ? void 0 : a.config
								}) : null
							]
						})
					}) : null,
					(0, import_jsx_runtime.jsx)("div", {
						className: r("rounded-md border border-border bg-background"),
						children: (0, import_jsx_runtime.jsx)(os, {
							chart: w$1,
							config: a == null ? void 0 : a.config,
							showControls: Q$1
						})
					})
				]
			})
		});
	}
	let P = ft(l, "code"), M$1 = To(l, "download"), H$1 = To(l, "copy");
	return (0, import_jsx_runtime.jsx)(st, {
		className: t,
		code: w$1,
		isIncomplete: c$1,
		language: m$1,
		lineNumbers: v$1,
		startLine: g$1,
		children: P ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [M$1 ? (0, import_jsx_runtime.jsx)(it, {
			code: w$1,
			language: m$1
		}) : null, H$1 ? (0, import_jsx_runtime.jsx)(Ae, {}) : null] }) : null
	});
}, Zo = (0, import_react.memo)(ss, (e, t) => e.className === t.className && qe(e.node, t.node));
Zo.displayName = "MarkdownCode";
var Xo = (0, import_react.memo)(oo, (e, t) => e.className === t.className && qe(e.node, t.node));
Xo.displayName = "MarkdownImg";
var Jo = (0, import_react.memo)(({ children: e, node: t, ...o }) => {
	let r = (Array.isArray(e) ? e : [e]).filter((s$1) => s$1 != null && s$1 !== "");
	if (r.length === 1 && (0, import_react.isValidElement)(r[0])) {
		let s$1 = r[0].props.node, a = s$1 == null ? void 0 : s$1.tagName;
		if (a === "img") return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e });
		if (a === "code" && "data-block" in r[0].props) return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e });
	}
	return (0, import_jsx_runtime.jsx)("p", {
		...o,
		children: e
	});
}, (e, t) => E(e, t));
Jo.displayName = "MarkdownParagraph";
var Ko = {
	ol: bt,
	li: Po,
	ul: Mo,
	hr: Io,
	strong: No,
	a: Lo,
	h1: Ro,
	h2: So,
	h3: Eo,
	h4: Ho,
	h5: Do,
	h6: Bo,
	table: Ao,
	thead: Oo,
	tbody: Vo,
	tr: jo,
	th: Fo,
	td: zo,
	blockquote: _o,
	code: Zo,
	img: Xo,
	pre: ({ children: e }) => (0, import_react.isValidElement)(e) ? (0, import_react.cloneElement)(e, { "data-block": "true" }) : e,
	sup: qo,
	sub: $o,
	p: Jo,
	section: Wo
};
var as = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/, is = /\p{L}/u;
function $e$1(e) {
	let t = e.replace(/^#{1,6}\s+/gm, "").replace(/(\*{1,3}|_{1,3})/g, "").replace(/`[^`]*`/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/^[\s>*\-+\d.]+/gm, "");
	for (let o of t) {
		if (as.test(o)) return "rtl";
		if (is.test(o)) return "ltr";
	}
	return "ltr";
}
var ls = /^[ \t]{0,3}(`{3,}|~{3,})/, cs = /^\|?[ \t]*:?-{1,}:?[ \t]*(\|[ \t]*:?-{1,}:?[ \t]*)*\|?$/, ht = (e) => {
	let t = e.split(`
`), o = null, n = 0;
	for (let r of t) {
		let s$1 = ls.exec(r);
		if (o === null) {
			if (s$1) {
				let a = s$1[1];
				o = a[0], n = a.length;
			}
		} else if (s$1) {
			let a = s$1[1], l = a[0], i = a.length;
			l === o && i >= n && (o = null, n = 0);
		}
	}
	return o !== null;
}, Uo = (e) => {
	let t = e.split(`
`);
	for (let o of t) {
		let n = o.trim();
		if (n.length > 0 && n.includes("|") && cs.test(n)) return true;
	}
	return false;
};
var Go = () => (e) => {
	visit(e, "html", (t, o, n) => {
		!n || typeof o != "number" || (n.children[o] = {
			type: "text",
			value: t.value
		});
	});
};
var Qo = [], en = { allowDangerousHtml: true }, We = /* @__PURE__ */ new WeakMap(), wt = class {
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
		this.keyCache = /* @__PURE__ */ new WeakMap();
		this.maxSize = 100;
	}
	generateCacheKey(t) {
		let o = this.keyCache.get(t);
		if (o) return o;
		let n = t.rehypePlugins, r = t.remarkPlugins, s$1 = t.remarkRehypeOptions;
		if (!(n || r || s$1)) {
			let p$1 = "default";
			return this.keyCache.set(t, p$1), p$1;
		}
		let a = (p$1) => {
			if (!p$1 || p$1.length === 0) return "";
			let m$1 = "";
			for (let u$1 = 0; u$1 < p$1.length; u$1 += 1) {
				let f$1 = p$1[u$1];
				if (u$1 > 0 && (m$1 += ","), Array.isArray(f$1)) {
					let [h$2, b$1] = f$1;
					if (typeof h$2 == "function") {
						let g$1 = We.get(h$2);
						g$1 || (g$1 = h$2.name, We.set(h$2, g$1)), m$1 += g$1;
					} else m$1 += String(h$2);
					m$1 += ":", m$1 += JSON.stringify(b$1);
				} else if (typeof f$1 == "function") {
					let h$2 = We.get(f$1);
					h$2 || (h$2 = f$1.name, We.set(f$1, h$2)), m$1 += h$2;
				} else m$1 += String(f$1);
			}
			return m$1;
		}, l = a(n), c$1 = `${a(r)}::${l}::${s$1 ? JSON.stringify(s$1) : ""}`;
		return this.keyCache.set(t, c$1), c$1;
	}
	get(t) {
		let o = this.generateCacheKey(t), n = this.cache.get(o);
		return n && (this.cache.delete(o), this.cache.set(o, n)), n;
	}
	set(t, o) {
		let n = this.generateCacheKey(t);
		if (this.cache.size >= this.maxSize) {
			let r = this.cache.keys().next().value;
			r && this.cache.delete(r);
		}
		this.cache.set(n, o);
	}
	clear() {
		this.cache.clear();
	}
}, tn = new wt(), Ct = (e) => {
	let t = ws(e), o = e.children || "";
	return Ps(t.runSync(t.parse(o), o), e);
}, ws = (e) => {
	let t = tn.get(e);
	if (t) return t;
	let o = ks(e);
	return tn.set(e, o), o;
}, Cs = (e) => e.some((t) => Array.isArray(t) ? t[0] === rehypeRaw : t === rehypeRaw), ks = (e) => {
	let t = e.rehypePlugins || Qo, o = e.remarkPlugins || Qo, n = Cs(t) ? o : [...o, Go], r = e.remarkRehypeOptions ? {
		...en,
		...e.remarkRehypeOptions
	} : en;
	return unified().use(remarkParse).use(n).use(remarkRehype, r).use(t);
}, on = (e) => e, vs = (e, t, o, n) => {
	o ? e.children.splice(t, 1) : e.children[t] = {
		type: "text",
		value: n
	};
}, xs = (e, t) => {
	var o;
	for (let n in urlAttributes) if (Object.hasOwn(urlAttributes, n) && Object.hasOwn(e.properties, n)) {
		let r = e.properties[n], s$1 = urlAttributes[n];
		(s$1 === null || s$1.includes(e.tagName)) && (e.properties[n] = (o = t(String(r || ""), n, e)) != null ? o : void 0);
	}
}, Ts = (e, t, o, n, r, s$1) => {
	let a = false;
	return n ? a = !n.includes(e.tagName) : r && (a = r.includes(e.tagName)), !a && s$1 && typeof t == "number" && (a = !s$1(e, t, o)), a;
}, Ps = (e, t) => {
	let { allowElement: o, allowedElements: n, disallowedElements: r, skipHtml: s$1, unwrapDisallowed: a, urlTransform: l } = t;
	if (o || n || r || s$1 || l) {
		let d$1 = l || on;
		visit(e, (c$1, p$1, m$1) => {
			if (c$1.type === "raw" && m$1 && typeof p$1 == "number") return vs(m$1, p$1, s$1, c$1.value), p$1;
			if (c$1.type === "element" && (xs(c$1, d$1), Ts(c$1, p$1, m$1, n, r, o) && m$1 && typeof p$1 == "number")) return a && c$1.children ? m$1.children.splice(p$1, 1, ...c$1.children) : m$1.children.splice(p$1, 1), p$1;
		});
	}
	return toJsxRuntime(e, {
		Fragment: import_jsx_runtime.Fragment,
		components: t.components,
		ignoreInvalidStyle: true,
		jsx: import_jsx_runtime.jsx,
		jsxs: import_jsx_runtime.jsxs,
		passKeys: true,
		passNode: true
	});
};
var Is = /\[\^[\w-]{1,200}\](?!:)/, Ns = /\[\^[\w-]{1,200}\]:/;
var Ls = /<(\w+)[\s>]/, Rs = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]), nn = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map(), Ss = (e) => {
	let t = e.toLowerCase(), o = nn.get(t);
	if (o) return o;
	let n = new RegExp(`<${t}(?=[\\s>/])[^>]*>`, "gi");
	return nn.set(t, n), n;
}, Es = (e) => {
	let t = e.toLowerCase(), o = rn.get(t);
	if (o) return o;
	let n = new RegExp(`</${t}(?=[\\s>])[^>]*>`, "gi");
	return rn.set(t, n), n;
}, sn = (e, t) => {
	if (Rs.has(t.toLowerCase())) return 0;
	let o = e.match(Ss(t));
	if (!o) return 0;
	let n = 0;
	for (let r of o) r.trimEnd().endsWith("/>") || (n += 1);
	return n;
}, an = (e, t) => {
	let o = e.match(Es(t));
	return o ? o.length : 0;
}, Hs = (e) => {
	let t = 0;
	for (let o = 0; o < e.length - 1; o += 1) e[o] === "$" && e[o + 1] === "$" && (t += 1, o += 1);
	return t;
}, kt = (e) => {
	let t = Is.test(e), o = Ns.test(e);
	if (t || o) return [e];
	let n = x.lex(e, { gfm: true }), r = [], s$1 = [], a = false;
	for (let l of n) {
		let i = l.raw, d$1 = r.length;
		if (s$1.length > 0) {
			r[d$1 - 1] += i;
			let c$1 = s$1.at(-1), p$1 = sn(i, c$1), m$1 = an(i, c$1);
			for (let u$1 = 0; u$1 < p$1; u$1 += 1) s$1.push(c$1);
			for (let u$1 = 0; u$1 < m$1; u$1 += 1) s$1.length > 0 && s$1.at(-1) === c$1 && s$1.pop();
			continue;
		}
		if (l.type === "html" && l.block) {
			let c$1 = i.match(Ls);
			if (c$1) {
				let p$1 = c$1[1];
				sn(i, p$1) > an(i, p$1) && s$1.push(p$1);
			}
		}
		if (d$1 > 0 && !a) {
			let c$1 = r[d$1 - 1];
			if (Hs(c$1) % 2 === 1) {
				r[d$1 - 1] = c$1 + i;
				continue;
			}
		}
		r.push(i), l.type !== "space" && (a = l.type === "code");
	}
	return r;
};
var ln = (e, t) => {
	if (!t.length) return e;
	let o = e;
	for (let n of t) {
		let r = new RegExp(`(<${n}(?=[\\s>/])[^>]*>)([\\s\\S]*?)(</${n}\\s*>)`, "gi");
		o = o.replace(r, (s$1, a, l, i) => {
			if (!l.includes(`

`)) return a + l + i;
			let d$1 = l.replace(/\n\n/g, `
<!---->
`);
			return `${a}${(d$1.startsWith(`
`) ? "" : `
`) + d$1 + (d$1.endsWith(`
`) ? "" : `
`)}${i}

`;
		});
	}
	return o;
};
var Ds = /([\\`*_~[\]|])/g, Bs = (e) => e.replace(Ds, "\\$1"), cn = (e, t) => {
	if (!t.length) return e;
	let o = e;
	for (let n of t) {
		let r = new RegExp(`(<${n}(?=[\\s>/])[^>]*>)([\\s\\S]*?)(</${n}\\s*>)`, "gi");
		o = o.replace(r, (s$1, a, l, i) => {
			return a + Bs(l).replace(/\n\n/g, "&#10;&#10;") + i;
		});
	}
	return o;
};
var dn = (e) => e.type === "text" ? e.value : "children" in e && Array.isArray(e.children) ? e.children.map(dn).join("") : "", mn = (e) => (t) => {
	if (!e || e.length === 0) return;
	let o = new Set(e.map((n) => n.toLowerCase()));
	visit(t, "element", (n) => {
		if (o.has(n.tagName.toLowerCase())) {
			let r = dn(n);
			n.children = r ? [{
				type: "text",
				value: r
			}] : [];
		}
	});
};
var un = () => (e) => {
	visit(e, "code", (t) => {
		var o, n;
		t.meta && (t.data = (o = t.data) != null ? o : {}, t.data.hProperties = {
			...(n = t.data.hProperties) != null ? n : {},
			metastring: t.meta
		});
	});
};
var Zs = /^[ \t]*<[\w!/?-]/, Xs = /(^|\n)[ \t]{4,}(?=<[\w!/?-])/g, Js = (e) => typeof e != "string" || e.length === 0 || !Zs.test(e) ? e : e.replace(Xs, "$1"), bn, hn, yn, wn, Ze = {
	...defaultSchema,
	protocols: {
		...defaultSchema.protocols,
		href: [...(hn = (bn = defaultSchema.protocols) == null ? void 0 : bn.href) != null ? hn : [], "tel"]
	},
	attributes: {
		...defaultSchema.attributes,
		code: [...(wn = (yn = defaultSchema.attributes) == null ? void 0 : yn.code) != null ? wn : [], "metastring"]
	}
}, xt = {
	raw: rehypeRaw,
	sanitize: [rehypeSanitize, Ze],
	harden: [harden, {
		allowedImagePrefixes: ["*"],
		allowedLinkPrefixes: ["*"],
		allowedProtocols: ["*"],
		defaultOrigin: void 0,
		allowDataImages: true
	}]
}, Ks = {
	gfm: [remarkGfm, {}],
	codeMeta: un
}, gn = Object.values(xt), Us = Object.values(Ks), Gs = {
	block: " ▋",
	circle: " ●"
}, vn = ["github-light", "github-dark"], xn = { enabled: true }, R = (0, import_react.createContext)({
	shikiTheme: vn,
	controls: true,
	isAnimating: false,
	lineNumbers: true,
	mode: "streaming",
	mermaid: void 0,
	linkSafety: xn
}), Tn = (0, import_react.memo)(({ content: e, shouldParseIncompleteMarkdown: t, shouldNormalizeHtmlIndentation: o, index: n, isIncomplete: r, dir: s$1, animatePlugin: a, ...l }) => {
	if (a) {
		let c$1 = a.getLastRenderCharCount();
		a.setPrevContentLength(c$1);
	}
	let i = typeof e == "string" && o ? Js(e) : e, d$1 = (0, import_jsx_runtime.jsx)(Ct, {
		...l,
		children: i
	});
	return (0, import_jsx_runtime.jsx)(et.Provider, {
		value: r,
		children: s$1 ? (0, import_jsx_runtime.jsx)("div", {
			dir: s$1,
			style: { display: "contents" },
			children: d$1
		}) : d$1
	});
}, (e, t) => {
	if (e.content !== t.content || e.shouldNormalizeHtmlIndentation !== t.shouldNormalizeHtmlIndentation || e.index !== t.index || e.isIncomplete !== t.isIncomplete || e.dir !== t.dir) return false;
	if (e.components !== t.components) {
		let o = Object.keys(e.components || {}), n = Object.keys(t.components || {});
		if (o.length !== n.length || o.some((r) => {
			var s$1, a;
			return ((s$1 = e.components) == null ? void 0 : s$1[r]) !== ((a = t.components) == null ? void 0 : a[r]);
		})) return false;
	}
	return !(e.rehypePlugins !== t.rehypePlugins || e.remarkPlugins !== t.remarkPlugins);
});
Tn.displayName = "Block";
var Qs = (0, import_react.memo)(({ children: e, mode: t = "streaming", dir: o, parseIncompleteMarkdown: n = true, normalizeHtmlIndentation: r = false, components: s$1, rehypePlugins: a = gn, remarkPlugins: l = Us, className: i, shikiTheme: d$1 = vn, mermaid: c$1, controls: p$1 = true, isAnimating: m$1 = false, animated: u$1, BlockComponent: f$1 = Tn, parseMarkdownIntoBlocksFn: h$2 = kt, caret: b$1, plugins: g$1, remend: T$1, linkSafety: v$1 = xn, lineNumbers: w$1 = true, allowedTags: P, literalTagContent: M$1, translations: H$1, icons: S$1, prefix: F$1, onAnimationStart: j$1, onAnimationEnd: z$1, ...B$1 }) => {
	let _ = (0, import_react.useId)(), [Q$1, U$1] = (0, import_react.useTransition)(), x$2 = (0, import_react.useMemo)(() => Dt(F$1), [F$1]), q$1 = (0, import_react.useRef)(null), X$1 = (0, import_react.useRef)(j$1), Re = (0, import_react.useRef)(z$1);
	X$1.current = j$1, Re.current = z$1, (0, import_react.useEffect)(() => {
		var A$1, K$1, ee;
		if (t === "static") return;
		let k$1 = q$1.current;
		if (q$1.current = m$1, k$1 === null) {
			m$1 && ((A$1 = X$1.current) == null || A$1.call(X$1));
			return;
		}
		m$1 && !k$1 ? (K$1 = X$1.current) == null || K$1.call(X$1) : !m$1 && k$1 && ((ee = Re.current) == null || ee.call(Re));
	}, [m$1, t]);
	let Je = (0, import_react.useMemo)(() => P ? Object.keys(P) : [], [P]), Se = (0, import_react.useMemo)(() => {
		if (typeof e != "string") return "";
		let k$1 = t === "streaming" && n ? $e(e, T$1) : e;
		return M$1 && M$1.length > 0 && (k$1 = cn(k$1, M$1)), Je.length > 0 && (k$1 = ln(k$1, Je)), k$1;
	}, [
		e,
		t,
		n,
		T$1,
		Je,
		M$1
	]), fe = (0, import_react.useMemo)(() => h$2(Se), [Se, h$2]), [Ln$1, Tt] = (0, import_react.useState)(fe);
	(0, import_react.useEffect)(() => {
		t === "streaming" && !ge ? U$1(() => {
			Tt(fe);
		}) : Tt(fe);
	}, [fe, t]);
	let J$1 = t === "streaming" ? Ln$1 : fe, Ke = (0, import_react.useMemo)(() => o === "auto" ? J$1.map($e$1) : void 0, [J$1, o]), Rn$1 = (0, import_react.useMemo)(() => J$1.map((k$1, A$1) => `${_}-${A$1}`), [J$1.length, _]), Ue = (0, import_react.useMemo)(() => u$1 === true ? "true" : u$1 ? JSON.stringify(u$1) : "", [u$1]), ge = (0, import_react.useMemo)(() => Ue ? Ue === "true" ? be() : be(u$1) : null, [Ue]), Pt = (0, import_react.useMemo)(() => {
		var k$1, A$1;
		return {
			shikiTheme: (A$1 = (k$1 = g$1 == null ? void 0 : g$1.code) == null ? void 0 : k$1.getThemes()) != null ? A$1 : d$1,
			controls: p$1,
			isAnimating: m$1,
			lineNumbers: w$1,
			mode: t,
			mermaid: c$1,
			linkSafety: v$1
		};
	}, [
		d$1,
		p$1,
		m$1,
		w$1,
		t,
		c$1,
		v$1,
		g$1 == null ? void 0 : g$1.code
	]), Mt = (0, import_react.useMemo)(() => ({
		...De,
		...H$1
	}), [(0, import_react.useMemo)(() => H$1 ? JSON.stringify(H$1) : "", [H$1])]), It = (0, import_react.useMemo)(() => {
		let { inlineCode: k$1, ...A$1 } = s$1 != null ? s$1 : {}, K$1 = {
			...Ko,
			...A$1
		};
		if (k$1) {
			let ee = K$1.code;
			K$1.code = (ie) => "data-block" in ie ? ee ? (0, import_react.createElement)(ee, ie) : null : (0, import_react.createElement)(k$1, ie);
		}
		return K$1;
	}, [s$1]), Nt = (0, import_react.useMemo)(() => {
		let k$1 = [];
		return g$1 != null && g$1.cjk && (k$1 = [...k$1, ...g$1.cjk.remarkPluginsBefore]), k$1 = [...k$1, ...l], g$1 != null && g$1.cjk && (k$1 = [...k$1, ...g$1.cjk.remarkPluginsAfter]), g$1 != null && g$1.math && (k$1 = [...k$1, g$1.math.remarkPlugin]), k$1;
	}, [
		l,
		g$1 == null ? void 0 : g$1.math,
		g$1 == null ? void 0 : g$1.cjk
	]), Lt = (0, import_react.useMemo)(() => {
		var A$1;
		let k$1 = a;
		if (P && Object.keys(P).length > 0 && a === gn) {
			let K$1 = {
				...Ze,
				tagNames: [...(A$1 = Ze.tagNames) != null ? A$1 : [], ...Object.keys(P)],
				attributes: {
					...Ze.attributes,
					...P
				}
			};
			k$1 = [
				xt.raw,
				[rehypeSanitize, K$1],
				xt.harden
			];
		}
		return M$1 && M$1.length > 0 && (k$1 = [...k$1, [mn, M$1]]), g$1 != null && g$1.math && (k$1 = [...k$1, g$1.math.rehypePlugin]), ge && m$1 && (k$1 = [...k$1, ge.rehypePlugin]), k$1;
	}, [
		a,
		g$1 == null ? void 0 : g$1.math,
		ge,
		m$1,
		P,
		M$1
	]), Ge = (0, import_react.useMemo)(() => {
		if (!m$1 || J$1.length === 0) return false;
		let k$1 = J$1.at(-1);
		return ht(k$1) || Uo(k$1);
	}, [m$1, J$1]), En$1 = (0, import_react.useMemo)(() => b$1 && m$1 && !Ge ? { "--streamdown-caret": `"${Gs[b$1]}"` } : void 0, [
		b$1,
		m$1,
		Ge
	]);
	return t === "static" ? (0, import_jsx_runtime.jsx)(Be.Provider, {
		value: Mt,
		children: (0, import_jsx_runtime.jsx)(Ve.Provider, {
			value: g$1 != null ? g$1 : null,
			children: (0, import_jsx_runtime.jsx)(R.Provider, {
				value: Pt,
				children: (0, import_jsx_runtime.jsx)(at, {
					icons: S$1,
					children: (0, import_jsx_runtime.jsx)(Ee.Provider, {
						value: x$2,
						children: (0, import_jsx_runtime.jsx)("div", {
							className: x$2("space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", i),
							dir: o === "auto" ? $e$1(Se) : o,
							children: (0, import_jsx_runtime.jsx)(Ct, {
								components: It,
								rehypePlugins: Lt,
								remarkPlugins: Nt,
								...B$1,
								children: Se
							})
						})
					})
				})
			})
		})
	}) : (0, import_jsx_runtime.jsx)(Be.Provider, {
		value: Mt,
		children: (0, import_jsx_runtime.jsx)(Ve.Provider, {
			value: g$1 != null ? g$1 : null,
			children: (0, import_jsx_runtime.jsx)(R.Provider, {
				value: Pt,
				children: (0, import_jsx_runtime.jsx)(at, {
					icons: S$1,
					children: (0, import_jsx_runtime.jsx)(Ee.Provider, {
						value: x$2,
						children: (0, import_jsx_runtime.jsxs)("div", {
							className: x$2("space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", b$1 && !Ge ? "[&>*:last-child]:after:inline [&>*:last-child]:after:align-baseline [&>*:last-child]:after:content-[var(--streamdown-caret)]" : null, i),
							style: En$1,
							children: [J$1.length === 0 && b$1 && m$1 && (0, import_jsx_runtime.jsx)("span", {}), J$1.map((k$1, A$1) => {
								var ie;
								let K$1 = A$1 === J$1.length - 1, ee = m$1 && K$1 && ht(k$1);
								return (0, import_jsx_runtime.jsx)(f$1, {
									animatePlugin: ge,
									components: It,
									content: k$1,
									dir: (ie = Ke == null ? void 0 : Ke[A$1]) != null ? ie : o !== "auto" ? o : void 0,
									index: A$1,
									isIncomplete: ee,
									rehypePlugins: Lt,
									remarkPlugins: Nt,
									shouldNormalizeHtmlIndentation: r,
									shouldParseIncompleteMarkdown: n,
									...B$1
								}, Rn$1[A$1]);
							})]
						})
					})
				})
			})
		})
	});
}, (e, t) => e.children === t.children && e.shikiTheme === t.shikiTheme && e.isAnimating === t.isAnimating && e.animated === t.animated && e.mode === t.mode && e.plugins === t.plugins && e.className === t.className && e.linkSafety === t.linkSafety && e.lineNumbers === t.lineNumbers && e.normalizeHtmlIndentation === t.normalizeHtmlIndentation && e.literalTagContent === t.literalTagContent && JSON.stringify(e.translations) === JSON.stringify(t.translations) && e.prefix === t.prefix && e.dir === t.dir);
Qs.displayName = "Streamdown";
var Nn = ({ children: e, className: t, minZoom: o = .5, maxZoom: n = 3, zoomStep: r = .1, showControls: s$1 = true, initialZoom: a = 1, fullscreen: l = false }) => {
	let { RotateCcwIcon: i, ZoomInIcon: d$1, ZoomOutIcon: c$1 } = L(), p$1 = y(), m$1 = (0, import_react.useRef)(null), u$1 = (0, import_react.useRef)(null), [f$1, h$2] = (0, import_react.useState)(a), [b$1, g$1] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), [T$1, v$1] = (0, import_react.useState)(false), [w$1, P] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), [M$1, H$1] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), S$1 = (0, import_react.useCallback)((x$2) => {
		h$2((q$1) => Math.max(o, Math.min(n, q$1 + x$2)));
	}, [o, n]), F$1 = (0, import_react.useCallback)(() => {
		S$1(r);
	}, [S$1, r]), j$1 = (0, import_react.useCallback)(() => {
		S$1(-r);
	}, [S$1, r]), z$1 = (0, import_react.useCallback)(() => {
		h$2(a), g$1({
			x: 0,
			y: 0
		});
	}, [a]), B$1 = (0, import_react.useCallback)((x$2) => {
		x$2.preventDefault();
		S$1(x$2.deltaY > 0 ? -r : r);
	}, [S$1, r]), _ = (0, import_react.useCallback)((x$2) => {
		if (x$2.button !== 0 || x$2.isPrimary === false) return;
		v$1(true), P({
			x: x$2.clientX,
			y: x$2.clientY
		}), H$1(b$1);
		let q$1 = x$2.currentTarget;
		q$1 instanceof HTMLElement && q$1.setPointerCapture(x$2.pointerId);
	}, [b$1]), Q$1 = (0, import_react.useCallback)((x$2) => {
		if (!T$1) return;
		x$2.preventDefault();
		let q$1 = x$2.clientX - w$1.x, X$1 = x$2.clientY - w$1.y;
		g$1({
			x: M$1.x + q$1,
			y: M$1.y + X$1
		});
	}, [
		T$1,
		w$1,
		M$1
	]), U$1 = (0, import_react.useCallback)((x$2) => {
		v$1(false);
		let q$1 = x$2.currentTarget;
		q$1 instanceof HTMLElement && q$1.releasePointerCapture(x$2.pointerId);
	}, []);
	return (0, import_react.useEffect)(() => {
		let x$2 = m$1.current;
		if (x$2) return x$2.addEventListener("wheel", B$1, { passive: false }), () => {
			x$2.removeEventListener("wheel", B$1);
		};
	}, [B$1]), (0, import_react.useEffect)(() => {
		let x$2 = u$1.current;
		if (x$2 && T$1) return document.body.style.userSelect = "none", x$2.addEventListener("pointermove", Q$1, { passive: false }), x$2.addEventListener("pointerup", U$1), x$2.addEventListener("pointercancel", U$1), () => {
			document.body.style.userSelect = "", x$2.removeEventListener("pointermove", Q$1), x$2.removeEventListener("pointerup", U$1), x$2.removeEventListener("pointercancel", U$1);
		};
	}, [
		T$1,
		Q$1,
		U$1
	]), (0, import_jsx_runtime.jsxs)("div", {
		className: p$1("relative flex flex-col", l ? "h-full w-full" : "min-h-28 w-full", t),
		ref: m$1,
		style: { cursor: T$1 ? "grabbing" : "grab" },
		children: [s$1 ? (0, import_jsx_runtime.jsxs)("div", {
			className: p$1("absolute z-10 flex flex-col gap-1 rounded-md border border-border bg-background/80 p-1 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-sm", l ? "bottom-4 left-4" : "bottom-2 left-2"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: p$1("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"),
					disabled: f$1 >= n,
					onClick: F$1,
					title: "Zoom in",
					type: "button",
					children: (0, import_jsx_runtime.jsx)(d$1, { size: 16 })
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: p$1("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"),
					disabled: f$1 <= o,
					onClick: j$1,
					title: "Zoom out",
					type: "button",
					children: (0, import_jsx_runtime.jsx)(c$1, { size: 16 })
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: p$1("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"),
					onClick: z$1,
					title: "Reset zoom and pan",
					type: "button",
					children: (0, import_jsx_runtime.jsx)(i, { size: 16 })
				})
			]
		}) : null, (0, import_jsx_runtime.jsx)("div", {
			className: p$1("flex-1 origin-center transition-transform duration-150 ease-out", l ? "flex h-full w-full items-center justify-center" : "flex w-full items-center justify-center"),
			onPointerDown: _,
			ref: u$1,
			role: "application",
			style: {
				transform: `translate(${b$1.x}px, ${b$1.y}px) scale(${f$1})`,
				transformOrigin: "center center",
				touchAction: "none",
				willChange: "transform"
			},
			children: e
		})]
	});
};
var po = ({ chart: e, className: t, config: o, fullscreen: n = false, showControls: r = true }) => {
	let s$1 = y(), [a, l] = (0, import_react.useState)(null), [i, d$1] = (0, import_react.useState)(false), [c$1, p$1] = (0, import_react.useState)(""), [m$1, u$1] = (0, import_react.useState)(""), [f$1, h$2] = (0, import_react.useState)(0), { mermaid: b$1 } = (0, import_react.useContext)(R), g$1 = de(), T$1 = b$1 == null ? void 0 : b$1.errorComponent, { shouldRender: v$1, containerRef: w$1 } = Rt({ immediate: n });
	if ((0, import_react.useEffect)(() => {
		if (!v$1) return;
		if (!g$1) {
			l("Mermaid plugin not available. Please add the mermaid plugin to enable diagram rendering.");
			return;
		}
		(async () => {
			try {
				l(null), d$1(!0);
				let H$1 = g$1.getMermaid(o), S$1 = e.split("").reduce((z$1, B$1) => (z$1 << 5) - z$1 + B$1.charCodeAt(0) | 0, 0), F$1 = `mermaid-${Math.abs(S$1)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: j$1 } = await H$1.render(F$1, e);
				p$1(j$1), u$1(j$1);
			} catch (H$1) {
				if (!(m$1 || c$1)) l(H$1 instanceof Error ? H$1.message : "Failed to render Mermaid chart");
			} finally {
				d$1(false);
			}
		})();
	}, [
		e,
		o,
		f$1,
		v$1,
		g$1
	]), !(v$1 || c$1 || m$1)) return (0, import_jsx_runtime.jsx)("div", {
		className: s$1("my-4 min-h-[200px]", t),
		ref: w$1
	});
	if (i && !c$1 && !m$1) return (0, import_jsx_runtime.jsx)("div", {
		className: s$1("my-4 flex justify-center p-4", t),
		ref: w$1,
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: s$1("flex items-center space-x-2 text-muted-foreground"),
			children: [(0, import_jsx_runtime.jsx)("div", { className: s$1("h-4 w-4 animate-spin rounded-full border-current border-b-2") }), (0, import_jsx_runtime.jsx)("span", {
				className: s$1("text-sm"),
				children: "Loading diagram..."
			})]
		})
	});
	if (a && !c$1 && !m$1) {
		let M$1 = () => h$2((H$1) => H$1 + 1);
		return T$1 ? (0, import_jsx_runtime.jsx)("div", {
			ref: w$1,
			children: (0, import_jsx_runtime.jsx)(T$1, {
				chart: e,
				error: a,
				retry: M$1
			})
		}) : (0, import_jsx_runtime.jsxs)("div", {
			className: s$1("rounded-md bg-red-50 p-4", t),
			ref: w$1,
			children: [(0, import_jsx_runtime.jsxs)("p", {
				className: s$1("font-mono text-red-700 text-sm"),
				children: ["Mermaid Error: ", a]
			}), (0, import_jsx_runtime.jsxs)("details", {
				className: s$1("mt-2"),
				children: [(0, import_jsx_runtime.jsx)("summary", {
					className: s$1("cursor-pointer text-red-600 text-xs"),
					children: "Show Code"
				}), (0, import_jsx_runtime.jsx)("pre", {
					className: s$1("mt-2 overflow-x-auto rounded bg-red-100 p-2 text-red-800 text-xs"),
					children: e
				})]
			})]
		});
	}
	let P = c$1 || m$1;
	return (0, import_jsx_runtime.jsx)("div", {
		className: s$1("size-full", t),
		"data-streamdown": "mermaid",
		ref: w$1,
		children: (0, import_jsx_runtime.jsx)(Nn, {
			className: s$1(n ? "size-full overflow-hidden" : "overflow-hidden", t),
			fullscreen: n,
			maxZoom: 3,
			minZoom: .5,
			showControls: r,
			zoomStep: .1,
			children: (0, import_jsx_runtime.jsx)("div", {
				"aria-label": "Mermaid chart",
				className: s$1("flex justify-center", n ? "size-full items-center" : null),
				dangerouslySetInnerHTML: { __html: P },
				role: "img"
			})
		})
	});
};
export { R as a, tt as c, webNamespaces as d, h$1 as f, Qs as i, ue as l, Ks as n, on as o, s as p, Li as r, po as s, At as t, xt as u };

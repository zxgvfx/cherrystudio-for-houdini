import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { O as visit } from "./lib-C_HyqSGx.js";
import { i as Qs, n as Ks, o as on, u as xt } from "./chunk-BO2N2NFS-CPhdpqIF.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const MarkdownBlockContext = (0, import_react.createContext)(null);
function useMarkdownBlockContext() {
	return (0, import_react.use)(MarkdownBlockContext);
}
var alertRegex = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i;
var alertLegacyRegex = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)(\/.*)?\]/i;
const remarkAlert = ({ legacyTitle = false, tagName = "div" } = {}) => {
	return (tree) => {
		visit(tree, "blockquote", (node, index, parent) => {
			let alertType = "";
			let title = "";
			let isNext = true;
			let child = node.children.map((item) => {
				if (isNext && item.type === "paragraph") {
					const firstNode = item.children[0];
					const text = firstNode.type === "text" ? firstNode.value : "";
					const reg = legacyTitle ? alertLegacyRegex : alertRegex;
					const match = text.match(reg);
					if (match) {
						isNext = false;
						alertType = match[1].toLocaleLowerCase();
						title = legacyTitle ? match[2] || alertType.toLocaleUpperCase() : alertType.toLocaleUpperCase();
						if (text.includes("\n")) item.children[0] = {
							type: "text",
							value: text.replace(reg, "").replace(/^\n+/, "")
						};
						if (!text.includes("\n")) {
							const itemChild = [];
							item.children.forEach((item$1, idx) => {
								if (idx == 0) return;
								if (idx == 1 && item$1.type === "break") return;
								itemChild.push(item$1);
							});
							item.children = [...itemChild];
						}
					}
				}
				return item;
			});
			if (!!alertType) {
				node.data = {
					hName: tagName,
					hProperties: {
						className: ["markdown-alert", `markdown-alert-${alertType}`],
						dir: "auto"
					}
				};
				child.unshift({
					type: "paragraph",
					children: [getAlertIcon(alertType), {
						type: "text",
						value: title.replace(/^\//, "")
					}],
					data: { hProperties: {
						className: "markdown-alert-title",
						dir: "auto"
					} }
				});
			}
			node.children = [...child];
		});
	};
};
var lib_default = remarkAlert;
function getAlertIcon(type) {
	return {
		type: "emphasis",
		data: {
			hName: "svg",
			hProperties: {
				className: ["octicon"],
				viewBox: "0 0 16 16",
				width: "16",
				height: "16",
				ariaHidden: "true"
			}
		},
		children: [{
			type: "emphasis",
			data: {
				hName: "path",
				hProperties: { d: pathData[type] ?? "" }
			},
			children: []
		}]
	};
}
var pathData = {
	note: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
	tip: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z",
	important: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
	warning: "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
	caution: "M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
};
function createSlugger() {
	const seen = /* @__PURE__ */ new Map();
	const normalize = (text) => {
		return (text || "section").toLowerCase().trim().replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/["'`(){}[\]:;!?.,]/g, "").replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/-{2,}/g, "-").replace(/^-|-$/g, "") || "section";
	};
	const slug = (text) => {
		const base = normalize(text);
		const count = seen.get(base) || 0;
		seen.set(base, count + 1);
		return count === 0 ? base : `${base}-${count}`;
	};
	return { slug };
}
function extractTextFromNode(node) {
	if (!node) return "";
	if (typeof node.value === "string") return node.value;
	if (node.children?.length) return node.children.map(extractTextFromNode).join("");
	return "";
}
function rehypeHeadingIds(options) {
	return (tree) => {
		const slugger = createSlugger();
		const prefix = options?.prefix ? `${options.prefix}--` : "";
		visit(tree, "element", (node) => {
			if (!node || typeof node.tagName !== "string") return;
			const tag = node.tagName.toLowerCase();
			if (!/^h[1-6]$/.test(tag)) return;
			const text = extractTextFromNode(node);
			const id = prefix + slugger.slug(text);
			node.properties = node.properties || {};
			if (!node.properties.id) node.properties.id = id;
		});
	};
}
var rewriteSvgReference = (value, idMap) => {
	let rewritten = value.replace(/url\(\s*(['"]?)#([^'")\s]+)\1\s*\)/g, (match, quote, id) => {
		const prefixedId = idMap.get(id);
		return prefixedId ? `url(${quote}#${prefixedId}${quote})` : match;
	});
	if (rewritten.startsWith("#")) {
		const id = rewritten.slice(1);
		const prefixedId = idMap.get(id);
		if (prefixedId) rewritten = `#${prefixedId}`;
	}
	return rewritten;
};
var rewriteSvgProperty = (value, idMap) => {
	if (typeof value === "string") return rewriteSvgReference(value, idMap);
	if (Array.isArray(value)) return value.map((item) => rewriteSvgProperty(item, idMap));
	return value;
};
var walkElement = (node, visitor) => {
	if (!node || typeof node !== "object") return;
	if (node.type === "element") visitor(node);
	if (Array.isArray(node.children)) for (const child of node.children) walkElement(child, visitor);
};
function rehypePrefixSvgReferences(clobberPrefix = "user-content-") {
	return (tree) => {
		if (!clobberPrefix) return;
		visit(tree, "element", (svgNode) => {
			if (svgNode.tagName !== "svg") return;
			const idMap = /* @__PURE__ */ new Map();
			walkElement(svgNode, (node) => {
				const id = node.properties?.id;
				if (typeof id === "string" && id.startsWith(clobberPrefix)) idMap.set(id.slice(clobberPrefix.length), id);
			});
			if (idMap.size === 0) return;
			walkElement(svgNode, (node) => {
				const properties = node.properties;
				if (!properties) return;
				for (const key of Object.keys(properties)) properties[key] = rewriteSvgProperty(properties[key], idMap);
			});
		});
	};
}
var isNumeric = (value) => {
	if (typeof value === "string" && value.trim() !== "") return /^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim());
	return false;
};
var isNegativeNumeric = (value) => /^-\d/.test(value.trim());
var isSafeCssLength = (value) => /^(?:\d+\.?\d*|\.\d+)(?:px|pt|em|rem|%|vw|vh|cm|mm|in)?$/i.test(value.trim());
var isSafeSvgDimension = (value) => isNumeric(value) || isSafeCssLength(value);
var toCssMaxWidth = (width) => {
	if (isNegativeNumeric(width)) return null;
	if (isNumeric(width)) return `${width}px`;
	return isSafeCssLength(width) ? width : null;
};
function rehypeScalableSvg() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "svg") {
				const properties = node.properties;
				const hasViewBox = "viewBox" in properties;
				const width = properties.width?.trim();
				const height = properties.height?.trim();
				if (width && !isSafeSvgDimension(width)) delete properties.width;
				if (height && !isSafeSvgDimension(height)) delete properties.height;
				if (width) {
					const cssMaxWidth = toCssMaxWidth(width);
					if (cssMaxWidth) {
						const existingStyle = properties.style ? String(properties.style).trim().replace(/;$/, "") : "";
						const maxWidth = `max-width: ${cssMaxWidth}`;
						properties.style = existingStyle ? `${existingStyle}; ${maxWidth}` : maxWidth;
					}
				}
				if (!hasViewBox && isNumeric(width) && isNumeric(height)) {
					properties.viewBox = `0 0 ${width} ${height}`;
					properties.width = "100%";
					delete properties.height;
				} else if (!hasViewBox && width && height) properties["data-needs-measurement"] = "true";
				node.properties = properties;
			}
		});
	};
}
var rehype_scalable_svg_default = rehypeScalableSvg;
const SVG_ELEMENT_REGEX = /<svg[\s>]/i;
const DISALLOWED_ELEMENTS = ["iframe", "script"];
const SVG_ELEMENTS = [
	"svg",
	"defs",
	"desc",
	"title",
	"symbol",
	"use",
	"g",
	"circle",
	"clipPath",
	"ellipse",
	"filter",
	"feBlend",
	"feColorMatrix",
	"feComposite",
	"feDropShadow",
	"feFlood",
	"feGaussianBlur",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"feTile",
	"feTurbulence",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"stop",
	"text",
	"textPath",
	"tspan"
];
const SVG_ATTRIBUTES = [
	"aria-label",
	"ariaHidden",
	"baseFrequency",
	"className",
	"clipPath",
	"clip-path",
	"clipRule",
	"clip-rule",
	"colorInterpolationFilters",
	"color-interpolation-filters",
	"cx",
	"cy",
	"d",
	"data-needs-measurement",
	"dominantBaseline",
	"dominant-baseline",
	"dx",
	"dy",
	"fill",
	"fillOpacity",
	"fill-opacity",
	"fillRule",
	"fill-rule",
	"filter",
	"floodColor",
	"flood-color",
	"floodOpacity",
	"flood-opacity",
	"fontFamily",
	"font-family",
	"fontSize",
	"font-size",
	"fontStyle",
	"font-style",
	"fontWeight",
	"font-weight",
	"gradientTransform",
	"gradientUnits",
	"height",
	"href",
	"id",
	"in",
	"in2",
	"k1",
	"k2",
	"k3",
	"k4",
	"lengthAdjust",
	"markerEnd",
	"marker-end",
	"markerHeight",
	"markerMid",
	"marker-mid",
	"markerStart",
	"marker-start",
	"markerWidth",
	"mask",
	"mode",
	"numOctaves",
	"offset",
	"opacity",
	"operator",
	"orient",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"points",
	"preserveAspectRatio",
	"r",
	"refX",
	"refY",
	"result",
	"role",
	"rotate",
	"rx",
	"ry",
	"scale",
	"seed",
	"spreadMethod",
	"stdDeviation",
	"stitchTiles",
	"stopColor",
	"stop-color",
	"stopOpacity",
	"stop-opacity",
	"stroke",
	"strokeDasharray",
	"stroke-dasharray",
	"strokeDashoffset",
	"stroke-dashoffset",
	"strokeLinecap",
	"stroke-linecap",
	"strokeLinejoin",
	"stroke-linejoin",
	"strokeMiterlimit",
	"stroke-miterlimit",
	"strokeOpacity",
	"stroke-opacity",
	"strokeWidth",
	"stroke-width",
	"surfaceScale",
	"targetX",
	"targetY",
	"textAnchor",
	"text-anchor",
	"textLength",
	"transform",
	"type",
	"values",
	"viewBox",
	"width",
	"x",
	"y",
	"x1",
	"x2",
	"xlinkHref",
	"xLinkHref",
	"xlink:href",
	"xmlns",
	"xmlnsXlink",
	"xmlns:xlink",
	"y1",
	"y2"
];
function mergeUnique(...groups) {
	return Array.from(new Set(groups.flatMap((group) => group ?? [])));
}
function sanitizeAttributeName(attribute) {
	return Array.isArray(attribute) ? attribute[0] : attribute;
}
function createMarkdownSanitizeSchema(schema) {
	const svgAttributes = Object.fromEntries(SVG_ELEMENTS.map((tagName) => [tagName, mergeUnique(schema.attributes?.[tagName], SVG_ATTRIBUTES)]));
	const safeLinkProtocols = mergeUnique(schema.protocols?.href, ["http", "https"]);
	return {
		...schema,
		tagNames: mergeUnique(schema.tagNames, ["span"], SVG_ELEMENTS),
		strip: mergeUnique(schema.strip, ["style"]),
		attributes: {
			...schema.attributes,
			div: mergeUnique(schema.attributes?.div, [[
				"className",
				"markdown-alert",
				"markdown-alert-note",
				"markdown-alert-tip",
				"markdown-alert-important",
				"markdown-alert-warning",
				"markdown-alert-caution"
			]]),
			p: mergeUnique(schema.attributes?.p, [["className", "markdown-alert-title"]]),
			span: mergeUnique(schema.attributes?.span, [
				"data-composer-token-index",
				"dataComposerTokenIndex",
				"data-composer-token-block",
				"dataComposerTokenBlock"
			]),
			sup: mergeUnique(schema.attributes?.sup?.filter((attribute) => sanitizeAttributeName(attribute) !== "dataCitation"), [["dataCitation", /^[1-9]\d*$/]]),
			...svgAttributes
		},
		protocols: {
			...schema.protocols,
			href: safeLinkProtocols,
			xlinkHref: safeLinkProtocols,
			xLinkHref: safeLinkProtocols,
			"xlink:href": safeLinkProtocols,
			src: mergeUnique(schema.protocols?.src, ["data"])
		}
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var STREAMDOWN_DEFAULT_REMARK_PLUGINS = Object.values(Ks);
function resolveDefaultRehypePlugins() {
	const plugins = xt;
	const sanitize = plugins.sanitize;
	if (!plugins.raw || !plugins.harden || !Array.isArray(sanitize) || sanitize.length < 2) throw new Error("Unexpected Streamdown defaultRehypePlugins shape");
	return {
		raw: plugins.raw,
		sanitizeFn: sanitize[0],
		sanitizeSchema: sanitize[1],
		harden: plugins.harden
	};
}
function MarkdownCore({ id, children, components, plugins, extraRehypePlugins, extraRemarkPlugins, animated, mode, parseIncompleteMarkdown, className, disallowedElements = DISALLOWED_ELEMENTS, footnoteLabel = "Footnotes" }) {
	const hasSvgElement = (0, import_react.useMemo)(() => SVG_ELEMENT_REGEX.test(children), [children]);
	const remarkPlugins = (0, import_react.useMemo)(() => {
		const list = [...STREAMDOWN_DEFAULT_REMARK_PLUGINS, lib_default];
		if (extraRemarkPlugins?.length) list.push(...extraRemarkPlugins);
		return list;
	}, [extraRemarkPlugins]);
	const rehypePlugins = (0, import_react.useMemo)(() => {
		const { raw, sanitizeFn, sanitizeSchema, harden } = resolveDefaultRehypePlugins();
		const extendedSchema = createMarkdownSanitizeSchema(sanitizeSchema);
		const result = [raw];
		result.push([sanitizeFn, extendedSchema], ...hasSvgElement ? [rehype_scalable_svg_default] : [], [rehypePrefixSvgReferences, extendedSchema.clobberPrefix], harden, [rehypeHeadingIds, { prefix: `heading-${id}` }]);
		if (extraRehypePlugins?.length) result.push(...extraRehypePlugins);
		return result;
	}, [
		hasSvgElement,
		id,
		extraRehypePlugins
	]);
	const urlTransform = (0, import_react.useCallback)((value, key, node) => {
		if (key === "src" && /^data:image\/(?:png|jpeg);/i.test(value)) return value;
		return on(value, key, node);
	}, []);
	const remarkRehypeOptions = (0, import_react.useMemo)(() => ({
		footnoteLabel,
		footnoteLabelTagName: "h4",
		footnoteBackContent: " "
	}), [footnoteLabel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownBlockContext, {
		value: (0, import_react.useMemo)(() => ({ content: children }), [children]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: ["markdown", className].filter(Boolean).join(" "),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
				mode,
				plugins,
				rehypePlugins,
				remarkPlugins,
				components,
				disallowedElements,
				urlTransform,
				parseIncompleteMarkdown,
				normalizeHtmlIndentation: true,
				remarkRehypeOptions,
				animated: animated || void 0,
				isAnimating: !!animated && mode === "streaming",
				children
			})
		})
	});
}
function Markdown({ id, children, components, plugins, rehypePlugins, remarkPlugins, disallowedElements, className, footnoteLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownCore, {
		id,
		mode: "static",
		components,
		plugins,
		extraRehypePlugins: rehypePlugins,
		extraRemarkPlugins: remarkPlugins,
		disallowedElements,
		className,
		footnoteLabel,
		children
	});
}
export { useMarkdownBlockContext as a, extractTextFromNode as i, MarkdownCore as n, createSlugger as r, Markdown as t };

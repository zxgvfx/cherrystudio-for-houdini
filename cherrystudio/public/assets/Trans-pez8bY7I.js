import { c as __toESM, t as __commonJSMin } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { a as warn, i as isString, n as I18nContext, o as warnOnce, r as isObject } from "./useTranslation-DRFkwCLq.js";
import { n as getI18n, r as getDefaults } from "./initReactI18next-BofyZ-Nu.js";
var import_void_elements = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		"area": true,
		"base": true,
		"br": true,
		"col": true,
		"embed": true,
		"hr": true,
		"img": true,
		"input": true,
		"link": true,
		"meta": true,
		"param": true,
		"source": true,
		"track": true,
		"wbr": true
	};
})))());
var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function n(n$1) {
	var r$1 = {
		type: "tag",
		name: "",
		voidElement: !1,
		attrs: {},
		children: []
	}, i$1 = n$1.match(/<\/?([^\s]+?)[/\s>]/);
	if (i$1 && (r$1.name = i$1[1], (import_void_elements.default[i$1[1]] || "/" === n$1.charAt(n$1.length - 2)) && (r$1.voidElement = !0), r$1.name.startsWith("!--"))) {
		var s$1 = n$1.indexOf("-->");
		return {
			type: "comment",
			comment: -1 !== s$1 ? n$1.slice(4, s$1) : ""
		};
	}
	for (var a$1 = new RegExp(t), c$1 = null; null !== (c$1 = a$1.exec(n$1));) if (c$1[0].trim()) if (c$1[1]) {
		var o = c$1[1].trim(), l = [o, ""];
		o.indexOf("=") > -1 && (l = o.split("=")), r$1.attrs[l[0]] = l[1], a$1.lastIndex--;
	} else c$1[2] && (r$1.attrs[c$1[2]] = c$1[3].trim().substring(1, c$1[3].length - 1));
	return r$1;
}
var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g, i = /^\s*$/, s = Object.create(null);
function a(e$1, t$1) {
	switch (t$1.type) {
		case "text": return e$1 + t$1.content;
		case "tag": return e$1 += "<" + t$1.name + (t$1.attrs ? function(e$2) {
			var t$2 = [];
			for (var n$1 in e$2) t$2.push(n$1 + "=\"" + e$2[n$1] + "\"");
			return t$2.length ? " " + t$2.join(" ") : "";
		}(t$1.attrs) : "") + (t$1.voidElement ? "/>" : ">"), t$1.voidElement ? e$1 : e$1 + t$1.children.reduce(a, "") + "</" + t$1.name + ">";
		case "comment": return e$1 + "<!--" + t$1.comment + "-->";
	}
}
var html_parse_stringify_module_default = {
	parse: function(e$1, t$1) {
		t$1 || (t$1 = {}), t$1.components || (t$1.components = s);
		var a$1, c$1 = [], o = [], l = -1, m = !1;
		if (0 !== e$1.indexOf("<")) {
			var u = e$1.indexOf("<");
			c$1.push({
				type: "text",
				content: -1 === u ? e$1 : e$1.substring(0, u)
			});
		}
		return e$1.replace(r, function(r$1, s$1) {
			if (m) {
				if (r$1 !== "</" + a$1.name + ">") return;
				m = !1;
			}
			var u$1, f = "/" !== r$1.charAt(1), h = r$1.startsWith("<!--"), p = s$1 + r$1.length, d = e$1.charAt(p);
			if (h) {
				var v = n(r$1);
				return l < 0 ? (c$1.push(v), c$1) : ((u$1 = o[l]).children.push(v), c$1);
			}
			if (f && (l++, "tag" === (a$1 = n(r$1)).type && t$1.components[a$1.name] && (a$1.type = "component", m = !0), a$1.voidElement || m || !d || "<" === d || a$1.children.push({
				type: "text",
				content: e$1.slice(p, e$1.indexOf("<", p))
			}), 0 === l && c$1.push(a$1), (u$1 = o[l - 1]) && u$1.children.push(a$1), o[l] = a$1), (!f || a$1.voidElement) && (l > -1 && (a$1.voidElement || a$1.name === r$1.slice(2, -1)) && (l--, a$1 = -1 === l ? c$1 : o[l]), !m && "<" !== d && d)) {
				u$1 = -1 === l ? c$1 : o[l].children;
				var x = e$1.indexOf("<", p), g = e$1.slice(p, -1 === x ? void 0 : x);
				i.test(g) && (g = " "), (x > -1 && l + u$1.length >= 0 || " " !== g) && u$1.push({
					type: "text",
					content: g
				});
			}
		}), c$1;
	},
	stringify: function(e$1) {
		return e$1.reduce(function(e$2, t$1) {
			return e$2 + a("", t$1);
		}, "");
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var hasChildren = (node, checkLength) => {
	if (!node) return false;
	const base = node.props ? node.props.children : node.children;
	if (checkLength) return base.length > 0;
	return !!base;
};
var getChildren = (node) => {
	if (!node) return [];
	const children = node.props ? node.props.children : node.children;
	return node.props && node.props.i18nIsDynamicList ? getAsArray(children) : children;
};
var hasValidReactChildren = (children) => Array.isArray(children) && children.every(import_react.isValidElement);
var getAsArray = (data) => Array.isArray(data) ? data : [data];
var mergeProps = (source, target) => {
	const newTarget = { ...target };
	newTarget.props = Object.assign(source.props, target.props);
	return newTarget;
};
const nodesToString = (children, i18nOptions) => {
	if (!children) return "";
	let stringNode = "";
	const childrenArray = getAsArray(children);
	const keepArray = i18nOptions.transSupportBasicHtmlNodes && i18nOptions.transKeepBasicHtmlNodesFor ? i18nOptions.transKeepBasicHtmlNodesFor : [];
	childrenArray.forEach((child, childIndex) => {
		if (isString(child)) stringNode += `${child}`;
		else if ((0, import_react.isValidElement)(child)) {
			const { props, type } = child;
			const childPropsCount = Object.keys(props).length;
			const shouldKeepChild = keepArray.indexOf(type) > -1;
			const childChildren = props.children;
			if (!childChildren && shouldKeepChild && !childPropsCount) stringNode += `<${type}/>`;
			else if (!childChildren && (!shouldKeepChild || childPropsCount) || props.i18nIsDynamicList) stringNode += `<${childIndex}></${childIndex}>`;
			else if (shouldKeepChild && childPropsCount === 1 && isString(childChildren)) stringNode += `<${type}>${childChildren}</${type}>`;
			else {
				const content = nodesToString(childChildren, i18nOptions);
				stringNode += `<${childIndex}>${content}</${childIndex}>`;
			}
		} else if (child === null) warn(`Trans: the passed in value is invalid - seems you passed in a null child.`);
		else if (isObject(child)) {
			const { format, ...clone } = child;
			const keys = Object.keys(clone);
			if (keys.length === 1) {
				const value = format ? `${keys[0]}, ${format}` : keys[0];
				stringNode += `{{${value}}}`;
			} else warn(`react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`, child);
		} else warn(`Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`, child);
	});
	return stringNode;
};
var renderNodes = (children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) => {
	if (targetString === "") return [];
	const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
	const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map((keep) => `<${keep}`).join("|")).test(targetString);
	if (!children && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
	const data = {};
	const getData = (childs) => {
		getAsArray(childs).forEach((child) => {
			if (isString(child)) return;
			if (hasChildren(child)) getData(getChildren(child));
			else if (isObject(child) && !(0, import_react.isValidElement)(child)) Object.assign(data, child);
		});
	};
	getData(children);
	const ast = html_parse_stringify_module_default.parse(`<0>${targetString}</0>`);
	const opts = {
		...data,
		...combinedTOpts
	};
	const renderInner = (child, node, rootReactNode) => {
		const childs = getChildren(child);
		const mappedChildren = mapAST(childs, node.children, rootReactNode);
		return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props && child.props.i18nIsDynamicList ? childs : mappedChildren;
	};
	const pushTranslatedJSX = (child, inner, mem, i$1, isVoid) => {
		if (child.dummy) {
			child.children = inner;
			mem.push((0, import_react.cloneElement)(child, { key: i$1 }, isVoid ? void 0 : inner));
		} else mem.push(...import_react.Children.map([child], (c$1) => {
			const props = { ...c$1.props };
			delete props.i18nIsDynamicList;
			return (0, import_react.createElement)(c$1.type, {
				...props,
				key: i$1,
				ref: c$1.ref
			}, isVoid ? null : inner);
		}));
	};
	const mapAST = (reactNode, astNode, rootReactNode) => {
		const reactNodes = getAsArray(reactNode);
		return getAsArray(astNode).reduce((mem, node, i$1) => {
			const translationContent = node.children && node.children[0] && node.children[0].content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
			if (node.type === "tag") {
				let tmp = reactNodes[parseInt(node.name, 10)];
				if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
				if (!tmp) tmp = {};
				const child = Object.keys(node.attrs).length !== 0 ? mergeProps({ props: node.attrs }, tmp) : tmp;
				const isElement = (0, import_react.isValidElement)(child);
				const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
				const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && isObject(child) && child.dummy && !isElement;
				const isKnownComponent = isObject(children) && Object.hasOwnProperty.call(children, node.name);
				if (isString(child)) {
					const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
					mem.push(value);
				} else if (hasChildren(child) || isValidTranslationWithChildren) pushTranslatedJSX(child, renderInner(child, node, rootReactNode), mem, i$1);
				else if (isEmptyTransWithHTML) pushTranslatedJSX(child, mapAST(reactNodes, node.children, rootReactNode), mem, i$1);
				else if (Number.isNaN(parseFloat(node.name))) if (isKnownComponent) pushTranslatedJSX(child, renderInner(child, node, rootReactNode), mem, i$1, node.voidElement);
				else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) if (node.voidElement) mem.push((0, import_react.createElement)(node.name, { key: `${node.name}-${i$1}` }));
				else {
					const inner = mapAST(reactNodes, node.children, rootReactNode);
					mem.push((0, import_react.createElement)(node.name, { key: `${node.name}-${i$1}` }, inner));
				}
				else if (node.voidElement) mem.push(`<${node.name} />`);
				else {
					const inner = mapAST(reactNodes, node.children, rootReactNode);
					mem.push(`<${node.name}>${inner}</${node.name}>`);
				}
				else if (isObject(child) && !isElement) {
					const content = node.children[0] ? translationContent : null;
					if (content) mem.push(content);
				} else pushTranslatedJSX(child, translationContent, mem, i$1, node.children.length !== 1 || !translationContent);
			} else if (node.type === "text") {
				const wrapTextNodes = i18nOptions.transWrapTextNodes;
				const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
				if (wrapTextNodes) mem.push((0, import_react.createElement)(wrapTextNodes, { key: `${node.name}-${i$1}` }, content));
				else mem.push(content);
			}
			return mem;
		}, []);
	};
	return getChildren(mapAST([{
		dummy: true,
		children: children || []
	}], ast, getAsArray(children || []))[0]);
};
function Trans(_ref) {
	let { children, count, parent, i18nKey, context, tOptions = {}, values, defaults, components, ns, i18n: i18nFromProps, t: tFromProps, shouldUnescape, ...additionalProps } = _ref;
	const i18n = i18nFromProps || getI18n();
	if (!i18n) {
		warnOnce("You will need to pass in an i18next instance by using i18nextReactModule");
		return children;
	}
	const t$1 = tFromProps || i18n.t.bind(i18n) || ((k) => k);
	const reactI18nextOptions = {
		...getDefaults(),
		...i18n.options && i18n.options.react
	};
	let namespaces = ns || t$1.ns || i18n.options && i18n.options.defaultNS;
	namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
	const nodeAsString = nodesToString(children, reactI18nextOptions);
	const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
	const { hashTransKey } = reactI18nextOptions;
	const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
	if (i18n.options && i18n.options.interpolation && i18n.options.interpolation.defaultVariables) values = values && Object.keys(values).length > 0 ? {
		...values,
		...i18n.options.interpolation.defaultVariables
	} : { ...i18n.options.interpolation.defaultVariables };
	const interpolationOverride = values || count !== void 0 || !children ? tOptions.interpolation : { interpolation: {
		...tOptions.interpolation,
		prefix: "#$?",
		suffix: "?$#"
	} };
	const combinedTOpts = {
		...tOptions,
		context: context || tOptions.context,
		count,
		...values,
		...interpolationOverride,
		defaultValue,
		ns: namespaces
	};
	const translation = key ? t$1(key, combinedTOpts) : defaultValue;
	if (components) Object.keys(components).forEach((c$1) => {
		const comp = components[c$1];
		if (typeof comp.type === "function" || !comp.props || !comp.props.children || translation.indexOf(`${c$1}/>`) < 0 && translation.indexOf(`${c$1} />`) < 0) return;
		function Componentized() {
			return (0, import_react.createElement)(import_react.Fragment, null, comp);
		}
		components[c$1] = (0, import_react.createElement)(Componentized);
	});
	const content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
	const useAsParent = parent !== void 0 ? parent : reactI18nextOptions.defaultTransParent;
	return useAsParent ? (0, import_react.createElement)(useAsParent, additionalProps, content) : content;
}
function Trans$1(_ref) {
	let { children, count, parent, i18nKey, context, tOptions = {}, values, defaults, components, ns, i18n: i18nFromProps, t: tFromProps, shouldUnescape, ...additionalProps } = _ref;
	const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	const t$1 = tFromProps || i18n && i18n.t.bind(i18n);
	return Trans({
		children,
		count,
		parent,
		i18nKey,
		context,
		tOptions,
		values,
		defaults,
		components,
		ns: ns || t$1 && t$1.ns || defaultNSFromContext || i18n && i18n.options && i18n.options.defaultNS,
		i18n,
		t: tFromProps,
		shouldUnescape,
		...additionalProps
	});
}
export { Trans$1 as t };

import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Parser } from "./Parser-DPwNZwi0.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const HTML_PREVIEW_DEFAULT_BASE_URL = "about:srcdoc";
const HTML_PREVIEW_IFRAME_SANDBOX = "allow-scripts allow-same-origin allow-forms";
const HTML_PREVIEW_RESTRICTED_SANDBOX = "";
const HTML_PREVIEW_RESTRICTED_CSP = "default-src 'none'; img-src data: blob: file:; media-src data: blob: file:; style-src 'unsafe-inline' file:; font-src data: file:";
var escapeHtmlAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
var LEADING_DOCUMENT_PREAMBLE_REGEX = /^(?:\s*(?:<!--[\s\S]*?-->|<!doctype[^>]*>|<\?[\s\S]*?\?>))*\s*(?:<html(?:\s[^>]*)?>\s*(?:<!--[\s\S]*?-->\s*)*)?/i;
function hasHtmlElement(html, elementName) {
	let found = false;
	new Parser({ onopentag(name) {
		if (name === elementName) found = true;
	} }, { lowerCaseTags: true }).end(html);
	return found;
}
function injectHtmlPreviewHeadElement(html, element) {
	const preambleEnd = html.match(LEADING_DOCUMENT_PREAMBLE_REGEX)?.[0].length ?? 0;
	const headMatch = html.slice(preambleEnd).match(/^<head(?:\s[^>]*)?>/i);
	if (headMatch?.index !== void 0) {
		const insertAt = preambleEnd + headMatch[0].length;
		return `${html.slice(0, insertAt)}${element}${html.slice(insertAt)}`;
	}
	return `${html.slice(0, preambleEnd)}<head>${element}</head>${html.slice(preambleEnd)}`;
}
function injectHtmlPreviewBase(html, baseUrl = HTML_PREVIEW_DEFAULT_BASE_URL) {
	if (!html.trim() || hasHtmlElement(html, "base")) return html;
	return injectHtmlPreviewHeadElement(html, `<base href="${escapeHtmlAttribute(baseUrl)}">`);
}
function injectHtmlPreviewCsp(html, csp) {
	if (!html.trim()) return html;
	return injectHtmlPreviewHeadElement(html, `<meta http-equiv="Content-Security-Policy" content="${escapeHtmlAttribute(csp)}">`);
}
var HtmlPreviewFrame_default = (0, import_react.memo)(({ html, title, baseUrl = HTML_PREVIEW_DEFAULT_BASE_URL, emptyText, sandbox = HTML_PREVIEW_IFRAME_SANDBOX, csp, iframeRef }) => {
	const withBase = injectHtmlPreviewBase(html, baseUrl);
	const srcDoc = csp ? injectHtmlPreviewCsp(withBase, csp) : withBase;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-frame",
		className: "h-full w-full overflow-hidden bg-white",
		children: html.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			ref: iframeRef,
			srcDoc,
			title,
			sandbox,
			className: "h-full w-full border-0 bg-white"
		}) : emptyText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: emptyText })
		}) : null
	});
});
export { injectHtmlPreviewHeadElement as a, HtmlPreviewFrame_default as i, HTML_PREVIEW_RESTRICTED_CSP as n, HTML_PREVIEW_RESTRICTED_SANDBOX as r, HTML_PREVIEW_IFRAME_SANDBOX as t };

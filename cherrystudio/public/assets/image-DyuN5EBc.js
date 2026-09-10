import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { r as resolver_default } from "./resolver-Bn-i1elC.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as AbsoluteFilePathSchema } from "./file-OKCzlHoD.js";
import { d as createFilePathHandle, t as fileUrlToPath } from "./file-CkrjUGO_.js";
import { t as parseDataUrl } from "./dataUrl-BEcI_lAg.js";
var version = "3.7.7";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64chs = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
var b64tab = ((a) => {
	let tab = {};
	a.forEach((c, i) => tab[c] = i);
	return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
	let u32, c0, c1, c2, asc = "";
	const pad = bin.length % 3;
	for (let i = 0; i < bin.length;) {
		if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError("invalid character found");
		u32 = c0 << 16 | c1 << 8 | c2;
		asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
	}
	return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
	const maxargs = 4096;
	let strs = [];
	for (let i = 0, l = u8a.length; i < l; i += maxargs) strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
	return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c) => {
	if (c.length < 2) {
		var cc = c.charCodeAt(0);
		return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	} else {
		var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
		return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	}
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
	switch (cccc.length) {
		case 4:
			var offset = ((7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3)) - 65536;
			return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
		case 3: return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
		default: return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
	}
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
	asc = asc.replace(/\s+/g, "");
	if (!b64re.test(asc)) throw new TypeError("malformed base64.");
	asc += "==".slice(2 - (asc.length & 3));
	let u24, bin = "", r1, r2;
	for (let i = 0; i < asc.length;) {
		u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
		bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
	}
	return bin;
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = (a) => _toUint8Array(_unURI(a));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
	if (typeof src !== "string") return false;
	const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
	return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
	return {
		value: v,
		enumerable: false,
		writable: true,
		configurable: true
	};
};
var extendString = function() {
	const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
	_add("fromBase64", function() {
		return decode(this);
	});
	_add("toBase64", function(urlsafe) {
		return encode(this, urlsafe);
	});
	_add("toBase64URI", function() {
		return encode(this, true);
	});
	_add("toBase64URL", function() {
		return encode(this, true);
	});
	_add("toUint8Array", function() {
		return toUint8Array(this);
	});
};
var extendUint8Array = function() {
	const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
	_add("toBase64", function(urlsafe) {
		return fromUint8Array(this, urlsafe);
	});
	_add("toBase64URI", function() {
		return fromUint8Array(this, true);
	});
	_add("toBase64URL", function() {
		return fromUint8Array(this, true);
	});
};
var extendBuiltins = () => {
	extendString();
	extendUint8Array();
};
var gBase64 = {
	version,
	VERSION,
	atob: _atob,
	atobPolyfill,
	btoa: _btoa,
	btoaPolyfill,
	fromBase64: decode,
	toBase64: encode,
	encode,
	encodeURI,
	encodeURL: encodeURI,
	utob,
	btou,
	decode,
	isValid,
	fromUint8Array,
	toUint8Array,
	extendString,
	extendUint8Array,
	extendBuiltins
};
var logger = loggerService.withContext("Utils:image");
var TRANSPARENT_IMAGE_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
var htmlToImagePromise;
var loadHtmlToImage = () => {
	htmlToImagePromise ??= __vitePreload(() => import("./es-tWK9fAWz.js"), [], import.meta.url).catch((error) => {
		htmlToImagePromise = void 0;
		throw error;
	});
	return htmlToImagePromise;
};
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") resolve(reader.result);
			else reject(/* @__PURE__ */ new Error("Failed to encode image blob"));
		};
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("Failed to read image blob"));
		reader.readAsDataURL(blob);
	});
}
async function inlineLocalImageSources(root) {
	const originalSources = [...root instanceof HTMLImageElement ? [root] : [], ...root.querySelectorAll("img")].filter((image) => image.src.startsWith("file://")).map((image) => ({
		image,
		src: image.getAttribute("src"),
		srcset: image.getAttribute("srcset")
	}));
	const dataUrlBySource = /* @__PURE__ */ new Map();
	await Promise.all(originalSources.map(async ({ image }) => {
		const source = image.src;
		let dataUrlPromise = dataUrlBySource.get(source);
		if (!dataUrlPromise) {
			dataUrlPromise = getImageBlobFromSource(source).then(blobToDataUrl);
			dataUrlBySource.set(source, dataUrlPromise);
		}
		try {
			image.removeAttribute("srcset");
			image.src = await dataUrlPromise;
		} catch (error) {
			logger.warn("Failed to inline local image for capture", error, { source });
		}
	}));
	return () => {
		for (const { image, src, srcset } of originalSources) {
			if (src === null) image.removeAttribute("src");
			else image.setAttribute("src", src);
			if (srcset === null) image.removeAttribute("srcset");
			else image.setAttribute("srcset", srcset);
		}
	};
}
var ENTITY_IMAGE_DIMENSION = 128;
function checkEntityImageSize(file) {
	return file.size > 10485760 ? resolver_default.t("message.error.avatar_image_too_large", { limit: "10MB" }) : null;
}
async function prepareEntityImageBytes(file) {
	try {
		const bitmap = await createImageBitmap(file);
		try {
			const side = Math.min(bitmap.width, bitmap.height);
			const sx = (bitmap.width - side) / 2;
			const sy = (bitmap.height - side) / 2;
			const canvas = document.createElement("canvas");
			canvas.width = ENTITY_IMAGE_DIMENSION;
			canvas.height = ENTITY_IMAGE_DIMENSION;
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error("no 2d context");
			ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, ENTITY_IMAGE_DIMENSION, ENTITY_IMAGE_DIMENSION);
			const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp"));
			if (!blob) throw new Error("toBlob returned null");
			return new Uint8Array(await blob.arrayBuffer());
		} finally {
			bitmap.close();
		}
	} catch (error) {
		logger.error("Failed to process entity image", error);
		throw new Error(resolver_default.t("message.error.image_process_failed"));
	}
}
const captureScrollable = async (elRef) => {
	const el = elRef.current;
	if (el) {
		const htmlToImage = await loadHtmlToImage();
		let restoreLocalImageSources;
		try {
			const totalWidth = el.scrollWidth;
			const totalHeight = el.scrollHeight;
			const MAX_ALLOWED_DIMENSION = 32767;
			if (totalHeight > MAX_ALLOWED_DIMENSION || totalWidth > MAX_ALLOWED_DIMENSION) return Promise.reject(new Error(resolver_default.t("message.error.dimension_too_large")));
			const filterHiddenElements = (node) => {
				if (node instanceof HTMLElement) {
					if (node.hasAttribute("data-html-artifact")) return false;
					if (node.style.display === "none") return false;
					if (window.getComputedStyle(node).display === "none") return false;
				}
				return true;
			};
			restoreLocalImageSources = await inlineLocalImageSources(el);
			const captureOptions = {
				filter: filterHiddenElements,
				backgroundColor: getComputedStyle(el).getPropertyValue("--background"),
				cacheBust: true,
				imagePlaceholder: TRANSPARENT_IMAGE_PLACEHOLDER,
				pixelRatio: window.devicePixelRatio,
				skipAutoScale: true,
				width: totalWidth,
				height: totalHeight,
				canvasWidth: totalWidth,
				canvasHeight: totalHeight,
				style: {
					backgroundColor: getComputedStyle(el).backgroundColor,
					color: getComputedStyle(el).color,
					height: "auto",
					maxHeight: "none",
					overflow: "visible",
					position: "static",
					scrollbarWidth: "none"
				}
			};
			const warmupCanvas = await htmlToImage.toCanvas(el, captureOptions);
			warmupCanvas.width = 0;
			warmupCanvas.height = 0;
			return await htmlToImage.toCanvas(el, captureOptions);
		} catch (error) {
			logger.error("Error capturing scrollable element:", error);
			throw error;
		} finally {
			restoreLocalImageSources?.();
		}
	}
	return Promise.resolve(void 0);
};
const captureScrollableAsDataUrl = async (elRef) => {
	return captureScrollable(elRef).then((canvas) => {
		if (canvas) return canvas.toDataURL("image/png");
		return Promise.resolve(void 0);
	});
};
const captureScrollableAsBlob = async (elRef, func) => {
	await captureScrollable(elRef).then((canvas) => {
		canvas?.toBlob(func, "image/png");
	});
};
async function captureScrollableIframe(iframeRef) {
	const iframe = iframeRef.current;
	if (!iframe?.contentDocument?.defaultView) return void 0;
	const doc = iframe.contentDocument;
	const win = iframe.contentWindow;
	const disableAnimations = () => {
		const style = doc.createElement("style");
		style.textContent = `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      // transform: none !important;
    }`;
		doc.head.appendChild(style);
		return style;
	};
	const inlineFonts = async () => {
		const fontFaceRegex = /@font-face[\s\S]*?\}/g;
		const fontUrlRegex = /url\((['"]?)([^)"']+)\1\)/g;
		const fontExtRegex = /\.(woff2?|ttf|otf)(\?|#|$)/i;
		const fetchAsDataUrl = async (url) => {
			try {
				const res = await fetch(url, {
					mode: "cors",
					credentials: "omit"
				});
				if (!res.ok) return url;
				const blob = await res.blob();
				return new Promise((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = () => resolve(url);
					reader.readAsDataURL(blob);
				});
			} catch {
				return url;
			}
		};
		const processCss = async (cssText, baseUrl) => {
			const fontBlocks = [];
			let match;
			while ((match = fontFaceRegex.exec(cssText)) !== null) {
				let block = match[0];
				const fontUrls = [];
				let urlMatch;
				fontUrlRegex.lastIndex = 0;
				while ((urlMatch = fontUrlRegex.exec(block)) !== null) {
					const url = urlMatch[2];
					if (!url.startsWith("data:") && fontExtRegex.test(url)) try {
						const absoluteUrl = new URL(url, baseUrl).href;
						fontUrls.push([urlMatch[0], absoluteUrl]);
					} catch {}
				}
				(await Promise.all(fontUrls.map(async ([original, url]) => {
					return [original, `url(${await fetchAsDataUrl(url)})`];
				}))).forEach(([original, replacement]) => {
					block = block.replace(original, replacement);
				});
				fontBlocks.push(block);
			}
			return fontBlocks;
		};
		const allFontBlocks = [];
		const externalSheets = doc.querySelectorAll("link[rel=\"stylesheet\"]");
		await Promise.all(Array.from(externalSheets).map(async (link) => {
			if (!link.href) return;
			try {
				const res = await fetch(link.href, {
					mode: "cors",
					credentials: "omit"
				});
				if (res.ok) {
					const blocks = await processCss(await res.text(), link.href);
					allFontBlocks.push(...blocks);
				}
			} catch {}
		}));
		const inlineStyles = doc.querySelectorAll("style");
		await Promise.all(Array.from(inlineStyles).map(async (style) => {
			const blocks = await processCss(style.textContent || "", doc.baseURI);
			allFontBlocks.push(...blocks);
		}));
		return allFontBlocks.join("\n");
	};
	const animationStyle = disableAnimations();
	let injectedFontStyle = null;
	const createFontStyle = (css) => {
		const style = doc.createElement("style");
		style.setAttribute("data-cs-inline-fonts", "true");
		style.textContent = css;
		doc.head.appendChild(style);
		return style;
	};
	try {
		await new Promise((r) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => r(null))));
		doc.querySelectorAll("img[loading=\"lazy\"]").forEach((img) => img.setAttribute("loading", "eager"));
		const fontEmbedCSS = await inlineFonts();
		if (fontEmbedCSS && fontEmbedCSS.trim().length > 0) {
			injectedFontStyle = createFontStyle(fontEmbedCSS);
			if (injectedFontStyle.parentNode == null) doc.head.appendChild(injectedFontStyle);
		}
		await Promise.race([doc.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, 1e3))]);
		const { documentElement: de, body: b } = doc;
		const totalWidth = Math.max(b.scrollWidth, de.scrollWidth, b.clientWidth, de.clientWidth);
		const totalHeight = Math.max(b.scrollHeight, de.scrollHeight, b.clientHeight, de.clientHeight);
		logger.verbose("Capturing iframe:", {
			totalWidth,
			totalHeight
		});
		const scale = Math.min(1, 32767 / Math.max(totalWidth, totalHeight));
		const pixelRatio = (win.devicePixelRatio || 1) * scale;
		const styles = win.getComputedStyle(b);
		const backgroundColor = styles.backgroundColor || "#ffffff";
		const color = styles.color || "#000000";
		return await (await loadHtmlToImage()).toCanvas(de, {
			fontEmbedCSS,
			backgroundColor,
			cacheBust: true,
			pixelRatio,
			skipAutoScale: true,
			width: Math.floor(totalWidth),
			height: Math.floor(totalHeight),
			style: {
				backgroundColor,
				color,
				width: `${totalWidth}px`,
				height: `${totalHeight}px`,
				overflow: "visible",
				display: "block"
			}
		});
	} catch (error) {
		logger.error("Error capturing iframe:", error);
		return;
	} finally {
		injectedFontStyle?.remove();
		animationStyle.remove();
	}
}
const captureScrollableIframeAsDataUrl = async (iframeRef) => {
	return captureScrollableIframe(iframeRef).then((canvas) => {
		if (canvas) return canvas.toDataURL("image/png");
		return Promise.resolve(void 0);
	});
};
const captureScrollableIframeAsBlob = async (iframeRef, func) => {
	await captureScrollableIframe(iframeRef).then((canvas) => {
		canvas?.toBlob(func, "image/png");
	});
};
const svgToCanvas = (svgElement, scale = 3) => {
	const viewBox = svgElement.getAttribute("viewBox")?.split(" ").map(Number) || [];
	const rect = svgElement.getBoundingClientRect();
	const width = viewBox[2] || svgElement.clientWidth || rect.width;
	const height = viewBox[3] || svgElement.clientHeight || rect.height;
	const svgData = new XMLSerializer().serializeToString(svgElement);
	let svgBase64;
	try {
		const encodedData = new TextEncoder().encode(svgData);
		const binaryString = Array.from(encodedData, (byte) => String.fromCodePoint(byte)).join("");
		svgBase64 = `data:image/svg+xml;base64,${btoa(binaryString)}`;
	} catch (error) {
		logger.warn("TextEncoder method failed, falling back to legacy method", error);
		svgBase64 = `data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(svgData)))}`;
	}
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) return Promise.reject(/* @__PURE__ */ new Error("Failed to get canvas context"));
	canvas.width = width * scale;
	canvas.height = height * scale;
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			try {
				ctx.scale(scale, scale);
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas);
			} catch (error) {
				reject(/* @__PURE__ */ new Error(`Failed to draw image on canvas: ${error}`));
			}
		};
		img.onerror = () => {
			reject(/* @__PURE__ */ new Error("Failed to load SVG image"));
		};
		img.src = svgBase64;
	});
};
const svgToPngBlob = (svgElement, scale = 3) => {
	return new Promise((resolve, reject) => {
		svgToCanvas(svgElement, scale).then((canvas) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(/* @__PURE__ */ new Error("Failed to create blob from canvas"));
			}, "image/png");
		}).catch(reject);
	});
};
const svgToSvgBlob = (svgElement) => {
	const svgData = new XMLSerializer().serializeToString(svgElement);
	return new Blob([svgData], { type: "image/svg+xml" });
};
const imageInputToPreviewUrl = async (input, options = {}) => {
	if (input instanceof SVGElement) {
		const blob = options.format === "svg" ? svgToSvgBlob(input) : await svgToPngBlob(input, options.scale || 3);
		return URL.createObjectURL(blob);
	}
	if (input instanceof HTMLImageElement) return input.src;
	if (typeof input === "string") return input;
	if (input instanceof Blob) return URL.createObjectURL(input);
	throw new Error("Unsupported input type");
};
function measureElementSize(element) {
	const clone = element.cloneNode(true);
	if (clone instanceof HTMLElement || clone instanceof SVGElement) {
		clone.style.width = "";
		clone.style.height = "";
		clone.style.position = "";
		clone.style.visibility = "";
	}
	const container = document.createElement("div");
	container.style.position = "absolute";
	container.style.top = "-9999px";
	container.style.left = "-9999px";
	container.style.visibility = "hidden";
	container.appendChild(clone);
	document.body.appendChild(container);
	const rect = clone.getBoundingClientRect();
	document.body.removeChild(container);
	return {
		width: rect.width,
		height: rect.height
	};
}
const makeSvgSizeAdaptive = (element) => {
	if (!(element instanceof SVGElement)) return element;
	const hasViewBox = element.hasAttribute("viewBox");
	const widthStr = element.getAttribute("width");
	let measuredWidth;
	if (!hasViewBox) {
		const renderedSize = measureElementSize(element);
		if (renderedSize.width > 0 && renderedSize.height > 0) {
			measuredWidth = renderedSize.width;
			element.setAttribute("viewBox", `0 0 ${renderedSize.width} ${renderedSize.height}`);
		}
	}
	if (!element.style.getPropertyValue("max-width")) {
		if (measuredWidth !== void 0) element.style.setProperty("max-width", `${measuredWidth}px`);
		else if (widthStr) element.style.setProperty("max-width", widthStr);
	}
	element.setAttribute("width", "100%");
	element.removeAttribute("height");
	element.removeAttribute("preserveAspectRatio");
	return element;
};
const convertImageToPng = async (blob) => {
	if (blob.type === "image/png") return blob;
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(blob);
		img.onload = () => {
			try {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					URL.revokeObjectURL(url);
					reject(/* @__PURE__ */ new Error("Failed to get canvas context"));
					return;
				}
				ctx.drawImage(img, 0, 0);
				canvas.toBlob((pngBlob) => {
					URL.revokeObjectURL(url);
					if (pngBlob) resolve(pngBlob);
					else reject(/* @__PURE__ */ new Error("Failed to convert image to png"));
				}, "image/png");
			} catch (error) {
				URL.revokeObjectURL(url);
				reject(error);
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Failed to load image for conversion"));
		};
		img.src = url;
	});
};
const transformImageToPng = async (blob, transform) => {
	const bitmap = await createImageBitmap(blob);
	try {
		const rotation = (transform.rotation % 360 + 360) % 360;
		const radians = rotation * Math.PI / 180;
		const canvas = document.createElement("canvas");
		if (rotation % 90 === 0) {
			const swapsDimensions = rotation === 90 || rotation === 270;
			canvas.width = swapsDimensions ? bitmap.height : bitmap.width;
			canvas.height = swapsDimensions ? bitmap.width : bitmap.height;
		} else {
			const sine = Math.abs(Math.sin(radians));
			const cosine = Math.abs(Math.cos(radians));
			canvas.width = Math.ceil(bitmap.width * cosine + bitmap.height * sine);
			canvas.height = Math.ceil(bitmap.width * sine + bitmap.height * cosine);
		}
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Failed to get canvas context");
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.rotate(radians);
		ctx.scale(transform.flipX ? -1 : 1, transform.flipY ? -1 : 1);
		ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
		return await new Promise((resolve, reject) => {
			canvas.toBlob((pngBlob) => {
				if (pngBlob) resolve(pngBlob);
				else reject(/* @__PURE__ */ new Error("Failed to transform image to png"));
			}, "image/png");
		});
	} finally {
		bitmap.close();
	}
};
function decodeDataUrlBytes(data) {
	const encoder = new TextEncoder();
	const bytes = [];
	for (let index = 0; index < data.length;) {
		const hexByte = data[index] === "%" ? data.slice(index + 1, index + 3) : "";
		if (/^[\da-fA-F]{2}$/.test(hexByte)) {
			bytes.push(Number.parseInt(hexByte, 16));
			index += 3;
			continue;
		}
		const codePoint = data.codePointAt(index);
		if (codePoint == null) break;
		const char = String.fromCodePoint(codePoint);
		bytes.push(...encoder.encode(char));
		index += char.length;
	}
	return new Uint8Array(bytes);
}
async function getImageBlobFromSource(src) {
	if (src.startsWith("data:")) {
		const parseResult = parseDataUrl(src);
		if (!parseResult || !parseResult.mediaType) throw new Error("Invalid image data URL");
		const byteArray = parseResult.isBase64 ? gBase64.toUint8Array(parseResult.data) : decodeDataUrlBytes(parseResult.data);
		return new Blob([byteArray.slice()], { type: parseResult.mediaType });
	}
	if (src.startsWith("file://")) {
		const path = AbsoluteFilePathSchema.parse(fileUrlToPath(src));
		const { content, mime } = await ipcApi.request("file.read", {
			handle: createFilePathHandle(path),
			options: {
				mode: "full",
				encoding: "binary"
			}
		});
		return new Blob([content.slice()], { type: mime });
	}
	return (await fetch(src)).blob();
}
async function copyImageToClipboard(src) {
	const pngBlob = await convertImageToPng(await getImageBlobFromSource(src));
	const item = new ClipboardItem({ "image/png": pngBlob });
	await navigator.clipboard.write([item]);
}
export { captureScrollableIframeAsBlob as a, convertImageToPng as c, imageInputToPreviewUrl as d, makeSvgSizeAdaptive as f, transformImageToPng as g, svgToSvgBlob as h, captureScrollableAsDataUrl as i, copyImageToClipboard as l, svgToPngBlob as m, captureScrollable as n, captureScrollableIframeAsDataUrl as o, prepareEntityImageBytes as p, captureScrollableAsBlob as r, checkEntityImageSize as s, blobToDataUrl as t, getImageBlobFromSource as u };

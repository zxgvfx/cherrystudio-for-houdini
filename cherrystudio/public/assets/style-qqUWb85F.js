import { t as clsx } from "./clsx-Bu5J6-zp.js";
import { t as twMerge } from "./bundle-mjs-CwOjJOmf.js";
const isHexColor = (value) => {
	return /^#([0-9A-F]{3}){1,2}$/i.test(value);
};
function classNames(...args) {
	const classes = [];
	args.forEach((arg) => {
		if (!arg) return;
		if (typeof arg === "string" || typeof arg === "number") classes.push(arg.toString());
		else if (Array.isArray(arg)) {
			const inner = classNames(...arg);
			if (inner) classes.push(inner);
		} else if (typeof arg === "object") Object.entries(arg).forEach(([key, value]) => {
			if (value) classes.push(key);
		});
	});
	return classes.filter(Boolean).join(" ");
}
function checkHexColor(value) {
	if (!isHexColor(value)) throw new Error(`Invalid hex color string: ${value}`);
}
function getRGB(hex) {
	checkHexColor(hex);
	const cleanHex = hex.charAt(0) === "#" ? hex.slice(1) : hex;
	return [
		parseInt(cleanHex.slice(0, 2), 16),
		parseInt(cleanHex.slice(2, 4), 16),
		parseInt(cleanHex.slice(4, 6), 16)
	];
}
function getRelativeLuminance(r, g, b) {
	const rs = r / 255;
	const gs = g / 255;
	const bs = b / 255;
	const normalize = (c) => c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4);
	return .2126 * normalize(rs) + .7152 * normalize(gs) + .0722 * normalize(bs);
}
function generateColorFromChar(char) {
	const seed = char.charCodeAt(0);
	const a = 1664525;
	const c = 1013904223;
	const m = Math.pow(2, 32);
	let r = (a * seed + c) % m;
	let g = (a * r + c) % m;
	let b = (a * g + c) % m;
	r = Math.floor(r / m * 256);
	g = Math.floor(g / m * 256);
	b = Math.floor(b / m * 256);
	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function getForegroundColor(backgroundColor) {
	checkHexColor(backgroundColor);
	const [r, g, b] = getRGB(backgroundColor);
	return getRelativeLuminance(r, g, b) > .179 ? "#000000" : "#FFFFFF";
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
export { getForegroundColor as i, cn as n, generateColorFromChar as r, classNames as t };

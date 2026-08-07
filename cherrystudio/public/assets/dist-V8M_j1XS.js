import { t as __commonJSMin } from "./chunk-DiqNceaa.js";
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	async function fetchWithRetry(e, t = {}) {
		const { timeout: r = 1e4, retries: o = 3, retryDelay: n = 1e3 } = t;
		let s = null;
		for (let t$1 = 0; t$1 <= o; t$1++) try {
			const t$2 = new AbortController(), o$1 = setTimeout((() => t$2.abort()), r), n$1 = await fetch(e, {
				signal: t$2.signal,
				headers: { Accept: "application/json" }
			});
			if (clearTimeout(o$1), !n$1.ok) throw new Error(`HTTP error! status: ${n$1.status}`);
			return await n$1.json();
		} catch (e$1) {
			s = e$1, t$1 < o && await new Promise(((e$2) => setTimeout(e$2, n)));
		}
		throw s;
	}
	async function npxFinder(e, t = {}) {
		if (!e.startsWith("@")) throw new Error("Scope must start with \"@\"");
		try {
			const o = await fetchWithRetry(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(e)}`, t);
			if (!o.objects || !Array.isArray(o.objects)) throw new Error("Invalid search response format");
			const n = o.objects.filter(((t$1) => t$1.package.name.startsWith(e))).map(((e$1) => e$1.package.name));
			if (0 === n.length) return [];
			const s = n.map(((e$1) => fetchWithRetry(`https://registry.npmjs.org/${encodeURIComponent(e$1)}`, t).then(((t$1) => ({
				packageName: e$1,
				packageInfo: t$1
			}))))), a = await Promise.allSettled(s), i = [];
			for (const e$1 of a) {
				if ("rejected" === e$1.status) {
					console.error("Error fetching package details:", e$1.reason);
					continue;
				}
				const { packageName: t$1, packageInfo: r } = e$1.value, o$1 = r;
				if (!o$1["dist-tags"] || !o$1.versions) {
					console.error("Invalid package info format:", t$1);
					continue;
				}
				const n$1 = o$1["dist-tags"].latest, s$1 = o$1.versions[n$1];
				isExecutablePackage(s$1) && i.push({
					name: t$1,
					description: s$1.description,
					version: n$1,
					bin: s$1.bin,
					dependencies: s$1.dependencies,
					scripts: s$1.scripts,
					keywords: s$1.keywords,
					links: {
						npm: `https://www.npmjs.com/package/${t$1}`,
						repository: s$1.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, ""),
						homepage: s$1.homepage
					},
					original: o$1
				});
			}
			return i;
		} catch (e$1) {
			throw console.error("Error fetching npm packages:", e$1), e$1;
		}
	}
	function isExecutablePackage(e) {
		return !!e.bin;
	}
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.npxFinder = npxFinder;
}));
export { require_dist as t };

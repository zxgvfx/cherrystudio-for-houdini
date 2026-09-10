import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { C as string, M as datetime, _ as object, a as array, g as number, n as _enum, o as boolean, x as record } from "./schemas-1oAyIgyK.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { a as useInvalidateCache, c as useQuery } from "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
const SkillSearchSourceSchema = _enum([
	"claude-plugins.dev",
	"skills.sh",
	"clawhub.ai",
	"github"
]);
const ClaudePluginsSearchResponseSchema = object({
	skills: array(object({
		id: string(),
		name: string(),
		namespace: string(),
		sourceUrl: string().nullable().optional(),
		description: string().nullable().optional(),
		version: string().nullable().optional(),
		author: string().nullable().optional(),
		stars: number().optional(),
		installs: number().optional(),
		metadata: object({
			repoOwner: string().optional(),
			repoName: string().optional(),
			directoryPath: string().optional(),
			rawFileUrl: string().optional()
		}).nullable().optional(),
		createdAt: string().optional(),
		updatedAt: string().optional()
	})),
	total: number().optional(),
	limit: number().optional(),
	offset: number().optional()
});
const SkillsShSearchItemSchema = object({
	id: string(),
	skillId: string(),
	name: string(),
	installs: number(),
	source: string()
});
const SkillsShSearchResponseSchema = object({
	query: string(),
	skills: array(SkillsShSearchItemSchema),
	count: number()
});
const ClawhubSearchResponseSchema = object({ results: array(object({
	score: number(),
	slug: string(),
	displayName: string(),
	summary: string(),
	version: string().nullable(),
	updatedAt: number(),
	ownerHandle: string().optional()
})) });
object({
	skill: object({
		slug: string(),
		displayName: string(),
		summary: string(),
		tags: record(string(), string()).optional(),
		stats: object({
			downloads: number().default(0),
			stars: number().default(0),
			installsAllTime: number().default(0)
		}).optional()
	}),
	owner: object({
		handle: string(),
		displayName: string(),
		image: string().nullable()
	}).nullable(),
	moderation: object({
		isSuspicious: boolean(),
		isMalwareBlocked: boolean(),
		verdict: string()
	}).nullable()
});
object({
	slug: string(),
	name: string(),
	description: string().nullable(),
	author: string().nullable(),
	stars: number().default(0),
	downloads: number().default(0),
	sourceRegistry: SkillSearchSourceSchema,
	sourceUrl: string().nullable().default(null),
	installSource: string()
});
object({
	id: string(),
	name: string(),
	description: string().nullable(),
	folderName: string(),
	source: string(),
	sourceUrl: string().nullable(),
	namespace: string().nullable(),
	author: string().nullable(),
	version: string().nullable(),
	sourceTags: array(string()).default([]),
	contentHash: string(),
	isEnabled: boolean(),
	createdAt: datetime(),
	updatedAt: datetime()
});
const SKILL_SEARCH_FAILED_ERROR = "skill_search_failed";
function normalizeDirectoryPath(directoryPath) {
	return directoryPath?.split("/").map((part) => part.trim()).filter(Boolean).join("/") || null;
}
function getDirectoryPathFromGithubTreeUrl(sourceUrl, repoOwner, repoName) {
	if (!sourceUrl) return null;
	try {
		const url = new URL(sourceUrl);
		const [owner, repo, type, branch, ...pathParts] = url.pathname.split("/").filter(Boolean).map((part) => decodeURIComponent(part));
		if (url.hostname !== "github.com" || owner?.toLowerCase() !== repoOwner.toLowerCase() || repo?.toLowerCase() !== repoName.toLowerCase() || type !== "tree" || !branch || !["main", "master"].includes(branch)) return null;
		return normalizeDirectoryPath(pathParts.join("/"));
	} catch {
		return null;
	}
}
function normalizeClaudePlugins(raw) {
	const parsed = ClaudePluginsSearchResponseSchema.safeParse(raw);
	if (!parsed.success) throw new Error("Invalid claude-plugins.dev search response");
	return parsed.data.skills.flatMap((s) => {
		const repoOwner = s.metadata?.repoOwner ?? "";
		const repoName = s.metadata?.repoName ?? "";
		const directoryPath = normalizeDirectoryPath(s.metadata?.directoryPath) ?? getDirectoryPathFromGithubTreeUrl(s.sourceUrl, repoOwner, repoName);
		if (!repoOwner || !repoName || !directoryPath) return [];
		return {
			slug: s.id,
			name: s.name,
			description: s.description ?? null,
			author: s.author ?? s.namespace ?? null,
			stars: s.stars ?? 0,
			downloads: s.installs ?? 0,
			sourceRegistry: "claude-plugins.dev",
			sourceUrl: s.sourceUrl ?? `https://github.com/${repoOwner}/${repoName}/tree/main/${directoryPath}`,
			installSource: `claude-plugins:${repoOwner}/${repoName}/${directoryPath}`
		};
	});
}
var GITHUB_REPO_PART = /^[a-zA-Z0-9_.-]+$/;
function invalidPathPart(part) {
	return !part || part !== part.trim() || part === "." || part === ".." || part.includes("\\") || part.includes("/") || part.includes("\0");
}
function encodeGithubPath(directoryPath) {
	return directoryPath.split("/").map(encodeURIComponent).join("/");
}
function parseGithubSkillUrl(rawUrl) {
	let url;
	let segments;
	try {
		url = new URL(rawUrl.trim());
		segments = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
	} catch {
		return null;
	}
	const host = url.hostname.toLowerCase().replace(/^www\./, "");
	const [owner, rawRepo, ...tail] = segments;
	const refAndPath = host === "github.com" && tail[0] === "blob" ? tail.slice(1) : host === "raw.githubusercontent.com" ? tail : null;
	if (!refAndPath) return null;
	const repo = rawRepo?.replace(/\.git$/i, "");
	const fileName = refAndPath.at(-1);
	const refAndDirectory = refAndPath.slice(0, -1);
	const name = refAndDirectory.at(-1);
	if (!owner || !repo || !name || fileName !== "SKILL.md" && fileName !== "skill.md") return null;
	if (![owner, repo].every((part) => GITHUB_REPO_PART.test(part))) return null;
	if (refAndDirectory.length < 2 || refAndDirectory.some(invalidPathPart)) return null;
	return {
		owner,
		repo,
		refAndDirectory,
		name
	};
}
function buildGithubSkillResult(rawUrl) {
	const location = parseGithubSkillUrl(rawUrl);
	if (!location) return null;
	const { owner, repo, refAndDirectory, name } = location;
	const canonicalUrl = `https://github.com/${owner}/${repo}/blob/${encodeGithubPath(refAndDirectory.join("/"))}/SKILL.md`;
	return {
		slug: `${owner}/${repo}/${refAndDirectory.join("/")}`,
		name,
		description: null,
		author: owner,
		stars: 0,
		downloads: 0,
		sourceRegistry: "github",
		sourceUrl: canonicalUrl,
		installSource: `github:${canonicalUrl}`
	};
}
function normalizeSkillsSh(raw) {
	const parsed = SkillsShSearchResponseSchema.safeParse(raw);
	if (!parsed.success) throw new Error("Invalid skills.sh search response");
	return parsed.data.skills.map((skill) => ({
		slug: skill.id,
		name: skill.name,
		description: null,
		author: skill.source.split("/")[0] ?? null,
		stars: 0,
		downloads: skill.installs,
		sourceRegistry: "skills.sh",
		sourceUrl: `https://skills.sh/${skill.id}`,
		installSource: `skills.sh:${skill.id}`
	}));
}
function normalizeClawhub(raw) {
	const parsed = ClawhubSearchResponseSchema.safeParse(raw);
	if (!parsed.success) throw new Error("Invalid clawhub.ai search response");
	return parsed.data.results.flatMap((skill) => {
		if (!skill.ownerHandle) return [];
		return {
			slug: skill.slug,
			name: skill.displayName,
			description: skill.summary ?? null,
			author: skill.ownerHandle,
			stars: 0,
			downloads: 0,
			sourceRegistry: "clawhub.ai",
			sourceUrl: `https://clawhub.ai/${skill.ownerHandle}/skills/${skill.slug}`,
			installSource: `clawhub:${skill.ownerHandle}/${skill.slug}`
		};
	});
}
var MARKETPLACE_SOURCES = [
	{
		name: "skills.sh",
		buildUrl: (query) => {
			const url = new URL("https://skills.sh/api/search");
			url.searchParams.set("q", query);
			return url.toString();
		},
		normalize: normalizeSkillsSh
	},
	{
		name: "claude-plugins.dev",
		buildUrl: (query) => {
			const url = new URL("https://claude-plugins.dev/api/skills");
			url.searchParams.set("q", query);
			url.searchParams.set("limit", "20");
			return url.toString();
		},
		normalize: normalizeClaudePlugins
	},
	{
		name: "clawhub.ai",
		buildUrl: (query) => {
			const url = new URL("https://clawhub.ai/api/v1/search");
			url.searchParams.set("q", query);
			return url.toString();
		},
		normalize: normalizeClawhub
	}
];
async function searchSkillMarketplaces(query, fetchJson$1, onSourceFailure) {
	const trimmed = query.trim();
	if (!trimmed) return [];
	const settled = await Promise.allSettled(MARKETPLACE_SOURCES.map(async (source) => source.normalize(await fetchJson$1(source.buildUrl(trimmed)))));
	const combined = [];
	let failedSourceCount = 0;
	for (const [index, result] of settled.entries()) if (result.status === "fulfilled") combined.push(...result.value);
	else {
		failedSourceCount += 1;
		onSourceFailure?.(MARKETPLACE_SOURCES[index].name, result.reason);
	}
	if (failedSourceCount === MARKETPLACE_SOURCES.length) throw new Error(SKILL_SEARCH_FAILED_ERROR);
	const seen = /* @__PURE__ */ new Set();
	return combined.filter((result) => {
		const key = result.name.toLowerCase();
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
var logger$1 = loggerService.withContext("skillSearch");
var REQUEST_TIMEOUT_MS = 15e3;
async function fetchWithTimeout(url, init) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		return await fetch(url, {
			...init,
			signal: controller.signal
		});
	} finally {
		clearTimeout(timer);
	}
}
async function fetchJson(url) {
	const resp = await fetchWithTimeout(url);
	if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
	return resp.json();
}
async function searchSkills(query) {
	return searchSkillMarketplaces(query, fetchJson, (source, error) => {
		logger$1.warn(`${source} search failed`, { error: error instanceof Error ? error.message : String(error) });
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useSkills");
var EMPTY_SKILLS = Object.freeze([]);
function skillErrorMessage(error) {
	return error instanceof Error ? error.message : String(error ?? "Unknown error");
}
function unwrapSkillResult(result) {
	if (result.success) return result.data;
	throw new Error(skillErrorMessage(result.error));
}
function reportSkillMutationError(action, error) {
	const message = skillErrorMessage(error);
	logger.error(`Failed to ${action}`, { error: message });
	toast.error(message);
	return message;
}
function logAndRethrowSkillMutationError(action, error) {
	const message = skillErrorMessage(error);
	logger.error(`Failed to ${action}`, { error: message });
	throw error instanceof Error ? error : new Error(message);
}
async function refreshSkillsBestEffort(invalidate) {
	try {
		await invalidate("/skills");
	} catch (error) {
		logger.warn("Failed to refresh skills cache after IPC mutation", { error });
	}
}
function useReconcileSkillsOnOpen(enabled) {
	const invalidate = useInvalidateCache();
	const reconciled = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			reconciled.current = false;
			return;
		}
		if (reconciled.current) return;
		reconciled.current = true;
		let cancelled = false;
		ipcApi.request("skill.reconcile", {}).then(() => {
			if (!cancelled) refreshSkillsBestEffort(invalidate);
		}).catch((error) => {
			reconciled.current = false;
			logger.warn("Failed to reconcile skills on open", { error });
		});
		return () => {
			cancelled = true;
		};
	}, [enabled, invalidate]);
}
function useInstalledSkills(agentId, options = {}) {
	const { data, isLoading, isRefreshing, error, refetch } = useQuery("/skills", {
		enabled: options.enabled !== false,
		...agentId ? { query: { agentId } } : {}
	});
	const refresh = (0, import_react.useCallback)(async () => {
		await ipcApi.request("skill.reconcile", {});
		return refetch();
	}, [refetch]);
	return {
		skills: data ?? EMPTY_SKILLS,
		loading: isLoading,
		refreshing: isRefreshing,
		error: error?.message ?? null,
		refresh
	};
}
function buildAvailableSkills(globalSkills, localSkills) {
	const seen = /* @__PURE__ */ new Set();
	const available = [];
	for (const skill of globalSkills) {
		if (!skill.isEnabled) continue;
		seen.add(skill.folderName);
		available.push({
			name: skill.name,
			description: skill.description ?? void 0,
			filename: skill.folderName
		});
	}
	for (const skill of localSkills) {
		if (seen.has(skill.filename)) continue;
		seen.add(skill.filename);
		available.push({
			name: skill.name,
			description: skill.description,
			filename: skill.filename
		});
	}
	return available;
}
function useAvailableSkills(agentId, workdir, options = {}) {
	const enabled = options.enabled ?? true;
	const installed = useInstalledSkills(agentId, { enabled });
	const [localSkills, setLocalSkills] = (0, import_react.useState)([]);
	const [localLoading, setLocalLoading] = (0, import_react.useState)(false);
	const [localError, setLocalError] = (0, import_react.useState)(null);
	const [loadedLocalSkillsWorkdir, setLoadedLocalSkillsWorkdir] = (0, import_react.useState)();
	const localRequestIdRef = (0, import_react.useRef)(0);
	const nextLocalRequestId = (0, import_react.useCallback)(() => {
		localRequestIdRef.current += 1;
		return localRequestIdRef.current;
	}, []);
	const invalidateLocalRequests = (0, import_react.useCallback)(() => {
		localRequestIdRef.current += 1;
	}, []);
	const refreshLocalSkills = (0, import_react.useCallback)(async () => {
		const requestId = nextLocalRequestId();
		if (!workdir) {
			setLocalSkills([]);
			setLocalError(null);
			setLocalLoading(false);
			setLoadedLocalSkillsWorkdir(void 0);
			return;
		}
		setLocalLoading(true);
		setLocalError(null);
		try {
			const data = unwrapSkillResult(await ipcApi.request("skill.list_local", { workdir }));
			if (requestId === localRequestIdRef.current) {
				setLocalSkills(data);
				setLoadedLocalSkillsWorkdir(workdir);
			}
		} catch (error) {
			if (requestId !== localRequestIdRef.current) return;
			const message = skillErrorMessage(error);
			setLocalSkills([]);
			setLocalError(message);
			setLoadedLocalSkillsWorkdir(workdir);
			logger.warn("Failed to list local skills", {
				workdir,
				error: message
			});
		} finally {
			if (requestId === localRequestIdRef.current) setLocalLoading(false);
		}
	}, [nextLocalRequestId, workdir]);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			invalidateLocalRequests();
			setLocalSkills([]);
			setLocalError(null);
			setLocalLoading(false);
			setLoadedLocalSkillsWorkdir(void 0);
			return;
		}
		refreshLocalSkills();
		return invalidateLocalRequests;
	}, [
		enabled,
		invalidateLocalRequests,
		refreshLocalSkills
	]);
	const refreshInstalledSkills = installed.refresh;
	const refresh = (0, import_react.useCallback)(async () => {
		await Promise.all([Promise.resolve(refreshInstalledSkills()), refreshLocalSkills()]);
	}, [refreshInstalledSkills, refreshLocalSkills]);
	const skills = (0, import_react.useMemo)(() => buildAvailableSkills(installed.skills, localSkills), [installed.skills, localSkills]);
	const isInitialLocalLoad = enabled && Boolean(workdir) && loadedLocalSkillsWorkdir !== workdir;
	return {
		skills,
		loading: installed.loading || localLoading || isInitialLocalLoad,
		error: installed.error ?? localError,
		refresh
	};
}
function useSystemSkills(enabled = true) {
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [importing, setImporting] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const importingRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const invalidate = useInvalidateCache();
	const requestIdRef = (0, import_react.useRef)(0);
	const discover = (0, import_react.useCallback)(async () => {
		const requestId = ++requestIdRef.current;
		if (!enabled) {
			setSkills([]);
			setError(null);
			setLoading(false);
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const discovered = await ipcApi.request("skill.discover_system", {});
			if (requestId === requestIdRef.current) setSkills(discovered);
		} catch (cause) {
			if (requestId !== requestIdRef.current) return;
			const message = skillErrorMessage(cause);
			setSkills([]);
			setError(message);
			logger.warn("Failed to discover system skills", { error: message });
		} finally {
			if (requestId === requestIdRef.current) setLoading(false);
		}
	}, [enabled]);
	(0, import_react.useEffect)(() => {
		discover();
		return () => {
			requestIdRef.current += 1;
		};
	}, [discover]);
	return {
		skills,
		loading,
		error,
		importSkill: (0, import_react.useCallback)(async (skill) => {
			if (skill.status !== "available") return null;
			if (importingRef.current.has(skill.id)) return null;
			importingRef.current.add(skill.id);
			setImporting((current) => new Set(current).add(skill.id));
			try {
				const installed = await ipcApi.request("skill.import_system", { directoryPath: skill.directoryPath });
				await refreshSkillsBestEffort(invalidate);
				await discover();
				return installed;
			} catch (cause) {
				await discover();
				reportSkillMutationError("import system skill", cause);
				return null;
			} finally {
				importingRef.current.delete(skill.id);
				setImporting((current) => {
					const next = new Set(current);
					next.delete(skill.id);
					return next;
				});
			}
		}, [discover, invalidate]),
		importing
	};
}
function useSkillSearch() {
	const [results, setResults] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const abortRef = (0, import_react.useRef)(0);
	return {
		results,
		searching,
		error,
		search: (0, import_react.useCallback)(async (query) => {
			const requestId = ++abortRef.current;
			if (!query.trim()) {
				setResults([]);
				setSearching(false);
				return;
			}
			setSearching(true);
			setError(null);
			try {
				const data = await searchSkills(query);
				if (requestId === abortRef.current) setResults(data);
			} catch (err) {
				if (requestId === abortRef.current) setError(err instanceof Error ? err.message : "Search failed");
			} finally {
				if (requestId === abortRef.current) setSearching(false);
			}
		}, []),
		clear: (0, import_react.useCallback)(() => {
			abortRef.current++;
			setResults([]);
			setSearching(false);
			setError(null);
		}, [])
	};
}
function useSkillInstall() {
	const [installingCounts, setInstallingCounts] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	const invalidate = useInvalidateCache();
	const installingKey = (0, import_react.useMemo)(() => installingCounts.keys().next().value ?? null, [installingCounts]);
	const beginInstalling = (0, import_react.useCallback)((key) => {
		setInstallingCounts((current) => {
			const next = new Map(current);
			next.set(key, (next.get(key) ?? 0) + 1);
			return next;
		});
	}, []);
	const finishInstalling = (0, import_react.useCallback)((key) => {
		setInstallingCounts((current) => {
			const count = current.get(key) ?? 0;
			if (count <= 0) return current;
			const next = new Map(current);
			if (count === 1) next.delete(key);
			else next.set(key, count - 1);
			return next;
		});
	}, []);
	const install = (0, import_react.useCallback)(async (installSource) => {
		beginInstalling(installSource);
		try {
			const skill = unwrapSkillResult(await ipcApi.request("skill.install", { installSource }));
			await refreshSkillsBestEffort(invalidate);
			return { skill };
		} catch (err) {
			return {
				skill: null,
				error: skillErrorMessage(err)
			};
		} finally {
			finishInstalling(installSource);
		}
	}, [
		beginInstalling,
		finishInstalling,
		invalidate
	]);
	const installFromZip = (0, import_react.useCallback)(async (zipFilePath) => {
		beginInstalling("zip");
		try {
			const skill = unwrapSkillResult(await ipcApi.request("skill.install_from_zip", { zipFilePath }));
			await refreshSkillsBestEffort(invalidate);
			return skill;
		} catch (error) {
			logAndRethrowSkillMutationError("install skill from zip", error);
		} finally {
			finishInstalling("zip");
		}
	}, [
		beginInstalling,
		finishInstalling,
		invalidate
	]);
	const installFromDirectory = (0, import_react.useCallback)(async (directoryPath) => {
		beginInstalling("directory");
		try {
			const skill = unwrapSkillResult(await ipcApi.request("skill.install_from_directory", { directoryPath }));
			await refreshSkillsBestEffort(invalidate);
			return skill;
		} catch (error) {
			logAndRethrowSkillMutationError("install skill from directory", error);
		} finally {
			finishInstalling("directory");
		}
	}, [
		beginInstalling,
		finishInstalling,
		invalidate
	]);
	return {
		installingKey,
		isInstalling: (0, import_react.useCallback)((key) => {
			if (!key) return installingCounts.size > 0;
			return installingCounts.has(key);
		}, [installingCounts]),
		install,
		installFromZip,
		installFromDirectory
	};
}
export { useSkillSearch as a, useSkillInstall as i, useInstalledSkills as n, useSystemSkills as o, useReconcileSkillsOnOpen as r, buildGithubSkillResult as s, useAvailableSkills as t };

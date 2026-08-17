import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import { C as string, M as datetime, S as strictObject, a as array, g as number, k as uuidv7, n as _enum } from "./schemas-CV_EtlSZ.js";
import "./PreferenceService-ay5pWhVK.js";
import { t as debounce } from "./debounce-RtBWGQ3U.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { n as UiDataSlot, r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
import "./shim-4_R-7_4j.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as NormalTooltip } from "./tooltip-CJBVkA5B.js";
import "./es2015-CF8XujIC.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DKFhZeV_.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { t as EmptyState } from "./empty-state-C_9tC-cn.js";
import { n as HoverCardContent, r as HoverCardTrigger, t as HoverCard } from "./hover-card-CdD1RjhB.js";
import { t as SegmentedControl } from "./segmented-control-CAdhwi7C.js";
import { t as Skeleton } from "./skeleton-BZtoNVvM.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { g as CURRENCY, w as objectValues } from "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import { c as useQuery, i as useInfiniteQuery, n as useDataChange, r as useInfiniteFlatItems } from "./useDataApi-DxcxHgaT.js";
import { t as ArrowDown } from "./arrow-down-CFmIMhPI.js";
import { t as ArrowUpDown } from "./arrow-up-down-Dvrmq9cn.js";
import { t as ArrowUp } from "./arrow-up-Daho7p7z.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as SlidersHorizontal } from "./sliders-horizontal-EJRQKC5w.js";
import { t as X } from "./x-Bh2_A30k.js";
import { t as useIcon } from "./use-icon-u7Wb-l1f.js";
import { a as resolveProviderIconRef } from "./registry-u6zu0ArP.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./naming-C7JIUN29.js";
import "./provider-B43PumwQ.js";
import { t as EmojiIcon_default } from "./EmojiIcon-_0GJskRg.js";
import { u as useProviders } from "./useProvider-DFQPidMA.js";
import { u as getModelLogoRef } from "./model-BGDvQJb9.js";
import { r as getLocaleFirstDayOfWeek, t as createDurationFormatter } from "./time-olEmBooB.js";
import { p as SettingsContentColumn } from "./SettingsPrimitives-ctf-2wxz.js";
import { t as ProviderAvatarPrimitive } from "./ProviderAvatar-BVZJk670.js";
var compactFormatters = /* @__PURE__ */ new Map();
function getCompactFormatter(locale) {
	let formatter = compactFormatters.get(locale);
	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, {
			notation: "compact",
			maximumFractionDigits: 1
		});
		compactFormatters.set(locale, formatter);
	}
	return formatter;
}
function formatCompactNumber(value) {
	if (!Number.isFinite(value)) return "0";
	return getCompactFormatter(resolver_default.resolvedLanguage ?? resolver_default.language).format(value);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function startOfLocalDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function parseDateKey(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day);
}
function toDateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function formatCost(value, currency) {
	const symbol = (currency?.toUpperCase() ?? "USD") === "CNY" ? "¥" : "$";
	if (value > 0 && value < 1e-4) return `<${symbol}0.0001`;
	const fractionDigits = value > 0 && value < 1 ? 4 : 2;
	return `${symbol}${value.toFixed(fractionDigits)}`;
}
const WINDOW_KEYS = [
	"30d",
	"90d",
	"365d"
];
const GROUP_BY_KEYS = [
	"provider",
	"model",
	"apiKey",
	"source"
];
const METRIC_KEYS = [
	"tokens",
	"requests",
	"cost"
];
const ROLLUP_KEYS = [
	"total",
	"daily",
	"weekly",
	"monthly"
];
const TOP_COUNT_KEYS = [
	5,
	10,
	20
];
const TOTAL_CHART_TYPES = ["stack", "pie"];
const PERIOD_CHART_TYPES = ["bar", "line"];
const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)"
];
const EMPTY_TIMELINE_BUCKETS = [];
const EMPTY_STATS_METRICS = {
	costCurrency: null,
	totalCost: 0,
	totalInputTokens: 0,
	totalOutputTokens: 0,
	totalTokens: 0,
	totalNoCacheTokens: 0,
	totalCacheReadTokens: 0,
	totalCacheWriteTokens: 0,
	recordCount: 0,
	requestCount: 0,
	estimatedRequestCount: 0,
	unpricedRequestCount: 0
};
function selectCostTotal(costTotals, selectedCurrency) {
	return costTotals.find((item) => item.currency === selectedCurrency) ?? costTotals.find((item) => item.currency === CURRENCY.USD) ?? costTotals[0];
}
const WINDOW_LABEL_KEYS = {
	"30d": "settings.usage.window.30d",
	"90d": "settings.usage.window.90d",
	"365d": "settings.usage.window.365d"
};
const GROUP_BY_LABEL_KEYS = {
	provider: "settings.usage.groupBy.provider",
	model: "settings.usage.groupBy.model",
	apiKey: "settings.usage.groupBy.apiKey",
	source: "settings.usage.groupBy.source"
};
const METRIC_LABEL_KEYS = {
	tokens: "settings.usage.metric.tokens",
	requests: "settings.usage.metric.requests",
	cost: "settings.usage.metric.cost"
};
const CHART_TYPE_LABEL_KEYS = {
	stack: "settings.usage.chart.stack",
	bar: "settings.usage.chart.bar",
	line: "settings.usage.chart.line",
	pie: "settings.usage.chart.pie"
};
const ROLLUP_LABEL_KEYS = {
	total: "settings.usage.rollup.total",
	daily: "settings.usage.rollup.daily",
	weekly: "settings.usage.rollup.weekly",
	monthly: "settings.usage.rollup.monthly"
};
function endOfLocalDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
function getWindowDays(windowKey) {
	return windowKey === "30d" ? 30 : windowKey === "90d" ? 90 : 365;
}
function getWindowRange(windowKey) {
	const days = getWindowDays(windowKey);
	const today = startOfLocalDay(/* @__PURE__ */ new Date());
	const from = new Date(today);
	from.setDate(today.getDate() - days + 1);
	return {
		from: from.getTime(),
		to: endOfLocalDay(today).getTime()
	};
}
function getPreviousWindowRange(windowKey) {
	const days = getWindowDays(windowKey);
	const currentRange = getWindowRange(windowKey);
	const currentFrom = startOfLocalDay(new Date(currentRange.from));
	const previousFrom = new Date(currentFrom);
	previousFrom.setDate(currentFrom.getDate() - days);
	const previousTo = new Date(currentFrom);
	previousTo.setDate(currentFrom.getDate() - 1);
	return {
		from: startOfLocalDay(previousFrom).getTime(),
		to: endOfLocalDay(previousTo).getTime()
	};
}
function rangeFromDateKey(value) {
	const date = parseDateKey(value);
	return {
		from: startOfLocalDay(date).getTime(),
		to: endOfLocalDay(date).getTime()
	};
}
function displayModelId(modelId) {
	if (!modelId) return "";
	const separatorIndex = modelId.indexOf("::");
	return separatorIndex >= 0 ? modelId.slice(separatorIndex + 2) : modelId;
}
function applyTimelineCurrency(buckets, dailyCosts, currency) {
	const costs = new Map(dailyCosts.filter((item) => item.currency === currency).map((item) => [item.date, item.total]));
	return buckets.map((bucket) => ({
		...bucket,
		costCurrency: currency ?? null,
		totalCost: costs.get(bucket.date) ?? 0
	}));
}
function getCacheUsageMetrics(buckets) {
	const noCacheTokens = buckets.reduce((sum, bucket) => sum + (bucket.totalNoCacheTokens ?? 0), 0);
	const cacheReadTokens = buckets.reduce((sum, bucket) => sum + (bucket.totalCacheReadTokens ?? 0), 0);
	const cacheWriteTokens = buckets.reduce((sum, bucket) => sum + (bucket.totalCacheWriteTokens ?? 0), 0);
	const observableTokens = noCacheTokens + cacheReadTokens + cacheWriteTokens;
	return {
		noCacheTokens,
		cacheReadTokens,
		cacheWriteTokens,
		observableTokens,
		hitRate: observableTokens > 0 ? cacheReadTokens / observableTokens : void 0
	};
}
function getBucketKey(bucket) {
	if (bucket.isOther) return "other";
	const apiKeyIdentity = [
		bucket.apiKeyId ?? "",
		bucket.apiKeyAttribution ?? "",
		bucket.authMethod ?? ""
	].join(":");
	return `${bucket.providerId ?? ""}-${bucket.sourceType ?? ""}-${bucket.sourceId ?? ""}-${apiKeyIdentity}-${bucket.modelId ?? ""}`;
}
function getMetricValue(bucket, metric) {
	if (metric === "requests") return bucket.requestCount;
	if (metric === "cost") return bucket.totalCost;
	return bucket.totalTokens;
}
function getGenerationTokensPerSecond(entry) {
	if (!entry.outputTokens || !entry.timeCompletionMs) return void 0;
	const ttftMs = entry.timeFirstTokenMs;
	const generationMs = ttftMs !== null && ttftMs < entry.timeCompletionMs ? entry.timeCompletionMs - ttftMs : entry.timeCompletionMs;
	return generationMs > 0 ? entry.outputTokens / (generationMs / 1e3) : void 0;
}
function getLongestStreak(dateKeys) {
	const sorted = [...dateKeys].sort();
	let longest = 0;
	let current = 0;
	let previousDate;
	for (const key of sorted) {
		let isConsecutive = false;
		if (previousDate !== void 0) {
			const next = new Date(previousDate);
			next.setDate(next.getDate() + 1);
			isConsecutive = toDateKey(next) === key;
		}
		current = isConsecutive ? current + 1 : 1;
		longest = Math.max(longest, current);
		previousDate = startOfLocalDay(parseDateKey(key));
	}
	return longest;
}
function toQueryRange(range) {
	return range;
}
function getTimelinePoints(buckets, range, getValue) {
	const first = buckets[0];
	const last = buckets[buckets.length - 1];
	const from = range.from ?? (first ? startOfLocalDay(parseDateKey(first.date)).getTime() : void 0);
	const to = range.to ?? (last ? endOfLocalDay(parseDateKey(last.date)).getTime() : void 0);
	if (from === void 0 || to === void 0) return [];
	const byDate = new Map(buckets.map((bucket) => [bucket.date, getValue(bucket)]));
	const points = [];
	const cursor = startOfLocalDay(new Date(from));
	const end = endOfLocalDay(new Date(to));
	while (cursor.getTime() <= end.getTime()) {
		const date = toDateKey(cursor);
		points.push({
			date,
			value: byDate.get(date) ?? 0
		});
		cursor.setDate(cursor.getDate() + 1);
	}
	return points;
}
function toPeriodKey(dateKey, rollup, firstDayOfWeek) {
	if (rollup === "monthly") return `${dateKey.slice(0, 7)}-01`;
	if (rollup === "weekly") {
		const date = startOfLocalDay(parseDateKey(dateKey));
		date.setDate(date.getDate() - (date.getDay() - firstDayOfWeek + 7) % 7);
		return toDateKey(date);
	}
	return dateKey;
}
function getScopedCost(bucket, currency) {
	return currency !== void 0 && (bucket.costCurrency ?? "USD") === currency ? bucket.totalCost : 0;
}
function buildChartSeries(buckets, periodKeys, options) {
	const positions = new Map(periodKeys.map((key, index) => [key, index]));
	const groups = /* @__PURE__ */ new Map();
	for (const bucket of buckets) {
		const position = positions.get(toPeriodKey(bucket.date, options.rollup, options.firstDayOfWeek));
		if (position === void 0) continue;
		const value = getMetricValue({
			totalTokens: bucket.totalTokens,
			totalCost: getScopedCost(bucket, options.currency),
			requestCount: bucket.requestCount
		}, options.metric);
		if (value <= 0) continue;
		const key = getBucketKey(bucket);
		let series = groups.get(key);
		if (!series) {
			series = {
				key,
				...bucket.isOther ? {} : { identity: { ...bucket } },
				values: periodKeys.map(() => 0),
				total: 0
			};
			groups.set(key, series);
		}
		series.values[position] += value;
		series.total += value;
	}
	const serverOther = groups.get("other");
	const ranked = Array.from(groups.values()).filter((series) => series.key !== "other").sort((a, b) => b.total - a.total);
	const other = serverOther ?? {
		key: "other",
		values: periodKeys.map(() => 0),
		total: 0
	};
	for (const series of ranked.slice(options.topCount)) {
		for (const [index, value] of series.values.entries()) other.values[index] += value;
		other.total += series.total;
	}
	return other.total > 0 ? [...ranked.slice(0, options.topCount), other] : ranked.slice(0, options.topCount);
}
function getTimelineSeries(buckets, range, getValue) {
	const points = getTimelinePoints(buckets, range, getValue);
	return (range.from !== void 0 && range.to !== void 0 ? points : points.slice(-64)).map((point) => point.value);
}
function getRatioChange(current, previous) {
	if (current === void 0 || previous === void 0 || previous <= 0) return void 0;
	return (current - previous) / previous;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function UsageProviderAvatar({ provider, size, className }) {
	const icon = useIcon(resolveProviderIconRef(provider.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderAvatarPrimitive, {
		providerId: provider.id,
		providerName: provider.name,
		logo: icon,
		size,
		className
	});
}
function UsageProviderLabel({ provider, children, size = 18, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "settings.usage-provider-label",
		className: cn("inline-flex min-w-0 items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageProviderAvatar, {
			provider,
			size,
			className: "shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-words",
			children: children ?? provider.name
		})]
	});
}
function UsageModelAvatar({ modelId, providerId, size = 18 }) {
	const modelName = displayModelId(modelId);
	const Icon = useIcon((0, import_react.useMemo)(() => modelId ? getModelLogoRef({
		id: modelId,
		name: modelName || modelId,
		providerId
	}, providerId) : void 0, [
		modelId,
		modelName,
		providerId
	]));
	if (Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, {
		size,
		className: "shrink-0"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: "shrink-0",
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "bg-muted font-medium text-[10px] text-muted-foreground",
			children: (modelName || providerId || "?").slice(0, 1).toUpperCase()
		})
	});
}
function UsageModelLabel({ modelId, providerId, children, size = 18, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "settings.usage-model-label",
		className: cn("inline-flex min-w-0 items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageModelAvatar, {
			modelId,
			providerId,
			size
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-words",
			children
		})]
	});
}
function UsageSourceLabel({ sourceType, sourceIcon, children, size = 18, className }) {
	const fallback = sourceType === "agent" ? "G" : sourceType === "assistant" ? "A" : "?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "settings.usage-source-label",
		className: cn("inline-flex min-w-0 items-center gap-2", className),
		children: [sourceIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
			emoji: sourceIcon,
			size,
			fontSize: Math.max(10, Math.round(size * .58))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
			className: "shrink-0",
			style: {
				width: size,
				height: size
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				className: "bg-muted font-medium text-[10px] text-muted-foreground",
				children: fallback
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-words",
			children
		})]
	});
}
function UsageDistributionHoverCard({ children, label, metric, share, tokens, requests, cost, costCurrency, labels }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardContent, {
		side: "top",
		align: "center",
		className: "w-64 p-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 text-foreground text-sm",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 rounded-md bg-muted px-2 py-1 font-medium text-foreground text-xs",
					children: metric
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-border border-t pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs",
						children: labels.share
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-medium text-foreground text-sm",
						children: share
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs",
						children: labels.tokens
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-medium text-foreground text-sm",
						children: tokens
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs",
						children: labels.requests
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-medium text-foreground text-sm",
						children: requests
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground text-xs",
						children: [labels.cost, costCurrency ? ` · ${costCurrency}` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-medium text-foreground text-sm",
						children: cost
					})] })
				]
			})]
		})
	})] });
}
function MetricCell({ label, value, helper, trendValues, delta, deltaLabel, formatDelta }) {
	const hasTrend = trendValues.some((trendValue) => trendValue > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.metric-cell",
		className: "flex min-h-24 min-w-0 flex-col bg-background p-3 @[640px]/usage:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground text-xs",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex min-h-8 min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1 text-pretty break-words font-semibold text-foreground text-xl leading-6",
					children: value
				}), hasTrend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricSparkline, { values: trendValues })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex min-w-0 flex-col gap-1 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricDelta, {
					change: delta,
					label: deltaLabel,
					formatDelta
				}), helper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 text-pretty text-muted-foreground text-xs",
					children: helper
				})]
			})
		]
	});
}
function MetricStripSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.metric-strip-skeleton",
		className: "grid min-w-0 @[560px]/usage:grid-cols-2 @[900px]/usage:grid-cols-4 grid-cols-1 gap-px border-border border-b bg-border",
		children: Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-background p-3 @[640px]/usage:px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-md" })
		}, index))
	});
}
function MetricSparkline({ values }) {
	const recentValues = values.slice(-64);
	const maxValue = Math.max(...recentValues, 0);
	const minValue = Math.min(...recentValues, maxValue);
	const width = 48;
	const height = 32;
	const xStep = recentValues.length > 1 ? width / (recentValues.length - 1) : width;
	const points = recentValues.map((value, index) => {
		const ratio = maxValue === minValue ? .5 : (value - minValue) / (maxValue - minValue);
		return `${index * xStep},${height - ratio * (height - 4) - 2}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.metric-sparkline",
		className: "flex h-8 w-12 shrink-0 items-center",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: `0 0 ${width} ${height}`,
			preserveAspectRatio: "none",
			className: "h-8 w-full text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				points,
				fill: "none",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: "2"
			})
		})
	});
}
function MetricDelta({ change, label, formatDelta }) {
	if (change === void 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.metric-delta",
		className: "flex min-w-0 flex-wrap gap-x-1 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-medium", change > 0 ? "text-success" : change < 0 ? "text-error" : "text-muted-foreground"),
			children: formatDelta(change)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		})]
	});
}
function InsightCell({ label, value, helper }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.insight-cell",
		className: "min-w-0 bg-background p-3 @[640px]/usage:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground text-xs",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 min-w-0 break-words font-medium text-foreground text-sm",
				children: value
			}),
			helper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 min-w-0 break-words text-muted-foreground text-xs",
				children: helper
			})
		]
	});
}
function UsageResponsiveShell({ children }) {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
		theme,
		className: "min-w-0 overflow-x-hidden",
		innerClassName: "min-w-0 w-full max-w-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "@container/usage flex min-w-0 flex-col gap-6",
			children
		})
	});
}
function UsageSection({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ui": "settings.usage-section",
		className: cn("flex min-w-0 flex-col gap-3", className),
		children
	});
}
function UsagePanel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.usage-panel",
		className: cn("flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background", className),
		...mergeUiProps(props, "settings.usage-panel")
	});
}
function UsagePanelHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.usage-panel-header",
		className: cn("border-border border-b p-3", className),
		...mergeUiProps(props, "settings.usage-panel-header")
	});
}
function UsageSectionTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		"data-ui": "settings.usage-section-title",
		className: cn("font-semibold text-base text-foreground", className),
		...mergeUiProps(props, "settings.usage-section-title")
	});
}
function UsagePanelTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		"data-ui": "settings.usage-panel-title",
		className: cn("font-medium text-foreground text-sm", className),
		...mergeUiProps(props, "settings.usage-panel-title")
	});
}
function UsageControlRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.usage-control-row",
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-muted-foreground text-xs",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1",
			children
		})]
	});
}
function UsageSectionHeader({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.usage-section-header",
		className: "flex min-w-0 @[640px]/usage:flex-row flex-col @[640px]/usage:items-start @[640px]/usage:justify-between gap-3",
		children
	});
}
function UsageDistributionChart({ activeRange, timelineBuckets, exploreBuckets, exploreTimelineRows, exploreTotals, exploreOther, rollup, chartMetric, chartType, topCount, costCurrency, exploreStatsLoading, exploreTimelineLoading, dateFormatter, monthFormatter, formatShare, getBucketLabel, renderBucketLabel }) {
	const { t, i18n } = useTranslation();
	const totalExploreMetric = getMetricValue(exploreTotals, chartMetric);
	const firstDayOfWeek = (0, import_react.useMemo)(() => getLocaleFirstDayOfWeek(i18n.resolvedLanguage), [i18n.resolvedLanguage]);
	const periodKeys = (0, import_react.useMemo)(() => {
		const keys = [];
		for (const point of getTimelinePoints(timelineBuckets, activeRange, () => 0)) {
			const key = toPeriodKey(point.date, rollup, firstDayOfWeek);
			if (keys[keys.length - 1] !== key) keys.push(key);
		}
		return keys;
	}, [
		activeRange,
		firstDayOfWeek,
		rollup,
		timelineBuckets
	]);
	const chartSeries = (0, import_react.useMemo)(() => buildChartSeries(exploreTimelineRows, periodKeys, {
		rollup,
		metric: chartMetric,
		currency: costCurrency,
		topCount,
		firstDayOfWeek
	}), [
		chartMetric,
		costCurrency,
		exploreTimelineRows,
		firstDayOfWeek,
		periodKeys,
		rollup,
		topCount
	]);
	const exploreTopBuckets = (0, import_react.useMemo)(() => [...exploreBuckets].filter((bucket) => getMetricValue(bucket, chartMetric) > 0).sort((a, b) => getMetricValue(b, chartMetric) - getMetricValue(a, chartMetric)).slice(0, topCount), [
		chartMetric,
		exploreBuckets,
		topCount
	]);
	const otherExploreMetric = getMetricValue(exploreOther, chartMetric);
	const formatChartValue = (value) => chartMetric === "cost" ? formatCost(value, costCurrency) : formatCompactNumber(value);
	const renderEmptyDistribution = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		compact: true,
		preset: "no-result",
		title: t("settings.usage.explore.noBreakdown"),
		description: t("settings.usage.explore.noBreakdownDescription")
	});
	const renderPeriodChart = () => {
		if (periodKeys.length === 0 || chartSeries.every((series) => series.total <= 0)) return renderEmptyDistribution();
		const periodTotals = periodKeys.map((_, index) => chartSeries.reduce((sum, series) => sum + series.values[index], 0));
		const maxPeriodTotal = Math.max(...periodTotals);
		const maxSeriesValue = Math.max(...chartSeries.flatMap((series) => series.values));
		const seriesColor = (index) => CHART_COLORS[index % CHART_COLORS.length];
		const seriesLabel = (series) => series.identity ? getBucketLabel(series.identity) : t("common.other");
		const formatPeriod = (periodKey) => {
			if (rollup === "monthly") return monthFormatter.format(parseDateKey(periodKey));
			if (rollup === "weekly") {
				const end = parseDateKey(periodKey);
				end.setDate(end.getDate() + 6);
				return `${dateFormatter.format(parseDateKey(periodKey))} – ${dateFormatter.format(end)}`;
			}
			return dateFormatter.format(parseDateKey(periodKey));
		};
		const axis = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-period-chart",
			className: "mt-2 flex min-w-0 justify-between gap-3 text-foreground-tertiary text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: formatPeriod(periodKeys[0])
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: formatPeriod(periodKeys[periodKeys.length - 1])
			})]
		});
		const legend = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "settings.render-period-chart",
			className: "mt-3 grid min-w-0 @[760px]/usage:grid-cols-4 grid-cols-2 gap-2",
			children: chartSeries.map((series, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 shrink-0 rounded-full",
						style: { backgroundColor: seriesColor(index) }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-muted-foreground",
						children: series.identity ? renderBucketLabel(series.identity) : t("common.other")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto shrink-0 font-medium text-foreground",
						children: formatChartValue(series.total)
					})
				]
			}, series.key))
		});
		if (chartType === "line") {
			const width = 720;
			const height = 220;
			const toX = (index) => periodKeys.length > 1 ? index / (periodKeys.length - 1) * width : width / 2;
			const toY = (value) => height - value / maxSeriesValue * (height - 24) - 12;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.render-period-chart",
				className: "min-w-0 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						"data-ui": "settings.render-period-chart.img",
						viewBox: `0 0 ${width} ${height}`,
						preserveAspectRatio: "none",
						className: "h-64 w-full",
						role: "img",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: t("settings.usage.chart.line") }), chartSeries.map((series, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
							points: series.values.map((value, position) => `${toX(position)},${toY(value)}`).join(" "),
							fill: "none",
							stroke: seriesColor(index),
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2"
						}, series.key))]
					}),
					axis,
					legend
				]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.render-period-chart",
			className: "min-w-0 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex h-64 min-w-0 items-end border-border border-b", periodKeys.length <= 120 && "gap-px"),
					children: periodKeys.map((periodKey, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						title: `${formatPeriod(periodKey)}: ${formatChartValue(periodTotals[index])}`,
						className: "flex h-full min-w-0 flex-1 flex-col-reverse",
						children: chartSeries.map((series, seriesIndex) => series.values[index] > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							title: `${seriesLabel(series)}: ${formatChartValue(series.values[index])}`,
							style: {
								height: `${series.values[index] / maxPeriodTotal * 100}%`,
								backgroundColor: seriesColor(seriesIndex)
							}
						}, series.key) : null)
					}, periodKey))
				}),
				axis,
				legend
			]
		});
	};
	const isPeriodChart = rollup !== "total";
	if (isPeriodChart ? exploreTimelineLoading : exploreStatsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.usage-distribution-chart",
		className: "flex flex-col gap-2 p-3",
		children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 rounded-md" }, index))
	});
	if (isPeriodChart) return renderPeriodChart();
	const entries = [...exploreTopBuckets.map((bucket, index) => {
		const value = getMetricValue(bucket, chartMetric);
		return {
			key: getBucketKey(bucket),
			label: renderBucketLabel(bucket),
			plainLabel: getBucketLabel(bucket),
			value,
			tokens: bucket.totalTokens,
			requests: bucket.requestCount,
			cost: bucket.totalCost,
			share: totalExploreMetric > 0 ? value / totalExploreMetric : 0,
			color: CHART_COLORS[index % CHART_COLORS.length]
		};
	}), ...otherExploreMetric > 0 ? [{
		key: "other",
		label: t("common.other"),
		plainLabel: t("common.other"),
		value: otherExploreMetric,
		tokens: exploreOther.totalTokens,
		requests: exploreOther.requestCount,
		cost: exploreOther.totalCost,
		share: totalExploreMetric > 0 ? otherExploreMetric / totalExploreMetric : 0,
		color: CHART_COLORS[exploreTopBuckets.length % CHART_COLORS.length]
	}] : []];
	if (entries.length === 0) return renderEmptyDistribution();
	const renderHoverCardForEntry = (entry, children) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageDistributionHoverCard, {
		label: entry.label,
		metric: formatChartValue(entry.value),
		share: formatShare(entry.share),
		tokens: formatCompactNumber(entry.tokens),
		requests: entry.requests,
		cost: formatCost(entry.cost, costCurrency),
		costCurrency,
		labels: {
			share: t("settings.usage.explore.shareLabel"),
			tokens: t("settings.usage.table.tokens"),
			requests: t("settings.usage.metric.requests"),
			cost: t("settings.usage.table.cost")
		},
		children
	}, entry.key);
	if (chartType === "pie") {
		let offset = 0;
		const radius = 56;
		const circumference = 2 * Math.PI * radius;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.usage-distribution-chart",
			className: "grid min-w-0 @[820px]/usage:grid-cols-[18rem_minmax(0,1fr)] grid-cols-1 gap-4 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-64 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					"data-ui": "settings.usage-distribution-chart.img",
					viewBox: "0 0 160 160",
					className: "-rotate-90 size-56",
					role: "img",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: t("settings.usage.chart.pie") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "80",
							r: radius,
							fill: "none",
							stroke: "var(--muted)",
							strokeWidth: "22"
						}),
						entries.map((entry) => {
							const length = entry.share * circumference;
							const dashOffset = -offset;
							offset += length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "80",
								cy: "80",
								r: radius,
								fill: "none",
								stroke: entry.color,
								strokeWidth: "22",
								strokeDasharray: `${length} ${circumference - length}`,
								strokeDashoffset: dashOffset,
								strokeLinecap: "butt",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${entry.plainLabel}: ${formatChartValue(entry.value)} (${formatShare(entry.share)})` })
							}, entry.key);
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid min-w-0 @[820px]/usage:grid-cols-2 content-start gap-2",
				children: entries.map((entry) => renderHoverCardForEntry(entry, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 rounded-full",
							style: { backgroundColor: entry.color }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate text-foreground text-sm",
							children: entry.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-medium text-foreground text-xs",
							children: formatChartValue(entry.value)
						})
					]
				})))
			})]
		});
	}
	const maxExploreMetric = Math.max(...entries.map((entry) => entry.value), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.usage-distribution-chart",
		className: "min-w-0 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-3 min-w-0 overflow-hidden rounded-full bg-muted",
			"aria-hidden": true,
			children: entries.map((entry) => renderHoverCardForEntry(entry, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-1",
				style: {
					flexBasis: 0,
					flexGrow: entry.value,
					backgroundColor: entry.color
				}
			})))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid min-w-0 @[820px]/usage:grid-cols-2 grid-cols-1 gap-x-4",
			children: entries.map((entry) => {
				const percent = maxExploreMetric > 0 ? Math.max(3, entry.value / maxExploreMetric * 100) : 0;
				return renderHoverCardForEntry(entry, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 border-border border-t py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1.5 size-2 shrink-0 rounded-full",
								style: { backgroundColor: entry.color }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 text-foreground text-sm",
								children: entry.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 text-right font-medium text-foreground text-xs",
							children: formatChartValue(entry.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full",
							style: {
								width: `${percent}%`,
								backgroundColor: entry.color
							}
						})
					})]
				}));
			})
		})]
	});
}
var FiniteNonnegativeNumberSchema = number().nonnegative().refine(Number.isFinite);
var FiniteNonnegativeIntegerSchema = number().int().nonnegative().refine(Number.isSafeInteger);
var FinitePositiveIntegerSchema = number().int().positive().refine(Number.isSafeInteger);
const AiUsageRecordKindSchema = _enum(["invocation", "legacy-aggregate"]);
const AiUsageRecordMessageKindSchema = _enum(["chat", "agent-session"]);
const AiUsageRecordCostSourceSchema = _enum(["provider", "computed"]);
const AiUsageCostBreakdownSchema = strictObject({
	input: FiniteNonnegativeNumberSchema.optional(),
	output: FiniteNonnegativeNumberSchema.optional(),
	cacheRead: FiniteNonnegativeNumberSchema.optional(),
	cacheWrite: FiniteNonnegativeNumberSchema.optional(),
	image: FiniteNonnegativeNumberSchema.optional()
});
const AiUsagePricingSnapshotSchema = strictObject({
	currency: _enum(objectValues(CURRENCY)),
	inputPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
	outputPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
	cacheReadPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
	cacheWritePerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
	inputTokenTiers: array(strictObject({
		minInputTokens: FinitePositiveIntegerSchema,
		inputPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
		outputPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
		cacheReadPerMillionTokens: FiniteNonnegativeNumberSchema.optional(),
		cacheWritePerMillionTokens: FiniteNonnegativeNumberSchema.optional()
	})).superRefine((tiers, ctx) => {
		for (let index = 1; index < tiers.length; index++) if (tiers[index].minInputTokens <= tiers[index - 1].minInputTokens) ctx.addIssue({
			code: "custom",
			path: [index, "minInputTokens"],
			message: "minInputTokens must be strictly increasing"
		});
	}).optional(),
	perImage: strictObject({
		price: FiniteNonnegativeNumberSchema,
		unit: _enum(["image", "pixel"])
	}).optional(),
	capturedAt: datetime()
});
const AiUsageRecordAttributionSchema = _enum([
	"explicit",
	"matched",
	"auth",
	"unknown"
]);
const AiUsageRecordAuthMethodSchema = _enum([
	"oauth",
	"external-cli",
	"iam-aws",
	"api-key-aws",
	"iam-gcp",
	"iam-azure"
]);
const AiUsageRecordModalitySchema = _enum([
	"language",
	"embedding",
	"image",
	"rerank"
]);
const AiUsageRecordSourceTypeSchema = _enum(["assistant", "agent"]);
strictObject({
	id: uuidv7(),
	requestId: string(),
	recordKind: AiUsageRecordKindSchema,
	requestCount: number().int().positive(),
	messageKind: AiUsageRecordMessageKindSchema.nullable(),
	messageId: string().nullable(),
	providerId: string().nullable(),
	providerName: string().nullable(),
	sourceType: AiUsageRecordSourceTypeSchema.nullable(),
	sourceId: string().nullable(),
	sourceName: string().nullable(),
	sourceIcon: string().nullable(),
	modelId: string().nullable(),
	modelName: string().nullable(),
	modality: AiUsageRecordModalitySchema,
	apiKeyId: string().nullable(),
	apiKeyLabel: string().nullable(),
	apiKeyMasked: string().nullable(),
	apiKeyAttribution: AiUsageRecordAttributionSchema,
	authMethod: AiUsageRecordAuthMethodSchema.nullable(),
	inputTokens: FiniteNonnegativeIntegerSchema.nullable(),
	outputTokens: FiniteNonnegativeIntegerSchema.nullable(),
	totalTokens: FiniteNonnegativeIntegerSchema.nullable(),
	reasoningTokens: FiniteNonnegativeIntegerSchema.nullable(),
	noCacheTokens: FiniteNonnegativeIntegerSchema.nullable(),
	cacheReadTokens: FiniteNonnegativeIntegerSchema.nullable(),
	cacheWriteTokens: FiniteNonnegativeIntegerSchema.nullable(),
	imageCount: FiniteNonnegativeIntegerSchema.nullable(),
	cost: FiniteNonnegativeNumberSchema.nullable(),
	costCurrency: _enum(objectValues(CURRENCY)).nullable(),
	costSource: AiUsageRecordCostSourceSchema.nullable(),
	costBreakdown: AiUsageCostBreakdownSchema.nullable(),
	pricingSnapshot: AiUsagePricingSnapshotSchema.nullable(),
	timeFirstTokenMs: FiniteNonnegativeIntegerSchema.nullable(),
	timeCompletionMs: FiniteNonnegativeIntegerSchema.nullable(),
	timeThinkingMs: FiniteNonnegativeIntegerSchema.nullable(),
	createdAt: datetime()
});
function getAiUsageRecordTotalTokens(record) {
	if (record.totalTokens !== null) return record.totalTokens;
	if (record.inputTokens === null && record.outputTokens === null) return null;
	return (record.inputTokens ?? 0) + (record.outputTokens ?? 0);
}
var EMPTY_VALUE = "-";
var MODALITY_LABEL_KEYS = {
	language: "common.language",
	embedding: "models.type.embedding",
	image: "models.type.image",
	rerank: "models.type.rerank"
};
function UsageEntriesTable({ entries, entryTotal, isLoading, isRefreshing, hasNextPage, sortBy, sortOrder, onSort, onLoadNext, getProviderInfo, dateFormatter, timeFormatter }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage;
	const durationFormatter = (0, import_react.useMemo)(() => createDurationFormatter(locale), [locale]);
	const integerFormatter = (0, import_react.useMemo)(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale]);
	const getAriaSort = (column) => sortBy === column ? sortOrder === "asc" ? "ascending" : "descending" : "none";
	const renderSortHeader = (column, label, align = "left") => {
		const Icon = sortBy === column ? sortOrder === "asc" ? ArrowUp : ArrowDown : ArrowUpDown;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			className: cn("-mx-2 h-7 gap-1.5 px-2 font-medium text-muted-foreground hover:text-foreground", align === "right" && "ml-auto"),
			onClick: () => onSort(column),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })]
		});
	};
	const formatMilliseconds = (value) => {
		if (value === null || value === void 0) return EMPTY_VALUE;
		return durationFormatter(value);
	};
	const formatTps = (value) => value === void 0 ? EMPTY_VALUE : t("settings.usage.table.tpsValue", { value: integerFormatter.format(value) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsagePanel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsagePanelHeader, {
		className: "flex min-w-0 items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsagePanelTitle, { children: t("settings.usage.explore.entries") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-foreground-tertiary text-xs",
			children: t("settings.usage.explore.totalEntries", { count: entryTotal })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 p-3",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 rounded-md" }, index))
		}) : entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-[1040px] table-fixed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[25%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[22%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[19%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[9%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[9%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[7%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[9%]" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("settings.usage.table.model") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("settings.usage.table.source") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						"aria-sort": getAriaSort("createdAt"),
						children: renderSortHeader("createdAt", t("settings.usage.table.date"))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						"aria-sort": getAriaSort("totalTokens"),
						children: renderSortHeader("totalTokens", t("settings.usage.table.tokens"), "right")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						"aria-sort": getAriaSort("cost"),
						children: renderSortHeader("cost", t("settings.usage.table.cost"), "right")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						"aria-sort": getAriaSort("timeFirstTokenMs"),
						children: renderSortHeader("timeFirstTokenMs", t("settings.usage.table.ttft"), "right")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						"aria-sort": getAriaSort("tokensPerSecond"),
						children: renderSortHeader("tokensPerSecond", t("settings.usage.table.tps"), "right")
					})
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: entries.map((entry) => {
					const tps = getGenerationTokensPerSecond(entry);
					const totalTokens = getAiUsageRecordTotalTokens(entry);
					const sourceName = entry.sourceId ? entry.sourceName || entry.sourceId : t(MODALITY_LABEL_KEYS[entry.modality]);
					const modelName = entry.modelName || displayModelId(entry.modelId) || EMPTY_VALUE;
					const providerName = getProviderInfo(entry.providerId ?? "", entry.providerName).name || EMPTY_VALUE;
					const createdAt = new Date(entry.createdAt);
					const createdAtLabel = `${dateFormatter.format(createdAt)} ${timeFormatter.format(createdAt)}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageModelAvatar, {
									modelId: entry.modelId,
									providerId: entry.providerId ?? "",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-medium text-foreground text-sm leading-5",
										title: modelName,
										children: modelName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-muted-foreground text-xs leading-4",
										title: providerName,
										children: providerName
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 truncate text-foreground text-sm",
								children: entry.sourceId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageSourceLabel, {
									sourceType: entry.sourceType,
									sourceIcon: entry.sourceIcon,
									size: 14,
									className: "max-w-full gap-1.5 [&>span:last-child]:truncate",
									children: sourceName
								}) : sourceName
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "min-w-0 text-muted-foreground text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: entry.createdAt,
								className: "block truncate whitespace-nowrap tabular-nums",
								title: createdAtLabel,
								children: createdAtLabel
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-right font-medium tabular-nums",
							children: totalTokens === null ? EMPTY_VALUE : formatCompactNumber(totalTokens)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-right tabular-nums",
							children: entry.cost !== null && entry.cost !== void 0 ? formatCost(entry.cost, entry.costCurrency) : EMPTY_VALUE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-right tabular-nums",
							children: formatMilliseconds(entry.timeFirstTokenMs)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-right tabular-nums",
							children: formatTps(tps)
						})
					] }, entry.id);
				}) })
			]
		}), hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center pt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				disabled: isRefreshing,
				onClick: onLoadNext,
				children: isRefreshing ? t("settings.usage.explore.loading") : t("settings.usage.explore.loadMore")
			})
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			compact: true,
			preset: "no-result",
			title: t("settings.usage.explore.noEntries"),
			description: t("settings.usage.explore.noEntriesDescription")
		})
	})] });
}
var CELL_SIZE = 12;
var CELL_GAP = 3;
var MIN_HEATMAP_DAYS = 365;
function startOfLocalWeek(date, firstDayOfWeek) {
	const day = startOfLocalDay(date);
	day.setDate(day.getDate() - (day.getDay() - firstDayOfWeek + 7) % 7);
	return day;
}
function endOfLocalWeek(date, firstDayOfWeek) {
	const day = startOfLocalWeek(date, firstDayOfWeek);
	day.setDate(day.getDate() + 6);
	return day;
}
function buildHeatmapDays(buckets, range, firstDayOfWeek) {
	const today = startOfLocalDay(/* @__PURE__ */ new Date());
	let rangeFirstDay;
	let rangeLastDay;
	if (range?.from !== void 0) {
		rangeFirstDay = startOfLocalDay(new Date(range.from));
		rangeLastDay = startOfLocalDay(new Date(range.to ?? Date.now()));
	} else if (buckets.length > 0) {
		const times = buckets.map((bucket) => parseDateKey(bucket.date).getTime());
		rangeFirstDay = new Date(Math.min(...times));
		rangeLastDay = today;
	} else {
		rangeLastDay = today;
		rangeFirstDay = new Date(today);
		rangeFirstDay.setDate(today.getDate() - 29);
	}
	const minimumFirstDay = new Date(rangeLastDay);
	minimumFirstDay.setDate(minimumFirstDay.getDate() - MIN_HEATMAP_DAYS + 1);
	const firstWeekDay = startOfLocalWeek(rangeFirstDay.getTime() < minimumFirstDay.getTime() ? rangeFirstDay : minimumFirstDay, firstDayOfWeek);
	const lastWeekDay = endOfLocalWeek(rangeLastDay, firstDayOfWeek);
	const days = [];
	const cursor = new Date(firstWeekDay);
	while (cursor.getTime() <= lastWeekDay.getTime()) {
		const date = new Date(cursor);
		days.push({
			date,
			key: toDateKey(date),
			isFuture: date.getTime() > today.getTime(),
			isOutsideRange: date.getTime() < rangeFirstDay.getTime() || date.getTime() > rangeLastDay.getTime()
		});
		cursor.setDate(cursor.getDate() + 1);
	}
	return days;
}
function getBucketValue(bucket, metric) {
	if (!bucket) return 0;
	return metric === "cost" ? bucket.totalCost : bucket.totalTokens;
}
function quantile(sorted, ratio) {
	if (sorted.length === 0) return 0;
	return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * ratio))];
}
function getIntensity(value, thresholds) {
	if (value <= 0) return 0;
	if (value <= thresholds[0]) return 1;
	if (value <= thresholds[1]) return 2;
	if (value <= thresholds[2]) return 3;
	return 4;
}
function useElementWidth() {
	const ref = (0, import_react.useRef)(null);
	const [width, setWidth] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const element = ref.current;
		if (!element) return;
		const updateWidth = () => setWidth(element.clientWidth);
		updateWidth();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(updateWidth);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	return {
		ref,
		width
	};
}
var intensityClassNames = {
	0: "bg-muted/70",
	1: "bg-primary/25",
	2: "bg-primary/45",
	3: "bg-primary/70",
	4: "bg-primary"
};
function UsageHeatmap({ buckets, selectedDate, metric, onMetricChange, onSelectDate, costCurrency, isLoading, range }) {
	const { t, i18n } = useTranslation();
	const { ref: heatmapRef, width: heatmapWidth } = useElementWidth();
	const firstDayOfWeek = (0, import_react.useMemo)(() => getLocaleFirstDayOfWeek(i18n.resolvedLanguage), [i18n.resolvedLanguage]);
	const days = (0, import_react.useMemo)(() => buildHeatmapDays(buckets, range, firstDayOfWeek), [
		buckets,
		firstDayOfWeek,
		range
	]);
	const weeks = (0, import_react.useMemo)(() => Array.from({ length: Math.ceil(days.length / 7) }, (_, index) => days.slice(index * 7, index * 7 + 7)), [days]);
	const bucketMap = (0, import_react.useMemo)(() => new Map(buckets.map((bucket) => [bucket.date, bucket])), [buckets]);
	const thresholds = (0, import_react.useMemo)(() => {
		const values = buckets.map((bucket) => getBucketValue(bucket, metric)).filter((value) => value > 0).sort((a, b) => a - b);
		return [
			quantile(values, .25),
			quantile(values, .5),
			quantile(values, .75)
		];
	}, [buckets, metric]);
	(0, import_react.useEffect)(() => {
		const element = heatmapRef.current;
		if (!element) return;
		element.scrollLeft = element.scrollWidth - element.clientWidth;
	}, [
		days,
		heatmapRef,
		heatmapWidth
	]);
	const monthLabels = (0, import_react.useMemo)(() => {
		const formatter = new Intl.DateTimeFormat(i18n.language, { month: "short" });
		let previousVisibleIndex = -Infinity;
		return weeks.map((week, weekIndex) => {
			const day = week[0];
			const previous = weekIndex > 0 ? weeks[weekIndex - 1][0] : void 0;
			const label = !previous || previous.date.getMonth() !== day.date.getMonth() ? formatter.format(day.date) : "";
			if (!label || weekIndex - previousVisibleIndex < 3) return "";
			previousVisibleIndex = weekIndex;
			return label;
		});
	}, [i18n.language, weeks]);
	const dateFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(i18n.language, {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), [i18n.language]);
	const metricOptions = (0, import_react.useMemo)(() => [{
		value: "tokens",
		label: t("settings.usage.metric.tokens")
	}, {
		value: "cost",
		label: t("settings.usage.metric.cost")
	}], [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.usage-heatmap",
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsagePanelTitle, {
				className: "min-w-0",
				children: t("settings.usage.heatmap.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
					options: metricOptions,
					value: metric,
					onValueChange: onMetricChange,
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: heatmapRef,
			className: "min-w-0 max-w-full overflow-x-auto pb-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-max min-w-full justify-end",
				style: { gap: CELL_GAP },
				children: weeks.map((week, weekIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid shrink-0",
					style: {
						width: CELL_SIZE,
						gap: CELL_GAP,
						gridTemplateRows: `16px repeat(7, ${CELL_SIZE}px)`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-4 overflow-visible whitespace-nowrap pr-3 text-[10px] text-foreground-tertiary leading-4",
						children: monthLabels[weekIndex]
					}), isLoading ? week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						className: "rounded-[3px]",
						style: {
							height: CELL_SIZE,
							width: CELL_SIZE
						}
					}, day.key)) : week.map((day) => {
						if (day.isOutsideRange) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "rounded-[3px] bg-muted/30",
							style: {
								height: CELL_SIZE,
								width: CELL_SIZE
							}
						}, day.key);
						const bucket = bucketMap.get(day.key);
						const value = getBucketValue(bucket, metric);
						const intensity = getIntensity(value, thresholds);
						const tooltipValue = metric === "cost" ? t("settings.usage.tooltip.cost", { value: formatCost(value, costCurrency) }) : t("settings.usage.tooltip.tokens", { value: formatCompactNumber(value) });
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NormalTooltip, {
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dateFormatter.format(day.date) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tooltipValue }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.usage.tooltip.requests", { count: bucket?.requestCount ?? 0 }) })
								]
							}),
							side: "top",
							sideOffset: 4,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-disabled": day.isFuture,
								"aria-label": t("settings.usage.heatmap.ariaDate", { date: dateFormatter.format(day.date) }),
								onClick: () => {
									if (!day.isFuture) onSelectDate(day.key);
								},
								className: cn("rounded-[3px] border border-transparent transition-colors", intensityClassNames[intensity], day.isFuture && "cursor-default opacity-30", !day.isFuture && "hover:border-primary/70", selectedDate === day.key && "border-primary ring-2 ring-primary/30"),
								style: {
									height: CELL_SIZE,
									width: CELL_SIZE
								}
							})
						}, day.key);
					})]
				}, week[0]?.key ?? weekIndex))
			})
		})]
	});
}
var ENTRY_PAGE_SIZE = 25;
var USAGE_REFRESH_DEBOUNCE_MS = 300;
var EMPTY_STATS_BUCKETS = [];
function useUsageData({ windowRange, previousWindowRange, activeRange, groupBy, chartMetric, rollup, topCount, selectedCurrency, entrySortBy, entrySortOrder }) {
	const timelineQueryResult = useQuery("/ai-usage-records/timeline", { query: (0, import_react.useMemo)(() => ({
		metric: "tokens",
		limit: 1,
		...toQueryRange(windowRange)
	}), [windowRange]) });
	const costTotals = (0, import_react.useMemo)(() => timelineQueryResult.data?.costTotals ?? [], [timelineQueryResult.data?.costTotals]);
	const costCurrency = selectCostTotal(costTotals, selectedCurrency)?.currency;
	const queryCurrency = costCurrency ?? CURRENCY.USD;
	const overviewStatsQuery = (0, import_react.useMemo)(() => ({
		groupBy: "model",
		metric: "tokens",
		currency: queryCurrency,
		limit: 1,
		...toQueryRange(windowRange)
	}), [queryCurrency, windowRange]);
	const previousOverviewStatsQuery = (0, import_react.useMemo)(() => ({
		groupBy: "model",
		metric: "tokens",
		currency: queryCurrency,
		limit: 1,
		...toQueryRange(previousWindowRange)
	}), [previousWindowRange, queryCurrency]);
	const exploreQuery = (0, import_react.useMemo)(() => ({
		groupBy,
		metric: chartMetric,
		currency: queryCurrency,
		limit: topCount,
		...toQueryRange(activeRange)
	}), [
		activeRange,
		chartMetric,
		groupBy,
		queryCurrency,
		topCount
	]);
	const entriesQuery = (0, import_react.useMemo)(() => ({
		sortBy: entrySortBy,
		sortOrder: entrySortOrder,
		...entrySortBy === "cost" ? { costCurrency: queryCurrency } : {},
		...toQueryRange(activeRange)
	}), [
		activeRange,
		entrySortBy,
		entrySortOrder,
		queryCurrency
	]);
	const overviewStatsResult = useQuery("/ai-usage-records/stats", { query: overviewStatsQuery });
	const previousOverviewStatsResult = useQuery("/ai-usage-records/stats", { query: previousOverviewStatsQuery });
	const exploreStatsResult = useQuery("/ai-usage-records/stats", { query: exploreQuery });
	const exploreTimelineResult = useQuery("/ai-usage-records/timeline", {
		query: exploreQuery,
		enabled: rollup !== "total"
	});
	const refetchTimeline = timelineQueryResult.refetch;
	const refetchOverviewStats = overviewStatsResult.refetch;
	const refetchPreviousOverviewStats = previousOverviewStatsResult.refetch;
	const refetchExploreStats = exploreStatsResult.refetch;
	const refetchExploreTimeline = exploreTimelineResult.refetch;
	const { pages: entryPages, isLoading: entriesLoading, isRefreshing: entriesRefreshing, hasNext: hasNextEntryPage, loadNext: loadNextEntryPage, refresh: refreshEntryPages, reset: resetEntryPages } = useInfiniteQuery("/ai-usage-records", {
		query: entriesQuery,
		limit: ENTRY_PAGE_SIZE,
		swrOptions: { keepPreviousData: false }
	});
	const entries = useInfiniteFlatItems(entryPages);
	const entryTotal = entryPages[0]?.total ?? 0;
	const resetEntryPagesRef = (0, import_react.useRef)(resetEntryPages);
	resetEntryPagesRef.current = resetEntryPages;
	(0, import_react.useEffect)(() => {
		resetEntryPagesRef.current();
	}, [
		activeRange.from,
		activeRange.to,
		entrySortBy,
		entrySortOrder,
		queryCurrency
	]);
	const refreshUsageReadModels = (0, import_react.useMemo)(() => debounce(() => {
		const refreshEntries = () => {
			resetEntryPages();
			return refreshEntryPages();
		};
		Promise.all([
			refetchTimeline(),
			refetchOverviewStats(),
			refetchPreviousOverviewStats(),
			refetchExploreStats(),
			refetchExploreTimeline(),
			refreshEntries()
		]);
	}, USAGE_REFRESH_DEBOUNCE_MS), [
		refetchExploreStats,
		refetchExploreTimeline,
		refetchOverviewStats,
		refetchPreviousOverviewStats,
		refetchTimeline,
		refreshEntryPages,
		resetEntryPages
	]);
	useDataChange([
		"/ai-usage-records",
		"/ai-usage-records/stats",
		"/ai-usage-records/timeline"
	], refreshUsageReadModels);
	(0, import_react.useEffect)(() => () => refreshUsageReadModels.cancel(), [refreshUsageReadModels]);
	const timelineRows = timelineQueryResult.data?.buckets ?? EMPTY_TIMELINE_BUCKETS;
	const overviewBuckets = overviewStatsResult.data?.buckets ?? EMPTY_STATS_BUCKETS;
	const exploreBuckets = exploreStatsResult.data?.buckets ?? EMPTY_STATS_BUCKETS;
	const exploreTimelineRows = rollup === "total" ? EMPTY_TIMELINE_BUCKETS : exploreTimelineResult.data?.buckets ?? EMPTY_TIMELINE_BUCKETS;
	return {
		costTotals,
		costCurrency,
		timelineBuckets: (0, import_react.useMemo)(() => applyTimelineCurrency(timelineRows, timelineQueryResult.data?.dailyCosts ?? [], costCurrency), [
			costCurrency,
			timelineQueryResult.data?.dailyCosts,
			timelineRows
		]),
		overviewBuckets,
		exploreBuckets,
		exploreTimelineRows,
		overviewTotals: overviewStatsResult.data?.totals ?? EMPTY_STATS_METRICS,
		previousOverviewTotals: previousOverviewStatsResult.data?.totals ?? EMPTY_STATS_METRICS,
		exploreTotals: exploreStatsResult.data?.totals ?? EMPTY_STATS_METRICS,
		exploreOther: exploreStatsResult.data?.other ?? EMPTY_STATS_METRICS,
		timelineLoading: timelineQueryResult.isLoading,
		overviewLoading: overviewStatsResult.isLoading,
		exploreStatsLoading: exploreStatsResult.isLoading,
		exploreTimelineLoading: exploreTimelineResult.isLoading,
		entries,
		entryTotal,
		entriesLoading,
		entriesRefreshing,
		hasNextEntryPage,
		loadNextEntryPage
	};
}
function UsageSettings() {
	const { t, i18n } = useTranslation();
	const [windowKey, setWindowKey] = (0, import_react.useState)("30d");
	const [groupBy, setGroupBy] = (0, import_react.useState)("provider");
	const [chartMetric, setChartMetric] = (0, import_react.useState)("tokens");
	const [selectedChartType, setSelectedChartType] = (0, import_react.useState)("bar");
	const [rollup, setRollup] = (0, import_react.useState)("daily");
	const [topCount, setTopCount] = (0, import_react.useState)(10);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)();
	const [selectedCurrency, setSelectedCurrency] = (0, import_react.useState)();
	const [heatmapMetric, setHeatmapMetric] = (0, import_react.useState)("tokens");
	const [entrySortBy, setEntrySortBy] = (0, import_react.useState)("createdAt");
	const [entrySortOrder, setEntrySortOrder] = (0, import_react.useState)("desc");
	const windowRange = (0, import_react.useMemo)(() => getWindowRange(windowKey), [windowKey]);
	const previousWindowRange = (0, import_react.useMemo)(() => getPreviousWindowRange(windowKey), [windowKey]);
	const activeRange = (0, import_react.useMemo)(() => selectedDate ? rangeFromDateKey(selectedDate) : void 0, [selectedDate]) ?? windowRange;
	const { providers } = useProviders();
	const providerMap = (0, import_react.useMemo)(() => new Map(providers.map((provider) => [provider.id, provider])), [providers]);
	const { costTotals, costCurrency, timelineBuckets, overviewBuckets, exploreBuckets, exploreTimelineRows, overviewTotals, previousOverviewTotals, exploreTotals, exploreOther, timelineLoading, overviewLoading, exploreStatsLoading, exploreTimelineLoading, entries, entryTotal, entriesLoading, entriesRefreshing, hasNextEntryPage, loadNextEntryPage } = useUsageData({
		windowRange,
		previousWindowRange,
		activeRange,
		groupBy,
		chartMetric,
		rollup,
		topCount,
		selectedCurrency,
		entrySortBy,
		entrySortOrder
	});
	const activeDateKeys = (0, import_react.useMemo)(() => timelineBuckets.filter((bucket) => bucket.requestCount > 0).map((bucket) => bucket.date), [timelineBuckets]);
	const totalTokens = overviewTotals.totalTokens;
	const totalRequests = overviewTotals.requestCount;
	const previousTotalTokens = previousOverviewTotals.totalTokens;
	const previousTotalRequests = previousOverviewTotals.requestCount;
	const activeDays = activeDateKeys.length;
	const longestStreak = (0, import_react.useMemo)(() => getLongestStreak(activeDateKeys), [activeDateKeys]);
	const cacheMetrics = (0, import_react.useMemo)(() => getCacheUsageMetrics([overviewTotals]), [overviewTotals]);
	const previousCacheMetrics = (0, import_react.useMemo)(() => getCacheUsageMetrics([previousOverviewTotals]), [previousOverviewTotals]);
	const totalCost = costCurrency ? overviewTotals.totalCost : void 0;
	const previousTotalCost = costCurrency ? previousOverviewTotals.totalCost : void 0;
	const costTrendValues = (0, import_react.useMemo)(() => getTimelineSeries(timelineBuckets, windowRange, (bucket) => bucket.totalCost), [timelineBuckets, windowRange]);
	const requestTrendValues = (0, import_react.useMemo)(() => getTimelineSeries(timelineBuckets, windowRange, (bucket) => bucket.requestCount), [timelineBuckets, windowRange]);
	const tokenTrendValues = (0, import_react.useMemo)(() => getTimelineSeries(timelineBuckets, windowRange, (bucket) => bucket.totalTokens), [timelineBuckets, windowRange]);
	const cacheHitRateTrendValues = (0, import_react.useMemo)(() => getTimelineSeries(timelineBuckets, windowRange, (bucket) => {
		const observableTokens = bucket.totalNoCacheTokens + bucket.totalCacheReadTokens + bucket.totalCacheWriteTokens;
		return observableTokens > 0 ? bucket.totalCacheReadTokens / observableTokens : 0;
	}), [timelineBuckets, windowRange]);
	const cacheHitRateDelta = cacheMetrics.hitRate !== void 0 && previousCacheMetrics.hitRate !== void 0 ? cacheMetrics.hitRate - previousCacheMetrics.hitRate : void 0;
	const peakDay = (0, import_react.useMemo)(() => timelineBuckets.reduce((best, bucket) => !best || bucket.totalTokens > best.totalTokens ? bucket : best, void 0), [timelineBuckets]);
	const topModel = (0, import_react.useMemo)(() => overviewBuckets.filter((bucket) => bucket.groupBy === "model").reduce((best, bucket) => !best || bucket.totalTokens > best.totalTokens ? bucket : best, void 0), [overviewBuckets]);
	const dateFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(i18n.language, {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), [i18n.language]);
	const monthFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(i18n.language, {
		year: "numeric",
		month: "short"
	}), [i18n.language]);
	const percentFormatter = (0, import_react.useMemo)(() => new Intl.NumberFormat(i18n.language, {
		style: "percent",
		maximumFractionDigits: 1,
		signDisplay: "exceptZero"
	}), [i18n.language]);
	const hitRateFormatter = (0, import_react.useMemo)(() => new Intl.NumberFormat(i18n.language, {
		style: "percent",
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}), [i18n.language]);
	const formatDelta = (0, import_react.useCallback)((value) => percentFormatter.format(value), [percentFormatter]);
	const formatShare = (0, import_react.useCallback)((value) => value > 0 && value < .001 ? "<0.1%" : hitRateFormatter.format(value), [hitRateFormatter]);
	const entryDateFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(i18n.language, {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), [i18n.language]);
	const entryTimeFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(i18n.language, {
		hour: "2-digit",
		minute: "2-digit"
	}), [i18n.language]);
	const windowOptions = (0, import_react.useMemo)(() => WINDOW_KEYS.map((value) => ({
		value,
		label: t(WINDOW_LABEL_KEYS[value])
	})), [t]);
	const groupByOptions = (0, import_react.useMemo)(() => GROUP_BY_KEYS.map((value) => ({
		value,
		label: t(GROUP_BY_LABEL_KEYS[value])
	})), [t]);
	const metricOptions = (0, import_react.useMemo)(() => METRIC_KEYS.map((value) => ({
		value,
		label: t(METRIC_LABEL_KEYS[value])
	})), [t]);
	const currencyOptions = (0, import_react.useMemo)(() => costTotals.map((item) => ({
		value: item.currency,
		label: item.currency
	})), [costTotals]);
	const rollupOptions = (0, import_react.useMemo)(() => ROLLUP_KEYS.map((value) => ({
		value,
		label: t(ROLLUP_LABEL_KEYS[value])
	})), [t]);
	const topCountOptions = (0, import_react.useMemo)(() => TOP_COUNT_KEYS.map((value) => ({
		value: String(value),
		label: String(value)
	})), []);
	const availableChartTypes = rollup === "total" ? TOTAL_CHART_TYPES : PERIOD_CHART_TYPES;
	const chartType = availableChartTypes.includes(selectedChartType) ? selectedChartType : availableChartTypes[0];
	const chartTypeOptions = (0, import_react.useMemo)(() => availableChartTypes.map((value) => ({
		value,
		label: t(CHART_TYPE_LABEL_KEYS[value])
	})), [availableChartTypes, t]);
	const selectedDateLabel = selectedDate ? dateFormatter.format(parseDateKey(selectedDate)) : void 0;
	const analysisSummary = [
		t(GROUP_BY_LABEL_KEYS[groupBy]),
		t(METRIC_LABEL_KEYS[chartMetric]),
		t(ROLLUP_LABEL_KEYS[rollup]),
		t(CHART_TYPE_LABEL_KEYS[chartType])
	].join(" / ");
	const hasUsage = totalRequests > 0 || timelineBuckets.some((bucket) => bucket.requestCount > 0);
	const isInitialLoading = timelineLoading || overviewLoading;
	const totalExploreMetric = getMetricValue(exploreTotals, chartMetric);
	const getProviderInfo = (id, snapshotName) => {
		const provider = providerMap.get(id);
		return {
			id,
			name: snapshotName ?? provider?.name ?? id
		};
	};
	const getProviderName = (id, snapshotName) => getProviderInfo(id, snapshotName).name;
	const getApiKeyLabel = (apiKey) => {
		if (apiKey.apiKeyAttribution === "auth") return apiKey.authMethod ? `${t("settings.usage.cards.providerAuth")} · ${apiKey.authMethod}` : t("settings.usage.cards.providerAuth");
		if (!apiKey.apiKeyId) return t("settings.usage.cards.unattributedApiKey");
		return `${apiKey.apiKeyLabel || apiKey.apiKeyMasked || apiKey.apiKeyId} · ${apiKey.apiKeyAttribution === "matched" ? t("settings.usage.cards.matchedApiKey") : t("settings.usage.cards.explicitApiKey")}`;
	};
	const getSourceLabel = (bucket) => {
		if (!bucket.sourceType || !bucket.sourceId) return t("settings.usage.cards.unattributedSource");
		return bucket.sourceName || bucket.sourceId;
	};
	const getBucketLabel = (bucket) => {
		if (groupBy === "provider") return getProviderName(bucket.providerId ?? "", bucket.providerName);
		if (groupBy === "model") return displayModelId(bucket.modelId) || t("settings.usage.cards.none");
		if (groupBy === "source") return getSourceLabel(bucket);
		return getApiKeyLabel({
			apiKeyId: bucket.apiKeyId ?? null,
			apiKeyLabel: bucket.apiKeyLabel ?? null,
			apiKeyMasked: bucket.apiKeyMasked ?? null,
			apiKeyAttribution: bucket.apiKeyAttribution ?? "unknown",
			authMethod: bucket.authMethod ?? null
		});
	};
	const handleEntrySort = (sortBy) => {
		setEntrySortOrder((currentOrder) => entrySortBy === sortBy && currentOrder === "desc" ? "asc" : "desc");
		setEntrySortBy(sortBy);
	};
	const renderBucketLabel = (bucket) => {
		const label = getBucketLabel(bucket);
		if (groupBy === "model") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageModelLabel, {
			modelId: bucket.modelId,
			providerId: bucket.providerId ?? "",
			children: label
		});
		if (groupBy === "source") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageSourceLabel, {
			sourceType: bucket.sourceType,
			sourceIcon: bucket.sourceIcon,
			children: label
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageProviderLabel, {
			provider: getProviderInfo(bucket.providerId ?? "", bucket.providerName),
			children: label
		});
	};
	const formatChartValue = (value) => chartMetric === "cost" ? formatCost(value, costCurrency) : formatCompactNumber(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.usage-settings",
		className: "flex min-h-0 flex-1 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsageResponsiveShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsageSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsageSectionHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageSectionTitle, { children: t("settings.usage.overview.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground text-sm",
				children: t("settings.usage.summary", {
					window: t(WINDOW_LABEL_KEYS[windowKey]),
					tokens: formatCompactNumber(totalTokens),
					requests: formatCompactNumber(totalRequests)
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [currencyOptions.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
					"aria-label": t("settings.usage.currency"),
					options: currencyOptions,
					value: costCurrency,
					onValueChange: setSelectedCurrency,
					size: "sm"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
					options: windowOptions,
					value: windowKey,
					onValueChange: (value) => {
						setWindowKey(value);
						setSelectedDate(void 0);
					},
					size: "sm"
				})
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsagePanel, { children: [
			isInitialLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStripSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 @[560px]/usage:grid-cols-2 @[900px]/usage:grid-cols-4 grid-cols-1 gap-px border-border border-b bg-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCell, {
						label: t("settings.usage.cards.totalCost"),
						trendValues: costTrendValues,
						delta: getRatioChange(totalCost, previousTotalCost),
						deltaLabel: t("settings.usage.cards.lastPeriod"),
						formatDelta,
						value: totalCost !== void 0 ? formatCost(totalCost, costCurrency) : t("settings.usage.cards.none")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCell, {
						label: t("settings.usage.cards.totalRequests"),
						trendValues: requestTrendValues,
						delta: getRatioChange(totalRequests, previousTotalRequests),
						deltaLabel: t("settings.usage.cards.lastPeriod"),
						formatDelta,
						value: formatCompactNumber(totalRequests)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCell, {
						label: t("settings.usage.cards.totalTokens"),
						trendValues: tokenTrendValues,
						delta: getRatioChange(totalTokens, previousTotalTokens),
						deltaLabel: t("settings.usage.cards.lastPeriod"),
						formatDelta,
						value: formatCompactNumber(totalTokens)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCell, {
						label: t("settings.usage.cards.cacheHitRate"),
						trendValues: cacheHitRateTrendValues,
						delta: cacheHitRateDelta,
						deltaLabel: t("settings.usage.cards.lastPeriod"),
						formatDelta,
						value: cacheMetrics.hitRate !== void 0 ? hitRateFormatter.format(cacheMetrics.hitRate) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-5",
							children: t("settings.usage.cards.cacheStartsWithNewRequests")
						}),
						helper: cacheMetrics.hitRate !== void 0 ? t("settings.usage.cards.cacheObservedTokens", { tokens: formatCompactNumber(cacheMetrics.observableTokens) }) : void 0
					})
				]
			}),
			!isInitialLoading && hasUsage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 @[560px]/usage:grid-cols-2 @[900px]/usage:grid-cols-4 grid-cols-1 gap-px border-border border-b bg-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCell, {
						label: t("settings.usage.cards.activeDays"),
						value: activeDays,
						helper: t("settings.usage.cards.streak", { days: longestStreak })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCell, {
						label: t("settings.usage.cards.peakDay"),
						value: peakDay ? formatCompactNumber(peakDay.totalTokens) : t("settings.usage.cards.none"),
						helper: peakDay ? dateFormatter.format(parseDateKey(peakDay.date)) : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCell, {
						label: t("settings.usage.cards.topModel"),
						value: topModel?.modelId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageModelLabel, {
							modelId: topModel.modelId,
							providerId: topModel.providerId ?? "",
							size: 16,
							children: displayModelId(topModel.modelId)
						}) : t("settings.usage.cards.none"),
						helper: topModel ? formatCompactNumber(topModel.totalTokens) : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCell, {
						label: t("settings.usage.cards.dailyAverage"),
						value: formatCompactNumber(activeDays > 0 ? totalTokens / activeDays : 0),
						helper: t("settings.usage.tooltip.requests", { count: totalRequests })
					})
				]
			}),
			hasUsage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "@[640px]/usage:p-4 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageHeatmap, {
					buckets: timelineBuckets,
					selectedDate,
					metric: heatmapMetric,
					onMetricChange: setHeatmapMetric,
					onSelectDate: (date) => setSelectedDate((current) => current === date ? void 0 : date),
					costCurrency,
					isLoading: timelineLoading,
					range: windowRange
				})
			}),
			!hasUsage && !isInitialLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "@[640px]/usage:p-4 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					compact: true,
					preset: "no-result",
					title: t("settings.usage.empty.title"),
					description: t("settings.usage.empty.description")
				})
			})
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsageSection, {
			className: cn(!hasUsage && "hidden"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageSectionHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageSectionTitle, { children: selectedDateLabel ? t("settings.usage.explore.drilldownTitle", { date: selectedDateLabel }) : t("settings.usage.explore.title") }), selectedDateLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-2 text-foreground-tertiary text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.usage.explore.selectedDate", { date: selectedDateLabel }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-6",
						"aria-label": t("settings.usage.explore.clearDate"),
						onClick: () => setSelectedDate(void 0),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})]
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UsagePanel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsagePanelHeader, {
					className: "flex min-w-0 flex-col gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 @[760px]/usage:flex-row flex-col @[760px]/usage:items-start @[760px]/usage:justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsagePanelTitle, { children: t("settings.usage.explore.analysis") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-foreground-tertiary text-xs",
								children: [
									analysisSummary,
									" / ",
									formatChartValue(totalExploreMetric)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "max-w-full justify-between gap-2 @[760px]/usage:self-auto self-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 truncate",
										children: analysisSummary
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" })]
							}) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
							align: "end",
							className: "w-[calc(100vw-2rem)] max-w-lg p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageControlRow, {
										label: t("settings.usage.explore.groupBy"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
											options: groupByOptions,
											value: groupBy,
											onValueChange: setGroupBy,
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageControlRow, {
										label: t("settings.usage.explore.metric"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
											options: metricOptions,
											value: chartMetric,
											onValueChange: setChartMetric,
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageControlRow, {
										label: t("settings.usage.explore.rollup"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
											options: rollupOptions,
											value: rollup,
											onValueChange: setRollup,
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageControlRow, {
										label: t("settings.usage.explore.top"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
											options: topCountOptions,
											value: String(topCount),
											onValueChange: (value) => setTopCount(Number(value)),
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageControlRow, {
										label: t("settings.usage.explore.chart"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
											options: chartTypeOptions,
											value: chartType,
											onValueChange: setSelectedChartType,
											size: "sm"
										})
									})
								]
							})
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageDistributionChart, {
					activeRange,
					timelineBuckets,
					exploreBuckets,
					exploreTimelineRows,
					exploreTotals,
					exploreOther,
					rollup,
					chartMetric,
					chartType,
					topCount,
					costCurrency,
					exploreStatsLoading,
					exploreTimelineLoading,
					dateFormatter,
					monthFormatter,
					formatShare,
					getBucketLabel,
					renderBucketLabel
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageEntriesTable, {
					entries,
					entryTotal,
					isLoading: entriesLoading,
					isRefreshing: entriesRefreshing,
					hasNextPage: hasNextEntryPage,
					sortBy: entrySortBy,
					sortOrder: entrySortOrder,
					onSort: handleEntrySort,
					onLoadNext: loadNextEntryPage,
					getProviderInfo,
					dateFormatter: entryDateFormatter,
					timeFormatter: entryTimeFormatter
				})]
			})]
		})] })
	});
}
var SplitComponent = UsageSettings;
export { SplitComponent as component };

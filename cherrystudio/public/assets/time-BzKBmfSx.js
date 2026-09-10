var MINUTE_MS = 60 * 1e3;
var HOUR_MS = 60 * MINUTE_MS;
var DAY_MS = 24 * HOUR_MS;
var MONTH_MS = 30 * DAY_MS;
var YEAR_MS = 365 * DAY_MS;
function createDurationFormatter(language) {
	const millisecondFormatter = new Intl.NumberFormat(language, {
		style: "unit",
		unit: "millisecond",
		unitDisplay: "narrow",
		maximumFractionDigits: 0
	});
	const secondFormatter = new Intl.NumberFormat(language, {
		style: "unit",
		unit: "second",
		unitDisplay: "narrow",
		maximumFractionDigits: 1
	});
	const minuteFormatter = new Intl.NumberFormat(language, {
		style: "unit",
		unit: "minute",
		unitDisplay: "narrow",
		maximumFractionDigits: 0
	});
	const durationListFormatter = new Intl.ListFormat(language, {
		style: "narrow",
		type: "unit"
	});
	return (durationMs) => {
		if (durationMs < 1e3) return millisecondFormatter.format(Math.round(durationMs));
		const roundedTenths = Math.round(durationMs / 100);
		if (roundedTenths < 600) return secondFormatter.format(roundedTenths / 10);
		const minutes = Math.floor(roundedTenths / 600);
		const seconds = roundedTenths % 600 / 10;
		return durationListFormatter.format([minuteFormatter.format(minutes), secondFormatter.format(seconds)]);
	};
}
function getLocaleFirstDayOfWeek(language) {
	return new Intl.Locale(language ?? Intl.DateTimeFormat().resolvedOptions().locale).getWeekInfo().firstDay % 7;
}
const formatRelativeTime = (value, language, now = Date.now()) => {
	const diffMs = new Date(value).getTime() - now;
	const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
	const magnitude = Math.abs(diffMs);
	const sign = diffMs < 0 ? -1 : 1;
	const inUnit = (unitMs) => sign * Math.round(magnitude / unitMs);
	if (Math.round(magnitude / MINUTE_MS) < 60) return formatter.format(inUnit(MINUTE_MS), "minute");
	if (Math.round(magnitude / HOUR_MS) < 24) return formatter.format(inUnit(HOUR_MS), "hour");
	if (Math.round(magnitude / DAY_MS) < 30) return formatter.format(inUnit(DAY_MS), "day");
	if (Math.round(magnitude / MONTH_MS) < 12) return formatter.format(inUnit(MONTH_MS), "month");
	return formatter.format(inUnit(YEAR_MS), "year");
};
export { formatRelativeTime as n, getLocaleFirstDayOfWeek as r, createDurationFormatter as t };

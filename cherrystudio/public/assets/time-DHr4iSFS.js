var MINUTE_MS = 60 * 1e3;
var HOUR_MS = 60 * MINUTE_MS;
var DAY_MS = 24 * HOUR_MS;
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
	const minutes = Math.round(diffMs / MINUTE_MS);
	if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
	const hours = Math.round(diffMs / HOUR_MS);
	if (Math.abs(hours) < 24) return formatter.format(hours, "hour");
	return formatter.format(Math.round(diffMs / DAY_MS), "day");
};
export { formatRelativeTime as n, getLocaleFirstDayOfWeek as r, createDurationFormatter as t };

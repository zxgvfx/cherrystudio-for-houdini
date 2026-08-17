import { c as __toESM, r as __export } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { R as AGENTS_MAX_LIMIT, V as AGENT_WORKSPACE_TYPE, i as formatErrorMessageWithPrefix, m as aiErrorCodes } from "./error-B2Op57SY.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as createLucideIcon } from "./createLucideIcon-DA_gQr32.js";
import { t as ChevronDown$1 } from "./chevron-down-Dowmjhj0.js";
import { t as ChevronLeft } from "./chevron-left-Bj4dPVCE.js";
import { t as ChevronRight$1 } from "./chevron-right-D2nFIQF_.js";
import { c as SelectValue, i as SelectItem, l as ChevronUp, n as SelectContent, r as SelectGroup, s as SelectTrigger, t as Select } from "./select-B3OAESWo.js";
import { t as Alert } from "./alert-SRAASWPI.js";
import { a as DropdownMenuItem, f as DropdownMenuTrigger, i as DropdownMenuGroup, r as DropdownMenuContent, t as DropdownMenu } from "./dropdown-menu-C_5MdXiY.js";
import { n as buttonVariants, t as Button } from "./button-Bb_7V8uR.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { t as Divider } from "./divider-2gEjzcxJ.js";
import { t as Spinner } from "./spinner-NypUNkDv.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as ConfirmDialog } from "./confirm-dialog-BddW9Xw7.js";
import { t as DataTable } from "./data-table-DJTf8H-D.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { t as EmptyState } from "./empty-state-C_9tC-cn.js";
import { a as RowFlex, n as Center } from "./flex-Cbul8ND0.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import { a as InputGroupText, i as InputGroupInput, n as InputGroupAddon, t as InputGroup } from "./input-group-CoAeoGa7.js";
import { t as SearchInput } from "./search-input-Dj90nVzd.js";
import { t as Badge } from "./badge-CPxOcbpM.js";
import { t as Combobox } from "./combobox-O2SFSknd.js";
import { a as FieldGroup, i as FieldError, o as FieldLabel, t as Field } from "./field-ol9POOyQ.js";
import { a as ItemGroup, c as ItemTitle, i as ItemDescription, n as ItemActions, r as ItemContent, s as ItemSeparator, t as Item } from "./item-DSmokINd.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BG93rK9T.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { t as IpcError } from "./IpcError-M3DORlSx.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { n as openRoute } from "./mainWindowNavigation-BoKv8CTA.js";
import { a as useInvalidateCache, c as useQuery, n as useDataChange, s as usePaginatedQuery } from "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as ArrowLeft } from "./arrow-left-BwSgFFHm.js";
import { t as ArrowRight } from "./arrow-right-4TLJV1fS.js";
import { t as Bot } from "./bot-Dza-NcEv.js";
import { t as CalendarClock } from "./calendar-clock-B62SVjLB.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as ChevronRight } from "./chevron-right-BPsUQvI4.js";
import { t as CircleSlash } from "./circle-slash-DQs2sOuQ.js";
import { t as Ellipsis } from "./ellipsis-D_zbxQx4.js";
import { t as Folder } from "./folder-1xfPClr_.js";
import { t as PencilLine } from "./pencil-line-Cg0Owc4C.js";
import { t as Play } from "./play-q70nKKMT.js";
import { t as Plus } from "./plus-BU3W0kz6.js";
import { t as Trash2 } from "./trash-2-2HBX7nvi.js";
import { t as Link } from "./link-DHYoG2NL.js";
import { t as useParams } from "./useParams-BHYy7gMp.js";
import { t as useNavigate } from "./useNavigate-Bm6wxqrQ.js";
import { E as PromptPolishActions, O as PromptEditorField_default } from "./EditDialogShared-BpH7F_cP.js";
import { t as useConversationNavigation } from "./useConversationNavigation-DvSZ2tcU.js";
import { i as AgentSelector, t as WorkspaceSelector } from "./selectors-BgTQUGLo.js";
import { t as CollapsibleSearchBar_default } from "./CollapsibleSearchBar-kRR43YXv.js";
import { f as SettingsContentBody, n as SettingDescription, p as SettingsContentColumn, r as SettingGroup, u as SettingTitle } from "./SettingsPrimitives-ctf-2wxz.js";
import { t as useChannels } from "./useChannels-DRcfNOjq.js";
var Calendar$1 = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
function tzName(timeZone, date, format$1 = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone,
		timeZoneName: format$1
	}).format(date).split(/\s/g).slice(2).join(" ");
}
var offsetFormatCache = {};
var offsetCache = {};
function tzOffset(timeZone, date) {
	try {
		const offsetStr = (offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
			timeZone,
			timeZoneName: "longOffset"
		}).format)(date).split("GMT")[1];
		if (offsetStr in offsetCache) return offsetCache[offsetStr];
		return calcOffset(offsetStr, offsetStr.split(":"));
	} catch {
		if (timeZone in offsetCache) return offsetCache[timeZone];
		const captures = timeZone?.match(offsetRe);
		if (captures) return calcOffset(timeZone, captures.slice(1));
		return NaN;
	}
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
	const hours = +(values[0] || 0);
	const minutes = +(values[1] || 0);
	const seconds = +(values[2] || 0) / 60;
	return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}
var TZDateMini = class TZDateMini extends Date {
	constructor(...args) {
		super();
		if (args.length > 1 && typeof args[args.length - 1] === "string") this.timeZone = args.pop();
		this.internal = /* @__PURE__ */ new Date();
		if (isNaN(tzOffset(this.timeZone, this))) this.setTime(NaN);
		else if (!args.length) this.setTime(Date.now());
		else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) this.setTime(args[0]);
		else if (typeof args[0] === "string") this.setTime(+new Date(args[0]));
		else if (args[0] instanceof Date) this.setTime(+args[0]);
		else {
			this.setTime(+new Date(...args));
			adjustToSystemTZ(this, NaN);
			syncToInternal(this);
		}
	}
	static tz(tz, ...args) {
		return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
	}
	withTimeZone(timeZone) {
		return new TZDateMini(+this, timeZone);
	}
	getTimezoneOffset() {
		const offset = -tzOffset(this.timeZone, this);
		return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
	}
	setTime(time) {
		Date.prototype.setTime.apply(this, arguments);
		syncToInternal(this);
		return +this;
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDateMini(+new Date(date), this.timeZone);
	}
};
var re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
	if (!re.test(method)) return;
	const utcMethod = method.replace(re, "$1UTC");
	if (!TZDateMini.prototype[utcMethod]) return;
	if (method.startsWith("get")) TZDateMini.prototype[method] = function() {
		return this.internal[utcMethod]();
	};
	else {
		TZDateMini.prototype[method] = function() {
			Date.prototype[utcMethod].apply(this.internal, arguments);
			syncFromInternal(this);
			return +this;
		};
		TZDateMini.prototype[utcMethod] = function() {
			Date.prototype[utcMethod].apply(this, arguments);
			syncToInternal(this);
			return +this;
		};
	}
});
function syncToInternal(date) {
	date.internal.setTime(+date);
	date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}
function syncFromInternal(date) {
	Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
	Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
	adjustToSystemTZ(date);
}
function adjustToSystemTZ(date) {
	const baseOffset = tzOffset(date.timeZone, date);
	const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
	const prevHour = /* @__PURE__ */ new Date(+date);
	prevHour.setUTCHours(prevHour.getUTCHours() - 1);
	const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
	const systemDSTChange = systemOffset - -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
	const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
	if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
	const offsetDiff = systemOffset - offset;
	if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
	const systemDate = /* @__PURE__ */ new Date(+date);
	systemDate.setUTCSeconds(0);
	const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
	const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
	if (secondsOffset || systemSecondsOffset) {
		date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
		Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
	}
	const postBaseOffset = tzOffset(date.timeZone, date);
	const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
	const postOffsetDiff = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset() - postOffset;
	const offsetChanged = postOffset !== offset;
	const postDiff = postOffsetDiff - offsetDiff;
	if (offsetChanged && postDiff) {
		Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
		const newBaseOffset = tzOffset(date.timeZone, date);
		const offsetChange = postOffset - (newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset));
		if (offsetChange) {
			date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
			Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
		}
	}
}
var TZDate = class TZDate extends TZDateMini {
	static tz(tz, ...args) {
		return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
	}
	toISOString() {
		const [sign, hours, minutes] = this.tzComponents();
		const tz = `${sign}${hours}:${minutes}`;
		return this.internal.toISOString().slice(0, -1) + tz;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		const [day, date, month, year] = this.internal.toUTCString().split(" ");
		return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
	}
	toTimeString() {
		const time = this.internal.toUTCString().split(" ")[4];
		const [sign, hours, minutes] = this.tzComponents();
		return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
	}
	toLocaleString(locales, options) {
		return Date.prototype.toLocaleString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(locales, options) {
		return Date.prototype.toLocaleDateString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(locales, options) {
		return Date.prototype.toLocaleTimeString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		const offset = this.getTimezoneOffset();
		return [
			offset > 0 ? "-" : "+",
			String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0"),
			String(Math.abs(offset) % 60).padStart(2, "0")
		];
	}
	withTimeZone(timeZone) {
		return new TZDate(+this, timeZone);
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDate(+new Date(date), this.timeZone);
	}
};
const daysInYear = 365.2425;
Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
const millisecondsInWeek = 6048e5;
const millisecondsInDay = 864e5;
const secondsInDay = 3600 * 24;
secondsInDay * 7;
secondsInDay * daysInYear / 12 * 3;
const constructFromSymbol = Symbol.for("constructDateFrom");
function constructFrom(date, value) {
	if (typeof date === "function") return date(value);
	if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
	if (date instanceof Date) return new date.constructor(value);
	return new Date(value);
}
function toDate(argument, context) {
	return constructFrom(context || argument, argument);
}
function addDays(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	_date.setDate(_date.getDate() + amount);
	return _date;
}
function addMonths(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	const dayOfMonth = _date.getDate();
	const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
	endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
	if (dayOfMonth >= endOfDesiredMonth.getDate()) return endOfDesiredMonth;
	else {
		_date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
		return _date;
	}
}
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
function startOfWeek(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
function startOfISOWeek(date, options) {
	return startOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
function getISOWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
	fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
	const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
	fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
	if (_date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (_date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
function getTimezoneOffsetInMilliseconds(date) {
	const _date = toDate(date);
	const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
	utcDate.setUTCFullYear(_date.getFullYear());
	return +date - +utcDate;
}
function normalizeDates(context, ...dates) {
	const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
	return dates.map(normalize);
}
function startOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
function differenceInCalendarDays(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const laterStartOfDay = startOfDay(laterDate_);
	const earlierStartOfDay = startOfDay(earlierDate_);
	const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
	const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
	return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
function startOfISOWeekYear(date, options) {
	const year = getISOWeekYear(date, options);
	const fourthOfJanuary = constructFrom(options?.in || date, 0);
	fourthOfJanuary.setFullYear(year, 0, 4);
	fourthOfJanuary.setHours(0, 0, 0, 0);
	return startOfISOWeek(fourthOfJanuary);
}
function addWeeks(date, amount, options) {
	return addDays(date, amount * 7, options);
}
function addYears(date, amount, options) {
	return addMonths(date, amount * 12, options);
}
function max(dates, options) {
	let result;
	let context = options?.in;
	dates.forEach((date) => {
		if (!context && typeof date === "object") context = constructFrom.bind(null, date);
		const date_ = toDate(date, context);
		if (!result || result < date_ || isNaN(+date_)) result = date_;
	});
	return constructFrom(context, result || NaN);
}
function min(dates, options) {
	let result;
	let context = options?.in;
	dates.forEach((date) => {
		if (!context && typeof date === "object") context = constructFrom.bind(null, date);
		const date_ = toDate(date, context);
		if (!result || result > date_ || isNaN(+date_)) result = date_;
	});
	return constructFrom(context, result || NaN);
}
function isSameDay(laterDate, earlierDate, options) {
	const [dateLeft_, dateRight_] = normalizeDates(options?.in, laterDate, earlierDate);
	return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}
function isDate(value) {
	return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
	return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
function differenceInCalendarMonths(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
	const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
	return yearsDiff * 12 + monthsDiff;
}
function endOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	const month = _date.getMonth();
	_date.setFullYear(_date.getFullYear(), month + 1, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function normalizeInterval(context, interval) {
	const [start, end] = normalizeDates(context, interval.start, interval.end);
	return {
		start,
		end
	};
}
function eachMonthOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	date.setDate(1);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setMonth(date.getMonth() + step);
	}
	return reversed ? dates.reverse() : dates;
}
function startOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	_date.setDate(1);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
function endOfYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	_date.setFullYear(year + 1, 0, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function startOfYear(date, options) {
	const date_ = toDate(date, options?.in);
	date_.setFullYear(date_.getFullYear(), 0, 1);
	date_.setHours(0, 0, 0, 0);
	return date_;
}
function eachYearOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	date.setMonth(0, 1);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setFullYear(date.getFullYear() + step);
	}
	return reversed ? dates.reverse() : dates;
}
function endOfWeek(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
	_date.setDate(_date.getDate() + diff);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function endOfISOWeek(date, options) {
	return endOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
const formatDistance = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", count.toString());
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "in " + result;
	else return result + " ago";
	return result;
};
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
const formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
var formatRelativeLocale = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = options?.context ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = options?.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = options?.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
var eraValues = {
	narrow: ["B", "A"],
	abbreviated: ["BC", "AD"],
	wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	wide: [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	]
};
var monthValues = {
	narrow: [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	wide: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
};
var dayValues = {
	narrow: [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	short: [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	abbreviated: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	wide: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	}
};
var ordinalNumber = (dirtyNumber, _options) => {
	const number = Number(dirtyNumber);
	const rem100 = number % 100;
	if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
		case 1: return number + "st";
		case 2: return number + "nd";
		case 3: return number + "rd";
	}
	return number + "th";
};
const localize = {
	ordinalNumber,
	era: buildLocalizeFn({
		values: eraValues,
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: quarterValues,
		defaultWidth: "wide",
		argumentCallback: (quarter) => quarter - 1
	}),
	month: buildLocalizeFn({
		values: monthValues,
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: dayValues,
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: dayPeriodValues,
		defaultWidth: "wide",
		formattingValues: formattingDayPeriodValues,
		defaultFormattingWidth: "wide"
	})
};
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
const enUS$1 = {
	code: "en-US",
	formatDistance,
	formatLong,
	formatRelative,
	localize,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
function getDayOfYear(date, options) {
	const _date = toDate(date, options?.in);
	return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
}
function getISOWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
	return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const defaultOptions$1 = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
	firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
	const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
	firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
	if (+_date >= +startOfNextYear) return year + 1;
	else if (+_date >= +startOfThisYear) return year;
	else return year - 1;
}
function startOfWeekYear(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const year = getWeekYear(date, options);
	const firstWeek = constructFrom(options?.in || date, 0);
	firstWeek.setFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setHours(0, 0, 0, 0);
	return startOfWeek(firstWeek, options);
}
function getWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
	return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
	return (number < 0 ? "-" : "") + Math.abs(number).toString().padStart(targetLength, "0");
}
const lightFormatters = {
	y(date, token) {
		const signedYear = date.getFullYear();
		const year = signedYear > 0 ? signedYear : 1 - signedYear;
		return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
	},
	M(date, token) {
		const month = date.getMonth();
		return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
	},
	d(date, token) {
		return addLeadingZeros(date.getDate(), token.length);
	},
	a(date, token) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return dayPeriodEnumValue.toUpperCase();
			case "aaa": return dayPeriodEnumValue;
			case "aaaaa": return dayPeriodEnumValue[0];
			case "aaaa":
			default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
		}
	},
	h(date, token) {
		return addLeadingZeros(date.getHours() % 12 || 12, token.length);
	},
	H(date, token) {
		return addLeadingZeros(date.getHours(), token.length);
	},
	m(date, token) {
		return addLeadingZeros(date.getMinutes(), token.length);
	},
	s(date, token) {
		return addLeadingZeros(date.getSeconds(), token.length);
	},
	S(date, token) {
		const numberOfDigits = token.length;
		const milliseconds = date.getMilliseconds();
		return addLeadingZeros(Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
	}
};
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
const formatters = {
	G: function(date, token, localize$1) {
		const era = date.getFullYear() > 0 ? 1 : 0;
		switch (token) {
			case "G":
			case "GG":
			case "GGG": return localize$1.era(era, { width: "abbreviated" });
			case "GGGGG": return localize$1.era(era, { width: "narrow" });
			case "GGGG":
			default: return localize$1.era(era, { width: "wide" });
		}
	},
	y: function(date, token, localize$1) {
		if (token === "yo") {
			const signedYear = date.getFullYear();
			const year = signedYear > 0 ? signedYear : 1 - signedYear;
			return localize$1.ordinalNumber(year, { unit: "year" });
		}
		return lightFormatters.y(date, token);
	},
	Y: function(date, token, localize$1, options) {
		const signedWeekYear = getWeekYear(date, options);
		const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
		if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
		if (token === "Yo") return localize$1.ordinalNumber(weekYear, { unit: "year" });
		return addLeadingZeros(weekYear, token.length);
	},
	R: function(date, token) {
		return addLeadingZeros(getISOWeekYear(date), token.length);
	},
	u: function(date, token) {
		return addLeadingZeros(date.getFullYear(), token.length);
	},
	Q: function(date, token, localize$1) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "Q": return String(quarter);
			case "QQ": return addLeadingZeros(quarter, 2);
			case "Qo": return localize$1.ordinalNumber(quarter, { unit: "quarter" });
			case "QQQ": return localize$1.quarter(quarter, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return localize$1.quarter(quarter, {
				width: "narrow",
				context: "formatting"
			});
			case "QQQQ":
			default: return localize$1.quarter(quarter, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(date, token, localize$1) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "q": return String(quarter);
			case "qq": return addLeadingZeros(quarter, 2);
			case "qo": return localize$1.ordinalNumber(quarter, { unit: "quarter" });
			case "qqq": return localize$1.quarter(quarter, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return localize$1.quarter(quarter, {
				width: "narrow",
				context: "standalone"
			});
			case "qqqq":
			default: return localize$1.quarter(quarter, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(date, token, localize$1) {
		const month = date.getMonth();
		switch (token) {
			case "M":
			case "MM": return lightFormatters.M(date, token);
			case "Mo": return localize$1.ordinalNumber(month + 1, { unit: "month" });
			case "MMM": return localize$1.month(month, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return localize$1.month(month, {
				width: "narrow",
				context: "formatting"
			});
			case "MMMM":
			default: return localize$1.month(month, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(date, token, localize$1) {
		const month = date.getMonth();
		switch (token) {
			case "L": return String(month + 1);
			case "LL": return addLeadingZeros(month + 1, 2);
			case "Lo": return localize$1.ordinalNumber(month + 1, { unit: "month" });
			case "LLL": return localize$1.month(month, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return localize$1.month(month, {
				width: "narrow",
				context: "standalone"
			});
			case "LLLL":
			default: return localize$1.month(month, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(date, token, localize$1, options) {
		const week = getWeek(date, options);
		if (token === "wo") return localize$1.ordinalNumber(week, { unit: "week" });
		return addLeadingZeros(week, token.length);
	},
	I: function(date, token, localize$1) {
		const isoWeek = getISOWeek(date);
		if (token === "Io") return localize$1.ordinalNumber(isoWeek, { unit: "week" });
		return addLeadingZeros(isoWeek, token.length);
	},
	d: function(date, token, localize$1) {
		if (token === "do") return localize$1.ordinalNumber(date.getDate(), { unit: "date" });
		return lightFormatters.d(date, token);
	},
	D: function(date, token, localize$1) {
		const dayOfYear = getDayOfYear(date);
		if (token === "Do") return localize$1.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
		return addLeadingZeros(dayOfYear, token.length);
	},
	E: function(date, token, localize$1) {
		const dayOfWeek = date.getDay();
		switch (token) {
			case "E":
			case "EE":
			case "EEE": return localize$1.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return localize$1.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return localize$1.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "EEEE":
			default: return localize$1.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(date, token, localize$1, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "e": return String(localDayOfWeek);
			case "ee": return addLeadingZeros(localDayOfWeek, 2);
			case "eo": return localize$1.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "eee": return localize$1.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return localize$1.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return localize$1.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "eeee":
			default: return localize$1.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(date, token, localize$1, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "c": return String(localDayOfWeek);
			case "cc": return addLeadingZeros(localDayOfWeek, token.length);
			case "co": return localize$1.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "ccc": return localize$1.day(dayOfWeek, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return localize$1.day(dayOfWeek, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return localize$1.day(dayOfWeek, {
				width: "short",
				context: "standalone"
			});
			case "cccc":
			default: return localize$1.day(dayOfWeek, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(date, token, localize$1) {
		const dayOfWeek = date.getDay();
		const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
		switch (token) {
			case "i": return String(isoDayOfWeek);
			case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
			case "io": return localize$1.ordinalNumber(isoDayOfWeek, { unit: "day" });
			case "iii": return localize$1.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return localize$1.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return localize$1.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "iiii":
			default: return localize$1.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(date, token, localize$1) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "aaaa":
			default: return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(date, token, localize$1) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
		else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
		else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "b":
			case "bb": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "bbbb":
			default: return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(date, token, localize$1) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
		else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
		else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
		else dayPeriodEnumValue = dayPeriodEnum.night;
		switch (token) {
			case "B":
			case "BB":
			case "BBB": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "BBBB":
			default: return localize$1.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(date, token, localize$1) {
		if (token === "ho") {
			let hours = date.getHours() % 12;
			if (hours === 0) hours = 12;
			return localize$1.ordinalNumber(hours, { unit: "hour" });
		}
		return lightFormatters.h(date, token);
	},
	H: function(date, token, localize$1) {
		if (token === "Ho") return localize$1.ordinalNumber(date.getHours(), { unit: "hour" });
		return lightFormatters.H(date, token);
	},
	K: function(date, token, localize$1) {
		const hours = date.getHours() % 12;
		if (token === "Ko") return localize$1.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	k: function(date, token, localize$1) {
		let hours = date.getHours();
		if (hours === 0) hours = 24;
		if (token === "ko") return localize$1.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	m: function(date, token, localize$1) {
		if (token === "mo") return localize$1.ordinalNumber(date.getMinutes(), { unit: "minute" });
		return lightFormatters.m(date, token);
	},
	s: function(date, token, localize$1) {
		if (token === "so") return localize$1.ordinalNumber(date.getSeconds(), { unit: "second" });
		return lightFormatters.s(date, token);
	},
	S: function(date, token) {
		return lightFormatters.S(date, token);
	},
	X: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		if (timezoneOffset === 0) return "Z";
		switch (token) {
			case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "XXXX":
			case "XX": return formatTimezone(timezoneOffset);
			case "XXXXX":
			case "XXX":
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	x: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "xxxx":
			case "xx": return formatTimezone(timezoneOffset);
			case "xxxxx":
			case "xxx":
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	O: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			case "OOOO":
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	z: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			case "zzzz":
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	t: function(date, token, _localize) {
		return addLeadingZeros(Math.trunc(+date / 1e3), token.length);
	},
	T: function(date, token, _localize) {
		return addLeadingZeros(+date, token.length);
	}
};
function formatTimezoneShort(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = Math.trunc(absOffset / 60);
	const minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
	const minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
var dateLongFormatter = (pattern, formatLong$1) => {
	switch (pattern) {
		case "P": return formatLong$1.date({ width: "short" });
		case "PP": return formatLong$1.date({ width: "medium" });
		case "PPP": return formatLong$1.date({ width: "long" });
		case "PPPP":
		default: return formatLong$1.date({ width: "full" });
	}
};
var timeLongFormatter = (pattern, formatLong$1) => {
	switch (pattern) {
		case "p": return formatLong$1.time({ width: "short" });
		case "pp": return formatLong$1.time({ width: "medium" });
		case "ppp": return formatLong$1.time({ width: "long" });
		case "pppp":
		default: return formatLong$1.time({ width: "full" });
	}
};
var dateTimeLongFormatter = (pattern, formatLong$1) => {
	const matchResult = pattern.match(/(P+)(p+)?/) || [];
	const datePattern = matchResult[1];
	const timePattern = matchResult[2];
	if (!timePattern) return dateLongFormatter(pattern, formatLong$1);
	let dateTimeFormat;
	switch (datePattern) {
		case "P":
			dateTimeFormat = formatLong$1.dateTime({ width: "short" });
			break;
		case "PP":
			dateTimeFormat = formatLong$1.dateTime({ width: "medium" });
			break;
		case "PPP":
			dateTimeFormat = formatLong$1.dateTime({ width: "long" });
			break;
		case "PPPP":
		default:
			dateTimeFormat = formatLong$1.dateTime({ width: "full" });
			break;
	}
	return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong$1)).replace("{{time}}", timeLongFormatter(timePattern, formatLong$1));
};
const longFormatters = {
	p: timeLongFormatter,
	P: dateTimeLongFormatter
};
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(token) {
	return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
	return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format$1, input) {
	const _message = message(token, format$1, input);
	console.warn(_message);
	if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format$1, input) {
	const subject = token[0] === "Y" ? "years" : "days of the month";
	return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format$1}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
	const defaultOptions$1 = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions$1.locale ?? enUS$1;
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const originalDate = toDate(date, options?.in);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
		const firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			const longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map((substring) => {
		if (substring === "''") return {
			isToken: false,
			value: "'"
		};
		const firstCharacter = substring[0];
		if (firstCharacter === "'") return {
			isToken: false,
			value: cleanEscapedString(substring)
		};
		if (formatters[firstCharacter]) return {
			isToken: true,
			value: substring
		};
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return {
			isToken: false,
			value: substring
		};
	});
	if (locale.localize.preprocessor) parts = locale.localize.preprocessor(originalDate, parts);
	const formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale
	};
	return parts.map((part) => {
		if (!part.isToken) return part.value;
		const token = part.value;
		if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) warnOrThrowProtectedError(token, formatStr, String(date));
		const formatter = formatters[token[0]];
		return formatter(originalDate, token, locale.localize, formatterOptions);
	}).join("");
}
function cleanEscapedString(input) {
	const matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
function getDaysInMonth(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const monthIndex = _date.getMonth();
	const lastDayOfMonth = constructFrom(_date, 0);
	lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
	lastDayOfMonth.setHours(0, 0, 0, 0);
	return lastDayOfMonth.getDate();
}
function getMonth(date, options) {
	return toDate(date, options?.in).getMonth();
}
function getYear(date, options) {
	return toDate(date, options?.in).getFullYear();
}
function isAfter(date, dateToCompare) {
	return +toDate(date) > +toDate(dateToCompare);
}
function isBefore(date, dateToCompare) {
	return +toDate(date) < +toDate(dateToCompare);
}
function isSameMonth(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}
function isSameYear(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	return laterDate_.getFullYear() === earlierDate_.getFullYear();
}
function setMonth(date, month, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const day = _date.getDate();
	const midMonth = constructFrom(options?.in || date, 0);
	midMonth.setFullYear(year, month, 15);
	midMonth.setHours(0, 0, 0, 0);
	const daysInMonth = getDaysInMonth(midMonth);
	_date.setMonth(month, Math.min(day, daysInMonth));
	return _date;
}
function setYear(date, year, options) {
	const date_ = toDate(date, options?.in);
	if (isNaN(+date_)) return constructFrom(options?.in || date, NaN);
	date_.setFullYear(year);
	return date_;
}
var FIVE_WEEKS = 5;
var FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(month, dateLib) {
	const firstDayOfMonth = dateLib.startOfMonth(month);
	const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
	const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
	const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
	return dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
}
function startOfBroadcastWeek(date, dateLib) {
	const firstOfMonth = dateLib.startOfMonth(date);
	const dayOfWeek = firstOfMonth.getDay();
	if (dayOfWeek === 1) return firstOfMonth;
	else if (dayOfWeek === 0) return dateLib.addDays(firstOfMonth, -6);
	else return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
}
function endOfBroadcastWeek(date, dateLib) {
	const startDate = startOfBroadcastWeek(date, dateLib);
	const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
	return dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
}
const enUS = {
	...enUS$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "LLLL yyyy");
		},
		labelGridcell: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "cccc");
		}
	}
};
var DateLib = class DateLib {
	constructor(options, overrides) {
		this.Date = Date;
		this.today = () => {
			if (this.overrides?.today) return this.overrides.today();
			if (this.options.timeZone) return TZDate.tz(this.options.timeZone);
			return new this.Date();
		};
		this.newDate = (year, monthIndex, date) => {
			if (this.overrides?.newDate) return this.overrides.newDate(year, monthIndex, date);
			if (this.options.timeZone) return new TZDate(year, monthIndex, date, this.options.timeZone);
			return new Date(year, monthIndex, date);
		};
		this.addDays = (date, amount) => {
			return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
		};
		this.addMonths = (date, amount) => {
			return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
		};
		this.addWeeks = (date, amount) => {
			return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
		};
		this.addYears = (date, amount) => {
			return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
		};
		this.differenceInCalendarDays = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
		};
		this.differenceInCalendarMonths = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
		};
		this.eachMonthOfInterval = (interval) => {
			return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
		};
		this.eachYearOfInterval = (interval) => {
			const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
			const uniqueYears = new Set(years.map((d) => this.getYear(d)));
			if (uniqueYears.size === years.length) return years;
			const yearsArray = [];
			uniqueYears.forEach((y) => {
				yearsArray.push(new Date(y, 0, 1));
			});
			return yearsArray;
		};
		this.endOfBroadcastWeek = (date) => {
			return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
		};
		this.endOfISOWeek = (date) => {
			return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
		};
		this.endOfMonth = (date) => {
			return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
		};
		this.endOfWeek = (date, options$1) => {
			return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options$1) : endOfWeek(date, this.options);
		};
		this.endOfYear = (date) => {
			return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
		};
		this.format = (date, formatStr, _options) => {
			const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
			if (this.options.numerals && this.options.numerals !== "latn") return this.replaceDigits(formatted);
			return formatted;
		};
		this.getISOWeek = (date) => {
			return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
		};
		this.getMonth = (date, _options) => {
			return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
		};
		this.getYear = (date, _options) => {
			return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
		};
		this.getWeek = (date, _options) => {
			return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
		};
		this.isAfter = (date, dateToCompare) => {
			return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
		};
		this.isBefore = (date, dateToCompare) => {
			return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
		};
		this.isDate = (value) => {
			return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
		};
		this.isSameDay = (dateLeft, dateRight) => {
			return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
		};
		this.isSameMonth = (dateLeft, dateRight) => {
			return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
		};
		this.isSameYear = (dateLeft, dateRight) => {
			return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
		};
		this.max = (dates) => {
			return this.overrides?.max ? this.overrides.max(dates) : max(dates);
		};
		this.min = (dates) => {
			return this.overrides?.min ? this.overrides.min(dates) : min(dates);
		};
		this.setMonth = (date, month) => {
			return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
		};
		this.setYear = (date, year) => {
			return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
		};
		this.startOfBroadcastWeek = (date, _dateLib) => {
			return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
		};
		this.startOfDay = (date) => {
			return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
		};
		this.startOfISOWeek = (date) => {
			return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
		};
		this.startOfMonth = (date) => {
			return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
		};
		this.startOfWeek = (date, _options) => {
			return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
		};
		this.startOfYear = (date) => {
			return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
		};
		this.options = {
			locale: enUS,
			...options
		};
		this.overrides = overrides;
	}
	getDigitMap() {
		const { numerals = "latn" } = this.options;
		const formatter = new Intl.NumberFormat("en-US", { numberingSystem: numerals });
		const digitMap = {};
		for (let i = 0; i < 10; i++) digitMap[i.toString()] = formatter.format(i);
		return digitMap;
	}
	replaceDigits(input) {
		const digitMap = this.getDigitMap();
		return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
	}
	formatNumber(value) {
		return this.replaceDigits(value.toString());
	}
	getMonthYearOrder() {
		const code = this.options.locale?.code;
		if (!code) return "month-first";
		return DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
	}
	formatMonthYear(date) {
		const { locale, timeZone, numerals } = this.options;
		const localeCode = locale?.code;
		if (localeCode && DateLib.yearFirstLocales.has(localeCode)) try {
			return new Intl.DateTimeFormat(localeCode, {
				month: "long",
				year: "numeric",
				timeZone,
				numberingSystem: numerals
			}).format(date);
		} catch {}
		const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(date, pattern);
	}
};
DateLib.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
const defaultDateLib = new DateLib();
var CalendarDay = class {
	constructor(date, displayMonth, dateLib = defaultDateLib) {
		this.date = date;
		this.displayMonth = displayMonth;
		this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
		this.dateLib = dateLib;
		this.isoDate = dateLib.format(date, "yyyy-MM-dd");
		this.displayMonthId = dateLib.format(displayMonth, "yyyy-MM");
		this.dateMonthId = dateLib.format(date, "yyyy-MM");
	}
	isEqualTo(day) {
		return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
	}
};
var CalendarMonth = class {
	constructor(month, weeks) {
		this.date = month;
		this.weeks = weeks;
	}
};
var CalendarWeek = class {
	constructor(weekNumber, days) {
		this.days = days;
		this.weekNumber = weekNumber;
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function Button$1(props) {
	return import_react.createElement("button", { ...props });
}
function CaptionLabel(props) {
	return import_react.createElement("span", { ...props });
}
function Chevron(props) {
	const { size = 24, orientation = "left", className } = props;
	return import_react.createElement("svg", {
		className,
		width: size,
		height: size,
		viewBox: "0 0 24 24"
	}, orientation === "up" && import_react.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), orientation === "down" && import_react.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), orientation === "left" && import_react.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), orientation === "right" && import_react.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
function Day(props) {
	const { day, modifiers, ...tdProps } = props;
	return import_react.createElement("td", { ...tdProps });
}
function DayButton(props) {
	const { day, modifiers, ...buttonProps } = props;
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return import_react.createElement("button", {
		ref,
		...buttonProps
	});
}
var UI;
(function(UI$1) {
	UI$1["Root"] = "root";
	UI$1["Chevron"] = "chevron";
	UI$1["Day"] = "day";
	UI$1["DayButton"] = "day_button";
	UI$1["CaptionLabel"] = "caption_label";
	UI$1["Dropdowns"] = "dropdowns";
	UI$1["Dropdown"] = "dropdown";
	UI$1["DropdownRoot"] = "dropdown_root";
	UI$1["Footer"] = "footer";
	UI$1["MonthGrid"] = "month_grid";
	UI$1["MonthCaption"] = "month_caption";
	UI$1["MonthsDropdown"] = "months_dropdown";
	UI$1["Month"] = "month";
	UI$1["Months"] = "months";
	UI$1["Nav"] = "nav";
	UI$1["NextMonthButton"] = "button_next";
	UI$1["PreviousMonthButton"] = "button_previous";
	UI$1["Week"] = "week";
	UI$1["Weeks"] = "weeks";
	UI$1["Weekday"] = "weekday";
	UI$1["Weekdays"] = "weekdays";
	UI$1["WeekNumber"] = "week_number";
	UI$1["WeekNumberHeader"] = "week_number_header";
	UI$1["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
var DayFlag;
(function(DayFlag$1) {
	DayFlag$1["disabled"] = "disabled";
	DayFlag$1["hidden"] = "hidden";
	DayFlag$1["outside"] = "outside";
	DayFlag$1["focused"] = "focused";
	DayFlag$1["today"] = "today";
})(DayFlag || (DayFlag = {}));
var SelectionState;
(function(SelectionState$1) {
	SelectionState$1["range_end"] = "range_end";
	SelectionState$1["range_middle"] = "range_middle";
	SelectionState$1["range_start"] = "range_start";
	SelectionState$1["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
var Animation;
(function(Animation$1) {
	Animation$1["weeks_before_enter"] = "weeks_before_enter";
	Animation$1["weeks_before_exit"] = "weeks_before_exit";
	Animation$1["weeks_after_enter"] = "weeks_after_enter";
	Animation$1["weeks_after_exit"] = "weeks_after_exit";
	Animation$1["caption_after_enter"] = "caption_after_enter";
	Animation$1["caption_after_exit"] = "caption_after_exit";
	Animation$1["caption_before_enter"] = "caption_before_enter";
	Animation$1["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));
function Dropdown(props) {
	const { options, className, components, classNames, ...selectProps } = props;
	const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
	const selectedOption = options?.find(({ value }) => value === selectProps.value);
	return import_react.createElement("span", {
		"data-disabled": selectProps.disabled,
		className: classNames[UI.DropdownRoot]
	}, import_react.createElement(components.Select, {
		className: cssClassSelect,
		...selectProps
	}, options?.map(({ value, label, disabled }) => import_react.createElement(components.Option, {
		key: value,
		value,
		disabled
	}, label))), import_react.createElement("span", {
		className: classNames[UI.CaptionLabel],
		"aria-hidden": true
	}, selectedOption?.label, import_react.createElement(components.Chevron, {
		orientation: "down",
		size: 18,
		className: classNames[UI.Chevron]
	})));
}
function DropdownNav(props) {
	return import_react.createElement("div", { ...props });
}
function Footer(props) {
	return import_react.createElement("div", { ...props });
}
function Month(props) {
	const { calendarMonth, displayIndex, ...divProps } = props;
	return import_react.createElement("div", { ...divProps }, props.children);
}
function MonthCaption(props) {
	const { calendarMonth, displayIndex, ...divProps } = props;
	return import_react.createElement("div", { ...divProps });
}
function MonthGrid(props) {
	return import_react.createElement("table", { ...props });
}
function Months(props) {
	return import_react.createElement("div", { ...props });
}
const dayPickerContext = (0, import_react.createContext)(void 0);
function useDayPicker() {
	const context = (0, import_react.useContext)(dayPickerContext);
	if (context === void 0) throw new Error("useDayPicker() must be used within a custom component.");
	return context;
}
function MonthsDropdown(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Dropdown, { ...props });
}
function Nav(props) {
	const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
	const { components, classNames, labels: { labelPrevious: labelPrevious$1, labelNext: labelNext$1 } } = useDayPicker();
	const handleNextClick = (0, import_react.useCallback)((e) => {
		if (nextMonth) onNextClick?.(e);
	}, [nextMonth, onNextClick]);
	const handlePreviousClick = (0, import_react.useCallback)((e) => {
		if (previousMonth) onPreviousClick?.(e);
	}, [previousMonth, onPreviousClick]);
	return import_react.createElement("nav", { ...navProps }, import_react.createElement(components.PreviousMonthButton, {
		type: "button",
		className: classNames[UI.PreviousMonthButton],
		tabIndex: previousMonth ? void 0 : -1,
		"aria-disabled": previousMonth ? void 0 : true,
		"aria-label": labelPrevious$1(previousMonth),
		onClick: handlePreviousClick
	}, import_react.createElement(components.Chevron, {
		disabled: previousMonth ? void 0 : true,
		className: classNames[UI.Chevron],
		orientation: "left"
	})), import_react.createElement(components.NextMonthButton, {
		type: "button",
		className: classNames[UI.NextMonthButton],
		tabIndex: nextMonth ? void 0 : -1,
		"aria-disabled": nextMonth ? void 0 : true,
		"aria-label": labelNext$1(nextMonth),
		onClick: handleNextClick
	}, import_react.createElement(components.Chevron, {
		disabled: nextMonth ? void 0 : true,
		orientation: "right",
		className: classNames[UI.Chevron]
	})));
}
function NextMonthButton(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Button, { ...props });
}
function Option(props) {
	return import_react.createElement("option", { ...props });
}
function PreviousMonthButton(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Button, { ...props });
}
function Root(props) {
	const { rootRef, ...rest } = props;
	return import_react.createElement("div", {
		...rest,
		ref: rootRef
	});
}
function Select$1(props) {
	return import_react.createElement("select", { ...props });
}
function Week(props) {
	const { week, ...trProps } = props;
	return import_react.createElement("tr", { ...trProps });
}
function Weekday(props) {
	return import_react.createElement("th", { ...props });
}
function Weekdays(props) {
	return import_react.createElement("thead", { "aria-hidden": true }, import_react.createElement("tr", { ...props }));
}
function WeekNumber(props) {
	const { week, ...thProps } = props;
	return import_react.createElement("th", { ...thProps });
}
function WeekNumberHeader(props) {
	return import_react.createElement("th", { ...props });
}
function Weeks(props) {
	return import_react.createElement("tbody", { ...props });
}
function YearsDropdown(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Dropdown, { ...props });
}
var custom_components_exports = /* @__PURE__ */ __export({
	Button: () => Button$1,
	CaptionLabel: () => CaptionLabel,
	Chevron: () => Chevron,
	Day: () => Day,
	DayButton: () => DayButton,
	Dropdown: () => Dropdown,
	DropdownNav: () => DropdownNav,
	Footer: () => Footer,
	Month: () => Month,
	MonthCaption: () => MonthCaption,
	MonthGrid: () => MonthGrid,
	Months: () => Months,
	MonthsDropdown: () => MonthsDropdown,
	Nav: () => Nav,
	NextMonthButton: () => NextMonthButton,
	Option: () => Option,
	PreviousMonthButton: () => PreviousMonthButton,
	Root: () => Root,
	Select: () => Select$1,
	Week: () => Week,
	WeekNumber: () => WeekNumber,
	WeekNumberHeader: () => WeekNumberHeader,
	Weekday: () => Weekday,
	Weekdays: () => Weekdays,
	Weeks: () => Weeks,
	YearsDropdown: () => YearsDropdown
}, 1);
function rangeIncludesDate(range, date, excludeEnds = false, dateLib = defaultDateLib) {
	let { from, to } = range;
	const { differenceInCalendarDays: differenceInCalendarDays$1, isSameDay: isSameDay$1 } = dateLib;
	if (from && to) {
		if (differenceInCalendarDays$1(to, from) < 0) [from, to] = [to, from];
		return differenceInCalendarDays$1(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays$1(to, date) >= (excludeEnds ? 1 : 0);
	}
	if (!excludeEnds && to) return isSameDay$1(to, date);
	if (!excludeEnds && from) return isSameDay$1(from, date);
	return false;
}
function isDateInterval(matcher) {
	return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
function isDateRange(value) {
	return Boolean(value && typeof value === "object" && "from" in value);
}
function isDateAfterType(value) {
	return Boolean(value && typeof value === "object" && "after" in value);
}
function isDateBeforeType(value) {
	return Boolean(value && typeof value === "object" && "before" in value);
}
function isDayOfWeekType(value) {
	return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
function isDatesArray(value, dateLib) {
	return Array.isArray(value) && value.every(dateLib.isDate);
}
function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
	const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
	const { isSameDay: isSameDay$1, differenceInCalendarDays: differenceInCalendarDays$1, isAfter: isAfter$1 } = dateLib;
	return matchersArr.some((matcher) => {
		if (typeof matcher === "boolean") return matcher;
		if (dateLib.isDate(matcher)) return isSameDay$1(date, matcher);
		if (isDatesArray(matcher, dateLib)) return matcher.some((matcherDate) => isSameDay$1(date, matcherDate));
		if (isDateRange(matcher)) return rangeIncludesDate(matcher, date, false, dateLib);
		if (isDayOfWeekType(matcher)) {
			if (!Array.isArray(matcher.dayOfWeek)) return matcher.dayOfWeek === date.getDay();
			return matcher.dayOfWeek.includes(date.getDay());
		}
		if (isDateInterval(matcher)) {
			const diffBefore = differenceInCalendarDays$1(matcher.before, date);
			const diffAfter = differenceInCalendarDays$1(matcher.after, date);
			const isDayBefore = diffBefore > 0;
			const isDayAfter = diffAfter < 0;
			if (isAfter$1(matcher.before, matcher.after)) return isDayAfter && isDayBefore;
			else return isDayBefore || isDayAfter;
		}
		if (isDateAfterType(matcher)) return differenceInCalendarDays$1(date, matcher.after) > 0;
		if (isDateBeforeType(matcher)) return differenceInCalendarDays$1(matcher.before, date) > 0;
		if (typeof matcher === "function") return matcher(date);
		return false;
	});
}
function createGetModifiers(days, props, navStart, navEnd, dateLib) {
	const { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today = dateLib.today() } = props;
	const { isSameDay: isSameDay$1, isSameMonth: isSameMonth$1, startOfMonth: startOfMonth$1, isBefore: isBefore$1, endOfMonth: endOfMonth$1, isAfter: isAfter$1 } = dateLib;
	const computedNavStart = navStart && startOfMonth$1(navStart);
	const computedNavEnd = navEnd && endOfMonth$1(navEnd);
	const internalModifiersMap = {
		[DayFlag.focused]: [],
		[DayFlag.outside]: [],
		[DayFlag.disabled]: [],
		[DayFlag.hidden]: [],
		[DayFlag.today]: []
	};
	const customModifiersMap = {};
	for (const day of days) {
		const { date, displayMonth } = day;
		const isOutside = Boolean(displayMonth && !isSameMonth$1(date, displayMonth));
		const isBeforeNavStart = Boolean(computedNavStart && isBefore$1(date, computedNavStart));
		const isAfterNavEnd = Boolean(computedNavEnd && isAfter$1(date, computedNavEnd));
		const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib));
		const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
		const isToday = isSameDay$1(date, today);
		if (isOutside) internalModifiersMap.outside.push(day);
		if (isDisabled) internalModifiersMap.disabled.push(day);
		if (isHidden) internalModifiersMap.hidden.push(day);
		if (isToday) internalModifiersMap.today.push(day);
		if (modifiers) Object.keys(modifiers).forEach((name) => {
			const modifierValue = modifiers?.[name];
			if (!(modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false)) return;
			if (customModifiersMap[name]) customModifiersMap[name].push(day);
			else customModifiersMap[name] = [day];
		});
	}
	return (day) => {
		const dayFlags = {
			[DayFlag.focused]: false,
			[DayFlag.disabled]: false,
			[DayFlag.hidden]: false,
			[DayFlag.outside]: false,
			[DayFlag.today]: false
		};
		const customModifiers = {};
		for (const name in internalModifiersMap) dayFlags[name] = internalModifiersMap[name].some((d) => d === day);
		for (const name in customModifiersMap) customModifiers[name] = customModifiersMap[name].some((d) => d === day);
		return {
			...dayFlags,
			...customModifiers
		};
	};
}
function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
	return Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
		if (modifiersClassNames[key]) previousValue.push(modifiersClassNames[key]);
		else if (classNames[DayFlag[key]]) previousValue.push(classNames[DayFlag[key]]);
		else if (classNames[SelectionState[key]]) previousValue.push(classNames[SelectionState[key]]);
		return previousValue;
	}, [classNames[UI.Day]]);
}
function getComponents(customComponents) {
	return {
		...custom_components_exports,
		...customComponents
	};
}
function getDataAttributes(props) {
	const dataAttributes = {
		"data-mode": props.mode ?? void 0,
		"data-required": "required" in props ? props.required : void 0,
		"data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
		"data-week-numbers": props.showWeekNumber || void 0,
		"data-broadcast-calendar": props.broadcastCalendar || void 0,
		"data-nav-layout": props.navLayout || void 0
	};
	Object.entries(props).forEach(([key, val]) => {
		if (key.startsWith("data-")) dataAttributes[key] = val;
	});
	return dataAttributes;
}
function getDefaultClassNames() {
	const classNames = {};
	for (const key in UI) classNames[UI[key]] = `rdp-${UI[key]}`;
	for (const key in DayFlag) classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
	for (const key in SelectionState) classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
	for (const key in Animation) classNames[Animation[key]] = `rdp-${Animation[key]}`;
	return classNames;
}
function formatCaption(month, options, dateLib) {
	return (dateLib ?? new DateLib(options)).formatMonthYear(month);
}
const formatMonthCaption = formatCaption;
function formatDay(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(date, "d");
}
function formatMonthDropdown(month, dateLib = defaultDateLib) {
	return dateLib.format(month, "LLLL");
}
function formatWeekdayName(weekday, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}
function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
	if (weekNumber < 10) return dateLib.formatNumber(`0${weekNumber.toLocaleString()}`);
	return dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
}
function formatWeekNumberHeader() {
	return ``;
}
function formatYearDropdown(year, dateLib = defaultDateLib) {
	return dateLib.format(year, "yyyy");
}
const formatYearCaption = formatYearDropdown;
var formatters_exports = /* @__PURE__ */ __export({
	formatCaption: () => formatCaption,
	formatDay: () => formatDay,
	formatMonthCaption: () => formatMonthCaption,
	formatMonthDropdown: () => formatMonthDropdown,
	formatWeekNumber: () => formatWeekNumber,
	formatWeekNumberHeader: () => formatWeekNumberHeader,
	formatWeekdayName: () => formatWeekdayName,
	formatYearCaption: () => formatYearCaption,
	formatYearDropdown: () => formatYearDropdown
}, 1);
function getFormatters(customFormatters) {
	if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) customFormatters.formatCaption = customFormatters.formatMonthCaption;
	if (customFormatters?.formatYearCaption && !customFormatters.formatYearDropdown) customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
	return {
		...formatters_exports,
		...customFormatters
	};
}
function labelDayButton(date, modifiers, options, dateLib) {
	let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
	if (modifiers.today) label = `Today, ${label}`;
	if (modifiers.selected) label = `${label}, selected`;
	return label;
}
const labelDay = labelDayButton;
function labelGrid(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).formatMonthYear(date);
}
const labelCaption = labelGrid;
function labelGridcell(date, modifiers, options, dateLib) {
	let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
	if (modifiers?.today) label = `Today, ${label}`;
	return label;
}
function labelMonthDropdown(_options) {
	return "Choose the Month";
}
function labelNav() {
	return "";
}
var defaultLabel = "Go to the Next Month";
function labelNext(_month, _options) {
	return defaultLabel;
}
function labelPrevious(_month) {
	return "Go to the Previous Month";
}
function labelWeekday(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(date, "cccc");
}
function labelWeekNumber(weekNumber, _options) {
	return `Week ${weekNumber}`;
}
function labelWeekNumberHeader(_options) {
	return "Week Number";
}
function labelYearDropdown(_options) {
	return "Choose the Year";
}
var labels_exports = /* @__PURE__ */ __export({
	labelCaption: () => labelCaption,
	labelDay: () => labelDay,
	labelDayButton: () => labelDayButton,
	labelGrid: () => labelGrid,
	labelGridcell: () => labelGridcell,
	labelMonthDropdown: () => labelMonthDropdown,
	labelNav: () => labelNav,
	labelNext: () => labelNext,
	labelPrevious: () => labelPrevious,
	labelWeekNumber: () => labelWeekNumber,
	labelWeekNumberHeader: () => labelWeekNumberHeader,
	labelWeekday: () => labelWeekday,
	labelYearDropdown: () => labelYearDropdown
}, 1);
var resolveLabel = (defaultLabel$1, customLabel, localeLabel) => {
	if (customLabel) return customLabel;
	if (localeLabel) return typeof localeLabel === "function" ? localeLabel : (..._args) => localeLabel;
	return defaultLabel$1;
};
function getLabels(customLabels, options) {
	const localeLabels = options.locale?.labels ?? {};
	return {
		...labels_exports,
		...customLabels ?? {},
		labelDayButton: resolveLabel(labelDayButton, customLabels?.labelDayButton, localeLabels.labelDayButton),
		labelMonthDropdown: resolveLabel(labelMonthDropdown, customLabels?.labelMonthDropdown, localeLabels.labelMonthDropdown),
		labelNext: resolveLabel(labelNext, customLabels?.labelNext, localeLabels.labelNext),
		labelPrevious: resolveLabel(labelPrevious, customLabels?.labelPrevious, localeLabels.labelPrevious),
		labelWeekNumber: resolveLabel(labelWeekNumber, customLabels?.labelWeekNumber, localeLabels.labelWeekNumber),
		labelYearDropdown: resolveLabel(labelYearDropdown, customLabels?.labelYearDropdown, localeLabels.labelYearDropdown),
		labelGrid: resolveLabel(labelGrid, customLabels?.labelGrid, localeLabels.labelGrid),
		labelGridcell: resolveLabel(labelGridcell, customLabels?.labelGridcell, localeLabels.labelGridcell),
		labelNav: resolveLabel(labelNav, customLabels?.labelNav, localeLabels.labelNav),
		labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, customLabels?.labelWeekNumberHeader, localeLabels.labelWeekNumberHeader),
		labelWeekday: resolveLabel(labelWeekday, customLabels?.labelWeekday, localeLabels.labelWeekday)
	};
}
function getMonthOptions(displayMonth, navStart, navEnd, formatters$1, dateLib) {
	const { startOfMonth: startOfMonth$1, startOfYear: startOfYear$1, endOfYear: endOfYear$1, eachMonthOfInterval: eachMonthOfInterval$1, getMonth: getMonth$1 } = dateLib;
	return eachMonthOfInterval$1({
		start: startOfYear$1(displayMonth),
		end: endOfYear$1(displayMonth)
	}).map((month) => {
		const label = formatters$1.formatMonthDropdown(month, dateLib);
		return {
			value: getMonth$1(month),
			label,
			disabled: navStart && month < startOfMonth$1(navStart) || navEnd && month > startOfMonth$1(navEnd) || false
		};
	});
}
function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
	let style = { ...styles?.[UI.Day] };
	Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
		style = {
			...style,
			...modifiersStyles?.[modifier]
		};
	});
	return style;
}
function getWeekdays(dateLib, ISOWeek, broadcastCalendar, today) {
	const referenceToday = today ?? dateLib.today();
	const start = broadcastCalendar ? dateLib.startOfBroadcastWeek(referenceToday, dateLib) : ISOWeek ? dateLib.startOfISOWeek(referenceToday) : dateLib.startOfWeek(referenceToday);
	const days = [];
	for (let i = 0; i < 7; i++) {
		const day = dateLib.addDays(start, i);
		days.push(day);
	}
	return days;
}
function getYearOptions(navStart, navEnd, formatters$1, dateLib, reverse = false) {
	if (!navStart) return void 0;
	if (!navEnd) return void 0;
	const { startOfYear: startOfYear$1, endOfYear: endOfYear$1, eachYearOfInterval: eachYearOfInterval$1, getYear: getYear$1 } = dateLib;
	const years = eachYearOfInterval$1({
		start: startOfYear$1(navStart),
		end: endOfYear$1(navEnd)
	});
	if (reverse) years.reverse();
	return years.map((year) => {
		const label = formatters$1.formatYearDropdown(year, dateLib);
		return {
			value: getYear$1(year),
			label,
			disabled: false
		};
	});
}
function createNoonOverrides(timeZone, options = {}) {
	const { weekStartsOn, locale } = options;
	const fallbackWeekStartsOn = weekStartsOn ?? locale?.options?.weekStartsOn ?? 0;
	const toNoonTZDate = (date) => {
		const normalizedDate = typeof date === "number" || typeof date === "string" ? new Date(date) : date;
		return new TZDate(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate(), 12, 0, 0, timeZone);
	};
	const toCalendarDate = (date) => {
		const zoned = toNoonTZDate(date);
		return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => {
			return toNoonTZDate(TZDate.tz(timeZone));
		},
		newDate: (year, monthIndex, date) => {
			return new TZDate(year, monthIndex, date, 12, 0, 0, timeZone);
		},
		startOfDay: (date) => {
			return toNoonTZDate(date);
		},
		startOfWeek: (date, options$1) => {
			const base = toNoonTZDate(date);
			const weekStartsOnValue = options$1?.weekStartsOn ?? fallbackWeekStartsOn;
			const diff = (base.getDay() - weekStartsOnValue + 7) % 7;
			base.setDate(base.getDate() - diff);
			return base;
		},
		startOfISOWeek: (date) => {
			const base = toNoonTZDate(date);
			const diff = (base.getDay() - 1 + 7) % 7;
			base.setDate(base.getDate() - diff);
			return base;
		},
		startOfMonth: (date) => {
			const base = toNoonTZDate(date);
			base.setDate(1);
			return base;
		},
		startOfYear: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(0, 1);
			return base;
		},
		endOfWeek: (date, options$1) => {
			const base = toNoonTZDate(date);
			const diff = (((options$1?.weekStartsOn ?? fallbackWeekStartsOn) + 6) % 7 - base.getDay() + 7) % 7;
			base.setDate(base.getDate() + diff);
			return base;
		},
		endOfISOWeek: (date) => {
			const base = toNoonTZDate(date);
			const diff = (7 - base.getDay()) % 7;
			base.setDate(base.getDate() + diff);
			return base;
		},
		endOfMonth: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(base.getMonth() + 1, 0);
			return base;
		},
		endOfYear: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(11, 31);
			return base;
		},
		eachMonthOfInterval: (interval) => {
			const start = toNoonTZDate(interval.start);
			const end = toNoonTZDate(interval.end);
			const result = [];
			const cursor = new TZDate(start.getFullYear(), start.getMonth(), 1, 12, 0, 0, timeZone);
			const endKey = end.getFullYear() * 12 + end.getMonth();
			while (cursor.getFullYear() * 12 + cursor.getMonth() <= endKey) {
				result.push(new TZDate(cursor, timeZone));
				cursor.setMonth(cursor.getMonth() + 1, 1);
			}
			return result;
		},
		addDays: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setDate(base.getDate() + amount);
			return base;
		},
		addWeeks: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setDate(base.getDate() + amount * 7);
			return base;
		},
		addMonths: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setMonth(base.getMonth() + amount);
			return base;
		},
		addYears: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setFullYear(base.getFullYear() + amount);
			return base;
		},
		eachYearOfInterval: (interval) => {
			const start = toNoonTZDate(interval.start);
			const end = toNoonTZDate(interval.end);
			const years = [];
			const cursor = new TZDate(start.getFullYear(), 0, 1, 12, 0, 0, timeZone);
			while (cursor.getFullYear() <= end.getFullYear()) {
				years.push(new TZDate(cursor, timeZone));
				cursor.setFullYear(cursor.getFullYear() + 1, 0, 1);
			}
			return years;
		},
		getWeek: (date, options$1) => {
			return getWeek(toCalendarDate(date), {
				weekStartsOn: options$1?.weekStartsOn ?? fallbackWeekStartsOn,
				firstWeekContainsDate: options$1?.firstWeekContainsDate ?? locale?.options?.firstWeekContainsDate ?? 1
			});
		},
		getISOWeek: (date) => {
			return getISOWeek(toCalendarDate(date));
		},
		differenceInCalendarDays: (dateLeft, dateRight) => {
			return differenceInCalendarDays(toCalendarDate(dateLeft), toCalendarDate(dateRight));
		},
		differenceInCalendarMonths: (dateLeft, dateRight) => {
			return differenceInCalendarMonths(toCalendarDate(dateLeft), toCalendarDate(dateRight));
		}
	};
}
var asHtmlElement = (element) => {
	if (element instanceof HTMLElement) return element;
	return null;
};
var queryMonthEls = (element) => [...element.querySelectorAll("[data-animated-month]") ?? []];
var queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]"));
var queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]"));
var queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]"));
var queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]"));
var queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
	const previousRootElSnapshotRef = (0, import_react.useRef)(null);
	const previousMonthsRef = (0, import_react.useRef)(months);
	const animatingRef = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
		const previousMonths = previousMonthsRef.current;
		previousMonthsRef.current = months;
		if (!enabled || !rootElRef.current || !(rootElRef.current instanceof HTMLElement) || months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) return;
		const isSameMonth$1 = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
		const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
		const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
		const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
		const previousRootElSnapshot = previousRootElSnapshotRef.current;
		const rootElSnapshot = rootElRef.current.cloneNode(true);
		if (rootElSnapshot instanceof HTMLElement) {
			queryMonthEls(rootElSnapshot).forEach((currentMonthElSnapshot) => {
				if (!(currentMonthElSnapshot instanceof HTMLElement)) return;
				const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
				if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
				const captionEl = queryCaptionEl(currentMonthElSnapshot);
				if (captionEl) captionEl.classList.remove(captionAnimationClass);
				const weeksEl = queryWeeksEl(currentMonthElSnapshot);
				if (weeksEl) weeksEl.classList.remove(weeksAnimationClass);
			});
			previousRootElSnapshotRef.current = rootElSnapshot;
		} else previousRootElSnapshotRef.current = null;
		if (animatingRef.current || isSameMonth$1 || focused) return;
		const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
		const currentMonthEls = queryMonthEls(rootElRef.current);
		if (currentMonthEls?.every((el) => el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every((el) => el instanceof HTMLElement)) {
			animatingRef.current = true;
			const cleanUpFunctions = [];
			rootElRef.current.style.isolation = "isolate";
			const navEl = queryNavEl(rootElRef.current);
			if (navEl) navEl.style.zIndex = "1";
			currentMonthEls.forEach((currentMonthEl, index) => {
				const previousMonthEl = previousMonthEls[index];
				if (!previousMonthEl) return;
				currentMonthEl.style.position = "relative";
				currentMonthEl.style.overflow = "hidden";
				const captionEl = queryCaptionEl(currentMonthEl);
				if (captionEl) captionEl.classList.add(captionAnimationClass);
				const weeksEl = queryWeeksEl(currentMonthEl);
				if (weeksEl) weeksEl.classList.add(weeksAnimationClass);
				const cleanUp = () => {
					animatingRef.current = false;
					if (rootElRef.current) rootElRef.current.style.isolation = "";
					if (navEl) navEl.style.zIndex = "";
					if (captionEl) captionEl.classList.remove(captionAnimationClass);
					if (weeksEl) weeksEl.classList.remove(weeksAnimationClass);
					currentMonthEl.style.position = "";
					currentMonthEl.style.overflow = "";
					if (currentMonthEl.contains(previousMonthEl)) currentMonthEl.removeChild(previousMonthEl);
				};
				cleanUpFunctions.push(cleanUp);
				previousMonthEl.style.pointerEvents = "none";
				previousMonthEl.style.position = "absolute";
				previousMonthEl.style.overflow = "hidden";
				previousMonthEl.setAttribute("aria-hidden", "true");
				const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
				if (previousWeekdaysEl) previousWeekdaysEl.style.opacity = "0";
				const previousCaptionEl = queryCaptionEl(previousMonthEl);
				if (previousCaptionEl) {
					previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
					previousCaptionEl.addEventListener("animationend", cleanUp);
				}
				const previousWeeksEl = queryWeeksEl(previousMonthEl);
				if (previousWeeksEl) previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
				currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
			});
		}
	});
}
function getDates(displayMonths, maxDate, props, dateLib) {
	const firstMonth = displayMonths[0];
	const lastMonth = displayMonths[displayMonths.length - 1];
	const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
	const { addDays: addDays$1, differenceInCalendarDays: differenceInCalendarDays$1, differenceInCalendarMonths: differenceInCalendarMonths$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfMonth: endOfMonth$1, endOfWeek: endOfWeek$1, isAfter: isAfter$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek$1(firstMonth, dateLib) : ISOWeek ? startOfISOWeek$1(firstMonth) : startOfWeek$1(firstMonth);
	const displayMonthsWeekEnd = broadcastCalendar ? endOfBroadcastWeek$1(lastMonth) : ISOWeek ? endOfISOWeek$1(endOfMonth$1(lastMonth)) : endOfWeek$1(endOfMonth$1(lastMonth));
	const constraintWeekEnd = maxDate && (broadcastCalendar ? endOfBroadcastWeek$1(maxDate) : ISOWeek ? endOfISOWeek$1(maxDate) : endOfWeek$1(maxDate));
	const nOfDays = differenceInCalendarDays$1(constraintWeekEnd && isAfter$1(displayMonthsWeekEnd, constraintWeekEnd) ? constraintWeekEnd : displayMonthsWeekEnd, startWeekFirstDate);
	const nOfMonths = differenceInCalendarMonths$1(lastMonth, firstMonth) + 1;
	const dates = [];
	for (let i = 0; i <= nOfDays; i++) {
		const date = addDays$1(startWeekFirstDate, i);
		dates.push(date);
	}
	const extraDates = (broadcastCalendar ? 35 : 42) * nOfMonths;
	if (fixedWeeks && dates.length < extraDates) {
		const daysToAdd = extraDates - dates.length;
		for (let i = 0; i < daysToAdd; i++) {
			const date = addDays$1(dates[dates.length - 1], 1);
			dates.push(date);
		}
	}
	return dates;
}
function getDays(calendarMonths) {
	const initialDays = [];
	return calendarMonths.reduce((days, month) => {
		const weekDays = month.weeks.reduce((weekDays$1, week) => {
			return weekDays$1.concat(week.days.slice());
		}, initialDays.slice());
		return days.concat(weekDays.slice());
	}, initialDays.slice());
}
function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
	const { numberOfMonths = 1 } = props;
	const months = [];
	for (let i = 0; i < numberOfMonths; i++) {
		const month = dateLib.addMonths(firstDisplayedMonth, i);
		if (calendarEndMonth && month > calendarEndMonth) break;
		months.push(month);
	}
	return months;
}
function getInitialMonth(props, navStart, navEnd, dateLib) {
	const { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props;
	let initialMonth = month || defaultMonth || today;
	const { differenceInCalendarMonths: differenceInCalendarMonths$1, addMonths: addMonths$1, startOfMonth: startOfMonth$1 } = dateLib;
	if (navEnd && differenceInCalendarMonths$1(navEnd, initialMonth) < numberOfMonths - 1) initialMonth = addMonths$1(navEnd, -1 * (numberOfMonths - 1));
	if (navStart && differenceInCalendarMonths$1(initialMonth, navStart) < 0) initialMonth = navStart;
	return startOfMonth$1(initialMonth);
}
function getMonths(displayMonths, dates, props, dateLib) {
	const { addDays: addDays$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfMonth: endOfMonth$1, endOfWeek: endOfWeek$1, getISOWeek: getISOWeek$1, getWeek: getWeek$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	const dayPickerMonths = displayMonths.reduce((months, month) => {
		const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek$1(month, dateLib) : props.ISOWeek ? startOfISOWeek$1(month) : startOfWeek$1(month);
		const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek$1(month) : props.ISOWeek ? endOfISOWeek$1(endOfMonth$1(month)) : endOfWeek$1(endOfMonth$1(month));
		const monthDates = dates.filter((date) => {
			return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
		});
		const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
		if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
			const extraDates = dates.filter((date) => {
				const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
				return date > lastDateOfLastWeek && date <= addDays$1(lastDateOfLastWeek, daysToAdd);
			});
			monthDates.push(...extraDates);
		}
		const dayPickerMonth = new CalendarMonth(month, monthDates.reduce((weeks, date) => {
			const weekNumber = props.ISOWeek ? getISOWeek$1(date) : getWeek$1(date);
			const week = weeks.find((week$1) => week$1.weekNumber === weekNumber);
			const day = new CalendarDay(date, month, dateLib);
			if (!week) weeks.push(new CalendarWeek(weekNumber, [day]));
			else week.days.push(day);
			return weeks;
		}, []));
		months.push(dayPickerMonth);
		return months;
	}, []);
	if (!props.reverseMonths) return dayPickerMonths;
	else return dayPickerMonths.reverse();
}
function getNavMonths(props, dateLib) {
	let { startMonth, endMonth } = props;
	const { startOfYear: startOfYear$1, startOfDay: startOfDay$1, startOfMonth: startOfMonth$1, endOfMonth: endOfMonth$1, addYears: addYears$1, endOfYear: endOfYear$1, newDate, today } = dateLib;
	const { fromYear, toYear, fromMonth, toMonth } = props;
	if (!startMonth && fromMonth) startMonth = fromMonth;
	if (!startMonth && fromYear) startMonth = dateLib.newDate(fromYear, 0, 1);
	if (!endMonth && toMonth) endMonth = toMonth;
	if (!endMonth && toYear) endMonth = newDate(toYear, 11, 31);
	const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
	if (startMonth) startMonth = startOfMonth$1(startMonth);
	else if (fromYear) startMonth = newDate(fromYear, 0, 1);
	else if (!startMonth && hasYearDropdown) startMonth = startOfYear$1(addYears$1(props.today ?? today(), -100));
	if (endMonth) endMonth = endOfMonth$1(endMonth);
	else if (toYear) endMonth = newDate(toYear, 11, 31);
	else if (!endMonth && hasYearDropdown) endMonth = endOfYear$1(props.today ?? today());
	return [startMonth ? startOfDay$1(startMonth) : startMonth, endMonth ? startOfDay$1(endMonth) : endMonth];
}
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
	if (options.disableNavigation) return;
	const { pagedNavigation, numberOfMonths = 1 } = options;
	const { startOfMonth: startOfMonth$1, addMonths: addMonths$1, differenceInCalendarMonths: differenceInCalendarMonths$1 } = dateLib;
	const offset = pagedNavigation ? numberOfMonths : 1;
	const month = startOfMonth$1(firstDisplayedMonth);
	if (!calendarEndMonth) return addMonths$1(month, offset);
	if (differenceInCalendarMonths$1(calendarEndMonth, firstDisplayedMonth) < numberOfMonths) return;
	return addMonths$1(month, offset);
}
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
	if (options.disableNavigation) return;
	const { pagedNavigation, numberOfMonths } = options;
	const { startOfMonth: startOfMonth$1, addMonths: addMonths$1, differenceInCalendarMonths: differenceInCalendarMonths$1 } = dateLib;
	const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
	const month = startOfMonth$1(firstDisplayedMonth);
	if (!calendarStartMonth) return addMonths$1(month, -offset);
	if (differenceInCalendarMonths$1(month, calendarStartMonth) <= 0) return;
	return addMonths$1(month, -offset);
}
function getWeeks(months) {
	return months.reduce((weeks, month) => {
		return weeks.concat(month.weeks.slice());
	}, [].slice());
}
function useControlledValue(defaultValue, controlledValue) {
	const [uncontrolledValue, setValue] = (0, import_react.useState)(defaultValue);
	return [controlledValue === void 0 ? uncontrolledValue : controlledValue, setValue];
}
function useCalendar(props, dateLib) {
	const [navStart, navEnd] = getNavMonths(props, dateLib);
	const { startOfMonth: startOfMonth$1, endOfMonth: endOfMonth$1 } = dateLib;
	const initialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
	const [firstMonth, setFirstMonth] = useControlledValue(initialMonth, props.month ? initialMonth : void 0);
	(0, import_react.useEffect)(() => {
		setFirstMonth(getInitialMonth(props, navStart, navEnd, dateLib));
	}, [props.timeZone]);
	const { months, weeks, days, previousMonth, nextMonth } = (0, import_react.useMemo)(() => {
		const displayMonths = getDisplayMonths(firstMonth, navEnd, { numberOfMonths: props.numberOfMonths }, dateLib);
		const months$1 = getMonths(displayMonths, getDates(displayMonths, props.endMonth ? endOfMonth$1(props.endMonth) : void 0, {
			ISOWeek: props.ISOWeek,
			fixedWeeks: props.fixedWeeks,
			broadcastCalendar: props.broadcastCalendar
		}, dateLib), {
			broadcastCalendar: props.broadcastCalendar,
			fixedWeeks: props.fixedWeeks,
			ISOWeek: props.ISOWeek,
			reverseMonths: props.reverseMonths
		}, dateLib);
		return {
			months: months$1,
			weeks: getWeeks(months$1),
			days: getDays(months$1),
			previousMonth: getPreviousMonth(firstMonth, navStart, props, dateLib),
			nextMonth: getNextMonth(firstMonth, navEnd, props, dateLib)
		};
	}, [
		dateLib,
		firstMonth.getTime(),
		navEnd?.getTime(),
		navStart?.getTime(),
		props.disableNavigation,
		props.broadcastCalendar,
		props.endMonth?.getTime(),
		props.fixedWeeks,
		props.ISOWeek,
		props.numberOfMonths,
		props.pagedNavigation,
		props.reverseMonths
	]);
	const { disableNavigation, onMonthChange } = props;
	const isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day)));
	const goToMonth = (date) => {
		if (disableNavigation) return;
		let newMonth = startOfMonth$1(date);
		if (navStart && newMonth < startOfMonth$1(navStart)) newMonth = startOfMonth$1(navStart);
		if (navEnd && newMonth > startOfMonth$1(navEnd)) newMonth = startOfMonth$1(navEnd);
		setFirstMonth(newMonth);
		onMonthChange?.(newMonth);
	};
	const goToDay = (day) => {
		if (isDayInCalendar(day)) return;
		goToMonth(day.date);
	};
	return {
		months,
		weeks,
		days,
		navStart,
		navEnd,
		previousMonth,
		nextMonth,
		goToMonth,
		goToDay
	};
}
var FocusTargetPriority;
(function(FocusTargetPriority$1) {
	FocusTargetPriority$1[FocusTargetPriority$1["Today"] = 0] = "Today";
	FocusTargetPriority$1[FocusTargetPriority$1["Selected"] = 1] = "Selected";
	FocusTargetPriority$1[FocusTargetPriority$1["LastFocused"] = 2] = "LastFocused";
	FocusTargetPriority$1[FocusTargetPriority$1["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
function isFocusableDay(modifiers) {
	return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
	let focusTarget;
	let foundFocusTargetPriority = -1;
	for (const day of days) {
		const modifiers = getModifiers(day);
		if (isFocusableDay(modifiers)) {
			if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
			} else if (lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.LastFocused;
			} else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.Selected;
			} else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.Today;
			}
		}
	}
	if (!focusTarget) focusTarget = days.find((day) => isFocusableDay(getModifiers(day)));
	return focusTarget;
}
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
	const { ISOWeek, broadcastCalendar } = props;
	const { addDays: addDays$1, addMonths: addMonths$1, addWeeks: addWeeks$1, addYears: addYears$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfWeek: endOfWeek$1, max: max$1, min: min$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	let focusableDate = {
		day: addDays$1,
		week: addWeeks$1,
		month: addMonths$1,
		year: addYears$1,
		startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek$1(date, dateLib) : ISOWeek ? startOfISOWeek$1(date) : startOfWeek$1(date),
		endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek$1(date) : ISOWeek ? endOfISOWeek$1(date) : endOfWeek$1(date)
	}[moveBy](refDate, moveDir === "after" ? 1 : -1);
	if (moveDir === "before" && navStart) focusableDate = max$1([navStart, focusableDate]);
	else if (moveDir === "after" && navEnd) focusableDate = min$1([navEnd, focusableDate]);
	return focusableDate;
}
function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
	if (attempt > 365) return;
	const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib);
	const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
	const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
	const focusDay = new CalendarDay(focusableDate, focusableDate, dateLib);
	if (!isDisabled && !isHidden) return focusDay;
	return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
	const { autoFocus } = props;
	const [lastFocused, setLastFocused] = (0, import_react.useState)();
	const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
	const [focusedDay, setFocused] = (0, import_react.useState)(autoFocus ? focusTarget : void 0);
	const blur = () => {
		setLastFocused(focusedDay);
		setFocused(void 0);
	};
	const moveFocus = (moveBy, moveDir) => {
		if (!focusedDay) return;
		const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
		if (!nextFocus) return;
		if (props.disableNavigation) {
			if (!calendar.days.some((day) => day.isEqualTo(nextFocus))) return;
		}
		calendar.goToDay(nextFocus);
		setFocused(nextFocus);
	};
	const isFocusTarget = (day) => {
		return Boolean(focusTarget?.isEqualTo(day));
	};
	return {
		isFocusTarget,
		setFocused,
		focused: focusedDay,
		blur,
		moveFocus
	};
}
function useMulti(props, dateLib) {
	const { selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const { isSameDay: isSameDay$1 } = dateLib;
	const isSelected = (date) => {
		return selected?.some((d) => isSameDay$1(d, date)) ?? false;
	};
	const { min: min$1, max: max$1 } = props;
	const select = (triggerDate, modifiers, e) => {
		let newDates = [...selected ?? []];
		if (isSelected(triggerDate)) {
			if (selected?.length === min$1) return;
			if (required && selected?.length === 1) return;
			newDates = selected?.filter((d) => !isSameDay$1(d, triggerDate));
		} else if (selected?.length === max$1) newDates = [triggerDate];
		else newDates = [...newDates, triggerDate];
		if (!onSelect) setSelected(newDates);
		onSelect?.(newDates, triggerDate, modifiers, e);
		return newDates;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function addToRange(date, initialRange, min$1 = 0, max$1 = 0, required = false, dateLib = defaultDateLib) {
	const { from, to } = initialRange || {};
	const { isSameDay: isSameDay$1, isAfter: isAfter$1, isBefore: isBefore$1 } = dateLib;
	let range;
	if (!from && !to) range = {
		from: date,
		to: min$1 > 0 ? void 0 : date
	};
	else if (from && !to) if (isSameDay$1(from, date)) if (min$1 === 0) range = {
		from,
		to: date
	};
	else if (required) range = {
		from,
		to: void 0
	};
	else range = void 0;
	else if (isBefore$1(date, from)) range = {
		from: date,
		to: from
	};
	else range = {
		from,
		to: date
	};
	else if (from && to) if (isSameDay$1(from, date) && isSameDay$1(to, date)) if (required) range = {
		from,
		to
	};
	else range = void 0;
	else if (isSameDay$1(from, date)) range = {
		from,
		to: min$1 > 0 ? void 0 : date
	};
	else if (isSameDay$1(to, date)) range = {
		from: date,
		to: min$1 > 0 ? void 0 : date
	};
	else if (isBefore$1(date, from)) range = {
		from: date,
		to
	};
	else if (isAfter$1(date, from)) range = {
		from,
		to: date
	};
	else if (isAfter$1(date, to)) range = {
		from,
		to: date
	};
	else throw new Error("Invalid range");
	if (range?.from && range?.to) {
		const diff = dateLib.differenceInCalendarDays(range.to, range.from);
		if (max$1 > 0 && diff > max$1) range = {
			from: date,
			to: void 0
		};
		else if (min$1 > 1 && diff < min$1) range = {
			from: date,
			to: void 0
		};
	}
	return range;
}
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
	const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
	let date = range.from;
	const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
	const totalDaysLimit = Math.min(totalDays, 6);
	for (let i = 0; i <= totalDaysLimit; i++) {
		if (dayOfWeekArr.includes(date.getDay())) return true;
		date = dateLib.addDays(date, 1);
	}
	return false;
}
function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
	return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}
function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
	const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
	if (matchers.filter((matcher) => typeof matcher !== "function").some((matcher) => {
		if (typeof matcher === "boolean") return matcher;
		if (dateLib.isDate(matcher)) return rangeIncludesDate(range, matcher, false, dateLib);
		if (isDatesArray(matcher, dateLib)) return matcher.some((date) => rangeIncludesDate(range, date, false, dateLib));
		if (isDateRange(matcher)) {
			if (matcher.from && matcher.to) return rangeOverlaps(range, {
				from: matcher.from,
				to: matcher.to
			}, dateLib);
			return false;
		}
		if (isDayOfWeekType(matcher)) return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
		if (isDateInterval(matcher)) {
			if (dateLib.isAfter(matcher.before, matcher.after)) return rangeOverlaps(range, {
				from: dateLib.addDays(matcher.after, 1),
				to: dateLib.addDays(matcher.before, -1)
			}, dateLib);
			return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
		}
		if (isDateAfterType(matcher) || isDateBeforeType(matcher)) return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
		return false;
	})) return true;
	const functionMatchers = matchers.filter((matcher) => typeof matcher === "function");
	if (functionMatchers.length) {
		let date = range.from;
		const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
		for (let i = 0; i <= totalDays; i++) {
			if (functionMatchers.some((matcher) => matcher(date))) return true;
			date = dateLib.addDays(date, 1);
		}
	}
	return false;
}
function useRange(props, dateLib) {
	const { disabled, excludeDisabled, resetOnSelect, selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const isSelected = (date) => selected && rangeIncludesDate(selected, date, false, dateLib);
	const select = (triggerDate, modifiers, e) => {
		const { min: min$1, max: max$1 } = props;
		let newRange;
		if (triggerDate) {
			const selectedFrom = selected?.from;
			const selectedTo = selected?.to;
			const hasFullRange = !!selectedFrom && !!selectedTo;
			const isClickingSingleDayRange = !!selectedFrom && !!selectedTo && dateLib.isSameDay(selectedFrom, selectedTo) && dateLib.isSameDay(triggerDate, selectedFrom);
			if (resetOnSelect && (hasFullRange || !selected?.from)) if (!required && isClickingSingleDayRange) newRange = void 0;
			else newRange = {
				from: triggerDate,
				to: void 0
			};
			else newRange = addToRange(triggerDate, selected, min$1, max$1, required, dateLib);
		}
		if (excludeDisabled && disabled && newRange?.from && newRange.to) {
			if (rangeContainsModifiers({
				from: newRange.from,
				to: newRange.to
			}, disabled, dateLib)) {
				newRange.from = triggerDate;
				newRange.to = void 0;
			}
		}
		if (!onSelect) setSelected(newRange);
		onSelect?.(newRange, triggerDate, modifiers, e);
		return newRange;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function useSingle(props, dateLib) {
	const { selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const { isSameDay: isSameDay$1 } = dateLib;
	const isSelected = (compareDate) => {
		return selected ? isSameDay$1(selected, compareDate) : false;
	};
	const select = (triggerDate, modifiers, e) => {
		let newDate = triggerDate;
		if (!required && selected && selected && isSameDay$1(triggerDate, selected)) newDate = void 0;
		if (!onSelect) setSelected(newDate);
		if (required) onSelect?.(newDate, triggerDate, modifiers, e);
		else onSelect?.(newDate, triggerDate, modifiers, e);
		return newDate;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function useSelection(props, dateLib) {
	const single = useSingle(props, dateLib);
	const multi = useMulti(props, dateLib);
	const range = useRange(props, dateLib);
	switch (props.mode) {
		case "single": return single;
		case "multiple": return multi;
		case "range": return range;
		default: return;
	}
}
function toTimeZone(date, timeZone) {
	if (date instanceof TZDate && date.timeZone === timeZone) return date;
	return new TZDate(date, timeZone);
}
function toZoneNoon(date, timeZone, noonSafe) {
	if (!noonSafe) return toTimeZone(date, timeZone);
	const zoned = toTimeZone(date, timeZone);
	const noonZoned = new TZDate(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 12, 0, 0, timeZone);
	return new Date(noonZoned.getTime());
}
function convertMatcher(matcher, timeZone, noonSafe) {
	if (typeof matcher === "boolean" || typeof matcher === "function") return matcher;
	if (matcher instanceof Date) return toZoneNoon(matcher, timeZone, noonSafe);
	if (Array.isArray(matcher)) return matcher.map((value) => value instanceof Date ? toZoneNoon(value, timeZone, noonSafe) : value);
	if (isDateRange(matcher)) return {
		...matcher,
		from: matcher.from ? toTimeZone(matcher.from, timeZone) : matcher.from,
		to: matcher.to ? toTimeZone(matcher.to, timeZone) : matcher.to
	};
	if (isDateInterval(matcher)) return {
		before: toZoneNoon(matcher.before, timeZone, noonSafe),
		after: toZoneNoon(matcher.after, timeZone, noonSafe)
	};
	if (isDateAfterType(matcher)) return { after: toZoneNoon(matcher.after, timeZone, noonSafe) };
	if (isDateBeforeType(matcher)) return { before: toZoneNoon(matcher.before, timeZone, noonSafe) };
	return matcher;
}
function convertMatchersToTimeZone(matchers, timeZone, noonSafe) {
	if (!matchers) return matchers;
	if (Array.isArray(matchers)) return matchers.map((matcher) => convertMatcher(matcher, timeZone, noonSafe));
	return convertMatcher(matchers, timeZone, noonSafe);
}
function DayPicker(initialProps) {
	let props = initialProps;
	const timeZone = props.timeZone;
	if (timeZone) {
		props = {
			...initialProps,
			timeZone
		};
		if (props.today) props.today = toTimeZone(props.today, timeZone);
		if (props.month) props.month = toTimeZone(props.month, timeZone);
		if (props.defaultMonth) props.defaultMonth = toTimeZone(props.defaultMonth, timeZone);
		if (props.startMonth) props.startMonth = toTimeZone(props.startMonth, timeZone);
		if (props.endMonth) props.endMonth = toTimeZone(props.endMonth, timeZone);
		if (props.mode === "single" && props.selected) props.selected = toTimeZone(props.selected, timeZone);
		else if (props.mode === "multiple" && props.selected) props.selected = props.selected?.map((date) => toTimeZone(date, timeZone));
		else if (props.mode === "range" && props.selected) props.selected = {
			from: props.selected.from ? toTimeZone(props.selected.from, timeZone) : props.selected.from,
			to: props.selected.to ? toTimeZone(props.selected.to, timeZone) : props.selected.to
		};
		if (props.disabled !== void 0) props.disabled = convertMatchersToTimeZone(props.disabled, timeZone);
		if (props.hidden !== void 0) props.hidden = convertMatchersToTimeZone(props.hidden, timeZone);
		if (props.modifiers) {
			const nextModifiers = {};
			Object.keys(props.modifiers).forEach((key) => {
				nextModifiers[key] = convertMatchersToTimeZone(props.modifiers?.[key], timeZone);
			});
			props.modifiers = nextModifiers;
		}
	}
	const { components, formatters: formatters$1, labels, dateLib, locale, classNames } = (0, import_react.useMemo)(() => {
		const locale$1 = {
			...enUS,
			...props.locale
		};
		const weekStartsOn = props.broadcastCalendar ? 1 : props.weekStartsOn;
		const noonOverrides = props.noonSafe && props.timeZone ? createNoonOverrides(props.timeZone, {
			weekStartsOn,
			locale: locale$1
		}) : void 0;
		const overrides = props.dateLib && noonOverrides ? {
			...noonOverrides,
			...props.dateLib
		} : props.dateLib ?? noonOverrides;
		const dateLib$1 = new DateLib({
			locale: locale$1,
			weekStartsOn,
			firstWeekContainsDate: props.firstWeekContainsDate,
			useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
			timeZone: props.timeZone,
			numerals: props.numerals
		}, overrides);
		return {
			dateLib: dateLib$1,
			components: getComponents(props.components),
			formatters: getFormatters(props.formatters),
			labels: getLabels(props.labels, dateLib$1.options),
			locale: locale$1,
			classNames: {
				...getDefaultClassNames(),
				...props.classNames
			}
		};
	}, [
		props.locale,
		props.broadcastCalendar,
		props.weekStartsOn,
		props.firstWeekContainsDate,
		props.useAdditionalWeekYearTokens,
		props.useAdditionalDayOfYearTokens,
		props.timeZone,
		props.numerals,
		props.dateLib,
		props.noonSafe,
		props.components,
		props.formatters,
		props.labels,
		props.classNames
	]);
	if (!props.today) props = {
		...props,
		today: dateLib.today()
	};
	const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
	const { formatCaption: formatCaption$1, formatDay: formatDay$1, formatMonthDropdown: formatMonthDropdown$1, formatWeekNumber: formatWeekNumber$1, formatWeekNumberHeader: formatWeekNumberHeader$1, formatWeekdayName: formatWeekdayName$1, formatYearDropdown: formatYearDropdown$1 } = formatters$1;
	const calendar = useCalendar(props, dateLib);
	const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
	const getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib);
	const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {};
	const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
	const { labelDayButton: labelDayButton$1, labelGridcell: labelGridcell$1, labelGrid: labelGrid$1, labelMonthDropdown: labelMonthDropdown$1, labelNav: labelNav$1, labelPrevious: labelPrevious$1, labelNext: labelNext$1, labelWeekday: labelWeekday$1, labelWeekNumber: labelWeekNumber$1, labelWeekNumberHeader: labelWeekNumberHeader$1, labelYearDropdown: labelYearDropdown$1 } = labels;
	const weekdays = (0, import_react.useMemo)(() => getWeekdays(dateLib, props.ISOWeek, props.broadcastCalendar, props.today), [
		dateLib,
		props.ISOWeek,
		props.broadcastCalendar,
		props.today
	]);
	const isInteractive = mode !== void 0 || onDayClick !== void 0;
	const handlePreviousClick = (0, import_react.useCallback)(() => {
		if (!previousMonth) return;
		goToMonth(previousMonth);
		onPrevClick?.(previousMonth);
	}, [
		previousMonth,
		goToMonth,
		onPrevClick
	]);
	const handleNextClick = (0, import_react.useCallback)(() => {
		if (!nextMonth) return;
		goToMonth(nextMonth);
		onNextClick?.(nextMonth);
	}, [
		goToMonth,
		nextMonth,
		onNextClick
	]);
	const handleDayClick = (0, import_react.useCallback)((day, m) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		setFocused(day);
		if (m.disabled) return;
		select?.(day.date, m, e);
		onDayClick?.(day.date, m, e);
	}, [
		select,
		onDayClick,
		setFocused
	]);
	const handleDayFocus = (0, import_react.useCallback)((day, m) => (e) => {
		setFocused(day);
		onDayFocus?.(day.date, m, e);
	}, [onDayFocus, setFocused]);
	const handleDayBlur = (0, import_react.useCallback)((day, m) => (e) => {
		blur();
		onDayBlur?.(day.date, m, e);
	}, [blur, onDayBlur]);
	const handleDayKeyDown = (0, import_react.useCallback)((day, modifiers) => (e) => {
		const keyMap = {
			ArrowLeft: [e.shiftKey ? "month" : "day", props.dir === "rtl" ? "after" : "before"],
			ArrowRight: [e.shiftKey ? "month" : "day", props.dir === "rtl" ? "before" : "after"],
			ArrowDown: [e.shiftKey ? "year" : "week", "after"],
			ArrowUp: [e.shiftKey ? "year" : "week", "before"],
			PageUp: [e.shiftKey ? "year" : "month", "before"],
			PageDown: [e.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (keyMap[e.key]) {
			e.preventDefault();
			e.stopPropagation();
			const [moveBy, moveDir] = keyMap[e.key];
			moveFocus(moveBy, moveDir);
		}
		onDayKeyDown?.(day.date, modifiers, e);
	}, [
		moveFocus,
		onDayKeyDown,
		props.dir
	]);
	const handleDayMouseEnter = (0, import_react.useCallback)((day, modifiers) => (e) => {
		onDayMouseEnter?.(day.date, modifiers, e);
	}, [onDayMouseEnter]);
	const handleDayMouseLeave = (0, import_react.useCallback)((day, modifiers) => (e) => {
		onDayMouseLeave?.(day.date, modifiers, e);
	}, [onDayMouseLeave]);
	const handleMonthChange = (0, import_react.useCallback)((date) => (e) => {
		const selectedMonth = Number(e.target.value);
		goToMonth(dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth));
	}, [dateLib, goToMonth]);
	const handleYearChange = (0, import_react.useCallback)((date) => (e) => {
		const selectedYear = Number(e.target.value);
		goToMonth(dateLib.setYear(dateLib.startOfMonth(date), selectedYear));
	}, [dateLib, goToMonth]);
	const { className, style } = (0, import_react.useMemo)(() => ({
		className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
		style: {
			...styles?.[UI.Root],
			...props.style
		}
	}), [
		classNames,
		props.className,
		props.style,
		styles
	]);
	const dataAttributes = getDataAttributes(props);
	const rootElRef = (0, import_react.useRef)(null);
	useAnimation(rootElRef, Boolean(props.animate), {
		classNames,
		months,
		focused,
		dateLib
	});
	const contextValue = {
		dayPickerProps: props,
		selected: selectedValue,
		select,
		isSelected,
		months,
		nextMonth,
		previousMonth,
		goToMonth,
		getModifiers,
		components,
		classNames,
		styles,
		labels,
		formatters: formatters$1
	};
	return import_react.createElement(dayPickerContext.Provider, { value: contextValue }, import_react.createElement(components.Root, {
		rootRef: props.animate ? rootElRef : void 0,
		className,
		style,
		dir: props.dir,
		id: props.id,
		lang: props.lang ?? locale.code,
		nonce: props.nonce,
		title: props.title,
		role: props.role,
		"aria-label": props["aria-label"],
		"aria-labelledby": props["aria-labelledby"],
		...dataAttributes
	}, import_react.createElement(components.Months, {
		className: classNames[UI.Months],
		style: styles?.[UI.Months]
	}, !props.hideNavigation && !navLayout && import_react.createElement(components.Nav, {
		"data-animated-nav": props.animate ? "true" : void 0,
		className: classNames[UI.Nav],
		style: styles?.[UI.Nav],
		"aria-label": labelNav$1(),
		onPreviousClick: handlePreviousClick,
		onNextClick: handleNextClick,
		previousMonth,
		nextMonth
	}), months.map((calendarMonth, displayIndex) => {
		return import_react.createElement(components.Month, {
			"data-animated-month": props.animate ? "true" : void 0,
			className: classNames[UI.Month],
			style: styles?.[UI.Month],
			key: displayIndex,
			displayIndex,
			calendarMonth
		}, navLayout === "around" && !props.hideNavigation && displayIndex === 0 && import_react.createElement(components.PreviousMonthButton, {
			type: "button",
			className: classNames[UI.PreviousMonthButton],
			tabIndex: previousMonth ? void 0 : -1,
			"aria-disabled": previousMonth ? void 0 : true,
			"aria-label": labelPrevious$1(previousMonth),
			onClick: handlePreviousClick,
			"data-animated-button": props.animate ? "true" : void 0
		}, import_react.createElement(components.Chevron, {
			disabled: previousMonth ? void 0 : true,
			className: classNames[UI.Chevron],
			orientation: props.dir === "rtl" ? "right" : "left"
		})), import_react.createElement(components.MonthCaption, {
			"data-animated-caption": props.animate ? "true" : void 0,
			className: classNames[UI.MonthCaption],
			style: styles?.[UI.MonthCaption],
			calendarMonth,
			displayIndex
		}, captionLayout?.startsWith("dropdown") ? import_react.createElement(components.DropdownNav, {
			className: classNames[UI.Dropdowns],
			style: styles?.[UI.Dropdowns]
		}, (() => {
			const monthControl = captionLayout === "dropdown" || captionLayout === "dropdown-months" ? import_react.createElement(components.MonthsDropdown, {
				key: "month",
				className: classNames[UI.MonthsDropdown],
				"aria-label": labelMonthDropdown$1(),
				classNames,
				components,
				disabled: Boolean(props.disableNavigation),
				onChange: handleMonthChange(calendarMonth.date),
				options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters$1, dateLib),
				style: styles?.[UI.Dropdown],
				value: dateLib.getMonth(calendarMonth.date)
			}) : import_react.createElement("span", { key: "month" }, formatMonthDropdown$1(calendarMonth.date, dateLib));
			const yearControl = captionLayout === "dropdown" || captionLayout === "dropdown-years" ? import_react.createElement(components.YearsDropdown, {
				key: "year",
				className: classNames[UI.YearsDropdown],
				"aria-label": labelYearDropdown$1(dateLib.options),
				classNames,
				components,
				disabled: Boolean(props.disableNavigation),
				onChange: handleYearChange(calendarMonth.date),
				options: getYearOptions(navStart, navEnd, formatters$1, dateLib, Boolean(props.reverseYears)),
				style: styles?.[UI.Dropdown],
				value: dateLib.getYear(calendarMonth.date)
			}) : import_react.createElement("span", { key: "year" }, formatYearDropdown$1(calendarMonth.date, dateLib));
			return dateLib.getMonthYearOrder() === "year-first" ? [yearControl, monthControl] : [monthControl, yearControl];
		})(), import_react.createElement("span", {
			role: "status",
			"aria-live": "polite",
			style: {
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal"
			}
		}, formatCaption$1(calendarMonth.date, dateLib.options, dateLib))) : import_react.createElement(components.CaptionLabel, {
			className: classNames[UI.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, formatCaption$1(calendarMonth.date, dateLib.options, dateLib))), navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && import_react.createElement(components.NextMonthButton, {
			type: "button",
			className: classNames[UI.NextMonthButton],
			tabIndex: nextMonth ? void 0 : -1,
			"aria-disabled": nextMonth ? void 0 : true,
			"aria-label": labelNext$1(nextMonth),
			onClick: handleNextClick,
			"data-animated-button": props.animate ? "true" : void 0
		}, import_react.createElement(components.Chevron, {
			disabled: nextMonth ? void 0 : true,
			className: classNames[UI.Chevron],
			orientation: props.dir === "rtl" ? "left" : "right"
		})), displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && import_react.createElement(components.Nav, {
			"data-animated-nav": props.animate ? "true" : void 0,
			className: classNames[UI.Nav],
			style: styles?.[UI.Nav],
			"aria-label": labelNav$1(),
			onPreviousClick: handlePreviousClick,
			onNextClick: handleNextClick,
			previousMonth,
			nextMonth
		}), import_react.createElement(components.MonthGrid, {
			role: "grid",
			"aria-multiselectable": mode === "multiple" || mode === "range",
			"aria-label": labelGrid$1(calendarMonth.date, dateLib.options, dateLib) || void 0,
			className: classNames[UI.MonthGrid],
			style: styles?.[UI.MonthGrid]
		}, !props.hideWeekdays && import_react.createElement(components.Weekdays, {
			"data-animated-weekdays": props.animate ? "true" : void 0,
			className: classNames[UI.Weekdays],
			style: styles?.[UI.Weekdays]
		}, showWeekNumber && import_react.createElement(components.WeekNumberHeader, {
			"aria-label": labelWeekNumberHeader$1(dateLib.options),
			className: classNames[UI.WeekNumberHeader],
			style: styles?.[UI.WeekNumberHeader],
			scope: "col"
		}, formatWeekNumberHeader$1()), weekdays.map((weekday) => import_react.createElement(components.Weekday, {
			"aria-label": labelWeekday$1(weekday, dateLib.options, dateLib),
			className: classNames[UI.Weekday],
			key: String(weekday),
			style: styles?.[UI.Weekday],
			scope: "col"
		}, formatWeekdayName$1(weekday, dateLib.options, dateLib)))), import_react.createElement(components.Weeks, {
			"data-animated-weeks": props.animate ? "true" : void 0,
			className: classNames[UI.Weeks],
			style: styles?.[UI.Weeks]
		}, calendarMonth.weeks.map((week) => {
			return import_react.createElement(components.Week, {
				className: classNames[UI.Week],
				key: week.weekNumber,
				style: styles?.[UI.Week],
				week
			}, showWeekNumber && import_react.createElement(components.WeekNumber, {
				week,
				style: styles?.[UI.WeekNumber],
				"aria-label": labelWeekNumber$1(week.weekNumber, { locale }),
				className: classNames[UI.WeekNumber],
				scope: "row",
				role: "rowheader"
			}, formatWeekNumber$1(week.weekNumber, dateLib)), week.days.map((day) => {
				const { date } = day;
				const modifiers = getModifiers(day);
				modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
				modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
				if (isDateRange(selectedValue)) {
					const { from, to } = selectedValue;
					modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
					modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
					modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
				}
				const style$1 = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
				const className$1 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
				const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell$1(date, modifiers, dateLib.options, dateLib) : void 0;
				return import_react.createElement(components.Day, {
					key: `${day.isoDate}_${day.displayMonthId}`,
					day,
					modifiers,
					className: className$1.join(" "),
					style: style$1,
					role: "gridcell",
					"aria-selected": modifiers.selected || void 0,
					"aria-label": ariaLabel,
					"data-day": day.isoDate,
					"data-month": day.outside ? day.dateMonthId : void 0,
					"data-selected": modifiers.selected || void 0,
					"data-disabled": modifiers.disabled || void 0,
					"data-hidden": modifiers.hidden || void 0,
					"data-outside": day.outside || void 0,
					"data-focused": modifiers.focused || void 0,
					"data-today": modifiers.today || void 0
				}, !modifiers.hidden && isInteractive ? import_react.createElement(components.DayButton, {
					className: classNames[UI.DayButton],
					style: styles?.[UI.DayButton],
					type: "button",
					day,
					modifiers,
					disabled: !modifiers.focused && modifiers.disabled || void 0,
					"aria-disabled": modifiers.focused && modifiers.disabled || void 0,
					tabIndex: isFocusTarget(day) ? 0 : -1,
					"aria-label": labelDayButton$1(date, modifiers, dateLib.options, dateLib),
					onClick: handleDayClick(day, modifiers),
					onBlur: handleDayBlur(day, modifiers),
					onFocus: handleDayFocus(day, modifiers),
					onKeyDown: handleDayKeyDown(day, modifiers),
					onMouseEnter: handleDayMouseEnter(day, modifiers),
					onMouseLeave: handleDayMouseLeave(day, modifiers)
				}, formatDay$1(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay$1(day.date, dateLib.options, dateLib));
			}));
		}))));
	})), props.footer && import_react.createElement(components.Footer, {
		className: classNames[UI.Footer],
		style: styles?.[UI.Footer],
		role: "status",
		"aria-live": "polite"
	}, props.footer)));
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Calendar({ className, classNames, components, showOutsideDays = true, captionLayout = "dropdown", ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		captionLayout,
		className: cn("p-3", className),
		classNames: {
			...defaultClassNames,
			root: cn(defaultClassNames.root, "w-fit"),
			months: cn(defaultClassNames.months, "relative flex flex-col gap-4 sm:flex-row"),
			month: cn(defaultClassNames.month, "space-y-3"),
			month_caption: cn(defaultClassNames.month_caption, "flex h-8 items-center justify-center"),
			caption_label: cn(defaultClassNames.caption_label, "font-medium text-sm"),
			dropdowns: cn(defaultClassNames.dropdowns, "flex w-full items-center justify-center gap-2"),
			dropdown_root: cn(defaultClassNames.dropdown_root, "relative"),
			dropdown: cn(defaultClassNames.dropdown, "h-8 rounded-md border border-border bg-background px-2 text-sm outline-none transition-colors focus-visible:border-primary"),
			nav: cn(defaultClassNames.nav, "absolute inset-x-0 top-3 flex items-center justify-between px-3"),
			button_previous: cn(defaultClassNames.button_previous, "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"),
			button_next: cn(defaultClassNames.button_next, "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"),
			month_grid: cn(defaultClassNames.month_grid, "w-full border-collapse space-y-1"),
			weekdays: cn(defaultClassNames.weekdays, "flex"),
			weekday: cn(defaultClassNames.weekday, "w-8 rounded-md text-center font-normal text-muted-foreground text-xs"),
			week: cn(defaultClassNames.week, "mt-1 flex w-full"),
			day: cn(defaultClassNames.day, "size-8 p-0 text-center text-sm"),
			day_button: cn(defaultClassNames.day_button, "inline-flex size-8 items-center justify-center rounded-md font-normal text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"),
			selected: cn(defaultClassNames.selected, "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"),
			today: cn(defaultClassNames.today, "bg-accent text-accent-foreground"),
			outside: cn(defaultClassNames.outside, "text-muted-foreground opacity-50"),
			disabled: cn(defaultClassNames.disabled, "text-muted-foreground opacity-40"),
			range_middle: cn(defaultClassNames.range_middle, "rounded-none bg-accent text-accent-foreground"),
			range_start: cn(defaultClassNames.range_start, "rounded-l-md bg-primary text-primary-foreground"),
			range_end: cn(defaultClassNames.range_end, "rounded-r-md bg-primary text-primary-foreground"),
			hidden: cn(defaultClassNames.hidden, "invisible"),
			...classNames
		},
		components: {
			MonthCaption: CalendarMonthCaption,
			DropdownNav: CalendarDropdownNav,
			Dropdown: CalendarDropdown,
			Chevron: CalendarChevron,
			...components
		},
		...props
	});
}
function CalendarMonthCaption({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function CalendarDropdownNav({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.calendar-dropdown-nav",
		className: cn("flex w-full items-center gap-2", className),
		...mergeUiProps(props, "ui.calendar-dropdown-nav")
	});
}
function CalendarDropdown({ value, onChange, options, disabled, className, style, "aria-label": ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value: value?.toString(),
		disabled,
		onValueChange: (nextValue) => handleCalendarDropdownChange(nextValue, onChange),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			"aria-label": ariaLabel,
			size: "sm",
			style,
			className: cn("min-w-0 first:flex-1 last:shrink-0", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
			align: "center",
			className: "max-h-64",
			children: options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: String(option.value),
				disabled: option.disabled,
				children: option.label
			}, option.value))
		})]
	});
}
function handleCalendarDropdownChange(value, onChange) {
	if (!onChange) return;
	onChange({ target: { value: String(value) } });
}
function CalendarChevron({ className, orientation, disabled, ...props }) {
	const iconClassName = cn("size-4", disabled && "opacity-40", className);
	if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
		className: iconClassName,
		...props
	});
	if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, {
		className: iconClassName,
		...props
	});
	if (orientation === "up") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
		className: iconClassName,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown$1, {
		className: iconClassName,
		...props
	});
}
var defaultLabels = {
	hour: "Hour",
	minute: "Minute",
	second: "Second"
};
var defaultFormatByGranularity = {
	day: "yyyy-MM-dd",
	hour: "yyyy-MM-dd HH",
	minute: "yyyy-MM-dd HH:mm",
	second: "yyyy-MM-dd HH:mm:ss"
};
function DateTimePicker({ value, defaultValue, onChange, open, defaultOpen, onOpenChange, granularity = "day", format: format$1, placeholder = "Pick a date", disabled, className, triggerClassName, popoverClassName, calendarProps, labels }) {
	const isValueControlled = value !== void 0;
	const [internalValue, setInternalValue] = import_react.useState(() => normalizeDate(defaultValue));
	const selectedDate = isValueControlled ? normalizeDate(value) : internalValue;
	const [month, setMonth$1] = import_react.useState(() => {
		return getMonthDate(normalizeDate(value) ?? normalizeDate(defaultValue) ?? /* @__PURE__ */ new Date());
	});
	const isOpenControlled = open !== void 0;
	const [internalOpen, setInternalOpen] = import_react.useState(defaultOpen ?? false);
	const pickerOpen = isOpenControlled ? open : internalOpen;
	const mergedLabels = {
		...defaultLabels,
		...labels
	};
	const selectedYear = selectedDate?.getFullYear();
	const selectedMonth = selectedDate?.getMonth();
	import_react.useEffect(() => {
		if (selectedYear === void 0 || selectedMonth === void 0) return;
		setMonth$1(new Date(selectedYear, selectedMonth));
	}, [selectedMonth, selectedYear]);
	const setPickerOpen = import_react.useCallback((nextOpen) => {
		if (!isOpenControlled) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [isOpenControlled, onOpenChange]);
	const commitDate = import_react.useCallback((nextDate) => {
		if (!isValueControlled) setInternalValue(nextDate);
		onChange?.(nextDate);
	}, [isValueControlled, onChange]);
	const handleSelectDate = import_react.useCallback((date) => {
		if (!date) {
			commitDate(void 0);
			return;
		}
		const nextDate = mergeDatePart(date, selectedDate);
		setMonth$1(getMonthDate(nextDate));
		commitDate(nextDate);
		if (granularity === "day") setPickerOpen(false);
	}, [
		commitDate,
		granularity,
		selectedDate,
		setPickerOpen
	]);
	const handleTimePartChange = import_react.useCallback((part, rawValue) => {
		const nextDate = selectedDate ? new Date(selectedDate) : /* @__PURE__ */ new Date();
		const nextValue = clampTimeValue(rawValue, part === "hours" ? 23 : 59);
		if (part === "hours") nextDate.setHours(nextValue);
		if (part === "minutes") nextDate.setMinutes(nextValue);
		if (part === "seconds") nextDate.setSeconds(nextValue);
		commitDate(nextDate);
	}, [commitDate, selectedDate]);
	const formattedValue = selectedDate ? safeFormatDate(selectedDate, format$1 ?? defaultFormatByGranularity[granularity]) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open: pickerOpen,
		onOpenChange: setPickerOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				disabled,
				"data-empty": !formattedValue,
				className: cn("h-9 w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground", triggerClassName),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: formattedValue ?? placeholder
				})]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			className: cn("w-auto p-0", popoverClassName),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex flex-col", className),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
					...calendarProps,
					mode: "single",
					selected: selectedDate,
					onSelect: handleSelectDate,
					month,
					onMonthChange: setMonth$1,
					disabled: disabled || calendarProps?.disabled,
					captionLayout: calendarProps?.captionLayout ?? "dropdown",
					hideNavigation: calendarProps?.hideNavigation ?? true,
					startMonth: calendarProps?.startMonth ?? new Date(1900, 0),
					endMonth: calendarProps?.endMonth ?? new Date(2100, 11)
				}), granularity !== "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2 border-border border-t p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeInput, {
							label: mergedLabels.hour,
							value: selectedDate?.getHours() ?? 0,
							max: 23,
							disabled,
							onChange: (nextValue) => handleTimePartChange("hours", nextValue)
						}),
						(granularity === "minute" || granularity === "second") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeInput, {
							label: mergedLabels.minute,
							value: selectedDate?.getMinutes() ?? 0,
							max: 59,
							disabled,
							onChange: (nextValue) => handleTimePartChange("minutes", nextValue)
						}),
						granularity === "second" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeInput, {
							label: mergedLabels.second,
							value: selectedDate?.getSeconds() ?? 0,
							max: 59,
							disabled,
							onChange: (nextValue) => handleTimePartChange("seconds", nextValue)
						})
					]
				})]
			})
		})]
	});
}
function TimeInput({ label, value, max: max$1, disabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		"data-ui": "ui.time-input",
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			"aria-label": label,
			type: "number",
			inputMode: "numeric",
			min: 0,
			max: max$1,
			value: padTimeValue(value),
			disabled,
			onChange: (event) => onChange(event.target.value),
			className: "h-8 px-2 text-center font-mono text-sm"
		})]
	});
}
function normalizeDate(date) {
	return date instanceof Date && !Number.isNaN(date.getTime()) ? date : void 0;
}
function getMonthDate(date) {
	return new Date(date.getFullYear(), date.getMonth());
}
function mergeDatePart(date, current) {
	const nextDate = new Date(date);
	if (current) nextDate.setHours(current.getHours(), current.getMinutes(), current.getSeconds(), current.getMilliseconds());
	return nextDate;
}
function clampTimeValue(value, max$1) {
	const parsed = Number.parseInt(value, 10);
	if (Number.isNaN(parsed)) return 0;
	return Math.min(Math.max(parsed, 0), max$1);
}
function padTimeValue(value) {
	return String(value).padStart(2, "0");
}
function safeFormatDate(date, format$1) {
	try {
		return format(date, format$1);
	} catch {
		return date.toLocaleString();
	}
}
function Pagination({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"data-ui": "ui.pagination part:pagination",
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: cn("mx-auto flex w-full justify-center", className),
		...mergeUiProps(props, "ui.pagination part:pagination")
	});
}
function PaginationContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ui": "ui.pagination-content part:pagination-content",
		"data-slot": "pagination-content",
		className: cn("flex flex-row items-center gap-1", className),
		...mergeUiProps(props, "ui.pagination-content part:pagination-content")
	});
}
function PaginationItem({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-ui": "ui.pagination-item part:pagination-item",
		"data-slot": "pagination-item",
		...mergeUiProps(props, "ui.pagination-item part:pagination-item")
	});
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		"data-ui": "ui.pagination-link part:pagination-link",
		"aria-current": isActive ? "page" : void 0,
		"data-slot": "pagination-link",
		"data-active": isActive,
		className: cn(buttonVariants({
			variant: isActive ? "outline" : "ghost",
			size
		}), "text-foreground hover:text-primary hover:shadow-none hover:bg-primary/10 rounded-md", isActive && "bg-background text-primary", className),
		...mergeUiProps(props, "ui.pagination-link part:pagination-link")
	});
}
function PaginationPrevious({ className, children = "Previous", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
		"aria-label": "Go to previous page",
		size: "default",
		className: cn("gap-1 px-2.5 sm:pl-2.5", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:block",
			children
		})]
	});
}
function PaginationNext({ className, children = "Next", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
		"aria-label": "Go to next page",
		size: "default",
		className: cn("gap-1 px-2.5 sm:pr-2.5", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:block",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, {})]
	});
}
var logger$1 = loggerService.withContext("useTasks");
var taskListReadKeys = (agentId) => ["/agent-tasks", `/agents/${agentId}/tasks`];
var taskReadKeys = (agentId) => taskListReadKeys(agentId).flatMap((key) => [key, `${key}/*`]);
var taskCommandErrorMessage = (error, t, fallbackPrefix) => {
	if (error instanceof IpcError && error.code === aiErrorCodes.AI_AGENT_TASK_TRIGGER_INVALID) return t("agent.tasks.error.triggerInvalid");
	return formatErrorMessageWithPrefix(error, fallbackPrefix);
};
const useAllTasks = () => {
	const { items, total, page, error, isLoading, hasNext, hasPrev, nextPage, prevPage, refresh } = usePaginatedQuery("/agent-tasks", {
		limit: 50,
		swrOptions: { keepPreviousData: false }
	});
	useDataChange("/agent-tasks", () => refresh());
	return {
		tasks: items,
		total,
		page,
		pageCount: Math.ceil(total / 50),
		error,
		isLoading,
		hasNext,
		hasPrev,
		nextPage,
		prevPage,
		refetch: refresh
	};
};
const useTask = (taskId) => {
	const { data, error, isLoading, refetch } = useQuery("/agent-tasks/:taskId", {
		params: { taskId },
		enabled: !!taskId,
		swrOptions: { keepPreviousData: false }
	});
	useDataChange("/agent-tasks/:taskId", (effects) => {
		if (effects.some((effect) => !effect.entityIds || taskId !== null && effect.entityIds.includes(taskId))) refetch();
	});
	return {
		task: data,
		error,
		isLoading
	};
};
const useCreateTask = () => {
	const { t } = useTranslation();
	const invalidate = useInvalidateCache();
	return { createTask: (0, import_react.useCallback)(async (agentId, form) => {
		try {
			const task = await ipcApi.request("ai.agent.task.create", {
				agentId,
				...form
			});
			toast.success({
				key: "create-task",
				title: t("common.create_success")
			});
			await invalidate(taskReadKeys(agentId));
			return task;
		} catch (error) {
			toast.error(taskCommandErrorMessage(error, t, t("agent.tasks.error.createFailed", "Failed to create task")));
			return;
		}
	}, [invalidate, t]) };
};
const useUpdateTask = () => {
	const { t } = useTranslation();
	const invalidate = useInvalidateCache();
	return { updateTask: (0, import_react.useCallback)(async (agentId, taskId, patch) => {
		try {
			const task = await ipcApi.request("ai.agent.task.update", {
				agentId,
				taskId,
				patch
			});
			toast.success({
				key: "update-task",
				title: t("common.update_success")
			});
			await invalidate(taskReadKeys(agentId));
			return task;
		} catch (error) {
			toast.error(taskCommandErrorMessage(error, t, t("agent.tasks.error.updateFailed", "Failed to update task")));
			return;
		}
	}, [invalidate, t]) };
};
const useSetTaskEnabled = () => {
	const { t } = useTranslation();
	const invalidate = useInvalidateCache();
	return { setTaskEnabled: (0, import_react.useCallback)(async (agentId, taskId, enabled) => {
		try {
			const task = enabled ? await ipcApi.request("ai.agent.task.resume", {
				agentId,
				taskId
			}) : await ipcApi.request("ai.agent.task.pause", {
				agentId,
				taskId
			});
			toast.success({
				key: "update-task",
				title: t("common.update_success")
			});
			await invalidate(taskReadKeys(agentId));
			return task;
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("agent.tasks.error.updateFailed", "Failed to update task")));
			return;
		}
	}, [invalidate, t]) };
};
const useRunTask = () => {
	const { t } = useTranslation();
	const invalidate = useInvalidateCache();
	return { runTask: (0, import_react.useCallback)(async (agentId, taskId) => {
		try {
			await ipcApi.request("ai.agent.task.run", {
				agentId,
				taskId
			});
			toast.success({
				key: "run-task",
				title: t("agent.tasks.runTriggered")
			});
			await invalidate(taskReadKeys(agentId));
			return true;
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("agent.tasks.error.runFailed", "Failed to run task")));
			return false;
		}
	}, [invalidate, t]) };
};
const useDeleteTask = () => {
	const { t } = useTranslation();
	const invalidate = useInvalidateCache();
	return { deleteTask: (0, import_react.useCallback)(async (agentId, taskId, options) => {
		try {
			await ipcApi.request("ai.agent.task.delete", {
				agentId,
				taskId
			});
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("agent.tasks.error.deleteFailed", "Failed to delete task")));
			return false;
		}
		toast.success({
			key: "delete-task",
			title: t("common.delete_success")
		});
		let shouldInvalidateTaskDetails = true;
		try {
			await options?.onDeleted?.();
		} catch (error) {
			shouldInvalidateTaskDetails = false;
			logger$1.warn("Post-delete navigation failed", error);
		}
		try {
			await invalidate(shouldInvalidateTaskDetails ? taskReadKeys(agentId) : taskListReadKeys(agentId));
		} catch (error) {
			logger$1.warn("Failed to refresh task data after deletion", error);
		}
		return true;
	}, [invalidate, t]) };
};
const useTaskLogs = (agentId, taskId) => {
	const { data, error, isLoading } = useQuery("/agents/:agentId/tasks/:taskId/logs", {
		params: {
			agentId,
			taskId
		},
		query: { limit: 50 },
		enabled: !!(agentId && taskId),
		swrOptions: { keepPreviousData: false }
	});
	return {
		logs: data?.items ?? [],
		total: data?.total ?? 0,
		error,
		isLoading
	};
};
var logger = loggerService.withContext("TasksSettings");
var ALL_TASKS_FILTER = "all";
var SCHEDULE_HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, "0"));
var SCHEDULE_MINUTES = Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, "0"));
var TASK_PROMPT_GENERATION_SYSTEM_PROMPT = [
	"Write a concise execution prompt for a scheduled Agent task based on the supplied task name.",
	"Describe the concrete work the Agent should perform each time the schedule runs.",
	"Include the expected result or delivery outcome when it can be inferred.",
	"Do not create a persona, role profile, background, greeting, or initialization script.",
	"Keep the output in the same language as the task name.",
	"Return only the task prompt with no explanation, wrapper, or code fence."
].join("\n");
var TASK_PROMPT_POLISH_SYSTEM_PROMPT = [
	"Improve the supplied scheduled task prompt without changing its intent.",
	"Make the recurring action, required inputs, constraints, and expected result concrete and concise.",
	"Do not turn the task into a persona, role profile, background, greeting, or initialization script.",
	"Keep the output in the same language as the input.",
	"Preserve Markdown, code, URLs, and every placeholder token verbatim, including tokens shaped like {{name}} and ${name}; keep duplicate occurrences.",
	"Return only the polished task prompt with no explanation, wrapper, or code fence."
].join("\n");
function toChannelInfo(channel) {
	const config = channel.config;
	return {
		id: channel.id,
		agentId: channel.agentId ?? null,
		name: channel.name || channel.type,
		isActive: channel.isActive,
		hasActiveChatIds: (config?.allowed_chat_ids?.length ?? 0) > 0 || (config?.allowed_channel_ids?.length ?? 0) > 0 || (channel.activeChatIds?.length ?? 0) > 0
	};
}
var DEFAULT_SCHEDULE = {
	kind: "daily",
	value: "09:00",
	weekday: "1",
	timeoutMinutes: ""
};
var parseScheduleDate = (value) => {
	if (!value) return void 0;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? void 0 : date;
};
var parseTime = (value) => {
	const match$1 = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
	if (!match$1) return null;
	const hour = Number(match$1[1]);
	const minute = Number(match$1[2]);
	if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
	return {
		hour,
		minute
	};
};
var formatTime = (hour, minute) => `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
function triggerToFormState(trigger) {
	if (trigger.kind === "interval") return {
		kind: "interval",
		value: String(Math.max(1, Math.round(trigger.ms / 6e4))),
		weekday: "1"
	};
	if (trigger.kind === "once") return {
		kind: "once",
		value: new Date(trigger.at).toISOString(),
		weekday: "1"
	};
	const parts = trigger.expr.trim().split(/\s+/);
	if (parts.length !== 5) return {
		kind: "cron",
		value: trigger.expr,
		weekday: "1"
	};
	const [minutePart, hourPart, dayOfMonth, month, dayOfWeek] = parts;
	if (minutePart === "0" && hourPart === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") return {
		kind: "hourly",
		value: "",
		weekday: "1"
	};
	const minute = Number(minutePart);
	const hour = Number(hourPart);
	if (!(Number.isInteger(minute) && minute >= 0 && minute <= 59 && Number.isInteger(hour) && hour >= 0 && hour <= 23) || dayOfMonth !== "*" || month !== "*") return {
		kind: "cron",
		value: trigger.expr,
		weekday: "1"
	};
	const value = formatTime(hour, minute);
	if (dayOfWeek === "*") return {
		kind: "daily",
		value,
		weekday: "1"
	};
	if (dayOfWeek === "1-5") return {
		kind: "weekdays",
		value,
		weekday: "1"
	};
	if (/^[0-6]$/.test(dayOfWeek)) return {
		kind: "weekly",
		value,
		weekday: dayOfWeek
	};
	return {
		kind: "cron",
		value: trigger.expr,
		weekday: "1"
	};
}
function formStateToTrigger(schedule) {
	if (schedule.kind === "hourly") return {
		kind: "cron",
		expr: "0 * * * *"
	};
	if (schedule.kind === "interval") {
		const minutes = Number(schedule.value.trim());
		if (!Number.isInteger(minutes) || minutes <= 0) return null;
		return {
			kind: "interval",
			ms: minutes * 6e4
		};
	}
	if (schedule.kind === "once") {
		const at = Date.parse(schedule.value.trim());
		return Number.isFinite(at) ? {
			kind: "once",
			at
		} : null;
	}
	if (schedule.kind === "cron") {
		const expr = schedule.value.trim();
		return expr ? {
			kind: "cron",
			expr
		} : null;
	}
	const time = parseTime(schedule.value);
	if (!time) return null;
	const prefix = `${time.minute} ${time.hour} * *`;
	if (schedule.kind === "daily") return {
		kind: "cron",
		expr: `${prefix} *`
	};
	if (schedule.kind === "weekdays") return {
		kind: "cron",
		expr: `${prefix} 1-5`
	};
	if (!/^[0-6]$/.test(schedule.weekday)) return null;
	return {
		kind: "cron",
		expr: `${prefix} ${schedule.weekday}`
	};
}
function scheduleForKind(kind, current) {
	switch (kind) {
		case "hourly": return {
			...current,
			kind,
			value: ""
		};
		case "daily":
		case "weekdays":
		case "weekly": return {
			...current,
			kind,
			value: parseTime(current.value) ? current.value : "09:00"
		};
		case "interval":
		case "once":
		case "cron": return {
			...current,
			kind,
			value: ""
		};
	}
}
function taskToDraftSnapshot(task) {
	return {
		name: task.name,
		prompt: task.prompt,
		schedule: {
			...triggerToFormState(task.trigger),
			timeoutMinutes: task.timeoutMinutes > 0 ? task.timeoutMinutes.toString() : ""
		},
		channelIds: task.channelIds ?? [],
		workspaceId: task.workspace.type === AGENT_WORKSPACE_TYPE.USER ? task.workspace.workspaceId : null,
		reuseSession: task.reuseSession
	};
}
function scheduleInputsEqual(a, b) {
	return a.kind === b.kind && a.value === b.value && a.weekday === b.weekday;
}
function stringArraysEqual(a, b) {
	return a.length === b.length && a.every((value, index) => value === b[index]);
}
function triggersEqual(a, b) {
	if (a.kind === "cron" && b.kind === "cron") return a.expr === b.expr && a.timezone === b.timezone && a.limit === b.limit;
	if (a.kind === "interval" && b.kind === "interval") return a.ms === b.ms && a.anchor === b.anchor;
	if (a.kind === "once" && b.kind === "once") return a.at === b.at;
	return false;
}
function preserveCompatibleTriggerMetadata(previous, next) {
	if (previous.kind === "cron" && next.kind === "cron") return {
		...previous,
		expr: next.expr
	};
	if (previous.kind === "interval" && next.kind === "interval") return {
		...previous,
		ms: next.ms
	};
	return next;
}
function getWeekdayLabel(weekday, t) {
	return {
		"0": t("agent.tasks.schedule.weekdays.sunday"),
		"1": t("agent.tasks.schedule.weekdays.monday"),
		"2": t("agent.tasks.schedule.weekdays.tuesday"),
		"3": t("agent.tasks.schedule.weekdays.wednesday"),
		"4": t("agent.tasks.schedule.weekdays.thursday"),
		"5": t("agent.tasks.schedule.weekdays.friday"),
		"6": t("agent.tasks.schedule.weekdays.saturday")
	}[weekday] ?? weekday;
}
function getTaskStatusLabel(status, t) {
	return {
		active: t("agent.tasks.status.active"),
		paused: t("agent.tasks.status.paused"),
		completed: t("agent.tasks.status.completed")
	}[status] ?? status;
}
function getTriggerSummary(trigger, t) {
	const schedule = triggerToFormState(trigger);
	switch (schedule.kind) {
		case "hourly": return t("agent.tasks.schedule.summary.hourly");
		case "daily": return t("agent.tasks.schedule.summary.daily", { time: schedule.value });
		case "weekdays": return t("agent.tasks.schedule.summary.weekdays", { time: schedule.value });
		case "weekly": return t("agent.tasks.schedule.summary.weekly", {
			weekday: getWeekdayLabel(schedule.weekday, t),
			time: schedule.value
		});
		case "interval": return t("agent.tasks.schedule.summary.interval", { count: Number(schedule.value) });
		case "once": return new Date(schedule.value).toLocaleString();
		case "cron": return schedule.value;
	}
}
var TaskTimeSelect = ({ value, disabled, onChange }) => {
	const { t } = useTranslation();
	const { hour, minute } = parseTime(value) ?? {
		hour: 9,
		minute: 0
	};
	const hourValue = String(hour).padStart(2, "0");
	const minuteValue = String(minute).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
		role: "group",
		"aria-label": t("agent.tasks.schedule.time"),
		className: "items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: hourValue,
				disabled,
				onValueChange: (nextHour) => onChange(`${nextHour}:${minuteValue}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					"aria-label": t("agent.tasks.schedule.hour"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: SCHEDULE_HOURS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: option,
					children: option
				}, option)) }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, {
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: minuteValue,
				disabled,
				onValueChange: (nextMinute) => onChange(`${hourValue}:${nextMinute}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					"aria-label": t("agent.tasks.schedule.minute"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: SCHEDULE_MINUTES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: option,
					children: option
				}, option)) }) })]
			})
		]
	});
};
function updatePositiveIntegerInput(value, onChange) {
	if (/^\d*$/.test(value)) onChange(value);
}
var TaskScheduleControls = ({ value, disabled, invalid, onChange }) => {
	const { t } = useTranslation();
	const id = (0, import_react.useId)();
	const updateKind = (kind) => {
		onChange(scheduleForKind(kind, value));
	};
	const updateValue = (nextValue) => onChange({
		...value,
		value: nextValue
	});
	const frequencyControl = value.kind === "daily" || value.kind === "weekdays" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTimeSelect, {
		value: value.value,
		disabled,
		onChange: updateValue
	}) : value.kind === "weekly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value: value.weekday,
		disabled,
		onValueChange: (weekday) => {
			onChange({
				...value,
				weekday
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			"aria-label": t("agent.tasks.schedule.weekday"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"0"
		].map((weekday) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: weekday,
			children: getWeekdayLabel(weekday, t)
		}, weekday)) }) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTimeSelect, {
		value: value.value,
		disabled,
		onChange: updateValue
	})] }) : value.kind === "interval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		className: "w-40",
		"data-disabled": disabled || void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
			type: "text",
			inputMode: "numeric",
			pattern: "[0-9]*",
			value: value.value,
			placeholder: t("agent.tasks.intervalPlaceholder"),
			disabled,
			"aria-label": t("agent.tasks.schedule.intervalMinutes"),
			"aria-invalid": invalid || void 0,
			onChange: (event) => updatePositiveIntegerInput(event.target.value, updateValue)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
			align: "inline-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: t("agent.tasks.intervalUnit") })
		})]
	}) : value.kind === "once" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimePicker, {
		value: parseScheduleDate(value.value),
		granularity: "minute",
		format: "yyyy-MM-dd HH:mm",
		placeholder: t("agent.tasks.oncePlaceholder"),
		disabled,
		labels: {
			hour: t("agent.tasks.schedule.hour"),
			minute: t("agent.tasks.schedule.minute")
		},
		onChange: (date) => {
			if (date) updateValue(date.toISOString());
		}
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
		"data-invalid": invalid || void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: `${id}-kind`,
				children: t("agent.tasks.frequency.label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
				className: "flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: value.kind === "cron" ? void 0 : value.kind,
					disabled,
					onValueChange: (kind) => updateKind(kind),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: `${id}-kind`,
						"aria-invalid": invalid || void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: value.kind === "cron" ? t("agent.tasks.schedule.custom") : void 0 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "hourly",
							children: t("agent.tasks.schedule.hourly")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "daily",
							children: t("agent.tasks.schedule.daily")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "weekdays",
							children: t("agent.tasks.schedule.weekdaysOnly")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "weekly",
							children: t("agent.tasks.schedule.weekly")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "interval",
							children: t("agent.tasks.schedule.interval")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "once",
							children: t("agent.tasks.schedule.once")
						})
					] }) })]
				}), frequencyControl]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: invalid ? t("agent.tasks.schedule.invalid") : void 0 })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
		htmlFor: `${id}-timeout`,
		children: t("agent.tasks.timeout.label")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		"data-disabled": disabled || void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
			id: `${id}-timeout`,
			type: "text",
			inputMode: "numeric",
			pattern: "[0-9]*",
			value: value.timeoutMinutes,
			placeholder: t("agent.tasks.timeout.placeholder"),
			disabled,
			onChange: (event) => updatePositiveIntegerInput(event.target.value, (timeoutMinutes) => onChange({
				...value,
				timeoutMinutes
			}))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
			align: "inline-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: t("agent.tasks.intervalUnit") })
		})]
	})] })] });
};
var TaskChannelSelector = ({ channels, channelIds, onChange, disabled }) => {
	const { t } = useTranslation();
	if (channels.length === 0) return null;
	const hasNoChatIds = channelIds.some((id) => !channels.find((channel) => channel.id === id)?.hasActiveChatIds);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: t("agent.tasks.channels.label") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
			multiple: true,
			size: "default",
			width: "100%",
			value: channelIds,
			disabled,
			searchable: channels.length > 5,
			onChange: (nextValue) => {
				if (Array.isArray(nextValue)) onChange(nextValue);
			},
			placeholder: t("agent.tasks.channels.placeholder"),
			searchPlaceholder: t("agent.tasks.channels.placeholder"),
			emptyText: t("common.no_results"),
			options: channels.map((channel) => ({
				value: channel.id,
				label: channel.name,
				isActive: channel.isActive
			})),
			renderOption: (option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: `inline-block h-1.5 w-1.5 rounded-full ${option.isActive ? "bg-success" : "bg-muted-foreground"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: option.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: t(option.isActive ? "common.enabled" : "common.disabled")
					})
				]
			})
		}),
		hasNoChatIds && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
			type: "warning",
			showIcon: true,
			description: t("agent.tasks.channels.noActiveChatIds")
		})
	] });
};
var TaskSessionReuseField = ({ value, onChange, disabled }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
		className: "items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "task-form-reuse-session",
				children: t("agent.tasks.reuseSession.label")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, { children: t("agent.tasks.reuseSession.description") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			id: "task-form-reuse-session",
			className: "shrink-0",
			checked: value,
			disabled,
			onCheckedChange: onChange
		})]
	}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
		type: "warning",
		showIcon: true,
		description: t("agent.tasks.reuseSession.warning")
	})] });
};
var TaskLogsInline = ({ taskId, agentId }) => {
	const { t, i18n } = useTranslation();
	const locale = i18n.language;
	const { openConversation } = useConversationNavigation("agents");
	const { logs, isLoading, error: logsError } = useTaskLogs(agentId, taskId);
	const [searchText, setSearchText] = (0, import_react.useState)("");
	const filteredLogs = (0, import_react.useMemo)(() => {
		if (!searchText.trim()) return logs;
		const query = searchText.toLowerCase();
		return logs.filter((log) => log.result?.toLowerCase().includes(query) || log.error?.toLowerCase().includes(query) || log.status.toLowerCase().includes(query) || new Date(log.startedAt).toLocaleString(locale).toLowerCase().includes(query));
	}, [
		locale,
		logs,
		searchText
	]);
	const columns = (0, import_react.useMemo)(() => [
		{
			accessorKey: "startedAt",
			header: t("agent.tasks.logs.runAt"),
			meta: { width: 160 },
			cell: ({ getValue }) => new Date(getValue()).toLocaleString(void 0, {
				month: "numeric",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			})
		},
		{
			accessorKey: "durationMs",
			header: t("agent.tasks.logs.duration"),
			meta: { width: 80 },
			cell: ({ getValue, row }) => {
				const value = getValue();
				if (row.original.status === "running") return "-";
				if (value < 1e3) return `${value}ms`;
				if (value < 6e4) return `${(value / 1e3).toFixed(1)}s`;
				return `${(value / 6e4).toFixed(1)}m`;
			}
		},
		{
			accessorKey: "status",
			header: t("agent.tasks.logs.status"),
			meta: { width: 90 },
			cell: ({ getValue }) => {
				const value = getValue();
				const labels = {
					completed: t("agent.tasks.logs.completed"),
					running: t("agent.tasks.logs.running"),
					failed: t("agent.tasks.logs.failed"),
					cancelled: t("agent.tasks.logs.cancelled")
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: value === "failed" ? "destructive" : value === "running" ? "secondary" : "outline",
					children: labels[value] ?? value
				});
			}
		},
		{
			id: "result",
			header: t("agent.tasks.logs.result"),
			meta: {
				width: "calc(100% - 330px)",
				className: "min-w-0"
			},
			cell: ({ row }) => {
				const record = row.original;
				const isErrorStatus = record.status === "failed" || record.status === "cancelled";
				const text = record.status === "running" ? t("agent.tasks.logs.running") : isErrorStatus ? record.error : record.result ?? "-";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
					className: "items-start gap-1",
					children: [record.sessionId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: t("agent.tasks.logs.viewSession"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": t("agent.tasks.logs.viewSession"),
							onClick: () => openConversation(record.sessionId),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: isErrorStatus ? "line-clamp-4 text-error" : "line-clamp-4",
						children: text
					})]
				});
			}
		}
	], [openConversation, t]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
		className: "py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: t("common.loading") })
	});
	if (logsError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		compact: true,
		preset: "no-result",
		description: t("agent.tasks.logs.loadError")
	});
	if (logs.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		compact: true,
		preset: "no-result",
		description: t("agent.tasks.logs.empty")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
		size: "sm",
		value: searchText,
		placeholder: t("agent.tasks.logs.search"),
		clearLabel: t("common.clear"),
		onClear: () => setSearchText(""),
		onChange: (event) => setSearchText(event.target.value)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "settings.task-logs-inline.task-logs-table-scroll part:task-logs-table-scroll",
		"data-slot": "task-logs-table-scroll",
		className: "max-w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "settings.task-logs-inline.task-logs-table-width part:task-logs-table-width",
			"data-slot": "task-logs-table-width",
			className: "min-w-[720px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				data: filteredLogs,
				columns,
				rowKey: "id",
				emptyText: t("agent.tasks.logs.empty")
			})
		})
	})] });
};
var TaskDetail = ({ task, agents, onBack, onUpdate, onDelete, onRun, onToggleStatus }) => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { channels: rawChannels } = useChannels();
	const { openConversation } = useConversationNavigation("agents");
	const isCompleted = task.status === "completed";
	const agentName = agents.find((agent) => agent.id === task.agentId)?.name ?? task.agentId;
	const taskChannels = (0, import_react.useMemo)(() => rawChannels.map(toChannelInfo).filter((channel) => channel.agentId === task.agentId), [rawChannels, task.agentId]);
	const selectedChannels = (0, import_react.useMemo)(() => (task.channelIds ?? []).map((channelId) => taskChannels.find((channel) => channel.id === channelId) ?? {
		id: channelId,
		name: channelId
	}), [task.channelIds, taskChannels]);
	const hasUndeliverableChannel = selectedChannels.some((channel) => !channel.hasActiveChatIds);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = (0, import_react.useState)(false);
	const { data: workspaces } = useQuery("/agent-workspaces");
	const workspaceId = task.workspace.type === AGENT_WORKSPACE_TYPE.USER ? task.workspace.workspaceId : null;
	const workspaceLabel = workspaceId === null ? t("agent.session.workspace_selector.no_project") : workspaces?.find((workspace) => workspace.id === workspaceId)?.name ?? workspaceId;
	const formatDateTime = (iso) => {
		if (!iso) return "-";
		const date = new Date(iso);
		if (Math.abs(Date.now() - date.getTime()) < 864e5) return date.toLocaleString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
		return date.toLocaleString(void 0, {
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
	};
	const detailItems = [
		{
			label: t("agent.channels.bindAgent"),
			value: agentName
		},
		{
			label: t("agent.tasks.frequency.label"),
			value: getTriggerSummary(task.trigger, t)
		},
		{
			label: t("agent.tasks.timeout.label"),
			value: task.timeoutMinutes > 0 ? `${task.timeoutMinutes} ${t("agent.tasks.intervalUnit")}` : t("agent.tasks.timeout.placeholder")
		},
		{
			label: t("agent.session.display.workdir"),
			value: workspaceLabel
		},
		{
			label: t("agent.tasks.reuseSession.label"),
			value: !task.reuseSession ? t("common.disabled") : task.reuseSessionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "link",
				size: "sm",
				className: "h-auto p-0",
				onClick: () => openConversation(task.reuseSessionId),
				children: [t("agent.tasks.reuseSession.bound"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
			}) : t("agent.tasks.reuseSession.pending")
		},
		{
			label: t("agent.tasks.channels.label"),
			value: selectedChannels.length > 0 ? selectedChannels.map((channel) => channel.name).join(", ") : t("common.none")
		},
		{
			label: t("agent.tasks.lastRun"),
			value: formatDateTime(task.lastRun)
		},
		{
			label: t("agent.tasks.nextRun"),
			value: formatDateTime(task.nextRun)
		}
	];
	const handleEditSave = (0, import_react.useCallback)(async (request) => {
		return (await onUpdate(task.id, request))?.succeeded === true;
	}, [onUpdate, task.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		className: "pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, {
				className: "flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							className: "-ml-2 shrink-0 rounded-full",
							"aria-label": t("common.back"),
							title: t("common.back"),
							onClick: onBack,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 break-words",
							children: task.name
						}),
						!isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							className: "ml-1 shrink-0",
							size: "sm",
							checked: task.status === "active",
							onCheckedChange: (checked) => onToggleStatus(task.id, checked ? "active" : "paused"),
							"aria-label": t("agent.tasks.status.active"),
							title: task.status === "active" ? t("agent.tasks.pause") : t("agent.tasks.resume")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
					className: "flex-wrap items-center gap-2",
					children: [
						!isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							className: "min-w-18",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { size: 14 }), t("common.edit")]
						}),
						!isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "default",
							className: "min-w-18",
							onClick: () => void onRun(task.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), t("agent.tasks.run")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon-sm",
								variant: "ghost",
								"aria-label": t("common.more"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 14 })
							}) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
							align: "end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								variant: "destructive",
								onSelect: () => setDeleteConfirmOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), t("agent.tasks.delete.label")]
							}) })
						})] })
					]
				})]
			}), task.nextRun && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingDescription, { children: [
				t("agent.tasks.nextRun"),
				": ",
				formatDateTime(task.nextRun)
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingGroup, {
				theme,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "prompt",
					variant: "line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"aria-label": task.name,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "prompt",
									children: t("agent.tasks.prompt.label")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "general",
									children: t("settings.general.title")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "history",
									children: t("agent.tasks.logs.label")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "prompt",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								variant: "muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, {
									className: "line-clamp-none whitespace-pre-wrap break-words",
									children: task.prompt
								}) })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "general",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemGroup, { children: detailItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, {
										className: "line-clamp-none break-words",
										children: item.value
									})] })
								})] }, item.label)) }),
								hasUndeliverableChannel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									showIcon: true,
									description: t("agent.tasks.channels.noActiveChatIds")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "history",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskLogsInline, {
								taskId: task.id,
								agentId: task.agentId
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormDialog, {
				open: editOpen,
				task,
				agents,
				onOpenChange: setEditOpen,
				onUpdate: handleEditSave
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: deleteConfirmOpen,
				onOpenChange: setDeleteConfirmOpen,
				title: t("agent.tasks.delete.confirm"),
				confirmText: t("agent.tasks.delete.label"),
				cancelText: t("agent.tasks.cancel"),
				destructive: true,
				onConfirm: () => onDelete(task.id)
			})
		]
	});
};
var TaskFormDialog = (props) => {
	const { open, task, agents, onOpenChange } = props;
	const { t } = useTranslation();
	const { channels: rawChannels, error: channelsError, isLoading: channelsLoading } = useChannels();
	const channelsReady = !channelsLoading && !channelsError;
	const isEditing = task !== void 0;
	const [agentId, setAgentId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [schedule, setSchedule] = (0, import_react.useState)(DEFAULT_SCHEDULE);
	const [channelIds, setChannelIds] = (0, import_react.useState)([]);
	const [workspaceId, setWorkspaceId] = (0, import_react.useState)(null);
	const [reuseSession, setReuseSession] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [promptPreviewKey, setPromptPreviewKey] = (0, import_react.useState)(0);
	const wasOpenRef = (0, import_react.useRef)(false);
	const initialDraftRef = (0, import_react.useRef)(null);
	const { data: workspaces } = useQuery("/agent-workspaces");
	(0, import_react.useEffect)(() => {
		if (open && !wasOpenRef.current) {
			const draft = task ? taskToDraftSnapshot(task) : null;
			initialDraftRef.current = draft;
			setAgentId(task?.agentId ?? (agents.length === 1 ? agents[0].id : null));
			setName(draft?.name ?? "");
			setPrompt(draft?.prompt ?? "");
			setSchedule(draft?.schedule ?? DEFAULT_SCHEDULE);
			setChannelIds(draft?.channelIds ?? []);
			setWorkspaceId(draft?.workspaceId ?? null);
			setReuseSession(draft?.reuseSession ?? false);
			setSaving(false);
			setSubmitted(false);
			setPromptPreviewKey((key) => key + 1);
		}
		wasOpenRef.current = open;
	}, [
		agents,
		open,
		task
	]);
	const availableChannels = (0, import_react.useMemo)(() => agentId ? rawChannels.map(toChannelInfo).filter((channel) => channel.agentId === agentId) : [], [agentId, rawChannels]);
	(0, import_react.useEffect)(() => {
		if (!channelsReady) return;
		setChannelIds((current) => current.filter((channelId) => availableChannels.some((channel) => channel.id === channelId)));
	}, [availableChannels, channelsReady]);
	const isSystemWorkspace = workspaceId === null;
	const selectedAgent = agents.find((agent) => agent.id === agentId);
	const workspaceLabel = isSystemWorkspace ? t("agent.session.workspace_selector.no_project") : workspaces?.find((workspace) => workspace.id === workspaceId)?.name ?? workspaceId;
	const trigger = formStateToTrigger(schedule);
	const handleSave = (0, import_react.useCallback)(async () => {
		setSubmitted(true);
		if (!agentId || !name.trim() || !prompt.trim() || !trigger) return;
		setSaving(true);
		try {
			const timeout = Number(schedule.timeoutMinutes);
			const workspace = workspaceId === null ? { type: AGENT_WORKSPACE_TYPE.SYSTEM } : {
				type: AGENT_WORKSPACE_TYPE.USER,
				workspaceId
			};
			const timeoutMinutes = Number.isInteger(timeout) && timeout > 0 ? timeout : null;
			let saved;
			if (props.task) {
				const initialDraft = initialDraftRef.current ?? taskToDraftSnapshot(props.task);
				const updates = {};
				if (name !== initialDraft.name) updates.name = name.trim();
				if (prompt !== initialDraft.prompt) updates.prompt = prompt.trim();
				if (schedule.timeoutMinutes !== initialDraft.schedule.timeoutMinutes) updates.timeoutMinutes = timeoutMinutes;
				if (workspaceId !== initialDraft.workspaceId) updates.workspace = workspace;
				if (reuseSession !== initialDraft.reuseSession) updates.reuseSession = reuseSession;
				if (!stringArraysEqual(channelIds, initialDraft.channelIds)) updates.channelIds = channelIds;
				if (!scheduleInputsEqual(schedule, initialDraft.schedule)) {
					const nextTrigger = preserveCompatibleTriggerMetadata(props.task.trigger, trigger);
					if (!triggersEqual(nextTrigger, props.task.trigger)) updates.trigger = nextTrigger;
				}
				saved = Object.keys(updates).length === 0 || await props.onUpdate(updates);
			} else saved = await props.onCreate(agentId, {
				name: name.trim(),
				prompt: prompt.trim(),
				trigger,
				workspace,
				timeoutMinutes,
				reuseSession,
				channelIds: channelIds.length > 0 ? channelIds : void 0
			});
			if (saved) onOpenChange(false);
		} finally {
			setSaving(false);
		}
	}, [
		agentId,
		channelIds,
		name,
		onOpenChange,
		prompt,
		props,
		reuseSession,
		schedule,
		trigger,
		workspaceId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !saving && onOpenChange(nextOpen),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			size: "xl",
			closeOnOverlayClick: !saving,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(isEditing ? "settings.scheduledTasks.editTitle" : "settings.scheduledTasks.createTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t(isEditing ? "settings.scheduledTasks.editDescription" : "settings.scheduledTasks.createDescription") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
					className: "-m-1 max-h-[60vh] p-1 pr-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": submitted && !name.trim() || void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									required: true,
									htmlFor: "task-form-name",
									children: t("agent.tasks.name.label")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									autoFocus: true,
									id: "task-form-name",
									value: name,
									disabled: saving,
									required: true,
									placeholder: t("agent.tasks.name.placeholder"),
									"aria-invalid": submitted && !name.trim() || void 0,
									onChange: (event) => setName(event.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: submitted && !name.trim() ? t("settings.scheduledTasks.validation.name") : void 0 })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
							"data-task-input-context": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptEditorField_default, {
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										required: true,
										children: t("agent.tasks.prompt.label")
									}),
									value: prompt,
									onChange: setPrompt,
									placeholder: t("agent.tasks.prompt.placeholder"),
									error: submitted && !prompt.trim() ? t("settings.scheduledTasks.validation.prompt") : void 0,
									resetPreviewKey: promptPreviewKey,
									minHeight: "100px",
									actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptPolishActions, {
										value: prompt,
										fallbackSource: name,
										emptyValueSystemPrompt: TASK_PROMPT_GENERATION_SYSTEM_PROMPT,
										existingValueSystemPrompt: TASK_PROMPT_POLISH_SYSTEM_PROMPT,
										disabled: saving,
										onChange: (value) => {
											setPrompt(value);
											setPromptPreviewKey((key) => key + 1);
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowFlex, {
									className: "flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSelector, {
										value: agentId,
										onChange: (nextAgentId) => {
											setAgentId(nextAgentId);
											setChannelIds([]);
										},
										align: "start",
										mountStrategy: "lazy-keep",
										trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											disabled: saving || isEditing,
											"aria-label": t("agent.channels.bindAgent"),
											"aria-invalid": submitted && !agentId || void 0,
											"aria-busy": saving || void 0,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedAgent?.name ?? t("agent.channels.selectAgent") }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceSelector, {
										value: workspaceId,
										onChange: setWorkspaceId,
										disabled: saving,
										align: "start",
										trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											disabled: saving,
											"aria-label": t("agent.session.display.workdir"),
											children: [
												isSystemWorkspace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { size: 14 }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: workspaceLabel }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: submitted && !agentId ? t("settings.scheduledTasks.validation.agent") : void 0 })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskScheduleControls, {
							value: schedule,
							disabled: saving,
							invalid: submitted && !trigger,
							onChange: setSchedule
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskSessionReuseField, {
							value: reuseSession,
							disabled: saving,
							onChange: setReuseSession
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskChannelSelector, {
							channels: availableChannels,
							channelIds,
							disabled: saving,
							onChange: setChannelIds
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					disabled: saving,
					onClick: () => onOpenChange(false),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: saving,
					loading: saving,
					"aria-busy": saving,
					onClick: handleSave,
					children: t("agent.tasks.save")
				})] })
			]
		})
	});
};
var TasksSettings = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const navigate = useNavigate();
	const taskId = useParams({ strict: false }).taskId;
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();
	const { deleteTask } = useDeleteTask();
	const { runTask } = useRunTask();
	const { setTaskEnabled } = useSetTaskEnabled();
	const { data: agentsData, error: agentsError, isLoading: agentsLoading } = useQuery("/agents", { query: { limit: 500 } });
	const agents = (0, import_react.useMemo)(() => (agentsData?.items ?? []).map((agent) => ({
		id: agent.id,
		name: agent.name
	})), [agentsData]);
	const { tasks, total, page, pageCount, error: tasksError, isLoading: tasksLoading, hasNext, hasPrev, nextPage, prevPage, refetch: refetchTasks } = useAllTasks();
	const { task: taskDetails, error: taskError, isLoading: taskLoading } = useTask(taskId ?? null);
	const loading = agentsLoading || tasksLoading || !!taskId && taskLoading;
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [agentFilter, setAgentFilter] = (0, import_react.useState)(ALL_TASKS_FILTER);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(ALL_TASKS_FILTER);
	const taskUpdateTailsRef = (0, import_react.useRef)(null);
	const filteredTasks = (0, import_react.useMemo)(() => {
		const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
		return tasks.filter((task) => {
			if (agentFilter !== ALL_TASKS_FILTER && task.agentId !== agentFilter) return false;
			if (statusFilter !== ALL_TASKS_FILTER && task.status !== statusFilter) return false;
			if (!normalizedQuery) return true;
			const agentName = agents.find((agent) => agent.id === task.agentId)?.name ?? task.agentId;
			return [task.name, agentName].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
		});
	}, [
		agentFilter,
		agents,
		searchQuery,
		statusFilter,
		tasks
	]);
	const hasActiveFilters = searchQuery.trim().length > 0 || agentFilter !== ALL_TASKS_FILTER || statusFilter !== ALL_TASKS_FILTER;
	const clearFilters = (0, import_react.useCallback)(() => {
		setSearchQuery("");
		setAgentFilter(ALL_TASKS_FILTER);
		setStatusFilter(ALL_TASKS_FILTER);
	}, []);
	(0, import_react.useEffect)(() => {
		if (agentsError || tasksError || taskError) {
			logger.error("Failed to load tasks settings", agentsError ?? tasksError ?? taskError);
			toast.error(t("agent.tasks.error.loadFailed"));
		}
	}, [
		agentsError,
		t,
		taskError,
		tasksError
	]);
	const getTaskUpdateTails = (0, import_react.useCallback)(() => {
		taskUpdateTailsRef.current ??= /* @__PURE__ */ new Map();
		return taskUpdateTailsRef.current;
	}, []);
	const enqueueTaskOperation = (0, import_react.useCallback)((selectedTaskId, operation) => {
		const tails = getTaskUpdateTails();
		const current = (tails.get(selectedTaskId) ?? Promise.resolve(true)).catch(() => false).then(operation).catch(() => false);
		tails.set(selectedTaskId, current);
		current.then(() => {
			if (tails.get(selectedTaskId) === current) tails.delete(selectedTaskId);
		});
		return current;
	}, [getTaskUpdateTails]);
	const handleCreate = (0, import_react.useCallback)(async (agentId, request) => {
		const created = await createTask(agentId, request);
		if (!created) return void 0;
		await navigate({
			to: "/settings/scheduled-tasks/$taskId",
			params: { taskId: created.id }
		});
		return created;
	}, [createTask, navigate]);
	const persistTaskUpdate = (0, import_react.useCallback)(async (task, updates) => {
		const updated = await updateTask(task.agentId, task.id, updates);
		if (!updated) return {
			succeeded: false,
			task
		};
		return {
			succeeded: true,
			task: updated
		};
	}, [updateTask]);
	const getTaskForAction = (0, import_react.useCallback)((selectedTaskId) => {
		if (taskDetails?.id === selectedTaskId) return taskDetails;
		return tasks.find((task) => task.id === selectedTaskId);
	}, [taskDetails, tasks]);
	const handleUpdate = (0, import_react.useCallback)((selectedTaskId, updates) => {
		const task = getTaskForAction(selectedTaskId);
		if (!task) return Promise.resolve(void 0);
		let updateResult;
		return enqueueTaskOperation(selectedTaskId, async (previousSucceeded) => {
			updateResult = await persistTaskUpdate(task, updates);
			return previousSucceeded && updateResult.succeeded;
		}).then(() => updateResult);
	}, [
		enqueueTaskOperation,
		getTaskForAction,
		persistTaskUpdate
	]);
	const handleDelete = (0, import_react.useCallback)(async (selectedTaskId) => {
		const task = getTaskForAction(selectedTaskId);
		if (!task) return;
		await deleteTask(task.agentId, selectedTaskId, { onDeleted: () => navigate({ to: "/settings/scheduled-tasks" }) });
	}, [
		deleteTask,
		getTaskForAction,
		navigate
	]);
	const handleRun = (0, import_react.useCallback)(async (selectedTaskId) => {
		await enqueueTaskOperation(selectedTaskId, async (previousSucceeded) => {
			if (!previousSucceeded) return false;
			const task = getTaskForAction(selectedTaskId);
			if (!task) return false;
			if (!await runTask(task.agentId, selectedTaskId)) return false;
			await refetchTasks();
			return true;
		});
	}, [
		enqueueTaskOperation,
		getTaskForAction,
		refetchTasks,
		runTask
	]);
	const handleToggleStatus = (0, import_react.useCallback)(async (selectedTaskId, newStatus) => {
		const task = getTaskForAction(selectedTaskId);
		if (!task) return;
		await enqueueTaskOperation(selectedTaskId, async (previousSucceeded) => {
			const enabled = newStatus === "active";
			if (enabled && !previousSucceeded) return false;
			const updated = await setTaskEnabled(task.agentId, task.id, enabled);
			return previousSucceeded && updated !== void 0;
		});
	}, [
		enqueueTaskOperation,
		getTaskForAction,
		setTaskEnabled
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
		className: "flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { text: t("common.loading") })
	});
	const selectedTask = taskId ? taskDetails : void 0;
	if (taskId) {
		if (!selectedTask) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsContentColumn, {
			theme,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				preset: "no-result",
				title: t("settings.scheduledTasks.notFoundTitle"),
				description: t("settings.scheduledTasks.notFoundDescription"),
				actionLabel: t("common.back"),
				onAction: () => void navigate({ to: "/settings/scheduled-tasks" })
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskDetail, {
			task: selectedTask,
			agents,
			onBack: () => void navigate({ to: "/settings/scheduled-tasks" }),
			onUpdate: handleUpdate,
			onDelete: handleDelete,
			onRun: handleRun,
			onToggleStatus: handleToggleStatus
		}, selectedTask.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentBody, {
		className: "min-h-0 flex-1 overflow-hidden pt-4",
		innerClassName: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.scheduledTasks.title") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSearchBar_default, {
						onSearch: setSearchQuery,
						value: searchQuery,
						placeholder: t("settings.scheduledTasks.searchPlaceholder"),
						tooltip: t("settings.scheduledTasks.search"),
						clearLabel: t("common.clear"),
						maxWidth: 220,
						collapsedSize: 30,
						style: { borderRadius: 8 }
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [tasks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: agentFilter,
						onValueChange: setAgentFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 min-w-32 bg-transparent",
							"aria-label": t("settings.scheduledTasks.filterAgent"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: ALL_TASKS_FILTER,
							children: t("settings.scheduledTasks.allAgents")
						}), agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: agent.id,
							children: agent.name
						}, agent.id))] }) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 min-w-32 bg-transparent",
							"aria-label": t("settings.scheduledTasks.filterStatus"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: ALL_TASKS_FILTER,
								children: t("settings.scheduledTasks.allStatuses")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "active",
								children: t("agent.tasks.status.active")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "paused",
								children: t("agent.tasks.status.paused")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "completed",
								children: t("agent.tasks.status.completed")
							})
						] }) })]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							className: "shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									size: 12,
									className: "lucide-custom"
								}),
								t("settings.scheduledTasks.newTask"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									size: 12,
									className: "text-primary-foreground"
								})
							]
						}) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
						align: "end",
						className: "min-w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							disabled: agents.length === 0,
							onSelect: () => setCreateOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, {}), t("settings.scheduledTasks.manualCreate")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: () => openRoute("/app/agents"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {}), t("settings.scheduledTasks.agentCreate")]
						})] })
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto pt-4 pb-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)] [&::-webkit-scrollbar]:w-1",
				children: tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					preset: agents.length === 0 ? "no-agent" : "no-result",
					icon: agents.length === 0 ? void 0 : CalendarClock,
					title: agents.length === 0 ? t("settings.scheduledTasks.noAgentsTitle") : t("settings.scheduledTasks.noTasksTitle"),
					description: agents.length === 0 ? t("settings.scheduledTasks.noAgents") : t("settings.scheduledTasks.noTasks"),
					actionLabel: agents.length === 0 ? t("settings.scheduledTasks.agentCreate") : void 0,
					className: "py-20",
					onAction: agents.length === 0 ? () => openRoute("/app/agents") : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [filteredTasks.length === 0 && hasActiveFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					preset: "no-result",
					title: t("settings.scheduledTasks.noMatchesTitle"),
					description: t("settings.scheduledTasks.noMatches"),
					actionLabel: t("settings.scheduledTasks.clearFilters"),
					className: "py-20",
					onAction: clearFilters
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemGroup, {
					className: "gap-3",
					children: filteredTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						asChild: true,
						variant: "outline",
						className: "rounded-xl border-border bg-card transition-[border-color,box-shadow] hover:border-border-strong hover:bg-card hover:shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/settings/scheduled-tasks/$taskId",
							params: { taskId: task.id },
							style: { backgroundColor: "var(--settings-group-background, var(--card))" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
										size: 20,
										"aria-hidden": true,
										className: "text-foreground-tertiary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemContent, {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, {
										className: "truncate",
										children: task.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemDescription, {
										className: "truncate text-xs leading-4",
										children: [
											agents.find((agent) => agent.id === task.agentId)?.name ?? task.agentId,
											" ·",
											" ",
											getTriggerSummary(task.trigger, t)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemActions, {
									className: "shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: getTaskStatusLabel(task.status, t)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 16,
										className: "text-foreground-tertiary"
									})]
								})
							]
						}) })
					}, task.id))
				}), pageCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					"aria-label": t("settings.scheduledTasks.paginationLabel"),
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
							href: "#",
							"aria-disabled": !hasPrev,
							"aria-label": t("common.previous"),
							tabIndex: hasPrev ? void 0 : -1,
							className: hasPrev ? void 0 : "pointer-events-none opacity-40",
							onClick: (event) => {
								event.preventDefault();
								prevPage();
							},
							children: t("common.previous")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, {
							className: "mt-0 px-2 tabular-nums",
							children: t("settings.scheduledTasks.paginationStatus", {
								page,
								pageCount,
								total
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
							href: "#",
							"aria-disabled": !hasNext,
							"aria-label": t("common.next"),
							tabIndex: hasNext ? void 0 : -1,
							className: hasNext ? void 0 : "pointer-events-none opacity-40",
							onClick: (event) => {
								event.preventDefault();
								nextPage();
							},
							children: t("common.next")
						}) })
					] })
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormDialog, {
				open: createOpen,
				agents,
				onOpenChange: setCreateOpen,
				onCreate: async (agentId, request) => Boolean(await handleCreate(agentId, request))
			})
		]
	});
};
var TasksSettings_default = TasksSettings;
export { TasksSettings_default as t };

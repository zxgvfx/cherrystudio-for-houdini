import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Combobox } from "./combobox-D7zDQ7j5.js";
import { t as Skeleton } from "./skeleton-CmSX8uoi.js";
import { n as cn } from "./style-qqUWb85F.js";
import { o as useLanguages } from "./translate-piZrmqIV.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var renderTextContent = (content) => typeof content === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "ui.render-text-content",
	className: "truncate",
	children: content
}) : content;
var getOptionSearchText = (label, value) => {
	if (typeof label === "string") return label;
	if (typeof label === "number") return String(label);
	return value;
};
var toComboboxSize = (size) => {
	if (size === "small") return "sm";
	if (size === "large") return "lg";
	return "default";
};
var LanguageSelect = (props) => {
	const { languages, getLabel } = useLanguages();
	const { t } = useTranslation();
	const { className, defaultValue, disabled, extraOptionsAfter, extraOptionsBefore, languageRenderer, listHeight, onChange, onClick, placeholder, showSearch, size, style, value } = props;
	const defaultLanguageRenderer = (0, import_react.useCallback)((lang) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-ui": "ui.language-select",
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.language-select.img",
				className: "shrink-0",
				role: "img",
				"aria-label": lang.emoji,
				children: lang.emoji
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: getLabel(lang, false) ?? lang.value
			})]
		});
	}, [getLabel]);
	const renderUnknownLanguage = (0, import_react.useCallback)(() => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-ui": "ui.language-select",
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.language-select.img",
				className: "shrink-0",
				role: "img",
				"aria-label": t("common.unknown"),
				children: "🏳️"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: t("common.unknown")
			})]
		});
	}, [t]);
	const displayedOptions = (0, import_react.useMemo)(() => {
		if (languages === void 0) return;
		const before = extraOptionsBefore ?? [];
		const after = extraOptionsAfter ?? [];
		const languageOptions = languages.map((lang) => {
			const content = languageRenderer ? languageRenderer(lang) : defaultLanguageRenderer(lang);
			const label = getLabel(lang, false) ?? lang.value;
			const searchText = `${lang.langCode} ${lang.emoji} ${label}`;
			return {
				value: lang.langCode,
				label: searchText,
				searchText,
				content
			};
		});
		const toExtraOption = (option) => {
			const searchText = getOptionSearchText(option.label, option.value);
			return {
				value: option.value,
				label: searchText,
				searchText,
				content: renderTextContent(option.label)
			};
		};
		return [
			...before.map(toExtraOption),
			...languageOptions,
			...after.map(toExtraOption)
		];
	}, [
		defaultLanguageRenderer,
		extraOptionsAfter,
		extraOptionsBefore,
		getLabel,
		languageRenderer,
		languages
	]);
	const renderOption = (0, import_react.useCallback)((option) => {
		return option.content;
	}, []);
	const renderValue = (0, import_react.useCallback)((selectedValue, options) => {
		const currentValue = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
		const selectedOption = options.find((option) => option.value === currentValue);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "ui.language-select",
			className: "flex min-w-0 flex-1 items-center gap-2",
			children: selectedOption ? selectedOption.content : renderUnknownLanguage()
		});
	}, [renderUnknownLanguage]);
	const filterOption = (0, import_react.useCallback)((option, search) => {
		const normalizedSearch = search.trim().toLowerCase();
		return [option.searchText, option.value].filter(Boolean).join(" ").toLowerCase().includes(normalizedSearch);
	}, []);
	const handleChange = (0, import_react.useCallback)((nextValue) => {
		onChange?.(Array.isArray(nextValue) ? nextValue[0] : nextValue);
	}, [onChange]);
	if (displayedOptions === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "min-w-37.5" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.language-select",
		className: cn("inline-flex min-w-0", className),
		style,
		onClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
			className: "w-full",
			defaultValue,
			disabled,
			emptyText: t("common.no_results"),
			filterOption,
			onChange: handleChange,
			options: displayedOptions,
			placeholder: placeholder ?? t("common.select"),
			popoverClassName: cn("w-[var(--radix-popover-trigger-width)]", listHeight && "[&_[data-slot=command-list]]:max-h-[160px]"),
			renderOption,
			renderValue,
			searchPlaceholder: t("common.search"),
			searchable: showSearch !== false,
			searchPlacement: "trigger",
			size: toComboboxSize(size),
			value
		})
	});
};
var LanguageSelect_default = LanguageSelect;
export { LanguageSelect_default as t };

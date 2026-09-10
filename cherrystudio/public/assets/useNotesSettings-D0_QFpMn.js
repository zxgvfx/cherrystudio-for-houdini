import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as useMultiplePreferences } from "./usePreference-DRNUEk4I.js";
import { t as toast } from "./toast-D2efAzAF.js";
var logger = loggerService.withContext("useNotesSettings");
var NOTES_SETTINGS_PREFERENCE_KEYS = {
	isFullWidth: "feature.notes.full_width",
	fontFamily: "feature.notes.font_family",
	fontSize: "feature.notes.font_size",
	showTableOfContents: "feature.notes.show_table_of_contents",
	lineBreaks: "feature.notes.line_breaks",
	defaultViewMode: "feature.notes.default_view_mode",
	defaultEditMode: "feature.notes.default_edit_mode",
	showTabStatus: "feature.notes.show_tab_status",
	notesPath: "feature.notes.path",
	sortType: "feature.notes.sort_type"
};
const useNotesSettings = () => {
	const { t } = useTranslation();
	const [values, setValues] = useMultiplePreferences(NOTES_SETTINGS_PREFERENCE_KEYS);
	const settings = {
		isFullWidth: values.isFullWidth,
		fontFamily: values.fontFamily,
		fontSize: values.fontSize,
		showTableOfContents: values.showTableOfContents,
		lineBreaks: values.lineBreaks,
		defaultViewMode: values.defaultViewMode,
		defaultEditMode: values.defaultEditMode,
		showTabStatus: values.showTabStatus
	};
	const updateSettings = (newSettings) => {
		setValues(newSettings).catch((error) => {
			logger.error("Failed to update notes settings", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	const updateNotesPath = (path) => {
		setValues({ notesPath: path }).catch((error) => {
			logger.error("Failed to update notes path", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	const updateSortType = (value) => {
		setValues({ sortType: value }).catch((error) => {
			logger.error("Failed to update notes sort type", error);
			toast.error(t("notes.settings.save_failed"));
		});
	};
	return {
		settings,
		updateSettings,
		notesPath: values.notesPath,
		updateNotesPath,
		sortType: values.sortType,
		updateSortType
	};
};
export { useNotesSettings as t };

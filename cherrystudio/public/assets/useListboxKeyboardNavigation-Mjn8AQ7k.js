import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const useListboxKeyboardNavigation = ({ open, options, value, onSelect }) => {
	const listboxId = (0, import_react.useId)();
	const listRef = (0, import_react.useRef)(null);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(-1);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setActiveIndex(-1);
			return;
		}
		const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled);
		setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled));
	}, [
		open,
		options,
		value
	]);
	(0, import_react.useEffect)(() => {
		if (activeIndex < 0) return;
		(listRef.current?.querySelector(`[data-listbox-option-index="${activeIndex}"]`))?.scrollIntoView?.({ block: "nearest" });
	}, [activeIndex]);
	const step = (from, direction) => {
		for (let count = 0, index = from; count < options.length; count += 1) {
			index = (index + direction + options.length) % options.length;
			if (!options[index]?.disabled) return index;
		}
		return -1;
	};
	const handleKeyDown = (event) => {
		if (event.nativeEvent.isComposing || event.keyCode === 229) return;
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setActiveIndex((index) => step(index < 0 ? -1 : index, 1));
				return;
			case "ArrowUp":
				event.preventDefault();
				setActiveIndex((index) => step(index < 0 ? options.length : index, -1));
				return;
			case "Home":
				if (options.length === 0) return;
				event.preventDefault();
				setActiveIndex(step(-1, 1));
				return;
			case "End":
				if (options.length === 0) return;
				event.preventDefault();
				setActiveIndex(step(0, -1));
				return;
			case "Enter": {
				if (event.target instanceof HTMLElement && event.target.closest("button")) return;
				const option = options[activeIndex];
				if (!option || option.disabled) return;
				event.preventDefault();
				onSelect(option);
				return;
			}
		}
	};
	const getOptionId = (index) => `${listboxId}-option-${index}`;
	return {
		activeIndex,
		activeOptionId: options[activeIndex] ? getOptionId(activeIndex) : void 0,
		getOptionId,
		handleKeyDown,
		listboxId,
		listRef,
		setActiveIndex
	};
};
export { useListboxKeyboardNavigation as t };

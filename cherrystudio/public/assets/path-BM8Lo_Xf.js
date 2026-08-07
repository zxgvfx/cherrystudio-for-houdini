const joinPath = (base, rel) => {
	const trimmed = rel.replace(/^[/\\]+/, "");
	if (!base) return trimmed;
	return /[/\\]$/.test(base) ? `${base}${trimmed}` : `${base}/${trimmed}`;
};
export { joinPath as t };

function formatName(name: string) {
	return name.length > 40 && !name.includes(" ") ? name.slice(0, 40) : name;
}

export { formatName };

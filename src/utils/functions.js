const replaces = (text, textsToReplaces) => {
	let tempText = text;
	textsToReplaces.forEach((replace) => {
		const { oldString, newString } = replace;
		tempText = tempText.replace(oldString, newString);
	});

	return tempText;
};

const isEmptyArray = (array) => {
	return !array && !Array.isArray(array) || array.length === 0;
};

const normalizeRuntime = (runtime) => {
	const hours = (runtime / 60);
	const rhours = Math.floor(hours);

	const minutes = (hours - rhours) * 60;
	const rminutes =  Math.round(minutes);

	return `${rhours} h ${rminutes} min`;
};

const normalizeYearRelease = (release) => {
	return (release || '').substring(0, 4);
}

const truncate = (string, n) => {
	return string?.length > n ? string.substr(0, n - 1) + '...' : string;
}

export {
	normalizeYearRelease,
	normalizeRuntime,
	isEmptyArray,
	truncate,
	replaces
}
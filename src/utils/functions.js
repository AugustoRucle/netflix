const replaces = (text, textsToReplaces) => {
	let tempText = text;
	textsToReplaces.forEach((replace) => {
		const { oldString, newString } = replace;
		tempText = tempText.replace(oldString, newString);
	});

	return tempText;
}

export {
	replaces
}
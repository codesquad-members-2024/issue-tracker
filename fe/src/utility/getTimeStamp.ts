const getTimeStamp = (timestamp: string) => {
	const date = new Date(timestamp);
	let time: number = Math.abs(date.getTime() - new Date().getTime()) / 1000;

	const resulte = ["초", "분", "시간"].reduce((prev, curr) => {
		if (time > 60) {
			time /= 60;
			return prev;
		}
		if (prev) return prev;
		if (time > 24) return "";
		return `${~~time}${curr} 전`;
	}, "");

	if (resulte) return resulte;
	return new Intl.DateTimeFormat("ja-JP").format(date);
};

export default getTimeStamp;

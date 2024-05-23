const getNowTime = () => {
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
	})
		.format(new Date())
		.replaceAll("/", "-");
};

export default getNowTime;

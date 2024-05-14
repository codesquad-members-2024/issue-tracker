import { ReactComponent as AlertCircle } from "./AlertCircle.svg";

//
const issue = {
	id: 1,
	title: "이슈 제목",
	content: "Grenadine",
	timestamp: "2024/05/14 02:32:09",
	writer: "Lurleen",
	milestone_name: "Hombre Space",
	label_name: ["Hombre Space", "Tiffanie"],
};
//

const getTimeStamp = (timestamp: string) => {
	const date = new Date(timestamp);
	let time: number = Math.abs(date.getTime() - new Date().getTime()) / 1000;

	const resulte = ["초", "분", "시간"].reduce((prev, curr, i) => {
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

function Issue() {
	return (
		<li className="h-[96px]">
			<div className="flex">
				<AlertCircle className="text-accent.blue" />
				<span>{issue.title}</span>
				<div>라벨</div>
			</div>
			<div className="text-grayscale.600 dark:text-grayscale.500">
				<span className="mr-5">#{issue.id}</span>
				<span className="mr-5">
					이 이슈가 {getTimeStamp(issue.timestamp)}, {issue.writer}님에 의해 작성되었습니다.
				</span>
				<span></span>
			</div>
		</li>
	);
}

export default Issue;

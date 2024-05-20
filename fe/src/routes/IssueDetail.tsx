import Header from "../components/Header/Header";
import IssueDetailContent from "../components/IssueDetail/IssueDetailContent";
import IssueDetailTitle from "../components/IssueDetail/IssueDetailTitle";

interface PropsType {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

const issue: Issue = {
	id: 222,
	title: "FE 이슈트래커 디자인",
	open: true,
	content: `이번 그룹 프로젝트에서 디자인 특징은 아래와 같습니다.

	타이포그래피 시스템에 display, selected, available같은 용법을 함께 표기함
	컬러 시스템에 라이트/다크 모드가 있음
	Components 페이지에 기획서에 없는 선택 미션 두 가지가 있음
	Text Input의 지우기 기능
	Comment Elements의 히스토리 기능`,
	timestamp: "2024/05/19 20:00:00",
	writer: "mango2",
	milestone_name: "X5",
	comments: [
		// TODO 코멘트 갯수 필요!!!
		{ id: 1, writer: "mime123", timestamp: "2024/05/19 21:00:00", content: "코멘트 내용" },
	],
	labels: [
		{
			id: 21,
			name: "옹?",
			background_color: "#dfdeff",
			description: "라벨내용",
			text_bright: false,
		},
		{
			id: 22,
			name: "documentaion",
			background_color: "#feff79",
			description: "라벨노란색",
			text_bright: false,
		},
	],
};

//TODO 차후 커스텀 훅으로 변경(issue.tsx에도 있당)
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

function IssueDetail({ darkMode, setDarkMode }: PropsType) {
	const timeSince = getTimeStamp(issue.timestamp);
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-screen w-[85%]">
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<IssueDetailTitle issue={issue} timeSince={timeSince} />
				<IssueDetailContent issue={issue} timeSince={timeSince} />
			</div>
		</div>
	);
}

export default IssueDetail;

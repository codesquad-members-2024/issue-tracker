import SideBar from "../common/SideBar";
import TextArea from "../common/TextArea";
import ContentTable from "./ContentTable/ContentTable";

interface PropsType {
	issue: Issue;
	timeSince: string;
}

const border = "component-border dark:component-border--dark";

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

function IssueDetailContent({ issue, timeSince }: PropsType) {
	return (
		<section className={`${border} border-t-[1px] flex`}>
			<div className="mt-6 w-full">
				{/* TODO 이미지 url도 추가 예정 */}
				<ContentTable
					writer={issue.writer}
					timeSince={timeSince}
					content={issue.content}
					comment={true}
				/>
				<div className="mt-6">
					{issue.comments.map((comment) => (
						<ContentTable
							key={comment.id}
							writer={comment.writer}
							timeSince={getTimeStamp(comment.timestamp)}
							content={comment.content}
							comment={false}
						/>
					))}
				</div>
				<div className="mt-6">
					<TextArea h="h-[184px]" />
				</div>
			</div>
			<div className="mt-6 ml-5">
				<SideBar />
			</div>
		</section>
	);
}

export default IssueDetailContent;

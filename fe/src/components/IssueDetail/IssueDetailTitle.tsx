import Button from "../common/Button";
import InformationTag from "../common/InformationTag";

interface PropsType {
	issue: Issue;
	timeSince: string;
}

function IssueDetailTitle({ issue, timeSince }: PropsType) {
	return (
		<section className="mt-10 mb-5">
			<div className="flex justify-between mb-5">
				<h1 className="text-[32px] font-bold text-grayscale.900 dark:text-grayscale.50">
					{issue.title}{" "}
					<span className="hidden md:inline text-grayscale.600 dark:text-grayscale.500">
						#{issue.id}
					</span>
				</h1>
				<div className="flex items-center">
					<div className="mr-3">
						<Button size="S" type="OUTLINE" icon="PEN" text="제목 편집" state="DEFAULT" />
					</div>
					<Button
						size="S"
						type="OUTLINE"
						icon="PEN"
						text={`${issue.open ? "이슈 닫기" : "이슈 열기"}`}
						state="DEFAULT"
					/>
				</div>
			</div>
			<div className="flex items-center">
				<InformationTag
					text={`${issue.open ? "열린 이슈" : "닫힌 이슈"}`}
					icon={`${issue.open ? "OPEN" : "CLOSED"}`}
					fillColor={`${issue.open ? "#007AFF" : "#8250DF"}`}
					textBright={true}
				/>
				<span className="ml-5 text-grayscale.600 dark:text-grayscale.500">
					이 이슈가 {timeSince}에 {issue.writer}님에 의해 열렸습니다・코멘트 {issue.comments.length}
					개
				</span>
			</div>
		</section>
	);
}

export default IssueDetailTitle;

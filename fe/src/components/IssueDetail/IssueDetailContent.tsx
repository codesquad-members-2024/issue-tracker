import SideBar from "../NewIssue/SideBar";
import TextArea from "../common/TextArea";
import ContentTable from "./ContentTable/ContentTable";

interface PropsType {
	issueData: IssueDetailDataType;
}

const border = "component-border dark:component-border--dark";

function IssueDetailContent({ issueData }: PropsType) {
	const { assignees, comments, issue, labels, milestone } = issueData;
	return (
		<section className={`${border} border-t-[1px] flex`}>
			<div className="mt-6 w-full">
				<ContentTable isWriter={true} issue={issue} />
				<div className="mt-6">
					{comments.map((comment, i) => (
						<ContentTable key={i} isWriter={false} comment={comment} />
					))}
				</div>
				<div className="mt-6">
					<TextArea h="h-[184px]" />
				</div>
			</div>
			<div className="mt-6 ml-5">{/* <SideBar /> */}</div>
		</section>
	);
}

export default IssueDetailContent;

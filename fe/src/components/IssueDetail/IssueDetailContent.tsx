import { useRef, useState } from "react";
import SideBar from "./SideBar";
import TextArea from "../common/TextArea";
import ContentTable from "./ContentTable/ContentTable";
import Button from "../common/Button";
import usePost from "../../hooks/usePost";
import getLocalStorageItem from "../../utility/getLocalStorageItem";
import getNowTime from "../../utility/getNowTime";

interface PropsType {
	issueData: IssueDetailDataType;
}

const border = "component-border dark:component-border--dark";

function IssueDetailContent({ issueData }: PropsType) {
	const { assignees, comments, issue, labels, milestone } = issueData;
	const [disabled, setDisabled] = useState("DISABLED");
	const $content = useRef<HTMLTextAreaElement>(null);
	const uploadedFile = useRef<string | null>(null);
	const { member_id } = getLocalStorageItem("user");
	const mutate = usePost(`/issue/${issue.id}/comment`, `issue/${issue.id}`);

	const handleCommentBtnState = () => {
		if ($content.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};
	const handleClickCommentBtn = () => {
		setDisabled("DISABLED");
		const data = {
			writer: member_id,
			content: $content.current?.value || "",
			createdAt: getNowTime(),
			uploadedFile: uploadedFile.current,
		};
		mutate(data);
	};
	return (
		<section className={`${border} border-t-[1px] flex`}>
			<div className="mt-6 mb-24 w-full">
				<ContentTable key={issue.id} issue={issue} memberId={member_id} issueId={issue.id} />
				<div className="mt-6">
					{comments.map((comment) => (
						<div key={comment.commentId} className="mt-3">
							<ContentTable comment={comment} memberId={member_id} issueId={issue.id} />
						</div>
					))}
				</div>
				<div className="mt-6">
					<TextArea
						h="h-[184px]"
						$ref={$content}
						handler={handleCommentBtnState}
						uploadedFile={uploadedFile}
					/>
					<div className="mt-6 flex flex-row-reverse w-full">
						<Button
							size="S"
							type="CONTAINED"
							icon="PLUS"
							text="코멘트 작성"
							state={disabled}
							onClick={handleClickCommentBtn}
						/>
					</div>
				</div>
			</div>
			<div className="mt-6 ml-5">
				<SideBar assignees={assignees} issueId={issue.id} labels={labels} milestone={milestone} />
			</div>
		</section>
	);
}

export default IssueDetailContent;

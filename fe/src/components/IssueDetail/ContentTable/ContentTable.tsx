import { useState, useRef, useEffect } from "react";
import getTimeStamp from "../../../utility/getTimeStamp";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";
import ContentEditor from "./ContentEditor";
import usePatch from "../../../hooks/usePatch";

interface PropsType {
	issue?: Issue;
	comment?: IssueComment;
	memberId: string;
	issueId: number;
}

const border = "component-border dark:component-border--dark";
const STATE_DELAY = 300;

function ContentTable({ issue, comment, memberId, issueId }: PropsType) {
	const [editor, setEditor] = useState(false);
	const [isDisabled, setIsDisabled] = useState("DEFAULT");
	const preRef = useRef<HTMLPreElement>(null);
	const data: Issue | IssueComment = (issue ? issue : comment)!;
	const preHeight = useRef<number>(0);
	const [contentValue, setContentValue] = useState(data.content);
	const mutateIssueContent = usePatch(`/issue/${issueId}/content`, `issue/${issueId}`);
	const mutateCommentContent = usePatch(
		`/issue/${issueId}/comment/${comment && comment.commentId}`,
		`issue/${issueId}`
	);

	useEffect(() => {
		preHeight.current = preRef.current?.getBoundingClientRect().height || 100;
	}, []);

	const handleEdit = () => {
		setIsDisabled("DISABLED");
		issue
			? mutateIssueContent({ content: contentValue })
			: mutateCommentContent({
					content: contentValue,
					uploadedFile: null, // TODO 파일
			  });
		setTimeout(() => {
			setEditor(!editor);
			setIsDisabled("DEFAULT");
		}, STATE_DELAY);
	};

	return (
		<div className={`${border} border-[1px] rounded-2xl w-full`}>
			<div className={`h-[64px] ${border} border-b-[1px] flex items-center justify-between w-full`}>
				<div className="flex ml-5 font-medium">
					<img className="w-[32px] h-[32px] rounded-full" alt="userProfile" src={data.imageUrl} />
					<span className="mx-3 flex items-center text-grayscale.700 dark:text-grayscale.400">
						{data.writer}
					</span>
					<span className="flex items-center text-grayscale.600 dark:text-grayscale.500">
						{getTimeStamp(data.createdAt)}
					</span>
				</div>
				<div className="mr-5 flex items-center justify-between">
					{data.writer === memberId && (
						<div className="mr-3">
							<InformationTag text="작성자" icon={null} fillColor="#FEFEFE" textBright={false} />
						</div>
					)}
					<div className="w-[100px] flex">
						<Button
							size="S"
							type="GHOST"
							icon="PEN"
							text={editor ? "완료" : "편집"}
							state={isDisabled}
							onClick={handleEdit}
						/>
						<Button size="S" type="GHOST" icon="SMLILE" text="반응" state="DEFAULT" />
					</div>
				</div>
			</div>
			<pre
				ref={preRef}
				className={`font-[inherit] bg-grayscale.50 dark:bg-grayscale.800 text-grayscale.700 dark:text-grayscale.400 rounded-b-2xl ${
					editor ? "" : "p-5"
				}`}
			>
				{editor ? (
					<ContentEditor
						preHeight={preHeight.current}
						content={contentValue}
						setContentValue={setContentValue}
					/>
				) : (
					data.content
				)}
			</pre>
		</div>
	);
}

export default ContentTable;

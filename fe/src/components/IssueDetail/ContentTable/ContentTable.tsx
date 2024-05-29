import { useState, useRef, useEffect } from "react";
import getTimeStamp from "../../../utility/getTimeStamp";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";
import ContentEditor from "./ContentEditor";

const border = "component-border dark:component-border--dark";

interface PropsType {
	issue?: Issue;
	comment?: IssueComment;
	memberId: string;
}

function ContentTable({ issue, comment, memberId }: PropsType) {
	const [editor, setEditor] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);
	const data: Issue | IssueComment = (issue ? issue : comment)!;
	const preHeight = useRef<number>(0);
	const [contentValue, setContentValue] = useState(data.content);

	useEffect(() => {
		preHeight.current = preRef.current?.getBoundingClientRect().height || 100;
	}, []);

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
							text="편집"
							state={"DEFAULT"}
							onClick={() => setEditor(!editor)}
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

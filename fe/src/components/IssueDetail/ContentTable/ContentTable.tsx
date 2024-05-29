import getTimeStamp from "../../../utility/getTimeStamp";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";

const border = "component-border dark:component-border--dark";

interface PropsType {
	isWriter: boolean;
	issue?: Issue;
	comment?: IssueComment;
}

function ContentTable({ isWriter, issue, comment }: PropsType) {
	const data: Issue | IssueComment = (issue ? issue : comment)!;
	return (
		<div className={`${border} border-[1px] rounded-2xl`}>
			<div className={`h-[64px] ${border} border-b-[1px] flex items-center justify-between`}>
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
					{isWriter && (
						<div className="mr-3">
							<InformationTag text="작성자" icon={null} fillColor="#FEFEFE" textBright={false} />
						</div>
					)}
					<div className="w-[100px] flex">
						<Button size="S" type="GHOST" icon="PEN" text="편집" state="DEFAULT" />
						<Button size="S" type="GHOST" icon="SMLILE" text="반응" state="DEFAULT" />
					</div>
				</div>
			</div>
			<pre className="font-[inherit] bg-grayscale.50 dark:bg-grayscale.800 text-grayscale.700 dark:text-grayscale.400 rounded-b-2xl p-5">
				{data.content}
			</pre>
		</div>
	);
}

export default ContentTable;

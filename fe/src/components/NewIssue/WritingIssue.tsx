import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import SideBar from "./SideBar";
import TextArea from "../common/TextArea";
import IssueInput from "../common/IssueInput";
import { useState, useRef } from "react";
import getNowTime from "../../utility/getNowTime";
import getLocalStorageItem from "../../utility/getLocalStorageItem";
import usePost from "../../hooks/usePost";

interface PostDataType {
	title: string;
	writer: string;
	content: string;
	createdAt: string;
	file: null;
	milestoneId: number | null;
	labelIds: number[];
	assigneeIds: string[];
}
const border = "component-border dark:component-border--dark";

function WritingIssue() {
	const $title = useRef<HTMLInputElement>(null);
	const $content = useRef<HTMLTextAreaElement>(null);
	const labelIds = useRef<number[]>([]);
	const assigneeIds = useRef<string[]>([]);
	const milestoneId = useRef<number | null>(null);
	const [disabled, setDisabled] = useState("DISABLED");
	const navigate = useNavigate();
	const user = getLocalStorageItem("user");
	const mutate = usePost("/issue", "issue", (data) => {
		data && navigate(`/issue/${data.id}`);
	});

	const handleTitle = () => {
		const { value: titleValue } = $title.current || {};
		setDisabled(titleValue ? "DEFAULT" : "DISABLED");
	};

	const handleAddData = () => {
		const data: PostDataType = {
			title: $title.current?.value || "",
			writer: user.member_id,
			content: $content.current?.value || "",
			createdAt: getNowTime(),
			file: null,
			milestoneId: milestoneId.current,
			labelIds: labelIds.current,
			assigneeIds: assigneeIds.current,
		};
		mutate(data);
	};

	return (
		<div className="h-[90%]">
			<h1 className="mt-10 mb-5 text-[32px] font-bold text-grayscale.900 dark:text-grayscale.50">
				새로운 이슈 작성
			</h1>
			<div className={`border-y-[1px] w-full ${border}`}>
				<div className="flex flex-wrap md:flex-nowrap my-5">
					<div className="w-[4%]">
						<img
							className="w-[32px] h-[32px] rounded-full"
							alt="userProfile"
							src={user.profile_image_url}
						/>
					</div>
					<div className="flex flex-col justify-center w-full h-full">
						<IssueInput
							h="h-[56px]"
							w="w-full"
							label="제목"
							$title={$title}
							handler={handleTitle}
						/>
						<TextArea h="h-[480px]" $ref={$content} />
					</div>
					<div className="ml-0 mt-5 md:ml-5 md:mt-0">
						<SideBar labelIds={labelIds} assigneeIds={assigneeIds} milestoneId={milestoneId} />
					</div>
				</div>
			</div>
			<div className="my-5 flex flex-row-reverse">
				<Button
					onClick={handleAddData}
					size="L"
					type="CONTAINED"
					icon={null}
					text="완료"
					state={disabled}
				/>
				<Link to="/">
					<Button size="M" type="GHOST" icon="X" text="작성 취소" state="DEFAULT" />
				</Link>
			</div>
		</div>
	);
}

export default WritingIssue;

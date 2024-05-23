import { Link } from "react-router-dom";
import Button from "../common/Button";
import SideBar from "../common/SideBar";
import TextArea from "../common/TextArea";
import IssueInput from "../common/IssueInput";
import { useState, useRef } from "react";
import getNowTime from "../../utility/getNowTime";

const border = "component-border dark:component-border--dark";

function WritingIssue() {
	const $title = useRef<HTMLInputElement>(null);
	const $content = useRef<HTMLTextAreaElement>(null);
	const [disabled, setDisabled] = useState("DISABLED");

	const handleTitle = () => {
		if ($title.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	const handleAddData = () => {
		const data = {
			title: $title.current?.value,
			content: $content.current?.value,
			createdAt: getNowTime(),
			file: null,
			milestoneId: 1,
			labelIds: [],
			assigneeIds: [],
		};
		console.log(data);
	};

	return (
		<div className="h-[90%]">
			<h1 className="mt-10 mb-5 text-[32px] font-bold text-grayscale.900 dark:text-grayscale.50">
				새로운 이슈 작성
			</h1>
			<div className={`flex border-y-[1px] w-full ${border} h-[580px]`}>
				{/*미디어 쿼리 lg:w-full w-[1024px] */}
				<div className="w-[6%] mt-5">
					{/*TODO : db의 유저프로필로 변경예정 */}
					<img
						className="w-[32px] h-[32px] rounded-full"
						alt="userProfile"
						src="https://s3-alpha-sig.figma.com/img/bfa1/72b0/77fbdbfc84f8ad555402b23fb6c7a0ed?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eI0HusP8AQJhfrYkbdft4etLT-322gDp7B7Px-jCgKq9YxT-2fFKD4o6AhzmnVaFjLWGiHP0xS~kATP~GzdJOyVdsfc4UEryn1QuF2T9PmoEdt0ZnUR7bqsSHuOReoVWy67p4Drl~meTCSGbWn8amC1-vFCT23Coy9HLU9fkNA0r3uh47-NMSV-Wx7IwUF202FHxOo027XQFyYGP9Xu56j19~mvu0d9TAlW~oHGscTheXQL5afzDdwBFrEGbMgU2Lli2QKdpkrDnjUKb0mRtqWOAVPU45~RZnFemwVP2UKq~e9Q68Q5u4zzvqrlcXbcTyHjkgYGiD6vSTPX-AlMiHA__"
					/>
				</div>
				<div className="flex flex-col justify-center w-full h-full">
					<IssueInput h="h-[56px]" w="w-full" label="제목" $title={$title} handler={handleTitle} />
					<TextArea h="h-[480px]" $ref={$content} />
				</div>
				<div className="my-5 ml-5">
					<SideBar />
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

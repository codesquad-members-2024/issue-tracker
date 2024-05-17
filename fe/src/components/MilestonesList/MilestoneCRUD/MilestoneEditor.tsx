import { useState } from "react";
import Button from "../../common/Button";
import MilestoneInfo from "./MilestoneInfo";

interface PropsType {
	milestone: Milestone;
	handleShowEditor: React.MouseEventHandler<HTMLButtonElement>;
}

function MilestoneEditor({ milestone, handleShowEditor }: PropsType) {
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState("DISABLED");

	const handleName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setName(target.value);
		if (target.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	return (
		<section className="mt-5 w-full h-[360px] min-w-[425px]">
			<h2 className="font-bold text-xl m-8">마일스톤 편집</h2>
			<div className="h-1/2 mx-8 flex flex-wrap">
				<MilestoneInfo handleName={handleName} milestone={milestone} />
			</div>
			<div className="flex flex-row-reverse mt-2">
				<div className="mx-8">
					<Button size="S" type="CONTAINED" icon="PLUS" text="완료" state={disabled} />
				</div>
				<Button
					onClick={handleShowEditor}
					size="S"
					type="OUTLINE"
					icon="X"
					text="취소"
					state="DEFAULT"
				/>
			</div>
		</section>
	);
}

export default MilestoneEditor;

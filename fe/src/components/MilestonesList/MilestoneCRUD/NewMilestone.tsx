import { useState } from "react";
import Button from "../../common/Button";
import MilestoneInfo from "./MilestoneInfo";

interface PropsType {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function NewMilestone({ onClick }: PropsType) {
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
		<section
			className={`mt-5 w-full ${border} h-[360px] min-w-[425px] bg-grayscale.50 dark:bg-grayscale.800 `}
		>
			<h2 className="font-bold text-xl m-8">새로운 마일스톤 추가</h2>
			<div className="h-1/2 mx-8 flex flex-wrap">
				<MilestoneInfo 	handleName={handleName}/>
			</div>
			<div className="flex flex-row-reverse mt-2">
				<div className="mx-8">
					<Button size="S" type="CONTAINED" icon="PLUS" text="완료" state={disabled} />
				</div>
				<Button onClick={onClick} size="S" type="OUTLINE" icon="X" text="취소" state="DEFAULT" />
			</div>
		</section>
	);
}

export default NewMilestone;

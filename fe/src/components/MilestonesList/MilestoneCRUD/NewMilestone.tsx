import { useRef, useState } from "react";
import Button from "../../common/Button";
import MilestoneInfo from "./MilestoneInfo";
import usePost from "../../../hooks/usePost";

interface DataType {
	name: string;
	description: string;
	completeDate: string;
}
interface PropsType {
	handleShowNewMilestone: () => void;
	queryKey: string;
}

const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function NewMilestone({ handleShowNewMilestone, queryKey }: PropsType) {
	const $name = useRef<HTMLInputElement>(null);
	const $completeDate = useRef<HTMLInputElement>(null);
	const $description = useRef<HTMLInputElement>(null);
	const [disabled, setDisabled] = useState("DISABLED");
	const mutate = usePost("/milestone", queryKey, handleShowNewMilestone);

	const handleName = () => {
		if ($name.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	const handleAddData = () => {
		const data: DataType = {
			name: $name.current?.value || "",
			description: $description.current?.value || "",
			completeDate: $completeDate.current?.value || "",
		};
		mutate(data);
	};
	return (
		<section
			className={`mt-5 w-full ${border} h-[360px] min-w-[425px] bg-grayscale.50 dark:bg-grayscale.800 `}
		>
			<h2 className="font-bold text-xl m-8 text-grayscale.900 dark:text-gray-50">
				새로운 마일스톤 추가
			</h2>
			<div className="h-1/2 mx-8 flex flex-wrap">
				<MilestoneInfo
					handleName={handleName}
					$name={$name}
					$completeDate={$completeDate}
					$description={$description}
				/>
			</div>
			<div className="flex flex-row-reverse mt-2">
				<div className="mx-8">
					<Button
						onClick={handleAddData}
						size="S"
						type="CONTAINED"
						icon="PLUS"
						text="완료"
						state={disabled}
					/>
				</div>
				<Button
					onClick={handleShowNewMilestone}
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

export default NewMilestone;

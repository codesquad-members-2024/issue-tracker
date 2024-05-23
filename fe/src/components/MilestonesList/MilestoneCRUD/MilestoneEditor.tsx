import { useState, useRef } from "react";
import Button from "../../common/Button";
import MilestoneInfo from "./MilestoneInfo";
import usePatch from "../../../hooks/usePatch";

interface DataType {
	name: string;
	description: string;
	completeDate: string;
}

interface PropsType {
	milestone: Milestone;
	handleShowEditor: () => void;
	queryKey: string;
}

function MilestoneEditor({ milestone, handleShowEditor, queryKey }: PropsType) {
	const $name = useRef<HTMLInputElement>(null);
	const $completeDate = useRef<HTMLInputElement>(null);
	const $description = useRef<HTMLInputElement>(null);
	const [disabled, setDisabled] = useState("DISABLED");
	const mutate = usePatch(`/milestone/${milestone.id}`, queryKey, handleShowEditor);

	const handleName = () => {
		if ($name.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	const handleDate = () => {
		if ($completeDate.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};
	const handleExplain = () => {
		if ($description.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	const handleUpdateData = () => {
		const data: DataType = {
			name: $name.current?.value || milestone.name,
			description: $description.current?.value || milestone.description,
			completeDate: $completeDate.current?.value || milestone.completeDate,
		};
		mutate(data);
	};

	return (
		<section className="mt-5 w-full h-[360px] min-w-[425px]">
			<h2 className="font-bold text-xl m-8 text-grayscale.900 dark:text-gray-50">마일스톤 편집</h2>
			<div className="h-1/2 mx-8 flex flex-wrap">
				<MilestoneInfo
					handleName={handleName}
					handleDate={handleDate}
					handleExplain={handleExplain}
					$name={$name}
					$completeDate={$completeDate}
					$description={$description}
					milestone={milestone}
				/>
			</div>
			<div className="flex flex-row-reverse mt-2">
				<div className="mx-8">
					<Button
						onClick={handleUpdateData}
						size="S"
						type="CONTAINED"
						icon="PLUS"
						text="완료"
						state={disabled}
					/>
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

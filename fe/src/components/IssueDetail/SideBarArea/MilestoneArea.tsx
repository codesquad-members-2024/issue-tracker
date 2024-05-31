import { useState, useRef } from "react";
import { ReactComponent as Plus } from "../../../svg/Plus.svg";
import useGet from "../../../hooks/useGet";
import DropdownPanel from "../../common/DropdownPanel";
import { ProgressWithLabel } from "../../common/ProgressBar";
import usePatch from "../../../hooks/usePatch";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	milestone: Milestone;
	issueId: number;
}

function MilestoneArea({ handleFetch, handleClearTimeOut, issueId, milestone }: ProsType) {
	const [open, setOpen] = useState(false);
	const [currentMilestone, setCurrentMilestone] = useState(milestone.id ? milestone : null);
	const previousItem = useRef<HTMLInputElement | null>(null);
	const mutate = usePatch(`/issue/${issueId}/milestone`, `issue/${issueId}`);

	const { data, refetch } = useGet("milestone", "/milestone", false);
	const milestones = data && data.milestones;
	const contents = milestones && [
		"Clear Milestone",
		...milestones.map(({ name }: { name: string }) => name),
	];

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const clickedMilestone = idx ? milestones[idx - 1] : null;
		setCurrentMilestone(clickedMilestone);
		setOpen(false);

		if (previousItem.current) previousItem.current.checked = false;
		previousItem.current = target;

		mutate({ milestoneId: clickedMilestone && clickedMilestone.id });
	};

	return (
		<div
			className="flex flex-col items-center justify-center"
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative w-[80%]">
				<summary
					className="my-6 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					마일스톤
					<Plus className="stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="마일스톤 설정"
					contents={contents}
					handler={handleCheckedItems}
				/>
			</details>

			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={() => setOpen(false)}
				></div>
			)}
			<div
				className={`flex flex-wrap transition-[padding] w-[80%] ${
					currentMilestone ? "pb-3" : "pb-0"
				}`}
			>
				{currentMilestone ? (
					<ProgressWithLabel
						percent={currentMilestone.milestoneProgress}
						name={currentMilestone.name}
					></ProgressWithLabel>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default MilestoneArea;

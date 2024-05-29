import { useState } from "react";
import useGet from "../../../../hooks/useGet";
import DropdownPanel from "../../../../components/common/DropdownPanel";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	// milestoneId?: React.MutableRefObject<number | null>; //TODO 옵셔널 삭제
}

function MilestoneFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const [open, setOpen] = useState(false);
	// const previousItem = useRef<HTMLInputElement | null>(null);

	const { data, refetch } = useGet("milestone", "/milestone", false);
	const milestones = data && data.milestones;
	const contents = milestones && [
		"마일스톤이 없는 이슈",
		...milestones.map(({ name }: { name: string }) => name),
	];
	// const checkedItem = milestoneId.current && milestones[milestoneId.current - 1];

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	// const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
	// 	if (previousItem.current) previousItem.current.checked = false;
	// 	previousItem.current = target;
	// 	milestoneId.current = idx;
	// 	setOpen(false);
	// };

	return (
		<div
			className="flex flex-col justify-center h-full"
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative  h-full">
				<summary
					className="my-5 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					마일스톤
					<ChevronDown className="mt-1 ml-3 stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="마일스톤 필터"
					contents={contents}
					// handler={handleCheckedItems}
				/>
			</details>
			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={() => setOpen(false)}
				></div>
			)}
		</div>
	);
}

export default MilestoneFilter;

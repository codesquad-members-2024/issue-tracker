import { useContext, useState } from "react";
import useGet from "../../../../hooks/useGet";
import DropdownPanel from "../../../../components/common/DropdownPanel";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";
import { setFilter } from "../../../../helper/setFilterRightSide";
import { useNavigate } from "react-router-dom";
import { FilterStateContext } from "../../../../provider/FilterStateProvider";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
}

function MilestoneFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const navigate = useNavigate();
	const [, setFilterText, paramRef] = useContext(FilterStateContext);
	const [open, setOpen] = useState(false);

	const { data, refetch } = useGet("milestone", "/milestone", false);
	const milestones = data && data.milestones;
	const contents = milestones && [
		"마일스톤이 없는 이슈",
		...milestones.map(({ name }: { name: string }) => name),
	];

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		target.checked = false;
		setOpen(false);
		const currId = idx && milestones[idx - 1].id;
		setFilter(
			`milestone_id=${currId}`,
			`milestone:${contents[idx] === "마일스톤이 없는 이슈" ? "no" : contents[idx]}`,
			navigate,
			setFilterText,
			paramRef,
			"milestone_id",
			/milestone:[^\s]+/g
		);
	};

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
					handler={handleCheckedItems}
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

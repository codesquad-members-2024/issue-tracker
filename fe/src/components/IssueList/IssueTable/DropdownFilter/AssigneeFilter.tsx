import { useState, useContext } from "react";
import useGet from "../../../../hooks/useGet";
import DropdownPanel from "../../../common/DropdownPanel";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";
import { setFilter } from "../../../../helper/setFilterRightSide";
import { useNavigate } from "react-router-dom";
import { FilterStateContext } from "../../../../provider/FilterStateProvider";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
}

function AssigneeFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const navigate = useNavigate();
	const [, setFilterText, paramRef] = useContext(FilterStateContext);
	const [open, setOpen] = useState(false);

	const { data, refetch } = useGet("assignee", "/member/list", false);
	const members = data && data.members;
	const contents = members && [
		"담당자가 없는 이슈",
		...members.map(({ memberId }: { memberId: string }) => memberId),
	];
	const imgs = members && [
		"",
		...members.map(({ profileImage }: { profileImage: string }) => profileImage),
	];

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		target.checked = false;
		setOpen(false);
		setFilter(
			`assignee=${contents[idx] === "담당자가 없는 이슈" ? "" : contents[idx]}`,
			`assignee:${contents[idx] === "담당자가 없는 이슈" ? "no" : contents[idx]}`,
			navigate,
			setFilterText,
			paramRef,
			"assignee",
			/assignee:[^\s]+/g
		);
	};

	return (
		<div
			className="flex flex-col items-center justify-center h-full"
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative h-full">
				<summary
					className="my-5 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					담당자
					<ChevronDown className="mt-1 ml-3 stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					key="assignee"
					top="top-[55px]"
					title="담당자 필터"
					contents={contents}
					imgs={imgs}
					handler={(e, i) => handleCheckedItems(e, i)}
					isState={true}
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

export default AssigneeFilter;

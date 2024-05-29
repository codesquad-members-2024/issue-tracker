import { useContext, useState } from "react";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";
import DropdownPanel from "../../../../components/common/DropdownPanel";
import usePatch from "../../../../hooks/usePatch";
import { CheckboxContext } from "../../../../provider/CheckboxProvider";

interface PropsType {
	checkedIssues: React.MutableRefObject<{ [key: number]: number }>;
	queryKey: string;
	queryParam: string | null;
}
function StateUpdater({ checkedIssues, queryKey, queryParam }: PropsType) {
	const query = queryParam && queryParam === "closed" ? "all-open" : "all-close";
	const [, dispatch] = useContext(CheckboxContext);
	const [open, setOpen] = useState(false);
	const mutate = usePatch(`/issue/${query}`, queryKey);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};

	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		target.checked = false;
		setOpen(false);
		dispatch({ type: "SET_TOTAL_DISABLE" });
		const data = {
			issueIds: Object.values(checkedIssues.current),
		};
		checkedIssues.current = {};
		mutate(data);
	};

	return (
		<div className="flex flex-col justify-center h-full">
			<details open={open} className="relative h-full">
				<summary
					className="my-5 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					상태 수정
					<ChevronDown className="mt-1 ml-3 stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px] right-0"
					title="상태 수정"
					contents={query === "all-open" ? ["선택한 이슈 열기"] : ["선택한 이슈 닫기"]}
					handler={handleCheckedItems}
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

export default StateUpdater;

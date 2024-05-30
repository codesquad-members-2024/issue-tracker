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

function LabelFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const navigate = useNavigate();
	const [, setFilterText, paramRef] = useContext(FilterStateContext);
	const [open, setOpen] = useState(false);

	const { data, refetch } = useGet("label", "/label", false);
	const labels = data && data.labels;
	const contents = labels && [
		"레이블이 없는 이슈",
		...labels.map(({ name }: { name: string }) => name),
	];
	const colors = labels && [
		"#ffffff",
		...labels.map(({ backgroundColor }: { backgroundColor: string }) => backgroundColor),
	];

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		target.checked = false;
		setOpen(false);
		const currId = idx && labels[idx - 1].id;
		setFilter(
			`label_id=${currId}`,
			`label:${contents[idx] === "레이블이 없는 이슈" ? "no" : contents[idx]}`,
			navigate,
			setFilterText,
			paramRef,
			"label_id",
			/label:[^\s]+/g
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
					레이블
					<ChevronDown className="mt-1 ml-3 stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="레이블 설정"
					contents={contents}
					color={colors}
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

export default LabelFilter;

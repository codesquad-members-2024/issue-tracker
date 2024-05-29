import { useState, useRef } from "react";
import useGet from "../../../../hooks/useGet";
import DropdownPanel from "../../../common/DropdownPanel";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	// labelIds?: React.MutableRefObject<number[]>; //TODO 옵셔널 삭제
}

function LabelFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const [open, setOpen] = useState(false);
	// const [idx, setIdx] = useState<number[]>([]);
	const checkedItems = useRef<{ [key: number]: number }>({});

	const { data, refetch } = useGet("label", "/label", false);
	const labels = data && data.labels;
	const contents = labels && labels.map(({ name }: { name: string }) => name);
	const colors =
		labels && labels.map(({ backgroundColor }: { backgroundColor: string }) => backgroundColor);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = (
		{ target: { checked } }: React.ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		if (checked) {
			checkedItems.current[idx] = idx;
			return;
		}
		delete checkedItems.current[idx];
	};

	// useEffect(() => {
	// 	if (!open) setIdx(Object.values(checkedItems.current));
	// }, [open]);

	// useEffect(() => {
	// 	labelIds.current = idx;
	// }, [idx, labelIds]);

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

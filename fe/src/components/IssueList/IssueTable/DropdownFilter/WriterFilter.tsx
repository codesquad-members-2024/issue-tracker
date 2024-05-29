import { useState, useRef } from "react";
import useGet from "../../../../hooks/useGet";
import DropdownPanel from "../../../../components/common/DropdownPanel";
import { ReactComponent as ChevronDown } from "../../../../svg/ChevronDown.svg";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
}

function WriterFilter({ handleFetch, handleClearTimeOut }: ProsType) {
	const [open, setOpen] = useState(false);
	// const [idx, setIdx] = useState<number[]>([]);
	const checkedItems = useRef<{ [key: number]: number }>({});

	const { data, refetch } = useGet("member", "/member/list", false);
	const members = data && data.members;
	const contents = members && members.map(({ memberId }: { memberId: string }) => memberId);
	const imgs = members && members.map(({ profileImage }: { profileImage: string }) => profileImage);

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

	return (
		<div
			className="flex flex-col justify-center h-full"
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative h-full">
				<summary
					className="my-5 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					작성자
					<ChevronDown className="mt-1 ml-3 stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="작성자 필터"
					contents={contents}
					imgs={imgs}
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

export default WriterFilter;

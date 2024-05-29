import { useState, useRef, useEffect } from "react";
import useGet from "../../../hooks/useGet";
import { ReactComponent as Plus } from "../../../svg/Plus.svg";
import DropdownPanel from "../../common/DropdownPanel";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	assigneeIds: React.MutableRefObject<string[]>;
}

const border = "component-border dark:component-border--dark border-b-[1px]";

function AssigneeArea({ handleFetch, handleClearTimeOut, assigneeIds }: ProsType) {
	const [open, setOpen] = useState(false);
	const [idx, setIdx] = useState<number[]>([]);
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

	useEffect(() => {
		if (!open) setIdx(Object.values(checkedItems.current));
	}, [open]);

	useEffect(() => {
		assigneeIds.current = idx.map((i) => members[i].memberId);
	}, [idx, assigneeIds, members]);

	return (
		<div
			className={`flex flex-col items-center justify-center ${border}`}
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative w-[80%]">
				<summary
					className="my-6 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					담당자
					<Plus className="stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="담당자 설정"
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
			<ul className={`transition-[padding] w-[80%] ${idx.length ? "pb-3" : "py-0"}`}>
				{idx.map((i) => {
					const { memberId, profileImage } = members[i];
					return (
						<li key={memberId} className="flex mb-2">
							<img
								className="w-[32px] h-[32px] rounded-full"
								alt="userProfile"
								src={profileImage}
							/>
							<span className="mx-3 mt-1.5 text-sm text-grayscale.700 dark:text-grayscale.400">
								{memberId}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default AssigneeArea;

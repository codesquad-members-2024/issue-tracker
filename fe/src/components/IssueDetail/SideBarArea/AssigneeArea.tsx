import { useState, useRef, useEffect } from "react";
import useGet from "../../../hooks/useGet";
import { ReactComponent as Plus } from "../../../svg/Plus.svg";
import DropdownPanel from "../../common/DropdownPanel";
import usePatch from "../../../hooks/usePatch";

type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	assignees: Member[];
	issueId: number;
}

const border = "component-border dark:component-border--dark border-b-[1px]";

function AssigneeArea({ handleFetch, handleClearTimeOut, assignees, issueId }: ProsType) {
	const [open, setOpen] = useState(false);
	const [currentAssignees, setCurrentAssignees] = useState<Member[]>([]);
	const checkedItems = useRef<{ [key: number]: number }>({});
	const mutate = usePatch(`/issue/${issueId}/assignee`, `issue/${issueId}`);

	const { data, refetch } = useGet("member", "/member/list", false);
	const members = data && data.members;
	const contents = members && members.map(({ memberId }: { memberId: string }) => memberId);
	const imgs = members && members.map(({ profileImage }: { profileImage: string }) => profileImage);

	useEffect(() => {
		setCurrentAssignees(assignees);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleShowDropdownPanel = () => {
		setOpen(false);
		const currAssinees = Object.values(checkedItems.current).map((idx) => members[idx]);
		const assigneeIds = currAssinees.map(({ memberId }) => memberId);
		setCurrentAssignees(currAssinees);
		mutate({
			assigneeIds,
		});
	};

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
					onClick={handleShowDropdownPanel}
				></div>
			)}
			<ul className={`transition-[padding] w-[80%] ${currentAssignees.length ? "pb-3" : "py-0"}`}>
				{currentAssignees.map((assignee) => {
					const { memberId, profileImage } = assignee;
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

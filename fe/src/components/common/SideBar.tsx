import { useRef } from "react";
import AssigneeArea from "../NewIssue/SideBarArea/AssigneeArea";
import LabelArea from "../NewIssue/SideBarArea/LabelArea";
import MilestoneArea from "../NewIssue/SideBarArea/MilestoneArea";

interface PropsType {
	assigneeIds: React.MutableRefObject<string[]>;
	labelIds: React.MutableRefObject<number[]>;
	milestoneId: React.MutableRefObject<number | null>;
}
type FetchedDataType = Milestone[] | Label[] | Member[];

const border = "component-border dark:component-border--dark";
const FETCH_TIME = 200;

function SideBar({ assigneeIds, labelIds, milestoneId }: PropsType) {
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleFetch = (fetchedData: FetchedDataType, refetch: () => void) => {
		timeoutId.current = setTimeout(() => {
			if (!fetchedData) refetch();
		}, FETCH_TIME);
	};
	const handleClearTimeOut = () => {
		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}
	};

	return (
		<div
			className={`border-[1px] rounded-2xl w-[288px] ${border} bg-grayscale.50 dark:bg-grayscale.800`}
		>
			<AssigneeArea
				handleFetch={handleFetch}
				handleClearTimeOut={handleClearTimeOut}
				assigneeIds={assigneeIds}
			/>
			<LabelArea
				handleFetch={handleFetch}
				handleClearTimeOut={handleClearTimeOut}
				labelIds={labelIds}
			/>
			<MilestoneArea
				handleFetch={handleFetch}
				handleClearTimeOut={handleClearTimeOut}
				milestoneId={milestoneId}
			/>
		</div>
	);
}

export default SideBar;

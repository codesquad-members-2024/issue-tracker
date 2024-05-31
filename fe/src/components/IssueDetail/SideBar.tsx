import { useRef, useState } from "react";
import AssigneeArea from "./SideBarArea/AssigneeArea";
import LabelArea from "./SideBarArea/LabelArea";
import MilestoneArea from "./SideBarArea/MilestoneArea";
import Button from "../common/Button";
import Alert from "../common/Alert";
import useDelete from "../../hooks/useDelete";
import { useNavigate } from "react-router-dom";

interface PropsType {
	assignees: Member[];
	issueId: number;
	labels: Label[];
	milestone: Milestone;
}
type FetchedDataType = Milestone[] | Label[] | Member[];

const border = "component-border dark:component-border--dark";
const FETCH_TIME = 200;

function SideBar({ assignees, issueId, labels, milestone }: PropsType) {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
	const mutate = useDelete(`/issue/${issueId}`, "/issue");

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

	const handleDeleteIssue = () => {
		setShowAlert(false);
		mutate();
		navigate("/");
	};

	return (
		<>
			<div
				className={`border-[1px] rounded-2xl w-[288px] ${border} bg-grayscale.50 dark:bg-grayscale.800`}
			>
				<AssigneeArea
					handleFetch={handleFetch}
					handleClearTimeOut={handleClearTimeOut}
					assignees={assignees}
					issueId={issueId}
				/>
				<LabelArea
					handleFetch={handleFetch}
					handleClearTimeOut={handleClearTimeOut}
					labels={labels}
					issueId={issueId}
				/>
				<MilestoneArea
					handleFetch={handleFetch}
					handleClearTimeOut={handleClearTimeOut}
					issueId={issueId}
					milestone={milestone}
				/>
			</div>
			<div className="flex flex-row-reverse -mr-8 mt-1">
				<Button
					onClick={() => setShowAlert(true)}
					size="S"
					type="GHOST_RED"
					icon="TRASH"
					text="이슈 삭제"
					state="DEFAULT"
				/>
			</div>
			{showAlert && (
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					handler={handleDeleteIssue}
					text="이슈를 삭제하시겠습니까?"
					danger={true}
				/>
			)}
		</>
	);
}

export default SideBar;

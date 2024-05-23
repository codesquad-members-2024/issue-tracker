import { ReactComponent as MilestoneSVG } from "../../svg/Milestone.svg";
import { ReactComponent as Calendar } from "../../svg/Calendar.svg";
import Button from "../common/Button";
import { ProgressWithInfo } from "../common/ProgressBar";
import { useState } from "react";
import MilestoneEditor from "./MilestoneCRUD/MilestoneEditor";
import Alert from "../common/Alert";
import StateButton from "./MilestoneCRUD/StateButton";
import useDelete from "../../hooks/useDelete";

interface PropsType {
	milestone: Milestone;
	i: number;
	length: number;
	queryKey: string;
}

const border = "component-border dark:component-border--dark";

function Milestone({ milestone, i, length, queryKey }: PropsType) {
	const [showAlert, setShowAlert] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const mutate = useDelete(`/milestone/${milestone.id}`, queryKey);

	const handleShowEditor = () => setShowEditor(!showEditor);
	const handleAlert = () => setShowAlert(true);
	const handleDelete = () => {
		mutate();
		setShowAlert(false);
	};

	return (
		<>
			<li
				className={`transition-[height] flex flex-col justify-evenly h-[96px] border-t-[1px] ${
					showEditor ? "lg:h-[360px] h-[520px]" : "h-[96px]"
				} ${border} bg-grayscale.50 dark:bg-grayscale.800 text-grayscale.600 dark:text-grayscale.500 ${
					i === length - 1 && "rounded-b-2xl"
				}`}
			>
				<div className={`${showEditor && "hidden"}`}>
					<section className="flex justify-between items-center mx-7">
						<div className="flex ">
							<span className="flex items-center font-bold text-grayscale.900 dark:text-grayscale.50 mr-5">
								<MilestoneSVG className="fill-accent.blue mr-2" />
								{milestone.name}
							</span>
							{milestone.completeDate && (
								<span className="hidden md:flex items-center text-xs ">
									<Calendar className="stroke-grayscale.600 dark:stroke-grayscale.500 mr-2" />
									{milestone.completeDate}
								</span>
							)}
						</div>
						<div className="flex w-[170px]">
							<StateButton state={milestone.state} id={milestone.id} queryKey={queryKey} />
							<Button
								onClick={handleShowEditor}
								size="S"
								type="GHOST"
								icon="PEN"
								text="편집"
								state="DEFAULT"
							/>
							<Button
								onClick={handleAlert}
								size="S"
								type="GHOST_RED"
								icon="TRASH"
								text="삭제"
								state="DEFAULT"
							/>
						</div>
					</section>
					<section className="flex justify-between items-center mx-7 mb-2">
						{milestone.description ? <p>{milestone.description}</p> : <p></p>}
						<div className="mr-2">
							<ProgressWithInfo
								openedIssueCount={milestone.openedIssueCount}
								closedIssueCount={milestone.closedIssueCount}
								percent={milestone.milestoneProgress}
							></ProgressWithInfo>
						</div>
					</section>
				</div>
				{showEditor && (
					<MilestoneEditor
						milestone={milestone}
						handleShowEditor={handleShowEditor}
						queryKey={queryKey}
					/>
				)}
			</li>

			{showAlert && (
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					handler={handleDelete}
					text="해당 마일 스톤을 삭제하시겠습니까?"
					danger={true}
				/>
			)}
		</>
	);
}

export default Milestone;

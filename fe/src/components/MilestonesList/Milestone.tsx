import { ReactComponent as MilestoneSVG } from "../../svg/Milestone.svg";
import { ReactComponent as Calendar } from "../../svg/Calendar.svg";
import Button from "../common/Button";
import { ProgressWithInfo } from "../common/ProgressBar";
import { useState } from "react";
import MilestoneEditor from "./MilestoneCRUD/MilestoneEditor";

interface PropsType {
	milestone: Milestone;
	i: number;
	length: number;
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const border = "component-border dark:component-border--dark";

function Milestone({ milestone, i, length, setShowAlert }: PropsType) {
	const [showEditor, setShowEditor] = useState(false);
	const getPercent = `${
		Math.round(((milestone.closed / (milestone.open + milestone.closed)) * 100) / 5) * 5
	}%`;

	const handleShowEditor = () => setShowEditor(!showEditor);
	const handleAlert = () => setShowAlert(true);

	return (
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
						{milestone.complete_date && (
							<span className="hidden md:flex items-center text-xs ">
								<Calendar className="stroke-grayscale.600 dark:stroke-grayscale.500 mr-2" />
								{milestone.complete_date}
							</span>
						)}
					</div>
					<div className="flex w-[170px]">
						<Button size="S" type="GHOST" icon="ARCHIVE" text="닫기" state="DEFAULT" />
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
							open={milestone.open}
							closed={milestone.closed}
							percent={getPercent}
						></ProgressWithInfo>
					</div>
				</section>
			</div>

			{showEditor && <MilestoneEditor milestone={milestone} handleShowEditor={handleShowEditor} />}
		</li>
	);
}

export default Milestone;

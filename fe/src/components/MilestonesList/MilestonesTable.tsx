import { useState } from "react";
import TabButton from "../common/TabButton";
import Milestone from "./Milestone";
import Alert from "../common/Alert";

const border = "component-border dark:component-border--dark";

// DELETE
const milestones = [
	{
		id: 1,
		is_open: true,
		open: 3,
		closed: 6,
		name: "마일스톤이름",
		description: "마일스톤 설명",
		complete_date: "2024/05/14",
	},
	{
		id: 2,
		is_open: false,
		open: 2,
		closed: 1,
		name: "테스트",
		description: "테스트마일스톤",
		complete_date: "",
	},
	{
		id: 3,
		is_open: false,
		open: 4,
		closed: 1,
		name: "음",
		description: "",
		complete_date: "2024/06/14",
	},
];

function MilestonesTable() {
	const [showAlert, setShowAlert] = useState(false);
	const length = milestones.length;
	return (
		<>
			<div className={`mt-5 w-full border-[1px] rounded-2xl ${border} min-w-[425px]`}>
				<header className={`h-[64px] flex items-center mx-7`}>
					{/* TODO 수정예정 */}
					<TabButton position="MILESTONE" />
				</header>
				<ul>
					{milestones.map((milestone, i) => (
						<Milestone
							key={milestone.id}
							milestone={milestone}
							i={i}
							length={length}
							setShowAlert={setShowAlert}
						/>
					))}
				</ul>
			</div>
			{showAlert && (
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					text="해당 마일 스톤을 삭제하시겠습니까?"
					danger={true}
				/>
			)}
		</>
	);
}

export default MilestonesTable;

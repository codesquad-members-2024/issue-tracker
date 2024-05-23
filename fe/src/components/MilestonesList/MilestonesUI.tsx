import { useState } from "react";
import Button from "../common/Button";
import TabButton from "../common/TabButton";
import NewMilestone from "./MilestoneCRUD/NewMilestone";

interface PropsType {
	queryKey: string;
}

function MilestonesUI({ queryKey }: PropsType) {
	const [newMilestone, setNewMilestone] = useState(false);
	const handleShowNewMilestone = () => setNewMilestone(!newMilestone);

	return (
		<>
			<div className="mt-10 flex justify-between min-w-[425p x]">
				<TabButton position="UI_BAR" click="right" />
				<Button
					onClick={newMilestone ? () => {} : handleShowNewMilestone}
					size="S"
					type="CONTAINED"
					icon="PLUS"
					text="마일스톤 추가"
					state={newMilestone ? "DISABLED" : "DEFAULT"}
				/>
			</div>
			<div className={`transition-[height] ${newMilestone ? "lg:h-[360px] h-[480px]" : "h-0"}`}>
				{newMilestone && (
					<NewMilestone handleShowNewMilestone={handleShowNewMilestone} queryKey={queryKey} />
				)}
			</div>
		</>
	);
}
export default MilestonesUI;

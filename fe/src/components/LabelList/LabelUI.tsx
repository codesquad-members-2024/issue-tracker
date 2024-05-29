import { useState } from "react";
import Button from "../common/Button";
import TabButton from "../common/TabButton";
import NewLabel from "./LabelCRUD/NewLabel";
import useGet from "../../hooks/useGet";

function LabelUI() {
	const [newLabel, setNewLabel] = useState(false);
	const handleShowNewLabel = () => setNewLabel(!newLabel);
	const { data } = useGet("count", "/count", true);
	const { totalLabelCounts = 0, totalMilestoneCounts = 0 } = data || {};

	return (
		<>
			<div className="mt-10 flex justify-between min-w-[425px]">
				<TabButton
					position="UI_BAR"
					click="left"
					leftCount={totalLabelCounts}
					rightCount={totalMilestoneCounts}
				/>
				<Button
					onClick={newLabel ? () => {} : handleShowNewLabel}
					size="S"
					type="CONTAINED"
					icon="PLUS"
					text="레이블 추가"
					state={newLabel ? "DISABLED" : "DEFAULT"}
				/>
			</div>
			<div className={`transition-[height] ${newLabel ? "lg:h-[360px] h-[480px]" : "h-0"}`}>
				{newLabel && <NewLabel handleShowNewLabel={handleShowNewLabel} />}
			</div>
		</>
	);
}

export default LabelUI;

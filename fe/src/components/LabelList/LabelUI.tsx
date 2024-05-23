import { useState } from "react";
import Button from "../common/Button";
import TabButton from "../common/TabButton";
import NewLabel from "./LabelCRUD/NewLabel";

function LabelUI() {
	const [newLabel, setNewLabel] = useState(false);
	const handleShowNewLabel = () => setNewLabel(!newLabel);

	return (
		<>
			<div className="mt-10 flex justify-between min-w-[425px]">
				<TabButton position="UI_BAR" click="left" />
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
				{newLabel && <NewLabel handleShowNewLabel={handleShowNewLabel} setNewLabel={setNewLabel}/>}
			</div>
		</>
	);
}

export default LabelUI;

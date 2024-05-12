import { useState } from "react";
import Button from "./Button";

function TabButton() {
	const [left, setLeft] = useState("DEFAULT");
	const [right, setRight] = useState("DEFAULT");

	const onLeftClick = () => {
		setLeft("SELECTED");
		setRight("DEFAULT");
	};

	const onRightClick = () => {
		setRight("SELECTED");
		setLeft("DEFAULT");
	};

	return (
		<div className="component-border w-[320px] h-[40px] flex items-center">
			<Button
				onClick={onLeftClick}
				size="M"
				type="GHOST"
				icon="TAG"
				text="레이블(3)"
				state={left}
			/>
			<div className="border-r-2 h-full"></div>
			<Button
				onClick={onRightClick}
				size="M"
				type="GHOST"
				icon="POST"
				text="마일스톤(3)"
				state={right}
			/>
		</div>
	);
}
export default TabButton;

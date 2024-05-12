import { useState } from "react";
import Button from "./Button";

interface PropsType {
	position: string;
}
type PositionType = {
	[key: string]: {
		border: boolean;
		leftIcon: string;
		leftTab: string;
		rightIcon: string;
		rightTab: string;
		size: string;
	};
};

const POSITION: PositionType = {
	UI_BAR: {
		border: true,
		leftIcon: "TAG",
		leftTab: "레이블(3)",
		rightIcon: "POST",
		rightTab: "마일스톤(3)",
		size: "w-[320px] h-[40px]",
	},
	TABLE: {
		border: false,
		leftIcon: "!",
		leftTab: "열린 이슈(3)",
		rightIcon: "ARCHIVE",
		rightTab: "닫힌 이슈(3)",
		size: "w-[250px] h-[32px]",
	},
};

const borderTotal = "component-border dark:component-border--dark border-[1px] rounded-xl";
const borderRight = "component-border dark:component-border--dark border-r-[1px]";

function TabButton({ position }: PropsType) {
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
		<div
			className={`${POSITION[position].border ? borderTotal : ""} ${
				POSITION[position].size
			} flex items-center`}
		>
			<Button
				onClick={onLeftClick}
				size="M"
				type="GHOST"
				icon={POSITION[position].leftIcon}
				text={POSITION[position].leftTab}
				state={left}
			/>
			<div className={`${POSITION[position].border ? borderRight : ""} h-full`}></div>
			<Button
				onClick={onRightClick}
				size="M"
				type="GHOST"
				icon={POSITION[position].rightIcon}
				text={POSITION[position].rightTab}
				state={right}
			/>
		</div>
	);
}
export default TabButton;

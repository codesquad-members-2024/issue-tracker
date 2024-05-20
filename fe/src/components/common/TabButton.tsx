import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

interface PropsType {
	position: string;
	click?: string;
}
interface PositionType {
	[key: string]: {
		border: boolean;
		leftIcon: string;
		leftTab: string;
		rightIcon: string;
		rightTab: string;
		size: string;
	};
}
interface LinkType {
	[key: string]: {
		left: string;
		right: string;
	};
}

const POSITION: PositionType = {
	UI_BAR: {
		border: true,
		leftIcon: "TAG",
		leftTab: "레이블(3)",
		rightIcon: "POST",
		rightTab: "마일스톤(3)",
		size: "w-[320px] h-[40px]",
	},
	ISSUE: {
		border: false,
		leftIcon: "!",
		leftTab: "열린 이슈(3)",
		rightIcon: "ARCHIVE",
		rightTab: "닫힌 이슈(3)",
		size: "w-[250px] h-[32px]",
	},
	MILESTONE: {
		border: false,
		leftIcon: "!",
		leftTab: "열린 마일스톤(3)",
		rightIcon: "ARCHIVE",
		rightTab: "닫힌 마일스톤(3)",
		size: "w-[320px] h-[32px]",
	},
};

//TODO 라우팅
const LINK: LinkType = {
	UI_BAR: {
		left: "/labels",
		right: "/milestones",
	},
	TABLE: {
		left: "/",
		right: "/",
	},
};

const borderTotal = "component-border dark:component-border--dark border-[1px] rounded-xl";
const borderRight = "component-border dark:component-border--dark border-r-[1px]";

function TabButton({ position, click }: PropsType) {
	const [left, setLeft] = useState("DEFAULT");
	const [right, setRight] = useState("DEFAULT");

	useEffect(() => {
		if (click === "left") setLeft("SELECTED");
		if (click === "right") setRight("SELECTED");
	}, []);

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
			<Link
				to={`/labels`}
				className={`flex items-center w-1/2 h-full bg-grayscale.100 dark:bg-grayscale.900 rounded-l-xl ${
					left === "SELECTED" ? "bg-grayscale.200 dark:bg-grayscale.700" : ""
				}`}
			>
				<Button
					onClick={onLeftClick}
					size="M"
					type="GHOST"
					icon={POSITION[position].leftIcon}
					text={POSITION[position].leftTab}
					state={left}
				/>
			</Link>
			<div className={`${POSITION[position].border ? borderRight : ""} h-full`}></div>
			<Link
				to={"/milestones"}
				className={`flex items-center w-[49.8%] h-full bg-grayscale.100 dark:bg-grayscale.900 rounded-r-xl ${
					right === "SELECTED" ? "bg-grayscale.200 dark:bg-grayscale.700" : ""
				}`}
			>
				<Button
					onClick={onRightClick}
					size="M"
					type="GHOST"
					icon={POSITION[position].rightIcon}
					text={POSITION[position].rightTab}
					state={right}
				/>
			</Link>
		</div>
	);
}
export default TabButton;

import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

interface PropsType {
	position: string;
	leftCount?: number; //TODO 수정 무조건 값는 값
	rightCount?: number;
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
		leftTab: "레이블",
		rightIcon: "POST",
		rightTab: "마일스톤",
		size: "w-[320px] h-[40px]",
	},
	ISSUE: {
		border: false,
		leftIcon: "!",
		leftTab: "열린 이슈",
		rightIcon: "ARCHIVE",
		rightTab: "닫힌 이슈",
		size: "w-[250px] h-[32px]",
	},
	MILESTONE: {
		border: false,
		leftIcon: "!",
		leftTab: "열린 마일스톤",
		rightIcon: "ARCHIVE",
		rightTab: "닫힌 마일스톤",
		size: "w-[320px] h-[32px]",
	},
};

const LINK: LinkType = {
	UI_BAR: {
		left: "/labels",
		right: "/milestone/",
	},
	ISSUE: { left: "/", right: "/" },
	MILESTONE: {
		left: "/milestone?state=opened",
		right: "/milestone?state=closed",
	},
};

const borderTotal = "component-border dark:component-border--dark border-[1px] rounded-xl";
const borderRight = "component-border dark:component-border--dark border-r-[1px]";

function TabButton({ position, leftCount, rightCount, click }: PropsType) {
	const [left, setLeft] = useState("DEFAULT");
	const [right, setRight] = useState("DEFAULT");

	// useEffect(() => { //DELETE
	if (click === "left") setLeft("SELECTED");
	if (click === "right") setRight("SELECTED");
	if (position === "MILESTONE" || position === "ISSUE") setLeft("SELECTED");
	// }, []);

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
				to={LINK[position].left}
				className={`flex items-center w-1/2 h-full rounded-l-xl ${
					left === "SELECTED" && position === "UI_BAR"
						? "bg-grayscale.200 dark:bg-grayscale.700"
						: "bg-grayscale.100 dark:bg-grayscale.900 "
				}`}
			>
				<Button
					onClick={onLeftClick}
					size="M"
					type="GHOST"
					icon={POSITION[position].leftIcon}
					text={`${POSITION[position].leftTab}(${leftCount})`}
					state={left}
				/>
			</Link>
			<div className={`${POSITION[position].border ? borderRight : ""} h-full`}></div>
			<Link
				to={LINK[position].right}
				className={`flex items-center w-[49.6%] h-full  rounded-r-xl ${
					right === "SELECTED" && position === "UI_BAR"
						? "bg-grayscale.200 dark:bg-grayscale.700"
						: "bg-grayscale.100 dark:bg-grayscale.900"
				}`}
			>
				<Button
					onClick={onRightClick}
					size="M"
					type="GHOST"
					icon={POSITION[position].rightIcon}
					text={`${POSITION[position].rightTab}(${rightCount})`}
					state={right}
				/>
			</Link>
		</div>
	);
}
export default TabButton;

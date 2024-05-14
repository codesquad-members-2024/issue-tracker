import DropdownIndicators from "./DropdownIndicators";

const border = "component-border dark:component-border--dark";
const borderBottom = `border-b-[1px] ${border}`;
const sideBarItems = ["담당자", "레이블", "마일스톤"];

function SideBar() {
	return (
		//TODO 값 추가 기능 구현 예정
		<div
			className={`border-[1px] rounded-2xl w-[288px] h-[282px] ${border} bg-grayscale.50 dark:bg-grayscale.800`}
		>
			{sideBarItems.map((v, i) => (
				<div
					key={i}
					className={`flex flex-col items-center justify-center h-1/3 ${
						i === sideBarItems.length - 1 ? "" : borderBottom
					}`}
				>
					<DropdownIndicators label={v} icon="faPlus" top="top-9" />
				</div>
			))}
		</div>
	);
}

export default SideBar;

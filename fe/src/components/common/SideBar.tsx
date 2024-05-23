import useGet from "../../hooks/useGet";
import DropdownIndicators from "./DropdownIndicators";

type FetchedDataType = Milestone[] | Label[] | Object[]; //TODO 아래 바뀌면 데이터 추가!!

const border = "component-border dark:component-border--dark";
const borderBottom = `border-b-[1px] ${border}`;

function SideBar() {
	const { data: milestone, refetch: milestoneRefetch } = useGet("milestone", "/milestone");
	const { data: label, refetch: lableRefetch } = useGet("label", "/label");
	const { data: member, refetch: memberRefetch } = useGet("member", "/member");
	const sideBarItems = [
		// { title: "담당자", data: member, fetch: () => milestoneRefetch() }, //TODO 데이터나오면 변경예정
		// { title: "레이블", data: label.labels, fetch: () => lableRefetch() },
		{ title: "마일스톤", data: milestone && milestone.milestones, fetch: () => memberRefetch() },
	];

	const handleFetch = (fetchedData: FetchedDataType, fetch: () => void) => {
		if (!fetchedData) fetch();
	};

	return (
		<div
			className={`border-[1px] rounded-2xl w-[288px] h-[282px] ${border} bg-grayscale.50 dark:bg-grayscale.800`}
		>
			{sideBarItems.map((item, i) => (
				<div
					key={i}
					onMouseEnter={() => handleFetch(item.data, item.fetch)}
					className={`flex flex-col items-center justify-center h-1/3 ${
						i === sideBarItems.length - 1 ? "" : borderBottom
					}`}
				>
					<DropdownIndicators label={item.title} icon="faPlus" top="top-9" data={item.data} />
				</div>
			))}
		</div>
	);
}

export default SideBar;

import TabButton from "../common/TabButton";
import Milestone from "./Milestone";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../../utility/fetchData";

interface PropsType {
	queryParam: null | string;
	queryKey: string;
}

interface MilestonesDataType {
	milestones: Milestone[];
	milestoneCounts: MilestoneCounts;
}

const border = "component-border dark:component-border--dark";

function MilestonesTable({ queryParam, queryKey }: PropsType) {
	const api = `${queryParam ? `/milestone?state=${queryParam}` : "/milestone"}`;
	const { data, error, isLoading } = useQuery({
		queryKey: [queryKey],
		queryFn: () => fetchData(api),
	});
	if (isLoading) return <div>로딩</div>;
	if (error) return <div>에러 {error.message}</div>;

	const { milestones, milestoneCounts }: MilestonesDataType = data;

	return (
		<div className={`mt-5 w-full border-[1px] rounded-2xl ${border} min-w-[425px]`}>
			<header className={`h-[64px] flex items-center mx-7`}>
				<TabButton
					position="MILESTONE"
					leftCount={milestoneCounts.openedCount}
					rightCount={milestoneCounts.closedCount}
				/>
			</header>
			<ul>
				{milestones.length ? (
					milestones.map((milestone, i) => (
						<Milestone
							key={milestone.id}
							milestone={milestone}
							i={i}
							length={milestones.length}
							queryKey={queryKey}
						/>
					))
				) : (
					<li className="bg-grayscale.50 dark:bg-grayscale.800 h-[96px] rounded-b-2xl border-t-[1px] flex justify-center items-center component-border dark:component-border--dark ">
						<span className="animate-bounce">마일스톤 없성ㅠㅠ</span>
					</li>
				)}
			</ul>
		</div>
	);
}

export default MilestonesTable;

import Header from "../components/Header/Header";
import MilestonesTable from "../components/MilestonesList/MilestonesTable";
import MilestonesUI from "../components/MilestonesList/MilestonesUI";
import { useSearchParams } from "react-router-dom";

function Milestones() {
	const [searchParams] = useSearchParams();
	const queryParam = searchParams.get("state");
	const queryKey = `milestone${queryParam ? `?state=${queryParam}` : ""}`;
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<MilestonesUI queryKey={queryKey}/>
				<MilestonesTable queryParam={queryParam} queryKey={queryKey}/>
			</div>
		</div>
	);
}

export default Milestones;

import Header from "../components/Header/Header";
import MilestonesTable from "../components/MilestonesList/MilestonesTable";
import MilestonesUI from "../components/MilestonesList/MilestonesUI";

function Milestones() {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<MilestonesUI />
				<MilestonesTable />
			</div>
		</div>
	);
}

export default Milestones;

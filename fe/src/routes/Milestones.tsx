import Header from "../components/Header/Header";
import MilestonesTable from "../components/MilestonesList/MilestonesTable";
import MilestonesUI from "../components/MilestonesList/MilestonesUI";

interface PropsType {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function Milestones({ darkMode, setDarkMode }: PropsType) {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<MilestonesUI />
				<MilestonesTable />
			</div>
		</div>
	);
}

export default Milestones;

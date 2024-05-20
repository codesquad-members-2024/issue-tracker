import Header from "../components/Header/Header";
import LabelsTable from "../components/LabelList/LabelsTable";
import LabelUI from "../components/LabelList/LabelUI";

interface PropsType {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function Labels({ darkMode, setDarkMode }: PropsType) {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<LabelUI />
				<LabelsTable />
			</div>
		</div>
	);
}

export default Labels;

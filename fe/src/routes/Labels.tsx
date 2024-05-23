import Header from "../components/Header/Header";
import LabelsTable from "../components/LabelList/LabelsTable";
import LabelUI from "../components/LabelList/LabelUI";

function Labels() {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<LabelUI />
				<LabelsTable />
			</div>
		</div>
	);
}

export default Labels;

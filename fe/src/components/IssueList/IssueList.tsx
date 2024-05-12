import Table from "../common/Table";
import UIBar from "./UIBar/UIBar";

function IssueList() {
	return (
		<div className="flex flex-col justify-center">
			<UIBar />
			<Table />
		</div>
	);
}

export default IssueList;

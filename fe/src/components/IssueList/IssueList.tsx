import IssueTable from "./IssueTable/IssueTable";
import UIBar from "./UIBar/UIBar";

function IssueList() {
	return (
		<div className="flex flex-col justify-center">
			<UIBar />
			<IssueTable />
		</div>
	);
}

export default IssueList;

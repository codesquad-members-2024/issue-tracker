import Header from "../components/Header/Header";
import WritingIssue from "../components/NewIssue/WritingIssue";

function NewIssue() {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-y-auto">
			<div className="h-[95%] w-[85%]">
				<Header />
				<WritingIssue />
			</div>
		</div>
	);
}

export default NewIssue;

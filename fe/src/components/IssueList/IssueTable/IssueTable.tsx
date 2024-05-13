import TabButton from "../../common/TabButton";

const border = "component-border dark:component-border--dark";

function IssueTable() {
	return (
		<div className={`border-[1px] ${border} rounded-2xl lg:mt-0 mt-14`}>
			<header className={`h-[64px] border-b-[1px] ${border} flex items-center`}>
				<div className="flex">
					<input type="checkbox" />
					<TabButton position="TABLE" />
				</div>
			</header>
			<ul>
				<li className={`bg-grayscale.50 dark:bg-grayscale.800 border-b-[1px] ${border}`}>
					내용이야1
				</li>
				<li>내용이야1</li>
				<li>내용이야1</li>
				<li>내용이야1</li>
			</ul>
		</div>
	);
}

export default IssueTable;

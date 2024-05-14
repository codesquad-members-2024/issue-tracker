import Header from "../components/Header/Header";
import WritingIssue from "../components/NewIssue/WritingIssue";

interface Props {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function NewIssue({ darkMode, setDarkMode }: Props) {
	return (
		<div className="w-screen h-screen flex items-center justify-center overflow-y-auto">
			<div className="h-[95%] w-[85%]">
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<WritingIssue />
			</div>
		</div>
	);
}

export default NewIssue;

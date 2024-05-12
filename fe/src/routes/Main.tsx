import Header from "../components/Header/Header";
import IssueList from "../components/IssueList/IssueList";

interface Props {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}
function Main({ darkMode, setDarkMode }: Props) {
	return (
		<div className="h-[95%] w-[85%]">
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<IssueList />
		</div>
	);
}

export default Main;

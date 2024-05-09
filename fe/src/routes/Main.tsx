import Header from "../components/Header/Header";

interface Props {
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function Main({ setDarkMode }: Props) {
	return (
		<div className="h-[95%] w-[85%] ">
			<Header />
		</div>
	);
}

export default Main;

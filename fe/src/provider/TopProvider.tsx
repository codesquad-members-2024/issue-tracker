import { createContext, useState } from "react";

interface Props {
	children: React.ReactNode;
}
type TopContextType = [
	string,
	React.Dispatch<React.SetStateAction<string>>,
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>
];

const defaultContext: TopContextType = ["", () => {}, false, () => {}];
const TopContext = createContext<TopContextType>(defaultContext);

function TopProvider({ children }: Props) {
	const [darkMode, setDarkMode] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<TopContext.Provider value={[darkMode, setDarkMode, isLoggedIn, setIsLoggedIn]}>
			{children}
		</TopContext.Provider>
	);
}

export { TopContext, TopProvider };

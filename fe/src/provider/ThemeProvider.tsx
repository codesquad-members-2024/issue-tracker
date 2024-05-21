import { createContext, useState } from "react";

interface Props {
	children: React.ReactNode;
}
type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const defaultContext: ThemeContextType = ["", () => {}];
const ThemeContext = createContext<ThemeContextType>(defaultContext);

//TODO 로그인 토큰 로컬 스토리지에 저장 후 테마도 저장
function ThemeProvider({ children }: Props) {
	const [darkMode, setDarkMode] = useState("");
	return <ThemeContext.Provider value={[darkMode, setDarkMode]}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };

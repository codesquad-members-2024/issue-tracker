import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import Main from "./routes/Main";
import Login from "./routes/Login";
import NewIssue from "./routes/NewIssue";
import Labels from "./routes/Labels";
import Milestones from "./routes/Milestones";
import IssueDetail from "./routes/IssueDetail";
import { ThemeProvider, ThemeContext } from "./provider/ThemeProvider";

function App() {
	return (
		<ThemeProvider>
			<AppRoute />
		</ThemeProvider>
	);
}

function AppRoute() {
	const [darkMode] = useContext(ThemeContext);
	const [isLogin, setIsLogin] = useState(false);
	return (
		<div
			className={`${darkMode} w-screen h-screen bg-grayscale.100 flex justify-center items-center dark:bg-grayscale.900`}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={isLogin ? <Main /> : <Login setIsLogin={setIsLogin} />} />
					<Route path="/issue" element={<NewIssue />} />
					<Route path="/issue/:id" element={<IssueDetail />} />
					<Route path="/labels" element={<Labels />} />
					<Route path="/milestones" element={<Milestones />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

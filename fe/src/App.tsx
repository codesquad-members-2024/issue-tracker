import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Main from "./routes/Main";
import Login from "./routes/Login";
import NewIssue from "./routes/NewIssue";
import Labels from "./routes/Labels";
import Milestones from "./routes/Milestones";
import IssueDetail from "./routes/IssueDetail";
import { TopProvider, TopContext } from "./provider/TopProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TopProvider>
				<AppRoute />
			</TopProvider>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

function AppRoute() {
	const [darkMode, , isLoggedIn] = useContext(TopContext);
	return (
		<div
			className={`${darkMode} w-screen h-screen bg-grayscale.100 flex justify-center items-center dark:bg-grayscale.900`}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/:filter?" element={isLoggedIn ? <Main /> : <Login />} />
					<Route path="/issue" element={<NewIssue />} />
					<Route path="/issue/:id" element={<IssueDetail />} />
					<Route path="/labels" element={<Labels />} />
					<Route path="/milestone" element={<Milestones />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

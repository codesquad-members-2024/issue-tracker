import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "./routes/Main";
import Login from "./routes/Login";
import NewIssue from "./routes/NewIssue";

function App() {
	const [darkMode, setDarkMode] = useState("");
	return (
		<div
			className={`${darkMode} w-screen h-screen bg-grayscale.100 flex justify-center items-center dark:bg-grayscale.900`}
		>
			<BrowserRouter>
				<Routes>
					{/* <Login />  */}
					<Route path="/" element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />
					<Route path="/issue" element={<NewIssue />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

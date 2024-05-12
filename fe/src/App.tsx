import { useState } from "react";
import Main from "./routes/Main";
import Login from "./routes/Login";

function App() {
	const [darkMode, setDarkMode] = useState("");
	return (
		<div
			className={`${darkMode} w-screen h-screen bg-grayscale.100 flex justify-center items-center dark:bg-grayscale.900`}
		>
			{/* <Login />  */}

			<Main darkMode={darkMode} setDarkMode={setDarkMode} />
		</div>
	);
}

export default App;

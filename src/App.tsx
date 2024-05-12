import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./app/page";
import IssuePage from "./app/IssuePage/page";
import LabelsPage from "./app/LabelsPage/page";
import MilestonesPage from "./app/MilestonesPage/page";
import NewPage from "./app/NewPage/page";
import IssueProduct from "./app/IssueProduct/page";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";

function App() {
    return (
        <div className="h-full my-auto transition-colors duration-500 bg-gray-100 dark:bg-darkModeBG dark:text-white">
            <BrowserRouter>
            <ThemeSwitch/>
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/issue" element={<IssuePage />}></Route>
                    <Route path="/issue/:productId" element={<IssueProduct />}></Route>
                    <Route path="/labels" element={<LabelsPage />}></Route>
                    <Route path="/milestones" element={<MilestonesPage />}></Route>
                    <Route path="/new" element={<NewPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssuePage from "./pages/IssuesPage";
import LabelsPage from "./pages/LabelsPage";
import MilestonesPage from "./pages/MilestonesPage";
import NewPage from "./pages/NewPage";
import IssueProduct from "./pages/IssueProduct";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";

function App() {
    return (
        <div className="h-full my-auto transition-colors duration-500 bg-gray-100 dark:bg-darkModeBG dark:text-white">
            <BrowserRouter>
            <ThemeSwitch/>
                <Routes>
                    <Route path="/" element={<Navigate to="/Login" />} />
                    <Route path="/Login" element={<LoginPage />}></Route>
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

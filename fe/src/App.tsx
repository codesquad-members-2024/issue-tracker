import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssuePage from "./pages/IssuesPage";
import LabelsPage from "./pages/LabelsPage";
import MilestonesPage from "./pages/MilestonesPage";
import NewPage from "./pages/NewPage";
import IssueProduct from "./pages/IssueDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<LoginPage />}></Route>
                <Route path="/issue" element={<IssuePage />}></Route>
                <Route
                    path="/issue/:productId"
                    element={<IssueProduct />}
                ></Route>
                <Route path="/labels" element={<LabelsPage />}></Route>
                <Route path="/milestones" element={<MilestonesPage />}></Route>
                <Route path="/new" element={<NewPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

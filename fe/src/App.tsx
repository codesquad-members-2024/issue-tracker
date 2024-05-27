import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssuePage from "./pages/IssuesPage";
import LabelsPage from "./pages/LabelsPage";
import MilestonesPage from "./pages/MilestonesPage";
import NewPage from "./pages/NewPage";
import IssueProduct from "./pages/IssueDetailPage";
import SignUp from "./pages/SignUpPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/issue" element={<IssuePage />}></Route>
                    <Route path="/issue/:productId" element={<IssueProduct />}></Route>
                    <Route path="/labels" element={<LabelsPage />}></Route>
                    <Route path="/milestones" element={<MilestonesPage />}></Route>
                    <Route path="/new" element={<NewPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

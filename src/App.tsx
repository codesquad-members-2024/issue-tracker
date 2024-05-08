import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./app/page";
import OpenPage from "./app/OpenPage/page";
import ClosePage from "./app/ClosePage/page";
import LabelsPage from "./app/LabelsPage/page";
import MilestonesPage from "./app/MilestonesPage/page";
import NewPage from "./app/newPage/page";

function App() {
    return (
        <div className="h-full my-auto bg-gray-100">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/open" element={<OpenPage />}></Route>
                    <Route path="/closed" element={<ClosePage />}></Route>
                    <Route path="/labels" element={<LabelsPage />}></Route>
                    <Route path="/milestones" element={<MilestonesPage />}></Route>
                    <Route path="/new" element={<NewPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

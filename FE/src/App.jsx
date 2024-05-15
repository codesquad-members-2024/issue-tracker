import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/IssuesList/Main";
import { Milestones } from "./components/Main/Milestones/Milestones";
import { Labels } from "./components/Main/Labels/Labels";
import { NewIssue } from "./components/Main/NewIssue/NewIssue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/issues" element={<Main />} />
        <Route path="/issues/create" element={<NewIssue />} />
        <Route path="/labels" element={<Labels />} />
        <Route path="/milestones" element={<Milestones />} />
      </Routes>
    </Router>
  );
}

export default App;

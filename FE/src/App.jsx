import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { IssueList } from "./components/Main/IssueList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/issues" element={<IssueList />} />
      </Routes>
    </Router>
  );
}

export default App;

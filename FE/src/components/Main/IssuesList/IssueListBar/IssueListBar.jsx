import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ContentNavStyles } from "@/styles/commonStyles";
import { FilterBar } from "./FilterBar";
import { NavTabs } from "@/components/common/NavTabs";

export function IssueListBar() {
  const navigate = useNavigate();

  const handleIssues = () => navigate("/issues/create");

  return (
    <Bar>
      <FilterBar />
      <Nav>
        <NavTabs />
        <Issue onClick={handleIssues}>
          <div>+ 이슈 작성</div>
        </Issue>
      </Nav>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  height: 40px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const Issue = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
`;

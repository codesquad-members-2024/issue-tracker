import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ContentNavStyles } from "../../../../styles/commonStyles";
import { LabelIcon } from "../../../../icons/LabelIcon";
import { MilestonesIcon } from "../../../../icons/MilestonesIcon";
import { FilterBar } from "./FilterBar";

export function IssueListBar() {
  const navigate = useNavigate();

  const handleLabels = () => navigate("/labels");
  const handleMilestones = () => navigate("/Milestones");
  const handleIssues = () => navigate("/issues/create");

  return (
    <Bar>
      <FilterBar />
      <Nav>
        <Tabs>
          <NavLabel onClick={handleLabels}>
            <LabelIcon />
            <div>레이블</div>
          </NavLabel>
          <NavMilestones onClick={handleMilestones}>
            <MilestonesIcon />
            <div>마일스톤</div>
          </NavMilestones>
        </Tabs>
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

const Tabs = styled.div`
  display: flex;
  border: solid#dadbef;
  border-radius: 10px;
  width: 320px;
  justify-content: center;
`;

const NavLabel = styled.div`
  ${ContentNavStyles}
  border-right: solid #dadbef;
`;

const NavMilestones = styled.div`
  ${ContentNavStyles}
`;

const Issue = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
`;

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ContentNavStyles } from "../../styles/commonStyles";
import { LabelIcon } from "../..//icons/LabelIcon";
import { MilestonesIcon } from "../../icons/MilestonesIcon";

export function NavTabs() {
  const navigate = useNavigate();

  const handleLabels = () => navigate("/labels");
  const handleMilestones = () => navigate("/Milestones");

  return (
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
  );
}

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

import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { ContentNavStyles } from "@/styles/commonStyles";
import { LabelIcon } from "@/icons/LabelIcon";
import { MilestonesIcon } from "@/icons/MilestonesIcon";

export function NavTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLabels = () => navigate("/labels");
  const handleMilestones = () => navigate("/milestones");

  const isLabelsActive = location.pathname === "/labels";
  const isMilestonesActive = location.pathname === "/milestones";

  return (
    <Tabs>
      <StyledNavLabel onClick={handleLabels} $active={isLabelsActive}>
        <LabelIcon />
        <div>레이블</div>
      </StyledNavLabel>
      <StyledNavMilestones onClick={handleMilestones} $active={isMilestonesActive}>
        <MilestonesIcon />
        <div>마일스톤</div>
      </StyledNavMilestones>
    </Tabs>
  );
}

const Tabs = styled.div`
  display: flex;
  border: solid #dadbef;
  border-radius: 10px;
  width: 320px;
  justify-content: center;
  overflow: hidden;
  background: ${({ isActive }) => (isActive ? "#eff0f6" : "unset")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;

const StyledNavLabel = styled.div`
  ${ContentNavStyles}
  border-right: solid #dadbef;
  background: ${(props) => (props.$active ? "#eff0f6" : "unset")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const StyledNavMilestones = styled.div`
  ${ContentNavStyles}
  background: ${(props) => (props.$active ? "#eff0f6" : "unset")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;
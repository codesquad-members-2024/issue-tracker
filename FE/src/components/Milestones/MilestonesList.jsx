import { useState } from "react";
import styled from "styled-components";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { MilestonesContent } from "./MilestonesContent";
import useFetch from "../../hooks/useFetch";

const CLOSED_MILESTONES_API = "/api/milestones/close";

export function MilestonesList(props) {
  const { milestones, fetchData: fetchOpenMilestones } = props;
  const { state: closedMilestones, fetchData: fetchClosedMilestones } = useFetch(CLOSED_MILESTONES_API);

  const [isOpenMilestones, setIsOpenMilestones] = useState(true);

  const handleOpenMilestonesClick = () => {
    setIsOpenMilestones(true);
    fetchOpenMilestones();
  };

  const handleClosedMilestonesClick = () => {
    setIsOpenMilestones(false);
    fetchClosedMilestones();
  };

  const milestonesToDisplay = isOpenMilestones ? milestones : closedMilestones;

  return (
    <Wrap>
      <MilestonesHeader>
        <StyledBtn onClick={handleOpenMilestonesClick} $active={isOpenMilestones}>
          <OpenIcon />
          <span>열린 마일스톤({milestones?.length || 0})</span>
        </StyledBtn>
        <StyledBtn onClick={handleClosedMilestonesClick} $active={!isOpenMilestones}>
          <ClosedIcon />
          <span>닫힌 마일스톤({closedMilestones?.length || 0})</span>
        </StyledBtn>
      </MilestonesHeader>
      <MilestonesContent milestones={milestonesToDisplay} {...{ fetchData: fetchOpenMilestones }}/>
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
`;

const MilestonesHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  span {
    margin-left: 10px;
    font-size: 16px;
  }
`;

import { useState } from "react";
import styled from "styled-components";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { MilestonesContent } from "./MilestonesContent";
import { milestonesList, closedMilestonesList } from "@/test.json"; // test data

export function MilestonesList() {
  const [isOpenMilestones, setIsOpenMilestones] = useState(true);

  const milestonesToDisplay = isOpenMilestones ? milestonesList : closedMilestonesList;

  return (
    <Wrap>
      <MilestonesHeader>
        <StyledBtn onClick={() => setIsOpenMilestones(true)} $active={isOpenMilestones}>
          <OpenIcon />
          <span>열린 마일스톤({milestonesList.length})</span>
        </StyledBtn>
        <StyledBtn onClick={() => setIsOpenMilestones(!isOpenMilestones)} $active={!isOpenMilestones}>
          <ClosedIcon />
          <span>닫힌 마일스톤({closedMilestonesList.length})</span>
        </StyledBtn>
      </MilestonesHeader>
      <MilestonesContent milestones={milestonesToDisplay} />
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

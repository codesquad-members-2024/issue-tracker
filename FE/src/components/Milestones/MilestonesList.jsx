import styled from "styled-components";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { MilestonesContent } from "./MilestonesContent";

export function MilestonesList() {
  return (
    <Wrap>
      <MilestonesHeader>
        <StyledBtn>
          <OpenIcon />
          <span>열린 마일스톤(3)</span>
        </StyledBtn>
        <StyledBtn>
          <ClosedIcon />
          <span>닫힌 마일스톤(0)</span>
        </StyledBtn>
      </MilestonesHeader>
      <MilestonesContent />
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
  margin-left: 35px;
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  span {
    margin-left: 10px;
    font-size: 16px;
  }
`;

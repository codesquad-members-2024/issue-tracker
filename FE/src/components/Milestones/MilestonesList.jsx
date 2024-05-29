import { useState, useEffect } from "react";
import styled from "styled-components";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { MilestonesContent } from "./MilestonesContent";
import useFetch from "../../hooks/useFetch";

const { VITE_SERVER } = import.meta.env;
const CLOSED_MILESTONES_API = "/api/milestones/close";

export function MilestonesList(props) {
  const { milestones, fetchData, postData, putData, deleteData } = props;
  const { state: closedMilestones, fetchData: fetchClosedData } = useFetch(`${VITE_SERVER}${CLOSED_MILESTONES_API}`);
  
  const [isOpenMilestones, setIsOpenMilestones] = useState(true);

  useEffect(() => {
    if (!isOpenMilestones) {
      fetchClosedData();
    }
  }, [isOpenMilestones, fetchClosedData]);

  const milestonesToDisplay = isOpenMilestones ? milestones : closedMilestones;

  return (
    <Wrap>
      <MilestonesHeader>
        <StyledBtn onClick={() => setIsOpenMilestones(true)} $active={isOpenMilestones}>
          <OpenIcon />
          <span>열린 마일스톤({milestones?.length})</span>
        </StyledBtn>
        <StyledBtn onClick={() => setIsOpenMilestones(false)} $active={!isOpenMilestones}>
          <ClosedIcon />
          <span>닫힌 마일스톤({closedMilestones?.length})</span>
        </StyledBtn>
      </MilestonesHeader>
      <MilestonesContent milestones={milestonesToDisplay} {...{ fetchData, putData, deleteData }}/>
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

import { useState } from "react";
import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { ContentNavStyles } from "@/styles/commonStyles";
import { NavTabs } from "../common/NavTabs";
import { NewMilestones } from "./NewMilestones";
import { MilestonesList } from "./MilestonesList";

export function Milestones() {
  const [showNewMilestones, setShowNewMilestones] = useState(false);

  return (
    <>
      <Header />
      <Nav>
        <NavTabs />
        <LabelsBtn onClick={() => setShowNewMilestones(true)}>
          <div>+ 마일스톤 추가</div>
        </LabelsBtn>
      </Nav>
      {showNewMilestones && (
        <NewMilestones
          closeNewMilestones={() => setShowNewMilestones(false)}
          actionType="createMilestones"
        />
      )}
      <MilestonesList />
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  height: 40px;
`;

const LabelsBtn = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
`;

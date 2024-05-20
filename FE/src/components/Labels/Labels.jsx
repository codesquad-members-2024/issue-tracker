import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { LabelIcon } from "../../icons/LabelIcon";
import { MilestonesIcon } from "../../icons/MilestonesIcon";
import { ContentNavStyles } from "../../styles/commonStyles";
import { LabelsContent } from "./LabelsContent";

export function Labels() {
  return (
    <>
      <Header />
      <Nav>
        <Tabs>
          <NavLabel>
            <LabelIcon />
            <div>레이블</div>
          </NavLabel>
          <NavMilestones>
            <MilestonesIcon />
            <div>마일스톤</div>
          </NavMilestones>
        </Tabs>
        <LabelsBtn>
          <div>+ 레이블 작성</div>
        </LabelsBtn>
      </Nav>
      <LabelsContent/>
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  height: 40px;
`;

const Tabs = styled.div`
  display: flex;
  border: solid #dadbef;
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

const LabelsBtn = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
`;

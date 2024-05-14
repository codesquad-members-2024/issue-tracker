import styled from "styled-components";
import { ContentNavStyles } from "../../../styles/commonStyles";
import { Label } from "../../../icons/label";
import { Milestones } from "../../../icons/milestones";
import { FilterBar } from "./FilterBar";
import { IssueTable } from "./IssueTable/IssueTable";

export function Content() {
  return (
    <>
      <Bar>
        <FilterBar />
        <Nav>
          <Tabs>
            <NavLabel>
              <Label />
              <div>레이블</div>
            </NavLabel>
            <NavMilestones>
              <Milestones />
              <div>마일스톤</div>
            </NavMilestones>
          </Tabs>
          <Issue>+ 이슈 작성</Issue>
        </Nav>
      </Bar>
      <IssueTable />
    </>
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

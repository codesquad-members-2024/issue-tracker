import styled from "styled-components";
import { ContentButtonStyles } from "../../../styles/commonStyles";
import { Dropdown } from "../../../icons/dropdown";
import { Search } from "../../../icons/search";
import { Label } from "../../../icons/label";
import { Milestones } from "../../../icons/milestones";

export function Content() {
  return (
    <>
      <Bar>
        <Filter>
          <button className="filter">
            필터
            <Dropdown />
          </button>
          <button className="search">
            <Search /> is:issue is:open
          </button>
        </Filter>
        <Nav>
          <Tabs>
            <button className="label">
              <Label />
              label
            </button>
            <button className="milestones">
              <Milestones />
              milestones
            </button>
          </Tabs>
          <Issue>+ 이슈 작성</Issue>
        </Nav>
      </Bar>
      <IssueTable>
        <div className="toolbar"></div>
        <div className="issues"></div>
      </IssueTable>
    </>
  );
}

const IssueTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;

  .toolbar {
    height: 60px;
    border-bottom: solid #dadbef;
  }
  .issues {
    height: 90px;
  }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  height: 40px;
`;

const Filter = styled.div`
  display: flex;
  border: solid #dadbef;
  border-radius: 10px;
  width: 560px;
  background-color: #eff0f6;
  .filter,
  .search {
    ${ContentButtonStyles}
    padding: 0 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .filter {
    ${ContentButtonStyles}
    border-right: solid #dadbef;
    background-color: #f7f7fc;
  }
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
  .label,
  .milestones {
    ${ContentButtonStyles}
  }
  .label {
    border-right: solid #dadbef;
  }
`;

const Issue = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  width: 120px;
}`;

import styled from "styled-components";
import { Open } from "../../../../icons/open";
import { issues } from "../../../../test.json"; // test data

export function IssueTableContent({ checkedItems, onIssueCheckboxChange }) {
  return (
    <>
      {issues.length === 0 ? (
        <Issues />
      ) : (
        issues
          .slice()
          .reverse()
          .map((issue, index) => (
            <Issues key={index}>
              <Checkbox
                type="checkbox"
                checked={checkedItems.has(issue.issue_id)}
                onChange={() => onIssueCheckboxChange(issue.issue_id)}
              />
              <Content>
                <div className="top">
                  <Open />
                  <div className="title">{issue.title}</div>
                  <div>{issue.labels}</div>
                </div>
                <div className="bottom">
                  <div>#{issue.issue_id}</div>
                  <div>
                    이 이슈가 {issue.create_time} 전, {issue.assignee}님에 의해
                    작성되었습니다
                  </div>
                  <div>{issue.milestone}</div>
                </div>
              </Content>
            </Issues>
          ))
      )}
    </>
  );
}

const Issues = styled.div`
  display: flex;
  height: 90px;
  background-color: white;
  border-top: 1px solid #dadbef;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 35px;
  div {
    margin-right: 20px;
  }
  .title {
    margin-left: 10px;
    font-size: 20px;
  }
  .top,
  .bottom {
    display: flex;
    align-items: center;
    height: 30px;
`;

const Checkbox = styled.input`
  height: 50%;
  padding: 20px;
  margin-left: 25px;
`;

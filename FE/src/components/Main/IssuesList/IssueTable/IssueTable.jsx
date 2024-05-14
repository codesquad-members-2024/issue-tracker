import { Open } from "../../../../icons/open";
import styled from "styled-components";
import { IssueTableHeader } from "./IssueTableHeader";
import { issues } from "../../../../test.json"; // test data

export function IssueTable() {
  return (
    <StyledDiv>
      <IssueTableHeader />
      {issues.length === 0 ? (
        <Issues />
      ) : (
        <>
          {issues
            .slice()
            .reverse()
            .map((issue, index) => (
              <Issues key={index}>
                <Checkbox type="checkbox" />
                <Content>
                  <div className="top">
                    <Open />
                    <div className="title">{issue.title}</div>
                    <div>{issue.labels}</div>
                  </div>
                  <div className="bottom">
                    <div>#{issue.issue_id}</div>
                    <div>
                      이 이슈가 {issue.create_time}전, {issue.assginee}님에 의해
                      작성되었습니다
                    </div>
                    <div>{issue.milestone}</div>
                  </div>
                </Content>
              </Issues>
            ))}
        </>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
`;

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

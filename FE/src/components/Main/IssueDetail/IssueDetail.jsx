import styled from "styled-components";
import { useParams } from "react-router-dom";
import { issues } from "../../../test.json";
import { Comment } from "./Comment";
import { RightPanel } from "./RightPanel";

export function IssueDetail() {
  const { idx } = useParams();
  const selectedIssue = issues.find((issue) => issue.issue_id === idx);

  return (
    <>
      <Header>
        <Title>
          {selectedIssue.title}
          <IssueNumber>#{idx}</IssueNumber>
        </Title>
        <Info>
          <div>열린 이슈</div>
          <div>이 이슈가 n분 전에 {selectedIssue.writer}에 의해 열렸습니다.</div>
        </Info>
      </Header>
      <MainContent>
        <Comment selectedIssue={selectedIssue} />
        <RightPanel />
      </MainContent>
    </>
  );
}

const Header = styled.header`
  padding: 50px 0 25px;
  border-bottom: solid #dadbe9;
  margin: 0 100px;
`;

const Title = styled.h1`
  display: flex;
  font-size: 30px;
  font-weight: bold;
`;

const IssueNumber = styled.span`
  margin-left: 20px;
  color: #6e7191;
`;

const Info = styled.div`
  display: flex;
  margin-top: 20px;
  color: #6e7191;
  div {
    margin-right: 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  margin: 20px 100px;
`;

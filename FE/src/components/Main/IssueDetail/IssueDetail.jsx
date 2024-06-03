import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Comment } from "./Comment";
import { RightPanel } from "./RightPanel";
import { calculateTime } from "@/util/calculateTime";
import { issuesDetail } from "@/test.json";
import { Header } from "../IssuesList/Header";

export function IssueDetail() {
  const { idx } = useParams();
  const selectedIssue = issuesDetail.find((detail) => detail.issue.id === Number(idx));
  const elapsedTime = calculateTime(selectedIssue.issue.createTime);
  const { title, writer } = selectedIssue.issue;
  return (
    <>
      <Header />
      <StyledHeader>
        <Title>
          {title}
          <IssueNumber>#{idx}</IssueNumber>
        </Title>
        <Info>
          <div>열린 이슈</div>
          <div>이 이슈가 {elapsedTime}에 {writer}에 의해 열렸습니다.</div>
        </Info>
      </StyledHeader>
      <MainContent>
        <Comment issueWriter={writer} selectedIssue={selectedIssue} elapsedTime={elapsedTime} />
        <RightPanel />
      </MainContent>
    </>
  );
}

/* api 연동
import useFetch from '@/hooks/useFetch'; 
import { useEffect } from "react";
import API_ENDPOINTS from "@/config/config";

export function IssueDetail() {
  const { idx } = useParams();
  const { state: issuesDetail, loading, error, fetchData: fetchIssueDetail } = useFetch(`${API_ENDPOINTS.issues}/${idx}`);

  useEffect(() => {
    fetchIssueDetail();
  }, [fetchIssueDetail]);

  const selectedIssue = issuesDetail?.find((detail) => detail.issue.id === Number(idx));
  if (!selectedIssue) return <div>No issue found</div>;

  const { title, writer, createTime } = selectedIssue.issue;
  const elapsedTime = calculateTime(createTime);

  return (
    <>
      <Header />
      <StyledHeader>
        {loading && <h1>LOADING...</h1>}
        {error && <h1>{error.message || error.toString()}</h1>}
        <Title>
          {title}
          <IssueNumber>#{idx}</IssueNumber>
        </Title>
        <Info>
          <div>열린 이슈</div>
          <div>이 이슈가 {elapsedTime}에 {writer}에 의해 열렸습니다.</div>
        </Info>
      </StyledHeader>
      <MainContent>
        <Comment issueWriter={writer} selectedIssue={selectedIssue} elapsedTime={elapsedTime} />
        <RightPanel />
      </MainContent>
    </>
  );
} */

const StyledHeader = styled.header`
  padding-bottom: 25px;
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
  justify-content: space-between;
`;

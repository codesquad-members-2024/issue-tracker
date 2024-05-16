import styled from "styled-components";
import { Header } from "../IssuesList/Header";

export function NewIssue() {
  return (
    <>
      <Header />
      <StyledH1>새로운 이슈 작성</StyledH1>
    </>
  );
}

const StyledH1 = styled.h1`
  margin: 0 100px;
  border-bottom: solid #dadbe9;
  padding: 25px 0;
  font-size: 30px;
`;

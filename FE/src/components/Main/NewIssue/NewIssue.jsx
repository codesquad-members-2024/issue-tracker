import styled from "styled-components";
import { Header } from "../IssuesList/Header";
import { RightPanel } from "../IssueDetail/RightPanel";
import { CommonBtnStyles } from "@/styles/commonStyles";

export function NewIssue() {
  return (
    <>
      <Header />
      <StyledH1>새로운 이슈 작성</StyledH1>
      <MainContent>
        <div>
          <img src="/img/frog.png" />
        </div>
        <Comment>
          <StyledInput type="text" placeholder="제목" />
          <StyledTextarea placeholder="코멘트를 입력하세요" />
        </Comment>
        <RightPanel />
      </MainContent>
      <Buttons>
        <CancelBtn>x 작성취소</CancelBtn>
        <SummitBtn>완료</SummitBtn>
      </Buttons>
    </>
  );
}

const StyledH1 = styled.h1`
  margin: 0 100px;
  border-bottom: solid #dadbe9;
  padding: 25px 0;
  font-size: 30px;
`;

const MainContent = styled.div`
  display: flex;
  margin: 20px 100px;
  justify-content: space-between;
  border-bottom: solid #dadbe9;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 600px;
  overflow: hidden;
`;

const StyledInput = styled.input`
  display: flex;
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: #eff0f6;
  padding: 0 20px;
  font-size: 20px;
`;

const StyledTextarea = styled.textarea`
  border: none;
  border-radius: 10px;
  height: 80%;
  background-color: #eff0f6;
  margin-top: 10px;
  font-size: 20px;
  padding: 20px;
`;

const Buttons = styled.div`
  height: 60px;
  margin: 20px 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CancelBtn = styled.div`
  ${CommonBtnStyles}
  margin-right: 30px;
`;

const SummitBtn = styled.div`
  ${CommonBtnStyles}
  background-color: #007bff;
  color: white;
  width: 240px;
`;

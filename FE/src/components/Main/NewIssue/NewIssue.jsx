import { useState } from "react";
import styled from "styled-components";
import { Header } from "../IssuesList/Header";
import { RightPanel } from "../IssueDetail/RightPanel";
import { CommonBtnStyles } from "@/styles/commonStyles";
import { useNavigate } from "react-router-dom";
import { postData } from "@/api/api";

const ISSUES_API = "/api/issues";

export function NewIssue() {
  const navigate = useNavigate();
  const [newIssue, setNewIssue] = useState({
    title: "",
    contents: "",
  });

  const handleSubmit = async () => {
    try {
      await postData(ISSUES_API, {
        title: "title1",
        contents: "contents1",
        writer: "1", // test data
      });
      navigate("/issues");
    } catch (error) {
      console.error("Failed to submit new issue:", error);
    }
  };

  const handleTitle = (e) => setNewIssue({ ...newIssue, title: e.target.value });
  const handleContents = (e) => setNewIssue({ ...newIssue, contents: e.target.value });

  return (
    <>
      <Header />
      <StyledH1>새로운 이슈 작성</StyledH1>
      <MainContent>
        <div>
          <img src="/img/frog.png" alt="frog" />
        </div>
        <Comment>
          <StyledInput
            type="text"
            placeholder="제목"
            value={newIssue.title}
            onChange={handleTitle}
          />
          <StyledTextarea
            placeholder="코멘트를 입력하세요"
            value={newIssue.contents}
            onChange={handleContents}
          />
        </Comment>
        <RightPanel />
      </MainContent>
      <Buttons>
        <CancelBtn onClick={() => navigate(-1)}>x 작성취소</CancelBtn>
        <SummitBtn onClick={handleSubmit}>완료</SummitBtn>
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

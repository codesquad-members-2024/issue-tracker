import styled, { keyframes } from "styled-components";
import Header from "../../header/Header";
import CreatorForm from "./CreatorForm";
import userIcon from "../../../img/icon/userIcon.png";
import plusIcon from "../../../img/icon/plusIcon_dark.svg";
import Sidebar from "../Sidebar";
import useIssueCreatorLogic from "../../../hooks/logics/useIssueCreatorLogic";

function IssueCreator() {
  const { titleRef, commentRef, commentCount, isSubmitable, handleOnChange, handleCancel, handleSubmit } =
    useIssueCreatorLogic();

  return (
    <Wrapper>
      <Header />
      <TitleWrapper>
        <PageTitle>새로운 이슈 작성</PageTitle>
      </TitleWrapper>
      <BodyBoundary />
      <BodyWrapper>
        <UserIcon src={userIcon} />
        <FormWrapper>
          <CreatorForm ref={titleRef} labelText="제목" height="3.5em" onChange={handleOnChange} />
          <CreatorForm ref={commentRef} labelText="코멘트를 입력하세요." height="100%" onChange={handleOnChange} />
          <ExtensionWrapper>
            <ContentWordCount key={`word-count-${commentCount}`}>띄어쓰기 포함 {commentCount}자</ContentWordCount>
            <DashedLine />
            <FileImageButton>
              <img /> 파일 첨부하기
            </FileImageButton>
          </ExtensionWrapper>
        </FormWrapper>
        <Sidebar />
      </BodyWrapper>
      <BodyBoundary />
      <ButtonsWrapper>
        <SubmitButton isSubmitable={isSubmitable} onClick={handleSubmit}>
          완료
        </SubmitButton>
        <CancelWrapper onClick={handleCancel}>
          <CancelIcon src={plusIcon} />
          <CancelText>작성 취소</CancelText>
        </CancelWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
}

const FadeOut = keyframes`
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: block;
`;

const TitleWrapper = styled.div`
  margin-top: 2em;
`;

const PageTitle = styled.span`
  font-size: 2em;
  font-weight: 700;
`;

const BodyBoundary = styled.hr`
  margin: 2em 0;
  height: 1px;
  color: #eceef5;
`;

const BodyWrapper = styled.div`
  width: 1280px;
  height: 616px;
  display: flex;
  gap: 1.5em;
`;

const UserIcon = styled.img`
  width: 2em;
  height: 2em;
`;

const FormWrapper = styled.div`
  width: 912px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 2em;
`;

const CancelWrapper = styled.div`
  width: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25em;
  cursor: pointer;
`;

const CancelIcon = styled.img`
  transform: rotate(45deg);
`;

const CancelText = styled.span`
  width: 11em;
  color: #4e4b66;
`;

const SubmitButton = styled.button<{ isSubmitable: boolean }>`
  width: 12em;
  height: 2.8em;
  padding: 0 1.2em;
  font-size: 1.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  color: white;
  background-color: #595959;
  border: 0;
  border-radius: 0.725em;
  cursor: pointer;
  opacity: ${({ isSubmitable }) => (isSubmitable ? "1" : "0.5")};
  transition: all 0.5s ease;
`;

const ExtensionWrapper = styled.div`
  position: fixed;
  width: 910px;
  top: 46em;
  display: flex;
  flex-direction: column;
`;

const ContentWordCount = styled.span`
  padding: 0 2em;
  text-align: right;
  animation: ${FadeOut} 2s ease-out;
  animation-fill-mode: forwards;
`;

const DashedLine = styled.hr`
  border-top: 1px dashed #d9dbe9;
  border-bottom: none;
  margin: 1.5em;
`;

const FileImageButton = styled.button`
  padding: 0 2em;
  background-color: transparent;
  border: none;
  text-align: left;
`;

export default IssueCreator;

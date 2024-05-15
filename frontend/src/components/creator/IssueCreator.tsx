import styled from "styled-components";
import Header from "../header/Header";
import CreatorForm from "./CreatorForm";
import userIcon from "../../img/icon/userIcon.png";
import plusIcon from "../../img/icon/plusIcon_dark.svg";
import Sidebar from "../issue/Sidebar";

function IssueCreator() {
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
          <CreatorForm labelText="제목" height="3.5em" />
          <CreatorForm labelText="코멘트를 입력하세요." height="100%" />
        </FormWrapper>
        <Sidebar />
      </BodyWrapper>
      <BodyBoundary />
      <ButtonsWrapper>
        <SubmitButton>
          완료
        </SubmitButton>
        <CancelWrapper>
          <CancelIcon src={plusIcon} />
          <CancelText>작성 취소</CancelText>
        </CancelWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
}

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
`

const CancelWrapper = styled.div`
  width: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25em;
  cursor: pointer;
`

const CancelIcon = styled.img`
  transform: rotate(45deg);
`;

const CancelText = styled.span`
  width: 11em;
  color: #4E4B66;
`

const SubmitButton = styled.button`
  width: 12em;
  height: 2.8em; 
  padding: 0 1.2em;
  font-size: 1.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  color: white;
  background-color: #007aff;
  border: 0;
  border-radius: 0.725em;
  cursor: pointer;
`;

export default IssueCreator;

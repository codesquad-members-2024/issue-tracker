import styled from "styled-components";
import Header from "../header/Header";
import CreatorForm from "./CreatorForm";
import userIcon from "../../img/icon/userIcon.png";
import plusIcon from "../../img/icon/plusIcon_dark.svg";

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
          <CreatorForm labelText="제목" isFullHeight={false} />
          <CommentForm labelText="코멘트를 입력하세요." isFullHeight={true} />
        </FormWrapper>
        <SideBar>
          <Sector>
            <span>담당자</span>
            <img src={plusIcon} />
          </Sector>
          <Sector>
            <span>레이블</span>
            <img src={plusIcon} />
          </Sector>
          <Sector>
            <span>마일스톤</span>
            <img src={plusIcon} />
          </Sector>
        </SideBar>
      </BodyWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
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
  color: #d9dbe9;
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

const SideBar = styled.div`
  width: 288px;
  height: 16em;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  overflow: hidden;
`;

const Sector = styled.div`
  padding: 2em;
  border-top: 1px solid #d9dbe9;
  display: flex;
  justify-content: space-between;
`;

const CommentForm = styled(CreatorForm)`
  height: 100%;
`;

export default IssueCreator;

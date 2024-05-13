import styled from "styled-components";
import userIcon from "../../img/icon/userIcon.png";
import blueOpenedIssueIcon from "../../img/icon/blueOpenedIssueIcon.svg";
import milestoneIcon from "../../img/icon/milestoneIcon.svg";

function IssueHeadline() {
  return (
    <Wrapper>
      <IssueCheckBox type="checkbox" />
      <IssueDescriptions>
        <IssueTitleDescription>
          <img src={blueOpenedIssueIcon} />
          <TitleText>이슈 제목</TitleText>
          <LabelBox>Label</LabelBox>
        </IssueTitleDescription>
        <IssueInfo>
          <span>#이슈번호</span>
          <span>작성자 및 타임스탬프 정보</span>
          <img src={milestoneIcon} />
          <span>마일스톤</span>
        </IssueInfo>
      </IssueDescriptions>
      <UserIconContainer>
        <UserIcon src={userIcon} />
      </UserIconContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 95%;
  padding: 0 2em;
  height: 6em;
  display: flex;
  align-items: start;
  border-top: 1px solid #d9dbe9;
`;

const IssueCheckBox = styled.input`
  margin-top: 1.7em;
`;

const IssueDescriptions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  margin: 0 2em;
`;

const IssueTitleDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const TitleText = styled.span`
  height: 1.125em;
  font-size: 1.25em;
  font-weight: 500;
`;

const LabelBox = styled.div`
  height: 1.5em;
  padding: 0 0.75em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
  border: 1px solid #D9DBE9;
  border-radius: 1em;
  background-color: #FEFEFE;
  color: #6E7191;
`;

const IssueInfo = styled.div`
  display: flex;
  gap: 1em;
  color: #6e7191;
`;

const UserIcon = styled.img`
  width: 1.25em;
  height: 1.25em;
`;

const UserIconContainer = styled.div`
  height: 100%;
  margin-right: 1.5em;
  display: flex;
  align-items: center;
`;

export default IssueHeadline;

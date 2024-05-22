import styled from "styled-components";
import milestoneIcon from "../../img/icon/milestoneIcon.svg";
import calendarIcon from "../../img/icon/calendarIcon.svg";
import archieveIcon from "../../img/icon/archieveIcon.svg";
import editIcon from "../../img/icon/editIcon_gray.svg";
import deleteIcon from "../../img/icon/deleteIcon.svg";

function MilestoneDetail() {
  return <Wrapper>
    <MilestoneBody>
      <TitleBox>
        <Title><img src={milestoneIcon} />그룹 프로젝트: 이슈트래커</Title>
        <Deadline><img src={calendarIcon} />2023. 08. 18</Deadline>
      </TitleBox>
      <Description>마일스톤에 대한 설명</Description>
    </MilestoneBody>
    <MilestoneInfo>
      <ButtonWrapper>
        <EditButton>
          <img src={archieveIcon} />닫기
        </EditButton>
        <EditButton>
        <img src={editIcon} />편집
        </EditButton>
        <DeleteButton>
        <img src={deleteIcon} />삭제
        </DeleteButton>
      </ButtonWrapper>
      <ProgressBar>
        <Progress percentage={50}></Progress>
      </ProgressBar>
      <InfoTextWrapper>
        <span>50%</span>
        <IssueTextWrapper>
          <span>열린 이슈 1</span>
          <span>닫힌 이슈 1</span>
        </IssueTextWrapper>
      </InfoTextWrapper>
    </MilestoneInfo>
  </Wrapper>;
}

const Wrapper = styled.div`
  height: 7em;
  padding: 0 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d9dbe9;
  gap: 2em;
`;

const MilestoneBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

`;

const TitleBox = styled.div` 
  display: flex;
  gap: 1em;
`

const Title = styled.span`
  display: flex;
  gap: 0.5em;
  color: #14142B;
`;

const Deadline = styled.span`
  display: flex;
  gap: 0.5em;
  color: #6E7191;
`;

const Description = styled.span`
  color: #6E7191;
`;

const MilestoneInfo = styled.div`
display: flex;
flex-direction: column;
gap: 0.5em;

`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5em;
`

const EditButton = styled.button`
  display: flex;
  gap: 0.5em;
  color: #4e4b66;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: flex;
  gap: 0.5em;
  color: #ff3b30;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 244px;
  height: 0.5em;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: #EFF0F6;
  overflow: hidden;
`

const Progress = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #007AFF;
`

const InfoTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6E7191;
`

const IssueTextWrapper = styled.div`
  display: flex;
  gap: 0.7em;
`

export default MilestoneDetail;

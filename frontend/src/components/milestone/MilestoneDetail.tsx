import styled from "styled-components";
import milestoneIcon from "../../img/icon/milestoneIcon.svg";
import calendarIcon from "../../img/icon/calendarIcon.svg";
import archieveIcon from "../../img/icon/archieveIcon.svg";
import editIcon from "../../img/icon/editIcon_gray.svg";
import deleteIcon from "../../img/icon/deleteIcon.svg";
import { MilestoneContext, MilestoneDetailType } from "../../contexts/MilestoneContext";
import numberUtils from "../../utils/NumberUtils";
import dateUtils from "../../utils/DateUtils";
import { deleteMilestone, sendMilestonesRequest, toggleMilestoneState } from "../../api/MilestoneAPI";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import MilestoneEditBox from "./MilestoneEditBox";

function MilestoneDetail({
  milestoneId,
  title,
  description,
  deadline,
  totalIssue,
  closedIssue,
  isClosed,
}: MilestoneDetailType) {
  const { setOpenMilestones, setCloseMilestones } = useContext(MilestoneContext);
  const [isToEdit, setIsToEdit] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsToEdit((prev) => !prev);
  }, []);

  const handleDeleteClick = useCallback(async () => {
    await deleteMilestone(milestoneId);
    const updatedMilestones = await fetchMilestones();
    setOpenMilestones(updatedMilestones[0]);
    setCloseMilestones(updatedMilestones[1]);
  }, []);

  const fetchMilestones = () => Promise.all([sendMilestonesRequest("open"), sendMilestonesRequest("close")]);

  const { refetch } = useQuery("milestones", fetchMilestones);

  const handleOpenButtonClick = () => {
    toggleMilestoneState("open", milestoneId).then(() => {
      refetch().then(({ data }) => {
        if (data) {
          setOpenMilestones(data[0]);
          setCloseMilestones(data[1]);
        }
      });
    });
  };

  const handleCloseButtonClick = () => {
    toggleMilestoneState("close", milestoneId).then(() => {
      refetch().then(({ data }) => {
        if (data) {
          setOpenMilestones(data[0]);
          setCloseMilestones(data[1]);
        }
      });
    });
  };

  return (
    <>
      {isToEdit ? (
        <MilestoneEditBox
          type="edit"
          milestoneId={milestoneId}
          content={{ milestoneId, title, description, deadline, totalIssue, closedIssue, isClosed }}
          handleCancelClick={toggleEdit}
        />
      ) : (
        <Wrapper>
          <MilestoneBody>
            <TitleBox>
              <Title>
                <img src={milestoneIcon} />
                {title}
              </Title>
              <Deadline>
                <img src={calendarIcon} />
                {dateUtils.parseTimestampText(deadline)}
              </Deadline>
            </TitleBox>
            <Description>{description}</Description>
          </MilestoneBody>
          <MilestoneInfo>
            <ButtonWrapper>
              {isClosed ? (
                <EditButton onClick={handleOpenButtonClick}>
                  <img src={archieveIcon} />
                  열기
                </EditButton>
              ) : (
                <EditButton onClick={handleCloseButtonClick}>
                  <img src={archieveIcon} />
                  닫기
                </EditButton>
              )}
              <EditButton onClick={toggleEdit}>
                <img src={editIcon} />
                편집
              </EditButton>
              <DeleteButton onClick={handleDeleteClick}>
                <img src={deleteIcon} />
                삭제
              </DeleteButton>
            </ButtonWrapper>
            <ProgressBar>
              <Progress percentage={numberUtils.parsePercentage(closedIssue, totalIssue)}></Progress>
            </ProgressBar>
            <InfoTextWrapper>
              <span>{numberUtils.parsePercentage(closedIssue, totalIssue)}%</span>
              <IssueTextWrapper>
                <span>열린 이슈 {totalIssue - closedIssue}</span>
                <span>닫힌 이슈 {closedIssue}</span>
              </IssueTextWrapper>
            </InfoTextWrapper>
          </MilestoneInfo>
        </Wrapper>
      )}
    </>
  );
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
`;

const Title = styled.span`
  display: flex;
  gap: 0.5em;
  color: #14142b;
`;

const Deadline = styled.span`
  display: flex;
  gap: 0.5em;
  color: #6e7191;
`;

const Description = styled.span`
  color: #6e7191;
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
`;

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
  background-color: #eff0f6;
  overflow: hidden;
`;

const Progress = styled.div<{ percentage: string }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #007aff;
`;

const InfoTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6e7191;
`;

const IssueTextWrapper = styled.div`
  display: flex;
  gap: 0.7em;
`;

export default MilestoneDetail;

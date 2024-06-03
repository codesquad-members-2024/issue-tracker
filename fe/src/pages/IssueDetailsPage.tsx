import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import editIcon from "../assets/edit.svg";
import whiteEditIcon from "../assets/whiteEdit.svg";
import archiveIcon from "../assets/archive.svg";
import alertIcon from "../assets/alertCircle.svg";
import trashIcon from "../assets/trash.svg";
import { useParams } from "react-router-dom";
import useApi from "../hooks/api/useApi";
import { IssueDetails } from "../type/types";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/general/PageHeader";
import WrittenComment from "../components/comment/WrittenComment";
import CommentWriteArea from "../components/comment/CommentWriteArea";
import SideBar from "../components/general/SideBar";

export default function IssueDetailsPage() {
  const { currentUser } = useCurrentUser();
  const { issueId } = useParams<{ issueId: string }>();
  const {
    data: issueDetails,
    refetch: refetchIssueDetails,
    postData,
    patchData,
    deleteData,
  } = useApi<IssueDetails>(`/issue/${issueId}`);
  const [isTitleEditMode, setIsTitleEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!issueDetails) return null;
  const {
    title,
    id,
    is_open,
    created_At,
    reporter,
    comment,
    label,
    assignee,
    milestone,
  } = issueDetails;

  const openOrCloseIssue = async () => {
    const putPath = is_open ? "/issue/close" : "/issue/open";
    await patchData(`${putPath}`, { id: [id] });
    refetchIssueDetails();
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = async () => {
    const commentForm = {
      reporter: currentUser?.name,
      contents: commentText,
      issue_id: id,
    };
    await postData("/comment", commentForm);
    setCommentText("");
    refetchIssueDetails();
  };

  const handleInputAssignee = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const selectedAssignee = assignee ? assignee.map((item) => item.name) : [];
    if (selectedAssignee.includes(value)) {
      const newSelectedLabel = selectedAssignee.filter(
        (name) => name !== value
      );
      const bodyValue = { issue_id: id, name: newSelectedLabel };
      await patchData("/issue/assignee", bodyValue);
    } else {
      const newSelectedAssignee = [...selectedAssignee, value];
      const bodyValue = { issue_id: id, name: newSelectedAssignee };
      await patchData("/issue/assignee", bodyValue);
    }
    refetchIssueDetails();
  };

  const handleInputLabel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const selectedLabel = label ? label.map((item) => item.id) : [];
    if (selectedLabel.includes(value)) {
      const newSelectedLabel = selectedLabel.filter(
        (labelId) => labelId !== value
      );
      const bodyValue = { issue_id: id, label_id: newSelectedLabel };
      await patchData("/issue/label", bodyValue);
    } else {
      const newSelectedLabel = [...selectedLabel, value];
      const bodyValue = { issue_id: id, label_id: newSelectedLabel };
      await patchData("/issue/label", bodyValue);
    }
    refetchIssueDetails();
  };

  const handleInputMilestone = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = { issue_id: id, milestone_id: Number(e.target.value) };
    await patchData(`/issue/milestone`, value);
    refetchIssueDetails();
  };

  const handleDeleteIssue = async () => {
    await deleteData(`/issue/${id.toString()}`);
    navigate("/");
  };

  const handleTitleEdit = async () => {
    if (titleInputRef.current) {
      const newTitle = titleInputRef.current.value;
      await patchData(`/issue/title`, { id: id, title: newTitle });
      setIsTitleEditMode(false);
      refetchIssueDetails();
    }
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <PostInfo>
          <IssueTitleBox>
            {isTitleEditMode ? (
              <>
                <InputContainer $width={"78%"}>
                  <label>제목</label>
                  <input
                    ref={titleInputRef}
                    placeholder="마일스톤의 이름을 입력하세요"
                    defaultValue={title}
                  />
                </InputContainer>
                <IssueButtonsBox>
                  <TitleEditBtn onClick={() => setIsTitleEditMode(false)}>
                    X 편집 취소
                  </TitleEditBtn>
                  <CommentDoneButton onClick={handleTitleEdit}>
                    <img src={whiteEditIcon} alt="edit icon" />
                    편집 완료
                  </CommentDoneButton>
                </IssueButtonsBox>
              </>
            ) : (
              <>
                <IssueTitle>
                  {title}
                  <span>#{id}</span>
                </IssueTitle>
                <IssueButtonsBox>
                  <TitleEditBtn onClick={() => setIsTitleEditMode(true)}>
                    <img src={editIcon} alt="edit icon" />
                    제목 편집
                  </TitleEditBtn>
                  <OpenIssueBtn onClick={() => openOrCloseIssue()}>
                    <img src={archiveIcon} alt="archive icon" />
                    {is_open ? "이슈 닫기" : "이슈 열기"}
                  </OpenIssueBtn>
                </IssueButtonsBox>
              </>
            )}
          </IssueTitleBox>
          <StatesInfoBox>
            <InfoTag $color={is_open.toString()}>
              <CommonS.Center>
                <img src={alertIcon} alt="alert icon" />
                <span>{is_open ? "열린 이슈" : "닫힌 이슈"}</span>
              </CommonS.Center>
            </InfoTag>
            <OpenInfo>
              이 이슈가 {created_At}에 {reporter.name}에 의해 열렸습니다 ∙
              코멘트 {comment.length}개
            </OpenInfo>
          </StatesInfoBox>
        </PostInfo>
        <CommentAndSideBarContainer>
          <CommentContainer>
            {comment.map((commentObj) => {
              const { id } = commentObj;
              return (
                <WrittenComment
                  key={`comment-${id}`}
                  commentObj={commentObj}
                  issueReporter={reporter.name}
                />
              );
            })}
            <CommentWriteArea
              handleInputComment={handleInputComment}
              comment={commentText}
              height="160px"
            />
            <CommentDoneButtonContainer>
              <CommentDoneButton
                onClick={() => handleSubmitComment()}
                disabled={!commentText.trim()}
              >
                + 코멘트 작성
              </CommentDoneButton>
            </CommentDoneButtonContainer>
          </CommentContainer>
          <CommonS.ColumnFlex>
            <SideBar
              handleInputAssignee={handleInputAssignee}
              handleInputMilestone={handleInputMilestone}
              handleInputLabel={handleInputLabel}
              assigneeList={
                assignee ? assignee.map((userObj) => userObj.name) : []
              }
              selectedLabel={
                label ? label.map((labelObj) => labelObj.id.toString()) : []
              }
              selectedMilestone={milestone ? milestone.id.toString() : ""}
            />
            <DeleteButton onClick={() => handleDeleteIssue()}>
              <img src={trashIcon} alt="trash icon" />
              이슈 삭제
            </DeleteButton>
          </CommonS.ColumnFlex>
        </CommentAndSideBarContainer>
      </CommonS.Wrapper>
    </>
  );
}

const IssueTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const IssueTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;

  & span {
    margin: 0 8px;
    color: rgba(110, 113, 145, 1);
    font-weight: 700;
  }
`;

const IssueButtonsBox = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleEditBtn = styled.button`
  color: rgba(0, 122, 255, 1);
  border: 1px solid rgba(0, 122, 255, 1);
  padding: 0 16px;
  width: 128px;
  height: 40px;
  background-color: transparent;
  border-radius: 10px;
  & img {
    margin-right: 5px;
  }
`;

const OpenIssueBtn = styled(TitleEditBtn)`
  cursor: pointer;
  & img {
    filter: invert(30%) sepia(99%) saturate(2526%) hue-rotate(199deg)
      brightness(101%) contrast(105%);
  }
`;

const PostInfo = styled(CommonS.ColumnFlex)`
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  margin-bottom: 24px;
`;

const StatesInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoTag = styled(CommonS.Center)<{ $color: string }>`
  width: 101px;
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
  color: rgba(254, 254, 254, 1);
  background-color: ${({ $color }) =>
    $color === "true" ? "rgba(0, 122, 255, 1)" : "grey"};
  border-radius: 30px;

  & img {
    filter: invert(93%) sepia(100%) saturate(0%) hue-rotate(264deg)
      brightness(115%) contrast(99%);
    margin-right: 8px;
  }
`;

const OpenInfo = styled.p`
  color: rgba(110, 113, 145, 1);
  font-size: 16px;
  line-height: 24px;
  margin: 0 8px;
`;

const CommentAndSideBarContainer = styled(CommonS.SpaceBetween)``;

const CommentContainer = styled.div`
  width: 960px;
`;

const CommentDoneButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const CommentDoneButton = styled.button`
  background-color: rgba(0, 122, 255, 1);
  color: white;
  width: 128px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  &:disabled {
    opacity: 32%;
    cursor: not-allowed;
  }
  & img {
    margin-right: 8px;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: rgba(255, 59, 48, 1);
  font-size: 12px;
  padding: 0 16px;
  margin-top: 24px;
  cursor: pointer;
`;

const InputContainer = styled.div<{ $width: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.$width};
  height: 40px;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 12px;
  padding: 0 15px;

  & label {
    color: rgba(110, 113, 145, 1);
    font-size: 12px;
    width: 75px;
  }

  & input {
    border: none;
    background-color: transparent;
    width: 100%;
  }
`;

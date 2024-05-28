import styled from "styled-components";
import CreatorForm from "../new/CreatorForm";
import Sidebar from "../../extension/Sidebar";
import Comment from "./Comment";
import plusIcon from "../../../img/icon/plusIcon.svg";
import useCommentLogic from "../../../hooks/logics/useCommentLogic";

function DetailContent() {
  const { issueContent, commentRef, isCommentSubmitable, handleCommentChange, handleCommentSubmit } = useCommentLogic();
  const { author, comments, labels: labelResponses, milestone, assignees } = issueContent || {};

  return (
    <ContentWrapper>
      <CommentWrapper>
        {comments && comments.map((comment) => <Comment {...comment} isAuthor={comment.author === author} />)}
        <CreatorForm
          ref={commentRef}
          labelText="코멘트를 입력하세요."
          height={"184px"}
          onChange={handleCommentChange}
        />
        <SubmitButton isSubmitable={isCommentSubmitable} onClick={handleCommentSubmit}>
          <img src={plusIcon} /> 코멘트 작성
        </SubmitButton>
      </CommentWrapper>
      <Sidebar assignees={assignees} labelResponses={labelResponses} milestone={milestone} />
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  gap: 2em;
`;

const CommentWrapper = styled.div`
  width: calc(100% - 288px);
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1.5em;
`;

const SubmitButton = styled.button<{ isSubmitable: boolean }>`
  width: 10.7em;
  height: 3.3em;
  font-size: 0.75em;
  border: 1px solid #595959;
  border-radius: 1.3em;
  background-color: #595959;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isSubmitable }) => (isSubmitable ? "1" : "0.5")};
  transition: all 0.5s ease;
`;

export default DetailContent;

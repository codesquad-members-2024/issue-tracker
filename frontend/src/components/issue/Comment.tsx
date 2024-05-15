import styled from "styled-components";
import userIcon from "../../img/icon/userIcon.png";
import editIcon from "../../img/icon/editIcon.svg";
import smileIcon from "../../img/icon/smileIcon.svg";

function Comment() {
  return (
    <CommentTable>
      <InfoTab>
        <UserInfo>
          <img src={userIcon} />
          <UserName>schnee</UserName>
          <PublishedAt>3분 전</PublishedAt>
        </UserInfo>
        <ToggleWrapper>
          <AuthorTag><span>작성자</span></AuthorTag>
          <ToggleButton>
            <img src={editIcon} />
            <span>편집</span>
          </ToggleButton>
          <ToggleButton>
            <img src={smileIcon} />
            <span>반응</span>
          </ToggleButton>
        </ToggleWrapper>
      </InfoTab>
      <Content>이번 그룹 프로젝트에서 디자인 특징은 아래와 같습니다.</Content>
    </CommentTable>
  );
}

const CommentTable = styled.div`
  width: 100%;
  border: 1px solid #d9dbe9;
  border-radius: 0.725em;
  overflow: hidden;
`;

const InfoTab = styled.div`
  padding: 0 1em;
  height: 4em;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`

const UserName = styled.span`
  color: #4E4B66;
`

const PublishedAt = styled.span`
  color: #6E7191;
`

const ToggleWrapper = styled.div`
  height: 1.5em;
  display: flex;
  align-items: center;
  gap: 1em;
`

const AuthorTag = styled.div`
  height: 2em;
  padding: 0 0.66em;
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  color: #6E7191;
  background-color: #EFF0F6;
  border: 1px solid #D9DBE9;
  border-radius: 1em;
`

const ToggleButton = styled.button`
  height: 2.66em;
  padding: 0;
  font-size: 0.75em;
  display: flex;
  gap: 0.33em;
  align-items: center;
  background-color: transparent;
  border: none;
`

const Content = styled.div`
  box-sizing: border-box;
  padding: 1.5em;
  min-height: 4em;
  border-top: 1px solid #d9dbe9;
  background-color: #fff;
`

export default Comment;

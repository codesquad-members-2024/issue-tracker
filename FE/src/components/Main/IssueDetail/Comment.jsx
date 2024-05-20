import styled from "styled-components";
import { EditIcon } from "../../../icons/EditIcon";
import { SmileIcon } from "../../../icons/SmileIcon";

export function Comment({ selectedIssue, elapsedTime }) {
  return (
    <StyledComment>
      <Header>
        <Info>
          <img src="/img/frog.png" />
          <div>{selectedIssue.writer}</div>
          <div>{elapsedTime}</div>
        </Info>
        <Buttons>
          <div className="writer">작성자</div>
          <StyledCommentButton>
            <EditIcon />
            <div>편집</div>
          </StyledCommentButton>
          <StyledCommentButton>
            <SmileIcon />
            <div>반응</div>
          </StyledCommentButton>
        </Buttons>
      </Header>
      <Content></Content>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  border: solid #dadbe9;
  border-radius: 10px;
  width: 75%;
  height: 300px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  border-bottom: solid #dadbe9;
`;

const Info = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
  img {
    margin-right: 20px;
  }
  div {
    margin-left: 20px;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  .writer {
    margin-right: 20px;
    padding: 5px;
    border: solid #dadbe9;
    border-radius: 20px;
    background-color: #eff0f6;
  }
`;

const StyledCommentButton = styled.div`
  display: flex;
  div {
    margin: 0 30px 0 10px;
  }
`;

const Content = styled.div`
  height: 240px;
  background: white;
`;

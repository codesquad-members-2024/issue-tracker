import styled from "styled-components";
import { EditIcon } from "@/icons/EditIcon";
import { SmileIcon } from "@/icons/SmileIcon";
import { NewComment } from "./NewComment";

export function Comment({ selectedIssue, elapsedTime }) {
  return (
    <Wrap>
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
        <Content>
          <div> </div>
        </Content>
      </StyledComment>
      <NewComment />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 75%;
`;

const StyledComment = styled.div`
  border: solid #dadbe9;
  border-radius: 10px;
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
  min-height: 20px;
  background: white;
  padding: 20px;
`;

import styled from "styled-components";
import { EditIcon } from "@/icons/EditIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { labelsList } from "@/test.json";

export function LabelsContent() {
  return (
    <Wrap>
      <LabelsHeader>{labelsList.length}개의 레이블</LabelsHeader>
      <LabelsList>
        {labelsList.length === 0 ? (
          <Content />
        ) : (
          labelsList.map((label) => (
            <Content key={label.id}>
              <div className="label">
                <StyledLabel $backcolor={label.color} color={label.font_color}>
                  {label.title}
                </StyledLabel>
              </div>
              <div className="description">
                <div>{label.description}</div>
              </div>
              <Buttons>
                <Button>
                  <EditIcon />
                  <div>편집</div>
                </Button>
                <Button className="delete">
                  <TrashIcon />
                  <div>삭제</div>
                </Button>
              </Buttons>
            </Content>
          ))
        )}
      </LabelsList>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
`;

const LabelsHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const LabelsList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Content = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-top: solid #dadbef;
  padding-left: 25px;
  .label {
    width: 10%;
  }
  .description {
    width: 70%;
  }
`;

const StyledLabel = styled.span`
  background-color: ${({ $backcolor }) => $backcolor};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: ${({ color }) => color};
`;

const Buttons = styled.div`
  display: flex;
  padding-right: 25px;
  cursor: pointer;
  .delete {
    padding-left: 20px;
    color: red;
  }
`;

const Button = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  cursor: pointer;
`;

import styled from "styled-components";
import { ContentNavStyles } from "@/styles/commonStyles";
import { useState } from "react";

export function NewLabels({ closeNewLabels }) {
  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("");

  return (
    <>
      <Wrap>
        <h3>새로운 레이블 추가</h3>
        <Content>
          <Preview>
            <StyledLabel $backgroundColor={labelColor}>{labelName}</StyledLabel>
          </Preview>
          <LabelDescript>
            <LabelWrapper>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                value={labelName}
                placeholder="레이블의 이름을 입력하세요"
                onChange={(e) => setLabelName(e.target.value)}
              />
            </LabelWrapper>
            <LabelWrapper>
              <label htmlFor="description">설명(선택)</label>
              <input
                type="text"
                id="description"
                placeholder="레이블에 대한 설명을 입력하세요"
              />
            </LabelWrapper>
            <ColorWrapper>
              <label htmlFor="backgroundcolor">색상</label>
              <input
                type="text"
                id="backgroundcolor"
                value={labelColor}
                onChange={(e) => setLabelColor(e.target.value)}
              />
            </ColorWrapper>
          </LabelDescript>
        </Content>
        <Buttons>
          <CancelButton onClick={closeNewLabels}>x 취소</CancelButton>
          <CompleteButton>+ 완료</CompleteButton>
        </Buttons>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  height: 330px;
  display: flex;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  padding: 0 30px;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Preview = styled.div`
  width: 20%;
  height: 150px;
  display: flex;
  border: solid #dadbef;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.span`
  background-color: ${(props) => props.$backgroundColor || "white"};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  border: solid #dadbef;
  color: black;
  height: 17px;
`;

const LabelDescript = styled.div`
  width: 75%;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px 20px;
  border-radius: 10px;
  padding: 10px;
  background-color: #eff0f6;

  label {
    width: 80px;
  }
  input {
    width: 90%;
    border: none;
    background-color: unset;
    font-size: 15px;
  }
`;

const ColorWrapper = styled(LabelWrapper)`
  width: 250px;
  input {
    width: 65%;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const CancelButton = styled.div`
  ${ContentNavStyles}
  background-color: unset;
  color: #007bff;
  border-radius: 10px;
  border: solid #007bff;
  width: 120px;
  height: 40px;
`;

const CompleteButton = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
  height: 40px;
`;

import styled from "styled-components";
import { ContentNavStyles } from "@/styles/commonStyles";
import { useState, useEffect } from "react";
import { DropdownIcon } from "@/icons/DropdownIcon";

const getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

export function NewLabels(props) {
  const { postData, fetchData, putData, actionType, closeNewLabels, labelId, initialData } = props;

  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("");
  const [labelDescription, setLabelDescription] = useState("");
  const [labelFontColor, setLabelFontColor] = useState("black");

  useEffect(() => {
    if (actionType === "updateIssue" && initialData) {
      const { title, color, description, fontColor } = initialData;
      setLabelName(title);
      setLabelColor(color);
      setLabelDescription(description);
      setLabelFontColor(fontColor);
    }
  }, [initialData]);

  const toggleFontColor = () => setLabelFontColor((prev) => (prev === "black" ? "white" : "black"));
  const toggleBackgroundColor = () => setLabelColor(getRandomColor);

  const fontColor = labelFontColor === "black" ? "어두운 글자색" : "밝은 글자색";

  const handleSubmit = async () => {
    const newLabel = {
      title: labelName,
      description: labelDescription,
      color: labelColor,
      fontColor: labelFontColor,
    };

    actionType == "createIssue" ? await postData(newLabel) : await putData(labelId, newLabel);
    closeNewLabels();
    fetchData();
  };

  return (
    <>
      <Wrap $actionType={actionType}>
        <h3>{actionType === "createIssue" ? "새로운 레이블 추가" : "레이블 편집"}</h3>
        <Content>
          <Preview>
            <StyledLabel $backgroundColor={labelColor} color={labelFontColor}>
              {labelName}
            </StyledLabel>
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
                value={labelDescription}
                placeholder="레이블에 대한 설명을 입력하세요"
                onChange={(e) => setLabelDescription(e.target.value)}
              />
            </LabelWrapper>
            <ColorWraper>
              <StyledColor>
                <label htmlFor="backgroundcolor">색상</label>
                <input
                  type="text"
                  id="backgroundcolor"
                  value={labelColor}
                  onChange={(e) => setLabelColor(e.target.value)}
                />
              </StyledColor>
              <RandomBtn color={labelColor} onClick={toggleBackgroundColor}></RandomBtn>
              <button className="font" onClick={toggleFontColor}>{fontColor}<DropdownIcon /></button>
            </ColorWraper>
          </LabelDescript>
        </Content>
        <Buttons>
          <CancelButton onClick={closeNewLabels}>x 취소</CancelButton>
          <CompleteButton onClick={handleSubmit}>+ 완료</CompleteButton>
        </Buttons>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  margin: ${(props) => (props.$actionType === "updateIssue" ? "0" : "20px 100px")};
  border: ${(props) => (props.$actionType === "updateIssue" ? "none" : "solid #dadbef")};
  height: 330px;
  display: flex;
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
  color: ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  border: solid #dadbef;
  align-content: center;
  min-width: 20px;
  height: 20px;
`;

const LabelDescript = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5em;
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

const StyledColor = styled(LabelWrapper)`
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

const ColorWraper = styled.div`
  display: flex;
  button {
    margin: 0.5em;
    cursor: pointer;
    font-size: 18px;
    border-radius: 20px;
  }
  .font {
    background-color: white;
    padding: 0 20px;
    border: none;
  }
`;

const RandomBtn = styled.button`
  background-color : white;
  background-${(color) => color};
  border: solid #dadbef;
  width: 40px;
`;

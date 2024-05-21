import styled from "styled-components";
import LabelHeader from "./LabelHeader";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import { sendLabelsRequest } from "../../api/LabelAPI";
import LabelDetail, { LabelDetailProps } from "./LabelDetail";
import LabelEditBox from "./LabelEditBox";

function LabelList() {
  const [labels, setLabels] = useState([]);
  const [isAddable, setIsAddable] = useState(true);

  useEffect(() => {
    sendLabelsRequest().then((data) => setLabels(data));
  }, []);

  return (
    <Wrapper>
      <Header />
      <LabelHeader />
      {isAddable && (<LabelEditBox />)}
      <LabelTable>
        <LabelTab>
          <span>{labels.length}개의 레이블</span>
        </LabelTab>
        <ScrollableArea>
          {labels.map((label: LabelDetailProps) => (
            <LabelDetail {...label} />
          ))}
        </ScrollableArea>
      </LabelTable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const LabelTable = styled.div`
  width: 80em;
  border: 1px solid #d9dbe9;
  border-radius: 0.725em;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LabelTab = styled.div`
  width: 100%;
  height: 4em;
  padding: 0 2em;
  box-sizing: border-box;
  background-color: #eff0f6;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9dbe9;
  font-weight: 700;
`;

const ScrollableArea = styled.div`
  overflow-y: scroll;
  height: calc(100% - 4em);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default LabelList;

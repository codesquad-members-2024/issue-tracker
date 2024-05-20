import { useState } from "react";
import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { ContentNavStyles } from "@/styles/commonStyles";
import { LabelsContent } from "./LabelsContent";
import { NavTabs } from "../common/NavTabs";
import { NewLabels } from "./NewLabels";

export function Labels() {
  const [showNewLabels, setShowNewLabels] = useState(false);

  const handleNewLabels = () => {
    setShowNewLabels(true);
  };
  
  const closeNewLabels = () => {
    setShowNewLabels(false);
  };

  return (
    <>
      <Header />
      <Nav>
        <NavTabs />
        <LabelsBtn onClick={handleNewLabels}>
          <div>+ 레이블 추가</div>
        </LabelsBtn>
      </Nav>
      {showNewLabels && <NewLabels closeNewLabels={closeNewLabels}/>}
      <LabelsContent />
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  height: 40px;
`;

const LabelsBtn = styled.div`
  ${ContentNavStyles}
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  width: 120px;
`;

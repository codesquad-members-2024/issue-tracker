import { useState } from "react";
import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { ContentNavStyles } from "@/styles/commonStyles";
import { LabelsContent } from "./LabelsContent";
import { NavTabs } from "../common/NavTabs";
import { NewLabels } from "./NewLabels";
import useFetch from "../../hooks/useFetch";

export function Labels() {
  const { state: labels, loading, error, fetchData, postData, putData, deleteData } = useFetch(`${import.meta.env.VITE_SERVER}/labels`);
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
      {showNewLabels && <NewLabels {...{ closeNewLabels, fetchData, postData }} type="new" />}
      <LabelsContent {...{ labels, loading, error, fetchData, putData, deleteData }} />
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

import { useState } from "react";
import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { ContentNavStyles } from "@/styles/commonStyles";
import { LabelsContent } from "./LabelsContent";
import { NavTabs } from "../common/NavTabs";
import { NewLabels } from "./NewLabels";
import useFetch from "../../hooks/useFetch";

const { VITE_SERVER } = import.meta.env;
const LABELS_API = "/api/labels";

export function Labels() {
  const { state: labels, loading, error, fetchData, postData, putData, deleteData } = useFetch(`${VITE_SERVER}${LABELS_API}`);

  const [showNewLabels, setShowNewLabels] = useState(false);

  return (
    <>
      <Header />
      <Nav>
        <NavTabs />
        <LabelsBtn onClick={() => setShowNewLabels(true)}>
          <div>+ 레이블 추가</div>
        </LabelsBtn>
      </Nav>
      {showNewLabels && (
        <NewLabels
          {...{ fetchData, postData }}
          closeNewLabels={() => setShowNewLabels(false)}
          actionType="createLabels"
        />
      )}
      <LabelsContent{...{ labels, loading, error, fetchData, putData, deleteData }}/>
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

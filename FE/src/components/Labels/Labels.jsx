import styled from "styled-components";
import { Header } from "../Main/IssuesList/Header";
import { ContentNavStyles } from "../../styles/commonStyles";
import { LabelsContent } from "./LabelsContent";
import { NavTabs } from "../common/NavTabs";

export function Labels() {
  return (
    <>
      <Header />
      <Nav>
        <NavTabs />
        <LabelsBtn>
          <div>+ 레이블 작성</div>
        </LabelsBtn>
      </Nav>
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

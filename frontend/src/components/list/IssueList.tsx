import styled from "styled-components";
import IssueTab from "./IssueTab";

function IssueList() {
  return (
    <Wrapper>
      <IssueTab />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1280px;
  margin-top: 1.5em;
  border: 1px solid #D9DBE9;
  border-radius: 0.725em;
  overflow: hidden;
`;

export default IssueList;

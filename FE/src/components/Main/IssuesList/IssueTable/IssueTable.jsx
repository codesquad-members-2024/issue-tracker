import styled from "styled-components";
import { useState } from "react";
import { IssueTableHeader } from "./IssueTableHeader";
import { IssueTableContent } from "./IssueTableContent";
import useFetch from "../../../../hooks/useFetch";
import API_ENDPOINTS from "@/config/config";

export function IssueTable(props) {
  const { issues, fetchData: fetchOpenIssues } = props;
  const { state: closedIssues, fetchData: fetchClosedIssues } = useFetch(`${API_ENDPOINTS.closeIssues}`);

  const [checkedCount, setCheckedCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isOpenIssues, setIsOpenIssues] = useState(true);

  const issuesToDisplay = isOpenIssues ? issues : closedIssues;

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const handleIssueCheckboxChange = (issueId) => {
    setCheckedItems((prevItems) => {
      const updatedItems = new Set(prevItems);
      updatedItems.has(issueId) ? updatedItems.delete(issueId) : updatedItems.add(issueId);
      setCheckedCount(updatedItems.size);
      setIsChecked(updatedItems.size > 0); // Check 되면 이슈선택 Header로 변경
      return updatedItems;
    });
  };

  return (
    <StyledDiv>
      <IssueTableHeader
        checkedCount={checkedCount}
        isChecked={isChecked} onCheckedChange={handleCheckboxChange}
        isOpenIssues={isOpenIssues} setIsOpenIssues={setIsOpenIssues}
        openIssueCount={issues?.length}
        closedIssueCount={closedIssues?.length}
        {...{fetchOpenIssues, fetchClosedIssues}}
      />
      <IssueTableContent
        checkedItems={checkedItems}
        onIssueCheckboxChange={handleIssueCheckboxChange}
        issues={issuesToDisplay}
      />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
  border: solid #dadbef;
  border-radius: 10px;
  overflow: hidden;
`;

import styled from "styled-components";
import { useState } from "react";
import { IssueTableHeader } from "./IssueTableHeader";
import { IssueTableContent } from "./IssueTableContent";

export function IssueTable() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const handleIssueCheckboxChange = (issueId) => {
    setCheckedItems((prevItems) => {
      const updatedItems = new Set(prevItems);
      updatedItems.has(issueId) ? updatedItems.delete(issueId) : updatedItems.add(issueId);
      setCheckedCount(updatedItems.size);
      return updatedItems;
    });
  };

  return (
    <StyledDiv>
      <IssueTableHeader
        checkedCount={checkedCount}
        isChecked={isChecked}
        onCheckedChange={handleCheckboxChange}
      />
      <IssueTableContent
        checkedItems={checkedItems}
        onIssueCheckboxChange={handleIssueCheckboxChange}
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

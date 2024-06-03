import styled from "styled-components";
import { DropdownContainer } from "@/components/common/Dropdown/DropdownContainer";

const assigneePopupItems = [{ id: "no_assignee", label: "담당자가 없는 이슈" }];
const labelPopupItems = [{ id: "no_label", label: "레이블이 없는 이슈" },{ id: "bug", label: "bug" }];
const milestonesPopupItems = [{ id: "no_milestones", label: "마일스톤이 없는 이슈" },];

const headerFilters = [
  { id: "assignee", label: "담당자", items: assigneePopupItems },
  { id: "label", label: "레이블", items: labelPopupItems },
  { id: "milestones", label: "마일스톤", items: milestonesPopupItems },
];

export function RightPanel() {
  return (
    <StyledRightPanel>
      {headerFilters.map(({ id, label, items }) => (
        <SideBar key={id}>
          <DropdownContainer id={id} label={label} items={items} />
        </SideBar>
      ))}
    </StyledRightPanel>
  );
}

const StyledRightPanel = styled.div`
  width: 22%;
  border: solid #dadbe9;
  border-radius: 10px;
  background: white;
  height: fit-content;
`;

const SideBar = styled.div`
  border-bottom: solid #dadbe9;
  padding: 10px 20px 100px 10px;
  &:last-child {
    border-bottom: none; // 마일스톤 bottom
  }
`;

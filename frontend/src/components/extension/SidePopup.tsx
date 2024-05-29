import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Label, Milestone } from "../../hooks/stores/useIssueStore";
import { updateAssigneesInIssue, updateLabelsInIssue, updateMilestoneInIssue } from "../../api/IssueAPI";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

type PopupType = "assignee" | "label" | "milestone";

interface SidePopupProps {
  popupType: PopupType;
  items?: string[] | Label[] | Milestone[];
  selectedItems: string[] | Label[] | Milestone[];
}

const HEADER_NAME = {
  assignee: "담당자",
  label: "레이블",
  milestone: "마일스톤",
};

const TITLE_KEY = {
  label: "labelName",
  milestone: "title",
};

const isRefObject = (ref: any): ref is React.MutableRefObject<HTMLDivElement | null> => {
  return "current" in ref;
};

const isChecked = (item: any, selectedItem: any): boolean => {
  if (!item || !selectedItem) return false;
  if (typeof item === "string" && typeof selectedItem === "string") return item === selectedItem;

  const { milestoneId: itemMilestoneId, labelId: itemLabelId } = item;
  const { milestoneId: selectedItemMilestoneId, labelId: selectedItemLabelId } = selectedItem;

  if (itemLabelId && selectedItemLabelId) return itemLabelId === selectedItemLabelId;
  if (itemMilestoneId && selectedItemMilestoneId) return itemMilestoneId === selectedItemMilestoneId;

  return false;
};

const renderSelectOption = (
  option: string,
  isChecked: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <SelectOption key={option}>
    <span>{option}</span>
    <input type="checkbox" checked={isChecked} onChange={onChange} />
  </SelectOption>
);

const getOptionName = (item: string | object, popupType: PopupType): string => {
  if (typeof item === "string") {
    return item;
  }

  switch (popupType) {
    case "assignee":
      return JSON.stringify(item);
    case "label":
    case "milestone":
      return item[TITLE_KEY[popupType] as keyof typeof item];
    default:
      return "";
  }
};

const renderOptions = (
  popupType: PopupType,
  items: string[] | object[] | undefined,
  selectedItems: any[],
  onItemChange: (item: any) => void
) => (
  <ScrollableArea>
    {items?.map((item) => {
      const optionName = getOptionName(item, popupType);
      const isCheckedItem = selectedItems.some((selectedItem) => isChecked(item, selectedItem));
      return renderSelectOption(optionName, isCheckedItem, () => onItemChange(item));
    })}
  </ScrollableArea>
);

const SidePopup = React.forwardRef<HTMLDivElement, SidePopupProps>((props, ref) => {
  const client = useQueryClient();
  const { popupType, items, selectedItems } = props;
  const [checkedItems, setCheckedItems] = useState<any[]>(selectedItems);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const { issueId } = useParams<{ issueId: string }>();

  const handleItemChange = (item: any) => {
    setCheckedItems((prevCheckedItems) => {
      const isCheckedItem = prevCheckedItems.some((checkedItem) => isChecked(item, checkedItem));
      if (isCheckedItem) {
        return prevCheckedItems.filter((checkedItem) => !isChecked(item, checkedItem));
      } else {
        return [...prevCheckedItems, item];
      }
    });
  };

  useEffect(() => {
    return () => {
      if (prevRef.current && isRefObject(ref) && !ref.current) {
        let requestItems;
        if (issueId) {
          switch (popupType) {
            case "assignee":
              requestItems = checkedItems;
              updateAssigneesInIssue(issueId, requestItems).then(() => client.invalidateQueries(`issue-${issueId}`));
              break;
            case "label":
              requestItems = checkedItems.filter((item) => item).map(({ labelId }) => labelId);
              updateLabelsInIssue(issueId, requestItems).then(() => client.invalidateQueries(`issue-${issueId}`));
              break;
            case "milestone":
              requestItems = checkedItems.filter((item) => item).map(({ milestoneId }) => milestoneId);
              updateMilestoneInIssue(issueId, requestItems[0]).then(() => client.invalidateQueries(`issue-${issueId}`));
              break;
            default:
              return;
          }
        }
      }

      if (isRefObject(ref) && prevRef.current !== ref.current) prevRef.current = ref.current;
    };
  }, [ref, checkedItems]);

  return (
    <Wrapper ref={ref}>
      <div>
        <Header>{HEADER_NAME[popupType]} 설정</Header>
        {renderOptions(popupType, items, checkedItems, handleItemChange)}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 5.125em;
  left: 1em;
  width: 15em;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9dbe9;
  border-radius: 1em;
  overflow: hidden;
  z-index: 100;
`;

const ScrollableArea = styled.div`
  max-height: 30em;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  width: calc(100% - 2.666em);
  height: 2.666em;
  padding: 0 1.333em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
  background-color: #eff0f6;
  color: #6e7191;
  border-bottom: 1px solid #d9dbe9;
`;

const SelectOption = styled.div`
  height: 2.75em;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fefefe;
  color: #4e4b66;
  border-top: 1px solid #d9dbe9;
`;

export default SidePopup;

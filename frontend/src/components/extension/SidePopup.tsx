import React from "react";
import styled from "styled-components";
import useSidePopupLogic, { PopupType, SidePopupProps } from "../../hooks/logics/useSidePopupLogic";

const HEADER_NAME = {
  assignee: "담당자",
  label: "레이블",
  milestone: "마일스톤",
};

const TITLE_KEY = {
  label: "labelName",
  milestone: "title",
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
  <SelectOption key={option} onClick={() => onChange({ target: { checked: !isChecked } } as React.ChangeEvent<HTMLInputElement>)}>
    <span>{option}</span>
    <input type="checkbox" checked={isChecked} />
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
      return item && item[TITLE_KEY[popupType] as keyof typeof item];
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
  const { popupType, items } = props;
  const { checkedItems, handleItemChange } = useSidePopupLogic(props, ref);

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
  cursor: pointer;

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

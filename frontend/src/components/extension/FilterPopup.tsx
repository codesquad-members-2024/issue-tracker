import { CSSProperties, Dispatch, SetStateAction, forwardRef, useState } from "react";
import styled from "styled-components";
import useIssueStore from "../../hooks/stores/useIssueStore";

type FilterType = "aboutMe" | "assignee" | "label" | "milestone" | "author";

interface FilterbarProps {
  filterType: FilterType;
  items?: string[] | object[];
  customStyle?: CSSProperties;
}

const HEADER_NAME = {
  aboutMe: "이슈",
  assignee: "담당자",
  label: "레이블",
  milestone: "마일스톤",
  author: "작성자",
};

const TITLE_KEY = {
  label: "labelName",
  milestone: "title",
};

const handleCheckboxChange = (
  option: string,
  isChecked: boolean,
  setCheckedItems: Dispatch<SetStateAction<string[]>>
) => {
  setCheckedItems((prev) => (isChecked ? [...prev, option] : prev.filter((item) => item !== option)));
};

const renderSelectOption = (option: string, filterType: FilterType) => {
  // const {} = useIssueStore();

  return (
    <SelectOption key={option}>
      <span>{option}</span>
      <input type="checkbox" />
    </SelectOption>
  );
};

const getOptionName = (item: string | object, filterType: FilterType): string => {
  if (typeof item === "string") {
    return item;
  }

  switch (filterType) {
    case "assignee":
    case "author":
      return JSON.stringify(item);
    case "label":
    case "milestone":
      return (item as any)[TITLE_KEY[filterType]];
    default:
      return "";
  }
};

const renderOptions = (
  filterType: FilterType,
  items: string[] | object[] | undefined
) => {
  if (filterType !== "aboutMe") {
    return (
      <ScrollableArea>
        {renderSelectOption(`${HEADER_NAME[filterType]}이/가 없는 이슈`, filterType)}
        {items?.map((item, index) => {
          const optionName = getOptionName(item, filterType);
          return renderSelectOption(optionName, filterType);
        })}
      </ScrollableArea>
    );
  }

  return (
    <>
      {renderSelectOption("내가 작성한 이슈", filterType)}
      {renderSelectOption("나에게 할당된 이슈", filterType)}
      {renderSelectOption("열린 이슈", filterType)}
      {renderSelectOption("내가 댓글을 남긴 이슈", filterType)}
      {renderSelectOption("닫힌 이슈", filterType)}
    </>
  );
};

const FilterPopup = forwardRef<HTMLDivElement, FilterbarProps>((props, ref) => {
  const { filterType, items, customStyle } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleChange = (option: string, isChecked: boolean) => {
    handleCheckboxChange(option, isChecked, setCheckedItems);
  };

  return (
    <Wrapper ref={ref} customStyle={customStyle} style={customStyle}>
      <div>
        <Header>{HEADER_NAME[filterType]} 필터</Header>
        {renderOptions(filterType, items)}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div<{ customStyle?: CSSProperties }>`
  position: absolute;
  ${({ customStyle }) =>
    customStyle
      ? ""
      : `
    top: 2.75em;
    left: -9em;
  `}
  width: 15em;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9dbe9;
  border-radius: 1em;
  overflow: hidden;
  z-index: 100;
  background-color: white;
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

export default FilterPopup;

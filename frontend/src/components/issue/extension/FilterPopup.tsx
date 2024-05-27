import React from "react";
import styled from "styled-components";

type FilterType = "aboutMe" | "assginee" | "label" | "milestone" | "author";

interface FilterbarProps {
  filterType: FilterType;
  items?: string[] | object[];
}

const HEADER_NAME = {
  aboutMe: "이슈",
  assginee: "담당자",
  label: "레이블",
  milestone: "마일스톤",
  author: "작성자",
};

const TITLE_KEY = {
  label: "labelName",
  milestone: "title",
};

const FilterPopup = React.forwardRef<HTMLDivElement, FilterbarProps>((props, ref) => {
  const { filterType, items } = props;

  return (
    <Wrapper ref={ref}>
      <div>
        <Header>{HEADER_NAME[filterType]} 필터</Header>
        {filterType === "aboutMe" ? (
          <>
            <SelectOption>
              <span>내가 작성한 이슈</span>
              <input type="radio" />
            </SelectOption>
            <SelectOption>
              <span>나에게 할당된 이슈</span>
              <input type="radio" />
            </SelectOption>
            <SelectOption>
              <span>열린 이슈</span>
              <input type="radio" />
            </SelectOption>
            <SelectOption>
              <span>내가 댓글을 남긴 이슈</span>
              <input type="radio" />
            </SelectOption>
            <SelectOption>
              <span>닫힌 이슈</span>
              <input type="radio" />
            </SelectOption>
          </>
        ) : (
          <ScrollableArea>
            <SelectOption>
              <span>{HEADER_NAME[filterType]}이/가 없는 이슈</span>
              <input type="radio" />
            </SelectOption>
            {items?.map((item) => (
              <SelectOption>
                <span>
                  {typeof item === "string"
                    ? item
                    : filterType === "assginee" || filterType === "author"
                      ? JSON.stringify(item)
                      : item[TITLE_KEY[filterType] as keyof typeof item]}
                </span>
                <input type="radio" />
              </SelectOption>
            ))}
          </ScrollableArea>
        )}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 2.75em;
  left: -9em;
  width: 15em;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9dbe9;
  border-radius: 1em;
  overflow: hidden;
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

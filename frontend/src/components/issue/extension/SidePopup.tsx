import React from "react";
import styled from "styled-components";

type PopupType = "assignee" | "label" | "milestone";

interface SidePopupProps {
  popupType: PopupType;
  items?: string[] | object[];
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

const SidePopup = React.forwardRef<HTMLDivElement, SidePopupProps>((props, ref) => {
  const { popupType, items } = props;

  return (
    <Wrapper ref={ref}>
      <div>
        <Header>{HEADER_NAME[popupType]} 설정</Header>
        <ScrollableArea>
          {items?.map((item) => (
            <SelectOption>
              {typeof item === "string"
                ? item
                : popupType === "assignee"
                  ? JSON.stringify(item)
                  : item[TITLE_KEY[popupType] as keyof typeof item]}
            </SelectOption>
          ))}
        </ScrollableArea>
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

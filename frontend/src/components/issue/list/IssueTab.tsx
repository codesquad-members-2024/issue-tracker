import styled from "styled-components";
import openedIssueIcon from "../../../img/icon/openedIssueIcon_dark.svg";
import closedIssueIcon from "../../../img/icon/closedIssueIcon_dark.svg";
import arrowBottom from "../../../img/icon/arrowBottom.svg";
import useIssueStore from "../../../hooks/stores/useIssueStore";
import { IssueType } from "../../../hooks/logics/useIssueListLogic";
import { useEffect, useRef, useState } from "react";
import FilterPopup from "../../extension/FilterPopup";

type FilterBarKeys = "assignee" | "label" | "milestone" | "author";

export interface IssueTabProps {
  focusedTab: string;
  handleFocusedTabClick: (tabDescription: IssueType) => void;
}

function IssueTab({ focusedTab, handleFocusedTabClick }: IssueTabProps) {
  const { openIssueCount, closeIssueCount, labels, milestones, users } = useIssueStore();

  const [filterbarVisible, setFilterbarVisible] = useState<Record<FilterBarKeys, boolean>>({
    assignee: false,
    label: false,
    milestone: false,
    author: false,
  });

  const filterbarRefs = {
    assignee: useRef<HTMLDivElement>(null),
    label: useRef<HTMLDivElement>(null),
    milestone: useRef<HTMLDivElement>(null),
    author: useRef<HTMLDivElement>(null),
  };

  const handleRightMenuClick = (menu: FilterBarKeys) => {
    setFilterbarVisible((prev) => ({
      ...prev,
      [menu]: !prev[menu as FilterBarKeys],
    }));
  };

  const handleClickOutside = ({ target }: Event) => {
    Object.keys(filterbarRefs).forEach((key) => {
      const ref = filterbarRefs[key as FilterBarKeys];
      if (ref.current && !ref.current.contains(target as Node)) {
        setFilterbarVisible((prev) => ({
          ...prev,
          [key]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <LeftMenus>
        <input type="checkbox" />
        <LeftMenu>
          <img src={openedIssueIcon} />
          <IssueMenuText isFocused={focusedTab === "open"} onClick={() => handleFocusedTabClick("open")}>
            열린 이슈({openIssueCount})
          </IssueMenuText>
        </LeftMenu>
        <LeftMenu>
          <img src={closedIssueIcon} />
          <IssueMenuText isFocused={focusedTab === "close"} onClick={() => handleFocusedTabClick("close")}>
            닫힌 이슈({closeIssueCount})
          </IssueMenuText>
        </LeftMenu>
      </LeftMenus>
      <RightMenus>
        <RightMenu>
          <MenuWrapper onClick={() => handleRightMenuClick("assignee")}>
            <span>담당자</span>
            <img src={arrowBottom} />
          </MenuWrapper>
          {filterbarVisible.assignee && (
            <FilterPopup
              ref={filterbarRefs.assignee}
              filterType="assignee"
              onClose={() => handleRightMenuClick("assignee")}
              items={users}
            />
          )}
        </RightMenu>
        <RightMenu>
          <MenuWrapper onClick={() => handleRightMenuClick("label")}>
            <span>레이블</span>
            <img src={arrowBottom} />
          </MenuWrapper>
          {filterbarVisible.label && (
            <FilterPopup
              ref={filterbarRefs.label}
              filterType="label"
              onClose={() => handleRightMenuClick("label")}
              items={labels}
            />
          )}
        </RightMenu>
        <RightMenu>
          <MenuWrapper onClick={() => handleRightMenuClick("milestone")}>
            <span>마일스톤</span>
            <img src={arrowBottom} />
          </MenuWrapper>
          {filterbarVisible.milestone && (
            <FilterPopup
              ref={filterbarRefs.milestone}
              filterType="milestone"
              onClose={() => handleRightMenuClick("milestone")}
              items={milestones}
            />
          )}
        </RightMenu>
        <RightMenu>
          <MenuWrapper onClick={() => handleRightMenuClick("author")}>
            <span>작성자</span>
            <img src={arrowBottom} />
          </MenuWrapper>
          {filterbarVisible.author && (
            <FilterPopup
              ref={filterbarRefs.author}
              filterType="author"
              onClose={() => handleRightMenuClick("author")}
              items={users}
            />
          )}
        </RightMenu>
      </RightMenus>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 4em;
  padding: 0 2em;
  box-sizing: border-box;
  background-color: #eff0f6;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9dbe9;
`;

const LeftMenus = styled.div`
  display: flex;
  gap: 1.5em;
  justify-content: space-between;
  align-items: center;
`;

const LeftMenu = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
  align-items: center;
`;

const IssueMenuText = styled.span<{ isFocused: boolean }>`
  height: 1em;
  color: ${({ isFocused }) => (isFocused ? "#14142B" : "#4E4B66")};
  font-weight: ${({ isFocused }) => (isFocused ? 700 : 500)};
`;

const RightMenus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;

const RightMenu = styled.div`
  position: relative;
`;

const MenuWrapper = styled.div`
  display: flex;
  gap: 1.5em;
  color: #4e4b66;
  cursor: pointer;
`;

export default IssueTab;

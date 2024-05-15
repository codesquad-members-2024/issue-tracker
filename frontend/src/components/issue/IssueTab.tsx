import styled from "styled-components";
import openedIssueIcon from "../../img/icon/openedIssueIcon.svg";
import closedIssueIcon from "../../img/icon/closedIssueIcon.svg";
import arrowBottom from "../../img/icon/arrowBottom.svg";
import useIssueStore from "../../hooks/useIssueStore";
import { Dispatch, SetStateAction } from "react";
import { IssueType } from "./IssueList";

export interface IssueTabProps {
  focusedTab: string;
  setFocusedTab: Dispatch<SetStateAction<IssueType>>;
}

function IssueTab({ focusedTab, setFocusedTab }: IssueTabProps) {
  const { issues } = useIssueStore();
  const openIssueCount = issues.filter(({ isClosed }) => !isClosed).length;
  const closeIssueCount = issues.length - openIssueCount;

  return (
    <Wrapper>
      <LeftMenus>
        <input type="checkbox" />
        <LeftMenu>
          <img src={openedIssueIcon} />
          <IssueMenuText isFocused={focusedTab === "open"} onClick={() => setFocusedTab("open")}>
            열린 이슈({openIssueCount})
          </IssueMenuText>
        </LeftMenu>
        <LeftMenu>
          <img src={closedIssueIcon} />
          <IssueMenuText isFocused={focusedTab === "closed"} onClick={() => setFocusedTab("closed")}>
            닫힌 이슈({closeIssueCount})
          </IssueMenuText>
        </LeftMenu>
      </LeftMenus>
      <RightMenus>
        <RightMenu>
          <span>담당자</span>
          <img src={arrowBottom} />
        </RightMenu>
        <RightMenu>
          <span>레이블</span>
          <img src={arrowBottom} />
        </RightMenu>
        <RightMenu>
          <span>마일스톤</span>
          <img src={arrowBottom} />
        </RightMenu>
        <RightMenu>
          <span>작성자</span>
          <img src={arrowBottom} />
        </RightMenu>
      </RightMenus>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 4em;
  padding: 0 2em;
  background-color: #eff0f6;
  display: flex;
  justify-content: space-between;
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
  display: flex;
  gap: 1.5em;
  color: #4e4b66;
`;

export default IssueTab;

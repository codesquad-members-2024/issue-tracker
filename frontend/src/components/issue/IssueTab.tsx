import styled from "styled-components";
import openedIssueIcon from "../../img/icon/openedIssueIcon.svg";
import closedIssueIcon from "../../img/icon/closedIssueIcon.svg";
import arrowBottom from "../../img/icon/arrowBottom.svg";
import useIssueStore from "../../hooks/useIssueStore";
import { useEffect } from "react";
import { IssueType } from "./IssueList";
import { useMutation } from "react-query";
import { sendFiltersRequest } from "../../api/FilterAPI";

export interface IssueTabProps {
  focusedTab: string;
  setFocusedTab: (tabDescription: IssueType) => void;
}

function IssueTab({ focusedTab, setFocusedTab }: IssueTabProps) {
  const { openIssueCount, closeIssueCount, setIssueCounts } = useIssueStore();

  const { mutate: fetchFilters } = useMutation(sendFiltersRequest, {
    onSuccess: (data) => setIssueCounts(data),
  });

  useEffect(fetchFilters, []);

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
          <IssueMenuText isFocused={focusedTab === "close"} onClick={() => setFocusedTab("close")}>
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
  display: flex;
  gap: 1.5em;
  color: #4e4b66;
`;

export default IssueTab;

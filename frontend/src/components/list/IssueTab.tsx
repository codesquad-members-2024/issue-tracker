import styled from "styled-components";
import openedIssueIcon from "../../img/icon/openedIssueIcon.svg";
import closedIssueIcon from "../../img/icon/closedIssueIcon.svg";
import arrowBottom from "../../img/icon/arrowBottom.svg";

function IssueTab() {
  return (
    <Wrapper>
      <LeftMenus>
        <input type="checkbox" />
        <LeftMenu>
          <img src={openedIssueIcon} />
          <IssueMenuText isFocused={true}>열린 이슈(0)</IssueMenuText>
        </LeftMenu>
        <LeftMenu>
          <img src={closedIssueIcon} />
          <IssueMenuText isFocused={false}>닫힌 이슈(0)</IssueMenuText>
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
  background-color: #f7f7fc;
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
  color: #4E4B66;
`

export default IssueTab;

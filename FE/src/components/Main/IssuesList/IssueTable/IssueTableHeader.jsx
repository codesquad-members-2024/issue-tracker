import styled from "styled-components";
import { ClosedIcon } from "@/icons/ClosedIcon";
import { OpenIcon } from "@/icons/OpenIcon";
import { DropdownContainer } from "@/components/common/Dropdown/DropdownContainer";

const assigneePopupItems = [{ id: "no_assignee", label: "담당자가 없는 이슈" }];
const labelPopupItems = [{ id: "no_label", label: "레이블이 없는 이슈" }];
const milestonesPopupItems = [
  { id: "no_milestones", label: "마일스톤이 없는 이슈" },
];
const authorPopupItems = [{ id: "no_author", label: "작성자가 없는 이슈" }];
const selectPopupItems = [
  { id: "is_open", label: "선택한 이슈 열기" },
  { id: "is_closed", label: "선택한 이슈 닫기" },
];

const headerFilters = [
  { id: "assignee", label: "담당자", items: assigneePopupItems },
  { id: "label", label: "레이블", items: labelPopupItems },
  { id: "milestones", label: "마일스톤", items: milestonesPopupItems },
  { id: "author", label: "작성자", items: authorPopupItems },
];

export function IssueTableHeader(props) {
  const { checkedCount, isChecked, onCheckedChange, isOpenIssues, setIsOpenIssues, openIssueCount, closedIssueCount, fetchOpenIssues, fetchClosedIssues } = props;

  const handleChecked = () => onCheckedChange(!isChecked);

  const handleOpenIssuesClick = () => {
    setIsOpenIssues(true);
    fetchOpenIssues();
  };

  const handleClosedIssuesClick = () => {
    setIsOpenIssues(false);
    fetchClosedIssues();
  };

  return (
    <Header>
      <HeaderInput
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      {isChecked ? (
        <Wrap>
          <Left>
            <div>{checkedCount}개 이슈 선택</div>
          </Left>
          <Right>
            <DropdownContainer id="select" label="상태변경" items={selectPopupItems}/>
          </Right>
        </Wrap>
      ) : (
        <Wrap>
          <Left>
            <StyledIssueBtn onClick={handleOpenIssuesClick} $active={isOpenIssues}>
              <OpenIcon />
              <div className="open">열린 이슈({openIssueCount})</div>
            </StyledIssueBtn>
            <StyledIssueBtn onClick={handleClosedIssuesClick} $active={!isOpenIssues}>
              <ClosedIcon />
              <div className="closed">닫힌 이슈({closedIssueCount})</div>
            </StyledIssueBtn>
          </Left>
          <Right>
            {headerFilters.map((popup) => (
              <DropdownContainer key={popup.id} {...popup} />
            ))}
          </Right>
        </Wrap>
      )}
    </Header>
  );
}

const Header = styled.div`
  height: 60px;
  display: flex;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const HeaderInput = styled.input`
  margin-left: 25px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 230px;
  justify-content: space-between;
  margin-left: 35px;
`;

const StyledIssueBtn = styled.div`
  display: flex;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  div {
    margin-left: 10px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 35px;
  position: relative;
`;

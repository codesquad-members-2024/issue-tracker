import styled from "styled-components";
import plusIcon from "../../img/icon/plusIcon_dark.svg";
import userIcon from "../../img/icon/userIcon.png";
import { ForwardedRef, forwardRef, useEffect } from "react";
import SidePopup from "./SidePopup";
import { Label, Milestone } from "../../hooks/stores/useIssueStore";
import numberUtils from "../../utils/NumberUtils";
import { PopupType } from "../../hooks/logics/useSidePopupLogic";
import useSidebarLogic from "../../hooks/logics/useSidebarLogic";

type SidebarType = "new-issue" | "detail";

interface SidebarSectionProps {
  title: string;
  icon: string;
  items: string[] | Label[] | Milestone[];
  filterbarVisible: boolean;
  onMenuClick: () => void;
  ref: ForwardedRef<HTMLDivElement>;
  popupType: PopupType;
  sidebarType: SidebarType;
  selectedItems: string[] | Label[] | Milestone[];
}

interface SidebarProps {
  assignees?: string[];
  labelResponses?: Label[];
  milestone?: Milestone | null;
  sidebarType: SidebarType;
}

const renderAssignee = (item: string) => (
  <AssigneeWrapper>
    <img src={userIcon} />
    {item}
  </AssigneeWrapper>
);

const renderLabel = ({ bgColor, textColor, labelName }: Label) => (
  <LabelBox bgColor={bgColor} textColor={textColor}>
    {labelName}
  </LabelBox>
);

const renderMilestone = ({ closedIssue, totalIssue, title }: Milestone) => (
  <>
    <ProgressBar>
      <Progress percentage={numberUtils.parsePercentage(closedIssue || 0, totalIssue || 0)}></Progress>
    </ProgressBar>
    {title}
  </>
);

const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  (
    { title, icon, items, filterbarVisible, onMenuClick, popupType, sidebarType, selectedItems }: SidebarSectionProps,
    ref
  ) => (
    <Sector>
      <SectorWrapper onClick={onMenuClick}>
        <TitleWrapper>
          <span>{title}</span>
          <img src={icon} />
        </TitleWrapper>
        <ItemWrapper>
          {selectedItems?.map((item) => {
            if (popupType === "assignee") return renderAssignee(item as string);
            if (popupType === "label") return renderLabel(item as Label);
            if (popupType === "milestone" && item) return renderMilestone(item as Milestone);
          })}
        </ItemWrapper>
      </SectorWrapper>
      {filterbarVisible && items && (
        <SidePopup
          ref={ref}
          popupType={popupType}
          sidebarType={sidebarType}
          items={items}
          selectedItems={selectedItems}
        />
      )}
    </Sector>
  )
);

function Sidebar({ assignees, labelResponses, milestone, sidebarType }: SidebarProps) {
  const { filterbarVisible, handleRightMenuClick, sidebarRefs, users, labels, milestones } = useSidebarLogic();

  return (
    <Wrapper>
      <SidebarSection
        title="담당자"
        icon={plusIcon}
        items={users}
        filterbarVisible={filterbarVisible.assignee}
        onMenuClick={() => handleRightMenuClick("assignee")}
        ref={sidebarRefs.assignee}
        popupType="assignee"
        sidebarType={sidebarType}
        selectedItems={assignees || []}
      />
      <SidebarSection
        title="레이블"
        icon={plusIcon}
        items={labels}
        filterbarVisible={filterbarVisible.label}
        onMenuClick={() => handleRightMenuClick("label")}
        ref={sidebarRefs.label}
        popupType="label"
        sidebarType={sidebarType}
        selectedItems={labelResponses || []}
      />
      <SidebarSection
        title="마일스톤"
        icon={plusIcon}
        items={milestones}
        filterbarVisible={filterbarVisible.milestone}
        onMenuClick={() => handleRightMenuClick("milestone")}
        ref={sidebarRefs.milestone}
        popupType="milestone"
        sidebarType={sidebarType}
        selectedItems={[milestone as Milestone]}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 288px;
  height: fit-content;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
`;

const Sector = styled.div`
  position: relative;
  padding: 2em;
  border-top: 1px solid #d9dbe9;
  display: flex;
  justify-content: space-between;

  &:first-child {
    border-top: none;
  }
`;

const SectorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  color: #4e4b66;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const AssigneeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const LabelBox = styled.div<{ bgColor: string; textColor: string }>`
  width: fit-content;
  height: 1.5em;
  padding: 0 0.75em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
  border: 1px solid ${({ bgColor }) => bgColor};
  border-radius: 1em;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5em;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: #eff0f6;
  overflow: hidden;
`;

const Progress = styled.div<{ percentage: string }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #007aff;
`;

export default Sidebar;

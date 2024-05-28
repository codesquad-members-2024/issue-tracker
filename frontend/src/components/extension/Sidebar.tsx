import styled from "styled-components";
import plusIcon from "../../img/icon/plusIcon_dark.svg";
import userIcon from "../../img/icon/userIcon.png";
import { useEffect, useRef, useState } from "react";
import SidePopup from "./SidePopup";
import useIssueStore, { Label, Milestone } from "../../hooks/stores/useIssueStore";
import numberUtils from "../../utils/NumberUtils";

type SidebarKeys = "assignee" | "label" | "milestone";

interface SidebarProps {
  assignees?: string[];
  labelResponses?: Label[];
  milestone?: Milestone | null;
}

function Sidebar({ assignees, labelResponses, milestone }: SidebarProps) {
  const { users, labels, milestones } = useIssueStore();

  const [filterbarVisible, setFilterbarVisible] = useState<Record<SidebarKeys, boolean>>({
    assignee: false,
    label: false,
    milestone: false,
  });

  const sidebarRefs = {
    assignee: useRef<HTMLDivElement>(null),
    label: useRef<HTMLDivElement>(null),
    milestone: useRef<HTMLDivElement>(null),
  };

  const handleRightMenuClick = (menu: SidebarKeys) => {
    setFilterbarVisible((prev) => ({
      ...prev,
      [menu]: true,
    }));
  };

  const handleClickOutside = ({ target }: Event) => {
    Object.keys(sidebarRefs).forEach((key) => {
      const ref = sidebarRefs[key as SidebarKeys];
      if (ref.current && !ref.current.contains(target as Node)) {
        setFilterbarVisible((prev) => ({
          ...prev,
          [key]: !prev[key as SidebarKeys],
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
      <Sector>
        <SectorWrapper onClick={() => handleRightMenuClick("assignee")}>
          <TitleWrapper>
            <span>담당자</span>
            <img src={plusIcon} />
          </TitleWrapper>
          <ItemWrapper>
            {assignees?.map((assignee) => (
              <AssigneeWrapper>
                <img src={userIcon} />
                {assignee}
              </AssigneeWrapper>
            ))}
          </ItemWrapper>
        </SectorWrapper>
        {filterbarVisible.assignee && <SidePopup ref={sidebarRefs.assignee} popupType="assignee" items={users} />}
      </Sector>
      <Sector>
        <SectorWrapper onClick={() => handleRightMenuClick("label")}>
          <TitleWrapper>
            <span>레이블</span>
            <img src={plusIcon} />
          </TitleWrapper>
          <ItemWrapper>
            {labelResponses?.map(({ labelName, bgColor, textColor }) => (
              <LabelBox bgColor={bgColor} textColor={textColor}>
                {labelName}
              </LabelBox>
            ))}
          </ItemWrapper>
        </SectorWrapper>
        {filterbarVisible.label && <SidePopup ref={sidebarRefs.label} popupType="label" items={labels} />}
      </Sector>
      <Sector>
        <SectorWrapper onClick={() => handleRightMenuClick("milestone")}>
          <TitleWrapper>
            <span>마일스톤</span>
            <img src={plusIcon} />
          </TitleWrapper>
          <ItemWrapper>
            {milestone && (
              <>
                <ProgressBar>
                  <Progress
                    percentage={numberUtils.parsePercentage(milestone.closedIssue || 0, milestone.totalIssue || 0)}
                  ></Progress>
                </ProgressBar>
                <span>{milestone.title}</span>
              </>
            )}
          </ItemWrapper>
        </SectorWrapper>
        {filterbarVisible.milestone && (
          <SidePopup ref={sidebarRefs.milestone} popupType="milestone" items={milestones} />
        )}
      </Sector>
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

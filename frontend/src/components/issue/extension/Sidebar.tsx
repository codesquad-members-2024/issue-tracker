import styled from "styled-components";
import plusIcon from "../../../img/icon/plusIcon_dark.svg";
import { useEffect, useRef, useState } from "react";
import SidePopup from "./SidePopup";
import useIssueStore from "../../../hooks/stores/useIssueStore";

type SidebarKeys = "assignee" | "label" | "milestone";

function Sidebar() {
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
        <span>담당자</span>
        <img src={plusIcon} onClick={() => handleRightMenuClick("assignee")} />
        {filterbarVisible.assignee && <SidePopup ref={sidebarRefs.assignee} popupType="assignee" items={users} />}
      </Sector>
      <Sector>
        <span>레이블</span>
        <img src={plusIcon} onClick={() => handleRightMenuClick("label")} />
        {filterbarVisible.label && <SidePopup ref={sidebarRefs.label} popupType="label" items={labels} />}
      </Sector>
      <Sector>
        <span>마일스톤</span>
        <img src={plusIcon} onClick={() => handleRightMenuClick("milestone")} />
        {filterbarVisible.milestone && <SidePopup ref={sidebarRefs.milestone} popupType="milestone" items={milestones} />}
      </Sector>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 288px;
  height: 16em;
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

export default Sidebar;

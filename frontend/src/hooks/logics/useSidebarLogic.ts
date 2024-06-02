import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { sendUsersReqeust } from "../../api/IssueAPI";
import { sendLabelsRequest } from "../../api/LabelAPI";
import { sendMilestonesRequest } from "../../api/MilestoneAPI";

type SidebarKeys = "assignee" | "label" | "milestone";

const useSidebarLogic = () => {
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

  const { data: users } = useQuery("users", sendUsersReqeust);
  const { data: labels } = useQuery("labels", sendLabelsRequest);
  const { data: milestones } = useQuery("milestones", () => sendMilestonesRequest("open"));

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

  return { filterbarVisible, handleRightMenuClick, sidebarRefs, users, labels, milestones };
};

export default useSidebarLogic;

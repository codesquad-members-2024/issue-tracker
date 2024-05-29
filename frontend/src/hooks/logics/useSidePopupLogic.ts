import { ForwardedRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { updateAssigneesInIssue, updateLabelsInIssue, updateMilestoneInIssue } from "../../api/IssueAPI";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CreatorContext } from "../../contexts/CreatorContext";
import { Label, Milestone } from "../stores/useIssueStore";

type SidebarType = "new-issue" | "detail";

export type PopupType = "assignee" | "label" | "milestone";

type ItemType = string[] | Label[] | Milestone[];

export interface SidePopupProps {
  popupType: PopupType;
  sidebarType: SidebarType;
  items?: ItemType;
  selectedItems: ItemType;
}

const FIRST_MILESTONE = 0;

const isRefObject = (ref: any): ref is React.MutableRefObject<HTMLDivElement | null> => {
  return ref && "current" in ref;
};

const isChecked = (item: any, selectedItem: any): boolean => {
  if (!item || !selectedItem) return false;
  if (typeof item === "string" && typeof selectedItem === "string") return item === selectedItem;

  const { milestoneId: itemMilestoneId, labelId: itemLabelId } = item;
  const { milestoneId: selectedItemMilestoneId, labelId: selectedItemLabelId } = selectedItem;

  if (itemLabelId && selectedItemLabelId) return itemLabelId === selectedItemLabelId;
  if (itemMilestoneId && selectedItemMilestoneId) return itemMilestoneId === selectedItemMilestoneId;

  return false;
};

export const useSidePopupLogic = (props: SidePopupProps, ref: ForwardedRef<HTMLDivElement>) => {
  const client = useQueryClient();
  const { setAssignees, setLabels, setMilestone } = useContext(CreatorContext);
  const { popupType, sidebarType, selectedItems } = props;
  const [checkedItems, setCheckedItems] = useState<any[]>(selectedItems);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const { issueId } = useParams<{ issueId: string }>();

  const isDetailSidebar = sidebarType === "detail";
  const isNewIssueSidebar = sidebarType === "new-issue";

  const updateByPopupType = useMemo(
    () => ({
      assignee: () => {
        if (isDetailSidebar)
          updateAssigneesInIssue(issueId || 0, checkedItems).then(() => client.invalidateQueries(`issue-${issueId}`));
        if (isNewIssueSidebar) setAssignees(checkedItems);
      },
      label: () => {
        const requestItems = checkedItems.filter(Boolean);
        if (isDetailSidebar)
          updateLabelsInIssue(
            issueId || 0,
            requestItems.map((item) => item.labelId)
          ).then(() => client.invalidateQueries(`issue-${issueId}`));
        if (isNewIssueSidebar) setLabels(requestItems);
      },
      milestone: () => {
        const requestItems = checkedItems.filter(Boolean);
        if (isDetailSidebar)
          updateMilestoneInIssue(issueId || 0, requestItems[FIRST_MILESTONE]?.milestoneId).then(() =>
            client.invalidateQueries(`issue-${issueId || 0}`)
          );
        if (isNewIssueSidebar) setMilestone(requestItems[FIRST_MILESTONE]);
      },
    }),
    [sidebarType, checkedItems, issueId, client]
  );

  const handleItemChange = (item: any) => {
    setCheckedItems((prevCheckedItems) => {
      const isCheckedItem = prevCheckedItems.some((checkedItem) => isChecked(item, checkedItem));
      if (isCheckedItem) {
        return prevCheckedItems.filter((checkedItem) => !isChecked(item, checkedItem));
      } else {
        return [...prevCheckedItems, item];
      }
    });
  };

  useEffect(() => {
    const cleanup = () => {
      if (!prevRef.current || !isRefObject(ref) || ref.current) return;
      updateByPopupType[popupType]?.();
    };

    if (isRefObject(ref) && prevRef.current !== ref.current) prevRef.current = ref.current;

    return cleanup;
  }, [ref, checkedItems, popupType, updateByPopupType]);

  return {
    checkedItems,
    handleItemChange,
  };
};

export default useSidePopupLogic;

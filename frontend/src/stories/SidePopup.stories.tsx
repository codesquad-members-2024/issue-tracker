import { Meta, StoryFn } from "@storybook/react/*";
import SidePopup from "../components/extension/SidePopup";
import { SidePopupProps } from "../hooks/logics/useSidePopupLogic";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Extensions/SidePopup",
  component: SidePopup,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<SidePopupProps> = (args) => <SidePopup {...args} />;

export const AssigneePopup = Template.bind({});
AssigneePopup.args = {
  popupType: "assignee",
  sidebarType: "detail",
  items: ["schnee", "dao123", "marron"],
  selectedItems: ["schnee"],
};

export const LabelPopup = Template.bind({});
LabelPopup.args = {
  popupType: "label",
  sidebarType: "detail",
  items: [
    {
      labelId: 1,
      labelName: "bug",
      bgColor: "#000000",
      textColor: "#FFFFFF",
    },
    {
      labelId: 2,
      labelName: "enhancement",
      bgColor: "#FF0000",
      textColor: "#FFFFFF",
    },
    {
      labelId: 3,
      labelName: "documentation",
      bgColor: "#00FF00",
      textColor: "#FFFFFF",
    },
  ],
  selectedItems: [
    {
      labelId: 1,
      labelName: "bug",
      bgColor: "#000000",
      textColor: "#FFFFFF",
    },
  ],
};

export const MilestonePopup = Template.bind({});
MilestonePopup.args = {
  popupType: "milestone",
  sidebarType: "detail",
  items: [
    {
      milestoneId: 1,
      title: "1주차 마일스톤",
      totalIssue: 10,
      closedIssue: 3,
    },
    {
      milestoneId: 2,
      title: "2주차 마일스톤",
      totalIssue: 10,
      closedIssue: 6,
    },
    {
      milestoneId: 3,
      title: "3주차 마일스톤",
      totalIssue: 10,
      closedIssue: 9,
    },
  ],
  selectedItems: [
    {
      milestoneId: 1,
      title: "1주차 마일스톤",
      totalIssue: 10,
      closedIssue: 3,
    },
  ],
};

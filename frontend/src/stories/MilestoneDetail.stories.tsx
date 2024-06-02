import { Meta, StoryFn } from "@storybook/react";
import MilestoneDetail from "../components/milestone/MilestoneDetail";
import { MilestoneDetailType } from "../contexts/MilestoneContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Milestone/MilestoneDetail",
  component: MilestoneDetail,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<MilestoneDetailType> = (args) => <MilestoneDetail {...args} />;

export const OpenedMilestone = Template.bind({});
OpenedMilestone.args = {
  milestoneId: 1,
  title: "1주차 마일스톤",
  description: "마일스톤 설명입니다.",
  deadline: "2024-05-30T06:28:04",
  totalIssue: 10,
  closedIssue: 3,
  isClosed: false,
};

export const ClosedMilestone = Template.bind({});
ClosedMilestone.args = {
  milestoneId: 2,
  title: "2주차 마일스톤",
  description: "마일스톤 설명입니다.",
  deadline: "2024-05-30T06:28:04",
  totalIssue: 10,
  closedIssue: 7,
  isClosed: true,
};

import { Meta, StoryFn } from "@storybook/react";
import { MilestoneEditBoxProps } from "../hooks/logics/useMilestoneEdit";
import MilestoneEditBox from "../components/milestone/MilestoneEditBox";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Milestone/MilestoneEditBox",
  component: MilestoneEditBox,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<MilestoneEditBoxProps> = (args) => <MilestoneEditBox {...args} />;

export const NewMilestone = Template.bind({});
NewMilestone.args = {
  editType: "new",
  closeEditBox: () => alert("취소 버튼 클릭됨"),
};

export const EditMilestone = Template.bind({});
EditMilestone.args = {
  editType: "edit",
  closeEditBox: () => alert("취소 버튼 클릭됨"),
};

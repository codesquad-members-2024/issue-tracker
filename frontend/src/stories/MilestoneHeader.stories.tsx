import { Meta, StoryFn } from "@storybook/react/*";
import MilestoneHeader from "../components/milestone/MilestoneHeader";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Milestone/MilestoneHeader",
  component: MilestoneHeader,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <MilestoneHeader {...args} />;

export const DefaultHeader = Template.bind({});

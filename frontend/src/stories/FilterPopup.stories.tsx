import { Meta, StoryFn } from "@storybook/react";
import FilterPopup, { FilterbarProps } from "../components/extension/FilterPopup";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Extensions/FilterPopup",
  component: FilterPopup,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<FilterbarProps> = (args) => <FilterPopup {...args} />;

export const AboutMePopup = Template.bind({});
AboutMePopup.args = {
  filterType: "aboutMe",
  items: [],
};

export const AssigneePopup = Template.bind({});
AssigneePopup.args = {
  filterType: "assignee",
  items: [ "schnee98", "dao123" ],
};

export const LabelPopup = Template.bind({});
LabelPopup.args = {
  filterType: "label",
  items: [
    { labelName: "bug" },
    { labelName: "enhancement" },
    { labelName: "question" },
  ],
};

export const MilestonePopup = Template.bind({});
MilestonePopup.args = {
  filterType: "milestone",
  items: [{ title: "v1.0" }, { title: "v2.0" }],
};

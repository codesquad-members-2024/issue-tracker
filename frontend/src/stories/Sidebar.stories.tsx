import { Meta, StoryFn } from "@storybook/react/*";
import Sidebar from "../components/extension/Sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta;

const Template: StoryFn = () => <Sidebar />;

export const DefaultSidebar = Template.bind({});

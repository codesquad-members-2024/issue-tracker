import { Meta, StoryFn } from "@storybook/react/*";
import Sidebar from "../components/extension/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
} as Meta;

const Template: StoryFn = () => <Sidebar sidebarType="new-issue" />;

export const DefaultSidebar = Template.bind({});

import { Meta, StoryFn } from "@storybook/react";
import Filter from "../components/filter/Filter";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Components/Filter",
  component: Filter,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Filter />;

export const DefaultFilter = Template.bind({});

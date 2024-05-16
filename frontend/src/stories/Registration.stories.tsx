import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import Registration from '../components/registration/Registration';

const queryClient = new QueryClient();

export default {
  title: "Login/Registration",
  component: Registration,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Registration />;

export const DefaultLogin = Template.bind({});

import { Meta, StoryFn } from "@storybook/react";
import Login from "../components/login/Login";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Login/Login",
  component: Login,
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

const Template: StoryFn = () => <Login />;

export const DefaultLogin = Template.bind({});

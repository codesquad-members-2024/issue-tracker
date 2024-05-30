import { createRef } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DetailContent from "../components/issue/detail/DetailContent";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Issue/DetailContent",
  component: DetailContent,
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <DetailContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  issueContent: {
    author: "Jane Doe",
    comments: [
      { commentId: 1, author: "Jane Doe", content: "This is a comment from Jane Doe.", publishedAt: "2024-05-26 12:25:59.0" },
      { commentId: 2, author: "John Smith", content: "This is another comment from John Smith.", publishedAt: "2024-05-26 12:25:59.0" },
    ],
    labels: [],
    assignees: [],
    milestone: null,
    closed: false
  },
  commentRef: createRef(),
  isCommentSubmitable: false,
  handleCommentChange: () => {},
  handleCommentSubmit: () => {},
};

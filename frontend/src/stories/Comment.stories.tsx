import { Meta, StoryFn } from '@storybook/react/*';
import Comment, { CommentProps } from '../components/issue/Comment';

export default {
  title: "Components/Comment",
  component: Comment,
} as Meta;

const Template: StoryFn<CommentProps> = (args) => <Comment {...args} />;

export const DefaultComment = Template.bind({});
DefaultComment.args = {
  commentId: 1,
  author: "schnee",
  isAuthor: true,
  content: "hi",
  publishedAt: "2024-05-17 11:23:31.0"
}
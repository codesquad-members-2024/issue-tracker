import { Meta, StoryFn } from '@storybook/react/*';
import Comment from '../components/issue/Comment';

export default {
  title: "Components/Comment",
  component: Comment,
} as Meta;

const Template: StoryFn = () => <Comment />;

export const DefaultComment = Template.bind({});

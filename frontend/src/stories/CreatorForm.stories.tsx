import { Meta, StoryFn } from '@storybook/react';
import CreatorForm, { CreatorFormProps } from '../components/issue/new/CreatorForm';

export default {
  title: 'Issue/CreatorForm',
  component: CreatorForm,
  argTypes: {
    labelText: { control: 'text' },
    height: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<CreatorFormProps> = (args) => <CreatorForm {...args} />;

export const TitleForm = Template.bind({});
TitleForm.args = {
  labelText: '제목',
  height: '50px',
};

export const CommentForm = Template.bind({});
CommentForm.args = {
  labelText: '코멘트를 입력하세요.',
  height: '200px',
};

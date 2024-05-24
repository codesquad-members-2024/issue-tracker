import { Meta, StoryFn } from '@storybook/react';
import IssueTab, { IssueTabProps } from '../components/issue/IssueTab';

export default {
  title: 'Issue/IssueTab',
  component: IssueTab,
  argTypes: {
    focusedTab: { control: 'text' },
    setFocusedTab: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<IssueTabProps> = (args) => <IssueTab {...args} />;

export const DefaultTab = Template.bind({});
DefaultTab.args = {
  focusedTab: 'open',
};

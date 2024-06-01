import { Meta, StoryFn } from '@storybook/react';
import IssueTab, { IssueTabProps } from '../components/issue/IssueTab';
<<<<<<< be-dev
=======
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
>>>>>>> team-05

export default {
  title: 'Issue/IssueTab',
  component: IssueTab,
  argTypes: {
    focusedTab: { control: 'text' },
    setFocusedTab: { action: 'clicked' },
  },
<<<<<<< be-dev
} as Meta;

const Template: StoryFn<IssueTabProps> = (args) => <IssueTab {...args} />;
=======
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
} as Meta;

const Template: StoryFn<IssueTabProps> = (args) =>  <IssueTab {...args} />;
>>>>>>> team-05

export const DefaultTab = Template.bind({});
DefaultTab.args = {
  focusedTab: 'open',
};

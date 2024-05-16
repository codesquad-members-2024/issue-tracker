import { Meta, StoryFn } from '@storybook/react';
import Filter from '../components/filter/Filter';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: "Components/Filter",
  component: Filter,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} as Meta;

const Template: StoryFn = () => <Filter />;

export const DefaultFilter = Template.bind({});

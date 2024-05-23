import { Meta, StoryFn } from '@storybook/react';
import Header from '../components/header/Header';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Header />;

export const DefaultHeader = Template.bind({});
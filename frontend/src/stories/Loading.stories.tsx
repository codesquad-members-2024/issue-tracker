import { Meta, StoryFn } from '@storybook/react';
import Loading from '../components/login/Loading';

export default {
  title: "Components/Loading",
  component: Loading,
} as Meta;

const Template: StoryFn = () => <Loading />;

export const DefaultLoading = Template.bind({});
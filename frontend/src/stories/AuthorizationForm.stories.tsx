import AuthorizationForm, { AuthorizationFormProps } from '../components/authorization/AuthorizationForm';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: "Login/AuthorizationForm",
  component: AuthorizationForm,
  argTypes: {
    type: { control: "text" },
    onInputChange: { action: "input" },
  }
} as Meta;

const Template: StoryFn<AuthorizationFormProps> = (args) => <AuthorizationForm {...args} />

export const IdInput = Template.bind({});
IdInput.args = {
  type: "id",
}

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
};

export const PasswordValidationInput = Template.bind({});
PasswordValidationInput.args = {
  type: "password-validation",
};

export const NicknameInput = Template.bind({});
NicknameInput.args = {
  type: "nickname",
};
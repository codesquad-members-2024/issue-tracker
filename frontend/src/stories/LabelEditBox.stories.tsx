import { Meta, StoryFn } from "@storybook/react/*";
import LabelEditBox, { LabelEditBoxProps } from "../components/label/LabelEditBox";

export default {
  title: "Label/LabelEditBox",
  component: LabelEditBox
} as Meta;

const Template: StoryFn<LabelEditBoxProps> = (args) => <LabelEditBox {...args} />;

export const NewEditBox = Template.bind({});
NewEditBox.args = {
  editType: "new",
  closeEditBox: () => {},
};

export const DetailEditBox = Template.bind({});
DetailEditBox.args = {
  editType: "edit",
  labelId: 1,
  content: {
    labelId: 1,
    labelName: "fe-feature",
    description: "프론트엔드 기능",
    textColor: "#000000",
    bgColor: "#0FF000",
  },
};

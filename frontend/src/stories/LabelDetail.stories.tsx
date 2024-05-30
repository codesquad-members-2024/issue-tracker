import { Meta, StoryFn } from "@storybook/react";
import LabelDetail from "../components/label/LabelDetail";
import { LabelDetailType } from "../contexts/LabelContext";

export default {
  title: "Label/LabelDetail",
  component: LabelDetail,
} as Meta;

const Template: StoryFn<LabelDetailType> = (args) => <LabelDetail {...args} />;

export const BugLabel = Template.bind({});
BugLabel.args = {
  labelId: 1,
  labelName: "Bug",
  description: "버그 수정이 필요합니다.",
  textColor: "#FFFFFF",
  bgColor: "#D73A49",
};

export const FeatureLabel = Template.bind({});
FeatureLabel.args = {
  labelId: 2,
  labelName: "Feature",
  description:
    "기능 구현이 필요합니다.",
  textColor: "#000000",
  bgColor: "#0E8A16",
};

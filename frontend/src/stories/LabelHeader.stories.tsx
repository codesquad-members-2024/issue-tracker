import { Meta, StoryFn } from "@storybook/react/*";
import LabelHeader from "../components/label/LabelHeader";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Label/LabelHeader",
  component: LabelHeader,
} as Meta;

const Template: StoryFn = (args) => (
  <BrowserRouter>
    <LabelHeader />
  </BrowserRouter>
);

export const Default = Template.bind({});

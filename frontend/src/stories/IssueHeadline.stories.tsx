import React from "react";
import IssueHeadline, { IssueHeadlineProps } from "../components/issue/list/IssueHeadline";
import { MemoryRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";

export default {
  title: "Issue/IssueHeadline",
  component: IssueHeadline,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

interface ReturnType extends React.FC<IssueHeadlineProps> {
  args?: IssueHeadlineProps;
}

const Template: ReturnType = (props: IssueHeadlineProps) => <IssueHeadline {...props} />;

export const IssueDetail = Template.bind({});
IssueDetail.args = {
  issueId: 1,
  title: "FE 이슈트래커 개발",
  author: "schnee",
  publishedAt: "2024-05-14T12:34:56Z",
  isClosed: false,
};

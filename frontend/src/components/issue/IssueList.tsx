import styled from "styled-components";
import IssueTab from "./IssueTab";
import IssueHeadline, { IssueHeadlineProps } from "./IssueHeadline";
import { MutableRefObject } from "react";
import { Headline } from "../../hooks/stores/useIssueStore";
import RefreshRequest from "../error/RefreshRequest";
import useIssueListLogic, { IssueType } from "../../hooks/logics/useIssueListLogic";

interface LastHeadlineProps extends IssueHeadlineProps {
  ref: MutableRefObject<null>;
}

const renderIssueHeadline = ({ issueId, title, author, publishedAt, isClosed }: IssueHeadlineProps) => (
  <IssueHeadline
    key={`issue-headline-${issueId}`}
    issueId={issueId}
    title={title}
    author={author}
    publishedAt={publishedAt}
    isClosed={isClosed}
  />
);

const renderLastIssueHeadline = ({ ref, issueId, title, author, publishedAt, isClosed }: LastHeadlineProps) => (
  <IssueHeadline
    ref={ref}
    key={`issue-headline-${issueId}`}
    issueId={issueId}
    title={title}
    author={author}
    publishedAt={publishedAt}
    isClosed={isClosed}
  />
);

const renderHeadlines = (issues: Headline[], focusedTab: IssueType, lastIssueRef: MutableRefObject<null>) =>
  issues
    .filter(({ isClosed }) => (focusedTab === "open" ? !isClosed : isClosed))
    .map((issue, index) =>
      index === issues.length - 1
        ? renderLastIssueHeadline({ ref: lastIssueRef, ...issue })
        : renderIssueHeadline(issue)
    );

function IssueList() {
  const { focusedTab, setFocusedTab, issues, setIssues, lastIssueRef, requestError } = useIssueListLogic();

  if (requestError) <RefreshRequest />;

  return (
    <Wrapper>
      <IssueTab
        focusedTab={focusedTab}
        handleFocusedTabClick={(tabDescription: IssueType) => {
          setFocusedTab(tabDescription);
          setIssues([]);
        }}
      />
      <ScrollableArea>{renderHeadlines(issues, focusedTab, lastIssueRef)}</ScrollableArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1280px;
  margin-top: 1.5em;
  border: 1px solid #d9dbe9;
  border-radius: 0.725em;
  overflow: hidden;
`;

const ScrollableArea = styled.div`
  max-height: 42.5em;
  overflow-y: scroll;
  height: calc(100% - 4em);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default IssueList;

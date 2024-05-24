import styled from "styled-components";
import IssueTab from "./IssueTab";
import IssueHeadline, { IssueHeadlineProps } from "./IssueHeadline";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";
import React, { useEffect, useRef, useState } from "react";
import useIssueStore from "../../hooks/useIssueStore";
import RefreshRequest from "../error/RefreshRequest";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export type IssueType = "open" | "close";

interface LastHeadlineProps extends IssueHeadlineProps {
  ref: React.MutableRefObject<null>;
}

const FIRST_PAGE = 1;

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

function IssueList() {
  const { openIssueCount, closeIssueCount, issues, setIssues } = useIssueStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open");
  const [requestError, setRequestError] = useState(false);
  const [page, setPage] = useState(FIRST_PAGE);
  const lastIssueRef = useRef(null);
  const { observer } = useIntersectionObserver(() => {
    const maxIssueCount = focusedTab === "open" ? openIssueCount : closeIssueCount;
    if (maxIssueCount > issues.length) {
      const nextPage = page + 1;
      fetchIssues({ issueType: focusedTab, page: nextPage });
      setPage(nextPage);
    }
  });

  const { mutate: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => {
      setIssues([...issues, ...data]);
      setRequestError(false);
    },
    onError: () => setRequestError(true),
  });

  useEffect(() => {
    setPage(FIRST_PAGE);
    fetchIssues({ issueType: focusedTab, page: FIRST_PAGE });
  }, [focusedTab]);

  useEffect(() => {
    if (lastIssueRef.current) observer.observe(lastIssueRef.current);

    return () => {
      if (lastIssueRef.current) observer.unobserve(lastIssueRef.current);
    };
  }, [issues]);

  if (requestError) return <RefreshRequest />;

  return (
    <Wrapper>
      <IssueTab
        focusedTab={focusedTab}
        setFocusedTab={(tabDescription: IssueType) => {
          setFocusedTab(tabDescription);
          if (tabDescription !== focusedTab) setIssues([]);
        }}
      />
      <ScrollableArea>
        {issues
          .filter(({ isClosed }) => (focusedTab === "open" ? !isClosed : isClosed))
          .map((issue, index) =>
            index === issues.length - 1
              ? renderLastIssueHeadline({ ref: lastIssueRef, ...issue })
              : renderIssueHeadline(issue)
          )}
      </ScrollableArea>
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

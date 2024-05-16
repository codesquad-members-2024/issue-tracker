import styled from "styled-components";
import IssueTab from "./IssueTab";
import IssueHeadline, { IssueHeadlineProps } from "./IssueHeadline";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";
import { useEffect, useState } from "react";
import useIssueStore from "../../hooks/useIssueStore";
import RefreshRequest from "../error/RefreshRequest";

export type IssueType = "open" | "close";

const FIRST_PAGE = 1;

const renderIssueHeadlines = ({ issueId, title, author, publishedAt, isClosed }: IssueHeadlineProps) => (
  <IssueHeadline issueId={issueId} title={title} author={author} publishedAt={publishedAt} isClosed={isClosed} />
);

function IssueList() {
  const { issues, setIssues } = useIssueStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open");
  const [requestError, setRequestError] = useState(false);
  const [page, setPage] = useState(FIRST_PAGE);

  const { mutate: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => {
      setIssues(data);
      setRequestError(false);
    },
    onError: () => setRequestError(true),
  });

  useEffect(() => {
    setPage(FIRST_PAGE);
    fetchIssues({ issueType: focusedTab, page });
  }, [focusedTab]);

  if (requestError) return <RefreshRequest />;

  return (
    <Wrapper>
      <IssueTab focusedTab={focusedTab} setFocusedTab={setFocusedTab} />
      <ScrollableArea>
        {issues.map(renderIssueHeadlines)}
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

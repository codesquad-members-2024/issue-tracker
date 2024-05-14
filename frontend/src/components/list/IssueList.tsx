import styled from "styled-components";
import IssueTab from "./IssueTab";
import IssueHeadline from "./IssueHeadline";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";
import { useEffect, useState } from "react";
import useIssueStore from "../../hooks/useIssueStore";
import RefreshRequest from "../error/RefreshRequest";

export type IssueType = "open" | "closed"; // deprecated after the completion of api

function IssueList() {
  const { issues, setIssues } = useIssueStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open");
  const [requestError, setRequestError] = useState(false);

  const { mutate: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => {
      setIssues(data);
      setRequestError(false);
    },
    onError: () => setRequestError(true),
  });

  useEffect(() => fetchIssues(), []);

  if (requestError) return <RefreshRequest />;

  return (
    <Wrapper>
      <IssueTab focusedTab={focusedTab} setFocusedTab={setFocusedTab} />
      {issues
        .filter(({ isClosed }) => (focusedTab === "open" ? !isClosed : isClosed)) // deprecated after the completion of api
        .map(({ id, title, author, publishedAt, isClosed }) => (
          <IssueHeadline issueId={id} title={title} author={author} publishedAt={publishedAt} isClosed={isClosed} />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80em;
  margin-top: 1.5em;
  border: 1px solid #d9dbe9;
  border-radius: 0.725em;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default IssueList;

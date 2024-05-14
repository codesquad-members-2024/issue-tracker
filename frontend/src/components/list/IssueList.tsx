import styled from "styled-components";
import IssueTab from "./IssueTab";
import IssueHeadline from "./IssueHeadline";
import { useMutation } from "react-query";
import { sendIssuesRequest } from "../../api/IssueAPI";
import { useEffect, useState } from "react";
import useIssueStore from "../../hooks/useIssueStore";

export type IssueType = "open" | "closed";

function IssueList() {
  const { issues, setIssues } = useIssueStore();
  const [focusedTab, setFocusedTab] = useState<IssueType>("open"); // deprecated after the completion of api
  const { mutate: fetchIssues } = useMutation(sendIssuesRequest, {
    onSuccess: (data) => setIssues(data),
  });

  useEffect(() => fetchIssues(), []);

  return (
    <Wrapper>
      <IssueTab focusedTab={focusedTab} setFocusedTab={setFocusedTab}/>
      {issues
        .filter(({ isClosed }) => focusedTab === "open" ? !isClosed : isClosed)
        .map(({ id, title, author, publishedAt }) => (
          <IssueHeadline issueId={id} title={title} author={author} publishedAt={publishedAt} />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1280px;
  height: 55em;
  margin-top: 1.5em;
  border: 1px solid #d9dbe9;
  border-radius: 0.725em;
  overflow: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default IssueList;

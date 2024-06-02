import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { closeIssue, openIssue, sendIssueRequestById, sendTitleEditRequest } from "../../api/IssueAPI";
import { useParams } from "react-router-dom";
import { Label, Milestone } from "../stores/useIssueStore";

interface Comment {
  commentId: number;
  content: string;
  author: string;
  publishedAt: string;
}

interface IssueContent {
  title: string;
  author: string;
  publishedAt: string;
  comments: Comment[];
  labels: Label[];
  milestone: Milestone;
  closed: boolean;
}

const useIssueDetailLogic = () => {
  const client = useQueryClient();
  const [isTitleSubmitable, setIsTitleSubmitable] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { issueId } = useParams();

  const { data: issueContent } = useQuery<IssueContent>(
    `issue-${issueId}`,
    async () => sendIssueRequestById(issueId || ""),
    {
      initialData: () => client.getQueryData<IssueContent>(`issue-${issueId}`),
      enabled: !!issueId,
    }
  );

  const { mutate: fetchOpenIssue } = useMutation(openIssue, {
    onSuccess: () => client.invalidateQueries(`issue-${issueId}`),
  });

  const { mutate: fetchCloseIssue } = useMutation(closeIssue, {
    onSuccess: () => client.invalidateQueries(`issue-${issueId}`),
  });

  const { mutate: fetchTitleEdit } = useMutation(sendTitleEditRequest, {
    onSuccess: () => {
      client.invalidateQueries(`issue-${issueId}`);
      setIsTitleEditable(false);
    },
    onError: () => setIsTitleEditable(false),
  });

  const handleStateToggleClick = () => {
    if (issueContent?.closed && issueId) {
      fetchOpenIssue(issueId);
      return;
    }

    issueId && fetchCloseIssue(issueId);
  };

  const handleTitleChange = () => {
    const titleInput = titleInputRef.current?.value;
    const currentIsSubmitable = !!titleInput;

    if (currentIsSubmitable === !isTitleSubmitable) setIsTitleSubmitable(currentIsSubmitable);
  };
  const handleTitleEditSubmit = () => {
    const titleInput = titleInputRef.current?.value;

    if (titleInput && issueId) {
      fetchTitleEdit({ issueId: issueId, title: titleInput });
      titleInputRef.current.value = "";
    }
  };

  useEffect(() => setIsTitleSubmitable(false), [isTitleEditable]);

  return {
    issueId,
    issueContent,
    titleInputRef,
    isTitleSubmitable,
    isTitleEditable,
    setIsTitleEditable,
    setIsTitleSubmitable,
    handleTitleChange,
    handleStateToggleClick,
    handleTitleEditSubmit,
  };
};

export default useIssueDetailLogic;

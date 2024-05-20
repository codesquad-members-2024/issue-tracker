import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { closeIssue, openIssue, sendIssueRequestById } from "../../api/IssueAPI";
import { useParams } from "react-router-dom";

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
  closed: boolean;
}

const useIssueDetailLogic = () => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [issueContent, setIssueContent] = useState<IssueContent | null>(null);
  const { issueId } = useParams();
  const numericIssueId = Number(issueId);

  const fetchIssueContent = () => {
    if (issueId && !isNaN(numericIssueId)) fetchIssue(numericIssueId);
  };

  const { mutate: fetchIssue } = useMutation(sendIssueRequestById, {
    onSuccess: (data) => setIssueContent(data),
  });

  const { mutate: fetchOpenIssue } = useMutation(openIssue, {
    onSuccess: () => fetchIssueContent(),
  });

  const { mutate: fetchCloseIssue } = useMutation(closeIssue, {
    onSuccess: () => fetchIssueContent(),
  });

  const handleStateToggleClick = () => {
    if (issueContent?.closed) {
      fetchOpenIssue(numericIssueId);
      return;
    }

    fetchCloseIssue(numericIssueId);
  };

  const handleOnChange = () => {
    const comment = commentRef.current?.value;
    const currentIsSubmitable = !!comment;

    if (currentIsSubmitable === !isSubmitable) setIsSubmitable(currentIsSubmitable);
  };

  useEffect(() => fetchIssueContent(), []);

  return {
    issueId,
    issueContent,
    commentRef,
    isSubmitable,
    isTitleEditable,
    setIsSubmitable,
    handleOnChange,
    handleStateToggleClick,
  };
};

export default useIssueDetailLogic;

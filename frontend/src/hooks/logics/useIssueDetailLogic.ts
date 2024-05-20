import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { closeIssue, openIssue, sendIssueRequestById, sendTitleEditRequest } from "../../api/IssueAPI";
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
  const [isCommentSubmitable, setIsCommentSubmitable] = useState(false);
  const [isTitleSubmitable, setIsTitleSubmitable] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [issueContent, setIssueContent] = useState<IssueContent | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
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

  const { mutate: fetchTitleEdit } = useMutation(sendTitleEditRequest, {
    onSuccess: () => {
      fetchIssueContent();
      setIsTitleEditable(false);
    },
  });

  const handleStateToggleClick = () => {
    if (issueContent?.closed) {
      fetchOpenIssue(numericIssueId);
      return;
    }

    fetchCloseIssue(numericIssueId);
  };

  const handleCommentChange = () => {
    const comment = commentRef.current?.value;
    const currentIsSubmitable = !!comment;

    if (currentIsSubmitable === !isCommentSubmitable) setIsCommentSubmitable(currentIsSubmitable);
  };
  const handleTitleChange = () => {
    const titleInput = titleInputRef.current?.value;
    const currentIsSubmitable = !!titleInput;

    if (currentIsSubmitable === !isTitleSubmitable) setIsTitleSubmitable(currentIsSubmitable);
  };
  const handleTitleEditSubmit = () => {
    const titleInput = titleInputRef.current?.value;

    if (titleInput) fetchTitleEdit({ issueId: numericIssueId, title: titleInput });
  };

  useEffect(() => fetchIssueContent(), []);

  useEffect(() => setIsTitleSubmitable(false), [isTitleEditable]);

  return {
    issueId,
    issueContent,
    commentRef,
    titleInputRef,
    isTitleSubmitable,
    isCommentSubmitable,
    isTitleEditable,
    setIsTitleEditable,
    setIsTitleSubmitable,
    setIsCommentSubmitable,
    handleCommentChange,
    handleTitleChange,
    handleStateToggleClick,
    handleTitleEditSubmit,
  };
};

export default useIssueDetailLogic;

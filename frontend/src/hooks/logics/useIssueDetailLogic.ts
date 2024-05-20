import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { sendIssueRequestById } from "../../api/IssueAPI";
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
  const [issueContent, setIssueContent] = useState<IssueContent | null>(null);
  const { issueId } = useParams();

  const { mutate: fetchIssue } = useMutation(sendIssueRequestById, {
    onSuccess: (data) => setIssueContent(data),
  });

  const handleOnChange = () => {
    const comment = commentRef.current?.value;
    const currentIsSubmitable = !!comment;

    if (currentIsSubmitable === !isSubmitable) setIsSubmitable(currentIsSubmitable);
  };

  useEffect(() => {
    const numericIssueId = Number(issueId);

    if (issueId && !isNaN(numericIssueId)) fetchIssue(numericIssueId);
  }, []);

  return { issueId, issueContent, commentRef, isSubmitable, handleOnChange };
};

export default useIssueDetailLogic;

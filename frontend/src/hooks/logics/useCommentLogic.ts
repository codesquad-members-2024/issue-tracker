import { useMutation, useQuery, useQueryClient } from "react-query";
import useUserStore from "../stores/useUserStore";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { postNewComment, sendIssueRequestById } from "../../api/IssueAPI";

interface Comment {
  commentId: number;
  content: string;
  author: string;
  publishedAt: string;
}

export interface IssueContent {
  title: string;
  author: string;
  publishedAt: string;
  comments: Comment[];
  closed: boolean;
}

const useCommentLogic = () => {
  const client = useQueryClient();
  const { userId } = useUserStore();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isCommentSubmitable, setIsCommentSubmitable] = useState(false);
  const { issueId } = useParams();

  const { data: issueContent } = useQuery<IssueContent>(
    `issue-${issueId}`,
    async () => sendIssueRequestById(issueId || ""),
    {
      initialData: () => client.getQueryData<IssueContent>(`issue-${issueId}`),
      enabled: !!issueId,
    }
  );

  const { mutate: fetchNewComment } = useMutation(postNewComment, {
    onSuccess: () => client.invalidateQueries(`issue-${issueId}`),
  });

  const handleCommentChange = () => {
    const comment = commentRef.current?.value;
    const currentIsSubmitable = !!comment;

    if (currentIsSubmitable === !isCommentSubmitable) setIsCommentSubmitable(currentIsSubmitable);
  };

  const handleCommentSubmit = () => {
    const comment = commentRef.current?.value;

    if (comment && issueId) fetchNewComment({ issueId: issueId, author: userId, content: comment });
  };

  return {
    issueContent,
    commentRef,
    isCommentSubmitable,
    handleCommentChange,
    handleCommentSubmit,
  };
};

export default useCommentLogic;

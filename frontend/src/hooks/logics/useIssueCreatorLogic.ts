import { useEffect, useRef, useState } from "react";
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { postNewIssue } from "../../api/IssueAPI";

const useIssueCreatorLogic = () => {
  const { userId } = useUserStore();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [commentCount, setCommentLength] = useState(0);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = () => {
    const title = titleRef.current?.value;
    const content = commentRef.current?.value;
    const currentIsSubmitable = !!(title && content);

    if (currentIsSubmitable === !isSubmitable) setIsSubmitable(currentIsSubmitable);
  };
  const handleCancel = () => navigate("/");
  const handleSubmit = () => {
    const title = titleRef.current?.value;
    const content = commentRef.current?.value;

    // 추후 /issue/{issueId} 로 라우팅 예정
    if (title && content) postNewIssue({ title, content, userId }).then(() => navigate("/"));
  };

  useEffect(() => {
    const handleCommentChange = () => {
      const length = commentRef.current?.value.length || 0;
      setCommentLength(length);
      handleOnChange();
    };
    const commentElement = commentRef.current;
    commentElement?.addEventListener("input", handleCommentChange);

    return () => {
      commentElement?.removeEventListener("input", handleCommentChange);
    };
  }, []);

  return {
    titleRef,
    commentRef,
    commentCount,
    isSubmitable,
    handleOnChange,
    handleCancel,
    handleSubmit,
  };
};

export default useIssueCreatorLogic;

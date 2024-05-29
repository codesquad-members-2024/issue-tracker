import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { postNewIssue } from "../../api/IssueAPI";
import useFileUpload from "@schnee/s3-file-upload";
import { CreatorContext } from "../../contexts/CreatorContext";

const IMAGE_DIRECTORY = process.env.REACT_APP_IMG_DIRECTORY;
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"];
const EXTENSIONS_ERROR = "이미지 파일이 아닙니다.";

const parseImageTag = (src: string) => `\n<img src="${src}" />\n`;

const useIssueCreatorLogic = () => {
  const { userId } = useUserStore();
  const { assignees, labels, milestone } = useContext(CreatorContext);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [commentCount, setCommentCount] = useState(0);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const { upload } = useFileUpload();
  const navigate = useNavigate();

  const handleOnChange = () => {
    const title = titleRef.current?.value;
    const content = commentRef.current?.value;
    const currentIsSubmitable = !!(title && content);

    if (currentIsSubmitable === !isSubmitable) setIsSubmitable(currentIsSubmitable);
  };
  const handleCommentChange = () => {
    const length = commentRef.current?.value.length || 0;
    setCommentCount(length);
    handleOnChange();
  };
  const handleCancel = () => navigate("/");
  const handleSubmit = () => {
    const title = titleRef.current?.value;
    const content = commentRef.current?.value;
    const labelIds = labels.map((label) => label.labelId);
    const milestoneId = milestone?.milestoneId || null;

    if (title && content)
      postNewIssue({
        title,
        content,
        userId,
        assignees,
        labels: labelIds,
        milestone: milestoneId,
      }).then((data) => navigate(`/issue/${data.issueId}`));
  };
  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    try {
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!IMAGE_EXTENSIONS.includes(fileExtension)) throw new Error(EXTENSIONS_ERROR);

      const fileLocation = await upload(file, IMAGE_DIRECTORY);

      if (commentRef.current) commentRef.current.value += parseImageTag(fileLocation.Location);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const commentElement = commentRef.current;
    commentElement?.addEventListener("input", handleCommentChange);

    return () => {
      commentElement?.removeEventListener("input", handleCommentChange);
    };
  }, []);

  return {
    titleRef,
    commentRef,
    fileInputRef,
    commentCount,
    isSubmitable,
    handleOnChange,
    handleUploadClick,
    handleFileChange,
    handleCancel,
    handleSubmit,
  };
};

export default useIssueCreatorLogic;

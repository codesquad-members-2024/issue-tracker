import { useState } from "react";
import { NewIssueForm } from "../pages/NewPage";
import FileUploader from "./FileUploader";
interface CommentBoxProps {
    height: string;
    issueData: NewIssueForm;
    setIssueData: React.Dispatch<React.SetStateAction<NewIssueForm>>;
}

const CommentBox = ({height, issueData, setIssueData}: CommentBoxProps) => {
    const [isActive, setActive] = useState(false)

    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);

    const addImgUrl = (url: string) => {
        setIssueData(prev => ({
            ...prev,
            content: `${prev.content}\n![이미지](${url})`,
        }))
    }
    return (
        <div
            className={`${
                isActive && "bg-white border-black border-2"
            } ${height} w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2 flex flex-col justify-between`}
        >
            <div className="text-sm font-normal opacity-60">
                코맨트를 입력하세요.
            </div>
            <textarea
                name="content"
                className={`${
                    isActive ? "bg-white" : ""
                } h-full bg-gray-200 dark:bg-darkModeBorderBG w-full outline-none rounded-xl`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={issueData.content}
                onChange={(e) => {
                    setIssueData({
                        ...issueData,
                        content: e.target.value,
                    });
                }}
            />
            <div className="relative">
                <div
                    className={`text-sm font-normal bottom-0 right-6 absolute transition-opacity duration-500`}
                >
                    띄어쓰기 포함 {issueData.content.length}자
                </div>
            </div>
            <FileUploader addImgUrl={addImgUrl} />
        </div>
    );
};

export default CommentBox;

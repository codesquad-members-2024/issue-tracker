import { useState } from "react";
import { IssueData } from "../pages/NewPage";
import FileUploader from "./FileUploader";
interface CommentBoxProps {
    height: string;
    issueData: IssueData | {
        description: string;
    };
    setIssueData: React.Dispatch<React.SetStateAction<IssueData | {
        description: string;
    }>>;
}

const CommentBox = ({height, issueData, setIssueData}: CommentBoxProps) => {
    const [isActive, setActive] = useState(false)

    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);

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
                name="description"
                className={`${
                    isActive ? "bg-white" : ""
                } h-full bg-gray-200 dark:bg-darkModeBorderBG w-full outline-none rounded-xl`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={issueData.description}
                onChange={(e) => {
                    setIssueData({
                        ...issueData,
                        description: e.target.value,
                    });
                }}
            />
            <div className="relative">
                <div
                    className={`text-sm font-normal bottom-0 right-6 absolute transition-opacity duration-500`}
                >
                    띄어쓰기 포함 {issueData.description.length}자
                </div>
            </div>
            <FileUploader setIssueData={setIssueData} />
        </div>
    );
};

export default CommentBox;

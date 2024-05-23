import { useState } from "react";
import { IssueData } from "../../pages/NewPage";
import CommentBox from "../../common/CommentBox";
interface CommentProps {
    issueData: IssueData;
    setIssueData: React.Dispatch<React.SetStateAction<IssueData>>;
}

const NewIssue = ({ issueData, setIssueData }: CommentProps) => {
    const [isActive, setActive] = useState(false);

    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);

    return (
        <div className="flex flex-col gap-2">
            <div className="">
                <div
                    className={`${
                        isActive ? "bg-white border-black border-2" : ""
                    } w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2`}
                >
                    <div className="text-sm font-normal opacity-60">제목</div>
                    <input
                        type="text"
                        name="description"
                        className={`${
                            isActive ? "bg-white" : ""
                        } bg-gray-200 dark:bg-darkModeBorderBG h-full w-full outline-none rounded-xl`}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                        value={issueData.title}
                        onChange={(e) =>
                            setIssueData({
                                ...issueData,
                                title: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <CommentBox height={"400"} issueData={issueData} setIssueData={setIssueData}/>
            </div>
        </div>
    );
};

export default NewIssue;

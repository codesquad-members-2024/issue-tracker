import { useEffect, useState } from "react";
import FileUploader from "../../common/FileUploader";
import { IssueData } from "../../pages/NewPage";
interface CommentProps {
    issueData: IssueData;
    setIssueData: React.Dispatch<React.SetStateAction<IssueData>>;
}

const NewIssue = ({issueData, setIssueData}: CommentProps) => {
    useEffect(() => {
        console.log(issueData)
    }, [issueData])

    const [isActive, setActive] = useState({
        title: false,
        description: false,
    })

    const handleFocus = (type: string) => {
        setActive({
            ...isActive,
            [type]: true
        })
    }
    const handleBlur = (type: string) => {
        setActive({
            ...isActive,
            [type]: false
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="">
                <div className={`${isActive.title ? "bg-white border-black border-2" : ""} w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2`}>
                    <div className="text-sm font-normal opacity-60">제목</div>
                    <input
                        type="text"
                        name="description"
                        className={`${isActive.title ? "bg-white" : ""} bg-gray-200 dark:bg-darkModeBorderBG h-full w-full outline-none rounded-xl`}
                        onFocus={() => handleFocus("title")}
                        onBlur={() => handleBlur("title")}
                        value={issueData.title}
                        onChange={(e) => setIssueData({ ...issueData, title: e.target.value })}
                    />
                </div>
            </div>
            <div>
                <div className={`${isActive.description ? "bg-white border-black border-2" : ""} w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2 h-[400px] flex flex-col justify-between`}>
                    <div className="text-sm font-normal opacity-60">코맨트를 입력하세요.</div>
                    <textarea
                        name="description"
                        className={`${isActive.description ? "bg-white" : ""} h-full bg-gray-200 dark:bg-darkModeBorderBG w-full outline-none rounded-xl`}
                        onFocus={() => handleFocus("description")}
                        onBlur={() => handleBlur("description")}
                        value={issueData.description}
                        onChange={(e) => setIssueData({ ...issueData, description: e.target.value })}
                        />
                        <FileUploader setIssueData={setIssueData}/>
                </div>
            </div>
        </div>
    );
};

export default NewIssue;

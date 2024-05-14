import React, { useEffect, useState } from "react";
import { Issue } from "./IssueFeed";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
interface IssueCardProps {
    curIssue: Issue;
    id: number;
    isLast: boolean;
    checkItemHandler: (id: string, isChecked: boolean) => void;
    isAllChecked: boolean;
}

const IssueCard: React.FC<IssueCardProps> = ({ curIssue, id, isLast, checkItemHandler, isAllChecked }) => {
    const [isChecked, setChecked] = useState(false);
    
    const checkItemHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.currentTarget;
        setChecked(prev => !prev);
        checkItemHandler(id, checked);
    }

    useEffect(() => {
        if(isAllChecked){
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [isAllChecked])

    return (
        <>
            <div
                key={id}
                className={`${
                    isLast ? "rounded-b-xl" : ""
                } h-90 flex border-t-2 border-gray-300 dark:bg-darkModeBorderBG`}
            >
                <div className="flex h-full w-70% items-center">
                    <input
                        type="checkbox"
                        id={String(id)}
                        checked={isChecked}
                        onChange={(e) => checkItemHandle(e)}
                        className="w-7%"
                    />
                    <Link
                        to={`/issue/${id}`}
                        state={curIssue}
                        className="h-4/5"
                    >
                        <div className="w-full h-1/2 flex items-center">
                            <div className="mr-4 flex gap-2">
                                <InfoCircleOutlined />
                                <div className="text-lg font-medium">
                                    {curIssue.title}
                                </div>
                            </div>
                            <div className="border-2 border-gray-300 px-2 rounded-2xl font-extralight text-sm">
                                Label
                            </div>
                        </div>
                        <div className="w-full h-1/2 flex items-center">
                            <div className="mr-2">#{curIssue.id}</div>
                            <div className="w-full">
                                이 이슈가 {curIssue.created_at}에,{" "}
                                {curIssue.author}님에 의해 작성되었습니다.
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex h-full w-30% items-center">
                    <div className="flex-grow"></div>
                </div>
            </div>
        </>
    );
};

export default IssueCard;

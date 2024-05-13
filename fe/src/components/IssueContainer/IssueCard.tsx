import React from "react";
import { Issue } from "./IssueFeed";
import NotFound from "../../util/NotFound";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
interface IssueCardProps {
    isOpen: boolean;
    issueInfo: Issue[];
}

const IssueCard: React.FC<IssueCardProps> = ({ isOpen, issueInfo }) => {
    const info = issueInfo.filter((curInfo) => curInfo.is_open === isOpen);

    return (
        <>
            {!issueInfo ? (
                <NotFound />
            ) : (
                info.map((curIssue, idx) => (
                    <div key={idx} className={`${info.length - 1 === idx ? "rounded-b-xl" : ""} h-90 flex border-t-2 border-gray-300 dark:bg-darkModeBorderBG`}>
                        <div className="flex h-full w-70% items-center">
                            <input type="checkbox" className="w-7%" />
                            <Link to={`/issue/${idx}`} state={curIssue} className="h-4/5">
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
                                        {curIssue.author}님에 의해
                                        작성되었습니다.
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="flex h-full w-30% items-center">
                            <div className="flex-grow"></div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default IssueCard;

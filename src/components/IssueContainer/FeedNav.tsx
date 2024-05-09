
import React from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import { IssueFeedProps } from "./IssueFeed";

const FeedNav: React.FC<IssueFeedProps> = ({ isOpen, setOpen, issueInfo }) => {
    const issuesLength = {
        open: issueInfo.filter(curIssue => curIssue.is_open === true).length,
        closed: issueInfo.filter(curIssue => curIssue.is_open === false).length
    }

    return (
        <div className="h-45 bg-gray-200 flex text-sm">
            <div className="flex h-full w-70% items-center">
                <input type="checkbox" checked={false} className="w-7%"/>
                <button className={`mr-6 ${isOpen ? "font-bold" : ""}`} onClick={() => setOpen(true)}><InfoCircleOutlined /> 열린 이슈({issuesLength.open})</button>
                <button className={isOpen ? "" : "font-bold"} onClick={() => setOpen(false)}><CreditCardOutlined /> 닫힌 이슈({issuesLength.closed})</button>
            </div>
            <div className="flex h-full w-30% items-center">
                <div className="flex-grow">담당자</div>
                <div className="flex-grow">레이블</div>
                <div className="flex-grow">마일스톤</div>
                <div className="flex-grow">작성자</div>
            </div>


        </div>
    );
};

export default FeedNav;
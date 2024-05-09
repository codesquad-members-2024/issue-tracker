import React from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import { IssueFeedProps } from "./IssueFeed";

const FeedNav: React.FC<IssueFeedProps> = ({ isOpen, setOpen, issueInfo }) => {
    const issuesLength = {
        open: issueInfo.filter(curIssue => curIssue.is_open === true).length,
        closed: issueInfo.filter(curIssue => curIssue.is_open === false).length
    }

    return (
        <div className="h-45 bg-gray-200 flex justify-between text-sm font-normal">
            <div className="flex gap-2 ml-6">
                <input type="checkbox" />
                <button className={isOpen ? "font-bold" : ""} onClick={() => setOpen(true)}><InfoCircleOutlined /> 열린 이슈({issuesLength.open})</button>
                <button className={isOpen ? "" : "font-bold"} onClick={() => setOpen(false)}><CreditCardOutlined /> 닫힌 이슈({issuesLength.closed})</button>
            </div>
            <div className="flex items-center gap-5 mr-6">
                <div>담당자</div>
                <div>레이블</div>
                <div>마일스톤</div>
                <div>작성자</div>
            </div>
        </div>
    );
};

export default FeedNav;

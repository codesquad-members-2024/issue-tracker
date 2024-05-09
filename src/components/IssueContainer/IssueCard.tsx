import React from "react";
import { Issue } from "./IssueFeed";
import NotFound from "../../util/NotFound";
import { Link } from "react-router-dom";

interface IssueCardProps {
    isOpen: boolean;
    issueInfo: Issue[];
}

const IssueCard: React.FC<IssueCardProps> = ({ isOpen, issueInfo }) => {

    const info = issueInfo.filter(curInfo => curInfo.is_open === isOpen)

    return (
        <>
        {!issueInfo ? <NotFound/> : 
        info.map((curIssue, idx) => (
            <Link to={`/issue/${idx}`} state={curIssue} className="h-90 flex items-center justify-center border-t-2 border-gray-300" key={idx}>
                <div>{curIssue.title}</div>
            </Link>
        ))}
        </>
    )
};

export default IssueCard;

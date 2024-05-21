import { useState } from "react";
import TitleInfo from "./TitleInfo";
import TitleView from "./TitleView";

export interface Comment {
    authorId: string;
    contents: string;
    createdAt: string;
    updatedAt: string;
}

export interface Issue {
    id: number;
    authorId: string;
    title: string;
    description: string | null;
    openAt: string;
    updatedAt: string;
    closedAt: string | null;
    milestoneId: number;
    state: "OPEN" | "CLOSED";
    comments: Comment[];
}

export interface TitleContainerProps {
    issueData: Issue;
}

const TitleContainer = ({issueData}: TitleContainerProps) => {
    const [editState, setEditState] = useState(false);

    return (
        <>
        <div>
            <TitleView issueData={issueData}/>
            <TitleInfo issueData={issueData}/>
        </div>
        <div className="border-[1px] my-6"/>
        </>
    )
};

export default TitleContainer;

import { useEffect, useState } from "react";
import FeedNav from "./FeedNav";
import IssueCard from "./IssueCard";
import NotFound from "../../common/NotFound";

interface Comment {
    id: number;
    issueId: { id: number };
    authorId: { id: string };
    contents: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface Issue {
    id: number;
    authorId: string;
    title: string;
    description: string;
    openAt: string;
    updatedAt: string;
    closedAt: string | null;
    milestoneId: { id: number };
    state: "OPEN" | "CLOSED";
    labelRefs: { labelId: number }[];
    assigneeIds: { assigneeId: string }[];
    comments: Comment[];
    deleted: boolean;
}

export interface IssueFeedProps {
    isOpen: string;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
    issueInfo: Issue[];
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
}

const IssueFeed = ({
    isOpen,
    setOpen,
    issueInfo,
    resetFilterUI,
    setResetFilterUI,
}: IssueFeedProps) => {
    const [checkedItem, setCheckItem] = useState<string[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const isOpenInfo = issueInfo.filter((curInfo) => curInfo.state === isOpen);

    const checkItemHandler = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckItem((prev) => [...prev, id]);
        } else {
            setCheckItem((prev) => prev.filter((curItem) => id !== curItem));
        }
        console.log(checkedItem)
    };

    const allCheckHandler = () => {
        setIsAllChecked(prev => !prev);
        
        if(!isAllChecked) {
            setCheckItem(isOpenInfo.map(curIssue => String(curIssue.id)));
        } else {
            setCheckItem([])
        }
    }
    
    useEffect(() => {
        setIsAllChecked(false);
        setCheckItem([])
    }, [isOpen])

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <FeedNav
                isOpen={isOpen}
                setOpen={setOpen}
                issueInfo={issueInfo}
                resetFilterUI={resetFilterUI}
                setResetFilterUI={setResetFilterUI}
                isAllChecked={isAllChecked}
                allCheckHandler={allCheckHandler}
                checkedItem={checkedItem}
            />
            {!isOpenInfo.length ? <NotFound/> : isOpenInfo.map((curIssue, idx) => (
                <IssueCard
                    key={curIssue.id}
                    curIssue={curIssue}
                    id={curIssue.id}
                    isLast={isOpenInfo.length - 1 === idx}
                    checkItemHandler={checkItemHandler}
                    isAllChecked={isAllChecked}
                />
            ))}
            
        </section>
    );
};

export default IssueFeed;

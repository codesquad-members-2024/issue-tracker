import FeedNav from "./FeedNav";
import IssueCard from "./IssueCard";

export interface Issue {
    id: number;
    author: string;
    title: string;
    contents: string;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    milestone_id: number | null;
    is_open: boolean;
    is_deleted: boolean;
}

export interface IssueFeedProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    issueInfo: Issue[]
}

const IssueFeed: React.FC<IssueFeedProps> = ({ isOpen, setOpen, issueInfo}) => {
    return (
        <section className="w-full border-2 border-gray-300 rounded-xl overflow-hidden">
            <FeedNav isOpen = {isOpen} setOpen = {setOpen} issueInfo = {issueInfo}/>
            <IssueCard isOpen = {isOpen}issueInfo = {issueInfo}/>
        </section>
    );
};

export default IssueFeed;

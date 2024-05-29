import CommentBox from "../../common/CommentBox";
import { CommentCard } from "./CommentCard";
import { Comment, UserInfo } from "../../pages/IssueDetailPage";

interface CommentAreaProps {
    commentsData: Comment[] | undefined;
    authorId: string | undefined
    userInfo: UserInfo | null
}
const CommentArea = ({ commentsData, authorId, userInfo }: CommentAreaProps) => {
    // const [comment, setComment] = useState({ description: "" });
    return (
        <div className="h-full">
            {commentsData?.length && commentsData.map((curData, idx) => (
                <CommentCard key={idx} commentInfo={curData} userInfo={userInfo} authorId={authorId}/>
            ))}
            {/* <CommentBox
                height="h-[200px]"
                issueData={comment}
                setIssueData={setComment}
            /> */}
            {/* <button
                onClick={handleCreate}
                disabled={comment.description === ""}
                className={`${
                    comment.description === "" && "bg-gray-200"
                } flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[46px] w-[200px] ml-auto mt-4`}
            >
                완료
            </button> */}
        </div>
    );
};

export default CommentArea;

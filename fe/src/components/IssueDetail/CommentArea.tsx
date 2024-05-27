// import CommentBox from "../../common/CommentBox";
import { CommentCard } from "./CommentCard";
import { Comment } from "./TitleContainer";

interface CommentAreaProps {
    commentData: Comment[];
}
const CommentArea = ({ commentData }: CommentAreaProps) => {
    // const [comment, setComment] = useState({ description: "" });


    return (
        <div className="h-full">
            {commentData.length && commentData.map((curData, idx) => (
                <CommentCard commentInfo={curData} key={idx} />
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

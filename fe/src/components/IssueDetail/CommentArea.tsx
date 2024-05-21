import FileUploader from "../../common/Uploader";
import { CommentCard } from "./CommentCard";
import { Comment } from "./TitleContainer";

interface CommentAreaProps {
    commentData: Comment[]
}
const CommentArea = ({commentData}: CommentAreaProps) => {
    return (
        <div className="h-full">
            
            {commentData.map((curData, idx) => (
                <CommentCard commentInfo={curData} key={idx} />
            ))}
            <div
                className={`w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2 h-[186px] flex flex-col justify-between`}
            >
                <div className="font-normal opacity-60">
                    코맨트를 입력하세요.
                </div>
                <textarea
                    name="description"
                    className={`h-full bg-gray-200 dark:bg-darkModeBorderBG w-full outline-none rounded-xl`}
                />
                <FileUploader />
            </div>
        </div>
    );
};

export default CommentArea;

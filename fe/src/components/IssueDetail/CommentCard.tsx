import { FlagOutlined, SmileOutlined } from "@ant-design/icons";
import { getDateDifference } from "../../common/Utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Comment, UserInfo } from "../../pages/IssueDetailPage";
import { useState } from "react";
interface CommentProps {
    commentInfo: Comment;
    userInfo: UserInfo | null
    authorId: string | undefined
}   

export const CommentCard = ({ commentInfo, userInfo, authorId }: CommentProps) => {
    const [edit, setEdit] = useState(false)

    const handleEditClick = (commentAuthorId: string) => {
        if(userInfo?.id === commentAuthorId) return;
        setEdit(true)
    }
    return (
        <div className="min-h-[120px] w-[960px] border-2 rounded-xl mb-6 flex flex-col">
            <div className="flex justify-between h-[64px] border-b-2 px-6 items-center">
                <div className="flex gap-2">
                    <div>{commentInfo.authorId}</div>
                    <div className="font-light">{getDateDifference(commentInfo.createdAt)}</div>
                </div>
                <div className="flex gap-2 text-sm font-medium">
                    {authorId === commentInfo.authorId && <div className="border-2 border-gray-200 rounded-xl px-2 bg-gray-200 font-light">작성자</div>}
                    <button onClick={() => handleEditClick(commentInfo.authorId)}><FlagOutlined/> 편집</button>
                    <button><SmileOutlined/> 반응</button>
                </div>
            </div>
            {!edit ? 
            <div className="h-full bg-white rounded-b-xl dark:bg-darkModeBorderBG">
                <ReactMarkdown className="m-4" remarkPlugins={[remarkGfm]}>
                    {commentInfo.contents}
                </ReactMarkdown>
            </div>
            : 
            ""
            // <CommentBox/>
            }
            
        </div>
    );
};

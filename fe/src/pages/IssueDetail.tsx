import { useLocation, useParams } from "react-router-dom";
import { Header } from "../common/UtilUI";
import TitleContainer from "../components/IssueDetail/TitleContainer";
import Sidebar from "../common/Sidebar";
import { CommentCard } from "../components/IssueDetail/CommentCard";
import { DeleteOutlined } from "@ant-design/icons";
import FileUploader from "../common/Uploader";
import CommentArea from "../components/IssueDetail/CommentArea";

const mockData = {
    id: 1,
    authorId: "cori1234",
    title: "제목1",
    description: null,
    openAt: "2024-05-21T17:55:29.075371",
    updatedAt: "2024-05-21T17:55:29.075371",
    closedAt: "2024-05-21T17:55:29.075371",
    milestoneId: 1,
    state: "OPEN",
    comments: [
        {
            authorId: "jayden1234",
            contents: "댓글 내용",
            createdAt: "2024-05-21T17:55:29.075943",
            updatedAt: "2024-05-21T17:55:29.075943",
        },
        {
            authorId: "cori1234",
            contents: "댓글 내용",
            createdAt: "2024-05-21T17:55:29.075943",
            updatedAt: "2024-05-21T17:55:29.075943",
        },
    ],
};

const IssueProduct = () => {
    const { productId } = useParams();
    // productId로 get 요청
    // const location = useLocation();
    // const issueInfo = location.state;

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <TitleContainer issueData={mockData} />
            <section className="flex justify-between">
                <CommentArea commentData={mockData.comments} />
                <div className="h-full">
                    <Sidebar />
                    <button className="w-full text-right text-red-500 my-4 p-2">
                        <DeleteOutlined /> 이슈 삭제
                    </button>
                </div>
            </section>
        </main>
    );
};

export default IssueProduct;

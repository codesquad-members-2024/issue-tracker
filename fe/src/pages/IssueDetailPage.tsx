import { Header } from "../common/UtilUI";
import { DeleteOutlined } from "@ant-design/icons";
import CommentArea from "../components/IssueDetail/CommentArea";
import TitleContainer from "../components/IssueDetail/TitleContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQueryHook from "../\bhooks/useQueryHook";
import { Loading } from "../common/NotFound";
import { APiUtil } from "../common/Utils";
import { ModalComponent } from "../common/Modal";

interface Milestone {
    id: number;
    title: string;
    openIssueCount: number;
    closedIssueCount: number;
}

interface Label {
    id: number;
    name: string;
    description: string;
    textColor: string;
    backgroundColor: string;
    deleted: boolean;
}

interface Assignee {
    id: string;
    imgUrl: string;
}

export interface Comment {
    authorId: string;
    contents: string;
    createdAt: string;
    updatedAt: string;
}

export interface IssueDetail {
    id: number;
    authorId: string;
    title: string;
    content: string;
    openAt: string;
    updatedAt: string;
    milestone: Milestone;
    labels: Label[];
    assignees: Assignee[];
    comments: Comment[];
    commentCount: number;
}

export interface UserInfo {
    id: string;
    imgUrl: string;
}

const userString = sessionStorage.getItem("user");
const userInfo: UserInfo | null = userString ? JSON.parse(userString) : null;

const IssueProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isOpen = location.state;
    const { productId } = useParams();

    const { data, isLoading } = useQueryHook(productId, `issues/${productId}`);
    if (isLoading) return <div><Loading /></div>;

    const handleDelete = async () => {
        await APiUtil.deleteData("issues", data.id);
        navigate("/issue");
    };
    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <TitleContainer
                issueData={data}
                isOpen={isOpen}
                productId={productId}
            />
            <section className="flex justify-between">
                <CommentArea
                    detailData={data}
                    authorId={data?.authorId}
                    userInfo={userInfo}
                    productId={productId}
                />
                <div className="h-full">
                    {/* <Sidebar /> */}

                    <div className="w-full text-right text-red-500 my-4 p-2">
                        <DeleteOutlined />
                        <ModalComponent
                            type="이슈 삭제"
                            callBack={() => handleDelete()}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default IssueProduct;

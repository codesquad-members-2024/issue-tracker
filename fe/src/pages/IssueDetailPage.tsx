import { Header } from "../common/UtilUI";
// import Sidebar from "../common/Sidebar";
import { DeleteOutlined } from "@ant-design/icons";
// import CommentArea from "../components/IssueDetail/CommentArea";
import TitleContainer from "../components/IssueDetail/TitleContainer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { APiUtil } from "../common/Utils";
import { Loading } from "../common/NotFound";

const IssueProduct = () => {
    const { productId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["issues"],
        queryFn: () => APiUtil.getData(`issues/${productId}`),
    });

    if (isLoading) return <div><Loading/></div>;
    // if (error) throw error;
    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <TitleContainer issueData={data} />
            <section className="flex justify-between">
                {/* <CommentArea commentData={mockData.comments} /> */}
                <div className="h-full">
                    {/* <Sidebar /> */}
                    <button className="w-full text-right text-red-500 my-4 p-2">
                        <DeleteOutlined /> 이슈 삭제
                    </button>
                </div>
            </section>
        </main>
    );
};

export default IssueProduct;


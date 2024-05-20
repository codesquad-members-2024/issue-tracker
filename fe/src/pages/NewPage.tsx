import { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Header } from "../common/UtilUI";
import Comment from "../components/NewIssue/Comment";
import { Link } from "react-router-dom";

export interface IssueData {
    userId: string;
    title: string;
    description: string;
    assigneeIds: string[];
    labelIds: number[];
    milestoneId: number;
}

const NewPage = () => {
    const [issueData, setIssueData] = useState<IssueData>({
        userId: "",
        title: "",
        description: "",
        assigneeIds: [],
        labelIds: [],
        milestoneId: 0
    })

    const handleCreate = () => {
        // 이슈 생성 post 보낸 후 파일 업로드
        // navigator로 "/issue"로 이동
        // 파일 state를 어디서 처리할지 고민
    }

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <h1 className="font-semibold h-[48px] text-3xl">
                새로운 이슈 작성
            </h1>
            <section className="flex gap-2 justify-between mt-4 py-6 border-t-2 border-b-2">
                <div className="items-center">
                    <img
                        src="/public/img/UserImage.png"
                        alt="User Image"
                    />
                </div>
                <div className="w-[912px]">
                    <Comment issueData={issueData} setIssueData={setIssueData}/>
                </div>
                <Sidebar />
            </section>
            <div className="flex justify-end gap-6 mt-4 items-center">
                <Link to="/issue">X 작성 취소</Link>
                <button onClick={handleCreate} className="flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[46px] w-[200px]">완료</button>
            </div>
        </main>
    );
};

export default NewPage;

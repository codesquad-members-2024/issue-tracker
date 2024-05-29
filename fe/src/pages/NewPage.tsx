import { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Header } from "../common/UtilUI";
import { Link, useNavigate } from "react-router-dom";
import NewIssue from "../components/NewIssue/NewIssue";
import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../common/Utils";
import { UserImgBox } from "../common/UserImgBox";
import { UserInfo } from "./IssueDetailPage";
export interface Users {
    id: number;
    username: string;
    createdAt: string;
    imgUrl: string;
    role: string
}
export interface PostRequestFrom {
    userId: string;
    title: string;
    content: string;
    assigneeIds: number[];
    labelIds: number[];
    milestoneId: number | null;
}
export interface NewIssueForm {
    userId: string;
    title: string;
    content: string;
    assignees: Users[];
    labels: Label[];
    milestone: Milestone[];
}

const userString = sessionStorage.getItem("user");
const userInfo: UserInfo | null = userString ? JSON.parse(userString) : null;

// labels, milestone, assignees
const NewPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // const userName = sessionStorage.getItem("user")
    const [newIssueForm, setNewsIssueForm] = useState<NewIssueForm>({
        userId: "user1",
        title: "",
        content: "",
        assignees: [],
        labels: [],
        milestone: [],
    });

    const { mutate } = useMutation({
        mutationFn: async (newData: PostRequestFrom) => {
            await APiUtil.createData("issues", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"]});
        },
    });

    const handleCreate = () => {
        const newData: PostRequestFrom = {
            ...newIssueForm,
            assigneeIds: newIssueForm.assignees ? newIssueForm.assignees.map((cur: Users) => cur.id) : [],
            labelIds: newIssueForm.labels ? newIssueForm.labels.map((cur: Label) => cur.id) : [],
            milestoneId: !newIssueForm.milestone ? null : newIssueForm.milestone[0]?.id 
        };
        mutate(newData)
        navigate("/issue")
    };
    

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <h1 className="font-semibold h-[48px] text-3xl">
                새로운 이슈 작성
            </h1>
            <section className="flex gap-2 justify-between mt-4 py-6 border-t-2 border-b-2">
                <div className="items-center">
                    <UserImgBox imgURL={userInfo?.imgUrl} margin="" width="50px" height="50px"/>
                </div>
                <div className="w-[912px]">
                    <NewIssue
                        issueData={newIssueForm}
                        setIssueData={setNewsIssueForm}
                    />
                </div>
                <Sidebar issueData={newIssueForm} setIssueData={setNewsIssueForm} />
            </section>
            <div className="flex justify-end gap-6 mt-4 items-center">
                <Link to="/issue">X 작성 취소</Link>
                <button
                    onClick={handleCreate}
                    disabled={newIssueForm.title === ""}
                    className={`${
                        newIssueForm.title === "" && "bg-gray-200"
                    } flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[46px] w-[200px]`}
                >
                    완료
                </button>
            </div>
        </main>
    );
};

export default NewPage;

import { Header } from "../common/UtilUI";
import MilestoneEditUI from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
import Nav from "../components/LabelsMilestones/Nav";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import { APiUtil } from "../common/Utils";
import { MilestoneFeed } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common/NotFound";

const MilestonesPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["milestones"],
        queryFn: () => APiUtil.getData("milestones"),
    });
    // 에러 로딩 처리 따로
    if (isLoading) return <div><Loading/></div>;
    if (error) return <div>error...</div>;

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="milestone" />
                <MilestoneEditUI />
                <MilestoneFeed milestoneData={data} />
            </ModifyDeleteProvider>
        </main>
    );
};

export default MilestonesPage;

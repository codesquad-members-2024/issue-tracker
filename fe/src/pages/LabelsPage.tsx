import { Header } from "../common/UtilUI";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import Nav from "../components/LabelsMilestones/Nav";
import { LabelFeed } from "../components/LabelsMilestones/Labels/LabelFeed";
import LabelEditUI from "../components/LabelsMilestones/Labels/LabelEditUI";
import { useQuery } from "@tanstack/react-query";
import { APiUtil } from "../common/Utils";
import { Loading } from "../common/NotFound";

const LabelsPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["labels"],
        queryFn: () => APiUtil.getData("labels"),
    });
    if (isLoading) return <div><Loading/></div>;
    if (error) return <div>error...</div>;
    
    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="labels" labelsCount={data[0].labelCount} milestoneCount={data[0].milestoneCount}/>
                <LabelEditUI />
                <LabelFeed labelsInfo={data}/>
            </ModifyDeleteProvider>
        </main>
    );
};

export default LabelsPage;

// const params = ["is_open=false", "label=BE"];

// const query = params.map(k => encodeURIComponent(k)).join('=&');

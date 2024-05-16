import { useEffect, useState } from "react";
import { Header } from "../util/UtilUI";
import MilestoneEditUI from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
import Nav from "../components/LabelsMilestones/Nav";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import { APiUtil } from "../util/APIUtils";
import { MilestoneFeed } from "../components/LabelsMilestones/Milestones/MilestoneFeed";

const MilestonesPage = () => {
    const [milestoneInfo, setMilestoneInfo] = useState([]);

    useEffect(() => {
        const getMilestoneList = async () => {
            const milestoneList = await APiUtil.getNewsData("milestones");
            setMilestoneInfo(milestoneList);
        };
        getMilestoneList();
    }, []);

    return (
        <main className="w-1280 mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="milestone" />
                <MilestoneEditUI />
                <MilestoneFeed milestoneInfo={milestoneInfo} />
            </ModifyDeleteProvider>
        </main>
    );
};

export default MilestonesPage;

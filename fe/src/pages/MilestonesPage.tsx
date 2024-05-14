import React, { useEffect, useState } from "react";
import { Header } from "../util/UtilUI";
import ModifyDeleteUI from "../components/MilestoneContainer/ModifyDeleteUI";
import MilestoneFeed from "../components/MilestoneContainer/MilestoneFeed";
import { APiUtil } from "../util/APIUtils";
import Nav from "../components/MilestoneContainer/Nav";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";

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
                <Nav />
                <ModifyDeleteUI/>
                <MilestoneFeed milestoneInfo={milestoneInfo}/>
            </ModifyDeleteProvider>
        </main>
    );
};

export default MilestonesPage;

import { Header } from "../common/UtilUI";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import Nav from "../components/LabelsMilestones/Nav";
import { useEffect, useState } from "react";
import { LabelFeed } from "../components/LabelsMilestones/Labels/LabelFeed";
import LabelEditUI from "../components/LabelsMilestones/Labels/LabelEditUI";
const LabelsPage = () => {

    const [labelsInfo, setLabelsInfo] = useState([]);
    
    useEffect(() => {
        const getLabelList = async () => {
            const milestoneList = await fetch("http://localhost:9999/labels");
            const data = await milestoneList.json()
            setLabelsInfo(data);
        };
        getLabelList();
    }, []);

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="labels"/>
                <LabelEditUI />
                <LabelFeed labelsInfo={labelsInfo}/>
            </ModifyDeleteProvider>
        </main>
    );
};

export default LabelsPage;

// const params = ["is_open=false", "label=BE"];

// const query = params.map(k => encodeURIComponent(k)).join('=&');
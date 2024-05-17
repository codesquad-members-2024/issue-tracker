import { Header } from "../util/UtilUI";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import Nav from "../components/LabelsMilestones/Nav";
import { useEffect, useState } from "react";
import { APiUtil } from "../util/APIUtils";
import { LabelFeed } from "../components/LabelsMilestones/Labels/LabelFeed";
import LabelEditUI from "../components/LabelsMilestones/Labels/LabelEditUI";
const LabelsPage = () => {

    const [labelsInfo, setLabelsInfo] = useState([]);
    
    useEffect(() => {
        const getLabelList = async () => {
            const milestoneList = await APiUtil.getData("labels");
            setLabelsInfo(milestoneList);
        };
        getLabelList();
    }, []);


    return (
        <main className="w-1280 mx-auto">
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
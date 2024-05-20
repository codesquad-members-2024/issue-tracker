import Nav from "../components/IssueContainer/Nav";
import IssueFeed from "../components/IssueContainer/IssueFeed";
import { useEffect, useState } from "react";
import FilterProvider from "../Providers/FilterProvider";
import { Header } from "../common/UtilUI";
import { APiUtil } from "../common/APIUtils";
const IssuePage = () => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const [issueInfo, setIssueInfo] = useState([]);
    const [resetFilterUI, setResetFilterUI] = useState(false);

    const handleResetFilterUI = () => setResetFilterUI(true);

    useEffect(() => {
        const getLabelList = async () => {
            const milestoneList = await APiUtil.getData("issues");
            setIssueInfo(milestoneList);
        };
        getLabelList();
    }, []);

    return (
        <main className="w-1280 mx-auto">
            <Header/>
            <FilterProvider>
                <Nav
                    resetFilterUI={resetFilterUI}
                    setResetFilterUI={setResetFilterUI}
                    handleResetFilterUI={handleResetFilterUI}
                />
                <IssueFeed
                    isOpen={isOpen}
                    setOpen={setOpen}
                    issueInfo={issueInfo}
                    resetFilterUI={resetFilterUI}
                    setResetFilterUI={setResetFilterUI}
                />
            </FilterProvider>
        </main>
    );
};

export default IssuePage;
// 엔터 눌렀을때, 필터 눌렀을때 
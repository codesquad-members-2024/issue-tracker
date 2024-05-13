import Nav from "../../components/IssueContainer/Nav";
import IssueFeed from "../../components/IssueContainer/IssueFeed";
import { useEffect, useState } from "react";
import { APiUtil } from "../../util/APIUtils";
import FilterProvider from "../../Providers/FilterProvider";

const IssuePage = () => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const [issueInfo, setIssueInfo] = useState([]);
    const [resetFilterUI, setResetFilterUI] = useState(false);

    const handleResetFilterUI = () => setResetFilterUI(true);

    useEffect(() => {
        const getIssueList = async () => {
            const issueList = await APiUtil.getNewsData("issues");
            setIssueInfo(issueList);
        };
        getIssueList();
    }, []);

    return (
        <main className="w-1280 mx-auto">
            <header className="py-10 flex justify-between">
                <h3 className="text-3xl font-style: italic font-normal">
                    Issue Tracker
                </h3>
                <img src="/public/img/UserImage.png" alt="User Image" />
            </header>
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
                    handleResetFilterUI={handleResetFilterUI}
                />
            </FilterProvider>
        </main>
    );
};

export default IssuePage;
// 엔터 눌렀을때, 필터 눌렀을때 
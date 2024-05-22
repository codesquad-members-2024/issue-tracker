import Nav from "../components/IssueContainer/Nav";
import IssueFeed from "../components/IssueContainer/IssueFeed";
import { useState } from "react";
import FilterProvider from "../Providers/FilterProvider";
import { Header } from "../common/UtilUI";
import { APiUtil } from "../common/Utils";
import { useQuery } from "@tanstack/react-query";

const IssuePage = () => {
    const [isOpen, setOpen] = useState<string>("OPEN");
    const [resetFilterUI, setResetFilterUI] = useState(false);

    const handleResetFilterUI = () => setResetFilterUI(true);

    const { data, error, isLoading } = useQuery({
        queryKey: ["issues"],
        queryFn: () => APiUtil.getData("issues?state=OPEN"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>error...</div>;

    return (
        <main className="w-[1280px] mx-auto">
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
                    issueInfo={data}
                    resetFilterUI={resetFilterUI}
                    setResetFilterUI={setResetFilterUI}
                />
            </FilterProvider>
        </main>
    );
};

export default IssuePage;
// 엔터 눌렀을때, 필터 눌렀을때 
import Nav from "../../components/IssueContainer/Nav";
import IssueFeed from "../../components/IssueContainer/IssueFeed";
import { useEffect, useState } from "react";
import { APiUtil } from "../../util/APIUtils";

const IssuePage = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const [issueInfo, setIssueInfo] = useState([])

    useEffect(() => {
        const getIssueList = async() => {
            const issueList = await APiUtil.getNewsData("issues")
            setIssueInfo(issueList)
        }
        getIssueList()
    }, [])

    return (
        <main className="w-1280 mx-auto">
            <header className="py-10 flex justify-between">
                <h3 className="text-3xl font-style: italic font-normal">
                    Issue Tracker
                </h3>
                <img src="/public/img/UserImage.png" alt="User Image"/>
            </header>
            <Nav />
            <IssueFeed isOpen = {isOpen} setOpen = {setOpen} issueInfo = {issueInfo}/>
        </main>
    );
};

export default IssuePage;
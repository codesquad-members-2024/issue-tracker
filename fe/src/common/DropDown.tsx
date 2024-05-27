import { useEffect, useState } from "react";
import { APiUtil } from "./Utils";
import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { PlusOutlined } from "@ant-design/icons";
import { TableType } from "./Sidebar";
import { NewIssueForm } from "../pages/NewPage";
import DropDownList from "./DropDownList";
import Progressbar from "./Progressbar";

interface DropDownProps {
    curKey: keyof TableType;
    idx: number;
    query: TableType[keyof TableType];
    issueData: NewIssueForm
    setIssueData: React.Dispatch<React.SetStateAction<NewIssueForm>>;
    lastIdx: number
}

const sideTable: { [key in TableType[keyof TableType]]: keyof NewIssueForm } = {
    assignees: "assigneeIds",
    labels: "labelIds",
    milestones: "milestoneId",
};

const DropDown = ({ curKey, idx, query, issueData, setIssueData, lastIdx }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState<(Label | Milestone)[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleClick = (curData: Label | Milestone) => {
        setIssueData((prev) => {
            const key = sideTable[query];
            const currentSideItem = prev[key] as (Label | Milestone)[];
    
            if (currentSideItem.find((item) => item.id === curData.id)) {
                return {
                    ...prev,
                    [key]: currentSideItem.filter((item) => item.id !== curData.id),
                };
            }
    
            return {
                ...prev,
                [key]: [...currentSideItem, curData],
            };
        });
        setOpen(false);
    };
    

    useEffect(() => {
        const fetchData = async () => {
            if (isOpen) {
                setLoading(true);
                try {
                    const filterInfo = await APiUtil.getData(query);
                    if (query === "labels" && filterInfo && filterInfo.labelResponses) {
                        setData(filterInfo.labelResponses);
                    } else if (query === "milestones" && filterInfo && filterInfo.milestones) {
                        setData(filterInfo.milestones);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
    }, [isOpen, query]);
    
    return (
        <li
            className={`${
                idx === lastIdx && "border-none"
            } p-6 border-b-2 border-gray-200 relative`}
        >
            <div
                onClick={toggleDropdown}
                key={idx}
                className="flex justify-between my-2"
            >
                <div>{curKey}</div>
                <PlusOutlined />
            </div>
            {(issueData[sideTable[query]] as (Label | Milestone)[]).map(
                (curData, idx) => (
                    <div key={idx} className="flex flex-col my-2">
                        {query === "labels" && (
                            <div className="flex">
                                <div
                                    className="rounded-xl px-3"
                                    style={{
                                        backgroundColor: (curData as Label)
                                            .backgroundColor,
                                        color: (curData as Label).textColor,
                                    }}
                                >
                                    {(curData as Label).name}
                                </div>
                            </div>
                        )}
                        {query === "milestones" && (
                            <>
                                <Progressbar open={(curData as Milestone).openIssueCount} closed={(curData as Milestone).closedIssueCount} />
                                <div className="text-right">{(curData as Milestone).title}</div>
                            </>
                        )}
                        {query === "assignees" && <div>담당자 API 안나옴</div>}
                    </div>
                )
            )}
            {isOpen && (
                <DropDownList
                    curKey={curKey}
                    data={data}
                    handleClick={handleClick}
                    query={query}
                    loading={loading}
                    issueData={
                        issueData[sideTable[query]] as (Label | Milestone)[]
                    }
                />
            )}
        </li>
    );
};

export default DropDown;

// 같은 UI 다른 기능?
// 보여주는 건 동일하니 handler, data만 콜백으로 넘겨주면됨
// 그러면 data 타입이 동일해야하고 handle러 파라미터가 동일해야함
// 
import { useEffect, useState } from "react";
import { APiUtil } from "./Utils";
import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { PlusOutlined } from "@ant-design/icons";
import { TableType } from "./Sidebar";
import { NewIssueForm } from "../pages/NewPage";
import DropDownList from "./DropDownList";
import Progressbar from "./Progressbar";
import { UserImgBox } from "./UserImgBox";
import { Users } from "../pages/NewPage";
// labels, milestone, assignees

interface DropDownProps {
    curTableItem: keyof TableType;
    idx: number;
    queryName: TableType[keyof TableType];
    issueData: NewIssueForm
    setIssueData: React.Dispatch<React.SetStateAction<NewIssueForm>>;
    lastIdx: number
}

const sideTable: { [key in TableType[keyof TableType]]: keyof NewIssueForm } = {
    users: "assignees",
    labels: "labels",
    milestones: "milestone",
};

const DropDown = ({ curTableItem, idx, queryName, issueData, setIssueData, lastIdx }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState<(Label | Milestone| Users)[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleClick = (curData: Label | Milestone | Users) => {
        setIssueData((prev) => {
            const key = sideTable[queryName];
            const currentSideItem = prev[key] as (Label | Milestone | Users)[];
    
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
                    const filterInfo = await APiUtil.getData(queryName);
                    if (queryName === "labels" && filterInfo && filterInfo.labelResponses) {
                        setData(filterInfo.labelResponses);
                    } else if (queryName === "milestones" && filterInfo && filterInfo.milestones) {
                        setData(filterInfo.milestones);
                    } else {
                        setData(filterInfo);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
        console.log(issueData)
    }, [isOpen, queryName]);
    
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
                <div>{curTableItem}</div>
                <PlusOutlined />
            </div>
            {(issueData[sideTable[queryName]] as (Label | Milestone | Users)[]).map(
                (curData, idx) => (
                    <div key={idx} className="flex flex-col my-2">
                        {queryName === "labels" && (
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
                        {queryName === "milestones" && (
                            <>
                                <Progressbar open={(curData as Milestone).openIssueCount} closed={(curData as Milestone).closedIssueCount} />
                                <div className="text-right">{(curData as Milestone).title}</div>
                            </>
                        )}
                        {queryName === "users" && (
                            <div className="flex gap-2">
                                <UserImgBox imgURL={(curData as Users).imgUrl} margin="auto" width="20px" height="20px"/>
                                <p>{(curData as Users).id}</p>
                            </div>
                        )}
                    </div>
                )
            )}
            {isOpen && (
                <DropDownList
                curTableItem={curTableItem}
                    data={data}
                    handleClick={handleClick}
                    queryName={queryName}
                    loading={loading}
                    issueData={
                        issueData[sideTable[queryName]] as (Label | Milestone | Users)[]
                    }
                />
            )}
        </li>
    );
};

export default DropDown;
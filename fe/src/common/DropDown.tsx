import { useEffect, useState } from "react";
import { APiUtil } from "./Utils";
import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { PlusOutlined } from "@ant-design/icons";
import { TableType } from "./Sidebar";
import { IssueData } from "../pages/NewPage";
import DropDownList from "./DropDownList";

interface DropDownProps {
    curKey: keyof TableType;
    idx: number;
    query: TableType[keyof TableType];
    setIssueData: React.Dispatch<React.SetStateAction<IssueData>>;
    lastIdx: number
}

const DropDown = ({ curKey, idx, query, setIssueData, lastIdx }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectData, setSelectData] = useState<(Label& Milestone)[]>([]);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleClick = (curData: Label & Milestone ) => {
        setSelectData((prev) => {
            if (prev.find((item) => item.id === curData.id)) {
                return prev.filter((item) => item.id !== curData.id);
            } else {
                return [...prev, curData];
            }
        });
        setOpen(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isOpen) {
                setLoading(true)
                const filterInfo = await APiUtil.getData(query);
                setData(filterInfo);
                setLoading(false)
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
            {selectData.map((curData: Label & Milestone , idx) => (
                <div key={idx} className="flex flex-col gap-2">
                    {curData.backgroundColor && (
                        <div className="flex">
                            <div
                                className="rounded-xl px-3"
                                style={{
                                    backgroundColor: curData.backgroundColor,
                                    color: curData.textColor,
                                }}
                            >
                                {curData.name}
                            </div>
                            <div />
                        </div>
                    )}
                    {curData.description && (
                        <div>
                            {curData.title}
                        </div>
                    )}
                    {!curData.backgroundColor && !curData.description && (
                        <div>담당자 API 안나옴</div>
                    )}
                </div>
            ))}
            {isOpen && (
                <DropDownList curKey={curKey} data={data} handleClick={handleClick} query={query} selectData={selectData} setIssueData={setIssueData} loading={loading}/>
            )}
        </li>
    );
};

export default DropDown;


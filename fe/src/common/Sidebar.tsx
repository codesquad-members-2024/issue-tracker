import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { APiUtil } from "./Utils";

type TableType = {
    담당자: string;
    레이블: string;
    마일스톤: string;
};

const table: TableType = {
    담당자: "assignees",
    레이블: "labels",
    마일스톤: "milestones",
};

interface DropDownProps {
    curKey: keyof TableType;
    idx: number;
    query: TableType[keyof TableType];
}

const DropDown = ({ curKey, idx, query }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState([])

    const toggleDropdown = () => setOpen(!isOpen);

    useEffect(() => {
        const fetchData = async () => {
            if (isOpen) {
                const filterInfo = await APiUtil.getData(query);
                setData(filterInfo);
            }
        };
        fetchData();
    }, [isOpen])
    
    return (
        <li
            className={`${
                idx === Object.keys(table).length - 1 ? "border-none" : ""
            } p-6 border-b-2 border-gray-200`}
        >
            <div
                onClick={toggleDropdown}
                key={idx}
                className="flex justify-between"
            >
                <div>{curKey}</div>
                <PlusOutlined />
            </div>
            {isOpen && <div>123</div>}
        </li>
    );
};

const Sidebar = () => {
    return (
        <ul className="w-[288px] border-2 bg-white rounded-xl border-gray-200 h-full dark:bg-darkModeBorderBG">
            {Object.keys(table).map((curKey, idx) => (
                <DropDown
                    key={idx}
                    curKey={curKey as keyof TableType}
                    idx={idx}
                    query={table[curKey as keyof TableType]}
                />
            ))}
        </ul>
    );
};

export default Sidebar;

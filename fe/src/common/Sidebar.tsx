import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

// 폼 state를 props로 전달

type TableType = {
    담당자: string[];
    레이블: { type: string; color: string }[];
    마일스톤: { id: string; name: string }[];
};

const table: TableType = {
    담당자: ["cory", "jayden", "george"],
    레이블: [
        { type: "bug", color: "#ffffff" },
        { type: "documentation", color: "#00ffff" },
    ],
    마일스톤: [
        { id: "1001", name: "이슈 트렉커" },
        { id: "1002", name: "뉴스 스탠드" },
    ],
};

interface DropDownProps {
    curKey: keyof TableType;
    idx: number;
    value: TableType[keyof TableType];
}

const DropDown = ({ curKey, idx, value }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen(!isOpen);
        console.log(value)
    };

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
                    value={table[curKey as keyof TableType]}
                />
            ))}
        </ul>
    );
};

export default Sidebar;

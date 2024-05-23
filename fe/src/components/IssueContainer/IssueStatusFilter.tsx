import { useState } from "react";
import {
    DownOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";

const filterType = [
    { type: "선택한 이슈 열기", value: "open" },
    { type: "선택한 이슈 닫기", value: "closed" },
];

const IssueStatusFilter = ({checkedItem}: {checkedItem: string[]}) => {
    const [isOpen, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => {
        e.preventDefault();
        // value에 따라서 Open, closed 를 patch 보낼지 판단 후 요청
        console.log(value, checkedItem)
    }
    return (
        <button
            className="w-[50%] m-auto relative text-right mr-8"
            onClick={toggleDropdown}
        >
            <div>
                상태 수정 <DownOutlined />
            </div>
            {isOpen && (
                <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[200px] flex flex-col rounded-xl">
                    {filterType.map((curType, idx) => (
                        <div
                            key={idx}
                            className="flex-grow border-b-2 border-gray-200 px-6 flex items-center justify-between h-10"
                            onClick={(e) => handleClick(e, curType.value)}
                        >
                            <div>{curType.type}</div>
                            <MinusCircleOutlined />
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default IssueStatusFilter;

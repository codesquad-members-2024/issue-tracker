import React, { useContext, useEffect, useRef, useState } from "react";
import {
    DownOutlined,
    MinusCircleOutlined,
    DownCircleOutlined,
} from "@ant-design/icons";
import { FilterContext } from "../Providers/FilterProvider";

const INITIAL_IDX = 0

export interface Filter {
    value: string;
    query: string;
}

interface FilterProps {
    filterInfo: Filter[];
    filterType: string;
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUI: React.FC<FilterProps> = ({
    filterInfo,
    filterType,
    resetFilterUI,
    setResetFilterUI,
}) => {
    const [FilterState, FilterDispatch] = useContext(FilterContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState<Filter>(filterInfo[0]);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (resetFilterUI) setSelectItem(filterInfo[INITIAL_IDX]);
        setResetFilterUI(false);
        FilterDispatch({ type: "SET_INIT", prevFilter: "", curFilter: "" });
    }, [resetFilterUI, filterInfo, FilterDispatch, setResetFilterUI]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (type: Filter) => {
        if (selectItem?.value === type.value) {
            FilterDispatch({
                type: "REMOVE_CURRENT_FILTER",
                prevFilter: "",
                curFilter: type.query,
            });
            return setSelectItem(filterInfo[INITIAL_IDX]);
        }
        FilterDispatch({
            type:filterType === "필터" ? "SET_ISSUE_FILTER" : "SET_TASK_FILTER",
            prevFilter: selectItem.query,
            curFilter: type.query,
        });
        return setSelectItem(type);
    };

    return (
        <button
            onClick={toggleDropdown}
            className="relative text-sm font-normal h-full w-full"
            ref={dropdownRef}
        >
            <div className="flex justify-evenly h-full items-center">
                <div>{filterType}</div>
                <DownOutlined />
            </div>
            {isOpen && (
                <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[230px] flex flex-col rounded-xl">
                    {filterInfo.map((type, idx) => (
                        <div
                            onClick={() => handleClick(type)}
                            className="flex-grow border-b-2 border-gray-200 px-6 flex items-center justify-between h-10"
                            key={idx}
                        >
                            <div
                                className={
                                    selectItem?.value === type.value
                                        ? "font-bold"
                                        : ""
                                }
                            >
                                {type.value}
                            </div>
                            {selectItem?.value === type.value ? (
                                <DownCircleOutlined />
                            ) : (
                                <MinusCircleOutlined />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default FilterUI;

import React from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Milestone } from "./MilestoneFeed";

interface MilestoneFeedProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    milestoneInfo: Milestone[]
}

export const FeedNav: React.FC<MilestoneFeedProps> = ({isOpen, setOpen, milestoneInfo}) => {
    const MilestoneLength = {
        open: milestoneInfo.filter((curIssue) => curIssue.open).length,
        closed: milestoneInfo.filter((curIssue) => !curIssue.open).length,
    };

    return (
        <div className="h-45 bg-gray-200 transition-colors duration-500 dark:bg-darkModeBorderBG flex text-sm rounded-t-lg">
            <div className="flex items-center gap-4 text-sm ml-4">
                <button className={`${isOpen ? "font-bold" : ""}`} onClick={() => setOpen(true)}>
                    <InfoCircleOutlined /> 열린 마일스톤({MilestoneLength.open})
                </button>
                <button className={`${!isOpen ? "font-bold" : ""}`} onClick={() => setOpen(false)}>
                    <CreditCardOutlined /> 닫힌 마일스톤({MilestoneLength.closed})
                </button>
            </div>
        </div>
    );
};

import { useState } from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import NotFound from "../../../util/NotFound";
import MilestoneCard from "./MilestoneCard";

export interface Milestone {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    openAt: string;
    updatedAt: string;
    open: boolean;
    deleted: boolean;
}


interface MilestoneFeedProps {
    milestoneInfo: Milestone[];
}

export const MilestoneFeed = ({ milestoneInfo }: MilestoneFeedProps) => {
    const [isOpen, setOpen] = useState(true);
    const isOpenInfo = milestoneInfo.filter(
        (curInfo) => curInfo.open === isOpen
    );
    const MilestoneLength = {
        open: milestoneInfo.filter((curIssue) => curIssue.open).length,
        closed: milestoneInfo.filter((curIssue) => !curIssue.open).length,
    };

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <div className="h-45 bg-gray-200 transition-colors duration-500 dark:bg-darkModeBorderBG flex text-sm rounded-t-lg">
                <div className="flex items-center gap-4 text-sm ml-4">
                    <button
                        className={`${isOpen ? "font-bold" : ""}`}
                        onClick={() => setOpen(true)}
                    >
                        <InfoCircleOutlined /> 열린 마일스톤(
                        {MilestoneLength.open})
                    </button>
                    <button
                        className={`${!isOpen ? "font-bold" : ""}`}
                        onClick={() => setOpen(false)}
                    >
                        <CreditCardOutlined /> 닫힌 마일스톤(
                        {MilestoneLength.closed})
                    </button>
                </div>
            </div>
            {!isOpenInfo.length ? (
                <NotFound />
            ) : (
                isOpenInfo.map((curMilestone) => (
                    <MilestoneCard
                        curMilestone={curMilestone}
                        key={curMilestone.id}
                    />
                ))
            )}
        </section>
    );
};

import React, { useState } from "react";
import { FeedNav } from "./FeedNav";
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

export interface MilestoneFeedProps {
    milestoneInfo: Milestone[];
}

const MilestoneFeed: React.FC<MilestoneFeedProps> = ({milestoneInfo}) => {
    const [isOpen, setOpen] = useState(true);
    const isOpenInfo = milestoneInfo.filter((curInfo) => curInfo.open === isOpen);

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <FeedNav
                isOpen={isOpen}
                setOpen={setOpen}
                milestoneInfo={milestoneInfo}
            />
            {isOpenInfo.map((curMilestone) =>
                <MilestoneCard curMilestone={curMilestone} key={curMilestone.id} />
            )}
        </section>
    );
};

export default MilestoneFeed;

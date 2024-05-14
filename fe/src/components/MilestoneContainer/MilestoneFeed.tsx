import React, { useState } from "react";
import { FeedNav } from "./FeedNav";
import MilestoneCard from "./MilestoneCard";
import ModifyDeleteUI from "./ModifyDeleteUI";

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
    formData: {
        title: string;
        dueDate: string;
        description: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            title: string;
            dueDate: string;
            description: string;
        }>
    >;
    setModifyDeleteState: React.Dispatch<
        React.SetStateAction<{
            state: string;
            title: string;
        }>
    >;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetState: () => void;
    handelSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    modifyDeleteState: {
        state: string;
        title: string;
    };
    handleSetModifyDelete: (curState: string, title: string) => void;
}

const MilestoneFeed: React.FC<MilestoneFeedProps> = ({
    milestoneInfo,
    formData,
    setFormData,
    setModifyDeleteState,
    handleChange,
    resetState,
    handelSubmit,
    modifyDeleteState,
    handleSetModifyDelete,
}) => {
    const [isOpen, setOpen] = useState(true);

    const isOpenInfo = milestoneInfo.filter(
        (curInfo) => curInfo.open === isOpen
    );

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <FeedNav
                isOpen={isOpen}
                setOpen={setOpen}
                milestoneInfo={milestoneInfo}
            />
            {isOpenInfo.map((curMilestone) =>
                modifyDeleteState.title === curMilestone.title ? (
                    <ModifyDeleteUI
                        handelSubmit={handelSubmit}
                        handleChange={handleChange}
                        formData={formData}
                        resetState={resetState}
                        modifyDeleteState={modifyDeleteState}
                        setFormData={setFormData}
                        curMilestone={curMilestone}
                    />
                ) : (
                    <MilestoneCard
                        curMilestone={curMilestone}
                        key={curMilestone.id}
                        handleSetModifyDelete={handleSetModifyDelete}
                    />
                )
            )}
        </section>
    );
};

export default MilestoneFeed;

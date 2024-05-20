import NotFound from "../../../common/NotFound";
import LabelCard from "./LabelCard";


export interface Label {
    id: number;
    name: string;
    description: string;
    color: string;
    created_at: string;
    updated_at: string;
}

interface LabelFeedProps {
    labelsInfo: Label[];
}

export const LabelFeed = ({ labelsInfo }: LabelFeedProps) => {
    const labelsLength = labelsInfo.length;
    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <div className="h-45 bg-gray-200 transition-colors duration-500 dark:bg-darkModeBorderBG flex text-sm rounded-t-lg">
                <div className="pl-6 font-bold flex items-center">{labelsLength}개의 레이블</div>
            </div>
            {!labelsLength ? (
                <NotFound />
            ) : (
                labelsInfo.map((curLabel) => (
                <LabelCard
                    curLabel={curLabel}
                    key={curLabel.id}
                />
                ))
            )}
        </section>
    );
};

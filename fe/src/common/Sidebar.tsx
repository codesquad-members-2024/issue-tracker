import { IssueData } from "../pages/NewPage";
import DropDown from "./DropDown";

export type TableType = {
    담당자: string;
    레이블: string;
    마일스톤: string;
};
interface SidebarProps {
    setIssueData: React.Dispatch<React.SetStateAction<IssueData>>;
}

const table: TableType = {
    담당자: "assignees",
    레이블: "labels",
    마일스톤: "milestones",
};

const Sidebar = ({ setIssueData }: SidebarProps) => {
    return (
        <ul className="w-[288px] border-2 bg-white rounded-xl border-gray-200 h-full dark:bg-darkModeBorderBG relative">
            {Object.keys(table).map((curKey, idx) => (
                <DropDown
                    key={idx}
                    curKey={curKey as keyof TableType}
                    idx={idx}
                    query={table[curKey as keyof TableType]}
                    setIssueData={setIssueData}
                    lastIdx={Object.keys(table).length - 1}
                />
            ))}
        </ul>
    );
};

export default Sidebar;

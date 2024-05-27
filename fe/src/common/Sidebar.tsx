import { NewIssueForm } from "../pages/NewPage";
import DropDown from "./DropDown";

export type TableType = {
    담당자: string;
    레이블: string;
    마일스톤: string;
};
interface SidebarProps {
    issueData: NewIssueForm
    setIssueData: React.Dispatch<React.SetStateAction<NewIssueForm>>;
}

const sidebarItems: TableType = {
    담당자: "assignees",
    레이블: "labels",
    마일스톤: "milestones",
};

const Sidebar = ({ issueData, setIssueData }: SidebarProps) => {
    return (
        <ul className="w-[288px] border-2 bg-white rounded-xl border-gray-200 h-full dark:bg-darkModeBorderBG relative">
            {Object.keys(sidebarItems).map((curKey, idx) => (
                <DropDown
                    key={idx}
                    curKey={curKey as keyof TableType}
                    idx={idx}
                    query={sidebarItems[curKey as keyof TableType]}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    lastIdx={Object.keys(sidebarItems).length - 1}
                />
            ))}
        </ul>
    );
};

export default Sidebar;

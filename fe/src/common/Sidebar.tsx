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

const sidebarQuery: TableType = {
    담당자: "users",
    레이블: "labels",
    마일스톤: "milestones",
};

const Sidebar = ({ issueData, setIssueData }: SidebarProps) => {
    return (
        <ul className="w-[288px] border-2 bg-white rounded-xl border-gray-200 h-full dark:bg-darkModeBorderBG relative">
            {Object.keys(sidebarQuery).map((curTableItem, idx) => (
                <DropDown
                    key={idx}
                    curTableItem={curTableItem as keyof TableType}
                    idx={idx}
                    queryName={sidebarQuery[curTableItem as keyof TableType]}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    lastIdx={Object.keys(sidebarQuery).length - 1}
                />
            ))}
        </ul>
    );
};

export default Sidebar;

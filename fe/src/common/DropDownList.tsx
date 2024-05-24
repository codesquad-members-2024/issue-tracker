import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { DownCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { IssueData } from "../pages/NewPage";
import { Spin } from "antd";
interface DropDownListProps {
    curKey: string;
    data: (Label & Milestone)[];
    handleClick: (curData: Label & Milestone) => void;
    query: string;
    selectData: (Label & Milestone)[];
    setIssueData: React.Dispatch<React.SetStateAction<IssueData>>;
    loading: boolean;
}
const DropDownList = ({
    curKey,
    data,
    handleClick,
    query,
    selectData,
    setIssueData,
    loading,
}: DropDownListProps) => {
    return (
        <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[230px] flex flex-col rounded-xl overflow-hidden">
            <div className="m-2 ml-4 text-sm">{curKey} 설정</div>
            {loading && (
                <Spin size="small">
                    <div className="p-8 bg-gray-200"></div>
                </Spin>
            )}
            {data.length > 0 &&
                data.map((curData: Label & Milestone, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(curData)}
                        className="flex-grow border-t-2 border-gray-200 px-6 flex items-center h-10 text-sm justify-between bg-white dark:bg-darkModeBorderBG"
                    >
                        {curData.backgroundColor && (
                            <div className="flex items-center gap-2">
                                <div
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                            curData.backgroundColor,
                                    }}
                                />
                                <div>{curData.name}</div>
                            </div>
                        )}
                        <div>
                            {curData.description && <div>{curData.title}</div>}
                            {query === "assignees" && (
                                <div>담당자 API 안나왔음</div>
                            )}
                        </div>
                        {selectData.includes(curData) ? (
                            <DownCircleOutlined />
                        ) : (
                            <MinusCircleOutlined />
                        )}
                    </div>
                ))}
        </div>
    );
};

export default DropDownList;

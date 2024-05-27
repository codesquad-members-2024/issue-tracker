import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { DownCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface DropDownListProps {
    curKey: string;
    data: (Label | Milestone)[];
    handleClick: (curData: Label | Milestone) => void;
    query: string;
    loading: boolean;
    issueData: (Label | Milestone)[];
}

const DropDownList = ({
    curKey,
    data,
    handleClick,
    query,
    loading,
    issueData,
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
                data.map((curData, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(curData)}
                        className="flex-grow border-t-2 border-gray-200 px-6 flex items-center h-10 text-sm justify-between bg-white dark:bg-darkModeBorderBG"
                    >
                        {query === "labels" && (
                            <div className="flex items-center gap-2">
                                <div
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                            (curData as Label).backgroundColor,
                                    }}
                                />
                                <div>{(curData as Label).name}</div>
                            </div>
                        )}
                        {query === "milestones" && (
                            <div>{(curData as Milestone).title}</div>
                        )}
                        {query === "assignees" && (
                            <div>담당자 API 안나왔음</div>
                        )}
                        {issueData.find((item) => item.id === curData.id) ? (
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

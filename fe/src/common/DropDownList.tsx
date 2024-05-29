import { Label } from "../components/LabelsMilestones/Labels/LabelFeed";
import { Milestone } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { DownCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { UserImgBox } from "./UserImgBox";
import { Users } from "../pages/NewPage";

interface DropDownListProps {
    curTableItem: string;
    data: (Label | Milestone | Users)[];
    handleClick: (curData: Label | Milestone | Users) => void;
    queryName: string;
    loading: boolean;
    issueData: (Label | Milestone| Users)[];
}

const DropDownList = ({
    curTableItem,
    data,
    handleClick,
    queryName,
    loading,
    issueData,
}: DropDownListProps) => {
    return (
        <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[230px] flex flex-col rounded-xl overflow-hidden">
            <div className="m-2 ml-4 text-sm">{curTableItem} 설정</div>
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
                        {queryName === "labels" && (
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
                        {queryName === "milestones" && (
                            <div>{(curData as Milestone).title}</div>
                        )}
                        {queryName === "users" && (
                            <div className="flex gap-2">
                                <UserImgBox imgURL={(curData as Users).imgUrl} margin="auto" width="20px" height="20px"/>
                                <p>{(curData as Users).id}</p>
                            </div>
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

import { useContext } from "react";
import { Milestone } from "./MilestoneFeed";
import {
    FlagOutlined,
    CalendarOutlined,
    FormOutlined,
    DeleteOutlined,
    CreditCardOutlined,
} from "@ant-design/icons";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import MilestoneEditUI from "./MilestoneEditUI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../../../common/Utils";
import { ModalComponent } from "../../../common/Modal";
import Progressbar from "../../../common/Progressbar";
interface MilestoneCardProps {
    curMilestone: Milestone;
}

interface MutationArgs {
    id: number;
    type: string;
}

const MilestoneCard = ({ curMilestone }: MilestoneCardProps) => {
    const length = {
        open: curMilestone.issues.filter((cur) => cur.state === "OPEN").length,
        closed: curMilestone.issues.filter((cur) => cur.state === "CLOSED").length,
    };

    const queryClient = useQueryClient();
    const [ModifyDeleteState, ModifyDeleteDispatch] =
        useContext(ModifyDeleteContext);

    const { mutate } = useMutation({
        mutationFn: async ({ id, type }: MutationArgs) => {
            if (type === "삭제") {
                await APiUtil.deleteData("milestones", id);
            } else {
                await APiUtil.patchData("milestones", id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["milestones"]});
        },
    });

    const handleClick = (
        id: number,
        e: React.MouseEvent<HTMLButtonElement>,
        type: string
    ) => {
        e.preventDefault();
        mutate({ id, type });
    };

    return (
        <>
            {ModifyDeleteState.id === curMilestone.id ? (
                <MilestoneEditUI curMilestone={curMilestone} />
            ) : (
                <div className="h-[90px] flex border-t-2 border-gray-300 dark:bg-darkModeBorderBGx items-center">
                    <div className="w-4/5 h-4/5 ml-4">
                        <div className="flex items-center h-1/2 gap-4">
                            <div className="">
                                <FlagOutlined className="text-blue-500" />{" "}
                                {curMilestone.title}
                            </div>
                            <div className="flex gap-2">
                                <CalendarOutlined />
                                <div>{curMilestone.dueDate}</div>
                            </div>
                        </div>
                        <div className="h-1/2 flex items-center">
                            {curMilestone.description}
                        </div>
                    </div>
                    <div className="w-1/5 text-sm mr-6 text-right flex flex-col gap-3">
                        <div className="flex gap-4 justify-end">
                            <div>
                                <CreditCardOutlined className="mr-1" />
                                <ModalComponent
                                    type="닫기"
                                    callBack={(e) =>
                                        handleClick(curMilestone.id, e, "닫기")
                                    }
                                />
                            </div>
                            <button
                                onClick={() =>
                                    ModifyDeleteDispatch({
                                        type: "SET_MODIFY",
                                        Payload: curMilestone.id,
                                    })
                                }
                            >
                                <FormOutlined /> 편집
                            </button>
                            <div>
                                <DeleteOutlined className="text-red-500 mr-1" />
                                <ModalComponent
                                    type="삭제"
                                    callBack={(e) =>
                                        handleClick(curMilestone.id, e, "삭제")
                                    }
                                />
                            </div>
                        </div>
                        <Progressbar open={length.open} closed={length.closed}/>

                        <div className="flex justify-end gap-2 text-xs">
                            <div>열린 이슈({length.open})</div>
                            <div>닫힌 이슈({length.closed})</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MilestoneCard;

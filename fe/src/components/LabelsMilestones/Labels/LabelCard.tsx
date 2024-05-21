import { useContext } from "react";
import { Label } from "./LabelFeed";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import LabelEditUI from "./LabelEditUI";
interface LabelCardProps {
    curLabel: Label;
}

const LabelCard = ({ curLabel }: LabelCardProps) => {
    const [ModifyDeleteState, ModifyDeleteDispatch] = useContext(ModifyDeleteContext);

    return (
        <>
            {ModifyDeleteState.id === curLabel.id ? (
                <LabelEditUI curLabel={curLabel} />
            ) : (
                <div className="h-[90px] flex border-t-2 border-gray-300 dark:bg-darkModeBorderBGx items-center">
                    <div className="w-1/5 h-4/5 ml-4 flex items-center">
                        <div
                            style={{ backgroundColor: curLabel.backgroundColor, color: curLabel.textColor }}
                            className="rounded-xl px-4 py-1 text-white text-sm"
                        >
                            {curLabel.name}
                        </div>
                    </div>
                    <div className="w-3/5 h-4/5 flex items-center font-extralight">
                        {curLabel.description}
                    </div>
                    <div className="w-1/5 text-sm mr-6 text-right flex gap-6 justify-end">
                        <button
                            onClick={() =>
                                ModifyDeleteDispatch({
                                    type: "SET_MODIFY",
                                    Payload: curLabel.id,
                                })
                            }
                        >
                            <FormOutlined /> 편집
                        </button>
                        <button>
                            <DeleteOutlined className="text-red-500" /> 삭제
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LabelCard;

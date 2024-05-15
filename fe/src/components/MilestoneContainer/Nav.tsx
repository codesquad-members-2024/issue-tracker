import { useContext, useEffect } from "react";
import LabelsAndMilestoneUI from "../../util/UtilUI";
import { PlusOutlined } from "@ant-design/icons";
import { ModifyDeleteContext } from "../../Providers/ModifyDeleteProvider";

const Nav = () => {

    const [ModifyDeleteState, ModifyDeleteDispatch] = useContext(ModifyDeleteContext)
    useEffect(() => {
        console.log(ModifyDeleteState)
    })
    return (
        <div className="flex justify-between">
            <LabelsAndMilestoneUI />
            <button
                className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs"
                onClick={() => ModifyDeleteDispatch({type: "SET_DELETE", Payload: "delete"})}
            >
                <PlusOutlined /> 마일스톤 추가
            </button>
        </div>
    );
};

export default Nav;

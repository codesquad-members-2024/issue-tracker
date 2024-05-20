import { useContext, useEffect } from "react";
import LabelsAndMilestoneUI from "../../common/UtilUI";
import { PlusOutlined } from "@ant-design/icons";
import { ModifyDeleteContext } from "../../Providers/ModifyDeleteProvider";

interface NavProps {
    location: string
}

const Nav = ({location}: NavProps) => {

    const [ModifyDeleteState, ModifyDeleteDispatch] = useContext(ModifyDeleteContext)
    useEffect(() => {
        console.log(ModifyDeleteState)
    })
    return (
        <div className="flex justify-between">
            <LabelsAndMilestoneUI />
            <button
                className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs w-[128px] justify-center"
                onClick={() => ModifyDeleteDispatch({type: "SET_CREATE", Payload: "create"})}
            >
                <PlusOutlined /> {location === "labels" ? "레이블 추가" : "마일스톤 추가"}
            </button>
        </div>
    );
};

export default Nav;

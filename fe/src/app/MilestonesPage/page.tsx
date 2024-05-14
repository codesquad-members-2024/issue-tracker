import React, { SyntheticEvent, useEffect, useState } from "react";
import { Header } from "../../util/UtilUI";
import LabelsAndMilestoneUI from "../../util/UtilUI";
import { PlusOutlined } from "@ant-design/icons";
import ModifyDeleteUI from "../../components/MilestoneContainer/ModifyDeleteUI";
import MilestoneFeed from "../../components/MilestoneContainer/MilestoneFeed";
import { APiUtil } from "../../util/APIUtils";

const MilestonesPage = () => {
    const [milestoneInfo, setMilestoneInfo] = useState([]);
    const [modifyDeleteState, setModifyDeleteState] = useState({
        state: "",
        title: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        dueDate: "",
        description: "",
    });

    useEffect(() => {
        const getMilestoneList = async () => {
            const milestoneList = await APiUtil.getNewsData("milestones");
            setMilestoneInfo(milestoneList);
        };
        getMilestoneList();
    }, []);

    const handleSetModifyDelete = (curState: string, title: string) => {
        setModifyDeleteState((prevState) => ({
            ...prevState,
            state: curState,
            title: title,
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const resetState = () => {
        setModifyDeleteState((prevState) => ({
            ...prevState,
            state: "",
            title: "",
        }));
    };

    const handelSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        // 수정, 삭제 요청
        e.preventDefault();
    };

    return (
        <main className="w-1280 mx-auto">
            <Header />
            <div className="flex justify-between">
                <LabelsAndMilestoneUI />
                <button
                    className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs"
                    onClick={() => handleSetModifyDelete("delete", "delete")}
                >
                    <PlusOutlined /> 마일스톤 추가
                </button>
            </div>
            {modifyDeleteState.state === "delete" && (
                <ModifyDeleteUI
                    handelSubmit={handelSubmit}
                    handleChange={handleChange}
                    formData={formData}
                    resetState={resetState}
                    modifyDeleteState={modifyDeleteState}
                />
            )}

            <MilestoneFeed
                milestoneInfo={milestoneInfo}
                formData={formData}
                setFormData={setFormData}
                setModifyDeleteState={setModifyDeleteState}
                handleChange={handleChange}
                resetState={resetState}
                handelSubmit={handelSubmit}
                modifyDeleteState={modifyDeleteState}
                handleSetModifyDelete={handleSetModifyDelete}
            />
        </main>
    );
};

export default MilestonesPage;

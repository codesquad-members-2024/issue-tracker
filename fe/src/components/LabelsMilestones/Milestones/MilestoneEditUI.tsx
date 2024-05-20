import React, { useContext, useEffect, useState } from "react";
import { Milestone } from "./MilestoneFeed";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../../../common/APIUtils";

interface MilestoneEditUIProps {
    curMilestone?: Milestone;
}
export interface FormState {
    title: string;
    dueDate: string;
    description: string;
}

const MilestoneEditUI = ({ curMilestone }: MilestoneEditUIProps) => {
    const queryClient = useQueryClient();
    const [ModifyDeleteState, ModifyDeleteDispatch] = useContext(ModifyDeleteContext);

    const { mutate } = useMutation({
        mutationFn: async(formData: FormState) => {
            await APiUtil.createData("milestones", formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("milestones");
            console.log("성공!")
        },
        onError: () => {
            console.log("실패")
        }
    });
    

    const [formData, setFormData]: [
        FormState,
        React.Dispatch<React.SetStateAction<FormState>>
    ] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (ModifyDeleteState.state === "modify" && setFormData) {
            setFormData((prevState) => ({
                ...prevState,
                title: curMilestone?.title ?? "",
                dueDate: curMilestone?.dueDate ?? "",
                description: curMilestone?.description ?? "",
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                title: "",
                dueDate: "",
                description: "",
            }));
        }
    }, [ModifyDeleteState.state, curMilestone]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <div
            className={`${
                ModifyDeleteState.state === "create" ||
                ModifyDeleteState.id === curMilestone?.id
                    ? ""
                    : "hidden"
            } w-full h-72 border-2 border-gray-300 mt-4 rounded-xl bg-white dark:bg-darkModeBorderBG`}
        >
            <div className="p-6 gap-2 flex flex-col h-full">
                <h3 className="font-medium text-xl mb-4">
                    {ModifyDeleteState.state === "modify"
                        ? "마일스톤 편집"
                        : "새로운 마일스톤 추가"}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between">
                            <input
                                type="text"
                                name="title"
                                className="w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="마일스톤 이름을 입력하세요."
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="dueDate"
                                className="w-full px-3 h-[40px] py-2 ml-4 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="완료일(선택) YYYY.MM.DD"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="description"
                            className="w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100"
                            placeholder="마일스톤에 대한 설명을 입력하세요."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-row-reverse gap-2 mt-2">
                        <button
                            type="submit"
                            className="flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-10 w-32"
                        >
                            + 완료
                        </button>
                        <button
                            onClick={() =>
                                ModifyDeleteDispatch({
                                    type: "SET_INIT",
                                    Payload: "",
                                })
                            }
                            className="flex justify-center text-center items-center border-2 border-blue-500 px-6 rounded-xl text-blue-500 text-sm h-10 w-32"
                        >
                            X 취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MilestoneEditUI;

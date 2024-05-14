import React, { useEffect } from "react";
import { Milestone } from "./MilestoneFeed";

interface ModifyDeleteUIProps {
    handelSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: {
        title: string;
        dueDate: string;
        description: string;
    };
    resetState: () => void;
    modifyDeleteState: {
        state: string;
        title: string;
    };
    setFormData?: React.Dispatch<
        React.SetStateAction<{
            title: string;
            dueDate: string;
            description: string;
        }>
    >;
    curMilestone?: Milestone;
}

const ModifyDeleteUI: React.FC<ModifyDeleteUIProps> = ({
    handelSubmit,
    handleChange,
    formData,
    resetState,
    modifyDeleteState,
    setFormData,
    curMilestone,
}) => {
    useEffect(() => {
        if (modifyDeleteState.state === "modify" && setFormData) {
            setFormData((prevState) => ({
                ...prevState,
                title: curMilestone?.title ?? "",
                dueDate: curMilestone?.dueDate ?? "",
                description: curMilestone?.description ?? "",
            }));
        }
    }, [modifyDeleteState.state, setFormData, curMilestone]);

    return (
        <div
            className={`w-full h-72 border-2 border-gray-300 mt-4 rounded-xl bg-white dark:bg-darkModeBorderBG`}
        >
            <div className="p-6 gap-2 flex flex-col h-full">
                <h3 className="font-medium text-xl mb-4">
                    {modifyDeleteState.state === "modify"
                        ? "마일스톤 편집"
                        : "새로운 마일스톤 추가"}
                </h3>
                <form onSubmit={handelSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between">
                            <input
                                type="text"
                                name="title"
                                className="w-full px-3 py-2 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="마일스톤 이름을 입력하세요."
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="dueDate"
                                className="w-full px-3 py-2 ml-4 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="완료일(선택) YYYY.MM.DD"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="description"
                            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded-xl bg-gray-100"
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
                            onClick={resetState}
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

export default ModifyDeleteUI;

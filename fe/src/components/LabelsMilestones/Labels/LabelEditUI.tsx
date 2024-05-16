import React, { useContext, useEffect, useState } from "react";
import { Label } from "./LabelFeed";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import { RedoOutlined } from "@ant-design/icons";
interface LabelEditUIProps {
    curLabel?: Label;
}

interface FormState {
    name: string;
    description: string;
    color: string;
}

const LabelEditUI = ({ curLabel }: LabelEditUIProps) => {
    const [color, setColor] = useState("#ffffff");
    const [ModifyDeleteState, ModifyDeleteDispatch] =
        useContext(ModifyDeleteContext);

    const [formData, setFormData]: [
        FormState,
        React.Dispatch<React.SetStateAction<FormState>>
    ] = useState({
        name: "",
        description: "",
        color: "",
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
                name: curLabel?.name ?? "",
                description: curLabel?.description ?? "",
                color: curLabel?.color ?? "",
            }));
            setColor(curLabel?.color ?? "");
        } else {
            setFormData((prevState) => ({
                ...prevState,
                name: "",
                description: "",
                color: "",
            }));
        }
    }, [ModifyDeleteState.state, curLabel]);

    const changeColor = () => {
        const letters = '0123456789ABCDEF';
        let newColor = '#';
        for (let i = 0; i < 6; i++) {
            newColor += letters[Math.floor(Math.random() * 16)];
        }
        setColor(newColor)
        setFormData((prevState) => ({
            ...prevState,
            color: newColor,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div
            className={`${
                ModifyDeleteState.state === "create" ||
                ModifyDeleteState.id === curLabel?.id
                    ? ""
                    : "hidden"
            } w-full h-72 border-2 border-gray-300 mt-4 rounded-xl bg-white dark:bg-darkModeBorderBG`}
        >
            <div className="p-6 gap-2 flex flex-col h-full">
                <h3 className="font-medium text-xl mb-4">
                    {ModifyDeleteState.state === "modify"
                        ? "레이블 편집"
                        : "새로운 레이블 추가"}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex gap-4">
                        <div className="w-[288px] h-[143px] border-2 border-gray-200 rounded-xl flex items-center justify-center">
                            <div
                                style={{ backgroundColor: color }}
                                className={`${
                                    curLabel?.name ? "text-white" : ""
                                } rounded-xl px-4 py-1 text-sm `}
                            >
                                {curLabel?.name ? formData.name : "label"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[904px]">
                            <div className="flex flex-grow w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100">
                                <div className="w-[100px] text-sm m-auto">이름</div>
                                <input
                                    type="text"
                                    name="name"
                                    className="bg-gray-100 w-[850px] h-full outline-none"
                                    placeholder="레이블 이름을 입력하세요."
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-grow w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100">
                                <div className="w-[100px] text-sm m-auto">설명(선택)</div>
                                <input
                                    type="text"
                                    name="description"
                                    className="bg-gray-100 w-[850px] h-full outline-none"
                                    placeholder="레이블에 대한 설명을 입력하세요."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-grow w-[40%] h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100">
                                <div className="w-[100px] text-sm m-auto">배경 색상</div>
                                <input
                                    type="text"
                                    name="color"
                                    className="bg-gray-100 w-[80%] h-full outline-none"
                                    placeholder={color}
                                    value={color}
                                    onChange={handleChange}
                                />
                                <RedoOutlined onClick={changeColor}/>
                            </div>
                        </div>
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

export default LabelEditUI;

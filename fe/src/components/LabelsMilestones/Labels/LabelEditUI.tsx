import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Label } from "./LabelFeed";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import { RedoOutlined, DownOutlined } from "@ant-design/icons";
import { changeColor } from "../../../common/APIUtils";

export interface ChangeColorProps {
    setColor: Dispatch<SetStateAction<string>>;
    setFormData: Dispatch<SetStateAction<LabelFormState>>;
}
interface LabelEditUIProps {
    curLabel?: Label;
}

export interface LabelFormState {
    name: string;
    description: string;
    backgroundColor: string;
    textColor: string;
}

const LabelEditUI = ({ curLabel }: LabelEditUIProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("#ffffff");
    const [ModifyDeleteState, ModifyDeleteDispatch] =
        useContext(ModifyDeleteContext);

    const [formData, setFormData]: [
        LabelFormState,
        React.Dispatch<React.SetStateAction<LabelFormState>>
    ] = useState({
        name: "",
        description: "",
        backgroundColor: "",
        textColor: "",
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
                color: curLabel?.backgroundColor ?? "",
                textColor: curLabel?.textColor ?? "",
            }));
            setColor(curLabel?.backgroundColor ?? "");
        } else {
            setFormData((prevState) => ({
                ...prevState,
                name: "label",
                description: "",
                color: "",
                textColor: "",
            }));
        }
    }, [ModifyDeleteState.state, curLabel]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // post 보내기
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                                style={{ backgroundColor: color, color: formData.textColor}}
                                className={`rounded-xl px-4 py-1 text-sm `}
                            >
                                {formData.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[904px]">
                            <div className="flex flex-grow w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100">
                                <div className="w-[100px] text-sm m-auto">
                                    이름
                                </div>
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
                                <div className="w-[100px] text-sm m-auto">
                                    설명(선택)
                                </div>
                                <input
                                    type="text"
                                    name="description"
                                    className="bg-gray-100 w-[850px] h-full outline-none"
                                    placeholder="레이블에 대한 설명을 입력하세요."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex w-[50%]">
                                <div className="flex flex-grow h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100">
                                    <div className="w-[100px] text-sm my-auto">
                                        배경 색상
                                    </div>
                                    <input
                                        type="text"
                                        name="color"
                                        className="bg-gray-100 w-[80%] h-full outline-none"
                                        placeholder={color}
                                        value={color}
                                        onChange={handleChange}
                                    />
                                    <RedoOutlined onClick={() => changeColor({setColor, setFormData})} />
                                </div>
                                <button
                                    className="w-[50%] m-auto relative"
                                    onClick={toggleDropdown}
                                >
                                    <div>
                                        텍스트 색상 <DownOutlined />
                                    </div>
                                    {isOpen && (
                                        <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[200px] flex flex-col rounded-xl">
                                            <div
                                                onClick={() =>
                                                    setFormData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            textColor: "white",
                                                        })
                                                    )
                                                }
                                                className="flex-grow border-b-2 border-gray-200 px-6 flex items-center justify-between h-10"
                                            >
                                                밝은 색
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setFormData(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            textColor: "black",
                                                        })
                                                    )
                                                }
                                                className="flex-grow px-6 flex items-center justify-between h-10"
                                            >
                                                어두운 색
                                            </div>
                                        </div>
                                    )}
                                </button>
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

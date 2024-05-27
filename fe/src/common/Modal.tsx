import { Modal } from "antd";
import { useState } from "react";


interface ModalComponentProps {
    type: string;
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModalComponent = ({type, callBack}: ModalComponentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsModalOpen(false);
        callBack(e)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <button className="" onClick={showModal}>
                {type}
            </button>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {type === "닫기" ? <p>정말 닫으시겠습니까?</p> : <p>정말 삭제 하시겠습니까?</p>}
            </Modal>
        </>
    );
};



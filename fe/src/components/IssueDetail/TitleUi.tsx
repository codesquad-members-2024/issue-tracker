import { CalendarOutlined, FlagOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface TitleUiProps {
    title: string | undefined;
    id: number | undefined;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
}
const TitleUi = ({title, id, setEditState}: TitleUiProps) => {
    const navigate = useNavigate();

    const handleEditClick = () => setEditState(true);
    return (
        <div className="flex items-center justify-between">
            <header className="flex text-4xl h-full">
                <h1>{title}</h1>
                <div className="ml-2 font-thin text-2xl m-auto">
                    #{id}
                </div>
            </header>
            <div className="w-[304px] h-[68px] flex gap-4 items-center justify-end text-blue-400">
                <button
                    onClick={handleEditClick}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    <FlagOutlined /> 제목 편집
                </button>
                <button
                    onClick={() => navigate("/issue")}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    <CalendarOutlined /> 이슈 닫기
                </button>
            </div>
        </div>
    );
};

export default TitleUi;

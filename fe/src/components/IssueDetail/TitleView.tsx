import { FlagOutlined, CalendarOutlined } from "@ant-design/icons";
import { Issue } from "./TitleContainer";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
interface TitleViewProps {
    issueData: Issue;
    editState: boolean;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
}

const TitleView = ({ issueData, editState, setEditState }: TitleViewProps) => {
    const navigate = useNavigate();

    const handleEditClick = () => setEditState(true);
    
    return (
        <>
            {editState ? (
                <div className="flex items-center justify-between">
                    <div className="flex py-2 border rounded-xl bg-gray-300">
                        <div className=" text-sm mx-6">제목</div>
                        <input
                            type="text"
                            value={issueData.title}
                            className="bg-gray-300 w-[850px] h-full outline-none"
                            placeholder="제목을 입력하세요"
                        />
                    </div>
                    <div className="w-[304px] h-[68px] flex gap-4 items-center justify-end text-blue-400">
                        <button
                            onClick={() => setEditState(false)}
                            className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                        >
                            X 편집 취소
                        </button>
                        <button
                            onClick={() => navigate("/issue")}
                            className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                        >
                            <EditOutlined />{" "} 편집 완료
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <header className="flex text-4xl h-full">
                        <h1>{issueData.title}</h1>
                        <div>{issueData.id}</div>
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
            )}
        </>
    );
};

export default TitleView;

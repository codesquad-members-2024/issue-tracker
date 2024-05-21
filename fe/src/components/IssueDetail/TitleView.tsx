import { FlagOutlined, CalendarOutlined } from "@ant-design/icons";
import { TitleContainerProps } from "./TitleContainer";
const TitleView = ({ issueData }: TitleContainerProps) => {
    return (
        <div className="flex items-center justify-between">
            <header className="flex text-4xl h-full">
                <h1>{issueData.title}</h1>
                <div>{issueData.id}</div>
            </header>
            <div className="w-[304px] h-[68px] flex gap-4 items-center justify-end text-blue-400">
                <button className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center">
                    <FlagOutlined /> 제목 편집
                </button>
                <button className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center">
                    <CalendarOutlined /> 이슈 닫기
                </button>
            </div>
        </div>
    );
};

export default TitleView;

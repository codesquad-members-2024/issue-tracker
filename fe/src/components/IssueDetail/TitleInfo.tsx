import { TitleContainerProps } from "./TitleContainer";
import { InfoCircleOutlined } from "@ant-design/icons";
const TitleInfo = ({ issueData }: TitleContainerProps) => {
    return (
        <div className="flex font-normal">
            <div className="w-[110px] h-[32px] border-none rounded-xl bg-blue-500 text-white flex items-center justify-center text-sm font-c">
                <InfoCircleOutlined className="mr-1"/>{" "}
                {issueData.state === "OPEN" ? "열린" : "닫힌"} 이슈
            </div>
            <p className="flex items-center ml-2">이 이슈가 {issueData.closedAt}에 {issueData.authorId}님에 의해 열렸습니다</p>
            <div className="flex items-center mx-2"> ∙ </div>
            <div className="flex items-center">코맨트 {issueData.comments.length}개</div>
        </div>
    );
};

export default TitleInfo;

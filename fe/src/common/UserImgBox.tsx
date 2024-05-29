import ReactMarkdown from "react-markdown";
interface UserImgBoxProps {
    imgURL: string;
    margin: string;
    width: string;
    height: string;
}
const DEFAULT_IMG_URL = "![이미지](https://issue-tracker-web.s3.ap-northeast-2.amazonaws.com/attached/%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%E1%84%89%E1%85%B3%E1%84%8F%E1%85%AF%E1%84%83%E1%85%B3.jpg)"

export const UserImgBox = ({imgURL, margin, width, height}: UserImgBoxProps) => {
    
    return (
        <ReactMarkdown
                components={{
                    img: ({ ...props }) => (
                        <img
                            style={{ width: width, height: height ,margin: margin, borderRadius: "50%", objectFit: "cover",
                            display: "block"}}
                            {...props}
                            alt="이미지 첨부"
                        />
                    ),
                }}
            >
                {imgURL.includes("이미지") ? imgURL : DEFAULT_IMG_URL}
            </ReactMarkdown>
    );
};

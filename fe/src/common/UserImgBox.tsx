import ReactMarkdown from "react-markdown";

interface UserImgBoxProps {
    imgURL: string
}

export const UserImgBox = ({imgURL}: UserImgBoxProps) => {
    console.log(imgURL)
    return (
        <ReactMarkdown
                components={{
                    img: ({ ...props }) => (
                        <img
                            style={{ maxWidth: "20%", margin: "auto", borderRadius: "50%",
                            display: "block"}}
                            {...props}
                            alt="이미지 첨부"
                        />
                    ),
                }}
            >
                {imgURL !== "" ? imgURL : "이미지를 첨부해주세요."}
            </ReactMarkdown>
    );
};

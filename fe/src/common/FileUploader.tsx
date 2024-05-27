import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PaperClipOutlined } from "@ant-design/icons";
import { IssueData } from "../pages/NewPage";
import AWS from "aws-sdk";
import { SignUpForm } from "../pages/SignUp";

interface FileUploaderProps {
    setIssueData:React.Dispatch<React.SetStateAction<IssueData | SignUpForm |{description: string;}>>
}

const FileUploader = ({setIssueData}:FileUploaderProps) => {
    const [selectFile, setSelectFile] = useState<File | null | undefined>(null);
    const upLoadNode = useRef<HTMLInputElement>(null);

    const uploadFile = async(selectFile: File) => {
        if (selectFile) {
            const albumBucketName = import.meta.env.VITE_BECKET_NAME;
            const path = import.meta.env.VITE_BECKET_PATH;
            const region = import.meta.env.VITE_REGION;
            const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
            const secretAccessKey = import.meta.env.VITE_ACCESS_SECRET_KEY;
    
            window.AWS.config.update({
                region,
                accessKeyId,
                secretAccessKey,
            });
    
            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: albumBucketName,
                    Key: `${path}/${selectFile.name}`,
                    Body: selectFile,
                },
            });
    
            const data = await upload.promise();
            return data.Location;
        } else {
            console.log("파일을 선택해주세요.");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (files && files.length > 0) {
            setSelectFile(files[0]);

        } else {
            setSelectFile(null);
        }
    };

    const handleUpload = () => {
        if (upLoadNode.current) {
            upLoadNode.current?.click();
        }
    };

    useEffect(() => {
        const putFileURL = async() => {
            if(selectFile) {
                const fileUrl = await uploadFile(selectFile);
    
                setIssueData((prev) => ({
                    ...prev,
                    description: `${prev.description}\n![이미지](${fileUrl})`,
                }));
            }
        }
        putFileURL()
    }, [selectFile])

    return (
        <div className="flex py-2 border-gray-300 border-t-2 border-dotted mt-2">
            <input className="hidden" ref={upLoadNode} type="file" onChange={handleFileChange}></input>
            <button onClick={handleUpload} className="text-sm"><PaperClipOutlined/> 파일 첨부하기</button>
        </div>
    );
};

export default FileUploader;

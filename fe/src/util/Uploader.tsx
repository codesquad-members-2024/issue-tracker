import { ChangeEvent, useState } from "react";
import AWS from "aws-sdk";

const FileUploader = () => {
    const [selectFile, setSelectFile] = useState<File | null | undefined>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectFile(event.target.files[0]);
        } else {
            setSelectFile(null);
        }
    };

    const putFile = () => {
        console.log(selectFile)
        if (selectFile) {
            const albumBucketName = import.meta.env.VITE_BECKET_NAME;
            const path = 'attached';
            const region = "ap-northeast-2";
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

            const promise = upload.promise();

            promise.then(
                function () {
                    console.log("Successfully uploaded photo.:");
                },
                function (err) {
                    return console.log(
                        "There was an error uploading your photo: ",
                        err.message
                    );
                }
            );
        } else {
            console.log("파일을 선택해주세요.");
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileChange}></input>
            <button onClick={putFile}>올리기</button>
        </>
    );
};

export default FileUploader;

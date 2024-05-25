import AWS from "aws-sdk";

const albumBucketName = process.env.REACT_APP_BUCKET_NAME || "";
const region = process.env.REACT_APP_REGION;
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;

const useFileUpload = () => {
  AWS.config.update({ region, accessKeyId, secretAccessKey });

  const upload = (file: File) => {
    const manager = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: file.name,
        Body: file,
        ACL: "public-read",
      },
    });

    manager
      .promise()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return { upload };
};

export default useFileUpload;

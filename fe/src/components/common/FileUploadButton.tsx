import uploadFile from "../../utility/uploadFile";
import Button from "./Button";

interface PropsType {
	uploadedFile?: React.MutableRefObject<string | null>;
	setText: React.Dispatch<React.SetStateAction<string>>;
}

function FileUploadButton({ uploadedFile, setText }: PropsType) {
	const handleFileUpload = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
		const [selectedFile] = files!;
		const formData = new FormData();
		formData.append("uploadImg", selectedFile);
		const { uploadedUrl } = await uploadFile(formData);
		if (uploadedFile) uploadedFile.current = uploadedUrl;
		setText((prev) => `${prev}\n![image](${selectedFile.name})`);
	};

	return (
		<div className="flex items-center border-t-2 border-dashed h-[52px] rounded-b-xl absolute w-full bottom-0">
			<Button size="S" type="GHOST" icon="CLIP" text="파일 첨부하기" state="DEFAULT" />
			<input
				id="file"
				type="file"
				className="hidden"
				placeholder="첨부파일"
				onChange={handleFileUpload}
			/>
			<label
				htmlFor="file"
				className="w-[120px] text-xs cursor-pointer z-20 absolute left-5 bottom-0 h-full bg-grayscale.200/5 hover:bg-grayscale.200/20 dark:bg-grayscale.700/5 dark:hover:bg-grayscale.700/20"
			></label>
		</div>
	);
}

export default FileUploadButton;

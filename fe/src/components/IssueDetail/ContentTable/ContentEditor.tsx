import { useMemo, useState, useEffect, SetStateAction } from "react";
import { ReactComponent as Grip } from "../../../svg/Grip.svg";
import Button from "../../common/Button";
import FileUploadButton from "../../common/FileUploadButton";

interface PropsType {
	preHeight: number;
	content: string;
	setContentValue: React.Dispatch<SetStateAction<string>>;
	uploadedFile: React.MutableRefObject<string | null>;
}

const DELAY = 2000;

function ContentEditor({ preHeight, content, setContentValue, uploadedFile }: PropsType) {
	const [isVisible, setIsVisible] = useState(true);
	const ButtonMemo = useMemo(
		() => <FileUploadButton uploadedFile={uploadedFile} setText={setContentValue} />,
		[]
	);

	useEffect(() => {
		setIsVisible(true);
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, DELAY);
		return () => {
			clearTimeout(timer);
		};
	}, [content]);

	const handleTextArea = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContentValue(value);
	};

	return (
		<div className="relative">
			<textarea
				id="textarea"
				className={`outline-none p-5 resize-none w-full bg-grayscale.50 dark:bg-grayscale.800 text-grayscale.700 dark:text-grayscale.400`}
				value={content}
				onChange={handleTextArea}
				style={{
					height: `${preHeight}px`,
				}}
			></textarea>
			<div className="flex mt-[60px]">
				<div className="flex items-center absolute right-8 bottom-16">
					{isVisible && (
						<p className="text-xs mt-1 mr-3 text-grayscale.600 dark:text-grayscale.500">
							{`띄어쓰기 포함 ${content.length}자`}
						</p>
					)}
					<Grip />
				</div>
				{ButtonMemo}
			</div>
		</div>
	);
}

export default ContentEditor;

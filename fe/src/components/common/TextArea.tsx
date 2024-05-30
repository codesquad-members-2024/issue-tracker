import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { ReactComponent as Grip } from "../../svg/Grip.svg";
import FileUploadButton from "./FileUploadButton";

interface PropsType {
	h: string;
	$ref?: React.RefObject<HTMLTextAreaElement>;
	handler?: () => void;
	uploadedFile?: React.MutableRefObject<string | null>;
}

const moving = "scale-75 top-2 left-0";
const DELAY = 2000;

function TextArea({ h, $ref, handler, uploadedFile }: PropsType) {
	const [value, setValue] = useState("");
	const [isVisible, setIsVisible] = useState(true);
	const ButtonMemo = useMemo(() => <FileUploadButton uploadedFile={uploadedFile}/>, []);

	const onChange = ({ target: { value: textAreaValue } }: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(textAreaValue);
		if (handler) handler();
	};

	useEffect(() => {
		setIsVisible(true);
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, DELAY);
		return () => {
			clearTimeout(timer);
		};
	}, [$ref?.current?.value]);

	return (
		<div className={`relative mt-2 ${h}`}>
			<textarea
				id="textarea"
				onChange={onChange}
				value={value}
				ref={$ref}
				className="py-8 px-4 resize-none w-full h-full bg-grayscale.200 dark:bg-grayscale.700 rounded-2xl text-grayscale.700 dark:text-grayscale.400 focus:input-text--focus"
			></textarea>
			<label
				className={`transition-all absolute text-grayscale.600 dark:text-grayscale.500
        ${value ? moving : " top-8 left-5"} `}
				htmlFor="textarea"
			>
				내용을 입력하세요
			</label>
			<div className="flex items-center absolute right-4 bottom-16">
				{isVisible && (
					<p className="text-xs mt-1 mr-3 text-grayscale.600 dark:text-grayscale.500">
						{`띄어쓰기 포함 ${value.length}자`}
					</p>
				)}
				<Grip />
			</div>
			{ButtonMemo}
		</div>
	);
}

export default TextArea;

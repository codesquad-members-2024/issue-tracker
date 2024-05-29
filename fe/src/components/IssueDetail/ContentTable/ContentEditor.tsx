import { useMemo, useState, useEffect, SetStateAction } from "react";
import { ReactComponent as Grip } from "../../../svg/Grip.svg";
import Button from "../../common/Button";

interface PropsType {
	preHeight: number;
	content: string;
	setContentValue: React.Dispatch<SetStateAction<string>>;
}

const DELAY = 2000;

function ContentEditor({ preHeight, content, setContentValue }: PropsType) {
	const [isVisible, setIsVisible] = useState(true);
	const ButtonMemo = useMemo(
		() => (
			<div className="flex items-center border-t-2 border-dashed h-[52px] rounded-b-xl absolute w-full bottom-0">
				<Button size="S" type="GHOST" icon="CLIP" text="파일 첨부하기" state="DEFAULT" />
			</div>
		),
		[]
	);
	useEffect(() => {
		console.log(content);
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
			<div className="flex mt-[50px]">
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

import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { ReactComponent as Grip } from "../../svg/Grip.svg";

import Button from "./Button";

interface PropsType {
	h: string;
	$ref?: React.RefObject<HTMLTextAreaElement>;
	handler?: () => void;
}

const moving = "scale-75 top-2 left-0";
const DELAY = 2000;

function TextArea({ h, $ref, handler }: PropsType) {
	const [value, setValue] = useState("");
	const [isVisible, setIsVisible] = useState(true);
	const ButtonMemo = useMemo(
		() => (
			<div className="flex items-center border-t-2 border-dashed h-[52px] rounded-b-xl absolute w-full bottom-0">
				<Button size="S" type="GHOST" icon="CLIP" text="파일 첨부하기" state="DEFAULT" />
			</div>
		),
		[]
	);

	const onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(value);
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

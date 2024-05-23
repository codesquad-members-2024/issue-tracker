import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PropsType {
	h: string;
	w: string;
	label: string;
	titleValue: string;
	setTitleValue: Dispatch<SetStateAction<string>>;
}
const moving = "scale-75 top-1 left-3.5";
function TextInput({ h, w, label, titleValue, setTitleValue }: PropsType) {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value);

	return (
		<div className="relative">
			<input
				id="input"
				type="text"
				value={titleValue}
				onChange={onChange}
				className={`${h} ${w} pt-[10px] bg-grayscale.200 dark:bg-grayscale.700 rounded-2xl px-4 text-grayscale.700 dark:text-grayscale.400 focus:input-text--focus`}
			/>
			<label
				className={`transition-all absolute text-grayscale.600 dark:text-grayscale.500 ${
					titleValue ? moving : " top-4 left-5"
				} `}
				htmlFor="input"
			>
				{label}
			</label>
		</div>
	);
}

export default TextInput;

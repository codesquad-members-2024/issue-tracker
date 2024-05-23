import { ReactComponent as RefreshCcw } from "../../svg/RefreshCcw.svg";

interface PropsType {
	lable: string;
	placeholder: string;
	w: string;
	icon: boolean;
	handleBgColor?: (color: string) => void;
	handler?: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
	$ref?: React.RefObject<HTMLInputElement>; // TODO ?지워도됨
}

const getRandomColor = () => {
	const colors = [
		"#FEFEFE",
		"#dfdeff",
		"#0025e6",
		"#6ab43e",
		"#ff3b30",
		"#feff79",
		"#f4c9e7",
		"#ffd7c0",
		"#def1ff",
	];
	return colors[~~(Math.random() * colors.length)];
};

function InputText({ lable, placeholder, w, icon, handler, handleBgColor, value, $ref }: PropsType) {
	return (
		<div
			className={`${w} relative flex items-center h-[40px] bg-grayscale.200 dark:bg-grayscale.700 rounded-xl text-grayscale.700 dark:text-grayscale.400`}
		>
			<label className="absolute -left-2 text-xs mx-6 text-grayscale.600 dark:text-grayscale.500">
				{lable}
			</label>
			<input
				type="text"
				className={`${
					icon && "cursor-default outline-none"
				} px-24 bg-inherit w-full h-full placeholder:text-grayscale.600 placeholder:dark:text-grayscale.500 rounded-xl`}
				placeholder={placeholder}
				readOnly={icon}
				value={value && value}
				onChange={handler && handler}
				maxLength={16}
				ref={$ref}
			/>
			{icon && (
				<RefreshCcw
					onClick={handleBgColor && (() => handleBgColor(getRandomColor()))}
					className="absolute right-4 cursor-pointer stroke-grayscale.700 dark:stroke-grayscale.400"
				/>
			)}
		</div>
	);
}

export default InputText;

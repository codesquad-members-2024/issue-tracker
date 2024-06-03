interface PropsType {
	h: string;
	w: string;
	label: string;
	$title: React.RefObject<HTMLInputElement>;
	handler: React.ChangeEventHandler<HTMLInputElement>;
}
const moving = "scale-75 top-1 left-3.5";
function IssueInput({ h, w, label, $title, handler }: PropsType) {
	return (
		<div className="relative w-full">
			<input
				id="input"
				type="text"
				ref={$title}
				onChange={handler}
				className={`${h} ${w} pt-[10px] bg-grayscale.200 dark:bg-grayscale.700 rounded-2xl px-4 text-grayscale.700 dark:text-grayscale.400 focus:input-text--focus`}
			/>
			<label
				className={`transition-all absolute text-grayscale.600 dark:text-grayscale.500 ${
					$title.current?.value ? moving : " top-4 left-5"
				} `}
				htmlFor="input"
			>
				{label}
			</label>
		</div>
	);
}

export default IssueInput;

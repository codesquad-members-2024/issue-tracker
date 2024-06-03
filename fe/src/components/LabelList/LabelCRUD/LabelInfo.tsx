import InputText from "../../common/InputText";

interface PropsType {
	label?: Label;
	bgColor: string;
	textBright: boolean;
	handleName: React.ChangeEventHandler<HTMLInputElement>;
	handleTextBright: React.MouseEventHandler<HTMLButtonElement>;
	handleExplain?: React.ChangeEventHandler<HTMLInputElement>;
	handleBgColor: (color: string) => void;
	$description: React.RefObject<HTMLInputElement>;
}

function LabelInfo({
	label,
	bgColor,
	textBright,
	handleName,
	handleBgColor,
	handleTextBright,
	handleExplain,
	$description,
}: PropsType) {
	return (
		<div className="flex flex-col justify-between h-[153px]">
			<InputText
				lable="이름"
				placeholder={`${label ? label.name : "레이블의 이름을 입력하세요"}`}
				w="w-full"
				icon={false}
				handler={handleName}
			/>
			<InputText
				lable="설명(선택)"
				placeholder={`${label ? label.description : "레이블에 대한 설명을 입력하세요"}`}
				w="w-full"
				icon={false}
				handler={handleExplain}
				$ref={$description}
			/>
			<div className="flex">
				<InputText
					lable="배경 색상"
					placeholder=""
					w="w-[240px]"
					icon={true}
					handleBgColor={handleBgColor}
					value={bgColor.toLocaleUpperCase()}
				/>
				<button
					onClick={handleTextBright}
					className="ml-5 text-sm text-grayscale.700 dark:text-grayscale.400"
				>
					글씨 - {textBright ? "밝은색" : "어두운 색"}
				</button>
			</div>
		</div>
	);
}

export default LabelInfo;

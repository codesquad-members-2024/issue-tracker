import LabelInput from "../../common/LabelInput";

interface PropsType {
	handleName: React.ChangeEventHandler<HTMLInputElement>;
	// handleExplain: React.ChangeEventHandler<HTMLInputElement>; //TODO 나중에 추가
	handleBgColor: (color: string) => void;
	bgColor: string;
	handleTextBright: React.MouseEventHandler<HTMLButtonElement>;
	textBright: boolean;
	label?: Label;
}

function LabelInfo({
	handleName,
	handleBgColor,
	bgColor,
	handleTextBright,
	textBright,
	label,
}: PropsType) {
	return (
		<div className="flex flex-col justify-between h-[153px]">
			<LabelInput
				lable="이름"
				placeholder={`${label ? label.name : "레이블의 이름을 입력하세요"}`}
				w="w-full"
				icon={false}
				handler={handleName}
			/>
			<LabelInput
				lable="설명(선택)"
				placeholder={`${label ? label.description : "레이블에 대한 설명을 입력하세요"}`}
				w="w-full"
				icon={false}
			/>
			<div className="flex">
				<LabelInput
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

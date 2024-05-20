import LabelInput from "../../common/InputText";

interface PropsType {
	milestone?: Milestone;
	handleName: React.ChangeEventHandler<HTMLInputElement>;
	// handleExplain: React.ChangeEventHandler<HTMLInputElement>; //TODO 나중에 추가
}

function MilestoneInfo({ handleName, milestone }: PropsType) {
	return (
		<div className="w-full h-full">
			<div className="flex justify-between w-full my-5 md:flex-row flex-col">
				<LabelInput
					lable="이름"
					placeholder={milestone?.name || "마일스톤의 이름을 입력하세요"}
					w="md:w-[48%] w-full"
					icon={false}
					handler={handleName}
				/>
				<LabelInput
					lable="완료일(선택)"
					placeholder={milestone?.complete_date || "완료일을 입력하세요(형식: YYYY/MM/DD)"}
					w="md:w-[48%] w-full mt-3 md:mt-0"
					icon={false}
				/>
			</div>
			<LabelInput
				lable="설명(선택)"
				placeholder={milestone?.description || "마일스톤에 대한 설명을 입력하세요"}
				w="w-full"
				icon={false}
			/>
		</div>
	);
}

export default MilestoneInfo;

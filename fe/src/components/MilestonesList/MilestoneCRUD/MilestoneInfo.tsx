import InputText from "../../common/InputText";

interface PropsType {
	milestone?: Milestone;
	handleName: React.ChangeEventHandler<HTMLInputElement>;
	handleDate?: React.ChangeEventHandler<HTMLInputElement>;
	handleExplain?: React.ChangeEventHandler<HTMLInputElement>;
	$name: React.RefObject<HTMLInputElement>;
	$completeDate: React.RefObject<HTMLInputElement>;
	$description: React.RefObject<HTMLInputElement>;
}

function MilestoneInfo({
	handleName,
	milestone,
	handleDate,
	handleExplain,
	$name,
	$completeDate,
	$description,
}: PropsType) {
	return (
		<div className="w-full h-full">
			<div className="flex justify-between w-full my-5 md:flex-row flex-col">
				<InputText
					lable="이름"
					placeholder={milestone?.name || "마일스톤의 이름을 입력하세요"}
					w="md:w-[48%] w-full"
					icon={false}
					handler={handleName}
					$ref={$name}
				/>
				<InputText
					lable="완료일(선택)"
					placeholder={milestone?.completeDate || "완료일을 입력하세요(형식: YYYY-MM-DD)"}
					w="md:w-[48%] w-full mt-3 md:mt-0"
					icon={false}
					handler={handleDate}
					$ref={$completeDate}
				/>
			</div>
			<InputText
				lable="설명(선택)"
				placeholder={milestone?.description || "마일스톤에 대한 설명을 입력하세요"}
				w="w-full"
				icon={false}
				handler={handleExplain}
				$ref={$description}
			/>
		</div>
	);
}

export default MilestoneInfo;

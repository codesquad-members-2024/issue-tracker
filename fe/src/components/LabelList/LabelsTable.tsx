import { useState } from "react";
import Alert from "../common/Alert";
import Label from "./Label";

const border = "component-border dark:component-border--dark";

//DELETE
const labels = [
	{
		id: 21,
		name: "옹?",
		description: "라벨설명",
		background_color: "#dfdeff",
		text_bright: false,
	},
	{
		id: 22,
		name: "documentaion",
		description: "이 라벨은 노란색의 라벨입니다",
		background_color: "#feff79",
		text_bright: false,
	},
	{
		id: 33,
		name: "버그가아니면내능력부족",
		description: "이 라벨은 연두색의 라벨입니다아아아아아",
		background_color: "#6ab43e",
		text_bright: true,
	},
];

function LabelsTable() {
	const [showAlert, setShowAlert] = useState(false);
	const length = labels.length;

	return (
		<>
			<div className={`mt-5 w-full border-[1px] rounded-2xl ${border} min-w-[425px]`}>
				<header className={`h-[64px] border-b-[1px] ${border} flex items-center`}>
					<span className="mx-8 font-bold text-grayscale.700 dark:text-grayscale.400">
						{length}개의 레이블
					</span>
				</header>
				<ul>
					{labels.map((label, i) => (
						<Label key={label.id} label={label} i={i} length={length} setShowAlert={setShowAlert} />
					))}
				</ul>
			</div>
			{showAlert && (
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					text="해당 레이블을 삭제하시겠습니까?"
					danger={true}
				/>
			)}
		</>
	);
}

export default LabelsTable;

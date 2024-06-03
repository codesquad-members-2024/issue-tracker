import { useState, useRef } from "react";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";
import LabelInfo from "./LabelInfo";
import usePatch from "../../../hooks/usePatch";

interface DataType {
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

interface PropsType {
	label: Label;
	handleShowEditor: () => void;
}

const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function LabelEditor({ label, handleShowEditor }: PropsType) {
	const [name, setName] = useState(label.name);
	const [textBright, setTextBright] = useState(label.textBright);
	const [bgColor, setBgColor] = useState(label.backgroundColor);
	const $description = useRef<HTMLInputElement>(null);
	const [disabled, setDisabled] = useState("DISABLED");
	const mutate = usePatch(`/label/${label.id}`, "label", handleShowEditor);

	const handleName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		setName(value);
		if (value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};
	const handleTextBright = () => {
		setTextBright(!textBright);
		setDisabled("DEFAULT");
	};
	const handleBgColor = (color: string) => {
		setBgColor(color);
		setDisabled("DEFAULT");
	};

	const handleExplain = () => {
		if ($description.current?.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};

	const handleUpdateData = () => {
		const data: DataType = {
			name: name || label.name,
			backgroundColor: bgColor || label.backgroundColor,
			description: $description.current?.value || label.description,
			textBright: textBright || label.textBright,
		};
		mutate(data);
	};

	return (
		<div className="w-full h-full flex flex-col justify-evenly">
			<h2 className="font-bold text-xl mx-8 text-grayscale.900 dark:text-gray-50">레이블 편집</h2>
			<div className="h-2/3 mx-8 flex flex-wrap">
				<section className={`${border} w-[288px] h-[153px] flex justify-center items-center`}>
					<InformationTag
						text={name || label.name}
						icon={null}
						fillColor={bgColor}
						textBright={textBright}
					/>
				</section>
				<section className="flex flex-col justify-between mx-0 mt-6 w-full lg:ml-6 lg:mt-0 lg:w-0 lg:grow">
					<LabelInfo
						handleName={handleName}
						handleBgColor={handleBgColor}
						handleTextBright={handleTextBright}
						handleExplain={handleExplain}
						bgColor={bgColor}
						textBright={textBright}
						label={label}
						$description={$description}
					/>
					<div className="flex flex-row-reverse mt-2">
						<Button
							onClick={handleUpdateData}
							size="S"
							type="CONTAINED"
							icon="PEN"
							text="편집 완료"
							state={disabled}
						/>
						<div className="mr-5">
							<Button
								onClick={handleShowEditor}
								size="S"
								type="OUTLINE"
								icon="X"
								text="취소"
								state="DEFAULT"
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default LabelEditor;

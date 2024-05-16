import { useState } from "react";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";
import LabelInfo from "./LabelInfo";

interface PropsType {
	label: Label;
	handleShowEditor: React.MouseEventHandler<HTMLButtonElement>;
}

const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function LabelEditor({ label, handleShowEditor }: PropsType) {
	const [name, setName] = useState(label.name);
	// const [explain, setExplain] = useState(label.description);
	const [textBright, setTextBright] = useState(label.text_bright);
	const [bgColor, setBgColor] = useState(label.background_color);
	const [disabled, setDisabled] = useState("DISABLED");

	const handleName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setName(target.value);
		if (target.value) {
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

	//TODO 나중에 추가해야함
	// const handleExplain = () => {
	// 	setDisabled("DEFAULT");
	// };

	return (
		<div className="w-full h-full flex flex-col justify-evenly">
			<h2 className="font-bold text-xl mx-8">레이블 편집</h2>
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
						bgColor={bgColor}
						handleTextBright={handleTextBright}
						// handleExplain={handleExplain}
						textBright={textBright}
						label={label}
					/>
					<div className="flex flex-row-reverse mt-2">
						<Button size="S" type="CONTAINED" icon="PEN" text="편집 완료" state={disabled} />
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

import { useState } from "react";
import Button from "../common/Button";
import InformationTag from "../common/InformationTag";
import LabelEditor from "./LabelCRUD/LabelEditor";

interface PropsType {
	label: Label;
	i: number;
	length: number;
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const border = "component-border dark:component-border--dark";

function Label({ label, i, length, setShowAlert }: PropsType) {
	const [showEditor, setShowEditor] = useState(false);
	const handleShowEditor = () => setShowEditor(!showEditor);
	const handleAlert = () => setShowAlert(true);

	return (
		<li
			className={`transition-[height] ${
				showEditor ? "lg:h-[360px] h-[520px]" : "h-[96px]"
			} bg-grayscale.50 dark:bg-grayscale.800 border-t-[1px] ${border} ${
				i === length - 1 && "rounded-b-2xl"
			}`}
		>
			<div className={`${showEditor && "hidden"} w-full h-full flex items-center justify-between`}>
				<div className="flex ml-7 w-full">
					<div className="w-1/4">
						<InformationTag
							text={label.name}
							icon={null}
							fillColor={label.background_color}
							textBright={label.text_bright}
						/>
					</div>
					<div className="lg:block w-1/2 hidden">
						<p className="text-grayscale.600 dark:text-grayscale.500">{label.description}</p>
					</div>
				</div>
				<div className="flex w-[120px] mr-5">
					<Button
						onClick={handleShowEditor}
						size="S"
						type="GHOST"
						icon="PEN"
						text="편집"
						state="DEFAULT"
					/>
					<Button
						onClick={handleAlert}
						size="S"
						type="GHOST_RED"
						icon="TRASH"
						text="삭제"
						state="DEFAULT"
					/>
				</div>
			</div>

			{showEditor && <LabelEditor label={label} handleShowEditor={handleShowEditor} />}
		</li>
	);
}

export default Label;

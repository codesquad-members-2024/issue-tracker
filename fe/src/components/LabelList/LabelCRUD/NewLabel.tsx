import { useState, useRef } from "react";
import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";
import LabelInfo from "./LabelInfo";

interface DataType {
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

interface PropsType {
	handleShowNewLabel: React.MouseEventHandler<HTMLButtonElement>;
	setNewLabel: React.Dispatch<React.SetStateAction<boolean>>;
}

const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function NewLabel({ handleShowNewLabel, setNewLabel }: PropsType) {
	const [name, setName] = useState("Lable");
	const [textBright, setTextBright] = useState(true);
	const [backgroundColor, setBgColor] = useState("#dfdeff");
	const $description = useRef<HTMLInputElement>(null);
	const [disabled, setDisabled] = useState("DISABLED");

	// const queryClient = useQueryClient();
	// const { mutate } = useMutation({
	// 	mutationFn: (data: DataType) => fetchData("/label", { method: "POST", body: data }),
	// 	onSuccess: () => {
	// 		setNewLabel(false);
	// 		queryClient.invalidateQueries({ queryKey: ["label"] });
	// 	},
	// 	onError: (e) => {
	// 		console.error("생성에러", e);
	// 	},
	// });

	const handleName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setName(target.value);
		if (target.value) {
			setDisabled("DEFAULT");
			return;
		}
		setDisabled("DISABLED");
	};
	const handleTextBright = () => setTextBright(!textBright);
	const handleBgColor = (color: string) => setBgColor(color);
	const handleAddData = () => {
		const data: DataType = {
			name,
			backgroundColor,
			description: $description.current?.value || "",
			textBright,
		};
		console.log("바디", data); //DELETE
		// 	mutate(data);
	};

	return (
		<div
			className={`mt-5 w-full ${border} lg:h-[360px] h-[480px] min-w-[425px] bg-grayscale.50 dark:bg-grayscale.800 `}
		>
			<h2 className="font-bold text-xl m-8">새로운 레이블 추가</h2>
			<div className="h-2/3 mx-8 flex flex-wrap">
				<section className={`${border} w-[288px] h-[153px] flex justify-center items-center`}>
					<InformationTag
						text={name || "Label"}
						icon={null}
						fillColor={backgroundColor}
						textBright={textBright}
					/>
				</section>
				<section className="flex flex-col justify-between mx-0 mt-6 w-full lg:ml-6 lg:mt-0 lg:w-0 lg:grow">
					<LabelInfo
						handleName={handleName}
						handleBgColor={handleBgColor}
						bgColor={backgroundColor}
						handleTextBright={handleTextBright}
						textBright={textBright}
						$description={$description}
					/>
					<div className="flex flex-row-reverse mt-2">
						<Button
							onClick={handleAddData}
							size="S"
							type="CONTAINED"
							icon="PLUS"
							text="완료"
							state={disabled}
						/>
						<div className="mr-5">
							<Button
								onClick={handleShowNewLabel}
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
export default NewLabel;

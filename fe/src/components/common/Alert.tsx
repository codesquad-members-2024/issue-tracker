import Button from "./Button";

interface PropsType {
	showAlert: boolean;
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
	text: string;
	danger: boolean;
}
const border = "border-[1px] rounded-2xl component-border dark:component-border--dark";

function Alert({ showAlert, setShowAlert, text, danger }: PropsType) {
	const handleDisableAlert = () => setShowAlert(false);
	return (
		<>
			<div
				className={`${border} z-20 flex flex-col justify-evenly items-center w-[350px] h-[180px] absolute inset-x-2/4  transform -translate-x-1/2 -translate-y-[70%] shadow-modal dark:shadow-dark bg-grayscale.50 dark:bg-grayscale.800`}
			>
				<p className="text-grayscale.700 dark:text-grayscale.400">{text}</p>
				<div className="flex w-full justify-evenly">
					<Button
						onClick={handleDisableAlert}
						size="S"
						type="OUTLINE"
						icon={null}
						text="아니오"
						state="DEFAULT"
					/>
					<Button
						size="S"
						type={danger ? "CONTAINED_RED" : "CONTAINED"}
						icon={null}
						text="예"
						state="DEFAULT"
					/>
				</div>
			</div>

			{showAlert && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={handleDisableAlert}
				></div>
			)}
		</>
	);
}

export default Alert;

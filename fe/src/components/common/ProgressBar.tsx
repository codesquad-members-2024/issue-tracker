//w-[0%] w-[5%] w-[10%] w-[15%] w-[20%] w-[25%] w-[30%] w-[35%] w-[40%] w-[45%] w-[50%] w-[55%] w-[60%] w-[65%] w-[70%] w-[75%] w-[80%] w-[85%] w-[90%] w-[95%] w-[100%]

interface PercentType {
	percent: number;
}
interface ProgressWithInfoProps {
	openedIssueCount: number;
	closedIssueCount: number;
	percent: number;
}
interface ProgressWithLabelProps {
	percent: number;
	name: string;
}

const ProgressBar: React.FC<PercentType> = ({ percent }: PercentType) => {
	return (
		<>
			<div className="w-[224px] h-[8px] bg-grayscale.200 rounded-xl">
				<div
					className={`transition-[width] h-full w-[${percent}%] bg-accent.blue ${
						percent === 100 ? "rounded-xl" : "rounded-l-xl"
					} `}
				></div>
			</div>
		</>
	);
};

function withLabel(Component: React.FC<PercentType>, { percent, name }: ProgressWithLabelProps) {
	console.log();
	return (
		<>
			<Component percent={percent} />
			<label className="text-xs text-grayscale.900 dark:text-grayscale.50 font-medium mt-2">
				{name}
			</label>
		</>
	);
}

function withInfo(
	Component: React.FC<PercentType>,
	{ openedIssueCount, closedIssueCount, percent }: ProgressWithInfoProps
) {
	return (
		<>
			<Component percent={percent} />
			<div className="text-xs text-grayscale.600 dark:text-grayscale.500 flex justify-between mt-2">
				<span>{`${percent}%`}</span>
				<div>
					<span className="mr-2">열린 이슈 {openedIssueCount}</span>
					<span>닫힌 이슈 {closedIssueCount}</span>
				</div>
			</div>
		</>
	);
}

const ProgressWithLabel = (props: ProgressWithLabelProps) => withLabel(ProgressBar, props); //<ProgressWithLabel>"그룹프로젝트:이슈트래커"</ProgressWithLabel>
const ProgressWithInfo = (props: ProgressWithInfoProps) => withInfo(ProgressBar, props);

export { ProgressWithInfo, ProgressWithLabel };

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
					className={`transition-[width] h-full bg-accent.blue ${
						percent === 100 ? "rounded-xl" : "rounded-l-xl"
					} `}
					style={{
						width: `${percent}%`,
					}}
				></div>
			</div>
		</>
	);
};

function withLabel(Component: React.FC<PercentType>, { percent, name }: ProgressWithLabelProps) {
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

const ProgressWithLabel = (props: ProgressWithLabelProps) => withLabel(ProgressBar, props);
const ProgressWithInfo = (props: ProgressWithInfoProps) => withInfo(ProgressBar, props);

export { ProgressWithInfo, ProgressWithLabel };

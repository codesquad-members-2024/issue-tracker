import { useState, useRef, useEffect } from "react";
import { ReactComponent as Plus } from "../../../svg/Plus.svg";
import useGet from "../../../hooks/useGet";
import DropdownPanel from "../../common/DropdownPanel";
import InformationTag from "../../common/InformationTag";
import usePatch from "../../../hooks/usePatch";

const border = "component-border dark:component-border--dark border-b-[1px]";
type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	labels: Label[];
	issueId: number;
}

function LabelArea({ handleFetch, handleClearTimeOut, labels, issueId }: ProsType) {
	const [open, setOpen] = useState(false);
	const [currentLabels, setCurrentLabels] = useState<Label[]>([]);
	const checkedItems = useRef<{ [key: number]: number }>({});
	const mutate = usePatch(`/issue/${issueId}/label`, `issue/${issueId}`);

	const { data, refetch } = useGet("label", "/label", false);
	const allLabels = data && data.labels;
	const contents = allLabels && allLabels.map(({ name }: { name: string }) => name);
	const colors =
		allLabels &&
		allLabels.map(({ backgroundColor }: { backgroundColor: string }) => backgroundColor);

	useEffect(() => {
		setCurrentLabels(labels);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleShowDropdownPanel = () => {
		setOpen(false);
		const currLabels = Object.values(checkedItems.current).map((idx) => allLabels[idx]);
		const labelIds = currLabels.map(({ id }) => id);
		setCurrentLabels(currLabels);
		mutate({
			labelIds,
		});
	};

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleCheckedItems = (
		{ target: { checked } }: React.ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		if (checked) {
			checkedItems.current[idx] = idx;
			return;
		}
		delete checkedItems.current[idx];
	};

	return (
		<div
			className={`flex flex-col items-center justify-center ${border}`}
			onMouseEnter={() => handleFetch(data, refetch)}
			onMouseLeave={handleClearTimeOut}
		>
			<details open={open} className="relative w-[80%]">
				<summary
					className="my-6 flex justify-between items-center cursor-pointer text-grayscale.700 dark:text-grayscale.400"
					onClick={onToggle}
				>
					레이블
					<Plus className="stroke-grayscale.600 dark:stroke-grayscale.500" />
				</summary>
				<DropdownPanel
					top="top-[55px]"
					title="레이블 설정"
					contents={contents}
					color={colors}
					handler={handleCheckedItems}
				/>
			</details>

			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={handleShowDropdownPanel}
				></div>
			)}
			<div
				className={`flex flex-wrap transition-[padding] w-[80%] ${
					currentLabels.length ? "pb-3" : "pb-0"
				}`}
			>
				{currentLabels.map((label, i) => {
					const { name, backgroundColor, textBright } = label;
					return (
						<div key={i} className="mr-2 mb-1">
							<InformationTag
								text={name}
								icon={null}
								fillColor={backgroundColor}
								textBright={textBright}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LabelArea;

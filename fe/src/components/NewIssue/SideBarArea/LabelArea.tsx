import { useState, useRef, useEffect } from "react";
import { ReactComponent as Plus } from "../../../svg/Plus.svg";
import useGet from "../../../hooks/useGet";
import DropdownPanel from "../../common/DropdownPanel";
import InformationTag from "../../common/InformationTag";

const border = "component-border dark:component-border--dark border-b-[1px]";
type FetchedDataType = Milestone[] | Label[] | Member[];
interface ProsType {
	handleFetch: (fetchedData: FetchedDataType, refetch: () => void) => void;
	handleClearTimeOut: () => void;
	labelIds: React.MutableRefObject<number[]>;
}

function LabelArea({ handleFetch, handleClearTimeOut, labelIds }: ProsType) {
	const [open, setOpen] = useState(false);
	const [idx, setIdx] = useState<number[]>([]);
	const checkedItems = useRef<{ [key: number]: number }>({});

	const { data, refetch } = useGet("label", "/label", false);
	const labels = data && data.labels;
	const contents = labels && labels.map(({ name }: { name: string }) => name);
	const colors =
		labels && labels.map(({ backgroundColor }: { backgroundColor: string }) => backgroundColor);

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

	useEffect(() => {
		if (!open) setIdx(Object.values(checkedItems.current));
	}, [open]);

	useEffect(() => {
		labelIds.current = idx.map((i) => labels[i].id);
	}, [idx, labelIds, labels]);

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
					onClick={() => setOpen(false)}
				></div>
			)}
			<div
				className={`flex flex-wrap transition-[padding] w-[80%] ${idx.length ? "pb-3" : "pb-0"}`}
			>
				{idx.map((i) => {
					const { id, name, backgroundColor, textBright } = labels[i];
					return (
						<div key={id} className="mr-2 mb-1">
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

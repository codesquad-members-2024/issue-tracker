import useGet from "../../hooks/useGet";
import Loading from "../common/Loading";
import Label from "./Label";

const border = "component-border dark:component-border--dark";

function LabelsTable() {
	const { data, error, isLoading } = useGet("label", "/label", true);
	if (isLoading) return <Loading />;
	if (error) return <div>에러 {error.message}</div>;

	const { labelCount, labels }: LabelDataType = data;
	const length = labelCount.totalCount;
	return (
		<div className={`mt-5 w-full border-[1px] rounded-2xl ${border} min-w-[425px]`}>
			<header className={`h-[64px] flex items-center`}>
				<span className="mx-8 font-bold text-grayscale.700 dark:text-grayscale.400">
					{length}개의 레이블
				</span>
			</header>
			<ul>
				{labels.length ? (
					labels.map((label, i) => <Label key={label.id} label={label} i={i} length={length} />)
				) : (
					<li className="bg-grayscale.50 dark:bg-grayscale.800 h-[96px] rounded-b-2xl border-t-[1px] flex justify-center items-center component-border dark:component-border--dark ">
						<span className="animate-bounce">레이블 없성ㅠㅠ</span>
					</li>
				)}
			</ul>
		</div>
	);
}

export default LabelsTable;

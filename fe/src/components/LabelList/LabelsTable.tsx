import Label from "./Label";

const border = "component-border dark:component-border--dark";

//DELETE
const labels: Label[] = [
	{
		id: 21,
		name: "옹?",
		description: "라벨설명",
		backgroundColor: "#dfdeff",
		textBright: false,
	},
	{
		id: 22,
		name: "documentaion",
		description: "이 라벨은 노란색의 라벨입니다",
		backgroundColor: "#feff79",
		textBright: false,
	},
	{
		id: 33,
		name: "버그가아니면내능력부족",
		description: "이 라벨은 연두색의 라벨입니다아아아아아",
		backgroundColor: "#6ab43e",
		textBright: true,
	},
];
//CHECKLIST 레이블 CRUD 아래 주석들 커스텀훅으로 바꾸면 됨
//[x] get 요청
//[x] DELETE
//[x] update
// [x] create
function LabelsTable() {
	// const { data, error, isLoading } = useQuery({
	// 	queryKey: ["label"],
	// 	queryFn: () => fetchData("/label"),
	// });
	// if (isLoading) return <div>로딩</div>;
	// if (error) return <div>에러 {error.message}</div>;
	// console.log(data);
	// const {labelCount,labels} = data;
	// 아래 length 지우면 됨 그리고 나중에 리팩토링 const length = labelCount.totalCount
	const length = labels.length;
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

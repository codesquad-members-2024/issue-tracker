import { useReducer } from "react";
import TabButton from "../../common/TabButton";
import TableCheckBox from "./TableCheckBox";
import TotalCheckBox from "./TotalCheckBox";
import Issue from "./Issue";

//DELETE 차후 삭제
const issues = [
	{
		id: 111,
		title: "이슈 제목",
		open: true,
		content: "Grenadine",
		timestamp: "2024/05/14 02:32:09",
		writer: "Lurleen",
		milestone_name: "Hombre Space",
		labels: [
			{
				id: 11,
				name: "bug",
				background_color: "#0025e6",
				text_bright: true,
			},
			{
				id: 12,
				name: "label",
				background_color: "#ff3b30",
				text_bright: true,
			},
		],
	},
	{
		id: 222,
		title: "Legal Assistant",
		open: false,
		content: "Grenadine",
		timestamp: "2023-09-20 17:51:22",
		writer: "Tiffanie",
		milestone_name: "X5",
		labels: [
			{
				id: 21,
				name: "옹?",
				background_color: "#dfdeff",
				text_bright: false,
			},
			{
				id: 22,
				name: "documentaion",
				background_color: "#feff79",
				text_bright: false,
			},
		],
	},
];
//

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

const border = "component-border dark:component-border--dark";
const initialState = { activeTotal: false, clickTotal: false, countCheckBox: 0 };
const TOTAL_LENGTH = issues.length;

function reducer(state: CheckboxState, action: string) {
	switch (action) {
		case "SET_TOTAL_ACTIVE":
			return { activeTotal: true, clickTotal: true, countCheckBox: TOTAL_LENGTH };
		case "SET_TOTAL_DISABLE":
			return { activeTotal: false, clickTotal: true, countCheckBox: 0 };
		case "PLUS_COUNT":
			return { activeTotal: false, clickTotal: false, countCheckBox: state.countCheckBox + 1 };
		case "MINUS_COUNT":
			return { activeTotal: false, clickTotal: false, countCheckBox: state.countCheckBox - 1 };
		default:
			throw new Error();
	}
}

function IssueTable() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className={`border-[1px] ${border} rounded-2xl lg:mt-0 mt-14`}>
			<header className={`h-[64px] border-b-[1px] ${border} flex items-center`}>
				<div className="flex items-center justify-between mx-8 w-[290px]">
					<TotalCheckBox state={state} dispatch={dispatch} TOTAL_LENGTH={TOTAL_LENGTH} />
					{state.countCheckBox > 0 ? (
						<div className="w-full mx-8 font-bold text-grayscale.700 dark:text-grayscale.400">
							{state.countCheckBox}개 이슈 선택
						</div>
					) : (
						<TabButton position="TABLE" />
					)}
				</div>
			</header>
			<ul>
				{issues.map((issue, i) => (
					<li
						key={issue.id}
						className={`flex items-center bg-grayscale.50 dark:bg-grayscale.800 ${
							i === issues.length - 1 ? "rounded-b-2xl" : `border-b-[1px] ${border}`
						}`}
					>
						<div className="h-[52px]">
							<TableCheckBox state={state} dispatch={dispatch} />
						</div>
						<Issue issue={issue} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default IssueTable;

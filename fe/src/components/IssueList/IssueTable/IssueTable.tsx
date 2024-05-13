import { useReducer, useEffect } from "react";
import TabButton from "../../common/TabButton";
import TableCheckBox from "./TableCheckBox";
import TotalCheckBox from "./TotalCheckBox";

interface CheckboxState {
	activeTotal: boolean;
	clickTotal: boolean;
	countCheckBox: number;
}

const border = "component-border dark:component-border--dark";
const initialState = { activeTotal: false, clickTotal: false, countCheckBox: 0 };
const TOTAL_LENGTH = 3;

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

	useEffect(() => {
		console.log(state);
	}, [state]);

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
				<li
					className={`flex items-center bg-grayscale.50 dark:bg-grayscale.800 border-b-[1px] ${border}`}
				>
					<TableCheckBox state={state} dispatch={dispatch} /> 내용이야1
				</li>
				<li
					className={`flex items-center bg-grayscale.50 dark:bg-grayscale.800 border-b-[1px] ${border}`}
				>
					<TableCheckBox state={state} dispatch={dispatch} /> 내용이야2
				</li>
				<li
					className={`flex items-center bg-grayscale.50 dark:bg-grayscale.800 border-b-[1px] ${border}`}
				>
					<TableCheckBox state={state} dispatch={dispatch} />
					내용이야3
				</li>
			</ul>
		</div>
	);
}

export default IssueTable;

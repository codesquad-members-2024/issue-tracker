import { useContext, useRef } from "react";
import TabButton from "../../common/TabButton";
import TableCheckBox from "./TableCheckBox";
import TotalCheckBox from "./TotalCheckBox";
import Issue from "./Issue";
import useGet from "../../../hooks/useGet";
import DropdownFilter from "./DropdownFilter/DropdownFilter";
import Loading from "../../common/Loading";
import StateUpdater from "./DropdownFilter/StateUpdater";
import { CheckboxContext } from "../../../provider/CheckboxProvider";

interface PropsType {
	queryParam: null | string;
	query: string;
}

const border = "component-border dark:component-border--dark";

function IssueTable({ queryParam, query }: PropsType) {
	const [state] = useContext(CheckboxContext);
	const checkedIssues = useRef<{ [key: number]: number }>({});

	const { data, error, isLoading } = useGet(query, query, true);
	if (isLoading) return <Loading />;
	if (error) return <div>에러 {error.message}</div>;

	const { issueCounts, issues }: IssueDataType = data;
	return (
		<div className={`border-[1px] ${border} rounded-2xl lg:mt-0 mt-14`}>
			<header className={`h-[64px] flex items-center`}>
				<div className="flex items-center mx-8 h-full w-full">
					<TotalCheckBox
						length={
							queryParam && queryParam === "closed"
								? issueCounts.closedCount
								: issueCounts.openedCount
						}
						checkedIssues={checkedIssues}
						issues={issues}
					/>
					{state.countCheckBox > 0 ? (
						<div className="flex items-center justify-between w-full ml-8">
							<span className="font-bold text-grayscale.700 dark:text-grayscale.400">
								{state.countCheckBox}개 이슈 선택
							</span>
							<StateUpdater
								checkedIssues={checkedIssues}
								queryKey={query}
								queryParam={queryParam}
							/>
						</div>
					) : (
						<div className="flex justify-between items-center ml-7 h-full w-[95%]">
							<TabButton
								position="ISSUE"
								leftCount={issueCounts.openedCount}
								rightCount={issueCounts.closedCount}
								state={queryParam}
							/>
							<DropdownFilter />
						</div>
					)}
				</div>
			</header>
			<ul>
				{issues.length ? (
					issues.map((issue, i) => (
						<li
							key={issue.id}
							className={`flex items-center bg-grayscale.50 dark:bg-grayscale.800 ${
								i === issues.length - 1 && "rounded-b-2xl"
							} border-t-[1px] ${border}`}
						>
							<div className="h-[52px]">
								<TableCheckBox issueId={issue.id} checkedIssues={checkedIssues} />
							</div>
							<Issue issue={issue} />
						</li>
					))
				) : (
					<li className="bg-grayscale.50 dark:bg-grayscale.800 h-[96px] rounded-b-2xl border-t-[1px] flex justify-center items-center component-border dark:component-border--dark ">
						<span className="animate-bounce">이슈 없성ㅠㅠ</span>
					</li>
				)}
			</ul>
		</div>
	);
}

export default IssueTable;

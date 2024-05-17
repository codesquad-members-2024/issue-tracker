import React from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Issue } from "./IssueFeed";
import FilterUI from "../../util/FilterUI";
import { Filter } from "../../util/FilterUI";

type TaskTable = Record<string, Filter[]>;

const taskTable: TaskTable = {
    담당자: [
        { value: "담당자가 없는 이슈", query: "" },
        { value: "george", query: "author:96limshyun" },
        { value: "cory", query: "author:cory" },
        { value: "jayden", query: "author:jayden" },
    ],
    레이블: [
        { value: "레이블이 없는 이슈", query: "" },
        { value: "bug", query: "label=bug" },
        { value: "documentation", query: "label=documentation" },
    ],
    마일스톤: [
        { value: "마일스톤이 없는 이슈", query: "" },
        { value: "이슈리스트", query: "milestione=이슈리스트" },
    ],
    작성자: [
        { value: "모두 보기", query: "" },
        { value: "cory", query: "assignee=cory" },
        { value: "jayden", query: "assignee=jayden" },
        { value: "george", query: "assignee=george" },
    ],
};

interface FeedNavProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    issueInfo: Issue[];
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
    isAllChecked: boolean;
    allCheckHandler: () => void;
    checkedItem: string[];
}

const FeedNav = ({
    isOpen,
    setOpen,
    issueInfo,
    resetFilterUI,
    setResetFilterUI,
    isAllChecked,
    allCheckHandler,
    checkedItem,
}: FeedNavProps) => {
    const issuesLength = {
        open: issueInfo.filter((curIssue) => curIssue.is_open).length,
        closed: issueInfo.filter((curIssue) => !curIssue.is_open).length,
    };

    return (
        <div className="h-45 bg-gray-200 dark:bg-darkModeBG flex text-sm rounded-t-lg">
            <div className="flex h-full w-70% items-center">
                <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={allCheckHandler}
                    className="w-7%"
                />
                {checkedItem.length ? (
                    <div>{checkedItem.length}개 이슈 선택</div>
                ) : (
                    <div>
                        <button
                            className={`mr-6 ${isOpen ? "font-bold" : ""}`}
                            onClick={() => setOpen(true)}
                        >
                            <InfoCircleOutlined /> 열린 이슈({issuesLength.open}
                            )
                        </button>
                        <button
                            className={isOpen ? "" : "font-bold"}
                            onClick={() => setOpen(false)}
                        >
                            <CreditCardOutlined /> 닫힌 이슈(
                            {issuesLength.closed})
                        </button>
                    </div>
                )}
            </div>
            <div className="flex h-full w-30% items-center z-10">
                {checkedItem.length ? "" : Object.keys(taskTable).map((key) => (
                    <FilterUI
                        key={key}
                        filterInfo={taskTable[key]}
                        filterType={key}
                        resetFilterUI={resetFilterUI}
                        setResetFilterUI={setResetFilterUI}
                    />
                ))}
                
            </div>
        </div>
    );
};

export default FeedNav;

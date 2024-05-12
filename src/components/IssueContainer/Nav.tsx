import { SearchOutlined, TagOutlined, PlusOutlined, FlagOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import FilterUI from "../../util/FilterUI";
import { FilterContext } from "../../Providers/FilterProvider";
import React, { ChangeEvent, useContext, useEffect } from "react";

interface NavProps {
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
    handleResetFilterUI: () => void;
}

const ISSUES_FILTER = [
    { value: "열린 이슈", query: "is_open=true" },
    { value: "내가 작성한 이슈", query: "author=@me" },
    { value: "나에게 할당된 이슈", query: "is=pr" },
    { value: "내가 댓글을 남긴 이슈", query: "assignee=@me" },
    { value: "닫힌 이슈", query: "is_open=false" },
];

const Nav: React.FC<NavProps> = ({ resetFilterUI, setResetFilterUI, handleResetFilterUI}) => {

    const [FilterState, FilterDispatch] = useContext(FilterContext);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        FilterDispatch({type: "SEARCH", curFilter: event.target.value})
    };

    useEffect(() => {
        const getIssueList = async () => {
            const issueList = await fetch("https://4eefaa4a-29f7-497b-bf78-85336db84286.mock.pstmn.io/api/issues?is_open=false");
            const data = await issueList.json()
            console.log(data)
        };
        getIssueList();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between h-36">
                <div className="flex items-center w-594 h-full">
                    <div className="border-l-2 border-t-2 border-b-2 rounded-l-lg border-gray-300 h-full w-1/5 flex items-center">
                        <FilterUI  filterInfo={ISSUES_FILTER} filterType={"필터"} resetFilterUI={resetFilterUI} setResetFilterUI={setResetFilterUI}/>
                    </div>
                    <div className="bg-gray-200 flex border-2 rounded-r-lg border-gray-300 overflow-hidden h-full w-4/5 px-4 gap-2">
                        <SearchOutlined className="" />
                        <input
                            className="bg-gray-200 w-full outline-none "
                            type="text"
                            value={FilterState.req_query}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                    <div className="flex gap-2">
                        <div className="flex items-center">
                            <Link
                                to="/labels"
                                className=" w-32 border-l-2 border-t-2 border-b-2 rounded-l-lg border-gray-300 px-6 py-1"
                            >
                                <TagOutlined /> 레이블
                            </Link>
                            <Link
                                to="/milestones"
                                className="w-32 border-2 rounded-r-lg border-gray-300 px-6 py-1"
                            >
                                <FlagOutlined /> 마일스톤
                            </Link>
                        </div>
                        <Link
                            to="/new"
                            className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs"
                        >
                            <PlusOutlined /> 이슈 작성
                        </Link>
                    </div>
                </div>
                {FilterState.req_query !== "is_open=true" && (
                    <button className="mt-4" onClick={handleResetFilterUI}>
                        X 현재의 검색 필터 및 정렬 지우기
                    </button>
                )}
            </div>
    );
};

export default Nav;

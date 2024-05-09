import { ChangeEvent, useState } from "react";
import { SearchOutlined, TagOutlined, PlusOutlined, FlagOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Nav = () => {
    const [search, setSearch] = useState("")
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    return (
        <div className="flex items-center justify-between mb-8">
                <div className="rounded-xl font-light bg-gray-200 w-2/5 h-10 flex items-center">
                    <SearchOutlined className="ml-3 mr-1" />
                    <input
                        className=" bg-gray-200"
                        type="text"
                        placeholder="is:issue is:open"
                        value={search}
                        onChange={handleChange}
                    />
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
    );
};

export default Nav;

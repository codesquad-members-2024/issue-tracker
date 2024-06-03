import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DropdownPanel from "../../common/DropdownPanel";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import setFilterLeftSide from "../../../helper/setFilterLeftSide";
import { FilterStateContext } from "../../../provider/FilterStateProvider";

const textColor = "text-grayscale.700 dark:text-grayscale.400";
const border = "component-border dark:component-border--dark";
const contents = [
	"열린 이슈",
	"닫힌 이슈",
	"내가 작성한 이슈",
	"나에게 할당된 이슈",
	"내가 댓글을 남긴 이슈",
];

function Filter() {
	const navigate = useNavigate();
	const [filterText, setFilterText, paramRef] = useContext(FilterStateContext);
	const [open, setOpen] = useState(false);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};

	const handleFiltertext = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
		setFilterText(value);

	const handleCheckedItems = ({ target }: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		target.checked = false;
		setOpen(false);
		setFilterLeftSide(idx, navigate, setFilterText, paramRef);
	};

	const handleFilterTextKeyDown = () => {
		navigate("/filter?target=issue");
	};

	return (
		<>
			<div className={`border-[1px] ${border} h-full lg:w-2/5 w-full flex items-center rounded-xl`}>
				<details
					open={open}
					className={`w-[20%] min-w-[90px] relative h-full cursor-pointer border-r-[1px] rounded-l-xl ${border}`}
				>
					<summary
						className={`h-full flex justify-between items-center rounded-l-xl hover:bg-grayscale.200 dark:hover:bg-grayscale.700`}
						onClick={onToggle}
					>
						<span className={`ml-5 ${textColor} z-20`}>필터</span>
						<FontAwesomeIcon icon={faAngleDown} className={`mr-5 ${textColor} z-20`} />
					</summary>
					<DropdownPanel
						top="top-11"
						title="이슈 필터"
						contents={contents}
						isState={true}
						handler={handleCheckedItems}
					/>
				</details>
				<div className="relative w-[80%] h-full ">
					<input
						className={`truncate pr-2 absolute top-0 h-full w-full ${textColor} rounded-r-xl pl-9 bg-grayscale.200 dark:bg-grayscale.700 focus:input-text--focus`}
						type="text"
						placeholder="Search all issue"
						value={filterText}
						onChange={handleFiltertext}
						onKeyDown={handleFilterTextKeyDown}
					/>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className={`absolute top-3 mx-3 ${textColor}`}
					/>
				</div>
			</div>

			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={() => setOpen(false)}
				></div>
			)}
		</>
	);
}

export default Filter;

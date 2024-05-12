import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DropdownPanel from "../../common/DropdownPanel";
import { useState } from "react";

const textColor = "text-grayscale.700 dark:text-grayscale.400";
const border = "component-border dark:component-border--dark";

function Filter() {
	const [open, setOpen] = useState(false);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
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
					<DropdownPanel />
				</details>
				<div className="relative w-[80%] h-full ">
					<input
						className={`absolute top-0 h-full w-full ${textColor} rounded-r-xl pl-9 bg-grayscale.200 dark:bg-grayscale.700 focus:input-text--focus`}
						type="text"
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

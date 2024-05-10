import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DropdownPanel from "../shared-components/DropdownPanel";
import { useState } from "react";

const textColor = "text-grayscale.700 dark:text-grayscale.400";
const rounded = "rounded-l-xl";

function Filter() {
	const [open, setOpen] = useState(false);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};

	return (
		<>
			<div className="component-border h-[40px] w-2/5 flex items-center dark:component-border--dark">
				<details
					open={open}
					className={`w-[20%] min-w-[90px] relative h-full cursor-pointer border-r-2 ${rounded} border-grayscale.300 dark:border-grayscale.600`}
				>
					<summary
						className={`h-full flex justify-between items-center ${rounded} hover:bg-grayscale.200 dark:hover:bg-grayscale.700`}
						onClick={onToggle}
					>
						<span className={`ml-5 ${textColor} z-20`}>필터</span>
						<FontAwesomeIcon icon={faAngleDown} className={`mr-5 ${textColor} z-20`} />
					</summary>
					<DropdownPanel setOpen={setOpen} />
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

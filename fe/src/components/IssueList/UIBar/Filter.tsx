import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DropdownPanel from "../shared-components/DropdownPanel";

const textColor = "text-grayscale.700 dark:text-grayscale.400";
const rounded = "rounded-l-xl";

function Filter() {
	return (
		<div className="component-border h-[40px] w-2/5 flex items-center dark:component-border--dark">
			<details
				className={`w-[20%] min-w-[90px] relative h-full cursor-pointer border-r-2 ${rounded} border-grayscale.300 dark:border-grayscale.600`}
			>
				<summary
					className={`h-full flex justify-between items-center  ${rounded} hover:bg-grayscale.200 dark:hover:bg-grayscale.700`}
				>
					<span className={`ml-5 ${textColor}`}>필터</span>
					<FontAwesomeIcon icon={faAngleDown} className={`mr-5 ${textColor}`} />
				</summary>
				<DropdownPanel />
			</details>
			<div className="relative w-[80%] h-full ">
				<input
					className={`absolute top-0 h-full w-full ${textColor} rounded-r-xl pl-9 bg-grayscale.200 dark:bg-grayscale.700 focus:input-text--focus`}
					type="text"
				/>
				<FontAwesomeIcon icon={faMagnifyingGlass} className={`absolute top-3 mx-3 ${textColor}`} />
			</div>
		</div>
	);
}

export default Filter;

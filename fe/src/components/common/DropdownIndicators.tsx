import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DropdownPanel from "./DropdownPanel";
import { useState } from "react";

interface PropsType {
	label: string;
	icon: string;
	top: string;
}
interface IconType {
	[key: string]: IconProp;
}

const ICON: IconType = {
	faPlus: faPlus,
};

const textColor = "text-grayscale.700 dark:text-grayscale.400";

function DropdownIndicators({ label, icon, top }: PropsType) {
	const [open, setOpen] = useState(false);

	const onToggle = (event: React.MouseEvent) => {
		event.preventDefault();
		setOpen(!open);
	};

	return (
		<>
			<details open={open} className="relative w-[80%]">
				<summary
					className={`flex justify-between items-center cursor-pointer ${textColor}`}
					onClick={onToggle}
				>
					{label}
					<FontAwesomeIcon icon={ICON[icon]} className="" />
				</summary>
				<DropdownPanel top={top} title={label} />
			</details>

			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-10"
					onClick={() => setOpen(false)}
				></div>
			)}
		</>
	);
}

export default DropdownIndicators;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Button() {
	const small = "w-[128px] h-[40px]";
	const container = "bg-grayscale.700 text-grayscale.50 drak:";
	const icon = faPlus;

	return (
		<button
			className={`${small} ${container} relative flex items-center justify-center rounded-xl text-xs`}
		>
			<FontAwesomeIcon className="mt-[1.4px] text-base" icon={icon} />
			<span className="ml-2">이슈 작성</span>
		</button>
	);
}

export default Button;

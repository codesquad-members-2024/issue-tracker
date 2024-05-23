import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faPlus,
	faX,
	faCircleExclamation,
	faBoxArchive,
	faPaperclip,
	faTag,
	faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faFaceSmile, faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface PropsType {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	size: string;
	type: string;
	icon: string | null;
	text: string;
	state: string;
}
interface DesignMap {
	[key: string]: string;
}
interface IconType {
	[key: string]: IconProp;
}

const SIZE: DesignMap = {
	S: "w-[128px] h-[40px] text-xs",
	M: "w-[184px] h-[48px]",
	L: "w-[240px] h-[56px] text-xl",
};
const SIZE_PADDING: DesignMap = {
	S: "px-[4px]",
	M: "px-[8px]",
	L: "px-[8px]",
};
const ICON: IconType = {
	X: faX,
	PLUS: faPlus,
	"!": faCircleExclamation,
	ARCHIVE: faBoxArchive,
	CLIP: faPaperclip,
	SMLILE: faFaceSmile,
	PEN: faPenToSquare,
	TRASH: faTrashCan,
	TAG: faTag,
	POST: faSignsPost,
};
const TYPE: DesignMap = {
	CONTAINED: "bg-grayscale.700 text-grayscale.50",
	OUTLINE:
		"border-[1px] border-grayscale.700 text-grayscale.700 dark:text-grayscale.400 dark:border-grayscale.400",
	GHOST: "text-grayscale.700 dark:text-grayscale.400",
	GHOST_RED: "text-accent.red",
	CONTAINED_RED: "bg-accent.red text-grayscale.50",
};
const STATE: DesignMap = {
	SELECTED: "font-bold",
	DEFAULT: "hover:opacity-80",
	DISABLED: "opacity-[32%] cursor-default",
};

function Button({ onClick, size, type, icon, text, state }: PropsType) {
	return (
		<button
			onClick={onClick}
			className={`${SIZE[size]} ${TYPE[type]} ${STATE[state]} relative flex items-center justify-center rounded-xl`}
			disabled={state === "DISABLED" ? true : false}
		>
			{icon && <FontAwesomeIcon className="mt-[1.4px]" icon={ICON[icon]} />}
			<span className={SIZE_PADDING[size]}>{text}</span>
		</button>
	);
}

export default Button;

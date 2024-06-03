import { ReactComponent as AlertCircle } from "../../svg/AlertCircle.svg";
import { ReactComponent as CheckOnCircle } from "../../svg/CheckOnCircle.svg";

interface PropsType {
	text: string;
	icon: string | null;
	fillColor: string;
	textBright: boolean;
}
interface IconMapType {
	[key: string]: JSX.Element;
}

const ICON: IconMapType = {
	OPEN: <AlertCircle className="stroke-grayscale.50" />,
	CLOSED: <CheckOnCircle className="stroke-grayscale.50" />,
};

const border = "component-border dark:border-none border-[1px]";
function InformationTag({ text, icon, fillColor, textBright }: PropsType) {
	return (
		<div
			className={`${fillColor === "#FEFEFE" ? border : ""} w-fit flex items-center rounded-2xl ${
				icon ? "h-[32px] px-4" : "h-[24px] px-2"
			} text-xs`}
			style={{
				backgroundColor: `${fillColor}`,
			}}
		>
			{icon && ICON[icon]}
			<span
				className={`${
					textBright ? "text-grayscale.50" : "text-grayscale.600"
				} whitespace-nowrap px-1`}
			>
				{text}
			</span>
		</div>
	);
}
export default InformationTag;

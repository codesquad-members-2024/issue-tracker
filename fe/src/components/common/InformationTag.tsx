import { ReactComponent as AlertCircle } from "../../svg/AlertCircle.svg";
import { ReactComponent as CheckOnCircle } from "../../svg/CheckOnCircle.svg";

// 테일윈드 동적 bg color은 트랜스파일링 안되서 주석으로 색 추가
// bg-[#007AFF] bg-[#8250DF] bg-[#FEFEFE] bg-[#dfdeff] bg-[#0025e6] bg-[#6ab43e] bg-[#ff3b30] bg-[#feff79] bg-[#f4c9e7] bg-[#ffd7c0] bg-[#def1ff]

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
	const bg = `bg-[${fillColor}]`;
	return (
		<div
			className={`${
				fillColor === "#FEFEFE" ? border : ""
			} ${bg} w-fit flex items-center rounded-2xl ${
				icon ? "h-[32px] px-4" : "h-[24px] px-2"
			} text-xs`}
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

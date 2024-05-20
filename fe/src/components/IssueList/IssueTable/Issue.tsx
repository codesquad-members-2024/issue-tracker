import InformationTag from "../../common/InformationTag";
import { ReactComponent as AlertCircle } from "../../../svg/AlertCircle.svg";
import { ReactComponent as Milestone } from "../../../svg/Milestone.svg";
import { Link } from "react-router-dom";

interface PropsType {
	issue: IssueType;
}

interface LabelType {
	id: number;
	name: string;
	background_color: string;
	text_bright: boolean;
}

interface IssueType {
	id: number;
	title: string;
	content: string;
	timestamp: string;
	writer: string;
	milestone_name: string;
	labels: LabelType[];
}

const getTimeStamp = (timestamp: string) => {
	const date = new Date(timestamp);
	let time: number = Math.abs(date.getTime() - new Date().getTime()) / 1000;

	const resulte = ["초", "분", "시간"].reduce((prev, curr) => {
		if (time > 60) {
			time /= 60;
			return prev;
		}
		if (prev) return prev;
		if (time > 24) return "";
		return `${~~time}${curr} 전`;
	}, "");

	if (resulte) return resulte;
	return new Intl.DateTimeFormat("ja-JP").format(date);
};

function Issue({ issue }: PropsType) {
	return (
		<div className="h-[96px] flex flex-col justify-evenly">
			<div className="flex items-center">
				<AlertCircle className="mr-2 stroke-accent.blue" />
				<Link to={`/issue/${issue.id}`}>
					<span className="text-grayscale.900 dark:text-grayscale.50 text-xl font-medium mr-2 cursor-pointer hover:text-grayscale.900/80 dark:hover:text-grayscale.50/80">
						{issue.title}
					</span>
				</Link>
				{issue.labels.length &&
					issue.labels.map((label) => (
						<span key={label.id} className="mr-2">
							<InformationTag
								text={label.name}
								icon={null}
								fillColor={label.background_color}
								textBright={label.text_bright}
							/>
						</span>
					))}
			</div>
			<div className="flex text-grayscale.600 dark:text-grayscale.500">
				<span className="mr-5">#{issue.id}</span>
				<span className="mr-5">
					이 이슈가 {getTimeStamp(issue.timestamp)}, {issue.writer}님에 의해 작성되었습니다.
				</span>
				{issue.milestone_name && (
					<span className="flex items-center">
						<Milestone className="mr-2 fill-grayscale.600 dark:fill-grayscale.500" />
						{issue.milestone_name}
					</span>
				)}
			</div>
		</div>
	);
}

export default Issue;

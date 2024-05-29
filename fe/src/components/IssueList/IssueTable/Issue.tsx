import InformationTag from "../../common/InformationTag";
import { ReactComponent as AlertCircle } from "../../../svg/AlertCircle.svg";
import { ReactComponent as CheckOnCircle } from "../../../svg/CheckOnCircle.svg";
import { ReactComponent as Milestone } from "../../../svg/Milestone.svg";
import { Link } from "react-router-dom";
import getTimeStamp from "../../../utility/getTimeStamp";

interface PropsType {
	issue: Issue;
}

function Issue({ issue }: PropsType) {
	return (
		<div className="h-[96px] flex flex-col justify-evenly w-full">
			<div className="flex items-center justify-between w-[95%]">
				<div className="flex items-center w-[90%]">
					{issue.state ? (
						<AlertCircle className="mt-1 mr-2 stroke-accent.blue" />
					) : (
						<CheckOnCircle className="mt-1 mr-2 stroke-[#8250df]" />
					)}
					<Link to={`/issue/${issue.id}`}>
						<span className="text-grayscale.900 dark:text-grayscale.50 text-xl font-medium mr-2 cursor-pointer hover:text-grayscale.900/80 dark:hover:text-grayscale.50/80">
							{issue.title}
						</span>
					</Link>
					{issue.labels.length ? (
						issue.labels.map((label) => (
							<span key={label.id} className="mr-2">
								<InformationTag
									text={label.name}
									icon={null}
									fillColor={label.backgroundColor}
									textBright={label.textBright}
								/>
							</span>
						))
					) : (
						<></>
					)}
				</div>
				<div className="flex flex-row-reverse h-full w-[10%] group">
					{issue.assignees.length ? (
						issue.assignees.map(({ memberId, profileImage }, i) => {
							return (
								<img
									key={memberId + i}
									className={`transition-all w-[32px] h-[32px] rounded-full -mr-4 group-hover:mr-0`}
									alt="userProfile"
									src={profileImage}
								/>
							);
						})
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="flex text-grayscale.600 dark:text-grayscale.500">
				<span className="mr-5">#{issue.id}</span>
				<span className="mr-5 hidden md:inline-block">
					이 이슈가 {getTimeStamp(issue.timestamp)}, {issue.writer}님에 의해 작성되었습니다.
				</span>
				{issue.milestoneName && (
					<span className="flex items-center">
						<Milestone className="mr-2 fill-grayscale.600 dark:fill-grayscale.500" />
						{issue.milestoneName}
					</span>
				)}
			</div>
		</div>
	);
}

export default Issue;

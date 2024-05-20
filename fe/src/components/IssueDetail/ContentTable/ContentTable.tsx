import Button from "../../common/Button";
import InformationTag from "../../common/InformationTag";

const border = "component-border dark:component-border--dark";

interface PropsType {
	writer: string;
	timeSince: string;
	content: string;
	comment: boolean;
}

function ContentTable({ writer, timeSince, content, comment }: PropsType) {
	return (
		<div className={`${border} border-[1px] rounded-2xl`}>
			<div className={`h-[64px] ${border} border-b-[1px] flex items-center justify-between`}>
				<div className="flex ml-5 font-medium">
					{/*TODO : db의 유저프로필로 변경예정 */}
					<img
						className="w-[32px] h-[32px] rounded-full"
						alt="userProfile"
						src="https://s3-alpha-sig.figma.com/img/bfa1/72b0/77fbdbfc84f8ad555402b23fb6c7a0ed?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eI0HusP8AQJhfrYkbdft4etLT-322gDp7B7Px-jCgKq9YxT-2fFKD4o6AhzmnVaFjLWGiHP0xS~kATP~GzdJOyVdsfc4UEryn1QuF2T9PmoEdt0ZnUR7bqsSHuOReoVWy67p4Drl~meTCSGbWn8amC1-vFCT23Coy9HLU9fkNA0r3uh47-NMSV-Wx7IwUF202FHxOo027XQFyYGP9Xu56j19~mvu0d9TAlW~oHGscTheXQL5afzDdwBFrEGbMgU2Lli2QKdpkrDnjUKb0mRtqWOAVPU45~RZnFemwVP2UKq~e9Q68Q5u4zzvqrlcXbcTyHjkgYGiD6vSTPX-AlMiHA__"
					/>
					<span className="mx-3 flex items-center text-grayscale.700 dark:text-grayscale.400">
						{writer}
					</span>
					<span className="flex items-center text-grayscale.600 dark:text-grayscale.500">
						{timeSince}
					</span>
				</div>
				<div className="mr-5 flex items-center justify-between">
					{comment && (
						<div className="mr-3">
							<InformationTag text="작성자" icon={null} fillColor="#FEFEFE" textBright={false} />
						</div>
					)}
					<div className="w-[100px] flex">
						<Button size="S" type="GHOST" icon="PEN" text="편집" state="DEFAULT" />
						<Button size="S" type="GHOST" icon="SMLILE" text="반응" state="DEFAULT" />
					</div>
				</div>
			</div>
			<pre className="font-[inherit] bg-grayscale.50 dark:bg-grayscale.800 text-grayscale.700 dark:text-grayscale.400 rounded-b-2xl p-5">
				{content}
			</pre>
		</div>
	);
}

export default ContentTable;

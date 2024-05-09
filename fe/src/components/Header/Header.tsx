import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { ReactComponent as LogoBlack } from "../LogoBlack.svg";
import { ReactComponent as LogoWhite } from "../LogoWhite.svg";

interface Props {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ darkMode, setDarkMode }: Props) {
	const LogoComponent = darkMode ? LogoWhite : LogoBlack;

	return (
		<div className="my-2 flex justify-between items-center">
			<LogoComponent className="cursor-pointer" onClick={() => window.location.reload()} />
			<div className="relative flex justify-between items-center">
				<button>
					{/*TODO : db의 유저프로필로 변경예정 */}
					<img
						className="w-[32px] h-[32px] rounded-full"
						alt="userProfile"
						src="https://s3-alpha-sig.figma.com/img/bfa1/72b0/77fbdbfc84f8ad555402b23fb6c7a0ed?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eI0HusP8AQJhfrYkbdft4etLT-322gDp7B7Px-jCgKq9YxT-2fFKD4o6AhzmnVaFjLWGiHP0xS~kATP~GzdJOyVdsfc4UEryn1QuF2T9PmoEdt0ZnUR7bqsSHuOReoVWy67p4Drl~meTCSGbWn8amC1-vFCT23Coy9HLU9fkNA0r3uh47-NMSV-Wx7IwUF202FHxOo027XQFyYGP9Xu56j19~mvu0d9TAlW~oHGscTheXQL5afzDdwBFrEGbMgU2Lli2QKdpkrDnjUKb0mRtqWOAVPU45~RZnFemwVP2UKq~e9Q68Q5u4zzvqrlcXbcTyHjkgYGiD6vSTPX-AlMiHA__"
					></img>
				</button>
				<ProfileMenu darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>
		</div>
	);
}

export default Header;

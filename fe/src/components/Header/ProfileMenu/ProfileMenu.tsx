import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function ProfileMenu() {
	return (
		<div className="absolute top-10 right-0 w-[170px] h-[100px] rounded-xl shadow-profile">
			<div className="w-full h-1/2 border-b-2 text-grayscale.700 flex items-center justify-between">
				<span className="mx-3 text-sm">모드전환</span>
				<FontAwesomeIcon
					icon={faMoon}
					onClick={()=>{}}
					className="mr-5 text-xl cursor-pointer hover:animate-wiggle dark:text-yellow-400 transition-colors"
				/>
			</div>
			<div className="w-full h-1/2 text-grayscale.700 flex items-center">
				<button className="mx-3 text-sm hover:font-black transition-[font-weight]">로그아웃</button>
			</div>
		</div>
	);
}
export default ProfileMenu;

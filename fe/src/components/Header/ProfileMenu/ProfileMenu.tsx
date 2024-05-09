import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

interface Props {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileMenu({ darkMode, setDarkMode }: Props) {
	return (
		<div className="absolute top-10 right-0 w-[170px] h-[100px] rounded-xl shadow-profile dark:bg-gray-800">
			<div className="w-full h-1/2 border-b-[1px] text-grayscale.700 flex items-center justify-between dark:text-grayscale.400 dark:border-grayscale.600">
				<span className="mx-3 text-sm">모드전환</span>
				<FontAwesomeIcon
					icon={darkMode ? faSun : faMoon}
					onClick={() => setDarkMode((prev) => (prev ? "" : "dark"))}
					className="mr-5 text-xl cursor-pointer hover:animate-wiggle dark:text-yellow-400"
				/>
			</div>
			<div className="w-full h-1/2 text-grayscale.700 flex items-center dark:text-grayscale.400">
				<button className="mx-3 text-sm hover:font-black transition-[font-weight]">로그아웃</button>
			</div>
		</div>
	);
}
export default ProfileMenu;

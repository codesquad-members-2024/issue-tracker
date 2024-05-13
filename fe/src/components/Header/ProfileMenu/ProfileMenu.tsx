import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

interface Props {
	darkMode: string;
	setDarkMode: React.Dispatch<React.SetStateAction<string>>;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileMenu({ darkMode, setDarkMode, setIsVisible }: Props) {
	return (
		<>
			<div
				className="fixed top-0 left-0 w-screen h-screen z-0"
				onClick={() => setIsVisible(false)}
			></div>

			<div className="absolute top-10 right-0 w-[170px] h-[100px] rounded-xl shadow-modal bg-grayscale.100 dark:bg-grayscale.800 z-10 dark:shadow-dark">
				<div className="w-full h-1/2 border-b-[1px] text-grayscale.700 flex items-center justify-between dark:text-grayscale.400 dark:border-grayscale.600">
					<span className="mx-3 text-sm cursor-default">모드전환</span>
					<FontAwesomeIcon
						icon={darkMode ? faSun : faMoon}
						onClick={() => setDarkMode((prev) => (prev ? "" : "dark"))}
						className="mr-5 text-xl cursor-pointer hover:animate-wiggle dark:text-yellow-400"
					/>
				</div>
				<div className="w-full h-1/2 text-grayscale.700 flex items-center cursor-pointer hover:font-black dark:text-grayscale.400">
					<button className="mx-3 text-sm transition-[font-weight]">로그아웃</button>
				</div>
			</div>
		</>
	);
}
export default ProfileMenu;

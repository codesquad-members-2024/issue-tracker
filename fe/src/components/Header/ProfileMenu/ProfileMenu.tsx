import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { TopContext } from "../../../provider/TopProvider";
import fetchData from "../../../utility/fetchData";
import Alert from "../../common/Alert";

interface Props {
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileMenu({ setIsVisible }: Props) {
	const [darkMode, setDarkMode, , setIsLoggedIn] = useContext(TopContext);
	const [showAlert, setShowAlert] = useState(false);

	const handleLogout = () => {
		fetchData("/member/logout", { method: "POST" });
		if (setIsLoggedIn) setIsLoggedIn(false);
		setDarkMode("");
		localStorage.removeItem("user");
		localStorage.removeItem("jwt");
	};
	return (
		<>
			<div
				className="fixed top-0 left-0 w-screen h-screen z-10"
				onClick={() => setIsVisible(false)}
			></div>
			<div className="absolute top-10 right-0 w-[170px] h-[100px] rounded-xl shadow-modal bg-grayscale.100 dark:bg-grayscale.800 z-20 dark:shadow-dark">
				<div className="w-full h-1/2 border-b-[1px] text-grayscale.700 flex items-center justify-between dark:text-grayscale.400 dark:border-grayscale.600">
					<span className="mx-3 text-sm cursor-default">모드전환</span>
					<FontAwesomeIcon
						icon={darkMode ? faSun : faMoon}
						onClick={() => setDarkMode((prev) => (prev ? "" : "dark"))}
						className="mr-5 text-xl cursor-pointer hover:animate-wiggle dark:text-yellow-400"
					/>
				</div>
				<div
					className="w-full h-1/2 text-grayscale.700 flex items-center cursor-pointer hover:font-black dark:text-grayscale.400 z-20"
					onClick={() => setShowAlert(true)}
				>
					<button className="mx-3 text-sm transition-[font-weight]">로그아웃</button>
				</div>
			</div>
			{showAlert && (
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					handler={handleLogout}
					text="로그아웃 하시겠습니까?"
					danger={false}
				/>
			)}
		</>
	);
}
export default ProfileMenu;

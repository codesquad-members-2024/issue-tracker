import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { ReactComponent as LogoBlack } from "../../svg/LogoBlack.svg";
import { ReactComponent as LogoWhite } from "../../svg/LogoWhite.svg";
import { useContext, useMemo, useState } from "react";
import { TopContext } from "../../provider/TopProvider";
import getLocalStorageItem from "../../utility/getLocalStorageItem";

function Header() {
	const [darkMode] = useContext(TopContext);
	const [isVisible, setIsVisible] = useState(false);
	const user = getLocalStorageItem("user");

	const LogoComponent = useMemo(() => {
		const Logo = darkMode ? LogoWhite : LogoBlack;
		return <Logo className="cursor-pointer" />;
	}, [darkMode]);

	return (
		<div className="my-2 flex justify-between items-center">
			<Link to="/">{LogoComponent}</Link>
			<div className="relative flex justify-between items-center">
				<button className="z-10" onClick={() => setIsVisible((prev) => !prev)}>
					<img
						className="w-[32px] h-[32px] rounded-full"
						alt="userProfile"
						src={user.profile_image_url}
					/>
				</button>
				{isVisible && <ProfileMenu setIsVisible={setIsVisible} />}
			</div>
		</div>
	);
}

export default Header;

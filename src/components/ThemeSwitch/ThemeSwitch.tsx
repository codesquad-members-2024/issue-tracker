import { useState } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const ThemeSwitch = () => {
    const [isDarkMode, setDarkMode] = useState(false)
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark")
        setDarkMode(prev => !prev)
    }
    
    return <button className="text-xl p-4" onClick={toggleTheme}>{isDarkMode ? <SunOutlined/> : <MoonOutlined /> }</button>
};

export default ThemeSwitch;

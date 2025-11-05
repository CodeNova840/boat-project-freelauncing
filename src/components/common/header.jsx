import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon } from "lucide-react";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../context/theme-providers";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDealer = location.pathname.includes("dealer");

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };
const handleDealerLogin=()=>{
    navigate("/")
}
    return (
        <header
            className={`w-full flex items-center justify-between px-5 py-3 shadow-md transition-colors duration-300 ${isDealer
                    ? "bg-gradient-to-r from-purple-700 to-indigo-800 text-white"
                    : "bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
                }`}
        >
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
                <Link to='/'>
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-32 h-9 rounded-md border border-white/30 cursor-pointer"
                />
                </Link>
              
                {/* <h1 className="text-lg md:text-xl font-bold tracking-wide">
          {isDealer ? "Dealer Portal" : "Retail Portal"}
        </h1> */}
            </div>

            {/* Navigation + Theme Toggle */}
            <div className="flex items-center gap-4">
                {/* <Link
                    to={isDealer ? "/dealer" : "/home"}
                    className="hover:underline text-sm md:text-base"
                >
                    Home
                </Link> */}

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg> : <Moon size={18} />}
                </button>

                {/* Logout */}
                {isDealer ? <>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 text-sm md:text-base"
                    >
                        Logout
                    </button>
                </> : <>
                    <button className="bg-white py-1 px-2 rounded-lg text-blue-600" onClick={handleDealerLogin}>Dealer Login</button></>}

            </div>
        </header>
    );
}

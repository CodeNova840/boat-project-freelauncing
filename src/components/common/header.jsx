import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon } from "lucide-react";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../context/theme-providers";
import { authService } from "../../serices/auth-service";


export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDealer = location.pathname.includes("dealer");
    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");
    const isLoggedIn = userName && userEmail;

    const handleLogout = async () => {
        try {
            await authService.logout(); // Use AuthService logout
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: clear localStorage manually if AuthService fails
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            navigate("/");
        }
    };

    const handleDealerLogin = () => {
        navigate("/");
    };

    // Generate initial for profile image
    const getUserInitial = () => {
        return userName ? userName.charAt(0).toUpperCase() : "U";
    };

    // Generate random color based on user name for consistent profile background
    const getProfileColor = () => {
        const colors = [
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "bg-gradient-to-r from-green-500 to-green-600",
            "bg-gradient-to-r from-purple-500 to-purple-600",
            "bg-gradient-to-r from-red-500 to-red-600",
            "bg-gradient-to-r from-yellow-500 to-yellow-600",
            "bg-gradient-to-r from-pink-500 to-pink-600",
        ];
        const index = userName ? userName.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

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
            </div>

            {/* Navigation + Theme Toggle */}
            <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <Moon size={18} />
                    )}
                </button>

                {/* User Profile or Login Button */}
                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        {/* User Profile */}
                        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                            {/* Profile Image with Initial */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getProfileColor()}`}>
                                {getUserInitial()}
                            </div>
                            
                            {/* User Info */}
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold leading-none">{userName}</p>
                                <p className="text-xs text-white/80 leading-none mt-1">{userEmail}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 text-sm md:text-base transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    /* Login Button for non-dealer pages */
                    !isDealer && (
                        <button 
                            className="bg-white py-1 px-3 rounded-lg text-blue-600 font-medium hover:bg-gray-100 transition-colors"
                            onClick={handleDealerLogin}
                        >
                            Login
                        </button>
                    )
                )}

                {/* Dealer Logout (if needed for separate dealer logout) */}
                {isDealer && !isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 text-sm md:text-base"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
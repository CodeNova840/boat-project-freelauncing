import { Menu, User, Moon, Sun, LogOut } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';
import { ThemeContext } from '../../context/theme-providers';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../serices/auth-service';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await authService.signout(); // Make sure this matches your service method name
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optional: Force logout even if there's an error
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu button - hidden on tablet and mobile screens */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 hidden lg:block"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Logout button - shown only on tablet and mobile screens */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 lg:hidden flex items-center space-x-2"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
              Logout
            </span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 hidden lg:flex items-center space-x-2"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Logout
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {name ? name : "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {email ? email : "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
import {
  Users,
  Ship,
  Folder,
  Tags
} from 'lucide-react';
import SidebarItem from './sibebar-items';
import { useSidebar } from '../../hooks/useSidebar';
import { authService } from '../../serices/auth-service';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate=useNavigate();

  // Sidebar menu items
  const menuItems = [
    {
      id: 'users',
      name: 'Users',
      icon: Users,
    },
        {
      id: 'logout',
      name: 'Logout',
      icon: Users,
    },
  ];
    const handleItemClick = async (item) => {
    if (item.id === 'logout') {
      try {
        await authService.logout();
        navigate('/'); // redirect to login after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <div
      className={`bg-white h-screen dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out flex flex-col ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex-1">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Ship className="h-5 w-5 text-white" />
          </div>
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              Boat Admin
            </h1>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isSidebarOpen={isSidebarOpen}
               onClick={() => handleItemClick(item)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
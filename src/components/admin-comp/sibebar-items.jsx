// SidebarItem.jsx
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

const SidebarItem = ({ item, isSidebarOpen, onClick }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { activeMenu, setActiveMenu } = useSidebar();

  const hasSubmenu = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (onClick) {
      // ✅ If a custom click handler is passed (like logout), use it
      onClick();
      return;
    }

    if (hasSubmenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      setActiveMenu(item.id);
    }
  };

  const isActive =
    activeMenu === item.id ||
    (item.subItems && item.subItems.some((subItem) => subItem.id === activeMenu));

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-600 border-r-2 border-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <item.icon className="h-5 w-5" />
          {isSidebarOpen && <span className="font-medium">{item.name}</span>}
        </div>
        {hasSubmenu && isSidebarOpen && (
          <>
            {isSubmenuOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </>
        )}
      </button>

      {/* Submenu Items */}
      {hasSubmenu && isSubmenuOpen && isSidebarOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {item.subItems.map((subItem) => (
            <button
              key={subItem.id}
              onClick={() => setActiveMenu(subItem.id)}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                activeMenu === subItem.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-50 hover:bg-gray-50'
              }`}
            >
              <subItem.icon className="h-4 w-4" />
              <span className="text-sm">{subItem.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;

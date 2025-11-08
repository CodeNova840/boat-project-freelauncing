import AdminHeader from '../components/admin-comp/header';
import Sidebar from '../components/admin-comp/sidebar';
import { ThemeContext } from '../context/theme-providers';
import { SidebarProvider, useSidebar } from '../hooks/useSidebar';
import AdminRoutes from '../routes/admin-routes'
import { useContext } from 'react';

// Inner component that uses the sidebar context
const AdminLayoutContent = () => {
  const { theme } = useContext(ThemeContext);
  const { isOpen } = useSidebar();

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar - Hidden on tablet and mobile, visible on desktop */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
       fixed lg:translate-x-0
         lg:relative
        transition-transform duration-300 ease-in-out
        
      `}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full transition-all duration-300">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto transition-all duration-300">
          <div className="p-6">
            <AdminRoutes />
          </div>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {
            const { toggleSidebar } = useSidebar();
            toggleSidebar();
          }}
        />
      )}
    </div>
  );
};

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  );
};

export default AdminLayout;
import AdminHeader from '../components/admin-comp/header';
import Sidebar from '../components/admin-comp/sidebar';
import { ThemeContext } from '../context/theme-providers';
import { SidebarProvider } from '../hooks/useSidebar';
import AdminRoutes from '../routes/admin-routes'
import { useContext } from 'react';

const AdminLayout = () => {
  const { theme } = useContext(ThemeContext); // If you need to access theme

  return (
    <SidebarProvider>
      <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto transition-all duration-300">
            <div className="p-6">
              <AdminRoutes />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
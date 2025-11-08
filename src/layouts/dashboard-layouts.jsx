import Footer from "../components/common/footer";
import Header from "../components/common/header";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Shared Header */}
      <Header />

      {/* Page content (scrollable if needed) */}
      <main className="max-w-full w-full  px-4 py-6">
        {children}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

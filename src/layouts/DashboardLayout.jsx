import { Outlet } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ===== TOP SECTION (Sidebar + Content) ===== */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          <Navbar />

          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ===== FOOTER (after everything) ===== */}
      <footer className="bg-gray-900 text-gray-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} Smart Village. All rights reserved.
      </footer>

    </div>
  );
};

export default DashboardLayout;

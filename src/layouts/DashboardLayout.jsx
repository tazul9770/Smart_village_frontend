import { Outlet } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

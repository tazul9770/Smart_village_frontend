import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthContext();

  const UserItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/events", icon: FiPackage, label: "Events" },
    { to: "/dashboard/complain", icon: FiPlusCircle, label: "Complain" },
  ];

  const AdminItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/events", icon: FiPackage, label: "Events" },
    { to: "/dashboard/events/add", icon: FiPlusCircle, label: "Add Events" },
    { to: "/dashboard/complain", icon: FiPlusCircle, label: "Complain" },
  ];

  const items = user?.is_staff ? AdminItems : UserItems;

  return (
    <>
      {/* ✅ Sidebar Toggle Controller */}
      <input
        type="checkbox"
        id="sidebar-toggle"
        className="hidden peer"
      />

      {/* Overlay (mobile) */}
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-black/40 z-30 hidden peer-checked:block lg:hidden"
      />

      {/* Sidebar */}
      <aside
        className="
        fixed top-0 left-0 z-40 h-full w-64
        bg-white border-r
        -translate-x-full peer-checked:translate-x-0
        lg:translate-x-0
        transition-transform duration-300
      "
      >
        {/* Logo */}
        <Link
          to="/"
          className="h-16 flex items-center px-6 border-b text-lg font-bold"
        >
          <span className="text-indigo-600">SmartVillage</span>
        </Link>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {items.map((item, i) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={i}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 text-xs text-gray-400 border-t">
          © 2025 Smart Village
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

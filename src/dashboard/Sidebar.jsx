import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiTag,
  FiClipboard,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Sidebar = () => {
  const location = useLocation();

  const {user} = useAuthContext();

  const UserItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/events", icon: FiPackage, label: "Events" },
    { to: "/dashboard/complain", icon: FiPlusCircle, label: "Complain" },
    { to: "/dashboard/profession_user", icon: FiPlusCircle, label: "Profession User" },
  ];

  const AdminItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/events", icon: FiPackage, label: "Events" },
    { to: "/dashboard/events/add", icon: FiPlusCircle, label: "Add Events" },
    { to: "/dashboard/complain", icon: FiPlusCircle, label: "Complain" },
    { to: "/dashboard/add_notification", icon: FiPlusCircle, label: "Add Notification" },
  ];

  const items = user.is_staff ? AdminItems : UserItems;

  return (
    <>
      {/* Toggle */}
      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />

      {/* Overlay */}
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-black/40 z-30 hidden peer-checked:block lg:hidden"
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 h-full w-64 bg-white border-r transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform duration-300">
        {/* Logo */}
        {/* <div className="h-16 flex items-center px-6 border-b text-lg font-bold gap-2">
            Smart Village
        </div> */}

        <Link to="/" className="h-16 flex items-center px-6 border-b text-lg font-bold gap-2">
            <p className="text-blue-600">SmartVillage</p>
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
          © 2025 Smart_village
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

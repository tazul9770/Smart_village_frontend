import { useState } from "react";
import {
  FiMenu,
  FiChevronDown,
  FiUser,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur border-b flex items-center px-4 sm:px-6 sticky top-0 z-40">
      {/* Mobile menu */}
      <button
        className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100 transition"
        onClick={() =>
          document.getElementById("sidebar-toggle").click()
        }
      >
        <FiMenu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Page title */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* Right: Profile */}
      <div
        className="ml-auto relative"
        tabIndex={0}
        onBlur={() => setOpen(false)}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-full
            transition focus:outline-none cursor-pointer
            ${open ? "bg-gray-100" : "hover:bg-gray-100"}`}
        >
          {/* Avatar */}
          <img
            src="https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff"
            alt="profile"
            className="w-9 h-9 rounded-full ring-2 ring-indigo-500 ring-offset-2"
          />

          {/* Name */}
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-gray-800">
              User
            </span>
            <span className="text-xs text-gray-500">
              Admin
            </span>
          </div>

          {/* Arrow */}
          <FiChevronDown
            className={`ml-1 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-gray-800">
                User
              </p>
              <p className="text-xs text-gray-500">
                admin@phulbazar.com
              </p>
            </div>

            {/* Menu */}
            <div className="py-1">
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="h-4 w-4" />
                Profile
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiGrid className="h-4 w-4" />
                Dashboard
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

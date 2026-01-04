import { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logoutUser();
    setOpen(false);
    navigate("/");
  };

  // close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // sidebar toggle handler
  const toggleSidebar = () => {
    const checkbox = document.getElementById("sidebar-toggle");
    checkbox.checked = !checkbox.checked;
    setSidebarOpen(checkbox.checked);
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center px-4 sm:px-6 sticky top-0 z-40">
      
      {/* 🔥 MOBILE SIDEBAR TOGGLE */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 transition"
      >
        {sidebarOpen ? (
          <FiX className="h-5 w-5 text-gray-700" />
        ) : (
          <FiMenu className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Title */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* Profile */}
      <div ref={menuRef} className="ml-auto relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-3 px-2 py-1.5 rounded-full transition
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
              {user?.first_name}
            </span>
          </div>

          {/* Arrow */}
          <FiChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <p className="text-sm font-semibold text-gray-800">
                {user?.first_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>

            <div className="py-2">
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <FiUser />
                Profile
              </Link>
            </div>

            <div className="border-t bg-gray-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <FiLogOut />
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

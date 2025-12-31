import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 🔔 Notification state (future API ready)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Your service request was approved",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "New project update available",
      time: "1 hour ago",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigate = useNavigate();
  const { user, logoutUser } = useAuthContext();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "VillageDetails", path: "/village_details" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur shadow-md bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          Smart<span className="text-gray-800">Village</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium text-gray-700 hover:text-green-700 transition"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">

              {/* 🔔 Notification */}
              <button
                onClick={() => {
                  if (notifications.length > 0) {
                    setIsNotificationOpen(prev => !prev);
                    setIsProfileOpen(false);
                  }
                }}
                className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <IoNotificationsOutline className="text-2xl text-gray-700" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* 🔽 Notification Dropdown */}
              {isNotificationOpen && notifications.length > 0 && (
                <div className="absolute right-14 top-12 w-80 bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 font-semibold border-b">
                    Notifications
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-100 border-b last:border-none"
                      >
                        <p className="text-sm text-gray-800">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setNotifications([]);
                      setIsNotificationOpen(false);
                    }}
                    className="w-full text-center py-2 text-sm text-green-700 hover:bg-gray-50"
                  >
                    Mark all as read
                  </button>
                </div>
              )}

              {/* 👤 Profile */}
              <button
                onClick={() => {
                  setIsProfileOpen(prev => !prev);
                  setIsNotificationOpen(false);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
              >
                <CgProfile className="text-2xl text-gray-700" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {user && (
            <button
              onClick={() => {
                if (notifications.length > 0) {
                  setIsNotificationOpen(prev => !prev);
                }
              }}
              className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <IoNotificationsOutline className="text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setIsMobileOpen(prev => !prev)}
            className="text-2xl text-gray-700"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className="font-medium text-gray-700"
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMobileOpen(false)}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setIsMobileOpen(false)}>
                  Profile
                </Link>
                <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={logout} className="text-left text-red-600">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

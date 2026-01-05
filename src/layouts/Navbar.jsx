import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useAuthContext from "../hooks/useAuthContext";
import Notification from "../pages/Notification";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logoutUser } = useAuthContext();

  const navLinks = [
    { name: "VillageDetails", path: "/village_details" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur shadow-md bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

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
              {/* Notification Component */}
              <Notification />

              {/* Profile Button */}
              <button
                onClick={toggleProfile}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
              >
                <CgProfile className="text-2xl text-gray-700" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                  <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-3 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 cursor-pointer">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden relative">
          {user && <Notification />}
          <button onClick={() => setIsMobileOpen(prev => !prev)} className="text-2xl text-gray-700">
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} onClick={() => setIsMobileOpen(false)} className="font-medium text-gray-700">
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded-lg border border-green-700 text-green-700 text-center hover:bg-green-700 hover:text-white transition">Login</Link>
                <Link to="/register" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded-lg bg-green-700 text-white text-center hover:bg-green-800 transition">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>Dashboard</Link>
                <button onClick={logout} className="text-left text-red-600">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

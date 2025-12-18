import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f2027] to-[#0b1220] text-gray-300 pt-14 pb-6 px-6 sm:px-10 md:px-20">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">

        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
            Smart<span className="text-cyan-400">Village</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Smart Village is a digital platform designed to improve rural life by
            providing smart services, transparent governance, and easy access to
            essential information.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-4">Quick Links</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-cyan-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-cyan-400 transition">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Citizen Services */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-4">
            Citizen Services
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/notices" className="hover:text-cyan-400 transition">
                Notices & Announcements
              </Link>
            </li>
            <li>
              <Link to="/complaints" className="hover:text-cyan-400 transition">
                File a Complaint
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-cyan-400 transition">
                Help & FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-cyan-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-4">Connect With Us</h6>
          <p className="text-sm text-gray-400 mb-4">
            Stay connected with Smart Village through our social platforms.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan-400 hover:text-gray-900 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan-400 hover:text-gray-900 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan-400 hover:text-gray-900 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} Smart Village. All rights reserved.
        </p>
        <p className="mt-2 sm:mt-0">
          Built for a <span className="text-cyan-400 font-semibold">Smarter Community</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

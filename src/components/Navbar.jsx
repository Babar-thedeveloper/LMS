import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { FaUserCircle, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { MdColorLens } from 'react-icons/md';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween",
  "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
  "wireframe", "black", "luxury", "dracula", "cmyk", "autumn",
  "business", "acid", "lemonade", "night", "coffee", "winter",
  "dim", "nord", "sunset"
];

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [profileOpen, setProfileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-base-100 p-4 border-b shadow flex justify-between items-center relative z-30">
      {/* Sidebar Toggle Button (Mobile) */}
      <button onClick={toggleSidebar} className="btn btn-ghost lg:hidden">
        <HiMenu size={24} />
      </button>

      {/* Logo or Title (center on mobile if needed) */}
      <h1 className="text-xl font-semibold hidden sm:block">LMS Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* Theme Switcher Dropdown */}
        <div className="dropdown dropdown-end relative">
          <button
            className="btn btn-primary rounded-xl shadow-md flex items-center gap-2 px-4 py-2 font-semibold text-base-100 transition-all duration-200"
            style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)' }}
            onClick={() => setThemeOpen((open) => !open)}
            aria-label="Theme menu"
          >
            <MdColorLens size={22} className="text-white" />
            <span className="hidden sm:inline">Themes</span>
          </button>
          {themeOpen && (
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-64 overflow-auto grid grid-cols-2 gap-2 absolute right-0 top-12 animate-fade-in z-50">
              {themes.map((t) => (
                <li key={t} className="hover:bg-primary hover:text-white">
                  <button
                    onClick={() => { setTheme(t); setThemeOpen(false); }}
                    className={`btn w-full capitalize ${theme === t ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end relative">
          <button
            className="btn btn-primary hover:bg-primary-focus flex items-center gap-2 text-lg rounded-full px-3 py-2 shadow-md transition-all duration-200"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Profile menu"
          >
            <FaUserCircle size={24} />
          </button>
          {profileOpen && (
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-12 animate-fade-in">
              <li>
                <button className="flex items-center gap-2 hover:bg-primary hover:text-white rounded-lg transition-all">
                  <FaUserEdit /> Edit Profile
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-error hover:text-white rounded-lg transition-all">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

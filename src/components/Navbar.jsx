import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { FaUserCircle, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { BsPalette } from 'react-icons/bs';
import { FaSun, FaMoon } from 'react-icons/fa';

const themes = ["nord", "cmyk", "fantasy", "corporate"];


const pageTitles = {
  '/layout/apply-leaves': 'Apply Leaves',
  '/layout/all-leaves': 'All Leaves',
  '/layout/official-duty': 'Official Duty',
  '/layout/personal-work': 'Personal Work',
  '/layout/asset-management': 'Asset Management',
  '/layout/view-attendance': 'View Attendance',
  '/layout/company-assets': 'Company Assets',
  '/layout/leave-policies': 'Leave Policies',
  '/layout/resignation': 'Resignation',
  '/layout/admindashboard': 'Admin Dashboard',
  // Add more as needed
};

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Get dynamic page title
  const pageTitle = pageTitles[Object.keys(pageTitles).find((key) => location.pathname.startsWith(key))] || 'LMS Dashboard';

  return (
    <header className="bg-base-100 p-4 border-b shadow flex justify-between items-center relative z-30">
      {/* Sidebar Toggle Button (Mobile) */}
      <button onClick={toggleSidebar} className="btn btn-ghost lg:hidden">
        <HiMenu size={24} />
      </button>

      {/* Logo or Title (center on mobile if needed) */}
      <h1 className="text-xl md:text-2xl font-bold text-primary drop-shadow hidden sm:block animate-fade-in">{pageTitle}</h1>

      <div className="flex items-center gap-4">
        {/* Theme Switcher Dropdown */}
        <div className="dropdown dropdown-end relative">
          <button
            className="btn btn-primary rounded-xl shadow-md flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-200 animate-pulse hover:scale-105 focus:ring-4 focus:ring-primary/50"
            style={{ background: 'linear-gradient(90deg, var(--p) 0%, var(--s) 100%)' }}
            onClick={() => setThemeOpen((open) => !open)}
            aria-label="Theme menu"
          >
            {theme === 'dark' ? (
              <FaMoon size={22} className="text-secondary animate-spin-slow" />
            ) : theme === 'light' ? (
              <FaSun size={22} className="text-warning animate-spin-slow" />
            ) : (
              <BsPalette size={22} className="text-primary animate-spin-slow" />
            )}
            <span className="hidden sm:inline"></span>
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

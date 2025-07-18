import { Link, useLocation } from 'react-router-dom';
import {
  FaRegCalendarPlus, FaClipboardList, FaUserTie, FaUserClock, FaLaptop, FaEye, FaBuilding, FaFileAlt, FaSignOutAlt, FaUserEdit, FaMoon, FaSun, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useState } from 'react';

const sidebarLinks = [
  { to: '/layout/apply-leaves', label: 'Apply Leaves', icon: <FaRegCalendarPlus size={20} /> },
  { to: '/layout/all-leaves', label: 'All Leaves', icon: <FaClipboardList size={20} /> },
  { to: '/layout/official-duty', label: 'Official Duty', icon: <FaUserTie size={20} /> },
  { to: '/layout/personal-work', label: 'Personal Work', icon: <FaUserClock size={20} /> },
  { to: '/layout/asset-management', label: 'Asset Management', icon: <FaLaptop size={20} /> },
  { to: '/layout/view-attendance', label: 'View Attendance', icon: <FaEye size={20} /> },
  { to: '/layout/company-assets', label: 'Company Assets', icon: <FaBuilding size={20} /> },
  { to: '/layout/leave-policies', label: 'Leave Policies', icon: <FaFileAlt size={20} /> },
  { to: '/layout/resignation', label: 'Resignation', icon: <FaSignOutAlt size={20} /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Helper to check active route
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full bg-base-200 shadow-lg flex flex-col transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:w-64
      `}
    >
      {/* Collapse/Expand Button */}
      <button
        className="btn btn-ghost absolute top-2 right-2 z-10 hidden lg:block"
        onClick={() => setCollapsed((c) => !c)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <div className={`p-4 text-xl font-bold border-b border-base-300 flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
        <span className="text-primary">LMS</span>
        {!collapsed && <span className="text-base-content">Dashboard</span>}
      </div>
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {sidebarLinks.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${isActive(to)
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-100 hover:text-blue-700 text-base-content'}
              ${collapsed ? 'justify-center px-2' : ''}
            `}
            style={{ minHeight: '48px' }}
            tabIndex={0}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      {/* Overlay for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
    </aside>
  );
};

export default Sidebar;

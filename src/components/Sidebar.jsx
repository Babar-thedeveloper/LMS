import { Link, useLocation } from 'react-router-dom';
import {
  FaRegCalendarPlus, FaClipboardList, FaUserTie, FaUserClock, FaLaptop, FaEye, FaBuilding, FaFileAlt, FaSignOutAlt, FaUserEdit, FaMoon, FaSun, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import lmsLogo from '../assets/lms logo.png';

const sidebarLinks = [
  { to: '/layout/admindashboard', label: 'Dashboard', icon: <FaUserEdit size={20} /> },
  { to: '/layout/apply-leaves', label: 'Apply Leave', icon: <FaRegCalendarPlus size={20} /> },
  { to: '/layout/all-leaves', label: 'All Leaves', icon: <FaClipboardList size={20} /> },
  { to: '/layout/official-duty', label: 'Official Duty', icon: <FaUserTie size={20} /> },
  { to: '/layout/personal-work', label: 'Personal Work', icon: <FaUserClock size={20} /> },
  { to: '/layout/on-behalf-of', label: 'On Behalf Of', icon: <FaUserEdit size={20} /> },
  { to: '/layout/manager-dashboard', label: 'Manager Dashboard', icon: <FaLaptop size={20} /> },
  { to: '/layout/asset-management', label: 'Asset Management', icon: <FaLaptop size={20} /> },
  { to: '/layout/hr-section', label: 'HR Section', icon: <FaBuilding size={20} /> },
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

  // Ref for sidebar
  const sidebarRef = useRef(null);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    if (!isOpen || window.innerWidth >= 1024) return;
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (typeof onClose === 'function') onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  // Only allow collapse/expand on large screens
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const showCollapsed = isDesktop && collapsed;

  return (
    <aside
      ref={sidebarRef}
      className={`
        flex flex-col h-full bg-base-200 shadow-lg transition-all duration-300
        fixed top-0 left-0 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64
        lg:static lg:translate-x-0 lg:h-full lg:z-10
        ${showCollapsed && 'lg:w-12'}
      `}
      style={{
        transitionProperty: 'width, transform',
        transitionDuration: '300ms',
        minWidth: showCollapsed ? '3rem' : '16rem',
        boxShadow: '0 0 20px 0 rgba(0,0,0,0.08)'
      }}
    >
        {/* Collapse/Expand Button (only on desktop) */}
        <button
          className="btn btn-ghost absolute top-2 right-2 z-10 hidden lg:block transition-transform duration-300"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
          style={{ display: isDesktop ? 'block' : 'none' }}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        <div className={`p-4 border-b border-base-300 flex items-center ${showCollapsed ? 'justify-center' : 'justify-center'}`}>
          <img src={lmsLogo} alt="LMS Logo" className={`object-contain rounded-full shadow transition-all duration-300 ${showCollapsed ? 'w-8 h-8' : 'w-10 h-10 md:w-16 md:h-16'}`} />
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActive(to)
                  ? 'bg-primary text-primary-content shadow-lg scale-105'
                  : 'hover:bg-base-300 hover:text-primary-focus text-base-content'}
                ${showCollapsed ? 'justify-center px-2' : ''}
                animate-fade-in'
              `}
              style={{ minHeight: '48px' }}
              tabIndex={0}
              onClick={() => {
                if (window.innerWidth < 1024 && typeof onClose === 'function') onClose();
              }}
            >
              <span className="flex items-center justify-center w-6 h-6">{icon}</span>
              {/* Only hide label when collapsed on desktop */}
              {!(showCollapsed && isDesktop) && <span className="transition-opacity duration-300 ml-2">{label}</span>}
            </Link>
          ))}
        </nav>
    </aside>
  );
};

export default Sidebar;

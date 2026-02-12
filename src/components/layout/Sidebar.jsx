import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, ListTodo, User, Settings, LogOut, Hexagon, Sparkles, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';

const Sidebar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useUI();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/habits', icon: CheckCircle, label: 'Habits' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/ai-coach', icon: Sparkles, label: 'Discipline Coach' },
  ];

  return (
    <aside className="sidebar overflow-y-auto">
      <div className="sidebar-header">
        <Hexagon size={32} />
        <span>FocusForge</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        
        {/* Dark/Light Mode Toggle */}
        <button 
          onClick={toggleTheme} 
          className="nav-item w-full text-left"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={20} className="text-yellow-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={20} className="text-indigo-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
        
        <button onClick={logout} className="nav-item w-full text-left mt-auto">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

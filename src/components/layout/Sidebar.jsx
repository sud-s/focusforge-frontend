import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, ListTodo, Settings, LogOut, Sparkles, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';
import UnionLogo from '../../Union.svg';

const Sidebar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useUI();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/habits', icon: CheckCircle, label: 'Habits' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/ai-coach', icon: Sparkles, label: 'Coach' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
          src={UnionLogo} 
          alt="FocusForge" 
          className="w-4 h-auto"
        />
        <span>FocusForge</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={14} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={14} />
          <span>Settings</span>
        </NavLink>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="nav-item w-full text-left"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={14} />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={14} />
              <span>Dark</span>
            </>
          )}
        </button>
        
        <button onClick={logout} className="nav-item w-full text-left mt-auto text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

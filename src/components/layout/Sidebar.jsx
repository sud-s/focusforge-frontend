import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, ListTodo, User, Settings, LogOut, Hexagon, Sparkles, Lock, Moon, Bell, Volume2 } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';

const Sidebar = () => {
  const { logout } = useAuth();
  const { 
    theme, toggleTheme, 
    notificationsEnabled, toggleNotifications,
    soundEnabled, toggleSound
  } = useUI();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/habits', icon: CheckCircle, label: 'Habits' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/ai-coach', icon: Sparkles, label: 'AI Coach' },
  ];

  const Toggle = ({ checked, onChange }) => (
    <div 
      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}
      onClick={onChange}
    >
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${checked ? 'left-6' : 'left-1'}`} />
    </div>
  );

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
        
        <button onClick={logout} className="nav-item w-full text-left">
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        <div className="mt-8 mb-4">
          <h3 className="text-xs font-bold text-gray uppercase tracking-wider mb-4 px-4">App Preferences</h3>
          
          <button className="nav-item w-full text-left mb-2">
            <Lock size={18} />
            <span>Change Password</span>
          </button>
          
          <div className="flex items-center justify-between px-4 py-2 text-gray-600 hover:text-gray-900">
            <div className="flex items-center gap-3">
              <Moon size={18} />
              <span>Dark Mode</span>
            </div>
            <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
          </div>

          <div className="flex items-center justify-between px-4 py-2 text-gray-600 hover:text-gray-900">
            <div className="flex items-center gap-3">
              <Bell size={18} />
              <span>Email Notifications</span>
            </div>
            <Toggle checked={notificationsEnabled} onChange={toggleNotifications} />
          </div>

          <div className="flex items-center justify-between px-4 py-2 text-gray-600 hover:text-gray-900">
            <div className="flex items-center gap-3">
              <Volume2 size={18} />
              <span>Sound Effects</span>
            </div>
            <Toggle checked={soundEnabled} onChange={toggleSound} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

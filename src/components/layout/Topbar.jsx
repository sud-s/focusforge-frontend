import React from 'react';
import { Bell, Search, User, BellRing } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';
import '../../styles/layout.css';

const Topbar = () => {
  const { user } = useAuth();
  const { notificationsEnabled } = useUI();

  return (
    <header className="topbar">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, habits, or AI insights..." 
            className="form-input"
            style={{ paddingLeft: '2.5rem', borderRadius: '2rem', border: 'none', backgroundColor: 'var(--card-bg)' }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className={`btn-icon relative p-2 rounded-full transition-colors ${
            notificationsEnabled 
              ? 'bg-primary-100 text-primary dark:bg-primary-900 dark:text-primary-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title={notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
        >
          {notificationsEnabled ? <BellRing size={20} /> : <Bell size={20} />}
          {notificationsEnabled && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          )}
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || ''}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

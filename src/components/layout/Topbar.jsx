import React from 'react';
import { Bell, BellRing } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';
import '../../styles/layout.css';

const Topbar = () => {
  const { user } = useAuth();
  const { notificationsEnabled } = useUI();

  // Get display name - show username or full name
  const displayName = user?.username || user?.name || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  
  // Get avatar URL if available
  const avatarUrl = user?.avatar_url || user?.profile_photo || null;

  return (
    <header className="topbar">
      {/* Left side - Page title will be handled by the page */}
      <div></div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button 
          className={`relative p-2 rounded-full transition-all ${
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
        
        {/* Profile - Telegram-style */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          {/* Avatar */}
          <div className="relative">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                {initials}
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          
          {/* User info */}
          <div className="hidden md:block">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-gray-500">@{user?.username || 'user'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

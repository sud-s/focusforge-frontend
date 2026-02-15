import React from 'react';
import { Bell, BellRing } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';

const Topbar = () => {
  const { user } = useAuth();
  const { notificationsEnabled, theme } = useUI();
  const isDark = theme === 'dark';

  const displayName = user?.username || user?.name || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  
  const avatarUrl = user?.avatar_url || user?.profile_photo || null;

  return (
    <header className="topbar">
      <div></div>
      
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button 
          className={`p-1.5 rounded transition-all ${
            notificationsEnabled 
              ? 'text-zinc-400' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          {notificationsEnabled ? <BellRing size={14} /> : <Bell size={14} />}
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-2 pl-3 border-l border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={displayName}
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-700 dark:text-zinc-300">
                {initials}
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{displayName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
